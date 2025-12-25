import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Users, Play, Plus, Activity, ChevronRight, Zap, Globe, Target } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExploreGames() {
  const games = await getAllGames();
  const sortedGames = [...games].sort((a, b) => b.total_plays - a.total_plays);
  const globalPlays = games.reduce((acc, g) => acc + g.total_plays, 0);

  return (
    <div className="min-h-screen w-full bg-[#EAEAEA] text-black font-sans selection:bg-black selection:text-[#BCF139] pb-20 text-black">
      {/* INDUSTRIAL GRID BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-[0.08] pointer-events-none" 
           style={{ 
             backgroundImage: `radial-gradient(#000 1.2px, transparent 1.2px)`, 
             backgroundSize: '24px 24px' 
           }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        
        {/* TOP NAVIGATION BAR */}
        <nav className="flex justify-between items-center mb-16 border-b-[6px] border-black pb-6">
          <div className="flex items-center gap-4">
            <div className="bg-black p-2 shadow-[4px_4px_0px_#BCF139] border-2 border-[#BCF139]">
                <Zap className="text-[#BCF139]" fill="currentColor" size={20} />
            </div>
            <div className="leading-none">
                <h2 className="text-sm text-black uppercase tracking-tighter text-black">Klaz_Archive_v3.0</h2>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    <p className="text-[9px] text-black text-gray-500 uppercase tracking-widest">Network_Live</p>
                </div>
            </div>
          </div>
          <Link href="/play/make" className="hidden md:flex items-center gap-3 group">
            <span className="text-xs text-black uppercase group-hover:underline underline-offset-4 text-black">Register New Map</span>
            <div className="bg-[#BCF139] border-[3px] border-black p-1 group-hover:rotate-90 transition-transform shadow-[3px_3px_0px_black]">
                <Plus size={16} strokeWidth={4} className="text-black" />
            </div>
          </Link>
        </nav>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
            <div className="lg:col-span-8">
                <h1 className="text-7xl md:text-9xl text-black uppercase leading-[0.75] tracking-tighter italic text-black">
                    HALL OF<br/>
                    <span className="text-[#BCF139] drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]" style={{ WebkitTextStroke: '3px black' }}>GLORY</span>
                </h1>
            </div>
            <div className="lg:col-span-4 space-y-4">
                <div className="bg-white border-[4px] border-black p-5 shadow-[8px_8px_0px_black] -rotate-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-black uppercase text-gray-400">Platform_Traffic</span>
                        <Globe size={16} className="text-blue-600" strokeWidth={3} />
                    </div>
                    <p className="text-4xl text-black italic tracking-tighter text-black">{globalPlays.toLocaleString()}</p>
                </div>
                <Link href="/play/make" className="block w-full bg-black text-[#BCF139] text-center py-5 text-xl text-black uppercase shadow-[8px_8px_0px_#BCF139] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all border-2 border-[#BCF139] active:bg-[#BCF139] active:text-black">
                    Create Level +
                </Link>
            </div>
        </div>

        {/* LEADERBOARD LIST */}
        <div className="space-y-10">
          {sortedGames.length === 0 ? (
             <div className="bg-white border-[6px] border-black p-20 text-center shadow-[12px_12px_0px_black]">
                <Activity size={64} className="mx-auto mb-4 animate-bounce text-black" strokeWidth={3} />
                <p className="text-2xl text-black uppercase text-black italic">Archive Empty. Be the first.</p>
             </div>
          ) : sortedGames.map((game, i) => {
            const isTop = i === 0;
            return (
              <div 
                key={game.id} 
                className="group relative flex flex-col md:flex-row items-stretch bg-white border-[4px] border-black shadow-[10px_10px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                {/* RANK STICKER */}
                <div className={`md:w-28 w-full flex flex-col items-center justify-center text-6xl text-black italic border-b-[4px] md:border-b-0 md:border-r-[4px] border-black ${isTop ? 'bg-[#BCF139] text-black' : 'bg-[#F3F3F3] text-black'}`}>
                  <span className="text-[11px] text-black not-italic uppercase mb-1 opacity-40">Rank</span>
                  {i + 1}
                </div>

                {/* MAIN IDENTITY */}
                <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center gap-8">
                  <div className="relative shrink-0 hidden md:block">
                    <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 border border-[#BCF139]" />
                    {game.player_url ? (
                        <img src={game.player_url} className="relative w-20 h-20 border-[3px] border-black object-cover bg-white shadow-[4px_4px_0px_#BCF139]" alt="avatar" />
                    ) : (
                        <div className="relative w-20 h-20 border-[3px] border-black bg-gray-100 flex items-center justify-center shadow-[4px_4px_0px_#BCF139]">
                            <Trophy size={32} className="opacity-20 text-black" strokeWidth={3} />
                        </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-4xl text-black uppercase tracking-tighter truncate group-hover:text-blue-700 transition-colors text-black leading-none">
                            {game.creator || 'Anonymous'}
                        </h3>
                        {isTop && (
                            <span className="bg-black text-[#BCF139] text-[10px] text-black px-2 py-1 uppercase flex items-center gap-1 border border-[#BCF139]">
                                <Target size={12} strokeWidth={3} /> CHAMPION
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <span className="text-[10px] text-black bg-black text-[#BCF139] px-2 py-0.5 border border-[#BCF139] uppercase tracking-wider">Node_{game.id.slice(0,8)}</span>
                        {game.creator_social && (
                            <span className="text-[10px] text-black text-blue-700 uppercase border-b-2 border-blue-700 italic">@{game.creator_social.split('/').pop()}</span>
                        )}
                    </div>
                  </div>

                  {/* DATA MODULE */}
                  <div className="grid grid-cols-2 gap-10 md:px-8 border-t-[3px] md:border-t-0 md:border-l-[3px] border-black pt-6 md:pt-0">
                    <div className="min-w-[120px]">
                        <p className="text-[10px] text-black text-gray-500 uppercase tracking-widest mb-2 italic">Engagement</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl text-black leading-none text-black italic">{game.total_plays.toLocaleString()}</span>
                            <span className="text-[11px] text-black opacity-40 text-black uppercase">Runs</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 border-2 border-black mt-3 overflow-hidden shadow-[2px_2px_0px_black]">
                            <div className="h-full bg-black transition-all duration-1000 group-hover:bg-[#BCF139]" style={{ width: `${Math.min((game.total_plays / (globalPlays || 1)) * 100, 100)}%` }} />
                        </div>
                    </div>
                    <div className="min-w-[120px]">
                        <p className="text-[10px] text-black text-gray-500 uppercase tracking-widest mb-2 italic">Peak_Record</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl text-black text-[#BCF139] leading-none italic drop-shadow-[2px_2px_0px_black]" style={{ WebkitTextStroke: '1.5px black' }}>{game.high_score}</span>
                            <Trophy size={18} className="text-amber-500" strokeWidth={3} />
                        </div>
                    </div>
                  </div>
                </div>

                {/* BUTTONS STACK */}
                <div className="flex md:flex-col border-t-[4px] md:border-t-0 md:border-l-[4px] border-black w-full md:w-52">
                    <Link 
                        href={`/play?id=${game.id}`}
                        className="flex-1 flex flex-col items-center justify-center bg-[#BCF139] py-6 text-black text-black uppercase text-xs border-r-[4px] md:border-r-0 md:border-b-[4px] border-black hover:bg-black hover:text-[#BCF139] transition-all group/btn"
                    >
                        <Play size={24} fill="currentColor" strokeWidth={0} className="mb-1 transition-transform group-hover/btn:scale-110" />
                        Deploy Map
                    </Link>
                    <Link 
                        href={`/play/game?id=${game.id}`}
                        className="flex-1 flex flex-col items-center justify-center bg-white py-6 text-black text-black uppercase text-xs hover:bg-black hover:text-[#BCF139] transition-all group/btn"
                    >
                        <Activity size={22} className="mb-1 text-black group-hover/btn:text-[#BCF139]" strokeWidth={4} />
                        Analytics
                    </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* BRUTALIST FOOTER */}
        <footer className="mt-24 space-y-6">
            <div className="bg-black border-2 border-[#BCF139] text-[#BCF139] p-5 flex justify-between items-center border-b-[10px] shadow-[8px_8px_0px_black]">
                <div className="flex items-center gap-10 overflow-hidden whitespace-nowrap">
                    <p className="text-xs text-black uppercase tracking-[0.3em] flex items-center gap-3">
                        SYSTEM_HEALTHY <span className="w-3 h-3 bg-[#BCF139] rounded-full shadow-[0_0_8px_#BCF139]" />
                    </p>
                    <p className="text-xs text-black uppercase tracking-[0.3em] opacity-60 italic">TOTAL_NODES_ACTIVE: {games.length}</p>
                    <p className="text-xs text-black uppercase tracking-[0.3em] opacity-60 italic">GLOBAL_TOP_ARCHITECT: {sortedGames[0]?.creator}</p>
                </div>
                <p className="text-[11px] text-black uppercase tracking-widest hidden md:block text-[#BCF139]">v3.0.4_PROD</p>
            </div>
            <p className="text-center text-[11px] text-black uppercase text-gray-500 tracking-widest italic">
                © 2025 KLAZ_RUNNER . GLOBAL_ARCHIVE_DEPLOYMENT_AUTHORIZED
            </p>
        </footer>
      </div>
    </div>
  );
}