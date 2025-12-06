/**
 * Obtiene la URL base del sitio
 * Usa NEXT_PUBLIC_SITE_URL si está configurada, sino usa el dominio por defecto
 */
export function getSiteUrl() {
  // En producción, usar la variable de entorno
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // En desarrollo, usar localhost
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // Fallback para producción (si no está configurada la variable)
  // Dominio principal: ortopediacuernavaca.com
  return 'https://ortopediacuernavaca.com';
}

/**
 * Obtiene la URL completa de una ruta
 * @param {string} path - Ruta relativa (ej: '/blog', '/contacto')
 * @returns {string} URL completa
 */
export function getFullUrl(path = '') {
  const baseUrl = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
