import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Users, Play, Plus, Activity, Zap, Globe, Target } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExploreGames() {
  const games = await getAllGames();
  const sortedGames = [...games].sort((a, b) => b.total_plays - a.total_plays);
  const globalPlays = games.reduce((acc, g) => acc + g.total_plays, 0);

  return (
    <div className="min-h-screen w-full bg-[#EAEAEA] text-black font-sans pb-20 selection:bg-black selection:text-[#BCF139] font-black leading-none overflow-x-hidden">
      {/* INDUSTRIAL DOT GRID */}
      <div className="fixed inset-0 z-0 opacity-[0.12] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1.2px, transparent 1.2px)`, backgroundSize: '24px 24px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* NAV BAR */}
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 border-b-[6px] md:border-b-[10px] border-black pb-6 md:pb-8 gap-6 md:gap-0">
          <div className="flex items-center gap-4">
            <div className="bg-black p-2 md:p-3 border-[3px] md:border-[4px] border-[#BCF139] shadow-[4px_4px_0px_black]">
                <Zap className="text-[#BCF139] w-5 h-5 md:w-7 md:h-7" fill="currentColor" />
            </div>
            <div className="space-y-1">
                <h2 className="text-lg md:text-xl font-black uppercase tracking-tighter text-black">KLAZ_ARCHIVE_v3.0</h2>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 md:w-3 md:h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_red]" />
                    <p className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-[0.1em]">NETWORK_CONNECTED</p>
                </div>
            </div>
          </div>
          <Link href="/play/make" className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4 group">
            <span className="text-xs md:text-sm font-black uppercase text-black border-b-2 md:border-b-4 border-black group-hover:bg-black group-hover:text-[#BCF139] transition-all px-2 py-1">REGISTER_NODE</span>
            <div className="bg-[#BCF139] border-[3px] md:border-[4px] border-black p-2 shadow-[3px_3px_0px_black] group-hover:rotate-180 transition-transform duration-500">
                <Plus className="w-5 h-5 md:w-6 md:h-6 text-black" strokeWidth={6} />
            </div>
          </Link>
        </nav>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20 items-end">
            <div className="lg:col-span-8">
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] text-black uppercase tracking-tighter italic font-black break-words">
                    HALL OF<br/>
                    <span className="text-[#BCF139]" style={{ WebkitTextStroke: '2px md:4px black' }}>GLORY</span>
                </h1>
            </div>
            <div className="lg:col-span-4 space-y-6 md:space-y-8">
                <div className="bg-white border-[4px] md:border-[6px] border-black p-6 md:p-8 shadow-[8px_8px_0px_black] md:-rotate-1">
                    <div className="flex justify-between items-center mb-3 text-black">
                        <span className="text-[10px] md:text-xs font-black uppercase text-gray-400 tracking-[0.2em]">TRAFFIC</span>
                        <Globe size={20} className="text-blue-600" strokeWidth={5} />
                    </div>
                    <p className="text-4xl md:text-6xl font-black italic text-black leading-none">{globalPlays.toLocaleString()}</p>
                </div>
                <Link href="/play/make" className="block w-full bg-black text-[#BCF139] text-center py-6 md:py-8 text-2xl md:text-4xl font-black uppercase border-[4px] border-[#BCF139] shadow-[8px_8px_0px_black] hover:bg-[#BCF139] hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                    CREATE_LEVEL +
                </Link>
            </div>
        </div>

        {/* CARDS LIST */}
        <div className="space-y-8 md:space-y-12">
          {sortedGames.map((game, i) => {
            const isTop = i === 0;
            return (
              <div key={game.id} className="group relative flex flex-col lg:flex-row items-stretch bg-white border-[4px] md:border-[6px] border-black shadow-[8px_8px_0px_black] md:shadow-[15px_15px_0px_black] hover:translate-x-1 md:hover:translate-x-3 hover:translate-y-1 md:hover:translate-y-3 hover:shadow-none transition-all duration-300">
                
                {/* RANK INDICATOR */}
                <div className={`lg:w-36 w-full flex flex-row lg:flex-col items-center justify-between lg:justify-center p-4 lg:p-0 text-5xl md:text-8xl font-black italic border-b-[4px] lg:border-b-0 lg:border-r-[6px] border-black ${isTop ? 'bg-[#BCF139] text-black' : 'bg-gray-100 text-black'}`}>
                  <span className="text-[10px] md:text-xs font-black not-italic uppercase lg:mb-2 opacity-50 tracking-widest text-black">RANK</span>
                  {i + 1}
                </div>

                {/* IDENTITY & STATS */}
                <div className="flex-1 p-5 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                  <div className="relative shrink-0 hidden sm:block">
                    <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 border-2 border-[#BCF139]" />
                    {game.player_url ? (
                        <img src={game.player_url} className="relative w-16 h-16 md:w-24 md:h-24 border-[4px] md:border-[5px] border-black object-cover bg-white" alt="avatar" />
                    ) : (
                        <div className="relative w-16 h-16 md:w-24 md:h-24 border-[4px] md:border-[5px] border-black bg-gray-200 flex items-center justify-center">
                            <Trophy className="w-8 h-8 md:w-12 md:h-12 text-black/20" strokeWidth={5} />
                        </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-5 mb-4">
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black truncate leading-none italic group-hover:underline decoration-4 md:decoration-8 decoration-[#BCF139]">
                            {game.creator || 'ANON_USER'}
                        </h3>
                        {isTop && (
                            <div className="bg-black text-[#BCF139] text-[8px] md:text-xs font-black px-2 md:px-3 py-1 uppercase flex items-center gap-1 md:gap-2 border-2 border-[#BCF139]">
                                <Target size={12} strokeWidth={6} /> CHAMPION
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-3 md:gap-6">
                        <span className="text-[9px] md:text-xs font-black bg-black text-[#BCF139] px-2 md:px-3 py-1 border-2 border-[#BCF139] uppercase tracking-wider italic">NODE_{game.id.slice(0,8)}</span>
                        {game.creator_social && (
                            <span className="text-[9px] md:text-xs font-black text-blue-700 uppercase border-b-2 md:border-b-4 border-blue-700 italic px-1">@{game.creator_social.split('/').pop()}</span>
                        )}
                    </div>
                  </div>

                  {/* FLAT DATA GRID */}
                  <div className="grid grid-cols-2 gap-6 md:gap-16 md:px-6 lg:px-12 border-t-[4px] md:border-t-0 md:border-l-0 lg:border-l-[5px] border-black pt-6 md:pt-0">
                    <div className="min-w-[100px] md:min-w-[140px]">
                        <p className="text-[8px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-1 italic">ENGAGEMENT</p>
                        <div className="flex items-baseline gap-1 md:gap-2">
                            <span className="text-3xl md:text-5xl font-black text-black italic leading-none">{game.total_plays.toLocaleString()}</span>
                            <span className="text-[8px] md:text-xs font-black text-black uppercase opacity-40 italic">RUNS</span>
                        </div>
                    </div>
                    <div className="min-w-[100px] md:min-w-[140px]">
                        <p className="text-[8px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-1 italic">PEAK_SCORE</p>
                        <div className="flex items-baseline gap-2 md:gap-3">
                            <span className="text-4xl md:text-6xl font-black text-[#BCF139] leading-none italic" style={{ WebkitTextStroke: '1.5px md:2.5px black' }}>{game.high_score}</span>
                            <Trophy className="w-5 h-5 md:w-7 md:h-7 text-amber-500" strokeWidth={5} />
                        </div>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-row lg:flex-col border-t-[4px] md:border-t-[6px] lg:border-t-0 lg:border-l-[6px] border-black w-full lg:w-56 font-black">
                    <Link href={`/play?id=${game.id}`} className="flex-1 flex flex-col items-center justify-center bg-[#BCF139] py-5 md:py-8 text-black uppercase text-[10px] md:text-sm border-r-[4px] lg:border-r-0 lg:border-b-[6px] border-black hover:bg-black hover:text-[#BCF139] transition-all group/btn">
                        <Play className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 group-hover/btn:scale-110 transition-transform" fill="currentColor" strokeWidth={0} />
                        DEPLOY
                    </Link>
                    <Link href={`/play/game?id=${game.id}`} className="flex-1 flex flex-col items-center justify-center bg-white py-5 md:py-8 text-black uppercase text-[10px] md:text-sm hover:bg-black hover:text-[#BCF139] transition-all group/btn">
                        <Activity className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 text-black group-hover/btn:text-[#BCF139]" strokeWidth={6} />
                        ANALYTICS
                    </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <footer className="mt-20 md:mt-32 space-y-6 md:space-y-8">
            <div className="bg-black border-[4px] md:border-[5px] border-[#BCF139] text-[#BCF139] p-5 md:p-8 flex justify-between items-center border-b-[10px] md:border-b-[15px] shadow-[8px_8px_0px_black]">
                <div className="flex items-center gap-6 md:gap-12 whitespace-nowrap italic tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-sm uppercase overflow-hidden">
                    <span className="flex items-center gap-2 md:gap-4 shrink-0">SYSTEM_OPTIMAL <span className="w-3 h-3 md:w-4 md:h-4 bg-[#BCF139] rounded-full shadow-[0_0_10px_#BCF139]" /></span>
                    <span className="opacity-30 shrink-0">||</span>
                    <span className="shrink-0">NODES_ACTIVE: {games.length}</span>
                    <span className="opacity-30 shrink-0">||</span>
                    <span className="shrink-0">DEPLOY_v3.0.4_STABLE</span>
                </div>
            </div>
            <p className="text-center text-[8px] md:text-xs font-black uppercase text-gray-500 tracking-[0.2em] md:tracking-[0.5em] italic">© 2025 KLAZ_RUNNER_GLOBAL_ARCHIVE</p>
        </footer>
      </div>
    </div>
  );
}