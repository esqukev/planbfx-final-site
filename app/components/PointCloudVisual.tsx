'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type PointCloudVisualProps = {
  className?: string;
};

export default function PointCloudVisual({ className = '' }: PointCloudVisualProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const count = 900;
    const positions = new Float32Array(count * 3);

    // Random points on/near a sphere for a subtle “cloud”
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 1.6 + Math.random() * 0.9;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.015,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Subtle halo ring
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
    scene.add(ring);

    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX = (x - 0.5) * 0.35;
      mouseY = (y - 0.5) * 0.35;
    };

    mount.addEventListener('pointermove', onPointerMove, { passive: true });

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    const animate = () => {
      raf = window.requestAnimationFrame(animate);

      // Slow continuous motion
      points.rotation.y += 0.0014;
      points.rotation.x += 0.0007;

      // Light interaction
      points.rotation.y += (mouseX - points.rotation.y) * 0.02;
      points.rotation.x += (mouseY - points.rotation.x) * 0.02;

      ring.rotation.z += 0.0006;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      mount.removeEventListener('pointermove', onPointerMove);
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative h-[280px] w-full md:h-[340px] ${className}`}
      aria-hidden="true"
    />
  );
}

