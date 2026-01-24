'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

type PointCloud3DWrapperProps = {
  children: React.ReactNode;
};

export default function PointCloud3DWrapper({ children }: PointCloud3DWrapperProps) {
  const groupRef = useRef<any>(null);
  const { mouse, viewport } = useThree();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();

    // -----------------------------
    // 1️⃣ ESCALA FIJA (≈ 700px alto)
    // -----------------------------
    // viewport.height es el alto visible en unidades 3D
    // 0.65 ≈ 700px visuales en la mayoría de hero banners
    const scale = viewport.height * 0.65;
    groupRef.current.scale.set(scale, scale, scale);

    // -----------------------------
    // 2️⃣ ROTACIÓN BASE (suave)
    // -----------------------------
    const baseY = t * 0.15;
    const baseX = Math.sin(t * 0.3) * 0.12;

    // -----------------------------
    // 3️⃣ ROTACIÓN POR CURSOR (LIMITADA)
    // -----------------------------
    const maxRotation = 0.22; // CLAVE: evita que se salga
    const cursorY = mouse.x * maxRotation;
    const cursorX = -mouse.y * maxRotation;

    // -----------------------------
    // 4️⃣ APLICACIÓN FINAL
    // -----------------------------
    groupRef.current.rotation.y = baseY + cursorY;
    groupRef.current.rotation.x = baseX + cursorX;
  });

  return <group ref={groupRef}>{children}</group>;
}
