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

    // Función para intentar reproducir el video
    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
        console.log('✅ Video playing successfully');
      } catch (error: any) {
        console.error('❌ Error playing video:', error);
        setVideoError(error.message);
        
        // Intentar con user interaction
        const handleUserInteraction = async () => {
          try {
            await video.play();
            setIsPlaying(true);
            console.log('✅ Video playing after user interaction');
          } catch (err) {
            console.error('❌ Still cannot play video:', err);
          }
          document.removeEventListener('click', handleUserInteraction);
          document.removeEventListener('touchstart', handleUserInteraction);
        };
        
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('touchstart', handleUserInteraction);
      }
    };

    // Handlers de eventos del video
    const handleLoadedData = () => {
      console.log('📹 Video data loaded');
      console.log('📹 Video src:', video.src);
      console.log('📹 Video currentSrc:', video.currentSrc);
      playVideo();
    };

    const handleCanPlay = () => {
      console.log('📹 Video can play');
      console.log('📹 Video src:', video.src);
      console.log('📹 Video currentSrc:', video.currentSrc);
      playVideo();
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
            errorMsg = 'Video format not supported or file not found - intenta usar Cloudinary';
            break;
        }
        console.error('❌ Video error:', errorMsg, error);
        console.error('❌ Video currentSrc:', video.currentSrc);
        console.error('❌ Video networkState:', video.networkState);
        console.error('❌ Video readyState:', video.readyState);
        setVideoError(errorMsg);
      } else {
        // Si no hay error object, puede ser que ninguna fuente funcionó
        console.error('❌ Video error event pero sin error object');
        console.error('❌ Video currentSrc:', video.currentSrc);
        if (!video.currentSrc || video.currentSrc === '') {
          setVideoError('No se pudo cargar ninguna fuente de video. Verifica que los archivos existen en public/videos/');
        }
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      console.log('▶️ Video started playing');
    };

    const handlePause = () => {
      setIsPlaying(false);
      console.log('⏸️ Video paused');
    };

    // Agregar event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('stalled', () => console.log('⚠️ Video stalled'));
    video.addEventListener('waiting', () => console.log('⏳ Video waiting for data'));

    // Intentar cargar y reproducir
    video.load();
    playVideo();

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
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [videoSource]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        {/* Múltiples fuentes para mejor compatibilidad - probar ambos archivos */}
        {videoUrl ? (
          <source src={videoUrl} type="video/mp4" />
        ) : (
          <>
            <source src="/videos/plabanfisa.mp4" type="video/mp4" />
            <source src="/videos/plabanfisa.mov" type="video/quicktime" />
          </>
        )}
        {/* Fallback si ninguna fuente funciona */}
        Tu navegador no soporta la reproducción de video.
      </video>

      {/* Debug info (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 z-50 bg-black/80 text-white p-4 rounded text-xs font-mono">
          <div>Source: {videoSource}</div>
          <div>Playing: {isPlaying ? '✅ Yes' : '❌ No'}</div>
          {videoError && <div className="text-red-400">Error: {videoError}</div>}
          {videoRef.current && (
            <>
              <div>ReadyState: {videoRef.current.readyState}</div>
              <div>NetworkState: {videoRef.current.networkState}</div>
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
            <div className="text-xs text-gray-500 mt-4 space-y-2">
              <p><strong>Opción 1 (Local):</strong> Verifica que el archivo existe en public/videos/plabanfisa.mp4</p>
              <p><strong>Opción 2 (Cloudinary):</strong> Usa el componente así:</p>
              <code className="block bg-gray-800 p-2 rounded mt-2 text-left">
                {'<VideoHero videoUrl="https://res.cloudinary.com/tu-cloud/video/upload/v1234567/plabanfisa.mp4" />'}
              </code>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
