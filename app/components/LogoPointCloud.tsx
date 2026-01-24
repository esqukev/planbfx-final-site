'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

type AnyThree = any;

function PointLogo({ url }: { url: string }) {
  const group = useRef<any>(null);
  const [geometry, setGeometry] = useState<any>(null);

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

          if (!cancelled) {
            setGeometry(geo);
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

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.x += delta * 0.15;
      group.current.rotation.y += delta * 0.25;
    }
  });

  if (!geometry) return null;

  return (
    <group ref={group}>
      <points geometry={geometry}>
        <pointsMaterial
          size={1.4}
          color="#ffffff"
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function LogoPointCloud() {
  return (
    <div
      style={{
        width: '100%',
        height: '700px',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 180], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1} />
        <PointLogo url="/logos/planblogolanding.svg" />
      </Canvas>
    </div>
  );
}
