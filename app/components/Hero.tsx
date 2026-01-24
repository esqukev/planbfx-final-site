'use client';

import LogoPointCloud from './LogoPointCloud';
import AdvancedBackground from './AdvancedBackground';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Advanced Shader Background */}
      <AdvancedBackground />

      {/* Space for brand banner or animation */}
      <div className="relative z-10 w-full h-full">
        <LogoPointCloud />
      </div>
    </section>
  );
}
