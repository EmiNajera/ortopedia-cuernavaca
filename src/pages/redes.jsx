import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MarketingLayout from '@layouts/MarketingLayout';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';
import { getSiteUrl, getFullUrl } from '@shared/lib/utils/siteUrl';
import SEO from '@shared/components/SEO';

// Iconos SVG para redes sociales
const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.78 0c0-1.59 1.3-2.89 2.89-2.89.36 0 .71.07 1.03.2V8.66a6.84 6.84 0 0 0-1.03-.05A5.89 5.89 0 0 0 5.89 14.55a5.89 5.89 0 0 0 11.78 0V9.05a8.18 8.18 0 0 0 4.77 1.44v-3.8a4.85 4.85 0 0 1-2.85 0z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export default function RedesPage() {
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/redes`;

  // Enlaces de redes sociales y otros recursos
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/OrtopediaCuernavaca1',
      icon: <FacebookIcon />,
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-700 hover:to-blue-800',
      description: 'Síguenos en Facebook',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ortopediacuernavaca/',
      icon: <InstagramIcon />,
      color: 'from-pink-500 via-purple-500 to-pink-600',
      hoverColor: 'hover:from-pink-600 hover:via-purple-600 hover:to-pink-700',
      description: 'Síguenos en Instagram',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@ortopediacuernavaca',
      icon: <TikTokIcon />,
      color: 'from-gray-900 to-black',
      hoverColor: 'hover:from-black hover:to-gray-900',
      description: 'Síguenos en TikTok',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/ortopediacuernavaca/',
      icon: <LinkedInIcon />,
      color: 'from-blue-700 to-blue-800',
      hoverColor: 'hover:from-blue-800 hover:to-blue-900',
      description: 'Conéctate en LinkedIn',
    },
  ];

  // Enlaces adicionales útiles
  const additionalLinks = [
    {
      name: 'WhatsApp',
      action: () => openWhatsApp(),
      icon: <WhatsAppIcon />,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      description: 'Chatea con nosotros',
    },
    {
      name: 'Nuestros Servicios',
      href: '/servicios',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'hover:from-blue-600 hover:to-cyan-600',
      description: 'Conoce nuestros servicios',
    },
    {
      name: 'Ubicación',
      href: '/contacto#ubicaciones',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      color: 'from-indigo-500 to-purple-600',
      hoverColor: 'hover:from-indigo-600 hover:to-purple-700',
      description: 'Encuentra nuestras sucursales',
    },
    {
      name: 'Blog',
      href: '/blog',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
      color: 'from-teal-500 to-green-500',
      hoverColor: 'hover:from-teal-600 hover:to-green-600',
      description: 'Lee nuestros artículos',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <>
      <SEO
        title="Redes Sociales | Ortopedia Cuernavaca"
        description="Conecta con Ortopedia Cuernavaca en todas nuestras redes sociales. Síguenos en Facebook, Instagram, TikTok y LinkedIn. Agenda tu cita por WhatsApp."
        image="/images/banners/Ortopedia Cuernavaca Logo.png"
      />

      <Head>
        <link rel="canonical" href={pageUrl} />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header con Logo y Título */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
                <Image
                  src="/images/banners/Ortopedia Cuernavaca Logo.svg"
                  alt="Ortopedia Cuernavaca"
                  fill
                  className="object-contain p-4 bg-white"
                  priority
                />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Ortopedia Cuernavaca
            </h1>
            <p className="text-lg text-gray-600 mb-1">
              Centro de Ortopedia y Rehabilitación Física
            </p>
            <p className="text-sm text-gray-500">Conecta con nosotros en nuestras redes sociales</p>
          </motion.div>

          {/* Redes Sociales */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Síguenos</h2>
            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  variants={itemVariants}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${link.color} ${link.hoverColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm">
                      {link.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{link.name}</div>
                      <div className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                        {link.description}
                      </div>
                    </div>
                  </div>
                  <LinkIcon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Enlaces Adicionales */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Enlaces Útiles</h2>
            <div className="space-y-3">
              {additionalLinks.map((link, index) => {
                const content = (
                  <motion.div
                    variants={itemVariants}
                    className={`group relative flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${link.color} ${link.hoverColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm">
                        {link.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{link.name}</div>
                        <div className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                          {link.description}
                        </div>
                      </div>
                    </div>
                    <LinkIcon />
                  </motion.div>
                );

                if (link.action) {
                  return (
                    <div key={link.name} onClick={link.action}>
                      {content}
                    </div>
                  );
                }

                return (
                  <Link key={link.name} href={link.href} className="block">
                    {content}
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-2">
              © {new Date().getFullYear()} Ortopedia Cuernavaca
            </p>
            <Link
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Volver al inicio
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}

RedesPage.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
