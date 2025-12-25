import { getGameAnalytics } from '@/app/actions';
import Link from 'next/link';
import { ArrowLeft, Play, BarChart3, MapPin, Briefcase, Zap } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function GameAnalyticsPage({ searchParams }: PageProps) {
  // 1. Extract the ID from the query string (?id=...)
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl text-black text-black uppercase italic">[!] Missing_ID</h1>
        <Link href="/play/explore" className="mt-6 bg-black text-white px-8 py-3 font-bold uppercase border-2 border-black">
          Return to Explorer
        </Link>
      </div>
    );
  }

  // 2. Query data using the Server Action
  const data = await getGameAnalytics(id);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl text-black text-black uppercase italic">Node Not Found</h1>
        <p className="text-gray-500 mt-2 font-bold uppercase text-xs">ID: {id}</p>
        <Link href="/play/explore" className="mt-8 bg-black text-white px-8 py-3 font-bold uppercase border-2 border-black">
          Back to Archives
        </Link>
      </div>
    );
  }

  const { game, totalPlays, colleges, branches, leaderboard } = data;
  const getPercent = (val: number, max: number) => Math.max(8, (val / (max || 1)) * 100);

  return (
    <div className="min-h-screen w-full bg-[#F0F0F0] text-black font-sans pb-20 selection:bg-black selection:text-[#BCF139]">
      {/* HEADER */}
      <header className="bg-white border-b-4 border-black pt-12 pb-10 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/play/explore" className="inline-flex items-center text-black text-black text-xs uppercase mb-8 hover:bg-[#BCF139] px-2 py-1 border-2 border-transparent hover:border-black transition-all">
            <ArrowLeft size={16} className="mr-2" strokeWidth={3} /> Back to Explorer
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-black text-[#BCF139] p-1 shadow-[2px_2px_0px_black]">
                    <Zap size={16} fill="currentColor" />
                </div>
                <span className="text-[10px] text-black uppercase text-gray-400">Level Data Center</span>
              </div>
              <h1 className="text-5xl md:text-7xl text-black text-black uppercase tracking-tighter leading-none italic">
                {game.creator}
              </h1>
            </div>

            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <div className="flex-1 md:flex-none bg-black text-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_#BCF139]">
                <p className="text-[10px] text-black uppercase text-[#BCF139] mb-1">Total Plays</p>
                <p className="text-4xl text-black italic leading-none">{totalPlays.toLocaleString()}</p>
              </div>
              <Link 
                href={`/play?id=${id}`}
                className="flex-1 md:flex-none bg-[#BCF139] text-black border-4 border-black px-10 py-4 text-xl text-black uppercase shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 active:bg-white"
              >
                <Play fill="currentColor" size={20} /> Play
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* CHARTS */}
        <div className="lg:col-span-7 space-y-16">
          <section>
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="text-blue-600" size={24} strokeWidth={4} />
              <h2 className="text-3xl text-black text-black uppercase italic tracking-tighter">Top Colleges</h2>
            </div>
            
            <div className="space-y-8">
              {colleges.length > 0 ? colleges.map((col: any, i: number) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs text-black text-black uppercase truncate pr-4">{col.name}</span>
                    <span className="text-lg text-black text-black italic">{col.count}</span>
                  </div>
                  <div className="h-10 w-full bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_black] relative overflow-hidden group-hover:bg-gray-50 transition-colors">
                    <div 
                      className="h-full bg-blue-500 border-r-[3px] border-black transition-all duration-1000" 
                      style={{ width: `${getPercent(col.count, colleges[0].count)}%` }} 
                    />
                  </div>
                </div>
              )) : (
                <div className="p-12 border-4 border-black border-dashed text-center text-gray-400 text-black uppercase bg-white/50">No Data Reported</div>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-[#BCF139]" size={24} strokeWidth={4} />
              <h2 className="text-3xl text-black text-black uppercase italic tracking-tighter">Top Branches</h2>
            </div>

            <div className="space-y-8">
              {branches.length > 0 ? branches.map((br: any, i: number) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs text-black text-black uppercase">{br.name}</span>
                    <span className="text-lg text-black text-black italic">{br.count}</span>
                  </div>
                  <div className="h-10 w-full bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_black] relative overflow-hidden group-hover:bg-gray-50 transition-colors">
                    <div 
                      className="h-full bg-[#BCF139] border-r-[3px] border-black transition-all duration-1000" 
                      style={{ width: `${getPercent(br.count, branches[0].count)}%` }} 
                    />
                  </div>
                </div>
              )) : (
                <div className="p-12 border-4 border-black border-dashed text-center text-gray-400 text-black uppercase bg-white/50">No Data Reported</div>
              )}
            </div>
          </section>
        </div>

        {/* LEADERBOARD */}
        <div className="lg:col-span-5">
          <div className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_0px_#BCF139] sticky top-8">
            <div className="flex items-center gap-3 mb-8 border-b-4 border-black pb-4">
              <BarChart3 size={28} strokeWidth={4} className="text-black" />
              <h2 className="text-3xl text-black text-black uppercase italic tracking-tighter">Leaderboard</h2>
            </div>
            
            <div className="space-y-4">
              {leaderboard.length > 0 ? leaderboard.map((p: any, i: number) => (
                <div key={i} className={`flex items-center justify-between p-4 border-[3px] border-black shadow-[4px_4px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${i === 0 ? 'bg-[#BCF139]' : 'bg-white'}`}>
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-black text-black italic text-xl opacity-20">#{i + 1}</span>
                    <div className="min-w-0">
                      <p className="text-black text-black uppercase text-sm truncate">{p.player_name || 'Anonymous'}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase truncate">{p.college || 'Guest'}</p>
                    </div>
                  </div>
                  <p className="text-3xl text-black text-black italic ml-4 leading-none">{p.score}</p>
                </div>
              )) : (
                 <div className="text-center py-20 border-4 border-black border-dashed">
                    <p className="text-gray-400 text-black uppercase text-xs italic tracking-widest">Awaiting records...</p>
                 </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}