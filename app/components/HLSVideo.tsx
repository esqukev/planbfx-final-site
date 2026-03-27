'use client';

import { forwardRef, useCallback, useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import Hls from 'hls.js';

/**
 * Componente de video que soporta HLS (.m3u8) en Firefox y otros navegadores
 * que no tienen soporte nativo. Usa hls.js para decodificar HLS vía Media Source Extensions.
 */
const HLSVideo = forwardRef<HTMLVideoElement, ComponentPropsWithoutRef<'video'>>(
  function HLSVideo({ src, className, style, autoPlay, ...videoProps }, ref) {
    const internalRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    const setRef = useCallback(
      (el: HTMLVideoElement | null) => {
        internalRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLVideoElement | null>).current = el;
      },
      [ref]
    );

    useEffect(() => {
      const video = internalRef.current;
      const srcStr = typeof src === 'string' ? src : undefined;
      if (!video || !srcStr) return;

      const isHLS = srcStr.endsWith('.m3u8');
      const tryAutoplay = () => {
        if (!autoPlay) return;
        video.play().catch(() => {
          // Si el navegador bloquea autoplay, mantener silencioso sin romper la UI.
        });
      };

      if (isHLS) {
        // Safari soporta HLS nativo; usar src directo
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = srcStr;
          tryAutoplay();
          return;
        }

        // Firefox y otros: usar hls.js
        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: false,
          });
          hlsRef.current = hls;

          hls.loadSource(srcStr);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, tryAutoplay);

          return () => {
            hls.destroy();
            hlsRef.current = null;
          };
        }
      }

      // MP4 u otros formatos: usar src nativo
      video.src = srcStr;
      tryAutoplay();
    }, [src, autoPlay]);

    useEffect(() => {
      const video = internalRef.current;
      if (!video || !autoPlay) return;

      const handleCanPlay = () => {
        video.play().catch(() => {
          // Ignorar bloqueos de autoplay sin generar errores visibles.
        });
      };

      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    }, [autoPlay]);

    return (
      <video
        ref={setRef}
        className={className}
        style={style}
        autoPlay={autoPlay}
        {...videoProps}
      />
    );
  }
);

export default HLSVideo;
