import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Users, ExternalLink, Plus, LayoutGrid } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExploreGames() {
  const games = await getAllGames();

  // 1. NEOBRUTALIST EMPTY STATE
  if (!games || games.length === 0) {
    return (
      <div className="min-h-screen bg-[#A5F3FC] p-8 font-mono text-black flex flex-col items-center justify-center text-center">
        <div className="bg-white border-[6px] border-black p-10 shadow-[12px_12px_0px_0px_#000] max-w-lg">
          <div className="bg-red-400 border-4 border-black inline-block p-4 mb-6">
            <LayoutGrid size={48} className="text-black" />
          </div>
          <h1 className="text-5xl text-black mb-4 uppercase tracking-tighter">Void Detected</h1>
          <p className="font-bold text-xl mb-8 leading-tight">
            The multiverse is empty. No custom levels found in the database.
          </p>
          <Link 
            href="/play/make" 
            className="block w-full bg-[#FDE047] border-4 border-black px-6 py-4 text-black text-2xl hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[8px_8px_0px_0px_#000] transition-all uppercase"
          >
            🛠️ Create Level 01
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FF90E8] p-4 md:p-12 font-mono text-black selection:bg-black selection:text-[#FF90E8]">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b-[6px] border-black pb-8">
            <div className="space-y-2">
                <span className="bg-black text-[#FF90E8] px-3 py-1 text-sm text-black uppercase tracking-widest">Global Archives</span>
                <h1 className="text-6xl md:text-8xl text-black tracking-tighter uppercase leading-[0.8]">
                  Community<br/>Levels
                </h1>
            </div>
            <Link 
                href="/play/make" 
                className="flex items-center gap-2 bg-[#3DD1FF] text-black border-4 border-black px-8 py-4 text-black text-xl uppercase shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:bg-white"
            >
                <Plus strokeWidth={3} /> Create New
            </Link>
        </header>

        {/* GAMES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {games.map((game) => (
            <Link 
              key={game.id} 
              href={`/play/game/${game.id}`}
              className="group block bg-white border-4 border-black shadow-[10px_10px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              {/* Card Header - Uses high contrast yellow/cyan or gray */}
              <div className="p-6 border-b-4 border-black bg-[#FDE047] group-hover:bg-[#BCF139] transition-colors flex items-start justify-between">
                <div className="overflow-hidden">
                  <h2 className="text-black text-2xl md:text-3xl uppercase truncate leading-none mb-2">
                    {game.creator}
                  </h2>
                  {game.creator_social && (
                    <div className="inline-flex bg-black text-white text-[10px] text-black px-2 py-1 items-center gap-1 uppercase truncate">
                       @{game.creator_social.split('/').pop()} 
                       <ExternalLink size={12} strokeWidth={3} />
                    </div>
                  )}
                </div>
                {/* Avatar Preview */}
                <div className="shrink-0 ml-4">
                    {game.player_url ? (
                    <img src={game.player_url} className="w-16 h-16 border-4 border-black object-cover bg-white shadow-[4px_4px_0px_0px_#000]" alt="Avatar" />
                    ) : (
                    <div className="w-16 h-16 border-4 border-black bg-[#3DD1FF] flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
                        <Users size={28} strokeWidth={3} />
                    </div>
                    )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 border-b-4 border-black bg-white">
                <div className="p-6 border-r-4 border-black flex flex-col items-center justify-center">
                   <div className="text-[10px] text-black uppercase mb-1">Total Plays</div>
                   <span className="text-4xl text-black italic">{(game.total_plays || 0).toLocaleString()}</span>
                </div>
                <div className="p-6 flex flex-col items-center justify-center bg-[#A5F3FC]">
                   <div className="text-[10px] text-black uppercase mb-1">Max Score</div>
                   <div className="flex items-center gap-2">
                     <Trophy size={18} strokeWidth={3} />
                     <span className="text-4xl text-black italic">{(game.high_score || 0).toLocaleString()}</span>
                   </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-white group-hover:bg-black group-hover:text-white flex items-center justify-between transition-colors">
                <span className="text-black uppercase tracking-tight text-lg">Enter Level</span>
                <div className="bg-black text-white group-hover:bg-[#FDE047] group-hover:text-black p-2 border-2 border-black transition-colors">
                   <LayoutGrid size={20} strokeWidth={3} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FOOTER DECOR */}
        <footer className="mt-20 pt-10 border-t-[6px] border-black flex justify-between items-center text-[10px] text-black uppercase tracking-[0.2em]">
            <span>System Status: Operational</span>
            <span className="animate-pulse">● Live Feed</span>
            <span>Archive v2.4.0</span>
        </footer>
      </div>
    </div>
  );
}