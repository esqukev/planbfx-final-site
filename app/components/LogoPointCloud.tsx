'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

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

          // Increase points significantly for much more density
          data.paths.forEach((path: any) => {
            const shapes = SVGLoader.createShapes(path);
            shapes.forEach((shape: any) => {
              const spacedPoints = shape.getSpacedPoints(5850); // 30% more points: 4500 * 1.3 = 5850
              spacedPoints.forEach((p: any) => {
                // Flip Y to fix upside-down logo; Increased Z spread for thicker logo
                points.push(p.x, -p.y, (Math.random() - 0.5) * 30);
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
              size: 0.047,
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
            makePulseLayer(50, 1200),
            makePulseLayer(40, 1600),
            makePulseLayer(30, 2000),
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

    // HORIZONTAL ROTATION ONLY (Y axis)
    // Continuous smooth rotation
    group.current.rotation.y = t * 0.3; // Direct rotation, no interpolation needed

    // Update pulse layers
    const now = performance.now();
    for (const layer of pulseLayersRef.current) {
      const elapsed = now - layer.getStart();
      const phase = (elapsed % layer.cadenceMs) / layer.cadenceMs;

      if (phase < 0.02 && elapsed > 50) {
        layer.reseed();
      }

      const env = phase < 0.55 ? easeInOut(phase / 0.55) : 1 - easeInOut((phase - 0.55) / 0.45);
      layer.pulseMaterial.size = 0.031 + env * 0.078;
      layer.pulseMaterial.opacity = 0.05 + env * 0.45;
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
      {/* Main points - MORE VISIBLE */}
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.047}
          color="#ffffff"
          transparent
          opacity={0.85}
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Smooth fade in over 3 seconds (slower)
      let startTime: number | null = null;
      const duration = 3000; // 3 seconds

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic for smooth fade
        const eased = 1 - Math.pow(1 - progress, 3);
        setOpacity(eased);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, 200); // Slightly longer delay before starting fade

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '1000px',
        overflow: 'hidden',
        opacity: opacity,
        transition: 'opacity 0.3s ease-out',
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
