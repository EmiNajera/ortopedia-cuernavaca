import React from 'react';
import CategoriaPage from '../../src/pages/categories/CategoriaPage';

export default function CategoriaSlugPage() {
  return <CategoriaPage />;
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}


