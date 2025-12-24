'use client';

import Link from 'next/link';
import { Archivo_Black, Space_Mono } from 'next/font/google';
import { 
  ArrowLeft, 
  Check, 
  Construction, 
  Smartphone, 
  Globe,
  Server,
  Zap,
  BrainCircuit,
  Activity,
} from 'lucide-react';

const archivo = Archivo_Black({ weight: '400', subsets: ['latin'] });
const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });

// --- DATA: CORE MODULES ---

const MODULES = [
  { 
    id: 'AI', 
    name: 'NEURAL CORE', 
    version: 'v0.5.0', 
    status: 'TRAINING', 
    tech: 'PYTHON',
    bg: 'bg-[#E11D48]', // Deep Rose (Industrial Red)
    fg: 'text-white',
    icon: BrainCircuit
  },
  { 
    id: 'APP', 
    name: 'CROSS PLATFORM DEVELOPMENT', 
    version: 'ALPHA_1', 
    status: 'BUILDING', 
    tech: 'FLUTTER / DART', 
    bg: 'bg-[#3B82F6]', // Royal Blue
    fg: 'text-white',
    icon: Smartphone
  },
  {
    id: 'API', 
    name: 'BACKEND API', 
    version: 'v0.9.5', 
    status: 'STABLE', 
    tech: 'FASTAPI / PY',
    bg: 'bg-[#8B5CF6]', // Violet
    fg: 'text-white',
    icon: Server
  },
];

const ROADMAP = [
  { 
    phase: 'PHASE_01', 
    title: 'RECONNAISSANCE', 
    date: 'Q4 2025', 
    status: 'COMPLETED',
    done: true,
    desc: 'Validation & Data Collection',
    items: ['Collected User Reviews', 'Requirements Gathering', 'Tech Stack Finalization'] 
  },
  { 
    phase: 'PHASE_02', 
    title: 'CORE FABRICATION', 
    date: 'NOW', 
    status: 'IN_PROGRESS',
    current: true,
    done: false,
    desc: 'Heavy Lifting & Coding',
    items: ['Training AI Models on KTU Data', 'Flutter Cross-Platform Arch', 'API Stress Testing'] 
  },
  { 
    phase: 'PHASE_03', 
    title: 'DEPLOYMENT', 
    date: 'Q2 2026', 
    status: 'PENDING',
    done: false,
    desc: 'Launch & Iteration',
    items: ['Beta Testing (TestFlight)', 'Public Release', 'Continuous Improvement Loop'] 
  },
];

export default function StatusPage() {
  return (
    <main className={`min-h-screen bg-[#F0F2F5] text-black ${archivo.className} selection:bg-[#FBBF24] selection:text-black pb-24`}>
      
      {/* --- HEADER SECTION --- */}
      <div className="bg-black text-white pt-8 pb-12 px-6 border-b-8 border-black relative overflow-hidden">
         
         {/* Navigation */}
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
            <Link href="/" className="group flex items-center gap-3 hover:translate-x-2 transition-transform">
               {/* Updated Hover Color to Warm Amber */}
               <div className="bg-white text-black p-3 border-4 border-transparent group-hover:bg-[#FBBF24] group-hover:border-black group-hover:shadow-[4px_4px_0px_0px_#fff] transition-all">
                  <ArrowLeft size={24} strokeWidth={4} />
               </div>
               <span className={`text-sm font-bold uppercase tracking-widest ${mono.className}`}>
                  Back to Home
               </span>
            </Link>
            
            <div className={`bg-white/10 px-4 py-2 border border-white/20 backdrop-blur-sm ${mono.className}`}>
               {/* Updated Pulse Color to Emerald */}
               <span className="animate-pulse text-[#10B981] mr-2">●</span>
               STATUS: HEAVY DEVELOPMENT
            </div>
         </div>

         {/* Title */}
         <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
               BUILD<br/>TRACKER
            </h1>
            {/* Updated Accent Border to Warm Amber */}
            <p className={`text-gray-300 max-w-xl text-sm md:text-lg border-l-8 border-[#FBBF24] pl-6 py-2 bg-white/5 ${mono.className}`}>
               Integrating AI Agents with a Cross-Platform Flutter Client. <br/>
               The stack is vast. The coffee is strong.
            </p>
         </div>

         {/* Background Grid */}
         <div className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
         </div>
      </div>

      {/* --- SCROLLING MARQUEE (Warm Amber) --- */}
      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
      <div className="bg-[#FBBF24] border-b-4 border-black py-4 overflow-hidden whitespace-nowrap flex relative z-20">
         <div className="animate-marquee flex gap-8 items-center text-black font-black uppercase tracking-widest text-lg md:text-xl">
            {[...Array(10)].map((_, i) => (
               <span key={i} className="flex items-center gap-4">
                  <BrainCircuit size={24} fill="black" /> 
                  AI INTEGRATION ACTIVE // LOTS OF COFFIES // MATCHING KTU SYLLABUS // IMPROVING UX
               </span>
            ))}
         </div>
      </div>

      {/* --- MAIN CONTENT --- */}
         <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-20">

         {/* 1. MODULES (Left Sidebar - 4 Columns) */}
         <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3 mb-6 border-b-4 border-black pb-2">
               <Activity className="text-black" size={24} strokeWidth={3} />
               <h2 className={`text-xl font-black uppercase text-black ${mono.className}`}>Active_Modules</h2>
            </div>

            <div className="flex flex-col gap-4">
               {MODULES.map((mod) => (
               <div key={mod.id} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000] flex justify-between items-center group">
                  <div>
                     <h3 className="text-xl font-black uppercase leading-tight text-black">{mod.name}</h3>
                     <p className={`text-[10px] font-bold uppercase text-black opacity-70 ${mono.className}`}>{mod.tech}</p>
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-black border-2 border-black shadow-[2px_2px_0px_0px_#000] ${mod.bg} ${mod.fg}`}>
                     {mod.status}
                  </span>
               </div>
               ))}
            </div>
         </div>

         {/* 2. MISSION PLAN (Main Content - 8 Columns) */}
         <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6 border-b-4 border-black pb-2">
               <Zap className="text-black" size={24} strokeWidth={3} fill="black" />
               <h2 className={`text-xl font-black uppercase text-black ${mono.className}`}>Mission_Plan</h2>
            </div>

            <div className="flex flex-col gap-8">
               {ROADMAP.map((phase, i) => (
               <div 
                  key={i} 
                  className={`border-4 border-black p-6 md:p-8 transition-all ${
                     phase.current 
                     ? 'bg-[#FBBF24] shadow-[10px_10px_0px_0px_#000]' 
                     : 'bg-white opacity-60'
                  }`}
               >
                  {/* Header Section */}
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                     <div className="space-y-2">
                     <div className={`flex gap-2 items-center ${mono.className} text-[10px] font-bold`}>
                        <span className="bg-black text-white px-2 py-1 uppercase">{phase.phase}</span>
                        <span className="border-2 border-black text-black px-2 py-1 uppercase bg-white">{phase.date}</span>
                        {phase.current && (
                           <span className="bg-black text-[#FBBF24] px-2 py-1 border-2 border-black animate-pulse">ACTIVE</span>
                        )}
                     </div>
                     <h3 className="text-3xl md:text-5xl font-black uppercase leading-none text-black">
                        {phase.title}
                     </h3>
                     </div>
                     
                     <div className="flex items-center gap-2">
                        {phase.done && <Check size={40} strokeWidth={4} className="text-black bg-[#10B981] p-1 border-4 border-black" />}
                        {phase.current && <Construction size={40} strokeWidth={3} className="text-black animate-bounce" />}
                     </div>
                  </div>

                  <p className={`text-sm font-black uppercase text-black mb-6 border-l-4 border-black pl-4 ${mono.className}`}>
                     {phase.desc}
                  </p>
                  
                  {/* Task List - Explicit text-black and spacing */}
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t-4 border-black pt-6">
                     {phase.items.map((item, idx) => (
                     <li key={idx} className={`flex items-start gap-3 text-xs md:text-sm font-black text-black ${mono.className}`}>
                        <div className={`mt-1 w-3 h-3 border-2 border-black flex-shrink-0 ${phase.done ? 'bg-black' : 'bg-transparent'}`} />
                        <span className={phase.done ? 'line-through decoration-2 opacity-50' : ''}>
                           {item}
                        </span>
                     </li>
                     ))}
                  </ul>
               </div>
               ))}
            </div>
         </div>
         </div>

    </main>
  );
}