import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Users, ExternalLink, Plus, Play, Info, Activity } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExploreGames() {
  const games = await getAllGames();

  const getRankStyles = (index: number) => {
    if (index === 0) return { bg: 'bg-[#FFD700]', shadow: 'shadow-[4px_4px_0px_0px_#000]', text: 'text-black' };   // Gold
    if (index === 1) return { bg: 'bg-[#E2E8F0]', shadow: 'shadow-[4px_4px_0px_0px_#000]', text: 'text-black' }; // Silver
    if (index === 2) return { bg: 'bg-[#FFA500]', shadow: 'shadow-[4px_4px_0px_0px_#000]', text: 'text-black' }; // Bronze
    return { bg: 'bg-white', shadow: 'shadow-[4px_4px_0px_0px_#000]', text: 'text-black' };
  };

  return (
    <div className="min-h-screen w-full bg-[#F0F0F0] relative font-mono selection:bg-[#BCF139]">
      {/* PERFECT BACKGROUND GRID */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)`,
          backgroundSize: '30px 30px' 
        }} 
      />

      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-12">
        
        {/* HEADER AREA */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
                <div className="inline-block bg-black text-[#BCF139] px-3 py-1 border-2 border-black text-black text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_#000]">
                    Live Rankings
                </div>
                <h1 className="text-6xl md:text-8xl text-black text-black uppercase tracking-tighter leading-[0.8]">
                    Hall<br/>Of Fame
                </h1>
            </div>
            
            <Link 
                href="/play/make" 
                className="group bg-[#BCF139] border-[4px] border-black px-8 py-5 text-black text-2xl text-black uppercase shadow-[8px_8px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3 active:bg-white"
            >
                <Plus size={28} strokeWidth={4} /> Create Level
            </Link>
        </header>

        {/* STATS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                <p className="text-[10px] text-black uppercase text-gray-500">Active Levels</p>
                <p className="text-2xl text-black">{games.length}</p>
            </div>
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                <p className="text-[10px] text-black uppercase text-gray-500">Global Runs</p>
                <p className="text-2xl text-black">{games.reduce((acc, g) => acc + g.total_plays, 0)}</p>
            </div>
        </div>

        {/* LEADERBOARD CONTAINER */}
        <div className="space-y-10">
          {games.length === 0 ? (
            <div className="bg-white border-[6px] border-black p-12 text-center shadow-[12px_12px_0px_0px_#000]">
                <Activity size={48} className="mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl text-black uppercase">No Data Found</h2>
                <p className="font-bold text-gray-600 uppercase text-sm mt-2">The arena is empty. Break the silence.</p>
            </div>
          ) : games.map((game, i) => {
            const rank = getRankStyles(i);
            
            return (
              <div 
                key={game.id} 
                className="relative group bg-white border-[4px] border-black shadow-[10px_10px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                {/* RANK STICKER */}
                <div className={`absolute -top-6 -left-6 w-14 h-14 md:w-20 md:h-20 border-[4px] border-black flex items-center justify-center text-black text-2xl md:text-5xl z-20 transition-transform group-hover:rotate-12 ${rank.bg} ${rank.shadow} ${rank.text}`}>
                   {i + 1}
                </div>

                <div className="flex flex-col md:flex-row items-stretch">
                  
                  {/* MAIN INFO SECTION */}
                  <div className="flex-1 p-6 pt-12 md:pt-6 flex items-center gap-6 border-b-4 md:border-b-0 md:border-r-4 border-black">
                    <div className="shrink-0 relative">
                      <div className="absolute inset-0 bg-black translate-x-1 translate-y-1" />
                      {game.player_url ? (
                        <img src={game.player_url} className="relative w-20 h-20 md:w-24 md:h-24 border-4 border-black object-cover bg-white" alt="avatar" />
                      ) : (
                        <div className="relative w-20 h-20 md:w-24 md:h-24 border-4 border-black bg-gray-200 flex items-center justify-center">
                           <Trophy size={40} className="opacity-20" />
                        </div>
                      )}
                    </div>
                    
                    <div className="overflow-hidden space-y-1">
                      <h2 className="text-2xl md:text-4xl text-black text-black uppercase truncate leading-none">
                        {game.creator}
                      </h2>
                      {game.creator_social && (
                        <a 
                          href={game.creator_social.startsWith('http') ? game.creator_social : `https://${game.creator_social}`}
                          className="inline-block bg-blue-100 border-2 border-blue-600 text-blue-700 text-[10px] md:text-xs text-black px-2 py-0.5 uppercase tracking-tighter hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          @{game.creator_social.split('/').pop()}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* STATS SECTION */}
                  <div className="flex divide-x-4 divide-black bg-[#FAFAFA] border-b-4 md:border-b-0 md:border-r-4 border-black">
                    <div className="flex-1 md:w-36 p-6 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-black uppercase text-gray-400 mb-2">Total Plays</span>
                      <div className="flex items-center gap-2">
                        <Users size={18} strokeWidth={4} />
                        <span className="text-3xl text-black italic">{game.total_plays}</span>
                      </div>
                    </div>
                    <div className="flex-1 md:w-36 p-6 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-black uppercase text-gray-400 mb-2">High Record</span>
                      <div className="flex items-center gap-2 text-[#FFB800]">
                        <Trophy size={18} strokeWidth={4} />
                        <span className="text-3xl text-black italic">{game.high_score}</span>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS SECTION */}
                  <div className="grid grid-cols-2 md:grid-cols-1 w-full md:w-32">
                    <Link 
                      href={`/play/game/${game.id}`}
                      className="flex flex-col items-center justify-center p-4 bg-white hover:bg-[#3DD1FF] border-r-4 md:border-r-0 md:border-b-4 border-black transition-all group/btn active:translate-y-1"
                    >
                      <Info size={24} strokeWidth={4} />
                      <span className="text-[10px] text-black uppercase mt-2">Analytics</span>
                    </Link>
                    <Link 
                      href={`/play?id=${game.id}`}
                      className="flex flex-col items-center justify-center p-4 bg-[#BCF139] hover:bg-black hover:text-white transition-all active:translate-y-1"
                    >
                      <Play size={24} fill="currentColor" strokeWidth={0} />
                      <span className="text-[10px] text-black uppercase mt-2">Play Run</span>
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM TICKER */}
        <footer className="mt-20 bg-black p-5 border-4 border-black shadow-[8px_8px_0px_0px_#BCF139] flex items-center overflow-hidden">
            <div className="flex gap-12 animate-marquee whitespace-nowrap text-black text-sm uppercase tracking-[0.2em] text-[#BCF139]">
                <span>The Leaderboard resets never</span>
                <span className="text-white opacity-30">★</span>
                <span>Top Creator: {games[0]?.creator}</span>
                <span className="text-white opacity-30">★</span>
                <span>Klaz Runner v2.0 - Chaos Edition</span>
                <span className="text-white opacity-30">★</span>
                <span>Total Runs: {games.reduce((acc, g) => acc + g.total_plays, 0)}</span>
            </div>
        </footer>
      </div>
    </div>
  );
}