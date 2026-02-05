'use client';

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

// Archivo en public: "Property 1=Variant4.glb" → URL encoded para fetch
const GLB_URL = '/Property%201%3DVariant4.glb';

function Model() {
  const { scene } = useGLTF(GLB_URL);
  return <primitive object={scene} />;
}

export default function GLBViewer({ className = '' }: { className?: string }) {
  useEffect(() => {
    useGLTF.preload(GLB_URL);
  }, []);
  return (
    <div className={`relative w-full max-w-2xl min-h-[12rem] h-48 md:h-56 lg:h-64 my-16 md:my-20 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 2, 4]} intensity={0.8} />
        <directionalLight position={[-2, -1, 2]} intensity={0.4} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}
