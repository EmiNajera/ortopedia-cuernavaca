import React from 'react';
import Rehabilitacion from '../categories/categorias/Rehabilitacion';

export default function CategoriaRehabilitacionPage() {
  return <Rehabilitacion />;
}

CategoriaRehabilitacionPage.getLayout = function getLayout(page) {
  const StoreLayout = require('../../components/layout/StoreLayout').default;
  return <StoreLayout>{page}</StoreLayout>;
};
