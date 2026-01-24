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
        // @ts-ignore
        const { BufferGeometryUtils }: AnyThree = await import('three/examples/jsm/utils/BufferGeometryUtils.js');

        const res = await fetch('/logos/plablandinglogo.svg');
        const svgText = await res.text();

        const loader = new SVGLoader();
        const svg = loader.parse(svgText);

        const extrudeSettings = {
          depth: 0.5,
          bevelEnabled: true,
          bevelThickness: 0.1,
          bevelSize: 0.1,
          bevelSegments: 3,
        };

        const geometries: any[] = [];

        svg.paths.forEach((path: any) => {
          const shapes = SVGLoader.createShapes(path);
          shapes.forEach((shape: any) => {
            const extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            geometries.push(extrudeGeometry);
          });
        });

        // Merge all geometries
        let mergedGeo: any;
        if (geometries.length > 0) {
          mergedGeo = geometries[0];
          for (let i = 1; i < geometries.length; i++) {
            mergedGeo = THREE.BufferGeometryUtils.mergeGeometries([mergedGeo, geometries[i]]);
          }
        } else {
          // Fallback to points if no shapes
          const points: any[] = [];
          svg.paths.forEach((path: any) => {
            const shapes = SVGLoader.createShapes(path);
            shapes.forEach((shape: any) => {
              shape.getSpacedPoints(1200).forEach((p: any) => {
                points.push(new THREE.Vector3(p.x, -p.y, 0));
              });
            });
          });
          mergedGeo = new THREE.BufferGeometry().setFromPoints(points);
        }

        mergedGeo.center();
        
        // Scale down by 40% (make 60% of original size)
        mergedGeo.scale(0.6, 0.6, 0.6);

        if (!cancelled) setGeometry(mergedGeo);
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
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.9}
        metalness={0.3}
        roughness={0.2}
      />
    </mesh>
  );
}
