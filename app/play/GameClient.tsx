"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import prevents "window is not defined"
const PhaserGame = dynamic(() => import('@/components/game/PhaserGame'), { 
  ssr: false,
  loading: () => <div className="text-white font-mono animate-pulse">Initializing Engine...</div>
});

export default function GameClient({ id }: { id: string }) {
  const [config, setConfig] = useState<any>(null);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!id) {
      setStatus('error');
      setErrorMessage("No Game ID provided");
      return;
    }

    // Call your API
    fetch(`/api/game?id=${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Game not found");
        }
        return res.json();
      })
      .then((data) => {
        setConfig(data);
        setStatus('ready');
      })
      .catch((err) => {
        setStatus('error');
        setErrorMessage(err.message);
      });
  }, [id]);

  if (status === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#e0f2fe] font-mono">
        <div className="text-2xl font-black animate-bounce">LOADING ASSETS...</div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col h-screen w-full items-center justify-center bg-black text-white font-mono p-4 text-center">
        <h1 className="text-4xl font-black text-red-500 mb-4">ERROR</h1>
        <p className="text-xl font-bold border-2 border-red-500 p-4 rounded mb-8">{errorMessage}</p>
        <p className="text-xs text-gray-500 mb-4">ID: {id}</p>
        <a href="/" className="px-6 py-3 bg-white text-black font-black uppercase hover:bg-gray-200 transition-colors">
          Return Home
        </a>
      </div>
    );
  }

  // Render Phaser only when ready
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden">
      {config && <PhaserGame config={config} />}
    </main>
  );
}