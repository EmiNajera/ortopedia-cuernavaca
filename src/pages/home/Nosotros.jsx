import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import MarketingLayout from '@layouts/MarketingLayout';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';

// --- Sub-components (Restored & Improved) ---

const Stat = ({ number, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: delay }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all"
  >
    <motion.p
      className="text-3xl lg:text-4xl font-extrabold text-blue-600 mb-2"
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring' }}
      viewport={{ once: true }}
    >
      {number}
    </motion.p>
    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{label}</p>
  </motion.div>
);

const TimelineItem = ({ year, title, description, icon, side, index }) => {
  const isLeft = side === 'left';
  return (
    <div
      className={`flex items-center justify-between w-full mb-8 relative ${isLeft ? 'flex-row-reverse' : ''}`}
    >
      {/* Spacer for the other side */}
      <div className="w-5/12 hidden md:block"></div>

      {/* Center Line Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true }}
        className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full border-4 border-white shadow-xl z-10"
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </motion.div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="w-full md:w-5/12 pl-12 md:pl-0"
      >
        <div
          className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow relative ${isLeft ? 'md:mr-8' : 'md:ml-8'}`}
        >
          {/* Arrow for Desktop */}
          <div
            className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-0 h-0 border-8 ${isLeft ? 'left-full border-l-white border-t-transparent border-b-transparent border-r-transparent' : 'right-full border-r-white border-t-transparent border-b-transparent border-l-transparent'}`}
          ></div>

          <div className="flex items-center gap-4 mb-3">
            <div className="text-3xl">{icon}</div>
            <div>
              <span className="block text-2xl font-bold text-blue-600">{year}</span>
              <h4 className="font-bold text-gray-800 text-lg leading-tight">{title}</h4>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

const ValueCard = ({ value, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 w-full sm:w-auto ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
    }`}
  >
    {value.label}
    {isActive && (
      <motion.div
        layoutId="activeValueIndicator"
        className="absolute inset-0 rounded-full border-2 border-white/20"
        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      />
    )}
  </button>
);

// --- Main Page Component ---

export default function NosotrosView() {
  const [activeValue, setActiveValue] = useState('resiliencia');
  // ... (rest of the component internal logic is fine)

  const valores = [
    {
      key: 'resiliencia',
      label: 'Resiliencia',
      image: '/images/banners/rehabilitacion-postoperatoria-fd.png',
      title: 'Resiliencia (Valor Central)',
      description: `Creemos en la capacidad de superar cualquier desafío. Cada día vemos cómo nuestros pacientes transforman el dolor en esperanza, y cómo nuestra propia historia como empresa se ha construido resistiendo crisis, aprendiendo y evolucionando. La resiliencia es el motor que nos permite seguir adelante, adaptarnos a los cambios y acompañar a cada persona hasta recuperar su movilidad y confianza.`,
    },
    {
      key: 'compromiso',
      label: 'Compromiso',
      image: '/images/banners/seguimiento-continuo-fd.png',
      title: 'Compromiso',
      description: `Nos comprometemos con cada paciente como si fuera parte de nuestra familia. Cumplimos lo que prometemos, seguimos cada proceso hasta el final y ponemos nuestro máximo esfuerzo en ofrecer soluciones seguras, efectivas y personalizadas. El compromiso es la base de la confianza que nos han brindado durante más de 30 años.`,
    },
    {
      key: 'etica',
      label: 'Ética',
      image: '/images/banners/EstudioHuellaFD.png',
      title: 'Ética',
      description: `Creemos que la salud debe manejarse con integridad absoluta. Por eso ofrecemos diagnósticos y soluciones honestas, explicando con claridad tratamientos, costos y expectativas reales. Nuestra ética asegura que cada decisión que tomamos está enfocada en el bienestar del paciente, por encima de cualquier otro interés.`,
    },
    {
      key: 'empatia',
      label: 'Empatía',
      image: '/images/banners/NiñaAprendiendoaCaminarAFD.png',
      title: 'Empatía',
      description: `Cada paciente llega con su propia historia, con miedos, frustraciones y esperanzas. Nuestra empatía nos permite escuchar de verdad, entender lo que están viviendo y acompañarlos con sensibilidad durante todo el proceso de rehabilitación. Sabemos que cuidar el aspecto emocional es tan importante como tratar el físico.`,
    },
    {
      key: 'solidaridad',
      label: 'Solidaridad',
      image: '/images/banners/NiñoSillaRuedasFlatDesign.png',
      title: 'Solidaridad',
      description: `No solo atendemos a quienes llegan a nosotros; buscamos impactar positivamente en la comunidad. La solidaridad nos inspira a apoyar a quienes más lo necesitan, ya sea con orientación, programas comunitarios o ajustando soluciones cuando las circunstancias lo requieren. Creemos que nuestra responsabilidad va más allá de nuestra clínica: se extiende a la sociedad.`,
    },
  ];

  const activeValueData = valores.find((v) => v.key === activeValue) || valores[0];

  const timelineData = [
    {
      year: '1995',
      title: 'Nace Ortopedia Cuernavaca',
      description:
        'Abrimos nuestras puertas como el primer taller especializado en la ciudad, con la visión de ofrecer soluciones reales a problemas de movilidad.',
      icon: '🏥',
    },
    {
      year: 'Late 90s',
      title: 'Rehabilitación Integral',
      description:
        'Integramos terapia física a nuestros servicios, entendiendo que la ortesis necesita acompañamiento para ser efectiva.',
      icon: '🧘',
    },
    {
      year: '2000s',
      title: 'Fundación de Ortochavitos',
      description:
        'Nace nuestra división pediátrica especializada, creando un espacio amigable y experto para los más pequeños.',
      icon: '🧸',
    },
    {
      year: '2010s',
      title: 'Innovación Tecnológica',
      description:
        'Incorporamos sistemas CAD/CAM y análisis biomecánico digital para elevar la precisión de nuestros tratamientos.',
      icon: '💻',
    },
    {
      year: '2020s',
      title: 'Liderazgo Regional',
      description:
        'Consolidación como el centro de rehabilitación referente en Morelos, con un equipo multidisciplinario en constante crecimiento.',
      icon: '🚀',
    },
  ];

  // Helper for Section Bubble Title
  const SectionBadge = ({ text }) => (
    <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4">
      <span
        className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"
        style={{ transform: 'translateY(1px)' }}
      ></span>
      {text}
    </span>
  );

  // Helper for Aurora Text Effect
  const AuroraText = ({ children, className = '' }) => (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 ${className}`}
      style={{ backgroundSize: '200% auto' }}
      animate={{ backgroundPosition: ['0% center', '200% center'] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </motion.span>
  );

  return (
    <main className="bg-white font-sans overflow-hidden">
      {/* 1. Hero Section - Static Text + Animated Image */}
      <section
        id="hero-nosotros"
        aria-labelledby="hero-nosotros-heading"
        className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido de texto - Static / Simple Fade */}
            <div className="space-y-6">
              <h1
                id="hero-nosotros-heading"
                className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-800"
              >
                30 AÑOS
                <br />
                <AuroraText className="font-extrabold">TRANSFORMANDO VIDAS</AuroraText>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                De la experiencia clínica a la tecnología de vanguardia para tu movilidad, bienestar
                y calidad de vida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div
                  onClick={() => openWhatsApp()}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg uppercase text-sm font-medium transition-colors shadow-lg hover:shadow-xl inline-block cursor-pointer hover:bg-blue-700"
                >
                  Agendar Consulta
                </div>
                <Link href="/tienda">
                  <div className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg uppercase text-sm font-medium transition-colors shadow-lg hover:shadow-xl inline-block cursor-pointer hover:bg-blue-600 hover:text-white">
                    Ver Productos
                  </div>
                </Link>
              </div>
            </div>

            {/* Imagen - ONLY component with Motion */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/banners/OrtopediaCuernavacaFachada.png"
                  alt="Fachada de Ortopedia Cuernavaca"
                  width={1600}
                  height={900}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Quienes Somos - Balanced Grid (More space for Image) */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          {/* Changed grid to 12 columns to give image more weight (7/12 vs 5/12) */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="relative lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl h-full"
              >
                <Image
                  src="/images/banners/Competencia.png"
                  alt="Equipo Ortopedia Cuernavaca"
                  width={1000}
                  height={750}
                  className="object-cover w-full h-full"
                />
                {/* Decoration Float */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <SectionBadge text="¿Quiénes Somos?" />
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Mucho más que una <br /> clínica de ortopedia
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed text-justify">
                <p>
                  En <strong>Ortopedia Cuernavaca</strong> somos un Centro de Ortopedia y
                  Rehabilitación Física, que integra atención ortopédica y fisioterapia con más de{' '}
                  <strong className="text-blue-600">30 años de experiencia</strong> ayudando a las
                  personas a recuperar su movilidad, mejorar su postura y alcanzar una mejor calidad
                  de vida.
                </p>
                <p>
                  Durante estas tres décadas hemos atendido a miles de familias, consolidando un
                  modelo único que une la tradición clínica con la innovación tecnológica. Creemos
                  que la rehabilitación no es solo un tratamiento, sino un camino de acompañamiento
                  donde cada detalle importa.
                </p>
                <p>
                  En nuestras instalaciones reunimos a un equipo multidisciplinario de especialistas
                  en ortopedia, fisioterapia y rehabilitación que trabajan de manera coordinada para
                  ofrecer un servicio integral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Misión y Visión Section (restored design with images) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 space-y-24">
          {/* Misión - Image Left (or matching screenshot style) */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <Image
                src="/images/banners/mision.png"
                alt="Nuestra Misión"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-md"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionBadge text="Nuestra Misión" />
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Restaurar Movimiento, <br /> Renovar Vidas.
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                Brindar soluciones ortopédicas y de rehabilitación física que devuelvan la
                confianza, la independencia y la movilidad de nuestros pacientes, mediante un trato
                humano, experiencia clínica comprobada y un acompañamiento integral que abarque
                tanto lo físico como lo emocional.
              </p>
            </motion.div>
          </div>

          {/* Visión - Alternating */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <SectionBadge text="Nuestra Visión" />
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Liderazgo e Innovación <br /> con Sentido Humano.
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                Ser líderes nacionales en soluciones ortopédicas y rehabilitación integral,
                desarrollando tecnología propia de alta calidad y bajo costo. En los próximos cinco
                años consolidaremos nuestro liderazgo regional con clínicas de rehabilitación de
                alta capacidad y, en diez años, presencia en todo el país con una red de sucursales
                y un laboratorio de investigación propio. Nuestra meta es que cualquier persona, sin
                importar su condición o recursos, encuentre soluciones accesibles, inclusivas y que
                devuelvan confianza, movilidad y esperanza.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center order-1 md:order-2"
            >
              <Image
                src="/images/banners/vision.png"
                alt="Nuestra Visión"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-md"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. History Timeline - With Narrative Intro and Logo */}
      <section id="nuestra-historia" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge text="Nuestra Trayectoria" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-8">
              Un Legado de Experiencia y Pasión
            </h2>
          </div>

          {/* Narrative Intro Split Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg text-gray-600 leading-relaxed space-y-6 text-justify"
            >
              <p>
                Todo comienza con la <strong>Lic. Ma. del Carmen Nájera</strong>, egresada de la
                Licenciatura en Órtesis y Prótesis del Instituto Nacional de Rehabilitación (INR,
                1981-1985). Tras adquirir conocimientos integrales y dedicar 10 años al INR
                atendiendo cientos de casos complejos, en 1995 decide regresar a su ciudad natal,
                Cuernavaca, para fundar <strong>Ortopedia Cuernavaca</strong>. Inició como una
                pionera en la comercialización de equipo de rehabilitación y fabricación de
                plantillas y prótesis personalizadas, atendiendo desde problemas posturales hasta
                pérdidas de extremidades.
              </p>
              <p>
                Con una visión clara de las necesidades del mercado, fundó posteriormente{' '}
                <strong>Ortochavitos</strong>, una sucursal especializada frente al Hospital del
                Niño Morelense, enfocada en la atención pediátrica y el zapato ortopédico.
              </p>
              <p>
                A este esfuerzo se sumó su hermana, la <strong>Lic. Guadalupe Nájera</strong>,
                terapeuta física también formada en el INR y con vasta experiencia en el DIF
                Morelos. Juntas, en un mismo establecimiento pero manteniendo identidades
                especializadas, expandieron la visión hacia una rehabilitación integral. Hoy,
                Ortopedia Cuernavaca y la clínica de rehabilitación continúan operando con la misma
                sinergia, y Ortochavitos ha evolucionado mudándose cerca del Hospital General
                Parres, consolidando un legado familiar de salud y bienestar.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="bg-white p-8 rounded-full shadow-2xl border-4 border-blue-100 w-80 h-80 flex items-center justify-center relative overflow-hidden">
                <Image
                  src="/images/banners/logo-antiguo-ortochavitos.jpeg"
                  alt="Logo Antiguo Ortochavitos"
                  width={250}
                  height={250}
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>

          <div className="relative max-w-5xl mx-auto mt-20">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2"></div>

            <div className="space-y-4 md:space-y-0">
              {timelineData.map((item, idx) => (
                <TimelineItem
                  key={idx}
                  {...item}
                  side={idx % 2 === 0 ? 'right' : 'left'}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Values & Philosophy - With Bubble Title */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge text="Nuestra Esencia" />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Valores que nos definen</h2>
            <p className="text-lg text-gray-600 text-center">
              Más allá de la técnica, nos define lo que llevamos dentro. Estos son los pilares que
              sostienen cada tratamiento y cada sonrisa recuperada.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {valores.map((valor) => (
              <ValueCard
                key={valor.key}
                value={valor}
                isActive={activeValue === valor.key}
                onClick={() => setActiveValue(valor.key)}
              />
            ))}
          </div>

          {/* Display Area */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeValue}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2"
              >
                <div className="relative h-64 md:h-auto min-h-[400px] bg-gray-100">
                  <Image
                    src={activeValueData.image}
                    alt={activeValueData.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                </div>
                <div className="p-10 md:p-16 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">{activeValueData.title}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {activeValueData.description}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold cursor-pointer group">
                    <span>Saber más sobre este pilar</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. CTA Final - Same */}
      <section className="py-24 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/banners/banner-tienda-4.png"
            alt="Background"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Tu historia de recuperación comienza hoy
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Déjanos ser parte de tu camino hacia una vida sin dolor y con plena libertad de
            movimiento.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openWhatsApp()}
              className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer"
            >
              Agendar mi Valoración
            </motion.div>
            <Link href="/servicios">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-full border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all cursor-pointer"
              >
                Explorar Servicios
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
