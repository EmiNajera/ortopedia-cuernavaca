import React from 'react';
import Image from 'next/image';
import { ResponsiveTypography } from '@shared/components/ui/ResponsiveTypography';

/**
 * Card Responsive - Componente base para cards escalables
 * Demuestra el uso del sistema responsive implementado
 */
const ResponsiveCard = ({
  title,
  description,
  image,
  price,
  action = 'Ver más',
  onClick,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        group bg-white border border-gray-200 rounded-lg shadow-sm 
        hover:shadow-lg transition-all duration-300 overflow-hidden
        hover:-translate-y-1 cursor-pointer
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {/* Imagen responsive */}
      <div className="aspect-square w-full bg-gray-100 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />
      </div>

      {/* Contenido responsive */}
      <div className="p-3 sm:p-4 lg:p-6">
        <ResponsiveTypography
          level="h3"
          className="mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
        >
          {title}
        </ResponsiveTypography>

        <ResponsiveTypography level="bodySmall" className="mb-3 line-clamp-2 text-gray-600">
          {description}
        </ResponsiveTypography>

        <div className="flex items-center justify-between">
          {/* Precio removido - ya no se muestra en cards de productos */}

          <button
            className="
            bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 
            rounded-md text-xs sm:text-sm font-medium 
            hover:bg-blue-700 transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          "
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Card de Producto Responsive
 */
export const ProductCard = ({ product, onAddToCart, ...props }) => (
  <ResponsiveCard
    title={product.name}
    description={product.description}
    image={product.image}
    action="Consultar"
    onClick={() => onAddToCart?.(product)}
    {...props}
  />
);

/**
 * Card de Servicio Responsive
 */
export const ServiceCard = ({ service, onSelect, ...props }) => (
  <ResponsiveCard
    title={service.name}
    description={service.description}
    image={service.image}
    action="Consultar"
    onClick={() => onSelect?.(service)}
    {...props}
  />
);

/**
 * Card de Categoría Responsive
 */
export const CategoryCard = ({ category, onSelect, ...props }) => (
  <ResponsiveCard
    title={category.name}
    description={category.description}
    image={category.image}
    action="Explorar"
    onClick={() => onSelect?.(category)}
    {...props}
  />
);

export default ResponsiveCard;
