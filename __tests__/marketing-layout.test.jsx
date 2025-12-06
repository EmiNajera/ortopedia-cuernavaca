import React from 'react';
import { render, screen } from '@testing-library/react';
import MarketingLayout from '../src/components/layout/MarketingLayout';

describe('MarketingLayout', () => {
  test('renders children content', () => {
    render(
      <MarketingLayout>
        <div>Test Content</div>
      </MarketingLayout>,
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(
      <MarketingLayout>
        <div>Test</div>
      </MarketingLayout>,
    );
    // Footer should be present (it's part of MarketingLayout)
    expect(screen.getByText(/Ortopedia Cuernavaca/i)).toBeInTheDocument();
  });
});
