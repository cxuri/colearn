import { getGameAnalytics } from '@/app/actions';
import Link from 'next/link';
import { ArrowLeft, Play, BarChart3, MapPin, Briefcase } from 'lucide-react';

export default async function GameAnalyticsPage({ params }: { params: { id: string } }) {
  const data = await getGameAnalytics(params.id);

  if (!data) return <div className="p-10 font-bold text-center text-xl">Game not found.</div>;

  const { game, totalPlays, colleges, branches, leaderboard } = data;

  // Helper for percentage bars
  const getPercent = (val: number, max: number) => Math.max(5, (val / max) * 100);

  return (
    <div className="min-h-screen bg-[#fff] font-mono text-black pb-20">
      
      {/* Navbar / Header */}
      <div className="bg-[#e0f2fe] border-b-4 border-black p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <Link href="/play/explore" className="inline-flex items-center font-bold text-sm hover:underline mb-6">
            <ArrowLeft size={16} className="mr-2"/> Back to Levels
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
                {game.creator}'s Level
              </h1>
              <div className="flex gap-4 text-sm font-bold">
                <span className="bg-black text-white px-2 py-1">TOTAL PLAYS: {totalPlays}</span>
                <span className="bg-[#FFD700] text-black px-2 py-1 border-2 border-black">
                  ID: {game.id.substring(0,6)}...
                </span>
              </div>
            </div>

            <a 
              href={`/play?id=${game.id}`}
              className="bg-[#FF4444] text-white border-4 border-black px-8 py-4 font-black text-xl shadow-[6px_6px_0px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3 uppercase"
            >
              <Play fill="currentColor" /> Play This Level
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4">

        {/* --- LEFT COLUMN: DEMOGRAPHICS --- */}
        <div className="space-y-8">
          
          {/* Top Colleges */}
          <div className="bg-white">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <MapPin className="text-blue-600" strokeWidth={3} /> 
              TOP COLLEGES
            </h2>
            <div className="space-y-4">
              {colleges.length > 0 ? colleges.map((col: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold mb-1 uppercase">
                    <span>{col.name}</span>
                    <span>{col.count}</span>
                  </div>
                  <div className="h-6 w-full bg-gray-100 border-2 border-black relative">
                    <div 
                      className="h-full bg-blue-500 absolute top-0 left-0" 
                      style={{ width: `${getPercent(col.count, colleges[0].count)}%` }} 
                    />
                  </div>
                </div>
              )) : (
                <p className="text-gray-400 italic font-bold">No data yet.</p>
              )}
            </div>
          </div>

          <div className="border-t-4 border-black border-dashed my-8" />

          {/* Top Branches */}
          <div className="bg-white">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <Briefcase className="text-green-600" strokeWidth={3} /> 
              TOP BRANCHES
            </h2>
            <div className="space-y-4">
              {branches.length > 0 ? branches.map((br: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold mb-1 uppercase">
                    <span>{br.name}</span>
                    <span>{br.count}</span>
                  </div>
                  <div className="h-6 w-full bg-gray-100 border-2 border-black relative">
                    <div 
                      className="h-full bg-green-500 absolute top-0 left-0" 
                      style={{ width: `${getPercent(br.count, branches[0].count)}%` }} 
                    />
                  </div>
                </div>
              )) : (
                <p className="text-gray-400 italic font-bold">No data yet.</p>
              )}
            </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN: LEADERBOARD --- */}
        <div className="bg-gray-50 border-4 border-black p-6 h-fit shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2 border-b-4 border-black pb-4">
            <BarChart3 strokeWidth={3} /> 
            LEADERBOARD
          </h2>
          
          <div className="space-y-0">
            {leaderboard.length > 0 ? leaderboard.map((p: any, i: number) => (
              <div 
                key={i} 
                className={`flex items-center justify-between py-3 border-b border-gray-300 ${i === 0 ? 'text-[#eab308]' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-black w-6 text-lg text-gray-400">#{i+1}</span>
                  <div>
                    <div className="font-bold text-black uppercase leading-tight">{p.player_name}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase truncate max-w-[120px]">
                      {p.college || 'Unknown'}
                    </div>
                  </div>
                </div>
                <div className="font-black text-xl font-mono">{p.score}</div>
              </div>
            )) : (
               <div className="text-center py-10 text-gray-400 font-bold">
                 Be the first to play!
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}