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
  BrainCircuit
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
    tech: 'LLM / RAG',
    bg: 'bg-[#FF6B6B]', // Hot Red
    fg: 'text-black',
    icon: BrainCircuit
  },
  { 
    id: 'APP', 
    name: 'MOBILE APP', 
    version: 'ALPHA_1', 
    status: 'BUILDING', 
    tech: 'FLUTTER / DART', 
    bg: 'bg-[#60A5FA]', // Blue
    fg: 'text-black',
    icon: Smartphone
  },
  { 
    id: 'WEB', 
    name: 'WEB CLIENT', 
    version: 'v1.0.2', 
    status: 'LIVE', 
    tech: 'NEXT.JS 14',
    bg: 'bg-[#A3E635]', // Lime Green
    fg: 'text-black',
    icon: Globe
  },
  { 
    id: 'API', 
    name: 'BACKEND API', 
    version: 'v0.9.5', 
    status: 'STABLE', 
    tech: 'FASTAPI / PY',
    bg: 'bg-[#F472B6]', // Pink
    fg: 'text-black',
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
    <main className={`min-h-screen bg-[#E0E0E0] text-black ${archivo.className} selection:bg-black selection:text-white pb-24`}>
      
      {/* --- HEADER SECTION --- */}
      <div className="bg-black text-white pt-8 pb-12 px-6 border-b-8 border-black relative overflow-hidden">
         
         {/* Navigation - Stacked on Mobile, Row on Desktop */}
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
            <Link href="/" className="group flex items-center gap-3 hover:translate-x-2 transition-transform">
               <div className="bg-white text-black p-3 border-4 border-transparent group-hover:bg-[#FACC15] group-hover:border-black group-hover:shadow-[4px_4px_0px_0px_#fff] transition-all">
                  <ArrowLeft size={24} strokeWidth={4} />
               </div>
               <span className={`text-sm font-bold uppercase tracking-widest ${mono.className}`}>
                  Back to Home
               </span>
            </Link>
            
            <div className={`bg-white/10 px-4 py-2 border border-white/20 backdrop-blur-sm ${mono.className}`}>
               <span className="animate-pulse text-[#A3E635] mr-2">●</span>
               STATUS: HEAVY DEVELOPMENT
            </div>
         </div>

         {/* Title - Smaller Text on Mobile */}
         <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
               BUILD<br/>TRACKER
            </h1>
            <p className={`text-gray-300 max-w-xl text-sm md:text-lg border-l-8 border-[#FACC15] pl-6 py-2 bg-white/5 ${mono.className}`}>
               Integrating AI Agents with a Cross-Platform Flutter Client. <br/>
               The stack is vast. The coffee is strong.
            </p>
         </div>

         {/* Background Grid */}
         <div className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
         </div>
      </div>

      {/* --- SCROLLING MARQUEE --- */}
      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
      <div className="bg-[#FACC15] border-b-4 border-black py-4 overflow-hidden whitespace-nowrap flex relative z-20">
         <div className="animate-marquee flex gap-8 items-center text-black font-black uppercase tracking-widest text-lg md:text-xl">
            {[...Array(10)].map((_, i) => (
               <span key={i} className="flex items-center gap-4">
                  <BrainCircuit size={24} fill="black" /> 
                  AI INTEGRATION ACTIVE // FLUTTER ENGINE RUNNING // KTU ARCHIVES SYNCING
               </span>
            ))}
         </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12 relative z-20">

        {/* 1. MODULE GRID (Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
           {MODULES.map((mod) => (
              <div key={mod.id} className={`bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all group`}>
                 <div className="flex justify-between items-start mb-6">
                    <div className="text-black">
                        <mod.icon size={32} strokeWidth={2.5} />
                    </div>
                    <span className={`px-2 py-1 text-xs font-bold border-2 border-black ${mod.bg} ${mod.fg} ${mono.className}`}>
                       {mod.status}
                    </span>
                 </div>
                 
                 <h3 className="text-3xl font-black uppercase leading-none mb-2 text-black">{mod.name}</h3>
                 <p className={`text-xs font-bold text-black uppercase tracking-widest ${mono.className}`}>
                    {mod.tech}
                 </p>
              </div>
           ))}
        </div>

        {/* 2. ROADMAP (Full Width) */}
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[12px_12px_0px_0px_#000]">
           <div className="flex items-center gap-3 mb-10 border-b-4 border-black pb-4">
              <Zap size={32} fill="black" className="text-black"/>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-black">Mission Plan</h2>
           </div>

           <div className="space-y-0 relative">
              {/* Vertical Line - Positioned for Mobile & Desktop */}
              <div className="absolute left-[18px] md:left-[26px] top-4 bottom-10 w-[4px] md:w-[6px] bg-black/10"></div>
              
              {ROADMAP.map((phase, i) => (
                 // Padding adjusted for Mobile (pl-14) vs Desktop (pl-20)
                 <div key={i} className={`relative pl-14 md:pl-20 pb-12 ${phase.done || phase.current ? 'opacity-100' : 'opacity-50 grayscale'}`}>
                    
                    {/* Icon Bubble - Smaller on Mobile (w-10) vs Desktop (w-14) */}
                    <div className={`absolute left-0 top-0 w-10 h-10 md:w-14 md:h-14 border-4 border-black flex items-center justify-center z-10 shadow-[4px_4px_0px_0px_#000]
                       ${phase.done ? 'bg-[#A3E635]' : phase.current ? 'bg-[#FACC15]' : 'bg-white'}
                    `}>
                       {phase.done ? <Check className="w-5 h-5 md:w-7 md:h-7 text-black" strokeWidth={4} /> : 
                        phase.current ? <Construction className="w-5 h-5 md:w-7 md:h-7 animate-pulse text-black" strokeWidth={3} /> :
                        <div className="w-3 h-3 md:w-4 md:h-4 bg-black/20"></div>}
                    </div>
                    
                    <div>
                       <div className={`flex flex-wrap gap-2 md:gap-3 items-center mb-2 ${mono.className}`}>
                          <span className="text-[10px] md:text-xs font-bold bg-black text-white px-2 py-1">{phase.phase}</span>
                          <span className="text-[10px] md:text-xs font-bold border-2 border-black px-2 py-1 bg-white text-black">{phase.date}</span>
                          {phase.current && <span className="text-[10px] md:text-xs font-bold bg-[#FACC15] text-black px-2 py-1 border-2 border-black animate-pulse">CURRENT</span>}
                       </div>
                       <h3 className="text-2xl md:text-4xl font-black uppercase mb-2 text-black">{phase.title}</h3>
                       <p className={`text-xs md:text-sm font-bold mb-4 uppercase text-black ${mono.className}`}>{phase.desc}</p>
                       <ul className={`space-y-3 ${mono.className}`}>
                          {phase.items.map((item, idx) => (
                             <li key={idx} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm font-bold border-l-4 border-gray-200 pl-3">
                                <span className={phase.done ? 'line-through decoration-4 decoration-black/30 text-gray-400' : 'text-black'}>{item}</span>
                             </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>

    </main>
  );
}