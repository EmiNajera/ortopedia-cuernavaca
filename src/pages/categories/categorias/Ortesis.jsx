import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../../components/layout/Layout';
import { motion } from 'framer-motion';
import { openWhatsApp } from '../../../utils/whatsapp';

const ProductCard = ({
  imgSrc,
  description,
  price,
  action = 'Agregar al Carrito',
  productId = '1',
  onWishlistToggle,
  isInWishlist,
}) => (
  <div className="flex-shrink-0 w-48 bg-white border border-gray-200 rounded-lg shadow-md text-center p-4 m-2 transform hover:scale-105 transition-transform duration-200 relative">
    {/* Wishlist Button */}
    <button
      className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
      onClick={(e) => {
        e.stopPropagation();
        onWishlistToggle(productId);
      }}
    >
      <svg
        className={`w-4 h-4 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-600'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>

    <img
      src={imgSrc}
      alt={description}
      className="h-32 mx-auto mb-2 object-contain cursor-pointer"
      onClick={() => (window.location.href = `/producto/${productId}`)}
    />
    <p
      className="text-sm text-gray-700 h-16 font-medium cursor-pointer hover:text-blue-600"
      onClick={() => (window.location.href = `/producto/${productId}`)}
    >
      {description}
    </p>
    {price && <p className="text-lg font-bold text-blue-900">{price}</p>}
    <button
      className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      onClick={() => {
        if (action === 'Agregar al Carrito') {
          alert(`Producto "${description}" agregado al carrito`);
        } else if (action === 'Agendar Cita') {
          openWhatsApp();
        } else {
          alert(`Función ${action} en desarrollo`);
        }
      }}
    >
      {action}
    </button>
  </div>
);

export default function Ortesis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  const products = [
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
    {
      id: '121',
      imgSrc: 'https://placehold.co/150x150/E67E22/ffffff?text=Ortesis+1',
      description: 'Ortesis de hombro',
      price: '$580.00',
    },
    {
      id: '122',
      imgSrc: 'https://placehold.co/150x150/95A5A6/ffffff?text=Ortesis+2',
      description: 'Ortesis de cadera',
      price: '$720.00',
    },
    {
      id: '123',
      imgSrc: 'https://placehold.co/150x150/34495E/ffffff?text=Ortesis+3',
      description: 'Ortesis de columna',
      price: '$890.00',
    },
  ];

  const getFilteredAndSortedProducts = () => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesWishlist = !showWishlistOnly || wishlist.includes(product.id);
      return matchesSearch && matchesWishlist;
    });

    switch (sortBy) {
      case 'price-asc':
        return filtered.sort(
          (a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')),
        );
      case 'price-desc':
        return filtered.sort(
          (a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')),
        );
      case 'name':
        return filtered.sort((a, b) => a.description.localeCompare(b.description));
      default:
        return filtered;
    }
  };

  const handleAddToWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  };

  const productosMostrados = getFilteredAndSortedProducts();

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Header de la categoría */}
        <div className="bg-purple-500 text-white p-8 rounded-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">🦴 Ortesis y Rodilleras</h1>
              <p className="text-xl opacity-90 mb-4">
                Ortesis para rodillas, tobillos y otras articulaciones. Soporte especializado para
                recuperación y prevención de lesiones.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span>📦 {products.length} productos</span>
                <span>⭐ 4.9/5 calificación</span>
                <span>🚚 Envío gratis</span>
              </div>
            </div>
            <Link
              href="/tienda"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Volver a tienda
            </Link>
          </div>
        </div>

        {/* Información de la categoría */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir nuestras ortesis?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold mb-2">Recuperación</h3>
              <p className="text-gray-600">Aceleran el proceso de recuperación</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-semibold mb-2">Prevención</h3>
              <p className="text-gray-600">Previenen futuras lesiones</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">Movilidad</h3>
              <p className="text-gray-600">Mantienen la movilidad natural</p>
            </div>
          </div>
        </div>

        {/* Controles de búsqueda y filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Buscar ortesis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="default">Recomendados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Nombre A-Z</option>
              </select>

              <button
                onClick={() => setShowWishlistOnly(!showWishlistOnly)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showWishlistOnly
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ❤️ Favoritos ({wishlist.length})
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Mostrando {productosMostrados.length} de {products.length} productos
            {searchTerm && ` para "${searchTerm}"`}
          </div>
        </div>

        {/* Productos */}
        {productosMostrados.length > 0 ? (
          <div className="flex overflow-x-auto pb-4 -mx-2">
            {productosMostrados.map((producto, index) => (
              <ProductCard
                key={producto.id}
                imgSrc={producto.imgSrc}
                description={producto.description}
                price={producto.price}
                productId={producto.id}
                onWishlistToggle={handleAddToWishlist}
                isInWishlist={wishlist.includes(producto.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 mb-4">Intenta ajustar tus filtros de búsqueda</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setShowWishlistOnly(false);
                setSortBy('default');
              }}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Navegación entre categorías */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Otras categorías</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link
              href="/categoria/plantillas"
              className="bg-blue-500 text-white p-4 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">👣</div>
              <h3 className="font-medium text-sm mb-1">Plantillas</h3>
              <p className="text-xs opacity-80">8 productos</p>
            </Link>
            <Link
              href="/categoria/fajas"
              className="bg-green-500 text-white p-4 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">🩹</div>
              <h3 className="font-medium text-sm mb-1">Fajas</h3>
              <p className="text-xs opacity-80">8 productos</p>
            </Link>
            <Link
              href="/categoria/calzado"
              className="bg-orange-500 text-white p-4 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">👟</div>
              <h3 className="font-medium text-sm mb-1">Calzado</h3>
              <p className="text-xs opacity-80">5 productos</p>
            </Link>
            <Link
              href="/categoria/rehabilitacion"
              className="bg-red-500 text-white p-4 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">💪</div>
              <h3 className="font-medium text-sm mb-1">Rehabilitación</h3>
              <p className="text-xs opacity-80">5 productos</p>
            </Link>
            <Link
              href="/categoria/pediatria"
              className="bg-pink-500 text-white p-4 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">👶</div>
              <h3 className="font-medium text-sm mb-1">Pediatría</h3>
              <p className="text-xs opacity-80">5 productos</p>
            </Link>
            <Link
              href="/tienda"
              className="bg-gray-500 text-white p-4 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">🏪</div>
              <h3 className="font-medium text-sm mb-1">Ver todo</h3>
              <p className="text-xs opacity-80">Tienda completa</p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
