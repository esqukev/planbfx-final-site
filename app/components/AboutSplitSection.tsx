'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_VIDEO_URL =
  'https://res.cloudinary.com/dpplgma25/video/upload/v1769712728/PB_FX_Pilot_1_ijrog5.mp4';

export default function AboutSplitSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // TEXT IN
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 40,
          filter: 'blur(14px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // VIDEO DEPTH + ZOOM
      gsap.fromTo(
        videoRef.current,
        {
          scale: 0.92,
          rotateY: -6,
          opacity: 0,
        },
        {
          scale: 1,
          rotateY: 0,
          opacity: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // PARALLAX SCROLL
      gsap.to(videoRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-20 px-6 py-32 lg:flex-row lg:items-center"
    >
      {/* TEXT */}
      <div
        ref={textRef}
        className="relative z-10 max-w-xl space-y-6 text-left"
      >
        <span className="text-xs tracking-[0.35em] text-white/40">
          WHO WE ARE
        </span>

        <h2 className="text-4xl font-light leading-tight text-white md:text-5xl">
          About Plan B FX
        </h2>

        <p className="text-base leading-relaxed text-white/60">
          Plan B began as a collective of local musicians driven by the goal of
          energizing the scene and elevating the standards of their own events.
          During this process, we incorporated code-based visual development
          into our workflow, allowing us to expand our services and provide
          immersive, memorable experiences for diverse events.
        </p>

        <p className="text-base leading-relaxed text-white/60">
          We have partnered with local promoters such as 3AM, Soulful
          Gathering, Xtyle, and Microgarden, providing visual support for
          world-class artists like Adam Beyer, Donnie Cosmo, and Anfisa
          Letyago, alongside key local talent.
        </p>

        <p className="text-base leading-relaxed text-white/60">
          We invite you to explore our vision and become part of the Plan B
          family.
        </p>
      </div>

      {/* VIDEO — parent has perspective so rotateY looks 3D */}
      <div className="shrink-0" style={{ perspective: 1200 }}>
        <div
          ref={videoRef}
          className="relative h-[560px] w-[320px] overflow-hidden rounded-[32px] shadow-2xl"
        >
        <video
          src={ABOUT_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />

        {/* LIGHT SWEEP */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-full top-0 h-full w-[60%] rotate-6 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ animation: 'sweep 6s linear infinite' }}
          />
        </div>

        {/* DEPTH GLOW */}
        <div className="pointer-events-none absolute inset-0 rounded-[32px] shadow-[0_0_160px_rgba(255,255,255,0.08)]" />
        </div>
      </div>
    </section>
  );
}
