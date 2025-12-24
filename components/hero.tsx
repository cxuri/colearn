'use client';

import { useRef, useState, useEffect } from 'react';
import { Archivo_Black, Space_Mono } from 'next/font/google';
import { getCount } from '@/app/actions';
import Script from 'next/script';
import Link from 'next/link';
import { 
  ArrowDownRight, Zap, 
  Laptop as LaptopIcon, Smartphone,
  BookOpen, Hammer, Users, Code2, BrainCircuit
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

declare global {
  interface Window {
    gsap: any;
  }
}

export default function Hero() {
  const containerRef = useRef(null);
  const [isGsapLoaded, setIsGsapLoaded] = useState(false);
  const [userCount, setUserCount] = useState(71);

  useEffect(() => {
    getCount().then((count) => {
      setUserCount(count);
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      setIsGsapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isGsapLoaded || !containerRef.current) return;
    const gsap = window.gsap;
    if (!gsap) return;
    
    const ctx = gsap.context(() => {
      gsap.set(".hero-line", { y: 100, opacity: 0 });
      gsap.set(".device-group", { y: 50, opacity: 0 });
      gsap.set(".tag-pill", { y: 20, opacity: 0 });
      gsap.set(".hero-cta", { y: 20, opacity: 0 });
      gsap.set(".logic-signal", { strokeDashoffset: 100 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.0 } });

      tl.to(".hero-line", { y: 0, opacity: 1, stagger: 0.1 })
        .to(".tag-pill", { y: 0, opacity: 1, stagger: 0.05 }, "-=0.5")
        .to(".device-group", { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }, "-=0.6")
        .to(".hero-cta", { y: 0, opacity: 1, stagger: 0.1 }, "-=0.8");

      gsap.to(".logic-signal", { strokeDashoffset: 0, duration: 2, repeat: -1, ease: "none" });
      gsap.to(".device-float", { y: -15, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });

    }, containerRef);
    
    return () => ctx.revert();
  }, [isGsapLoaded]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-25 ${archivo.className} bg-[#F0F2F5] overflow-hidden`}
      style={{
        backgroundImage: 'radial-gradient(#94A3B8 2px, transparent 2px)',
        backgroundSize: '40px 40px'
      }}
    >
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
        onLoad={() => setIsGsapLoaded(true)}
      />

      <div className={`relative z-20 w-full max-w-6xl transition-opacity duration-300 ${isGsapLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* 1. HEADLINE SECTION */}
        <div className="flex flex-col pl-6 pr-5 py-10 items-center md:items-start relative z-30 w-full">

          <div className="relative overflow-visible pb-5">
            <h1 
              className="hero-line relative text-[12vw] md:text-[8vw] uppercase leading-[0.85] tracking-tighter text-transparent drop-shadow-sm select-none text-center md:text-left z-10"
              style={{ WebkitTextStroke: '1.5px black' }}
            >
              WHERE LEARNING
            </h1>
          </div>
          
          <div className="relative -mt-2 md:-mt-6 ml-0 md:ml-2">
             <div className="hero-line relative z-20 inline-block transform -rotate-2 hover:rotate-0 transition-transform duration-300 origin-bottom-left">
                <h1 
                  className="text-[6vw] md:text-[6vw] uppercase leading-[0.85] tracking-tighter text-black bg-[#FBBF24] px-4 pt-4 pb-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap"
                >
                 COMES TOGETHER
                </h1>
             </div>
          </div>
        </div>

        {/* 2. TAG STACK */}
        <div className="mt-12 md:mt-20 flex flex-wrap justify-center md:justify-start gap-4 md:gap-5 relative z-20">
          
          <div className="tag-pill flex items-center gap-2 border-2 border-black bg-black text-white px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-transform cursor-default">
            <Hammer size={18} />
            <span className={`text-xs md:text-sm font-bold uppercase ${mono.className}`}>Built With Students</span>
          </div>

          <div className="tag-pill flex items-center gap-2 border-2 border-black bg-[#FBBF24] px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default">
            <Code2 size={18} className="text-black" />
            <span className={`text-xs md:text-sm font-bold uppercase text-black ${mono.className}`}>Open Build</span>
          </div>

          <div className="tag-pill flex items-center gap-2 border-2 border-black bg-[#A855F7] text-white px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default">
            <BrainCircuit size={18} className="text-white" />
            <span className={`text-xs md:text-sm font-bold uppercase ${mono.className}`}>Knowledge_Engine</span>
          </div>

          <div className="tag-pill flex items-center gap-2 border-2 border-black bg-[#2563EB] text-white px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default">
            <BookOpen size={18} />
            <span className={`text-xs md:text-sm font-bold uppercase ${mono.className}`}>KTU Focused</span>
          </div>

          <div className="tag-pill flex items-center gap-2 border-2 border-black bg-[#10B981] text-black px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default">
            <Users size={18} />
            <span className={`text-xs md:text-sm font-bold uppercase ${mono.className}`}>Community Driven</span>
          </div>

        </div>

        {/* 3. DUAL DEVICE MOCKUP + AIM TEXT */}
        <div className="device-group mt-16 md:mt-32 w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          
          {/* LEFT COLUMN: DEVICES */}
          <div className="md:col-span-7 relative">
              <div className="device-float relative w-full h-[350px] sm:h-[450px] md:h-[500px]">
                
                {/* LAPTOP MOCKUP */}
                <div className="absolute top-0 left-0 md:left-4 w-[95%] md:w-[90%] z-10">
                  <div className="bg-black border-4 border-black rounded-t-xl p-2 pb-0 shadow-2xl">
                      <div className="bg-[#111] aspect-[16/10] w-full rounded-t-lg relative overflow-hidden flex items-center justify-center border border-gray-800">
                        {/* Background Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black opacity-90"></div>
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                        
                        {/* --- NEW STATIC DASHBOARD SKELETON (Replaces Video) --- */}
                        <div className="relative z-10 w-full h-full p-4 md:p-6 flex flex-col opacity-90">
                           {/* Fake Header/Nav */}
                           <div className="w-full h-4 bg-gray-800/60 rounded mb-3 flex items-center px-2 gap-2 border border-white/5">
                               <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                               <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                               <div className="ml-2 w-16 h-1 bg-gray-600/50 rounded-full"></div>
                           </div>
                           
                           {/* Fake Layout Grid */}
                           <div className="flex gap-3 h-full">
                               {/* Sidebar */}
                               <div className="w-1/4 h-full bg-gray-800/40 rounded border border-white/5 flex flex-col gap-2 p-2">
                                  <div className="w-full h-2 bg-white/10 rounded"></div>
                                  <div className="w-2/3 h-2 bg-white/10 rounded"></div>
                                  <div className="w-3/4 h-2 bg-white/10 rounded"></div>
                               </div>
                               {/* Main Content */}
                               <div className="flex-1 flex flex-col gap-3">
                                   <div className="h-16 bg-[#FBBF24]/10 border border-[#FBBF24]/30 rounded relative overflow-hidden p-3">
                                      <div className="w-24 h-3 bg-[#FBBF24]/40 rounded mb-2"></div>
                                      <div className="w-12 h-2 bg-[#FBBF24]/20 rounded"></div>
                                   </div>
                                   <div className="flex-1 bg-gray-800/40 rounded border border-white/5 p-2 grid grid-cols-2 gap-2">
                                      <div className="bg-white/5 rounded"></div>
                                      <div className="bg-white/5 rounded"></div>
                                      <div className="col-span-2 bg-white/5 rounded h-8 mt-auto"></div>
                                   </div>
                               </div>
                           </div>
                        </div>
                        {/* --- END STATIC DASHBOARD --- */}

                      </div>
                  </div>
                  <div className="bg-gray-800 h-4 w-full rounded-b-lg border-x-4 border-b-4 border-black relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-2 bg-gray-600 rounded-b-md"></div>
                  </div>
                </div>

                {/* PHONE MOCKUP */}
                <div className="absolute bottom-4 right-4 md:right-0 w-[130px] md:w-[180px] z-20">
                  <div className="bg-black border-4 border-black rounded-[2rem] p-1.5 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.5)]">
                      <div className="bg-white aspect-[9/19.5] w-full rounded-[1.5rem] relative overflow-hidden border border-gray-400">
                        <div className="absolute top-0 w-full h-6 bg-gray-100 border-b border-gray-200 z-20 flex justify-center">
                            <div className="w-16 h-4 bg-black rounded-b-lg"></div>
                        </div>
                        <div className="pt-8 px-2 space-y-2">
                            <div className="h-20 bg-[#FBBF24] rounded-lg border-2 border-black flex items-center justify-center shadow-sm">
                              <Zap size={24} fill="black" />
                            </div>
                            <div className="h-10 bg-gray-100 rounded-lg border-2 border-black"></div>
                            <div className="h-10 bg-gray-100 rounded-lg border-2 border-black"></div>
                        </div>
                        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold px-2 py-1 uppercase whitespace-nowrap ${mono.className}`}>
                            Beta_Build
                        </div>
                      </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-10 right-[5%] z-30 bg-white border-4 border-black p-3 shadow-[6px_6px_0px_0px_#000] rotate-12 hidden md:block">
                  <div className={`flex items-center gap-2 ${mono.className}`}>
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
            {/* Main Card Container */}
            <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#000] rotate-1 md:rotate-2 hover:rotate-0 transition-transform duration-300">
              
              {/* HEADER: Identity Tag */}
              <div className="flex justify-between items-start mb-6">
                  <div className={`bg-black text-white px-3 py-1 text-xs font-bold uppercase inline-flex items-center gap-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] ${mono.className}`}>
                      <span className="w-2 h-2 bg-[#FBBF24] rounded-full animate-pulse"/>
                      // IDENTITY: B.TECH_STUDENTS
                  </div>
              </div>
              
              {/* HEADLINE: Emphasizing "Students" */}
              <h2 className={`text-5xl md:text-6xl uppercase leading-[0.85] tracking-tighter mb-6 text-black ${archivo.className}`}>
                  Built By <br/>
                  <span className="relative inline-block mt-2">
                      {/* Yellow Underlay */}
                      <span className="absolute inset-0 bg-[#FBBF24] translate-x-1 translate-y-1 border-2 border-black"></span>
                      {/* Text */}
                      <span className="relative bg-white border-2 border-black px-3 z-10 block">Students.</span>
                  </span>
              </h2>
              
              {/* BODY: Emphasizing "For Ourselves" */}
              <p className="text-base md:text-lg font-medium leading-relaxed text-black mb-8">
                  We aren't a corporation. We are <b>B.Tech students</b> sitting in the same exam halls as you. 
                  <br className="hidden md:block" />
                  We are building this app because <span className="bg-[#10B981]/20 px-1 font-bold border-b-4 border-[#10B981]">we need it just as much as you do.</span>
              </p>
              
              {/* ACTION LIST: Proof of Student Identity */}
              <div className={`space-y-4 ${mono.className}`}>
                  
                  {/* Item 1: Relatability */}
                  <div className="group relative cursor-default">
                      <div className="absolute inset-0 bg-black translate-x-1 translate-y-1"></div>
                      <div className="relative flex items-center justify-between p-3 border-2 border-black bg-white">
                          <div className="flex items-center gap-4">
                              <div className="bg-[#FBBF24] p-2 border-2 border-black flex items-center justify-center">
                                  <Users className="text-black" size={20} />
                              </div>
                              <div className="flex flex-col">
                                  <span className="font-bold text-black text-sm uppercase">One of Us</span>
                                  <span className="text-[10px] md:text-xs text-gray-600 font-bold leading-none mt-0.5">We write the same exams you do.</span>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Item 2: Dogfooding (Using your own product) */}
                  <div className="group relative cursor-default">
                      <div className="absolute inset-0 bg-black translate-x-1 translate-y-1"></div>
                      <div className="relative flex items-center justify-between p-3 border-2 border-black bg-white">
                          <div className="flex items-center gap-4">
                              <div className="bg-[#10B981] p-2 border-2 border-black flex items-center justify-center">
                                   <Hammer className="text-black" size={20} />
                              </div>
                              <div className="flex flex-col">
                                  <span className="font-bold text-black text-sm uppercase">Dogfooding Daily</span>
                                  <span className="text-[10px] md:text-xs text-gray-600 font-bold leading-none mt-0.5">We use this app to survive our own semesters.</span>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>

            </div>
          </div>

        </div>

        {/* 4. BOTTOM CTA */}
        <div className="hero-cta mt-20 md:mt-32 flex flex-col items-start pb-4 relative z-30 w-full">
          
          <div className={`
            mb-8 bg-white border-2 border-black px-4 py-2 
            shadow-[4px_4px_0px_0px_#000] 
            text-[10px] md:text-sm font-bold uppercase tracking-widest 
            flex items-center gap-2 self-center md:self-start
            ${mono.className}
          `}>
             <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
             <span>Created by B.Techs <span className="text-gray-300 mx-1">//</span> For B.Techs</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-10 w-full items-center md:items-start md:justify-start">
            
            <Link href="/join" className="
              group relative 
              bg-[#FBBF24] text-black 
              text-xl md:text-2xl font-black uppercase italic tracking-tighter
              px-10 py-5 
              border-4 border-black 
              shadow-[8px_8px_0px_0px_#000] 
              hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-y-1 hover:-translate-x-1
              active:translate-y-0 active:translate-x-0 active:shadow-[4px_4px_0px_0px_#000]
              transition-all duration-200 ease-out
              flex items-center gap-3
            ">
              <span>Join The Waitlist</span>
              <ArrowDownRight strokeWidth={3} className="group-hover:-rotate-90 transition-transform duration-300" />
            </Link>
            
            <div className="flex items-center gap-4">
               <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-black overflow-hidden z-0 bg-white shadow-sm">
                       <img 
                          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i * 35}&backgroundColor=ffdfbf,c0aede,d1d4f9`} 
                          alt="avatar" 
                          className="w-full h-full object-cover"
                       />
                    </div>
                  ))}
                  <div className={`w-12 h-12 rounded-full bg-[#FBBF24] border-2 border-black flex items-center justify-center text-xs font-black z-10 shadow-sm ${mono.className}`}>
                     +{userCount}
                  </div>
               </div>
               <div className="flex flex-col">
                  <span className={`text-sm font-bold uppercase tracking-tight ${archivo.className}`}>Early Supporters</span>
                  <span className={`text-[10px] font-bold text-[#10B981] uppercase tracking-widest flex items-center gap-1 ${mono.className}`}>
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