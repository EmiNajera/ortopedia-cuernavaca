import React from 'react';
import Head from 'next/head';
import { getSiteUrl, getFullUrl } from '@shared/lib/utils/siteUrl';
import Servicios from '@domains/services/components/Servicios';
import MarketingLayout from '@layouts/MarketingLayout';

export default function ServiciosPage() {
  const baseUrl = 'https://ortopedia-cuernavaca.com';
  const pageUrl = `${baseUrl}/servicios`;
  const pageTitle = 'Servicios de Ortopedia y Rehabilitación | Ortopedia Cuernavaca';
  const pageDescription =
    'Servicios especializados de ortopedia, rehabilitación física, plantillas personalizadas, ortesis, prótesis y fisioterapia en Cuernavaca. Más de 30 años de experiencia ayudando a pacientes a recuperar su movilidad.';
  const ogImage = `${baseUrl}/images/banners/Ortopedia Cuernavaca Logo.png`;

  // JSON-LD Structured Data para servicios médicos
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Ortopedia Cuernavaca',
    description: pageDescription,
    url: baseUrl,
    image: ogImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Cuesta Veloz 119, San Cristobal',
      addressLocality: 'Cuernavaca',
      addressRegion: 'Morelos',
      postalCode: '62230',
      addressCountry: 'MX',
    },
    telephone: '+527773112867',
    priceRange: '$$',
    medicalSpecialty: [
      'Orthopedics',
      'Physical Therapy',
      'Prosthetics',
      'Orthotics',
      'Rehabilitation Medicine',
    ],
    areaServed: {
      '@type': 'City',
      name: 'Cuernavaca',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Ortopedia',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Plantillas Ortopédicas Personalizadas',
            description:
              'Diseño y fabricación de plantillas personalizadas para cada paciente con tecnología avanzada',
            provider: {
              '@type': 'MedicalBusiness',
              name: 'Ortopedia Cuernavaca',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Órtesis y Prótesis',
            description:
              'Fabricación y adaptación de órtesis y prótesis personalizadas con materiales de última generación',
            provider: {
              '@type': 'MedicalBusiness',
              name: 'Ortopedia Cuernavaca',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Rehabilitación Física',
            description:
              'Programas de rehabilitación física especializados para recuperación de lesiones y mejora de movilidad',
            provider: {
              '@type': 'MedicalBusiness',
              name: 'Ortopedia Cuernavaca',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fisioterapia',
            description:
              'Servicios de fisioterapia con técnicas avanzadas y equipos especializados para tratamiento de lesiones',
            provider: {
              '@type': 'MedicalBusiness',
              name: 'Ortopedia Cuernavaca',
            },
          },
        },
      ],
    },
  };

  // Breadcrumb Schema
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
        name: 'Servicios',
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
          content="servicios ortopedia, rehabilitación física, plantillas personalizadas, ortesis, prótesis, fisioterapia, Cuernavaca, Morelos, ortopedia pediátrica, rehabilitación deportiva, dolor crónico"
        />
        <meta name="author" content="Ortopedia Cuernavaca" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Ortopedia Cuernavaca" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>
      <Servicios />
    </>
  );
}

ServiciosPage.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
