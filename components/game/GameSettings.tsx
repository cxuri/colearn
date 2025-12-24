"use client";

import React, { useState, useRef } from 'react';
import { upload } from '@vercel/blob/client'; 
import { saveGameConfig } from '@/app/actions';

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
  const [activeTab, setActiveTab] = useState<'profile' | 'visuals' | 'audio' | 'physics'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingState, setUploadingState] = useState<string | null>(null); 

  // Profile Data
  const [creatorName, setCreatorName] = useState('');
  const [socialLink, setSocialLink] = useState('');
  
  // Physics
  const [gravity, setGravity] = useState(1600);
  const [speed, setSpeed] = useState(6);

  // File URLs
  const [fileUrls, setFileUrls] = useState({
    player: null as string | null,
    bgm: null as string | null,
    jump: null as string | null,
    crash: null as string | null,
    powerup: null as string | null,
  });

  // Camera & Audio Refs
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recordingType, setRecordingType] = useState<string | null>(null);

  // --- 1. CORE UPLOAD LOGIC (RANDOMIZED & LIMITED) ---
  const handleBlobUpload = async (file: File | Blob, type: string, originalFileName: string) => {
    // 3MB Limit Check
    if (file.size > 3 * 1024 * 1024) {
        alert("File too large! Please keep it under 3MB to save bandwidth.");
        return;
    }

    setUploadingState(type);
    try {
      // 1. Get Extension
      const ext = originalFileName.includes('.') ? originalFileName.split('.').pop() : 'bin';
      
      // 2. Generate Random Name: [type]-[timestamp]-[random].[ext]
      const randomSuffix = Math.random().toString(36).substring(2, 10);
      const uniqueFileName = `${type}-${Date.now()}-${randomSuffix}.${ext}`;

      // 3. Upload with Unique Name
      const newBlob = await upload(uniqueFileName, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      setFileUrls((prev) => ({ ...prev, [type]: newBlob.url }));
    } catch (error) {
      console.error('Upload failed:', error);
      alert(`Failed to upload ${type}.`);
    } finally {
      setUploadingState(null);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      handleBlobUpload(file, type, file.name);
    }
  };

  // --- 2. CAMERA LOGIC ---
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (err) { alert("Camera permission denied."); }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 100, 100);
        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            // Filename here is just a placeholder to extract extension 'png'
            await handleBlobUpload(blob, 'player', 'camera-capture.png');
            stopCamera();
          }
        }, 'image/png');
      }
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsCameraOpen(false);
  };

  // --- 3. AUDIO RECORDING LOGIC ---
  const startRecording = async (type: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Force Audio MIME Type (Fixes video/webm issue)
      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
      }

      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mimeType.split(';')[0] });
        const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
        
        // Pass dummy name with correct extension, randomizer handles the rest
        await handleBlobUpload(blob, type, `recording.${ext}`);
        
        stream.getTracks().forEach(track => track.stop());
        setRecordingType(null);
      };

      mediaRecorderRef.current.start();
      setRecordingType(type);
    } catch (err) { 
        console.error(err);
        alert("Microphone permission denied."); 
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingType) {
      mediaRecorderRef.current.stop();
    }
  };

  // --- 4. SAVE CONFIGURATION ---
  const handleSave = async () => {
    if (!creatorName.trim()) {
      alert("Please enter a Creator Name in the Profile tab.");
      setActiveTab('profile');
      return;
    }

    setIsSaving(true);

    const payload = {
      creator: creatorName,
      creator_social: socialLink,
      player_url: fileUrls.player,
      bgm_sfx: fileUrls.bgm,
      jump_sfx: fileUrls.jump,
      crash_sfx: fileUrls.crash,
      powerup_sfx: fileUrls.powerup,
      settings: {
        gravity: gravity,
        speed: speed
      }
    };

    try {
      const result = await saveGameConfig(payload);
      if (result.success) {
        alert("Game Configuration Saved! ID: " + result.gameId);
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      alert("An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  // -- UI COMPONENTS --
  return (
    <div className="min-h-screen w-full bg-[#e0f2fe] font-mono relative text-black overflow-y-auto pb-20">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none fixed" style={gridStyle} />

      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-8">
        
        {/* HEADER */}
        <header className="mb-8 text-center">
          <h1 className="text-black text-5xl md:text-7xl mb-2 drop-shadow-[4px_4px_0px_#fff]">
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
            {['profile', 'visuals', 'audio', 'physics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`
                  px-6 py-3 text-black text-lg border-4 border-black uppercase transition-all
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

          {/* === PROFILE TAB === */}
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="text-3xl text-black border-l-8 border-black pl-4">CREATOR PROFILE</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block font-bold mb-1">CREATOR NAME (REQUIRED)</label>
                        <input 
                            type="text" 
                            className="w-full border-4 border-black p-3 font-bold text-lg"
                            placeholder="e.g. Dr. Disrespect"
                            value={creatorName}
                            onChange={(e) => setCreatorName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-bold mb-1">SOCIAL LINK (OPTIONAL)</label>
                        <input 
                            type="text" 
                            className="w-full border-4 border-black p-3 font-bold text-lg"
                            placeholder="e.g. twitter.com/..."
                            value={socialLink}
                            onChange={(e) => setSocialLink(e.target.value)}
                        />
                    </div>
                </div>
            </div>
          )}

          {/* === VISUALS TAB === */}
          {activeTab === 'visuals' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-3xl text-black border-l-8 border-[#FF4444] pl-4">PLAYER AVATAR</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-100 border-4 border-black border-dashed p-6 text-center">
                  {isCameraOpen ? (
                    <div className="relative">
                      <video ref={videoRef} autoPlay className="w-full border-4 border-black mb-4" />
                      <button onClick={takePhoto} className="bg-red-500 text-white w-16 h-16 rounded-full border-4 border-black shadow-[2px_2px_0px_0px_#000] hover:scale-110 transition-transform" />
                      <button onClick={stopCamera} className="absolute top-2 right-2 bg-white px-2 border-2 border-black font-bold text-xs">CLOSE</button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {uploadingState === 'player' ? (
                          <div className="font-bold text-xl animate-pulse">UPLOADING...</div>
                      ) : (
                          <>
                              <p className="font-bold text-gray-500">UPLOAD OR SNAP A PHOTO</p>
                              <input type="file" accept="image/*" onChange={(e) => onFileInputChange(e, 'player')} className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-sm file:font-bold file:bg-[#87CEEB] file:text-black hover:file:bg-[#FFD700] cursor-pointer" />
                              <div className="text-center font-bold text-sm">- OR -</div>
                              <button onClick={startCamera} className="w-full py-3 bg-black text-white font-bold border-2 border-transparent hover:border-black hover:bg-gray-900 transition-colors">OPEN CAMERA</button>
                          </>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center bg-[#e0f2fe] border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                  <p className="font-bold mb-4 bg-white px-2 border-2 border-black">PREVIEW</p>
                  <div className="relative w-32 h-32 border-4 border-black bg-white overflow-hidden flex items-center justify-center">
                    {fileUrls.player ? (
                      <img src={fileUrls.player} alt="Player" className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-16 h-16 bg-[#22c55e] border-2 border-black" />
                    )}
                  </div>
                  <canvas ref={canvasRef} width="100" height="100" className="hidden" />
                </div>
              </div>
            </div>
          )}

          {/* === AUDIO TAB === */}
          {activeTab === 'audio' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-3xl text-black border-l-8 border-[#8b5cf6] pl-4">SOUND STUDIO</h2>
              <div className="grid gap-6">
                {[
                  { id: 'jump', label: 'JUMP SFX', color: 'bg-green-100' },
                  { id: 'crash', label: 'CRASH SFX', color: 'bg-red-100' },
                  { id: 'powerup', label: 'POWERUP SFX', color: 'bg-yellow-100' },
                  { id: 'bgm', label: 'BACKGROUND MUSIC', color: 'bg-blue-100' },
                ].map((item) => (
                  <div key={item.id} className={`flex flex-col md:flex-row items-center gap-4 border-4 border-black p-4 ${item.color} shadow-[4px_4px_0px_0px_#000]`}>
                    <div className="text-black text-xl w-48 font-black">{item.label}</div>
                    
                    {fileUrls[item.id as keyof typeof fileUrls] && (
                      <audio controls src={fileUrls[item.id as keyof typeof fileUrls]!} className="h-10 w-full md:w-48" />
                    )}

                    {uploadingState === item.id ? (
                        <div className="flex-grow font-bold animate-pulse text-center">UPLOADING...</div>
                    ) : (
                        <div className="flex-grow flex gap-2 w-full md:w-auto">
                        <label className="flex-1 cursor-pointer bg-white border-2 border-black px-4 py-2 font-bold text-center hover:bg-gray-50 flex items-center justify-center gap-2">
                            <span>UPLOAD</span>
                            <input type="file" accept="audio/*" className="hidden" onChange={(e) => onFileInputChange(e, item.id)} />
                        </label>

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
                            {recordingType === item.id ? 'RELEASE' : 'HOLD REC'}
                            </button>
                        )}
                        </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === PHYSICS TAB === */}
          {activeTab === 'physics' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-3xl text-black border-l-8 border-[#FFD700] pl-4">GAME PHYSICS</h2>
              <div className="space-y-8 p-6 bg-gray-50 border-4 border-black shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                <div className="space-y-2">
                  <div className="flex justify-between font-bold text-xl">
                    <label>GRAVITY FORCE</label>
                    <span className="bg-black text-white px-2">{gravity}</span>
                  </div>
                  <input type="range" min="500" max="3000" step="50" value={gravity} onChange={(e) => setGravity(Number(e.target.value))} className="w-full h-6 bg-white border-2 border-black appearance-none cursor-pointer accent-[#FF4444]" />
                  <p className="text-xs font-bold text-gray-500">HIGHER = FALL FASTER (HARDER)</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-bold text-xl">
                    <label>GAME SPEED</label>
                    <span className="bg-black text-white px-2">{speed}</span>
                  </div>
                  <input type="range" min="4" max="20" step="1" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full h-6 bg-white border-2 border-black appearance-none cursor-pointer accent-[#FFD700]" />
                  <p className="text-xs font-bold text-gray-500">BASE SCROLLING SPEED</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="mt-8 flex gap-4">
          <button 
            className="flex-1 py-4 bg-[#87CEEB] border-4 border-black font-black text-2xl shadow-[6px_6px_0px_0px_#000] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={isSaving || !!uploadingState}
          >
            {isSaving ? 'SAVING...' : 'SAVE CONFIG'}
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