import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { openWhatsApp } from '../../utils/whatsapp';
import NextImage from 'next/image';

// SVG Icons inline
export const ChevronRightIcon = (props) => (
  <svg
    {...props}
    className={`w-5 h-5 ${props.className || ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const XIcon = (props) => (
  <svg
    {...props}
    className={`w-5 h-5 ${props.className || ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const MessageSquareIcon = (props) => (
  <svg
    {...props}
    className={`w-5 h-5 ${props.className || ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

export default function InteractiveServices() {
  const [activeTab, setActiveTab] = useState('plantillas');
  const [selectedFeature, setSelectedFeature] = useState(null);
  const router = useRouter();

  // Handle escape key and body scroll lock
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedFeature) {
        setSelectedFeature(null);
      }
    };

    if (selectedFeature) {
      document.addEventListener('keydown', handleEscape);
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = originalOverflow || '';
        document.body.style.position = originalPosition || '';
        document.body.style.top = originalTop || '';
        window.scrollTo(0, scrollY);
      };
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedFeature]);

  const tabs = [
    { id: 'ortesis', label: 'Taller de Prótesis y Rehabilitación en Amputados' },
    { id: 'plantillas', label: 'Plantillas Ortopédicas' },
    { id: 'pediatrica', label: 'Rehabilitación Pediátrica' },
    { id: 'musculoesqueletica', label: 'Fisioterapia' },
    { id: 'amputados', label: 'Órtesis' },
    { id: 'dolor', label: 'Dolor Crónico' },
    { id: 'productos', label: 'Productos Ortopédicos' },
  ];

  const content = {
    ortesis: {
      title: 'Taller de Prótesis y Rehabilitación en Amputados',
      description:
        'Especialistas en prótesis mioeléctricas y rehabilitación integral para amputados.',
      features: [
        {
          title: 'Prótesis Mioeléctricas',
          description:
            'Tecnología avanzada que permite movimientos naturales mediante señales musculares.',
          image: '/images/banners/Prótesis MioeléctricaFD.png',
        },
        {
          title: 'Rehabilitación Integral',
          description: 'Programa completo de adaptación y recuperación funcional.',
          image: '/images/banners/Rehabilitación PostoperatoriaFD.png',
        },
      ],
    },
    plantillas: {
      title: 'Plantillas Ortopédicas Personalizadas',
      description: 'Diseño y fabricación de plantillas específicas para cada paciente.',
      features: [
        {
          title: 'Análisis Biomecánico',
          description: 'Evaluación completa de la pisada y postura para un diseño preciso.',
          image: '/images/banners/Plantillas PersonalizadasFD.png',
        },
        {
          title: 'Materiales de Alta Calidad',
          description: 'Fabricación con materiales duraderos y cómodos.',
          image: '/images/banners/Plantillas PersonalizadasFD.png',
        },
      ],
    },
  };

  const features = content[activeTab]?.features || [];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Servicios Especializados</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones personalizadas para cada necesidad ortopédica
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedFeature(feature)}
              >
                <div className="relative h-48">
                  {feature.image && (
                    <NextImage
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                      width={800}
                      height={480}
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold">
                    <span>Más información</span>
                    <ChevronRightIcon className="ml-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedFeature && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedFeature(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {selectedFeature.image && (
                    <NextImage
                      src={selectedFeature.image}
                      alt={selectedFeature.title}
                      className="w-full h-64 object-cover rounded-t-2xl"
                      width={1200}
                      height={640}
                      unoptimized
                    />
                  )}
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedFeature.title}</h3>
                  <p className="text-gray-600 mb-6">{selectedFeature.description}</p>
                  <button
                    onClick={() => openWhatsApp()}
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                  >
                    <MessageSquareIcon className="mr-2" />
                    Agendar cita por WhatsApp
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
