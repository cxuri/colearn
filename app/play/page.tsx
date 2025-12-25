import React from 'react';
import GameClient from './GameClient';

// Ensure this page is dynamic so searchParams are read on every request
export const dynamic = 'force-dynamic';

interface GamePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export const metadata = {
  title: 'Klaz Runner',
  description: 'Try beating my score in Klaz Runner!',
  openGraph: {
    title: 'Klaz Christmas Challenge ❄️',
    description: 'This Christmas, slow down for a moment. Play and enjoy!',
    images: ['/christmas_card.jpeg'], 
  },
}
export default async function GamePage({ searchParams }: GamePageProps) {
  // Await the params (Required for Next.js 15 support)
  const params = await searchParams;
  const gameId = params?.id as string;

  if (!gameId) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white font-mono">
        <h1 className="text-4xl font-black">NO GAME ID PROVIDED</h1>
      </div>
    );
  }

  // Pass the ID to the client wrapper
  return <GameClient id={gameId} />;
}