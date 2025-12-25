import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Users, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic'; // Ensure realtime data

export default async function ExploreGames() {
  const games = await getAllGames();

  // 1. HANDLE EMPTY STATE (Prevents "Not Working" blank screens)
  if (!games || games.length === 0) {
    return (
      <div className="min-h-screen bg-[#e0f2fe] p-8 font-mono text-black flex flex-col items-center justify-center text-center">
        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000]">
          <h1 className="text-4xl font-black mb-4">NO GAMES YET 🛑</h1>
          <p className="font-bold text-gray-500 mb-8">The leaderboard is empty. Be the first to build a level!</p>
          <Link 
            href="/play/make" 
            className="inline-block bg-[#FFD700] border-4 border-black px-6 py-3 font-black text-xl hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_#000] transition-all uppercase"
          >
            🛠️ Create Level
          </Link>
        </div>
      </div>
    );
  }

  // 2. MAIN GRID
  return (
    <div className="min-h-screen bg-[#e0f2fe] p-4 md:p-8 font-mono text-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            Community<br/>Levels
            </h1>
            <Link 
                href="/play/make" 
                className="hidden md:block bg-black text-white px-4 py-2 font-bold uppercase hover:bg-[#FFD700] hover:text-black transition-all"
            >
                + Create New
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link 
              key={game.id} 
              href={`/play/game/${game.id}`}
              className="group block bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              {/* Card Header */}
              <div className="p-6 border-b-4 border-black bg-gray-50 flex items-start justify-between">
                <div className="overflow-hidden">
                  <h2 className="font-black text-xl md:text-2xl uppercase truncate pr-2">
                    {game.creator}'s Level
                  </h2>
                  {game.creator_social && (
                    <div className="text-xs font-bold text-blue-600 flex items-center gap-1 mt-1 truncate">
                       @{game.creator_social.replace(/^https?:\/\//, '').replace('instagram.com/', '').replace('twitter.com/', '')} 
                       <ExternalLink size={10} />
                    </div>
                  )}
                </div>
                {/* Avatar Preview */}
                <div className="shrink-0">
                    {game.player_url ? (
                    <img src={game.player_url} className="w-12 h-12 rounded-full border-2 border-black object-cover bg-white" alt="Avatar" />
                    ) : (
                    <div className="w-12 h-12 rounded-full border-2 border-black bg-gray-200 flex items-center justify-center">
                        <Users size={20} className="text-gray-400" />
                    </div>
                    )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                   <div className="flex items-center justify-center gap-2 text-gray-500 font-bold text-xs mb-1">
                     <Users size={14} /> TOTAL PLAYS
                   </div>
                   <span className="text-2xl font-black">{game.total_plays}</span>
                </div>
                <div className="text-center border-l-2 border-dashed border-gray-300">
                   <div className="flex items-center justify-center gap-2 text-[#FFD700] font-bold text-xs mb-1">
                     <Trophy size={14} /> HIGH SCORE
                   </div>
                   <span className="text-2xl font-black">{game.high_score}</span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-3 bg-black text-white text-center font-bold uppercase text-sm group-hover:bg-[#FFD700] group-hover:text-black transition-colors">
                View Analytics & Play →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}