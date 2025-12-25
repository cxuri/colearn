import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Play, Plus, Activity, Zap, Globe, Target } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExploreGames() {
  const games = await getAllGames();
  const sortedGames = [...games].sort((a, b) => b.total_plays - a.total_plays);
  const globalPlays = games.reduce((acc, g) => acc + g.total_plays, 0);

  return (
    <div className="min-h-screen w-full bg-[#EAEAEA] text-black font-black selection:bg-black selection:text-[#BCF139] overflow-x-hidden leading-none">
      {/* INDUSTRIAL DOT GRID */}
      <div className="fixed inset-0 z-0 opacity-[0.12] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1.2px, transparent 1.2px)`, backgroundSize: '24px 24px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* NAV BAR */}
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b-8 border-black pb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-black p-2 border-4 border-[#BCF139] shadow-[4px_4px_0px_black]">
                <Zap className="text-[#BCF139] w-6 h-6" fill="currentColor" />
            </div>
            <div>
                <h2 className="text-lg md:text-xl uppercase tracking-tighter">KLAZ_ARCHIVE_v3.0</h2>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_red]" />
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">NETWORK_CONNECTED</p>
                </div>
            </div>
          </div>
          <Link href="/play/make" className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4 group">
            <span className="text-xs uppercase border-b-4 border-black group-hover:bg-black group-hover:text-[#BCF139] transition-all px-2 py-1">REGISTER_NODE</span>
            <div className="bg-[#BCF139] border-4 border-black p-2 shadow-[3px_3px_0px_black] group-hover:rotate-180 transition-transform duration-500">
                <Plus className="w-6 h-6 text-black" strokeWidth={6} />
            </div>
          </Link>
        </nav>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-end">
            <div className="lg:col-span-8">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] uppercase tracking-tighter italic break-words leading-[0.8]">
                    HALL OF<br/>
                    <span className="text-[#BCF139] drop-shadow-[2px_2px_0px_black]" style={{ WebkitTextStroke: '2px md:4px black' }}>GLORY</span>
                </h1>
            </div>
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-white border-8 border-black p-8 shadow-[8px_8px_0px_black] -rotate-1">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] uppercase text-gray-400 tracking-widest">TRAFFIC_FEED</span>
                        <Globe size={24} className="text-blue-600" strokeWidth={4} />
                    </div>
                    <p className="text-5xl md:text-7xl italic leading-none">{globalPlays.toLocaleString()}</p>
                </div>
                <Link href="/play/make" className="block w-full bg-black text-[#BCF139] text-center py-6 text-3xl md:text-4xl uppercase border-4 border-[#BCF139] shadow-[8px_8px_0px_black] hover:bg-[#BCF139] hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                    CREATE_LEVEL +
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
        <footer className="mt-32 space-y-8">
            <div className="bg-black border-4 border-[#BCF139] text-[#BCF139] p-8 flex flex-col md:flex-row justify-between items-center border-b-[15px] shadow-[8px_8px_0px_black] gap-4">
                <div className="flex items-center gap-6 whitespace-nowrap italic tracking-[0.3em] text-[10px] uppercase overflow-hidden">
                    <span className="flex items-center gap-2">SYSTEM_OPTIMAL <span className="w-3 h-3 bg-[#BCF139] rounded-full shadow-[0_0_10px_#BCF139]" /></span>
                    <span className="opacity-30">||</span>
                    <span>NODES_ACTIVE: {games.length}</span>
                </div>
                <span className="text-[10px] tracking-widest uppercase italic bg-[#BCF139] text-black px-2 py-0.5">DEPLOY_v3.0.4_STABLE</span>
            </div>
            <p className="text-center text-[9px] uppercase text-gray-500 tracking-[0.5em] italic">© 2025 KLAZ_RUNNER_GLOBAL_ARCHIVE</p>
        </footer>
      </div>
    </div>
  );
}

/* SUB-COMPONENT: GAME CARD */
function GameCard({ game, rank }: { game: any, rank: number }) {
  const isTop = rank === 1;
  
  return (
    <div className="group relative flex flex-col lg:flex-row items-stretch bg-white border-8 border-black shadow-[10px_10px_0px_black] md:shadow-[18px_18px_0px_black] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-300">
      
      {/* RANK */}
      <div className={`lg:w-36 w-full flex flex-row lg:flex-col items-center justify-between lg:justify-center p-6 lg:p-0 text-6xl md:text-8xl italic border-b-8 lg:border-b-0 lg:border-r-8 border-black ${isTop ? 'bg-[#BCF139]' : 'bg-gray-100'}`}>
        <span className="text-xs not-italic uppercase opacity-50 tracking-widest">RANK</span>
        {rank}
      </div>

      {/* IDENTITY */}
      <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-8">
        <div className="shrink-0 hidden sm:block relative">
          <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 border-2 border-[#BCF139]" />
          {game.player_url ? (
            <img src={game.player_url} className="relative w-20 h-20 md:w-28 md:h-28 border-4 border-black object-cover bg-white" alt="avatar" />
          ) : (
            <div className="relative w-20 h-20 md:w-28 md:h-28 border-4 border-black bg-gray-200 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-black/20" strokeWidth={4} />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h3 className="text-4xl md:text-6xl uppercase tracking-tighter truncate italic group-hover:underline decoration-8 decoration-[#BCF139]">
              {game.creator || 'ANON_USER'}
            </h3>
            {isTop && (
              <div className="bg-black text-[#BCF139] text-[10px] px-3 py-1 uppercase flex items-center gap-2 border-2 border-[#BCF139]">
                <Target size={14} strokeWidth={6} /> CHAMPION
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            <span className="text-[10px] bg-black text-[#BCF139] px-2 py-0.5 border-2 border-[#BCF139] uppercase italic">NODE_{game.id.slice(0,8)}</span>
            {game.creator_social && (
              <span className="text-[10px] text-blue-700 uppercase border-b-4 border-blue-700 italic">@{game.creator_social.split('/').pop()}</span>
            )}
          </div>
        </div>

        {/* DATA */}
        <div className="grid grid-cols-2 gap-8 md:px-8 lg:border-l-4 border-black pt-6 md:pt-0">
          <div className="min-w-[120px]">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 italic">ENGAGEMENT</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl italic leading-none">{game.total_plays.toLocaleString()}</span>
              <span className="text-[10px] opacity-40 italic">RUNS</span>
            </div>
          </div>
          <div className="min-w-[120px]">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 italic">PEAK_SCORE</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-6xl text-[#BCF139] italic" style={{ WebkitTextStroke: '2px black' }}>{game.high_score}</span>
              <Trophy className="w-6 h-6 text-amber-500" strokeWidth={4} />
            </div>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-row lg:flex-col border-t-8 lg:border-t-0 lg:border-l-8 border-black w-full lg:w-52">
        <Link href={`/play?id=${game.id}`} className="flex-1 flex flex-col items-center justify-center bg-[#BCF139] py-6 text-black uppercase text-xs border-r-8 lg:border-r-0 lg:border-b-8 border-black hover:bg-black hover:text-[#BCF139] transition-all group/btn">
          <Play className="w-8 h-8 mb-2 group-hover/btn:scale-110 transition-transform" fill="currentColor" />
          DEPLOY
        </Link>
        <Link href={`/play/game?id=${game.id}`} className="flex-1 flex flex-col items-center justify-center bg-white py-6 text-black uppercase text-xs hover:bg-black hover:text-[#BCF139] transition-all group/btn">
          <Activity className="w-8 h-8 mb-2" strokeWidth={5} />
          ANALYTICS
        </Link>
      </div>
    </div>
  );
}