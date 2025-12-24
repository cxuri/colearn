'use client';

export default function SimpleSeparator() {
  return (
    <div className="w-full">
      {/* The Main Bar */}
      <div className="w-full h-10 bg-[#FBBF24] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative flex items-center overflow-hidden">
        
        {/* Subtle Static Pattern (Zero Load) */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)`,
            backgroundSize: '10px 10px'
          }}
        />
      </div>
    </div>
  );
}