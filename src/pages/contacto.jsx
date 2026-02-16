import React from 'react';
import Head from 'next/head';
import { getSiteUrl, getFullUrl } from '@shared/lib/utils/siteUrl';
import Contacto from './home/Contacto';
import MarketingLayout from '@layouts/MarketingLayout';

export default function ContactoPage() {
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/contacto`;
  const pageTitle = 'Contacto | Ortopedia Cuernavaca - Ubicaciones y Horarios';
  const pageDescription =
    'Contacta con Ortopedia Cuernavaca y Ortochavitos. Dos ubicaciones en Cuernavaca, Morelos. Teléfono: 777 311 2867, WhatsApp: 777 215 0982. Horarios: Lun-Vie 10:00 AM - 3:00 PM.';
  const ogImage = `${baseUrl}/images/banners/Ortopedia Cuernavaca Logo.png`;

  // JSON-LD Structured Data para LocalBusiness con múltiples ubicaciones
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Ortopedia Cuernavaca',
    alternateName: 'Ortochavitos',
    description:
      'Centro de Ortopedia y Rehabilitación Física con más de 30 años de experiencia en ortopedia, rehabilitación física, plantillas personalizadas, órtesis y prótesis en Cuernavaca, Morelos.',
    url: baseUrl,
    logo: ogImage,
    image: ogImage,
    telephone: ['+527773112867', '+527773119837'],
    email: 'ortochavitos@gmail.com',
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
    // Ubicación Principal
    location: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Cuesta Veloz 119, San Cristobal',
      addressLocality: 'Cuernavaca',
      addressRegion: 'Morelos',
      postalCode: '62230',
      addressCountry: 'MX',
    },
    // Horarios de atención
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '15:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '15:00',
      },
    ],
    // Múltiples ubicaciones usando hasMap
    hasMap: [
      'https://maps.google.com/?q=Calle+Cuesta+Veloz+119,+San+Cristobal,+62230+Cuernavaca,+Mor',
      'https://maps.google.com/?q=Av.+Domingo+Diez+203+a,+Lomas+de+la+Selva,+62270+Cuernavaca,+Mor',
    ],
    // Redes sociales
    sameAs: [
      'https://facebook.com/ortopediacuernavaca',
      'https://instagram.com/ortopediacuernavaca',
      'https://tiktok.com/@ortopediacuernavaca',
    ],
  };

  // Schema adicional para la segunda ubicación (Ortochavitos)
  const secondLocationSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Ortochavitos',
    parentOrganization: {
      '@type': 'MedicalBusiness',
      name: 'Ortopedia Cuernavaca',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Domingo Diez 203 a, Lomas de la Selva',
      addressLocality: 'Cuernavaca',
      addressRegion: 'Morelos',
      postalCode: '62270',
      addressCountry: 'MX',
    },
    telephone: '+527773119837',
    email: 'ortochavitos@gmail.com',
    medicalSpecialty: 'Pediatric Orthopedics',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '15:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '15:00',
      },
    ],
    hasMap:
      'https://maps.google.com/?q=Av.+Domingo+Diez+203+a,+Lomas+de+la+Selva,+62270+Cuernavaca,+Mor',
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
        name: 'Contacto',
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
          content="contacto ortopedia cuernavaca, ubicación ortopedia, teléfono ortopedia, whatsapp ortopedia, dirección ortopedia cuernavaca, horarios ortopedia, ortochavitos contacto, sucursales ortopedia morelos"
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(secondLocationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>
      <Contacto />
    </>
  );
}

ContactoPage.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
