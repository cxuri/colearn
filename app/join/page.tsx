'use client';

import React, { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { Space_Mono, Archivo_Black } from 'next/font/google';
import { 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Loader2, 
  Zap, 
  Share2, // Changed X to Share2
  Check, // Added Check for copy confirmation
  Terminal,
  ChevronDown
} from 'lucide-react';
import { submitToWaitlist } from '../actions'; 

// --- FONTS ---
const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });
const archivo = Archivo_Black({ weight: '400', subsets: ['latin'] });

declare global {
  interface Window {
    gsap: any;
  }
}

export default function JoinPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [ticketId, setTicketId] = useState('0000'); 

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // --- 1. SETUP ---
  useEffect(() => {
    setTicketId(String(Math.floor(Math.random() * 90000) + 10000));
  }, []);

  // --- 2. ANIMATIONS ---
  useEffect(() => {
    if (!gsapLoaded || !window.gsap) return;

    const ctx = window.gsap.context(() => {
        const tl = window.gsap.timeline({ defaults: { ease: 'power3.out' } });

        // A. ENTRANCE
        tl.from('.left-panel', { xPercent: -100, duration: 1 })
          .from('.right-panel-content', { y: 50, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.5')
          .from('.sticker', { scale: 0, rotation: -45, duration: 0.4, ease: 'back.out(1.7)', stagger: 0.1 }, '-=0.3');

        // B. MARQUEE
        window.gsap.to('.marquee-track', {
          xPercent: -50, 
          repeat: -1,
          duration: 20,
          ease: 'linear'
        });

    }, containerRef);

    return () => ctx.revert();
  }, [gsapLoaded]);

  // --- 3. HANDLERS ---
  const triggerErrorShake = () => {
    if (window.gsap && formRef.current) {
      window.gsap.fromTo(formRef.current, 
        { x: 0 }, 
        { x: 10, duration: 0.1, repeat: 5, yoyo: true, ease: 'sine.inOut' }
      );
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    
    if(window.gsap) window.gsap.to('.submit-btn', { scale: 0.98, duration: 0.2 });

    const formData = new FormData(event.currentTarget);
    const result = await submitToWaitlist(formData);
    
    if (result.success) {
      if(window.gsap) {
          window.gsap.to('.form-wrapper', { 
            opacity: 0, 
            y: -20, 
            duration: 0.3, 
            onComplete: () => {
              setStatus('success');
              setMessage(result.message);
            }
          });
      } else {
          setStatus('success');
          setMessage(result.message);
      }
    } else {
      setStatus('error');
      setMessage(result.message);
      triggerErrorShake();
      if(window.gsap) window.gsap.to('.submit-btn', { scale: 1, duration: 0.2 });
    }
  }

  return (
    <div ref={containerRef} className={`min-h-screen w-full flex flex-col md:flex-row bg-white text-black overflow-hidden ${mono.className}`}>
      
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
        onLoad={() => setGsapLoaded(true)}
      />

      {/* =========================================
          LEFT PANEL: THE VIBE
      ========================================= */}
      <div className="left-panel w-full md:w-1/2 min-h-[40vh] md:h-screen relative bg-[#00FF94] border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-col justify-between overflow-hidden z-20">
         
         {/* GRID PATTERN */}
         <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,1) 2px, transparent 2px),
                linear-gradient(to bottom, rgba(0,0,0,1) 2px, transparent 2px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                  <Link href="/" className="bg-black text-white px-4 py-2 text-xl font-bold uppercase hover:bg-white hover:text-black border-4 border-transparent hover:border-black transition-all">
                      ← Back
                  </Link>
                  <div className="sticker bg-white border-4 border-black p-2 rotate-6 shadow-[4px_4px_0px_0px_#000]">
                      <Zap size={32} fill="black" />
                  </div>
              </div>

              <div className="my-10 md:my-0 py-20">
                  <div className="sticker inline-block bg-[#FF0054] text-white px-3 py-1 font-bold uppercase border-2 border-black -rotate-2 mb-4 shadow-[4px_4px_0px_0px_#000]">
                      Waitlist Open
                  </div>
                  <h1 className={`${archivo.className} text-[#111111] text-7xl md:text-8xl uppercase leading-[0.85] mb-6`}>
                      Join <br/>
                      The <br/>
                      <span className="text-white text-transparent" style={{ WebkitTextStroke: '3px black' }}>Cult.</span>
                  </h1>
                  <p className="font-bold text-lg md:text-xl max-w-md bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                      Klaz is the anti-boring learning platform for KTU. No lectures. Just survival.
                  </p>
              </div>
          </div>
      </div>


      {/* =========================================
          RIGHT PANEL: THE FORM 
      ========================================= */}
      <div className="w-full md:w-1/2 h-auto md:h-screen overflow-y-auto bg-white relative">
          
          <div className="p-6 md:p-12 max-w-lg mx-auto min-h-full flex flex-col justify-center">
              
              <div className="right-panel-content mb-8">
                  <div className="flex items-center gap-2 mb-2">
                      <Terminal size={20} />
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                          {status === 'success' ? 'Database Updated' : 'Registration'}
                      </span>
                  </div>
                  {/* DYNAMIC HEADER CHANGE */}
                  <h2 className={`${archivo.className} text-black text-4xl uppercase`}>
                        {status === 'success' ? "Welcome to the Cult." : "Lets get you on the list"}
                  </h2>
              </div>

              {/* SUCCESS STATE */}
              {status === 'success' ? (
                  <SuccessTicket message={message} ticketId={ticketId} loaded={gsapLoaded} />
              ) : (
                  
                  /* FORM STATE */
                  <div className="form-wrapper right-panel-content">
                      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                          
                          {/* Row 1: Name & Email */}
                          <div className="space-y-4">
                              <div className="group relative">
                                  <label className="text-xs font-black uppercase mb-1 block group-focus-within:text-[#FF0054] transition-colors">
                                      01 // Full Name <span className="text-red-500">*</span>
                                  </label>
                                  <input 
                                      required
                                      name="name"
                                      placeholder="Ex: John Doe"
                                      className="w-full bg-[#F2F2F2] border-b-4 border-black p-3 text-lg font-bold uppercase focus:outline-none focus:bg-[#E6FFF5] focus:border-[#FF0054] transition-colors placeholder:text-gray-400"
                                  />
                              </div>

                              <div className="group relative">
                                  <label className="text-xs font-black uppercase mb-1 block group-focus-within:text-[#FF0054] transition-colors">
                                      02 // Email Address <span className="text-red-500">*</span>
                                  </label>
                                  <input 
                                      required
                                      name="email"
                                      type="email"
                                      placeholder="Ex: john@college.edu"
                                      className="w-full bg-[#F2F2F2] border-b-4 border-black p-3 text-lg font-bold uppercase focus:outline-none focus:bg-[#E6FFF5] focus:border-[#FF0054] transition-colors placeholder:text-gray-400"
                                  />
                              </div>
                          </div>

                          {/* Row 2: College & Year */}
                          <div className="grid grid-cols-2 gap-6">
                               <div className="group relative">
                                  <label className="text-xs font-black uppercase mb-1 block group-focus-within:text-[#FF0054] transition-colors">
                                      03 // College <span className="text-red-500">*</span>
                                  </label>
                                  <input 
                                      required
                                      name="college"
                                      placeholder="Ex: MEC, CET..."
                                      className="w-full bg-[#F2F2F2] border-b-4 border-black p-3 text-base font-bold uppercase focus:outline-none focus:bg-[#E6FFF5] focus:border-[#FF0054] transition-colors placeholder:text-gray-400"
                                  />
                              </div>
                              <div className="group relative">
                                  <label className="text-xs font-black uppercase mb-1 block group-focus-within:text-[#FF0054] transition-colors">
                                      04 // Year <span className="text-red-500">*</span>
                                  </label>
                                  <div className="relative">
                                    <select 
                                        required
                                        name="year"
                                        className="w-full bg-[#F2F2F2] border-b-4 border-black p-3 text-base font-bold uppercase focus:outline-none focus:bg-[#E6FFF5] focus:border-[#FF0054] transition-colors cursor-pointer appearance-none rounded-none relative z-10"
                                    >
                                        <option value="" disabled selected>Select</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none" size={16} />
                                  </div>
                              </div>
                          </div>

                          {/* Row 3: Branch (All Major KTU Branches) */}
                          <div className="group relative">
                                  <label className="text-xs font-black uppercase mb-1 block group-focus-within:text-[#FF0054] transition-colors">
                                      05 // Branch / Department <span className="text-red-500">*</span>
                                  </label>
                                  <div className="relative">
                                    <select 
                                        required
                                        name="branch"
                                        className="w-full bg-[#F2F2F2] border-b-4 border-black p-3 text-base font-bold uppercase focus:outline-none focus:bg-[#E6FFF5] focus:border-[#FF0054] transition-colors cursor-pointer appearance-none rounded-none relative z-10"
                                    >
                                        <option value="" disabled selected>Select your Branch</option>
                                        <option value="cse">Computer Science (CSE)</option>
                                        <option value="ece">Electronics & Comm. (ECE)</option>
                                        <option value="eee">Electrical & Electronics (EEE)</option>
                                        <option value="me">Mechanical (ME)</option>
                                        <option value="ce">Civil (CE)</option>
                                        <option value="it">Information Technology (IT)</option>
                                        <option value="ai_ds">AI & Data Science (AD)</option>
                                        <option value="ai_ml">AI & Machine Learning (AM)</option>
                                        <option value="robotics">Robotics & Automation</option>
                                        <option value="chemical">Chemical Engineering</option>
                                        <option value="biotech">Biotechnology</option>
                                        <option value="auto">Automobile Engineering</option>
                                        <option value="mechatronics">Mechatronics</option>
                                        <option value="aei">Applied Electronics (AEI)</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none" size={16} />
                                  </div>
                          </div>

                          {/* Row 4: WhatsApp */}
                          <div className="group relative">
                              <label className="text-xs font-black uppercase mb-1 flex justify-between group-focus-within:text-[#FF0054] transition-colors">
                                  <span>06 // WhatsApp Number</span>
                                  <span className="text-gray-400">(Optional)</span>
                              </label>
                              <input 
                                  name="whatsapp"
                                  type="tel"
                                  placeholder="Ex: +91 99999 99999"
                                  className="w-full bg-[#F2F2F2] border-b-4 border-black p-3 text-lg font-bold uppercase focus:outline-none focus:bg-[#E6FFF5] focus:border-[#FF0054] transition-colors placeholder:text-gray-400"
                              />
                          </div>

                          {/* Row 5: Reason */}
                          <div className="group relative">
                              <label className="text-xs font-black uppercase mb-1 block group-focus-within:text-[#FF0054] transition-colors">
                                  07 // Why do you want to join?
                              </label>
                              <textarea 
                                  name="why"
                                  rows={1}
                                  placeholder="Tell us what you're looking for..."
                                  className="w-full bg-[#F2F2F2] border-b-4 border-black p-3 text-lg font-bold uppercase focus:outline-none focus:bg-[#E6FFF5] focus:border-[#FF0054] transition-colors placeholder:text-gray-400 resize-none"
                              />
                          </div>

                          {/* ERROR MESSAGE */}
                          {status === 'error' && (
                              <div className="bg-red-50 border-l-8 border-red-500 p-4 flex items-center gap-3 text-red-600 font-bold text-xs uppercase animate-in slide-in-from-top-2">
                                  <AlertTriangle size={20} />
                                  {message}
                              </div>
                          )}

                          {/* SUBMIT BUTTON */}
                          <button 
                              disabled={status === 'loading'}
                              type="submit"
                              className="
                                  submit-btn w-full h-16 
                                  bg-black text-white 
                                  border-4 border-transparent
                                  hover:bg-[#FF0054] hover:text-white hover:border-black
                                  focus:outline-none
                                  transition-all duration-200
                                  shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]
                                  hover:shadow-[8px_8px_0px_0px_#000] hover:-translate-y-1
                                  active:translate-y-0 active:shadow-none
                                  flex items-center justify-between px-6
                                  disabled:opacity-50 disabled:cursor-not-allowed
                              "
                          >
                              <span className={`${archivo.className} text-2xl uppercase tracking-tight`}>
                                  {status === 'loading' ? 'Processing...' : 'Secure My Spot'}
                              </span>
                              {status === 'loading' ? (
                                  <Loader2 className="animate-spin w-6 h-6" />
                              ) : (
                                  <ArrowRight size={32} strokeWidth={2} />
                              )}
                          </button>

                          <p className="text-[10px] font-bold text-gray-400 uppercase text-center">
                              We respect your inbox. No spam, just updates.
                          </p>
                      </form>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
}

// --- SUCCESS TICKET COMPONENT ---
function SuccessTicket({ message, ticketId, loaded }: { message: string, ticketId: string, loaded: boolean }) {
  const container = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if(!loaded || !window.gsap) return;
    const ctx = window.gsap.context(() => {
        window.gsap.from('.ticket-item', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }, container);
    return () => ctx.revert();
  }, [loaded]);

  const handleShare = async () => {
    const shareText = "I just joined the waitlist for Klaz - The anti-boring learning platform for KTU. Survival mode activated. 🚀";
    const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://klaz.app';

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Join Klaz',
                text: shareText,
                url: shareUrl
            });
        } catch (err) {
            console.log("Share cancelled");
        }
    } else {
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    /* Added pb-20 and changed justify-center to justify-start on mobile for better scrolling */
    <div ref={container} className="flex flex-col items-center justify-start md:justify-center text-center space-y-6 md:space-y-8 py-4 md:py-10 pb-20">
        
        {/* The Ticket Graphic - Reduced size for mobile */}
        <div className="ticket-item relative bg-[#F2F2F2] border-4 border-black w-full max-w-[320px] md:max-w-sm p-0 shadow-[8px_8px_0px_0px_#000] z-10">
            {/* Ticket Header */}
            <div className="bg-black text-white p-3 md:p-4 flex justify-between items-center border-b-4 border-black">
                <span className="font-bold text-[10px] md:text-xs uppercase tracking-widest">WAITLIST PASS</span>
                <span className="font-bold text-[10px] md:text-xs uppercase tracking-widest">KLAZ.APP</span>
            </div>
            
            {/* Ticket Body */}
            <div className="p-6 md:p-8 space-y-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#00FF94] border-4 border-black rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                    <CheckCircle size={32} className="md:w-10 md:h-10 text-black" />
                </div>
                <h2 className={`${archivo.className} text-3xl md:text-4xl uppercase`}>You are In.</h2>
                <div className="border-t-2 border-dashed border-black my-4 w-full"></div>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] md:text-xs font-bold uppercase">
                        <span className="text-gray-500">TICKET ID</span>
                        <span>#{ticketId}</span>
                    </div>
                    <div className="flex justify-between text-[10px] md:text-xs font-bold uppercase items-center">
                        <span className="text-gray-500">STATUS</span>
                        <span className="bg-[#00FF94] text-black px-2 py-0.5 border-2 border-black font-black">CONFIRMED</span>
                    </div>
                </div>
            </div>

            {/* Ticket Cutout Circles */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white border-r-4 border-black rounded-full -mt-3"></div>
            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white border-l-4 border-black rounded-full -mt-3"></div>
        </div>

        <div className="ticket-item px-4">
            <p className="font-bold text-xs md:text-sm max-w-xs mx-auto">
                {message || "We have secured your spot in the database."}
            </p>
        </div>

        {/* Updated Button: Ensure visibility and width */}
        <div className="ticket-item w-full px-4 max-w-sm pb-10">
            <button 
                onClick={handleShare}
                className="w-full bg-black text-white h-14 border-4 border-transparent hover:bg-[#FF0054] hover:text-white hover:border-black transition-all flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none"
            >
                {copied ? (
                    <>
                        <Check size={20} /> <span className={`${archivo.className} text-lg md:text-xl uppercase tracking-wide`}>Link Copied</span>
                    </>
                ) : (
                    <>
                        <Share2 size={20} /> <span className={`${archivo.className} text-lg md:text-xl uppercase tracking-wide`}>Recruit a Friend</span>
                    </>
                )}
            </button>
        </div>
    </div>
  );
}