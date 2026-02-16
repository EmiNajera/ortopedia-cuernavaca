'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * Componente de video optimizado con lazy loading real usando Intersection Observer
 * Solo carga el video cuando está visible en el viewport
 */
export default function OptimizedVideo({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  ...props
}) {
  // Inicializar como true si estamos en cliente y el elemento está visible
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === 'undefined') return;

    // Verificar si el elemento está visible inmediatamente (above the fold)
    const checkVisibility = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight + 200 && rect.bottom > -200;

        if (isVisible) {
          // Si está visible, cargar inmediatamente
          setShouldLoad(true);
          return true;
        }
      }
      return false;
    };

    // Verificar inmediatamente
    if (checkVisibility()) {
      return; // Ya está visible, no necesitamos el observer
    }

    // Si no está visible, usar Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            // Una vez que está visible, desconectar el observer
            observer.disconnect();
          }
        });
      },
      {
        // Cargar cuando esté a 200px de entrar al viewport
        rootMargin: '200px',
        threshold: 0.1,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (shouldLoad && videoRef.current && autoPlay) {
      // Intentar reproducir cuando esté listo
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            // Ocultar poster cuando el video empiece a reproducir
            setShowPoster(false);
          })
          .catch(() => {
            // Autoplay bloqueado, pero el video está cargado
            setIsPlaying(false);
          });
      }
    }
  }, [shouldLoad, autoPlay]);

  // Ocultar poster cuando el video esté listo y reproduciéndose
  useEffect(() => {
    if (videoRef.current) {
      const handleCanPlay = () => {
        if (videoRef.current && videoRef.current.readyState >= 3) {
          setShowPoster(false);
        }
      };
      const handlePlaying = () => {
        setShowPoster(false);
      };

      videoRef.current.addEventListener('canplay', handleCanPlay);
      videoRef.current.addEventListener('playing', handlePlaying);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('canplay', handleCanPlay);
          videoRef.current.removeEventListener('playing', handlePlaying);
        }
      };
    }
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* Poster siempre visible hasta que el video esté reproduciéndose */}
      {showPoster && poster && (
        <img
          src={poster}
          alt=""
          className={className}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: shouldLoad ? 1 : 2,
          }}
          loading="eager"
          onError={(e) => {
            console.error('Error loading poster image:', poster, e);
          }}
        />
      )}
      {/* Video - se carga cuando shouldLoad es true */}
      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          className={className}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload="metadata"
          poster={poster}
          onLoadedData={() => {
            if (autoPlay && videoRef.current) {
              videoRef.current.play().catch(() => {
                // Ignorar errores de autoplay
              });
            }
          }}
          onError={(e) => {
            console.error('Error loading video:', src, e);
            // Si hay error, mantener el poster visible y no intentar cargar el video
            setShouldLoad(false);
            setShowPoster(true);
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
          }}
          {...props}
        />
      )}
    </div>
  );
}
