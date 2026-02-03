'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TEXT = '[PLANB FX]';

/**
 * Efecto tipo convertToPath / morph: texto [PLANB FX] con animación GSAP.
 * Sin MorphSVGPlugin (Club): usa revelado por caracteres.
 * Con MorphSVG: se podría morph desde formas a paths de letras.
 */
export default function PlanBFXText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<SVGTSpanElement[]>([]);

  useEffect(() => {
    const chars = charsRef.current.filter(Boolean);
    if (chars.length === 0) return;

    gsap.set(chars, { opacity: 0, y: 12 });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
    tl.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power2.out',
    }).to(
      chars,
      {
        opacity: 0.4,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power2.in',
      },
      '+=1.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="flex justify-center my-16 md:my-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 380 56"
        className="w-full max-w-md h-14 md:h-16 text-white overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient
            id="planb-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#f8dbb9" />
            <stop offset="50%" stopColor="#fb8305" />
          </linearGradient>
        </defs>
        <text
          x="190"
          y="36"
          textAnchor="middle"
          fill="url(#planb-grad)"
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '32px',
            fontWeight: 700,
            letterSpacing: '0.2em',
          }}
        >
          {TEXT.split('').map((char, i) => (
            <tspan
              key={i}
              ref={(el) => {
                if (el) charsRef.current[i] = el;
              }}
              x={i === 0 ? undefined : 0}
              dy={i === 0 ? 0 : 0}
            >
              {char === ' ' ? '\u00A0' : char}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  );
}
