import React from 'react';
import Ortesis from '../categories/categorias/Ortesis';

export default function CategoriaOrtesisPage() {
  return <Ortesis />;
}

CategoriaOrtesisPage.getLayout = function getLayout(page) {
  const StoreLayout = require('../../components/layout/StoreLayout').default;
  return <StoreLayout>{page}</StoreLayout>;
};
