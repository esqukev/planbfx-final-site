'use client';

import { useEffect, useRef } from 'react';

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;
      // Skip parallax on mobile for better performance
      if (window.innerWidth < 768) return;
      const scrolled = window.scrollY;
      videoRef.current.style.transform = `translateY(${scrolled * 0.25}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        src="/videos/plabanfisa.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          PLAN B FX
        </h1>
        <p className="mt-6 max-w-xl text-lg md:text-xl opacity-90">
          Under construction — something powerful is coming.
        </p>
      </div>
    </section>
  );
}
