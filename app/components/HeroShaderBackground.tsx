'use client';

import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0., 1.);
}
`;

// Adapted from shift3/PixelSort concept - simple UV + horizontal banding
// Dark palette so white logo stands out
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

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 st = uv * vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 _uv = st - 0.5;

  // Horizontal banding (PixelSort horizontal direction + rectInner feel)
  float bandY = floor(st.y * 35.0 + u_time * 2.0) * 0.0286;
  float bandX = floor(st.x * 25.0) * 0.04;
  float n = noise(vec2(bandX, bandY) * 10.0);
  float n2 = noise(_uv * 4.0 + vec2(u_time * 0.5, 0.));

  float t = n * 0.6 + n2 * 0.4;
  t = fract(t + bandY);

  // Dark palette only (black, dark grays) so white logo stands out
  vec3 col = mix(
    vec3(0.0, 0.0, 0.0),
    vec3(0.18, 0.18, 0.18),
    t
  );
  col = mix(col, vec3(0.06, 0.06, 0.06), smoothstep(0.3, 0.7, t));

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
