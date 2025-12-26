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


export async function getAllGames() {
  try {
    const games = await sql`
      SELECT 
        g.id,
        g.creator,
        g.creator_social,
        g.player_url,
        g.created_at,
        COUNT(l.game_id) as total_plays, -- Changed from l.id to l.game_id
        COALESCE(MAX(l.score), 0) as high_score
      FROM games g
      LEFT JOIN leaderboard l ON g.id = l.game_id
      GROUP BY g.id
      ORDER BY total_plays DESC
    `;

    console.log(`✅ Fetched ${games.length} games`); 

    return games.map(g => ({
      id: g.id,
      creator: g.creator,
      creator_social: g.creator_social,
      player_url: g.player_url,
      total_plays: parseInt(g.total_plays, 10),
      high_score: parseInt(g.high_score, 10),
    }));

  } catch (err: any) {
    // Check your terminal for this specific error message
    console.error("❌ Error fetching games (Detailed):", err);
    return [];
  }
}

// Helper to map messy user input to clean shortcodes
function normalizeCollege(name: string): string {
  const normalized = name.toLowerCase().trim();
  
  if (normalized.includes('mar baselios') || normalized.includes('mbits')) {
    return 'MBITS';
  }
  if (normalized.includes('viswajyothi') || normalized.includes('viswajyoti') || normalized.includes('vjcet')) {
    return 'VJCET';
  }
  if (normalized.includes('rajagiri') || normalized.includes('rset')) {
    return 'RSET';
  }
  if (normalized.includes('muthoot') || normalized.includes('mits')) {
    return 'MITS';
  }
  if (normalized.includes('christ') || normalized.includes('mits')) {
    return 'CHRIST';
  }
  
  // Return original uppercase if no match found
  return name.toUpperCase();
}

export async function getGameAnalytics(gameId: string) {
  try {
    const gameResult = await sql`SELECT * FROM games WHERE id = ${gameId}`;
    if (gameResult.length === 0) return null;
    const game = gameResult[0];

    // Fetch RAW college data first to normalize in JS
    const rawColleges = await sql`
      SELECT college, COUNT(*) as count 
      FROM leaderboard 
      WHERE game_id = ${gameId} AND college IS NOT NULL AND college <> ''
      GROUP BY college
    `;

    // Process and Group messy data
    const collegeMap: Record<string, number> = {};
    rawColleges.forEach(row => {
      const cleanName = normalizeCollege(row.college);
      collegeMap[cleanName] = (collegeMap[cleanName] || 0) + parseInt(row.count);
    });

    // Convert back to array, sort, and limit
    const normalizedColleges = Object.entries(collegeMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    // Fetch Branches (You can apply similar normalization here if needed)
    const branches = await sql`
      SELECT branch, COUNT(*) as count 
      FROM leaderboard 
      WHERE game_id = ${gameId} AND branch IS NOT NULL AND branch <> ''
      GROUP BY branch 
      ORDER BY count DESC 
      LIMIT 5
    `;

    const leaderboard = await sql`
      SELECT player_name, score, college 
      FROM leaderboard 
      WHERE game_id = ${gameId} 
      ORDER BY score DESC 
      LIMIT 10
    `;

    const totalPlaysResult = await sql`SELECT count(*) FROM leaderboard WHERE game_id = ${gameId}`;
    const totalPlays = parseInt(totalPlaysResult[0].count, 10);

    return {
      game,
      totalPlays,
      colleges: normalizedColleges,
      branches: branches.map(b => ({ name: b.branch.toUpperCase(), count: parseInt(b.count) })),
      leaderboard: leaderboard.map(p => ({
        ...p,
        college: normalizeCollege(p.college || 'GUEST')
      }))
    };

  } catch (err) {
    console.error("Error fetching analytics:", err);
    return null;
  }
}