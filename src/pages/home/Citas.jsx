import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarketingLayout from '../../components/layout/MarketingLayout';

export default function Citas() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    edad: '',
    motivo: '',
    antecedentes: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    {
      id: 'consulta-general',
      name: 'Consulta General',
      description: 'Evaluación inicial y diagnóstico de problemas ortopédicos',
      duration: '45 min',
      price: '$500',
      icon: '👨‍⚕️',
      color: 'blue'
    },
    {
      id: 'plantillas-personalizadas',
      name: 'Plantillas Personalizadas',
      description: 'Diseño y fabricación de plantillas ortopédicas a medida',
      duration: '60 min',
      price: '$800',
      icon: '🦶',
      color: 'green'
    },
    {
      id: 'ortesis-protesis',
      name: 'Órtesis y Prótesis',
      description: 'Evaluación y adaptación de dispositivos ortopédicos',
      duration: '90 min',
      price: '$1,200',
      icon: '🦿',
      color: 'purple'
    },
    {
      id: 'rehabilitacion-fisica',
      name: 'Rehabilitación Física',
      description: 'Sesiones de fisioterapia y rehabilitación integral',
      duration: '60 min',
      price: '$600',
      icon: '💪',
      color: 'orange'
    },
    {
      id: 'estudio-postura',
      name: 'Estudio de Postura',
      description: 'Análisis biomecánico y corrección postural',
      duration: '75 min',
      price: '$700',
      icon: '📊',
      color: 'red'
    },
    {
      id: 'evaluacion-deportiva',
      name: 'Evaluación Deportiva',
      description: 'Análisis para atletas y prevención de lesiones',
      duration: '60 min',
      price: '$650',
      icon: '🏃‍♂️',
      color: 'teal'
    }
  ];

  const availableDates = [
    { date: '2024-01-22', day: 'Lun', available: true },
    { date: '2024-01-23', day: 'Mar', available: true },
    { date: '2024-01-24', day: 'Mié', available: true },
    { date: '2024-01-25', day: 'Jue', available: false },
    { date: '2024-01-26', day: 'Vie', available: true },
    { date: '2024-01-27', day: 'Sáb', available: true },
    { date: '2024-01-28', day: 'Dom', available: false },
    { date: '2024-01-29', day: 'Lun', available: true },
    { date: '2024-01-30', day: 'Mar', available: true },
    { date: '2024-01-31', day: 'Mié', available: true }
  ];

  const availableTimes = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setCurrentStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCurrentStep(3);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep(4);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío de formulario
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('¡Cita agendada exitosamente! Te enviaremos una confirmación por email.');
    setIsSubmitting(false);
    setCurrentStep(1);
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      edad: '',
      motivo: '',
      antecedentes: ''
    });
  };

  const getServiceColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      teal: 'bg-teal-100 text-teal-600 border-teal-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <MarketingLayout>
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
                Agenda tu <span className="text-blue-200">Cita</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl mb-8 text-blue-100"
              >
                Tu camino hacia la recuperación comienza aquí
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

        {/* Booking Process */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            {/* Progress Bar */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= step 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 ${
                        currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Servicio</span>
                <span>Fecha</span>
                <span>Hora</span>
                <span>Datos</span>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">Selecciona tu Servicio</h2>
                      <p className="text-gray-600">Elige el tipo de consulta que necesitas</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {services.map((service) => (
                        <motion.div
                          key={service.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleServiceSelect(service.id)}
                          className="border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="text-4xl">{service.icon}</div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                {service.name}
                              </h3>
                              <p className="text-gray-600 mb-3">{service.description}</p>
                              <div className="flex items-center justify-between">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getServiceColor(service.color)}`}>
                                  {service.duration}
                                </span>
                                <span className="text-lg font-bold text-gray-800">{service.price}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date Selection */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">Elige una Fecha</h2>
                      <p className="text-gray-600">Selecciona el día que mejor te convenga</p>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      {availableDates.map((dateInfo) => (
                        <motion.button
                          key={dateInfo.date}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => dateInfo.available && handleDateSelect(dateInfo.date)}
                          disabled={!dateInfo.available}
                          className={`p-4 rounded-xl text-center transition-all duration-300 ${
                            dateInfo.available
                              ? 'bg-gray-50 hover:bg-blue-50 hover:border-blue-300 border-2 border-transparent cursor-pointer'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <div className="text-sm font-medium text-gray-500">{dateInfo.day}</div>
                          <div className="text-lg font-bold text-gray-800 mt-1">
                            {new Date(dateInfo.date).getDate()}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                    <div className="mt-8 text-center">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        ← Volver a servicios
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Time Selection */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">Selecciona una Hora</h2>
                      <p className="text-gray-600">Horarios disponibles para el {new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {availableTimes.map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTimeSelect(time)}
                          className="p-4 bg-gray-50 hover:bg-blue-50 border-2 border-transparent hover:border-blue-300 rounded-xl text-center transition-all duration-300"
                        >
                          <div className="text-lg font-semibold text-gray-800">{time}</div>
                        </motion.button>
                      ))}
                    </div>
                    <div className="mt-8 text-center">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        ← Volver a fechas
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Personal Information */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">Información Personal</h2>
                      <p className="text-gray-600">Completa tus datos para confirmar la cita</p>
                    </div>

                    {/* Appointment Summary */}
                    <div className="bg-blue-50 rounded-xl p-6 mb-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de tu Cita</h3>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Servicio:</span>
                          <p className="text-gray-800">{services.find(s => s.id === selectedService)?.name}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Fecha:</span>
                          <p className="text-gray-800">{new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Hora:</span>
                          <p className="text-gray-800">{selectedTime}</p>
                        </div>
                      </div>
                    </div>

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
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Teléfono *
                          </label>
                          <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="777 123 4567"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Edad
                          </label>
                          <input
                            type="number"
                            name="edad"
                            value={formData.edad}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="25"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motivo de la Consulta *
                        </label>
                        <textarea
                          name="motivo"
                          value={formData.motivo}
                          onChange={handleInputChange}
                          required
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Describe brevemente el motivo de tu consulta..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Antecedentes Médicos
                        </label>
                        <textarea
                          name="antecedentes"
                          value={formData.antecedentes}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Información relevante sobre tu historial médico..."
                        />
                      </div>
                      <div className="flex items-center justify-between pt-6">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          ← Volver a horarios
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Agendando...' : 'Confirmar Cita'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Por qué Elegirnos?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Más de 30 años de experiencia en ortopedia y rehabilitación
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-4">👨‍⚕️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Especialistas Certificados</h3>
                <p className="text-gray-600">Equipo de profesionales con formación en el Instituto Nacional de Rehabilitación</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tecnología Avanzada</h3>
                <p className="text-gray-600">Equipos de última generación para diagnósticos precisos y tratamientos efectivos</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Atención Personalizada</h3>
                <p className="text-gray-600">Cada paciente es único y merece un tratamiento individualizado</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  ¿Necesitas Ayuda?
                </h2>
                <p className="text-xl mb-8 text-blue-100">
                  Nuestro equipo está aquí para ayudarte
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-2xl mb-2">🏥</div>
                    <h3 className="text-xl font-semibold mb-2">Ortopedia Cuernavaca</h3>
                    <p className="text-blue-100 mb-2">Sucursal Principal</p>
                    <p className="text-2xl font-bold">777 311 2867</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-2xl mb-2">👶</div>
                    <h3 className="text-xl font-semibold mb-2">Ortochavitos</h3>
                    <p className="text-blue-100 mb-2">Especialistas en Pediatría</p>
                    <p className="text-2xl font-bold">777 311 9837</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
} 