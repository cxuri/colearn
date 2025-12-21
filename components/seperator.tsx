'use client';

export default function SimpleSeparator() {
  return (
    <div className="w-full px-4 md:px-8">
      {/* The Main Bar */}
      <div className="w-full h-6 bg-[#FBBF24] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative flex items-center overflow-hidden">
        
        {/* Subtle Static Pattern (Zero Load) */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)`,
            backgroundSize: '10px 10px'
          }}
        />

        {/* Optional: Small 'Identity' Tag */}
        <div className="absolute left-4 bg-black px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-widest">
          SYSTEM_STRIP_01
        </div>
      </div>
    </div>
  );
}