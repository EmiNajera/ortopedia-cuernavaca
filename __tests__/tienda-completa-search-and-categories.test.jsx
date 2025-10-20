import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import TiendaCompleta from '../src/pages/store/TiendaCompleta';

jest.mock('next/router', () => ({
  useRouter: () => ({ query: {} }),
}));

describe('TiendaCompleta - Search and Category Links', () => {
  test('filters products by search term from top search input', () => {
    render(<TiendaCompleta />);

    const input = screen.getByPlaceholderText('Buscar productos, servicios o especialidades...');
    fireEvent.change(input, { target: { value: 'Zapato' } });

    // Should show at least one product with Zapato in description
    expect(screen.getAllByText(/Zapato/i).length).toBeGreaterThan(0);
  });

  test('category grid links point to /categoria/[slug]', () => {
    render(<TiendaCompleta />);

    const gridHeading = screen.getByRole('heading', { name: /Explorar por Categorías/i });
    const gridSection = gridHeading.closest('section') || gridHeading.parentElement?.parentElement;

    const categorias = [
      { name: 'Plantillas', slug: 'plantillas' },
      { name: 'Fajas', slug: 'fajas' },
      { name: 'Soportes', slug: 'ortesis' },
      { name: 'Calzado', slug: 'calzado' },
      { name: 'Movilidad', slug: 'rehabilitacion' },
      { name: 'Pediatría', slug: 'pediatria' },
    ];

    categorias.forEach(({ name, slug }) => {
      const link = within(gridSection).getByRole('link', { name: new RegExp(name, 'i') });
      expect(link).toHaveAttribute('href', `/categoria/${slug}`);
    });
  });

  test('nav category links use /tienda?categoria=...', () => {
    render(<TiendaCompleta />);
    expect(screen.getByRole('link', { name: 'Plantillas' })).toHaveAttribute(
      'href',
      '/tienda?categoria=plantillas',
    );
    expect(screen.getByRole('link', { name: 'Calzado' })).toHaveAttribute(
      'href',
      '/tienda?categoria=calzado',
    );
    expect(screen.getByRole('link', { name: 'Movilidad' })).toHaveAttribute(
      'href',
      '/tienda?categoria=rehabilitacion',
    );
  });
});
