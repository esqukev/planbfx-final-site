'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

declare global {
  interface Window {
    VANTA: any;
  }
}

export default function AboutPage() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

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

  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section with Vanta HALO effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Vanta HALO effect container */}
        <div 
          ref={vantaRef}
          className="absolute inset-0 w-full h-full z-0"
          style={{ minHeight: '100vh' }}
        />
        
        {/* Logo image centered on top */}
        <div className="relative z-20 flex items-center justify-center w-full h-full">
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
