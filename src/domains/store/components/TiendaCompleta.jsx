import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';
import { FaSearch, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useProducts } from '@store/domain/products/useProducts';

// Card para productos optimizada para grid responsive - Diseño mejorado y más estético
// Acepta tanto objeto product como props individuales para compatibilidad
const ProductCard = ({ product, imgSrc, description, price, productId, action }) => {
  // Formatear precio
  const formatPrice = (price) => {
    if (typeof price === 'string' && price.includes('$')) {
      return price; // Ya está formateado
    }
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Compatibilidad: si viene product, usar product; si no, usar props individuales
  const mainImage =
    product?.images?.[0] || imgSrc || '/images/products/Ortopedia Cuernavaca Logo.svg';
  const productTitle = product?.title || description || 'Producto';
  const productBrand = product?.brand || 'Sin marca';
  const finalProductId = product?.id || product?.slug || productId || '1';
  const buttonText = action || 'Consultar Disponibilidad';

  return (
    <div className="group bg-white border border-gray-200/60 rounded-2xl shadow-sm text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden backdrop-blur-sm">
      {/* Imagen Container con mejor diseño */}
      <div
        className="relative aspect-square w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden cursor-pointer"
        onClick={() => (window.location.href = `/producto/${finalProductId}`)}
      >
        <Image
          src={mainImage}
          alt={productTitle}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          priority={false}
        />
        {/* Badge de marca */}
        {productBrand && productBrand !== 'Sin marca' && (
          <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
            {productBrand}
          </div>
        )}
        {/* Overlay mejorado con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/5 group-hover:via-black/0 group-hover:to-black/0 transition-all duration-300"></div>
      </div>

      {/* Contenido mejorado */}
      <div className="p-4 sm:p-5 lg:p-6 space-y-3">
        {/* Título */}
        <h3
          className="text-sm sm:text-base font-semibold text-gray-900 h-12 sm:h-14 cursor-pointer hover:text-blue-600 line-clamp-2 leading-tight transition-colors"
          onClick={() => (window.location.href = `/producto/${finalProductId}`)}
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

        {/* Botón mejorado */}
        <button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transform hover:scale-[1.02] min-h-[44px] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100"
          onClick={() => {
            openWhatsApp(
              undefined,
              `Hola, me interesa obtener más información sobre: ${productTitle}${productBrand && productBrand !== 'Sin marca' ? ` (Marca: ${productBrand})` : ''}`,
            );
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// Centro de Ortopedia y Rehabilitación Física
const RehabilitationCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef(null);

  const categories = [
    { id: 'all', name: 'Todos', color: 'blue' },
    { id: 'equipos', name: 'Equipos', color: 'green' },
    { id: 'terapias', name: 'Terapias', color: 'red' },
    { id: 'evaluacion', name: 'Evaluación', color: 'purple' },
    { id: 'rehabilitacion', name: 'Rehabilitación', color: 'indigo' },
    { id: 'fisioterapia', name: 'Fisioterapia', color: 'orange' },
    { id: 'productos', name: 'Productos', color: 'teal' },
    { id: 'servicios', name: 'Servicios', color: 'pink' },
  ];

  const rehabilitationServices = [
    // EQUIPOS
    {
      service: 'Ultrasonido Terapéutico',
      category: 'equipos',
      description: 'Equipo de ultrasonido para terapia de tejidos profundos',
      keywords: 'ultrasonido, terapia, equipos, rehabilitación, tejidos',
    },
    {
      service: 'Electroestimulación',
      category: 'equipos',
      description: 'Equipos de electroestimulación para fortalecimiento muscular',
      keywords: 'electroestimulación, músculos, equipos, fortalecimiento',
    },
    {
      service: 'Plataforma de Equilibrio',
      category: 'equipos',
      description: 'Sistema de evaluación y entrenamiento del equilibrio',
      keywords: 'equilibrio, plataforma, evaluación, entrenamiento',
    },
    {
      service: 'Mesa de Tracción',
      category: 'equipos',
      description: 'Mesa especializada para tracción cervical y lumbar',
      keywords: 'tracción, mesa, cervical, lumbar, columna',
    },

    // TERAPIAS
    {
      service: 'Terapia Manual',
      category: 'terapias',
      description: 'Técnicas manuales especializadas para alivio del dolor',
      keywords: 'terapia manual, técnicas, dolor, alivio, especializada',
    },
    {
      service: 'Terapia de Calor y Frío',
      category: 'terapias',
      description: 'Aplicación terapéutica de calor y frío para inflamación',
      keywords: 'calor, frío, terapia, inflamación, aplicación',
    },
    {
      service: 'Hidroterapia',
      category: 'terapias',
      description: 'Terapia acuática para rehabilitación y fortalecimiento',
      keywords: 'hidroterapia, agua, acuática, rehabilitación',
    },
    {
      service: 'Laserterapia',
      category: 'terapias',
      description: 'Terapia con láser de baja intensidad para cicatrización',
      keywords: 'láser, terapia, cicatrización, baja intensidad',
    },

    // EVALUACIÓN
    {
      service: 'Evaluación Biomecánica',
      category: 'evaluacion',
      description: 'Análisis completo del movimiento y postura corporal',
      keywords: 'biomecánica, evaluación, movimiento, postura, análisis',
    },
    {
      service: 'Evaluación de Marcha',
      category: 'evaluacion',
      description: 'Estudio detallado de la forma de caminar',
      keywords: 'marcha, caminar, evaluación, estudio, análisis',
    },
    {
      service: 'Evaluación Postural',
      category: 'evaluacion',
      description: 'Análisis de la postura corporal y alineación',
      keywords: 'postura, alineación, evaluación, corporal, análisis',
    },
    {
      service: 'Evaluación de Fuerza',
      category: 'evaluacion',
      description: 'Medición de fuerza muscular y resistencia',
      keywords: 'fuerza, muscular, resistencia, medición, evaluación',
    },

    // REHABILITACIÓN
    {
      service: 'Rehabilitación Deportiva',
      category: 'rehabilitacion',
      description: 'Programa especializado para deportistas lesionados',
      keywords: 'deportiva, deportistas, lesiones, programa, especializado',
    },
    {
      service: 'Rehabilitación Neurológica',
      category: 'rehabilitacion',
      description: 'Terapia para pacientes con afectaciones neurológicas',
      keywords: 'neurológica, sistema nervioso, terapia, pacientes',
    },
    {
      service: 'Rehabilitación Pediátrica',
      category: 'rehabilitacion',
      description: 'Terapia especializada para niños y adolescentes',
      keywords: 'pediátrica, niños, adolescentes, terapia, especializada',
    },
    {
      service: 'Rehabilitación Geriátrica',
      category: 'rehabilitacion',
      description: 'Programa de rehabilitación para adultos mayores',
      keywords: 'geriátrica, adultos mayores, programa, rehabilitación',
    },

    // FISIOTERAPIA
    {
      service: 'Fisioterapia Respiratoria',
      category: 'fisioterapia',
      description: 'Técnicas para mejorar la función respiratoria',
      keywords: 'respiratoria, pulmones, función, técnicas, mejorar',
    },
    {
      service: 'Fisioterapia Traumatológica',
      category: 'fisioterapia',
      description: 'Tratamiento de lesiones del sistema musculoesquelético',
      keywords: 'traumatológica, lesiones, musculoesquelético, tratamiento',
    },
    {
      service: 'Fisioterapia Reumatológica',
      category: 'fisioterapia',
      description: 'Terapia para enfermedades reumáticas y artritis',
      keywords: 'reumatológica, artritis, enfermedades, terapia, reumáticas',
    },
    {
      service: 'Fisioterapia Cardiovascular',
      category: 'fisioterapia',
      description: 'Rehabilitación para pacientes cardíacos',
      keywords: 'cardiovascular, cardíaco, rehabilitación, pacientes, corazón',
    },

    // PRODUCTOS
    {
      service: 'Productos de Apoyo',
      category: 'productos',
      description: 'Bastones, muletas y ayudas para la movilidad',
      keywords: 'apoyo, bastones, muletas, movilidad, ayudas',
    },
    {
      service: 'Órtesis Personalizadas',
      category: 'productos',
      description: 'Dispositivos ortopédicos fabricados a medida',
      keywords: 'órtesis, personalizadas, dispositivos, ortopédicos, medida',
    },
    {
      service: 'Plantillas Ortopédicas',
      category: 'productos',
      description: 'Plantillas personalizadas para corrección de pisada',
      keywords: 'plantillas, ortopédicas, pisada, corrección, personalizadas',
    },
    {
      service: 'Calzado Terapéutico',
      category: 'productos',
      description: 'Zapatos especializados para diferentes patologías',
      keywords: 'calzado, terapéutico, zapatos, patologías, especializado',
    },

    // SERVICIOS
    {
      service: 'Consultas Especializadas',
      category: 'servicios',
      description: 'Evaluación médica y terapéutica personalizada',
      keywords: 'consultas, especializadas, médica, terapéutica, personalizada',
    },
    {
      service: 'Programas de Ejercicio',
      category: 'servicios',
      description: 'Rutinas de ejercicio terapéutico supervisado',
      keywords: 'ejercicio, rutinas, terapéutico, supervisado, programas',
    },
    {
      service: 'Educación al Paciente',
      category: 'servicios',
      description: 'Orientación sobre cuidado y prevención',
      keywords: 'educación, paciente, orientación, cuidado, prevención',
    },
    {
      service: 'Seguimiento Continuo',
      category: 'servicios',
      description: 'Monitoreo del progreso y ajustes del tratamiento',
      keywords: 'seguimiento, continuo, monitoreo, progreso, ajustes',
    },
  ];

  // Filtrar servicios basado en categoría y término de búsqueda
  const filteredServices = rehabilitationServices.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      service.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.keywords.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Función para manejar el scroll horizontal
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      setScrollProgress((scrollLeft / (scrollWidth - clientWidth)) * 100);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Verificar estado inicial
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [filteredServices]);

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-8 sm:py-12 lg:py-16 xl:py-20 relative overflow-hidden">
      {/* Elementos decorativos mejorados */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-200 to-purple-300 rounded-full opacity-8 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-100 to-indigo-200 rounded-full opacity-5 blur-2xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header mejorado */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-full mb-4 shadow-lg"
          >
            <span
              className="w-2 h-2 bg-white rounded-full mr-2 sm:mr-3 animate-pulse"
              style={{ transform: 'translateY(1px)' }}
            ></span>
            Centro de Ortopedia y Rehabilitación Física
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight"
          >
            ¿Qué te está molestando?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6"
          >
            En nuestro <strong>Centro de Ortopedia y Rehabilitación Física</strong> te ayudamos a
            recuperar tu bienestar. Somos especialistas en ortopedia y rehabilitación física para
            niños y adultos.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base lg:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            ¿Tienes dolor, lesión o molestia?
            <br />
            Explora tus síntomas o busca un servicio, y te guiaremos hacia el tratamiento más
            adecuado.
          </motion.p>
        </div>

        {/* Buscador mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-sm sm:max-w-md lg:max-w-lg mx-auto mb-6 sm:mb-8"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100">
              <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Buscar servicios, equipos, terapias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-transparent border-0 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </motion.div>

        {/* Filtros de categorías */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-md ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-lg hover:scale-105'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * categories.indexOf(category) }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid de servicios con scroll horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative"
        >
          {/* Botones de navegación */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white"
            >
              <FaChevronLeft className="text-gray-600 hover:text-blue-600 transition-colors" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white"
            >
              <FaChevronRight className="text-gray-600 hover:text-blue-600 transition-colors" />
            </button>
          )}

          {/* Contenedor de scroll */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence>
              {filteredServices.map((item, index) => (
                <motion.div
                  key={`${item.service}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 text-left hover:shadow-xl transition-all duration-300 shadow-md hover:border-blue-300 hover:bg-white/95 overflow-hidden flex-shrink-0 w-72 sm:w-80 snap-center cursor-pointer"
                  onClick={() => {
                    // Aquí podrías agregar lógica para mostrar más detalles o redirigir
                    // Servicio seleccionado: item.service
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      // Servicio seleccionado: item.service
                    }
                  }}
                  aria-label={`Ver información sobre ${item.service}`}
                  role="button"
                  tabIndex={0}
                >
                  {/* Efecto de brillo animado en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* Indicador de categoría */}
                  <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative space-y-2 sm:space-y-3 w-full">
                    <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-blue-700 transition-colors leading-tight">
                      {item.service}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full group-hover:bg-blue-100 transition-colors">
                        {categories.find((cat) => cat.id === item.category)?.name}
                      </span>
                      <div className="text-blue-500 group-hover:text-blue-600 transition-colors">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4"
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
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Indicador de progreso del scroll dinámico */}
          <div className="mt-6 flex justify-center">
            <div className="relative">
              <div className="w-64 h-2 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-100">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-500 rounded-full relative"
                  style={{ width: `${scrollProgress}%` }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8 sm:mt-10 lg:mt-12"
        >
          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
            ¿No encuentras lo que necesitas? Nuestros especialistas pueden ayudarte.
          </p>
          <motion.button
            onClick={() =>
              openWhatsApp(
                '7772150982',
                'Hola, me gustaría obtener más información sobre los servicios del Centro de Ortopedia y Rehabilitación Física.',
              )
            }
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base transform hover:scale-105 min-h-[44px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Consulta Especializada
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default function TiendaCompleta({ categories: dbCategories = [] }) {
  const router = useRouter();
  const categoria = router.query?.categoria;
  const [categoriaActiva, setCategoriaActiva] = useState(categoria || 'all');

  // Mapear categorías de BD al formato esperado, con fallback a config estático
  const productCategories = React.useMemo(() => {
    if (dbCategories && dbCategories.length > 0) {
      // Tomar las primeras 6 categorías más populares
      return dbCategories.slice(0, 6).map((cat) => ({
        name: cat.nombre,
        slug: cat.slug,
        image:
          '/images/banners/' +
          (cat.slug.includes('plantilla')
            ? 'plantillas-categoria.png'
            : cat.slug.includes('faja')
              ? 'fajas-categoria.png'
              : cat.slug.includes('rodillera') ||
                  cat.slug.includes('tobillera') ||
                  cat.slug.includes('muniquera') ||
                  cat.slug.includes('codera')
                ? 'rodillera-categorias.png'
                : cat.slug.includes('calzado') ||
                    cat.slug.includes('zapato') ||
                    cat.slug.includes('tenis')
                  ? 'calzado-categoria.png'
                  : cat.slug.includes('movilidad') ||
                      cat.slug.includes('baston') ||
                      cat.slug.includes('muleta') ||
                      cat.slug.includes('silla') ||
                      cat.slug.includes('andador')
                    ? 'movilidad-categoria.png'
                    : cat.slug.includes('pediatri')
                      ? 'pediatria-categoria.png'
                      : 'plantillas-categoria.png'),
      }));
    }
    // Fallback a categorías estáticas
    return [
      {
        name: 'Plantillas',
        slug: 'plantillas-ortopedicas',
        image: '/images/banners/plantillas-categoria.png',
      },
      { name: 'Fajas', slug: 'fajas', image: '/images/banners/fajas-categoria.png' },
      {
        name: 'Soportes y Ortesis',
        slug: 'rodilleras',
        image: '/images/banners/rodillera-categorias.png',
      },
      {
        name: 'Calzado',
        slug: 'zapatos-ortopedicos',
        image: '/images/banners/calzado-categoria.png',
      },
      { name: 'Movilidad', slug: 'bastones', image: '/images/banners/movilidad-categoria.png' },
      {
        name: 'Pediatría',
        slug: 'productos-pediatricos',
        image: '/images/banners/pediatria-categoria.png',
      },
    ];
  }, [dbCategories]);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Obtener productos desde la API - Asegurar que se actualice cuando cambia la categoría
  const categoryFilter =
    categoriaActiva === 'todos' || categoriaActiva === 'all' || !categoriaActiva
      ? undefined
      : categoriaActiva;

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts({
    category: categoryFilter,
    search: searchTerm || undefined,
    inStock: showWishlistOnly ? undefined : true, // Solo mostrar disponibles si no es wishlist
  });

  // Layout sizing for hero based on reference image (in pixels)
  const HERO_HEIGHT = 400; // altura fija del carrusel

  // Carrusel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const carouselSlides = React.useMemo(
    () => [
      {
        id: 1,
        image: '/images/banners/banner-tienda-1.png',
        title: 'Productos Ortopédicos de Calidad',
        subtitle: 'Encuentra la solución perfecta para tu movilidad',
        cta: 'Explorar Productos',
        bgGradient: 'from-blue-600/40 to-indigo-700/40',
        fallbackColor: 'bg-transparent',
      },
      {
        id: 2,
        image: '/images/banners/banner-tienda-2.png',
        title: 'Plantillas Personalizadas',
        subtitle: 'Diseñadas específicamente para tus necesidades',
        cta: 'Solicitar Evaluación',
        bgGradient: 'from-green-600/40 to-emerald-700/40',
        fallbackColor: 'bg-transparent',
      },
      {
        id: 3,
        image: '/images/banners/banner-tienda-3.png',
        title: 'Calzado Ortopédico Especializado',
        subtitle: 'Comodidad y soporte para cada paso',
        cta: 'Ver Colección',
        bgGradient: 'from-purple-600/40 to-violet-700/40',
        fallbackColor: 'bg-transparent',
      },
      {
        id: 4,
        image: '/images/banners/banner-tienda-4.png',
        title: 'Fajas y Soportes Terapéuticos',
        subtitle: 'Alivio y estabilidad para tu bienestar',
        cta: 'Descubrir Más',
        bgGradient: 'from-orange-600/40 to-red-700/40',
        fallbackColor: 'bg-transparent',
      },
      {
        id: 5,
        image: '/images/banners/banner-tienda-5.png',
        title: 'Productos de Rehabilitación',
        subtitle: 'Equipos profesionales para tu recuperación',
        cta: 'Ver Equipos',
        bgGradient: 'from-teal-600/40 to-cyan-700/40',
        fallbackColor: 'bg-transparent',
      },
    ],
    [],
  );

  // Preload images for better performance
  useEffect(() => {
    carouselSlides.forEach((slide, index) => {
      const imgElement = new window.Image();
      imgElement.onload = () => {
        setLoadedImages((prev) => new Set([...prev, index]));
      };
      imgElement.src = slide.image;
    });
  }, [carouselSlides]);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [carouselSlides.length, isTransitioning]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    setTimeout(() => setIsTransitioning(false), 900);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    setTimeout(() => setIsTransitioning(false), 900);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 900);
  };

  // Actualizar categoría activa cuando cambia la URL
  useEffect(() => {
    if (router.isReady) {
      const categoriaFromUrl = router.query?.categoria;
      if (categoriaFromUrl) {
        setCategoriaActiva(categoriaFromUrl);
      } else {
        setCategoriaActiva('all');
      }
    }
  }, [router.isReady, router.query?.categoria]);

  // Función para filtrar productos por categoría
  const productosPorCategoria = {
    todos: [
      {
        id: '1',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Plantilla',
        description: 'Plantilla para pie plano grado 1',
        price: '$550.00',
      },
      {
        id: '2',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Zapato',
        description: 'Calzado ortopédico infantil',
        price: '$890.00',
      },
      {
        id: '3',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Faja',
        description: 'Faja lumbar con soporte',
        price: '$750.00',
      },
      {
        id: '4',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Muletas',
        description: 'Muletas de aluminio',
        price: '$600.00',
      },
      {
        id: '5',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Silla',
        description: 'Silla de ruedas estándar',
        price: '$2,500.00',
      },
      {
        id: '6',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Plantilla+2',
        description: 'Plantilla para pie plano grado 2',
        price: '$650.00',
      },
      {
        id: '7',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Zapato+2',
        description: 'Calzado ortopédico adulto',
        price: '$1,200.00',
      },
      {
        id: '8',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Faja+2',
        description: 'Faja torácica con varillas',
        price: '$850.00',
      },
      {
        id: '9',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Plantilla+3',
        description: 'Plantilla deportiva personalizada',
        price: '$720.00',
      },
      {
        id: '10',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Zapato+3',
        description: 'Zapato ortopédico para diabéticos',
        price: '$1,350.00',
      },
      {
        id: '11',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Faja+3',
        description: 'Faja post-quirúrgica abdominal',
        price: '$680.00',
      },
      {
        id: '12',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Muletas+2',
        description: 'Muletas de madera ajustables',
        price: '$450.00',
      },
      {
        id: '13',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Silla+2',
        description: 'Silla de ruedas deportiva',
        price: '$3,200.00',
      },
      {
        id: '14',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Plantilla+4',
        description: 'Plantilla para arco alto',
        price: '$580.00',
      },
      {
        id: '15',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Zapato+4',
        description: 'Bota ortopédica de yeso',
        price: '$950.00',
      },
      {
        id: '16',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Faja+4',
        description: 'Faja cervical con soporte',
        price: '$420.00',
      },
      {
        id: '17',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Muletas+3',
        description: 'Muletas de antebrazo',
        price: '$380.00',
      },
      {
        id: '18',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Silla+3',
        description: 'Silla de ruedas eléctrica',
        price: '$8,500.00',
      },
      {
        id: '19',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Plantilla+5',
        description: 'Plantilla de gel refrigerante',
        price: '$320.00',
      },
      {
        id: '20',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Zapato+5',
        description: 'Sandalia ortopédica de verano',
        price: '$780.00',
      },
      {
        id: '21',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Faja+5',
        description: 'Faja para embarazo',
        price: '$520.00',
      },
      {
        id: '22',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Muletas+4',
        description: 'Muletas plegables de viaje',
        price: '$420.00',
      },
      {
        id: '23',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Silla+4',
        description: 'Silla de ruedas pediátrica',
        price: '$1,800.00',
      },
      {
        id: '24',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Plantilla+6',
        description: 'Plantilla para fascitis plantar',
        price: '$480.00',
      },
      {
        id: '25',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Zapato+6',
        description: 'Zapato ortopédico para niños',
        price: '$650.00',
      },
      {
        id: '26',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Faja+6',
        description: 'Faja lumbar deportiva',
        price: '$380.00',
      },
      {
        id: '27',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Muletas+5',
        description: 'Muletas de titanio ligeras',
        price: '$680.00',
      },
      {
        id: '28',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Silla+5',
        description: 'Silla de ruedas de traslado',
        price: '$1,200.00',
      },
      {
        id: '29',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Plantilla+7',
        description: 'Plantilla de carbón activado',
        price: '$350.00',
      },
      {
        id: '30',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Zapato+7',
        description: 'Zapato ortopédico para adultos',
        price: '$1,100.00',
      },
      {
        id: '31',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Faja+7',
        description: 'Faja para hernia inguinal',
        price: '$450.00',
      },
      {
        id: '32',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Muletas+6',
        description: 'Muletas de altura ajustable',
        price: '$520.00',
      },
      {
        id: '33',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Silla+6',
        description: 'Silla de ruedas bariátrica',
        price: '$4,200.00',
      },
      {
        id: '34',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Plantilla+8',
        description: 'Plantilla para juanetes',
        price: '$420.00',
      },
      {
        id: '35',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Zapato+8',
        description: 'Zapato ortopédico para mujeres',
        price: '$980.00',
      },
      {
        id: '36',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Faja+8',
        description: 'Faja post-parto',
        price: '$380.00',
      },
    ],
    plantillas: [
      {
        id: '1',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Plantilla+1',
        description: 'Plantilla para pie plano grado 1',
        price: '$550.00',
      },
      {
        id: '6',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Plantilla+2',
        description: 'Plantilla para pie cavo',
        price: '$650.00',
      },
      {
        id: '7',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Plantilla+3',
        description: 'Plantilla deportiva',
        price: '$450.00',
      },
    ],
    fajas: [
      {
        id: '3',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Faja+1',
        description: 'Faja lumbar con soporte',
        price: '$750.00',
      },
      {
        id: '8',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Faja+2',
        description: 'Faja abdominal postparto',
        price: '$850.00',
      },
      {
        id: '9',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Faja+3',
        description: 'Faja deportiva',
        price: '$650.00',
      },
    ],
    ortesis: [
      {
        id: '10',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Rodillera+1',
        description: 'Rodillera ortopédica',
        price: '$450.00',
      },
      {
        id: '11',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Rodillera+2',
        description: 'Rodillera deportiva',
        price: '$350.00',
      },
      {
        id: '12',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Tobillera',
        description: 'Tobillera elástica',
        price: '$250.00',
      },
    ],
    calzado: [
      {
        id: '2',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Zapato+1',
        description: 'Calzado ortopédico infantil',
        price: '$890.00',
      },
      {
        id: '13',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Zapato+2',
        description: 'Calzado ortopédico adulto',
        price: '$1,200.00',
      },
      {
        id: '14',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Zapato+3',
        description: 'Calzado deportivo ortopédico',
        price: '$950.00',
      },
    ],
    rehabilitacion: [
      {
        id: '15',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Masajeador',
        description: 'Masajeador percutor',
        price: '$1,200.00',
      },
      {
        id: '16',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Electroestimulador',
        description: 'Electroestimulador TENS',
        price: '$950.00',
      },
      {
        id: '17',
        imgSrc: 'https://placehold.co/150x150/eeeeee/333333?text=Bandas',
        description: 'Bandas de resistencia (kit)',
        price: '$450.00',
      },
    ],
  };

  // Función para filtrar y ordenar productos desde la API
  const getFilteredAndSortedProducts = () => {
    let filteredProducts = [...(products || [])];

    // Filtrar solo wishlist si está activado
    if (showWishlistOnly) {
      filteredProducts = filteredProducts.filter((product) => wishlist.includes(product.id));
    }

    // Ordenar productos
    switch (sortBy) {
      case 'price-low':
        return filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high':
        return filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'name':
        return filteredProducts.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      default:
        return filteredProducts;
    }
  };

  // Función para obtener productos destacados paginados
  const getFeaturedProducts = () => {
    const allProducts = products || [];
    const productsPerPage = 6;
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return allProducts.slice(startIndex, endIndex);
  };

  // Calcular total de páginas
  const totalPages = Math.ceil((products?.length || 0) / 6);

  const handleAddToWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  };

  const productosMostrados = getFilteredAndSortedProducts();

  return (
    <div className="bg-white font-sans">
      {/* Top Bar removed - now handled by StoreLayout */}

      {/* Main Header removed - now handled by StoreLayout */}

      {/* Navigation removed - now handled by StoreLayout */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Hero Carrusel */}
        <div className="w-full mb-6 sm:mb-8 lg:mb-12 flex justify-center">
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl w-full max-w-7xl shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative w-full"
              >
                {/* Imagen centrada, tamaño proporcional a 2560x1440 */}
                {loadedImages.has(currentSlide) ? (
                  <Image
                    src={carouselSlides[currentSlide].image}
                    alt={carouselSlides[currentSlide].title}
                    width={800}
                    height={450}
                    className="block w-full h-auto object-contain mx-auto"
                    priority={currentSlide === 0}
                  />
                ) : (
                  <div className="w-full aspect-video bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="text-gray-400">Cargando...</div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-4">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                    index === currentSlide
                      ? 'bg-white border-white shadow-lg'
                      : 'bg-transparent border-white/70 hover:border-white hover:bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Small side cards removed - images were poorly positioned */}

        {/* Banner Web Inferior */}
        <div className="mb-8">
          <div className="relative w-full rounded-none overflow-hidden">
            <Image
              src="/images/banners/banner-web-inferior.png"
              alt="Banner Web Inferior"
              width={1360}
              height={200}
              quality={95}
              priority={false}
              sizes="100vw"
              className="w-full h-auto object-contain"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>

        {/* Servicios Destacados - Optimizado UI/UX */}
        <section className="mb-8 sm:mb-10 lg:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Métodos de Pago */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-blue-500 group">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-colors">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Métodos de Pago</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Efectivo, tarjeta de crédito/débito y transferencia bancaria
                  </p>
                </div>
              </div>
            </div>

            {/* Entrega y Recolección */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-green-500 group">
              <div className="flex items-start space-x-4">
                <div className="bg-green-50 p-3 rounded-full group-hover:bg-green-100 transition-colors">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Entrega y Recolección</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Entrega local en Cuernavaca o recolección en sucursal
                  </p>
                </div>
              </div>
            </div>

            {/* Consulta y Plantillas */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-purple-500 group">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-50 p-3 rounded-full group-hover:bg-purple-100 transition-colors">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Consulta + Plantillas</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Desde <span className="font-bold text-purple-600">$900</span> - Evaluación
                    completa incluida
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navegación de Categorías */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-900">Explorar por Categorías</h2>
            <Link
              href="/categorias"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2"
            >
              <span>Ver todas las categorías</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Grid de Categorías */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4 md:gap-6 mb-6">
            {productCategories.map((category, index) => (
              <Link
                key={index}
                href={`/categoria/${category.slug}`}
                className={`relative bg-white hover:bg-gray-50 p-3 rounded-lg text-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 ${
                  categoriaActiva === category.slug ? 'ring-4 ring-blue-300 shadow-lg' : ''
                }`}
              >
                <div className="w-full h-40 mb-3 rounded-lg overflow-hidden bg-gray-100 relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={200}
                    quality={95}
                    priority={index < 3}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      imageRendering: 'auto',
                      WebkitImageRendering: 'auto',
                      MozImageRendering: 'auto',
                      msImageRendering: 'auto',
                      filter: 'blur(0.2px) contrast(1.02) saturate(1.02)',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                    }}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Banner Web Redes Sociales */}
        <div className="mb-8">
          <div className="relative w-full rounded-none overflow-hidden">
            <Image
              src="/images/banners/banner-web-redes-sociales.png"
              alt="Banner Web Redes Sociales"
              width={1360}
              height={192}
              quality={90}
              priority={false}
              sizes="100vw"
              className="w-full h-auto object-contain"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>

        {/* Featured Products - Grid Layout - Mejorado UI/UX */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          {/* Section Header con Badge - Más limpio */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            {/* Badge "Productos Destacados" */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 rounded-full w-fit mx-auto mb-4"
            >
              <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 self-center"></div>
              <span className="text-sm font-semibold text-blue-900 leading-none">
                Productos Destacados
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Productos Destacados
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Nuestra selección especial de productos para tu bienestar
            </p>
          </div>

          {/* Products Grid - Mejorado con espaciado consistente */}
          {productsLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando productos...</p>
              </div>
            </div>
          ) : productsError ? (
            <div className="text-center py-20">
              <p className="text-red-600 mb-4">Error al cargar productos: {productsError}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Reintentar
              </button>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
              {getFeaturedProducts().map((producto, index) => (
                <motion.div
                  key={producto.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard product={producto} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600">No se encontraron productos.</p>
            </div>
          )}
        </section>

        {/* Banners Cuadrados - Espaciado mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 lg:mb-16">
          <div className="relative w-full rounded-none overflow-hidden">
            <Image
              src="/images/banners/banner-cuadrado-izquierdo.png"
              alt="Banner Cuadrado Izquierdo"
              width={400}
              height={300}
              quality={95}
              priority={false}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-auto object-contain"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>

          <div className="relative w-full rounded-none overflow-hidden">
            <Image
              src="/images/banners/banner-cuadrado-central.png"
              alt="Banner Cuadrado Central"
              width={400}
              height={300}
              quality={95}
              priority={false}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-auto object-contain"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>

          <div className="relative w-full rounded-none overflow-hidden">
            <Image
              src="/images/banners/Banner Cuadrado Derecho.png"
              alt="Banner Cuadrado Derecho"
              width={400}
              height={300}
              quality={95}
              priority={false}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-auto object-contain"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>

        {/* Fisioterapia y Rehabilitación - Mejorado UI/UX */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white rounded-2xl p-8 md:p-12 lg:p-16 shadow-sm">
            <div className="text-center mb-10 lg:mb-12">
              {/* Badge "Fisioterapia y Rehabilitación" */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 rounded-full w-fit mx-auto mb-6"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 self-center"></div>
                <span className="text-sm font-semibold text-blue-900 leading-none">
                  Fisioterapia y Rehabilitación
                </span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Equipos Profesionales
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Equipos profesionales para tu recuperación
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 lg:gap-8">
              <ProductCard
                imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Masajeador"
                description="Masajeador percutor profesional"
                price="$1,200.00"
                productId="15"
              />
              <ProductCard
                imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Electroestimulador"
                description="Electroestimulador TENS"
                price="$950.00"
                productId="16"
              />
              <ProductCard
                imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Bandas"
                description="Bandas de resistencia (kit completo)"
                price="$450.00"
                productId="17"
              />
              <ProductCard
                imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Aceite"
                description="Aceites terapéuticos ortopédicos"
                price="$300.00"
                productId="18"
              />
            </div>
          </div>
        </section>

        {/* Ortopedia Pediátrica (Ortochavitos) - Mejorado UI/UX */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-white rounded-2xl p-8 md:p-12 lg:p-16 shadow-sm">
            <div className="text-center mb-10 lg:mb-12">
              {/* Badge "Servicios Especializados" */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 rounded-full w-fit mx-auto mb-6"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 self-center"></div>
                <span className="text-sm font-semibold text-blue-900 leading-none">
                  Servicios Especializados
                </span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                Ortopedia Pediátrica
              </h2>
              <p className="text-lg sm:text-xl text-emerald-600 font-semibold mb-4">Ortochavitos</p>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Cuidado especializado para los más pequeños
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              <ProductCard
                imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Zapato+Niño"
                description="Zapato ortopédico infantil especializado"
                price="$980.00"
                productId="19"
              />
              <ProductCard
                imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Plantilla+Niño"
                description="Plantilla pediátrica personalizada"
                price="Desde $700"
                action="Agendar Cita"
                productId="20"
              />
              <ProductCard
                imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Férula+Niño"
                description="Férula infantil para displasia de cadera"
                price="$1,500.00"
                productId="21"
              />
            </div>

            <div className="text-center mt-10 lg:mt-12">
              <motion.button
                onClick={() =>
                  openWhatsApp(
                    undefined,
                    'Hola, me interesa agendar una consulta especializada pediátrica.',
                  )
                }
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Consulta Especializada Pediátrica
              </motion.button>
            </div>
          </div>
        </section>

        {/* Artículos de Salud y Bienestar - Mejorado UI/UX */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
              Artículos para tu Salud y Bienestar
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Información y consejos para tu bienestar ortopédico
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                img: '/images/banners/plantillas-personalizadas-fd.png',
                title: 'Cómo elegir la plantilla correcta',
                description:
                  'Guía completa para seleccionar la plantilla ortopédica ideal para tu tipo de pie y actividad.',
                category: 'Ortopedia',
                blogSlug: 'como-elegir-plantilla-correcta',
              },
              {
                img: '/images/banners/rehabilitacion-amputados-fd.png',
                title: 'Prevención de lesiones deportivas',
                description:
                  'Consejos y técnicas para prevenir lesiones durante la práctica deportiva.',
                category: 'Deportes',
                blogSlug: 'prevencion-lesiones-deportivas',
              },
              {
                img: '/images/banners/EstudioHuellaFD.png',
                title: 'Cuidado postural en el trabajo',
                description:
                  'Recomendaciones para mantener una postura correcta durante las horas laborales.',
                category: 'Ergonomía',
                blogSlug: 'cuidado-postural-trabajo',
              },
              {
                img: '/images/banners/NiñoPiePlanoFlatDesign.png',
                title: 'Rehabilitación en casa',
                description:
                  'Ejercicios y técnicas de rehabilitación que puedes realizar en la comodidad de tu hogar.',
                category: 'Rehabilitación',
                blogSlug: 'rehabilitacion-en-casa',
              },
            ].map((articulo, index) => (
              <Link key={index} href={`/blog/${articulo.blogSlug}`}>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 h-full flex flex-col">
                  <Image
                    src={articulo.img}
                    alt={articulo.title}
                    width={300}
                    height={160}
                    className="w-full h-40 object-cover flex-shrink-0"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="text-xs text-blue-600 font-medium mb-2">
                      {articulo.category}
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2 leading-tight">{articulo.title}</h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">
                      {articulo.description}
                    </p>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors text-sm mt-auto">
                      Leer el artículo
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10 lg:mt-12">
            <Link href="/blog">
              <motion.button
                className="bg-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver todos los artículos
              </motion.button>
            </Link>
          </div>
        </section>

        {/* Nuestras Marcas - Mejorado UI/UX */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
              Nuestras Marcas
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Trabajamos con las mejores marcas del mercado
            </p>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6 sm:gap-8 lg:gap-12 items-center justify-items-center">
              <div className="flex flex-col items-center">
                <Image
                  src="/images/banners/Wilson-logo.svg"
                  alt="Wilson"
                  width={80}
                  height={80}
                  className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-gray-600 mt-2">Wilson</span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/images/banners/Sandy Logo.svg"
                  alt="Sandy"
                  width={80}
                  height={80}
                  className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-gray-600 mt-2">Sandy</span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/images/banners/Donjoy-logo_480x480.webp"
                  alt="DonJoy"
                  width={80}
                  height={80}
                  className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-gray-600 mt-2">DonJoy</span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/images/banners/superconfort-logo.png"
                  alt="SuperComfort"
                  width={80}
                  height={80}
                  className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-gray-600 mt-2">SuperComfort</span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/images/banners/logo-ortochavitos.png"
                  alt="Ortochavitos"
                  width={80}
                  height={80}
                  className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-gray-600 mt-2">Ortochavitos</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Centro de Ortopedia y Rehabilitación Física */}
      <RehabilitationCenter />

      {/* Footer removed - now handled by StoreLayout */}
    </div>
  );
}
