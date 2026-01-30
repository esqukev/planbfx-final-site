'use client';

import type { ReactNode } from 'react';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Glow layer */}
      <div className="absolute inset-0 rounded-2xl bg-white/5 blur-2xl pointer-events-none" />

      {/* Glass card */}
      <div
        className="
          relative
          rounded-2xl
          border border-white/15
          bg-white/10
          backdrop-blur-xl
          shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]
          overflow-hidden
        "
      >
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\' viewBox=\'0 0 120 120\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'120\' height=\'120\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
          }}
        />

        {/* Content */}
        <div className="relative p-8 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
