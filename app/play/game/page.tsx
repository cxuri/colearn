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
      <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl text-black uppercase italic tracking-tighter font-black underline decoration-[10px]">MISSING_ID</h1>
        <Link href="/play/explore" className="mt-8 bg-black text-[#BCF139] px-12 py-4 border-[4px] border-black uppercase font-black hover:bg-[#BCF139] hover:text-black transition-all">
          Return to Archive
        </Link>
      </div>
    );
  }

  const data = await getGameAnalytics(id);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center justify-center p-6 text-center font-black">
        <h1 className="text-5xl text-black uppercase italic tracking-tighter font-black">NODE_OFFLINE</h1>
        <p className="text-black mt-4 uppercase tracking-[0.2em] text-sm">Target_ID: {id}</p>
        <Link href="/play/explore" className="mt-10 bg-black text-[#BCF139] px-12 py-4 border-[4px] border-black uppercase font-black hover:bg-[#BCF139] hover:text-black transition-all">
          Back to Archives
        </Link>
      </div>
    );
  }

  const { game, totalPlays, colleges, branches, leaderboard } = data;
  const getPercent = (val: number, max: number) => Math.max(8, (val / (max || 1)) * 100);

  return (
    <div className="min-h-screen w-full bg-[#EAEAEA] text-black font-sans pb-24 selection:bg-black selection:text-[#BCF139] font-black leading-none">
      {/* INDUSTRIAL DOT GRID */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1.5px, transparent 1.5px)`, backgroundSize: '32px 32px' }} />

      {/* HEADER SECTION */}
      <header className="relative z-10 bg-white border-b-[10px] border-black pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/play/explore" className="inline-flex items-center text-black text-sm uppercase mb-12 border-[5px] border-black px-5 py-3 hover:bg-black hover:text-[#BCF139] transition-all font-black">
            <ArrowLeft size={22} className="mr-3" strokeWidth={5} /> BACK_TO_ARCHIVE
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-black text-[#BCF139] p-3 border-[4px] border-black">
                    <Zap size={32} fill="currentColor" />
                </div>
                <span className="text-xs text-black uppercase tracking-[0.4em] font-black italic">TELEMETRY_NODE // {id.slice(0,12)}</span>
              </div>
              <h1 className="text-7xl md:text-[10rem] text-black uppercase tracking-tighter leading-[0.75] italic font-black">
                {game.creator}<br/>
                <span className="text-[#BCF139]" style={{ WebkitTextStroke: '5px black' }}>ANALYTICS</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 w-full lg:w-auto">
              <div className="bg-black text-[#BCF139] p-8 border-[6px] border-[#BCF139] min-w-[260px] shadow-[10px_10px_0px_black]">
                <p className="text-xs uppercase tracking-[0.5em] mb-4 opacity-70 italic font-black">GLOBAL_RUNS</p>
                <p className="text-7xl italic font-black">{totalPlays.toLocaleString()}</p>
              </div>
              <Link 
                href={`/play?id=${id}`}
                className="bg-[#BCF139] text-black border-[6px] border-black px-16 py-8 text-5xl font-black hover:bg-black hover:text-[#BCF139] transition-all flex items-center justify-center gap-6 shadow-[15px_15px_0px_black] active:translate-x-2 active:translate-y-2 active:shadow-none"
              >
                <Play fill="currentColor" size={36} /> DEPLOY
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto p-6 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* DATA CHARTS (LEFT) */}
        <div className="lg:col-span-7 space-y-28">
          <section>
            <div className="flex items-center gap-6 mb-12">
              <div className="bg-black text-white p-4 border-[5px] border-black">
                <MapPin size={36} strokeWidth={5} />
              </div>
              <h2 className="text-6xl text-black uppercase italic tracking-tighter font-black underline decoration-[12px] decoration-[#BCF139] underline-offset-8">Regional_Intel</h2>
            </div>
            
            <div className="space-y-12">
              {colleges.length > 0 ? colleges.map((col: any, i: number) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-sm text-black uppercase tracking-[0.3em] font-black">{col.name}</span>
                    <span className="text-4xl text-black italic font-black">{col.count}</span>
                  </div>
                  <div className="h-16 w-full bg-white border-[6px] border-black relative overflow-hidden transition-all group-hover:translate-x-3 group-hover:bg-gray-100">
                    <div 
                      className="h-full bg-blue-600 border-r-[6px] border-black transition-all duration-1000 ease-out" 
                      style={{ width: `${getPercent(col.count, colleges[0].count)}%` }} 
                    />
                  </div>
                </div>
              )) : (
                <div className="p-24 border-[8px] border-black border-dashed text-center text-black uppercase italic text-xl bg-white font-black tracking-widest">AWAITING_REGIONAL_STREAMS</div>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-6 mb-12">
              <div className="bg-black text-[#BCF139] p-4 border-[5px] border-black">
                <Briefcase size={36} strokeWidth={5} />
              </div>
              <h2 className="text-6xl text-black uppercase italic tracking-tighter font-black underline decoration-[12px] decoration-[#BCF139] underline-offset-8">Sector_Breakdown</h2>
            </div>

            <div className="space-y-12">
              {branches.length > 0 ? branches.map((br: any, i: number) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-sm text-black uppercase tracking-[0.3em] font-black">{br.name}</span>
                    <span className="text-4xl text-black italic font-black">{br.count}</span>
                  </div>
                  <div className="h-16 w-full bg-white border-[6px] border-black relative overflow-hidden transition-all group-hover:translate-x-3 group-hover:bg-gray-100">
                    <div 
                      className="h-full bg-[#BCF139] border-r-[6px] border-black transition-all duration-1000 ease-out" 
                      style={{ width: `${getPercent(br.count, branches[0].count)}%` }} 
                    />
                  </div>
                </div>
              )) : (
                <div className="p-24 border-[8px] border-black border-dashed text-center text-black uppercase italic text-xl bg-white font-black tracking-widest">AWAITING_SECTOR_STREAMS</div>
              )}
            </div>
          </section>
        </div>

        {/* LEADERBOARD (RIGHT) */}
        <div className="lg:col-span-5">
          <aside className="bg-white border-[10px] border-black p-10 shadow-[30px_30px_0px_#BCF139] sticky top-12">
            <div className="flex items-center justify-between mb-12 border-b-[8px] border-black pb-8">
              <h2 className="text-6xl text-black uppercase italic tracking-tighter flex items-center gap-4 font-black">
                <BarChart3 strokeWidth={6} size={48} /> RANK
              </h2>
              <div className="bg-black text-[#BCF139] px-4 py-2 text-sm uppercase border-[4px] border-[#BCF139] animate-pulse font-black">LIVE_SYNC</div>
            </div>
            
            <div className="space-y-6">
              {leaderboard.length > 0 ? leaderboard.map((p: any, i: number) => (
                <div key={i} className={`flex items-center justify-between p-6 border-[5px] border-black transition-all hover:bg-gray-50 ${i === 0 ? 'bg-[#BCF139]' : 'bg-white'}`}>
                  <div className="flex items-center gap-6 min-w-0">
                    <span className="text-black italic text-4xl opacity-30 font-black">#{i + 1}</span>
                    <div className="min-w-0">
                      <p className="text-black uppercase text-xl truncate mb-1 font-black">{p.player_name || 'ANON_USER'}</p>
                      <p className="text-[10px] text-black uppercase truncate italic tracking-widest font-black opacity-50">{p.college || 'GUEST_ZONE'}</p>
                    </div>
                  </div>
                  <p className="text-5xl text-black italic font-black leading-none">{p.score}</p>
                </div>
              )) : (
                 <div className="text-center py-32 border-[8px] border-black border-dashed">
                    <Activity size={80} className="mx-auto text-black mb-8 animate-bounce" strokeWidth={6} />
                    <p className="text-black uppercase text-sm italic tracking-[0.4em] font-black">ZERO_ACTIVE_ENTRIES</p>
                 </div>
              )}
            </div>

            <div className="mt-12 pt-10 border-t-[8px] border-black border-dashed flex justify-between items-center text-black">
                <div className="flex items-center gap-4 text-xs uppercase italic font-black">
                    <Globe size={24} strokeWidth={5} /> STREAM_SYNC: ACTIVE
                </div>
                <span className="text-sm bg-black text-[#BCF139] px-4 py-2 italic tracking-widest font-black">v3.0.4</span>
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-32 bg-black border-t-[15px] border-[#BCF139] p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex gap-20 items-center overflow-hidden whitespace-nowrap text-[#BCF139] text-base tracking-[0.6em] uppercase italic font-black">
                <span>KLAZ_ANALYTICS_TERMINAL</span>
                <span className="opacity-40">//</span>
                <span>AUTHORIZED_USER: {game.creator}</span>
                <span className="opacity-40">//</span>
                <span>SECURE_DATA_FEED_01</span>
            </div>
            <p className="text-xs text-[#BCF139]/50 uppercase tracking-widest italic font-black">© 2025 KLAZ_RUNNER_PROTOCOL</p>
          </div>
      </footer>
    </div>
  );
}