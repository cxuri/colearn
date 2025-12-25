'use client';

import { Archivo_Black, Space_Mono } from 'next/font/google';
import { Eye, Target, Sparkles } from 'lucide-react';

const archivo = Archivo_Black({ 
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
});

const mono = Space_Mono({ 
  weight: ['400', '700'], 
  subsets: ['latin'],
  display: 'swap', 
});

export default function VisionMission() {
  return (
    <section className="w-full py-24 px-4 md:px-8 bg-white border-t-4 border-black">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* --- VISION BLOCK --- */}
          <div className="relative group">
            {/* Shadow Box */}
            <div className="absolute inset-0 bg-black translate-x-3 translate-y-3"></div>
            
            {/* Content Box */}
            <div className="relative bg-[#A855F7] border-4 border-black p-8 md:p-12 h-full flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div className="bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Eye size={40} className="text-black" />
                </div>
                <span className={`text-xs font-bold uppercase tracking-tighter bg-black text-white px-3 py-1 ${mono.className}`}>
                  Status: Future_Ready
                </span>
              </div>

              <h2 className={`text-5xl md:text-6xl text-white uppercase mb-6 leading-[0.9] ${archivo.className}`}>
                The <br /> Vision
              </h2>

              <p className={`text-base font-bold text-white text-justify leading-relaxed ${mono.className}`}>
                To simplify KTU learning through a single, trusted platform for clear, exam-ready notes and resources - powered by community-driven, gamified learning.
              </p>
            </div>
          </div>

          {/* --- MISSION BLOCK --- */}
          <div className="relative group">
            {/* Shadow Box */}
            <div className="absolute inset-0 bg-black translate-x-3 translate-y-3"></div>
            
            {/* Content Box */}
            <div className="relative bg-[#FBBF24] border-4 border-black p-8 md:p-12 h-full flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div className="bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Target size={40} className="text-black" />
                </div>
                <span className={`text-xs font-bold uppercase tracking-tighter bg-black text-white px-3 py-1 ${mono.className}`}>
                  Priority: 01
                </span>
              </div>

              <h2 className={`text-5xl md:text-6xl text-black uppercase mb-6 leading-[0.9] ${archivo.className}`}>
                The <br /> Mission
              </h2>

              <p className={`text-xl md:text-2xl font-bold text-black leading-tight mb-6 ${archivo.className}`}>
                Kill the <span className="bg-white px-2">Noise.</span> <br/> 
                Build the <span className="bg-white px-2 text-[#EF4444]">Arsenal.</span>
              </p>

              <p className={`text-base font-bold text-black/80 text-justify leading-relaxed ${mono.className}`}>
                To simplify KTU learning through a single, trusted platform for clear, 
                exam-ready notes and resources—powered by community-driven, 
                gamified learning that actually rewards your progress.
              </p>
            </div>
          </div>

        </div>

        {/* --- TAGLINE FOOTER --- */}
        <div className="mt-20 text-center">
          <p className={`text-2xl md:text-4xl font-black uppercase tracking-tighter inline-block border-b-8 border-[#10B981] ${archivo.className}`}>
            No Corporate BS. Just Clarity.
          </p>
        </div>

      </div>
    </section>
  );
}