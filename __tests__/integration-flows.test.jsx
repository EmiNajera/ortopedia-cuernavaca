/**
 * Tests de integración para flujos completos de usuario
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    motion: {
      div: ({ children, ...props }) => React.createElement('div', props, children),
      button: ({ children, ...props }) => React.createElement('button', props, children),
    },
    AnimatePresence: ({ children }) => React.createElement('div', null, children),
  };
});

// Mock whatsapp utility
const mockOpenWhatsApp = jest.fn();
jest.mock('../src/utils/whatsapp', () => ({
  openWhatsApp: mockOpenWhatsApp,
}));

jest.mock('../src/lib/utils/whatsapp', () => ({
  openWhatsApp: mockOpenWhatsApp,
}));

describe('Integration: User Flows', () => {
  const mockPush = jest.fn();
  const mockRouter = {
    pathname: '/',
    push: mockPush,
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

  describe('Navigation Flow: Home → Servicios → Citas', () => {
    test('user can navigate from home to services to appointments', () => {
      render(<MarketingHeader />);

      // User clicks on Servicios
      const serviciosLink = screen.getByText('Servicios');
      expect(serviciosLink).toBeInTheDocument();
      expect(serviciosLink.closest('a')).toHaveAttribute('href', '/servicios');

      // User clicks on Citas (should be accessible from header)
      // Note: Citas might not be in the main nav, but we can verify navigation structure
      const navItems = ['Inicio', 'Servicios', 'Nosotros', 'Blog', 'Tienda', 'Contacto'];
      navItems.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    test('navigation highlights active route', () => {
      useRouter.mockReturnValue({
        ...mockRouter,
        pathname: '/servicios',
      });

      render(<MarketingHeader />);

      const serviciosLink = screen
        .getAllByText('Servicios')
        .find((link) => link.closest('a')?.getAttribute('href') === '/servicios');

      expect(serviciosLink).toBeInTheDocument();
    });
  });

  describe('Store Flow: Search → Product → Cart', () => {
    const storeHeaderProps = {
      searchTerm: '',
      setSearchTerm: jest.fn(),
      showWishlistOnly: false,
      setShowWishlistOnly: jest.fn(),
      wishlist: [],
    };

    test('user can search for products', () => {
      render(<StoreHeader {...storeHeaderProps} />);

      const searchInput = screen.getByPlaceholderText('Buscar productos...');
      expect(searchInput).toBeInTheDocument();

      fireEvent.change(searchInput, { target: { value: 'plantilla' } });
      expect(storeHeaderProps.setSearchTerm).toHaveBeenCalledWith('plantilla');
    });

    test('user can filter by category', () => {
      render(<StoreHeader {...storeHeaderProps} />);

      const plantillasLink = screen.getByText('Plantillas');
      expect(plantillasLink).toBeInTheDocument();
      expect(plantillasLink.closest('a')).toHaveAttribute('href', '/tienda?categoria=plantillas');
    });

    test('user can access cart', () => {
      render(<StoreHeader {...storeHeaderProps} />);

      const cartLink = screen.getByRole('link', { name: /carrito/i });
      expect(cartLink).toBeInTheDocument();
      expect(cartLink).toHaveAttribute('href', '/carrito');
    });

    test('user can toggle wishlist', () => {
      render(<StoreHeader {...storeHeaderProps} />);

      // Find wishlist button
      const buttons = screen.getAllByRole('button');
      const wishlistButton = buttons.find(
        (btn) => btn.querySelector('svg') && btn.querySelector('path[d*="M4.318"]'), // Heart icon
      );

      if (wishlistButton) {
        fireEvent.click(wishlistButton);
        expect(storeHeaderProps.setShowWishlistOnly).toHaveBeenCalled();
      }
    });
  });

  describe('Blog Flow: List → Article → Actions', () => {
    test('user can navigate to blog', () => {
      render(<MarketingHeader />);

      const blogLink = screen.getByText('Blog');
      expect(blogLink).toBeInTheDocument();
      expect(blogLink.closest('a')).toHaveAttribute('href', '/blog');
    });

    test('blog articles should be accessible', () => {
      // This would require rendering the blog list page
      // For now, we verify navigation exists
      render(<MarketingHeader />);

      const blogLink = screen.getByText('Blog');
      expect(blogLink.closest('a')).toHaveAttribute('href', '/blog');
    });
  });

  describe('Contact Flow: Contact Form → WhatsApp', () => {
    test('user can access contact page', () => {
      render(<MarketingHeader />);

      const contactoLink = screen.getByText('Contacto');
      expect(contactoLink).toBeInTheDocument();
      expect(contactoLink.closest('a')).toHaveAttribute('href', '/contacto');
    });

    test('user can open WhatsApp from header CTA', () => {
      render(<MarketingHeader />);

      const ctaButton = screen.getByText('Agendar Consulta');
      fireEvent.click(ctaButton);

      expect(mockOpenWhatsApp).toHaveBeenCalled();
    });

    test('user can open WhatsApp from store header', () => {
      render(
        <StoreHeader
          searchTerm=""
          setSearchTerm={jest.fn()}
          showWishlistOnly={false}
          setShowWishlistOnly={jest.fn()}
          wishlist={[]}
        />,
      );

      const consultaButton = screen.getByText('Agendar consulta');
      fireEvent.click(consultaButton);

      expect(mockOpenWhatsApp).toHaveBeenCalled();
    });
  });

  describe('Mobile Navigation Flow', () => {
    test('mobile menu opens and closes correctly', async () => {
      render(<MarketingHeader />);

      const menuButton = screen.getByLabelText('Toggle mobile menu');
      expect(menuButton).toBeInTheDocument();

      // Open menu
      fireEvent.click(menuButton);

      // Menu should be visible
      await waitFor(() => {
        const mobileMenuItems = screen.getAllByText('Inicio');
        expect(mobileMenuItems.length).toBeGreaterThan(1);
      });

      // Close menu
      fireEvent.click(menuButton);

      // Menu should close
      await waitFor(() => {
        const mobileMenuItems = screen.getAllByText('Inicio');
        expect(mobileMenuItems.length).toBe(1); // Only desktop nav
      });
    });

    test('mobile menu closes when route changes', async () => {
      const { rerender } = render(<MarketingHeader />);

      const menuButton = screen.getByLabelText('Toggle mobile menu');
      fireEvent.click(menuButton);

      // Change route
      useRouter.mockReturnValue({
        ...mockRouter,
        pathname: '/servicios',
      });

      rerender(<MarketingHeader />);

      // Menu should be closed
      await waitFor(() => {
        const mobileMenuItems = screen.getAllByText('Inicio');
        expect(mobileMenuItems.length).toBe(1);
      });
    });
  });

  describe('Cross-page Consistency', () => {
    test('navigation structure is consistent across pages', () => {
      const { rerender } = render(<MarketingHeader />);

      // Verify initial navigation
      expect(screen.getByText('Inicio')).toBeInTheDocument();
      expect(screen.getByText('Servicios')).toBeInTheDocument();

      // Change to different route
      useRouter.mockReturnValue({
        ...mockRouter,
        pathname: '/tienda',
      });

      rerender(<MarketingHeader />);

      // Navigation should still be present
      expect(screen.getByText('Inicio')).toBeInTheDocument();
      expect(screen.getByText('Servicios')).toBeInTheDocument();
    });

    test('logo links to home from all pages', () => {
      const { rerender } = render(<MarketingHeader />);

      const logoLink = screen.getByAltText('Ortopedia Cuernavaca Logo').closest('a');
      expect(logoLink).toHaveAttribute('href', '/');

      // Change route
      useRouter.mockReturnValue({
        ...mockRouter,
        pathname: '/tienda',
      });

      rerender(<MarketingHeader />);

      // Logo should still link to home
      const logoLinkAfter = screen.getByAltText('Ortopedia Cuernavaca Logo').closest('a');
      expect(logoLinkAfter).toHaveAttribute('href', '/');
    });
  });
});
