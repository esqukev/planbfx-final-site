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

    video.muted = true;
    video.play().catch(() => {
      console.warn('Autoplay blocked until user interaction');
    });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* Video layer */}
      <div className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Overlay cinematic */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/30 to-black/90" />

      {/* Content */}
      <div className="relative z-20 flex h-full items-center justify-center text-white">
        {/* aquí va tu contenido */}
      </div>

    </section>
  );
}
