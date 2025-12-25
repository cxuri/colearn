import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Users, ExternalLink, Plus, LayoutGrid, Play, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExploreGames() {
  const games = await getAllGames();

  if (!games || games.length === 0) {
    return (
      <div className="min-h-screen bg-[#A5F3FC] p-8 font-mono text-black flex flex-col items-center justify-center text-center">
        <div className="bg-white border-[6px] border-black p-10 shadow-[12px_12px_0px_0px_#000] max-w-lg">
          <h1 className="text-5xl text-black mb-4 uppercase tracking-tighter italic">No Data</h1>
          <p className="font-bold text-xl mb-8 leading-tight">The database is currently silent. Build the first level to break the void.</p>
          <Link href="/play/make" className="block w-full bg-[#FDE047] border-4 border-black px-6 py-4 text-black text-2xl hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[8px_8px_0px_0px_#000] transition-all uppercase">
            🛠️ Initialize Level
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0] p-4 md:p-12 font-mono text-black selection:bg-black selection:text-[#BCF139]">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white border-[6px] border-black p-8 shadow-[10px_10px_0px_0px_#000]">
            <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-7xl text-black tracking-tighter uppercase leading-none italic">
                  Level Board
                </h1>
                <p className="text-black text-xs uppercase tracking-[0.3em] mt-2 opacity-60">Global Ranking • Realtime Sync</p>
            </div>
            <Link 
                href="/play/make" 
                className="flex items-center gap-2 bg-[#BCF139] text-black border-4 border-black px-6 py-3 text-black text-lg uppercase shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:bg-white"
            >
                <Plus strokeWidth={4} size={20} /> Create Level
            </Link>
        </header>

        {/* LEADERBOARD TABLE HEADER */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 mb-4 text-black text-xs uppercase tracking-widest text-gray-500">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">Creator / Level</div>
          <div className="col-span-2 text-center">Plays</div>
          <div className="col-span-2 text-center">High Score</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* LEADERBOARD LIST */}
        <div className="space-y-4">
          {games.map((game, i) => (
            <div 
              key={game.id} 
              className="group bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 p-4 md:p-6">
                
                {/* RANK */}
                <div className="col-span-1 flex items-center justify-center md:justify-start">
                  <span className={`text-4xl text-black italic ${i < 3 ? 'text-[#FF90E8]' : 'text-black opacity-20'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* CREATOR INFO */}
                <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                  <div className="shrink-0 relative">
                    {game.player_url ? (
                      <img src={game.player_url} className="w-14 h-14 border-4 border-black object-cover bg-white rotate-[-3deg] group-hover:rotate-0 transition-transform" />
                    ) : (
                      <div className="w-14 h-14 border-4 border-black bg-[#A5F3FC] flex items-center justify-center rotate-[-3deg]">
                        <LayoutGrid size={24} />
                      </div>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h2 className="text-black text-xl md:text-2xl uppercase truncate leading-tight">
                      {game.creator}
                    </h2>
                    {game.creator_social && (
                      <div className="flex items-center gap-1 text-[10px] text-black text-blue-600 uppercase hover:underline">
                        @{game.creator_social.split('/').pop()} <ExternalLink size={10} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </div>

                {/* PLAYS */}
                <div className="col-span-1 md:col-span-2 flex flex-col items-center border-y-2 md:border-y-0 md:border-x-2 border-black border-dashed py-2 md:py-0">
                  <span className="text-[10px] text-black uppercase text-gray-400 md:hidden mb-1">Total Plays</span>
                  <div className="flex items-center gap-2">
                    <Users size={16} strokeWidth={3} />
                    <span className="text-2xl text-black">{(game.total_plays || 0).toLocaleString()}</span>
                  </div>
                </div>

                {/* HIGH SCORE */}
                <div className="col-span-1 md:col-span-2 flex flex-col items-center">
                   <span className="text-[10px] text-black uppercase text-gray-400 md:hidden mb-1">High Score</span>
                   <div className="flex items-center gap-2 text-[#FFB800]">
                    <Trophy size={16} strokeWidth={3} />
                    <span className="text-2xl text-black">{(game.high_score || 0).toLocaleString()}</span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="col-span-1 md:col-span-2 flex flex-row md:flex-col gap-2">
                  <Link 
                    href={`/play/game/${game.id}`}
                    className="flex-1 bg-black text-white text-[10px] text-black uppercase py-2 text-center border-2 border-black hover:bg-white hover:text-black transition-colors"
                  >
                    Stats
                  </Link>
                  <Link 
                    href={`/play?id=${game.id}`}
                    className="flex-1 bg-[#3DD1FF] text-black text-[10px] text-black uppercase py-2 text-center border-2 border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-1"
                  >
                    Play <Play size={10} fill="currentColor" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* FOOTER TICKER */}
        <div className="mt-16 overflow-hidden bg-black text-white py-4 border-t-4 border-black">
          <div className="flex gap-10 animate-marquee whitespace-nowrap text-black text-xs uppercase tracking-widest">
            <span>New High Score detected on 0xAF...</span>
            <span className="text-[#BCF139]">●</span>
            <span>Creator {games[0]?.creator} is dominating the board...</span>
            <span className="text-[#BCF139]">●</span>
            <span>Build your own level via /make...</span>
            <span className="text-[#BCF139]">●</span>
            <span>Current Players: {(games.reduce((acc, g) => acc + (g.total_plays || 0), 0)).toLocaleString()}</span>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}