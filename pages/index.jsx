import React from 'react';
import Head from 'next/head';
import Home from '../src/pages/home/Home';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Ortopedia Cuernavaca | Rehabilitación física y ortopedia</title>
        <meta name="description" content="Ortopedia Cuernavaca: Soluciones integrales en rehabilitación física y ortopedia. Te acompañamos desde el diagnóstico hasta la recuperación." />
        <meta property="og:title" content="Ortopedia Cuernavaca" />
        <meta property="og:description" content="Soluciones integrales en rehabilitación física y ortopedia en Cuernavaca." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ortopedia-cuernavaca.com" />
        <meta property="og:image" content="/images/banners/Ortopedia Cuernavaca Logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ortopedia Cuernavaca" />
        <meta name="twitter:description" content="Soluciones integrales en rehabilitación física y ortopedia en Cuernavaca." />
        <meta name="twitter:image" content="/images/banners/Ortopedia Cuernavaca Logo.png" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Ortopedia Cuernavaca",
              "description": "Soluciones integrales en rehabilitación física y ortopedia",
              "url": "https://ortopedia-cuernavaca.com",
              "logo": "https://ortopedia-cuernavaca.com/images/banners/Ortopedia Cuernavaca Logo.png",
              "image": "https://ortopedia-cuernavaca.com/images/banners/Ortopedia Cuernavaca Logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Cuernavaca",
                "addressRegion": "Morelos",
                "addressCountry": "MX"
              },
              "telephone": "+52-777-123-4567",
              "email": "contacto@ortopedia-cuernavaca.com",
              "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-14:00",
              "priceRange": "$$",
              "medicalSpecialty": ["Orthopedics", "Physical Therapy", "Rehabilitation"],
              "serviceType": [
                "Plantillas ortopédicas",
                "Fajas y soporte lumbar", 
                "Rodilleras y ortesis",
                "Calzado ortopédico",
                "Rehabilitación y fisioterapia",
                "Ortopedia pediátrica"
              ]
            })
          }}
        />
      </Head>
      <Home />
    </>
  );
}


