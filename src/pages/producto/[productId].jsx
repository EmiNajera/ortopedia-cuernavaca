import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Producto from '../store/Producto';

export default function ProductoPage() {
  const router = useRouter();
  const { productId } = router.query || {};
  const title = productId ? `Producto ${productId} | OrtoTech` : 'Producto | OrtoTech';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Descubre los productos ortopédicos de OrtoTech." />
      </Head>
      <Producto />
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
