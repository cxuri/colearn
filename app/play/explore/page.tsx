import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Archivo_Black, Space_Mono } from 'next/font/google';
import { Trophy, Play, Plus, Activity, Zap, Globe, Target, ArrowDownRight } from 'lucide-react';

const archivo = Archivo_Black({ weight: '400', subsets: ['latin'] });
const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });

export default async function ExploreGames() {
  const games = await getAllGames();
  const sortedGames = [...games].sort((a, b) => b.total_plays - a.total_plays);
  const globalPlays = games.reduce((acc, g) => acc + g.total_plays, 0);

  return (
    <div className={`min-h-screen w-full bg-[#F0F2F5] text-black ${archivo.className} selection:bg-[#FBBF24] selection:text-black overflow-x-hidden leading-none`}
         style={{ backgroundImage: 'radial-gradient(#94A3B8 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        
        {/* NAV BAR */}
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16 border-b-4 border-black pb-6 md:pb-8 gap-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-black p-2 border-2 border-[#FBBF24] shadow-[3px_3px_0px_black]">
                <Zap className="text-[#FBBF24] w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
            </div>
            <div>
                <h2 className="text-lg md:text-xl uppercase tracking-tighter text-black">KLAZ_ARCHIVE</h2>
                <div className={`flex items-center gap-2 mt-0.5 ${mono.className}`}>
                    <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">SYSTEM_LIVE</p>
                </div>
            </div>
          </div>
          <Link href="/play/make" className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 group">
            <span className={`text-[10px] md:text-xs uppercase border-b-2 border-black group-hover:bg-black group-hover:text-[#FBBF24] transition-all px-1 py-1 ${mono.className}`}>Register_Node</span>
            <div className="bg-[#FBBF24] border-2 border-black p-2 shadow-[3px_3px_0px_black] group-hover:rotate-180 transition-transform duration-500">
                <Plus className="w-5 h-5 md:w-6 md:h-6 text-black" strokeWidth={4} />
            </div>
          </Link>
        </nav>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24 items-end">
            <div className="lg:col-span-8">
                <h1 className="text-[14vw] md:text-[8vw] uppercase leading-[0.85] tracking-tighter text-black">
                    HALL OF<br/>
                    <span className="text-transparent" style={{ WebkitTextStroke: '1.2px black' }}>GLORY</span>
                </h1>
            </div>
            <div className="lg:col-span-4 space-y-5 md:space-y-6">
                <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                    <div className={`flex justify-between items-center mb-3 ${mono.className}`}>
                        <span className="text-[9px] md:text-[10px] font-bold uppercase text-gray-400 tracking-widest">TRAFFIC_FEED</span>
                        <Globe size={18} className="text-blue-600" strokeWidth={3} />
                    </div>
                    <p className="text-4xl md:text-6xl font-black italic text-black leading-none">{globalPlays.toLocaleString()}</p>
                </div>
                <Link href="/play/make" className="group flex items-center justify-center gap-3 w-full bg-black text-[#FBBF24] py-5 md:py-6 text-xl md:text-2xl font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_#FBBF24] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                    Create Level <ArrowDownRight size={20} className="group-hover:-rotate-90 transition-transform" />
                </Link>
            </div>
        </div>

        {/* CARDS LIST */}
        <div className="space-y-10 md:space-y-12">
          {sortedGames.map((game, i) => (
            <GameCard key={game.id} game={game} rank={i + 1} />
          ))}
        </div>
        
        {/* FOOTER ... */}
      </div>
    </div>
  );
}

/* IMPROVED SUB-COMPONENT: GameCard */
function GameCard({ game, rank }: { game: any, rank: number }) {
  const isTop = rank === 1;
  
  return (
    <div className="group relative flex flex-col lg:flex-row items-stretch bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
      
      {/* RANK SECTION - Redesigned for mobile as a header/badge */}
      <div className={`
        lg:w-32 w-full flex flex-row lg:flex-col items-center justify-between lg:justify-center 
        px-5 py-3 lg:p-0 border-b-4 lg:border-b-0 lg:border-r-4 border-black font-black
        ${isTop ? 'bg-[#FBBF24]' : 'bg-[#F0F2F5]'}
      `}>
        <span className={`text-[9px] lg:text-[10px] not-italic uppercase font-bold opacity-60 ${mono.className}`}>Rank</span>
        <span className="text-4xl lg:text-7xl italic leading-none">{rank}</span>
      </div>

      {/* IDENTITY SECTION - Icon is now visible on mobile */}
      <div className="flex-1 p-5 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
        <div className="flex items-center gap-4 md:block shrink-0">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 border border-[#FBBF24]" />
            {game.player_url ? (
              <img src={game.player_url} className="relative w-14 h-14 md:w-20 md:h-20 border-2 md:border-4 border-black object-cover bg-white" alt="avatar" />
            ) : (
              <div className="relative w-14 h-14 md:w-20 md:h-20 border-2 md:border-4 border-black bg-[#F0F2F5] flex items-center justify-center">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-black/20" strokeWidth={3} />
              </div>
            )}
          </div>
          
          {/* Mobile-only name display next to icon for better vertical space usage */}
          <div className="md:hidden flex-1 min-w-0">
              <h3 className="text-2xl uppercase tracking-tighter truncate leading-none">
                {game.creator || 'ANON_USER'}
              </h3>
              <p className={`text-[9px] mt-1 bg-black text-white px-1.5 py-0.5 inline-block uppercase font-bold ${mono.className}`}>
                NODE_{game.id.slice(0,8)}
              </p>
          </div>
        </div>
        
        <div className="hidden md:block flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <h3 className="text-3xl text-black md:text-5xl uppercase tracking-tighter truncate group-hover:text-[#FBBF24] transition-colors">
              {game.creator || 'ANON_USER'}
            </h3>
            {isTop && (
              <div className={`bg-black text-[#FBBF24] text-[9px] px-2 py-1 uppercase flex items-center gap-2 border-2 border-black font-bold ${mono.className}`}>
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

        {/* DATA SECTION - Stacks slightly better on mobile */}
        <div className={`grid grid-cols-2 gap-4 md:gap-8 md:px-8 lg:border-l-2 border-black pt-4 md:pt-0 border-t-2 md:border-t-0 border-dashed ${mono.className}`}>
          <div className="min-w-[80px]">
            <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-bold mb-1">Runs</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-black leading-none">{game.total_plays.toLocaleString()}</span>
            </div>
          </div>
          <div className="min-w-[80px]">
            <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-bold mb-1">Peak</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-4xl text-[#FBBF24] font-black leading-none" style={{ WebkitTextStroke: '1px black' }}>{game.high_score}</span>
              <Trophy size={14} className="text-black hidden md:block" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>

      {/* ACTION SECTION - Thumb-friendly buttons on mobile */}
      <div className={`flex flex-row lg:flex-col border-t-4 lg:border-t-0 lg:border-l-4 border-black w-full lg:w-48 ${mono.className}`}>
        <Link href={`/play?id=${game.id}`} className="flex-1 flex items-center justify-center gap-3 lg:flex-col bg-[#FBBF24] py-4 lg:py-6 text-black uppercase text-xs font-bold border-r-4 lg:border-r-0 lg:border-b-4 border-black hover:bg-black hover:text-[#FBBF24] transition-all group/btn">
          <Play className="w-5 h-5 md:w-6 md:h-6 group-hover/btn:scale-110 transition-transform" fill="currentColor" />
          <span>Deploy</span>
        </Link>
        <Link href={`/play/game?id=${game.id}`} className="flex-1 flex items-center justify-center gap-3 lg:flex-col bg-white py-4 lg:py-6 text-black uppercase text-xs font-bold hover:bg-black hover:text-[#FBBF24] transition-all group/btn">
          <Activity className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
          <span>Telemetry</span>
        </Link>
      </div>
    </div>
  );
}