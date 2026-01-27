'use client';

import LogoPointCloud from './LogoPointCloud';
import { Canvas } from '@react-three/fiber';
import SpiritParticlesBackground from './SpiritParticlesBackground';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Spirit Particles Background - Behind logo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas 
          camera={{ position: [0, 0, 1000], fov: 45 }} 
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <SpiritParticlesBackground 
            speed={1}
            dieSpeed={0.015}
            radius={0.6}
            curlSize={0.02}
            attraction={1}
          />
        </Canvas>
      </div>

      {/* Space for brand banner or animation - In front */}
      <div className="relative z-10 w-full h-full">
        <LogoPointCloud />
      </div>
    </section>
  );
}
