import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StoreLayout from '@layouts/StoreLayout';
import { useProducts } from '@store/domain/products/useProducts';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';

// ProductCard component mejorado para ofertas
const ProductCard = ({ product }) => {
  const mainImage = product?.images?.[0] || '/images/products/placeholder.svg';
  const productTitle = product?.title || 'Producto';
  const productBrand = product?.brand || 'Sin marca';
  const productId = product?.id || product?.slug || '1';
  const discount = product?.discount || 0;

  return (
    <div className="group bg-white border border-gray-200/60 rounded-2xl shadow-sm text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden backdrop-blur-sm">
      {/* Imagen Container */}
      <div
        className="relative aspect-square w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden cursor-pointer"
        onClick={() => (window.location.href = `/producto/${productId}`)}
      >
        <Image
          src={mainImage}
          alt={productTitle}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={false}
        />
        {/* Badge de descuento destacado */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-br from-red-500 to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10 animate-pulse">
            -{discount}% OFF
          </div>
        )}
        {/* Badge de marca */}
        {productBrand && productBrand !== 'Sin marca' && (
          <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
            {productBrand}
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/5 group-hover:via-black/0 group-hover:to-black/0 transition-all duration-300"></div>
      </div>

      {/* Contenido */}
      <div className="p-4 sm:p-5 lg:p-6 space-y-3">
        {/* Título */}
        <h3
          className="text-sm sm:text-base font-semibold text-gray-900 h-12 sm:h-14 cursor-pointer hover:text-blue-600 line-clamp-2 leading-tight transition-colors"
          onClick={() => (window.location.href = `/producto/${productId}`)}
        >
          {productTitle}
        </h3>

        {/* Marca */}
        <div className="space-y-2">
          {productBrand && productBrand !== 'Sin marca' && (
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
                {productBrand}
              </span>
            </div>
          )}
        </div>

        {/* Botón */}
        <button
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md hover:shadow-lg transform hover:scale-[1.02] min-h-[44px] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100"
          onClick={() => {
            openWhatsApp(
              undefined,
              `Hola, me interesa esta oferta: ${productTitle}${productBrand && productBrand !== 'Sin marca' ? ` (Marca: ${productBrand})` : ''}${discount > 0 ? ` (${discount}% de descuento)` : ''}`,
            );
          }}
        >
          Consultar Oferta
        </button>
      </div>
    </div>
  );
};

export default function OfertasPage() {
  const [sortBy, setSortBy] = useState('discount'); // Ordenar por descuento por defecto
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener todos los productos y filtrar solo los que tienen descuento
  const { products: allProducts, loading, error } = useProducts({});

  // Filtrar productos con descuento
  const ofertas = useMemo(() => {
    if (!allProducts) return [];
    return allProducts.filter((product) => product.discount > 0);
  }, [allProducts]);

  // Filtrar y ordenar ofertas
  const filteredOfertas = useMemo(() => {
    let filtered = [...ofertas];

    // Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term) ||
          product.brand?.toLowerCase().includes(term),
      );
    }

    // Ordenar
    switch (sortBy) {
      case 'discount':
        return filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      case 'price-low':
        return filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high':
        return filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'name':
        return filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      default:
        return filtered;
    }
  }, [ofertas, searchTerm, sortBy]);

  return (
    <>
      <Head>
        <title>Ofertas Especiales | Ortopedia Cuernavaca</title>
        <meta
          name="description"
          content="Descubre nuestras ofertas especiales en productos ortopédicos. Descuentos exclusivos en plantillas, fajas, soportes y más."
        />
        <meta
          name="keywords"
          content="ofertas, descuentos, productos ortopédicos, rebajas, Cuernavaca"
        />
      </Head>

      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 rounded-full w-fit mx-auto mb-6 shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 self-center"></div>
                <span className="text-sm font-semibold text-gray-700 leading-none">
                  Fisioterapia y Rehabilitación
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
              >
                Ofertas Especiales
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6"
              >
                Aprovecha nuestros descuentos exclusivos en productos ortopédicos de calidad
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="inline-block bg-white text-red-600 px-6 py-3 rounded-full font-bold text-lg shadow-lg"
              >
                Hasta {ofertas.length > 0 ? Math.max(...ofertas.map((p) => p.discount || 0)) : 0}%
                de descuento
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filtros y Búsqueda */}
        <section className="bg-gray-50 py-6 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Búsqueda */}
              <div className="flex-1 w-full sm:max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar ofertas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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

              {/* Ordenar */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-2 border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="discount">Mayor descuento</option>
                  <option value="price-low">Precio: menor a mayor</option>
                  <option value="price-high">Precio: mayor a menor</option>
                  <option value="name">Nombre A-Z</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Productos en Oferta */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Cargando ofertas...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600 mb-4">Error al cargar ofertas: {error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Reintentar
                </button>
              </div>
            ) : filteredOfertas.length > 0 ? (
              <>
                <div className="mb-8">
                  <p className="text-gray-600">
                    Encontradas{' '}
                    <span className="font-bold text-red-600">{filteredOfertas.length}</span> ofertas
                    especiales
                  </p>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                  {filteredOfertas.map((producto, index) => (
                    <motion.div
                      key={producto.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <ProductCard product={producto} />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <svg
                    className="mx-auto h-24 w-24 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No hay ofertas disponibles
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm
                      ? 'No se encontraron ofertas con ese término de búsqueda.'
                      : 'Por el momento no hay productos en oferta. Vuelve pronto para ver nuestras promociones especiales.'}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Limpiar búsqueda
                    </button>
                  )}
                  <Link
                    href="/tienda"
                    className="inline-block mt-4 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Ver todos los productos
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

OfertasPage.getLayout = function getLayout(page) {
  return <StoreLayout>{page}</StoreLayout>;
};
