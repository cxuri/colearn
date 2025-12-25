import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Users, Play, Plus, Activity, ChevronRight, Zap } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExploreGames() {
  const games = await getAllGames();
  const sortedGames = [...games].sort((a, b) => b.total_plays - a.total_plays);
  const globalPlays = games.reduce((acc, g) => acc + g.total_plays, 0);

  return (
    <div className="min-h-screen w-full bg-[#F0F0F0] text-black font-sans selection:bg-[#BCF139]">
      {/* MESH BACKGROUND GRID */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)`, backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12">
        
        {/* HEADER BLOCK */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-black p-3 shadow-[4px_4px_0px_#BCF139]">
                <Zap className="text-[#BCF139]" fill="currentColor" size={24} />
            </div>
            <div>
                <h2 className="text-xs text-black text-black uppercase tracking-widest">Platform v3.0</h2>
                <p className="text-[10px] font-bold text-gray-500 uppercase">System Online</p>
            </div>
          </div>
          <Link href="/play/make" className="group bg-[#BCF139] border-[3px] border-black px-6 py-3 text-sm text-black text-black uppercase flex items-center gap-2 shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:bg-white">
            Create New Gauntlet <Plus size={18} strokeWidth={4} className="text-black" />
          </Link>
        </header>

        {/* TITLE SECTION */}
        <div className="mb-12">
            <h1 className="text-6xl md:text-8xl text-black font-[1000] uppercase leading-[0.8] tracking-tighter italic">
                HALL OF FAM<span className="text-[#BCF139]" style={{ WebkitTextStroke: '2px black' }}>E</span>
            </h1>
            <p className="text-xs text-gray-500 text-black uppercase tracking-[0.4em] mt-4">The Archives of Digital Glory</p>
        </div>

        {/* TOP STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
                { label: 'Global Runs', value: globalPlays.toLocaleString(), color: 'bg-white' },
                { label: 'Active Sessions', value: (games.length * 12).toLocaleString(), color: 'bg-white' }
            ].map((stat, i) => (
                <div key={i} className={`${stat.color} border-[4px] border-black p-6 shadow-[8px_8px_0px_0px_#000] flex justify-between items-center`}>
                    <div>
                        <p className="text-4xl text-black font-[1000] tracking-tighter italic">{stat.value}</p>
                        <p className="text-xs text-gray-500 text-black uppercase">{stat.label}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <ChevronRight className="-rotate-90 text-[#BCF139]" size={20} strokeWidth={4} />
                        <ChevronRight className="rotate-90 text-gray-300" size={20} strokeWidth={4} />
                    </div>
                </div>
            ))}
        </div>

        {/* LEADERBOARD LIST */}
        <div className="space-y-6">
          {sortedGames.length === 0 ? (
             <div className="bg-white border-4 border-black p-12 text-center shadow-[8px_8px_0px_0px_#000]">
                <p className="text-black text-black uppercase tracking-widest">No Active Gauntlets Found</p>
             </div>
          ) : sortedGames.map((game, i) => {
            const isTop = i === 0;
            return (
              <div 
                key={game.id} 
                className="group relative flex flex-col md:flex-row items-stretch bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                {/* RANK NUMBER */}
                <div className={`w-full md:w-20 flex items-center justify-center text-4xl text-black font-[1000] italic border-b-[4px] md:border-b-0 md:border-r-[4px] border-black ${isTop ? 'bg-[#BCF139]' : 'bg-gray-100'}`}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* MAIN CONTENT */}
                <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center gap-6">
                  <div className="hidden md:flex w-14 h-14 border-2 border-black bg-gray-50 items-center justify-center shrink-0 shadow-[2px_2px_0px_black]">
                    <Activity size={28} className="text-black" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl text-black font-[1000] uppercase tracking-tight truncate">{game.creator || 'Anonymous'}</h3>
                        {isTop && <span className="bg-[#BCF139] text-[9px] text-black text-black px-1.5 py-0.5 border border-black uppercase">Champion</span>}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        LEVEL_ID: <span className="text-black">{game.id.slice(0,8)}</span> // SOCIAL: <span className="text-black">@{game.creator_social || 'none'}</span>
                    </div>
                  </div>

                  {/* MINI STATS */}
                  <div className="flex items-center gap-8 md:px-8 border-t-2 md:border-t-0 md:border-l-2 border-black/5 pt-4 md:pt-0">
                    <div className="min-w-[80px]">
                        <p className="text-[10px] text-gray-400 text-black uppercase">Total Plays</p>
                        <p className="text-xl text-black text-black italic">{game.total_plays.toLocaleString()}</p>
                        <div className="w-full h-1.5 bg-gray-100 border border-black mt-1 overflow-hidden">
                            <div className="h-full bg-black" style={{ width: `${Math.min((game.total_plays / (globalPlays || 1)) * 100, 100)}%` }} />
                        </div>
                    </div>
                    <div className="min-w-[80px]">
                        <p className="text-[10px] text-gray-400 text-black uppercase">High Record</p>
                        <p className="text-2xl text-black text-black italic" style={{ WebkitTextStroke: '0.5px #BCF139' }}>{game.high_score}</p>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex md:flex-col border-t-[4px] md:border-t-0 md:border-l-[4px] border-black w-full md:w-44">
                    <Link 
                        href={`/play?id=${game.id}`}
                        className="flex-1 flex items-center justify-center bg-[#BCF139] py-5 text-black text-black uppercase text-sm border-r-[4px] md:border-r-0 md:border-b-[4px] border-black hover:bg-black hover:text-[#BCF139] transition-all active:translate-y-1"
                    >
                        <Play size={16} className="mr-2 fill-current" /> Deploy
                    </Link>
                    <Link 
                        href={`/play/game/${game.id}`}
                        className="flex-1 flex items-center justify-center bg-white py-5 text-black text-black uppercase text-sm hover:bg-gray-100 transition-all active:translate-y-1"
                    >
                        Analytics
                    </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* SYSTEM STATUS FOOTER */}
        <footer className="mt-20 bg-black p-4 border-[4px] border-black shadow-[8px_8px_0px_0px_#BCF139]">
            <div className="flex flex-wrap justify-between items-center text-[10px] text-black uppercase tracking-[0.2em] px-2">
                <div className="flex gap-6 items-center">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#BCF139] rounded-full animate-pulse" />
                        <span className="text-[#BCF139]">System Status: Optimal</span>
                    </div>
                    <span className="text-white opacity-20">//</span>
                    <span className="text-[#BCF139]">Stream: Active</span>
                </div>
                <div className="hidden md:block text-[#BCF139]/50">
                    KLAZ RUNNER ENGINE V3.0.4 / ©2025_GLOBAL_ARCHIVE
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
}