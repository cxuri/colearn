"use client";
import dynamic from 'next/dynamic';

// This is the magic part for Next.js
const PhaserGame = dynamic(() => import('@/components/game/PhaserGame'), { 
  ssr: false 
});

export default function GamePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <PhaserGame />
    </main>
  );
}