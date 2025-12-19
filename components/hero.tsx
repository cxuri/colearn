'use client';

import { useRef, useState } from 'react';
import { Archivo_Black } from 'next/font/google';
import Script from 'next/script';
import { 
  ArrowDownRight, Play, Zap, Trophy, 
  GraduationCap, Laptop as LaptopIcon, Smartphone,
  Layers, Timer, Box
} from 'lucide-react';

const archivo = Archivo_Black({ 
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGsapLoaded, setIsGsapLoaded] = useState(false);

  const runAnimations = () => {
    const gsap = (window as any).gsap;
    if (!gsap || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial States
      gsap.set(".hero-line", { y: 100, opacity: 0 });
      gsap.set(".device-group", { y: 50, opacity: 0 });
      gsap.set(".tag-pill", { y: 20, opacity: 0 });
      gsap.set(".hero-cta", { y: 20, opacity: 0 });
      gsap.set(".logic-signal", { strokeDashoffset: 100 });

      // 2. Main Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.0 } });

      tl.to(".hero-line", {
          y: 0,
          opacity: 1,
          stagger: 0.1,
        })
        .to(".tag-pill", {
          y: 0,
          opacity: 1,
          stagger: 0.05,
        }, "-=0.5")
        .to(".device-group", {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out"
        }, "-=0.6")
        .to(".hero-cta", {
          y: 0,
          opacity: 1,
          stagger: 0.1
        }, "-=0.8");

      // 3. Logic Gate Animation
      gsap.to(".logic-signal", {
        strokeDashoffset: 0,
        duration: 2,
        repeat: -1,
        ease: "none"
      });

      // 4. Floating Devices
      gsap.to(".device-float", {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, containerRef);
    
    return () => ctx.revert();
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full min-h-screen pt-32 md:pt-48 pb-24 px-6 md:px-0 ${archivo.className} bg-[#F0F2F5] overflow-x-hidden`}
      // UPDATED BACKGROUND: Bigger dots (2px) and wider spacing (40px)
      style={{
        backgroundImage: 'radial-gradient(#94A3B8 2px, transparent 2px)',
        backgroundSize: '40px 40px'
      }}
    >
      
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          setIsGsapLoaded(true);
          runAnimations();
        }}
      />

      {/* --- LOGIC GATE BACKGROUND LINES --- */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
         <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {/* Logic Paths (Animated) */}
            <path d="M0,100 H100 V200 H200" fill="none" stroke="black" strokeWidth="2" />
            <path className="logic-signal" d="M0,100 H100 V200 H200" fill="none" stroke="#22D3EE" strokeWidth="2" strokeDasharray="20 200" />
            <path d="M1000,500 H900 V600 H800" fill="none" stroke="black" strokeWidth="2" />
            <path className="logic-signal" d="M1000,500 H900 V600 H800" fill="none" stroke="#FD2D3F" strokeWidth="2" strokeDasharray="20 200" />
         </svg>
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className={`relative z-20 max-w-6xl mx-auto transition-opacity duration-300 ${isGsapLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* 1. HEADLINE SECTION */}
        <div className="flex flex-col items-start gap-4 md:gap-8 relative z-30">
          <div className="overflow-hidden">
            <h1 
              className="hero-line text-[12vw] md:text-[9vw] uppercase leading-none tracking-[-0.05em] text-transparent drop-shadow-sm"
              style={{ WebkitTextStroke: '1.5px black' }}
            >
              ENGINEERING
            </h1>
          </div>
          <div className="py-2 relative">
            {/* UPDATED TEXT: SURVIVAL APP */}
            <h1 
              className="hero-line text-[12vw] md:text-[9vw] uppercase leading-none tracking-[-0.06em] text-black bg-yellow-400 inline-block px-4 py-1 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 origin-left z-20"
            >
              SURVIVAL APP.
            </h1>
          </div>
        </div>

        {/* 2. TAG STACK */}
        <div className="mt-12 md:mt-16 flex flex-wrap gap-4 md:gap-6 relative z-20">
          <div className="tag-pill flex items-center gap-2 border-2 border-black bg-[#FF90E8] px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default">
            <Play size={16} fill="black" />
            <span className="text-xs md:text-sm font-bold uppercase">Cinematic</span>
          </div>
          <div className="tag-pill flex items-center gap-2 border-2 border-black bg-[#2CB67D] px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default">
            <Zap size={16} fill="black" />
            <span className="text-xs md:text-sm font-bold uppercase">Interactive</span>
          </div>
          <div className="tag-pill flex items-center gap-2 border-2 border-black bg-[#8B5CF6] text-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default">
            <Trophy size={16} fill="white" />
            <span className="text-xs md:text-sm font-bold uppercase">Gamified</span>
          </div>
          <div className="tag-pill flex items-center gap-2 border-2 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default">
            <GraduationCap size={18} />
            <span className="text-xs md:text-sm font-bold uppercase">KTU</span>
          </div>
        </div>

        {/* 3. DUAL DEVICE MOCKUP + AIM TEXT (GRID LAYOUT) */}
        <div className="device-group mt-20 md:mt-24 w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          
          {/* LEFT COLUMN: DEVICES */}
          <div className="md:col-span-7 relative">
              <div className="device-float relative w-full h-[350px] sm:h-[450px] md:h-[500px]">
                
                {/* DEVICE 1: LAPTOP */}
                <div className="absolute top-0 left-0 md:left-4 w-[95%] md:w-[90%] z-10">
                  <div className="bg-black border-4 border-black rounded-t-xl p-2 pb-0 shadow-2xl">
                      <div className="bg-[#111] aspect-[16/10] w-full rounded-t-lg relative overflow-hidden flex items-center justify-center border border-gray-800">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black opacity-90"></div>
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <Play size={48} className="text-white fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                            <span className="mt-4 bg-white text-black text-xs font-bold px-3 py-1 uppercase">Desktop View</span>
                        </div>
                      </div>
                  </div>
                  <div className="bg-gray-800 h-4 w-full rounded-b-lg border-x-4 border-b-4 border-black relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-2 bg-gray-600 rounded-b-md"></div>
                  </div>
                </div>

                {/* DEVICE 2: PHONE */}
                <div className="absolute bottom-4 right-4 md:right-0 w-[130px] md:w-[180px] z-20">
                  <div className="bg-black border-4 border-black rounded-[2rem] p-1.5 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.5)]">
                      <div className="bg-white aspect-[9/19.5] w-full rounded-[1.5rem] relative overflow-hidden border border-gray-400">
                        <div className="absolute top-0 w-full h-6 bg-gray-100 border-b border-gray-200 z-20 flex justify-center">
                            <div className="w-16 h-4 bg-black rounded-b-lg"></div>
                        </div>
                        <div className="pt-8 px-2 space-y-2">
                            <div className="h-20 bg-yellow-400 rounded-lg border-2 border-black flex items-center justify-center shadow-sm">
                              <Zap size={24} fill="black" />
                            </div>
                            <div className="h-10 bg-gray-100 rounded-lg border-2 border-black"></div>
                            <div className="h-10 bg-gray-100 rounded-lg border-2 border-black"></div>
                        </div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold px-2 py-1 uppercase whitespace-nowrap">
                            Mobile App
                        </div>
                      </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-10 right-[5%] z-30 bg-white border-4 border-black p-3 shadow-[6px_6px_0px_0px_#000] rotate-12 hidden md:block">
                  <div className="flex items-center gap-2">
                      <LaptopIcon size={16} />
                      <span className="text-xs font-bold">+</span>
                      <Smartphone size={16} />
                      <span className="text-xs font-bold uppercase">= SYNCED</span>
                  </div>
                </div>
              </div>
          </div>

          {/* RIGHT COLUMN: AIM TEXT */}
          <div className="md:col-span-5 relative z-20">
            {/* ADDED: A White Card Container to make text pop */}
            <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#000] rotate-1 md:rotate-2 hover:rotate-0 transition-transform duration-300">
              
              <div className="bg-black text-white px-3 py-1 text-xs font-mono font-bold uppercase mb-6 inline-block border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                  // MISSION_DIRECTIVE: OPTIMIZE
              </div>
              
              <h2 className="text-3xl md:text-5xl uppercase font-black leading-[0.9] tracking-tight mb-6 text-black">
                  Strictly <br/>
                  <span className="bg-yellow-400 px-2 border-4 border-black inline-block mt-2">Curated.</span>
              </h2>
              
              <p className="text-base md:text-lg font-bold leading-relaxed text-black mb-8 border-l-4 border-gray-200 pl-4">
                  Stop digging through random drives. We provide syllabus-focused content, pace-based learning, and every tool you need all in one place.
              </p>
              
              {/* UPDATED CHECKLIST: Added borders to items for better separation */}
              <div className="space-y-3 font-bold text-sm md:text-base uppercase">
                  <div className="flex items-center gap-3 p-3 border-2 border-black bg-gray-50 hover:bg-blue-50 transition-colors">
                      <Layers className="text-black" size={20} />
                      <span>Curated Content.</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border-2 border-black bg-gray-50 hover:bg-red-50 transition-colors">
                      <Timer className="text-black" size={20} />
                      <span>Pace-Based Learning.</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border-2 border-black bg-black text-white hover:bg-green-600 transition-colors">
                      <Box className="text-white" size={20} />
                      <span>Everything in one place.</span>
                  </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4. BOTTOM CTA */}
        <div className="hero-cta mt-16 md:mt-24 flex flex-col items-start pb-10">
          <p className="text-sm md:text-xl font-bold font-mono uppercase tracking-tight text-gray-500 mb-6 bg-white px-2 py-1 border border-gray-300 inline-block">
             /// Built by B.Tech Students • For B.Tech Students
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto items-center md:items-start">
            <button className="w-full md:w-auto bg-black text-white text-lg md:text-xl px-10 py-5 uppercase font-black border-4 border-transparent hover:bg-yellow-400 hover:text-black hover:border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1">
              Join Waitlist
              <ArrowDownRight />
            </button>
            
            <div className="flex items-center gap-4">
               <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-black overflow-hidden z-0 bg-white">
                       <img 
                          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i * 35}&backgroundColor=ffdfbf,c0aede,d1d4f9`} 
                          alt="avatar" 
                          className="w-full h-full object-cover"
                       />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full bg-yellow-400 border-2 border-black flex items-center justify-center text-xs font-black z-10">
                     +420
                  </div>
               </div>
               <div className="flex flex-col">
                  <span className="text-sm font-black uppercase tracking-tight">Early Users</span>
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest flex items-center gap-1">
                     <Zap size={10} fill="currentColor" /> Locking Spots
                  </span>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}