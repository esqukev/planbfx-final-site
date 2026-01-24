'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export function useCursor3DEffect() {
  const ref = useRef<any>(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime();

    // rotación base (la que ya tenías)
    const baseRotationY = t * 0.15;
    const baseRotationX = Math.sin(t * 0.3) * 0.12;

    // límites MUY IMPORTANTES (evitan que se salga del container)
    const maxRotation = 0.25; // radianes (~14°)

    const cursorY = Math.max(
      -maxRotation,
      Math.min(maxRotation, mouse.x * 0.35)
    );

    const cursorX = Math.max(
      -maxRotation,
      Math.min(maxRotation, -mouse.y * 0.35)
    );

    // aplicación final (sin escalar, sin mover posición)
    ref.current.rotation.y = baseRotationY + cursorY;
    ref.current.rotation.x = baseRotationX + cursorX;
  });

  return ref;
}
