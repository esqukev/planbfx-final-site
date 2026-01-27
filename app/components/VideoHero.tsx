'use client';

import { useEffect, useRef } from 'react';

interface VideoHeroProps {
  videoUrl: string;
}

export default function VideoHero({ videoUrl }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <section 
      className="relative w-full overflow-hidden bg-black"
      style={{ 
        height: '100dvh',
        minHeight: '100dvh',
        maxHeight: '100dvh',
        position: 'relative',
        display: 'block'
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
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          minWidth: '100%',
          minHeight: '100%'
        }}
      />

      {/* overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/30 to-black/90" />

      {/* contenido */}
      <div 
        className="relative z-20 flex items-center justify-center text-white"
        style={{ height: '100%', minHeight: '100%' }}
      >
        {/* contenido */}
      </div>
    </section>
  );
}
