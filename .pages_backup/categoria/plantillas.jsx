import React from 'react';
import Head from 'next/head';
import Plantillas from '../../src/pages/categories/categorias/Plantillas';

export default function CategoriaPlantillasPage() {
  return (
    <>
      <Head>
        <title>Plantillas Ortopédicas Personalizadas | Ortopedia Cuernavaca</title>
        <meta name="description" content="Plantillas ortopédicas personalizadas en Cuernavaca. Análisis biomecánico, plantillas para pie plano, cavo, pronación y supinación. Mejora tu caminar." />
        <meta name="keywords" content="plantillas ortopédicas, plantillas personalizadas, pie plano, pie cavo, pronación, supinación, Cuernavaca, análisis biomecánico" />
        <meta property="og:title" content="Plantillas Ortopédicas Personalizadas | Ortopedia Cuernavaca" />
        <meta property="og:description" content="Plantillas ortopédicas personalizadas en Cuernavaca. Análisis biomecánico profesional." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ortopedia-cuernavaca.com/categoria/plantillas" />
        <meta property="og:image" content="/images/banners/Ortopedia Cuernavaca Logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Plantillas Ortopédicas Personalizadas" />
        <meta name="twitter:description" content="Plantillas ortopédicas personalizadas en Cuernavaca" />
        <meta name="twitter:image" content="/images/banners/Ortopedia Cuernavaca Logo.png" />
      </Head>
      <Plantillas />
    </>
  );
}


