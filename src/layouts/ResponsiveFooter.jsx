import React from 'react';
import Link from 'next/link';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';
import { ResponsiveHeading, ResponsiveText } from '@shared/components/ui/ResponsiveTypography';
import { FooterGrid } from '@shared/components/ui/ResponsiveGrid';

/**
 * Footer Responsive Optimizado
 * Proporciona navegación y contacto accesible en todos los dispositivos
 */
export default function ResponsiveFooter() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/servicios', label: 'Servicios' },
    // { href: '/tienda', label: 'Tienda' }, // Oculto temporalmente - en desarrollo
    { href: '/categorias', label: 'Categorías' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/citas', label: 'Agendar Cita' },
  ];

  const services = [
    { href: '/servicios/detalle/plantillas-personalizadas', label: 'Plantillas Personalizadas' },
    { href: '/servicios/detalle/ortesis', label: 'Órtesis' },
    { href: '/servicios/detalle/protesis', label: 'Prótesis' },
    { href: '/servicios/detalle/fisioterapia', label: 'Fisioterapia' },
    { href: '/servicios/detalle/rehabilitacion', label: 'Rehabilitación' },
    { href: '/servicios/detalle/calzado-ortopedico', label: 'Calzado Ortopédico' },
    { href: '/servicios/detalle/fajas-soportes', label: 'Fajas y Soportes' },
  ];

  const contactInfo = {
    address: 'Calle Cuesta Veloz 119, San Cristóbal, 62230 Cuernavaca, Mor.',
    phone: '777 311 2867',
    email: 'ortochavitos@gmail.com',
    hours: {
      weekdays: 'Lun-Jue: 10:00-15:00, 16:00-19:00',
      friday: 'Vie: 10:00-15:00, 16:00-19:00',
      saturday: 'Sáb: 10:00-15:00',
      sunday: 'Dom: Cerrado',
    },
  };

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/OrtopediaCuernavaca1',
      icon: 'facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ortopediacuernavaca/',
      icon: 'instagram',
      color: 'bg-pink-600 hover:bg-pink-700',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@ortopediacuernavaca',
      icon: 'tiktok',
      color: 'bg-black hover:bg-gray-800',
    },
    {
      name: 'WhatsApp',
      action: openWhatsApp,
      icon: 'whatsapp',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/ortopediacuernavaca/',
      icon: 'linkedin',
      color: 'bg-blue-700 hover:bg-blue-800',
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <ResponsiveHeading level="h3" className="text-white mb-4">
              Ortopedia Cuernavaca
            </ResponsiveHeading>
            <ResponsiveText level="bodySmall" className="text-gray-400 mb-6">
              30 años transformando vidas con soluciones ortopédicas y rehabilitación integral.
            </ResponsiveText>

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <ResponsiveText level="caption" className="text-gray-400 leading-relaxed">
                  {contactInfo.address}
                </ResponsiveText>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-blue-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-blue-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-300 hover:text-white text-sm transition-colors break-all"
                >
                  {contactInfo.email}
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-gray-300 text-xs font-medium mb-1">Horarios:</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {contactInfo.hours.weekdays}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {contactInfo.hours.saturday}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-white font-semibold mb-3 text-sm">Síguenos</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url || '#'}
                    onClick={(e) => {
                      if (link.action) {
                        e.preventDefault();
                        link.action();
                      }
                    }}
                    target={link.url ? '_blank' : undefined}
                    rel={link.url ? 'noopener noreferrer' : undefined}
                    className={`${link.color} text-white p-2.5 sm:p-3 rounded-full transition-colors`}
                    aria-label={link.name}
                  >
                    <span className="sr-only">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <ResponsiveHeading level="h5" className="text-white mb-4 text-sm sm:text-base">
              Enlaces Rápidos
            </ResponsiveHeading>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-xs sm:text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <ResponsiveHeading level="h5" className="text-white mb-4 text-sm sm:text-base">
              Nuestros Servicios
            </ResponsiveHeading>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-white text-xs sm:text-sm transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <ResponsiveHeading level="h5" className="text-white mb-4 text-sm sm:text-base">
              Ubicación
            </ResponsiveHeading>
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1758915163750!6m8!1m7!1skmis9NO2AAmVvxk2Dt4KJw!2m2!1d18.95275686874346!2d-99.23240494440955!3f231.7862475282573!4f1.8712908463952829!5f0.7820865974627469"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Ortopedia Cuernavaca"
                className="rounded-lg"
              ></iframe>
            </div>
            <a
              href="https://maps.google.com/?q=Calle+Cuesta+Veloz+119,+San+Cristobal,+62230+Cuernavaca,+Mor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm transition-colors inline-flex items-center mt-3"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Abrir en Google Maps
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-700">
          <div className="text-center">
            <ResponsiveHeading level="h3" className="text-white mb-3 sm:mb-4">
              ¿Necesitas una consulta especializada?
            </ResponsiveHeading>
            <ResponsiveText level="body" className="text-gray-400 mb-6">
              Agenda tu cita hoy mismo y comienza tu camino hacia la recuperación
            </ResponsiveText>
            <button
              onClick={() => openWhatsApp()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors inline-block text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Agendar Cita Ahora
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 bg-gray-950">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
            <ResponsiveText level="caption" className="text-gray-500">
              <p>&copy; {currentYear} Ortopedia Cuernavaca. Todos los derechos reservados.</p>
            </ResponsiveText>
            <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
              <a
                href="/privacidad"
                className="text-gray-500 hover:text-white transition-colors text-xs sm:text-sm"
              >
                Aviso de Privacidad
              </a>
              <a
                href="/terminos"
                className="text-gray-500 hover:text-white transition-colors text-xs sm:text-sm"
              >
                Términos de Uso
              </a>
              <a
                href="/cookies"
                className="text-gray-500 hover:text-white transition-colors text-xs sm:text-sm"
              >
                Política de Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
