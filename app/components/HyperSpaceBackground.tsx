'use client';

import { useEffect, useRef } from 'react';

type AnyThree = any;

export default function HyperSpaceBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    const init = async () => {
      // @ts-ignore
      const THREE: AnyThree = await import('three');

      if (disposed) return;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      camera.position.z = 400;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mount.appendChild(renderer.domElement);

      // ⭐ STARFIELD
      const starCount = 4000;
      const positions = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 2] = Math.random() * -2000;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.2,
        transparent: true,
        opacity: 0.9,
      });

      const stars = new THREE.Points(geometry, material);
      scene.add(stars);

      // 💡 DESTELLO DE LUZ DIAGONAL
      const light = new THREE.PointLight(0xffffff, 1.5, 1500);
      light.position.set(-600, 600, 300);
      scene.add(light);

      // 🎥 ANIMACIÓN
      let raf: number;
      const animate = () => {
        if (disposed) return;
        raf = requestAnimationFrame(animate);

        const pos = stars.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < starCount; i++) {
          pos[i * 3 + 2] += 15;
          if (pos[i * 3 + 2] > 400) {
            pos[i * 3 + 2] = -2000;
          }
        }

        stars.geometry.attributes.position.needsUpdate = true;

        // Movimiento del destello diagonal
        light.position.x += 2;
        light.position.y -= 2;

        if (light.position.x > 600) {
          light.position.set(-600, 600, 300);
        }

        renderer.render(scene, camera);
      };

      animate();

      // 📐 Resize
      const onResize = () => {
        if (disposed) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', onResize);

      cleanup = () => {
        window.removeEventListener('resize', onResize);
        window.cancelAnimationFrame(raf);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    };

    init();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        background: 'black',
      }}
    />
  );
}
