import { getGameAnalytics } from '@/app/actions';
import Link from 'next/link';
import { ArrowLeft, Play, BarChart3, MapPin, Briefcase, Zap, Globe, Activity } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function GameAnalyticsPage({ searchParams }: PageProps) {
  const { id } = await searchParams;

  if (!id) return <ErrorState message="MISSING_ID" />;

  const data = await getGameAnalytics(id);
  if (!data) return <ErrorState message="NODE_OFFLINE" submessage={`Target_ID: ${id}`} />;

  const { game, totalPlays, colleges, branches, leaderboard } = data;
  const getPercent = (val: number, max: number) => Math.max(8, (val / (max || 1)) * 100);

  return (
    <div className="min-h-screen w-full bg-[#EAEAEA] text-black font-black selection:bg-black selection:text-[#BCF139] overflow-x-hidden">
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 z-0 opacity-[0.12] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

      {/* HEADER */}
      <header className="relative z-10 bg-white border-b-8 md:border-b-[12px] border-black pt-8 md:pt-12 pb-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/play/explore" className="inline-flex items-center text-[10px] md:text-xs uppercase mb-6 border-4 border-black px-3 py-1.5 hover:bg-black hover:text-[#BCF139] transition-all">
            <ArrowLeft className="mr-2 w-4 h-4" strokeWidth={4} /> BACK_TO_ARCHIVE
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-black text-[#BCF139] p-2 border-4 border-black shadow-[3px_3px_0px_black]">
                    <Zap className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
                </div>
                <span className="text-[10px] uppercase tracking-widest italic opacity-70">TELEMETRY // {id.slice(0,8)}</span>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] uppercase tracking-tighter leading-[0.85] italic break-words">
                {game.creator}<br/>
                <span className="text-[#BCF139] drop-shadow-[2px_2px_0px_black]" style={{ WebkitTextStroke: '2px black' }}>REPORTS</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="bg-black text-[#BCF139] p-6 border-4 md:border-8 border-[#BCF139] flex-1 sm:min-w-[200px] shadow-[6px_6px_0px_black]">
                <p className="text-[10px] uppercase tracking-widest mb-1 opacity-70 italic">GLOBAL_RUNS</p>
                <p className="text-5xl md:text-6xl italic">{totalPlays.toLocaleString()}</p>
              </div>
              <Link href={`/play?id=${id}`} className="bg-[#BCF139] text-black border-4 md:border-8 border-black px-8 py-6 text-3xl md:text-5xl hover:bg-black hover:text-[#BCF139] transition-all flex items-center justify-center gap-4 shadow-[8px_8px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none">
                <Play fill="currentColor" className="w-8 h-8 md:w-10 md:h-10" /> DEPLOY
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* STATS COLUMN */}
        <div className="lg:col-span-7 space-y-16">
          <StatSection 
            title="Regional_Intel" 
            icon={<MapPin className="text-blue-500 w-6 h-6" strokeWidth={4} />} 
            data={colleges} 
            color="bg-blue-600"
            getPercent={getPercent}
          />
          <StatSection 
            title="Sector_Intel" 
            icon={<Briefcase className="text-[#BCF139] w-6 h-6" strokeWidth={4} />} 
            data={branches} 
            color="bg-[#BCF139]"
            getPercent={getPercent}
          />
        </div>

        {/* LEADERBOARD COLUMN */}
        <div className="lg:col-span-5">
          <aside className="bg-white border-8 border-black p-6 shadow-[12px_12px_0px_#BCF139] lg:sticky lg:top-8">
            <div className="flex items-center justify-between mb-8 border-b-4 border-black pb-4">
              <h2 className="text-3xl md:text-5xl uppercase italic tracking-tighter flex items-center gap-2">
                <BarChart3 strokeWidth={4} className="w-8 h-8" /> RANK
              </h2>
              <div className="bg-black text-[#BCF139] px-2 py-0.5 text-[10px] border-2 border-[#BCF139] animate-pulse">LIVE</div>
            </div>
            
            <div className="space-y-4">
              {leaderboard.length > 0 ? leaderboard.map((p: any, i: number) => (
                <div key={i} className={`flex items-center justify-between p-4 border-4 border-black transition-all ${i === 0 ? 'bg-[#BCF139]' : 'bg-white shadow-[4px_4px_0px_black]'}`}>
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="italic text-2xl opacity-30">#{i + 1}</span>
                    <div className="min-w-0">
                      <p className="uppercase text-sm md:text-lg truncate leading-none mb-1">{p.player_name || 'ANON_USER'}</p>
                      <p className="text-[9px] opacity-50 uppercase truncate italic">{p.college || 'GUEST_ZONE'}</p>
                    </div>
                  </div>
                  <p className="text-3xl md:text-4xl italic">{p.score}</p>
                </div>
              )) : <EmptyState icon={<Activity size={40} className="animate-bounce" />} label="WAITING_FOR_ENTRIES" />}
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-20 bg-black border-t-[10px] border-[#BCF139] p-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 items-center text-[#BCF139] text-[10px] md:text-xs tracking-[0.3em] uppercase italic">
            <span>TERMINAL_ARCHIVE</span>
            <span className="hidden md:inline opacity-40">//</span>
            <span>USER: {game.creator}</span>
          </div>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest">© 2025 KLAZ_RUNNER_PROTOCOL</p>
        </div>
      </footer>
    </div>
  );
}

/* HELPER COMPONENTS */

function StatSection({ title, icon, data, color, getPercent }: any) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-black p-2.5 border-4 border-black shadow-[4px_4px_0px_#00000033]">{icon}</div>
        <h2 className="text-3xl md:text-5xl uppercase italic tracking-tighter">{title}</h2>
      </div>
      <div className="space-y-6">
        {data.length > 0 ? data.map((item: any, i: number) => (
          <div key={i} className="group">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] md:text-xs uppercase tracking-wider truncate pr-4">{item.name}</span>
              <span className="text-xl md:text-3xl italic leading-none">{item.count}</span>
            </div>
            <div className="h-8 md:h-12 w-full bg-white border-4 border-black relative overflow-hidden shadow-[3px_3px_0px_black]">
              <div 
                className={`h-full ${color} border-r-4 border-black transition-all duration-1000 ease-out`} 
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
      <h1 className="text-4xl md:text-6xl text-black uppercase italic tracking-tighter underline decoration-8">{message}</h1>
      {submessage && <p className="mt-4 uppercase text-xs opacity-60 tracking-widest">{submessage}</p>}
      <Link href="/play/explore" className="mt-8 bg-black text-[#BCF139] px-8 py-4 border-4 border-black uppercase hover:bg-[#BCF139] hover:text-black transition-all">
        Return to Archive
      </Link>
    </div>
  );
}

function EmptyState({ icon, label }: any) {
  return (
    <div className="p-12 border-4 border-black border-dashed text-center bg-white/50">
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <p className="uppercase italic text-[10px] tracking-widest">{label}</p>
    </div>
  );
}