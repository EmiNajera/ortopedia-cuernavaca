import React from 'react';
import Head from 'next/head';
import Blog from '../../src/pages/blog/Blog';

export default function BlogIndexPage() {
  return (
    <>
      <Head>
        <title>Blog | OrtoTech</title>
        <meta name="description" content="Artículos sobre ortopedia, plantillas, férulas y rehabilitación." />
      </Head>
      <Blog />
    </>
  );
}


