import React from 'react';
import Link from 'next/link';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Ortopedia Cuernavaca
              </h3>
              <p className="text-gray-400 text-sm">
                30 años transformando vidas con soluciones ortopédicas y rehabilitación integral.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Calle Cuesta Veloz 119</p>
                  <p className="text-gray-300 text-sm">San Cristobal, 62230</p>
                  <p className="text-gray-300 text-sm">Cuernavaca, Mor.</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-5 h-5">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <a
                  href="tel:7773112867"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  777 311 2867
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-5 h-5">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <a
                  href="mailto:ortochavitos@gmail.com"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  ortochavitos@gmail.com
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Horarios de Atención:</p>
                  <p className="text-gray-300 text-xs">Lun-Jue: 10:00-15:00, 16:00-19:00</p>
                  <p className="text-gray-300 text-xs">Vie: 10:00-15:00, 16:00-19:00</p>
                  <p className="text-gray-300 text-xs">Sáb: 10:00-15:00</p>
                  <p className="text-gray-300 text-xs">Dom: Cerrado</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/OrtopediaCuernavaca1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 sm:p-3 rounded-full transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/ortopediacuernavaca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 hover:bg-pink-700 text-white p-2.5 sm:p-3 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@ortopediacuernavaca?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-gray-800 text-white p-2.5 sm:p-3 rounded-full transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.78 0c0-1.59 1.3-2.89 2.89-2.89.36 0 .71.07 1.03.2V8.66a6.84 6.84 0 0 0-1.03-.05A5.89 5.89 0 0 0 5.89 14.55a5.89 5.89 0 0 0 11.78 0V9.05a8.18 8.18 0 0 0 4.77 1.44v-3.8a4.85 4.85 0 0 1-2.85 0z" />
                  </svg>
                </a>
                <button
                  onClick={() => openWhatsApp()}
                  className="bg-green-600 hover:bg-green-700 text-white p-2.5 sm:p-3 rounded-full transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </button>
                <a
                  href="https://www.linkedin.com/company/ortopediacuernavaca/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 hover:bg-blue-800 text-white p-2.5 sm:p-3 rounded-full transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Servicios
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/tienda"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Tienda
                </Link>
              </li> */}
              {/* Tienda oculta temporalmente - en desarrollo */}
              <li>
                <Link
                  href="/categorias"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Categorías
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">
              Nuestros Servicios
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/servicios/detalle/plantillas-personalizadas"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Plantillas Personalizadas
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/detalle/ortesis"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Órtesis
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/detalle/protesis"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Prótesis
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/detalle/fisioterapia"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Fisioterapia
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/detalle/rehabilitacion"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Rehabilitación
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/detalle/calzado-ortopedico"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Calzado Ortopédico
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/detalle/fajas-soportes"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Fajas y Soportes
                </Link>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">
              Ubicación
            </h4>
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4 mb-4">
              <div className="bg-gray-700 rounded-lg h-40 sm:h-48 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1758915163750!6m8!1m7!1skmis9NO2AAmVvxk2Dt4KJw!2m2!1d18.95275686874346!2d-99.23240494440955!3f231.7862475282573!4f1.8712908463952829!5f0.7820865974627469"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Ortopedia Cuernavaca - Calle Cuesta Veloz 119, San Cristóbal, Cuernavaca, Mor."
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 w-4 h-4 mt-0.5">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300">Calle Cuesta Veloz 119</p>
                  <p className="text-gray-300">San Cristobal, 62230</p>
                  <p className="text-gray-300">Cuernavaca, Mor.</p>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Calle+Cuesta+Veloz+119,+San+Cristobal,+62230+Cuernavaca,+Mor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors inline-flex items-center"
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
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
          <div className="text-center">
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              ¿Necesitas una consulta especializada?
            </h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Agenda tu cita hoy mismo y comienza tu camino hacia la recuperación
            </p>
            <button
              onClick={() => openWhatsApp()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors inline-block text-sm sm:text-base"
            >
              Agendar Cita Ahora
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        className="border-t border-gray-700 bg-gray-950"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 md:mb-0">
              <p>
                &copy; {new Date().getFullYear()} Ortopedia Cuernavaca. Todos los derechos
                reservados.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm">
              <Link
                href="/aviso-privacidad"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Aviso de Privacidad
              </Link>
              <Link
                href="/terminos-uso"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Términos de Uso
              </Link>
              <Link
                href="/politica-cookies"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
