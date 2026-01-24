'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import LogoPointCloud from './LogoPointCloud';
import Cursor3DPointCloud from './Cursor3DPointCloud';

export default function LogoBanner() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-[700px] h-[700px] -translate-x-8 md:-translate-x-12">
        <Canvas camera={{ position: [0, 0, 150], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <directionalLight position={[-10, -10, -5]} intensity={0.8} />
          <pointLight position={[0, 0, 10]} intensity={0.6} />
          <Suspense fallback={null}>
            <Cursor3DPointCloud>
              <LogoPointCloud />
            </Cursor3DPointCloud>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
