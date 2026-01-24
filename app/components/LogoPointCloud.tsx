'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

type AnyThree = any;

export default function LogoPointCloud() {
  const ref = useRef<any>(null);
  const [geometry, setGeometry] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // Avoid static `three` imports to prevent Vercel TS type-resolution issues.
        // @ts-ignore
        const THREE: AnyThree = await import('three');
        // @ts-ignore
        const { SVGLoader }: AnyThree = await import('three/examples/jsm/loaders/SVGLoader.js');

        const res = await fetch('/logos/plablandinglogo.svg');
        const svgText = await res.text();

        const loader = new SVGLoader();
        const svg = loader.parse(svgText);

        const points: any[] = [];

        svg.paths.forEach((path: any) => {
          const shapes = SVGLoader.createShapes(path);
          shapes.forEach((shape: any) => {
            shape.getSpacedPoints(1200).forEach((p: any) => {
              // Add 3D depth effect with extrude-like variation
              const zOffset = (Math.random() - 0.5) * 0.5;
              points.push(new THREE.Vector3(p.x, -p.y, zOffset));
            });
          });
        });

        const geo = new THREE.BufferGeometry().setFromPoints(points);
        geo.center();
        
        // Scale down by 40% (make 60% of original size)
        geo.scale(0.6, 0.6, 0.6);

        if (!cancelled) setGeometry(geo);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('LogoPointCloud failed to load:', e);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);


  if (!geometry) return null;

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.7}
        color="#ffffff"
        transparent
        opacity={0.9}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}
