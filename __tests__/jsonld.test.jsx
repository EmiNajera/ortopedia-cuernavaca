import React from 'react';
import { render } from '@testing-library/react';
import NosotrosPage from '../pages/nosotros.jsx';

test('Nosotros page includes JSON-LD script', () => {
  render(<NosotrosPage />);
  const jsonLd = Array.from(document.head.querySelectorAll('script[type="application/ld+json"]'));
  expect(jsonLd.length).toBeGreaterThan(0);
});
