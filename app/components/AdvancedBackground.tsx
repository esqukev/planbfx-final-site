'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

type AnyThree = any;

function BackgroundPlane() {
  const mat = useRef<any>(null);

  useFrame(({ clock }) => {
    if (mat.current && mat.current.uniforms) {
      mat.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh scale={[12, 12, 1]}>
      <planeGeometry args={[1, 1, 256, 256]} />
      <shaderMaterial
        ref={mat}
        transparent
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);

            return mix(
              mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
              mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
              u.y
            );
          }

          void main() {
            vec2 uv = vUv * 3.5;

            float n1 = noise(uv + uTime * 0.08);
            float n2 = noise(uv * 1.7 - uTime * 0.05);
            float n = mix(n1, n2, 0.5);

            float depth = smoothstep(0.2, 0.8, n);

            vec3 base = vec3(0.04, 0.05, 0.07);
            vec3 highlight = vec3(0.12, 0.15, 0.2);

            vec3 color = mix(base, highlight, depth);

            gl_FragColor = vec4(color, 0.9);
          }
        `}
      />
    </mesh>
  );
}

export default function AdvancedBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    >
      <Canvas camera={{ position: [0, 0, 2] }}>
        <BackgroundPlane />
      </Canvas>
    </div>
  );
}
