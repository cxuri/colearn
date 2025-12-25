import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Users, Play, Plus, Activity, ChevronRight, Zap, Globe, Target } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExploreGames() {
  const games = await getAllGames();
  const sortedGames = [...games].sort((a, b) => b.total_plays - a.total_plays);
  const globalPlays = games.reduce((acc, g) => acc + g.total_plays, 0);

  return (
    <div className="min-h-screen w-full bg-[#EAEAEA] text-black font-sans selection:bg-black selection:text-[#BCF139] pb-20">
      {/* INDUSTRIAL GRID BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-[0.08] pointer-events-none" 
           style={{ 
             backgroundImage: `radial-gradient(#000 1.2px, transparent 1.2px)`, 
             backgroundSize: '24px 24px' 
           }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        
        {/* TOP NAVIGATION BAR */}
        <nav className="flex justify-between items-center mb-16 border-b-4 border-black pb-6">
          <div className="flex items-center gap-4">
            <div className="bg-black p-2 shadow-[3px_3px_0px_#BCF139]">
                <Zap className="text-[#BCF139]" fill="currentColor" size={20} />
            </div>
            <div className="leading-none">
                <h2 className="text-sm text-black uppercase tracking-tighter">Klaz_Archive_v3.0</h2>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Network_Live</p>
                </div>
            </div>
          </div>
          <Link href="/play/make" className="hidden md:flex items-center gap-3 group">
            <span className="text-xs text-black uppercase group-hover:underline underline-offset-4">Register New Map</span>
            <div className="bg-[#BCF139] border-2 border-black p-1 group-hover:rotate-90 transition-transform">
                <Plus size={16} strokeWidth={3} />
            </div>
          </Link>
        </nav>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
            <div className="lg:col-span-8">
                <h1 className="text-7xl md:text-9xl font-[1000] uppercase leading-[0.75] tracking-tighter italic">
                    HALL OF<br/>
                    <span className="text-[#BCF139] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ WebkitTextStroke: '2px black' }}>GLORY</span>
                </h1>
            </div>
            <div className="lg:col-span-4 space-y-4">
                <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_black] rotate-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-black uppercase text-gray-400">Platform_Traffic</span>
                        <Globe size={14} className="text-blue-500" />
                    </div>
                    <p className="text-3xl text-black italic tracking-tighter">{globalPlays.toLocaleString()}</p>
                </div>
                <Link href="/play/make" className="block w-full bg-black text-[#BCF139] text-center py-5 text-xl text-black uppercase shadow-[8px_8px_0px_#BCF139] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    Create Level +
                </Link>
            </div>
        </div>

        {/* LEADERBOARD LIST */}
        <div className="space-y-10">
          {sortedGames.length === 0 ? (
             <div className="bg-white border-4 border-black p-20 text-center shadow-[12px_12px_0px_black]">
                <Activity size={48} className="mx-auto mb-4 animate-bounce" />
                <p className="text-xl text-black uppercase">Archive Empty. Be the first.</p>
             </div>
          ) : sortedGames.map((game, i) => {
            const isTop = i === 0;
            return (
              <div 
                key={game.id} 
                className="group relative flex flex-col md:flex-row items-stretch bg-white border-4 border-black shadow-[10px_10px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                {/* RANK STICKER */}
                <div className={`md:w-24 w-full flex flex-col items-center justify-center text-5xl font-[1000] italic border-b-4 md:border-b-0 md:border-r-4 border-black ${isTop ? 'bg-[#BCF139]' : 'bg-[#F3F3F3]'}`}>
                  <span className="text-[10px] text-black not-italic uppercase mb-1 opacity-40">Rank</span>
                  {i + 1}
                </div>

                {/* MAIN IDENTITY */}
                <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center gap-8">
                  <div className="relative shrink-0 hidden md:block">
                    <div className="absolute inset-0 bg-black translate-x-1 translate-y-1" />
                    {game.player_url ? (
                        <img src={game.player_url} className="relative w-16 h-16 border-2 border-black object-cover bg-white" alt="avatar" />
                    ) : (
                        <div className="relative w-16 h-16 border-2 border-black bg-gray-100 flex items-center justify-center">
                            <Trophy size={24} className="opacity-20" />
                        </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-[1000] uppercase tracking-tighter truncate group-hover:text-blue-600 transition-colors">
                            {game.creator || 'Anonymous'}
                        </h3>
                        {isTop && (
                            <span className="bg-black text-[#BCF139] text-[9px] text-black px-2 py-0.5 uppercase flex items-center gap-1">
                                <Target size={10} /> Champion
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-1.5">
                            <span className="text-[9px] text-black bg-gray-100 px-2 py-0.5 border border-black uppercase">Node_{game.id.slice(0,8)}</span>
                        </div>
                        {game.creator_social && (
                            <span className="text-[9px] text-black text-blue-600 uppercase border-b border-blue-600">@{game.creator_social.split('/').pop()}</span>
                        )}
                    </div>
                  </div>

                  {/* DATA MODULE */}
                  <div className="grid grid-cols-2 gap-8 md:px-8 border-t-2 md:border-t-0 md:border-l-2 border-black/10 pt-6 md:pt-0">
                    <div className="min-w-[100px]">
                        <p className="text-[9px] text-black text-gray-400 uppercase tracking-widest mb-1 italic">Engagement</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl text-black leading-none">{game.total_plays.toLocaleString()}</span>
                            <span className="text-[10px] font-bold opacity-30">Sessions</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 border border-black mt-2 overflow-hidden">
                            <div className="h-full bg-black transition-all duration-1000 group-hover:bg-[#BCF139]" style={{ width: `${Math.min((game.total_plays / (globalPlays || 1)) * 100, 100)}%` }} />
                        </div>
                    </div>
                    <div className="min-w-[100px]">
                        <p className="text-[9px] text-black text-gray-400 uppercase tracking-widest mb-1 italic">Peak_Score</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl text-black text-[#BCF139] leading-none" style={{ WebkitTextStroke: '1px black' }}>{game.high_score}</span>
                            <Trophy size={14} className="text-amber-500" />
                        </div>
                    </div>
                  </div>
                </div>

                {/* BUTTONS STACK */}
                <div className="flex md:flex-col border-t-4 md:border-t-0 md:border-l-4 border-black w-full md:w-48">
                    <Link 
                        href={`/play?id=${game.id}`}
                        className="flex-1 flex flex-col items-center justify-center bg-[#BCF139] py-5 text-black text-black uppercase text-xs border-r-4 md:border-r-0 md:border-b-4 border-black hover:bg-black hover:text-white transition-all group/btn"
                    >
                        <Play size={20} fill="currentColor" strokeWidth={0} className="mb-1" />
                        Deploy Map
                    </Link>
                    <Link 
                        href={`/play/game?id=${game.id}`}
                        className="flex-1 flex flex-col items-center justify-center bg-white py-5 text-black text-black uppercase text-xs hover:bg-gray-100 transition-all"
                    >
                        <Activity size={18} className="mb-1" />
                        Analytics
                    </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* BRUTALIST FOOTER */}
        <footer className="mt-24 space-y-6">
            <div className="bg-black text-white p-4 flex justify-between items-center border-b-8 border-[#BCF139]">
                <div className="flex items-center gap-10 overflow-hidden whitespace-nowrap">
                    <p className="text-xs text-black uppercase tracking-[0.3em] flex items-center gap-2">
                        System_Healthy <span className="w-2 h-2 bg-green-500 rounded-full" />
                    </p>
                    <p className="text-xs text-black uppercase tracking-[0.3em] opacity-40 italic">Total_Nodes_Active: {games.length}</p>
                    <p className="text-xs text-black uppercase tracking-[0.3em] opacity-40 italic">Global_Top_Architect: {sortedGames[0]?.creator}</p>
                </div>
                <p className="text-[10px] text-black uppercase tracking-widest hidden md:block">v3.0.4_LATEST</p>
            </div>
            <p className="text-center text-[10px] text-black uppercase text-gray-400 tracking-widest">© 2025 KLAZ_RUNNER . GLOBAL_ARCHIVE_DEPLOYMENT</p>
        </footer>
      </div>
    </div>
  );
}