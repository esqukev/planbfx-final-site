'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoHeroProps {
  videoUrl: string;
}

export default function VideoHero({ videoUrl }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Establecer altura exacta del viewport
  useEffect(() => {
    const setHeight = () => {
      const height = window.innerHeight;
      setViewportHeight(height);
      if (sectionRef.current) {
        sectionRef.current.style.height = `${height}px`;
        sectionRef.current.style.minHeight = `${height}px`;
      }
    };

    setHeight();
    window.addEventListener('resize', setHeight);
    window.addEventListener('orientationchange', setHeight);

    return () => {
      window.removeEventListener('resize', setHeight);
      window.removeEventListener('orientationchange', setHeight);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Asegurar que el video esté muted para autoplay
    video.muted = true;
    video.volume = 0;

    // Función para reproducir el video
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn('Autoplay blocked until user interaction');
      }
    };

    // Handler para asegurar loop infinito
    const handleEnded = () => {
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    // Handler para cuando el video puede reproducirse
    const handleCanPlay = () => {
      playVideo();
    };

    // Agregar event listeners
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);

    // Intentar reproducir
    playVideo();

    // Cleanup
    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative overflow-hidden bg-black pointer-events-none"
      style={{ 
        width: '100%',
        height: viewportHeight > 0 ? `${viewportHeight}px` : '100vh',
        minHeight: viewportHeight > 0 ? `${viewportHeight}px` : '100vh',
        position: 'relative',
        display: 'block',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: viewportHeight > 0 ? `${viewportHeight}px` : '100vh',
          minWidth: '100%',
          minHeight: viewportHeight > 0 ? `${viewportHeight}px` : '100vh',
          objectFit: 'cover',
          objectPosition: 'center center',
          margin: 0,
          padding: 0
        }}
      />

      {/* overlay suave solo para legibilidad del texto del footer */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

      {/* Footer text - Futuristic poster style (pointer-events-none para no bloquear scroll) */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-20 px-4 md:px-8 lg:px-12 pb-6 md:pb-8 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)'
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 max-w-7xl mx-auto">
          {/* Left - INTERACTIVE ART (swapped) */}
          <div 
            className="text-white font-bold tracking-[0.3em] uppercase"
            style={{
              fontSize: 'clamp(0.65rem, 1.5vw, 0.9rem)',
              letterSpacing: '0.3em',
              opacity: 0.95,
              fontFamily: 'monospace, "Courier New", Courier, monospace'
            }}
          >
            INTERACTIVE ART
          </div>
          
          {/* Center - [PLANBFX] */}
          <div 
            className="text-white font-bold tracking-[0.3em] uppercase"
            style={{
              fontSize: 'clamp(0.65rem, 1.5vw, 0.9rem)',
              letterSpacing: '0.3em',
              opacity: 0.95,
              fontFamily: 'monospace, "Courier New", Courier, monospace'
            }}
          >
            [PLANBFX]
          </div>
          
          {/* Right - FOR YOUR SPACES (swapped) */}
          <div 
            className="text-white font-bold tracking-[0.3em] uppercase"
            style={{
              fontSize: 'clamp(0.65rem, 1.5vw, 0.9rem)',
              letterSpacing: '0.3em',
              opacity: 0.95,
              fontFamily: 'monospace, "Courier New", Courier, monospace'
            }}
          >
            FOR YOUR SPACES
          </div>
        </div>
      </div>

      <div 
        className="relative z-20 flex items-center justify-center text-white pointer-events-none"
        style={{ height: '100%', minHeight: '100%' }}
      >
        {/* contenido */}
      </div>
    </div>
  );
}
