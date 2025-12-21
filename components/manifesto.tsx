'use client';

import { Archivo_Black, Space_Mono } from 'next/font/google';
import { Crosshair, FileWarning, ShieldAlert, Zap } from 'lucide-react';

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

const ManifestoItem = ({ num, title, desc, icon: Icon }: any) => (
  <div className="group relative border-b border-white/20 hover:bg-yellow-400 transition-colors duration-0">
    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
    
    <div className="grid grid-cols-12 gap-4 p-6 md:p-10 items-start">
      {/* Number */}
      <div className={`col-span-2 md:col-span-1 text-xl md:text-3xl font-black text-white/30 group-hover:text-black transition-colors ${mono.className}`}>
        {num}
      </div>
      
      {/* Content */}
      <div className="col-span-10 md:col-span-11 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className={`text-2xl md:text-4xl uppercase mb-2 text-white group-hover:text-black leading-none ${archivo.className}`}>
            {title}
          </h3>
          <p className={`text-sm md:text-base text-gray-400 group-hover:text-black font-bold max-w-xl ${mono.className}`}>
            {desc}
          </p>
        </div>
        
        {/* Icon (Hidden initially, appears on hover) */}
        <div className="hidden md:block opacity-0 group-hover:opacity-100 transform translate-x-10 group-hover:translate-x-0 transition-all duration-300">
           <Icon size={48} className="text-black" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  </div>
);

export default function Manifesto() {
  return (
    // UPDATED: w-full for mobile, md:w-auto + md:mx-[14px] for desktop
    <section className="relative w-full md:w-auto md:mx-[14px] bg-[#0A0A0A] text-white border-y-4 border-black z-20 overflow-hidden">
      
      {/* --- HEADER --- */}
      <div className="border-b-4 border-white/20 p-6 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
           <div className={`inline-block bg-white text-black px-3 py-1 mb-4 text-xs font-bold uppercase tracking-widest ${mono.className}`}>
              Core Philosophy v.1.0
           </div>
           <h2 className={`text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter ${archivo.className}`}>
             The <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Code</span>.
           </h2>
        </div>
        <div className="text-right hidden md:block">
           <p className={`text-gray-500 text-xs uppercase tracking-widest max-w-xs text-left md:text-right ${mono.className}`}>
              We reject the bloat. <br/>
              We reject the chaos.
           </p>
        </div>
      </div>

      {/* --- GRID ITEMS --- */}
      <div className="flex flex-col">
        <ManifestoItem 
          num="01"
          title="Information is a Right."
          desc="Access to syllabus, notes, and pyqs should not feel like a treasure hunt. If it exists, it belongs on Klaz."
          icon={FileWarning}
        />
        <ManifestoItem 
          num="02"
          title="Built by Victims."
          desc="We are students, We know how it feel's when you get ignored by all your friends and faculty, the night before exams" 
          icon={ShieldAlert}
        />
        <ManifestoItem 
          num="03"
          title="Enhanced Learning Experience."
          desc="We offer diverse learning methods and pace-based options to cater to every student's unique journey." 
          icon={Zap}
        />
        <ManifestoItem 
          num="04"
          title="Backlog Relief."
          desc="We understand the struggle to clear backlogs. Every student deserves the support to succeed and thrive." 
          icon={Crosshair}
        />
      </div>

    </section>
  );
}