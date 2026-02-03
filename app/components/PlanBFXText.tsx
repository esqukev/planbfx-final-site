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
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={1}
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
          <path id="letter-p" d="M20 20 H70 Q100 20 100 55 Q100 90 70 90 H45 V120 H20 Z M45 40 V70 H65 Q80 70 80 55 Q80 40 65 40 Z" />

        <path id="letter-l" d="M115 20 V120 H175 V100 H140 V20 Z" />

        <path id="letter-a" d="M195 120 L225 20 H255 L285 120 H260 L252 95 H228 L220 120 Z M235 75 H245 L240 50 Z" />

        <path id="letter-n" d="M305 120 V20 H335 L380 80 V20 H410 V120 H380 L335 60 V120 Z" />

        <path id="letter-b" d="M430 20 V120 H480 Q515 120 515 95 Q515 75 495 70 Q520 65 520 40 Q520 20 480 20 Z 
        M455 40 H475 Q490 40 490 55 Q490 70 475 70 H455 Z 
        M455 85 H480 Q495 85 495 100 Q495 115 480 115 H455 Z" />

       <path id="letter-f" d="M555 20 V120 H620 V100 H580 V75 H615 V55 H580 V20 Z" />

       <path id="letter-x" d="M655 20 L695 70 L735 20 H765 L715 70 L765 120 H735 L695 75 L655 120 H625 L675 70 L625 20 Z" />
        </defs>
        {/* Shapes: circles que morph a letras */}
        <g style={{ visibility: useMorph === false ? 'hidden' : 'visible' }}>
          <circle id="shape-p" className="morph-shape" cx="55" cy="70" r="35" fill="url(#planb-grad-1)" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
          <circle id="shape-l" className="morph-shape" cx="125" cy="70" r="35" fill="url(#planb-grad-1)" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
          <circle id="shape-a" className="morph-shape" cx="195" cy="70" r="35" fill="url(#planb-grad-1)" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
          <circle id="shape-n" className="morph-shape" cx="305" cy="70" r="35" fill="url(#planb-grad-1)" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
          <circle id="shape-b" className="morph-shape" cx="420" cy="70" r="35" fill="url(#planb-grad-1)" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
          <circle id="shape-f" className="morph-shape" cx="585" cy="70" r="35" fill="url(#planb-grad-2)" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
          <circle id="shape-x" className="morph-shape" cx="695" cy="70" r="35" fill="url(#planb-grad-2)" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
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
