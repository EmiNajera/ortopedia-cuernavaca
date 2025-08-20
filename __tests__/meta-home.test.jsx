import React from 'react';
import { render } from '@testing-library/react';
import IndexPage from '../pages/index.jsx';

test('Home page sets meta description and title via Head', () => {
  render(<IndexPage />);
  const meta = document.head.querySelector('meta[name="description"]');
  expect(meta).toBeTruthy();
  expect(meta.getAttribute('content')).toMatch(/OrtoTech/i);
});


