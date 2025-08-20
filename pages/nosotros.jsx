import React from 'react';
import Head from 'next/head';
import Nosotros from '../src/pages/home/Nosotros';

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
        <title>Nosotros | OrtoTech</title>
        <meta name="description" content="Conoce al equipo y la historia de OrtoTech en Cuernavaca." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </Head>
      <Nosotros />
    </>
  );
}


