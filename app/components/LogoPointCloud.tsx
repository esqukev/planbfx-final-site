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
              // Enhanced 3D depth effect with more variation
              const zOffset = (Math.random() - 0.5) * 0.8;
              // Add slight random offset for more organic 3D feel
              const xOffset = (Math.random() - 0.5) * 0.1;
              const yOffset = (Math.random() - 0.5) * 0.1;
              points.push(new THREE.Vector3(p.x + xOffset, -p.y + yOffset, zOffset));
            });
          });
        });

        const geo = new THREE.BufferGeometry().setFromPoints(points);
        geo.center();
        
        // Scale to fit in viewport completely - larger scale for bigger logo
        const box = new THREE.Box3().setFromBufferAttribute(geo.attributes.position);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y);
        const scale = 90 / maxDim; // Scale to fit in viewport completely
        
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


  if (!geometry) return null;

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial 
        size={1.2} 
        color="#ffffff" 
        transparent 
        opacity={0.95} 
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}
