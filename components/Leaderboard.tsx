import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, ArrowLeft, RefreshCw } from 'lucide-react';

interface LeaderboardEntry {
  player_name: string;
  score: number;
  college?: string;
  branch?: string;
  rank?: number;
}

interface LeaderboardPageProps {
  gameId: string;
  onFetchLeaderboard: (gameId: string) => Promise<{
    top10: LeaderboardEntry[];
    player?: {
      score: number;
      player_rank: number;
    };
  }>;
  onBackToGame?: () => void;
}

export default function LeaderboardPage({ 
  gameId, 
  onFetchLeaderboard,
  onBackToGame 
}: LeaderboardPageProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerRank, setPlayerRank] = useState<number | null>(null);
  const [playerScore, setPlayerScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await onFetchLeaderboard(gameId);
      setLeaderboard(data.top10);
      if (data.player) {
        setPlayerRank(data.player.player_rank);
        setPlayerScore(data.player.score);
      }
    } catch (err) {
      setError('Failed to load leaderboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [gameId]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/20 border-yellow-500';
      case 2:
        return 'bg-gray-400/20 border-gray-400';
      case 3:
        return 'bg-amber-600/20 border-amber-600';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20"></div>
            <h1 className="relative text-5xl sm:text-6xl font-black text-white mb-2 tracking-tight">
              LEADERBOARD
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Top Players</p>
        </div>

        {/* Main Content */}
        <div className="bg-black/40 backdrop-blur-sm border-4 border-black rounded-lg p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="w-12 h-12 text-red-500 animate-spin mb-4" />
              <p className="text-gray-400 text-lg">Loading leaderboard...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <button
                onClick={fetchData}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Top 10 List */}
              <div className="space-y-3 mb-8">
                {leaderboard.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No scores yet. Be the first!</p>
                  </div>
                ) : (
                  leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${getRankColor(rank)} hover:scale-[1.02]`}
                      >
                        {/* Rank */}
                        <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
                          {getRankIcon(rank) || (
                            <span className="text-2xl font-bold text-white">
                              {rank}
                            </span>
                          )}
                        </div>

                        {/* Player Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                            {entry.player_name}
                          </h3>
                          {(entry.college || entry.branch) && (
                            <p className="text-sm text-gray-400 truncate">
                              {[entry.college, entry.branch].filter(Boolean).join(' • ')}
                            </p>
                          )}
                        </div>

                        {/* Score */}
                        <div className="text-right">
                          <div className="text-2xl sm:text-3xl font-black text-red-500">
                            {entry.score.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">POINTS</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Player Rank Card (if not in top 10) */}
              {playerRank && playerScore && playerRank > 10 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-red-500">●</span>
                    Your Rank
                  </h3>
                  <div className="flex items-center gap-4 p-4 rounded-lg border-2 bg-red-500/20 border-red-500">
                    <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
                      <span className="text-2xl font-bold text-white">
                        #{playerRank}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">You</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-red-500">
                        {playerScore.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">POINTS</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={fetchData}
                  className="flex-1 px-6 py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Refresh
                </button>
                {onBackToGame && (
                  <button
                    onClick={onBackToGame}
                    className="flex-1 px-6 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Play Again
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Total Players: <span className="text-white font-bold">{leaderboard.length > 0 ? leaderboard.length + (playerRank && playerRank > 10 ? playerRank - 10 : 0) : 0}</span>
          </p>
        </div>
      </div>
    </div>
  );
}