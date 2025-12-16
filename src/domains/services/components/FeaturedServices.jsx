import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ChevronRightIcon = ({ className }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function FeaturedServices() {
  const scrollContainerRef = React.useRef(null);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [maxScroll, setMaxScroll] = React.useState(0);

  const services = [
    {
      title: 'Plantillas Ortopédicas Personalizadas',
      image: '/images/banners/plantillas-personalizadas-fd.png',
      description:
        'Diseño personalizado para cada pie con tecnología avanzada y materiales de alta calidad',
      category: 'Plantillas',
    },
    {
      title: 'Órtesis de Rodilla',
      image: '/images/banners/ortesis-rodilla-fd.png',
      description:
        'Dispositivos para estabilización y protección articular con materiales de última generación',
      category: 'Ortesis',
    },
    {
      title: 'Prótesis Personalizadas',
      image: '/images/banners/tecnico-ajustando-protesis-fd.png',
      description: 'Fabricación y adaptación de prótesis personalizadas con tecnología avanzada',
      category: 'Prótesis',
    },
    {
      title: 'Rehabilitación de Lesiones Deportivas',
      image: '/images/banners/lesiones-deportivas-fd.png',
      description:
        'Recuperación específica para deportistas de alto rendimiento con técnicas avanzadas',
      category: 'Fisioterapia',
    },
    {
      title: 'Manejo del Dolor de Espalda',
      image: '/images/banners/manejo-integral-dolor-espalda-fd.png',
      description:
        'Terapias especializadas para aliviar el dolor crónico de espalda con enfoque multidisciplinario',
      category: 'Dolor Crónico',
    },
    {
      title: 'Rehabilitación Pediátrica',
      image: '/images/banners/NiñoPiePlanoFlatDesign.png',
      description: 'Corrige a tiempo problemas de marcha, postura o pie plano en niñas y niños',
      category: 'Pediatría',
    },
    {
      title: 'Calzado Ortopédico',
      image: '/images/banners/calzado-ortopedico-fd.png',
      description: 'Zapatos especializados diseñados para diferentes necesidades ortopédicas',
      category: 'Calzado',
    },
    {
      title: 'Férulas y Soportes',
      image: '/images/banners/ferulas-soportes-fd.png',
      description: 'Inmovilización y soporte terapéutico adaptado a cada necesidad específica',
      category: 'Ortesis',
    },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
      setMaxScroll(scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth);
    }
  };

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateScroll = () => {
      if (scrollContainerRef.current) {
        const max = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
        setMaxScroll(max);
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };

    updateScroll();
    window.addEventListener('resize', updateScroll);
    return () => window.removeEventListener('resize', updateScroll);
  }, []);

  // Soporte mejorado para gestos táctiles (swipe)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;

    const handleTouchStart = (e) => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleTouchMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Velocidad del scroll
      container.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      isDown = false;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section
      id="servicios-destacados"
      aria-labelledby="servicios-destacados-heading"
      className="py-20 relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100 rounded-full opacity-15 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
            <span
              className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"
              style={{ transform: 'translateY(1px)' }}
            ></span>
            Servicios Destacados
          </span>
          <h2
            id="servicios-destacados-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Nuestros Servicios Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra gama completa de servicios especializados diseñados para mejorar tu
            movilidad y calidad de vida.
          </p>
        </div>
        <div className="relative">
          {/* Contenedor principal con gradientes de fade */}
          <div className="relative">
            {/* Gradiente izquierdo */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none transition-opacity duration-300 ${
                scrollPosition > 0 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background: 'linear-gradient(to right, rgba(255,255,255,0.95), transparent)',
              }}
            />

            {/* Gradiente derecho */}
            <div
              className={`absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none transition-opacity duration-300 ${
                scrollPosition < maxScroll ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background: 'linear-gradient(to left, rgba(255,255,255,0.95), transparent)',
              }}
            />

            {/* Flecha Izquierda */}
            <button
              onClick={() => scroll('left')}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 transform hover:scale-110 border border-gray-200 touch-manipulation ${
                scrollPosition > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Scroll Left"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-700 transform rotate-180" />
            </button>

            {/* Contenedor del Scroll */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto px-4 py-8 snap-x snap-mandatory scroll-smooth touch-pan-x scroll-pl-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-x',
                overscrollBehaviorX: 'contain',
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-white/95 backdrop-blur-sm border border-gray-200/80 hover:border-blue-300/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0 w-80 snap-center flex flex-col group h-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={service.image}
                      alt={`${service.title} - ${service.description}`}
                      fill
                      quality={95}
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover image-smooth transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-2">
                        {service.category}
                      </span>
                      <h3 className="font-bold text-lg text-gray-900 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                      {service.description}
                    </p>
                    <button className="mt-auto w-full py-3 rounded-xl bg-gray-50 text-gray-700 font-semibold flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group-hover:shadow-md text-sm">
                      Más Información
                      <ChevronRightIcon className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Flecha Derecha */}
            <button
              onClick={() => scroll('right')}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 transform hover:scale-110 border border-gray-200 touch-manipulation ${
                scrollPosition < maxScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Scroll Right"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Indicador de Scroll Elegante */}
          <div className="mt-8 flex justify-center">
            <div className="relative">
              {/* Barra de progreso de fondo */}
              <div className="w-48 h-1.5 bg-gray-200/30 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400/40 to-indigo-500/40 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: maxScroll > 0 ? `${(scrollPosition / maxScroll) * 100}%` : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
