'use client';

import { forwardRef, useCallback, useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import Hls from 'hls.js';

/**
 * Componente de video que soporta HLS (.m3u8) en Firefox y otros navegadores
 * que no tienen soporte nativo. Usa hls.js para decodificar HLS vía Media Source Extensions.
 */
const HLSVideo = forwardRef<HTMLVideoElement, ComponentPropsWithoutRef<'video'>>(
  function HLSVideo({ src, className, style, autoPlay, muted, playsInline, ...videoProps }, ref) {
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
      if (muted) video.muted = true;
      if (playsInline) video.playsInline = true;
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
          video.load();
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
          let networkErrorRetries = 0;
          let mediaErrorRetries = 0;
          const MAX_NETWORK_ERROR_RETRIES = 3;
          const MAX_MEDIA_ERROR_RETRIES = 3;

          hls.loadSource(srcStr);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, tryAutoplay);
          hls.on(Hls.Events.ERROR, (_event, data) => {
            if (!data.fatal) return;

            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR: {
                if (networkErrorRetries < MAX_NETWORK_ERROR_RETRIES) {
                  networkErrorRetries += 1;
                  hls.startLoad();
                } else {
                  hls.destroy();
                  hlsRef.current = null;
                }
                break;
              }
              case Hls.ErrorTypes.MEDIA_ERROR: {
                if (mediaErrorRetries < MAX_MEDIA_ERROR_RETRIES) {
                  mediaErrorRetries += 1;
                  hls.recoverMediaError();
                  tryAutoplay();
                } else {
                  hls.destroy();
                  hlsRef.current = null;
                }
                break;
              }
              default: {
                hls.destroy();
                hlsRef.current = null;
                break;
              }
            }
          });

          return () => {
            hls.destroy();
            hlsRef.current = null;
          };
        }
      }

      // MP4 u otros formatos: usar src nativo
      video.src = srcStr;
      video.load();
      tryAutoplay();
    }, [src, autoPlay, muted, playsInline]);

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
        muted={muted}
        playsInline={playsInline}
        crossOrigin="anonymous"
        {...videoProps}
      />
    );
  }
);

export default HLSVideo;
