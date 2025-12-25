import { getGameAnalytics } from '@/app/actions';
import Link from 'next/link';
import { ArrowLeft, Play, BarChart3, MapPin, Briefcase } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GameAnalyticsPage({ params }: PageProps) {
  const { id } = await params;
  const data = await getGameAnalytics(id);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl text-black text-black uppercase tracking-tight">Level Not Found</h1>
        <p className="text-gray-600 mt-2">We couldn't find any data for this specific level ID.</p>
        <Link href="/play/explore" className="mt-6 bg-black text-white px-8 py-3 font-bold uppercase border-2 border-black hover:bg-white hover:text-black transition-all">
          Back to Levels
        </Link>
      </div>
    );
  }

  const { game, totalPlays, colleges, branches, leaderboard } = data;

  // Simple helper for bar widths
  const getPercent = (val: number, max: number) => (val / (max || 1)) * 100;

  return (
    <div className="min-h-screen w-full bg-[#F5F5F5] text-black font-sans pb-20">
      
      {/* HEADER SECTION */}
      <header className="bg-white border-b-4 border-black pt-12 pb-10 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/play/explore" className="inline-flex items-center text-black font-bold text-sm uppercase mb-8 hover:underline decoration-2 underline-offset-4">
            <ArrowLeft size={18} className="mr-2" /> All Levels
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <p className="text-xs text-black uppercase text-gray-500 mb-2 tracking-widest">Level Statistics</p>
              <h1 className="text-5xl md:text-7xl text-black text-black uppercase tracking-tighter leading-none">
                {game.creator}
              </h1>
            </div>

            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <div className="flex-1 md:flex-none bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                <p className="text-[10px] text-black uppercase text-gray-400">Total Plays</p>
                <p className="text-3xl text-black text-black leading-none">{totalPlays.toLocaleString()}</p>
              </div>
              <Link 
                href={`/play?id=${id}`}
                className="flex-1 md:flex-none bg-[#BCF139] text-black border-4 border-black px-10 py-4 text-xl text-black uppercase shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3"
              >
                <Play fill="currentColor" size={20} /> Play
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: CHARTS */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Colleges Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-blue-600" size={24} strokeWidth={3} />
              <h2 className="text-2xl text-black text-black uppercase italic">Top Colleges</h2>
            </div>
            
            <div className="space-y-6">
              {colleges.length > 0 ? colleges.map((col: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-black text-black uppercase truncate pr-4">{col.name}</span>
                    <span className="text-sm text-black text-black bg-white border-2 border-black px-2">{col.count}</span>
                  </div>
                  <div className="h-8 w-full bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] relative overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 border-r-2 border-black transition-all duration-700" 
                      style={{ width: `${getPercent(col.count, colleges[0].count)}%` }} 
                    />
                  </div>
                </div>
              )) : (
                <p className="text-gray-400 font-bold uppercase border-2 border-dashed border-gray-300 p-8 text-center bg-white/50">No college data available yet.</p>
              )}
            </div>
          </section>

          {/* Branches Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-green-600" size={24} strokeWidth={3} />
              <h2 className="text-2xl text-black text-black uppercase italic">Top Branches</h2>
            </div>

            <div className="space-y-6">
              {branches.length > 0 ? branches.map((br: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-black text-black uppercase">{br.name}</span>
                    <span className="text-sm text-black text-black bg-white border-2 border-black px-2">{br.count}</span>
                  </div>
                  <div className="h-8 w-full bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] relative overflow-hidden">
                    <div 
                      className="h-full bg-[#BCF139] border-r-2 border-black transition-all duration-700" 
                      style={{ width: `${getPercent(br.count, branches[0].count)}%` }} 
                    />
                  </div>
                </div>
              )) : (
                <p className="text-gray-400 font-bold uppercase border-2 border-dashed border-gray-300 p-8 text-center bg-white/50">No branch data available yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: LEADERBOARD */}
        <div className="lg:col-span-5">
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
            <div className="flex items-center gap-3 mb-6 border-b-4 border-black pb-4">
              <BarChart3 size={24} strokeWidth={3} />
              <h2 className="text-2xl text-black text-black uppercase">Leaderboard</h2>
            </div>
            
            <div className="divide-y-2 divide-gray-100">
              {leaderboard.length > 0 ? leaderboard.map((p: any, i: number) => (
                <div key={i} className="flex items-center justify-between py-4 group">
                  <div className="flex items-center gap-4 min-w-0">
                    <span className={`text-lg text-black italic ${i < 3 ? 'text-black' : 'text-gray-300'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-black text-black uppercase text-sm truncate">{p.player_name || 'Anonymous'}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase truncate">
                        {p.college || 'Guest'}
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl text-black text-black ml-4">{p.score}</p>
                </div>
              )) : (
                 <div className="text-center py-12">
                    <p className="text-gray-400 font-bold uppercase text-xs">No records found.</p>
                 </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t-2 border-black border-dashed">
                <p className="text-[10px] text-black text-gray-400 uppercase text-center tracking-widest">
                  Updated in real-time
                </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}