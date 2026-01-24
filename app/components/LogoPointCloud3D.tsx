'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

type AnyThree = any;

/**
 * LogoPointCloud3D Component
 * 
 * Renders an SVG logo as a 3D point cloud with:
 * - Exact 700px height
 * - Complete logo visibility (fit-to-view)
 * - 3D depth in Z axis
 * - Smooth infinite rotation in X and Y only
 * - Auto-adjusting camera
 * - Responsive and stable
 */
function LogoPointCloud3DInner() {
  const pointsRef = useRef<any>(null);
  const [geometry, setGeometry] = useState<any>(null);
  const { camera } = useThree();

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // Dynamic imports to avoid Vercel TS issues
        // @ts-ignore
        const THREE: AnyThree = await import('three');
        // @ts-ignore
        const { SVGLoader }: AnyThree = await import('three/examples/jsm/loaders/SVGLoader.js');

        const res = await fetch('/logos/plablandinglogo.svg');
        const svgText = await res.text();

        const loader = new SVGLoader();
        const svg = loader.parse(svgText);

        const points: any[] = [];

        // Convert SVG shapes to 3D points with Z depth
        svg.paths.forEach((path: any) => {
          const shapes = SVGLoader.createShapes(path);
          shapes.forEach((shape: any) => {
            // Generate points from shape geometry
            shape.getSpacedPoints(1200).forEach((p: any) => {
              // Add 3D depth variation in Z axis (not flat)
              const zDepth = (Math.random() - 0.5) * 0.3;
              points.push(new THREE.Vector3(p.x, -p.y, zDepth));
            });
          });
        });

        const geo = new THREE.BufferGeometry().setFromPoints(points);
        geo.center();

        // Auto-scale to fit viewport
        const box = new THREE.Box3().setFromBufferAttribute(geo.attributes.position);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        // Scale to fit within reasonable bounds (avoid hardcoded large values)
        const targetSize = 2.5; // Reasonable 3D space size
        const scale = targetSize / maxDim;
        geo.scale(scale, scale, scale);

        // Auto-adjust camera to center and fit logo
        if (!cancelled) {
          setGeometry(geo);
          
          // Position camera to view the centered geometry
          camera.position.set(0, 0, 4);
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('LogoPointCloud3D failed to load:', e);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [camera]);

  // Smooth infinite rotation in X and Y only (not Z)
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const t = clock.getElapsedTime();
    
    // Smooth rotation: X and Y only
    pointsRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    pointsRef.current.rotation.y = t * 0.2;
    // rotation.z stays at 0 (no Z rotation)
  });

  if (!geometry) return null;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.9}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}

/**
 * LogoPointCloud3D Banner Component
 * 
 * Complete banner component with fixed 700px height
 * Canvas does not overflow container
 */
export default function LogoPointCloud3D() {
  return (
    <div className="relative w-full h-[700px] flex items-center justify-center -translate-x-8 md:-translate-x-12">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ height: '700px', width: '100%' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <LogoPointCloud3DInner />
        </Suspense>
      </Canvas>
    </div>
  );
}
