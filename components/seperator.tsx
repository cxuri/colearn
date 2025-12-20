'use client';

interface SeparatorProps {
  baseColor?: string;
  accentColor?: string;
}

export default function StaticSeparator({ 
  baseColor = 'bg-[#FBBF24]', // Updated to Warmer Amber
  accentColor = 'border-black'
}: SeparatorProps) {
    
  // Create a pattern of "bits" to simulate a data strip
  const modules = Array(40).fill(null);

  return (
    <div 
      className={`w-full h-[56px] ${baseColor} border-y-4 ${accentColor} relative overflow-hidden flex items-center justify-center`}
    >
      {/* --- Texture Layer (Subtle Hazard Stripes) --- */}
      <div 
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        style={{
            backgroundImage: `repeating-linear-gradient(
                -45deg,
                #000,
                #000 2px,
                transparent 2px,
                transparent 8px
            )`
        }}
      ></div>

      {/* --- Box Art / Data Strip Layer --- */}
      <div className="relative z-20 flex items-center gap-3 md:gap-6 opacity-80 select-none overflow-hidden w-full justify-center px-4">
          {modules.map((_, i) => (
             <div key={i} className="flex items-center gap-1 shrink-0">
                {/* 1. Empty Box */}
                <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-black bg-transparent"></div>
                
                {/* 2. Connector Line */}
                <div className="w-2 h-1 bg-black"></div>
                
                {/* 3. Filled Box (Randomize visuals slightly by index) */}
                <div className={`w-3 h-3 md:w-4 md:h-4 border-2 border-black ${i % 2 === 0 ? 'bg-black' : 'bg-transparent relative'}`}>
                    {/* Add an 'X' inside empty boxes every other time */}
                    {i % 2 !== 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[2px] h-[120%] bg-black rotate-45"></div>
                            <div className="w-[2px] h-[120%] bg-black -rotate-45"></div>
                        </div>
                    )}
                </div>
             </div>
          ))}
      </div>
      
      {/* --- Glitch/Overlay Line --- */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/20 z-30 pointer-events-none"></div>

    </div>
  );
}