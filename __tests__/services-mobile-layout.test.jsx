import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// Importamos el componente de página para aprovechar el mapeo de paths de Jest/Next
import ServiciosPage from '../src/pages/servicios.jsx';

describe('Servicios page – sección "Servicios Especializados" en móvil', () => {
  test('las pestañas de Servicios Especializados son scrollables horizontalmente en móvil', () => {
    render(<ServiciosPage />);

    const tabsRow = screen.getByTestId('services-tabs-row');

    expect(tabsRow.className).toMatch(/overflow-x-auto/);
    expect(tabsRow.className).toMatch(/whitespace-nowrap/);
  });

  test('las flechas de navegación lateral se ocultan en móvil', () => {
    render(<ServiciosPage />);

    const prevButton = screen.getByLabelText('Pestaña anterior');
    const nextButton = screen.getByLabelText('Pestaña siguiente');

    expect(prevButton.className).toMatch(/hidden md:flex|hidden md:block/);
    expect(nextButton.className).toMatch(/hidden md:flex|hidden md:block/);
  });
});
