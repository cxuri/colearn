import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Archivo_Black, Space_Mono } from 'next/font/google';
import { Trophy, Play, Plus, Activity, Zap, Globe, Target, ArrowDownRight } from 'lucide-react';

const archivo = Archivo_Black({ weight: '400', subsets: ['latin'] });
const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });

export const dynamic = 'force-dynamic';

export default async function ExploreGames() {
  const games = await getAllGames();
  const sortedGames = [...games].sort((a, b) => b.total_plays - a.total_plays);
  const globalPlays = games.reduce((acc, g) => acc + g.total_plays, 0);

  return (
    <div className={`min-h-screen w-full bg-[#F0F2F5] text-black ${archivo.className} selection:bg-[#FBBF24] selection:text-black overflow-x-hidden leading-none`}
         style={{ backgroundImage: 'radial-gradient(#94A3B8 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12">
        
        {/* NAV BAR */}
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 border-b-4 border-black pb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-black p-2 border-2 border-[#FBBF24] shadow-[4px_4px_0px_black]">
                <Zap className="text-[#FBBF24] w-6 h-6" fill="currentColor" />
            </div>
            <div>
                <h2 className="text-xl uppercase tracking-tighter text-black">KLAZ_ARCHIVE</h2>
                <div className={`flex items-center gap-2 mt-1 ${mono.className}`}>
                    <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">SYSTEM_LIVE</p>
                </div>
            </div>
          </div>
          <Link href="/play/make" className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 group">
            <span className={`text-xs uppercase border-b-2 border-black group-hover:bg-black group-hover:text-[#FBBF24] transition-all px-2 py-1 ${mono.className}`}>Register_Node</span>
            <div className="bg-[#FBBF24] border-2 border-black p-2 shadow-[3px_3px_0px_black] group-hover:rotate-180 transition-transform duration-500">
                <Plus className="w-6 h-6 text-black" strokeWidth={4} />
            </div>
          </Link>
        </nav>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-end">
            <div className="lg:col-span-8">
                <h1 className="text-[12vw] md:text-[8vw] uppercase leading-[0.85] tracking-tighter text-black">
                    HALL OF<br/>
                    <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>GLORY</span>
                </h1>
            </div>
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                    <div className={`flex justify-between items-center mb-4 ${mono.className}`}>
                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">TRAFFIC_FEED</span>
                        <Globe size={20} className="text-blue-600" strokeWidth={3} />
                    </div>
                    <p className="text-5xl md:text-6xl font-black italic text-black leading-none">{globalPlays.toLocaleString()}</p>
                </div>
                <Link href="/play/make" className="group flex items-center justify-center gap-3 w-full bg-black text-[#FBBF24] py-6 text-2xl font-black uppercase border-4 border-black shadow-[8px_8px_0px_0px_#FBBF24] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                    Create Level <ArrowDownRight className="group-hover:-rotate-90 transition-transform" />
                </Link>
            </div>
        </div>

        {/* CARDS LIST */}
        <div className="space-y-12">
          {sortedGames.map((game, i) => (
            <GameCard key={game.id} game={game} rank={i + 1} />
          ))}
        </div>

        {/* FOOTER */}
        <footer className="mt-40 space-y-8">
            <div className="bg-black border-2 border-[#FBBF24] text-[#FBBF24] p-8 flex flex-col md:flex-row justify-between items-center shadow-[8px_8px_0px_black] gap-6">
                <div className={`flex items-center gap-8 whitespace-nowrap italic tracking-[0.2em] text-[10px] uppercase overflow-hidden ${mono.className}`}>
                    <span className="flex items-center gap-3">OPTIMAL_STATUS <span className="w-3 h-3 bg-[#10B981] rounded-full shadow-[0_0_8px_#10B981]" /></span>
                    <span className="opacity-30">||</span>
                    <span>NODES_ACTIVE: {games.length}</span>
                </div>
                <span className={`text-[10px] tracking-widest uppercase italic bg-[#FBBF24] text-black px-3 py-1 font-bold ${mono.className}`}>
                  v3.0.4_STABLE
                </span>
            </div>
            <p className={`text-center text-[9px] uppercase text-gray-500 font-bold tracking-[0.5em] italic pb-10 ${mono.className}`}>
              © 2025 KLAZ_RUNNER_PROTOCOL
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
    <div className="group relative flex flex-col lg:flex-row items-stretch bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
      
      {/* RANK SECTION */}
      <div className={`lg:w-32 w-full flex flex-row lg:flex-col items-center justify-between lg:justify-center p-6 lg:p-0 text-6xl md:text-7xl italic border-b-4 lg:border-b-0 lg:border-r-4 border-black font-black ${isTop ? 'bg-[#FBBF24]' : 'bg-[#F0F2F5]'}`}>
        <span className={`text-[10px] not-italic uppercase font-bold opacity-40 ${mono.className}`}>Rank</span>
        {rank}
      </div>

      {/* IDENTITY SECTION */}
      <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-8">
        <div className="shrink-0 hidden sm:block relative">
          <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 border-2 border-[#FBBF24]" />
          {game.player_url ? (
            <img src={game.player_url} className="relative w-20 h-20 border-4 border-black object-cover bg-white" alt="avatar" />
          ) : (
            <div className="relative w-20 h-20 border-4 border-black bg-[#F0F2F5] flex items-center justify-center">
              <Trophy className="w-8 h-8 text-black/20" strokeWidth={3} />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h3 className="text-3xl md:text-5xl uppercase tracking-tighter truncate group-hover:text-[#FBBF24] transition-colors">
              {game.creator || 'ANON_USER'}
            </h3>
            {isTop && (
              <div className={`bg-black text-[#FBBF24] text-[10px] px-2 py-1 uppercase flex items-center gap-2 border-2 border-black font-bold ${mono.className}`}>
                <Target size={12} strokeWidth={4} /> Champion
              </div>
            )}
          </div>
          <div className={`flex flex-wrap gap-4 ${mono.className}`}>
            <span className="text-[10px] bg-black text-white px-2 py-0.5 uppercase font-bold">NODE_{game.id.slice(0,8)}</span>
            {game.creator_social && (
              <span className="text-[10px] text-black font-bold uppercase border-b-2 border-black">@{game.creator_social.split('/').pop()}</span>
            )}
          </div>
        </div>

        {/* DATA SECTION */}
        <div className={`grid grid-cols-2 gap-8 md:px-8 lg:border-l-2 border-black pt-6 md:pt-0 ${mono.className}`}>
          <div className="min-w-[100px]">
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Engagement</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black">{game.total_plays.toLocaleString()}</span>
              <span className="text-[10px] font-bold opacity-40">RUNS</span>
            </div>
          </div>
          <div className="min-w-[100px]">
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Peak_Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl text-[#FBBF24] font-black" style={{ WebkitTextStroke: '1px black' }}>{game.high_score}</span>
              <Trophy className="w-5 h-5 text-black" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>

      {/* ACTION SECTION */}
      <div className={`flex flex-row lg:flex-col border-t-4 lg:border-t-0 lg:border-l-4 border-black w-full lg:w-48 ${mono.className}`}>
        <Link href={`/play?id=${game.id}`} className="flex-1 flex flex-col items-center justify-center bg-[#FBBF24] py-6 text-black uppercase text-xs font-bold border-r-4 lg:border-r-0 lg:border-b-4 border-black hover:bg-black hover:text-[#FBBF24] transition-all group/btn">
          <Play className="w-6 h-6 mb-1 group-hover/btn:scale-110 transition-transform" fill="currentColor" />
          Deploy
        </Link>
        <Link href={`/play/game?id=${game.id}`} className="flex-1 flex flex-col items-center justify-center bg-white py-6 text-black uppercase text-xs font-bold hover:bg-black hover:text-[#FBBF24] transition-all group/btn">
          <Activity className="w-6 h-6 mb-1" strokeWidth={3} />
          Telemetry
        </Link>
      </div>
    </div>
  );
}