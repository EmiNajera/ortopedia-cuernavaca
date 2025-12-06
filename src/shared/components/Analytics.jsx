import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Componente de Analytics y Web Vitals
 * Integra Google Analytics 4 y tracking de Core Web Vitals
 */

// Inicializar Google Analytics
export function initGA(measurementId) {
  if (typeof window === 'undefined' || !measurementId) return;

  // Evitar múltiples inicializaciones
  if (window.gtag) return;

  // Cargar script de Google Analytics
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Inicializar gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', measurementId, {
    page_path: window.location.pathname,
  });
}

// Track page view
export function trackPageView(url) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

// Track event
export function trackEvent(action, category, label, value) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

// Web Vitals tracking
export function reportWebVitals(metric) {
  if (typeof window === 'undefined' || !window.gtag) return;

  const { id, name, value, delta, rating } = metric;

  // Enviar a Google Analytics
  window.gtag('event', name, {
    event_category: 'Web Vitals',
    event_label: id,
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    non_interaction: true,
    metric_rating: rating,
    metric_value: value,
  });

  // Log en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', {
      name,
      value: Math.round(value),
      rating,
      delta: Math.round(delta),
    });
  }
}

/**
 * Componente principal de Analytics
 * Se debe agregar en _app.jsx
 */
export default function Analytics() {
  const router = useRouter();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!measurementId) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('NEXT_PUBLIC_GA_MEASUREMENT_ID no está configurado');
      }
      return;
    }

    // Inicializar GA
    initGA(measurementId);

    // Track page views en cambios de ruta
    const handleRouteChange = (url) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, measurementId]);

  // Web Vitals tracking
  useEffect(() => {
    if (typeof window === 'undefined' || !measurementId) return;

    // Solo cargar web-vitals en el cliente
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(reportWebVitals);
      onFID(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
      onINP(reportWebVitals);
    });
  }, [measurementId]);

  return null;
}
