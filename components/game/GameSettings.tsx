"use client";

import React, { useState, useRef } from 'react';
import { upload } from '@vercel/blob/client'; 
import { saveGameConfig } from '@/app/actions';

// --- ICONS (Inline SVGs to avoid dependencies) ---
const Icons = {
  Camera: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
  Upload: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Mic: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  Play: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
};

// --- STYLES ---
const gridStyle = {
  backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
  backgroundSize: '40px 40px'
};

// Types
interface GameAsset {
  file: File | Blob | null;
  previewUrl: string | null;
  originalName: string;
}

const GameSettings = () => {
  // -- STATE --
  const [activeTab, setActiveTab] = useState<'profile' | 'visuals' | 'audio' | 'physics'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Data
  const [creatorName, setCreatorName] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [gravity, setGravity] = useState(1600);
  const [speed, setSpeed] = useState(6);

  // Asset State
  const [assets, setAssets] = useState<{ [key: string]: GameAsset }>({
    player: { file: null, previewUrl: null, originalName: '' },
    bgm: { file: null, previewUrl: null, originalName: '' },
    jump: { file: null, previewUrl: null, originalName: '' },
    crash: { file: null, previewUrl: null, originalName: '' },
    powerup: { file: null, previewUrl: null, originalName: '' },
  });

  // Refs
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recordingType, setRecordingType] = useState<string | null>(null);

  // --- LOGIC FUNCTIONS (Kept identical to before) ---
  const handleLocalFileSelect = (file: File | Blob, type: string, fileName: string) => {
    if (file.size > 3 * 1024 * 1024) return alert("File too large! Keep under 3MB.");
    const localUrl = URL.createObjectURL(file);
    setAssets(prev => ({ ...prev, [type]: { file, previewUrl: localUrl, originalName: fileName } }));
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) handleLocalFileSelect(file, type, file.name);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (err) { alert("Camera denied."); }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 100, 100);
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            handleLocalFileSelect(blob, 'player', 'camera.png');
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

  const startRecording = async (type: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) mimeType = 'audio/webm;codecs=opus';
      else if (MediaRecorder.isTypeSupported('audio/mp4')) mimeType = 'audio/mp4';

      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType.split(';')[0] });
        const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
        handleLocalFileSelect(blob, type, `recording.${ext}`);
        stream.getTracks().forEach(track => track.stop());
        setRecordingType(null);
      };
      mediaRecorderRef.current.start();
      setRecordingType(type);
    } catch (err) { alert("Mic denied."); }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingType) mediaRecorderRef.current.stop();
  };

  const handleSave = async () => {
    if (!creatorName.trim()) { alert("Creator Name required!"); setActiveTab('profile'); return; }
    setIsSaving(true);
    setStatusMessage("Uploading Assets...");

    const uploadedUrls: Record<string, string | null> = { player: null, bgm: null, jump: null, crash: null, powerup: null };

    try {
      for (const key of Object.keys(assets)) {
        const asset = assets[key];
        if (asset.file) {
          setStatusMessage(`Uploading ${key}...`);
          const ext = asset.originalName.includes('.') ? asset.originalName.split('.').pop() : 'bin';
          const uniqueFileName = `${key}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
          const newBlob = await upload(uniqueFileName, asset.file, { access: 'public', handleUploadUrl: '/api/upload' });
          uploadedUrls[key] = newBlob.url;
        }
      }

      setStatusMessage("Saving Config...");
      const payload = {
        creator: creatorName, creator_social: socialLink,
        player_url: uploadedUrls.player, bgm_sfx: uploadedUrls.bgm,
        jump_sfx: uploadedUrls.jump, crash_sfx: uploadedUrls.crash, powerup_sfx: uploadedUrls.powerup,
        settings: { gravity, speed }
      };

      const result = await saveGameConfig(payload);
      if (result.success) alert(`SUCCESS! Game ID: ${result.gameId}`);
      else throw new Error(result.message);

    } catch (err: any) { alert("Error: " + err.message); } 
    finally { setIsSaving(false); setStatusMessage(null); }
  };

  // --- RENDER HELPERS ---
  const TabButton = ({ id, label }: { id: typeof activeTab, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex-1 py-3 text-sm md:text-base font-black uppercase border-b-4 transition-colors ${
        activeTab === id 
          ? 'border-black bg-yellow-300 text-black' 
          : 'border-transparent text-gray-500 hover:text-black hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen w-full bg-[#f0f9ff] font-mono text-black pb-32">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none" style={gridStyle} />

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto p-4 md:pt-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black mb-2 tracking-tighter">GAME MAKER</h1>
          <div className="inline-block bg-black text-white px-3 py-1 text-xs font-bold transform -rotate-2 border-2 border-white shadow-md">
            BUILD YOUR OWN CHAOS
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          
          {/* Navigation */}
          <div className="flex border-b-4 border-black overflow-x-auto no-scrollbar">
            <TabButton id="profile" label="Identity" />
            <TabButton id="visuals" label="Visuals" />
            <TabButton id="audio" label="Audio" />
            <TabButton id="physics" label="Physics" />
          </div>

          {/* Content Area */}
          <div className="p-6 min-h-[400px]">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-2">
                  <label className="block font-black text-sm uppercase bg-black text-white w-fit px-2">Creator Name *</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border-4 border-black p-3 font-bold focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                    placeholder="e.g. The Gaming Warlord"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-black text-sm uppercase text-gray-500">Social Link</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border-4 border-black p-3 font-bold focus:outline-none focus:bg-blue-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                    placeholder="twitter.com/..."
                    value={socialLink}
                    onChange={(e) => setSocialLink(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* VISUALS TAB */}
            {activeTab === 'visuals' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex flex-col items-center gap-6">
                  {/* Preview Box */}
                  <div className="relative w-40 h-40 bg-gray-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden group">
                    {assets.player.previewUrl ? (
                      <img src={assets.player.previewUrl} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-gray-400 text-xs text-center px-2">NO AVATAR</span>
                    )}
                    {/* Hidden Canvas */}
                    <canvas ref={canvasRef} width="100" height="100" className="hidden" />
                  </div>

                  {/* Controls */}
                  <div className="w-full grid grid-cols-2 gap-3">
                    <label className="flex flex-col items-center justify-center p-4 border-4 border-black bg-blue-100 hover:bg-blue-200 active:translate-y-1 transition-all cursor-pointer text-center">
                      <Icons.Upload />
                      <span className="font-black text-xs mt-2 uppercase">Upload</span>
                      <input type="file" accept="image/*" onChange={(e) => onFileInputChange(e, 'player')} className="hidden" />
                    </label>

                    <button 
                      onClick={startCamera}
                      className="flex flex-col items-center justify-center p-4 border-4 border-black bg-green-100 hover:bg-green-200 active:translate-y-1 transition-all"
                    >
                      <Icons.Camera />
                      <span className="font-black text-xs mt-2 uppercase">Camera</span>
                    </button>
                  </div>

                  {/* Camera Modal Overlay */}
                  {isCameraOpen && (
                    <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center p-4">
                      <video ref={videoRef} autoPlay className="w-full aspect-square object-cover border-4 border-white mb-4" />
                      <div className="flex gap-4">
                        <button onClick={takePhoto} className="w-16 h-16 rounded-full bg-red-500 border-4 border-white hover:scale-110 transition-transform" />
                        <button onClick={stopCamera} className="px-4 py-2 bg-white font-bold border-2 border-black">CANCEL</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AUDIO TAB */}
            {activeTab === 'audio' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                {['jump', 'crash', 'powerup', 'bgm'].map((id) => (
                  <div key={id} className="border-4 border-black p-3 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black uppercase text-sm bg-black text-white px-2 py-0.5">{id}</span>
                      {assets[id as keyof typeof assets].file && (
                        <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                          <Icons.Check /> SET
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {/* Playback Preview */}
                      {assets[id as keyof typeof assets].previewUrl && (
                        <audio controls src={assets[id as keyof typeof assets].previewUrl!} className="h-8 w-24 opacity-50 hover:opacity-100" />
                      )}
                      
                      <div className="flex-1 flex justify-end gap-2">
                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border-2 border-black p-2 flex items-center justify-center rounded-sm">
                          <Icons.Upload />
                          <input type="file" accept="audio/*" className="hidden" onChange={(e) => onFileInputChange(e, id)} />
                        </label>
                        
                        {id !== 'bgm' && (
                          <button
                            onMouseDown={() => startRecording(id)} onMouseUp={stopRecording}
                            onTouchStart={() => startRecording(id)} onTouchEnd={stopRecording}
                            className={`p-2 border-2 border-black rounded-sm transition-all ${recordingType === id ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 hover:bg-red-100'}`}
                          >
                            <Icons.Mic />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PHYSICS TAB */}
            {activeTab === 'physics' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 py-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b-2 border-black pb-1">
                    <label className="font-black text-lg">GRAVITY</label>
                    <span className="font-mono font-bold text-xl text-blue-600">{gravity}</span>
                  </div>
                  <input 
                    type="range" min="500" max="3000" step="50" 
                    value={gravity} onChange={(e) => setGravity(Number(e.target.value))} 
                    className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer border-2 border-black accent-black"
                  />
                  <p className="text-xs font-bold text-gray-400 uppercase">Lower = Moon / Higher = Jupiter</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b-2 border-black pb-1">
                    <label className="font-black text-lg">SPEED</label>
                    <span className="font-mono font-bold text-xl text-red-600">{speed}</span>
                  </div>
                  <input 
                    type="range" min="4" max="20" step="1" 
                    value={speed} onChange={(e) => setSpeed(Number(e.target.value))} 
                    className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer border-2 border-black accent-black"
                  />
                  <p className="text-xs font-bold text-gray-400 uppercase">Start slow or go fast</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Sticky Bottom Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t-4 border-black z-40 flex justify-center">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full max-w-2xl py-4 bg-[#FFD700] border-4 border-black font-black text-xl shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-0 active:shadow-[2px_2px_0px_0px_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <span className="animate-spin text-2xl">⏳</span> {statusMessage || 'SAVING...'}
            </>
          ) : (
            <>
              <Icons.Check /> SAVE & CREATE
            </>
          )}
        </button>
      </div>

    </div>
  );
};

export default GameSettings;