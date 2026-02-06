'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ParallaxBannerWithImage from '../components/ParallaxBannerWithImage';
import CTAFinalBanner from '../components/CTAFinalBanner';
import ImageHero from '../components/ImageHero';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const introRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const introParaRef = useRef<HTMLParagraphElement>(null);
  const closingParaRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const intro = introRef.current;
    const closing = closingRef.current;
    const introPara = introParaRef.current;
    const closingPara = closingParaRef.current;
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
    if (introPara) {
      gsap.fromTo(
        introPara,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: introPara, start: 'top 85%' },
        }
      );
    }
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
    if (closingPara) {
      gsap.fromTo(
        closingPara,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: closingPara, start: 'top 85%' },
        }
      );
    }
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      <Navigation />

      {/* Banner hero (mismo que Services: ImageHero) */}
      <ImageHero imageSrc="/andresabout.jpg" imageAlt="About" />

      {/* 1. Intro: Who we are + About Plan B FX + first paragraph */}
      <section className="relative z-20 bg-black">
        <div className="mx-auto max-w-4xl px-8 py-16 md:py-24 lg:py-28 flex flex-col items-center text-center">
          <div ref={introRef} className="space-y-8 md:space-y-10">
            <span className="text-base uppercase tracking-[0.35em] text-white/50 block">
              Who we are
            </span>
            <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              About Plan B FX
            </h1>
            <p ref={introParaRef} className="max-w-4xl mx-auto text-xl leading-relaxed text-white/70 md:text-2xl">
              Plan B began as a collective of local musicians driven by the goal of
              energizing the scene and elevating the standards of their own events.
              During this process, we incorporated code-based visual development
              into our workflow, allowing us to expand our services and provide
              immersive, memorable experiences for diverse events.
            </p>
          </div>
        </div>
      </section>

      {/* Banner parallax WE CREATE + palabra rotando (ART / EXPERIENCE / INNOVATION / etc.) */}
      <div className="m-0 p-0">
        <ParallaxBannerWithImage
          imageSrc="/tomandres.jpg"
          rotatingTitle={{
            prefix: 'WE CREATE ',
            words: ['ART', 'EXPERIENCE', 'INNOVATION', 'TECHNOLOGY', 'INTERACTION', 'MEMORIES'],
          }}
        />
      </div>

      {/* 2. Espacio mínimo entre banners */}
      <section className="relative z-20 min-h-[10vh] w-full bg-black" aria-hidden />

      {/* 3. Closing */}
      <section className="relative z-20 bg-black">
        <div className="mx-auto max-w-4xl px-8 py-16 md:py-24 lg:py-28 flex flex-col items-center text-center">
          <div ref={closingRef} className="space-y-8 md:space-y-10 max-w-4xl mx-auto">
            <p ref={closingParaRef} className="text-xl leading-relaxed text-white/70 md:text-2xl">
              We have partnered with local promoters such as 3AM, Soulful Gathering,
              Xtyle, and Microgarden, providing visual support for world-class
              artists like Adam Beyer, Anfisa Letyago and Donnie Cosmo, alongside
              key local talent.
            </p>
          </div>
        </div>
      </section>

      {/* Banner final: foto + CUSTOM EXPERIENCES, texto y botones Get in Touch / Explore Our Art */}
      <CTAFinalBanner imageSrc="/Untitled-9582.jpg" subtitle="CUSTOM EXPERIENCES" />

      <Footer />
    </main>
  );
}
