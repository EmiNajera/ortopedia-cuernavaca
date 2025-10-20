import React from 'react';
import Pediatria from '../categories/categorias/Pediatria';

export default function CategoriaPediatriaPage() {
  return <Pediatria />;
}

CategoriaPediatriaPage.getLayout = function getLayout(page) {
  const StoreLayout = require('../../components/layout/StoreLayout').default;
  return <StoreLayout>{page}</StoreLayout>;
};
