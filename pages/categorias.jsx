import React from 'react';
import Head from 'next/head';
import Categorias from '../src/pages/categories/Categorias';

export default function CategoriasPage() {
  return (
    <>
      <Head>
        <title>Categorías | OrtoTech</title>
        <meta name="description" content="Explora las categorías de productos ortopédicos en OrtoTech." />
      </Head>
      <Categorias />
    </>
  );
}


