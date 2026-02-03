'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LETTER_IDS = ['p', 'l', 'a', 'n', 'b', 'f', 'x'] as const;
const FALLBACK_TEXT = '[PLANB FX]';

/**
 * MorphSVG convertToPath: formas que morph a letras PLANB FX.
 * Requiere MorphSVGPlugin (GSAP Club): añadir script en layout.
 * Si el plugin no está, usa fallback de revelado por caracteres.
 */
export default function PlanBFXText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const fallbackCharsRef = useRef<SVGTSpanElement[]>([]);
  const [useMorph, setUseMorph] = useState<boolean | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const MorphSVGPlugin = typeof window !== 'undefined' ? (window as unknown as { MorphSVGPlugin?: { convertToPath: (sel: string | Element | NodeList) => void } }).MorphSVGPlugin : undefined;

    if (MorphSVGPlugin) {
      try {
        (gsap as unknown as { registerPlugin: (p: unknown) => void }).registerPlugin(MorphSVGPlugin);
        MorphSVGPlugin.convertToPath('.morph-shape');
        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.5,
          delay: 0.5,
          yoyo: true,
          defaults: { ease: 'power2.inOut' },
        });
        LETTER_IDS.forEach((id) => {
          tl.to(`#shape-${id}`, { morphSVG: `#letter-${id}`, duration: 1 }, 0);
        });
        setUseMorph(true);
        return () => {
          tl.kill();
        };
      } catch {
        setUseMorph(false);
      }
    } else {
      setUseMorph(false);
    }
  }, []);

  useEffect(() => {
    if (useMorph !== false) return;
    const chars = fallbackCharsRef.current.filter(Boolean);
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
      { opacity: 0.4, duration: 0.8, stagger: 0.04, ease: 'power2.in' },
      '+=1.2'
    );
    return () => {
      tl.kill();
    };
  }, [useMorph]);

  return (
    <div ref={containerRef} className="flex justify-center my-16 md:my-20">
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 560 100"
        className="w-full max-w-xl h-20 md:h-24 overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient id="planb-grad-1" x1="0" y1="100" x2="280" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f8dbb9" />
            <stop offset="0.5" stopColor="#fb8305" />
          </linearGradient>
          <linearGradient id="planb-grad-2" x1="280" y1="0" x2="560" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0.1" stopColor="#f8dbb9" />
            <stop offset="0.5" stopColor="#fb8305" />
          </linearGradient>
          {/* Letter paths (targets for morph) */}
          <path id="letter-p" d="M20 20 L55 20 L55 38 L35 38 L35 55 L20 55 Z" />
          <path id="letter-l" d="M75 20 L95 20 L95 55 L75 55 Z" />
          <path id="letter-a" d="M105 20 L135 20 L120 55 Z" />
          <path id="letter-n" d="M145 20 L145 55 L165 55 L185 20 L185 55 L165 55 L145 20 Z" />
          <path id="letter-b" d="M195 20 L225 20 L225 37 L215 37 L215 55 L195 55 Z" />
          <path id="letter-f" d="M345 20 L375 20 L375 35 L355 35 L355 55 L345 55 Z" />
          <path id="letter-x" d="M365 20 L385 37 L405 20 L405 55 L385 37 L365 55 Z" />
        </defs>
        {/* Shapes: circles that MorphSVG converts to path and morphs to letters; ocultos si fallback */}
        <g style={{ visibility: useMorph === false ? 'hidden' : 'visible' }}>
          <circle id="shape-p" className="morph-shape" cx="37" cy="37" r="20" fill="url(#planb-grad-1)" />
          <circle id="shape-l" className="morph-shape" cx="85" cy="37" r="20" fill="url(#planb-grad-1)" />
          <circle id="shape-a" className="morph-shape" cx="120" cy="37" r="20" fill="url(#planb-grad-1)" />
          <circle id="shape-n" className="morph-shape" cx="165" cy="37" r="20" fill="url(#planb-grad-1)" />
          <circle id="shape-b" className="morph-shape" cx="210" cy="37" r="20" fill="url(#planb-grad-1)" />
          <circle id="shape-f" className="morph-shape" cx="355" cy="37" r="20" fill="url(#planb-grad-2)" />
          <circle id="shape-x" className="morph-shape" cx="385" cy="37" r="20" fill="url(#planb-grad-2)" />
        </g>
        {/* Fallback: texto cuando no hay MorphSVGPlugin */}
        {useMorph === false && (
          <text
            x="280"
            y="55"
            textAnchor="middle"
            fill="url(#planb-grad-1)"
            style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '0.15em' }}
          >
            {FALLBACK_TEXT.split('').map((char, i) => (
              <tspan
                key={i}
                ref={(el) => {
                  if (el) fallbackCharsRef.current[i] = el;
                }}
                x={i === 0 ? undefined : 0}
                dy={i === 0 ? 0 : 0}
              >
                {char === ' ' ? '\u00A0' : char}
              </tspan>
            ))}
          </text>
        )}
      </svg>
    </div>
  );
}
