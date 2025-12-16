import { NextResponse } from 'next/server';

/**
 * Middleware para agregar headers de seguridad
 * Se ejecuta en todas las rutas antes de que se procese la solicitud
 */
export function middleware(request) {
  const response = NextResponse.next();

  // Headers de seguridad
  const securityHeaders = {
    // Prevenir clickjacking
    'X-Frame-Options': 'DENY',

    // Prevenir MIME type sniffing
    'X-Content-Type-Options': 'nosniff',

    // Controlar qué información del referrer se envía
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // Controlar qué APIs del navegador pueden usar
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()',
    ].join(', '),
  };

  // Content-Security-Policy
  // Ajustar según las necesidades del proyecto
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://fonts.googleapis.com https://www.googletagmanager.com https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.whatsapp.com https://www.google-analytics.com",
    "frame-src 'self' https://www.google.com https://www.google.com.mx https://maps.google.com https://www.google.com/maps",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  // Agregar headers de seguridad
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Agregar CSP
  response.headers.set('Content-Security-Policy', csp);

  // HSTS (Strict-Transport-Security) - Solo en producción con HTTPS
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload',
    );
  }

  return response;
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
};
