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
              // Add some Z variation for 3D depth effect
              const zOffset = (Math.random() - 0.5) * 0.3;
              points.push(new THREE.Vector3(p.x, -p.y, zOffset));
            });
          });
        });

        const geo = new THREE.BufferGeometry().setFromPoints(points);
        geo.center();
        
        // Scale to fit in viewport completely
        const box = new THREE.Box3().setFromBufferAttribute(geo.attributes.position);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y);
        const scale = 80 / maxDim; // Scale to fit in ~80 units
        
        geo.scale(scale, scale, scale);

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

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.rotation.x += 0.001;
    }
  });

  if (!geometry) return null;

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial 
        size={0.5} 
        color="#ffffff" 
        transparent 
        opacity={0.95} 
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}
