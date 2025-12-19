'use client';

import React from 'react';
import { Space_Mono } from 'next/font/google';
import { 
  Instagram, 
  ArrowUpRight,
  Flame,
  Bell
} from 'lucide-react';

const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });

// --- TYPES ---
interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
  icon: React.ElementType; 
  bgColor: string; 
  desc: string;
  badge?: { text: string; icon?: React.ElementType }; // Optional Badge
}

// --- CUSTOM ICONS ---

const RedditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M17 13c0-1.5 1.1-2.5 2.5-2.5a2.5 2.5 0 0 1 0 5c-1.1 0-2-1-2-2Z" /> 
    <path d="M7 11a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 5 0c0-1.5-1.1-2.5-2.5-2.5Z" />
    <path d="M10 17a3 3 0 0 0 4 0" />
    <path d="M12 2.5V5" />
  </svg>
);

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12h6" />
    <path d="M15 9c0 0-1-1-3-1s-3 1-3 1" />
    <path d="M8.5 14.5c.5-1 1.5-1.5 3.5-1.5s3 .5 3.5 1.5" />
    <path d="M15.5 16.5l1.5-3.5" />
    <path d="M8.5 16.5l-1.5-3.5" />
  </svg>
);

// --- DATA ---
const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@klaz.app',
    url: 'https://instagram.com/klaz.app',
    icon: Instagram,
    bgColor: 'bg-[#FF8ED4]', // Neo-Pink
    desc: 'B.Tech trauma & updates'
  },
  {
    id: 'reddit',
    label: 'Reddit',
    handle: 'r/klaz',
    url: 'https://reddit.com/r/klaz',
    icon: RedditIcon,
    bgColor: 'bg-[#FF6B6B]', // Neo-Red
    desc: 'Discussions & theories',
    badge: { text: 'HOT', icon: Flame }
  },
  {
    id: 'discord',
    label: 'Discord',
    handle: 'discord.gg/klaz',
    url: 'https://discord.gg/', // <--- FILL LINK HERE
    icon: DiscordIcon,
    bgColor: 'bg-[#54A0FF]', // Neo-Blue
    desc: 'Voice channels & chaos',
    badge: { text: '99+ PINGS', icon: Bell }
  },
];

export default function Socials() {
  return (
    <section className="w-full bg-white border-x-4 border-black px-6 py-20 md:px-12 relative overflow-hidden text-black">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pr-20 pointer-events-none select-none">
          <h1 className="text-9xl font-black text-black">CONNECT</h1>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 border-b-4 border-black pb-4 flex flex-col md:flex-row justify-between items-end">
          <div>
            <span className={`bg-black text-white px-2 py-1 text-sm font-bold uppercase ${mono.className}`}>
                Net_Protocol.v2
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase mt-2 text-black">
                Join the <br/>
                <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>
                    Chaos<span className="animate-pulse text-black">_</span>
                </span>
            </h2>
          </div>
          <div className={`hidden md:block text-right ${mono.className}`}>
             <p className="text-xs font-bold text-gray-400">STATUS: ONLINE</p>
             <p className="text-xs font-bold text-gray-400">PING: 24ms</p>
          </div>
        </div>

        {/* Grid: 3 Columns on Large Screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;
            
            return (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                // The Card Container
                className={`
                  group relative border-4 border-black p-8 flex flex-col justify-between h-64 
                  transition-all duration-200 
                  ${link.bgColor} text-black
                  
                  /* Hover State: Turn Black, White Text, Lift Up */
                  hover:bg-black hover:text-white hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000]
                  
                  /* Active/Click State: Press Down */
                  active:translate-y-0 active:shadow-none
                `}
              >
                
                {/* Badge (Optional) - Absolute positioned top right */}
                {link.badge && (
                  <div className={`
                    absolute top-4 right-4 bg-black text-white px-2 py-1 text-[10px] font-bold uppercase 
                    flex items-center gap-1 border-2 border-transparent group-hover:border-white group-hover:bg-white group-hover:text-black
                    ${mono.className}
                  `}>
                     {link.badge.icon && <link.badge.icon size={10} className={link.id === 'reddit' ? 'fill-current' : ''} />}
                     {link.badge.text}
                  </div>
                )}

                <div className="flex justify-between items-start mt-2">
                  <Icon 
                    className="w-12 h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" 
                    strokeWidth={2.5} 
                  />
                  {/* Arrow Icon */}
                  {!link.badge && (
                    <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>
                
                <div>
                  <h3 className="text-3xl font-black uppercase leading-none mb-2">
                      {link.label}
                  </h3>
                  <p className={`text-sm font-bold uppercase tracking-widest opacity-70 mb-4 ${mono.className}`}>
                    {link.desc}
                  </p>
                  
                  {/* Link Text with animated underline on hover */}
                  <div className={`text-base font-bold border-t-2 border-black group-hover:border-white pt-4 flex items-center gap-2 ${mono.className}`}>
                     <span>{link.handle}</span>
                     <ArrowUpRight className="w-4 h-4" />
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