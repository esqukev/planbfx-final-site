'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type AnyThree = any;

function PointLogo({ url }: { url: string }) {
  const group = useRef<any>(null);
  const [geometry, setGeometry] = useState<any>(null);
  const pointsRef = useRef<any>(null);
  const pulseLayersRef = useRef<any[]>([]);
  const ringRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // Dynamic imports to avoid Vercel TS issues
        // @ts-ignore
        const THREE: AnyThree = await import('three');
        // @ts-ignore
        const { SVGLoader }: AnyThree = await import('three/examples/jsm/loaders/SVGLoader.js');

        const loader = new SVGLoader();

        loader.load(url, (data: any) => {
          if (cancelled) return;

          const points: number[] = [];

          data.paths.forEach((path: any) => {
            const shapes = SVGLoader.createShapes(path);
            shapes.forEach((shape: any) => {
              const spacedPoints = shape.getSpacedPoints(400);
              spacedPoints.forEach((p: any) => {
                points.push(p.x, p.y, (Math.random() - 0.5) * 20);
              });
            });
          });

          const geo = new THREE.BufferGeometry();
          geo.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(points, 3)
          );

          geo.center();

          // 🔑 Auto scale to fit nicely
          const box = new THREE.Box3().setFromBufferAttribute(
            geo.getAttribute('position') as any
          );
          const size = new THREE.Vector3();
          box.getSize(size);

          const maxAxis = Math.max(size.x, size.y);
          const scale = 120 / maxAxis;
          geo.scale(scale, scale, scale);

          // Create pulse layers similar to PointCloudVisual
          const positions = geo.getAttribute('position').array;
          const count = positions.length / 3;

          const makePulseLayer = (layerCount: number, cadenceMs: number) => {
            const pulseGeometry = new THREE.BufferGeometry();
            const pulsePositions = new Float32Array(layerCount * 3);
            let start = performance.now();

            const reseed = () => {
              for (let i = 0; i < layerCount; i++) {
                const idx = Math.floor(Math.random() * count);
                pulsePositions[i * 3 + 0] = positions[idx * 3 + 0];
                pulsePositions[i * 3 + 1] = positions[idx * 3 + 1];
                pulsePositions[i * 3 + 2] = positions[idx * 3 + 2];
              }
              pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
              start = performance.now();
            };

            reseed();

            const pulseMaterial = new THREE.PointsMaterial({
              color: 0xffffff,
              size: 0.02,
              transparent: true,
              opacity: 0.0,
              blending: 2, // AdditiveBlending
              depthWrite: false,
            });

            return {
              pulseGeometry,
              pulseMaterial,
              cadenceMs,
              reseed,
              getStart: () => start,
            };
          };

          const layers = [
            makePulseLayer(36, 1400),
            makePulseLayer(28, 1800),
            makePulseLayer(22, 2200),
          ];

          // Create halo ring
          const ringGeo = new THREE.RingGeometry(2.0, 2.06, 128);
          const ringMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.06,
            side: THREE.DoubleSide,
            depthWrite: false,
          });
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.rotation.x = Math.PI / 2.2;

          if (!cancelled) {
            setGeometry(geo);
            pulseLayersRef.current = layers;
            ringRef.current = ring;
          }
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('PointLogo failed to load:', e);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [url]);

  const easeInOut = (x: number) =>
    x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  useFrame(({ clock }) => {
    if (!group.current) return;

    const t = clock.getElapsedTime();

    // Slow continuous motion (always on) - horizontal only
    const baseY = t * 0.35;

    // Idle "breathing" motion (subtle) - horizontal only
    const idleY = Math.sin(t * 2.1) * 0.06;

    // Only horizontal rotation, no mouse interaction
    const targetY = baseY + idleY;

    // Smooth interpolation
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.06;

    // Update pulse layers
    const now = performance.now();
    for (const layer of pulseLayersRef.current) {
      const elapsed = now - layer.getStart();
      const phase = (elapsed % layer.cadenceMs) / layer.cadenceMs;

      if (phase < 0.02 && elapsed > 50) {
        layer.reseed();
      }

      const env = phase < 0.55 ? easeInOut(phase / 0.55) : 1 - easeInOut((phase - 0.55) / 0.45);
      layer.pulseMaterial.size = 0.018 + env * 0.045;
      layer.pulseMaterial.opacity = 0.02 + env * 0.38;
      if (group.current) {
        layer.pulseGeometry.attributes.position.needsUpdate = true;
      }
    }

    // Update ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.0006;
    }
  });

  if (!geometry) return null;

  return (
    <group ref={group}>
      {/* Main points with same style as PointCloudVisual */}
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.015}
          color="#ffffff"
          transparent
          opacity={0.55}
          blending={2}
          depthWrite={false}
        />
      </points>

      {/* Pulse layers */}
      {pulseLayersRef.current.map((layer, idx) => (
        <points key={idx} geometry={layer.pulseGeometry}>
          <primitive object={layer.pulseMaterial} attach="material" />
        </points>
      ))}

      {/* Halo ring */}
      {ringRef.current && <primitive object={ringRef.current} />}
    </group>
  );
}

export default function LogoPointCloud() {
  return (
    <div
      style={{
        width: '100%',
        height: '1000px',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 180], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1} />
        <PointLogo url="/logos/plablandinglogo.svg" />
      </Canvas>
    </div>
  );
}
