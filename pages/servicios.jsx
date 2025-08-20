import React from 'react';
import Head from 'next/head';
import Servicios from '../src/pages/services/Servicios';

export default function ServiciosPage() {
  return (
    <>
      <Head>
        <title>Servicios | OrtoTech</title>
        <meta name="description" content="Servicios de ortopedia, rehabilitación y productos especializados en OrtoTech." />
      </Head>
      <Servicios />
    </>
  );
}


