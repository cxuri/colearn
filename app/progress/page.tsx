'use client';

import Link from 'next/link';
import { Archivo_Black, Space_Mono } from 'next/font/google';
import { ArrowLeft, AlertOctagon } from 'lucide-react';

const archivo = Archivo_Black({ weight: '400', subsets: ['latin'] });
const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });

export default function UnderProgress() {
  return (
    <main className={`p-10 relative min-h-screen w-full bg-[#E5E5E5] flex flex-col items-center justify-center overflow-hidden ${archivo.className}`}>
      
      {/* --- CSS STYLES FOR ANIMATIONS --- */}
      <style jsx global>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes flicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: 0.1;
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
            opacity: 0.8;
          }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .glitch-text {
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
        .flicker-bg {
          animation: flicker 4s infinite;
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>

      {/* --- BACKGROUND LAYERS --- */}
      
      {/* 1. Grid Texture */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      {/* 2. Giant Flickering KLAZ Watermark */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
         <h1 className="text-[25vw] leading-none text-black flicker-bg select-none opacity-10 blur-sm">
            KLAZ
         </h1>
      </div>

      {/* 3. Hazard Tape Strips (Crossed) - Responsive Sizing */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden">
          {/* Strip 1 */}
          <div className="absolute w-[150vw] h-12 md:h-16 bg-yellow-400 border-y-4 border-black transform -rotate-12 flex items-center shadow-xl opacity-90">
             <div className="flex animate-marquee whitespace-nowrap w-full">
                {[...Array(20)].map((_, i) => (
                    <span key={i} className={`mx-2 md:mx-4 text-lg md:text-2xl font-black text-black uppercase ${mono.className}`}>
                        RESTRICTED AREA // DEV IN PROGRESS //
                    </span>
                ))}
             </div>
          </div>
          {/* Strip 2 */}
          <div className="absolute w-[150vw] h-12 md:h-16 bg-black border-y-4 border-yellow-400 transform rotate-6 flex items-center shadow-xl opacity-90">
             <div className="flex animate-marquee whitespace-nowrap w-full" style={{ animationDirection: 'reverse' }}>
                {[...Array(20)].map((_, i) => (
                    <span key={i} className={`mx-2 md:mx-4 text-lg md:text-2xl font-black text-yellow-400 uppercase ${mono.className}`}>
                        DO NOT CROSS // KLAZ PROTOCOL //
                    </span>
                ))}
             </div>
          </div>
      </div>


      {/* --- FOREGROUND CONTENT --- */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 mix-blend-hard-light w-full max-w-4xl">
         
         {/* Main Glitch Headline - Responsive Text Size */}
         <h1 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter mb-2 text-black drop-shadow-[2px_2px_0px_white] md:drop-shadow-[4px_4px_0px_white]">
            <span className="inline-block hover:animate-[glitch_0.2s_infinite]">SYSTEM</span> <br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>HALTED</span>
         </h1>



        {/* Subtitle Box - Simplified & Bold */}
<div className={`mt-8 bg-white border-4 border-black p-6 w-full max-w-lg shadow-[8px_8px_0px_0px_#000] relative ${mono.className}`}>
    
    {/* 1. Header Strip */}
    <div className="flex justify-between items-start mb-4 border-b-4 border-black pb-3">
        <span className="bg-black text-white px-3 py-1 text-sm font-bold uppercase">
            Dev_Log.txt
        </span>
        <AlertOctagon className="w-6 h-6 text-black" />
    </div>

    {/* 2. Main Text */}
    <p className="text-lg md:text-xl font-bold text-black leading-tight uppercase">
        "This feature is currently being welded together by a student running on 3 hours of sleep."
    </p>

    {/* 3. Footer / Meta info */}
    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-gray-500 border-t-2 border-dashed border-gray-400 pt-3">
         <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></span>
         <span className="uppercase tracking-widest">Status: Centering Div...</span>
    </div>

</div>

         {/* Action Button - Responsive Padding */}
         <div className="mt-8 md:mt-12">
            <Link href="/" className="group relative inline-block">
                <span className="absolute inset-0 bg-red-500 translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2 border-2 border-black group-hover:translate-x-2 group-hover:translate-y-2 md:group-hover:translate-x-3 md:group-hover:translate-y-3 transition-transform"></span>
                <button className="relative bg-black text-white px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl font-bold uppercase border-2 border-black flex items-center gap-2 md:gap-3 hover:-translate-y-1 transition-transform">
                    <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
                    Evacuate
                </button>
            </Link>
         </div>

      </div>

      {/* --- Footer Status --- */}
      <div className={`absolute bottom-6 left-0 w-full text-center opacity-50 pointer-events-none ${mono.className}`}>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] px-4">
              Construction Zone • Wear Hard Hats • No Refunds
          </p>
      </div>

    </main>
  );
}