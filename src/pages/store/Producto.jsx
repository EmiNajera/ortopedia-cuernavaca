import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { openWhatsApp } from '../../utils/whatsapp';
import { getProductById } from '../../data/products.config';

// Main Product Component
export default function Producto() {
  const router = useRouter();
  const { productId } = router.query;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Obtener producto desde el config
  const producto = getProductById(productId) || {
    id: productId || '1',
    title: 'Producto no encontrado',
    brand: 'Ortopedia Cuernavaca',
    description: 'Este producto no está disponible en este momento.',
    price: 0,
    currency: 'MXN',
    image: '/images/products/soporte.svg',
    fallbackImage: '/images/products/soporte.svg',
    availability: 'No disponible',
    category: 'ortesis',
    variants: [],
  };

  // Generar galería de imágenes (imagen principal + variantes si existen)
  const imagenes = [
    producto.image,
    ...(producto.variants?.map(
      (_, index) => `${producto.image.replace('.jpg', `-${index + 1}.jpg`)}`,
    ) || []),
  ].filter(Boolean);

  // Datos adicionales para la ficha del producto
  const beneficios = [
    'Materiales de alta calidad',
    'Diseño ergonómico',
    'Fácil de usar',
    'Durabilidad garantizada',
    'Soporte especializado',
  ];

  const instrucciones =
    'Consulta con nuestro especialista para una evaluación completa. Productos fabricados específicamente para tus necesidades.';
  const advertencias =
    'Producto de uso personal. Mantener limpio y seco. Consultar con especialista antes del uso si tienes condiciones médicas específicas.';
  const especificaciones = {
    Marca: producto.brand,
    Modelo: producto.model || 'N/A',
    Categoría: producto.category,
    Disponibilidad: producto.availability,
    Garantía: '1 año',
  };

  const handleQuantityChange = (increment) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hola, me interesa el producto: ${producto.title} (${producto.brand}) - $${producto.price} MXN. Cantidad: ${quantity}. ¿Podrían darme más información sobre disponibilidad y envío?`;
    openWhatsApp(message);
  };

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
    alert(isInWishlist ? 'Removido de favoritos' : 'Agregado a favoritos');
  };

  return (
    <div className="bg-white font-sans">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-xs py-2 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={() => openWhatsApp()} className="hover:underline text-white">
            Agendar consulta
          </button>
          <a
            href="#"
            className="hover:underline"
            onClick={(e) => {
              e.preventDefault();
              alert('Sistema de facturación en desarrollo');
            }}
          >
            Facturación
          </a>
          <Link href="/nosotros" className="hover:underline">
            Ortopedia Cuernavaca
          </Link>
          <Link href="/contacto" className="hover:underline">
            Contáctanos
          </Link>
        </div>
        <div className="flex items-center space-x-4 font-semibold">
          <span>Ortopedia Cuernavaca: 777 311 2867</span>
          <span className="hidden md:inline">·</span>
          <span>Ortochavitos: 777 311 9837</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md py-4 px-4 md:px-8 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/tienda" className="text-2xl font-bold text-gray-900">
            Ortopedia Cuernavaca
          </Link>
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos, servicios o especialidades..."
                className="w-full border-2 border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // Aquí puedes implementar la funcionalidad de búsqueda
                    alert('Función de búsqueda en desarrollo');
                  }
                }}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                onClick={() => alert('Función de búsqueda en desarrollo')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/carrito" className="text-center hover:text-blue-600 transition-colors">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 007.53 17h10.94a1 1 0 00.88-.53L21 13M16 21a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
              <p className="text-xs font-medium">Carrito</p>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-200 py-2 px-4 md:px-8 border-t border-b border-gray-300">
        <div className="container mx-auto flex justify-center items-center space-x-4 md:space-x-6 text-sm font-semibold text-blue-900 overflow-x-auto whitespace-nowrap">
          <Link href="/tienda" className="hover:text-blue-600">
            TODO
          </Link>
          <Link href="/tienda?categoria=plantillas" className="hover:text-blue-600">
            Plantillas
          </Link>
          <Link href="/tienda?categoria=ferulas" className="hover:text-blue-600">
            Férulas
          </Link>
          <Link href="/tienda?categoria=protesis" className="hover:text-blue-600">
            Prótesis
          </Link>
          <Link href="/tienda?categoria=rehabilitacion" className="hover:text-blue-600">
            Rehabilitación
          </Link>
          <Link href="/tienda?categoria=calzado" className="hover:text-blue-600">
            Calzado ortopédico
          </Link>
          <button onClick={() => openWhatsApp()} className="hover:text-blue-600">
            Consulta clínica
          </button>
          <Link href="/about-us" className="text-green-600 font-bold hover:text-green-700">
            AboutUs (TEST)
          </Link>
          <a
            href="#"
            className="text-red-600 font-bold hover:text-red-700"
            onClick={(e) => {
              e.preventDefault();
              alert('Sección de ofertas en desarrollo');
            }}
          >
            Ofertas
          </a>
        </div>
      </nav>

      <main className="p-4 md:p-8">
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>
          <span className="mx-1">&gt;</span>
          <Link href="/tienda" className="hover:underline">
            Tienda
          </Link>
          <span className="mx-1">&gt;</span>
          <Link href={`/tienda?categoria=${producto.category}`} className="hover:underline">
            {producto.category}
          </Link>
          <span className="mx-1">&gt;</span>
          <span>{producto.title}</span>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 justify-center">
              {imagenes.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                    selectedImage === index
                      ? 'border-2 border-blue-600'
                      : 'border border-gray-300 hover:border-blue-600'
                  }`}
                  onClick={() => setSelectedImage(index)}
                  onError={(e) => {
                    e.target.src = producto.fallbackImage || '/images/products/soporte.svg';
                  }}
                />
              ))}
            </div>
            <div className="flex-grow bg-gray-50 p-4 rounded-lg flex items-center justify-center">
              <img
                src={imagenes[selectedImage]}
                alt={producto.title}
                className="max-w-full h-auto max-h-96 object-contain"
                onError={(e) => {
                  e.target.src = producto.fallbackImage || '/images/products/soporte.svg';
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <Link
              href={`/tienda?categoria=${producto.category}`}
              className="text-blue-700 font-semibold text-sm"
            >
              {producto.brand}
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 my-2">{producto.title}</h1>
            <p className="text-gray-600 text-sm mb-4">{producto.description}</p>

            <div className="flex items-center gap-4 my-4">
              <div className="text-4xl font-bold text-blue-600">
                ${producto.price} {producto.currency}
              </div>
              {producto.variants && producto.variants.length > 0 && (
                <div className="text-sm text-gray-500">
                  Variantes disponibles: {producto.variants.map((v) => v.talla).join(', ')}
                </div>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-semibold">{producto.availability}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 my-6">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="px-3 py-2 text-lg hover:bg-gray-100"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <span className="px-4 py-2 font-bold">{quantity}</span>
                <button
                  className="px-3 py-2 text-lg hover:bg-gray-100"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
              <button
                className="flex-1 bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition-colors"
                onClick={handleWhatsAppClick}
              >
                Comprar por WhatsApp
              </button>
              <button
                className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                onClick={handleWishlistToggle}
              >
                <svg
                  className={`w-6 h-6 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-600'}`}
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
            </div>

            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">
                Para conocer la disponibilidad del producto ingresa tu{' '}
                <a href="#" className="text-blue-700 underline">
                  código postal
                </a>
                .
              </p>
              <a href="#" className="text-blue-700 underline">
                Calcula el costo de envío
              </a>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-12 border-t pt-8">
          <div className="border-b mb-6">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Descripción' },
                { id: 'specifications', label: 'Especificaciones' },
                { id: 'instructions', label: 'Instrucciones' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{producto.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Beneficios:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {beneficios.map((beneficio, index) => (
                      <li key={index}>{beneficio}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(especificaciones).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'instructions' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Instrucciones de uso:</h4>
                  <p className="text-gray-700 leading-relaxed">{instrucciones}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Advertencias:</h4>
                  <p className="text-gray-700 leading-relaxed">{advertencias}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Signup */}
        <section className="bg-blue-50 m-4 md:m-8 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <svg
                className="w-10 h-10 text-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  ¡Suscríbete a nuestras mejores ofertas!
                </h3>
                <p className="text-sm text-gray-600">
                  Sé el primero en recibir descuentos exclusivos y beneficios especiales en
                  productos ortopédicos.
                </p>
              </div>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                Suscríbete
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
