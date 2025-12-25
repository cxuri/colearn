import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Users, Play, Plus, Activity, ChevronRight, BarChart3, Zap } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExploreGames() {
  const games = await getAllGames();
  const sortedGames = [...games].sort((a, b) => b.total_plays - a.total_plays);
  const globalPlays = games.reduce((acc, g) => acc + g.total_plays, 0);

  return (
    <div className="min-h-screen w-full bg-[#F0F0F0] text-black font-sans selection:bg-[#BCF139]">
      {/* MESH BACKGROUND GRID */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12">
        
        {/* HEADER BLOCK */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-black p-3 shadow-[4px_4px_0px_#BCF139]">
                <Zap className="text-[#BCF139]" fill="currentColor" size={24} />
            </div>
            <div>
                <h2 className="text-xs text-black uppercase tracking-widest">Platform v3.0</h2>
                <p className="text-[10px] font-bold text-gray-500 uppercase">System Online</p>
            </div>
          </div>
          <Link href="/play/make" className="group bg-[#BCF139] border-[3px] border-black px-6 py-3 text-sm text-black uppercase flex items-center gap-2 shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            Create New Gauntlet <Plus size={18} strokeWidth={3} />
          </Link>
        </header>

        {/* TITLE SECTION */}
        <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-[1000] uppercase leading-[0.8] tracking-tighter italic">
                HALL OF FAM<span className="text-[#BCF139] text-outline-black">E</span>
            </h1>
            <p className="text-xs text-black uppercase tracking-[0.4em] mt-4 text-gray-400">The Archives of Digital Glory</p>
        </div>

        {/* TOP STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
                { label: 'Global Runs', value: globalPlays.toLocaleString(), color: 'bg-white' },
                { label: 'Active Players', value: (games.length * 12).toLocaleString(), color: 'bg-white' }
            ].map((stat, i) => (
                <div key={i} className={`${stat.color} border-[4px] border-black p-6 shadow-[8px_8px_0px_0px_#000] flex justify-between items-center`}>
                    <div>
                        <p className="text-4xl font-[1000] tracking-tighter italic">{stat.value}</p>
                        <p className="text-xs text-black uppercase text-gray-500">{stat.label}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <ChevronRight className="-rotate-90 text-[#BCF139]" size={20} strokeWidth={4} />
                        <ChevronRight className="rotate-90 text-gray-200" size={20} strokeWidth={4} />
                    </div>
                </div>
            ))}
        </div>

        {/* LEADERBOARD LIST */}
        <div className="space-y-6">
          {sortedGames.map((game, i) => {
            const isTop = i === 0;
            return (
              <div 
                key={game.id} 
                className="group relative flex flex-col md:flex-row items-stretch bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                {/* RANK NUMBER */}
                <div className={`w-full md:w-20 flex items-center justify-center text-4xl font-[1000] italic border-b-[4px] md:border-b-0 md:border-r-[4px] border-black ${isTop ? 'bg-[#BCF139]' : 'bg-gray-100'}`}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* MAIN CONTENT */}
                <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center gap-6">
                  <div className="hidden md:block w-12 h-12 border-2 border-black bg-gray-50 flex items-center justify-center shrink-0">
                    <Activity size={24} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-[1000] uppercase tracking-tight truncate">{game.creator}</h3>
                        <span className="bg-[#BCF139] text-[9px] text-black px-1.5 py-0.5 border border-black uppercase">Trending</span>
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        LEVEL_ID: {game.id.slice(0,8)} // CREATOR_SOCIAL: @{game.creator_social || 'unknown'}
                    </div>
                  </div>

                  {/* MINI STATS */}
                  <div className="flex items-center gap-8 md:px-8">
                    <div>
                        <p className="text-[10px] text-black text-gray-400 uppercase">Plays</p>
                        <p className="text-xl text-black italic">{game.total_plays.toLocaleString()}</p>
                        <div className="w-16 h-1 bg-gray-100 border border-black mt-1 overflow-hidden">
                            <div className="h-full bg-[#BCF139]" style={{ width: '65%' }} />
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] text-black text-gray-400 uppercase">High Score</p>
                        <p className="text-xl text-black italic text-[#BCF139] text-outline-1-black">{game.high_score}</p>
                    </div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex md:flex-col border-t-[4px] md:border-t-0 md:border-l-[4px] border-black w-full md:w-40">
                    <Link 
                        href={`/play?id=${game.id}`}
                        className="flex-1 flex items-center justify-center bg-[#BCF139] py-4 text-black uppercase text-sm border-r-[4px] md:border-r-0 md:border-b-[4px] border-black hover:bg-black hover:text-white transition-colors"
                    >
                        Deploy
                    </Link>
                    <Link 
                        href={`/play/game/${game.id}`}
                        className="flex-1 flex items-center justify-center bg-white py-4 text-black uppercase text-sm hover:bg-gray-100 transition-colors"
                    >
                        Analytics
                    </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* SYSTEM STATUS FOOTER */}
        <footer className="mt-20 bg-black text-[#BCF139] p-3 border-[4px] border-black shadow-[8px_8px_0px_0px_#BCF139]">
            <div className="flex flex-wrap justify-between items-center text-[10px] text-black uppercase tracking-[0.2em] px-4">
                <div className="flex gap-4">
                    <span>System Status: Optimal</span>
                    <span className="text-white opacity-30">//</span>
                    <span>Data Stream: Live</span>
                </div>
                <div className="hidden md:block">
                    KLAZ RUNNER V3.0 / ©2024
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
}