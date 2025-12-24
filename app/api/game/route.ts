import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const sql = neon(process.env.DATABASE_URL!);
    
    // Note: ensure table name 'games' matches your DB exactly
    const result = await sql`SELECT * FROM games WHERE id=${id} LIMIT 1`;
    const gameData = result[0];

    if (!gameData) return NextResponse.json({ error: 'Game not found' }, { status: 404 });

    const safeConfig = {
      creator: gameData.creator || 'Unknown',
      creator_social: gameData.creator_social || '',
      assets: {
        player: gameData.player_url || null,
        coin: gameData.coin_url || null,
        obstacle: gameData.obstacle_url || null,
        bgm: gameData.bgm_sfx || null,
        jump: gameData.jump_sfx || null,
        crash: gameData.crash_sfx || null,
        powerup: gameData.powerup_sfx || null,
      },
      physics: {
        gravity: gameData.settings?.gravity ?? 1600,
        speed: gameData.settings?.speed ?? 6,
      },
    };

    return NextResponse.json(safeConfig);

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Server Error', details: error.message }, { status: 500 });
  }
}