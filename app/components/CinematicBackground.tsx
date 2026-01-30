'use client';

import { useEffect, useRef } from 'react';

export default function CinematicBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | null = null;

    const init = async (): Promise<() => void> => {
      const THREE = await import('three');
      if (disposed || !mountRef.current) return () => {};

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 6;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      // ===== PARTICLE FIELD =====
      const particleCount = 3000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.01,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // ===== ADN ENERGY BANDS =====
      const makeBand = (yOffset: number) => {
        const bandGeo = new THREE.BufferGeometry();
        const count = 700;
        const pos = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
          const x = (i / count - 0.5) * 16;
          pos[i * 3 + 0] = x;
          pos[i * 3 + 1] = yOffset;
          pos[i * 3 + 2] = Math.sin(i * 0.15) * 0.4;
        }

        bandGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

        const bandMat = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 0.03,
          transparent: true,
          opacity: 0.45,
          depthWrite: false,
        });

        const band = new THREE.Points(bandGeo, bandMat);
        scene.add(band);

        return { band, bandGeo, bandMat, pos };
      };

      const band1 = makeBand(0.8);
      const band2 = makeBand(-0.8);

      // ===== RESIZE =====
      const resize = () => {
        if (!mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };

      resize();
      window.addEventListener('resize', resize);

      // ===== ANIMATE =====
      let raf = 0;
      const animate = () => {
        raf = requestAnimationFrame(animate);
        if (disposed) return;
        const t = performance.now() * 0.0005;

        particles.rotation.y += 0.0002;
        particles.rotation.x += 0.0001;

        [band1, band2].forEach((b, idx) => {
          for (let i = 0; i < b.pos.length / 3; i++) {
            b.pos[i * 3 + 2] =
              Math.sin(i * 0.12 + t * 4 + idx * 10) * 0.6;
          }
          b.band.geometry.attributes.position.needsUpdate = true;
        });

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        geometry.dispose();
        material.dispose();
        band1.bandGeo.dispose();
        band1.bandMat.dispose();
        band2.bandGeo.dispose();
        band2.bandMat.dispose();
        renderer.dispose();
        if (mountRef.current?.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    };

    init().then((fn) => {
      cleanup = fn;
      if (disposed) fn();
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
