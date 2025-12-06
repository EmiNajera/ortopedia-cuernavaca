import React from 'react';

/**
 * Contenedor Responsive
 * Proporciona márgenes y padding consistentes en todos los breakpoints
 */
const ResponsiveContainer = ({
  children,
  className = '',
  size = 'default',
  noXPadding = false,
  ...props
}) => {
  const sizes = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
    default: 'max-w-7xl',
  };

  const maxWidth = sizes[size] || sizes.default;
  const padding = noXPadding ? '' : 'px-4 sm:px-6 lg:px-8';

  return (
    <div className={`mx-auto ${maxWidth} ${padding} ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Sección Responsive
 * Container con padding vertical
 */
export const ResponsiveSection = ({
  children,
  className = '',
  verticalPadding = 'py-8 sm:py-12 lg:py-16',
  ...props
}) => (
  <section className={`${verticalPadding} ${className}`} {...props}>
    <ResponsiveContainer>{children}</ResponsiveContainer>
  </section>
);

/**
 * Hero Section
 * Sección hero con altura adaptativa
 */
export const HeroSection = ({
  children,
  className = '',
  minHeight = 'min-h-[400px] sm:min-h-[500px] lg:min-h-screen',
  ...props
}) => (
  <section className={`${minHeight} flex items-center justify-center ${className}`} {...props}>
    <ResponsiveContainer size="lg">{children}</ResponsiveContainer>
  </section>
);

/**
 * Content Section
 * Sección de contenido con ancho máximo para legibilidad
 */
export const ContentSection = ({ children, className = '', maxWidth = 'max-w-3xl', ...props }) => (
  <ResponsiveSection className={className} {...props}>
    <div className={`${maxWidth} mx-auto`}>{children}</div>
  </ResponsiveSection>
);

/**
 * Stack Layout
 * Apila elementos verticalmente en móvil, horizontalmente en desktop
 */
export const StackLayout = ({
  children,
  className = '',
  reverse = false,
  gap = 'gap-6 lg:gap-8',
  ...props
}) => (
  <div
    className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} ${gap} items-center ${className}`}
    {...props}
  >
    {children}
  </div>
);

/**
 * Two Column Layout
 * Layout de dos columnas responsive
 */
export const TwoColumnLayout = ({
  left,
  right,
  className = '',
  leftWidth = 'lg:w-1/2',
  rightWidth = 'lg:w-1/2',
  ...props
}) => (
  <StackLayout className={className} {...props}>
    <div className={leftWidth}>{left}</div>
    <div className={rightWidth}>{right}</div>
  </StackLayout>
);

/**
 * Row Layout
 * Fila responsive con ancho personalizable
 */
export const RowLayout = ({
  children,
  className = '',
  gap = 'gap-4 sm:gap-6 lg:gap-8',
  ...props
}) => (
  <div className={`flex flex-wrap ${gap} ${className}`} {...props}>
    {children}
  </div>
);

export default ResponsiveContainer;
