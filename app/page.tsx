'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Archivo_Black, Space_Mono } from 'next/font/google';
import { Menu, X, ArrowUpRight } from 'lucide-react';

import Hero from '@/components/hero';
import RollingTextStrip from '@/components/rollingtextstrip';
import Manifesto from '@/components/manifesto';
import StaticSeparator from '@/components/seperator';
import Socials from '@/components/socials';
import FAQ from '@/components/faq';

const archivo = Archivo_Black({ 
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
});

const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });

// Simple Squiggly Line Component
const Squiggle = () => (
  <svg 
    width="300" 
    height="24" 
    viewBox="0 0 300 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="w-48 md:w-80 opacity-100"
  >
    <path 
      d="M2 12C2 12 30 22 50 12C70 2 90 22 110 12C130 2 150 22 170 12C190 2 210 22 230 12C250 2 270 22 298 12" 
      stroke="black" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <main className={`min-h-screen bg-white text-black ${archivo.className} selection:bg-yellow-400 selection:text-black overflow-x-hidden`}>
      
      {/* --- INDUSTRIAL FRAME --- */}
      <div className="fixed top-0 left-0 w-full h-10 bg-black text-white z-[60] flex items-center justify-between px-4 md:px-12 uppercase text-xs tracking-widest border-b border-white/20">
        <span>KLAZ.APP</span>
        <span>KOCHI, KL</span>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-10 bg-black text-white z-[60] flex items-center justify-between px-4 md:px-12 uppercase text-xs tracking-widest border-t border-white/20">
        <span>© 2025</span>
        <span className="hidden md:inline text-gray-500">ENGINEERING RESOURCE ARCHIVE</span>
        <span>V.1.0</span>
      </div>

      {/* Side Bars */}
      <div className="hidden md:flex fixed top-0 left-0 w-10 h-full bg-black z-[50] flex-col justify-center items-center">
         <div className="w-[1px] h-20 bg-white/30"></div>
      </div>
      <div className="hidden md:flex fixed top-0 right-0 w-10 h-full bg-black z-[50] flex-col justify-center items-center text-white overflow-hidden">
         <div className="rotate-90 whitespace-nowrap text-[10px] tracking-[0.2em] uppercase text-gray-400">
            SCROLL FOR INDEX &rarr;
         </div>
      </div>

      {/* Corners */}
      <div className="hidden md:block fixed top-0 left-0 w-10 h-10 bg-yellow-400 z-[70] border-r-4 border-b-4 border-black"></div>
      <div className="hidden md:block fixed top-0 right-0 w-10 h-10 bg-yellow-400 z-[70] border-l-4 border-b-4 border-black"></div>
      <div className="hidden md:block fixed bottom-0 left-0 w-10 h-10 bg-yellow-400 z-[70] border-r-4 border-t-4 border-black"></div>
      <div className="hidden md:block fixed bottom-0 right-0 w-10 h-10 bg-yellow-400 z-[70] border-l-4 border-t-4 border-black"></div>


      {/* --- TOP NAVIGATION --- */}
      <nav className="fixed top-10 left-0 md:left-10 right-0 md:right-10 h-16 md:h-20 flex justify-between items-center px-4 md:px-8 border-b-4 border-black bg-white z-[55]">
        
        {/* Logo */}
        <div className="text-3xl md:text-4xl tracking-tighter cursor-pointer select-none relative group z-[60]">
          KLAZ.
          <span className="absolute -top-1 -right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse"></span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 text-lg font-bold">
          <a href="#manifesto" className="hover:underline decoration-4 underline-offset-4 decoration-black">MANIFESTO</a>
          <Link href="/status" className="hover:underline decoration-4 underline-offset-4 decoration-black">STATUS</Link>
          <a href="#faq" className="hover:underline decoration-4 underline-offset-4 decoration-black">FAQ</a>
          
          {/* LOGIN BUTTON: Red text on Desktop */}
          <Link 
            href="/progress"
            className="text-red-600 hover:text-black transition-colors uppercase hover:underline decoration-4 underline-offset-4 decoration-black ml-4"
          >
            LOGIN
          </Link>
        </div>

        {/* MOBILE BURGER BUTTON */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 border-2 border-black bg-yellow-400 active:bg-black active:text-white transition-colors z-[60]"
        >
           {isMenuOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
        </button>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[50] bg-yellow-400 text-black flex flex-col pt-32 px-6">
           
           {/* Background Grid */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" 
              style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
           </div>

           {/* Menu Header */}
           <div className={`text-xs font-bold uppercase border-b-4 border-black pb-2 mb-8 flex justify-between ${mono.className}`}>
              <span>System_Nav.exe</span>
              <span>Menu_Open</span>
           </div>

           {/* Menu Links - Explicit text-black with hover:text-white */}
           <div className="flex flex-col gap-6">
              
              <a href="#manifesto" onClick={toggleMenu} className="text-5xl font-black uppercase tracking-tighter text-black hover:text-white hover:pl-4 transition-all flex items-center gap-4 group">
                 MANIFESTO <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
              </a>
              
              <Link href="/status" onClick={toggleMenu} className="text-5xl font-black uppercase tracking-tighter text-black hover:text-white hover:pl-4 transition-all flex items-center gap-4 group">
                 STATUS <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
              </Link>
              
              <a href="#faq" onClick={toggleMenu} className="text-5xl font-black uppercase tracking-tighter text-black hover:text-white hover:pl-4 transition-all flex items-center gap-4 group">
                 FAQ <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
              </a>
              
              <a href="#contact" onClick={toggleMenu} className="text-5xl font-black uppercase tracking-tighter text-black hover:text-white hover:pl-4 transition-all flex items-center gap-4 group">
                 CONTACT <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
              </a>

           </div>

           {/* Mobile Login Button (Big Block) */}
           <div className="mt-auto mb-24">
              <Link 
                href="/progress" 
                onClick={toggleMenu}
                className="w-full block bg-black text-white text-center py-6 text-2xl font-black uppercase border-4 border-transparent active:border-black active:bg-white active:text-black transition-all"
              >
                LOGIN
              </Link>
           </div>
        </div>
      )}


      {/* MAIN CONTENT */}
      <div className="max-w-screen-2xl mx-auto pb-24">
        
        <Hero />
        
        <RollingTextStrip />
        
        <div id="manifesto" className="pt-10 scroll-mt-32">
           <Manifesto />
        </div>
        
        <StaticSeparator />
        
        <div id="faq" className="scroll-mt-32">
           <FAQ />
        </div>

        <StaticSeparator />

        <div id="contact" className="scroll-mt-32">
            <Socials />
        </div>

        {/* --- THE END SQUIGGLE --- */}
        <div className="pt-20 pb-10 flex justify-center w-full select-none">
           <Squiggle />
        </div>

      </div>

    </main>
  );
}