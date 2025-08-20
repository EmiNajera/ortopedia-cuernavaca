import React from 'react';
import Head from 'next/head';
import Citas from '../src/pages/home/Citas';

export default function CitasPage() {
  return (
    <>
      <Head>
        <title>Agenda tu cita | OrtoTech</title>
        <meta name="description" content="Agenda tu consulta clínica en OrtoTech Cuernavaca." />
      </Head>
      <Citas />
    </>
  );
}


