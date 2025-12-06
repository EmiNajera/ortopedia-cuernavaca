import { Inter, Poppins } from 'next/font/google';

/**
 * Optimización de fuentes usando next/font
 * Esto mejora el LCP al:
 * - Preload automático de fuentes críticas
 * - Self-hosting de fuentes (mejor performance)
 * - Eliminar layout shift (FOUT/FOIT)
 * - Optimización automática de subsetting
 */

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Mejora LCP mostrando texto inmediatamente
  variable: '--font-inter',
  weight: ['400', '700'],
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
});

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '700'],
  preload: false, // Solo preload Inter como fuente principal
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
});
