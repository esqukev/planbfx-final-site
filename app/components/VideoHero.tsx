'use client';

import { useEffect, useRef } from 'react';

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }

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
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover will-change-transform z-0"
        src="/videos/plabanfisa.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={(e) => {
          // Force play on load
          const video = e.target as HTMLVideoElement;
          video.play().catch(() => {});
        }}
      />
    </section>
  );
}
