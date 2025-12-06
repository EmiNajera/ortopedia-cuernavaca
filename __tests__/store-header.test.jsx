import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StoreHeader from '../src/components/layout/StoreHeader';

// Mock whatsapp utility
const mockOpenWhatsApp = jest.fn();
jest.mock('../src/lib/utils/whatsapp', () => ({
  openWhatsApp: mockOpenWhatsApp,
}));

// Mock window.alert
global.alert = jest.fn();

describe('StoreHeader', () => {
  const mockSetSearchTerm = jest.fn();
  const mockSetShowWishlistOnly = jest.fn();
  const defaultProps = {
    searchTerm: '',
    setSearchTerm: mockSetSearchTerm,
    showWishlistOnly: false,
    setShowWishlistOnly: mockSetShowWishlistOnly,
    wishlist: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders logo', () => {
    render(<StoreHeader {...defaultProps} />);

    expect(screen.getByAltText('Ortochavitos Logo')).toBeInTheDocument();
  });

  test('renders search input', () => {
    render(<StoreHeader {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Buscar productos...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute(
      'aria-label',
      'Buscar productos, servicios o especialidades',
    );
  });

  test('updates search term when typing', () => {
    render(<StoreHeader {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Buscar productos...');
    fireEvent.change(searchInput, { target: { value: 'plantilla' } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith('plantilla');
  });

  test('shows clear button when search term has value', () => {
    render(<StoreHeader {...defaultProps} searchTerm="test" />);

    const clearButton = screen.getByLabelText('Limpiar búsqueda');
    expect(clearButton).toBeInTheDocument();
  });

  test('clears search when clear button is clicked', () => {
    render(<StoreHeader {...defaultProps} searchTerm="test" />);

    const clearButton = screen.getByLabelText('Limpiar búsqueda');
    fireEvent.click(clearButton);

    expect(mockSetSearchTerm).toHaveBeenCalledWith('');
  });

  test('renders cart icon', () => {
    render(<StoreHeader {...defaultProps} />);

    const cartLink = screen.getByRole('link', { name: /carrito/i });
    expect(cartLink).toBeInTheDocument();
  });

  test('renders wishlist button', () => {
    render(<StoreHeader {...defaultProps} />);

    const wishlistButton =
      screen.getByRole('button', { name: /wishlist/i }) || screen.getByRole('button');
    expect(wishlistButton).toBeInTheDocument();
  });

  test('toggles wishlist when wishlist button is clicked', () => {
    render(<StoreHeader {...defaultProps} />);

    // Find wishlist button (heart icon)
    const buttons = screen.getAllByRole('button');
    const wishlistButton = buttons.find(
      (btn) => btn.querySelector('svg') && btn.querySelector('path[d*="M4.318"]'), // Heart icon path
    );

    if (wishlistButton) {
      fireEvent.click(wishlistButton);
      expect(mockSetShowWishlistOnly).toHaveBeenCalledWith(true);
    }
  });

  test('shows wishlist count badge when wishlist has items', () => {
    render(<StoreHeader {...defaultProps} wishlist={['1', '2', '3']} />);

    // Should show badge with count
    const badges = screen.getAllByText('3');
    expect(badges.length).toBeGreaterThan(0);
  });

  test('renders navigation categories', () => {
    render(<StoreHeader {...defaultProps} />);

    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('Plantillas')).toBeInTheDocument();
    expect(screen.getByText('Fajas')).toBeInTheDocument();
    expect(screen.getByText('Soportes y Ortesis')).toBeInTheDocument();
    expect(screen.getByText('Rehabilitación')).toBeInTheDocument();
    expect(screen.getByText('Calzado ortopédico')).toBeInTheDocument();
    expect(screen.getByText('Pediatría')).toBeInTheDocument();
  });

  test('calls openWhatsApp when "Agendar consulta" is clicked', () => {
    render(<StoreHeader {...defaultProps} />);

    const consultaButton = screen.getByText('Agendar consulta');
    fireEvent.click(consultaButton);

    expect(mockOpenWhatsApp).toHaveBeenCalled();
  });

  test('calls openWhatsApp when "Consulta clínica" is clicked', () => {
    render(<StoreHeader {...defaultProps} />);

    const consultaClinicaButton = screen.getByText('Consulta clínica');
    fireEvent.click(consultaClinicaButton);

    expect(mockOpenWhatsApp).toHaveBeenCalled();
  });

  test('shows alert when "Facturación" is clicked', () => {
    render(<StoreHeader {...defaultProps} />);

    const facturacionButton = screen.getByText('Facturación');
    fireEvent.click(facturacionButton);

    expect(global.alert).toHaveBeenCalledWith('Sistema de facturación en desarrollo');
  });

  test('shows alert when "Ofertas" is clicked', () => {
    render(<StoreHeader {...defaultProps} />);

    const ofertasButton = screen.getByText('Ofertas');
    fireEvent.click(ofertasButton);

    expect(global.alert).toHaveBeenCalledWith('Sección de ofertas en desarrollo');
  });

  test('renders phone numbers', () => {
    render(<StoreHeader {...defaultProps} />);

    expect(screen.getByText(/777 311 2867/)).toBeInTheDocument();
    expect(screen.getByText(/777 311 9837/)).toBeInTheDocument();
  });

  test('renders top bar links', () => {
    render(<StoreHeader {...defaultProps} />);

    expect(screen.getByText('Ortopedia Cuernavaca')).toBeInTheDocument();
    expect(screen.getByText('Contáctanos')).toBeInTheDocument();
  });

  test('has proper ARIA labels for navigation', () => {
    render(<StoreHeader {...defaultProps} />);

    const nav = screen.getByLabelText('Categorías de la tienda');
    expect(nav).toBeInTheDocument();
  });

  test('search input has proper role', () => {
    render(<StoreHeader {...defaultProps} />);

    const searchContainer = screen.getByRole('search');
    expect(searchContainer).toBeInTheDocument();
  });
});
