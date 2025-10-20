import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarketingLayout from '../../components/layout/MarketingLayout';
import { openWhatsApp } from '../../utils/whatsapp';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('principal');

  const locations = [
    {
      id: 'principal',
      name: 'Ortopedia Cuernavaca',
      subtitle: 'Sucursal Principal',
      address: 'Calle Cuesta Veloz 119, San Cristobal',
      city: '62230 Cuernavaca, Mor.',
      phone: '777 311 2867',
      whatsapp: '777 311 2867',
      email: 'info@ortopediacuernavaca.com',
      hours: 'Lun-Vie: 11:00 AM - 3:00 PM, 4:00 PM - 7:00 PM\nSáb: 11:00 AM - 3:00 PM',
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
      whatsapp: '777 311 9837',
      email: 'pediatrica@ortopediacuernavaca.com',
      hours: 'Lun-Vie: 11:00 AM - 3:00 PM, 4:00 PM - 7:00 PM\nSáb: 11:00 AM - 3:00 PM',
      icon: '👶',
      color: 'green',
    },
  ];

  const socialMedia = [
    {
      name: 'Facebook',
      icon: (
        <img
          src="/images/banners/facebookicon.png"
          alt="Facebook"
          className="w-8 h-8 object-contain"
        />
      ),
      url: 'https://facebook.com/ortopediacuernavaca',
    },
    {
      name: 'Instagram',
      icon: (
        <img
          src="/images/banners/Instagram_icon.png"
          alt="Instagram"
          className="w-8 h-8 object-contain"
        />
      ),
      url: 'https://instagram.com/ortopediacuernavaca',
    },
    {
      name: 'TikTok',
      icon: (
        <img
          src="/images/banners/TikTok Icon.png"
          alt="TikTok"
          className="w-8 h-8 object-contain"
        />
      ),
      url: 'https://tiktok.com/@ortopediacuernavaca',
    },
    {
      name: 'WhatsApp',
      icon: (
        <img
          src="/images/banners/WhatsappIcon.png"
          alt="WhatsApp"
          className="w-8 h-8 object-contain"
        />
      ),
      url: 'https://wa.me/527773112867',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío de formulario
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert('¡Mensaje enviado exitosamente! Te responderemos pronto.');
    setIsSubmitting(false);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: '',
    });
  };

  const selectedLocationData = locations.find((loc) => loc.id === selectedLocation);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-white pt-24 pb-16 overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <div className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-full mb-5 shadow-lg">
                  <span
                    className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"
                    style={{ transform: 'translateY(1px)' }}
                  ></span>
                  Estamos para Servirte
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                  Ponte en Contacto con Nosotros
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-10">
                  Ya sea por teléfono, WhatsApp o llenando nuestro formulario, estamos listos para
                  ayudarte.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-wrap gap-4 justify-center mb-8"
              >
                <ActionButton
                  icon="📞"
                  text="Llamar a Sucursal"
                  onClick={() => window.open(`tel:7773112867`)}
                  className="bg-white hover:bg-blue-50 text-blue-600 shadow-lg border border-gray-100"
                />
                <ActionButton
                  icon="💬"
                  text="Enviar WhatsApp"
                  onClick={() => openWhatsApp('Hola, me gustaría obtener más información.')}
                  className="bg-green-500 hover:bg-green-600 text-white shadow-lg"
                />
              </motion.div>

              {/* Redes Sociales en el Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex justify-center"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    Síguenos en Redes Sociales
                  </h3>
                  <div className="flex gap-6 justify-center">
                    {socialMedia.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-all duration-300"
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

        {/* Contact Info & Form Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-gray-50 relative overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100 rounded-full opacity-15 blur-3xl"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Columna Izquierda: Información de Contacto */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <div className="space-y-8">
                  {locations.map((location) => (
                    <LocationCard key={location.id} location={location} />
                  ))}
                </div>
              </motion.div>

              {/* Columna Derecha: Formulario de Contacto */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              >
                <ContactForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 relative overflow-hidden">
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
                  Encuéntranos Fácilmente
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestras Ubicaciones</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Visítanos en cualquiera de nuestras dos sucursales en Cuernavaca.
                </p>
              </motion.div>
            </div>
            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gray-200 rounded-2xl h-96 shadow-xl overflow-hidden border-4 border-white">
                {/* Placeholder de mapa con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-gray-100 to-indigo-100"></div>
                {/* Puntos y líneas simulando calles */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '2rem 2rem',
                  }}
                ></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
                  <div className="text-5xl mb-4 animate-bounce">📍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 drop-shadow-lg">
                    Mapa Interactivo
                  </h3>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Ortopedia+Cuernavaca"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Abrir en Google Maps
                    </motion.button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </>
  );
}

Contacto.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

// === Subcomponentes Optimizados ===

function LocationCard({ location }) {
  const brandColor = location.color === 'blue' ? 'blue' : 'green';
  const logo =
    location.id === 'principal'
      ? '/images/banners/Ortopedia Cuernavaca Logo.png'
      : '/images/banners/LogoOrtochavitos.svg';

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-${brandColor}-500`}
    >
      {/* Header con Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center">
          <img src={logo} alt={location.name} className="w-12 h-12 mr-4 object-contain" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{location.name}</h3>
            <p className={`text-sm font-medium text-${brandColor}-600`}>{location.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Detalles de Contacto */}
      <div className="p-6 space-y-4">
        <InfoItem icon="📍" text={`${location.address}, ${location.city}`} />
        <InfoItem icon="⏰" text={location.hours.replace('\n', ', ')} />
        <InfoItem icon="✉️" text={location.email} />
      </div>

      {/* Botones de Acción */}
      <div className="grid grid-cols-2 gap-px bg-gray-100 rounded-b-2xl overflow-hidden">
        <ActionButton
          icon="📞"
          text="Llamar"
          href={`tel:${location.phone}`}
          className={`bg-white hover:bg-${brandColor}-50 text-${brandColor}-600`}
        />
        <ActionButton
          icon="💬"
          text="WhatsApp"
          onClick={() => openWhatsApp(`Hola, me gustaría contactar con ${location.name}.`)}
          className={`bg-${brandColor}-500 hover:bg-${brandColor}-600 text-white`}
        />
      </div>
    </div>
  );
}

function ContactForm({ formData, handleInputChange, handleSubmit, isSubmitting }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500 h-full hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <span className="text-white text-2xl">✉️</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Envíanos un Mensaje</h2>
          <p className="text-gray-600">Nos pondremos en contacto a la brevedad.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <InputField
            name="nombre"
            label="Nombre Completo"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
          <InputField
            name="email"
            type="email"
            label="Email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <InputField
          name="telefono"
          type="tel"
          label="Teléfono"
          placeholder="777 123 4567"
          value={formData.telefono}
          onChange={handleInputChange}
        />
        <SelectField
          name="asunto"
          label="Asunto"
          value={formData.asunto}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecciona un asunto</option>
          <option value="consulta">Consulta General</option>
          <option value="cita">Agendar Cita</option>
          <option value="productos">Información de Productos</option>
          <option value="otro">Otro</option>
        </SelectField>
        <TextareaField
          name="mensaje"
          label="Mensaje"
          placeholder="Describe tu consulta..."
          value={formData.mensaje}
          onChange={handleInputChange}
          rows={2}
          required
        />

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Enviando...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="mr-2 text-xl">📤</span>
              Enviar Mensaje
            </div>
          )}
        </motion.button>
      </form>
    </div>
  );
}

// === Componentes de UI Genéricos ===

function InfoItem({ icon, text }) {
  return (
    <div className="flex items-start">
      <span className="text-xl mr-3 mt-1">{icon}</span>
      <p className="text-gray-700 whitespace-pre-line">{text}</p>
    </div>
  );
}

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

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {props.required && '*'}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
      />
    </div>
  );
}

function SelectField({ label, children, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {props.required && '*'}
      </label>
      <select
        {...props}
        className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
      >
        {children}
      </select>
    </div>
  );
}

function TextareaField({ label, rows = 2, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {props.required && '*'}
      </label>
      <textarea
        rows={rows}
        {...props}
        className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
      />
    </div>
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
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-gray-50 relative overflow-hidden">
      {/* Elementos decorativos sutiles */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-50 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gray-50 rounded-full opacity-15 blur-3xl"></div>
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
              Resolvemos tus Dudas
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra respuestas rápidas a las consultas más comunes de nuestros pacientes.
            </p>
          </motion.div>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
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
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
      whileHover={{ y: -3 }}
    >
      <button onClick={onClick} className="w-full flex justify-between items-center text-left p-6">
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-full text-blue-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="p-6 pt-0 text-gray-600 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
