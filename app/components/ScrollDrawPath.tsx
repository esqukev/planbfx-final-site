'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sección con SVG path que se dibuja al hacer scroll (scroll observer).
 * Equivalente al efecto: draw on scroll con stagger y sync.
 */
export default function ScrollDrawPath() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const paths = pathsRef.current.filter(Boolean);
    if (!section || paths.length === 0) return;

    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        delay: i * 0.04,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 30%',
          scrub: true,
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative z-20 min-h-[50vh] w-full bg-black flex items-center justify-center py-16 md:py-24">
      <svg
        className="w-full max-w-2xl h-auto px-4"
        viewBox="0 0 400 120"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          ref={(el) => { if (el) pathsRef.current[0] = el; }}
          d="M20 60 Q100 20 180 60 T340 60"
        />
        <path
          ref={(el) => { if (el) pathsRef.current[1] = el; }}
          d="M40 80 Q120 40 200 80 T360 80"
        />
        <path
          ref={(el) => { if (el) pathsRef.current[2] = el; }}
          d="M60 100 Q140 60 220 100 T380 100"
        />
      </svg>
    </section>
  );
}
