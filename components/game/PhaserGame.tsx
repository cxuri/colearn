"use client";

import React, { useState, useEffect, useRef } from 'react';
import type { Game as GameType } from 'phaser';
import { SearchParams } from 'next/dist/server/request/search-params';
import LeaderboardSidebar from './Leaderboard';
import { useSearchParams } from 'next/navigation';
// --- 1. CSS STYLES FOR SNOW ANIMATION ---
const snowStyles = `
  @keyframes snowfall {
    0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
    100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
  }
  .snowflake {
    position: absolute;
    width: 8px;
    height: 8px;
    background: white;
    border: 2px solid black;
    animation: snowfall linear infinite;
    z-index: 0;
  }
`;

// --- INTERFACES ---
interface GameConfigProps {
  config: {
    creator: string;
    creator_social: string;
    assets: {
      player?: string;
      coin?: string;
      obstacle?: string;
      bgm?: string;
      jump?: string;
      crash?: string;
      powerup?: string;
    };
    physics: {
      gravity: number;
      speed: number;
    };
  };
}

const PhaserGame: React.FC<GameConfigProps> = ({ config }) => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameInstance = useRef<GameType | null>(null);
  
  // -- REACT STATE --
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [formData, setFormData] = useState({ name: '', college: '', branch: '' });
  const [finalScore, setFinalScore] = useState({ distance: 0, coins: 0, total: 0 });

  // -- LOAD SAVED DATA --
  useEffect(() => {
    const savedData = localStorage.getItem('klaz_player_data');
    if (savedData) {
      try { setFormData(JSON.parse(savedData)); } catch (e) {}
    }
  }, []);

  // -- BRIDGE FUNCTIONS --
  const handleGameOver = (dist: number, coins: number) => {
    setFinalScore({ distance: dist, coins: coins, total: dist + (coins * 50) });
    setGameState('gameover');
  };

  const startGame = () => {
    if (!formData.name.trim()) return alert("NAME IS REQUIRED!");
    localStorage.setItem('klaz_player_data', JSON.stringify(formData));
    setGameState('playing');
  };

  const restartGame = () => {
    if (gameInstance.current) {
      const scene = gameInstance.current.scene.getScene('AltoScene');
      scene.scene.restart();
    }
    setGameState('playing');
  };

  // -- SHARE FUNCTIONS --
  const handleShare = async () => {
    const shareText = `I scored ${finalScore.total} in ${config.creator}'s Level! #KlazRunner\n\nPlay here: ${window.location.href}`;
    const shareData = { title: 'Klaz Runner Score', text: shareText, url: window.location.href };

    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err: any) {
        if (err.name !== 'AbortError') {
          navigator.clipboard.writeText(shareText);
          alert("Score copied to clipboard!");
        }
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Score copied to clipboard!");
    }
  };

  const shareGameLink = async () => {
    const text = `Check out this game by ${config.creator}! Built on Klaz.app ${window.location.href}`;
    if (navigator.share) {
       try { await navigator.share({ title: 'Klaz Runner', text: text, url: window.location.href }); } catch (err) {}
    } else {
       navigator.clipboard.writeText(window.location.href);
       alert("Game link copied!");
    }
  }

  // -- PHASER ENGINE INITIALIZATION --
  useEffect(() => {
    if (gameInstance.current) return;

    const initPhaser = async () => {
      const Phaser = (await import('phaser')).default;

      class AltoScene extends Phaser.Scene {
        private player!: Phaser.Physics.Arcade.Sprite;
        private terrainGraphics!: Phaser.GameObjects.Graphics;
        
        // Game State
        private gameSpeed = config.physics.speed; // Dynamic Speed
        private globalDistance = 0;
        private coinScore = 0;
        private isJumping = false;
        private isDead = false;
        private lastObstacleX = -1000;
        private lastJumpTime = 0;

        // Power-Up State
        private canDoubleJump = false;

        // Audio
        private bgmSound?: Phaser.Sound.BaseSound;
        private jumpSound?: Phaser.Sound.BaseSound;
        private crashSound?: Phaser.Sound.BaseSound;
        private powerupSound?: Phaser.Sound.BaseSound;

        // Physics Groups
        private coinsGroup!: Phaser.Physics.Arcade.Group;
        private obstaclesGroup!: Phaser.Physics.Arcade.Group;
        private powerupsGroup!: Phaser.Physics.Arcade.Group;

        // Visuals / HUD
        private hudText!: Phaser.GameObjects.Text;
        private djIndicator!: Phaser.GameObjects.Text;
        private jumpParticles!: Phaser.GameObjects.Particles.ParticleEmitter;

        constructor() { super('AltoScene'); }

        init() { this.registry.set('onGameOver', handleGameOver); }

        preload() {
          // --- FIX: USE CONFIG ASSETS ---
          if (config.assets.player) this.load.image('player', config.assets.player);
          if (config.assets.coin) this.load.image('coin', config.assets.coin);
          if (config.assets.obstacle) this.load.image('spike', config.assets.obstacle);

          // Audio
          if (config.assets.bgm) this.load.audio('bgm', config.assets.bgm);
          if (config.assets.jump) this.load.audio('jump', config.assets.jump);
          if (config.assets.crash) this.load.audio('crash', config.assets.crash);
          if (config.assets.powerup) this.load.audio('powerup', config.assets.powerup);

          this.load.on('complete', () => {
            // Fallback Texture Generator (if assets missing)
            const makeTexture = (key: string, color: number, lineColor: number, w: number, h: number, type: 'rect'|'circle'|'tri'|'diamond') => {
              if (this.textures.exists(key)) return;
              const g = this.make.graphics({x:0, y:0});
              g.fillStyle(color, 1);
              g.lineStyle(4, lineColor, 1);

              if (type === 'rect') { g.fillRect(0, 0, w, h); g.strokeRect(0, 0, w, h); }
              if (type === 'circle') { g.fillCircle(w/2, h/2, (w-4)/2); g.strokeCircle(w/2, h/2, (w-4)/2); }
              if (type === 'tri') { g.beginPath(); g.moveTo(0, h); g.lineTo(w/2, 0); g.lineTo(w, h); g.closePath(); g.fillPath(); g.strokePath(); }
              if (type === 'diamond') { 
                g.beginPath(); g.moveTo(w/2, 0); g.lineTo(w, h/2); g.lineTo(w/2, h); g.lineTo(0, h/2); g.closePath(); g.fillPath(); g.strokePath(); 
              }
              g.generateTexture(key, w, h);
            };
            
            makeTexture('player', 0x22c55e, 0x000000, 40, 40, 'rect'); 
            makeTexture('coin', 0xFFD700, 0x000000, 32, 32, 'circle'); 
            makeTexture('spike', 0xFF4444, 0x000000, 40, 50, 'tri');   
            makeTexture('particle', 0xFFFFFF, 0xFFFFFF, 6, 6, 'rect'); 
            makeTexture('powerup', 0x8b5cf6, 0x000000, 30, 30, 'diamond');
          });
        }

        create() {
          this.isDead = false;
          this.globalDistance = 0;
          this.coinScore = 0;
          this.gameSpeed = config.physics.speed;
          this.lastObstacleX = 0;
          this.canDoubleJump = false;
          this.lastJumpTime = 0;

          // Audio Setup
          if (this.cache.audio.exists('bgm')) {
            this.bgmSound = this.sound.add('bgm', { loop: true, volume: 0.5 });
            this.bgmSound.play();
          }
          if (this.cache.audio.exists('jump')) this.jumpSound = this.sound.add('jump');
          if (this.cache.audio.exists('crash')) this.crashSound = this.sound.add('crash');
          if (this.cache.audio.exists('powerup')) this.powerupSound = this.sound.add('powerup');

          const { width } = this.scale;

          this.add.particles(0, 0, 'particle', {
            x: { min: 0, max: width }, y: -50, lifespan: 4000, speedY: { min: 100, max: 300 }, speedX: { min: -50, max: 50 }, scale: { start: 0.5, end: 1 }, quantity: 1,
          });

          this.jumpParticles = this.add.particles(0, 0, 'particle', {
            lifespan: 300, speed: { min: 100, max: 200 }, scale: { start: 0.4, end: 0 }, blendMode: 'ADD', emitting: false
          });

          this.coinsGroup = this.physics.add.group();
          this.obstaclesGroup = this.physics.add.group();
          this.powerupsGroup = this.physics.add.group();

          this.player = this.physics.add.sprite(200, 200, 'player');
          // --- FIX: USE CONFIG GRAVITY ---
          this.player.setGravityY(config.physics.gravity);
          this.player.setCollideWorldBounds(false);
          this.player.clearTint();
          
          this.terrainGraphics = this.add.graphics();

          // --- HUD ---
          this.hudText = this.add.text(20, 20, "DIST: 0m\nCOINS: 0", {
            fontFamily: 'Courier New, monospace', 
            fontSize: '24px', 
            fontStyle: 'bold',
            color: '#000', 
            backgroundColor: '#FFF',
            padding: { x: 10, y: 10 }
          });
          this.hudText.setScrollFactor(0);

          this.djIndicator = this.add.text(width / 2, 50, "⚡ DOUBLE JUMP ACTIVE ⚡", {
            fontFamily: 'Courier New, monospace',
            fontSize: '22px',
            fontStyle: 'bold',
            color: '#FFF',
            backgroundColor: '#8b5cf6',
            padding: { x: 15, y: 8 }
          })
          .setOrigin(0.5)
          .setScrollFactor(0)
          .setVisible(false)
          .setStroke('#000', 4)
          .setShadow(4, 4, '#000000', 0, false, true);

          // Input Handling
          if (this.input.keyboard) {
            this.input.keyboard.on('keydown-SPACE', () => { this.attemptJump(); });
          }
          this.input.on('pointerdown', () => {
            this.game.canvas.focus();
            this.attemptJump();
          });
        }

        getTerrainHeight(x: number) {
          return 600 + Math.sin(x * 0.002) * 80 + Math.cos(x * 0.005) * 40;
        }

        attemptJump() {
          if (this.isDead) return;

          const now = this.time.now;
          if (now - this.lastJumpTime < 250) return;

          const playerGroundY = this.getTerrainHeight(this.globalDistance + this.player.x);
          const playerBottom = this.player.y + (this.player.height / 2);
          const isGrounded = (playerBottom >= playerGroundY - 15);

          // Fixed jump velocity of -700 works well for most gravity settings between 1000-2000
          const jumpVel = -700; 

          if (isGrounded || !this.isJumping) {
            this.player.setVelocityY(jumpVel);
            this.isJumping = true;
            this.lastJumpTime = now;
            this.jumpSound?.play();
          } else if (this.canDoubleJump) {
            this.player.setVelocityY(jumpVel);
            this.canDoubleJump = false; 
            this.player.clearTint(); 
            this.lastJumpTime = now;
            this.jumpSound?.play();

            this.jumpParticles.explode(10, this.player.x, this.player.y);
            this.tweens.add({ targets: this.player, scaleX: 1.5, scaleY: 1.5, duration: 100, yoyo: true });
          }
        }

        spawnObjects(currentX: number) {
          const spawnX = 900; 
          const worldX = this.globalDistance + 900;
          const distanceSinceLast = worldX - this.lastObstacleX;

          if (Math.random() < 0.04) { 
            const groundY = this.getTerrainHeight(worldX);

            if (distanceSinceLast > 400 && Math.random() > 0.4) {
                const spike = this.obstaclesGroup.create(spawnX, groundY - 25, 'spike');
                spike.body.allowGravity = false; 
                spike.body.setImmovable(true); 
                
                // Adjust collider based on texture type
                if(this.textures.get('spike').key === 'spike') {
                   // Generic fit
                   spike.body.setSize(20, 30); spike.body.setOffset(10, 20);
                }
                
                spike.worldX = worldX;
                this.lastObstacleX = worldX;
            } else {
                const itemHeight = groundY - (Math.random() * 200 + 60);
                if (Math.random() < 0.1) {
                    const powerup = this.powerupsGroup.create(spawnX, itemHeight, 'powerup');
                    powerup.body.allowGravity = false; powerup.worldX = worldX;
                    this.tweens.add({ targets: powerup, y: itemHeight - 20, duration: 1000, yoyo: true, repeat: -1 });
                } else {
                    const coin = this.coinsGroup.create(spawnX, itemHeight, 'coin');
                    coin.body.allowGravity = false; coin.worldX = worldX;
                }
            }
          }
        }

        update() {
          if (this.isDead) return;

          this.globalDistance += this.gameSpeed;
          this.gameSpeed += 0.002;

          const body = this.player.body as Phaser.Physics.Arcade.Body;
          if (!body) return;

          const playerGroundY = this.getTerrainHeight(this.globalDistance + this.player.x);
          const playerBottom = this.player.y + (this.player.height / 2);

          if (playerBottom >= playerGroundY - 5 && body.velocity.y >= 0) {
            this.player.y = playerGroundY - (this.player.height / 2);
            this.player.setVelocityY(0);
            this.isJumping = false; 
            
            const nextHeight = this.getTerrainHeight(this.globalDistance + this.player.x + 10);
            const angle = Math.atan2(nextHeight - playerGroundY, 10);
            this.player.setRotation(angle);
          } else {
            this.player.setRotation(this.player.rotation * 0.9);
          }

          this.terrainGraphics.clear();
          this.terrainGraphics.lineStyle(8, 0x000000, 1);
          this.terrainGraphics.fillStyle(0xFFFFFF, 1);
          this.terrainGraphics.beginPath();
          this.terrainGraphics.moveTo(0, this.getTerrainHeight(this.globalDistance));
          for (let i = 0; i <= 850; i += 20) {
            this.terrainGraphics.lineTo(i, this.getTerrainHeight(this.globalDistance + i));
          }
          this.terrainGraphics.lineTo(850, 850);
          this.terrainGraphics.lineTo(0, 850);
          this.terrainGraphics.closePath();
          this.terrainGraphics.fillPath();
          this.terrainGraphics.strokePath();

          this.spawnObjects(this.globalDistance);

          const moveObject = (obj: any) => {
            if (!obj) return;
            obj.x = obj.worldX - this.globalDistance;
            if (obj.texture.key === 'spike') {
                 const gH = this.getTerrainHeight(obj.worldX);
                 obj.y = gH - 25;
            }
            if (obj.x < -100) obj.destroy();
          };

          this.coinsGroup.children.iterate((c: any) => { moveObject(c); return true; });
          this.obstaclesGroup.children.iterate((o: any) => { moveObject(o); return true; });
          this.powerupsGroup.children.iterate((p: any) => { moveObject(p); return true; });

          this.physics.overlap(this.player, this.coinsGroup, (p, coin) => {
            coin.destroy();
            this.coinScore++;
          });

          this.physics.overlap(this.player, this.powerupsGroup, (p, powerup) => { 
              powerup.destroy(); 
              this.canDoubleJump = true; 
              this.player.setTint(0x8b5cf6); 
              this.powerupSound?.play();
              
              const txt = this.add.text(this.player.x, this.player.y - 50, "GOT POWER!", { fontSize: '20px', color: '#8b5cf6', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
              this.tweens.add({ targets: txt, y: txt.y - 50, alpha: 0, duration: 800, onComplete: () => txt.destroy() });
          });

          this.physics.overlap(this.player, this.obstaclesGroup, () => {
            this.isDead = true;
            this.physics.pause();
            this.player.setTint(0xff0000); 
            this.bgmSound?.stop();
            this.crashSound?.play();
            const onGameOver = this.registry.get('onGameOver');
            if (onGameOver) { onGameOver(Math.floor(this.globalDistance / 10), this.coinScore); }
          });

          // --- UI UPDATES ---
          const distM = Math.floor(this.globalDistance / 10);
          this.hudText.setText(`DIST: ${distM}m\nCOINS: ${this.coinScore}`);
          
          this.djIndicator.setVisible(this.canDoubleJump);
          if (this.canDoubleJump) {
             this.djIndicator.y = 50 + Math.sin(this.time.now / 150) * 3;
          }
        }
      }

      const phaserConfig: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameContainerRef.current!,
        width: 800,
        height: 800,
        backgroundColor: '#87CEEB', 
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
        physics: { default: 'arcade', arcade: { debug: false } }, 
        scene: [AltoScene],
      };

      gameInstance.current = new Phaser.Game(phaserConfig);
    };

    if (gameState !== 'start') { initPhaser(); }
    
    return () => {
        if (gameState === 'start' && gameInstance.current) {
            gameInstance.current.destroy(true);
            gameInstance.current = null;
        }
    };
  }, [gameState, config]); // Re-run if config changes

  // Add this inside your component before the return if not already present
  const searchParams = useSearchParams();
  const gameId = searchParams?.get('id') ?? '';

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: snowStyles }} />
    
    {/* MAIN PAGE WRAPPER */}
    <div className="flex flex-col items-center min-h-screen w-full bg-[#e0f2fe] font-mono relative selection:bg-yellow-400 selection:text-black py-8 overflow-y-auto scrollbar-hide">

      {/* 1. GRAPH PAPER GRID BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: `
                linear-gradient(to right, #000 1px, transparent 1px), 
                linear-gradient(to bottom, #000 1px, transparent 1px)
             `, 
             backgroundSize: '40px 40px' 
           }} 
      />

      {/* 2. BACKGROUND SNOW ANIMATION */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="snowflake"
            style={{ 
                left: `${Math.random() * 100}vw`, 
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `-${Math.random() * 5}s`
            }} 
          />
        ))}
      </div>

      {/* 3. KLAZ.APP BADGE */}
      <a 
        href="https://klaz.app" 
        target="_blank" rel="noopener noreferrer"
        className="fixed top-4 left-4 z-50 bg-black text-white border-2 sm:border-4 border-black px-2 sm:px-4 py-1 sm:py-2 font-black text-xs sm:text-xl shadow-[2px_2px_0px_0px_#ff0000] sm:shadow-[4px_4px_0px_0px_#ff0000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer no-underline rotate-[-2deg] hover:rotate-0"
      >
        KLAZ.APP ↗
      </a>

      {/* 4. JOIN KLAZ BUTTON */}
      <a 
        href="https://klaz.app/join" 
        target="_blank" rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 bg-white text-black border-2 sm:border-4 border-black px-2 sm:px-4 py-1 sm:py-2 font-black text-xs sm:text-xl shadow-[2px_2px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer no-underline rotate-[2deg] hover:rotate-0"
      >
        JOIN KLAZ →
      </a>

      {/* 5. RESPONSIVE GRID LAYOUT CONTAINER */}
      {/* Mobile: 1 Column. Desktop: 2 Columns (Game Left, Leaderboard Right) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start mt-12 lg:mt-4">

        {/* === LEFT COLUMN: GAME, CREATOR & CONTROLS === */}
        <div className="flex flex-col items-center w-full">
          
          {/* MAIN GAME CONTAINER */}
          <div className="w-full max-w-[500px] lg:max-w-[600px] aspect-square bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden relative">
            
            {/* --- START SCREEN --- */}
            {gameState === 'start' && (
              <div className="absolute inset-0 z-20 bg-[#87CEEB] flex flex-col items-center justify-center p-4 sm:p-6 text-center">
                
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 text-black drop-shadow-[3px_3px_0px_#fff] leading-none tracking-tighter">
                  KLAZ<br/>RUNNER
                </h1>
                
                {/* Form Container */}
                <div className="w-full space-y-2 sm:space-y-4 max-w-[280px] sm:max-w-sm relative z-30">
                  
                  <div className="bg-white border-2 sm:border-4 border-black p-1 sm:p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-left hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                    <label className="block text-[10px] sm:text-xs font-bold bg-black text-white w-fit px-2 py-0.5 mb-0.5">USER_ID (REQ)</label>
                    <input 
                      type="text" placeholder="YOUR NAME" 
                      value={formData.name}
                      className="w-full bg-transparent outline-none font-black uppercase text-lg sm:text-2xl placeholder:text-gray-300 text-black h-6 sm:h-8"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-white border-2 sm:border-4 border-black p-1 sm:p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-left">
                        <label className="block text-[8px] sm:text-[10px] font-bold text-gray-400">COLLEGE</label>
                        <input 
                          type="text" placeholder="NCET" 
                          value={formData.college}
                          className="w-full bg-transparent outline-none font-bold uppercase text-xs sm:text-sm text-black h-4 sm:h-auto"
                          onChange={(e) => setFormData({...formData, college: e.target.value})}
                        />
                    </div>
                    <div className="bg-white border-2 sm:border-4 border-black p-1 sm:p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-left">
                        <label className="block text-[8px] sm:text-[10px] font-bold text-gray-400">BRANCH</label>
                        <input 
                          type="text" placeholder="CSE" 
                          value={formData.branch}
                          className="w-full bg-transparent outline-none font-bold uppercase text-xs sm:text-sm text-black h-4 sm:h-auto"
                          onChange={(e) => setFormData({...formData, branch: e.target.value})}
                        />
                    </div>
                  </div>

                  <button 
                    onClick={startGame}
                    className="w-full py-2 sm:py-4 mt-1 bg-[#FFD700] border-2 sm:border-4 border-black font-black text-xl sm:text-2xl hover:bg-[#ffe135] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-wide text-black"
                  >
                    Start_Run();
                  </button>
                </div>
              </div>
            )}

            {/* --- GAME OVER SCREEN --- */}
            {gameState === 'gameover' && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-8 bg-[#FF4444] bg-opacity-95 backdrop-grayscale">
                <h2 className="text-5xl sm:text-7xl font-black text-white border-b-4 sm:border-b-8 border-black mb-4 sm:mb-6 px-2 sm:px-4 leading-tight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-black rotate-1">
                  CRASHED
                </h2>
                
                <div className="bg-white border-4 border-black p-4 sm:p-6 w-full max-w-[280px] sm:max-w-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-4 sm:mb-6 transform -rotate-1">
                  <div className="flex justify-between border-b-2 border-black border-dashed pb-1 sm:pb-2 mb-1 sm:mb-2">
                    <span className="font-bold text-gray-600 text-sm sm:text-base">DISTANCE</span>
                    <span className="font-black text-xl sm:text-2xl">{finalScore.distance}m</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-black border-dashed pb-1 sm:pb-2 mb-1 sm:mb-2">
                    <span className="font-bold text-gray-600 text-sm sm:text-base">COINS</span>
                    <span className="font-black text-xl sm:text-2xl text-yellow-600">${finalScore.coins}</span>
                  </div>
                  <div className="flex justify-between pt-1 sm:pt-2 items-end">
                    <span className="font-black text-lg sm:text-xl">TOTAL SCORE</span>
                    <span className="font-black text-3xl sm:text-4xl">{finalScore.total}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:gap-4 w-full max-w-[280px] sm:max-w-sm">
                    <button 
                      onClick={handleShare}
                      className="w-full py-3 sm:py-4 bg-black text-white border-4 border-black font-black text-lg sm:text-xl shadow-[4px_4px_0px_0px_#FFFFFF] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#FFFFFF] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                      <span className="uppercase tracking-wider">Share Score</span>
                    </button>
                    
                    <button 
                      onClick={restartGame}
                      className="w-full py-2 sm:py-3 bg-white border-4 border-black font-black text-base sm:text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-2 active:shadow-none transition-all text-black"
                    >
                      RETRY RUN
                    </button>
                </div>
              </div>
            )}

            {/* PHASER MOUNT POINT */}
            <div ref={gameContainerRef} className="flex-grow w-full bg-cyan-100" />
          </div>

          {/* CREATOR BOX */}
          <div className="w-full max-w-[500px] lg:max-w-[600px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-4 flex items-center justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest bg-yellow-50 w-fit px-1">
                LEVEL DESIGNER
              </span>
              <span className="text-xl sm:text-2xl font-black uppercase leading-none mt-1 truncate max-w-[150px] sm:max-w-xs">
                {config.creator || 'KLAZ'}
              </span>
            </div>

            <a 
              href={
                config.creator_social 
                ? (config.creator_social.startsWith('http') ? config.creator_social : `https://instagram.com/${config.creator_social}`)
                : 'https://instagram.com/klaz.app'
              }
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#FFD700] border-2 sm:border-4 border-black px-3 py-2 sm:px-4 font-black text-xs sm:text-sm uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
            >
              <span>CONNECT</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>

          {/* CONTROLS HINT */}
          <div className="bg-black text-white px-4 py-1 font-bold text-[10px] sm:text-xs inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] tracking-widest uppercase mt-4">
            [SPACE] or [TAP] to Jump
          </div>
        </div>

        {/* === RIGHT COLUMN: LEADERBOARD === */}
        {/* On Mobile: This naturally flows below because of grid-cols-1. */}
        {/* On Desktop: It goes to the second column and stays sticky. */}
        <div className="w-full h-[500px] lg:h-[600px] lg:sticky lg:top-8">
          <LeaderboardSidebar 
            gameId={gameId} 
            currentPlayerName={formData.name || undefined}
          />
        </div>

      </div>
    </div>
    </>
  );
};

export default PhaserGame;