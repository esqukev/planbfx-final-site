'use client';

/**
 * Animated gradient background (grays/blacks) behind the point cloud logo.
 * Soft moving blobs so the logo stays visible.
 */
export default function HeroGradientBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%] opacity-30 animate-mesh-blob-1"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, #1a1a1a 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="absolute w-[100%] h-[100%] top-0 right-0 opacity-25 animate-mesh-blob-2"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 80% 20%, #262626 0%, transparent 65%)',
        }}
        aria-hidden
      />
      <div
        className="absolute w-[110%] h-[110%] -top-[5%] left-1/2 -translate-x-1/2 opacity-20 animate-mesh-blob-3"
        style={{
          background: 'radial-gradient(ellipse 55% 55% at 50% 50%, #0f0f0f 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="absolute w-[80%] h-[80%] bottom-0 left-0 opacity-20 animate-mesh-blob-4"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 20% 80%, #1f1f1f 0%, transparent 65%)',
        }}
        aria-hidden
      />
    </div>
  );
}
