'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

type CursorTiltFigureProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees (X and Y) */
  maxTilt?: number;
  /** CSS perspective value in px */
  perspective?: number;
};

/**
 * 3D figure (e.g. soap-bar style card) that tilts with cursor using GSAP quickTo.
 * Same idea as GSAP's cursor-driven perspective tilt demo: one element with
 * perspective and rotateX/rotateY driven by mouse.
 */
export default function CursorTiltFigure({
  children,
  className = '',
  maxTilt = 32,
  perspective = 1000,
}: CursorTiltFigureProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const el = tiltRef.current;
    if (!wrap || !el) return;

    const xTo = gsap.quickTo(el, 'rotationY', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'rotationX', { duration: 0.35, ease: 'power3.out' });

    const setRotation = (clientX: number, clientY: number) => {
      const rect = wrap.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (clientX - centerX) / rect.width;
      const y = (centerY - clientY) / rect.height;
      xTo(x * maxTilt);
      yTo(y * maxTilt);
    };

    const resetRotation = () => {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const onMouseMove = (e: MouseEvent) => setRotation(e.clientX, e.clientY);
    const onMouseLeave = () => resetRotation();

    wrap.addEventListener('mousemove', onMouseMove);
    wrap.addEventListener('mouseleave', onMouseLeave);

    return () => {
      wrap.removeEventListener('mousemove', onMouseMove);
      wrap.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [maxTilt]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ perspective: `${perspective}px` }}
    >
      <div
        ref={tiltRef}
        className="cursor-tilt-figure inline-block rounded-[2.5rem] min-w-[min(100%,32rem)] px-16 py-14 md:px-28 md:py-20 lg:px-32 lg:py-24 bg-gradient-to-br from-white/20 to-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-[box-shadow,background] duration-500 ease-out [border:none] outline-none hover:from-white/40 hover:to-white/15 hover:shadow-[0_0_90px_-12px_rgba(255,255,255,0.35),0_30px_60px_-20px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.15)]"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          border: 'none',
        }}
      >
        <div className="cursor-tilt-figure-inner transition-[filter] duration-500" style={{ transform: 'translateZ(24px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
