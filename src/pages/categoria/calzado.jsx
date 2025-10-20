import React from 'react';
import Calzado from '../../pages/categories/categorias/Calzado';

export default function CategoriaCalzadoPage() {
  return <Calzado />;
}
CategoriaCalzadoPage.getLayout = function getLayout(page) {
  const StoreLayout = require('../../components/layout/StoreLayout').default;
  return <StoreLayout>{page}</StoreLayout>;
};
