'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import LogoPointCloud from './LogoPointCloud';

export default function LogoBanner() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-[400px] h-[400px]">
        <Canvas camera={{ position: [0, 0, 120], fov: 45 }}>
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <LogoPointCloud />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

