import { getGameAnalytics } from '@/app/actions';
import Link from 'next/link';
import { ArrowLeft, Play, BarChart3, MapPin, Briefcase, Zap, Globe, Activity } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function GameAnalyticsPage({ searchParams }: PageProps) {
  // 1. Extract and await the ID from searchParams
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="min-h-screen bg-[#EAEAEA] flex flex-col items-center justify-center p-6 text-center text-black">
        <h1 className="text-4xl text-black uppercase italic tracking-tighter">[!] MISSING_ID</h1>
        <Link href="/play/explore" className="mt-8 bg-black text-[#BCF139] px-10 py-4 border-2 border-[#BCF139] shadow-[6px_6px_0px_black] uppercase text-black hover:bg-[#BCF139] hover:text-black transition-all">
          Return to Archive
        </Link>
      </div>
    );
  }

  // 2. Fetch game data
  const data = await getGameAnalytics(id);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#EAEAEA] flex flex-col items-center justify-center p-6 text-center text-black">
        <h1 className="text-4xl text-black uppercase italic tracking-tighter">NODE_NOT_FOUND</h1>
        <p className="text-gray-500 mt-2 uppercase tracking-widest text-xs">Target_ID: {id}</p>
        <Link href="/play/explore" className="mt-10 bg-black text-[#BCF139] px-10 py-4 border-2 border-[#BCF139] shadow-[6px_6px_0px_black] uppercase text-black hover:bg-[#BCF139] hover:text-black transition-all">
          Back to Archives
        </Link>
      </div>
    );
  }

  const { game, totalPlays, colleges, branches, leaderboard } = data;
  const getPercent = (val: number, max: number) => Math.max(8, (val / (max || 1)) * 100);

  return (
    <div className="min-h-screen w-full bg-[#EAEAEA] text-black font-sans pb-20 selection:bg-black selection:text-[#BCF139] text-black">
      {/* INDUSTRIAL BACKGROUND GRID */}
      <div className="fixed inset-0 z-0 opacity-[0.08] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1.2px, transparent 1.2px)`, backgroundSize: '24px 24px' }} />

      {/* HEADER BLOCK */}
      <header className="relative z-10 bg-white border-b-[6px] border-black pt-12 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/play/explore" className="inline-flex items-center text-black text-xs uppercase mb-8 hover:bg-black hover:text-[#BCF139] px-3 py-1 border-[3px] border-black transition-all shadow-[3px_3px_0px_black]">
            <ArrowLeft size={16} className="mr-2" strokeWidth={4} /> Back to Archive
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-black text-[#BCF139] p-2 border-2 border-[#BCF139] shadow-[4px_4px_0px_black]">
                    <Zap size={20} fill="currentColor" />
                </div>
                <span className="text-[11px] text-gray-500 uppercase tracking-widest italic">Data_Center // Node_id: {id.slice(0,8)}</span>
              </div>
              <h1 className="text-6xl md:text-8xl text-black uppercase tracking-tighter leading-[0.8] italic">
                {game.creator}<br/>
                <span className="text-[#BCF139] drop-shadow-[5px_5px_0px_black]" style={{ WebkitTextStroke: '2.5px black' }}>ANALYTICS</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
              <div className="bg-black text-[#BCF139] p-6 border-2 border-[#BCF139] shadow-[8px_8px_0px_black] min-w-[200px]">
                <p className="text-[11px] uppercase tracking-widest mb-2 opacity-70 italic">Total_Runs_Log</p>
                <p className="text-5xl italic leading-none">{totalPlays.toLocaleString()}</p>
              </div>
              <Link 
                href={`/play?id=${id}`}
                className="bg-[#BCF139] text-black border-[4px] border-black px-12 py-6 text-3xl shadow-[10px_10px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-4 active:bg-black active:text-[#BCF139]"
              >
                <Play fill="currentColor" size={28} /> DEPLOY
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto p-6 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* DATA CHARTS */}
        <div className="lg:col-span-7 space-y-20">
          <section>
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-black p-2 border-2 border-blue-600 shadow-[4px_4px_0px_black]">
                <MapPin className="text-blue-500" size={24} strokeWidth={4} />
              </div>
              <h2 className="text-4xl text-black uppercase italic tracking-tighter">Regional_Intel</h2>
            </div>
            
            <div className="space-y-10">
              {colleges.length > 0 ? colleges.map((col: any, i: number) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[11px] text-black uppercase tracking-widest">{col.name}</span>
                    <span className="text-2xl text-black italic leading-none">{col.count}</span>
                  </div>
                  <div className="h-12 w-full bg-white border-[4px] border-black shadow-[6px_6px_0px_black] relative overflow-hidden group-hover:bg-gray-100 transition-colors">
                    <div 
                      className="h-full bg-blue-500 border-r-[4px] border-black transition-all duration-1000 ease-out" 
                      style={{ width: `${getPercent(col.count, colleges[0].count)}%` }} 
                    />
                  </div>
                </div>
              )) : (
                <div className="p-16 border-[4px] border-black border-dashed text-center text-gray-400 uppercase italic bg-white/50">Node_Empty // No Regional Data</div>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-black p-2 border-2 border-[#BCF139] shadow-[4px_4px_0px_black]">
                <Briefcase className="text-[#BCF139]" size={24} strokeWidth={4} />
              </div>
              <h2 className="text-4xl text-black uppercase italic tracking-tighter">Sector_Breakdown</h2>
            </div>

            <div className="space-y-10">
              {branches.length > 0 ? branches.map((br: any, i: number) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[11px] text-black uppercase tracking-widest">{br.name}</span>
                    <span className="text-2xl text-black italic leading-none">{br.count}</span>
                  </div>
                  <div className="h-12 w-full bg-white border-[4px] border-black shadow-[6px_6px_0px_black] relative overflow-hidden group-hover:bg-gray-100 transition-colors">
                    <div 
                      className="h-full bg-[#BCF139] border-r-[4px] border-black transition-all duration-1000 ease-out" 
                      style={{ width: `${getPercent(br.count, branches[0].count)}%` }} 
                    />
                  </div>
                </div>
              )) : (
                <div className="p-16 border-[4px] border-black border-dashed text-center text-gray-400 uppercase italic bg-white/50">Node_Empty // No Sector Data</div>
              )}
            </div>
          </section>
        </div>

        {/* STICKY LEADERBOARD */}
        <div className="lg:col-span-5">
          <aside className="bg-white border-[6px] border-black p-8 shadow-[14px_14px_0px_0px_#BCF139] sticky top-8">
            <div className="flex items-center justify-between mb-10 border-b-[4px] border-black pb-5">
              <h2 className="text-4xl text-black uppercase italic tracking-tighter flex items-center gap-3">
                <BarChart3 strokeWidth={4} size={32} /> RANKING
              </h2>
              <div className="bg-black text-[#BCF139] px-2 py-1 text-[10px] uppercase border border-[#BCF139] animate-pulse">Live_Feed</div>
            </div>
            
            <div className="space-y-5">
              {leaderboard.length > 0 ? leaderboard.map((p: any, i: number) => (
                <div key={i} className={`flex items-center justify-between p-5 border-[3px] border-black shadow-[5px_5px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${i === 0 ? 'bg-[#BCF139]' : 'bg-white'}`}>
                  <div className="flex items-center gap-5 min-w-0">
                    <span className="text-black italic text-2xl opacity-30">#{i + 1}</span>
                    <div className="min-w-0">
                      <p className="text-black uppercase text-sm truncate">{p.player_name || 'ANON_USER'}</p>
                      <p className="text-[10px] text-gray-500 uppercase truncate italic tracking-wider">{p.college || 'GUEST_ZONE'}</p>
                    </div>
                  </div>
                  <p className="text-4xl text-black italic leading-none drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">{p.score}</p>
                </div>
              )) : (
                 <div className="text-center py-24 border-[4px] border-black border-dashed">
                    <Activity size={48} className="mx-auto text-gray-300 mb-4 animate-bounce" strokeWidth={4} />
                    <p className="text-gray-400 uppercase text-xs italic tracking-[0.2em]">Awaiting_Active_Runs</p>
                 </div>
              )}
            </div>

            <div className="mt-10 pt-8 border-t-[4px] border-black border-dashed flex justify-between items-center">
                <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase italic">
                    <Globe size={14} className="text-black" /> Stream_Sync: Active
                </div>
                <span className="text-xs bg-black text-[#BCF139] px-2 py-0.5 italic">v3.0.4</span>
            </div>
          </aside>
        </div>
      </main>

      {/* SYSTEM FOOTER */}
      <footer className="mt-24 bg-black border-t-[8px] border-[#BCF139] p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-10 items-center overflow-hidden whitespace-nowrap text-[#BCF139] text-xs tracking-[0.3em] uppercase italic text-black">
                <span>Klaz_Analytics_Terminal</span>
                <span className="opacity-30">//</span>
                <span>Authorized_Access_Only</span>
                <span className="opacity-30">//</span>
                <span>Node: {game.creator}</span>
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest italic">© 2025 KLAZ_RUNNER_PROTOCOL</p>
          </div>
      </footer>
    </div>
  );
}