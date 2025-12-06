import React from 'react';

/**
 * Sistema de Grid Responsive Unificado
 * Componente base para layouts de grid escalables
 */
const ResponsiveGrid = ({ children, variant = 'products', className = '', ...props }) => {
  // Configuraciones de grid por tipo de contenido
  const gridVariants = {
    // Grid para productos (1-6 columnas)
    products:
      'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8',

    // Grid para categorías (2-6 columnas)
    categories:
      'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4 md:gap-6',

    // Grid para servicios (1-4 columnas)
    services:
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8',

    // Grid para artículos de blog (1-3 columnas)
    blog: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',

    // Grid para testimonios (1-3 columnas)
    testimonials: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',

    // Grid para equipo (1-4 columnas)
    team: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8',

    // Grid para características (1-2 columnas)
    features: 'grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8',

    // Grid para formularios (1-2 columnas)
    form: 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6',

    // Grid para navegación (responsive horizontal)
    navigation: 'flex flex-wrap gap-2 sm:gap-4 md:gap-6',

    // Grid para footer (1-4 columnas)
    footer: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8',
  };

  const gridClass = gridVariants[variant] || gridVariants.products;

  return (
    <div className={`${gridClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Componentes específicos para diferentes tipos de grid
 */
export const ProductGrid = ({ children, className = '', ...props }) => (
  <ResponsiveGrid variant="products" className={className} {...props}>
    {children}
  </ResponsiveGrid>
);

export const CategoryGrid = ({ children, className = '', ...props }) => (
  <ResponsiveGrid variant="categories" className={className} {...props}>
    {children}
  </ResponsiveGrid>
);

export const ServiceGrid = ({ children, className = '', ...props }) => (
  <ResponsiveGrid variant="services" className={className} {...props}>
    {children}
  </ResponsiveGrid>
);

export const BlogGrid = ({ children, className = '', ...props }) => (
  <ResponsiveGrid variant="blog" className={className} {...props}>
    {children}
  </ResponsiveGrid>
);

export const TestimonialGrid = ({ children, className = '', ...props }) => (
  <ResponsiveGrid variant="testimonials" className={className} {...props}>
    {children}
  </ResponsiveGrid>
);

export const TeamGrid = ({ children, className = '', ...props }) => (
  <ResponsiveGrid variant="team" className={className} {...props}>
    {children}
  </ResponsiveGrid>
);

export const FeatureGrid = ({ children, className = '', ...props }) => (
  <ResponsiveGrid variant="features" className={className} {...props}>
    {children}
  </ResponsiveGrid>
);

export const FormGrid = ({ children, className = '', ...props }) => (
  <ResponsiveGrid variant="form" className={className} {...props}>
    {children}
  </ResponsiveGrid>
);

export const NavigationGrid = ({ children, className = '', ...props }) => (
  <ResponsiveGrid variant="navigation" className={className} {...props}>
    {children}
  </ResponsiveGrid>
);

export const FooterGrid = ({ children, className = '', ...props }) => (
  <ResponsiveGrid variant="footer" className={className} {...props}>
    {children}
  </ResponsiveGrid>
);

export default ResponsiveGrid;
