'use client';

import { useEffect, useRef } from 'react';

type VideoHeroWithScrollProps = {
  videoUrl: string;
};

/**
 * Banner con video y mismo efecto que ImageHero: fade out al hacer scroll.
 */
export default function VideoHeroWithScroll({ videoUrl }: VideoHeroWithScrollProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrolled = window.pageYOffset;
      const hero = heroRef.current;
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      hero.style.opacity = `${Math.max(0, 1 - scrolled / 800)}`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black"
      style={{ willChange: 'transform' }}
    >
      <div className="absolute inset-0 z-10">
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
      </div>
    </section>
  );
}
