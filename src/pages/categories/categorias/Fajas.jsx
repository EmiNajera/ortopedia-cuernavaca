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

export default function Fajas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  const products = [
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
    {
      id: '111',
      imgSrc: 'https://placehold.co/150x150/2ECC71/ffffff?text=Faja+6',
      description: 'Faja para hernia',
      price: '$680.00',
    },
    {
      id: '112',
      imgSrc: 'https://placehold.co/150x150/3498DB/ffffff?text=Faja+7',
      description: 'Faja postoperatoria',
      price: '$920.00',
    },
    {
      id: '113',
      imgSrc: 'https://placehold.co/150x150/8E44AD/ffffff?text=Faja+8',
      description: 'Faja de compresión',
      price: '$550.00',
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
        <div className="bg-green-500 text-white p-8 rounded-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">🩹 Fajas y Soporte Lumbar</h1>
              <p className="text-xl opacity-90 mb-4">
                Fajas ortopédicas para diferentes partes del cuerpo. Soporte lumbar, abdominal,
                torácico y pélvico para tu bienestar.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span>📦 {products.length} productos</span>
                <span>⭐ 4.7/5 calificación</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Por qué elegir nuestras fajas?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-semibold mb-2">Protección</h3>
              <p className="text-gray-600">Protegen y estabilizan la zona afectada</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-2">Especializadas</h3>
              <p className="text-gray-600">Diseñadas para necesidades específicas</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">😌</div>
              <h3 className="font-semibold mb-2">Confort</h3>
              <p className="text-gray-600">Materiales suaves y transpirables</p>
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
                  placeholder="Buscar fajas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
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
              href="/categoria/ortesis"
              className="bg-purple-500 text-white p-4 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">🦴</div>
              <h3 className="font-medium text-sm mb-1">Ortesis</h3>
              <p className="text-xs opacity-80">5 productos</p>
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
