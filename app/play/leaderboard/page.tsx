'use client';

import { useRouter } from 'next/navigation';
import LeaderboardPage from '@/components/Leaderboard';
import { getLeaderBoardData } from '@/app/actions'; 

export default function LeaderboardRoute({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleBackToGame = () => {
    router.push(`/game/${params.id}`);
  };

  const handleFetchLeaderboard = async (gameId: string) => {
    // 1. Check local storage for the name of the player who just played
    const lastPlayerName = typeof window !== 'undefined' 
      ? localStorage.getItem('last_player_name') 
      : null;

    // 2. Call the Server Action
    // We pass the name so the server can calculate the rank for us
    const data = await getLeaderBoardData(gameId, lastPlayerName);

    return {
      top10: data.top10,
      player: data.player
    };
  };

  return (
    <LeaderboardPage 
      gameId={params.id}
      onFetchLeaderboard={handleFetchLeaderboard}
      onBackToGame={handleBackToGame}
    />
  );
}