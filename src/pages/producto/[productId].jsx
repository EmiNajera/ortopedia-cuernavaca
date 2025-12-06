import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProductDetail from '@domains/store/components/ProductDetail';
import StoreLayout from '@layouts/StoreLayout';

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
      <ProductDetail />
    </>
  );
}

// Aplicar StoreLayout en lugar de MarketingLayout
ProductoPage.getLayout = function getLayout(page) {
  return <StoreLayout>{page}</StoreLayout>;
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}
