import React from 'react';
import Head from 'next/head';
import Contacto from '../src/pages/home/Contacto';

export default function ContactoPage() {
  return (
    <>
      <Head>
        <title>Contacto | OrtoTech</title>
        <meta name="description" content="Ponte en contacto con OrtoTech en Cuernavaca." />
      </Head>
      <Contacto />
    </>
  );
}


