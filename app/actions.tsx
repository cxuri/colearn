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

export async function getGame(id: String) {
  try {
    const data = await sql`SELECT * FROM GAME WHERE ID=${id}`
    return data[0] || null;
  } catch (error) {
    console.log('Failed to fetch the game:', error);
    return 0;
  }
}

export async function submitScore(gameId: string, playerName: string, score: number, college?: string, branch?: string) {
  try {
    await sql`
      INSERT INTO leaderboard (player_name, score, game_id, college, branch)
      VALUES (${playerName}, ${score}, ${gameId}, ${college}, ${branch})
    `;
    // Revalidate the leaderboard page so the new score shows up immediately
    revalidatePath(`/game/${gameId}/leaderboard`);
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
