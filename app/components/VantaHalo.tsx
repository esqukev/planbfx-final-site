'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

type VantaHaloProps = {
  /** Optional logo src to show centered on top of the halo (e.g. /planb-variant2.svg) */
  logoSrc?: string;
  /** Optional class for the container (min-height, etc.) */
  className?: string;
  /** Optional class for the logo wrapper (e.g. larger size) */
  logoClassName?: string;
};

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function VantaHalo({ logoSrc, className = '', logoClassName = 'w-32 h-16 sm:w-40 sm:h-20 md:w-48 md:h-24' }: VantaHaloProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    const init = async () => {
      try {
        await loadScript('/vendor/three.r134.min.js');
        if (cancelled) return;
        await loadScript('/vendor/vanta.halo.min.js');
        if (cancelled || !el) return;

        const win = window as typeof window & { THREE?: unknown; VANTA?: { HALO: (opts: Record<string, unknown>) => { destroy: () => void } } };
        if (!win.THREE || !win.VANTA?.HALO) return;

        effectRef.current = win.VANTA.HALO({
          el,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          backgroundColor: 0x000000,
          baseColor: 0x0,
          color2: 0x222222,
        });
      } catch (e) {
        console.warn('[VantaHalo] init failed', e);
      }
    };

    init();
    return () => {
      cancelled = true;
      if (effectRef.current?.destroy) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-visible bg-transparent ${className}`}
      style={{ minHeight: 200, minWidth: 200, background: 'transparent' }}
    >
      {logoSrc && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className={`relative opacity-95 ${logoClassName}`}>
            <Image
              src={logoSrc}
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
