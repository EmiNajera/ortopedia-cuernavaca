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
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === 'undefined') return;

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
          })
          .catch(() => {
            // Autoplay bloqueado, pero el video está cargado
            setIsPlaying(false);
          });
      }
    }
  }, [shouldLoad, autoPlay]);

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
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
          {...props}
        />
      ) : (
        // Mostrar poster mientras no se carga
        poster && (
          <img
            src={poster}
            alt=""
            className={className}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            loading="eager"
          />
        )
      )}
    </div>
  );
}
