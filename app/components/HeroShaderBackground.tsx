'use client';

import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0., 1.);
}
`;

// Adapted from warp/FBM concept - neutral colors (black, gray, white)
const FRAGMENT_SHADER = `#version 300 es
precision highp float;

out vec4 out_color;

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1., 0.));
  float c = hash(i + vec2(0., 1.));
  float d = hash(i + vec2(1., 1.));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float f = 1.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p * f);
    f *= 2.0;
    a *= 0.5;
  }
  return v;
}

vec2 rot(vec2 v, float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a)) * v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 st = uv * vec2(u_resolution.x / u_resolution.y, 1.0);
  st = st - 0.5;

  vec2 rotatedUV = rot(st, 3.14159 * 0.25);
  float len = length(st);
  vec2 warpedUV = (st + 0.25) * len * rotatedUV * 2.0;

  float n = fbm(warpedUV + vec2(0., u_time * 0.15));
  vec2 warpedUV2 = warpedUV + warpedUV * n * 0.1;
  float n2 = fbm(warpedUV2 * 2.0 + vec2(u_time * 0.1, 0.));

  float t = n2 * 0.5 + n * 0.5 + 0.5;
  t = fract(t + u_time * 0.05);

  vec3 col;
  if (t < 0.33) {
    col = mix(vec3(0., 0., 0.), vec3(0.25, 0.25, 0.25), t * 3.0);
  } else if (t < 0.66) {
    col = mix(vec3(0.25, 0.25, 0.25), vec3(0.7, 0.7, 0.7), (t - 0.33) * 3.0);
  } else {
    col = mix(vec3(0.7, 0.7, 0.7), vec3(1., 1., 1.), (t - 0.66) * 3.0);
  }

  out_color = vec4(col, 1.0);
}
`;

export default function HeroShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERTEX_SHADER);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAGMENT_SHADER);
    gl.compileShader(fs);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const rect = canvas!.getBoundingClientRect();
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    let rafId: number;
    const render = (time: number) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolutionLoc, canvas!.width, canvas!.height);
      gl.uniform1f(timeLoc, time * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />;
}
