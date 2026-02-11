'use client';

import { useEffect, useRef } from 'react';

type VantaNetProps = {
  className?: string;
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

export default function VantaNet({ className = '' }: VantaNetProps) {
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
        await loadScript('/vendor/vanta.net.min.js');
        if (cancelled || !el) return;

        const win = window as typeof window & {
          THREE?: unknown;
          VANTA?: { NET: (opts: Record<string, unknown>) => { destroy: () => void } };
        };
        if (!win.THREE || !win.VANTA?.NET) return;

        effectRef.current = win.VANTA.NET({
          el,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          backgroundColor: 0x000000,
          color: 0xffffff,
          points: 6,
          maxDistance: 12,
          spacing: 22,
          showDots: false,
        });
      } catch (e) {
        console.warn('[VantaNet] init failed', e);
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
      className={`absolute inset-0 w-full h-full bg-black ${className}`}
      style={{ minHeight: 200, minWidth: 200 }}
      aria-hidden
    />
  );
}
