'use client';

import { Space_Mono } from 'next/font/google';
import { 
  CheckCircle2, 
  Loader2, 
  Lock, 
  GitCommit 
} from 'lucide-react';

const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });

const PHASES = [
  {
    version: 'V.0.1',
    codename: 'THE SCRAMBLE',
    desc: 'The dark ages. Begging for PDFs in 5 different WhatsApp groups. 100% inefficiency.',
    status: 'DEPRECATED',
    icon: CheckCircle2,
    color: 'text-gray-500',
    border: 'border-gray-500',
    bg: 'bg-gray-100'
  },
  {
    version: 'V.1.0',
    codename: 'THE ARCHIVE',
    desc: 'Centralized notes & QP database. Searchable. Organized. The core web platform is live.',
    status: 'ONLINE',
    icon: GitCommit,
    color: 'text-green-600',
    border: 'border-green-600',
    bg: 'bg-green-50'
  },
  {
    version: 'V.2.0',
    codename: 'HIVE_MIND',
    desc: 'Community features. Anonymous rants, professor ratings, and campus warfare.',
    status: 'COMPILING...',
    icon: Loader2,
    color: 'text-yellow-600',
    border: 'border-yellow-600',
    bg: 'bg-yellow-50',
    animate: true
  },
  {
    version: 'V.3.0',
    codename: 'MOBILE_OPS',
    desc: 'Native iOS & Android apps. Offline mode. Push notifications for exam panic.',
    status: 'LOCKED',
    icon: Lock,
    color: 'text-red-600',
    border: 'border-red-600',
    bg: 'bg-red-50'
  }
];

export default function Blueprint() {
  return (
    <section className="w-full bg-white text-black py-20 border-b-4 border-black relative">
      
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16">
             <div className={`inline-block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-4 ${mono.className}`}>
                Dev_Log.log
             </div>
             <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
                The <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Blueprint</span>
             </h2>
        </div>

        {/* Timeline */}
        <div className="relative border-l-4 border-black/10 ml-4 md:ml-8 space-y-12">
            
            {PHASES.map((phase, index) => (
              <div key={index} className="relative pl-12 md:pl-20">
                  
                  {/* Timeline Dot/Icon */}
                  <div className={`absolute -left-[14px] top-0 w-8 h-8 bg-white border-4 border-black flex items-center justify-center z-10 ${phase.color === 'text-green-600' ? 'shadow-[4px_4px_0px_0px_#000]' : ''}`}>
                      <phase.icon size={16} className={`${phase.color} ${phase.animate ? 'animate-spin' : ''}`} />
                  </div>

                  {/* Content Card */}
                  <div className={`border-4 border-black p-6 md:p-8 transition-all hover:translate-x-2 ${phase.bg}`}>
                      
                      <div className={`flex justify-between items-start mb-2 ${mono.className}`}>
                          <span className={`font-bold text-xs md:text-sm px-2 py-1 border-2 border-black bg-white ${phase.color}`}>
                              {phase.version}
                          </span>
                          <span className={`font-bold text-xs md:text-sm uppercase tracking-widest ${phase.animate ? 'animate-pulse' : ''}`}>
                              [{phase.status}]
                          </span>
                      </div>

                      <h3 className="text-2xl md:text-4xl font-black uppercase mb-2">
                          {phase.codename}
                      </h3>
                      
                      <p className={`text-sm md:text-base font-bold text-gray-600 ${mono.className}`}>
                          {phase.desc}
                      </p>

                  </div>
              </div>
            ))}

        </div>

      </div>
    </section>
  );
}