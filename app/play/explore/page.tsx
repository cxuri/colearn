import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Users, Play, Plus, Activity, Zap, Globe, Target } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExploreGames() {
  const games = await getAllGames();
  const sortedGames = [...games].sort((a, b) => b.total_plays - a.total_plays);
  const globalPlays = games.reduce((acc, g) => acc + g.total_plays, 0);

  return (
    <div className="min-h-screen w-full bg-[#EAEAEA] text-black font-sans pb-24 selection:bg-black selection:text-[#BCF139] font-black leading-none">
      {/* INDUSTRIAL DOT GRID */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1.5px, transparent 1.5px)`, backgroundSize: '32px 32px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* NAV BAR */}
        <nav className="flex justify-between items-center mb-16 border-b-[10px] border-black pb-8">
          <div className="flex items-center gap-5">
            <div className="bg-black p-3 border-[4px] border-[#BCF139] shadow-[6px_6px_0px_black]">
                <Zap className="text-[#BCF139]" fill="currentColor" size={28} />
            </div>
            <div className="space-y-1">
                <h2 className="text-xl font-black uppercase tracking-tighter text-black">KLAZ_ARCHIVE_v3.0</h2>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_red]" />
                    <p className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">NETWORK_CONNECTED</p>
                </div>
            </div>
          </div>
          <Link href="/play/make" className="hidden md:flex items-center gap-4 group">
            <span className="text-sm font-black uppercase text-black border-b-4 border-black group-hover:bg-black group-hover:text-[#BCF139] transition-all px-2 py-1">REGISTER_MAP_NODE</span>
            <div className="bg-[#BCF139] border-[4px] border-black p-2 shadow-[4px_4px_0px_black] group-hover:rotate-180 transition-transform duration-500">
                <Plus size={24} strokeWidth={6} className="text-black" />
            </div>
          </Link>
        </nav>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
            <div className="lg:col-span-8">
                <h1 className="text-8xl md:text-[11rem] text-black uppercase leading-[0.75] tracking-tighter italic font-black">
                    HALL OF<br/>
                    <span className="text-[#BCF139]" style={{ WebkitTextStroke: '5px black' }}>GLORY</span>
                </h1>
            </div>
            <div className="lg:col-span-4 space-y-8">
                <div className="bg-white border-[6px] border-black p-8 shadow-[12px_12px_0px_black] -rotate-1">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-black uppercase text-gray-400 tracking-[0.3em]">TOTAL_TRAFFIC</span>
                        <Globe size={24} className="text-blue-600" strokeWidth={5} />
                    </div>
                    <p className="text-6xl font-black italic text-black">{globalPlays.toLocaleString()}</p>
                </div>
                <Link href="/play/make" className="block w-full bg-black text-[#BCF139] text-center py-8 text-4xl font-black uppercase border-[4px] border-[#BCF139] shadow-[12px_12px_0px_black] hover:bg-[#BCF139] hover:text-black transition-all active:translate-x-2 active:translate-y-2 active:shadow-none">
                    CREATE_LEVEL +
                </Link>
            </div>
        </div>

        {/* CARDS */}
        <div className="space-y-12">
          {sortedGames.map((game, i) => {
            const isTop = i === 0;
            return (
              <div key={game.id} className="group relative flex flex-col md:flex-row items-stretch bg-white border-[6px] border-black shadow-[15px_15px_0px_black] hover:translate-x-3 hover:translate-y-3 hover:shadow-none transition-all duration-300">
                {/* RANK */}
                <div className={`md:w-36 w-full flex flex-col items-center justify-center text-8xl font-black italic border-b-[6px] md:border-b-0 md:border-r-[6px] border-black ${isTop ? 'bg-[#BCF139] text-black' : 'bg-gray-100 text-black'}`}>
                  <span className="text-xs font-black not-italic uppercase mb-2 opacity-50 tracking-widest text-black">RANK</span>
                  {i + 1}
                </div>

                {/* CONTENT */}
                <div className="flex-1 p-8 flex flex-col md:flex-row md:items-center gap-10">
                  <div className="relative shrink-0 hidden md:block group-hover:rotate-6 transition-transform">
                    <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 border-2 border-[#BCF139]" />
                    {game.player_url ? (
                        <img src={game.player_url} className="relative w-24 h-24 border-[5px] border-black object-cover bg-white" alt="avatar" />
                    ) : (
                        <div className="relative w-24 h-24 border-[5px] border-black bg-gray-200 flex items-center justify-center">
                            <Trophy size={48} className="text-black/20" strokeWidth={5} />
                        </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-5 mb-4">
                        <h3 className="text-5xl font-black uppercase tracking-tighter text-black truncate leading-none italic group-hover:underline decoration-8 decoration-[#BCF139]">
                            {game.creator || 'ANON_ARCHITECT'}
                        </h3>
                        {isTop && (
                            <div className="bg-black text-[#BCF139] text-xs font-black px-3 py-1 uppercase flex items-center gap-2 border-2 border-[#BCF139]">
                                <Target size={14} strokeWidth={6} /> CHAMPION
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <span className="text-xs font-black bg-black text-[#BCF139] px-3 py-1 border-2 border-[#BCF139] uppercase tracking-[0.2em] italic">NODE_{game.id.slice(0,8)}</span>
                        {game.creator_social && (
                            <span className="text-xs font-black text-blue-700 uppercase border-b-4 border-blue-700 italic px-1">@{game.creator_social.split('/').pop()}</span>
                        )}
                    </div>
                  </div>

                  {/* DATA */}
                  <div className="grid grid-cols-2 gap-12 md:px-12 border-t-[5px] md:border-t-0 md:border-l-[5px] border-black pt-10 md:pt-0">
                    <div className="min-w-[140px]">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 italic">ENGAGEMENT</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-black italic leading-none">{game.total_plays.toLocaleString()}</span>
                            <span className="text-xs font-black text-black uppercase opacity-40 italic">RUNS</span>
                        </div>
                        <div className="w-full h-4 bg-gray-200 border-[3px] border-black mt-4 overflow-hidden shadow-[4px_4px_0px_black]">
                            <div className="h-full bg-black transition-all duration-1000 group-hover:bg-[#BCF139]" style={{ width: `${Math.min((game.total_plays / (globalPlays || 1)) * 200, 100)}%` }} />
                        </div>
                    </div>
                    <div className="min-w-[140px]">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 italic">PEAK_SCORE</p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-6xl font-black text-[#BCF139] leading-none italic" style={{ WebkitTextStroke: '2.5px black' }}>{game.high_score}</span>
                            <Trophy size={28} className="text-amber-500" strokeWidth={5} />
                        </div>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex md:flex-col border-t-[6px] md:border-t-0 md:border-l-[6px] border-black w-full md:w-56 font-black">
                    <Link href={`/play?id=${game.id}`} className="flex-1 flex flex-col items-center justify-center bg-[#BCF139] py-8 text-black uppercase text-sm border-r-[6px] md:border-r-0 md:border-b-[6px] border-black hover:bg-black hover:text-[#BCF139] transition-all group/btn">
                        <Play size={32} fill="currentColor" strokeWidth={0} className="mb-2 group-hover/btn:scale-125 transition-transform" />
                        DEPLOY_NODE
                    </Link>
                    <Link href={`/play/game?id=${game.id}`} className="flex-1 flex flex-col items-center justify-center bg-white py-8 text-black uppercase text-sm hover:bg-black hover:text-[#BCF139] transition-all group/btn">
                        <Activity size={32} className="mb-2 text-black group-hover/btn:text-[#BCF139]" strokeWidth={6} />
                        ANALYTICS
                    </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <footer className="mt-32 space-y-8">
            <div className="bg-black border-[5px] border-[#BCF139] text-[#BCF139] p-8 flex justify-between items-center border-b-[15px] shadow-[15px_15px_0px_black]">
                <div className="flex items-center gap-12 overflow-hidden whitespace-nowrap italic tracking-[0.4em] text-sm uppercase">
                    <span className="flex items-center gap-4">SYSTEM_OPTIMAL <span className="w-4 h-4 bg-[#BCF139] rounded-full shadow-[0_0_15px_#BCF139]" /></span>
                    <span className="opacity-30">||</span>
                    <span>NODES_ACTIVE: {games.length}</span>
                    <span className="opacity-30">||</span>
                    <span>DEPLOY_v3.0.4_STABLE</span>
                </div>
            </div>
            <p className="text-center text-xs font-black uppercase text-gray-500 tracking-[0.5em] italic">© 2025 KLAZ_RUNNER_GLOBAL_ARCHIVE_AUTHORIZED_ONLY</p>
        </footer>
      </div>
    </div>
  );
}