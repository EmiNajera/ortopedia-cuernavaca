import React from 'react';
import Head from 'next/head';
import Servicios from '../features/services/Servicios';
import MarketingLayout from '../components/layout/MarketingLayout';

export default function ServiciosPage() {
  return (
    <>
      <Head>
        <title>Servicios de Ortopedia y Rehabilitación | Ortopedia Cuernavaca</title>
        <meta
          name="description"
          content="Servicios especializados de ortopedia, rehabilitación física, plantillas personalizadas y productos ortopédicos en Cuernavaca. Atención profesional y personalizada."
        />
        <meta
          name="keywords"
          content="servicios ortopedia, rehabilitación física, plantillas personalizadas, ortesis, prótesis, fisioterapia, Cuernavaca"
        />
        <meta
          property="og:title"
          content="Servicios de Ortopedia y Rehabilitación | Ortopedia Cuernavaca"
        />
        <meta
          property="og:description"
          content="Servicios especializados de ortopedia y rehabilitación física en Cuernavaca"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ortopedia-cuernavaca.com/servicios" />
        <meta property="og:image" content="/images/banners/Ortopedia Cuernavaca Logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Servicios de Ortopedia y Rehabilitación" />
        <meta
          name="twitter:description"
          content="Servicios especializados de ortopedia y rehabilitación física en Cuernavaca"
        />
        <meta name="twitter:image" content="/images/banners/Ortopedia Cuernavaca Logo.png" />
      </Head>
      <Servicios />
    </>
  );
}

ServiciosPage.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
