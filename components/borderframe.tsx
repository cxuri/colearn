'use client';

import { Archivo_Black } from 'next/font/google';

const archivo = Archivo_Black({ 
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
});

interface BorderFrameProps {
  children: React.ReactNode;
}

export default function BorderFrame({ children }: BorderFrameProps) {
  return (
    <div className={`min-h-screen bg-white text-black selection:bg-[#FBBF24] selection:text-black overflow-x-hidden ${archivo.className}`}>
      
      {/* --- TOP STRIP --- */}
      <div className="fixed top-0 left-0 w-full h-10 bg-black text-white z-[60] flex items-center justify-between px-4 md:px-12 uppercase text-xs tracking-widest border-b border-white/20">
        <span>KLAZ.APP</span>
        <span>KOCHI, KL</span>
      </div>

      {/* --- BOTTOM STRIP --- */}
      <div className="fixed bottom-0 left-0 w-full h-10 bg-black text-white z-[60] flex items-center justify-between px-4 md:px-12 uppercase text-xs tracking-widest border-t border-white/20">
        <span>© 2025</span>
        <span className="hidden md:inline text-gray-500">ENGINEERING RESOURCE ARCHIVE</span>
        <span>V.1.0</span>
      </div>

      {/* --- LEFT SIDEBAR (Desktop) --- */}
      <div className="hidden md:flex fixed top-0 left-0 w-10 h-full bg-black z-[50] flex-col justify-center items-center">
         <div className="w-[1px] h-20 bg-white/30"></div>
      </div>

      {/* --- RIGHT SIDEBAR (Desktop) --- */}
      <div className="hidden md:flex fixed top-0 right-0 w-10 h-full bg-black z-[50] flex-col justify-center items-center text-white overflow-hidden">
         <div className="rotate-90 whitespace-nowrap text-[10px] tracking-[0.2em] uppercase text-gray-400">
            The Solution to all our problems &rarr;
         </div>
      </div>

      {/* --- AMBER CORNERS (Desktop) --- */}
      {/* Top Left */}
      <div className="hidden md:block fixed top-0 left-0 w-10 h-10 bg-[#FBBF24] z-[70] border-r-4 border-b-4 border-black"></div>
      {/* Top Right */}
      <div className="hidden md:block fixed top-0 right-0 w-10 h-10 bg-[#FBBF24] z-[70] border-l-4 border-b-4 border-black"></div>
      {/* Bottom Left */}
      <div className="hidden md:block fixed bottom-0 left-0 w-10 h-10 bg-[#FBBF24] z-[70] border-r-4 border-t-4 border-black"></div>
      {/* Bottom Right */}
      <div className="hidden md:block fixed bottom-0 right-0 w-10 h-10 bg-[#FBBF24] z-[70] border-l-4 border-t-4 border-black"></div>

      {/* --- MAIN CONTENT SLOT --- */}
      {/* We apply the necessary padding/margins here so children don't get hidden behind the frame */}
      <div className="relative w-full h-full">
        {children}
      </div>

    </div>
  );
}