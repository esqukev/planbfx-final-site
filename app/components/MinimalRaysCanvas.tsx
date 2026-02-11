'use client';

import { useEffect, useRef } from 'react';

/**
 * Minimal rays canvas effect for Hero background.
 * Soft white rays emanating from center with subtle animation.
 */
export default function MinimalRaysCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let rafId: number;

    const rays = Array.from({ length: 8 }).map(() => createRay());

    function createRay() {
      return {
        angle: Math.random() * Math.PI * 2,
        width: 200 + Math.random() * 600,
        alpha: 0,
        maxAlpha: 0.02 + Math.random() * 0.05,
        speed: 0.0008 + Math.random() * 0.0015,
        life: Math.random(),
        fadeSpeed: 0.001 + Math.random() * 0.002,
        offset: Math.random() * 2000,
      };
    }

    function resize() {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }

    function drawRay(
      ray: ReturnType<typeof createRay>,
      t: number,
      centerX: number,
      centerY: number,
      context: CanvasRenderingContext2D
    ) {
      ray.life += ray.fadeSpeed;
      ray.alpha = Math.sin(ray.life) * ray.maxAlpha;

      if (ray.life > Math.PI) {
        Object.assign(ray, createRay());
        ray.life = 0;
      }

      context.save();
      context.translate(centerX, centerY);
      context.rotate(ray.angle + Math.sin(t * ray.speed + ray.offset) * 0.2);

      const grad = context.createLinearGradient(-w, 0, w, 0);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(0.45, `rgba(255,255,255,${ray.alpha})`);
      grad.addColorStop(0.55, `rgba(255,255,255,${ray.alpha})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      context.fillStyle = grad;

      context.beginPath();
      context.rect(-w, -ray.width / 2, w * 2, ray.width);
      context.fill();

      context.restore();
    }

    function render(t: number) {
      if (!ctx || !canvas) return;
      const centerX = w / 2;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);

      const vignette = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(w, h)
      );
      vignette.addColorStop(0, 'rgba(20,20,25,0.35)');
      vignette.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';

      for (const ray of rays) {
        drawRay(ray, t, centerX, centerY, ctx);
      }

      ctx.globalCompositeOperation = 'source-over';

      rafId = requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);
    resize();
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ background: '#000' }}
      aria-hidden
    />
  );
}
