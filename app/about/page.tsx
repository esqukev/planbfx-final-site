'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

      {/* 1. Intro: Who we are + About Plan B FX + first paragraph — fondo blanco, más grande y mejor distribuido */}
      <section className="relative z-20 bg-white">
        <div className="mx-auto max-w-5xl px-8 py-28 md:py-36 lg:px-16 lg:py-44">
          <div ref={introRef} className="space-y-10 md:space-y-12 text-left">
            <span className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              Who we are
            </span>
            <h1 className="text-5xl font-light leading-tight text-black md:text-6xl lg:text-7xl">
              About Plan B FX
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 md:text-xl">
              Plan B began as a collective of local musicians driven by the goal of
              energizing the scene and elevating the standards of their own events.
              During this process, we incorporated code-based visual development
              into our workflow, allowing us to expand our services and provide
              immersive, memorable experiences for diverse events.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Espacio para contenido futuro — solo blanco por ahora */}
      <section className="relative z-20 min-h-[40vh] w-full bg-white" aria-hidden />

      {/* 3. Closing: mismo estilo que el primer texto */}
      <section className="relative z-20 bg-white">
        <div className="mx-auto max-w-5xl px-8 py-28 md:py-36 lg:px-16 lg:py-44">
          <div ref={closingRef} className="space-y-10 md:space-y-12 text-left">
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 md:text-xl">
              We have partnered with local promoters such as 3AM, Soulful Gathering,
              Xtyle, and Microgarden, providing visual support for world-class
              artists like Adam Beyer, Donnie Cosmo, and Anfisa Letyago, alongside
              key local talent.
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 md:text-xl">
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
