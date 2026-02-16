import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';

export default function Contacto() {
  const locations = [
    {
      id: 'principal',
      name: 'Ortopedia Cuernavaca',
      subtitle: 'Sucursal Principal',
      address: 'Calle Cuesta Veloz 119, San Cristobal',
      city: '62230 Cuernavaca, Mor.',
      phone: '777 311 2867',
      whatsapp: '777 215 0982',
      email: 'ortochavitos@gmail.com',
      hours: {
        weekdays: 'Lun-Vie: 10:00 AM - 3:00 PM',
        saturday: 'Sáb: 10:00 AM - 3:00 PM',
        sunday: 'Dom: Cerrado',
      },
      icon: '🏥',
      color: 'blue',
    },
    {
      id: 'pediatrica',
      name: 'Ortochavitos',
      subtitle: 'Especialistas en Pediatría',
      address: 'Av. Domingo Diez 203 a, Lomas de la Selva',
      city: '62270 Cuernavaca, Mor.',
      phone: '777 311 9837',
      whatsapp: '777 215 0982',
      email: 'ortochavitos@gmail.com',
      hours: {
        weekdays: 'Lun-Vie: 10:00 AM - 3:00 PM',
        saturday: 'Sáb: 10:00 AM - 3:00 PM',
        sunday: 'Dom: Cerrado',
      },
      icon: '👶',
      color: 'green',
    },
  ];

  const socialMedia = [
    {
      name: 'Facebook',
      icon: (
        <Image
          src="/images/banners/facebookicon.png"
          alt="Síguenos en Facebook - Ortopedia Cuernavaca"
          width={32}
          height={32}
          className="object-contain"
        />
      ),
      url: 'https://facebook.com/ortopediacuernavaca',
    },
    {
      name: 'Instagram',
      icon: (
        <Image
          src="/images/banners/Instagram_icon.png"
          alt="Síguenos en Instagram - Ortopedia Cuernavaca"
          width={32}
          height={32}
          className="object-contain"
        />
      ),
      url: 'https://instagram.com/ortopediacuernavaca',
    },
    {
      name: 'TikTok',
      icon: (
        <Image
          src="/images/banners/tiktok-icon.png"
          alt="Síguenos en TikTok - Ortopedia Cuernavaca"
          width={32}
          height={32}
          className="object-contain"
        />
      ),
      url: 'https://tiktok.com/@ortopediacuernavaca',
    },
    {
      name: 'WhatsApp',
      icon: (
        <Image
          src="/images/banners/WhatsappIcon.png"
          alt="Contáctanos por WhatsApp - Ortopedia Cuernavaca"
          width={32}
          height={32}
          className="object-contain"
        />
      ),
      url: 'https://wa.me/527772150982',
    },
  ];

  return (
    <main
      id="contenido-principal"
      className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white"
    >
      {/* Hero Section */}
      <section
        id="hero-contacto"
        aria-labelledby="hero-contacto-heading"
        className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 overflow-hidden"
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-48 sm:w-72 h-48 sm:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-5 shadow-lg">
                <span
                  className="w-2 h-2 bg-white rounded-full mr-2 sm:mr-3 animate-pulse"
                  style={{ transform: 'translateY(1px)' }}
                ></span>
                Estamos para Servirte
              </div>
              <h1
                id="hero-contacto-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight"
              >
                Ponte en Contacto con Nosotros
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 leading-relaxed">
                Estamos aquí para ayudarte. Contáctanos por teléfono, WhatsApp o síguenos en
                nuestras redes sociales.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8"
            >
              <ActionButton
                icon="📞"
                text="Llamar a Sucursal"
                onClick={() => window.open(`tel:7773112867`)}
                className="bg-white hover:bg-blue-50 text-blue-600 shadow-lg border border-gray-100 min-h-[48px]"
              />
              <ActionButton
                icon="💬"
                text="Enviar WhatsApp"
                onClick={() =>
                  openWhatsApp('7772150982', 'Hola, me gustaría obtener más información.')
                }
                className="bg-green-500 hover:bg-green-600 text-white shadow-lg min-h-[48px]"
              />
            </motion.div>

            {/* Redes Sociales en el Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-blue-100">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 text-center">
                  Síguenos en Redes Sociales
                </h2>
                <div className="flex gap-4 sm:gap-6 justify-center">
                  {socialMedia.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section
        id="ubicaciones"
        aria-labelledby="ubicaciones-heading"
        className="py-20 bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 relative overflow-hidden"
      >
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100 rounded-full opacity-15 blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
                <span
                  className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"
                  style={{ transform: 'translateY(1px)' }}
                ></span>
                Ubicaciones
              </div>
              <h2 id="ubicaciones-heading" className="text-4xl font-bold text-gray-900 mb-4">
                Nuestras Sucursales
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Encuentra nuestras dos ubicaciones en Cuernavaca. Haz clic en los mapas para obtener
                direcciones exactas.
              </p>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-white"
              >
                {/* Header de la ubicación */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
                  <div className="flex items-center">
                    <Image
                      src={
                        location.id === 'principal'
                          ? '/images/banners/Ortopedia Cuernavaca Logo.png'
                          : '/images/banners/LogoOrtochavitos.svg'
                      }
                      alt={`Logo de ${location.name} - ${location.subtitle}`}
                      width={40}
                      height={40}
                      className="mr-3 object-contain"
                    />
                    <div>
                      <h3 className="text-xl font-bold" id={`${location.id}-heading`}>
                        {location.name}
                      </h3>
                      <p className="text-sm text-blue-100">{location.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Mapa embebido */}
                <div className="relative bg-gray-200 h-64">
                  <iframe
                    src={
                      location.id === 'principal'
                        ? 'https://www.google.com/maps/embed?pb=!4v1758915163750!6m8!1m7!1skmis9NO2AAmVvxk2Dt4KJw!2m2!1d18.95275686874346!2d-99.23240494440955!3f231.7862475282573!4f1.8712908463952829!5f0.7820865974627469'
                        : 'https://www.google.com/maps/embed?pb=!4v1764883910775!6m8!1m7!1sYpD7iGgHeJJdNZF_IsrRIw!2m2!1d18.93685223772931!2d-99.2338996166512!3f225.36400369069733!4f-1.241214829585246!5f0.7820865974627469'
                    }
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Ubicación de ${location.name} - ${location.address}, ${location.city}`}
                    className="w-full h-full"
                  />
                </div>

                {/* Información de contacto */}
                <div className="p-6 space-y-4">
                  {/* Dirección */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">📍</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 font-semibold text-sm mb-1">Dirección</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{location.address}</p>
                      <p className="text-gray-500 text-xs mt-1">{location.city}</p>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">📞</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 font-semibold text-sm mb-1">Teléfono</p>
                      <a
                        href={`tel:${location.phone.replace(/\s/g, '')}`}
                        className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                      >
                        {location.phone}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">💬</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 font-semibold text-sm mb-1">WhatsApp</p>
                      <a
                        href={`https://wa.me/52${location.whatsapp.replace(/\s/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 transition-colors font-medium"
                      >
                        {location.whatsapp}
                      </a>
                    </div>
                  </div>

                  {/* Correo Electrónico */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">✉️</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 font-semibold text-sm mb-1">Correo Electrónico</p>
                      <a
                        href={`mailto:${location.email}`}
                        className="text-purple-600 hover:text-purple-700 transition-colors font-medium text-sm break-all"
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>

                  {/* Horarios */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">⏰</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 font-semibold text-sm mb-2">
                        Horarios de Atención
                      </p>
                      <div className="space-y-1.5">
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          <p className="text-gray-600 text-sm">{location.hours.weekdays}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          <p className="text-gray-600 text-sm">{location.hours.saturday}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          <p className="text-gray-600 text-sm">{location.hours.sunday}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botón Google Maps */}
                  <a
                    href={
                      location.id === 'principal'
                        ? 'https://maps.google.com/?q=Calle+Cuesta+Veloz+119,+San+Cristobal,+62230+Cuernavaca,+Mor'
                        : 'https://maps.google.com/?q=Av.+Domingo+Diez+203+a,+Lomas+de+la+Selva,+62270+Cuernavaca,+Mor'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4"
                  >
                    <motion.button
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Abrir en Google Maps
                    </motion.button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </main>
  );
}

// Note: layout is applied at the page level (`src/pages/contacto.jsx`) via getLayout

// === Subcomponentes Optimizados ===

// === Componentes de UI Genéricos ===

function ActionButton({ icon, text, href, onClick, className }) {
  const content = (
    <div className="flex items-center justify-center p-4 font-semibold transition-colors duration-200">
      <span className="text-xl mr-2">{icon}</span>
      <span>{text}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
}

function FAQSection() {
  const faqData = [
    {
      question: '¿Necesito cita previa?',
      answer:
        'Sí, recomendamos agendar una cita para brindarte la mejor atención personalizada y reducir tiempos de espera.',
    },
    {
      question: '¿Aceptan seguros médicos?',
      answer:
        'Trabajamos con una amplia red de aseguradoras. Por favor, contáctanos directamente con los detalles de tu póliza para confirmar la cobertura.',
    },
    {
      question: '¿Cuánto tiempo toma fabricar plantillas?',
      answer:
        'Nuestras plantillas personalizadas se fabrican con tecnología de precisión y suelen estar listas en un plazo de 3 a 5 días hábiles después de tu evaluación biomecánica.',
    },
    {
      question: '¿Atienden emergencias ortopédicas?',
      answer:
        'Para emergencias médicas graves, como fracturas expuestas, te recomendamos acudir al servicio de urgencias del hospital más cercano. Nosotros podemos atender urgencias menores con cita previa.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="preguntas-frecuentes-heading"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Elementos decorativos sutiles */}
      <div className="absolute top-0 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-blue-50 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-gray-50 rounded-full opacity-15 blur-3xl"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-3 sm:px-4 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold rounded-full mb-3">
              <span
                className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"
                style={{ transform: 'translateY(1px)' }}
              ></span>
              Resolvemos tus Dudas
            </div>
            <h2
              id="preguntas-frecuentes-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4"
            >
              Preguntas Frecuentes
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra respuestas rápidas a las consultas más comunes de nuestros pacientes.
            </p>
          </motion.div>
        </div>
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ question, answer, isOpen, onClick }) {
  return (
    <motion.div
      initial={false}
      className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
      whileHover={{ y: -2 }}
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left p-4 sm:p-6 min-h-[44px]"
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 pr-2">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-blue-50 rounded-full text-blue-500 flex-shrink-0"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-6 pt-0 text-sm sm:text-base text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
