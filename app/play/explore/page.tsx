import { getAllGames } from '@/app/actions';
import Link from 'next/link';
import { Trophy, Users, Play, Plus, Activity, Zap, TrendingUp, Medal } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExploreGames() {
  const games = await getAllGames();

  // Sort by total plays or high score for the ranking logic
  const sortedGames = [...games].sort((a, b) => b.total_plays - a.total_plays);

  const getRankTheme = (index: number) => {
    if (index === 0) return { bg: 'bg-[#FFD700]', accent: 'border-[#000]', text: 'text-black', label: 'CHAMPION' };
    if (index === 1) return { bg: 'bg-[#E2E8F0]', accent: 'border-[#000]', text: 'text-black', label: 'CONTENDER' };
    if (index === 2) return { bg: 'bg-[#CD7F32]', accent: 'border-[#000]', text: 'text-black', label: 'ELITE' };
    return { bg: 'bg-white', accent: 'border-black', text: 'text-black', label: 'PLAYER' };
  };

  const globalTotalPlays = games.reduce((acc, g) => acc + g.total_plays, 0);

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] text-black font-mono selection:bg-black selection:text-[#BCF139] pb-24">
      {/* RETRO GRID OVERLAY */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div 
        className="fixed inset-0 z-0 opacity-[0.1] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#000 1px, transparent 0)`, backgroundSize: '24px 24px' }} 
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-12">
        
        {/* ULTRA HEADER */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span className="bg-black text-[#BCF139] px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                Network: Online / {games.length} nodes
              </span>
            </div>
            <h1 className="text-7xl md:text-9xl text-black uppercase leading-[0.75] tracking-tighter italic">
              Hall <span className="text-outline-2 text-transparent" style={{ WebkitTextStroke: '2px black' }}>Of</span><br/>Fame
            </h1>
          </div>
          
          <Link 
            href="/play/make" 
            className="w-full lg:w-auto bg-[#BCF139] border-4 border-black px-10 py-6 text-black text-2xl text-black uppercase shadow-[8px_8px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-4 active:scale-95"
          >
            <Plus size={32} strokeWidth={4} /> Create Level
          </Link>
        </header>

        {/* METRICS DASHBOARD */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { label: 'Network Reach', val: globalTotalPlays, icon: <Users />, sub: 'Total Game Sessions' },
            { label: 'Active Zones', val: games.length, icon: <Activity />, sub: 'Verified Map Data' },
            { label: 'Highest Peak', val: Math.max(...games.map(g => g.high_score), 0), icon: <Trophy />, sub: 'All-Time High Score' }
          ].map((stat, i) => (
            <div key={i} className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-black text-[#BCF139]">{stat.icon}</div>
                <TrendingUp size={16} className="text-gray-300" />
              </div>
              <div>
                <p className="text-4xl text-black italic">{stat.val.toLocaleString()}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">{stat.label} — {stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* LEADERBOARD LIST */}
        <div className="space-y-8">
          {sortedGames.map((game, i) => {
            const theme = getRankTheme(i);
            const popularityWidth = (game.total_plays / globalTotalPlays) * 100;
            
            return (
              <div 
                key={game.id} 
                className="group relative flex flex-col md:flex-row items-stretch bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                {/* RANK BADGE */}
                <div className={`md:w-20 w-full p-4 flex flex-col items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-black ${theme.bg}`}>
                  <span className="text-[10px] text-black opacity-50 mb-1 leading-none">{theme.label}</span>
                  <span className="text-4xl md:text-5xl text-black italic">#{i + 1}</span>
                </div>

                {/* CREATOR IDENTITY */}
                <div className="flex-1 p-6 flex items-center gap-6 border-b-4 md:border-b-0 md:border-r-4 border-black">
                  <div className="relative group-hover:scale-110 transition-transform">
                    <div className="absolute inset-0 bg-black rounded-full translate-x-1 translate-y-1" />
                    {game.player_url ? (
                      <img src={game.player_url} className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-black object-cover bg-white" alt="avatar" />
                    ) : (
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-black bg-[#F0F0F0] flex items-center justify-center">
                        <Zap size={32} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Level Architect</p>
                    <h2 className="text-2xl md:text-4xl text-black uppercase truncate leading-none mb-2">
                      {game.creator || 'Anonymous'}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {game.creator_social && (
                        <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 uppercase">
                          @{game.creator_social.split('/').pop()}
                        </span>
                      )}
                      <span className="bg-[#BCF139] border-2 border-black text-[9px] font-bold px-2 py-0.5 uppercase">
                        ID: {game.id.slice(0,8)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* COMPLEX STATS GRID */}
                <div className="grid grid-cols-2 divide-x-4 divide-black md:w-80 bg-[#F9F9F9] border-b-4 md:border-b-0 md:border-r-4 border-black">
                  <div className="p-4 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={14} />
                      <span className="text-[10px] text-black uppercase opacity-60">Engagement</span>
                    </div>
                    <p className="text-3xl text-black italic">{game.total_plays}</p>
                    <div className="w-full bg-gray-200 h-1.5 mt-2 border border-black overflow-hidden">
                      <div className="h-full bg-black" style={{ width: `${Math.max(5, popularityWidth)}%` }} />
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <Medal size={14} className="text-amber-500" />
                      <span className="text-[10px] text-black uppercase opacity-60">High Score</span>
                    </div>
                    <p className="text-3xl text-black italic text-amber-600">{game.high_score}</p>
                    <p className="text-[9px] font-bold uppercase mt-2">v. Global Peak: {Math.round((game.high_score / Math.max(...games.map(g => g.high_score))) * 100)}%</p>
                  </div>
                </div>

                {/* CALL TO ACTION */}
                <div className="flex flex-row md:flex-col md:w-28">
                  <Link 
                    href={`/play?id=${game.id}`}
                    className="flex-1 flex flex-col items-center justify-center p-6 bg-[#BCF139] hover:bg-black hover:text-white transition-colors group/play"
                  >
                    <Play size={28} fill="currentColor" strokeWidth={0} className="group-hover/play:scale-125 transition-transform" />
                    <span className="text-[10px] text-black uppercase mt-2">Enter</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* THE "LONG FORM" FOOTER */}
        <footer className="mt-24 space-y-8">
            <div className="bg-black text-white p-4 overflow-hidden border-t-4 border-black">
                <div className="flex gap-16 animate-marquee whitespace-nowrap text-black uppercase tracking-tighter text-2xl italic">
                    {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="flex gap-16">
                            <span className="text-[#BCF139]">Klaz Runner Pro Protocol</span>
                            <span>System Healthy</span>
                            <span className="text-blue-400">Total Playtime: {globalTotalPlays * 1.5} Minutes</span>
                            <span>Secure Channel Active</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-black uppercase text-gray-400 px-2 pb-10">
                <p>© 2024 Klaz Runner . No Rights Reserved . Copy Everything</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-black transition-colors underline decoration-2">GitHub</a>
                    <a href="#" className="hover:text-black transition-colors underline decoration-2">Discord</a>
                    <a href="#" className="hover:text-black transition-colors underline decoration-2">Twitter</a>
                </div>
            </div>
        </footer>
      </div>
      
      {/* GLOBAL UI PERSISTENCE (Optional) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[calc(100%-2rem)]">
          <Link href="/play/make" className="w-full bg-black text-[#BCF139] flex items-center justify-center py-4 text-black uppercase border-2 border-[#BCF139] shadow-xl">
            Quick Build +
          </Link>
      </div>
    </div>
  );
}