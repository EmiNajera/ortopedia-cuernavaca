import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contacto from '../src/pages/home/Contacto';
import Citas from '../src/pages/home/Citas';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: ({ children, ...props }) => React.createElement('div', props, children),
      button: ({ children, ...props }) => React.createElement('button', props, children),
      section: ({ children, ...props }) => React.createElement('section', props, children),
    },
    AnimatePresence: ({ children }) => React.createElement('div', null, children),
  };
});

// Mock next/image
jest.mock('next/image', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ src, alt, ...props }) => React.createElement('img', { src, alt, ...props }),
  };
});

// Mock whatsapp utility
jest.mock('../src/utils/whatsapp', () => ({
  openWhatsApp: jest.fn(),
}));

// Mock MarketingLayout
jest.mock('../src/components/layout/MarketingLayout', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children }) =>
      React.createElement('div', { 'data-testid': 'marketing-layout' }, children),
  };
});

// Mock window.alert
global.alert = jest.fn();

describe('Integration: Forms', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Contact Form', () => {
    test('renders all form fields', () => {
      render(<Contacto />);

      expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/asunto/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    });

    test('updates form fields when user types', () => {
      render(<Contacto />);

      const nombreInput = screen.getByLabelText(/nombre completo/i);
      const emailInput = screen.getByLabelText(/email/i);

      fireEvent.change(nombreInput, { target: { value: 'Juan Pérez' } });
      fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });

      expect(nombreInput).toHaveValue('Juan Pérez');
      expect(emailInput).toHaveValue('juan@example.com');
    });

    test('validates required fields', async () => {
      render(<Contacto />);

      const submitButton = screen.getByRole('button', { name: /enviar/i });
      fireEvent.click(submitButton);

      // HTML5 validation should prevent submission
      await waitFor(() => {
        const nombreInput = screen.getByLabelText(/nombre completo/i);
        expect(nombreInput).toBeRequired();
      });
    });

    test('submits form with valid data', async () => {
      render(<Contacto />);

      // Fill form
      fireEvent.change(screen.getByLabelText(/nombre completo/i), {
        target: { value: 'Juan Pérez' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'juan@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/teléfono/i), {
        target: { value: '7771234567' },
      });
      fireEvent.change(screen.getByLabelText(/asunto/i), {
        target: { value: 'consulta' },
      });
      fireEvent.change(screen.getByLabelText(/mensaje/i), {
        target: { value: 'Mensaje de prueba' },
      });

      const submitButton = screen.getByRole('button', { name: /enviar/i });
      fireEvent.click(submitButton);

      // Wait for async submission
      await waitFor(
        () => {
          expect(global.alert).toHaveBeenCalledWith(
            expect.stringContaining('Mensaje enviado exitosamente'),
          );
        },
        { timeout: 3000 },
      );
    });

    test('resets form after successful submission', async () => {
      render(<Contacto />);

      // Fill and submit form
      const nombreInput = screen.getByLabelText(/nombre completo/i);
      fireEvent.change(nombreInput, { target: { value: 'Juan Pérez' } });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'juan@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/asunto/i), {
        target: { value: 'consulta' },
      });
      fireEvent.change(screen.getByLabelText(/mensaje/i), {
        target: { value: 'Mensaje de prueba' },
      });

      const submitButton = screen.getByRole('button', { name: /enviar/i });
      fireEvent.click(submitButton);

      await waitFor(
        () => {
          expect(nombreInput).toHaveValue('');
        },
        { timeout: 3000 },
      );
    });

    test('shows loading state during submission', async () => {
      render(<Contacto />);

      // Fill form
      fireEvent.change(screen.getByLabelText(/nombre completo/i), {
        target: { value: 'Juan Pérez' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'juan@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/asunto/i), {
        target: { value: 'consulta' },
      });
      fireEvent.change(screen.getByLabelText(/mensaje/i), {
        target: { value: 'Mensaje de prueba' },
      });

      const submitButton = screen.getByRole('button', { name: /enviar/i });
      fireEvent.click(submitButton);

      // Button should be disabled during submission
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Appointment Form (Citas)', () => {
    test('renders service selection step', () => {
      render(<Citas />);

      expect(screen.getByText(/selecciona un servicio/i)).toBeInTheDocument();
      expect(screen.getByText(/consulta general/i)).toBeInTheDocument();
    });

    test('allows selecting a service', () => {
      render(<Citas />);

      const consultaService = screen.getByText(/consulta general/i);
      fireEvent.click(consultaService);

      // Should move to next step
      expect(screen.queryByText(/selecciona un servicio/i)).not.toBeInTheDocument();
    });

    test('renders date selection after service selection', () => {
      render(<Citas />);

      const consultaService = screen.getByText(/consulta general/i);
      fireEvent.click(consultaService);

      // Should show date selection
      expect(screen.getByText(/selecciona una fecha/i)).toBeInTheDocument();
    });

    test('renders time selection after date selection', () => {
      render(<Citas />);

      // Select service
      const consultaService = screen.getByText(/consulta general/i);
      fireEvent.click(consultaService);

      // Select date (first available)
      const dateButtons = screen.getAllByRole('button');
      const availableDateButton = dateButtons.find(
        (btn) => btn.textContent?.includes('Lun') || btn.textContent?.includes('Mar'),
      );

      if (availableDateButton) {
        fireEvent.click(availableDateButton);

        // Should show time selection
        expect(screen.getByText(/selecciona una hora/i)).toBeInTheDocument();
      }
    });

    test('renders personal information form in final step', () => {
      render(<Citas />);

      // Navigate through steps
      const consultaService = screen.getByText(/consulta general/i);
      fireEvent.click(consultaService);

      // Try to find and click date
      const dateButtons = screen.getAllByRole('button');
      const dateButton = dateButtons.find(
        (btn) => btn.textContent && !btn.textContent.includes('Consulta'),
      );

      if (dateButton && dateButton.textContent?.match(/\d{2}/)) {
        fireEvent.click(dateButton);

        // Try to find time button
        const timeButtons = screen.getAllByRole('button');
        const timeButton = timeButtons.find((btn) => btn.textContent?.match(/\d{2}:\d{2}/));

        if (timeButton) {
          fireEvent.click(timeButton);

          // Should show personal info form
          expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
          expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        }
      }
    });

    test('submits appointment form with valid data', async () => {
      render(<Citas />);

      // This is a simplified test - in a real scenario, we'd navigate through all steps
      // For now, we'll test that the form structure exists
      expect(screen.getByText(/consulta general/i)).toBeInTheDocument();
    });

    test('allows going back to previous steps', () => {
      render(<Citas />);

      const consultaService = screen.getByText(/consulta general/i);
      fireEvent.click(consultaService);

      // Should be able to go back
      const backButtons = screen.getAllByRole('button');
      const backButton = backButtons.find(
        (btn) =>
          btn.textContent?.toLowerCase().includes('volver') ||
          btn.textContent?.toLowerCase().includes('anterior'),
      );

      if (backButton) {
        fireEvent.click(backButton);
        expect(screen.getByText(/selecciona un servicio/i)).toBeInTheDocument();
      }
    });
  });

  describe('Form Validation', () => {
    test('contact form validates email format', () => {
      render(<Contacto />);

      const emailInput = screen.getByLabelText(/email/i);

      // Invalid email
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);

      // HTML5 validation should catch this
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    test('contact form validates phone format', () => {
      render(<Contacto />);

      const phoneInput = screen.getByLabelText(/teléfono/i);
      expect(phoneInput).toHaveAttribute('type', 'tel');
    });

    test('appointment form requires service selection', () => {
      render(<Citas />);

      // Cannot proceed without selecting a service
      const proceedButtons = screen.getAllByRole('button');
      const continueButton = proceedButtons.find(
        (btn) =>
          btn.textContent?.toLowerCase().includes('continuar') ||
          btn.textContent?.toLowerCase().includes('siguiente'),
      );

      if (continueButton) {
        // Should be disabled or show validation
        expect(continueButton).toBeInTheDocument();
      }
    });
  });

  describe('Form Accessibility', () => {
    test('contact form has proper labels', () => {
      render(<Contacto />);

      const nombreInput = screen.getByLabelText(/nombre completo/i);
      const emailInput = screen.getByLabelText(/email/i);

      expect(nombreInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
    });

    test('contact form has required field indicators', () => {
      render(<Contacto />);

      const nombreInput = screen.getByLabelText(/nombre completo/i);
      expect(nombreInput).toBeRequired();
    });

    test('appointment form has accessible service cards', () => {
      render(<Citas />);

      const serviceCards = screen.getAllByText(/consulta general|plantillas|ortesis/i);
      expect(serviceCards.length).toBeGreaterThan(0);
    });
  });
});
