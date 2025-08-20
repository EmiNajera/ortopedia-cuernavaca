import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('principal');

  const locations = [
    {
      id: 'principal',
      name: 'Ortopedia Cuernavaca',
      subtitle: 'Sucursal Principal',
      address: 'Av. Tecnológica 123, Col. Centro',
      city: 'Cuernavaca, Morelos',
      phone: '777 311 2867',
      whatsapp: '777 311 2867',
      email: 'info@ortopediacuernavaca.com',
      hours: 'Lun-Vie: 11:00 AM - 3:00 PM, 4:00 PM - 7:00 PM\nSáb: 11:00 AM - 3:00 PM',
      icon: '🏥',
      color: 'blue'
    },
    {
      id: 'pediatrica',
      name: 'Ortochavitos',
      subtitle: 'Especialistas en Pediatría',
      address: 'Frente al Hospital General Parres',
      city: 'Cuernavaca, Morelos',
      phone: '777 311 9837',
      whatsapp: '777 311 9837',
      email: 'pediatrica@ortopediacuernavaca.com',
      hours: 'Lun-Vie: 11:00 AM - 3:00 PM, 4:00 PM - 7:00 PM\nSáb: 11:00 AM - 3:00 PM',
      icon: '👶',
      color: 'green'
    }
  ];

  const services = [
    { name: 'Plantillas Personalizadas', icon: '🦶' },
    { name: 'Órtesis y Prótesis', icon: '🦿' },
    { name: 'Rehabilitación Física', icon: '💪' },
    { name: 'Estudios de Postura', icon: '📊' },
    { name: 'Calzado Ortopédico', icon: '👟' },
    { name: 'Evaluación Deportiva', icon: '🏃‍♂️' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío de formulario
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('¡Mensaje enviado exitosamente! Te responderemos pronto.');
    setIsSubmitting(false);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    });
  };

  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                Contáctanos
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl mb-8 text-blue-100"
              >
                Estamos aquí para ayudarte en tu camino hacia la recuperación
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">📞 777 311 2867</div>
                  <div className="text-sm">Ortopedia Cuernavaca</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">📞 777 311 9837</div>
                  <div className="text-sm">Ortochavitos</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">Información de Contacto</h2>
                  
                  {/* Location Selector */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Selecciona una Sucursal</h3>
                    <div className="flex space-x-4">
                      {locations.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => setSelectedLocation(location.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            selectedLocation === location.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {location.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Location Details */}
                  <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex items-center mb-6">
                      <div className="text-4xl mr-4">{selectedLocationData.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{selectedLocationData.name}</h3>
                        <p className="text-gray-600">{selectedLocationData.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-blue-600 mt-1">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{selectedLocationData.address}</p>
                          <p className="text-gray-600">{selectedLocationData.city}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{selectedLocationData.phone}</p>
                          <p className="text-gray-600">Teléfono</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-green-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{selectedLocationData.whatsapp}</p>
                          <p className="text-gray-600">WhatsApp</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{selectedLocationData.email}</p>
                          <p className="text-gray-600">Email</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="text-blue-600 mt-1">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Horarios de Atención</p>
                          <p className="text-gray-600 whitespace-pre-line">{selectedLocationData.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Nuestros Servicios</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((service, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center space-x-2 bg-white rounded-lg p-3 shadow-sm"
                        >
                          <span className="text-lg">{service.icon}</span>
                          <span className="text-sm text-gray-700">{service.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Envíanos un Mensaje</h2>
                    <p className="text-gray-600 mb-8">
                      Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre Completo *
                          </label>
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="777 123 4567"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Asunto *
                        </label>
                        <select
                          name="asunto"
                          value={formData.asunto}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Selecciona un asunto</option>
                          <option value="consulta">Consulta General</option>
                          <option value="cita">Agendar Cita</option>
                          <option value="plantillas">Plantillas Personalizadas</option>
                          <option value="ortesis">Órtesis y Prótesis</option>
                          <option value="rehabilitacion">Rehabilitación Física</option>
                          <option value="precios">Información de Precios</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mensaje *
                        </label>
                        <textarea
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleInputChange}
                          required
                          rows="5"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Describe tu consulta o pregunta..."
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestra Ubicación</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Encuéntranos en el corazón de Cuernavaca, cerca de los principales hospitales y centros médicos
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Mapa Interactivo</h3>
                  <p className="text-gray-600">Aquí se mostraría el mapa de Google Maps</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Preguntas Frecuentes</h2>
              <p className="text-gray-600">Resolvemos tus dudas más comunes</p>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">¿Necesito cita previa?</h3>
                <p className="text-gray-600">Sí, recomendamos agendar una cita para brindarte la mejor atención personalizada.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">¿Aceptan seguros médicos?</h3>
                <p className="text-gray-600">Trabajamos con varios seguros médicos. Contáctanos para verificar tu cobertura.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">¿Cuánto tiempo toma fabricar plantillas?</h3>
                <p className="text-gray-600">Las plantillas personalizadas se fabrican en 3-5 días hábiles después de la evaluación.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">¿Atienden emergencias?</h3>
                <p className="text-gray-600">Para emergencias ortopédicas, te recomendamos acudir al hospital más cercano.</p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 