'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    gsap.to(videoRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-black"
      style={{ height: '100vh' }}
    >
      <video
        ref={videoRef}
        className="absolute top-1/2 left-1/2 w-[110%] h-[110%] object-cover"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          zIndex: 0,
        }}
        src="/videos/plabanfisa.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onError={(e) => {
          console.error('Video error:', e);
        }}
        onLoadedData={() => {
          console.log('Video loaded successfully');
        }}
      />

      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0.9) 100%)',
          zIndex: 1,
        }}
      />
    </section>
  );
}
