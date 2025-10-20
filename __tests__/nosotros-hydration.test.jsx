import React from 'react';
import { render } from '@testing-library/react';
import Nosotros from '../src/pages/home/Nosotros';

// Mock the Layout component
jest.mock('../src/components/layout/MarketingLayout', () => {
  return function MockMarketingLayout({ children }) {
    return <div data-testid="marketing-layout">{children}</div>;
  };
});

describe('Nosotros Component Hydration', () => {
  test('should render without hydration errors', () => {
    // This test will help us verify that the component renders correctly
    // after we fix the nested anchor tag issue
    const { container } = render(<Nosotros />);

    // Check that the component renders without throwing errors
    expect(container).toBeInTheDocument();

    // Check that there are no nested anchor tags
    const links = container.querySelectorAll('a');
    links.forEach((link) => {
      const nestedLinks = link.querySelectorAll('a');
      expect(nestedLinks.length).toBe(0);
    });
  });

  test('should have proper Link structure', () => {
    const { container } = render(<Nosotros />);

    // Check that Link components are properly structured
    const linkElements = container.querySelectorAll('[href]');
    linkElements.forEach((link) => {
      // Each link should not contain another link element
      const childLinks = link.querySelectorAll('[href]');
      expect(childLinks.length).toBe(0);
    });
  });
});
