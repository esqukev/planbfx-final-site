'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoHeroProps {
  videoUrl?: string; // Opción para URL de Cloudinary o externa
  localVideoPath?: string; // Ruta local del video
}

export default function VideoHero({ 
  videoUrl, 
  localVideoPath = '/videos/plabanfisa.mp4' 
}: VideoHeroProps = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Determinar qué fuente de video usar
  const videoSource = videoUrl || localVideoPath;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Asegurar que el video esté muted para autoplay
    video.muted = true;
    video.volume = 0;

    // Función para intentar reproducir el video
    const playVideo = async () => {
      if (!video) return;
      
      try {
        // Asegurar que el video esté cargado
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA
          await video.play();
          setIsPlaying(true);
          setVideoError(null);
          console.log('✅ Video playing successfully');
        } else {
          console.log('⏳ Video not ready yet, waiting...');
        }
      } catch (error: any) {
        console.error('❌ Error playing video:', error);
        setVideoError(error.message || 'Error al reproducir el video');
        
        // Intentar con user interaction
        const handleUserInteraction = async () => {
          try {
            if (video) {
              await video.play();
              setIsPlaying(true);
              setVideoError(null);
              console.log('✅ Video playing after user interaction');
            }
          } catch (err) {
            console.error('❌ Still cannot play video:', err);
          }
          document.removeEventListener('click', handleUserInteraction);
          document.removeEventListener('touchstart', handleUserInteraction);
          document.removeEventListener('keydown', handleUserInteraction);
        };
        
        document.addEventListener('click', handleUserInteraction, { once: true });
        document.addEventListener('touchstart', handleUserInteraction, { once: true });
        document.addEventListener('keydown', handleUserInteraction, { once: true });
      }
    };

    // Handlers de eventos del video
    const handleLoadedData = () => {
      console.log('📹 Video data loaded');
      console.log('📹 Video currentSrc:', video.currentSrc);
      playVideo();
    };

    const handleCanPlay = () => {
      console.log('📹 Video can play');
      console.log('📹 Video currentSrc:', video.currentSrc);
      playVideo();
    };

    const handleCanPlayThrough = async () => {
      console.log('📹 Video can play through');
      await playVideo();
    };

    const handleLoadedMetadata = () => {
      console.log('📹 Video metadata loaded');
      console.log('📹 Video duration:', video.duration);
      console.log('📹 Video videoWidth:', video.videoWidth);
      console.log('📹 Video videoHeight:', video.videoHeight);
    };

    const handleError = (e: Event) => {
      const error = video.error;
      if (error) {
        let errorMsg = 'Unknown error';
        switch (error.code) {
          case error.MEDIA_ERR_ABORTED:
            errorMsg = 'Video loading aborted';
            break;
          case error.MEDIA_ERR_NETWORK:
            errorMsg = 'Network error loading video - verifica tu conexión';
            break;
          case error.MEDIA_ERR_DECODE:
            errorMsg = 'Video decode error - el formato puede no ser compatible';
            break;
          case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMsg = 'Video format not supported or file not found';
            break;
        }
        console.error('❌ Video error:', errorMsg, error);
        console.error('❌ Video currentSrc:', video.currentSrc);
        console.error('❌ Video networkState:', video.networkState);
        console.error('❌ Video readyState:', video.readyState);
        setVideoError(errorMsg);
      } else {
        console.error('❌ Video error event pero sin error object');
        console.error('❌ Video currentSrc:', video.currentSrc);
        if (!video.currentSrc || video.currentSrc === '') {
          setVideoError('No se pudo cargar ninguna fuente de video');
        }
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setVideoError(null);
      console.log('▶️ Video started playing');
    };

    const handlePause = () => {
      setIsPlaying(false);
      console.log('⏸️ Video paused');
    };

    const handleEnded = () => {
      console.log('🔁 Video ended, restarting...');
      // El loop debería manejarlo, pero por si acaso
      if (video) {
        video.currentTime = 0;
        playVideo();
      }
    };

    // Agregar event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('stalled', () => console.log('⚠️ Video stalled'));
    video.addEventListener('waiting', () => console.log('⏳ Video waiting for data'));

    // Cargar el video
    video.load();

    // Intentar reproducir después de un pequeño delay
    const playTimeout = setTimeout(() => {
      playVideo();
    }, 100);

    // Parallax scroll handler
    const handleScroll = () => {
      if (!video) return;
      if (window.innerWidth < 768) return;
      const scrolled = window.scrollY;
      video.style.transform = `translateY(${scrolled * 0.25}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      clearTimeout(playTimeout);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [videoSource]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        src={videoSource}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        style={{ 
          width: '100%', 
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Debug info (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 z-50 bg-black/80 text-white p-4 rounded text-xs font-mono max-w-md">
          <div className="mb-2">Source: {videoSource}</div>
          <div className="mb-2">Playing: {isPlaying ? '✅ Yes' : '❌ No'}</div>
          {videoError && <div className="text-red-400 mb-2">Error: {videoError}</div>}
          {videoRef.current && (
            <>
              <div>ReadyState: {videoRef.current.readyState}</div>
              <div>NetworkState: {videoRef.current.networkState}</div>
              <div>CurrentSrc: {videoRef.current.currentSrc || 'none'}</div>
              <div>Paused: {videoRef.current.paused ? 'Yes' : 'No'}</div>
            </>
          )}
        </div>
      )}

      {/* Error message visible */}
      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/90 text-white p-8">
          <div className="text-center max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Video Error</h3>
            <p className="mb-4">{videoError}</p>
            <p className="text-sm text-gray-400 mb-4">
              Source: {videoSource}
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Si el problema persiste, verifica la consola del navegador (F12) para más detalles.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
