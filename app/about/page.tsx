'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useEffect, useRef } from 'react';

export default function AboutPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

    // Geometric shapes
    const shapes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
    }> = [];

    // Create geometric shapes
    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 20 + Math.random() * 60,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, ${100 + Math.random() * 155}, ${0.1 + Math.random() * 0.2})`,
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw shapes
      shapes.forEach((shape) => {
        // Move towards mouse slightly
        const dx = mouseX - shape.x;
        const dy = mouseY - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          shape.vx += (dx / distance) * 0.01;
          shape.vy += (dy / distance) * 0.01;
        }

        // Update position
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.rotation += shape.rotationSpeed;

        // Bounce off edges
        if (shape.x < 0 || shape.x > canvas.width) shape.vx *= -1;
        if (shape.y < 0 || shape.y > canvas.height) shape.vy *= -1;

        // Keep in bounds
        shape.x = Math.max(0, Math.min(canvas.width, shape.x));
        shape.y = Math.max(0, Math.min(canvas.height, shape.y));

        // Damping
        shape.vx *= 0.98;
        shape.vy *= 0.98;

        // Draw shape
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.fillStyle = shape.color;
        ctx.strokeStyle = shape.color.replace('rgba', 'rgba').replace(/[\d.]+\)$/, '0.3)');
        ctx.lineWidth = 2;

        // Draw different shapes
        const sides = Math.floor(Math.random() * 3) + 3; // 3-5 sides
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          const angle = (Math.PI * 2 * i) / sides;
          const x = Math.cos(angle) * shape.size;
          const y = Math.sin(angle) * shape.size;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section with Interactive Grid and Geometry */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Animated Grid Background */}
        <div 
          ref={gridRef}
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 0 0',
            animation: 'gridMove 20s linear infinite',
          }}
        />
        
        {/* Secondary grid layer with different size */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0, 0 0',
            animation: 'gridMove 30s linear infinite reverse',
          }}
        />
        
        {/* Darker overlay for depth */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 0 0',
          }}
        />
        
        {/* Interactive Geometry Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10"
          style={{ mixBlendMode: 'screen' }}
        />
        
        {/* Gradient overlay for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-20 pointer-events-none" />
      </section>
      
      {/* Content Section */}
      <section className="py-24 px-4 md:px-8 bg-white dark:bg-black">
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
