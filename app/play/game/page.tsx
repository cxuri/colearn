import { getGameAnalytics } from '@/app/actions';
import Link from 'next/link';
import { ArrowLeft, Play, BarChart3, MapPin, Briefcase, Zap, Globe, Activity } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

// STYLES SYSTEM
const UI = {
  h1: "text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] uppercase tracking-tighter italic font-black leading-[0.8] text-black",
  h2: "text-4xl md:text-6xl uppercase italic tracking-tighter font-black text-black",
  label: "text-[10px] md:text-xs uppercase tracking-[0.2em] font-black text-black",
  mono: "font-mono font-black text-[10px] uppercase tracking-widest text-black",
  cardShadow: "shadow-[8px_8px_0px_0px_#000] md:shadow-[16px_16px_0px_0px_#000]",
};

export default async function GameAnalyticsPage({ searchParams }: PageProps) {
  const { id } = await searchParams;

  if (!id) return <ErrorState message="MISSING_ID" />;

  const data = await getGameAnalytics(id);
  if (!data) return <ErrorState message="NODE_OFFLINE" submessage={`Target_ID: ${id}`} />;

  const { game, totalPlays, colleges, branches, leaderboard } = data;
  const getPercent = (val: number, max: number) => Math.max(8, (val / (max || 1)) * 100);

  return (
    <div className="min-h-screen w-full bg-[#EAEAEA] text-black font-black selection:bg-black selection:text-[#BCF139] overflow-x-hidden leading-none">
      {/* INDUSTRIAL DOT GRID */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1.5px, transparent 1.5px)`, backgroundSize: '24px 24px' }} />

      {/* HEADER */}
      <header className="relative z-10 bg-white border-b-[10px] md:border-b-[14px] border-black pt-10 pb-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/play/explore" className="inline-flex items-center text-xs uppercase mb-8 border-[5px] border-black px-4 py-2 hover:bg-black hover:text-[#BCF139] transition-all text-black">
            <ArrowLeft className="mr-3 w-5 h-5" strokeWidth={6} /> BACK_TO_ARCHIVE
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-black text-[#BCF139] p-3 border-4 border-black shadow-[4px_4px_0px_black]">
                    <Zap className="w-7 h-7" fill="currentColor" />
                </div>
                <span className={UI.mono}>TELEMETRY_NODE // {id.slice(0,8)}</span>
              </div>
              <h1 className={UI.h1}>
                {game.creator}<br/>
                <span className="text-[#BCF139] drop-shadow-[4px_4px_0px_black]" style={{ WebkitTextStroke: '3px black' }}>REPORTS</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
              <div className="bg-black text-[#BCF139] p-8 border-[6px] md:border-[8px] border-[#BCF139] flex-1 sm:min-w-[240px] shadow-[10px_10px_0px_black]">
                <p className="text-xs uppercase tracking-[0.3em] mb-3 italic font-black">GLOBAL_RUNS</p>
                <p className="text-6xl md:text-8xl italic font-black">{totalPlays.toLocaleString()}</p>
              </div>
              <Link href={`/play?id=${id}`} className="bg-[#BCF139] text-black border-[6px] md:border-[10px] border-black px-10 py-8 text-4xl md:text-6xl hover:bg-black hover:text-[#BCF139] transition-all flex items-center justify-center gap-6 shadow-[12px_12px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none">
                <Play fill="currentColor" className="w-10 h-10 md:w-14 md:h-14" /> DEPLOY
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
        
        {/* STATS COLUMN */}
        <div className="lg:col-span-7 space-y-24">
          <StatSection 
            title="Regional_Intel" 
            icon={<MapPin className="text-black w-8 h-8" strokeWidth={6} />} 
            data={colleges} 
            color="bg-blue-600"
            getPercent={getPercent}
          />
          <StatSection 
            title="Sector_Intel" 
            icon={<Briefcase className="text-black w-8 h-8" strokeWidth={6} />} 
            data={branches} 
            color="bg-[#BCF139]"
            getPercent={getPercent}
          />
        </div>

        {/* LEADERBOARD COLUMN */}
        <div className="lg:col-span-5">
          <aside className={`bg-white border-[8px] border-black p-8 ${UI.cardShadow} lg:sticky lg:top-12`}>
            <div className="flex items-center justify-between mb-10 border-b-[6px] border-black pb-6">
              <h2 className="text-4xl md:text-5xl uppercase italic tracking-tighter flex items-center gap-4 text-black">
                <BarChart3 strokeWidth={6} className="w-10 h-10" /> RANK
              </h2>
              <div className="bg-black text-[#BCF139] px-3 py-1 text-xs border-2 border-[#BCF139] animate-pulse font-black">LIVE_FEED</div>
            </div>
            
            <div className="space-y-6">
              {leaderboard.length > 0 ? leaderboard.map((p: any, i: number) => (
                <div key={i} className={`flex items-center justify-between p-6 border-[5px] border-black transition-all ${i === 0 ? 'bg-[#BCF139]' : 'bg-white shadow-[6px_6px_0px_black]'}`}>
                  <div className="flex items-center gap-6 min-w-0">
                    <span className="italic text-3xl md:text-4xl text-black opacity-30">#{i + 1}</span>
                    <div className="min-w-0">
                      <p className="uppercase text-lg md:text-xl truncate leading-none mb-1 text-black">{p.player_name || 'ANON_USER'}</p>
                      <p className="text-xs text-black uppercase truncate italic font-black tracking-widest">{p.college || 'GUEST_ZONE'}</p>
                    </div>
                  </div>
                  <p className="text-4xl md:text-5xl italic text-black">{p.score}</p>
                </div>
              )) : <EmptyState icon={<Activity size={50} className="animate-bounce text-black" strokeWidth={6} />} label="WAITING_FOR_ENTRIES" />}
            </div>

            <div className="mt-12 pt-8 border-t-[6px] border-black border-dashed flex justify-between items-center text-black">
                <div className="flex items-center gap-3 text-xs uppercase font-black italic">
                    <Globe className="w-5 h-5" strokeWidth={6} /> SYNC: ACTIVE
                </div>
                <span className="text-[10px] bg-black text-[#BCF139] px-3 py-1 italic tracking-widest uppercase border-2 border-black font-black">v3.0.4</span>
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-32 bg-black border-t-[15px] border-[#BCF139] p-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-wrap justify-center gap-10 items-center text-[#BCF139] text-xs tracking-[0.4em] uppercase italic font-black">
            <span>TERMINAL_ARCHIVE</span>
            <span className="hidden md:inline text-[#BCF139] opacity-40">//</span>
            <span>USER: {game.creator}</span>
            <span className="hidden md:inline text-[#BCF139] opacity-40">//</span>
            <span>ENCRYPTED_FEED</span>
          </div>
          <p className="text-[10px] text-[#BCF139]/50 uppercase tracking-[0.5em] italic font-black">© 2025 KLAZ_RUNNER_PROTOCOL</p>
        </div>
      </footer>
    </div>
  );
}

/* HELPER COMPONENTS */

function StatSection({ title, icon, data, color, getPercent }: any) {
  return (
    <section>
      <div className="flex items-center gap-6 mb-10">
        <div className="bg-black p-3 border-[5px] border-black shadow-[6px_6px_0px_black] text-white">
          {icon}
        </div>
        <h2 className={UI.h2}>{title}</h2>
      </div>
      <div className="space-y-10">
        {data.length > 0 ? data.map((item: any, i: number) => (
          <div key={i} className="group">
            <div className="flex justify-between items-end mb-3">
              <span className="text-xs md:text-sm uppercase tracking-widest font-black text-black truncate pr-4">{item.name}</span>
              <span className="text-3xl md:text-5xl italic font-black text-black leading-none">{item.count}</span>
            </div>
            <div className="h-12 md:h-16 w-full bg-white border-[6px] border-black relative overflow-hidden shadow-[6px_6px_0px_black]">
              <div 
                className={`h-full ${color} border-r-[6px] border-black transition-all duration-1000 ease-out`} 
                style={{ width: `${getPercent(item.count, data[0].count)}%` }} 
              />
            </div>
          </div>
        )) : <EmptyState label={`AWAITING_${title.toUpperCase()}`} />}
      </div>
    </section>
  );
}

function ErrorState({ message, submessage }: { message: string, submessage?: string }) {
  return (
    <div className="min-h-screen bg-[#EAEAEA] flex flex-col items-center justify-center p-6 text-center font-black">
      <h1 className="text-5xl md:text-8xl text-black uppercase italic tracking-tighter underline decoration-[12px]">{message}</h1>
      {submessage && <p className="mt-6 uppercase text-sm text-black tracking-[0.3em] font-black">{submessage}</p>}
      <Link href="/play/explore" className="mt-12 bg-black text-[#BCF139] px-12 py-6 border-[6px] border-black uppercase hover:bg-[#BCF139] hover:text-black transition-all text-2xl font-black shadow-[10px_10px_0px_black]">
        Return to Archive
      </Link>
    </div>
  );
}

function EmptyState({ icon, label }: any) {
  return (
    <div className="p-20 border-[8px] border-black border-dashed text-center bg-white/50">
      {icon && <div className="mb-8 flex justify-center">{icon}</div>}
      <p className="uppercase italic text-xs tracking-[0.4em] font-black text-black">{label}</p>
    </div>
  );
}