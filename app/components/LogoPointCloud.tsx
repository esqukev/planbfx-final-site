'use client';

import { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type AnyThree = any;

export default function LogoPointCloud() {
  const ref = useRef<any>(null);
  const [geometry, setGeometry] = useState<any>(null);

  useEffect(() => {
    // Avoid static `three` imports to prevent Vercel TS type-resolution issues.
    // @ts-ignore
    import('three').then((THREE: AnyThree) => {
      // @ts-ignore
      return import('three/examples/jsm/loaders/SVGLoader.js').then(({ SVGLoader }: AnyThree) => {
        fetch('/logos/plablandinglogo.svg')
          .then(res => res.text())
          .then(svgText => {
            const loader = new SVGLoader();
            const svg = loader.parse(svgText);

            const points: any[] = [];

            svg.paths.forEach((path: any) => {
              const shapes = SVGLoader.createShapes(path);
              shapes.forEach((shape: any) => {
                shape.getSpacedPoints(1200).forEach((p: any) => {
                  points.push(new THREE.Vector3(p.x, -p.y, 0));
                });
              });
            });

            const geo = new THREE.BufferGeometry().setFromPoints(points);
            geo.center();
            setGeometry(geo);
          });
      });
    });
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
        size={0.7}
        color="#ffffff"
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}
