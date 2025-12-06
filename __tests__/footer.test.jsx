import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../src/components/layout/Footer';

describe('Footer', () => {
  test('renders company name', () => {
    render(<Footer />);
    expect(screen.getByText(/Ortopedia Cuernavaca/i)).toBeInTheDocument();
  });

  test('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText(/777 311 2867/i)).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Footer />);
    const inicioLink = screen.getByRole('link', { name: /inicio/i });
    expect(inicioLink).toBeInTheDocument();
  });
});
