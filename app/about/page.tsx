'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    VANTA: any;
  }
}

const ABOUT_VIDEO_URL = 'https://res.cloudinary.com/dpplgma25/video/upload/v1769712728/PB_FX_Pilot_1_ijrog5.mp4';

function AboutContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const exitTriggeredRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const textEl = textRef.current;
    const videoWrap = videoWrapRef.current;
    if (!section || !content || !textEl || !videoWrap) return;

    const videoEl = videoWrap.querySelector('video');
    const runExit = () => {
      if (exitTriggeredRef.current) return;
      exitTriggeredRef.current = true;

      const contentWidth = content.offsetWidth;
      const textWidth = textEl.offsetWidth;
      const offsetX = (contentWidth - textWidth) / 2;

      gsap.to(videoWrap, {
        opacity: 0,
        filter: 'blur(30px)',
        x: 80,
        scale: 1.05,
        duration: 1.8,
        ease: 'power2.inOut',
      });

      gsap.to(textEl, {
        x: offsetX,
        duration: 1.6,
        ease: 'power3.inOut',
      });

      textEl.style.textAlign = 'center';
    };

    gsap.fromTo(
      videoWrap,
      {
        opacity: 0,
        filter: 'blur(20px)',
        y: 30,
        scale: 0.96,
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        scale: 1,
        duration: 1.6,
        ease: 'power3.out',
      }
    );

    ScrollTrigger.create({
      trigger: section,
      start: 'top 35%',
      onEnter: runExit,
    });

    if (videoEl) {
      videoEl.addEventListener('ended', runExit);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (videoEl) videoEl.removeEventListener('ended', runExit);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-section relative z-20 py-24 px-4 md:px-8 bg-white dark:bg-black min-h-screen"
    >
      <div
        ref={contentRef}
        className="about-content max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start"
      >
        <div
          ref={textRef}
          className="about-text flex-1 max-w-[480px] text-left"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-12 text-black dark:text-white">
            About Plan B FX
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-6">
            Plan B began as a collective of local musicians driven by the goal of energizing the scene and elevating the standards of their own events. During this process, we incorporated code-based visual development into our workflow, allowing us to expand our services and provide immersive, memorable experiences for diverse events.
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mt-6">
            We have partnered with local promoters such as 3AM, Soulful Gathering, Xtyle, and Microgarden, providing visual support for world-class artists like Adam Beyer, Donnie Cosmo, and Anfisa Letyago, alongside key local talent.
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mt-6">
            We invite you to explore our vision and become part of the Plan B family.
          </p>
        </div>

        <div
          ref={videoWrapRef}
          className="about-video flex-shrink-0 relative w-[320px] h-[560px] overflow-hidden rounded-2xl bg-black shadow-2xl"
          style={{
            filter: 'blur(0px)',
            maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 85%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 85%)',
          }}
        >
          <video
            src={ABOUT_VIDEO_URL}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted
            autoPlay
          />
        </div>
      </div>
    </section>
  );
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
      
      {/* Content Section: text left, vertical video right (appears then disappears on scroll) */}
      <AboutContent />
      
      <Footer />
    </main>
  );
}
