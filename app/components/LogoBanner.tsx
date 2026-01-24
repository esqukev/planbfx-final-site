'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import LogoPointCloud from './LogoPointCloud';

export default function LogoBanner() {
  return (
    <div className="relative h-[70vh] w-full">
      <Canvas camera={{ position: [0, 0, 120], fov: 45 }}>
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <LogoPointCloud />
        </Suspense>
      </Canvas>
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
    </div>
  );
}

