'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Shader code adapted from thespirit
const simplexNoiseDerivatives = `
vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

float mod289(float x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

float permute(float x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

float taylorInvSqrt(float r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec4 grad4(float j, vec4 ip) {
    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
    vec4 p,s;

    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
    s = vec4(lessThan(p, vec4(0.0)));
    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

    return p;
}

#define F4 0.309016994374947451

vec4 simplexNoiseDerivatives4(vec4 v) {
    const vec4  C = vec4( 0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);

    vec4 i  = floor(v + dot(v, vec4(F4)) );
    vec4 x0 = v -   i + dot(i, C.xxxx);

    vec4 i0;
    vec3 isX = step( x0.yzw, x0.xxx );
    vec3 isYZ = step( x0.zww, x0.yyz );
    i0.x = isX.x + isX.y + isX.z;
    i0.yzw = 1.0 - isX;
    i0.y += isYZ.x + isYZ.y;
    i0.zw += 1.0 - isYZ.xy;
    i0.z += isYZ.z;
    i0.w += 1.0 - isYZ.z;

    vec4 i3 = clamp( i0, 0.0, 1.0 );
    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

    vec4 x1 = x0 - i1 + C.xxxx;
    vec4 x2 = x0 - i2 + C.yyyy;
    vec4 x3 = x0 - i3 + C.zzzz;
    vec4 x4 = x0 + C.wwww;

    i = mod289(i);
    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
    vec4 j1 = permute( permute( permute( permute (
             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));

    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

    vec4 p0 = grad4(j0,   ip);
    vec4 p1 = grad4(j1.x, ip);
    vec4 p2 = grad4(j1.y, ip);
    vec4 p3 = grad4(j1.z, ip);
    vec4 p4 = grad4(j1.w, ip);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    p4 *= taylorInvSqrt(dot(p4,p4));

    vec3 values0 = vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2));
    vec2 values1 = vec2(dot(p3, x3), dot(p4, x4));

    vec3 m0 = max(0.5 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
    vec2 m1 = max(0.5 - vec2(dot(x3,x3), dot(x4,x4)), 0.0);

    vec3 temp0 = -6.0 * m0 * m0 * values0;
    vec2 temp1 = -6.0 * m1 * m1 * values1;

    vec3 mmm0 = m0 * m0 * m0;
    vec2 mmm1 = m1 * m1 * m1;

    float dx = temp0[0] * x0.x + temp0[1] * x1.x + temp0[2] * x2.x + temp1[0] * x3.x + temp1[1] * x4.x + mmm0[0] * p0.x + mmm0[1] * p1.x + mmm0[2] * p2.x + mmm1[0] * p3.x + mmm1[1] * p4.x;
    float dy = temp0[0] * x0.y + temp0[1] * x1.y + temp0[2] * x2.y + temp1[0] * x3.y + temp1[1] * x4.y + mmm0[0] * p0.y + mmm0[1] * p1.y + mmm0[2] * p2.y + mmm1[0] * p3.y + mmm1[1] * p4.y;
    float dz = temp0[0] * x0.z + temp0[1] * x1.z + temp0[2] * x2.z + temp1[0] * x3.z + temp1[1] * x4.z + mmm0[0] * p0.z + mmm0[1] * p1.z + mmm0[2] * p2.z + mmm1[0] * p3.z + mmm1[1] * p4.z;
    float dw = temp0[0] * x0.w + temp0[1] * x1.w + temp0[2] * x2.w + temp1[0] * x3.w + temp1[1] * x4.w + mmm0[0] * p0.w + mmm0[1] * p1.w + mmm0[2] * p2.w + mmm1[0] * p3.w + temp1[1] * p4.w;

    return vec4(dx, dy, dz, dw) * 49.0;
}

vec3 curl(vec3 p, float noiseTime, float persistence) {
    vec4 xNoisePotentialDerivatives = vec4(0.0);
    vec4 yNoisePotentialDerivatives = vec4(0.0);
    vec4 zNoisePotentialDerivatives = vec4(0.0);

    for (int i = 0; i < 3; ++i) {
        float twoPowI = pow(2.0, float(i));
        float scale = 0.5 * twoPowI * pow(persistence, float(i));

        xNoisePotentialDerivatives += simplexNoiseDerivatives4(vec4(p * twoPowI, noiseTime)) * scale;
        yNoisePotentialDerivatives += simplexNoiseDerivatives4(vec4((p + vec3(123.4, 129845.6, -1239.1)) * twoPowI, noiseTime)) * scale;
        zNoisePotentialDerivatives += simplexNoiseDerivatives4(vec4((p + vec3(-9519.0, 9051.0, -123.0)) * twoPowI, noiseTime)) * scale;
    }

    return vec3(
        zNoisePotentialDerivatives[1] - yNoisePotentialDerivatives[2],
        xNoisePotentialDerivatives[2] - zNoisePotentialDerivatives[0],
        yNoisePotentialDerivatives[0] - xNoisePotentialDerivatives[1]
    );
}
`;

const positionFragmentShader = `
precision highp float;

uniform vec2 resolution;
uniform sampler2D texturePosition;
uniform sampler2D textureDefaultPosition;
uniform float time;
uniform float speed;
uniform float dieSpeed;
uniform float radius;
uniform float curlSize;
uniform float attraction;
uniform float initAnimation;
uniform vec3 mouse3d;

${simplexNoiseDerivatives}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec4 positionInfo = texture2D( texturePosition, uv );
    vec3 position = mix(vec3(0.0, -200.0, 0.0), positionInfo.xyz, smoothstep(0.0, 0.3, initAnimation));
    float life = positionInfo.a - dieSpeed;

    vec3 followPosition = mix(vec3(0.0, -(1.0 - initAnimation) * 200.0, 0.0), mouse3d, smoothstep(0.2, 0.7, initAnimation));

    if(life < 0.0) {
        positionInfo = texture2D( textureDefaultPosition, uv );
        position = positionInfo.xyz * (1.0 + sin(time * 15.0) * 0.2 + (1.0 - initAnimation)) * 0.4 * radius;
        position += followPosition;
        life = 0.5 + fract(positionInfo.w * 21.4131 + time);
    } else {
        vec3 delta = followPosition - position;
        position += delta * (0.005 + life * 0.01) * attraction * (1.0 - smoothstep(50.0, 350.0, length(delta))) * speed;
        position += curl(position * curlSize, time, 0.1 + (1.0 - life) * 0.1) * speed;
    }

    gl_FragColor = vec4(position, life);
}
`;

const positionVertexShader = `
attribute vec3 position;

void main() {
    gl_Position = vec4( position, 1.0 );
}
`;

const particlesVertexShader = `
uniform sampler2D texturePosition;

varying float vLife;

void main() {
    vec4 positionInfo = texture2D( texturePosition, position.xy );

    vec4 worldPosition = modelMatrix * vec4( positionInfo.xyz, 1.0 );
    vec4 mvPosition = viewMatrix * worldPosition;

    vLife = positionInfo.w;
    // Increased point size for better visibility
    gl_PointSize = 2000.0 / length( mvPosition.xyz ) * smoothstep(0.0, 0.2, positionInfo.w) * 1.5;

    gl_Position = projectionMatrix * mvPosition;
}
`;

const particlesFragmentShader = `
varying float vLife;
uniform vec3 color1;
uniform vec3 color2;

void main() {
    vec3 outgoingLight = mix(color2, color1, smoothstep(0.0, 0.7, vLife));
    // Increased opacity for better visibility
    float alpha = smoothstep(0.0, 0.2, vLife) * 0.8;
    gl_FragColor = vec4( outgoingLight, alpha );
}
`;

// Settings
const TEXTURE_WIDTH = 256;
const TEXTURE_HEIGHT = 256;
const AMOUNT = TEXTURE_WIDTH * TEXTURE_HEIGHT;

interface SpiritParticlesBackgroundProps {
  speed?: number;
  dieSpeed?: number;
  radius?: number;
  curlSize?: number;
  attraction?: number;
}

export default function SpiritParticlesBackground({
  speed = 1,
  dieSpeed = 0.015,
  radius = 0.6,
  curlSize = 0.02,
  attraction = 1,
}: SpiritParticlesBackgroundProps) {
  const { gl, size } = useThree();
  const timeRef = useRef(0);
  const initAnimationRef = useRef(0);
  const mouse3dRef = useRef(new THREE.Vector3(0, 0, 0));

  // FBO setup
  const positionRenderTarget1 = useRef<any>(null);
  const positionRenderTarget2 = useRef<any>(null);
  const defaultPositionTexture = useRef<any>(null);
  const positionMaterial = useRef<any>(null);
  const copyMaterial = useRef<any>(null);
  const particlesMaterial = useRef<any>(null);
  const particlesMesh = useRef<any>(null);
  const fboScene = useRef<any>(null);
  const fboCamera = useRef<any>(null);
  const fboMesh = useRef<any>(null);
  const particlesGeometry = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check for required WebGL extensions
    const glContext = gl.getContext();
    if (!glContext.getParameter(glContext.MAX_VERTEX_TEXTURE_IMAGE_UNITS)) {
      console.warn('No support for vertex shader textures!');
      return;
    }
    if (!glContext.getExtension('OES_texture_float')) {
      console.warn('No OES_texture_float support!');
      return;
    }

    // Create FBO scene
    fboScene.current = new THREE.Scene();
    fboCamera.current = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Create default position texture
    const positions = new Float32Array(AMOUNT * 4);
    for (let i = 0; i < AMOUNT; i++) {
      const i4 = i * 4;
      const r = (0.5 + Math.random() * 0.5) * 50;
      const phi = (Math.random() - 0.5) * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      positions[i4 + 0] = r * Math.cos(theta) * Math.cos(phi);
      positions[i4 + 1] = r * Math.sin(phi);
      positions[i4 + 2] = r * Math.sin(theta) * Math.cos(phi);
      positions[i4 + 3] = Math.random();
    }
    defaultPositionTexture.current = new THREE.DataTexture(
      positions,
      TEXTURE_WIDTH,
      TEXTURE_HEIGHT,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    defaultPositionTexture.current.minFilter = THREE.NearestFilter;
    defaultPositionTexture.current.magFilter = THREE.NearestFilter;
    defaultPositionTexture.current.needsUpdate = true;
    defaultPositionTexture.current.generateMipmaps = false;
    defaultPositionTexture.current.flipY = false;

    // Create render targets
    const rtOptions = {
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      depthBuffer: false,
      stencilBuffer: false,
    };

    positionRenderTarget1.current = new THREE.WebGLRenderTarget(
      TEXTURE_WIDTH,
      TEXTURE_HEIGHT,
      rtOptions
    );
    positionRenderTarget2.current = new THREE.WebGLRenderTarget(
      TEXTURE_WIDTH,
      TEXTURE_HEIGHT,
      rtOptions
    );

    // Copy shader material
    copyMaterial.current = new THREE.RawShaderMaterial({
      uniforms: {
        resolution: { value: new THREE.Vector2(TEXTURE_WIDTH, TEXTURE_HEIGHT) },
        texture: { value: null },
      },
      vertexShader: `
        attribute vec3 position;
        attribute vec2 uv;
        varying vec2 v_uv;
        void main() {
          v_uv = uv;
          gl_Position = vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform sampler2D texture;
        varying vec2 v_uv;
        void main() {
          gl_FragColor = texture2D( texture, v_uv );
        }
      `,
    });

    // Position shader material
    positionMaterial.current = new THREE.RawShaderMaterial({
      uniforms: {
        resolution: { value: new THREE.Vector2(TEXTURE_WIDTH, TEXTURE_HEIGHT) },
        texturePosition: { value: null },
        textureDefaultPosition: { value: defaultPositionTexture.current },
        mouse3d: { value: new THREE.Vector3(0, 0, 0) },
        speed: { value: speed },
        dieSpeed: { value: dieSpeed },
        radius: { value: radius },
        curlSize: { value: curlSize },
        attraction: { value: attraction },
        time: { value: 0 },
        initAnimation: { value: 0 },
      },
      vertexShader: `
        attribute vec3 position;
        attribute vec2 uv;
        varying vec2 v_uv;
        void main() {
          v_uv = uv;
          gl_Position = vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform vec2 resolution;
        uniform sampler2D texturePosition;
        uniform sampler2D textureDefaultPosition;
        uniform float time;
        uniform float speed;
        uniform float dieSpeed;
        uniform float radius;
        uniform float curlSize;
        uniform float attraction;
        uniform float initAnimation;
        uniform vec3 mouse3d;
        varying vec2 v_uv;

        ${simplexNoiseDerivatives}

        void main() {
          vec2 uv = gl_FragCoord.xy / resolution.xy;

          vec4 positionInfo = texture2D( texturePosition, uv );
          vec3 position = mix(vec3(0.0, -200.0, 0.0), positionInfo.xyz, smoothstep(0.0, 0.3, initAnimation));
          float life = positionInfo.a - dieSpeed;

          vec3 followPosition = mix(vec3(0.0, -(1.0 - initAnimation) * 200.0, 0.0), mouse3d, smoothstep(0.2, 0.7, initAnimation));

          if(life < 0.0) {
            positionInfo = texture2D( textureDefaultPosition, uv );
            position = positionInfo.xyz * (1.0 + sin(time * 15.0) * 0.2 + (1.0 - initAnimation)) * 0.4 * radius;
            position += followPosition;
            life = 0.5 + fract(positionInfo.w * 21.4131 + time);
          } else {
            vec3 delta = followPosition - position;
            position += delta * (0.005 + life * 0.01) * attraction * (1.0 - smoothstep(50.0, 350.0, length(delta))) * speed;
            position += curl(position * curlSize, time, 0.1 + (1.0 - life) * 0.1) * speed;
          }

          gl_FragColor = vec4(position, life);
        }
      `,
      blending: THREE.NoBlending,
      transparent: false,
      depthWrite: false,
      depthTest: false,
    });

    // FBO mesh
    const fboGeometry = new THREE.PlaneGeometry(2, 2);
    fboMesh.current = new THREE.Mesh(fboGeometry, copyMaterial.current);
    fboScene.current.add(fboMesh.current);

    // Initialize render targets
    fboMesh.current.material = copyMaterial.current;
    copyMaterial.current.uniforms.texture.value = defaultPositionTexture.current;
    gl.render(fboScene.current, fboCamera.current, positionRenderTarget1.current);
    gl.render(fboScene.current, fboCamera.current, positionRenderTarget2.current);

    // Create particles geometry
    const particlePositions = new Float32Array(AMOUNT * 3);
    for (let i = 0; i < AMOUNT; i++) {
      const i3 = i * 3;
      particlePositions[i3 + 0] = (i % TEXTURE_WIDTH) / TEXTURE_WIDTH;
      particlePositions[i3 + 1] = Math.floor(i / TEXTURE_WIDTH) / TEXTURE_HEIGHT;
      particlePositions[i3 + 2] = 0;
    }

    particlesGeometry.current = new THREE.BufferGeometry();
    particlesGeometry.current.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Particles material - increased visibility
    particlesMaterial.current = new THREE.ShaderMaterial({
      uniforms: {
        texturePosition: { value: positionRenderTarget1.current.texture },
        color1: { value: new THREE.Color('#ffffff') },
        color2: { value: new THREE.Color('#888888') },
      },
      vertexShader: particlesVertexShader,
      fragmentShader: particlesFragmentShader,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });

    // Particles mesh
    particlesMesh.current = new THREE.Points(
      particlesGeometry.current,
      particlesMaterial.current
    );

    setIsInitialized(true);

    return () => {
      positionRenderTarget1.current?.dispose();
      positionRenderTarget2.current?.dispose();
      defaultPositionTexture.current?.dispose();
      particlesGeometry.current?.dispose();
      particlesMaterial.current?.dispose();
      copyMaterial.current?.dispose();
      positionMaterial.current?.dispose();
    };
  }, [gl, speed, dieSpeed, radius, curlSize, attraction]);

  useFrame((state, delta) => {
    if (
      !positionMaterial.current ||
      !copyMaterial.current ||
      !particlesMaterial.current ||
      !fboMesh.current ||
      !fboScene.current ||
      !fboCamera.current ||
      !positionRenderTarget1.current ||
      !positionRenderTarget2.current ||
      !defaultPositionTexture.current
    )
      return;

    timeRef.current += delta * 0.001;
    initAnimationRef.current = Math.min(initAnimationRef.current + delta * 0.00025, 1);

    // Update mouse3d (follow point)
    const followTime = timeRef.current * speed;
    const r = 200;
    const h = 60;
    mouse3dRef.current.set(
      Math.cos(followTime) * r,
      Math.cos(followTime * 4.0) * h,
      Math.sin(followTime * 2.0) * r
    );

    // Update position shader uniforms
    positionMaterial.current.uniforms.time.value = timeRef.current;
    positionMaterial.current.uniforms.initAnimation.value = initAnimationRef.current;
    positionMaterial.current.uniforms.mouse3d.value.copy(mouse3dRef.current);
    positionMaterial.current.uniforms.speed.value = speed;
    positionMaterial.current.uniforms.dieSpeed.value = dieSpeed;
    positionMaterial.current.uniforms.radius.value = radius;
    positionMaterial.current.uniforms.curlSize.value = curlSize;
    positionMaterial.current.uniforms.attraction.value = attraction;

    // Swap render targets
    const tmp = positionRenderTarget1.current;
    positionRenderTarget1.current = positionRenderTarget2.current;
    positionRenderTarget2.current = tmp;

    // Update position
    fboMesh.current.material = positionMaterial.current;
    positionMaterial.current.uniforms.texturePosition.value = positionRenderTarget2.current.texture;
    gl.render(fboScene.current, fboCamera.current, positionRenderTarget1.current);

    // Update particles material
    if (particlesMaterial.current) {
      particlesMaterial.current.uniforms.texturePosition.value = positionRenderTarget1.current.texture;
    }
  });

  if (!isInitialized || !particlesMesh.current) return null;

  return <primitive object={particlesMesh.current} />;
}
