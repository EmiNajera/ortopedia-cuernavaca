// Configuración de productos para la tienda
export const products = [
  {
    id: '1',
    title: 'Plantillas Ortopédicas Personalizadas',
    brand: 'Ortopedia Cuernavaca',
    price: 1200,
    originalPrice: 1500,
    discount: 20,
    rating: 4.8,
    reviews: 156,
    inStock: true,
    category: 'plantillas',
    images: [
      '/images/products/plantilla.svg',
      '/images/products/plantilla-2.jpg',
      '/images/products/plantilla-3.jpg',
    ],
    description:
      'Plantillas ortopédicas personalizadas para corregir problemas de pisada y mejorar la postura.',
    features: [
      'Material de alta calidad',
      'Diseño personalizado',
      'Corrección de pisada',
      'Comodidad garantizada',
    ],
    specifications: {
      material: 'EVA de alta densidad',
      duracion: '6-12 meses',
      tallas: '22-30 cm',
      garantia: '3 meses',
    },
  },
  {
    id: '2',
    title: 'Faja Lumbar Ortopédica',
    brand: 'Ortopedia Cuernavaca',
    price: 800,
    originalPrice: 1000,
    discount: 20,
    rating: 4.6,
    reviews: 89,
    inStock: true,
    category: 'fajas',
    images: ['/images/products/faja.svg', '/images/products/faja-2.jpg'],
    description: 'Faja lumbar ortopédica para aliviar dolores de espalda y mejorar la postura.',
    features: [
      'Soporte lumbar ajustable',
      'Material transpirable',
      'Fácil de usar',
      'Alivio inmediato',
    ],
    specifications: {
      material: 'Neopreno médico',
      tallas: 'S, M, L, XL',
      garantia: '6 meses',
    },
  },
  {
    id: '3',
    title: 'Muletas Ajustables',
    brand: 'Ortopedia Cuernavaca',
    price: 600,
    originalPrice: 750,
    discount: 20,
    rating: 4.7,
    reviews: 45,
    inStock: true,
    category: 'rehabilitacion',
    images: ['/images/products/muletas.svg', '/images/products/muletas-2.jpg'],
    description: 'Muletas ajustables de aluminio para rehabilitación y movilidad.',
    features: [
      'Altura ajustable',
      'Material ligero',
      'Empuñaduras cómodas',
      'Puntas antideslizantes',
    ],
    specifications: {
      material: 'Aluminio anodizado',
      altura: 'Ajustable 100-140 cm',
      peso: '1.2 kg',
      garantia: '1 año',
    },
  },
];

// Función para obtener producto por ID
export function getProductById(id) {
  return products.find((product) => product.id === id);
}

// Función para obtener productos por categoría
export function getProductsByCategory(category) {
  return products.filter((product) => product.category === category);
}

// Función para buscar productos
export function searchProducts(query) {
  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm),
  );
}

// Función para obtener productos en oferta
export function getProductsOnSale() {
  return products.filter((product) => product.discount > 0);
}

// Función para obtener productos por rango de precio
export function getProductsByPriceRange(minPrice, maxPrice) {
  return products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
}
