'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Space_Mono } from 'next/font/google';
import { Menu, X, ArrowUpRight } from 'lucide-react';

// Import your new component
import BorderFrame from '@/components/borderframe';
// Import your other components
import Hero from '@/components/hero';
import CTABanner from '@/components/ctabanner';
import RollingTextStrip from '@/components/rollingtextstrip';
import Manifesto from '@/components/manifesto';
import StaticSeparator from '@/components/seperator';
import Socials from '@/components/socials';
import FAQ from '@/components/faq';
import About from '@/components/about';

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <BorderFrame>
      
      {/* --- TOP NAVIGATION --- */}
      <nav className="fixed top-10 left-0 md:left-10 right-0 md:right-10 h-16 md:h-20 flex justify-between items-center px-4 md:px-8 border-b-4 border-black bg-white z-[55]">
        
        {/* Logo */}
        <div className="text-3xl md:text-4xl tracking-tighter cursor-pointer select-none relative group z-[60]">
          KLAZ.
          <span className="absolute -top-1 -right-3 w-3 h-3 bg-[#10B981] rounded-full border-2 border-black animate-pulse"></span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6 text-lg font-bold">
          {/* Anchor Links (Scroll) */}
          {['MANIFESTO', 'FAQ'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-black px-2 py-1 transition-all hover:text-blue-600 hover:underline decoration-4 underline-offset-4 decoration-blue-600"
            >
              {item}
            </a>
          ))}

          {/* Page Links (Next.js Link for speed) */}
          <Link href="/status" className="text-black px-2 py-1 transition-all hover:text-blue-600 hover:underline decoration-4 underline-offset-4 decoration-blue-600">
            STATUS
          </Link>
          
          <Link href="/join" className="text-black px-2 py-1 transition-all hover:text-blue-600 hover:underline decoration-4 underline-offset-4 decoration-blue-600">
            JOIN
          </Link>
          
          {/* LOGIN BUTTON */}
          <Link 
            href="/progress"
            className="ml-4 px-6 py-2 border-4 border-black text-black uppercase transition-all hover:bg-black hover:text-white hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000]"
          >
            LOGIN
          </Link>
        </div>

        {/* MOBILE BURGER BUTTON */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 border-2 border-black bg-[#FBBF24] active:bg-black active:text-white transition-colors z-[60]"
        >
           {isMenuOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
        </button>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[50] bg-[#FBBF24] text-black flex flex-col pt-32 px-6">
           {/* Background Grid */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" 
              style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
           </div>

           <div className={`text-xs font-bold uppercase border-b-4 border-black pb-2 mb-8 flex justify-between ${mono.className}`}>
              <span>System_Nav.exe</span>
              <span>Menu_Open</span>
           </div>

           <div className="flex flex-col gap-6">
              {/* Anchor Links */}
              <a href="#manifesto" onClick={toggleMenu} className="text-5xl font-black uppercase tracking-tighter text-black hover:text-white hover:pl-4 transition-all flex items-center gap-4 group">
                 MANIFESTO <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
              </a>
              
              {/* Page Links */}
              <Link href="/join" onClick={toggleMenu} className="text-5xl font-black uppercase tracking-tighter text-black hover:text-white hover:pl-4 transition-all flex items-center gap-4 group">
                 JOIN <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
              </Link>
              
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

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-screen-2xl mx-auto pb-24">
        
        <Hero />
        
        <RollingTextStrip />

        <About />
        
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

        <CTABanner />

        <div className="pt-20 pb-10 flex justify-center w-full select-none">
           <Squiggle />
        </div>

      </div>

    </BorderFrame>
  );
}