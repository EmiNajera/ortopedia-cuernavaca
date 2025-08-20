import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/layout/Layout';

export default function Nosotros() {
  const [active, setActive] = useState({
    key: 'resiliencia',
    label: 'Resiliencia',
    image: 'https://placehold.co/960x540/FFFFFF/000000?text=Resiliencia',
    title: 'Resiliencia (Valor Central)',
    description: `Creemos en la capacidad de superar cualquier desafío. Cada día vemos cómo nuestros pacientes transforman el dolor en esperanza, y cómo nuestra propia historia como empresa se ha construido resistiendo crisis, aprendiendo y evolucionando. La resiliencia es el motor que nos permite seguir adelante, adaptarnos a los cambios y acompañar a cada persona hasta recuperar su movilidad y confianza.`,
  });

  const [activeVision, setActiveVision] = useState({
    key: 'mision',
    label: 'Misión',
    image: 'https://placehold.co/960x540/F8FAFC/1E3A8A?text=Misión',
    title: 'Atención Integral y Humana',
    description: 'Nos comprometemos a brindar atención integral y humana, poniendo al paciente al centro de cada solución. Nuestra misión es acompañar a cada persona en su proceso de recuperación física, emocional y social.',
    primaryCta: { text: 'Agenda tu Consulta', href: '/citas' },
    secondaryCta: { text: 'Conoce Nuestros Valores', href: '/nosotros' },
    items: [
      {
        title: 'Atención Personalizada',
        image: 'https://placehold.co/400x300/F8FAFC/1E3A8A?text=Atención+Personalizada'
      },
      {
        title: 'Compromiso Humano',
        image: 'https://placehold.co/400x300/F8FAFC/1E3A8A?text=Compromiso+Humano'
      },
      {
        title: 'Acompañamiento Integral',
        image: 'https://placehold.co/400x300/F8FAFC/1E3A8A?text=Acompañamiento+Integral'
      },
      {
        title: 'Bienestar Completo',
        image: 'https://placehold.co/400x300/F8FAFC/1E3A8A?text=Bienestar+Completo'
      }
    ]
  });

  return (
    <Layout>
      <div className="bg-white font-sans">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/1E40AF/FFFFFF?text=OrtoTech+Cuernavaca')" }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 p-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              30 años transformando vidas con soluciones ortopédicas y rehabilitación integral
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              De la experiencia humana a la tecnología de vanguardia para tu movilidad, bienestar y calidad de vida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/citas" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Agendar Consulta
              </Link>
              <Link to="/tienda" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Ver Productos
              </Link>
            </div>
          </div>
        </section>

        {/* Introducción */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                En Ortopedia Cuernavaca creemos que cada paso cuenta y que la movilidad es una de las libertades más valiosas que una persona puede tener. Desde 1995 nos especializamos en ofrecer soluciones ortopédicas y de rehabilitación física diseñadas para cambiar vidas: plantillas personalizadas, órtesis, prótesis de alta tecnología, estudios de postura y fisioterapia integral. Nuestra meta no es únicamente tratar un problema físico, sino acompañar a cada paciente en un proceso completo de recuperación física, emocional y social, con una atención verdaderamente personalizada y un compromiso humano inquebrantable.
              </p>
            </div>
          </div>
        </section>

        {/* Nuestra Historia */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
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
                  src="https://placehold.co/600x400/E0E7FF/1E3A8A?text=Historia+OrtoTech"
                  alt="Historia OrtoTech"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nuestro Impacto Humano */}
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Nuestro <span className="text-blue-600">Impacto Humano</span>
              </h2>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Más que soluciones físicas</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                En 30 años hemos atendido cientos, incluso miles de casos. Cada uno cuenta una historia distinta, pero todos comparten un elemento común: el deseo de recuperar independencia, aliviar el dolor y mejorar la calidad de vida.
              </p>
            </motion.div>
          </div>

          {/* Impact Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Historias de Transformación</h3>
              <p className="text-gray-600 mb-6">
                Hemos ayudado a personas con amputaciones a retomar actividades cotidianas e incluso a volver al deporte gracias a prótesis personalizadas que se adaptan a su estilo de vida. Hemos tratado a niños con problemas de postura y pie plano, corrigiendo sus pisadas desde edades tempranas para evitar complicaciones en la adultez.
              </p>
              <p className="text-gray-600">
                Hemos acompañado a pacientes con lesiones deportivas que buscan regresar a la actividad física sin dolor. Y hemos trabajado con adultos mayores con dolor crónico, ayudándoles a recuperar movilidad y mejorar su bienestar emocional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Acompañamiento Integral</h3>
              <p className="text-gray-600 mb-6">
                Uno de los aprendizajes más importantes de estas décadas es que la rehabilitación no es únicamente física. Muchos pacientes llegan enojados, frustrados, con miedo o con la esperanza rota.
              </p>
              <p className="text-gray-600">
                Nuestro trabajo no termina al entregar una prótesis, una plantilla o una órtesis: inicia ahí un proceso de acompañamiento, empatía y apoyo psicológico indirecto, porque entendemos que recuperar la movilidad también significa recuperar la confianza, la autoestima y, en muchos casos, el deseo de seguir adelante.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-gray-600">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">Pacientes Atendidos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Mejora en Movilidad</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">Lun-Vie</div>
              <div className="text-gray-600">Horario</div>
            </div>
          </motion.div>
        </section>

        {/* Nuestros Ejes de Futuro */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
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
                  { key: 'vision', label: 'Visión' },
                  { key: 'tecnologia', label: 'Tecnología' },
                  { key: 'servicios', label: 'Futuros Servicios' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveVision({
                      ...activeVision,
                      key: item.key,
                      label: item.label,
                      title: item.key === 'mision' ? 'Atención Integral y Humana' :
                             item.key === 'vision' ? 'Expansión Nacional con Tecnología Propia' :
                             item.key === 'tecnologia' ? 'Diseño de Prótesis Avanzadas' :
                             'Nuevas Clínicas de Rehabilitación',
                      description: item.key === 'mision' ? 'Nos comprometemos a brindar atención integral y humana, poniendo al paciente al centro de cada solución. Nuestra misión es acompañar a cada persona en su proceso de recuperación física, emocional y social.' :
                                 item.key === 'vision' ? 'Buscamos expandir nuestra presencia a nivel nacional, desarrollando tecnología propia y manteniendo los estándares de calidad y atención personalizada que nos han caracterizado durante 30 años.' :
                                 item.key === 'tecnologia' ? 'Integramos escaneo y fabricación moderna con materiales de alta calidad para crear soluciones ortopédicas más precisas, cómodas y duraderas.' :
                                 'Planeamos abrir nuevas clínicas de rehabilitación, mejorar la accesibilidad económica, implementar programas comunitarios y expandir la fabricación de soluciones ortopédicas para todo el país.'
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
                    src={activeVision.image}
                    alt={activeVision.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-semibold mb-4 text-gray-800">{activeVision.title}</h3>
                  <p className="text-lg text-gray-700 mb-6">{activeVision.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to={activeVision.primaryCta.href}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                    >
                      {activeVision.primaryCta.text}
                    </Link>
                    <Link
                      to={activeVision.secondaryCta.href}
                      className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                    >
                      {activeVision.secondaryCta.text}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Nuestra Filosofía */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Nuestra <span className="text-blue-600">Filosofía de Atención</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Desde el primer día, en Ortopedia Cuernavaca hemos tenido la convicción de que cada paciente es único y merece una solución única. No creemos en respuestas genéricas, sino en un trato que parte de la escucha y la comprensión profunda de la condición física y emocional de la persona.
                </p>
              </motion.div>
            </div>

            {/* Valores Animados */}
            <ValoresFilosofiaAnimado />
          </div>
        </section>

        {/* Nuestros Logros */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
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
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
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
                  src="https://placehold.co/400x300/E0E7FF/1E3A8A?text=Instalaciones+1"
                  alt="Instalaciones OrtoTech"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="https://placehold.co/400x300/E0E7FF/1E3A8A?text=Instalaciones+2"
                  alt="Instalaciones OrtoTech"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="https://placehold.co/400x300/E0E7FF/1E3A8A?text=Instalaciones+3"
                  alt="Instalaciones OrtoTech"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="https://placehold.co/400x300/E0E7FF/1E3A8A?text=Instalaciones+4"
                  alt="Instalaciones OrtoTech"
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mensaje Final */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
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
                <Link to="/citas" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Agendar Consulta
                </Link>
                <Link to="/servicios" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Conocer Servicios
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

// Componente de Valores Animados
function ValoresFilosofiaAnimado() {
  const valores = [
    { key: 'resiliencia', label: 'Resiliencia', image: 'https://placehold.co/960x540/FFFFFF/000000?text=Resiliencia', title: 'Resiliencia (Valor Central)', description: `Creemos en la capacidad de superar cualquier desafío. Cada día vemos cómo nuestros pacientes transforman el dolor en esperanza, y cómo nuestra propia historia como empresa se ha construido resistiendo crisis, aprendiendo y evolucionando. La resiliencia es el motor que nos permite seguir adelante, adaptarnos a los cambios y acompañar a cada persona hasta recuperar su movilidad y confianza.`, },
    { key: 'compromiso', label: 'Compromiso', image: 'https://placehold.co/960x540/FFFFFF/000000?text=Compromiso', title: 'Compromiso', description: `Nos comprometemos con cada paciente como si fuera parte de nuestra familia. Cumplimos lo que prometemos, seguimos cada proceso hasta el final y ponemos nuestro máximo esfuerzo en ofrecer soluciones seguras, efectivas y personalizadas. El compromiso es la base de la confianza que nos han brindado durante más de 30 años.`, },
    { key: 'etica', label: 'Ética', image: 'https://placehold.co/960x540/FFFFFF/000000?text=Ética', title: 'Ética', description: `Creemos que la salud debe manejarse con integridad absoluta. Por eso ofrecemos diagnósticos y soluciones honestas, explicando con claridad tratamientos, costos y expectativas reales. Nuestra ética asegura que cada decisión que tomamos está enfocada en el bienestar del paciente, por encima de cualquier otro interés.`, },
    { key: 'empatia', label: 'Empatía', image: 'https://placehold.co/960x540/FFFFFF/000000?text=Empatía', title: 'Empatía', description: `Cada paciente llega con su propia historia, con miedos, frustraciones y esperanzas. Nuestra empatía nos permite escuchar de verdad, entender lo que están viviendo y acompañarlos con sensibilidad durante todo el proceso de rehabilitación. Sabemos que cuidar el aspecto emocional es tan importante como tratar el físico.`, },
    { key: 'solidaridad', label: 'Solidaridad', image: 'https://placehold.co/960x540/FFFFFF/000000?text=Solidaridad', title: 'Solidaridad', description: `No solo atendemos a quienes llegan a nosotros; buscamos impactar positivamente en la comunidad. La solidaridad nos inspira a apoyar a quienes más lo necesitan, ya sea con orientación, programas comunitarios o ajustando soluciones cuando las circunstancias lo requieren. Creemos que nuestra responsabilidad va más allá de nuestra clínica: se extiende a la sociedad.`, },
  ];

  const [active, setActive] = useState(valores[0]);

  return (
    <section className="bg-white text-gray-900 py-16">
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
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={active.image} alt={active.title} className="w-full h-auto object-cover" />
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