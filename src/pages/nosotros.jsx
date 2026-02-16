import React from 'react';
import Head from 'next/head';
import { getSiteUrl, getFullUrl } from '@shared/lib/utils/siteUrl';
import Nosotros from './home/Nosotros';
import MarketingLayout from '@layouts/MarketingLayout';

export default function NosotrosPage() {
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/nosotros`;
  const pageTitle = 'Nosotros | Ortopedia Cuernavaca - 30 Años Transformando Vidas';
  const pageDescription =
    'Conoce la historia de Ortopedia Cuernavaca: más de 30 años de experiencia en ortopedia y rehabilitación física. Centro de Ortopedia y Rehabilitación Física con equipo multidisciplinario especializado en Cuernavaca, Morelos.';
  const ogImage = `${baseUrl}/images/banners/Ortopedia Cuernavaca Logo.png`;

  // JSON-LD Structured Data para organización médica
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Ortopedia Cuernavaca',
    alternateName: 'Ortochavitos',
    description:
      'Centro de Ortopedia y Rehabilitación Física con más de 30 años de experiencia en ortopedia, rehabilitación física, plantillas personalizadas, órtesis y prótesis en Cuernavaca, Morelos.',
    url: baseUrl,
    logo: `${baseUrl}/images/banners/Ortopedia Cuernavaca Logo.png`,
    image: ogImage,
    foundingDate: '1995',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Cuesta Veloz 119, San Cristobal',
        addressLocality: 'Cuernavaca',
        addressRegion: 'Morelos',
        postalCode: '62230',
        addressCountry: 'MX',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Domingo Diez 203 a, Lomas de la Selva',
        addressLocality: 'Cuernavaca',
        addressRegion: 'Morelos',
        postalCode: '62270',
        addressCountry: 'MX',
      },
    ],
    telephone: ['+527773112867', '+527773119837'],
    priceRange: '$$',
    medicalSpecialty: [
      'Orthopedics',
      'Physical Therapy',
      'Prosthetics',
      'Orthotics',
      'Rehabilitation Medicine',
      'Pediatric Orthopedics',
    ],
    areaServed: {
      '@type': 'City',
      name: 'Cuernavaca',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '5000',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '15',
    },
    foundingLocation: {
      '@type': 'Place',
      name: 'Cuernavaca, Morelos',
    },
  };

  // AboutPage Schema
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    mainEntity: {
      '@type': 'MedicalBusiness',
      '@id': `${baseUrl}#organization`,
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
        name: 'Nosotros',
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
          content="ortopedia cuernavaca, historia ortopedia, equipo ortopedia, profesionales rehabilitación, centro rehabilitación física, ortopedia morelos, especialistas ortopédicos, 30 años experiencia, ortochavitos, rehabilitación integral"
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>
      <Nosotros />
    </>
  );
}

// Ensure the page uses the MarketingLayout (prevents using a different default layout)
NosotrosPage.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
