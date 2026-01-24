'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type AnyThree = any;

function ShaderPlane() {
  const meshRef = useRef<any>(null);

  const vertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;
    
    // Noise function
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    // Smooth noise
    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }
    
    // Fractal Brownian Motion
    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for (int i = 0; i < 4; i++) {
        value += amplitude * smoothNoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      
      return value;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Animated noise with slow movement
      vec2 p = uv * 3.0;
      p += vec2(uTime * 0.05, uTime * 0.03);
      
      // Create layered noise for depth
      float n1 = fbm(p);
      float n2 = fbm(p * 1.5 + vec2(uTime * 0.02));
      float n3 = fbm(p * 0.5 - vec2(uTime * 0.01));
      
      // Combine noise layers
      float combined = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2);
      
      // Create subtle gradient
      float gradient = length(uv - 0.5) * 0.3;
      
      // Dark neutral palette
      vec3 color1 = vec3(0.05, 0.05, 0.08); // Very dark blue-gray
      vec3 color2 = vec3(0.08, 0.08, 0.12); // Slightly lighter
      vec3 color3 = vec3(0.12, 0.12, 0.15); // Subtle highlight
      
      // Mix colors based on noise
      vec3 color = mix(color1, color2, combined);
      color = mix(color, color3, combined * 0.3);
      
      // Add subtle gradient
      color = mix(color, color1, gradient);
      
      // Very subtle pulsing
      float pulse = sin(uTime * 0.3) * 0.02 + 1.0;
      color *= pulse;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useFrame(({ clock }) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material;
      if (material && material.uniforms && material.uniforms.uTime) {
        material.uniforms.uTime.value = clock.getElapsedTime();
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -50]}>
      <planeGeometry args={[200, 200]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: [window.innerWidth, window.innerHeight] },
        }}
      />
    </mesh>
  );
}

export default function AnimatedShaderBackground() {
  return <ShaderPlane />;
}
