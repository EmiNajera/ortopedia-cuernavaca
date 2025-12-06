import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getSiteUrl, getFullUrl } from '@shared/lib/utils/siteUrl';
import MarketingLayout from '@layouts/MarketingLayout';

export default function AvisoPrivacidadPage() {
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/aviso-privacidad`;
  const pageTitle = 'Aviso de Privacidad | Ortopedia Cuernavaca';
  const pageDescription =
    'Aviso de Privacidad de Ortopedia Cuernavaca. Conoce cómo protegemos y utilizamos tus datos personales de acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.';

  // JSON-LD Structured Data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Aviso de Privacidad',
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="aviso de privacidad, protección de datos, privacidad ortopedia, datos personales, LFPDPPP, privacidad cuernavaca"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:locale" content="es_MX" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <main id="contenido-principal" className="min-h-screen bg-white">
        {/* Hero Section */}
        <section
          id="hero-aviso"
          aria-labelledby="hero-aviso-heading"
          className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                id="hero-aviso-heading"
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              >
                Aviso de Privacidad
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Última actualización:{' '}
                {new Date().toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-base text-gray-700 max-w-2xl mx-auto">
                En Ortopedia Cuernavaca nos comprometemos a proteger tu privacidad y tus datos
                personales. Este aviso describe cómo recopilamos, utilizamos y protegemos tu
                información.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section id="contenido-aviso" className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto prose prose-lg prose-blue">
              {/* Responsable */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  1. Responsable del Tratamiento de Datos Personales
                </h2>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>Ortopedia Cuernavaca</strong>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Calle Cuesta Veloz 119, San Cristobal
                    <br />
                    62230 Cuernavaca, Morelos, México
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Teléfono:</strong> 777 311 2867
                    <br />
                    <strong>Email:</strong> ortochavitos@gmail.com
                  </p>
                </div>
              </div>

              {/* Datos que recopilamos */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  2. Datos Personales que Recopilamos
                </h2>
                <p className="text-gray-700 mb-4">
                  Recopilamos los siguientes tipos de datos personales:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Datos de identificación:</strong> Nombre completo, fecha de nacimiento,
                    edad, género
                  </li>
                  <li>
                    <strong>Datos de contacto:</strong> Teléfono, correo electrónico, dirección
                  </li>
                  <li>
                    <strong>Datos de salud:</strong> Información médica, historial clínico,
                    diagnósticos, tratamientos
                  </li>
                  <li>
                    <strong>Datos financieros:</strong> Información de facturación y pagos
                  </li>
                  <li>
                    <strong>Datos de navegación:</strong> Dirección IP, cookies, datos de uso del
                    sitio web
                  </li>
                </ul>
              </div>

              {/* Finalidad */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  3. Finalidad del Tratamiento de Datos Personales
                </h2>
                <p className="text-gray-700 mb-4">
                  Utilizamos tus datos personales para las siguientes finalidades:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Finalidades Primarias (Necesarias):
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>Prestar servicios de ortopedia, rehabilitación y fisioterapia</li>
                    <li>Gestionar citas y atención médica</li>
                    <li>Fabricar y adaptar productos ortopédicos personalizados</li>
                    <li>Realizar evaluaciones y diagnósticos</li>
                    <li>Facturar y procesar pagos</li>
                    <li>Cumplir con obligaciones legales y regulatorias</li>
                  </ul>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Finalidades Secundarias (Opcionales):
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Enviar información sobre servicios y promociones</li>
                    <li>Realizar encuestas de satisfacción</li>
                    <li>Mejorar nuestros servicios y atención</li>
                    <li>Compartir información educativa sobre salud ortopédica</li>
                  </ul>
                </div>
              </div>

              {/* Transferencias */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  4. Transferencias de Datos Personales
                </h2>
                <p className="text-gray-700 mb-4">
                  Tus datos personales pueden ser compartidos con:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Proveedores de servicios de tecnología y hosting</li>
                  <li>Proveedores de servicios de pago</li>
                  <li>Autoridades sanitarias cuando sea requerido por ley</li>
                  <li>Asesores legales y contables</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  No vendemos ni compartimos tus datos personales con terceros para fines
                  comerciales sin tu consentimiento explícito.
                </p>
              </div>

              {/* Derechos ARCO */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Derechos ARCO</h2>
                <p className="text-gray-700 mb-4">Tienes derecho a:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Acceso</h3>
                    <p className="text-gray-700 text-sm">
                      Conocer qué datos personales tenemos sobre ti
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Rectificación</h3>
                    <p className="text-gray-700 text-sm">
                      Solicitar la corrección de datos incorrectos o incompletos
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-2">Cancelación</h3>
                    <p className="text-gray-700 text-sm">
                      Solicitar la eliminación de tus datos cuando ya no sean necesarios
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Oposición</h3>
                    <p className="text-gray-700 text-sm">
                      Oponerte al tratamiento de tus datos para ciertas finalidades
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mt-6">
                  Para ejercer tus derechos ARCO, envía una solicitud por escrito a{' '}
                  <a
                    href="mailto:ortochavitos@gmail.com"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    ortochavitos@gmail.com
                  </a>{' '}
                  o acude a nuestras instalaciones en horario de atención.
                </p>
              </div>

              {/* Revocación de consentimiento */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  6. Revocación del Consentimiento
                </h2>
                <p className="text-gray-700 mb-4">
                  Puedes revocar tu consentimiento para el tratamiento de datos personales en
                  cualquier momento, excepto cuando sea necesario para cumplir con obligaciones
                  legales o contractuales.
                </p>
                <p className="text-gray-700">
                  La revocación no afectará el tratamiento de datos realizados con anterioridad a tu
                  solicitud.
                </p>
              </div>

              {/* Medidas de seguridad */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Medidas de Seguridad</h2>
                <p className="text-gray-700 mb-4">
                  Implementamos medidas técnicas, administrativas y físicas para proteger tus datos
                  personales:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Encriptación de datos sensibles</li>
                  <li>Acceso restringido a información personal</li>
                  <li>Capacitación del personal en protección de datos</li>
                  <li>Backups y sistemas de recuperación</li>
                  <li>Actualizaciones regulares de seguridad</li>
                </ul>
              </div>

              {/* Cambios al aviso */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  8. Cambios al Aviso de Privacidad
                </h2>
                <p className="text-gray-700 mb-4">
                  Nos reservamos el derecho de modificar este aviso de privacidad. Los cambios serán
                  publicados en esta página con la fecha de última actualización.
                </p>
                <p className="text-gray-700">
                  Te recomendamos revisar periódicamente este aviso para estar informado sobre cómo
                  protegemos tu información.
                </p>
              </div>

              {/* Contacto */}
              <div className="mb-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Contacto</h2>
                <p className="text-gray-700 mb-4">
                  Para cualquier duda, comentario o solicitud relacionada con el tratamiento de tus
                  datos personales:
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:ortochavitos@gmail.com"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    ortochavitos@gmail.com
                  </a>
                  <br />
                  <strong>Teléfono:</strong> 777 311 2867
                  <br />
                  <strong>Dirección:</strong> Calle Cuesta Veloz 119, San Cristobal, 62230
                  Cuernavaca, Mor.
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/terminos-uso"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Términos de Uso
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/politica-cookies"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Política de Cookies
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/contacto"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

AvisoPrivacidadPage.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
