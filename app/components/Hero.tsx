'use client';

import LogoPointCloud from './LogoPointCloud';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black m-0">
      <div className="relative z-10 w-full h-full">
        <LogoPointCloud />
      </div>
    </section>
  );
}
