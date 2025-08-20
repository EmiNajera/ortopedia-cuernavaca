import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Layout from "../../components/layout/Layout";
import {
  FaSearch,
  FaUser,
  FaBars,
  FaChevronRight,
} from 'react-icons/fa';

export default function Servicios() {
  return (
    <Layout>
      <div className="font-sans text-gray-900">
        <Hero />
        <InteractiveServices />
        <MakeAnything />
        <FeaturedServices />
        <Webinars />
        <ContactBanner />
      </div>
    </Layout>
  );
}

// Hero Section optimizado con imagen como centro
function Hero() {
  return (
    <motion.section 
      className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-white text-gray-900 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 py-16 lg:py-24 relative z-10">
        {/* Layout centrado en la imagen */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Contenido de texto */}
          <motion.div 
            className="lg:w-2/5 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              SOLUCIONES<br />ORTOPÉDICAS
            </motion.h1>
                         <motion.p 
               className="text-lg lg:text-xl text-gray-700"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.6 }}
             >
               Transformamos vidas con atención personalizada y el equipo más adecuado para cada paciente. Desde 1995, ayudamos a miles de pacientes a recuperar su movilidad y calidad de vida.
             </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg uppercase text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Agendar Consulta
              </motion.button>
              <motion.button 
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg uppercase text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Productos
              </motion.button>
            </motion.div>
                         <motion.div 
               className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 1.0 }}
             >
               <Stat number="30+" label="años de experiencia" delay={0.1} />
               <Stat number="5,000+" label="pacientes" delay={0.3} />
               <Stat number="98%" label="satisfacción" delay={0.5} />
             </motion.div>
            
          </motion.div>

          {/* Imagen como centro de atención */}
          <motion.div 
            className="lg:w-3/5 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="relative w-full max-w-2xl h-80 md:h-96 lg:h-[32rem] rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Overlay gradient sutil */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-transparent z-10"></div>
              
              <img 
                src="/images/banners/MountainBoyFlatDesign.png" 
                alt="Mountain Boy Flat Design" 
                className="w-full h-full object-cover object-center" 
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function Stat({ number, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay + 1.0 }}
      whileHover={{ scale: 1.1 }}
      className="text-center"
    >
      <motion.p 
        className="text-2xl lg:text-3xl font-bold text-gray-900"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 1.2, type: "spring" }}
      >
        {number}
      </motion.p>
      <p className="text-xs uppercase text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
}





// Make Anything Section
function MakeAnything() {
  const cards = [
    { title: 'Evaluación Inicial', img: '📋' },
    { title: 'Diagnóstico Personalizado', img: '🔍' },
    { title: 'Tratamiento Especializado', img: '⚕️' },
    { title: 'Seguimiento Continuo', img: '📈' },
  ];
  return (
    <section className="bg-white py-16 relative overflow-hidden">
      {/* Elementos decorativos sutiles */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gray-50 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-50 rounded-full opacity-15 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            Nuestro Proceso
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestro Proceso de Atención Integral</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un enfoque sistemático y personalizado para garantizar los mejores resultados en tu recuperación.
          </p>
        </div>
        
        <nav className="flex justify-center space-x-4 mb-8">
          {['Evaluación', 'Diagnóstico', 'Tratamiento', 'Seguimiento'].map(tab => (
            <button key={tab} className="text-sm uppercase hover:text-blue-600 transition-colors text-gray-600 hover:text-blue-600 font-medium">{tab}</button>
          ))}
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-64 flex items-center justify-center">
              <span className="text-6xl">📋</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 p-8 rounded-2xl flex flex-col justify-center shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Evaluación Integral</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">Realizamos una evaluación completa que incluye análisis biomecánico, historial clínico y necesidades específicas del paciente para diseñar el tratamiento más adecuado.</p>
            <div className="flex space-x-4">
              <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Más Información</button>
              <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Ver Video</button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map(card => (
            <div key={card.title} className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="text-4xl">{card.img}</span>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-900">{card.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Interactive Services Section
function InteractiveServices() {
  const [activeTab, setActiveTab] = useState('pediatrica');

  const tabs = [
    { id: 'pediatrica', label: 'Rehabilitación Pediátrica' },
    { id: 'ortesis', label: 'Taller de Órtesis y Prótesis' },
    { id: 'musculoesqueletica', label: 'Rehabilitación Musculoesquelética' },
    { id: 'amputados', label: 'Rehabilitación en Amputados' },
    { id: 'dolor', label: 'Dolor Crónico' },
    { id: 'productos', label: 'Productos Ortopédicos' },
  ];

  const content = {
    pediatrica: {
      title: 'Rehabilitación Pediátrica',
      description: 'Corrige a tiempo problemas de marcha, postura o pie plano en niñas y niños.',
      image: '/images/banners/NiñoSillaRuedasFlatDesign.png',
      features: [
        { title: 'Pie Plano', description: 'Evaluación y corrección temprana para prevenir problemas futuros', img: '/images/banners/NiñoPiePlanoFlatDesign.png' },
        { title: 'Estimulación Temprana', description: 'Desarrollo motor adecuado desde los primeros años', img: '/images/banners/NiñaAprendiendoaCaminarAFD.png' },
        { title: 'Órtesis Infantiles', description: 'Dispositivos especializados para niños y niñas', img: '/images/banners/NiñaOrtesisRodillaBFD.png' },
        { title: 'Seguimiento Continuo', description: 'Monitoreo del progreso y ajustes periódicos', img: '/images/banners/TerapeutasReuFD.png' }
      ]
    },
    ortesis: {
      title: 'Taller de Órtesis y Prótesis',
      description: 'Fabricación, ajuste y personalización de dispositivos ortopédicos con tecnología digital y materiales de alta calidad.',
      image: '/images/banners/TallerOrt.JPG',
      features: [
        { title: 'Plantillas a Medida', description: 'Diseño personalizado para cada pie con tecnología 3D', img: 'https://placehold.co/200x150/7c3aed/ffffff?text=Plantillas' },
        { title: 'Órtesis Personalizadas', description: 'Dispositivos adaptados a tus necesidades específicas', img: 'https://placehold.co/200x150/dc2626/ffffff?text=Órtesis' },
        { title: 'Prótesis Avanzadas', description: 'Tecnología de última generación para máxima funcionalidad', img: 'https://placehold.co/200x150/059669/ffffff?text=Prótesis' },
        { title: 'Ajuste y Calibración', description: 'Perfeccionamiento continuo del dispositivo', img: 'https://placehold.co/200x150/f59e0b/ffffff?text=Ajuste' }
      ]
    },
    musculoesqueletica: {
      title: 'Rehabilitación Musculoesquelética',
      description: 'Recupera movilidad y fuerza tras lesiones deportivas, cirugías o fracturas.',
      image: '/images/banners/fracturaosea.jpg',
      features: [
        { title: 'Lesiones Deportivas', description: 'Recuperación específica para deportistas de alto rendimiento', img: 'https://placehold.co/200x150/f59e0b/ffffff?text=Lesiones' },
        { title: 'Rehabilitación Postoperatoria', description: 'Recuperación completa después de cirugías', img: 'https://placehold.co/200x150/8b5cf6/ffffff?text=Postoperatorio' },
        { title: 'Corrección Postural', description: 'Mejora de la alineación y prevención de lesiones', img: 'https://placehold.co/200x150/3b82f6/ffffff?text=Postura' },
        { title: 'Fortalecimiento Muscular', description: 'Programas personalizados de fortalecimiento', img: 'https://placehold.co/200x150/06b6d4/ffffff?text=Fortalecimiento' }
      ]
    },
    amputados: {
        title: 'Rehabilitación en Amputados y Prótesis',
        description: 'Adaptación y entrenamiento con prótesis, mejora de equilibrio y prevención de caídas.',
        image: '/images/banners/ProtesisTiE.jpg',
        features: [
          { title: 'Adaptación de Prótesis', description: 'Ajuste y personalización para máxima comodidad', img: 'https://placehold.co/200x150/f59e0b/ffffff?text=Adaptación' },
          { title: 'Prevención de Caídas', description: 'Entrenamiento de equilibrio y estabilidad', img: 'https://placehold.co/200x150/8b5cf6/ffffff?text=Equilibrio' },
          { title: 'Atención Integral', description: 'Soporte completo durante todo el proceso', img: 'https://placehold.co/200x150/3b82f6/ffffff?text=Atención' },
          { title: 'Marcha y Movilidad', description: 'Entrenamiento especializado para caminar', img: 'https://placehold.co/200x150/06b6d4/ffffff?text=Marcha' }
        ]
    },
    dolor: {
        title: 'Rehabilitación del Dolor Crónico',
        description: 'Manejo de dolor persistente, artritis y fibromialgia.',
        image: '/images/banners/dolocroc.jpg',
        features: [
          { title: 'Dolor de Espalda', description: 'Terapias especializadas para aliviar el dolor crónico', img: 'https://placehold.co/200x150/f59e0b/ffffff?text=Espalda' },
          { title: 'Artritis y Fibromialgia', description: 'Manejo integral de la inflamación y dolor', img: 'https://placehold.co/200x150/8b5cf6/ffffff?text=Artritis' },
          { title: 'Ejercicio Terapéutico', description: 'Actividad física segura y supervisada', img: 'https://placehold.co/200x150/3b82f6/ffffff?text=Ejercicio' },
          { title: 'Terapia Manual', description: 'Técnicas especializadas de masaje y movilización', img: 'https://placehold.co/200x150/06b6d4/ffffff?text=Terapia' }
        ]
    },
    productos: {
        title: 'Área de Productos Ortopédicos',
        description: 'Asesoría y venta de productos ortopédicos: bastones, muletas, sillas de ruedas y más.',
        image: '/images/banners/Rodillera.jpg',
        features: [
          { title: 'Bastones y Muletas', description: 'Soporte especializado para mejorar la movilidad', img: 'https://placehold.co/200x150/f59e0b/ffffff?text=Bastones' },
          { title: 'Sillas de Ruedas', description: 'Modelos manuales y eléctricos de alta calidad', img: 'https://placehold.co/200x150/8b5cf6/ffffff?text=Sillas' },
          { title: 'Zapatos Ortopédicos', description: 'Calzado especializado para diferentes necesidades', img: 'https://placehold.co/200x150/3b82f6/ffffff?text=Zapatos' },
          { title: 'Fajas y Soportes', description: 'Apoyo especializado para la columna y articulaciones', img: 'https://placehold.co/200x150/06b6d4/ffffff?text=Fajas' }
        ]
    }
  };

  const paginate = (newDirection) => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const newIndex = (currentIndex + newDirection + tabs.length) % tabs.length;
    setActiveTab(tabs[newIndex].id);
  };

  return (
    <section className="bg-white py-16 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-1/3 w-72 h-72 bg-gray-50 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-50 rounded-full opacity-15 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-12">
           <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
             <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
             Servicios Especializados
           </span>
           <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
           Ofrecemos soluciones de Rehabilitación y ortopedia completas con tecnología avanzada
           </h2>
           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
           Descubre cómo nuestra tecnología de vanguardia y atención personalizada pueden transformar tu calidad de vida.
           </p>
         </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-transparent text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
              {/* Left side - Image */}
              <div className="relative w-full aspect-[4/3] rounded-lg shadow-xl overflow-hidden">
                <Image
                  src={content[activeTab].image}
                  alt={content[activeTab].title}
                  fill
                  className="object-contain"
                  priority
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Right side - Content */}
              <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900 p-8 rounded-2xl shadow-xl border border-white/20">
                <h3 className="text-3xl font-bold mb-4 text-gray-900">
                  {content[activeTab].title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {content[activeTab].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                    MÁS INFORMACIÓN
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors shadow-lg hover:shadow-xl">
                    AGENDAR CONSULTA
                  </button>
                </div>
              </div>
            </motion.div>

          {/* Flecha izquierda */}
          <button 
            onClick={() => paginate(-1)} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 backdrop-blur-sm rounded-full p-3 cursor-pointer z-20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Pestaña anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Flecha derecha */}
          <button 
            onClick={() => paginate(1)} 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 backdrop-blur-sm rounded-full p-3 cursor-pointer z-20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Pestaña siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Feature Cards */}
        <motion.div
          key={`${activeTab}-features`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {content[activeTab].features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.3 + (0.05 * index)
              }}
              className="bg-white text-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 hover:scale-105 hover:border-blue-200"
            >
              <div className="relative w-full aspect-[3/2] overflow-hidden">
                <Image
                  src={feature.img}
                  alt={feature.title}
                  fill
                  className="object-contain"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Featured Services
function FeaturedServices() {
  const services = [
    { title: 'Plantillas Personalizadas', price: 'Desde $800', img: '🦶', description: 'Diseñadas específicamente para cada paciente' },
    { title: 'Órtesis de Rodilla', price: 'Desde $1,200', img: '🦴', description: 'Estabilización y protección articular' },
    { title: 'Prótesis Mioeléctricas', price: 'Consultar', img: '🦿', description: 'Tecnología avanzada para amputados' },
    { title: 'Estudio de Postura', price: '$500', img: '📊', description: 'Análisis completo biomecánico' },
    { title: 'Fisioterapia Integral', price: '$400/sesión', img: '💪', description: 'Rehabilitación personalizada' },
    { title: 'Calzado Ortopédico', price: 'Desde $1,500', img: '👟', description: 'Zapatos especializados' },
    { title: 'Férulas Personalizadas', price: 'Desde $900', img: '🦴', description: 'Inmovilización terapéutica' },
  ];
  return (
    <section className="bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 py-16 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100 rounded-full opacity-15 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            Servicios Destacados
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios Destacados</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra gama completa de servicios especializados diseñados para mejorar tu movilidad y calidad de vida.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => (
            <div key={service.title} className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 shadow-xl">
              <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="text-4xl">{service.img}</span>
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                <p className="text-sm text-blue-600 font-medium mb-4">{service.price}</p>
                <button className="text-sm font-medium flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  Más Información <FaChevronRight className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Webinars
function Webinars() {
  const webinars = [
    { title: 'Cuidado de Prótesis y Mantenimiento...', img: '🦿' },
    { title: 'Ejercicios para Mejorar la Postura', img: '📊' },
    { title: 'Prevención de Lesiones Deportivas', img: '🏃' },
    { title: 'Rehabilitación Post-operatoria', img: '🏥' },
  ];
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-gray-50 py-16 relative overflow-hidden">
      {/* Elementos decorativos sutiles */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-50 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gray-50 rounded-full opacity-15 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            Recursos Educativos
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Recursos Educativos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprende más sobre tu condición y cómo optimizar tu recuperación con nuestros recursos especializados.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {webinars.map(w => (
            <div key={w.title} className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 shadow-xl">
              <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="text-4xl">{w.img}</span>
              </div>
              <div className="p-6">
                <p className="text-sm font-medium text-gray-900">{w.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Banner
function ContactBanner() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-gray-50 text-gray-900 py-16 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 flex items-center justify-between relative z-10">
        <div>
          <h2 className="text-4xl font-bold mb-2">¿Necesitas una consulta?</h2>
          <p className="text-xl text-gray-700">Nuestros especialistas están listos para ayudarte</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl uppercase text-sm font-bold hover:bg-blue-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
          Agendar Cita
        </button>
      </div>
    </section>
  );
}
