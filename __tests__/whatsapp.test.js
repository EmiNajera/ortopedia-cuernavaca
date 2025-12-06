import { openWhatsApp, openWhatsAppOrtochavitos } from '../src/lib/utils/whatsapp';

// Mock window.open
const mockWindowOpen = jest.fn();
global.window.open = mockWindowOpen;

describe('WhatsApp Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('openWhatsApp', () => {
    test('opens WhatsApp with default phone number and message', () => {
      openWhatsApp();

      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('wa.me/5217772150982'),
        '_blank',
      );

      const callArgs = mockWindowOpen.mock.calls[0][0];
      expect(callArgs).toContain('text=');
      expect(decodeURIComponent(callArgs)).toContain('Hola, me gustaría agendar una cita');
    });

    test('opens WhatsApp with custom phone number', () => {
      openWhatsApp('1234567890');

      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('wa.me/521234567890'),
        '_blank',
      );
    });

    test('opens WhatsApp with custom message', () => {
      const customMessage = 'Mensaje personalizado';
      openWhatsApp('17772150982', customMessage);

      const callArgs = mockWindowOpen.mock.calls[0][0];
      expect(decodeURIComponent(callArgs)).toContain(customMessage);
    });

    test('encodes message correctly', () => {
      const messageWithSpecialChars = 'Hola! ¿Cómo estás?';
      openWhatsApp('17772150982', messageWithSpecialChars);

      const callArgs = mockWindowOpen.mock.calls[0][0];
      expect(callArgs).toContain('text=');
      // Should be URL encoded
      expect(callArgs).not.toContain('¿');
      expect(callArgs).not.toContain('?');
    });

    test('uses default message when empty string is provided', () => {
      openWhatsApp('17772150982', '');

      const callArgs = mockWindowOpen.mock.calls[0][0];
      expect(decodeURIComponent(callArgs)).toContain('Hola, me gustaría agendar una cita');
    });
  });

  describe('openWhatsAppOrtochavitos', () => {
    test('opens WhatsApp for Ortochavitos with default message', () => {
      openWhatsAppOrtochavitos();

      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('wa.me/5217772150982'),
        '_blank',
      );

      const callArgs = mockWindowOpen.mock.calls[0][0];
      expect(decodeURIComponent(callArgs)).toContain('Ortochavitos');
    });

    test('opens WhatsApp for Ortochavitos with custom message', () => {
      const customMessage = 'Consulta para mi hijo';
      openWhatsAppOrtochavitos(customMessage);

      const callArgs = mockWindowOpen.mock.calls[0][0];
      expect(decodeURIComponent(callArgs)).toContain(customMessage);
    });

    test('uses default Ortochavitos message when empty string is provided', () => {
      openWhatsAppOrtochavitos('');

      const callArgs = mockWindowOpen.mock.calls[0][0];
      expect(decodeURIComponent(callArgs)).toContain('Ortochavitos');
    });

    test('encodes message correctly', () => {
      const messageWithSpecialChars = 'Hola! ¿Tienen disponibilidad?';
      openWhatsAppOrtochavitos(messageWithSpecialChars);

      const callArgs = mockWindowOpen.mock.calls[0][0];
      expect(callArgs).toContain('text=');
      // Should be URL encoded
      expect(callArgs).not.toContain('¿');
      expect(callArgs).not.toContain('?');
    });
  });

  describe('URL format validation', () => {
    test('generates correct WhatsApp URL format', () => {
      openWhatsApp('17772150982', 'Test message');

      const url = mockWindowOpen.mock.calls[0][0];
      expect(url).toMatch(/^https:\/\/wa\.me\/52\d+\?text=/);
    });

    test('includes country code 52 for Mexico', () => {
      openWhatsApp('17772150982');

      const url = mockWindowOpen.mock.calls[0][0];
      expect(url).toContain('wa.me/5217772150982');
    });
  });
});
