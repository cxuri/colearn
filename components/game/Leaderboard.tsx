"use client";

import React, { useEffect, useState } from 'react';
import { Trophy, MapPin, RefreshCw, User, ShieldAlert } from 'lucide-react';
import { getLeaderBoardData } from '@/app/actions'; // Import your server action

interface LeaderboardProps {
  gameId: string;
  currentPlayerName?: string; // Optional: to highlight the current user
  className?: string;
}

interface LeaderboardEntry {
  player_name: string;
  score: number;
  college?: string;
  branch?: string;
}

interface UserRankData {
  score: number;
  player_rank: number;
}

const LeaderboardSidebar: React.FC<LeaderboardProps> = ({ 
  gameId, 
  currentPlayerName,
  className = ""
}) => {
  const [top10, setTop10] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<UserRankData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      if (loading) setLoading(true); // Initial load
      else setIsRefreshing(true);    // Manual refresh

      // Call the server action directly
      const data = await getLeaderBoardData(gameId, currentPlayerName || null);
      
      setTop10(data.top10);
      setUserRank(data.player || null);
    } catch (error) {
      console.error("Failed to load leaderboard", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (gameId) {
      fetchData();
    }
  }, [gameId, currentPlayerName]);

  // --- HELPER: Rank Badges ---
  const renderRank = (index: number) => {
    const rank = index + 1;
    if (rank === 1) return <div className="w-6 h-6 bg-[#FFD700] border-2 border-black flex items-center justify-center text-xs font-black rounded-full">1</div>;
    if (rank === 2) return <div className="w-6 h-6 bg-[#C0C0C0] border-2 border-black flex items-center justify-center text-xs font-black rounded-full">2</div>;
    if (rank === 3) return <div className="w-6 h-6 bg-[#CD7F32] border-2 border-black flex items-center justify-center text-xs font-black rounded-full">3</div>;
    return <span className="text-gray-500 font-bold text-xs">#{rank}</span>;
  };

  return (
    <div className={`flex flex-col h-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono ${className}`}>
      
      {/* HEADER */}
      <div className="bg-black text-white p-4 border-b-4 border-black flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-400" size={20} />
          <h2 className="font-black text-lg uppercase tracking-wider">TOP 10</h2>
        </div>
        <button 
          onClick={fetchData} 
          disabled={isRefreshing || loading}
          className={`p-1 hover:bg-gray-800 rounded transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* LIST CONTAINER */}
      <div className="flex-1 overflow-y-auto bg-[#f0f9ff] p-2 space-y-2">
        
        {loading ? (
          // SKELETON LOADING
          [...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-white border-2 border-gray-200 animate-pulse" />
          ))
        ) : top10.length === 0 ? (
          // EMPTY STATE
          <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center p-4">
            <ShieldAlert size={40} className="mb-2 opacity-50" />
            <p className="font-bold text-xs uppercase">No Runs Yet.</p>
            <p className="text-[10px]">Be the first to crash.</p>
          </div>
        ) : (
          // DATA ROWS
          top10.map((entry, index) => (
            <div 
              key={index} 
              className={`
                bg-white border-2 text-black border-black p-2 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all
                ${currentPlayerName === entry.player_name ? 'bg-yellow-50 border-yellow-600' : ''}
              `}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                {/* Rank */}
                <div className="shrink-0">{renderRank(index)}</div>
                
                {/* Info */}
                <div className="flex flex-col min-w-0">
                  <span className="font-black text-sm uppercase truncate">{entry.player_name}</span>
                  {entry.college && (
                    <span className="text-[10px] text-gray-500 text-bold truncate flex items-center gap-1">
                      <MapPin size={8} /> {entry.college}
                    </span>
                  )}
                </div>
              </div>

              {/* Score */}
              <div className="text-right pl-2">
                <span className="block font-black text-lg leading-none">{entry.score}</span>
                <span className="text-[9px] text-bold text-gray-400 uppercase">PTS</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* USER FOOTER (Sticky) */}
      {/* Only show if we found the user's rank */}
      {userRank && (
        <div className="border-t-4 border-black bg-yellow-400 p-3">
          <div className="flex items-center justify-between text-black">
            <div className="flex items-center gap-2">
              <div className="bg-black text-white p-1">
                <User size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase">YOUR RANK</span>
                <span className="text-lg font-black leading-none">#{userRank.player_rank}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase block">BEST</span>
              <span className="text-xl font-black">{userRank.score}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardSidebar;