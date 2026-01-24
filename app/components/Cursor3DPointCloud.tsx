'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

type Cursor3DPointCloudProps = {
  children: React.ReactNode;
};

export default function Cursor3DPointCloud({ children }: Cursor3DPointCloudProps) {
  const ref = useRef<any>(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime();

    // rotación base (la que ya tenías, suave)
    const baseY = t * 0.15;
    const baseX = Math.sin(t * 0.3) * 0.15;

    // intensidad del cursor (ajusta si quieres más/menos efecto)
    const intensity = 0.4;

    // mezcla rotación + cursor (parallax 3D)
    ref.current.rotation.y = baseY + mouse.x * intensity;

    ref.current.rotation.x = baseX - mouse.y * intensity;
  });

  return (
    <group ref={ref}>
      {children}
    </group>
  );
}
