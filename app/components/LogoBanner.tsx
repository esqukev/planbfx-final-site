'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import LogoPointCloud from './LogoPointCloud';

export default function LogoBanner() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      <div className="w-[500px] h-[500px] -translate-x-16 md:-translate-x-24">
        <Canvas 
          camera={{ position: [0, 0, 120], fov: 45 }}
          gl={{ alpha: false, antialias: true }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <directionalLight position={[-10, -10, -5]} intensity={0.8} />
          <pointLight position={[0, 0, 10]} intensity={0.6} />
          <Suspense fallback={null}>
            <LogoPointCloud />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
