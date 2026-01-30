'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AboutSplitSection from '../components/AboutSplitSection';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const HERO_VIDEO_URL = 'https://res.cloudinary.com/dpplgma25/video/upload/v1769796195/beyerrandom_lk0ov5.mp4';

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrolled = window.pageYOffset;
      const hero = heroRef.current;
      
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      hero.style.opacity = `${1 - scrolled / 800}`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section with video background and Parallax */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
        style={{ willChange: 'transform' }}
      >
        {/* Video background */}
        <div className="absolute inset-0 z-10">
          <video
            src={HERO_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedData={() => setVideoReady(true)}
          />
          <div className="absolute inset-0 bg-black/40" aria-hidden />
        </div>
        
        {/* Logo centered with fade-in */}
        <div 
          className={`relative z-20 flex items-center justify-center w-full h-full transition-all duration-1000 ease-out ${
            videoReady 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <Image
              src="/planb-logo.svg"
              alt="PlanB FX"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>
      
      {/* About split: text left, vertical video right — GSAP entrance + parallax */}
      <section className="relative z-20 bg-black">
        <AboutSplitSection />
      </section>
      
      <Footer />
    </main>
  );
}
