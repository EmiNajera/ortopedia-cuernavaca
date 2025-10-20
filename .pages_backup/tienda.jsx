import React from 'react';
import Head from 'next/head';
import TiendaCompleta from '../src/pages/store/TiendaCompleta';

export default function TiendaPage() {
  return (
    <>
      <Head>
        <title>Tienda - Ortopedia Cuernavaca</title>
        <meta
          name="description"
          content="Tienda especializada en productos ortopédicos, plantillas, fajas, ortesis y calzado ortopédico en Cuernavaca. Ortochavitos para niños."
        />
        <meta
          name="keywords"
          content="ortopedia, tienda, plantillas, fajas, ortesis, calzado ortopédico, Cuernavaca, Ortochavitos"
        />
        <meta property="og:title" content="Tienda - Ortopedia Cuernavaca" />
        <meta
          property="og:description"
          content="Tienda especializada en productos ortopédicos en Cuernavaca"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ortopediacuernavaca.com/tienda" />
        <meta property="og:image" content="/images/banners/LogoOrtochavitos.svg" />

        {/* Favicon exclusivo para la tienda */}
        <link rel="icon" type="image/svg+xml" href="/images/banners/LogoOrtochavitos.svg" />
        <link
          rel="shortcut icon"
          type="image/svg+xml"
          href="/images/banners/LogoOrtochavitos.svg"
        />
        <link rel="apple-touch-icon" href="/images/banners/LogoOrtochavitos.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/banners/LogoOrtochavitos.svg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/banners/LogoOrtochavitos.svg"
        />

        {/* Manifest para PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'Ortopedia Cuernavaca - Tienda',
              description: 'Tienda especializada en productos ortopédicos en Cuernavaca',
              url: 'https://ortopediacuernavaca.com/tienda',
              logo: 'https://ortopediacuernavaca.com/images/banners/LogoOrtochavitos.svg',
              image: 'https://ortopediacuernavaca.com/images/banners/LogoOrtochavitos.svg',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cuernavaca',
                addressRegion: 'Morelos',
                addressCountry: 'MX',
              },
              telephone: '+52-777-311-2867',
              priceRange: '$$',
              currenciesAccepted: 'MXN',
              paymentAccepted: 'Cash, Credit Card, Bank Transfer',
              openingHours: 'Mo-Fr 09:00-18:00, Sa 09:00-14:00',
            }),
          }}
        />
      </Head>
      <TiendaCompleta />
    </>
  );
}
