import React from 'react';
import SEO from '@shared/components/SEO';
import TiendaCompleta from '@domains/store/components/TiendaCompleta';
import StoreLayout from '@layouts/StoreLayout';
import { getCategories } from '@shared/lib/db';

export default function TiendaPage({ categories = [] }) {
  return (
    <>
      <SEO
        title="Tienda Ortopédica"
        description="Encuentra productos ortopédicos de calidad en Ortopedia Cuernavaca. Plantillas personalizadas, calzado ortopédico, fajas, soportes y más."
        url="/tienda"
      />
      <TiendaCompleta categories={categories} />
    </>
  );
}

TiendaPage.getLayout = function getLayout(page) {
  return <StoreLayout>{page}</StoreLayout>;
};

// Obtener categorías desde la base de datos
export async function getServerSideProps() {
  try {
    const categories = await getCategories();
    return {
      props: {
        categories: categories || [],
      },
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      props: {
        categories: [],
      },
    };
  }
}
