'use client';

import { Archivo_Black } from 'next/font/google';
import { Zap } from 'lucide-react';

const archivo = Archivo_Black({ 
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
});

interface RollingStripProps {
  items?: string[];
  bgColor?: string;
  textColor?: string;
  rotation?: number;
  speed?: number; // Seconds for one full loop
  separator?: 'zap' | 'block' | 'none';
}

const DEFAULT_ITEMS = [
  "COURSES",
  "FREE LEARNING",
  "CORE BRANCHES",
  "BY B.TECH STUDENTS",
  "KTU",
  "PREVIOUS PAPERS",
  "ANSWER KEYS",
  "ALL IN ONE PLATFORM",
];

export default function RollingTextStrip({
  items = DEFAULT_ITEMS,
  bgColor = 'bg-yellow-400',
  textColor = 'text-black',
  rotation = -2,
  speed = 40, // Increased default speed (20s might be too fast for long text)
  separator = 'zap'
}: RollingStripProps) {

  // Duplicate items 4 times to ensure seamless infinite scroll
  const marqueeItems = [...items, ...items, ...items, ...items];

  const SeparatorIcon = () => {
      if (separator === 'none') return <span className="mx-4"></span>;
      if (separator === 'block') return <div className={`w-3 h-3 ${textColor.replace('text-', 'bg-')} mx-6 rotate-45`}></div>;
      return <Zap size={20} className={`mx-6 ${textColor.replace('text-', 'fill-')}`} />;
  }

  return (
    <div 
      className={`relative w-full overflow-hidden border-y-4 border-black ${bgColor} ${textColor} py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]`}
      style={{ 
        transform: `rotate(${rotation}deg) scale(1.05)`, 
        zIndex: 10
      }} 
    >
      {/* 1. Inject Keyframes Globally within Component to avoid Next.js scoping issues */}
      <style>{`
        @keyframes rolling-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* The scrolling track */}
      <div 
        className="flex whitespace-nowrap w-max hover:[animation-play-state:paused]" // Added hover pause
        style={{
            animation: `rolling-marquee ${speed}s linear infinite`,
            willChange: 'transform' // Performance optimization
        }}
      >
        {marqueeItems.map((item, i) => (
          <div key={i} className={`flex items-center ${archivo.className}`}>
            <span className="text-xl md:text-3xl font-black uppercase tracking-tight">
              {item}
            </span>
            <SeparatorIcon />
          </div>
        ))}
      </div>
    </div>
  );
}