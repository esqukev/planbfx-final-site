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
        className="cursor-tilt-figure inline-block rounded-[2rem] min-w-[min(100%,22rem)] px-11 py-10 md:px-20 md:py-14 lg:px-24 lg:py-16 [border:none] outline-none"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          border: 'none',
        }}
      >
        <div className="cursor-tilt-figure-inner" style={{ transform: 'translateZ(24px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
