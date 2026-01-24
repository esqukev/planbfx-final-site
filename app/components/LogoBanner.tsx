'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import LogoPointCloud from './LogoPointCloud';

export default function LogoBanner() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-[300px] h-[300px] -translate-x-8 md:-translate-x-12">
        <Canvas camera={{ position: [0, 0, 150], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <Suspense fallback={null}>
            <LogoPointCloud />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
