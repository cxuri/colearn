import { getGameAnalytics } from '@/app/actions';
import Link from 'next/link';
import { ArrowLeft, Play, BarChart3, MapPin, Briefcase, Zap, Globe, Activity } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function GameAnalyticsPage({ searchParams }: PageProps) {
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="min-h-screen bg-[#EAEAEA] flex flex-col items-center justify-center p-6 text-center font-black">
        <h1 className="text-4xl text-black uppercase italic tracking-tighter underline decoration-[8px]">MISSING_ID</h1>
        <Link href="/play/explore" className="mt-8 bg-black text-[#BCF139] px-10 py-4 border-[4px] border-black uppercase hover:bg-[#BCF139] hover:text-black transition-all">
          Return to Archive
        </Link>
      </div>
    );
  }

  const data = await getGameAnalytics(id);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#EAEAEA] flex flex-col items-center justify-center p-6 text-center font-black text-black">
        <h1 className="text-4xl uppercase italic tracking-tighter">NODE_OFFLINE</h1>
        <p className="mt-4 uppercase tracking-[0.2em] text-xs opacity-60">Target_ID: {id}</p>
        <Link href="/play/explore" className="mt-10 bg-black text-[#BCF139] px-10 py-4 border-[4px] border-black uppercase hover:bg-[#BCF139] hover:text-black transition-all">
          Back to Archives
        </Link>
      </div>
    );
  }

  const { game, totalPlays, colleges, branches, leaderboard } = data;
  const getPercent = (val: number, max: number) => Math.max(8, (val / (max || 1)) * 100);

  return (
    <div className="min-h-screen w-full bg-[#EAEAEA] text-black font-sans pb-16 selection:bg-black selection:text-[#BCF139] font-black leading-none overflow-x-hidden">
      {/* INDUSTRIAL DOT GRID */}
      <div className="fixed inset-0 z-0 opacity-[0.12] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

      {/* HEADER SECTION - Scales typography and padding */}
      <header className="relative z-10 bg-white border-b-[6px] md:border-b-[10px] border-black pt-10 md:pt-16 pb-8 md:pb-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/play/explore" className="inline-flex items-center text-black text-xs md:text-sm uppercase mb-8 md:mb-12 border-[3px] md:border-[5px] border-black px-4 py-2 hover:bg-black hover:text-[#BCF139] transition-all">
            <ArrowLeft className="mr-2 md:mr-3 w-4 h-4 md:w-5 md:h-5" strokeWidth={5} /> BACK_TO_ARCHIVE
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 md:gap-12">
            <div className="w-full lg:max-w-3xl">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="bg-black text-[#BCF139] p-2 md:p-3 border-[3px] md:border-[4px] border-black shadow-[3px_3px_0px_black]">
                    <Zap className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
                </div>
                <span className="text-[10px] md:text-xs text-black uppercase tracking-[0.3em] italic">TELEMETRY_NODE // {id.slice(0,8)}</span>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] text-black uppercase tracking-tighter leading-[0.8] italic break-words">
                {game.creator}<br/>
                <span className="text-[#BCF139]" style={{ WebkitTextStroke: '2px md:4px black', textShadow: '2px 2px 0px black' }}>REPORTS</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full lg:w-auto mt-6 lg:mt-0">
              <div className="bg-black text-[#BCF139] p-6 md:p-8 border-[4px] md:border-[6px] border-[#BCF139] flex-1 sm:min-w-[220px] shadow-[6px_6px_0px_black] md:shadow-[10px_10px_0px_black]">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] mb-2 md:mb-4 opacity-70 italic">GLOBAL_RUNS</p>
                <p className="text-5xl md:text-7xl italic leading-none">{totalPlays.toLocaleString()}</p>
              </div>
              <Link 
                href={`/play?id=${id}`}
                className="bg-[#BCF139] text-black border-[4px] md:border-[6px] border-black px-10 md:px-16 py-6 md:py-8 text-3xl md:text-5xl hover:bg-black hover:text-[#BCF139] transition-all flex items-center justify-center gap-4 md:gap-6 shadow-[8px_8px_0px_black] md:shadow-[15px_15px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <Play fill="currentColor" className="w-8 h-8 md:w-10 md:h-10" /> DEPLOY
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-6 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* DATA CHARTS (LEFT) */}
        <div className="lg:col-span-7 space-y-16 lg:space-y-24">
          {/* Top Colleges Section */}
          <section>
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="bg-black text-white p-3 border-[4px] border-black shadow-[4px_4px_0px_#3b82f6]">
                <MapPin className="text-blue-500 w-6 h-6 md:w-8 md:h-8" strokeWidth={5} />
              </div>
              <h2 className="text-4xl md:text-6xl text-black uppercase italic tracking-tighter">Regional_Intel</h2>
            </div>
            
            <div className="space-y-8 md:space-y-12">
              {colleges.length > 0 ? colleges.map((col: any, i: number) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-3 md:mb-4">
                    <span className="text-[10px] md:text-sm text-black uppercase tracking-[0.2em] truncate pr-4">{col.name}</span>
                    <span className="text-2xl md:text-4xl text-black italic leading-none">{col.count}</span>
                  </div>
                  <div className="h-10 md:h-14 w-full bg-white border-[4px] md:border-[6px] border-black relative overflow-hidden group-hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_black]">
                    <div 
                      className="h-full bg-blue-600 border-r-[4px] md:border-r-[6px] border-black transition-all duration-1000 ease-out" 
                      style={{ width: `${getPercent(col.count, colleges[0].count)}%` }} 
                    />
                  </div>
                </div>
              )) : (
                <div className="p-16 border-[6px] border-black border-dashed text-center text-black uppercase italic text-xs md:text-sm bg-white/50">AWAITING_REGIONAL_DATA</div>
              )}
            </div>
          </section>

          {/* Top Branches Section */}
          <section>
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="bg-black text-[#BCF139] p-3 border-[4px] border-black shadow-[4px_4px_0px_#BCF139]">
                <Briefcase className="w-6 h-6 md:w-8 md:h-8" strokeWidth={5} />
              </div>
              <h2 className="text-4xl md:text-6xl text-black uppercase italic tracking-tighter">Sector_Intel</h2>
            </div>

            <div className="space-y-8 md:space-y-12">
              {branches.length > 0 ? branches.map((br: any, i: number) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-3 md:mb-4">
                    <span className="text-[10px] md:text-sm text-black uppercase tracking-[0.2em] truncate pr-4">{br.name}</span>
                    <span className="text-2xl md:text-4xl text-black italic leading-none">{br.count}</span>
                  </div>
                  <div className="h-10 md:h-14 w-full bg-white border-[4px] md:border-[6px] border-black relative overflow-hidden group-hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_black]">
                    <div 
                      className="h-full bg-[#BCF139] border-r-[4px] md:border-r-[6px] border-black transition-all duration-1000 ease-out" 
                      style={{ width: `${getPercent(br.count, branches[0].count)}%` }} 
                    />
                  </div>
                </div>
              )) : (
                <div className="p-16 border-[6px] border-black border-dashed text-center text-black uppercase italic text-xs md:text-sm bg-white/50">AWAITING_SECTOR_DATA</div>
              )}
            </div>
          </section>
        </div>

        {/* LEADERBOARD (RIGHT) - Stacks on mobile, sticky on desktop */}
        <div className="lg:col-span-5">
          <aside className="bg-white border-[6px] md:border-[10px] border-black p-6 md:p-8 lg:p-10 shadow-[10px_10px_0px_#BCF139] md:shadow-[20px_20px_0px_#BCF139] lg:sticky lg:top-12">
            <div className="flex items-center justify-between mb-8 md:mb-12 border-b-[4px] md:border-b-[8px] border-black pb-6 md:pb-8">
              <h2 className="text-4xl md:text-6xl text-black uppercase italic tracking-tighter flex items-center gap-3 md:gap-4">
                <BarChart3 strokeWidth={5} className="w-8 h-8 md:w-12 md:h-12" /> RANK
              </h2>
              <div className="bg-black text-[#BCF139] px-2 md:px-3 py-1 text-[10px] uppercase border-[2px] border-[#BCF139] animate-pulse">LIVE</div>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              {leaderboard.length > 0 ? leaderboard.map((p: any, i: number) => (
                <div key={i} className={`flex items-center justify-between p-4 md:p-6 border-[3px] md:border-[5px] border-black transition-all hover:bg-gray-50 ${i === 0 ? 'bg-[#BCF139]' : 'bg-white shadow-[4px_4px_0px_black]'}`}>
                  <div className="flex items-center gap-4 md:gap-6 min-w-0">
                    <span className="text-black italic text-2xl md:text-4xl opacity-30">#{i + 1}</span>
                    <div className="min-w-0">
                      <p className="text-black uppercase text-sm md:text-xl truncate leading-none mb-1">{p.player_name || 'ANON_USER'}</p>
                      <p className="text-[9px] md:text-xs text-black/50 uppercase truncate italic tracking-widest">{p.college || 'GUEST_ZONE'}</p>
                    </div>
                  </div>
                  <p className="text-3xl md:text-5xl text-black italic leading-none">{p.score}</p>
                </div>
              )) : (
                 <div className="text-center py-20 border-[6px] border-black border-dashed">
                    <Activity size={48} className="mx-auto text-black mb-6 animate-bounce" strokeWidth={5} />
                    <p className="text-black uppercase text-[10px] italic tracking-[0.2em]">WAITING_FOR_ENTRIES</p>
                 </div>
              )}
            </div>

            <div className="mt-10 pt-8 border-t-[6px] border-black border-dashed flex justify-between items-center text-black">
                <div className="flex items-center gap-3 text-[10px] uppercase italic">
                    <Globe className="w-4 h-4" strokeWidth={5} /> SYNC: ACTIVE
                </div>
                <span className="text-[10px] bg-black text-[#BCF139] px-2 py-1 italic tracking-widest uppercase">v3.0.4</span>
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER - Marquee on mobile */}
      <footer className="mt-24 md:mt-32 bg-black border-t-[10px] md:border-t-[15px] border-[#BCF139] p-8 md:p-12 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex gap-12 md:gap-20 items-center whitespace-nowrap text-[#BCF139] text-xs md:text-base tracking-[0.4em] md:tracking-[0.6em] uppercase italic animate-marquee md:animate-none">
                <span>TERMINAL_ARCHIVE</span>
                <span className="opacity-40">//</span>
                <span>USER: {game.creator}</span>
                <span className="opacity-40">//</span>
                <span>DATA_FEED_SECURE</span>
            </div>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest italic text-center">© 2025 KLAZ_RUNNER_PROTOCOL</p>
          </div>
      </footer>
    </div>
  );
}