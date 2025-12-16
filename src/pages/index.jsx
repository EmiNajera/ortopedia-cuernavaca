import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import MarketingLayout from '@layouts/MarketingLayout';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';
import { getSiteUrl, getFullUrl } from '@shared/lib/utils/siteUrl';
import { cn } from '@/lib/utils';
import Marquee from '@/registry/magicui/marquee';
import Carousel from '@shared/components/Carousel';
import SEO from '@shared/components/SEO';
// Lazy load FeaturedServices solo en cliente para evitar problemas de hidratación
const FeaturedServices = dynamic(() => import('@domains/services/components/FeaturedServices'), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-50 animate-pulse" />, // Placeholder opcional
});

// Lazy load OptimizedVideo solo en cliente para evitar problemas de SSR
const OptimizedVideo = dynamic(() => import('@shared/components/ui/OptimizedVideo'), {
  ssr: false,
});
import FAQAccordion from '@shared/components/FAQAccordion';
// Lazy load framer-motion solo para animaciones no críticas
// Las animaciones críticas (above the fold) se cargan directamente
// Nota: dynamic ya está importado arriba (línea 5)

// Lazy load motion para componentes below the fold (no usado actualmente, pero disponible)
// const MotionLazy = dynamic(
//   () => import('framer-motion').then((mod) => mod.motion.div),
//   { ssr: false }
// );

// Para animaciones críticas, usar import directo
import { motion } from 'framer-motion';

// --- Iconos SVG para una apariencia limpia y moderna ---

// Icono para características clave y botones
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 ml-2 inline"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// Iconos para la sección de características clave
const InsolesIcon = () => (
  <svg
    className="w-12 h-12 text-cyan-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10s5 2 7 0l-1.657 1.657a4 4 0 01-5.656 0l-1.415-1.414m-2.828 2.828a4 4 0 010-5.656l1.415-1.414m5.656 0a8.003 8.003 0 010 11.314M9 10l.343-.343"
    ></path>
  </svg>
);
const ProsthesisIcon = () => (
  <svg
    className="w-12 h-12 text-cyan-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
    <path d="M18 18.5a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0zM12 12v6.5"></path>
  </svg>
);
const RehabIcon = () => (
  <svg
    className="w-12 h-12 text-cyan-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    ></path>
  </svg>
);

// Iconos para los servicios de rehabilitación
const PediatricIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    ></path>
  </svg>
);

const OrthesisIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    ></path>
  </svg>
);

const MusculoskeletalIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    ></path>
  </svg>
);

const AmputeeIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7l4-4m0 0l4 4m-4-4v18"
    ></path>
  </svg>
);

const PainIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
    ></path>
  </svg>
);

const ProductsIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    ></path>
  </svg>
);

// Icono de estrella para la calificación
const StarIcon = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>
);

// --- Componentes Reutilizables ---

// Tarjeta de Testimonio Rediseñada (para Marquee)
const TestimonialCard = ({ image, text, name, title }) => (
  <figure
    className={cn(
      'relative h-full w-72 cursor-pointer overflow-hidden rounded-2xl border p-4',
      'border-gray-950/[.06] bg-white shadow-sm hover:shadow-md',
      'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
    )}
  >
    <div className="flex flex-row items-center gap-3">
      <Image
        src={image}
        alt={name}
        width={40}
        height={40}
        className="rounded-full object-cover border border-gray-200"
      />
      <div className="flex flex-col">
        <figcaption className="text-sm font-semibold text-gray-900 dark:text-white">
          {name}
        </figcaption>
        <p className="text-xs font-medium text-gray-500 dark:text-white/60">{title}</p>
      </div>
    </div>
    <blockquote className="mt-3 text-sm text-gray-700 dark:text-gray-100 leading-relaxed">
      “{text}”
    </blockquote>
  </figure>
);

// Datos de testimonios para marquee
const testimonials = [
  {
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'Gracias a sus plantillas personalizadas, mi dolor crónico de pie desapareció en cuestión de semanas. ¡Ahora puedo caminar sin molestias!',
    name: 'Carlos Sánchez',
    title: 'Paciente de Plantillas Ortopédicas',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'La prótesis que me diseñaron no solo es funcional, sino también cómoda. Me devolvió la confianza y la movilidad que había perdido.',
    name: 'Laura Gómez',
    title: 'Paciente de Prótesis',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/51.jpg',
    text: 'El equipo de fisioterapia fue increíble. Su dedicación y profesionalismo aceleraron mi recuperación después de una cirugía de rodilla.',
    name: 'Roberto Díaz',
    title: 'Paciente de Fisioterapia',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    text: 'Me ayudaron a corregir mi postura y ahora puedo trabajar sin dolor lumbar constante.',
    name: 'María López',
    title: 'Paciente de Rehabilitación',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    text: 'La atención fue muy humana y profesional. Me explicaron cada paso del tratamiento.',
    name: 'Jorge Hernández',
    title: 'Paciente de Ortopedia',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    text: 'Mi hijo camina mucho mejor desde que usa las órtesis que nos recomendaron aquí.',
    name: 'Ana Martínez',
    title: 'Mamá de paciente pediátrico',
  },
];

const firstRowTestimonials = testimonials.slice(0, Math.ceil(testimonials.length / 2));
const secondRowTestimonials = testimonials.slice(Math.ceil(testimonials.length / 2));

const TestimonialsMarquee = () => (
  <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
    <Marquee pauseOnHover className="[--duration:28s]">
      {firstRowTestimonials.map((t) => (
        <TestimonialCard key={t.name} {...t} />
      ))}
    </Marquee>
    <Marquee reverse pauseOnHover className="[--duration:32s]">
      {secondRowTestimonials.map((t) => (
        <TestimonialCard key={t.name} {...t} />
      ))}
    </Marquee>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-100 via-gray-100/40 to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-100 via-gray-100/40 to-transparent" />
  </div>
);

// Items para el carrusel móvil de "Centro de rehabilitación integral"
const rehabCarouselItems = [
  {
    image: '/images/banners/DedosEsqueleto2.JPG',
    title: 'Valoración integral',
    description:
      'Recibe una valoración global y un plan adaptado a tu situación real desde tu primera visita, conectando todas las áreas necesarias para tu avance.',
  },
  {
    image: '/images/banners/Rodillera.jpg',
    title: 'Soluciones coordinadas',
    description:
      'Tratamiento coordinado entre terapias y dispositivos ortopédicos para que todo avance contigo.',
  },
  {
    image: '/images/banners/Ferula.jpg',
    title: 'Tecnología especializada',
    description:
      'Accede a dispositivos de vanguardia y fabricación personalizada de órtesis y prótesis.',
  },
  {
    image: '/images/banners/mensajes.jpg',
    title: 'Seguimiento continuo',
    description:
      'Monitoreamos tu progreso y ajustamos objetivos con una comunicación clara en cada etapa.',
  },
];

// Tarjeta para la sección de Áreas Fundamentales
const ServiceCard = ({ title, description, link }) => (
  <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:scale-105">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 flex-grow">{description}</p>
    <Link
      href={link}
      className="text-blue-600 font-semibold mt-6 self-start hover:text-blue-800 transition-colors group"
    >
      Ver más
      <span className="inline-block ml-2">
        <ArrowRightIcon />
      </span>
    </Link>
  </div>
);

// Tarjeta para la sección de Tienda
const ProductCard = ({ imgSrc, name }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-300">
    <div className="overflow-hidden relative h-48">
      <Image
        src={imgSrc}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <div className="p-4">
      <h4 className="text-lg font-bold text-gray-800">{name}</h4>
    </div>
  </div>
);

// --- Componente Principal de la Aplicación ---

// Datos para la sección de servicios de rehabilitación
const categorias = [
  {
    nombre: 'Rehabilitación Pediátrica',
    cita: 'Acompañamos el desarrollo de niñas y niños, corrigiendo a tiempo problemas de marcha, postura o pie plano.',
    autor: 'Tratamiento Especializado',
    empresa: 'Ortopedia Cuernavaca',
    imagen: '/images/banners/kidsitdown.jpg',
    marcas: ['Pie Plano', 'Estimulación Temprana', 'Órtesis Infantiles'],
    link: '/servicios?categoria=pediatrica',
    position: 'object-center', // Centrado para enfocar en los niños
  },
  {
    nombre: 'Taller de Órtesis y Prótesis',
    cita: 'Fabricación, ajuste y personalización de dispositivos ortopédicos en un solo lugar.',
    autor: 'Fabricación Digital',
    empresa: 'Ortopedia Cuernavaca',
    imagen: '/images/banners/TallerOrt.JPG',
    marcas: ['Plantillas a Medida', 'Órtesis Personalizadas', 'Prótesis Avanzadas'],
    link: '/servicios?categoria=ortesis',
    position: 'object-center', // Ajustado a centrado para bajar la imagen
  },
  {
    nombre: 'Rehabilitación Musculoesquelética',
    cita: 'Recupera movilidad y fuerza después de lesiones, cirugías o problemas de postura.',
    autor: 'Terapia Especializada',
    empresa: 'Ortopedia Cuernavaca',
    imagen: '/images/banners/fracturaosea.jpg',
    marcas: ['Lesiones Deportivas', 'Postoperatorio', 'Corrección Postural'],
    link: '/servicios?categoria=musculoesqueletica',
    position: 'object-center', // Centrado para enfocar en la lesión
  },
  {
    nombre: 'Rehabilitación en Amputados y Prótesis',
    cita: 'Entrenamiento y fortalecimiento para usar tu prótesis con seguridad y confianza.',
    autor: 'Entrenamiento Especializado',
    empresa: 'Ortopedia Cuernavaca',
    imagen: '/images/banners/protesis.jpg',
    marcas: ['Adaptación Prótesis', 'Prevención Caídas', 'Atención Integral'],
    link: '/servicios?categoria=amputados',
    position: 'object-center', // Centrado para destacar la prótesis
  },
  {
    nombre: 'Rehabilitación del Dolor Crónico',
    cita: 'Alivio y control de molestias persistentes en espalda, cuello o articulaciones.',
    autor: 'Terapia del Dolor',
    empresa: 'Ortopedia Cuernavaca',
    imagen: '/images/banners/dolocroc.jpg',
    marcas: ['Dolor Espalda', 'Artritis', 'Ejercicio Guiado'],
    link: '/servicios?categoria=dolor',
    position: 'object-bottom', // Ajustado a bottom para mostrar la parte inferior
  },
  {
    nombre: 'Área de Productos Ortopédicos',
    cita: 'Soluciones de apoyo y movilidad para tu vida diaria.',
    autor: 'Productos Especializados',
    empresa: 'Ortopedia Cuernavaca',
    imagen: '/images/banners/Collage.png',
    marcas: ['Bastones y Muletas', 'Sillas de Ruedas', 'Zapatos Ortopédicos'],
    link: '/servicios?categoria=productos',
    position: 'object-center', // Por defecto
  },
];

export default function IndexPage() {
  const [activo, setActivo] = useState(categorias[0]);
  const activeIndex = categorias.findIndex((c) => c.nombre === activo.nombre);

  return (
    <>
      <SEO
        title="Rehabilitación física y ortopedia"
        description="OrtoTech | Ortopedia Cuernavaca: Soluciones integrales en rehabilitación física y ortopedia. Te acompañamos desde el diagnóstico hasta la recuperación."
        image="/images/banners/Ortopedia Cuernavaca Logo.png"
      />

      <Head>
        {/* JSON-LD Structured Data - Se mantiene en Head ya que es específico */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalBusiness',
              name: 'Ortopedia Cuernavaca',
              description: 'Soluciones integrales en rehabilitación física y ortopedia',
              url: getSiteUrl(),
              logo: getFullUrl('/images/banners/Ortopedia Cuernavaca Logo.png'),
              image: getFullUrl('/images/banners/Ortopedia Cuernavaca Logo.png'),
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cuernavaca',
                addressRegion: 'Morelos',
                addressCountry: 'MX',
              },
              telephone: '+52-777-123-4567',
              email: 'contacto@ortopedia-cuernavaca.com',
              openingHours: 'Mo-Fr 09:00-18:00, Sa 09:00-14:00',
              priceRange: '$$',
              medicalSpecialty: ['Orthopedics', 'Physical Therapy', 'Rehabilitation'],
              serviceType: [
                'Plantillas ortopédicas',
                'Fajas y soporte lumbar',
                'Rodilleras y ortesis',
                'Calzado ortopédico',
                'Rehabilitación y fisioterapia',
                'Ortopedia pediátrica',
              ],
            }),
          }}
        />
      </Head>

      <>
        {/* Estilos CSS premium para transiciones fluidas */}
        {/* Global Styles for non-Framer elements */}
        <style jsx global>{`
          .touch-target {
            min-height: 44px;
            min-width: 44px;
          }
        `}</style>

        <main id="contenido-principal">
          {/* Contenedor principal */}
          <div className="relative">
            {/* Sección 1 – Hero Principal */}
            <section
              id="hero"
              aria-labelledby="hero-heading"
              className="relative min-h-[100vh] sm:min-h-screen flex items-start justify-center text-center overflow-hidden"
            >
              {/* Background with Ken Burns effect */}
              <motion.div
                className="absolute inset-0 w-full h-full z-0"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1.0 }}
                transition={{ duration: 10, ease: 'easeOut' }}
              >
                <Image
                  src="/images/banners/protesis-tie.jpg"
                  alt="Hero background - Ortopedia Cuernavaca"
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                  sizes="100vw"
                />
                {/* Overlay sutil para mejorar contraste */}
                <div className="absolute inset-0 bg-black/30"></div>
              </motion.div>

              {/* Contenido centrado horizontalmente, alineado arriba */}
              <div
                className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center justify-center text-center"
                style={{ marginTop: '40px', paddingTop: '0', paddingBottom: '0' }}
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.3,
                      },
                    },
                  }}
                  className="flex flex-col items-center"
                >
                  {/* Logo Animation */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 20 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 100,
                          damping: 15,
                        },
                      },
                    }}
                    className="flex justify-center items-center mb-1"
                  >
                    <Image
                      src="/images/banners/Ortopedia Cuernavaca Logo.svg"
                      alt="Ortopedia Cuernavaca logo, marca de la clínica"
                      width={600}
                      height={200}
                      quality={100}
                      className="w-auto h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64"
                      style={{
                        filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))',
                      }}
                      priority
                    />
                  </motion.div>

                  {/* Heading Animation */}
                  <motion.h1
                    id="hero-heading"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
                      },
                    }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white max-w-5xl tracking-tight leading-none drop-shadow-xl"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Ortopedia y rehabilitación física
                  </motion.h1>

                  {/* Subtitle Animation */}
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, ease: 'easeOut' },
                      },
                    }}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl mt-4 max-w-3xl mx-auto text-white/90 font-medium leading-relaxed drop-shadow-md"
                  >
                    Te acompañamos con tratamientos personalizados desde el diagnóstico hasta la
                    recuperación.
                  </motion.p>

                  {/* Buttons Animation */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: 'easeOut' },
                      },
                    }}
                    className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openWhatsApp()}
                      className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors"
                    >
                      Agenda tu cita
                    </motion.button>
                    <Link href="/servicios" passHref legacyBehavior>
                      <motion.a
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 1)' }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/90 backdrop-blur-sm text-blue-700 font-semibold py-3 px-8 rounded-lg text-lg shadow-lg hover:text-blue-800 transition-all cursor-pointer inline-block"
                      >
                        Explora nuestros servicios
                      </motion.a>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* Transición elegante hacia la siguiente sección */}
              <div
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20"
                style={{
                  clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0% 100%)',
                }}
              ></div>

              {/* Indicador de desplazamiento */}
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                type="button"
                className="hidden sm:flex absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer flex-col items-center"
                onClick={() =>
                  document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <span className="text-white/80 text-xs tracking-widest uppercase mb-2 font-semibold shadow-black/20 text-shadow">
                  Descubre más
                </span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                  </svg>
                </motion.div>
              </motion.button>
            </section>

            {/* Sección 2 – Áreas Fundamentales con transición premium */}
            <section
              id="servicios"
              aria-labelledby="servicios-heading"
              className="relative z-20 mt-0 premium-transition"
            >
              <div className="relative min-h-[100vh] sm:min-h-screen w-full overflow-hidden">
                {/* Imagen de fondo estática como fallback y LCP - Siempre visible (WebP optimizado) */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/banners/hero-ortopedia-desktop.webp"
                    alt="Centro de rehabilitación integral Ortopedia Cuernavaca"
                    fill
                    className="object-cover"
                    priority
                    quality={85}
                    sizes="100vw"
                  />
                </div>

                {/* Video de fondo: versión desktop/tablet horizontal y versión mobile - Lazy loaded con Intersection Observer */}
                <div className="absolute inset-0 w-full h-full">
                  {/* Desktop / tablet horizontal */}
                  <OptimizedVideo
                    src="/videos/Hero-Ortopedia-Desktop.mp4"
                    poster="/images/banners/hero-ortopedia-desktop.webp"
                    className="hidden md:block w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  {/* Mobile (vertical) */}
                  <OptimizedVideo
                    src="/videos/Hero-Ortopedia-Mobile.mp4"
                    poster="/images/banners/hero-ortopedia-mobile.webp"
                    className="block md:hidden w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>

                {/* Overlay sutil (se mantiene igual que con la imagen) */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-black/30 via-blue-900/40 to-black/60 z-0"
                  style={{ mixBlendMode: 'multiply' }}
                ></div>

                {/* Contenido centrado con tipografía premium */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-[100vh] sm:min-h-screen p-4 sm:p-8">
                  <div className="text-center max-w-5xl mx-auto">
                    {/* Línea decorativa superior */}
                    <div className="flex items-center justify-center mb-6 sm:mb-8">
                      <div className="h-px w-12 bg-white/30"></div>
                      <div className="mx-4 text-white/80 text-xs sm:text-sm uppercase tracking-widest font-light">
                        Experiencia Integral
                      </div>
                      <div className="h-px w-12 bg-white/30"></div>
                    </div>

                    <h2
                      id="servicios-heading"
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight px-4"
                      style={{
                        letterSpacing: '-0.02em',
                        fontWeight: '700',
                        textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      }}
                    >
                      Centro de rehabilitación integral
                    </h2>

                    <p
                      className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 font-light leading-relaxed px-4"
                      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                    >
                      Órtesis, prótesis, plantillas personalizadas y fisioterapia. Todo lo que
                      necesitas para tu recuperación en un solo lugar.
                    </p>

                    {/* Botones con estilo premium */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6">
                      <Link
                        href="/servicios"
                        className="premium-hover px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-white text-blue-800 rounded-md font-medium tracking-wide transition-all text-sm sm:text-base min-h-[44px] touch-target flex items-center justify-center"
                      >
                        Nuestros servicios
                      </Link>
                      <Link
                        href="/nosotros"
                        className="premium-hover px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-white text-blue-800 sm:bg-transparent sm:text-white backdrop-blur-sm border border-white/60 rounded-md font-medium tracking-wide transition-all text-sm sm:text-base min-h-[44px] touch-target flex items-center justify-center"
                      >
                        Conoce más
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Secciones 3, 4, 5 y 6 comparten un mismo fondo continuo */}
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Fondo degradado horizontal continuo */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5" />
            {/* Degradado vertical muy suave que solo aclara hacia el final */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />

            {/* Sección 3 – Características Integrales */}
            <section
              id="centro-integral"
              aria-labelledby="centro-integral-heading"
              className="py-20 sm:py-32 font-sans relative"
            >
              <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
              {/* Elementos decorativos de fondo (solo círculos suaves) */}
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>

              <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-6">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Centro Integral de Rehabilitación
                  </div>
                  <h2
                    id="centro-integral-heading"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight px-4"
                  >
                    Todo lo que tu rehabilitación necesita,
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                      {' '}
                      en un solo lugar
                    </span>
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
                    Beneficios de un centro integral para tu recuperación. Nuestro enfoque
                    multidisciplinario combina diagnóstico avanzado, tratamientos personalizados y
                    seguimiento continuo para garantizar tu recuperación óptima.
                  </p>
                </div>

                {/* Vista móvil: carrusel 3D más natural */}
                <div className="mt-8 flex justify-center md:hidden">
                  <div style={{ height: '600px', position: 'relative' }}>
                    <Carousel
                      items={rehabCarouselItems}
                      baseWidth={320}
                      autoplay
                      autoplayDelay={3000}
                      pauseOnHover
                      loop
                      round={false}
                    />
                  </div>
                </div>

                {/* Vista tablet/desktop: layout con flex-wrap y centrado automático */}
                <div className="hidden md:flex mx-auto max-w-7xl flex-wrap justify-center gap-8">
                  {[
                    {
                      image: '/images/banners/DedosEsqueleto2.JPG',
                      title: 'Valoración',
                      subtitle: 'Valoración integral personalizada',
                      description:
                        'Recibe una valoración global y un plan adaptado a tu situación real desde tu primera visita, conectando todas las áreas necesarias para tu avance.',
                    },
                    {
                      image: '/images/banners/Rodillera.jpg',
                      title: 'Soluciones',
                      subtitle: 'Tratamiento coordinado integral',
                      description:
                        'Nuestro equipo multidisciplinario trabaja en conjunto para que tus terapias y dispositivos se ajusten y evolucionen a medida que progresas.',
                    },
                    {
                      image: '/images/banners/Ferula.jpg',
                      title: 'Tecnología',
                      subtitle: 'Dispositivos de vanguardia',
                      description:
                        'Accede a tecnologías especializadas y a la fabricación de órtesis y prótesis adaptadas, todo en el mismo centro y sin esperas innecesarias.',
                    },
                    {
                      image: '/images/banners/mensajes.jpg',
                      title: 'Seguimiento',
                      subtitle: 'Monitoreo continuo del progreso',
                      description:
                        'Tu evolución es monitoreada por el equipo, con ajustes de objetivos y una comunicación clara desde la cita inicial hasta el alta.',
                    },
                    {
                      image: '/images/banners/TallerOrt.JPG',
                      title: 'Coordinación',
                      subtitle: 'Equipo que trabaja en conjunto',
                      description:
                        'Integramos ortopedia clínica, taller de órtesis y prótesis y fisioterapia en un mismo plan, para que cada decisión esté alineada con tu recuperación completa.',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group cursor-pointer relative h-[360px] xl:h-[420px] flex-[0_1_30%] max-w-md"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: 'fadeInUp 0.6s ease-out forwards',
                      }}
                    >
                      {/* Card con efecto moderno y más grande */}
                      <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-white/80 via-white to-blue-50/40 shadow-xl shadow-blue-900/10 transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:shadow-blue-900/20 group-hover:-translate-y-4 group-hover:scale-[1.02]">
                        <div className="relative w-full h-52 xl:h-60 overflow-hidden rounded-t-3xl">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />
                        </div>
                        <div className="p-6 xl:p-7 flex flex-col h-[calc(100%-13rem)] xl:h-[calc(100%-15rem)]">
                          <h3 className="text-xl xl:text-2xl font-semibold tracking-tight text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                            {item.title}
                          </h3>
                          <div className="relative flex-1 mt-1">
                            {/* Subtítulo compacto */}
                            <p className="text-sm sm:text-[15px] text-gray-600 font-medium opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
                              {item.subtitle}
                            </p>
                            {/* Descripción extendida al hacer hover */}
                            <div className="text-sm sm:text-[15px] text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out absolute inset-0">
                              <p className="leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Sección 4 – Soluciones para cada necesidad de rehabilitación */}
            <section
              id="rehabilitacion"
              aria-labelledby="rehabilitacion-heading"
              className="py-24 relative overflow-hidden"
            >
              {/* Elementos decorativos de fondo */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-50 rounded-full opacity-30 blur-3xl"></div>

              <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                  <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                    Servicios Especializados
                  </span>
                  <h2
                    id="rehabilitacion-heading"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 leading-tight px-4"
                  >
                    Soluciones para cada necesidad de rehabilitación
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                    Selecciona el área que te interesa y descubre cómo podemos ayudarte en tu
                    proceso de recuperación.
                  </p>
                </div>

                {/* Versión móvil: cada categoría como card deslizable */}
                <div className="md:hidden -mx-4 px-4 pb-4 overflow-x-auto">
                  <div className="flex space-x-4 snap-x snap-mandatory">
                    {categorias.map((item, index) => {
                      let Icon;
                      if (item.nombre === 'Rehabilitación Pediátrica') Icon = PediatricIcon;
                      else if (item.nombre === 'Taller de Órtesis y Prótesis') Icon = OrthesisIcon;
                      else if (item.nombre === 'Rehabilitación Musculoesquelética')
                        Icon = MusculoskeletalIcon;
                      else if (item.nombre === 'Rehabilitación en Amputados y Prótesis')
                        Icon = AmputeeIcon;
                      else if (item.nombre === 'Rehabilitación del Dolor Crónico') Icon = PainIcon;
                      else Icon = ProductsIcon;

                      return (
                        <div
                          key={item.nombre}
                          className="snap-center min-w-[85%] max-w-sm flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                          {/* Imagen */}
                          <div className="relative w-full h-52 overflow-hidden">
                            <Image
                              src={item.imagen}
                              alt={item.nombre}
                              fill
                              className="object-cover"
                              style={{ objectPosition: item.position || 'center' }}
                            />
                          </div>

                          {/* Contenido */}
                          <div className="p-4 space-y-3">
                            {/* Etiqueta superior más sutil */}
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                              <Icon />
                              <span className="ml-1">{item.nombre}</span>
                            </div>

                            <p className="italic text-gray-700 text-sm leading-relaxed">
                              "{item.cita}"
                            </p>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">{item.autor}</p>
                              <p className="text-gray-500 text-xs">{item.empresa}</p>
                            </div>

                            {/* Marcas como pills */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {item.marcas.map((marca, idx) => (
                                <Link
                                  key={idx}
                                  href={item.link}
                                  aria-label={`${marca} - ver más`}
                                  className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100"
                                >
                                  {marca}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Versión desktop/tablet: tabs + panel dinámico como antes */}
                <div className="hidden md:block">
                  <div
                    className="flex flex-wrap justify-center gap-4 mb-12"
                    role="tablist"
                    aria-label="Categorías de servicios de rehabilitación"
                    aria-orientation="horizontal"
                  >
                    {categorias.map((item, index) => {
                      // Seleccionar el icono apropiado según el nombre del servicio
                      let Icon;
                      if (item.nombre === 'Rehabilitación Pediátrica') Icon = PediatricIcon;
                      else if (item.nombre === 'Taller de Órtesis y Prótesis') Icon = OrthesisIcon;
                      else if (item.nombre === 'Rehabilitación Musculoesquelética')
                        Icon = MusculoskeletalIcon;
                      else if (item.nombre === 'Rehabilitación en Amputados y Prótesis')
                        Icon = AmputeeIcon;
                      else if (item.nombre === 'Rehabilitación del Dolor Crónico') Icon = PainIcon;
                      else Icon = ProductsIcon;

                      return (
                        <button
                          key={item.nombre}
                          onClick={() => setActivo(item)}
                          type="button"
                          role="tab"
                          aria-selected={activo.nombre === item.nombre}
                          aria-controls={`tabpanel-${index}`}
                          id={`tab-${index}`}
                          tabIndex={activo.nombre === item.nombre ? 0 : -1}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                              e.preventDefault();
                              const dir = e.key === 'ArrowRight' ? 1 : -1;
                              const currentIndex = index;
                              const total = categorias.length;
                              const nextIndex = (currentIndex + dir + total) % total;
                              const nextItem = categorias[nextIndex];
                              setActivo(nextItem);
                              // Move focus to next tab
                              setTimeout(() => {
                                const nextBtn = document.getElementById(`tab-${nextIndex}`);
                                nextBtn?.focus();
                              }, 0);
                            }
                          }}
                          className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                            activo.nombre === item.nombre
                              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <Icon />
                          <span>{item.nombre}</span>
                          {activo.nombre === item.nombre && (
                            <span className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Contenido dinámico de servicios */}
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-102 transition-all duration-500 bg-gradient-to-b from-gray-50 to-white"
                    role="tabpanel"
                    id={`tabpanel-${activeIndex}`}
                    aria-labelledby={`tab-${activeIndex}`}
                  >
                    {/* Añadimos un overlay decorativo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none"></div>

                    <div className="relative w-full h-96">
                      <Image
                        src={activo.imagen}
                        alt={activo.nombre}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        style={{
                          objectPosition: activo.position || 'center',
                        }}
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 p-8 bg-white/95 backdrop-blur-sm rounded-tr-2xl w-full md:w-1/2 shadow-lg transform transition-all duration-500 hover:shadow-xl">
                      <p className="italic text-gray-700 mb-4 text-lg leading-relaxed">
                        "{activo.cita}"
                      </p>
                      <p className="font-bold text-gray-900">{activo.autor}</p>
                      <p className="text-gray-500">{activo.empresa}</p>
                    </div>

                    <div className="absolute top-6 right-6 space-y-4">
                      {activo.marcas.map((marca, index) => (
                        <Link
                          key={index}
                          href={activo.link}
                          aria-label={`${marca} - ver más`}
                          className="block bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-5 py-3 text-sm font-medium hover:bg-blue-50 transition-all transform hover:scale-105 hover:shadow-xl border-l-4 border-blue-500"
                        >
                          {marca}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sección Extra - Servicios Destacados */}
            <FeaturedServices />

            {/* Sección 5 – Historias de Pacientes (Rediseñada) */}
            <section
              id="historias-pacientes"
              aria-labelledby="historias-heading"
              className="py-24 relative overflow-hidden"
            >
              {/* Elementos decorativos */}
              <div className="absolute top-0 left-1/3 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-100 rounded-full opacity-15 blur-3xl"></div>
              <div className="container mx-auto px-6 text-center">
                <div className="mb-12 sm:mb-16">
                  <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                    Testimonios
                  </span>
                  <h2
                    id="historias-heading"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight px-4"
                  >
                    La voz de nuestros pacientes
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                    Descubre cómo hemos ayudado a personas como tú a recuperar su calidad de vida.
                  </p>
                </div>

                <TestimonialsMarquee />
              </div>
            </section>

            {/* Sección 6 – FAQ */}
            <section
              id="faq"
              aria-labelledby="faq-heading"
              className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
            >
              {/* Elementos decorativos sutiles */}
              <div className="absolute top-0 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-blue-50 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute bottom-0 left-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-gray-50 rounded-full opacity-15 blur-3xl"></div>

              <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* FAQ está below the fold, usar animación CSS en lugar de framer-motion */}
                <div className="text-center mb-12 sm:mb-16 animate-fade-in">
                  <div className="inline-flex items-center px-3 sm:px-4 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold rounded-full mb-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                    Resolvemos tus Dudas
                  </div>
                  <h2
                    id="faq-heading"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4"
                  >
                    Preguntas Frecuentes
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    Encuentra respuestas claras y directas sobre nuestros servicios ortopédicos y de
                    rehabilitación.
                  </p>
                </div>

                <FAQAccordion
                  items={[
                    {
                      question: '¿Son una clínica de ortopedia?',
                      answer:
                        'Somos un Centro Integral de Rehabilitación. Contamos con servicios de ortopedia clínica, órtesis y prótesis, y un área especializada de fisioterapia y rehabilitación física.',
                    },
                    {
                      question: '¿Ofrecen consulta médica?',
                      answer:
                        'No ofrecemos consulta médica. Somos especialistas en órtesis, prótesis y rehabilitación física. Si tu caso requiere valoración por un médico ortopedista, te canalizamos con especialistas de confianza.',
                    },
                    {
                      question: '¿Necesito receta o referencia médica para acudir?',
                      answer:
                        'No. Puedes agendar tu consulta inicial directamente. Si durante tu valoración detectamos que necesitas evaluación médica adicional, te lo informamos y orientamos.',
                    },
                    {
                      question: '¿Qué servicios de fisioterapia ofrecen?',
                      answer:
                        'Ofrecemos terapia física, terapia manual, rehabilitación musculoesquelética, recuperación de lesiones deportivas, manejo del dolor, movilidad, fortalecimiento y reentrenamiento funcional, entre otros tratamientos personalizados.',
                    },
                    {
                      question: '¿Quién realiza las sesiones de fisioterapia?',
                      answer:
                        'Las sesiones son realizadas por Licenciados en Terapia Física formados en el Instituto Nacional de Rehabilitación (INR), con amplia experiencia clínica.',
                    },
                    {
                      question: '¿Cuánto dura un tratamiento de rehabilitación física?',
                      answer:
                        'La duración depende de tu diagnóstico y objetivos. En la valoración inicial te damos un plan personalizado y una estimación del tiempo necesario para tu recuperación.',
                    },
                    {
                      question: '¿Las prótesis son a la medida? ¿Qué materiales utilizan?',
                      answer:
                        'Sí. Adaptamos prótesis totalmente personalizadas a tu anatomía y necesidades funcionales, utilizando materiales de alta calidad en distintos rangos de costo.',
                    },
                    {
                      question: '¿Fabrican y adaptan órtesis y prótesis personalizadas?',
                      answer:
                        'Sí. Realizamos adaptación, ajuste y personalización de órtesis y prótesis desde la valoración inicial hasta la entrega final, asegurando comodidad y buen funcionamiento.',
                    },
                    {
                      question: '¿La consulta tiene costo?',
                      answer:
                        'Sí, cuando solo se realiza valoración y orientación. Si decides adquirir un dispositivo ortopédico personalizado, la consulta queda incluida como parte del servicio.',
                    },
                  ]}
                  allowMultiple={false}
                />
              </div>
            </section>
          </div>

          {/* Sección 7 – CTA de Alta Calidad */}
          <section
            id="cta-final"
            aria-labelledby="cta-heading"
            className="bg-gradient-to-br from-blue-100 via-blue-50 to-white py-24 relative overflow-hidden"
          >
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-6">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                  ¡Tu recuperación comienza hoy!
                </div>

                <h2
                  id="cta-heading"
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4"
                >
                  ¿Listo para recuperar tu
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                    {' '}
                    calidad de vida
                  </span>
                  ?
                </h2>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto px-4">
                  Únete a cientos de pacientes que ya han transformado su movilidad y bienestar con
                  nuestros tratamientos especializados.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <button
                      onClick={() => openWhatsApp()}
                      className="bg-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition-all duration-300 text-lg inline-block shadow-2xl hover:shadow-3xl"
                      style={{ boxShadow: '0 20px 40px rgba(59,130,246,0.3)' }}
                    >
                      Agenda tu cita
                    </button>
                  </div>
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <Link
                      href="/contacto"
                      className="bg-white border-2 border-blue-600 text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-all duration-300 text-lg inline-block shadow-lg"
                    >
                      Habla con un especialista
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Primera consulta sin costo
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Evaluación personalizada
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Garantía de satisfacción
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    </>
  );
}

IndexPage.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
