'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';

type AnyThree = any;

export default function SpiritParticlesBackground() {
  const pointsRef = useRef<any>(null);
  const positionsRef = useRef<Float32Array | null>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  const timeRef = useRef(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // @ts-ignore
      const THREE: AnyThree = await import('three');

      const count = 5000;
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);

      // Initialize particles in a sphere
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const radius = 50 + Math.random() * 30;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        // Random velocities
        velocities[i3] = (Math.random() - 0.5) * 0.1;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;
      }

      positionsRef.current = positions;
      velocitiesRef.current = velocities;
      setIsReady(true);
    };

    init();
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !positionsRef.current || !velocitiesRef.current || !isReady) return;

    timeRef.current += delta * 0.5;

    const positions = positionsRef.current;
    const velocities = velocitiesRef.current;
    const count = positions.length / 3;

    // Simple curl-like motion
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Simplified curl noise approximation
      const scale = 0.02;
      const t = timeRef.current;

      const curlX = Math.sin(y * scale + t) * Math.cos(z * scale);
      const curlY = Math.cos(x * scale + t) * Math.sin(z * scale);
      const curlZ = Math.sin(x * scale) * Math.cos(y * scale + t * 0.7);

      // Update velocities with curl
      velocities[i3] += (curlX - velocities[i3]) * 0.05;
      velocities[i3 + 1] += (curlY - velocities[i3 + 1]) * 0.05;
      velocities[i3 + 2] += (curlZ - velocities[i3 + 2]) * 0.05;

      // Damping
      velocities[i3] *= 0.98;
      velocities[i3 + 1] *= 0.98;
      velocities[i3 + 2] *= 0.98;

      // Update positions
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Soft boundary - bring particles back if too far
      const dist = Math.sqrt(positions[i3] * positions[i3] + positions[i3 + 1] * positions[i3 + 1] + positions[i3 + 2] * positions[i3 + 2]);
      if (dist > 100) {
        const factor = 100 / dist;
        positions[i3] *= factor;
        positions[i3 + 1] *= factor;
        positions[i3 + 2] *= factor;
      }
    }

    // Update geometry
    const geometry = (pointsRef.current as any).geometry;
    if (geometry && geometry.attributes.position) {
      geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!isReady || !positionsRef.current) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positionsRef.current.length / 3}
          array={positionsRef.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#ffffff"
        transparent
        opacity={0.3}
        blending={2} // AdditiveBlending
        depthWrite={false}
      />
    </points>
  );
}
