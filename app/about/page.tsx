'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useEffect, useRef } from 'react';

export default function AboutPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Large geometric shapes for background
    const shapes: Array<{
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      vx: number;
      vy: number;
      sides: number;
    }> = [];

    // Create large geometric shapes
    for (let i = 0; i < 8; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 150 + Math.random() * 200, // Large shapes
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.003, // Very slow rotation
        vx: (Math.random() - 0.5) * 0.1, // Slow movement
        vy: (Math.random() - 0.5) * 0.1,
        sides: 3 + Math.floor(Math.random() * 4), // 3-6 sides
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        // Update position slowly
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.rotation += shape.rotationSpeed;

        // Wrap around edges
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size;

        // Draw large geometric shape with very light opacity
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        
        // Very light stroke
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        for (let i = 0; i < shape.sides; i++) {
          const angle = (Math.PI * 2 * i) / shape.sides;
          const x = Math.cos(angle) * shape.size;
          const y = Math.sin(angle) * shape.size;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
        
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section with Large Background Geometry */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Subtle Grid Background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Large Geometric Shapes Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ opacity: 0.4 }}
        />
        
        {/* Gradient overlay for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-10 pointer-events-none" />
      </section>
      
      {/* Content Section */}
      <section className="relative z-20 py-24 px-4 md:px-8 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-black dark:text-white">
            About Us
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
            This is the About page. Content will be added here.
          </p>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
