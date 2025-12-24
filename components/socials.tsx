'use client';

import React from 'react';
import { Space_Mono } from 'next/font/google';
import { 
  Instagram, 
  ArrowUpRight,
  Flame,
  Bell,
  MessageSquare
} from 'lucide-react';

const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });

// --- TYPES ---
interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
  
  // Icon handling: Support both local Images and Lucide Components
  iconSrc?: string;                 // Path to your image in public folder (e.g. '/discord.png')
  iconComponent?: React.ElementType; // Fallback for things like Instagram
  
  bgColor: string; 
  desc: string;
  badge?: { text: string; icon?: React.ElementType };
}

// --- DATA ---
const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@klaz.app',
    url: 'https://instagram.com/klaz.app',
    // Uses the Lucide component
    iconComponent: Instagram, 
    bgColor: 'bg-[#FF0054]', // Neo-Pink
    desc: 'B.Tech trauma & updates'
  },
  {
    id: 'reddit',
    label: 'Reddit',
    handle: 'r/klaz',
    url: 'https://reddit.com/r/klaz',
    // Uses your local file
    iconSrc: '/reddit.png', 
    bgColor: 'bg-[#FF4500]', // Reddit Orange
    desc: 'Discussions & theories',
    badge: { text: 'HOT TOPIC', icon: Flame }
  },
];

export default function Socials() {
  return (
    <section className="w-full bg-white border-x-4 border-black px-6 py-20 md:px-12 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-10 -right-10 rotate-12 opacity-5 pointer-events-none select-none">
          <h1 className="text-[12rem] font-black text-black leading-none">SOCIALS</h1>
      </div>
      <div className="absolute bottom-10 -left-10 -rotate-6 opacity-5 pointer-events-none select-none">
          <MessageSquare size={300} strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-6">
          <div className="space-y-4">
            <div className={`inline-block bg-black text-white px-3 py-1 text-sm font-bold uppercase tracking-wider transform -rotate-1 ${mono.className}`}>
                Net_Protocol.v2 // Connect
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase text-black leading-[0.9]">
                Join the <br/>
                <span className="relative inline-block">
                    <span className="relative z-10">Chaos</span>
                    {/* Hard Underline */}
                    <span className="absolute bottom-2 left-0 w-full h-4 bg-[#FF0054] -z-0"></span>
                </span>
            </h2>
          </div>
          
          <div className={`hidden md:flex flex-col items-end gap-1 ${mono.className} mt-6 md:mt-0`}>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 border-2 border-black animate-pulse"></div>
                <p className="text-sm font-bold text-black">SYSTEM_ONLINE</p>
             </div>
             <p className="text-sm font-bold text-gray-500">PING: 24ms</p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {SOCIAL_LINKS.map((link) => {
            return (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                // THE CARD CONTAINER
                className={`
                  group relative 
                  border-4 border-black 
                  p-6 h-72 
                  flex flex-col justify-between 
                  transition-all duration-200 ease-out
                  bg-white hover:bg-black
                  
                  /* Default Shadow */
                  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                  
                  /* Hover: Press Effect */
                  hover:translate-x-[4px] hover:translate-y-[4px] 
                  hover:shadow-none
                `}
              >
                {/* Color Overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${link.bgColor} mix-blend-difference`}></div>

                {/* Badge */}
                {link.badge && (
                  <div className={`
                    absolute -top-5 -right-2 
                    bg-[#FFDE00] text-black border-4 border-black 
                    px-3 py-1 text-xs font-black uppercase 
                    flex items-center gap-2 
                    transform rotate-3 group-hover:rotate-0 transition-transform
                    z-20
                    ${mono.className}
                  `}>
                     {link.badge.icon && <link.badge.icon size={12} />}
                     {link.badge.text}
                  </div>
                )}

                {/* Top Row: Icon Container */}
                <div className="flex justify-between items-start z-10">
                  <div className={`
                    p-3 border-4 border-black ${link.bgColor} text-white
                    group-hover:bg-white group-hover:text-black
                    transition-colors duration-200
                    w-16 h-16 flex items-center justify-center
                  `}>
                    
                    {/* LOGIC: Render Local Image OR Component */}
                    {link.iconSrc ? (
                      <img 
                        src={link.iconSrc} 
                        alt={`${link.label} icon`}
                        // MAGIC CLASS: 'invert' makes black icons white. 'group-hover:invert-0' makes them black again on hover.
                        className="w-full h-full object-contain filter invert brightness-0 group-hover:invert-0 group-hover:brightness-0 transition-all" 
                      />
                    ) : (
                      link.iconComponent && <link.iconComponent className="w-8 h-8" strokeWidth={2} />
                    )}
                    
                  </div>
                  
                  <ArrowUpRight className="w-10 h-10 text-black group-hover:text-white transition-colors duration-200" />
                </div>
                
                {/* Bottom Row: Text */}
                <div className="z-10 relative">
                  <h3 className="text-4xl font-black uppercase italic leading-none mb-2 text-black group-hover:text-white transition-colors">
                      {link.label}
                  </h3>
                  <p className={`text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300 mb-4 ${mono.className}`}>
                    {link.desc}
                  </p>
                  
                  {/* Handle */}
                  <div className={`
                    inline-block
                    bg-black text-white px-2 py-1 
                    text-sm font-bold 
                    group-hover:bg-white group-hover:text-black
                    transition-colors
                    ${mono.className}
                  `}>
                     {link.handle}
                  </div>
                </div>
              </a>
            );
          })}

        </div>

      </div>
    </section>
  );
}