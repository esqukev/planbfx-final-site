'use client';

import { useRef, useEffect } from 'react';

interface VideoHeroProps {
  videoUrl: string;
}

export default function VideoHero({ videoUrl }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = 0;

    video.play().catch(() => {});
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* VIDEO */}
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

      {/* FADE SUPERIOR (sutil) */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-32 z-10
        bg-gradient-to-b from-black/70 via-black/30 to-transparent"
      />

      {/* FADE INFERIOR – ESTE ES EL IMPORTANTE */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full z-10"
        style={{
          height: '35vh',
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0) 0%,
              rgba(0,0,0,0.15) 25%,
              rgba(0,0,0,0.35) 45%,
              rgba(0,0,0,0.65) 70%,
              rgba(0,0,0,0.9) 100%
            )
          `,
        }}
      />

      {/* CONTENIDO HERO */}
      <div className="relative z-20 flex h-full items-center justify-center text-white">
        {/* contenido opcional */}
      </div>
    </section>
  );
}
