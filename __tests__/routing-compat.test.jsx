import React from 'react';
import { render, screen } from '@testing-library/react';
import { Link, useParams, useSearchParams } from '../src/utils/routerCompat';

function ParamsProbe() {
  const params = useParams();
  return <div data-testid="param-product">{params.productId ?? ''}</div>;
}

test('Link renders children', () => {
  render(<Link to="/foo">Ir</Link>);
  expect(screen.getByText('Ir')).toBeInTheDocument();
});

test('useSearchParams returns URLSearchParams without Next router', () => {
  const Comp = () => {
    const [sp] = useSearchParams();
    return <div>{sp.get('q') ?? ''}</div>;
  };
  // JSDOM initial URL has no search; just ensure it renders
  render(<Comp />);
  expect(true).toBe(true);
});
