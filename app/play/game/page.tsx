import { getGameAnalytics } from '@/app/actions';
import Link from 'next/link';
import { Archivo_Black, Space_Mono } from 'next/font/google';
import { 
  ArrowLeft, Play, BarChart3, MapPin, 
  Briefcase, Zap, Globe, Activity,
  Target, TrendingUp, ArrowDownRight
} from 'lucide-react';

const archivo = Archivo_Black({ weight: '400', subsets: ['latin'] });
const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function GameAnalyticsPage({ searchParams }: PageProps) {
  // 1. Properly await the searchParams promise
  const params = await searchParams;
  const id = params.id;

  if (!id) return <ErrorState message="MISSING_ID" submessage="No target node specified in request." />;

  const data = await getGameAnalytics(id);
  if (!data) return <ErrorState message="NODE_OFFLINE" submessage={`Target_ID: ${id}`} />;

  const { game, totalPlays, colleges, branches, leaderboard } = data;
  const getPercent = (val: number, max: number) => Math.max(8, (val / (max || 1)) * 100);

  return (
    <div className={`min-h-screen w-full bg-[#F0F2F5] text-black ${archivo.className} selection:bg-[#FBBF24] selection:text-black overflow-x-hidden`}
         style={{ backgroundImage: 'radial-gradient(#94A3B8 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
      
      {/* NAVIGATION */}
      <nav className="relative z-30 w-full px-4 md:px-8 pt-8 max-w-7xl mx-auto">
        <Link href="/play/explore" className={`group inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all ${mono.className}`}>
          <ArrowLeft size={18} strokeWidth={2.5} />
          <span className="text-xs font-bold uppercase tracking-widest">Archive_Return</span>
        </Link>
      </nav>

      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          
          <div className="space-y-4">
            <div className={`inline-flex items-center gap-2 bg-black text-white px-3 py-1 text-[10px] font-bold uppercase border-2 border-black ${mono.className}`}>
               <Zap size={14} className="text-[#FBBF24]" fill="currentColor" />
               // Telemetry: {id ? id.slice(0, 8) : '00000000'}
            </div>
            <h1 className="text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter text-black">
              {game.creator}<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>ANALYTICS</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#FBBF24] -rotate-1">
               <p className={`text-[10px] font-bold uppercase text-gray-500 mb-2 ${mono.className}`}>Global_Runs</p>
               <div className="flex items-center gap-3">
                  <TrendingUp className="text-[#10B981]" size={24} />
                  <span className="text-4xl md:text-5xl font-black">{totalPlays.toLocaleString()}</span>
               </div>
            </div>
            <Link href={`/play?id=${id}`} className="group bg-[#FBBF24] text-black border-4 border-black px-8 py-6 text-xl font-black uppercase flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              Deploy Run <ArrowDownRight className="group-hover:-rotate-90 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-12">
          <StatCard title="Regional_Distribution" icon={<MapPin size={20} />} data={colleges} barColor="bg-[#2563EB]" getPercent={getPercent} />
          <StatCard title="Stream_Intel" icon={<Briefcase size={20} />} data={branches} barColor="bg-[#A855F7]" getPercent={getPercent} />
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[12px_12px_0px_0px_#000] lg:sticky lg:top-8">
            <div className="flex justify-between items-center mb-8 border-b-2 border-black pb-4">
               <div className="flex items-center gap-3 text-black">
                  <BarChart3 size={24} />
                  <h2 className="text-2xl uppercase tracking-tighter">Leaderboard</h2>
               </div>
               <div className={`flex items-center gap-2 text-[10px] font-bold bg-[#10B981]/10 text-[#10B981] px-2 py-1 border border-[#10B981] ${mono.className}`}>
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
                  LIVE_SYNC
               </div>
            </div>

            <div className="space-y-4">
              {leaderboard.length > 0 ? leaderboard.map((p: any, i: number) => (
                <div key={i} className={`relative group ${mono.className}`}>
                  <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></div>
                  <div className={`relative flex items-center justify-between p-4 border-2 border-black bg-white ${i === 0 ? 'border-[#FBBF24] border-4' : ''}`}>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold opacity-30">0{i + 1}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold uppercase truncate max-w-[140px] text-black">{p.player_name || 'Anonymous'}</span>
                        <span className="text-[10px] text-gray-500 font-bold">{p.college || 'General'}</span>
                      </div>
                    </div>
                    <span className="text-xl font-black text-black">{p.score}</span>
                  </div>
                </div>
              )) : (
                <div className="p-8 border-2 border-dashed border-gray-300 text-center uppercase text-[10px] font-bold text-gray-400">
                    Awaiting entries...
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, icon, data, barColor, getPercent }: any) {
  return (
    <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-black text-white p-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]">
          {icon}
        </div>
        <h2 className="text-2xl uppercase tracking-tighter text-black">{title}</h2>
      </div>

      <div className="space-y-6">
        {data.length > 0 ? data.map((item: any, i: number) => (
          <div key={i} className={mono.className}>
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold uppercase truncate max-w-[70%] text-black">{item.name}</span>
              <span className="text-sm font-black text-black">{item.count}</span>
            </div>
            <div className="h-6 w-full bg-[#F0F2F5] border-2 border-black relative">
              <div 
                className={`h-full ${barColor} border-r-2 border-black transition-all duration-1000`}
                style={{ width: `${getPercent(item.count, data[0].count)}%` }}
              />
            </div>
          </div>
        )) : (
            <div className={`text-[10px] font-bold text-gray-400 uppercase ${mono.className}`}>No data logged for {title}</div>
        )}
      </div>
    </div>
  );
}

function ErrorState({ message, submessage }: { message: string, submessage: string }) {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-[#F0F2F5] ${archivo.className}`}>
      <div className="bg-white border-4 border-black p-12 text-center shadow-[16px_16px_0px_0px_#000] max-w-md mx-4">
        <Activity size={48} className="mx-auto mb-6 text-red-500 animate-pulse" />
        <h1 className="text-4xl uppercase tracking-tighter mb-4 text-black">{message}</h1>
        <p className={`${mono.className} text-xs font-bold text-gray-500 mb-8 uppercase leading-relaxed`}>{submessage}</p>
        <Link href="/play/explore" className="block w-full bg-black text-white px-8 py-4 uppercase text-sm font-bold hover:bg-[#FBBF24] hover:text-black transition-colors">
          Return to Archive
        </Link>
      </div>
    </div>
  );
}