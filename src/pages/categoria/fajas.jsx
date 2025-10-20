import React from 'react';
import Fajas from '../../pages/categories/categorias/Fajas';

export default function CategoriaFajasPage() {
  return <Fajas />;
}

CategoriaFajasPage.getLayout = function getLayout(page) {
  const StoreLayout = require('../../components/layout/StoreLayout').default;
  return <StoreLayout>{page}</StoreLayout>;
};
