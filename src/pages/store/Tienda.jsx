import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/layout/Layout';

export default function Tienda() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Juan Pérez',
    email: 'juan@email.com',
    points: 1250,
  });

  // Carrusel state
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselSlides = [
    {
      id: 1,
      image: '/images/banners/Área de Productos OrtopédicosFD.png',
      title: 'Productos Ortopédicos de Calidad',
      subtitle: 'Encuentra la solución perfecta para tu movilidad',
      cta: 'Explorar Productos',
      bgGradient: 'from-blue-600/80 to-indigo-700/80',
      fallbackColor: 'bg-blue-600',
    },
    {
      id: 2,
      image: '/images/banners/Plantillas PersonalizadasFD.png',
      title: 'Plantillas Personalizadas',
      subtitle: 'Diseñadas específicamente para tus necesidades',
      cta: 'Solicitar Evaluación',
      bgGradient: 'from-green-600/80 to-emerald-700/80',
      fallbackColor: 'bg-green-600',
    },
    {
      id: 3,
      image: '/images/banners/Calzado OrtopédicoFD.png',
      title: 'Calzado Ortopédico Especializado',
      subtitle: 'Comodidad y soporte para cada paso',
      cta: 'Ver Colección',
      bgGradient: 'from-purple-600/80 to-violet-700/80',
      fallbackColor: 'bg-purple-600',
    },
    {
      id: 4,
      image: '/images/banners/Fajas y SoportesFD.png',
      title: 'Fajas y Soportes Terapéuticos',
      subtitle: 'Alivio y estabilidad para tu bienestar',
      cta: 'Descubrir Más',
      bgGradient: 'from-orange-600/80 to-red-700/80',
      fallbackColor: 'bg-orange-600',
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Layout>
      {/* Hero Carrusel */}
      <section className="relative h-[70vh] overflow-hidden bg-gray-900">
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${carouselSlides[currentSlide].fallbackColor}`}
                style={{
                  backgroundImage: `url(${carouselSlides[currentSlide].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${carouselSlides[currentSlide].bgGradient} to-transparent`}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-2xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <div className="inline-flex items-center px-6 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 shadow-lg">
                        <span
                          className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"
                          style={{ transform: 'translateY(1px)' }}
                        ></span>
                        Tienda Ortopédica - Slide {currentSlide + 1}
                      </div>
                      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                        {carouselSlides[currentSlide].title}
                      </h1>
                      <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                        {carouselSlides[currentSlide].subtitle}
                      </p>
                      <motion.button
                        className="bg-white text-gray-900 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {carouselSlides[currentSlide].cta}
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Cuenta */}
      <section className="py-16 bg-gradient-to-br from-blue-100 via-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                Mi Cuenta
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Bienvenido a tu Tienda</h1>
              <p className="text-xl text-gray-700">
                Gestiona tu cuenta y descubre ofertas exclusivas
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Información del Usuario */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                    {userInfo.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{userInfo.name}</h3>
                    <p className="text-sm text-gray-600">{userInfo.email}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Puntos de Fidelidad</span>
                    <span className="text-lg font-bold text-blue-600">{userInfo.points}</span>
                  </div>
                </div>
              </motion.div>

              {/* Acciones Rápidas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    <span>🛒</span>
                    <span>Ver Carrito</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    <span>📋</span>
                    <span>Mis Pedidos</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    <span>❤️</span>
                    <span>Favoritos</span>
                  </button>
                </div>
              </motion.div>

              {/* Ofertas Especiales */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 shadow-lg border border-orange-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white mr-3">
                    <span className="text-lg">🎁</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Ofertas Especiales</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <p className="text-sm font-medium text-gray-900">Descuento del 15%</p>
                    <p className="text-xs text-gray-600">En tu próxima compra</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <p className="text-sm font-medium text-gray-900">Envío Gratis</p>
                    <p className="text-xs text-gray-600">Compras mayores a $1,500</p>
                  </div>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                    Ver Todas las Ofertas
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección adicional de productos destacados */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-black text-center mb-12">Productos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Plantillas Deportivas',
                price: '$1,200',
                image: 'https://placehold.co/400x300/007BFF/FFFFFF?text=Plantillas+Deportivas',
              },
              {
                name: 'Rodillera Elástica',
                price: '$800',
                image: 'https://placehold.co/400x300/00BCD4/FFFFFF?text=Rodillera+Elástica',
              },
              {
                name: 'Faja Lumbar',
                price: '$950',
                image: 'https://placehold.co/400x300/1E40AF/FFFFFF?text=Faja+Lumbar',
              },
              {
                name: 'Calzado Ortopédico',
                price: '$2,500',
                image: 'https://placehold.co/400x300/6366F1/FFFFFF?text=Calzado+Ortopédico',
              },
            ].map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-blue-600 font-bold text-xl">{product.price}</p>
                  <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
