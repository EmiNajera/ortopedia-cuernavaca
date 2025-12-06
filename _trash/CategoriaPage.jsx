import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MarketingLayout from '../../components/layout/MarketingLayout';
import StoreLayout from '../../components/layout/StoreLayout';
import { openWhatsApp } from '../../utils/whatsapp';
import Image from 'next/image';

// ProductCard component (reutilizado de TiendaCompleta)
const ProductCard = ({
  imgSrc,
  description,
  price,
  action = 'Agregar al Carrito',
  productId = '1',
  onWishlistToggle,
  isInWishlist,
}) => (
  <div className="group relative w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
    <Link href={`/producto/${productId}`}>
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imgSrc}
          alt={description}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </Link>
    <div className="p-6">
      <p className="text-lg font-semibold text-gray-800 h-16 leading-tight mb-4">{description}</p>
      <div className="flex items-center justify-between mb-4">
        {/* Marca - si está disponible en el producto */}
        {product?.brand && product.brand !== 'Sin marca' && (
          <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
            {product.brand}
          </span>
        )}
        <button
          className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          onClick={() => onWishlistToggle(productId)}
        >
          <svg
            className={`w-6 h-6 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-600'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <button
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
        onClick={() => {
          if (action === 'Agregar al Carrito') {
            alert(`Producto "${description}" agregado al carrito`);
          } else {
            openWhatsApp();
          }
        }}
      >
        {action}
      </button>
    </div>
  </div>
);

export default function CategoriaPage() {
  const router = useRouter();
  const { categorySlug } = router.query;
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Datos de categorías
  const categories = {
    plantillas: {
      name: 'Plantillas Ortopédicas',
      description: 'Plantillas personalizadas para diferentes tipos de pie y actividades',
      icon: '👣',
      bgColor: 'bg-blue-500',
      products: [
        {
          id: '1',
          imgSrc: 'https://placehold.co/150x150/3498DB/ffffff?text=Plantilla+1',
          description: 'Plantilla para pie plano grado 1',
          price: '$550.00',
        },
        {
          id: '6',
          imgSrc: 'https://placehold.co/150x150/2980B9/ffffff?text=Plantilla+2',
          description: 'Plantilla para pie cavo',
          price: '$650.00',
        },
        {
          id: '7',
          imgSrc: 'https://placehold.co/150x150/1ABC9C/ffffff?text=Plantilla+3',
          description: 'Plantilla deportiva',
          price: '$450.00',
        },
        {
          id: '8',
          imgSrc: 'https://placehold.co/150x150/16A085/ffffff?text=Plantilla+4',
          description: 'Plantilla antifatiga',
          price: '$380.00',
        },
        {
          id: '9',
          imgSrc: 'https://placehold.co/150x150/8E44AD/ffffff?text=Plantilla+5',
          description: 'Plantilla postural',
          price: '$520.00',
        },
        {
          id: '10',
          imgSrc: 'https://placehold.co/150x150/2C3E50/ffffff?text=Plantilla+6',
          description: 'Plantilla personalizada',
          price: '$750.00',
        },
      ],
    },
    fajas: {
      name: 'Fajas y Soporte',
      description: 'Fajas ortopédicas para diferentes partes del cuerpo',
      icon: '🩹',
      bgColor: 'bg-green-500',
      products: [
        {
          id: '11',
          imgSrc: 'https://placehold.co/150x150/27AE60/ffffff?text=Faja+1',
          description: 'Faja lumbar con soporte',
          price: '$750.00',
        },
        {
          id: '12',
          imgSrc: 'https://placehold.co/150x150/00D4AA/ffffff?text=Faja+2',
          description: 'Faja abdominal postparto',
          price: '$850.00',
        },
        {
          id: '13',
          imgSrc: 'https://placehold.co/150x150/F39C12/ffffff?text=Faja+3',
          description: 'Faja deportiva',
          price: '$650.00',
        },
        {
          id: '14',
          imgSrc: 'https://placehold.co/150x150/E74C3C/ffffff?text=Faja+4',
          description: 'Faja torácica',
          price: '$580.00',
        },
        {
          id: '15',
          imgSrc: 'https://placehold.co/150x150/9B59B6/ffffff?text=Faja+5',
          description: 'Faja pélvica',
          price: '$720.00',
        },
      ],
    },
    ortesis: {
      name: 'Ortesis y Rodilleras',
      description: 'Ortesis para rodillas, tobillos y otras articulaciones',
      icon: '🦴',
      bgColor: 'bg-purple-500',
      products: [
        {
          id: '16',
          imgSrc: 'https://placehold.co/150x150/8E44AD/ffffff?text=Rodillera+1',
          description: 'Rodillera ortopédica',
          price: '$450.00',
        },
        {
          id: '17',
          imgSrc: 'https://placehold.co/150x150/2C3E50/ffffff?text=Rodillera+2',
          description: 'Rodillera deportiva',
          price: '$350.00',
        },
        {
          id: '18',
          imgSrc: 'https://placehold.co/150x150/1ABC9C/ffffff?text=Tobillera',
          description: 'Tobillera elástica',
          price: '$250.00',
        },
        {
          id: '19',
          imgSrc: 'https://placehold.co/150x150/3498DB/ffffff?text=Codera',
          description: 'Codera ortopédica',
          price: '$320.00',
        },
        {
          id: '20',
          imgSrc: 'https://placehold.co/150x150/2980B9/ffffff?text=Muñequera',
          description: 'Muñequera deportiva',
          price: '$280.00',
        },
      ],
    },
    calzado: {
      name: 'Calzado Ortopédico',
      description: 'Zapatos y calzado especializado para diferentes necesidades',
      icon: '👟',
      bgColor: 'bg-orange-500',
      products: [
        {
          id: '21',
          imgSrc: 'https://placehold.co/150x150/E67E22/ffffff?text=Zapato+1',
          description: 'Calzado ortopédico infantil',
          price: '$890.00',
        },
        {
          id: '22',
          imgSrc: 'https://placehold.co/150x150/D35400/ffffff?text=Zapato+2',
          description: 'Calzado ortopédico adulto',
          price: '$1,200.00',
        },
        {
          id: '23',
          imgSrc: 'https://placehold.co/150x150/F39C12/ffffff?text=Zapato+3',
          description: 'Calzado deportivo ortopédico',
          price: '$950.00',
        },
        {
          id: '24',
          imgSrc: 'https://placehold.co/150x150/E74C3C/ffffff?text=Zapato+4',
          description: 'Zapato para diabéticos',
          price: '$1,350.00',
        },
        {
          id: '25',
          imgSrc: 'https://placehold.co/150x150/C0392B/ffffff?text=Zapato+5',
          description: 'Zapato post-operatorio',
          price: '$680.00',
        },
      ],
    },
    rehabilitacion: {
      name: 'Rehabilitación y Fisioterapia',
      description: 'Equipos y productos para rehabilitación y fisioterapia',
      icon: '💪',
      bgColor: 'bg-red-500',
      products: [
        {
          id: '26',
          imgSrc: 'https://placehold.co/150x150/E74C3C/ffffff?text=Masajeador',
          description: 'Masajeador percutor',
          price: '$1,200.00',
        },
        {
          id: '27',
          imgSrc: 'https://placehold.co/150x150/C0392B/ffffff?text=Electroestimulador',
          description: 'Electroestimulador TENS',
          price: '$950.00',
        },
        {
          id: '28',
          imgSrc: 'https://placehold.co/150x150/8E44AD/ffffff?text=Bandas',
          description: 'Bandas de resistencia (kit)',
          price: '$450.00',
        },
        {
          id: '29',
          imgSrc: 'https://placehold.co/150x150/2C3E50/ffffff?text=Aceite',
          description: 'Aceites ortopédicos',
          price: '$300.00',
        },
        {
          id: '30',
          imgSrc: 'https://placehold.co/150x150/1ABC9C/ffffff?text=Compresor',
          description: 'Compresor de frío/calor',
          price: '$580.00',
        },
      ],
    },
    pediatria: {
      name: 'Ortopedia Pediátrica',
      description: 'Productos especializados para niños y adolescentes',
      icon: '👶',
      bgColor: 'bg-pink-500',
      products: [
        {
          id: '31',
          imgSrc: 'https://placehold.co/150x150/E91E63/ffffff?text=Zapato+Niño',
          description: 'Zapato ortopédico infantil',
          price: '$980.00',
        },
        {
          id: '32',
          imgSrc: 'https://placehold.co/150x150/AD1457/ffffff?text=Plantilla+Niño',
          description: 'Plantilla pediátrica a medida',
          price: '$700.00',
        },
        {
          id: '33',
          imgSrc: 'https://placehold.co/150x150/880E4F/ffffff?text=Férula+Niño',
          description: 'Férula infantil para displasia',
          price: '$1,500.00',
        },
        {
          id: '34',
          imgSrc: 'https://placehold.co/150x150/FF4081/ffffff?text=Rodillera+Niño',
          description: 'Rodillera pediátrica',
          price: '$420.00',
        },
        {
          id: '35',
          imgSrc: 'https://placehold.co/150x150/F50057/ffffff?text=Calzado+Niño',
          description: 'Calzado deportivo infantil',
          price: '$850.00',
        },
      ],
    },
  };

  const currentCategory = categories[categorySlug];

  // Función para filtrar y ordenar productos
  const getFilteredAndSortedProducts = () => {
    if (!currentCategory) return [];

    let products = currentCategory.products;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      products = products.filter((product) =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filtrar por wishlist
    if (showWishlistOnly) {
      products = products.filter((product) => wishlist.includes(product.id));
    }

    // Ordenar productos
    switch (sortBy) {
      case 'price-low':
        return products.sort(
          (a, b) =>
            parseFloat(a.price.replace('$', '').replace(',', '')) -
            parseFloat(b.price.replace('$', '').replace(',', '')),
        );
      case 'price-high':
        return products.sort(
          (a, b) =>
            parseFloat(b.price.replace('$', '').replace(',', '')) -
            parseFloat(a.price.replace('$', '').replace(',', '')),
        );
      case 'name':
        return products.sort((a, b) => a.description.localeCompare(b.description));
      default:
        return products;
    }
  };

  const handleAddToWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  };

  const productosMostrados = getFilteredAndSortedProducts();

  // This should be outside the component or memoized
  const categoryImages = {
    plantillas: '/images/banners/Plantillas categoria.png',
    fajas: '/images/banners/Fajas Categoria.png',
    ortesis: '/images/banners/Rodillera categorias.png',
    calzado: '/images/banners/Calzado categoria.png',
    rehabilitacion: '/images/banners/Movilidad categoria.png',
    pediatria: '/images/banners/Pediatria categoria.png',
  };

  if (!currentCategory) {
    return (
      <StoreLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoría no encontrada</h1>
            <p className="text-gray-600 mb-6">La categoría que buscas no existe.</p>
            <Link
              href="/tienda"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </StoreLayout>
    );
  }

  return (
    <MarketingLayout>
      <div className="bg-gray-50">
        {/* Encabezado de la Categoría */}
        <div
          className="relative bg-cover bg-center py-24 px-4 sm:px-6 lg:px-8"
          style={{ backgroundImage: `url(${categoryImages[categorySlug]})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
          <div className="relative z-10 text-center text-white">
            <h1 className="text-5xl font-extrabold tracking-tight">{currentCategory.name}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl">{currentCategory.description}</p>
          </div>
        </div>

        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-300 mb-6">
            <Link href="/tienda" className="hover:text-white/90">
              Tienda
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">{currentCategory.name}</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar de Filtros */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Filtros</h2>
                {/* Search */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full border-2 border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Sorting */}
                <div className="mb-6">
                  <label htmlFor="sort-by" className="block text-lg font-semibold mb-2">
                    Ordenar por
                  </label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="default">Recomendados</option>
                    <option value="price-low">Precio: Menor a Mayor</option>
                    <option value="price-high">Precio: Mayor a Menor</option>
                    <option value="name">Nombre A-Z</option>
                  </select>
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => setShowWishlistOnly(!showWishlistOnly)}
                  className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-semibold text-lg transition-colors ${
                    showWishlistOnly
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Favoritos ({wishlist.length})
                </button>
              </div>
            </aside>

            {/* Grilla de Productos */}
            <main className="lg:col-span-3">
              {searchTerm && (
                <div className="mb-6 text-lg text-gray-600">Resultados para "{searchTerm}"</div>
              )}
              {productosMostrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {productosMostrados.map((producto, index) => (
                    <ProductCard
                      key={index}
                      imgSrc={producto.imgSrc}
                      description={producto.description}
                      price={producto.price}
                      action="Agregar al Carrito"
                      productId={producto.id}
                      onWishlistToggle={handleAddToWishlist}
                      isInWishlist={wishlist.includes(producto.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    No se encontraron productos
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Intenta con otros términos de búsqueda
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
                  >
                    Limpiar búsqueda
                  </button>
                </div>
              )}
            </main>
          </div>
          {/* Otras categorías */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Explora otras categorías</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(categories).map(([slug, category]) => (
                <Link
                  key={slug}
                  href={`/categoria/${slug}`}
                  className={`group bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3 hover:shadow-md transition-all ${slug === categorySlug ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <div
                    className="w-10 h-10 rounded-md bg-gray-100 bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${categoryImages[slug]})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{category.name}</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
