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

CategoriaSlugPage.getLayout = function getLayout(page) {
  const StoreLayout = require('../../components/layout/StoreLayout').default;
  return <StoreLayout>{page}</StoreLayout>;
};
