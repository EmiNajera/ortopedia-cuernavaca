import React from 'react';
import CategoriaPage from '../categories/CategoriaPage';

export default function CategoriaSlugPage() {
  return <CategoriaPage />;
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}


