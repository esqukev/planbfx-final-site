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
    <section className="video-hero">
      <video
        ref={videoRef}
        className="video-bg"
        src="/videos/plabanfisa.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      <div className="overlay" />

      {/* Background effects - same as Hero */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <style jsx>{`
        .video-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: black;
        }

        .video-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 110%;
          height: 110%;
          object-fit: cover;
          transform: translate(-50%, -50%);
          will-change: transform;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.6) 70%,
            rgba(0, 0, 0, 0.9) 100%
          );
          z-index: 1;
        }
      `}</style>
    </section>
  );
}
