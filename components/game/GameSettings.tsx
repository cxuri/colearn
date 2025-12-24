"use client";

import React, { useState, useRef, useEffect } from 'react';

// --- STYLES FOR GRID BACKGROUND ---
const gridStyle = {
  backgroundImage: `
    linear-gradient(to right, #000 1px, transparent 1px), 
    linear-gradient(to bottom, #000 1px, transparent 1px)
  `,
  backgroundSize: '40px 40px'
};

const GameSettings = () => {
  // -- STATE --
  const [activeTab, setActiveTab] = useState<'visuals' | 'audio' | 'physics'>('visuals');
  
  // Physics
  const [gravity, setGravity] = useState(1600);
  const [speed, setSpeed] = useState(6);

  // Visuals
  const [playerImage, setPlayerImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Audio
  const [audioFiles, setAudioFiles] = useState({
    bgm: null as string | null,
    jump: null as string | null,
    crash: null as string | null,
    powerup: null as string | null,
  });
  const [recordingType, setRecordingType] = useState<string | null>(null); // 'jump', 'crash', etc.
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // -- CAMERA LOGIC --
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (err) {
      alert("Camera permission denied or not available.");
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        // Draw video frame to canvas
        context.drawImage(videoRef.current, 0, 0, 100, 100);
        // Convert to data URL
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setPlayerImage(dataUrl);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach(track => track.stop());
    setIsCameraOpen(false);
  };

  // -- AUDIO RECORDING LOGIC --
  const startRecording = async (type: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(blob);
        setAudioFiles(prev => ({ ...prev, [type]: audioUrl }));
        setRecordingType(null);
        
        // Stop all tracks to release mic
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setRecordingType(type);
    } catch (err) {
      alert("Microphone permission denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingType) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'player') setPlayerImage(url);
      else setAudioFiles(prev => ({ ...prev, [type]: url }));
    }
  };

  // -- UI COMPONENTS --
  
  return (
    <div className="min-h-screen w-full bg-[#e0f2fe] font-mono relative text-black overflow-y-auto pb-20">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none fixed" style={gridStyle} />

      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-8">
        
        {/* HEADER */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-2 drop-shadow-[4px_4px_0px_#fff]">
            GAME MAKER
          </h1>
          <div className="bg-black text-white px-4 py-2 text-sm font-bold inline-block -rotate-2 border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
            CUSTOMIZE YOUR KLAZ RUNNER
          </div>
        </header>

        {/* MAIN CARD */}
        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 md:p-8">
          
          {/* TABS */}
          <div className="flex gap-2 mb-8 border-b-4 border-black pb-4 overflow-x-auto">
            {['visuals', 'audio', 'physics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`
                  px-6 py-3 font-black text-lg border-4 border-black uppercase transition-all
                  ${activeTab === tab 
                    ? 'bg-[#FFD700] shadow-[4px_4px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px]' 
                    : 'bg-white hover:bg-gray-100'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* === VISUALS TAB === */}
          {activeTab === 'visuals' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-3xl font-black border-l-8 border-[#FF4444] pl-4">PLAYER AVATAR</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Upload / Camera Area */}
                <div className="space-y-4">
                  <div className="bg-gray-100 border-4 border-black border-dashed p-6 text-center">
                    {isCameraOpen ? (
                      <div className="relative">
                        <video ref={videoRef} autoPlay className="w-full border-4 border-black mb-4" />
                        <button 
                          onClick={takePhoto}
                          className="bg-red-500 text-white w-16 h-16 rounded-full border-4 border-black shadow-[2px_2px_0px_0px_#000] hover:scale-110 transition-transform"
                        />
                        <button 
                          onClick={stopCamera}
                          className="absolute top-2 right-2 bg-white px-2 border-2 border-black font-bold text-xs"
                        >
                          CLOSE
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="font-bold text-gray-500">UPLOAD OR SNAP A PHOTO</p>
                        
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'player')}
                          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-sm file:font-bold file:bg-[#87CEEB] file:text-black hover:file:bg-[#FFD700] cursor-pointer"
                        />
                        
                        <div className="text-center font-bold text-sm">- OR -</div>
                        
                        <button 
                          onClick={startCamera}
                          className="w-full py-3 bg-black text-white font-bold border-2 border-transparent hover:border-black hover:bg-gray-900 transition-colors"
                        >
                          OPEN CAMERA
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview Area */}
                <div className="flex flex-col items-center justify-center bg-[#e0f2fe] border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                  <p className="font-bold mb-4 bg-white px-2 border-2 border-black">PREVIEW</p>
                  <div className="relative w-32 h-32 border-4 border-black bg-white overflow-hidden flex items-center justify-center">
                    {playerImage ? (
                      <img src={playerImage} alt="Player" className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-16 h-16 bg-[#22c55e] border-2 border-black" />
                    )}
                  </div>
                  {/* Hidden Canvas for capture */}
                  <canvas ref={canvasRef} width="100" height="100" className="hidden" />
                </div>
              </div>
            </div>
          )}

          {/* === AUDIO TAB === */}
          {activeTab === 'audio' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-3xl font-black border-l-8 border-[#8b5cf6] pl-4">SOUND STUDIO</h2>
              
              <div className="grid gap-6">
                {[
                  { id: 'jump', label: 'JUMP SFX', color: 'bg-green-100' },
                  { id: 'crash', label: 'CRASH SFX', color: 'bg-red-100' },
                  { id: 'powerup', label: 'POWERUP SFX', color: 'bg-yellow-100' },
                  { id: 'bgm', label: 'BACKGROUND MUSIC', color: 'bg-blue-100' },
                ].map((item) => (
                  <div key={item.id} className={`flex flex-col md:flex-row items-center gap-4 border-4 border-black p-4 ${item.color} shadow-[4px_4px_0px_0px_#000]`}>
                    <div className="font-black text-xl w-48">{item.label}</div>
                    
                    {/* Audio Player if exists */}
                    {audioFiles[item.id as keyof typeof audioFiles] && (
                      <audio controls src={audioFiles[item.id as keyof typeof audioFiles]!} className="h-10 w-full md:w-48" />
                    )}

                    <div className="flex-grow flex gap-2 w-full md:w-auto">
                      {/* Upload Button */}
                      <label className="flex-1 cursor-pointer bg-white border-2 border-black px-4 py-2 font-bold text-center hover:bg-gray-50 flex items-center justify-center gap-2">
                        <span>UPLOAD</span>
                        <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleFileUpload(e, item.id)} />
                      </label>

                      {/* Record Button (Skip for BGM usually) */}
                      {item.id !== 'bgm' && (
                        <button
                          onMouseDown={() => startRecording(item.id)}
                          onMouseUp={stopRecording}
                          onTouchStart={() => startRecording(item.id)}
                          onTouchEnd={stopRecording}
                          className={`flex-1 border-2 border-black px-4 py-2 font-bold text-white transition-all active:scale-95
                            ${recordingType === item.id ? 'bg-red-600 animate-pulse' : 'bg-black hover:bg-gray-800'}
                          `}
                        >
                          {recordingType === item.id ? 'RELEASE TO STOP' : 'HOLD TO RECORD'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === PHYSICS TAB === */}
          {activeTab === 'physics' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-3xl font-black border-l-8 border-[#FFD700] pl-4">GAME PHYSICS</h2>
              
              <div className="space-y-8 p-6 bg-gray-50 border-4 border-black shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                
                {/* Gravity Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between font-bold text-xl">
                    <label>GRAVITY FORCE</label>
                    <span className="bg-black text-white px-2">{gravity}</span>
                  </div>
                  <input 
                    type="range" min="500" max="3000" step="50"
                    value={gravity}
                    onChange={(e) => setGravity(Number(e.target.value))}
                    className="w-full h-6 bg-white border-2 border-black appearance-none cursor-pointer accent-[#FF4444]"
                  />
                  <p className="text-xs font-bold text-gray-500">HIGHER = FALL FASTER (HARDER)</p>
                </div>

                {/* Speed Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between font-bold text-xl">
                    <label>GAME SPEED</label>
                    <span className="bg-black text-white px-2">{speed}</span>
                  </div>
                  <input 
                    type="range" min="4" max="20" step="1"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-full h-6 bg-white border-2 border-black appearance-none cursor-pointer accent-[#FFD700]"
                  />
                  <p className="text-xs font-bold text-gray-500">BASE SCROLLING SPEED</p>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="mt-8 flex gap-4">
          <button 
            className="flex-1 py-4 bg-[#87CEEB] border-4 border-black font-black text-2xl shadow-[6px_6px_0px_0px_#000] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_#000] transition-all"
            onClick={() => alert("Configuration Saved! (This would update the Context/LocalStorage)")}
          >
            SAVE CONFIG
          </button>
          <a href="/game" className="flex-1 text-center py-4 bg-white border-4 border-black font-black text-2xl shadow-[6px_6px_0px_0px_#000] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_#000] transition-all no-underline text-black">
            PLAY GAME
          </a>
        </div>

      </div>
    </div>
  );
};

export default GameSettings;