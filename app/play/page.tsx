import dynamic from 'next/dynamic';
import { getGame } from '@/app/actions'; // Adjust path to your actions file

// Dynamic import for Phaser (Client Side Only)
const PhaserGame = dynamic(() => import('@/components/game/PhaserGame'), { 
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-[#e0f2fe] font-mono">
      <div className="text-2xl font-black animate-bounce">LOADING ASSETS...</div>
    </div>
  )
});

interface GamePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function GamePage({ searchParams }: GamePageProps) {
  const gameId = searchParams.id as string;

  // 1. Fetch Data on the Server
  const gameData = gameId ? await getGame(gameId) : null;

  if (!gameData) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white font-mono">
        <h1 className="text-4xl font-black">GAME NOT FOUND (404)</h1>
      </div>
    );
  }

  // 2. Pass Data to the Client Component
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <PhaserGame 
        config={{
          creator: gameData.creator,
          creator_social: gameData.creator_social,
          assets: {
            player: gameData.player_url,
            coin: gameData.coin_url, // Assuming you have this, or remove if not
            obstacle: gameData.obstacle_url, // Assuming you have this
            bgm: gameData.bgm_sfx,
            jump: gameData.jump_sfx,
            crash: gameData.crash_sfx,
            powerup: gameData.powerup_sfx
          },
          physics: {
            gravity: gameData.settings?.gravity || 1600,
            speed: gameData.settings?.speed || 6
          }
        }} 
      />
    </main>
  );
}