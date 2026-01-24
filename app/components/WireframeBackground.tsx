'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

type AnyThree = any;

function WireGrid() {
  const mesh = useRef<any>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    const t = clock.elapsedTime;
    const geo = mesh.current.geometry;
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      const wave =
        Math.sin(x * 0.3 + t * 0.8) *
        Math.cos(y * 0.3 + t * 0.6);

      pos.setZ(i, wave * 0.6);
    }

    pos.needsUpdate = true;
  });

  return (
    <mesh
      ref={mesh}
      rotation={[-Math.PI / 2.2, 0, 0]}
      position={[0, -2, -10]}
    >
      <planeGeometry args={[20, 20, 80, 80]} />
      <meshBasicMaterial
        wireframe
        color="#2f3b52"
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

export default function WireframeBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    >
      <Canvas camera={{ position: [0, 6, 10], fov: 45 }}>
        <fog attach="fog" args={['#05070a', 8, 20]} />
        <WireGrid />
      </Canvas>
    </div>
  );
}
