"use client";

import React, { useState, useRef } from 'react';
import { upload } from '@vercel/blob/client'; 
import { saveGameConfig } from '@/app/actions';
import { 
  Camera, Upload, Mic, Check, User, Eye, Music, Zap, X, 
  Share2, Play, RefreshCw, Copy 
} from 'lucide-react';

const gridStyle = {
  backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
  backgroundSize: '40px 40px'
};

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
  
  // SUCCESS STATE
  const [gameResult, setGameResult] = useState<{ id: string, url: string } | null>(null);

  // Data
  const [creatorName, setCreatorName] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [gravity, setGravity] = useState(1600);
  const [speed, setSpeed] = useState(6);

  // Asset State
  const initialAssets = {
    player: { file: null, previewUrl: null, originalName: '' },
    bgm: { file: null, previewUrl: null, originalName: '' },
    jump: { file: null, previewUrl: null, originalName: '' },
    crash: { file: null, previewUrl: null, originalName: '' },
    powerup: { file: null, previewUrl: null, originalName: '' },
  };
  const [assets, setAssets] = useState<{ [key: string]: GameAsset }>(initialAssets);

  // Refs
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recordingType, setRecordingType] = useState<string | null>(null);

  // -- LOGIC --
  const resetForm = () => {
    setCreatorName('');
    setSocialLink('');
    setAssets(initialAssets);
    setGravity(1600);
    setSpeed(6);
    setActiveTab('profile');
  };

  const handleCreateNew = () => {
    setGameResult(null);
    resetForm();
  };

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
    } catch (err) { alert("Camera permission denied."); }
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

  const handleShare = async () => {
    if (!gameResult) return;
    const shareData = {
      title: 'Play my Custom Game!',
      text: `Check out this game created by ${creatorName || 'a friend'}!`,
      url: gameResult.url,
    };

    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.log('Share closed'); }
    } else {
      navigator.clipboard.writeText(gameResult.url);
      alert('Link copied to clipboard!');
    }
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
      
      if (result.success) {
        // --- UPDATED URL STRUCTURE HERE ---
        // Uses current origin + /play?id=ID
        const gameUrl = `${window.location.origin}/play?id=${result.gameId}`;
        
        setGameResult({
          id: result.gameId,
          url: gameUrl
        });
        
        resetForm();
      }
      else throw new Error(result.message);

    } catch (err: any) { alert("Error: " + err.message); } 
    finally { setIsSaving(false); setStatusMessage(null); }
  };

  // --- TAB BUTTON ---
  const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: React.ElementType }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`
        flex flex-col items-center justify-center py-4 px-2
        transition-all duration-200 border-b-4 md:border-b-0 md:border-r-4
        ${activeTab === id 
          ? 'bg-black text-yellow-400 border-yellow-400' 
          : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
        }
      `}
    >
      <div className="mb-1"><Icon strokeWidth={2.5} size={20} /></div>
      <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen w-full bg-[#f0f9ff] font-mono text-black pb-32">
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none" style={gridStyle} />

      <div className="relative z-10 max-w-3xl mx-auto p-4 md:p-8">
        
        {/* HEADER */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tighter">GAME MAKER</h1>
          <p className="font-bold text-xs md:text-sm uppercase tracking-widest text-gray-500">
            Build • Record • Play
          </p>
        </div>

        {/* --- SUCCESS CARD --- */}
        {gameResult ? (
           <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center text-center">
             <div className="w-20 h-20 bg-[#FFD700] rounded-full border-4 border-black flex items-center justify-center mb-6">
               <Check size={40} strokeWidth={3} />
             </div>
             
             <h2 className="text-3xl font-black uppercase mb-2">Game Ready!</h2>
             <p className="text-gray-500 font-bold text-sm mb-8">Your custom level has been published.</p>

             {/* QR Code Container */}
             <div className="bg-white p-4 border-4 border-black mb-8 shadow-[4px_4px_0px_0px_rgba(200,200,200,1)]">
               <img 
                 src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(gameResult.url)}`} 
                 alt="Game QR Code" 
                 className="w-40 h-40"
               />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
               <a 
                 href={gameResult.url} 
                 target="_blank"
                 rel="noreferrer"
                 className="flex items-center justify-center gap-2 py-4 bg-black text-white font-black uppercase tracking-wider hover:bg-gray-800 transition-colors border-4 border-black"
               >
                 <Play size={18} fill="currentColor" /> Play Now
               </a>
               
               <button 
                 onClick={handleShare}
                 className="flex items-center justify-center gap-2 py-4 bg-[#f0f9ff] text-black font-black uppercase tracking-wider hover:bg-blue-50 transition-colors border-4 border-black"
               >
                 <Share2 size={18} strokeWidth={2.5} /> Share
               </button>
             </div>

             <button 
               onClick={handleCreateNew}
               className="mt-8 text-gray-400 font-bold text-xs uppercase flex items-center gap-2 hover:text-black transition-colors"
             >
               <RefreshCw size={14} /> Create Another Game
             </button>
           </div>
        ) : (
          /* --- MAIN FORM CARD --- */
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            
            {/* GRID TABS */}
            <div className="grid grid-cols-4 md:grid-cols-1 md:w-24 border-b-4 md:border-b-0 md:border-r-4 border-black">
              <TabButton id="profile" label="Profile" icon={User} />
              <TabButton id="visuals" label="Visuals" icon={Eye} />
              <TabButton id="audio" label="Audio" icon={Music} />
              <TabButton id="physics" label="Physics" icon={Zap} />
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 p-6 md:p-8 bg-white">
              
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                  <div className="space-y-2">
                    <label className="block font-black text-sm uppercase">Creator Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border-4 border-black p-3 font-bold text-lg focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-300"
                      placeholder="ENTER NAME"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-black text-sm uppercase">Social Link</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border-4 border-black p-3 font-bold text-lg focus:outline-none focus:bg-blue-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-300"
                      placeholder="TWITTER / INSTA"
                      value={socialLink}
                      onChange={(e) => setSocialLink(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* VISUALS TAB */}
              {activeTab === 'visuals' && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center">
                  <div className="relative w-48 h-48 bg-gray-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden">
                    {assets.player.previewUrl ? (
                      <img src={assets.player.previewUrl} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-gray-400">
                        <Eye size={40} className="mx-auto mb-2 opacity-50" />
                        <span className="block text-[10px] font-bold">NO AVATAR</span>
                      </div>
                    )}
                    <canvas ref={canvasRef} width="100" height="100" className="hidden" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                    <label className="flex flex-col items-center justify-center p-4 border-4 border-black bg-blue-50 hover:bg-blue-200 active:translate-y-1 transition-all cursor-pointer rounded-none">
                      <Upload strokeWidth={2.5} />
                      <span className="font-black text-xs mt-2 uppercase">Upload</span>
                      <input type="file" accept="image/*" onChange={(e) => onFileInputChange(e, 'player')} className="hidden" />
                    </label>

                    <button 
                      onClick={startCamera}
                      className="flex flex-col items-center justify-center p-4 border-4 border-black bg-green-50 hover:bg-green-200 active:translate-y-1 transition-all"
                    >
                      <Camera strokeWidth={2.5} />
                      <span className="font-black text-xs mt-2 uppercase">Camera</span>
                    </button>
                  </div>

                  {isCameraOpen && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
                      <video ref={videoRef} autoPlay className="w-full max-w-sm aspect-square object-cover border-4 border-white mb-6" />
                      <div className="flex gap-6">
                        <button onClick={stopCamera} className="w-16 h-16 rounded-full bg-gray-600 border-4 border-white flex items-center justify-center text-white"><X size={32} /></button>
                        <button onClick={takePhoto} className="w-20 h-20 rounded-full bg-red-600 border-8 border-white shadow-lg active:scale-95 transition-transform" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* AUDIO TAB */}
              {activeTab === 'audio' && (
                <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                  {['jump', 'crash', 'powerup', 'bgm'].map((id) => (
                    <div key={id} className="border-4 border-black p-3 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-10 ${assets[id as keyof typeof assets].file ? 'bg-green-500' : 'bg-gray-200'}`} />
                        <div>
                          <div className="font-black uppercase text-sm">{id}</div>
                          {assets[id as keyof typeof assets].file && <div className="text-[10px] font-bold text-green-600">READY</div>}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <label className="w-10 h-10 flex items-center justify-center border-2 border-black bg-gray-100 hover:bg-white cursor-pointer active:scale-95">
                          <Upload size={18} strokeWidth={2.5} />
                          <input type="file" accept="audio/*" className="hidden" onChange={(e) => onFileInputChange(e, id)} />
                        </label>
                        
                        {id !== 'bgm' && (
                          <button
                            onMouseDown={() => startRecording(id)} onMouseUp={stopRecording}
                            onTouchStart={() => startRecording(id)} onTouchEnd={stopRecording}
                            className={`w-10 h-10 flex items-center justify-center border-2 border-black active:scale-95 transition-all ${recordingType === id ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 hover:bg-white'}`}
                          >
                            <Mic size={18} strokeWidth={2.5} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* PHYSICS TAB */}
              {activeTab === 'physics' && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200 py-4">
                  {[
                    { label: 'Gravity', value: gravity, min: 500, max: 3000, step: 50, set: setGravity, color: 'text-blue-600', note: 'Low = Moon / High = Jupiter' },
                    { label: 'Speed', value: speed, min: 4, max: 20, step: 1, set: setSpeed, color: 'text-red-600', note: 'Scrolling Velocity' }
                  ].map((item) => (
                    <div key={item.label} className="space-y-4">
                      <div className="flex justify-between items-end border-b-4 border-black pb-2">
                        <label className="font-black text-2xl uppercase tracking-tighter">{item.label}</label>
                        <span className={`font-mono font-bold text-2xl ${item.color}`}>{item.value}</span>
                      </div>
                      <input 
                        type="range" min={item.min} max={item.max} step={item.step} 
                        value={item.value} onChange={(e) => item.set(Number(e.target.value))} 
                        className="w-full h-6 bg-gray-200 appearance-none cursor-pointer border-4 border-black accent-black hover:bg-gray-300"
                      />
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.note}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* STICKY SAVE BAR - HIDE WHEN SUCCESS SCREEN IS ACTIVE */}
      {!gameResult && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t-4 border-black z-40 flex justify-center">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full max-w-md py-4 bg-[#FFD700] border-4 border-black font-black text-xl shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-wider"
          >
            {isSaving ? (
              <span className="animate-pulse">Saving...</span>
            ) : (
              <>
                <Check strokeWidth={3} /> Save Config
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
};

export default GameSettings;