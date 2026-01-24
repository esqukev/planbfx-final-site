'use client';

import { Canvas } from '@react-three/fiber';
import LogoPointCloud from './LogoPointCloud';
import AnimatedShaderBackground from './AnimatedShaderBackground';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Shader Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
          <AnimatedShaderBackground />
        </Canvas>
      </div>

      {/* Space for brand banner or animation */}
      <div className="relative z-10 w-full h-full">
        <LogoPointCloud />
      </div>
    </section>
  );
}
