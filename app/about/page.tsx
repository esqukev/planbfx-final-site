'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AboutSplitSection from '../components/AboutSplitSection';
import { useRef, useEffect } from 'react';

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrolled = window.pageYOffset;
      heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroRef.current.style.opacity = `${Math.max(0, 1 - scrolled / 800)}`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navigation />

      {/* Hero con video de banner */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
        style={{ willChange: 'transform' }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/plabanfisa.mp4" type="video/mp4" />
        </video>
        {/* Fade negro arriba: mezcla con la sección anterior */}
        <div
          className="absolute top-0 left-0 right-0 h-24 md:h-32 lg:h-40 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
          }}
        />
        {/* Fade negro abajo: mezcla con la sección siguiente */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 md:h-32 lg:h-40 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
          }}
        />
      </section>
      
      {/* About split: text left, vertical video right — GSAP entrance + parallax */}
      <section className="relative z-20 bg-black">
        <AboutSplitSection />
      </section>
      
      <Footer />
    </main>
  );
}
