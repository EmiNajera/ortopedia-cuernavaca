import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import MarketingHeader from '../src/components/layout/MarketingHeader';
import StoreHeader from '../src/components/layout/StoreHeader';

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    AnimatePresence: ({ children }) => React.createElement('div', null, children),
    motion: {
      div: ({ children, ...props }) => React.createElement('div', props, children),
    },
  };
});

// Mock whatsapp utility
jest.mock('../src/utils/whatsapp', () => ({
  openWhatsApp: jest.fn(),
}));

jest.mock('../src/lib/utils/whatsapp', () => ({
  openWhatsApp: jest.fn(),
}));

describe('Integration: Navigation', () => {
  const mockRouter = {
    pathname: '/',
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
  });

  describe('MarketingHeader Navigation', () => {
    test('renders all navigation links', () => {
      render(<MarketingHeader />);

      const navItems = ['Inicio', 'Servicios', 'Nosotros', 'Blog', 'Tienda', 'Contacto'];

      navItems.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    test('navigation links have correct hrefs', () => {
      render(<MarketingHeader />);

      expect(screen.getByText('Inicio').closest('a')).toHaveAttribute('href', '/');
      expect(screen.getByText('Servicios').closest('a')).toHaveAttribute('href', '/servicios');
      expect(screen.getByText('Nosotros').closest('a')).toHaveAttribute('href', '/nosotros');
      expect(screen.getByText('Blog').closest('a')).toHaveAttribute('href', '/blog');
      expect(screen.getByText('Tienda').closest('a')).toHaveAttribute('href', '/tienda');
      expect(screen.getByText('Contacto').closest('a')).toHaveAttribute('href', '/contacto');
    });

    test('highlights active route correctly', () => {
      useRouter.mockReturnValue({
        ...mockRouter,
        pathname: '/blog',
      });

      render(<MarketingHeader />);

      const blogLink = screen
        .getAllByText('Blog')
        .find((link) => link.closest('a')?.getAttribute('href') === '/blog');

      expect(blogLink).toBeInTheDocument();
    });
  });

  describe('StoreHeader Navigation', () => {
    const storeHeaderProps = {
      searchTerm: '',
      setSearchTerm: jest.fn(),
      showWishlistOnly: false,
      setShowWishlistOnly: jest.fn(),
      wishlist: [],
    };

    test('renders store navigation categories', () => {
      render(<StoreHeader {...storeHeaderProps} />);

      const categories = [
        'Todos',
        'Plantillas',
        'Fajas',
        'Soportes y Ortesis',
        'Rehabilitación',
        'Calzado ortopédico',
        'Pediatría',
      ];

      categories.forEach((category) => {
        expect(screen.getByText(category)).toBeInTheDocument();
      });
    });

    test('category links have correct hrefs', () => {
      render(<StoreHeader {...storeHeaderProps} />);

      expect(screen.getByText('Todos').closest('a')).toHaveAttribute('href', '/tienda');
      expect(screen.getByText('Plantillas').closest('a')).toHaveAttribute(
        'href',
        '/tienda?categoria=plantillas',
      );
      expect(screen.getByText('Fajas').closest('a')).toHaveAttribute(
        'href',
        '/tienda?categoria=fajas',
      );
    });

    test('renders top bar links', () => {
      render(<StoreHeader {...storeHeaderProps} />);

      expect(screen.getByText('Ortopedia Cuernavaca').closest('a')).toHaveAttribute(
        'href',
        '/nosotros',
      );
      expect(screen.getByText('Contáctanos').closest('a')).toHaveAttribute('href', '/contacto');
    });

    test('renders cart link', () => {
      render(<StoreHeader {...storeHeaderProps} />);

      const cartLink = screen.getByRole('link', { name: /carrito/i });
      expect(cartLink).toHaveAttribute('href', '/carrito');
    });
  });

  describe('Cross-component Navigation', () => {
    test('both headers link to home page', () => {
      const { rerender } = render(<MarketingHeader />);
      expect(screen.getByAltText('Ortopedia Cuernavaca Logo').closest('a')).toHaveAttribute(
        'href',
        '/',
      );

      rerender(
        <StoreHeader
          searchTerm=""
          setSearchTerm={jest.fn()}
          showWishlistOnly={false}
          setShowWishlistOnly={jest.fn()}
          wishlist={[]}
        />,
      );
      expect(screen.getByAltText('Ortochavitos Logo').closest('a')).toHaveAttribute(
        'href',
        '/tienda',
      );
    });

    test('navigation maintains consistent structure', () => {
      render(<MarketingHeader />);

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute('id', 'marketing-header');
    });
  });
});
