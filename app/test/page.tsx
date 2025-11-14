"use client";

// This is a minimal component to test video playback.
export default function VideoTestPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#111',
      color: 'white',
      fontFamily: 'sans-serif',
      textAlign: 'center',
    }}>
      <h1>Simple Video Test</h1>
      <p>Playing <strong>/promo.mp4</strong></p>
      
      {/* A simple video element.
        - autoPlay: Tries to play immediately.
        - loop: Restarts the video when it ends.
        - muted: Required for autoplay in most modern browsers.
        - playsInline: Prevents fullscreen on iOS.
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/promo.mp4"
        style={{
          width: '80%',
          maxWidth: '800px',
          border: '2px solid #555',
          backgroundColor: '#000',
        }}
      >
        {/* Fallback source element */}
        <source src="/promo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}