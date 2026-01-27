'use client';

import { useEffect, useRef } from 'react';

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Parallax scroll handler - solo en desktop
    const handleScroll = () => {
      if (!video) return;
      // Solo parallax en pantallas grandes (desktop)
      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) {
        // En móvil, resetear transform
        video.style.transform = 'translateY(0)';
        return;
      }
      const scrolled = window.scrollY;
      video.style.transform = `translateY(${scrolled * 0.25}px)`;
    };

    // Verificar tamaño de pantalla al cargar y en resize
    const checkScreenSize = () => {
      if (!video) return;
      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) {
        video.style.transform = 'translateY(0)';
      } else {
        // Si es desktop, aplicar parallax actual
        handleScroll();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      >
        <source
          src="https://res.cloudinary.com/dpplgma25/video/upload/f_auto,q_auto,vc_auto/plabanfisa_chrpo2.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-white text-5xl font-bold">
        PLANB FX
      </div>
    </section>
  );
}
