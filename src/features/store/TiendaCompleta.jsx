import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhatsApp } from '../../lib/utils/whatsapp';
import { FaSearch, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

// Card para productos optimizada para grid
const ProductCard = ({
  imgSrc,
  description,
  price,
  action = 'Agregar al Carrito',
  productId = '1',
}) => (
  <div className="group bg-white border border-gray-200 rounded-lg shadow-sm text-left transition-all duration-300 hover:shadow-md hover:-translate-y-1">
    <div
      className="aspect-square w-full bg-gray-100 rounded-t-lg overflow-hidden cursor-pointer"
      onClick={() => (window.location.href = `/producto/${productId}`)}
    >
      <Image
        src={imgSrc}
        alt={description}
        width={200}
        height={200}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-3">
      <p
        className="text-sm font-medium text-gray-800 h-12 cursor-pointer hover:text-blue-600 line-clamp-2"
        onClick={() => (window.location.href = `/producto/${productId}`)}
      >
        {description}
      </p>
      {price && <p className="text-lg font-bold text-blue-900 mb-2">{price}</p>}
      <button
        className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
  </div>
);

// Centro Integral de Rehabilitación
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
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-16 relative overflow-hidden">
      {/* Elementos decorativos mejorados */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-200 to-purple-300 rounded-full opacity-8 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-100 to-indigo-200 rounded-full opacity-5 blur-2xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header mejorado */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-full mb-4 shadow-lg"
          >
            <span
              className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"
              style={{ transform: 'translateY(1px)' }}
            ></span>
            Centro Integral de Rehabilitación
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3"
          >
            ¿Qué te está molestando?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4"
          >
            En nuestro <strong>Centro Integral de Rehabilitación</strong> te ayudamos a recuperar tu
            bienestar. Somos especialistas en ortopedia y rehabilitación física para niños y
            adultos.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-gray-500 max-w-2xl mx-auto"
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
          className="max-w-lg mx-auto mb-8"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-xl shadow-lg border border-gray-100">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Buscar servicios, equipos, terapias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-transparent border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </motion.div>

        {/* Filtros de categorías */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md ${
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
                  className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 text-left hover:shadow-xl transition-all duration-300 shadow-md hover:border-blue-300 hover:bg-white/95 overflow-hidden flex-shrink-0 w-80 snap-center cursor-pointer"
                  onClick={() => {
                    // Aquí podrías agregar lógica para mostrar más detalles o redirigir
                    console.log(`Servicio seleccionado: ${item.service}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      console.log(`Servicio seleccionado: ${item.service}`);
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

                  <div className="relative space-y-3 w-full">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors leading-tight">
                      {item.service}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full group-hover:bg-blue-100 transition-colors">
                        {categories.find((cat) => cat.id === item.category)?.name}
                      </span>
                      <div className="text-blue-500 group-hover:text-blue-600 transition-colors">
                        <svg
                          className="w-4 h-4"
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
          className="text-center mt-12"
        >
          <p className="text-gray-600 text-sm mb-4">
            ¿No encuentras lo que necesitas? Nuestros especialistas pueden ayudarte.
          </p>
          <motion.button
            onClick={() =>
              openWhatsApp(
                'Hola, me gustaría obtener más información sobre los servicios del Centro Integral de Rehabilitación.',
              )
            }
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm transform hover:scale-105"
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

export default function TiendaCompleta() {
  const router = useRouter();
  const categoria = router.query?.categoria;
  const [categoriaActiva, setCategoriaActiva] = useState(categoria || 'todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

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
        image: '/images/banners/Banner Tienda 1.png',
        title: 'Productos Ortopédicos de Calidad',
        subtitle: 'Encuentra la solución perfecta para tu movilidad',
        cta: 'Explorar Productos',
        bgGradient: 'from-blue-600/40 to-indigo-700/40',
        fallbackColor: 'bg-transparent',
      },
      {
        id: 2,
        image: '/images/banners/Banner Tienda 2.png',
        title: 'Plantillas Personalizadas',
        subtitle: 'Diseñadas específicamente para tus necesidades',
        cta: 'Solicitar Evaluación',
        bgGradient: 'from-green-600/40 to-emerald-700/40',
        fallbackColor: 'bg-transparent',
      },
      {
        id: 3,
        image: '/images/banners/Banner tienda 3.png',
        title: 'Calzado Ortopédico Especializado',
        subtitle: 'Comodidad y soporte para cada paso',
        cta: 'Ver Colección',
        bgGradient: 'from-purple-600/40 to-violet-700/40',
        fallbackColor: 'bg-transparent',
      },
      {
        id: 4,
        image: '/images/banners/Banner tienda 4.png',
        title: 'Fajas y Soportes Terapéuticos',
        subtitle: 'Alivio y estabilidad para tu bienestar',
        cta: 'Descubrir Más',
        bgGradient: 'from-orange-600/40 to-red-700/40',
        fallbackColor: 'bg-transparent',
      },
      {
        id: 5,
        image: '/images/banners/Banner tienda 5.png',
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

  useEffect(() => {
    if (router.query?.categoria) {
      setCategoriaActiva(router.query.categoria);
    }
  }, [router.query]);

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

  // Función para filtrar y ordenar productos
  const getFilteredAndSortedProducts = () => {
    let products = productosPorCategoria[categoriaActiva] || productosPorCategoria.todos;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      products = products.filter((product) =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filtrar solo wishlist si está activado
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

  // Función para obtener productos destacados paginados
  const getFeaturedProducts = () => {
    const allProducts = productosPorCategoria.todos;
    const productsPerPage = 6;
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return allProducts.slice(startIndex, endIndex);
  };

  // Calcular total de páginas
  const totalPages = Math.ceil(productosPorCategoria.todos.length / 6);

  const handleAddToWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  };

  const productosMostrados = getFilteredAndSortedProducts();

  return (
    <div className="bg-white font-sans">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-xs py-2 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={() => openWhatsApp()} className="hover:underline text-white">
            Agendar consulta
          </button>
          <button
            type="button"
            className="hover:underline"
            onClick={(e) => {
              e.preventDefault();
              alert('Sistema de facturación en desarrollo');
            }}
          >
            Facturación
          </button>
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
        <div className="max-w-[1360px] mx-auto flex justify-between items-center">
          <Link href="/tienda" className="flex items-center">
            <img
              src="/images/banners/LogoOrtochavitos.svg"
              alt="Ortochavitos Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
            />
          </Link>
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative" role="search">
              <input
                type="text"
                placeholder="Buscar productos, servicios o especialidades..."
                aria-label="Buscar productos, servicios o especialidades"
                className="w-full border-2 border-gray-300 rounded-full py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchTerm && (
                <button
                  type="button"
                  aria-label="Limpiar búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm('')}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/carrito" className="relative hover:text-blue-600 transition-colors">
              <div className="relative">
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
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>
            </Link>
            <button
              className="relative hover:text-red-600 transition-colors"
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
            >
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav
        className="bg-gray-200 py-2 px-4 md:px-8 border-t border-b border-gray-300"
        aria-label="Categorías de la tienda"
      >
        {typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(() => { try { const links = Array.from(document.querySelectorAll('nav[aria-label="Categorías de la tienda"] a')); console.log('TEST_NAV_LINKS:', links.map(a => ({ text: a.textContent, href: a.getAttribute('href') }))); } catch(e) { console.log('TEST_NAV_LINKS_ERROR', e); } })()`,
            }}
          />
        )}
        <div className="max-w-[1360px] mx-auto flex justify-center items-center space-x-4 md:space-x-6 text-sm font-semibold text-blue-900 overflow-x-auto whitespace-nowrap">
          <a href="/tienda" aria-label="Todos" className="hover:text-blue-600">
            Todos
          </a>
          <a
            href="/tienda?categoria=plantillas"
            aria-label="Plantillas"
            className="hover:text-blue-600"
          >
            Plantillas
          </a>
          <a href="/tienda?categoria=fajas" aria-label="Fajas" className="hover:text-blue-600">
            Fajas
          </a>
          <a href="/tienda?categoria=ortesis" aria-label="Soportes" className="hover:text-blue-600">
            Soportes
          </a>
          <a
            href="/tienda?categoria=rehabilitacion"
            aria-label="Rehabilitación"
            className="hover:text-blue-600"
          >
            Rehabilitación
          </a>
          <a
            href="/tienda?categoria=calzado"
            aria-label="Calzado ortopédico"
            className="hover:text-blue-600"
          >
            Calzado ortopédico
          </a>
          <a
            href="/tienda?categoria=pediatria"
            aria-label="Pediatría"
            className="hover:text-blue-600"
          >
            Pediatría
          </a>
          <button onClick={() => openWhatsApp()} className="hover:text-blue-600">
            Consulta clínica
          </button>

          <button
            type="button"
            className="text-red-600 font-bold hover:text-red-700"
            onClick={(e) => {
              e.preventDefault();
              alert('Sección de ofertas en desarrollo');
            }}
          >
            Ofertas
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1360px] mx-auto py-8 px-4 md:px-8">
        {/* Hero Carrusel */}
        <div className="w-full mb-8 flex justify-center">
          <div
            className="relative overflow-hidden rounded-none w-full max-w-[1360px]"
            style={{ height: '765px' }}
          >
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
                className="relative"
              >
                {/* Imagen centrada, tamaño proporcional a 2560x1440 */}
                {loadedImages.has(currentSlide) ? (
                  <img
                    src={carouselSlides[currentSlide].image}
                    alt={carouselSlides[currentSlide].title}
                    className="block w-full h-auto object-contain mx-auto"
                    loading={currentSlide === 0 ? 'eager' : 'lazy'}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
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

        {/* Small side cards aligned with hero (test fixtures) */}
        <div className="mb-4 flex items-start justify-center gap-4">
          <div style={{ height: '190px', width: '220px' }}>
            <img
              alt="Toma de Molde"
              src="/images/banners/Plantillas categoria.png"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ height: '190px', width: '220px' }}>
            <img
              alt="Consulta con Ortesista"
              src="/images/banners/Consulta Ortesista.png"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Banner Web Inferior */}
        <div className="mb-8">
          <div className="relative w-full rounded-none overflow-hidden">
            <Image
              src="/images/banners/Banner Web inferior.png"
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
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {[
              {
                name: 'Plantillas',
                slug: 'plantillas',
                image: '/images/banners/Plantillas categoria.png',
              },
              { name: 'Fajas', slug: 'fajas', image: '/images/banners/Fajas Categoria.png' },
              {
                name: 'Soportes',
                slug: 'ortesis',
                image: '/images/banners/Rodillera categorias.png',
              },
              { name: 'Calzado', slug: 'calzado', image: '/images/banners/Calzado categoria.png' },
              {
                name: 'Movilidad',
                slug: 'rehabilitacion',
                image: '/images/banners/Movilidad categoria.png',
              },
              {
                name: 'Pediatría',
                slug: 'pediatria',
                image: '/images/banners/Pediatria categoria.png',
              },
            ].map((category, index) => (
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
              src="/images/banners/Banner Web Redes Sociales.png"
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

        {/* Featured Products - Grid Layout */}
        <section className="mb-12">
          {/* Products Container with Border */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            {/* Section Header */}
            <div className="text-left mb-8">
              <h2 className="text-4xl font-bold text-blue-600 mb-2">Productos Destacados</h2>
              <p className="text-gray-600">
                Nuestra selección especial de productos para tu bienestar
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
              {getFeaturedProducts().map((producto, index) => (
                <ProductCard
                  key={producto.id}
                  imgSrc={producto.imgSrc}
                  description={producto.description}
                  price={producto.price}
                  action="Agregar al Carrito"
                  productId={producto.id}
                />
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentPage === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Banners Cuadrados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative w-full rounded-none overflow-hidden">
            <Image
              src="/images/banners/Banner cuadrado Izquierdo.png"
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
              src="/images/banners/Banner cuadrado central.png"
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

        {/* Fisioterapia y Rehabilitación */}
        <section className="mb-12 bg-gradient-to-r from-blue-50 to-blue-100 p-6 md:p-8 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
              Fisioterapia y Rehabilitación
            </h2>
            <p className="text-gray-600 text-lg">Equipos profesionales para tu recuperación</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </section>

        {/* Ortopedia Pediátrica (Ortochavitos) */}
        <section className="mb-12 bg-gradient-to-r from-green-50 to-emerald-100 p-6 md:p-8 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
              Ortopedia Pediátrica
              <span className="block text-2xl md:text-3xl text-emerald-600 font-semibold">
                (Ortochavitos)
              </span>
            </h2>
            <p className="text-gray-600 text-lg">Cuidado especializado para los más pequeños</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
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

          <div className="text-center mt-8">
            <button
              onClick={() => openWhatsApp()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Consulta Especializada Pediátrica
            </button>
          </div>
        </section>

        {/* Artículos de Salud y Bienestar */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">
            Artículos para tu Salud y Bienestar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                img: '/images/banners/Plantillas PersonalizadasFD.png',
                title: 'Cómo elegir la plantilla correcta',
                description:
                  'Guía completa para seleccionar la plantilla ortopédica ideal para tu tipo de pie y actividad.',
                category: 'Ortopedia',
                blogSlug: 'como-elegir-plantilla-correcta',
              },
              {
                img: '/images/banners/Rehabilitación en AmputadosFD.png',
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
                  <img
                    src={articulo.img}
                    alt={articulo.title}
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
          <div className="text-center mt-6">
            <Link href="/blog">
              <button className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                Ver todos los artículos
              </button>
            </Link>
          </div>
        </section>

        {/* Nuestras Marcas */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Nuestras Marcas</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
              <div className="flex flex-col items-center">
                <img
                  src="/images/banners/Wilson-logo.svg"
                  alt="Wilson"
                  className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-gray-600 mt-2">Wilson</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/banners/Sandy Logo.svg"
                  alt="Sandy"
                  className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-gray-600 mt-2">Sandy</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/banners/Donjoy-logo_480x480.webp"
                  alt="DonJoy"
                  className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-gray-600 mt-2">DonJoy</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/banners/SuperConfort Logo.png"
                  alt="SuperComfort"
                  className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-gray-600 mt-2">SuperComfort</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/banners/Logo Ortochavitos.png"
                  alt="Ortochavitos"
                  className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-gray-600 mt-2">Ortochavitos</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Centro Integral de Rehabilitación */}
      <RehabilitationCenter />

      {/* Footer */}
      <footer className="bg-blue-900 text-white pt-10">
        <div className="max-w-[1360px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-2 text-blue-400">
                ¡Suscríbete a nuestras mejores ofertas!
              </h3>
              <p className="text-sm mb-4">
                Recibe contenido sobre cuidado ortopédico y promociones exclusivas.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="tu.correo@ejemplo.com"
                  className="w-full rounded-l-md text-gray-800 px-3 py-2 focus:outline-none"
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
                  onClick={() => alert('Sistema de suscripción en desarrollo')}
                >
                  Suscribir
                </button>
              </div>
              <div className="mt-4 flex space-x-4">
                <img
                  src="https://placehold.co/40x25/1a365d/ffffff?text=Visa"
                  alt="Visa"
                  className="h-6"
                />
                <img
                  src="https://placehold.co/40x25/1a365d/ffffff?text=Mastercard"
                  alt="Mastercard"
                  className="h-6"
                />
                <img
                  src="https://placehold.co/40x25/1a365d/ffffff?text=PayPal"
                  alt="PayPal"
                  className="h-6"
                />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-blue-400">Servicio al Cliente</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <button
                    type="button"
                    className="hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Preguntas frecuentes en desarrollo');
                    }}
                  >
                    Preguntas Frecuentes
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Sistema de facturación en desarrollo');
                    }}
                  >
                    Facturación
                  </button>
                </li>
                <li>
                  <Link href="/contacto" className="hover:underline">
                    Contáctanos
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('WhatsApp en desarrollo');
                    }}
                  >
                    WhatsApp
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-blue-400">Acerca de Nosotros</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="/nosotros" className="hover:underline">
                    Nuestra Historia
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Información sobre nuestra filosofía de atención en desarrollo');
                    }}
                  >
                    Filosofía de Atención
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Trabaja con nosotros en desarrollo');
                    }}
                  >
                    Trabaja con Nosotros
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-blue-400">Legal</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <button
                    type="button"
                    className="hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Aviso de privacidad en desarrollo');
                    }}
                  >
                    Aviso de Privacidad
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Términos y condiciones en desarrollo');
                    }}
                  >
                    Términos y Condiciones
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Política de devoluciones en desarrollo');
                    }}
                  >
                    Política de Devoluciones
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-xs border-t border-blue-700 py-4 mt-4">
            <p>
              &copy; {new Date().getFullYear()} Ortopedia Cuernavaca. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
