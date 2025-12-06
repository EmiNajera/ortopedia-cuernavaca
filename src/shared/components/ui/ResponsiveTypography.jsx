import React from 'react';

/**
 * Sistema de Tipografía Responsive
 * Componente base para headings y texto escalable
 */
const ResponsiveTypography = ({
  level,
  children,
  className = '',
  as: Component = null,
  ...props
}) => {
  // Mapeo de niveles a clases responsive
  const typographyClasses = {
    h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 leading-tight',
    h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 leading-tight',
    h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-gray-900 leading-tight',
    h4: 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-gray-900 leading-snug',
    h5: 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-medium text-gray-900 leading-snug',
    h6: 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium text-gray-900 leading-snug',
    body: 'text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed',
    bodySmall: 'text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed',
    caption: 'text-xs sm:text-sm text-gray-500 leading-normal',
    button: 'text-sm sm:text-base md:text-lg font-medium leading-none',
    link: 'text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium leading-normal transition-colors',
  };

  // Determinar el componente a renderizar
  const Tag = Component || level || 'div';

  // Obtener las clases de tipografía
  const typographyClass = typographyClasses[level] || typographyClasses.body;

  return (
    <Tag className={`${typographyClass} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

/**
 * Componentes específicos para diferentes tipos de texto
 */
export const ResponsiveHeading = ({ level = 'h1', children, className = '', ...props }) => (
  <ResponsiveTypography level={level} className={className} {...props}>
    {children}
  </ResponsiveTypography>
);

export const ResponsiveText = ({ variant = 'body', children, className = '', ...props }) => (
  <ResponsiveTypography level={variant} className={className} {...props}>
    {children}
  </ResponsiveTypography>
);

export const ResponsiveButton = ({ children, className = '', ...props }) => (
  <ResponsiveTypography level="button" className={className} {...props}>
    {children}
  </ResponsiveTypography>
);

export const ResponsiveLink = ({ children, className = '', ...props }) => (
  <ResponsiveTypography level="link" className={className} {...props}>
    {children}
  </ResponsiveTypography>
);

export default ResponsiveTypography;
