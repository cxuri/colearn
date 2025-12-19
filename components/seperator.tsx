'use client';

import { Archivo_Black } from 'next/font/google';

const archivo = Archivo_Black({ weight: '400', subsets: ['latin'] });

interface SeparatorProps {
  baseColor?: string;
  stripeColor?: string;
  textColor?: string;
}

export default function StaticSeparator({ 
  baseColor = 'bg-yellow-400', 
  stripeColor = '#000000',
  textColor = 'text-black'
}: SeparatorProps) {
    
  // Sufficient repetitions to cover 4K screens
  const repetitions = Array(100).fill("KLAZ");

  return (
    <div 
      className={`w-full h-[50px] ${baseColor} border-y-2 border-black overflow-hidden relative z-10 flex items-center justify-center`}
    >
      {/* --- Texture Layer --- */}
      <div 
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        style={{
            backgroundImage: `repeating-linear-gradient(
                -45deg,
                ${stripeColor},
                ${stripeColor} 1px,
                transparent 1px,
                transparent 4px
            )`
        }}
      ></div>

      {/* --- Text Layer --- */}
      <div className={`relative z-20 flex whitespace-nowrap select-none ${textColor}`}>
          {repetitions.map((item, i) => (
             <span 
                key={i} 
                className={`${archivo.className} text-[10px] leading-none font-black uppercase tracking-widest opacity-90 mx-1`}
             >
                {item}
             </span>
          ))}
      </div>
    </div>
  );
}