'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';

type AnyThree = any;

function BackgroundScene() {
  const sphereRef = useRef<any>(null);
  const lightRef = useRef<any>(null);
  const [threeLoaded, setThreeLoaded] = useState(false);

  useEffect(() => {
    // Dynamic import to avoid Vercel issues
    const loadThree = async () => {
      // @ts-ignore
      await import('three');
      setThreeLoaded(true);
    };
    loadThree();
  }, []);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      // Auto-rotate sphere
      sphereRef.current.rotation.y += 0.01;
    }

    if (lightRef.current) {
      // Auto-move light in a circular pattern
      const time = clock.getElapsedTime();
      lightRef.current.position.x = Math.cos(time * 0.5) * 1.5;
      lightRef.current.position.z = Math.sin(time * 0.5) * 1.5;
      lightRef.current.position.y = 1.2 + Math.sin(time * 0.3) * 0.3;
    }
  });

  if (!threeLoaded) return null;

  return (
    <>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Rotating sphere */}
      <mesh ref={sphereRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#2299ff"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Auto-moving point light */}
      <pointLight
        ref={lightRef}
        color="#ff8844"
        intensity={1.2}
        distance={0}
        decay={2}
        position={[1.2, 1.2, 1.2]}
      />
    </>
  );
}

export default function InteractiveBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 1.2, 3], fov: 75 }}
        gl={{ antialias: true }}
      >
        <BackgroundScene />
      </Canvas>
    </div>
  );
}
