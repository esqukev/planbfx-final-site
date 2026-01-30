'use client';

import LogoPointCloud from './LogoPointCloud';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black m-0 border-0 outline-none">
      <div className="relative z-10 w-full h-full min-h-screen border-0 outline-none overflow-hidden">
        <LogoPointCloud />
      </div>
    </section>
  );
}
