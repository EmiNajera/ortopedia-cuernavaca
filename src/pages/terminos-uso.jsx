import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getSiteUrl, getFullUrl } from '@shared/lib/utils/siteUrl';
import MarketingLayout from '@layouts/MarketingLayout';

export default function TerminosUsoPage() {
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/terminos-uso`;
  const pageTitle = 'Términos de Uso | Ortopedia Cuernavaca';
  const pageDescription =
    'Términos y condiciones de uso del sitio web de Ortopedia Cuernavaca. Conoce las reglas y condiciones para el uso de nuestros servicios y plataforma digital.';

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
        name: 'Términos de Uso',
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
          content="términos de uso, condiciones de uso, términos y condiciones, uso del sitio web, condiciones legales"
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
          id="hero-terminos"
          aria-labelledby="hero-terminos-heading"
          className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                id="hero-terminos-heading"
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              >
                Términos de Uso
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
                Al acceder y utilizar este sitio web, aceptas cumplir con los siguientes términos y
                condiciones de uso.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section id="contenido-terminos" className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto prose prose-lg prose-blue">
              {/* Aceptación */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  1. Aceptación de los Términos
                </h2>
                <p className="text-gray-700 mb-4">
                  Al acceder y utilizar el sitio web de Ortopedia Cuernavaca, aceptas estar sujeto a
                  estos términos y condiciones de uso. Si no estás de acuerdo con alguno de estos
                  términos, no debes utilizar nuestro sitio web.
                </p>
                <p className="text-gray-700">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Los
                  cambios entrarán en vigor inmediatamente después de su publicación en esta página.
                </p>
              </div>

              {/* Uso del sitio */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Uso del Sitio Web</h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1. Uso Permitido</h3>
                <p className="text-gray-700 mb-4">Puedes utilizar nuestro sitio web para:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Obtener información sobre nuestros servicios y productos</li>
                  <li>Agendar citas y consultas</li>
                  <li>Contactarnos para solicitar información</li>
                  <li>Acceder a recursos educativos y artículos del blog</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2. Uso Prohibido</h3>
                <p className="text-gray-700 mb-4">Está prohibido utilizar el sitio web para:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Cualquier actividad ilegal o no autorizada</li>
                  <li>Transmitir virus, malware o código malicioso</li>
                  <li>Intentar acceder a áreas restringidas del sitio</li>
                  <li>Copiar, modificar o distribuir el contenido sin autorización</li>
                  <li>Realizar actividades que puedan dañar o sobrecargar nuestros servidores</li>
                  <li>Suplantar la identidad de otra persona o entidad</li>
                </ul>
              </div>

              {/* Propiedad intelectual */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Propiedad Intelectual</h2>
                <p className="text-gray-700 mb-4">
                  Todo el contenido de este sitio web, incluyendo pero no limitado a textos,
                  imágenes, logotipos, gráficos, iconos y software, es propiedad de Ortopedia
                  Cuernavaca o de sus licenciantes y está protegido por las leyes de propiedad
                  intelectual de México e internacionales.
                </p>
                <p className="text-gray-700 mb-4">
                  No puedes reproducir, distribuir, modificar, crear obras derivadas, mostrar
                  públicamente o utilizar comercialmente ningún contenido de este sitio sin nuestro
                  consentimiento previo por escrito.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 text-sm">
                    <strong>Excepción:</strong> Puedes compartir enlaces a nuestras páginas en redes
                    sociales y utilizar nuestros recursos educativos para uso personal y no
                    comercial.
                  </p>
                </div>
              </div>

              {/* Información médica */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  4. Información Médica y Contenido
                </h2>
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
                  <p className="text-gray-700 font-semibold mb-2">⚠️ Advertencia Importante</p>
                  <p className="text-gray-700 text-sm">
                    La información proporcionada en este sitio web es solo para fines informativos y
                    educativos. No constituye asesoramiento médico profesional, diagnóstico o
                    tratamiento.
                  </p>
                </div>
                <p className="text-gray-700 mb-4">
                  Siempre consulta con un profesional de la salud calificado antes de tomar
                  decisiones médicas o comenzar cualquier tratamiento. No debes ignorar el consejo
                  médico profesional ni demorar en buscarlo debido a algo que hayas leído en este
                  sitio web.
                </p>
                <p className="text-gray-700">
                  Ortopedia Cuernavaca no se hace responsable de las decisiones médicas tomadas
                  basándose únicamente en la información de este sitio web.
                </p>
              </div>

              {/* Enlaces externos */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  5. Enlaces a Sitios de Terceros
                </h2>
                <p className="text-gray-700 mb-4">
                  Nuestro sitio web puede contener enlaces a sitios web de terceros. Estos enlaces
                  se proporcionan únicamente para tu conveniencia.
                </p>
                <p className="text-gray-700">
                  No tenemos control sobre el contenido de estos sitios externos y no asumimos
                  responsabilidad por su contenido, políticas de privacidad o prácticas. Te
                  recomendamos revisar los términos y políticas de privacidad de cualquier sitio de
                  terceros que visites.
                </p>
              </div>

              {/* Limitación de responsabilidad */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  6. Limitación de Responsabilidad
                </h2>
                <p className="text-gray-700 mb-4">
                  En la máxima medida permitida por la ley, Ortopedia Cuernavaca no será responsable
                  de:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    Daños directos, indirectos, incidentales o consecuentes derivados del uso o la
                    imposibilidad de usar nuestro sitio web
                  </li>
                  <li>Interrupciones del servicio, errores técnicos o fallos del sistema</li>
                  <li>Pérdida de datos o información</li>
                  <li>Decisiones tomadas basándose en la información del sitio web</li>
                  <li>Acciones de terceros o contenido de sitios externos</li>
                </ul>
              </div>

              {/* Indemnización */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Indemnización</h2>
                <p className="text-gray-700 mb-4">
                  Aceptas indemnizar, defender y eximir de responsabilidad a Ortopedia Cuernavaca,
                  sus empleados, directores y agentes de cualquier reclamo, daño, obligación,
                  pérdida, responsabilidad, costo o deuda, y gastos (incluyendo honorarios de
                  abogados) que surjan de:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Tu uso o mal uso del sitio web</li>
                  <li>Tu violación de estos términos de uso</li>
                  <li>Tu violación de cualquier derecho de terceros</li>
                  <li>Cualquier contenido que publiques o transmitas a través del sitio</li>
                </ul>
              </div>

              {/* Modificaciones */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  8. Modificaciones del Servicio
                </h2>
                <p className="text-gray-700 mb-4">
                  Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto
                  del sitio web en cualquier momento, con o sin previo aviso.
                </p>
                <p className="text-gray-700">
                  No seremos responsables ante ti ni ante ningún tercero por cualquier modificación,
                  suspensión o discontinuación del sitio web o de cualquier servicio.
                </p>
              </div>

              {/* Ley aplicable */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  9. Ley Aplicable y Jurisdicción
                </h2>
                <p className="text-gray-700 mb-4">
                  Estos términos de uso se rigen por las leyes de los Estados Unidos Mexicanos y
                  específicamente por las leyes del Estado de Morelos.
                </p>
                <p className="text-gray-700">
                  Cualquier disputa que surja de o esté relacionada con estos términos será sometida
                  a la jurisdicción exclusiva de los tribunales de Cuernavaca, Morelos.
                </p>
              </div>

              {/* Contacto */}
              <div className="mb-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Contacto</h2>
                <p className="text-gray-700 mb-4">
                  Si tienes preguntas sobre estos términos de uso, puedes contactarnos:
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
                  href="/aviso-privacidad"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Aviso de Privacidad
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

TerminosUsoPage.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
