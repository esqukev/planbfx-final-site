'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TEXT = 'PLANB FX';
const LINE_COUNT = 4;

/**
 * GSAP rolling text effect: chars rotate on X axis, inspired by SplitText rolling text.
 * Displays "PLANB FX" with multiple overlapping lines that roll infinitely.
 */
export default function PlanBFXText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.set(container, { visibility: 'visible' });

    const lines = lineRefs.current.filter(Boolean) as HTMLElement[];
    if (lines.length === 0) return;

    const chars = lines.flatMap((line) =>
      Array.from(line.querySelectorAll<HTMLElement>('.char'))
    );

    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const depth = -width / 8;
    const transformOrigin = `50% 50% ${depth}px`;

    gsap.set(lines, {
      perspective: 700,
      transformStyle: 'preserve-3d',
    });

    const animTime = 0.9;
    const tl = gsap.timeline({ repeat: -1 });

    let charIndex = 0;
    lines.forEach((line, index) => {
      const lineChars = Array.from(line.querySelectorAll<HTMLElement>('.char'));
      tl.fromTo(
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
      charIndex += lineChars.length;
    });

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center my-16 md:my-20 w-full overflow-hidden"
      style={{ visibility: 'hidden' }}
      aria-hidden
    >
      <div className="relative w-full h-[24vw] max-h-[140px] flex items-center justify-center">
        {Array.from({ length: LINE_COUNT }).map((_, i) => (
          <h1
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className="line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none m-0 text-[clamp(10vw,18vw,120px)] whitespace-nowrap text-center font-bold tracking-[-0.6vw] bg-gradient-to-b from-[#f8dbb9] to-[#fb8305] bg-clip-text text-transparent"
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
