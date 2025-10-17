import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import MarketingLayout from '../../components/layout/MarketingLayout';

// Componente principal
export default function Nosotros() {
  const [active, setActive] = useState({
    key: 'resiliencia',
    label: 'Resiliencia',
    image: '/images/banners/Rehabilitación PostoperatoriaFD.png',
    title: 'Resiliencia (Valor Central)',
    description: `Creemos en la capacidad de superar cualquier desafío. Cada día vemos cómo nuestros pacientes transforman el dolor en esperanza, y cómo nuestra propia historia como empresa se ha construido resistiendo crisis, aprendiendo y evolucionando. La resiliencia es el motor que nos permite seguir adelante, adaptarnos a los cambios y acompañar a cada persona hasta recuperar su movilidad y confianza.`,
  });

  const [activeVision, setActiveVision] = useState({
    key: 'mision',
    label: 'Misión',
    image: '/images/banners/Atleta cruzando la meta con alegría FD.png',
    title: 'Atención integral y humana',
    description: 'Devolver confianza, independencia y movilidad a nuestros pacientes con soluciones ortopédicas y de rehabilitación de alta calidad, un trato profundamente humano y un acompañamiento integral que atiende lo físico y lo emocional.',
    items: [
      {
        title: 'Atención Personalizada',
        image: '/images/banners/consulta-ortesista.svg'
      },
      {
        title: 'Compromiso Humano',
        image: '/images/banners/Seguimiento ContinuoFD.png'
      },
      {
        title: 'Acompañamiento Integral',
        image: '/images/banners/Rehabilitación PostoperatoriaFD.png'
      },
      {
        title: 'Bienestar Completo',
        image: '/images/banners/Rehabilitación del Dolor CrónicoFD.png'
      }
    ]
  });

  return (
    <MarketingLayout>
      <div className="bg-white font-sans">
        {/* Hero Section Compacto (sin Framer Motion en primer fold) */}
        <section 
          className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden"
        >
           <div className="container mx-auto px-6">
             <div className="grid lg:grid-cols-2 gap-12 items-center">
               {/* Contenido de texto */}
              <div
                className="space-y-6 opacity-0 translate-y-2 animate-[fadeIn_.8s_ease-out_.2s_forwards]"
              >
                <h1 
                  className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-800 opacity-0 translate-y-2 animate-[fadeIn_.8s_ease-out_.4s_forwards]"
                >
                   30 AÑOS<br />
                   <span className="text-blue-600">TRANSFORMANDO VIDAS</span>
                </h1>
                <p 
                  className="text-lg text-gray-600 leading-relaxed opacity-0 translate-y-2 animate-[fadeIn_.8s_ease-out_.6s_forwards]"
                >
                   De la experiencia clínica a la tecnología de vanguardia para tu movilidad, bienestar y calidad de vida.
                </p>
                <div 
                  className="flex flex-col sm:flex-row gap-4 opacity-0 translate-y-2 animate-[fadeIn_.8s_ease-out_.8s_forwards]"
                >
                   <Link href="/citas">
                    <div 
                      className="bg-blue-600 text-white px-8 py-4 rounded-lg uppercase text-sm font-medium transition-colors shadow-lg hover:shadow-xl inline-block cursor-pointer hover:bg-blue-700"
                    >
                       Agendar Consulta
                    </div>
                   </Link>
                   <Link href="/tienda">
                    <div 
                      className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg uppercase text-sm font-medium transition-colors shadow-lg hover:shadow-xl inline-block cursor-pointer hover:bg-blue-600 hover:text-white"
                    >
                       Ver Productos
                    </div>
                   </Link>
                </div>
              </div>

               {/* Imagen */}
              <div
                className="relative opacity-0 translate-y-2 animate-[fadeIn_.8s_ease-out_.4s_forwards]"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src="/images/banners/OrtopediaCuernavacaFachada.png" 
                    alt="Fachada Ortopedia Cuernavaca" 
                    width={1600}
                    height={900}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
             </div>
           </div>
        </section>

        {/* ¿Quiénes Somos? - Información Exacta */}
        <section className="py-20 bg-gradient-to-br from-white to-blue-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-7xl mx-auto"
            >
              {/* Título con mejor presentación */}
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-6 py-3 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-6 shadow-sm"
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  ¿Quiénes somos?
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  ¿Quiénes <span className="text-blue-600">Somos?</span>
                </h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
              </div>

               {/* Layout con imagen y texto subrayado en caja */}
               <div className="grid lg:grid-cols-2 gap-16 items-center">
                 {/* Columna de imagen - solo imagen */}
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.6, delay: 0.3 }}
                   viewport={{ once: true }}
                   className="relative"
                 >
                   <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                     <Image
                       src="/images/banners/Competencia.png"
                       alt="Competencia profesional de Ortopedia Cuernavaca"
                       width={600}
                       height={400}
                       className="w-full h-auto object-cover"
                       loading="lazy"
                     />
                   </div>
                 </motion.div>

                 {/* Columna de texto subrayado en caja */}
                 <motion.div
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.6, delay: 0.4 }}
                   viewport={{ once: true }}
                   className="space-y-6"
                 >
                   {/* Caja con texto subrayado */}
                   <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                     <p className="text-lg text-gray-700 leading-relaxed mb-6">
                       En <strong className="text-blue-600 font-semibold">Ortopedia Cuernavaca</strong> somos un <strong className="text-gray-800">Centro Integral de Rehabilitación Física</strong> con más de <strong className="text-blue-600">30 años de experiencia</strong> ayudando a las personas a recuperar su movilidad, mejorar su postura y alcanzar una mejor calidad de vida.
                     </p>
                     
                     <p className="text-lg text-gray-700 leading-relaxed mb-6">
                       Durante estas tres décadas hemos atendido a <strong className="text-blue-600">miles de familias</strong>, consolidando un modelo único que une la tradición clínica con la innovación tecnológica. Creemos que la rehabilitación no es solo un tratamiento, sino un <strong className="text-gray-800">camino de acompañamiento</strong> donde cada detalle importa.
                     </p>
                     
                     <p className="text-lg text-gray-700 leading-relaxed">
                       En nuestras instalaciones reunimos a un <strong className="text-blue-600">equipo multidisciplinario</strong> de especialistas en ortopedia, fisioterapia y rehabilitación que trabajan de manera coordinada para ofrecer un servicio integral.
                     </p>
                   </div>
                 </motion.div>
               </div>

              
            </motion.div>
          </div>
        </section>

        

                 {/* Nuestra Historia */}
         <section className="py-20 bg-gradient-to-br from-white to-slate-50">
           <div className="container mx-auto px-6">
             <div className="text-center mb-12">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
                 viewport={{ once: true }}
                 className="inline-flex items-center px-6 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4 shadow-sm"
               >
                 <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                 Nuestra Historia
               </motion.div>
             </div>
             <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Nuestra Historia</h2>
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Legado y raíces</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Después de atender a cientos de pacientes en el Instituto Nacional de Rehabilitación y conocer de cerca la magnitud de la ortopedia —desde órtesis y prótesis hasta plantillas personalizadas y soluciones posturales—, Carmen Nájera decidió dar un paso audaz: llevar esa experiencia a Cuernavaca y crear el primer espacio especializado en soluciones ortopédicas de la ciudad.
                  </p>
                  <p>
                    Así, en 1995, nació Ortopedia Cuernavaca, un pequeño taller con una visión clara: ofrecer atención profesional y humana a quienes enfrentaban limitaciones físicas, dolor crónico o amputaciones. En esos primeros años, se fabricaban plantillas, se adaptaban prótesis y se atendían casos de todo tipo con recursos modestos pero con un compromiso total con cada persona que llegaba en busca de ayuda.
                  </p>
                  <p>
                    El impacto fue inmediato: pacientes de todas las edades encontraron soluciones reales y un equipo dispuesto a acompañarlos en todo el proceso de recuperación. Con el tiempo, el taller creció, se integraron nuevas tecnologías, se amplió el catálogo de servicios y se conformó un equipo cada vez más especializado.
                  </p>
                  <p>
                    Ese crecimiento nos llevó a abrir una segunda sucursal: Ortochavitos, enfocada en el área pediátrica y la comercialización de productos ortopédicos. Hoy, tras tres décadas de trabajo continuo, somos un referente regional en ortopedia y rehabilitación física, con un legado construido sobre valores sólidos, tecnología innovadora y una convicción firme: cambiar vidas devolviendo movilidad, confianza y bienestar a nuestros pacientes.
                  </p>
                </div>
              </div>
                             <div>
                 <img
                   src="/images/banners/Logo Antiguo Ortochavitos.JPEG"
                   alt="Logo Antiguo Ortochavitos"
                   className="rounded-lg shadow-xl"
                 />
               </div>
            </div>
          </div>
        </section>



        {/* Nuestros Ejes de Futuro */}
        <section className="py-20 bg-gradient-to-br from-white to-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-6 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4 shadow-sm"
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Nuestra Filosofía
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Nuestra <span className="text-blue-600">Filosofía</span>
                </h2>
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Misión, Visión y Valores</h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Una presentación fluida de nuestros principios fundamentales que guían cada decisión y cada tratamiento que realizamos.
                </p>
              </motion.div>
            </div>

            {/* Vision Tabs */}
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {[
                  { key: 'mision', label: 'Misión' },
                  { key: 'vision', label: 'Visión' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveVision({
                      ...activeVision,
                      key: item.key,
                      label: item.label,
                      title: item.key === 'mision'
                        ? 'Atención integral y humana'
                        : 'Liderazgo nacional y tecnología accesible',
                      description: item.key === 'mision'
                        ? 'Devolver confianza, independencia y movilidad a nuestros pacientes con soluciones ortopédicas y de rehabilitación de alta calidad, un trato profundamente humano y un acompañamiento integral que atiende lo físico y lo emocional.'
                        : 'Ser líderes nacionales en ortopedia y rehabilitación integral, desarrollando tecnología propia de alta calidad y bajo costo. En 5 años, consolidar el liderazgo regional con clínicas de alta capacidad. En 10 años, presencia nacional con una red de sucursales y un laboratorio de investigación. Que cualquier persona, sin importar su condición o recursos, acceda a soluciones inclusivas, accesibles y efectivas.'
                    })}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                      activeVision.key === item.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeVision.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                                 <div className="rounded-2xl overflow-hidden shadow-lg">
                   <img
                     src={activeVision.key === 'mision' ? '/images/banners/Misión.png' : '/images/banners/Viisón.png'}
                     alt={activeVision.title}
                     className="w-full h-auto object-cover"
                     loading="lazy"
                   />
                 </div>
                <div>
                  <h3 className="text-3xl font-semibold mb-4 text-gray-800">{activeVision.title}</h3>
                  <p className="text-lg text-gray-700 mb-6">{activeVision.description}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Nuestra Filosofía */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                
                
              </motion.div>
            </div>

            {/* Valores Animados */}
            <ValoresFilosofiaAnimado />
          </div>
        </section>

        {/* Nuestros Logros */}
        <section className="py-20 bg-gradient-to-br from-white to-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-6 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4 shadow-sm"
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Logros y Resultados
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Nuestros <span className="text-blue-600">Logros</span>
                </h2>
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Tres décadas de transformación y mejora continua</h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Resultados que cuentan historias de vida y reflejan nuestro compromiso constante desde 1995.
                </p>
              </motion.div>
            </div>

            {/* Logros Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-blue-50 rounded-xl"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
                <div className="text-gray-700 font-semibold">Años de Experiencia</div>
                <div className="text-sm text-gray-600 mt-2">Compromiso constante desde 1995</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-blue-50 rounded-xl"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
                <div className="text-gray-700 font-semibold">Pacientes Atendidos</div>
                <div className="text-sm text-gray-600 mt-2">Soluciones personalizadas y humanas</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-blue-50 rounded-xl"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-700 font-semibold">Mejora en Movilidad</div>
                <div className="text-sm text-gray-600 mt-2">Resultados medibles en calidad de vida</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-blue-50 rounded-xl"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-700 font-semibold">Atención Personalizada</div>
                <div className="text-sm text-gray-600 mt-2">Acompañamiento cercano y humano</div>
              </motion.div>
            </div>

            {/* Hitos Históricos - Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Hitos Históricos</h3>
              <div className="relative">
                {/* Línea central del timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 h-full"></div>
                
                {/* Timeline items */}
                <div className="space-y-8">
                  {/* 1995 */}
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className="w-1/2 pr-8 text-right">
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="text-2xl mb-2">🏥</div>
                        <div className="font-bold text-blue-600 text-lg">1995</div>
                        <div className="font-semibold text-gray-800">Fundación de Ortopedia Cuernavaca</div>
                        <div className="text-sm text-gray-600 mt-1">Nace el primer espacio especializado en soluciones ortopédicas de la ciudad</div>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                    <div className="w-1/2 pl-8"></div>
                  </motion.div>

                  {/* Finales de los 90 */}
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className="w-1/2 pr-8"></div>
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                    <div className="w-1/2 pl-8">
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="text-2xl mb-2">🧍‍♀️</div>
                        <div className="font-bold text-blue-600 text-lg">Finales de los 90</div>
                        <div className="font-semibold text-gray-800">Integración de Fisioterapia</div>
                        <div className="text-sm text-gray-600 mt-1">Ampliación de servicios con rehabilitación física integral</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* 2000s - Expansión */}
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className="w-1/2 pr-8 text-right">
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="text-2xl mb-2">🏗️</div>
                        <div className="font-bold text-blue-600 text-lg">2000s</div>
                        <div className="font-semibold text-gray-800">Expansión Clínica</div>
                        <div className="text-sm text-gray-600 mt-1">Crecimiento operativo y nuevas tecnologías</div>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                    <div className="w-1/2 pl-8"></div>
                  </motion.div>

                  {/* 2000s - Ortochavitos */}
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className="w-1/2 pr-8"></div>
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                    <div className="w-1/2 pl-8">
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="text-2xl mb-2">🏪</div>
                        <div className="font-bold text-blue-600 text-lg">2000s</div>
                        <div className="font-semibold text-gray-800">Nace Ortochavitos</div>
                        <div className="text-sm text-gray-600 mt-1">Segunda sucursal enfocada en pediatría y productos ortopédicos</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* 2010 */}
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className="w-1/2 pr-8 text-right">
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="text-2xl mb-2">🚚</div>
                        <div className="font-bold text-blue-600 text-lg">Circa 2010</div>
                        <div className="font-semibold text-gray-800">Reubicación Estratégica</div>
                        <div className="text-sm text-gray-600 mt-1">Ortochavitos se reubica para mejor accesibilidad</div>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                    <div className="w-1/2 pl-8"></div>
                  </motion.div>

                  {/* 2020s */}
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className="w-1/2 pr-8"></div>
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                    <div className="w-1/2 pl-8">
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="text-2xl mb-2">🔄</div>
                        <div className="font-bold text-blue-600 text-lg">2020s</div>
                        <div className="font-semibold text-gray-800">Transformación Digital</div>
                        <div className="text-sm text-gray-600 mt-1">Modernización operativa y nuevas tecnologías de vanguardia</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Instalaciones */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-6 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4 shadow-sm"
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Instalaciones
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Nuestras <span className="text-blue-600">Instalaciones</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Espacios diseñados para brindar la mejor atención y comodidad a nuestros pacientes.
                </p>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Tecnología de Vanguardia</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Contamos con equipos de última generación para diagnóstico, fabricación y rehabilitación. Nuestras instalaciones incluyen talleres de fabricación personalizada, áreas de evaluación biomecánica y espacios de rehabilitación física.
                  </p>
                  <p>
                    Cada área está diseñada pensando en la comodidad y privacidad del paciente, con tecnología que nos permite ofrecer soluciones más precisas y efectivas.
                  </p>
                </div>
              </motion.div>

                             <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 viewport={{ once: true }}
                 className="grid grid-cols-2 gap-4"
               >
                 <img
                   src="/images/banners/TallerOrt.JPG"
                   alt="Taller Ortopédico"
                   className="rounded-lg shadow-lg object-cover h-48 w-full"
                   loading="lazy"
                 />
                 <img
                   src="/images/banners/Protesis Taller.JPG"
                   alt="Taller de Prótesis"
                   className="rounded-lg shadow-lg object-cover h-48 w-full"
                   loading="lazy"
                 />
                 <img
                   src="/images/banners/Fisioterapia 2.png"
                   alt="Fisioterapia"
                   className="rounded-lg shadow-lg object-cover h-48 w-full"
                   loading="lazy"
                 />
                 <img
                   src="/images/banners/Plantillas Ortopedicas A.PNG"
                   alt="Plantillas Ortopédicas"
                   className="rounded-lg shadow-lg object-cover h-48 w-full"
                   loading="lazy"
                 />
               </motion.div>
            </div>
          </div>
        </section>

        {/* Mensaje Final */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-gray-50 text-gray-900">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Cambiamos <span className="text-blue-200">Vidas</span>
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                En Ortopedia Cuernavaca no solo fabricamos plantillas, órtesis o prótesis: cambiamos vidas. Nos mueve la pasión de ver a un niño caminar correctamente, a un adulto mayor recuperar su independencia, o a una persona con amputación sonreír al dar sus primeros pasos con una prótesis personalizada.
              </p>
              <p className="text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                Tu movilidad, tu bienestar y tu calidad de vida son nuestra pasión. Desde 1995 y hacia el futuro, estamos aquí para caminar contigo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/citas">
                      <motion.div 
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl inline-block cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Agendar Consulta
                      </motion.div>
                    </Link>
                    <Link href="/servicios">
                      <motion.div 
                        className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors shadow-lg hover:shadow-xl inline-block cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Conocer Servicios
                      </motion.div>
                    </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}

// Componente de estadísticas para el Hero
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
        className="text-3xl lg:text-4xl font-bold text-white drop-shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 1.2, type: "spring" }}
      >
        {number}
      </motion.p>
      <p className="text-sm uppercase text-gray-200 font-medium drop-shadow-md">{label}</p>
    </motion.div>
  );
}

function ValoresFilosofiaAnimado() {
  const valores = [
    { key: 'resiliencia', label: 'Resiliencia', image: '/images/banners/Rehabilitación PostoperatoriaFD.png', title: 'Resiliencia (Valor Central)', description: `Creemos en la capacidad de superar cualquier desafío. Cada día vemos cómo nuestros pacientes transforman el dolor en esperanza, y cómo nuestra propia historia como empresa se ha construido resistiendo crisis, aprendiendo y evolucionando. La resiliencia es el motor que nos permite seguir adelante, adaptarnos a los cambios y acompañar a cada persona hasta recuperar su movilidad y confianza.` },
    { key: 'compromiso', label: 'Compromiso', image: '/images/banners/Seguimiento ContinuoFD.png', title: 'Compromiso', description: `Nos comprometemos con cada paciente como si fuera parte de nuestra familia. Cumplimos lo que prometemos, seguimos cada proceso hasta el final y ponemos nuestro máximo esfuerzo en ofrecer soluciones seguras, efectivas y personalizadas. El compromiso es la base de la confianza que nos han brindado durante más de 30 años.` },
    { key: 'etica', label: 'Ética', image: '/images/banners/EstudioHuellaFD.png', title: 'Ética', description: `Creemos que la salud debe manejarse con integridad absoluta. Por eso ofrecemos diagnósticos y soluciones honestas, explicando con claridad tratamientos, costos y expectativas reales. Nuestra ética asegura que cada decisión que tomamos está enfocada en el bienestar del paciente, por encima de cualquier otro interés.` },
    { key: 'empatia', label: 'Empatía', image: '/images/banners/NiñaAprendiendoaCaminarAFD.png', title: 'Empatía', description: `Cada paciente llega con su propia historia, con miedos, frustraciones y esperanzas. Nuestra empatía nos permite escuchar de verdad, entender lo que están viviendo y acompañarlos con sensibilidad durante todo el proceso de rehabilitación. Sabemos que cuidar el aspecto emocional es tan importante como tratar el físico.` },
    { key: 'solidaridad', label: 'Solidaridad', image: '/images/banners/NiñoSillaRuedasFlatDesign.png', title: 'Solidaridad', description: `No solo atendemos a quienes llegan a nosotros; buscamos impactar positivamente en la comunidad. La solidaridad nos inspira a apoyar a quienes más lo necesitan, ya sea con orientación, programas comunitarios o ajustando soluciones cuando las circunstancias lo requieren. Creemos que nuestra responsabilidad va más allá de nuestra clínica: se extiende a la sociedad.` },
  ];

  const [active, setActive] = useState(valores[0]);

  return (
    <section className="bg-gradient-to-br from-white to-slate-50 text-gray-900 py-16">
      {/* Título + Tabs */}
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Nuestros <span className="text-gray-500">Valores</span>
        </h2>
        <nav className="inline-flex flex-wrap items-center border border-gray-300 rounded-full px-2 py-1 mb-12">
          {valores.map((v) => (
            <button key={v.key} onClick={() => setActive(v)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${active.key === v.key ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
              {v.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Imagen + Texto con animación */}
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div key={active.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="grid md:grid-cols-2 gap-12 items-center">
                         {/* Imagen */}
             <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-50 to-white">
               <img 
                 src={active.image} 
                 alt={active.title} 
                 className="w-full h-auto object-cover" 
                 loading="lazy"
               />
             </div>
            {/* Texto */}
            <div>
              <h3 className="text-3xl font-semibold mb-4">{active.title}</h3>
              <p className="text-lg text-gray-700">{active.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}