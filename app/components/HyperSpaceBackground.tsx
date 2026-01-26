'use client';

import { useEffect, useRef, useState } from 'react';

type AnyThree = any;

export default function HyperSpaceBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in animation - slow like a spaceship taking off
    const timer = setTimeout(() => {
      let startTime: number | null = null;
      const duration = 4000; // 4 seconds for slow fade in

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out for smooth fade
        const eased = 1 - Math.pow(1 - progress, 3);
        setOpacity(eased);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;
    let materialRef: any = null;

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
      const colors = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 2] = Math.random() * -2000;

        // Random colors with low saturation (~20%)
        const hue = Math.random(); // Random hue (0-1)
        const saturation = 0.2; // Low saturation (20%)
        const lightness = 0.85 + Math.random() * 0.15; // 85-100% lightness

        // Convert HSL to RGB
        const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
        const x = c * (1 - Math.abs(((hue * 6) % 2) - 1));
        const m = lightness - c / 2;

        let r = 0, g = 0, b = 0;
        const h = hue * 6;
        if (h < 1) {
          r = c; g = x; b = 0;
        } else if (h < 2) {
          r = x; g = c; b = 0;
        } else if (h < 3) {
          r = 0; g = c; b = x;
        } else if (h < 4) {
          r = 0; g = x; b = c;
        } else if (h < 5) {
          r = x; g = 0; b = c;
        } else {
          r = c; g = 0; b = x;
        }

        // Ensure values are in 0-1 range and add lightness
        colors[i * 3] = Math.max(0, Math.min(1, r + m));
        colors[i * 3 + 1] = Math.max(0, Math.min(1, g + m));
        colors[i * 3 + 2] = Math.max(0, Math.min(1, b + m));
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 1.2,
        transparent: true,
        opacity: 0, // Start at 0 for fade in
        vertexColors: true, // Enable vertex colors
        blending: 2, // AdditiveBlending for better color visibility
      });

      materialRef = material; // Store reference for opacity updates

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

        // Update material opacity with fade in (spaceship taking off effect)
        if (materialRef) {
          materialRef.opacity = 0.9 * opacity;
        }

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
  }, [opacity]); // Re-run when opacity changes

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        background: 'black',
        opacity: opacity, // Apply fade in to container
        transition: 'opacity 0.3s ease-out',
      }}
    />
  );
}
