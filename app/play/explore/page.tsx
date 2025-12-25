import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Users, ExternalLink, Plus, Play, Info } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExploreGames() {
  const games = await getAllGames();

  // Color Mapping for Neobrutalist Ranks
  const getRankStyles = (index: number) => {
    if (index === 0) return { bg: 'bg-[#FFD700]', text: 'text-black', label: 'GOLD' };   // Gold
    if (index === 1) return { bg: 'bg-[#C0C0C0]', text: 'text-black', label: 'SILVER' }; // Silver
    if (index === 2) return { bg: 'bg-[#CD7F32]', text: 'text-white', label: 'BRONZE' }; // Bronze
    return { bg: 'bg-white', text: 'text-black', label: null };
  };

  if (!games || games.length === 0) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] p-8 font-mono text-black flex items-center justify-center">
        <div className="bg-white border-[6px] border-black p-10 shadow-[12px_12px_0px_0px_#000] text-center max-w-md">
          <h1 className="text-4xl text-black uppercase mb-4">Board Empty</h1>
          <Link href="/play/make" className="block w-full bg-[#BCF139] border-4 border-black py-4 text-black uppercase shadow-[6px_6px_0px_0px_#000]">
            Create First Level
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0] p-4 md:p-12 font-mono text-black selection:bg-black selection:text-[#BCF139]">
      <div className="max-w-4xl mx-auto">
        
        {/* TOP ACTION BAR */}
        <header className="flex justify-between items-center mb-10">
            <div className="bg-black text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_#BCF139]">
                <h1 className="text-2xl md:text-4xl text-black uppercase tracking-tighter">Hall of Fame</h1>
            </div>
            <Link 
                href="/play/make" 
                className="bg-[#BCF139] border-4 border-black p-3 md:px-6 md:py-3 text-black uppercase shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
            >
                <Plus size={20} strokeWidth={4} /> <span className="hidden md:inline">Create Level</span>
            </Link>
        </header>

        {/* LEADERBOARD CONTAINER */}
        <div className="space-y-6">
          {games.map((game, i) => {
            const rank = getRankStyles(i);
            
            return (
              <div 
                key={game.id} 
                className={`relative group bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
              >
                {/* RANK MEDAL / NUMBER */}
                <div className={`absolute -top-4 -left-4 w-12 h-12 md:w-16 md:h-16 border-[4px] border-black flex items-center justify-center text-black text-xl md:text-3xl z-10 shadow-[4px_4px_0px_0px_#000] ${rank.bg} ${rank.text}`}>
                   {i + 1}
                </div>

                <div className="flex flex-col md:flex-row items-stretch">
                  
                  {/* MAIN INFO SECTION */}
                  <div className="flex-1 p-6 pt-10 md:pt-6 flex items-center gap-4 border-b-4 md:border-b-0 md:border-r-4 border-black">
                    <div className="shrink-0">
                      {game.player_url ? (
                        <img src={game.player_url} className="w-16 h-16 md:w-20 md:h-20 border-4 border-black object-cover bg-white" />
                      ) : (
                        <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-black bg-gray-100 flex items-center justify-center">
                           <Trophy size={32} className="opacity-20" />
                        </div>
                      )}
                    </div>
                    
                    <div className="overflow-hidden">
                      <h2 className="text-xl md:text-3xl text-black uppercase truncate leading-none mb-2">
                        {game.creator}
                      </h2>
                      {game.creator_social && (
                        <a 
                          href={game.creator_social.startsWith('http') ? game.creator_social : `https://${game.creator_social}`}
                          className="text-[10px] md:text-xs text-black text-blue-600 uppercase flex items-center gap-1 hover:underline"
                        >
                          @{game.creator_social.split('/').pop()} <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* STATS SECTION */}
                  <div className="flex divide-x-4 divide-black bg-gray-50 border-b-4 md:border-b-0 md:border-r-4 border-black">
                    <div className="flex-1 md:w-32 p-4 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-black uppercase text-gray-400 mb-1">Plays</span>
                      <div className="flex items-center gap-1">
                        <Users size={14} strokeWidth={3} />
                        <span className="text-xl text-black">{game.total_plays}</span>
                      </div>
                    </div>
                    <div className="flex-1 md:w-32 p-4 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-black uppercase text-gray-400 mb-1">Record</span>
                      <div className="flex items-center gap-1 text-[#FFB800]">
                        <Trophy size={14} strokeWidth={3} />
                        <span className="text-xl text-black">{game.high_score}</span>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS SECTION */}
                  <div className="grid grid-cols-2 md:grid-cols-1 w-full md:w-28">
                    <Link 
                      href={`/play/game/${game.id}`}
                      className="flex flex-col items-center justify-center p-4 bg-white hover:bg-[#3DD1FF] border-r-4 md:border-r-0 md:border-b-4 border-black transition-colors group/btn"
                    >
                      <Info size={20} strokeWidth={3} />
                      <span className="text-[10px] text-black uppercase mt-1">Stats</span>
                    </Link>
                    <Link 
                      href={`/play?id=${game.id}`}
                      className="flex flex-col items-center justify-center p-4 bg-[#BCF139] hover:bg-black hover:text-white transition-colors"
                    >
                      <Play size={20} fill="currentColor" strokeWidth={0} />
                      <span className="text-[10px] text-black uppercase mt-1">Play</span>
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM TICKER */}
        <footer className="mt-16 bg-black text-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_#BCF139] flex justify-between items-center overflow-hidden">
            <div className="flex gap-8 animate-marquee whitespace-nowrap text-black text-[10px] uppercase tracking-widest">
                <span>The Leaderboard resets never.</span>
                <span className="text-[#BCF139] text-black">★</span>
                <span>Top Creator: {games[0]?.creator}</span>
                <span className="text-[#BCF139] text-black">★</span>
                <span>Total Global Plays: {games.reduce((acc, g) => acc + g.total_plays, 0)}</span>
            </div>
        </footer>

      </div>
    </div>
  );
}