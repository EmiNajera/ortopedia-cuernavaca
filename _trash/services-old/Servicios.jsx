import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MarketingLayout from '../../components/layout/MarketingLayout';
import dynamic from 'next/dynamic';
const ProcessSectionAlt = dynamic(() => import('../../components/features/ProcessSectionAlt'));

// Solo ProcessSectionAlt dinámico; secciones locales siguen en el archivo para evitar redefinición
import { openWhatsApp } from '../../utils/whatsapp';
import { BentoCard, BentoGrid } from '@/registry/magicui/bento-grid';
import Marquee from '@/registry/magicui/marquee';

// SVG Icons inline para reducir bundle size
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const BarsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MessageSquareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

export default function Servicios() {
  return (
    <>
      <div className="font-sans text-gray-900">
        <Hero />
        <SymptomsSection />
        <InteractiveServices />
        <ProcessSectionAlt />
        <FeaturedServices />
        <Webinars />
        <ContactBanner />
      </div>
    </>
  );
}

Servicios.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
// Hero Section optimizado con imagen como centro
function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-white text-gray-900 overflow-hidden">
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
          <div className="lg:w-2/5 space-y-6 text-center lg:text-left opacity-0 translate-y-2 animate-[fadeIn_.8s_ease-out_.2s_forwards]">
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 opacity-0 translate-y-2 animate-[fadeIn_.8s_ease-out_.4s_forwards]">
              SOLUCIONES
              <br />
              ORTOPÉDICAS
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 opacity-0 translate-y-2 animate-[fadeIn_.8s_ease-out_.6s_forwards]">
              Transformamos vidas con atención personalizada y el equipo más adecuado para cada
              paciente. Desde 1995, ayudamos a miles de pacientes a recuperar su movilidad y calidad
              de vida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 translate-y-2 animate-[fadeIn_.8s_ease-out_.8s_forwards]">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg uppercase text-sm font-medium transition-colors shadow-lg hover:shadow-xl hover:bg-blue-700">
                Agendar Consulta
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg uppercase text-sm font-medium transition-colors shadow-lg hover:shadow-xl hover:bg-blue-600 hover:text-white">
                Ver Productos
              </button>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8 opacity-0 translate-y-2 animate-[fadeIn_.8s_ease-out_1s_forwards]">
              <Stat number="30+" label="años de experiencia" delay={0.1} />
              <Stat number="5,000+" label="pacientes" delay={0.3} />
              <Stat number="98%" label="satisfacción" delay={0.5} />
            </div>
          </div>

          {/* Imagen como centro de atención */}
          <div className="lg:w-3/5 flex justify-center opacity-0 translate-y-2 animate-[fadeIn_.8s_ease-out_.4s_forwards]">
            <div className="relative w-full max-w-2xl h-80 md:h-96 lg:h-[32rem] rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)]">
              {/* Overlay gradient sutil */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-transparent z-10"></div>

              <Image
                src="/images/banners/MountainBoyFlatDesign.png"
                alt="Mountain Boy Flat Design"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
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
        transition={{ duration: 0.5, delay: delay + 1.2, type: 'spring' }}
      >
        {number}
      </motion.p>
      <p className="text-xs uppercase text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
}

// Symptoms Section - Ultra compacta con buscador
function SymptomsSection() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef(null);

  const categories = [
    { id: 'all', name: 'Todos', color: 'blue' },
    { id: 'espalda', name: 'Espalda', color: 'green' },
    { id: 'extremidades', name: 'Extremidades', color: 'red' },
    { id: 'lesiones', name: 'Lesiones', color: 'purple' },
    { id: 'pies', name: 'Pies', color: 'indigo' },
    { id: 'articulaciones', name: 'Articulaciones', color: 'orange' },
    { id: 'movilidad', name: 'Movilidad', color: 'teal' },
    { id: 'postura', name: 'Postura', color: 'pink' },
  ];

  const symptoms = [
    // EXTREMIDADES
    {
      symptom: 'Fractura de tobillo',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'extremidades',
      keywords: 'fractura, tobillo, hueso, trauma, inmovilización',
    },
    {
      symptom: 'Fractura de muñeca',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'extremidades',
      keywords: 'fractura, muñeca, radio, cúbito, inmovilización',
    },
    {
      symptom: 'Fractura de clavícula',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'extremidades',
      keywords: 'fractura, clavícula, hombro, trauma, rehabilitación',
    },
    {
      symptom: 'Amputación de pierna',
      service: 'Taller de Prótesis y Rehabilitación en Amputados',
      tabId: 'ortesis',
      category: 'extremidades',
      keywords: 'amputación, pierna, prótesis, rehabilitación, adaptación',
    },
    {
      symptom: 'Amputación de brazo',
      service: 'Taller de Prótesis y Rehabilitación en Amputados',
      tabId: 'ortesis',
      category: 'extremidades',
      keywords: 'amputación, brazo, prótesis, extremidad superior, adaptación',
    },
    {
      symptom: 'Fractura de fémur',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'extremidades',
      keywords: 'fractura, fémur, cadera, trauma, rehabilitación',
    },

    // ESPALDA
    {
      symptom: 'Hernia discal lumbar',
      service: 'Dolor Crónico',
      tabId: 'dolor',
      category: 'espalda',
      keywords: 'hernia, disco, lumbar, columna, nervio',
    },
    {
      symptom: 'Hernia discal cervical',
      service: 'Dolor Crónico',
      tabId: 'dolor',
      category: 'espalda',
      keywords: 'hernia, disco, cervical, cuello, nervio',
    },
    {
      symptom: 'Lumbalgia crónica',
      service: 'Dolor Crónico',
      tabId: 'dolor',
      category: 'espalda',
      keywords: 'lumbalgia, lumbar, dolor, crónico, columna',
    },
    {
      symptom: 'Cervicalgia',
      service: 'Dolor Crónico',
      tabId: 'dolor',
      category: 'espalda',
      keywords: 'cervicalgia, cuello, dolor, tensión, columna',
    },
    {
      symptom: 'Dorsalgia',
      service: 'Dolor Crónico',
      tabId: 'dolor',
      category: 'espalda',
      keywords: 'dorsalgia, dorsal, espalda, dolor, columna',
    },
    {
      symptom: 'Estenosis espinal',
      service: 'Dolor Crónico',
      tabId: 'dolor',
      category: 'espalda',
      keywords: 'estenosis, espinal, columna, estrechamiento, nervio',
    },

    // LESIONES
    {
      symptom: 'Lesión muscular en cuádriceps',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'lesiones',
      keywords: 'músculo, cuádriceps, desgarro, contractura, deporte',
    },
    {
      symptom: 'Desgarro de isquiotibiales',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'lesiones',
      keywords: 'desgarro, isquiotibiales, músculo, deporte, rehabilitación',
    },
    {
      symptom: 'Tendinitis de Aquiles',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'lesiones',
      keywords: 'tendinitis, Aquiles, tendón, inflamación, talón',
    },
    {
      symptom: 'Tendinitis de hombro',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'lesiones',
      keywords: 'tendinitis, hombro, manguito rotador, inflamación, dolor',
    },
    {
      symptom: 'Contractura muscular',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'lesiones',
      keywords: 'contractura, músculo, rigidez, espasmo, relajación',
    },
    {
      symptom: 'Atrofia muscular',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'lesiones',
      keywords: 'atrofia, músculo, debilidad, pérdida, fortalecimiento',
    },
    {
      symptom: 'Recuperación post-cirugía de rodilla',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'lesiones',
      keywords: 'cirugía, rodilla, postoperatorio, rehabilitación, recuperación',
    },
    {
      symptom: 'Recuperación post-cirugía de cadera',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'lesiones',
      keywords: 'cirugía, cadera, postoperatorio, prótesis, rehabilitación',
    },
    {
      symptom: 'Esguince de tobillo',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'lesiones',
      keywords: 'esguince, tobillo, ligamento, torcedura, rehabilitación',
    },
    {
      symptom: 'Esguince de rodilla',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'lesiones',
      keywords: 'esguince, rodilla, ligamento, LCA, rehabilitación',
    },

    // PIES
    {
      symptom: 'Pie plano en niños',
      service: 'Rehabilitación Pediátrica',
      tabId: 'pediatrica',
      category: 'pies',
      keywords: 'pie plano, niños, arco, desarrollo, plantillas',
    },
    {
      symptom: 'Fascitis plantar',
      service: 'Plantillas Ortopédicas',
      tabId: 'plantillas',
      category: 'pies',
      keywords: 'fascitis, plantar, talón, dolor, soporte',
    },
    {
      symptom: 'Espolón calcáneo',
      service: 'Plantillas Ortopédicas',
      tabId: 'plantillas',
      category: 'pies',
      keywords: 'espolón, calcáneo, talón, dolor, soporte',
    },
    {
      symptom: 'Pie cavo',
      service: 'Plantillas Ortopédicas',
      tabId: 'plantillas',
      category: 'pies',
      keywords: 'pie cavo, arco alto, deformidad, plantillas, soporte',
    },
    {
      symptom: 'Juanetes (Hallux valgus)',
      service: 'Plantillas Ortopédicas',
      tabId: 'plantillas',
      category: 'pies',
      keywords: 'juanetes, hallux valgus, dedo gordo, deformidad, plantillas',
    },
    {
      symptom: 'Metatarsalgia',
      service: 'Plantillas Ortopédicas',
      tabId: 'plantillas',
      category: 'pies',
      keywords: 'metatarsalgia, metatarsos, dolor, antepié, plantillas',
    },
    {
      symptom: 'Pie diabético',
      service: 'Plantillas Ortopédicas',
      tabId: 'plantillas',
      category: 'pies',
      keywords: 'pie diabético, diabetes, úlceras, cuidado, plantillas',
    },

    // ARTICULACIONES
    {
      symptom: 'Artritis reumatoide',
      service: 'Dolor Crónico',
      tabId: 'dolor',
      category: 'articulaciones',
      keywords: 'artritis, inflamación, articulaciones, crónico, autoinmune',
    },
    {
      symptom: 'Osteoartritis de rodilla',
      service: 'Órtesis',
      tabId: 'amputados',
      category: 'articulaciones',
      keywords: 'osteoartritis, rodilla, desgaste, cartílago, soporte',
    },
    {
      symptom: 'Osteoartritis de cadera',
      service: 'Órtesis',
      tabId: 'amputados',
      category: 'articulaciones',
      keywords: 'osteoartritis, cadera, desgaste, cartílago, prótesis',
    },
    {
      symptom: 'Luxación de hombro',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'articulaciones',
      keywords: 'luxación, hombro, articulación, inestabilidad, rehabilitación',
    },
    {
      symptom: 'Síndrome del túnel carpiano',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'articulaciones',
      keywords: 'túnel carpiano, muñeca, nervio, hormigueo, cirugía',
    },
    {
      symptom: 'Bursitis de cadera',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'articulaciones',
      keywords: 'bursitis, cadera, inflamación, dolor, rehabilitación',
    },
    {
      symptom: 'Capsulitis adhesiva (hombro congelado)',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'articulaciones',
      keywords: 'capsulitis, hombro congelado, rigidez, movilidad, rehabilitación',
    },
    {
      symptom: 'Artrosis de manos',
      service: 'Órtesis',
      tabId: 'amputados',
      category: 'articulaciones',
      keywords: 'artrosis, manos, dedos, desgaste, soporte',
    },

    // MOVILIDAD
    {
      symptom: 'Parálisis parcial de pierna',
      service: 'Productos Ortopédicos',
      tabId: 'productos',
      category: 'movilidad',
      keywords: 'parálisis, pierna, movilidad, bastón, silla de ruedas',
    },
    {
      symptom: 'Parálisis de brazo',
      service: 'Productos Ortopédicos',
      tabId: 'productos',
      category: 'movilidad',
      keywords: 'parálisis, brazo, movilidad, soporte, adaptación',
    },
    {
      symptom: 'Dificultad para caminar',
      service: 'Productos Ortopédicos',
      tabId: 'productos',
      category: 'movilidad',
      keywords: 'caminar, dificultad, bastón, muletas, soporte',
    },
    {
      symptom: 'Problemas de equilibrio',
      service: 'Productos Ortopédicos',
      tabId: 'productos',
      category: 'movilidad',
      keywords: 'equilibrio, caídas, estabilidad, bastón, soporte',
    },
    {
      symptom: 'Debilidad general',
      service: 'Productos Ortopédicos',
      tabId: 'productos',
      category: 'movilidad',
      keywords: 'debilidad, fuerza, movilidad, soporte, adaptación',
    },
    {
      symptom: 'Limitación de movimiento',
      service: 'Fisioterapia',
      tabId: 'musculoesqueletica',
      category: 'movilidad',
      keywords: 'movimiento, limitación, rigidez, rehabilitación, flexibilidad',
    },

    // POSTURA
    {
      symptom: 'Escoliosis',
      service: 'Dolor Crónico',
      tabId: 'dolor',
      category: 'postura',
      keywords: 'escoliosis, columna, curvatura, postura, corrección',
    },
    {
      symptom: 'Cifosis',
      service: 'Dolor Crónico',
      tabId: 'dolor',
      category: 'postura',
      keywords: 'cifosis, joroba, columna, curvatura, postura',
    },
    {
      symptom: 'Lordosis excesiva',
      service: 'Dolor Crónico',
      tabId: 'dolor',
      category: 'postura',
      keywords: 'lordosis, lumbar, curvatura, postura, corrección',
    },
    {
      symptom: 'Problemas de postura en niños',
      service: 'Rehabilitación Pediátrica',
      tabId: 'pediatrica',
      category: 'postura',
      keywords: 'postura, niños, columna, desarrollo, corrección',
    },
    {
      symptom: 'Síndrome postural',
      service: 'Dolor Crónico',
      tabId: 'dolor',
      category: 'postura',
      keywords: 'postura, síndrome, dolor, corrección, ergonomía',
    },
  ];

  const filteredSymptoms = symptoms.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      item.symptom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleSymptomClick = (tabId) => {
    const element = document.getElementById('interactive-services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
      const tabButton = document.querySelector(`[data-tab-id="${tabId}"]`);
      if (tabButton) {
        tabButton.click();
      }
    }, 800);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 250 : 300; // Menos scroll en móvil
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 250 : 300; // Menos scroll en móvil
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollLeft();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollRight();
    }
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

      // Calcular progreso del scroll
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      container.addEventListener('keydown', handleKeyDown);
      checkScrollPosition();
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        container.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [filteredSymptoms]);

  // Agregar soporte para gestos táctiles
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let startX = 0;
    let isScrolling = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isScrolling = true;
    };

    const handleTouchMove = (e) => {
      if (!isScrolling) return;
      e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      if (!isScrolling) return;
      isScrolling = false;

      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      const threshold = 50; // Mínimo movimiento para activar scroll

      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          scrollRight(); // Swipe left = scroll right
        } else {
          scrollLeft(); // Swipe right = scroll left
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-12 relative overflow-hidden">
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
            Identifica tu Síntoma
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3 leading-tight"
            style={{
              lineHeight: '1.1',
              wordSpacing: '0.1em',
              letterSpacing: '-0.02em',
            }}
          >
            ¿Qué te está molestando?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Busca o selecciona tu síntoma para encontrar el servicio adecuado.
          </motion.p>
        </div>

        {/* Buscador mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-sm sm:max-w-lg mx-auto mb-6 sm:mb-8 px-4 sm:px-0"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
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
              <input
                type="text"
                placeholder="Buscar síntomas, servicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 sm:py-4 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base focus:placeholder-gray-300 transition-colors duration-200"
                style={{
                  fontSize: '16px', // Prevenir zoom en iOS
                  WebkitAppearance: 'none',
                  borderRadius: '0',
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Filtros de categorías mejorados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-4 sm:px-0"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-md touch-manipulation ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-lg hover:scale-105'
              }`}
              style={{
                minHeight: '44px', // Touch target mínimo
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid de síntomas con scroll moderno */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative"
        >
          {/* Indicadores de scroll laterales */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="w-8 h-16 bg-gradient-to-r from-white via-white/80 to-transparent rounded-r-lg flex items-center justify-center">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-transparent rounded-full opacity-60"></div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="w-8 h-16 bg-gradient-to-l from-white via-white/80 to-transparent rounded-l-lg flex items-center justify-center">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-transparent rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Botones de navegación con diseño premium */}
          {canScrollLeft && (
            <motion.button
              onClick={scrollLeft}
              onTouchStart={(e) => {
                e.preventDefault();
                scrollLeft();
              }}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl p-2.5 sm:p-3 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white hover:border-blue-400/60 active:scale-95 touch-manipulation select-none group"
              style={{
                minWidth: '44px',
                minHeight: '44px',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
                borderColor: 'rgb(59, 130, 246)',
              }}
              whileTap={{
                scale: 0.9,
                transition: { duration: 0.1 },
              }}
              aria-label="Desplazar hacia la izquierda"
              role="button"
              tabIndex={0}
            >
              <svg
                className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-all duration-200 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}

          {canScrollRight && (
            <motion.button
              onClick={scrollRight}
              onTouchStart={(e) => {
                e.preventDefault();
                scrollRight();
              }}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl p-2.5 sm:p-3 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white hover:border-blue-400/60 active:scale-95 touch-manipulation select-none group"
              style={{
                minWidth: '44px',
                minHeight: '44px',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
                borderColor: 'rgb(59, 130, 246)',
              }}
              whileTap={{
                scale: 0.9,
                transition: { duration: 0.1 },
              }}
              aria-label="Desplazar hacia la derecha"
              role="button"
              tabIndex={0}
            >
              <svg
                className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-all duration-200 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}

          {/* Contenedor con scroll horizontal optimizado */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-3 sm:gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth touch-pan-x"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' },
                touchAction: 'pan-x',
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
              }}
              tabIndex={0}
              role="region"
              aria-label="Lista de síntomas médicos"
              onKeyDown={handleKeyDown}
              onTouchStart={(e) => {
                // Mejorar la experiencia touch
                e.currentTarget.style.scrollBehavior = 'auto';
              }}
              onTouchEnd={(e) => {
                // Restaurar scroll suave después del touch
                setTimeout(() => {
                  e.currentTarget.style.scrollBehavior = 'smooth';
                }, 100);
              }}
            >
              {filteredSymptoms.map((item, index) => (
                <motion.button
                  key={index}
                  className="group relative bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-4 sm:p-5 text-left hover:shadow-2xl transition-all duration-500 shadow-lg hover:border-blue-300 hover:bg-white overflow-hidden flex-shrink-0 w-64 sm:w-72 snap-center hover:scale-105 active:scale-95 touch-manipulation select-none"
                  style={{
                    minHeight: '110px',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    minWidth: '256px', // 16rem = 256px para touch targets
                    maxWidth: '288px', // 18rem = 288px máximo
                  }}
                  onClick={() => handleSymptomClick(item.tabId)}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    // Feedback táctil inmediato
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onTouchEnd={(e) => {
                    // Restaurar escala después del touch
                    setTimeout(() => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }, 150);
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)',
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1 },
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.7 + index * 0.03,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  aria-label={`Ver información sobre ${item.symptom}`}
                  role="button"
                  tabIndex={0}
                >
                  {/* Efecto de brillo animado en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* Indicador de categoría */}
                  <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative space-y-3 w-full">
                    <div className="flex items-start justify-between">
                      <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors text-base leading-tight pr-2">
                        {item.symptom}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-600 font-semibold truncate bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 rounded-full border border-blue-100">
                        {item.service.split(' ')[0]}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors">
                          Ver más
                        </span>
                        <ChevronRightIcon className="text-blue-400 group-hover:text-blue-600 transition-all duration-300 text-sm flex-shrink-0 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Indicador de progreso del scroll dinámico */}
          <div className="mt-6 flex justify-center">
            <div className="relative">
              <div className="w-64 h-2 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-100">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full relative"
                  style={{ width: `${scrollProgress}%` }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </motion.div>
              </div>
              <motion.div
                className="absolute -top-1 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-lg"
                style={{ left: `${scrollProgress}%`, transform: 'translateX(-50%)' }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-0.5"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Mensaje cuando no hay resultados mejorado */}
        {filteredSymptoms.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-8"
          >
            <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-gray-500 text-base">
                No encontramos síntomas que coincidan con tu búsqueda.
              </p>
            </div>
          </motion.div>
        )}

        {/* Footer mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-600 text-sm mb-4">
            ¿No encuentras tu síntoma? Nuestros especialistas pueden ayudarte.
          </p>
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Consulta Personalizada
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Interactive Services Section
function InteractiveServices() {
  const [activeTab, setActiveTab] = useState('plantillas');
  const [selectedFeature, setSelectedFeature] = useState(null);
  const router = useRouter();

  // Handle modal open/close with proper scroll management
  React.useEffect(() => {
    if (!selectedFeature) return;

    // Guardar la posición actual del scroll antes de abrir el modal
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = `-${scrollX}px`;

    // Manejar tecla Escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedFeature(null);
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Cleanup: restaurar scroll sin mover la página
    return () => {
      document.removeEventListener('keydown', handleEscape);

      // Restaurar estilos del body
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.left = '';

      // Restaurar posición del scroll sin animación
      window.scrollTo({
        top: scrollY,
        left: scrollX,
        behavior: 'instant',
      });
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
    plantillas: {
      title: 'Plantillas Ortopédicas',
      description:
        'Diseñamos y fabricamos plantillas ortopédicas a medida para corregir problemas de pisada, aliviar dolores y mejorar tu calidad de vida.',
      image: '/images/banners/plantillasortopedicasfd.png',
      features: [
        {
          title: 'Plantillas Ortopédicas Personalizadas',
          description:
            'Diseño personalizado para cada pie con tecnología avanzada y materiales de alta calidad.',
          longDescription:
            'Cada plantilla se fabrica completamente a medida, considerando la forma única de tus pies, tu tipo de pisada, actividades diarias y objetivos de tratamiento. No usamos plantillas genéricas.',
          img: '/images/banners/Plantillas PersonalizadasFD.png',
        },
        {
          title: 'Estudio de Huella',
          description:
            'Análisis biomecánico detallado de tu pisada y postura para diseñar la solución perfecta.',
          longDescription:
            'Realizamos una evaluación completa que incluye análisis de la marcha, estudio de la pisada, evaluación postural y revisión de tu historial médico. Usamos tecnología avanzada para obtener mediciones precisas.',
          img: '/images/banners/EstudioHuellaFD.png',
        },
        {
          title: 'Corrección Postural',
          description: 'Mejora de la alineación corporal y prevención de problemas de postura.',
          longDescription:
            'Nuestras plantillas no solo corrigen la pisada, sino que también ayudan a mejorar la postura general, alineando correctamente la columna y las articulaciones.',
          img: '/images/banners/cambioposturalconplantillasfd.png',
        },
        {
          title: 'Revisión y Seguimiento',
          description:
            'Acompañamiento durante todo el proceso con ajustes y revisiones periódicas.',
          longDescription:
            'Te damos seguimiento completo: revisamos periódicamente cómo te sientes, ajustamos las plantillas si es necesario y te asesoramos sobre el cuidado y mantenimiento para obtener los mejores resultados.',
          img: '/images/banners/revisionypseguimientoyajustesfd.png',
        },
      ],
    },
    pediatrica: {
      title: 'Rehabilitación Pediátrica',
      description: 'Corrige a tiempo problemas de marcha, postura o pie plano en niñas y niños.',
      image: '/images/banners/NiñoSillaRuedasFlatDesign.png',
      features: [
        {
          title: 'Pie Plano',
          description:
            'Detectamos pie plano en niños, analizamos cómo caminan y corregimos su pisada con plantillas ortopédicas personalizadas y ejercicios, ayudando a prevenir molestias y mejorar su postura.',
          longDescription:
            '¿Notas que tu hijo(a) camina de puntitas, se tropieza mucho o sus zapatos se desgastan raro? El pie plano en niños puede causar cansancio, dolor o problemas en rodillas y columna a largo plazo.\n\nEn Ortopedia Cuernavaca, evaluamos cuidadosamente la marcha y postura de cada pequeño(a) usando pruebas clínicas y observación experta. Si es necesario, diseñamos plantillas ortopédicas a medida, hechas especialmente para sus pies, que ayudan a alinear correctamente la pisada y a repartir el peso de manera equilibrada.\n\nAdemás, te enseñamos ejercicios sencillos para hacer en casa que fortalecen sus pies y tobillos, acelerando la mejora. Hacemos revisiones periódicas para ajustar el tratamiento y ver avances, acompañándolos hasta que caminen con seguridad y sin dolor. Nuestro objetivo es que cada niño/a disfrute moverse y juegue sin limitaciones.',
          img: '/images/banners/NiñoPiePlanoFlatDesign.png',
        },
        {
          title: 'Estimulación Temprana',
          description:
            'Impulsamos el desarrollo físico y motriz de bebés y niños pequeños con juegos, ejercicios y rutinas personalizadas para cada etapa, detectando y corrigiendo retrasos a tiempo.',
          longDescription:
            '¿Tu bebé tarda en sostener la cabeza, sentarse o dar sus primeros pasos? La estimulación temprana puede ser clave para detectar y corregir cualquier retraso en el desarrollo motor.\n\nNuestro programa se basa en actividades lúdicas y ejercicios adaptados a la edad y necesidades de cada niño(a), usando tapetes sensoriales, pelotas, rampas y juegos que promueven el movimiento, la coordinación y el equilibrio.\n\nGuiamos a papás y mamás en el proceso, enseñándoles cómo apoyar a sus hijos en casa con actividades sencillas y seguras. Realizamos evaluaciones frecuentes para ver su progreso y ajustamos la rutina cuando lo necesita. Nuestro compromiso es acompañar a cada familia para que sus hijos/as alcancen su máximo potencial, con alegría y confianza.',
          img: '/images/banners/NiñaAprendiendoaCaminarAFD.png',
        },
        {
          title: 'Órtesis Infantiles',
          description:
            'Diseñamos y adaptamos férulas, soportes y órtesis especiales para niños con pie zambo, debilidad muscular o parálisis, permitiendo mayor movilidad y confianza al caminar o moverse.',
          longDescription:
            'Cuando un niño/a necesita soporte extra para caminar o mantenerse en pie, las órtesis infantiles pueden ser la solución.\n\nEn nuestro taller, fabricamos férulas y órtesis a la medida, ajustadas a las necesidades y crecimiento de cada pequeño(a). Usamos materiales ligeros y cómodos que permiten que los niños jueguen y se desplacen sin molestias.\n\nRealizamos un proceso de adaptación gradual y, con el tiempo, revisamos y ajustamos cada dispositivo para asegurar que siga funcionando perfectamente. Acompañamos a la familia en el proceso de adaptación, enseñando a colocar y cuidar las órtesis, y resolviendo cualquier duda.\n\nEsto ayuda a prevenir deformidades, mejorar la marcha y darles a los niños la independencia para moverse y explorar su mundo.',
          img: '/images/banners/NiñaOrtesisRodillaBFD.png',
        },
        {
          title: 'Seguimiento Continuo',
          description:
            'Acompañamos de cerca a cada paciente con revisiones periódicas, ajustes y asesoría continua para asegurar que cada tratamiento logre los mejores resultados a largo plazo.',
          longDescription:
            'El éxito de un tratamiento infantil no solo depende de la primera consulta, sino del acompañamiento constante.\n\nEn Ortopedia Cuernavaca damos seguimiento personalizado: revisamos periódicamente a cada niño(a) para ver cómo ha avanzado, si necesita cambiar la plantilla, ajustar una férula o modificar los ejercicios recomendados.\n\nNos comunicamos siempre con los padres, resolviendo dudas y dando orientación clara sobre el proceso. Si detectamos cualquier cambio en la marcha, postura o movilidad, intervenimos de inmediato para corregir el rumbo del tratamiento.\n\nEste enfoque cercano permite resultados más rápidos y duraderos, y da confianza a las familias de que nunca estarán solas en el proceso de recuperación y desarrollo de sus hijos.',
          img: '/images/banners/TerapeutasReuFD.png',
        },
      ],
    },
    ortesis: {
      title: 'Taller de Prótesis y Rehabilitación en Amputados',
      description:
        'Fabricación, ajuste y personalización de dispositivos ortopédicos con tecnología digital y materiales de alta calidad.',
      image: '/images/banners/Atleta cruzando la meta con alegría FD.png',
      features: [
        {
          title: 'Prótesis',
          description:
            'Fabricación y adaptación de prótesis personalizadas con tecnología avanzada.',
          longDescription:
            'Nuestras prótesis están diseñadas para restaurar la funcionalidad y mejorar la calidad de vida de pacientes con amputaciones. Utilizamos tecnología de vanguardia y materiales de alta calidad para crear dispositivos que se adapten perfectamente a cada paciente.\n\nCada prótesis se fabrica completamente a medida, considerando la anatomía única del paciente, su nivel de amputación, actividades diarias y objetivos de rehabilitación. Los materiales utilizados garantizan durabilidad, ligereza y confort durante el uso prolongado.\n\nEl proceso incluye una evaluación exhaustiva, diseño personalizado, fabricación en nuestro taller especializado, pruebas de ajuste y un programa de rehabilitación integral. Acompañamos al paciente durante todo el proceso de adaptación, realizando ajustes periódicos para optimizar la funcionalidad.',
          img: '/images/banners/Técnico ajustando prótesis en tallerFD.png',
        },
        {
          title: 'Rehabilitación en Amputados',
          description: 'Programa integral de rehabilitación para pacientes con amputaciones.',
          longDescription:
            'Nuestro programa de rehabilitación para amputados está diseñado para maximizar la independencia y calidad de vida de cada paciente. Comenzamos con una evaluación completa que incluye el estado físico, psicológico y social del paciente.\n\nEl programa incluye ejercicios de fortalecimiento muscular, entrenamiento de equilibrio, práctica de actividades de la vida diaria y adaptación psicológica. Utilizamos equipos especializados y técnicas de rehabilitación avanzadas para acelerar la recuperación.\n\nAcompañamos al paciente durante todo el proceso, desde la fase preprotésica hasta la adaptación completa a su nueva prótesis. Realizamos evaluaciones periódicas para medir el progreso y ajustar el programa según las necesidades cambiantes.',
          img: '/images/banners/Rehabilitación en AmputadosFD.png',
        },
        {
          title: 'Entrenamiento Funcional con Prótesis',
          description:
            'Programa especializado de entrenamiento para maximizar el uso funcional de la prótesis.',
          longDescription:
            'Nuestro programa de entrenamiento funcional está diseñado para ayudar a los pacientes a desarrollar las habilidades necesarias para utilizar su prótesis de manera efectiva en actividades de la vida diaria. Incluye ejercicios específicos para mejorar la coordinación, equilibrio, fuerza y resistencia.\n\nEl entrenamiento se adapta a las necesidades individuales de cada paciente, considerando su nivel de amputación, tipo de prótesis y objetivos personales. Utilizamos equipos especializados y técnicas de rehabilitación avanzadas para acelerar el proceso de adaptación.\n\nRealizamos sesiones progresivas que van desde ejercicios básicos de control hasta actividades complejas como subir escaleras, caminar en terrenos irregulares y realizar tareas específicas. Nuestro objetivo es que cada paciente logre la máxima independencia y confianza en el uso de su prótesis.',
          img: '/images/banners/Entrenamiento Funcional con PrótesisFD.png',
        },
        {
          title: 'Ajuste y Calibración Especializada',
          description: 'Perfeccionamiento continuo del dispositivo con tecnología de precisión.',
          longDescription:
            'El ajuste y calibración de dispositivos ortopédicos es un proceso continuo que requiere experiencia técnica y tecnología de precisión. Nuestro equipo de técnicos especializados utiliza equipos de última generación para realizar ajustes milimétricos que optimizan la funcionalidad y confort.\n\nEl proceso de ajuste incluye evaluación del paciente, análisis de la marcha, pruebas de funcionalidad y calibración de componentes electrónicos cuando sea necesario. Utilizamos software especializado para analizar datos biomecánicos y realizar ajustes precisos.\n\nRealizamos seguimiento continuo del paciente, programando revisiones periódicas para evaluar el funcionamiento del dispositivo y realizar ajustes preventivos. Nuestro objetivo es garantizar que cada dispositivo mantenga su funcionalidad óptima a lo largo del tiempo.',
          img: '/images/banners/AjusteProtesisFD.png',
        },
      ],
    },
    musculoesqueletica: {
      title: 'Fisioterapia',
      description: 'Recupera movilidad y fuerza tras lesiones deportivas, cirugías o fracturas.',
      image: '/images/banners/Fisioterapiadf.png',
      features: [
        {
          title: 'Rehabilitación de Lesiones Deportivas',
          description:
            'Recuperación específica para deportistas de alto rendimiento con técnicas avanzadas.',
          longDescription:
            'Nuestro programa de rehabilitación deportiva está diseñado específicamente para atletas y deportistas que buscan recuperar su rendimiento óptimo después de una lesión. Utilizamos técnicas de fisioterapia avanzada combinadas con tecnología de vanguardia para acelerar la recuperación.\n\nEl tratamiento incluye evaluación biomecánica completa, análisis del gesto deportivo específico, programa de rehabilitación personalizado y prevención de recidivas. Trabajamos con equipos de última generación como ultrasonido terapéutico, electroestimulación y plataformas de equilibrio.\n\nNuestro equipo de fisioterapeutas especializados en deporte desarrolla protocolos específicos para cada tipo de lesión y deporte, garantizando una recuperación segura y efectiva. Realizamos seguimiento continuo del progreso y ajustamos el tratamiento según la evolución del paciente.',
          img: '/images/banners/Lesiones DeportivasFD.png',
        },
        {
          title: 'Rehabilitación Postoperatoria Integral',
          description: 'Recuperación completa después de cirugías con protocolos especializados.',
          longDescription:
            'La rehabilitación postoperatoria es fundamental para el éxito de cualquier intervención quirúrgica. Nuestro programa integral incluye evaluación preoperatoria, planificación del tratamiento postoperatorio y seguimiento continuo durante todo el proceso de recuperación.\n\nUtilizamos técnicas de fisioterapia especializadas como movilización precoz, ejercicios de fortalecimiento progresivo, control del dolor y prevención de complicaciones. Cada protocolo se adapta a la cirugía específica, la condición del paciente y sus objetivos de recuperación.\n\nNuestro equipo trabaja en coordinación con los cirujanos para garantizar que el tratamiento de rehabilitación complemente perfectamente la intervención quirúrgica. Realizamos evaluaciones periódicas para medir el progreso y ajustar el tratamiento según sea necesario.',
          img: '/images/banners/Rehabilitación PostoperatoriaFD.png',
        },
        {
          title: 'Terapia Manual Especializada',
          description:
            'Técnicas manuales avanzadas para alivio del dolor y mejora de la movilidad.',
          longDescription:
            'Nuestra terapia manual especializada combina técnicas tradicionales con enfoques modernos para proporcionar alivio efectivo del dolor y mejora de la movilidad. Utilizamos técnicas como masaje terapéutico, movilización articular, técnicas de liberación miofascial y estiramientos específicos.\n\nEl tratamiento se basa en evaluación manual completa, identificación de puntos gatillo y áreas de tensión, aplicación de técnicas específicas y educación del paciente sobre autocuidado. Cada sesión se adapta a las necesidades específicas del paciente y su respuesta al tratamiento.\n\nRealizamos seguimiento continuo del paciente, ajustando las técnicas según su evolución y necesidades cambiantes. Nuestro objetivo es proporcionar alivio inmediato del dolor mientras trabajamos en la mejora a largo plazo de la movilidad y funcionalidad.',
          img: '/images/banners/Fisioterapia2fd.png',
        },
        {
          title: 'Fortalecimiento Muscular Especializado',
          description:
            'Programas personalizados de fortalecimiento con equipos de última generación.',
          longDescription:
            'Nuestros programas de fortalecimiento muscular están diseñados específicamente para cada paciente, considerando su condición física, objetivos y limitaciones. Utilizamos equipos de última generación como máquinas isocinéticas, plataformas vibratorias y sistemas de resistencia variable.\n\nEl programa incluye evaluación inicial de fuerza y resistencia, diseño de rutinas personalizadas, supervisión durante las sesiones y seguimiento del progreso. Trabajamos con diferentes modalidades de entrenamiento como entrenamiento excéntrico, pliométrico y funcional.\n\nNuestro equipo de fisioterapeutas especializados en ejercicio terapéutico garantiza que cada programa sea seguro, efectivo y adaptado a las necesidades específicas del paciente. Realizamos evaluaciones periódicas para medir el progreso y ajustar la intensidad del entrenamiento.',
          img: '/images/banners/fortalecimientomuscularfd.png',
        },
      ],
    },
    amputados: {
      title: 'Órtesis',
      description:
        'Fabricación, ajuste y personalización de dispositivos ortopédicos con tecnología digital y materiales de alta calidad.',
      image: '/images/banners/Ortesis cafeteria.png',
      features: [
        {
          title: 'Órtesis de rodilla (Rodilleras)',
          description: 'Dispositivos para estabilización y protección articular.',
          longDescription:
            'Nuestras órtesis de rodilla están diseñadas específicamente para cada paciente, considerando su patología, nivel de actividad y objetivos de tratamiento. Utilizamos materiales de última generación que combinan ligereza, durabilidad y confort.\n\nEl proceso incluye evaluación biomecánica completa, análisis de la marcha, diseño personalizado y fabricación en nuestro taller especializado. Cada órtesis se ajusta perfectamente a la anatomía del paciente, proporcionando el soporte necesario sin limitar la movilidad.\n\nRealizamos seguimiento continuo del paciente, ajustando la órtesis según su evolución y necesidades cambiantes. Nuestro objetivo es proporcionar estabilidad y protección articular mientras mantenemos la máxima funcionalidad posible.',
          img: '/images/banners/Órtesis de RodillaFD.png',
        },
        {
          title: 'Férulas y Soportes',
          description: 'Inmovilización y soporte terapéutico adaptado a cada necesidad específica.',
          longDescription:
            'Nuestras férulas y soportes personalizados están diseñados para proporcionar inmovilización terapéutica y soporte específico según la patología del paciente. Utilizamos termoplásticos de alta calidad que se moldean perfectamente a la anatomía del paciente.\n\nEl proceso de fabricación incluye evaluación clínica, diseño personalizado, moldeado a medida y pruebas de ajuste. Cada dispositivo se fabrica considerando factores como la duración del tratamiento, nivel de actividad y comodidad del paciente.\n\nRealizamos revisiones periódicas para evaluar la efectividad del tratamiento y realizar ajustes cuando sea necesario. Nuestro equipo de técnicos especializados garantiza que cada dispositivo cumpla con los más altos estándares de calidad y funcionalidad.',
          img: '/images/banners/Férulas y SoportesFD.png',
        },
        {
          title: 'Órtesis de Columna',
          description: 'Sistemas de soporte especializados para problemas de columna y postura.',
          longDescription:
            'Nuestras órtesis de columna están diseñadas para proporcionar soporte y corrección postural específica según la patología del paciente. Utilizamos sistemas modulares que permiten ajustes precisos y personalización completa.\n\nEl proceso incluye evaluación postural completa, análisis de la marcha, diseño personalizado y fabricación en nuestro taller especializado. Cada órtesis se ajusta perfectamente al paciente, proporcionando el soporte necesario sin comprometer la movilidad.\n\nRealizamos seguimiento continuo del paciente, ajustando la órtesis según su evolución y respuesta al tratamiento. Nuestro objetivo es mejorar la postura, reducir el dolor y prevenir futuras complicaciones.',
          img: '/images/banners/Órtesis de ColumnaFD.png',
        },
        {
          title: 'Mangas y equipo deportivo',
          description: 'Compresión, soporte y accesorios para actividad física y deporte.',
          longDescription:
            'Nuestras órtesis deportivas están diseñadas específicamente para deportistas y personas activas que requieren soporte articular durante actividades físicas. Utilizamos materiales ligeros y resistentes que permiten libertad de movimiento sin comprometer la protección.\n\nEl proceso incluye evaluación biomecánica deportiva, análisis del gesto deportivo específico, diseño personalizado y fabricación en nuestro taller especializado. Cada órtesis se adapta perfectamente al deporte y nivel de actividad del paciente.\n\nRealizamos pruebas de funcionalidad deportiva y seguimiento continuo del paciente para garantizar que la órtesis cumpla con sus necesidades específicas. Nuestro objetivo es permitir que el deportista mantenga su rendimiento mientras protege sus articulaciones.',
          img: '/images/banners/Mangas y equipo deportivoFD.png',
        },
      ],
    },
    dolor: {
      title: 'Rehabilitación del Dolor Crónico',
      description:
        'Manejo integral de dolor persistente, artritis y fibromialgia con técnicas especializadas.',
      image: '/images/banners/Rehabilitación del Dolor CrónicoFD.png',
      features: [
        {
          title: 'Manejo Integral del Dolor de Espalda',
          description:
            'Terapias especializadas para aliviar el dolor crónico de espalda con enfoque multidisciplinario.',
          longDescription:
            'Nuestro programa de manejo del dolor de espalda crónico combina técnicas de fisioterapia avanzada con enfoques multidisciplinarios para abordar las causas raíz del dolor. Utilizamos evaluación biomecánica completa, análisis postural y diagnóstico funcional para desarrollar un plan de tratamiento personalizado.\n\nEl tratamiento incluye terapia manual especializada, ejercicios de estabilización lumbar, técnicas de relajación muscular y educación del paciente sobre ergonomía y prevención. Trabajamos con equipos de última generación como ultrasonido terapéutico, electroestimulación y sistemas de tracción.\n\nRealizamos seguimiento continuo del paciente, ajustando el tratamiento según su evolución y respuesta. Nuestro objetivo es no solo aliviar el dolor, sino también mejorar la funcionalidad y prevenir futuras recidivas.',
          img: '/images/banners/Manejo Integral del Dolor de EspaldaFD.png',
        },
        {
          title: 'Tratamiento de Artritis y Fibromialgia',
          description:
            'Manejo integral de la inflamación y dolor con técnicas especializadas y tecnología avanzada.',
          longDescription:
            'Nuestro programa para artritis y fibromialgia está diseñado para mejorar la calidad de vida de pacientes con estas condiciones crónicas. Utilizamos un enfoque integral que combina fisioterapia especializada, ejercicio terapéutico y técnicas de manejo del dolor.\n\nEl tratamiento incluye evaluación funcional completa, programa de ejercicio adaptado, técnicas de relajación muscular, educación sobre manejo del dolor y asesoría sobre modificaciones del estilo de vida. Trabajamos con equipos especializados como baños de parafina, ultrasonido terapéutico y sistemas de estimulación eléctrica.\n\nRealizamos seguimiento continuo del paciente, ajustando el tratamiento según la evolución de la enfermedad y las necesidades cambiantes. Nuestro objetivo es mejorar la movilidad, reducir el dolor y mantener la independencia funcional.',
          img: '/images/banners/Tratamiento de ArtritisFD.png',
        },
        {
          title: 'Terapia con equipo especializado',
          description:
            'Rehabilitación con dispositivos y tecnología específica para cada fase del tratamiento.',
          longDescription:
            'Contamos con equipo especializado para rehabilitación que nos permite adaptar la terapia a tus necesidades: electroestimulación, ultrasonido terapéutico, plataformas de equilibrio, bandas elásticas, poleas y sistemas de resistencia progresiva.\n\nIniciamos con una evaluación funcional para definir objetivos claros y asignar el equipo adecuado a cada etapa (control del dolor, movilidad, fuerza y estabilidad). Las sesiones son guiadas y progresivas, priorizando seguridad y eficacia.\n\nMedimos resultados periódicamente y ajustamos parámetros e intensidad según tu respuesta clínica, asegurando avances sostenidos y una recuperación más rápida y segura.',
          img: '/images/banners/Ejercicio TerapéuticoFD.png',
        },
        {
          title: 'Seguimiento Continuo',
          description:
            'Revisiones periódicas, ajustes y acompañamiento para un control duradero del dolor.',
          longDescription:
            'El seguimiento continuo es clave en el manejo del dolor crónico. Programamos revisiones periódicas para evaluar tu evolución, ajustar el plan terapéutico y reforzar estrategias de autocuidado.\n\nIntegramos medición de progreso, ajuste de ejercicios, educación postural, hábitos saludables y, cuando corresponde, coordinación con otros especialistas. Este enfoque iterativo permite prevenir recaídas, mantener logros y mejorar tu calidad de vida a largo plazo.\n\nNos enfocamos en objetivos realistas y medibles, optimizando la frecuencia de sesiones y la combinación de terapias según tu respuesta clínica.',
          img: '/images/banners/Seguimiento ContinuoFD.png',
        },
      ],
    },
    productos: {
      title: 'Área de Productos Ortopédicos',
      description:
        'Asesoría especializada y venta de productos ortopédicos de alta calidad: bastones, muletas, sillas de ruedas y más.',
      image: '/images/banners/Área de Productos OrtopédicosFD.png',
      features: [
        {
          title: 'Bastones y Muletas',
          description:
            'Soporte especializado para mejorar la movilidad con productos de alta calidad.',
          longDescription:
            'Nuestro catálogo de bastones y muletas incluye productos de la más alta calidad, diseñados para proporcionar soporte y estabilidad según las necesidades específicas de cada paciente. Ofrecemos asesoría especializada para seleccionar el producto más adecuado.\n\nNuestros productos incluyen bastones ajustables, muletas de axila y antebrazo, bastones con base amplia para mayor estabilidad y productos especializados para diferentes condiciones. Cada producto se selecciona considerando factores como el nivel de movilidad del paciente, su condición física y estilo de vida.\n\nRealizamos evaluación funcional para determinar el producto más adecuado, asesoría sobre uso correcto y seguimiento para garantizar que el producto cumpla con las necesidades del paciente. Nuestro objetivo es mejorar la movilidad y seguridad del paciente.',
          img: '/images/banners/Bastones y Muletas.png',
        },
        {
          title: 'Sillas de Ruedas',
          description: 'Modelos manuales y eléctricos de alta calidad con tecnología avanzada.',
          longDescription:
            'Nuestras sillas de ruedas representan la vanguardia en tecnología de movilidad, ofreciendo comodidad, funcionalidad y seguridad. Incluimos modelos manuales ligeros, sillas eléctricas de alta tecnología y productos especializados para diferentes necesidades.\n\nCada silla se selecciona considerando factores como el nivel de movilidad del usuario, su entorno de uso, necesidades de transporte y estilo de vida. Nuestros productos incluyen sillas con sistemas de propulsión asistida, asientos especializados para prevención de úlceras por presión y sistemas de posicionamiento avanzados.\n\nRealizamos evaluación funcional completa, asesoría sobre selección del producto, entrenamiento en uso y seguimiento continuo. Nuestro objetivo es proporcionar independencia y calidad de vida a nuestros usuarios.',
          img: '/images/banners/Sillas de RuedasFD.png',
        },
        {
          title: 'Calzado Ortopédico',
          description: 'Zapatos especializados diseñados para diferentes necesidades ortopédicas.',
          longDescription:
            'Nuestro calzado ortopédico está diseñado específicamente para personas con necesidades especiales, combinando funcionalidad terapéutica con comodidad y estilo. Ofrecemos zapatos con características especiales como suelas antideslizantes, plantillas removibles y ajustes personalizados.\n\nNuestros productos incluyen calzado para pie diabético, zapatos con soporte para arco alto o bajo, calzado postoperatorio y zapatos especializados para diferentes actividades. Cada producto se selecciona considerando la condición específica del paciente, su nivel de actividad y preferencias de estilo.\n\nRealizamos evaluación del pie, asesoría sobre selección del calzado, pruebas de ajuste y seguimiento para garantizar que el producto cumpla con las necesidades del paciente. Nuestro objetivo es proporcionar comodidad y soporte mientras mantenemos la movilidad.',
          img: '/images/banners/Calzado OrtopédicoFD.png',
        },
        {
          title: 'Fajas y Soportes',
          description:
            'Apoyo especializado para la columna y articulaciones con productos de alta calidad.',
          longDescription:
            'Nuestras fajas y soportes están diseñados para proporcionar soporte terapéutico específico según las necesidades de cada paciente. Utilizamos materiales de alta calidad que combinan soporte efectivo con comodidad y durabilidad.\n\nNuestros productos incluyen fajas lumbares, soportes para rodilla, tobilleras, muñequeras y productos especializados para diferentes condiciones. Cada producto se selecciona considerando la patología específica, nivel de actividad y objetivos de tratamiento del paciente.\n\nRealizamos evaluación funcional, asesoría sobre selección del producto, instrucciones de uso y seguimiento para garantizar efectividad. Nuestro objetivo es proporcionar soporte terapéutico efectivo mientras mantenemos la movilidad y comodidad del paciente.',
          img: '/images/banners/Fajas y SoportesFD.png',
        },
      ],
    },
  };

  const paginate = (newDirection) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const newIndex = (currentIndex + newDirection + tabs.length) % tabs.length;
    setActiveTab(tabs[newIndex].id);
  };

  return (
    <section id="interactive-services" className="bg-white py-16 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-1/3 w-72 h-72 bg-gray-50 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-50 rounded-full opacity-15 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
            <span
              className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"
              style={{ transform: 'translateY(1px)' }}
            ></span>
            Servicios Especializados
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ofrecemos soluciones de Rehabilitación y ortopedia completas con tecnología avanzada
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo nuestra tecnología de vanguardia y atención personalizada pueden
            transformar tu calidad de vida.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md border transition-all duration-300 text-center ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-transparent text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              <span className="block leading-tight">
                {tab.label.includes('Taller de Prótesis y Rehabilitación en Amputados')
                  ? 'Taller de Prótesis\ny Rehabilitación en Amputados'
                  : tab.label.includes('Rehabilitación en Amputados')
                    ? 'Rehabilitación en\nAmputados'
                    : tab.label.includes('Rehabilitación Musculoesquelética')
                      ? 'Rehabilitación\nMusculoesquelética'
                      : tab.label.includes('Rehabilitación Pediátrica')
                        ? 'Rehabilitación\nPediátrica'
                        : tab.label.includes('Productos Ortopédicos')
                          ? 'Productos\nOrtopédicos'
                          : tab.label}
              </span>
            </button>
          ))}
        </div>

        <div className="relative">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            {/* Left side - Image */}
            <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={content[activeTab].image}
                alt={content[activeTab].title}
                fill
                className="object-cover"
                quality={95}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Right side - Content */}
            <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900 p-8 rounded-2xl shadow-xl border border-white/20">
              <h3 className="text-3xl font-bold mb-4 text-gray-900">{content[activeTab].title}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">{content[activeTab].description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push(`/servicios/detalle/${activeTab}`)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Flecha derecha */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 backdrop-blur-sm rounded-full p-3 cursor-pointer z-20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Pestaña siguiente"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Feature Cards con BentoGrid */}
        <motion.div
          key={`${activeTab}-features`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <BentoGrid className="md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content[activeTab].features.map((feature, index) => {
              // Crear elementos para el Marquee (imágenes de otras features)
              const otherFeatures = content[activeTab].features.filter((f, i) => i !== index);
              const marqueeItems = otherFeatures.slice(0, 3);

              return (
                <BentoCard
                  key={feature.title}
                  className="bg-white text-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-105 hover:border-blue-200 shadow-lg flex flex-col h-full"
                  rowSpan={1}
                  colSpan={1}
                >
                  <div className="absolute inset-0">
                    {/* Imagen principal */}
                    <div className="relative w-full h-[200px]">
                      <Image
                        src={feature.img}
                        alt={feature.title}
                        fill
                        className="object-cover"
                        quality={95}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        priority={index < 2}
                      />
                    </div>
                    {/* Marquee animado en la parte inferior */}
                    <div className="absolute bottom-0 left-0 right-0 h-[100px] overflow-hidden">
                      <Marquee
                        pauseOnHover
                        className="absolute top-0 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
                      >
                        {marqueeItems.map((f, idx) => (
                          <figure
                            key={idx}
                            className="relative w-24 cursor-pointer overflow-hidden rounded-lg border p-2 border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none mx-2"
                          >
                            <div className="relative w-full h-16 mb-1">
                              <Image
                                src={f.img}
                                alt={f.title}
                                fill
                                className="object-cover rounded"
                                quality={75}
                              />
                            </div>
                            <figcaption className="text-xs font-medium text-gray-700 truncate">
                              {f.title}
                            </figcaption>
                          </figure>
                        ))}
                      </Marquee>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col h-full pt-[200px]">
                    <div className="p-5 flex flex-col flex-grow bg-white">
                      <h4 className="font-bold text-gray-900 mb-3 text-lg leading-tight">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                        {feature.description}
                      </p>
                      <button
                        onClick={() => setSelectedFeature(feature)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors flex items-center mt-auto"
                      >
                        Ver más
                        <svg
                          className="w-4 h-4 ml-1"
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
                      </button>
                    </div>
                  </div>
                </BentoCard>
              );
            })}
          </BentoGrid>
        </motion.div>

        {/* Enhanced Modal/Slide-over Panel - Usando Portal para evitar stacking context */}
        {typeof window !== 'undefined' &&
          createPortal(
            <AnimatePresence>
              {selectedFeature && (
                <>
                  {/* Backdrop - Cierra al hacer click fuera */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
                    style={{ zIndex: 9990 }}
                    onClick={() => setSelectedFeature(null)}
                    aria-hidden="true"
                  />

                  {/* Modal Panel - Posicionado arriba para evitar superposiciones */}
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed inset-0 flex items-start justify-center p-4 pt-8 sm:pt-12 md:pt-16 pointer-events-none"
                    style={{ zIndex: 9991 }}
                  >
                    <div
                      className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent flex flex-col border border-blue-100 pointer-events-auto relative"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="modal-title"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Header */}
                      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 flex-shrink-0">
                        <Image
                          src={selectedFeature.img}
                          alt={selectedFeature.title}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-blue-600/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-5 md:p-6">
                          <h2
                            id="modal-title"
                            className="text-2xl md:text-3xl font-extrabold text-white leading-tight drop-shadow-lg"
                          >
                            {selectedFeature.title}
                          </h2>
                          <p className="text-sm md:text-base text-white/95 mt-2 max-w-2xl">
                            {selectedFeature.description}
                          </p>
                        </div>
                        <motion.button
                          onClick={() => setSelectedFeature(null)}
                          className="absolute top-3 right-3 w-9 h-9 bg-white/70 backdrop-blur-sm border border-white/40 text-gray-700 hover:bg-white hover:scale-110 transition-all duration-200"
                          aria-label="Cerrar modal"
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <XIcon className="w-5 h-5" />
                        </motion.button>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 lg:p-6 bg-white/70">
                        {/* Descripción Principal */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="mb-5 sm:mb-6"
                        >
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <div className="w-6 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-2"></div>
                            Descripción del Servicio
                          </h3>
                          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 prose-p:leading-relaxed">
                            {selectedFeature.longDescription
                              .split('\n\n')
                              .map((paragraph, index) => (
                                <motion.p
                                  key={index}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                                  className="mb-3 text-gray-700 leading-relaxed text-sm"
                                >
                                  {paragraph}
                                </motion.p>
                              ))}
                          </div>
                        </motion.div>

                        {/* Proceso de Tratamiento */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.35 }}
                          className="mb-5 sm:mb-6"
                        >
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                            <div className="w-6 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-2"></div>
                            Proceso de Tratamiento
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {[
                              {
                                step: '1',
                                title: 'Evaluación Inicial',
                                desc: 'Análisis completo de tu condición y necesidades específicas',
                              },
                              {
                                step: '2',
                                title: 'Diseño Personalizado',
                                desc: 'Creación de un plan de tratamiento adaptado a ti',
                              },
                              {
                                step: '3',
                                title: 'Aplicación del Tratamiento',
                                desc: 'Implementación del protocolo con supervisión especializada',
                              },
                              {
                                step: '4',
                                title: 'Seguimiento Continuo',
                                desc: 'Monitoreo del progreso y ajustes según sea necesario',
                              },
                            ].map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -18 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.45, delay: 0.45 + index * 0.08 }}
                                className="flex items-start space-x-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                              >
                                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-[11px] sm:text-xs shadow-lg">
                                  {item.step}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-semibold text-gray-900 mb-0.5 text-sm">
                                    {item.title}
                                  </h4>
                                  <p className="text-xs text-gray-600 leading-relaxed">
                                    {item.desc}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Especificaciones Técnicas */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                          className="mb-4 sm:mb-5"
                        >
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                            <div className="w-6 h-1 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full mr-2"></div>
                            Especificaciones Técnicas
                          </h3>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                            {/* Características del Servicio */}
                            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                              <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                Características del Servicio
                              </h4>
                              <div className="space-y-2">
                                {[
                                  {
                                    label: 'Duración del Tratamiento',
                                    value: 'Varía según la condición',
                                  },
                                  {
                                    label: 'Sesiones Requeridas',
                                    value: 'Personalizadas según necesidades',
                                  },
                                  { label: 'Garantía', value: 'Seguimiento continuo incluido' },
                                  { label: 'Certificaciones', value: 'Profesionales certificados' },
                                ].map((spec, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.35, delay: 0.6 + index * 0.05 }}
                                    className="flex justify-between items-center py-2 border-b border-purple-100 last:border-b-0"
                                  >
                                    <span className="text-xs font-medium text-gray-700">
                                      {spec.label}
                                    </span>
                                    <span className="text-xs text-purple-600 font-semibold">
                                      {spec.value}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {/* Equipamiento Utilizado */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                              <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                Equipamiento Utilizado
                              </h4>
                              <div className="space-y-2">
                                {[
                                  'Tecnología 3D avanzada',
                                  'Software biomecánico especializado',
                                  'Materiales de grado médico',
                                  'Equipos de rehabilitación modernos',
                                ].map((equipment, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.35, delay: 0.65 + index * 0.05 }}
                                    className="flex items-center space-x-2 py-1.5"
                                  >
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                    <span className="text-xs text-gray-700">{equipment}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Información de Contacto */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          className="mb-4"
                        >
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center">
                            <div className="w-6 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mr-2"></div>
                            Información de Contacto
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {[
                              { icon: '📞', title: 'Teléfono', info: '+52 777 215 0982' },
                              { icon: '📍', title: 'Ubicación', info: 'Cuernavaca, Morelos' },
                              { icon: '🕒', title: 'Horarios', info: 'Lun-Vie: 9:00 - 18:00' },
                            ].map((contact, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.75 + index * 0.08 }}
                                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-3 border border-orange-100 text-center hover:shadow-md transition-all duration-300"
                              >
                                <div className="text-xl sm:text-2xl mb-1.5">{contact.icon}</div>
                                <h4 className="font-semibold text-gray-900 mb-0.5 text-sm">
                                  {contact.title}
                                </h4>
                                <p className="text-xs text-gray-600">{contact.info}</p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* CTA inline al final */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          className="pt-2 sm:pt-3"
                        >
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-3">
                              ¿Te interesa este servicio? Agenda tu cita.
                            </p>
                            <motion.button
                              onClick={() => {
                                setSelectedFeature(null);
                                openWhatsApp(
                                  `Hola, me gustaría obtener más información sobre el servicio: \"${selectedFeature.title}\".`,
                                );
                              }}
                              className="inline-flex items-center px-5 sm:px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <MessageSquareIcon className="mr-2 text-sm" />
                              Agendar cita por WhatsApp
                            </motion.button>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>
    </section>
  );
}

// Featured Services
function FeaturedServices() {
  const scrollContainerRef = React.useRef(null);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [maxScroll, setMaxScroll] = React.useState(0);

  const services = [
    {
      title: 'Plantillas Ortopédicas Personalizadas',
      image: '/images/banners/Plantillas PersonalizadasFD.png',
      description:
        'Diseño personalizado para cada pie con tecnología avanzada y materiales de alta calidad',
      category: 'Plantillas',
    },
    {
      title: 'Órtesis de Rodilla',
      image: '/images/banners/Órtesis de RodillaFD.png',
      description:
        'Dispositivos para estabilización y protección articular con materiales de última generación',
      category: 'Ortesis',
    },
    {
      title: 'Prótesis Personalizadas',
      image: '/images/banners/Técnico ajustando prótesis en tallerFD.png',
      description: 'Fabricación y adaptación de prótesis personalizadas con tecnología avanzada',
      category: 'Prótesis',
    },
    {
      title: 'Rehabilitación de Lesiones Deportivas',
      image: '/images/banners/Lesiones DeportivasFD.png',
      description:
        'Recuperación específica para deportistas de alto rendimiento con técnicas avanzadas',
      category: 'Fisioterapia',
    },
    {
      title: 'Manejo del Dolor de Espalda',
      image: '/images/banners/Manejo Integral del Dolor de EspaldaFD.png',
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
      image: '/images/banners/Calzado OrtopédicoFD.png',
      description: 'Zapatos especializados diseñados para diferentes necesidades ortopédicas',
      category: 'Calzado',
    },
    {
      title: 'Férulas y Soportes',
      image: '/images/banners/Férulas y SoportesFD.png',
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
    if (scrollContainerRef.current) {
      setMaxScroll(scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth);
    }
  }, []);

  return (
    <section className="bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 py-20 relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Servicios Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra gama completa de servicios especializados diseñados para mejorar tu
            movilidad y calidad de vida.
          </p>
        </div>
        <div className="relative">
          {/* Contenedor principal con padding para visibilidad de las flechas */}
          <div className="relative py-4">
            {/* Flecha Izquierda */}
            <button
              onClick={() => scroll('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md hover:bg-white transition-all duration-300 transform hover:scale-110"
              aria-label="Scroll Left"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600 transform rotate-180" />
            </button>

            {/* Contenedor del Scroll */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto px-8 pb-6 scrollbar-hide snap-x snap-mandatory"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 w-80 snap-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={200}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    <button className="text-sm font-semibold flex items-center text-blue-600 hover:text-blue-700 transition-colors group">
                      Más Información{' '}
                      <ChevronRightIcon className="ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Flecha Derecha */}
            <button
              onClick={() => scroll('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md hover:bg-white transition-all duration-300 transform hover:scale-110"
              aria-label="Scroll Right"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
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
            <span
              className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"
              style={{ transform: 'translateY(1px)' }}
            ></span>
            Recursos Educativos
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Recursos Educativos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprende más sobre tu condición y cómo optimizar tu recuperación con nuestros recursos
            especializados.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {webinars.map((w) => (
            <div
              key={w.title}
              className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 shadow-xl"
            >
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
