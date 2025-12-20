'use client';

import { Space_Mono } from 'next/font/google';
import { 
  CheckCircle2, 
  Loader2, 
  Lock, 
  GitCommit,
  ArrowDown
} from 'lucide-react';

const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });

const PHASES = [
  {
    id: '01',
    version: 'V.0.1',
    codename: 'THE SCRAMBLE',
    desc: 'The dark ages. Begging for PDFs in 5 different WhatsApp groups. 100% inefficiency.',
    status: 'DEPRECATED',
    icon: CheckCircle2,
    style: 'grayscale opacity-60 hover:opacity-100', // Faded history
    badgeColor: 'bg-gray-300 text-gray-600',
    cardBg: 'bg-gray-100'
  },
  {
    id: '02',
    version: 'V.1.0',
    codename: 'THE ARCHIVE',
    desc: 'Centralized notes & QP database. Searchable. Organized. The core web platform is live.',
    status: 'ONLINE',
    icon: GitCommit,
    style: 'border-black', // Standard clear view
    badgeColor: 'bg-[#10B981] text-black', // Emerald Green
    cardBg: 'bg-white'
  },
  {
    id: '03',
    version: 'V.2.0',
    codename: 'HIVE_MIND',
    desc: 'Community features. Anonymous rants, professor ratings, and campus warfare.',
    status: 'COMPILING...',
    icon: Loader2,
    style: 'border-black',
    badgeColor: 'bg-black text-[#FBBF24]', // Black/Amber contrast
    cardBg: 'bg-[#FBBF24]', // Warm Amber
    isConstruction: true,
    animate: true
  },
  {
    id: '04',
    version: 'V.3.0',
    codename: 'MOBILE_OPS',
    desc: 'Native iOS & Android apps. Offline mode. Push notifications for exam panic.',
    status: 'LOCKED',
    icon: Lock,
    style: 'text-white', // Inverted Mode
    badgeColor: 'bg-white text-black',
    cardBg: 'bg-black'
  }
];

export default function Blueprint() {
  return (
    <section className="w-full bg-white text-black py-20 border-b-4 border-black relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20">
             <div className={`inline-block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-4 shadow-[4px_4px_0px_0px_#FBBF24] ${mono.className}`}>
                Dev_Log.log
             </div>
             <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                The <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Blueprint</span>
             </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative ml-4 md:ml-8">
            
            {/* The Vertical "Cable" */}
            <div className="absolute left-[11px] top-4 bottom-0 w-1 border-l-4 border-black border-dashed opacity-30"></div>

            <div className="space-y-12">
            {PHASES.map((phase, index) => (
              <div key={index} className={`relative pl-16 md:pl-24 group ${phase.style}`}>
                  
                  {/* Connector Node */}
                  <div className={`
                    absolute left-0 top-6 w-6 h-6 border-4 border-black bg-white z-20 
                    transition-all duration-300 group-hover:scale-125 group-hover:bg-black
                    flex items-center justify-center
                  `}>
                      {/* Inner dot turns yellow on hover */}
                      <div className="w-2 h-2 bg-transparent group-hover:bg-[#FBBF24]"></div>
                  </div>

                  {/* Horizontal Connector Line */}
                  <div className="absolute left-6 top-[34px] w-10 md:w-16 h-1 bg-black z-10"></div>

                  {/* Content Card */}
                  <div className={`
                    relative border-4 border-black p-6 md:p-8 
                    shadow-[8px_8px_0px_0px_#000] 
                    transition-all duration-200 
                    hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_#000]
                    ${phase.cardBg}
                  `}>
                      
                      {/* Construction Tape Overlay for Building Phase */}
                      {phase.isConstruction && (
                        <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none overflow-hidden h-full w-32"
                             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 10px, transparent 10px, transparent 20px)' }}>
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-4 relative z-10">
                          {/* Version Badge */}
                          <div className={`
                            flex items-center gap-2 px-3 py-1 border-2 border-black font-bold text-xs md:text-sm shadow-sm
                            ${phase.badgeColor} ${mono.className}
                          `}>
                              <phase.icon size={14} className={phase.animate ? 'animate-spin' : ''} />
                              {phase.version}
                          </div>

                          {/* Status Text */}
                          <span className={`font-bold text-xs md:text-sm uppercase tracking-widest opacity-80 ${mono.className}`}>
                              [{phase.status}]
                          </span>
                      </div>

                      <h3 className="text-3xl md:text-5xl font-black uppercase mb-3 leading-none">
                          {phase.codename}
                      </h3>
                      
                      <p className={`text-sm md:text-base font-bold leading-relaxed opacity-90 ${mono.className} ${phase.cardBg === 'bg-black' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {phase.desc}
                      </p>

                  </div>
              </div>
            ))}
            
            {/* End of Line Marker */}
            <div className="relative pl-16 md:pl-24 pt-8 opacity-50">
               <div className="absolute left-[3px] top-8">
                  <ArrowDown size={24} className="text-black animate-bounce" />
               </div>
               <span className={`text-xs font-bold uppercase ${mono.className}`}>
                  More updates pending...
               </span>
            </div>

            </div>

        </div>

      </div>
    </section>
  );
}