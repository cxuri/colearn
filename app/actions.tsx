'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';

const sql = neon(process.env.DATABASE_URL!);

export async function submitToWaitlist(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const college = formData.get('college') as string;
    const year = formData.get('year') as string;
    const branch = formData.get('branch') as string;
    const reason = formData.get('why') as string;
    const whatsapp = formData.get('whatsapp') as string; 

    await sql`
      INSERT INTO waitlist (name, email, college, branch, year, reason, whatsapp_number)
      VALUES (${name}, ${email}, ${college}, ${branch}, ${year}, ${reason}, ${whatsapp})
    `;

    revalidatePath('/join');
    return { success: true, message: 'Welcome to the Chaos.' };

  } catch (error: any) {
    console.error('Neon Error:', error);
    if (error.code === '23505') {
        return { success: false, message: 'You are already on the list.' };
    }
    return { success: false, message: 'Database refused connection.' };
  }
}


export async function getCount() {
  try {
    const result = await sql`SELECT count(*) FROM waitlist`;

    // Result comes back like: [{ count: '42' }]
    const count = parseInt(result[0].count, 10);
    
    return count;
  } catch (error) {
    console.error('Failed to fetch count:', error);
    return 0; 
  }
}

export async function submitScore(gameId: string, playerName: string, score: number, college?: string, branch?: string) {
  try {
    // We update ON CONFLICT to match your DB constraint exactly:
    // (game_id, player_name, branch, college)
    await sql`
      INSERT INTO leaderboard (player_name, score, game_id, college, branch)
      VALUES (${playerName}, ${score}, ${gameId}, ${college}, ${branch})
      ON CONFLICT (game_id, player_name, branch, college) 
      DO UPDATE SET 
        score = GREATEST(leaderboard.score, EXCLUDED.score)
    `;

    // Revalidate to refresh the UI
    revalidatePath(`/play`); 
    
    return { success: true, message: 'Score submitted successfully.' };
  } catch (error: any) {
    console.error('Database error when submitting score:', error);
    return { success: false, message: 'Failed to submit score.' };
  }
}

export async function getLeaderBoardData(gameId: string, currentPlayerName?: string | null) {
  try {
    // 1. Get Top 10
    // We explicitly cast score to number because Postgres BigInt returns as string
    const top10 = await sql`
      SELECT player_name, score::int, college, branch 
      FROM leaderboard 
      WHERE game_id = ${gameId}
      ORDER BY score DESC 
      LIMIT 10
    `;

    let playerData = undefined;

    // 2. If a player name is provided (from localStorage), find their specific rank
    if (currentPlayerName) {
      // A. Get their best score
      const bestScoreResult = await sql`
        SELECT score::int
        FROM leaderboard
        WHERE game_id = ${gameId} AND player_name = ${currentPlayerName}
        ORDER BY score DESC
        LIMIT 1
      `;

      if (bestScoreResult.length > 0) {
        const userScore = bestScoreResult[0].score;

        // B. Calculate Rank: Count how many people have a higher score
        const rankResult = await sql`
          SELECT count(*) 
          FROM leaderboard 
          WHERE game_id = ${gameId} AND score > ${userScore}
        `;
        
        // Rank is (number of people better than you) + 1
        const rank = parseInt(rankResult[0].count) + 1;

        playerData = {
          score: userScore,
          player_rank: rank
        };
      }
    }

    return { 
      top10: top10 as any[], // Typing cast for the frontend interface
      player: playerData 
    };

  } catch (error) {
    console.log('Failed to fetch leaderboard:', error);
    // Return safe empty data structure
    return { top10: [], player: undefined }; 
  }
}

// Define the shape of the incoming data
interface GameConfigData {
  creator: string;
  creator_social?: string;
  player_url: string | null;
  bgm_sfx: string | null;
  jump_sfx: string | null;
  crash_sfx: string | null;
  powerup_sfx: string | null;
  settings: {
    gravity: number;
    speed: number;
  };
}

export async function saveGameConfig(data: GameConfigData) {
  try {
    const {
      creator,
      creator_social,
      player_url,
      bgm_sfx,
      jump_sfx,
      crash_sfx,
      powerup_sfx,
      settings
    } = data;

    // 1. Validation: "creator" is NOT NULL in your schema
    if (!creator) {
      throw new Error("Creator name is required");
    }

    // 2. Formatting: Convert settings object to a JSON string
    const settingsJson = JSON.stringify(settings);

    // 3. Insert Command
    // We do NOT insert 'id', 'rating', 'highscore', or 'created_at' 
    // because your database handles those with DEFAULT values.
    const result = await sql`
      INSERT INTO games (
        creator,
        creator_social,
        player_url,
        bgm_sfx,
        powerup_sfx,
        jump_sfx,
        crash_sfx,
        settings
      ) VALUES (
        ${creator},
        ${creator_social || null},
        ${player_url || null},
        ${bgm_sfx || null},
        ${powerup_sfx || null},
        ${jump_sfx || null},
        ${crash_sfx || null},
        ${settingsJson}::jsonb
      )
      RETURNING id;
    `;

    // 4. Return the new UUID
    return { success: true, gameId: result[0].id };

  } catch (error: any) {
    console.error('SERVER ERROR saving game:', error);
    // Return a clean error message to the frontend
    return { success: false, message: error.message || 'Database connection failed.' };
  }
}