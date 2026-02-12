'use client';

/**
 * Animated gradient background (grays/blacks) behind the point cloud logo.
 * Soft moving blobs so the logo stays visible.
 */
export default function HeroGradientBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[140%] h-[140%] -top-[20%] -left-[20%] opacity-60 animate-mesh-blob-1"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 50% 50%, #0a0a0a 0%, #050505 40%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="absolute w-[120%] h-[120%] -top-[10%] -right-[10%] opacity-50 animate-mesh-blob-2"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 80% 20%, #0d0d0d 0%, #050505 45%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="absolute w-[130%] h-[130%] -top-[15%] left-1/2 -translate-x-1/2 opacity-45 animate-mesh-blob-3"
        style={{
          background: 'radial-gradient(ellipse 55% 55% at 50% 50%, #0a0a0a 0%, #030303 50%, transparent 75%)',
        }}
        aria-hidden
      />
      <div
        className="absolute w-[100%] h-[100%] -bottom-[10%] -left-[10%] opacity-40 animate-mesh-blob-4"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 20% 80%, #0a0a0a 0%, #050505 45%, transparent 70%)',
        }}
        aria-hidden
      />
    </div>
  );
}
