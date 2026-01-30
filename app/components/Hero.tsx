'use client';

import LogoPointCloud from './LogoPointCloud';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black m-0">
      {/* The Spirit — efecto completo como fondo (iframe) */}
      <iframe
        src="/spirit/"
        title="Spirit background"
        className="absolute inset-0 w-full h-full border-0 pointer-events-none z-0"
        style={{ minHeight: '100vh' }}
      />

      {/* Logo point cloud encima */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        <LogoPointCloud />
      </div>
    </section>
  );
}
