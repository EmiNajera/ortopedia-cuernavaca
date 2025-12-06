import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getSiteUrl, getFullUrl } from '@shared/lib/utils/siteUrl';
import MarketingLayout from '@layouts/MarketingLayout';

export default function PoliticaCookiesPage() {
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/politica-cookies`;
  const pageTitle = 'Política de Cookies | Ortopedia Cuernavaca';
  const pageDescription =
    'Política de Cookies de Ortopedia Cuernavaca. Conoce qué son las cookies, cómo las utilizamos y cómo puedes gestionarlas en nuestro sitio web.';

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
        name: 'Política de Cookies',
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
          content="política de cookies, cookies, gestión de cookies, privacidad web, cookies del sitio, configuración de cookies"
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
          id="hero-cookies"
          aria-labelledby="hero-cookies-heading"
          className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                id="hero-cookies-heading"
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              >
                Política de Cookies
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
                Esta política explica qué son las cookies, cómo las utilizamos en nuestro sitio web
                y cómo puedes gestionarlas.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section id="contenido-cookies" className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto prose prose-lg prose-blue">
              {/* Qué son las cookies */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">1. ¿Qué son las Cookies?</h2>
                <p className="text-gray-700 mb-4">
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo
                  (computadora, tablet o móvil) cuando visitas un sitio web. Estas cookies permiten
                  que el sitio web recuerde tus acciones y preferencias durante un período de
                  tiempo, por lo que no tienes que volver a configurarlas cada vez que regresas al
                  sitio o navegas de una página a otra.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                  <p className="text-gray-700 text-sm">
                    <strong>Nota importante:</strong> Las cookies no pueden dañar tu dispositivo ni
                    contener virus. La mayoría de los navegadores aceptan cookies automáticamente,
                    pero puedes modificar la configuración de tu navegador para rechazar cookies si
                    lo prefieres.
                  </p>
                </div>
              </div>

              {/* Tipos de cookies */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  2. Tipos de Cookies que Utilizamos
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  2.1. Cookies Esenciales (Necesarias)
                </h3>
                <p className="text-gray-700 mb-4">
                  Estas cookies son necesarias para el funcionamiento del sitio web y no se pueden
                  desactivar. Incluyen cookies que permiten recordar tus acciones durante una sesión
                  o, cuando solicitas, de una sesión a la siguiente.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Ejemplos:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                    <li>Cookies de sesión para mantener tu sesión activa</li>
                    <li>Cookies de seguridad para prevenir fraudes</li>
                    <li>Cookies de preferencias de idioma</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  2.2. Cookies de Rendimiento y Análisis
                </h3>
                <p className="text-gray-700 mb-4">
                  Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro
                  sitio web, proporcionándonos información sobre las áreas visitadas, el tiempo de
                  permanencia y cualquier problema encontrado, como mensajes de error.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Ejemplos:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                    <li>Google Analytics para analizar el tráfico del sitio</li>
                    <li>Cookies de seguimiento de páginas visitadas</li>
                    <li>Cookies de tiempo de permanencia</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  2.3. Cookies de Funcionalidad
                </h3>
                <p className="text-gray-700 mb-4">
                  Estas cookies permiten que el sitio web recuerde las elecciones que haces (como tu
                  nombre de usuario, idioma o región) y proporcionan características mejoradas y más
                  personales.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Ejemplos:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                    <li>Preferencias de visualización (modo oscuro/claro)</li>
                    <li>Configuraciones de accesibilidad</li>
                    <li>Recordar información de formularios</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  2.4. Cookies de Marketing y Publicidad
                </h3>
                <p className="text-gray-700 mb-4">
                  Estas cookies se utilizan para hacer que los mensajes publicitarios sean más
                  relevantes para ti y tus intereses. También se utilizan para limitar el número de
                  veces que ves un anuncio y ayudar a medir la efectividad de las campañas
                  publicitarias.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Nota:</strong>
                  </p>
                  <p className="text-gray-700 text-sm">
                    Actualmente no utilizamos cookies de marketing o publicidad de terceros en
                    nuestro sitio web. Si esto cambia en el futuro, actualizaremos esta política.
                  </p>
                </div>
              </div>

              {/* Cookies de terceros */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Cookies de Terceros</h2>
                <p className="text-gray-700 mb-4">
                  Algunas cookies son colocadas por servicios de terceros que aparecen en nuestras
                  páginas:
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Google Maps</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Utilizamos Google Maps para mostrar nuestras ubicaciones. Google puede colocar
                    cookies para recordar tus preferencias de visualización.
                  </p>
                  <p className="text-gray-700 text-sm">
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      Política de Privacidad de Google
                    </a>
                  </p>
                </div>
              </div>

              {/* Gestión de cookies */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  4. Cómo Gestionar las Cookies
                </h2>
                <p className="text-gray-700 mb-4">
                  Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las
                  cookies que ya están en tu dispositivo y puedes configurar la mayoría de los
                  navegadores para evitar que se coloquen cookies.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  4.1. Configuración del Navegador
                </h3>
                <p className="text-gray-700 mb-4">La mayoría de los navegadores te permiten:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Ver qué cookies tienes y eliminarlas individualmente</li>
                  <li>Bloquear cookies de terceros</li>
                  <li>Bloquear cookies de sitios específicos</li>
                  <li>Bloquear todas las cookies</li>
                  <li>Eliminar todas las cookies cuando cierres el navegador</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  4.2. Enlaces de Ayuda por Navegador
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Chrome</h4>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm underline"
                    >
                      Configurar cookies en Chrome
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Firefox</h4>
                    <a
                      href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm underline"
                    >
                      Configurar cookies en Firefox
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Safari</h4>
                    <a
                      href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm underline"
                    >
                      Configurar cookies en Safari
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Edge</h4>
                    <a
                      href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm underline"
                    >
                      Configurar cookies en Edge
                    </a>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mt-6">
                  <p className="text-gray-700 text-sm">
                    <strong>Importante:</strong> Si bloqueas las cookies, algunas funcionalidades
                    del sitio web pueden no funcionar correctamente o pueden no estar disponibles.
                  </p>
                </div>
              </div>

              {/* Duración de cookies */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  5. Duración de las Cookies
                </h2>
                <p className="text-gray-700 mb-4">
                  Utilizamos dos tipos de cookies según su duración:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Cookies de Sesión</h3>
                    <p className="text-gray-700 text-sm">
                      Se eliminan automáticamente cuando cierras tu navegador. Se utilizan para
                      mantener tu sesión activa mientras navegas por el sitio.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Cookies Persistentes</h3>
                    <p className="text-gray-700 text-sm">
                      Permanecen en tu dispositivo durante un período determinado o hasta que las
                      elimines manualmente. Se utilizan para recordar tus preferencias entre
                      visitas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actualizaciones */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  6. Actualizaciones de esta Política
                </h2>
                <p className="text-gray-700 mb-4">
                  Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios
                  en las cookies que utilizamos o por otras razones operativas, legales o
                  regulatorias.
                </p>
                <p className="text-gray-700">
                  Te recomendamos revisar esta página periódicamente para estar informado sobre cómo
                  utilizamos las cookies. La fecha de última actualización se indica en la parte
                  superior de esta página.
                </p>
              </div>

              {/* Contacto */}
              <div className="mb-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Contacto</h2>
                <p className="text-gray-700 mb-4">
                  Si tienes preguntas sobre nuestra Política de Cookies, puedes contactarnos:
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
                  href="/terminos-uso"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Términos de Uso
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

PoliticaCookiesPage.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
