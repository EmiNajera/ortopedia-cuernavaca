import React from 'react';
import Head from 'next/head';
import Nosotros from './home/Nosotros';

export default function NosotrosPage() {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'OrtoTech Ortopedia',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cuernavaca',
      addressRegion: 'Mor',
      addressCountry: 'MX',
    },
    url: 'https://www.ortotech.mx',
  };
  return (
    <>
      <Head>
        <title>Nosotros | Ortopedia Cuernavaca - Equipo Profesional</title>
        <meta name="description" content="Conoce nuestro equipo de profesionales especializados en ortopedia y rehabilitación en Cuernavaca. Más de 10 años de experiencia ayudando a nuestros pacientes." />
        <meta name="keywords" content="equipo ortopedia, profesionales rehabilitación, historia ortopedia Cuernavaca, especialistas ortopédicos" />
        <meta property="og:title" content="Nosotros | Ortopedia Cuernavaca" />
        <meta property="og:description" content="Conoce nuestro equipo de profesionales especializados en ortopedia y rehabilitación" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ortopedia-cuernavaca.com/nosotros" />
        <meta property="og:image" content="/images/banners/Ortopedia Cuernavaca Logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nosotros | Ortopedia Cuernavaca" />
        <meta name="twitter:description" content="Conoce nuestro equipo de profesionales especializados en ortopedia y rehabilitación" />
        <meta name="twitter:image" content="/images/banners/Ortopedia Cuernavaca Logo.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </Head>
      <Nosotros />
    </>
  );
}


