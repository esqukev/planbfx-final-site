'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

declare global {
  interface Window {
    VANTA: any;
  }
}

export default function AboutPage() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!vantaRef.current) return;

    // Load Vanta.js from CDN
    const loadVanta = () => {
      // Check if already loaded
      if (window.VANTA && window.VANTA.HALO) {
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
        }

        vantaEffect.current = window.VANTA.HALO({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          baseColor: 0x0,
          backgroundColor: 0x0,
          amplitudeFactor: 1.5,
          xOffset: 0,
          yOffset: 0,
          size: 1.5,
        });
        setIsLoaded(true);
        return;
      }

      // Load scripts if not already loaded
      if (!document.querySelector('script[src*="three"]')) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        threeScript.onload = () => {
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js';
          vantaScript.onload = () => {
            if (vantaEffect.current) {
              vantaEffect.current.destroy();
            }

            vantaEffect.current = window.VANTA.HALO({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              baseColor: 0x0,
              backgroundColor: 0x0,
              amplitudeFactor: 1.5,
              xOffset: 0,
              yOffset: 0,
              size: 1.5,
            });
            setIsLoaded(true);
          };
          document.body.appendChild(vantaScript);
        };
        document.body.appendChild(threeScript);
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrolled = window.pageYOffset;
      const hero = heroRef.current;
      
      // Parallax effect - move slower than scroll
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      hero.style.opacity = `${1 - scrolled / 800}`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section with Vanta HALO effect and Parallax */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black"
        style={{ willChange: 'transform' }}
      >
        {/* Background effects - same as Hero */}
        <div className="absolute inset-0 opacity-20 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        {/* Vanta HALO effect container */}
        <div 
          ref={vantaRef}
          className="absolute inset-0 w-full h-full z-10"
          style={{ minHeight: '100vh' }}
        />
        
        {/* Logo image centered on top with fade-in from bottom */}
        <div 
          className={`relative z-20 flex items-center justify-center w-full h-full transition-all duration-1000 ease-out ${
            isLoaded 
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
      
      {/* Content Section */}
      <section className="relative z-20 py-24 px-4 md:px-8 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-black dark:text-white">
            About Us
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
            This is the About page. Content will be added here.
          </p>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
