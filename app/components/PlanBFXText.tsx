'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TEXT = 'PLANB FX';
const LINE_COUNT = 4;

/**
 * GSAP rolling text effect: chars rotate on X axis (rolling text / tube effect).
 * Displays "PLANB FX" with multiple overlapping lines that roll infinitely.
 */
export default function PlanBFXText() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let tl: gsap.core.Timeline | null = null;

    const runAnimation = () => {
      const lines = container.querySelectorAll<HTMLElement>('.rolling-line');
      if (lines.length === 0) return;

      gsap.set(container, { visibility: 'visible' });

      const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const depth = -width / 8;
      const transformOrigin = `50% 50% ${depth}px`;

      gsap.set(lines, {
        perspective: 700,
        transformStyle: 'preserve-3d',
      });

      const animTime = 0.9;
      tl = gsap.timeline({ repeat: -1 });

      lines.forEach((line, index) => {
        const lineChars = line.querySelectorAll<HTMLElement>('.char');
        if (lineChars.length === 0) return;
        tl!.fromTo(
          lineChars,
          { rotationX: -90 },
          {
            rotationX: 90,
            stagger: 0.08,
            duration: animTime,
            ease: 'none',
            transformOrigin,
          },
          index * 0.45
        );
      });
    };

    const id = requestAnimationFrame(runAnimation);

    return () => {
      cancelAnimationFrame(id);
      tl?.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center my-12 sm:my-16 md:my-20 w-full overflow-hidden min-h-[80px] sm:min-h-[100px]"
      style={{ visibility: 'hidden' }}
      aria-hidden
    >
      <div className="relative w-full h-[20vw] sm:h-[24vw] max-h-[120px] sm:max-h-[140px] flex items-center justify-center">
        {Array.from({ length: LINE_COUNT }).map((_, i) => (
          <h1
            key={i}
            className="rolling-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none m-0 whitespace-nowrap text-center font-bold tracking-[-0.6vw] select-none"
            style={{
              fontSize: 'clamp(2rem, 12vw, 120px)',
              color: '#fb8305',
              WebkitTextStroke: '1px rgba(251, 131, 5, 0.5)',
            }}
          >
            {TEXT.split('').map((char, j) => (
              <span
                key={j}
                className="char inline-block"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        ))}
      </div>
    </div>
  );
}
