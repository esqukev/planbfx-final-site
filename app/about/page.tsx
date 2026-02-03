'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const HERO_VIDEO_URL = 'https://res.cloudinary.com/dpplgma25/video/upload/v1769796195/beyerrandom_lk0ov5.mp4';

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!videoReady || !logoWrapRef.current) return;
    const wrap = logoWrapRef.current;
    gsap.set(wrap, { opacity: 0 });
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(wrap, { opacity: 1, duration: 1.8, ease: 'power2.inOut' })
      .to({}, { duration: 3.5 })
      .to(wrap, { opacity: 0, duration: 1.8, ease: 'power2.inOut' });
    return () => { tl.kill(); };
  }, [videoReady]);

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

  useEffect(() => {
    const intro = introRef.current;
    const closing = closingRef.current;
    if (!intro) return;
    gsap.fromTo(
      intro,
      { opacity: 0, y: 32, filter: 'blur(12px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: intro, start: 'top 78%' },
      }
    );
    if (closing) {
      gsap.fromTo(
        closing,
        { opacity: 0, y: 28, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: closing, start: 'top 82%' },
        }
      );
    }
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main className="relative min-h-screen bg-black">
      <Navigation />

      {/* Video hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
        style={{ willChange: 'transform' }}
      >
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
        <div
          ref={logoWrapRef}
          className="relative z-20 flex items-center justify-center w-full h-full pointer-events-none"
          style={{ opacity: 0 }}
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

      {/* 1. Intro: Who we are + About Plan B FX + first paragraph — textos más grandes */}
      <section className="relative z-20 bg-black">
        <div className="mx-auto max-w-4xl px-8 py-28 md:py-36 lg:py-44 flex flex-col items-center text-center">
          <div ref={introRef} className="space-y-10 md:space-y-12">
            <span className="text-base uppercase tracking-[0.35em] text-white/50 block">
              Who we are
            </span>
            <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              About Plan B FX
            </h1>
            <p className="max-w-4xl mx-auto text-xl leading-relaxed text-white/70 md:text-2xl">
              Plan B began as a collective of local musicians driven by the goal of
              energizing the scene and elevating the standards of their own events.
              During this process, we incorporated code-based visual development
              into our workflow, allowing us to expand our services and provide
              immersive, memorable experiences for diverse events.
            </p>
            {/* Logo Plan B arrastrable (Property 1 = Variant3) */}
            <div className="flex justify-center pt-16 md:pt-20">
              <motion.div
                drag
                dragConstraints={{ left: -120, right: 120, top: -80, bottom: 80 }}
                dragElastic={0.1}
                className="relative w-40 h-40 md:w-52 md:h-52 cursor-grab active:cursor-grabbing touch-none select-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src="/logos/planb-variant3.svg"
                  alt="Plan B FX"
                  fill
                  className="object-contain pointer-events-none"
                  draggable={false}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Espacio para contenido futuro — fondo negro */}
      <section className="relative z-20 min-h-[40vh] w-full bg-black" aria-hidden />

      {/* 3. Closing: mismos tamaños que el intro */}
      <section className="relative z-20 bg-black">
        <div className="mx-auto max-w-4xl px-8 py-28 md:py-36 lg:py-44 flex flex-col items-center text-center">
          <div ref={closingRef} className="space-y-10 md:space-y-12 max-w-4xl mx-auto">
            <p className="text-xl leading-relaxed text-white/70 md:text-2xl">
              We have partnered with local promoters such as 3AM, Soulful Gathering,
              Xtyle, and Microgarden, providing visual support for world-class
              artists like Adam Beyer, Donnie Cosmo, and Anfisa Letyago, alongside
              key local talent.
            </p>
            <p className="text-xl leading-relaxed text-white/70 md:text-2xl">
              We invite you to explore our vision and become part of the Plan B
              family.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
