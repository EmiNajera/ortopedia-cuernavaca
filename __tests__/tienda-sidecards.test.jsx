import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock next/router to avoid needing a real Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({ query: {} }),
}));

import TiendaCompleta from '../src/pages/store/TiendaCompleta';

describe('TiendaCompleta side cards sizing', () => {
  test('side cards next to hero are aligned with carousel (190px height)', () => {
    render(<TiendaCompleta />);

    const moldeImg = screen.getByAltText('Toma de Molde');
    const ortesistaImg = screen.getByAltText('Consulta con Ortesista');

    const moldeCard = moldeImg.parentElement; // img is direct child of the card
    const ortesistaCard = ortesistaImg.parentElement;

    // Ensure we targeted the card containers that carry the inline height style
    expect(moldeCard).toBeTruthy();
    expect(ortesistaCard).toBeTruthy();

    // Height must be aligned with carousel
    expect(moldeCard.style.height).toBe('190px');
    expect(ortesistaCard.style.height).toBe('190px');
  });
});
