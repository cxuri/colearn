'use client';

import { Archivo_Black, Space_Mono } from 'next/font/google';
import { 
  Zap, 
  Files, 
  Users, 
  Skull, 
} from 'lucide-react';

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

export default function About() {
  return (
    <section className="relative w-full py-24 px-4 md:px-8 bg-white border-t-4 border-black overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Skull size={400} strokeWidth={0.5} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between mb-20">
          <div>
            <div className={`flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-[#10B981] ${mono.className}`}>
               <span className="w-3 h-3 bg-[#10B981] border-2 border-black"></span>
               <span>Mission_Statement.txt</span>
            </div>
            <h2 className={`text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter text-black ${archivo.className}`}>
              NOT ANOTHER <br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>ED-TECH STARTUP.</span>
            </h2>
          </div>
          
          <div className="max-w-md">
            <p className="text-lg font-bold leading-relaxed border-l-4 border-[#FBBF24] pl-6">
              We hate the "normal" way of studying. Digging through 50 WhatsApp groups just to find one syllabus PDF is not it.
              <br/><br/>
              We are building this to learn topics <b>efficiently</b>, clear backlogs, and survive the semester without the corporate BS.
            </p>
          </div>
        </div>

        {/* --- GRID SECTIONS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* CARD 1: SPEED / MISSED CLASSES */}
          <div className="group relative">
            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
            <div className="relative h-full bg-white border-4 border-black p-6 md:p-8 flex flex-col justify-between hover:-translate-y-1 hover:-translate-x-1 transition-transform border-l-[12px] border-l-[#FBBF24]">
               <div>
                  <div className="mb-6 flex justify-between items-start">
                     <Zap size={48} className="text-black" strokeWidth={1.5} />
                     <span className={`text-4xl font-black text-black ${archivo.className}`}>01</span>
                  </div>
                  <h3 className={`text-2xl text-black uppercase mb-4 leading-none ${archivo.className}`}>
                    The Catch-Up
                  </h3>
                  <p className={`text-sm font-bold text-gray-800 leading-relaxed ${mono.className}`}>
                    Missed class? Lazed around all semester? We break down complex topics into digestable chunks so you can speed-run the syllabus.
                  </p>
               </div>
               <div className="mt-8 pt-4 border-t-2 border-black border-dashed">
                  <span className="text-xs font-black uppercase bg-[#FBBF24] text-black px-2 py-1">Efficiency: Max</span>
               </div>
            </div>
          </div>

          {/* CARD 2: RESOURCES (NOTES/PYQ) */}
          <div className="group relative">
            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
            <div className="relative h-full bg-white border-4 border-black p-6 md:p-8 flex flex-col justify-between hover:-translate-y-1 hover:-translate-x-1 transition-transform border-l-[12px] border-l-[#EF4444]">
               <div>
                  <div className="mb-6 flex justify-between items-start">
                     <Files size={48} className="text-black" strokeWidth={1.5} />
                     <span className={`text-4xl text-black ${archivo.className}`}>02</span>
                  </div>
                  <h3 className={`text-2xl text-black uppercase mb-4 leading-none ${archivo.className}`}>
                    The Arsenal
                  </h3>
                  <p className={`text-sm font-bold text-gray-800 leading-relaxed ${mono.className}`}>
                    Stop begging seniors. Access curated Notes, Solved PYQs, and Answer Keys instantly. Everything you need to pass, in one place.
                  </p>
               </div>
               <div className="mt-8 pt-4 border-t-2 border-black border-dashed">
                  <span className="text-xs font-black uppercase bg-[#EF4444] text-white px-2 py-1">Resources: Unlocked</span>
               </div>
            </div>
          </div>

          {/* CARD 3: METHOD / COMMUNITY */}
          <div className="group relative">
            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
            <div className="relative h-full bg-white border-4 border-black p-6 md:p-8 flex flex-col justify-between hover:-translate-y-1 hover:-translate-x-1 transition-transform border-l-[12px] border-l-[#10B981]">
               <div>
                  <div className="mb-6 flex justify-between items-start">
                     <Users size={48} className="text-black" strokeWidth={1.5} />
                     <span className={`text-4xl text-black ${archivo.className}`}>03</span>
                  </div>
                  <h3 className={`text-2xl text-black uppercase mb-4 leading-none ${archivo.className}`}>
                    The Meta
                  </h3>
                  <p className={`text-sm font-bold text-gray-800 leading-relaxed ${mono.className}`}>
                    Static PDFs are boring. We use interactive lessons and community support to make sure the concepts actually stick.
                  </p>
               </div>
               <div className="mt-8 pt-4 border-t-2 border-black border-dashed">
                  <span className="text-xs font-black uppercase bg-[#10B981] text-black px-2 py-1">Mode: Interactive</span>
               </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}