import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Play, Plus, Activity, Zap, Globe, Target } from 'lucide-react';

export const dynamic = 'force-dynamic';

// STYLES SYSTEM
const UI = {
  h1: "text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] uppercase tracking-tighter italic font-black leading-[0.8] text-black",
  h2: "text-4xl md:text-5xl uppercase italic tracking-tighter font-black text-black",
  h3: "text-3xl md:text-6xl uppercase tracking-tighter italic font-black text-black",
  label: "text-[10px] md:text-xs uppercase tracking-[0.2em] font-black text-black",
  mono: "font-mono font-black text-[10px] uppercase tracking-widest text-black",
  cardShadow: "shadow-[8px_8px_0px_0px_#000] md:shadow-[16px_16px_0px_0px_#000]",
};

export default async function ExploreGames() {
  const games = await getAllGames();
  const sortedGames = [...games].sort((a, b) => b.total_plays - a.total_plays);
  const globalPlays = games.reduce((acc, g) => acc + g.total_plays, 0);

  return (
    <div className="min-h-screen w-full bg-[#EAEAEA] text-black font-black selection:bg-black selection:text-[#BCF139] overflow-x-hidden leading-none">
      {/* INDUSTRIAL DOT GRID */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1.5px, transparent 1.5px)`, backgroundSize: '24px 24px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* NAV BAR */}
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b-[10px] border-black pb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-black p-2 border-4 border-[#BCF139] shadow-[4px_4px_0px_black]">
                <Zap className="text-[#BCF139] w-7 h-7" fill="currentColor" />
            </div>
            <div>
                <h2 className="text-xl md:text-2xl uppercase tracking-tighter text-black">KLAZ_ARCHIVE_v3.0</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="w-3 h-3 bg-[#BCF139] border-2 border-black animate-pulse" />
                    <p className={UI.mono}>NETWORK_ACTIVE</p>
                </div>
            </div>
          </div>
          <Link href="/play/make" className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 group">
            <span className="text-sm uppercase border-b-[6px] border-black group-hover:bg-black group-hover:text-[#BCF139] transition-all px-2 py-1 text-black">REGISTER_NODE</span>
            <div className="bg-[#BCF139] border-[6px] border-black p-3 shadow-[5px_5px_0px_black] group-hover:rotate-180 transition-transform duration-500">
                <Plus className="w-7 h-7 text-black" strokeWidth={8} />
            </div>
          </Link>
        </nav>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-end">
            <div className="lg:col-span-8">
                <h1 className={UI.h1}>
                    HALL OF<br/>
                    <span className="text-[#BCF139] drop-shadow-[4px_4px_0px_black]" style={{ WebkitTextStroke: '3px black' }}>GLORY</span>
                </h1>
            </div>
            <div className="lg:col-span-4 space-y-8">
                <div className={`bg-white border-[8px] border-black p-8 ${UI.cardShadow} -rotate-1`}>
                    <div className="flex justify-between items-center mb-6">
                        <span className={UI.label}>TRAFFIC_FEED</span>
                        <Globe size={32} className="text-black" strokeWidth={5} />
                    </div>
                    <p className="text-6xl md:text-8xl italic font-black text-black leading-none tracking-tighter">
                      {globalPlays.toLocaleString()}
                    </p>
                </div>
                <Link href="/play/make" className="block w-full bg-black text-[#BCF139] text-center py-8 text-3xl md:text-5xl font-black uppercase border-[6px] border-[#BCF139] shadow-[10px_10px_0px_black] hover:bg-[#BCF139] hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                    CREATE_LEVEL +
                </Link>
            </div>
        </div>

        {/* CARDS LIST */}
        <div className="space-y-16">
          {sortedGames.map((game, i) => (
            <GameCard key={game.id} game={game} rank={i + 1} />
          ))}
        </div>

        {/* FOOTER */}
        <footer className="mt-40 space-y-10">
            <div className="bg-black border-[6px] border-[#BCF139] text-[#BCF139] p-10 flex flex-col md:flex-row justify-between items-center border-b-[20px] shadow-[12px_12px_0px_black] gap-6">
                <div className="flex items-center gap-8 whitespace-nowrap italic tracking-[0.4em] text-xs font-black uppercase overflow-hidden">
                    <span className="flex items-center gap-4">SYSTEM_STATUS: OPTIMAL <span className="w-4 h-4 bg-[#BCF139] border-2 border-black" /></span>
                    <span className="text-[#BCF139] opacity-50">||</span>
                    <span>NODES_ACTIVE: {games.length}</span>
                </div>
                <span className="text-xs tracking-[0.3em] uppercase italic bg-[#BCF139] text-black px-4 py-2 border-2 border-black font-black">
                  DEPLOY_v3.0.4_STABLE
                </span>
            </div>
            <p className="text-center text-[10px] uppercase text-black font-black tracking-[0.6em] italic pb-10">
              © 2025 KLAZ_RUNNER_GLOBAL_ARCHIVE
            </p>
        </footer>
      </div>
    </div>
  );
}

/* SUB-COMPONENT: GAME CARD */
function GameCard({ game, rank }: { game: any, rank: number }) {
  const isTop = rank === 1;
  
  return (
    <div className={`group relative flex flex-col lg:flex-row items-stretch bg-white border-[8px] border-black ${UI.cardShadow} hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-300`}>
      
      {/* RANK */}
      <div className={`lg:w-40 w-full flex flex-row lg:flex-col items-center justify-between lg:justify-center p-8 lg:p-0 text-7xl md:text-9xl italic border-b-[8px] lg:border-b-0 lg:border-r-[8px] border-black font-black text-black ${isTop ? 'bg-[#BCF139]' : 'bg-[#D1D1D1]'}`}>
        <span className="text-xs not-italic uppercase tracking-[0.3em] font-black">RANK</span>
        {rank}
      </div>

      {/* IDENTITY */}
      <div className="flex-1 p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-10">
        <div className="shrink-0 hidden sm:block relative">
          <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 border-2 border-[#BCF139]" />
          {game.player_url ? (
            <img src={game.player_url} className="relative w-24 h-24 md:w-32 md:h-32 border-[6px] border-black object-cover bg-white" alt="avatar" />
          ) : (
            <div className="relative w-24 h-24 md:w-32 md:h-32 border-[6px] border-black bg-[#EAEAEA] flex items-center justify-center">
              <Trophy className="w-12 h-12 text-black" strokeWidth={6} />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <h3 className={`${UI.h3} group-hover:underline decoration-[10px] decoration-[#BCF139] underline-offset-8`}>
              {game.creator || 'ANON_USER'}
            </h3>
            {isTop && (
              <div className="bg-black text-[#BCF139] text-xs px-4 py-2 uppercase flex items-center gap-3 border-4 border-[#BCF139] font-black">
                <Target size={18} strokeWidth={8} /> CHAMPION_NODE
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            <span className="text-xs bg-black text-[#BCF139] px-3 py-1 border-2 border-[#BCF139] uppercase italic font-black">
              UUID_{game.id.slice(0,8)}
            </span>
            {game.creator_social && (
              <span className="text-xs text-black uppercase border-b-[4px] border-black italic font-black group-hover:bg-[#BCF139] transition-colors">
                @{game.creator_social.split('/').pop()}
              </span>
            )}
          </div>
        </div>

        {/* DATA */}
        <div className="grid grid-cols-2 gap-10 md:px-10 lg:border-l-[6px] border-black pt-8 md:pt-0">
          <div className="min-w-[140px]">
            <p className={UI.label}>ENGAGEMENT</p>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-5xl md:text-6xl italic font-black text-black leading-none">
                {game.total_plays.toLocaleString()}
              </span>
              <span className="text-xs font-black text-black italic">RUNS</span>
            </div>
          </div>
          <div className="min-w-[140px]">
            <p className={UI.label}>PEAK_SCORE</p>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-5xl md:text-7xl text-[#BCF139] italic font-black leading-none" style={{ WebkitTextStroke: '2.5px black' }}>
                {game.high_score}
              </span>
              <Trophy className="w-8 h-8 text-black" strokeWidth={5} />
            </div>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-row lg:flex-col border-t-[8px] lg:border-t-0 lg:border-l-[8px] border-black w-full lg:w-60">
        <Link href={`/play?id=${game.id}`} className="flex-1 flex flex-col items-center justify-center bg-[#BCF139] py-8 text-black uppercase text-sm font-black border-r-[8px] lg:border-r-0 lg:border-b-[8px] border-black hover:bg-black hover:text-[#BCF139] transition-all group/btn">
          <Play className="w-10 h-10 mb-2 group-hover/btn:scale-125 transition-transform" fill="currentColor" />
          DEPLOY_RUN
        </Link>
        <Link href={`/play/game?id=${game.id}`} className="flex-1 flex flex-col items-center justify-center bg-white py-8 text-black uppercase text-sm font-black hover:bg-black hover:text-[#BCF139] transition-all group/btn">
          <Activity className="w-10 h-10 mb-2" strokeWidth={6} />
          TELEMETRY
        </Link>
      </div>
    </div>
  );
}