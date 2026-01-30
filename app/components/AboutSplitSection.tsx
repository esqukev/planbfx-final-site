'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSplitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textEl,
        { opacity: 0, y: 32, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto min-h-screen max-w-4xl px-6 py-24 md:py-32 lg:px-12"
    >
      <div ref={textRef} className="about-text relative z-10 space-y-8 text-left">
        <span className="text-xs uppercase tracking-[0.35em] text-white/50">
          Who we are
        </span>

        <h1 className="text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
          About Plan B FX
        </h1>

        <div className="space-y-6 text-base leading-relaxed text-white/70 md:text-lg">
          <p>
            Plan B began as a collective of local musicians driven by the goal of
            energizing the scene and elevating the standards of their own events.
            During this process, we incorporated code-based visual development
            into our workflow, allowing us to expand our services and provide
            immersive, memorable experiences for diverse events.
          </p>
          <p>
            We have partnered with local promoters such as 3AM, Soulful Gathering,
            Xtyle, and Microgarden, providing visual support for world-class
            artists like Adam Beyer, Donnie Cosmo, and Anfisa Letyago, alongside
            key local talent.
          </p>
          <p>
            We invite you to explore our vision and become part of the Plan B
            family.
          </p>
        </div>
      </div>
    </section>
  );
}
