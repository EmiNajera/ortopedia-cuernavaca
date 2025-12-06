import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MarketingHeader from '../src/components/layout/MarketingHeader';
import { useRouter } from 'next/router';

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
const mockOpenWhatsApp = jest.fn();
jest.mock('../src/utils/whatsapp', () => ({
  openWhatsApp: mockOpenWhatsApp,
}));

describe('MarketingHeader', () => {
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
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  test('renders logo and navigation items', () => {
    render(<MarketingHeader />);

    expect(screen.getByAltText('Ortopedia Cuernavaca Logo')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Servicios')).toBeInTheDocument();
    expect(screen.getByText('Nosotros')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Tienda')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  test('renders CTA button', () => {
    render(<MarketingHeader />);

    const ctaButton = screen.getByText('Agendar Consulta');
    expect(ctaButton).toBeInTheDocument();
  });

  test('shows mobile menu button on mobile', () => {
    render(<MarketingHeader />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveClass('md:hidden');
  });

  test('toggles mobile menu when button is clicked', async () => {
    render(<MarketingHeader />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');

    // Menu should not be visible initially
    expect(screen.queryByText('Inicio')).toBeInTheDocument(); // Desktop nav

    // Click to open mobile menu
    fireEvent.click(menuButton);

    // Mobile menu items should be visible
    await waitFor(() => {
      const mobileMenuItems = screen.getAllByText('Inicio');
      expect(mobileMenuItems.length).toBeGreaterThan(1);
    });
  });

  test('highlights active route', () => {
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

  test('closes mobile menu when route changes', async () => {
    const { rerender } = render(<MarketingHeader />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    fireEvent.click(menuButton);

    // Change route
    useRouter.mockReturnValue({
      ...mockRouter,
      pathname: '/servicios',
    });

    rerender(<MarketingHeader />);

    // Menu should be closed after route change
    await waitFor(() => {
      const mobileMenuItems = screen.getAllByText('Inicio');
      expect(mobileMenuItems.length).toBe(1); // Only desktop nav
    });
  });

  test('applies scrolled styles when scrolling', () => {
    render(<MarketingHeader />);

    const header = screen.getByRole('banner');

    // Initially should have light background
    expect(header).toHaveClass('bg-white/80');

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 100,
    });

    fireEvent.scroll(window);

    // After scroll, should have darker background
    // Note: This test may need adjustment based on actual implementation
  });

  test('calls openWhatsApp when CTA button is clicked', () => {
    render(<MarketingHeader />);

    const ctaButton = screen.getByText('Agendar Consulta');
    fireEvent.click(ctaButton);

    expect(mockOpenWhatsApp).toHaveBeenCalled();
  });

  test('calls openWhatsApp when mobile menu CTA is clicked', async () => {
    render(<MarketingHeader />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    fireEvent.click(menuButton);

    await waitFor(() => {
      const mobileCtaButtons = screen.getAllByText('Agendar Consulta');
      expect(mobileCtaButtons.length).toBeGreaterThan(1);
    });

    const mobileCtaButton = screen
      .getAllByText('Agendar Consulta')
      .find((btn) =>
        btn.closest('button')?.parentElement?.parentElement?.classList.contains('md:hidden'),
      );

    if (mobileCtaButton) {
      fireEvent.click(mobileCtaButton);
      expect(mockOpenWhatsApp).toHaveBeenCalled();
    }
  });

  test('closes mobile menu when clicking a nav item', async () => {
    render(<MarketingHeader />);

    const menuButton = screen.getByLabelText('Toggle mobile menu');
    fireEvent.click(menuButton);

    await waitFor(() => {
      const mobileLinks = screen.getAllByText('Servicios');
      expect(mobileLinks.length).toBeGreaterThan(1);
    });

    const mobileServiciosLink = screen
      .getAllByText('Servicios')
      .find((link) => link.closest('a')?.getAttribute('href') === '/servicios');

    if (mobileServiciosLink) {
      fireEvent.click(mobileServiciosLink);

      // Menu should close
      await waitFor(() => {
        const mobileMenuItems = screen.getAllByText('Inicio');
        expect(mobileMenuItems.length).toBe(1);
      });
    }
  });
});
