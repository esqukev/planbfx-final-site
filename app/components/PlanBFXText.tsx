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
        viewBox="0 0 800 140"
        className="w-full max-w-2xl min-h-[7rem] h-28 md:h-32 lg:h-36 overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient id="planb-grad-1" x1="0" y1="140" x2="400" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f8dbb9" />
            <stop offset="0.5" stopColor="#fb8305" />
          </linearGradient>
          <linearGradient id="planb-grad-2" x1="400" y1="0" x2="800" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0.1" stopColor="#f8dbb9" />
            <stop offset="0.5" stopColor="#fb8305" />
          </linearGradient>
          {/* Letter paths: block letters legibles para P L A N B F X */}
          <path id="letter-p" d="M20 25 L20 115 L45 115 L75 85 L75 55 L45 25 Z" />
          <path id="letter-l" d="M105 25 L105 115 L145 115 L145 95 L125 95 L125 25 Z" />
          <path id="letter-a" d="M165 115 L195 25 L225 115 Z" />
          <path id="letter-n" d="M245 25 L245 115 L275 115 L335 55 L335 115 L365 115 L365 25 L335 25 L275 85 L275 25 Z" />
          <path id="letter-b" d="M385 25 L385 115 L490 115 L490 95 L415 95 L415 70 L490 70 L490 50 L415 50 L415 25 Z" />
          <path id="letter-f" d="M545 25 L545 115 L625 115 L625 95 L575 95 L575 70 L615 70 L615 50 L575 50 L575 25 Z" />
          <path id="letter-x" d="M655 25 L695 70 L735 25 L765 25 L715 70 L765 115 L735 115 L695 70 L655 115 L625 115 L675 70 L625 25 Z" />
        </defs>
        {/* Shapes: circles que morph a letras */}
        <g style={{ visibility: useMorph === false ? 'hidden' : 'visible' }}>
          <circle id="shape-p" className="morph-shape" cx="55" cy="70" r="35" fill="url(#planb-grad-1)" />
          <circle id="shape-l" className="morph-shape" cx="125" cy="70" r="35" fill="url(#planb-grad-1)" />
          <circle id="shape-a" className="morph-shape" cx="195" cy="70" r="35" fill="url(#planb-grad-1)" />
          <circle id="shape-n" className="morph-shape" cx="305" cy="70" r="35" fill="url(#planb-grad-1)" />
          <circle id="shape-b" className="morph-shape" cx="420" cy="70" r="35" fill="url(#planb-grad-1)" />
          <circle id="shape-f" className="morph-shape" cx="585" cy="70" r="35" fill="url(#planb-grad-2)" />
          <circle id="shape-x" className="morph-shape" cx="695" cy="70" r="35" fill="url(#planb-grad-2)" />
        </g>
        {/* Fallback: texto cuando no hay MorphSVGPlugin */}
        {useMorph === false && (
          <text
            x="400"
            y="85"
            textAnchor="middle"
            fill="url(#planb-grad-1)"
            style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '0.15em' }}
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
