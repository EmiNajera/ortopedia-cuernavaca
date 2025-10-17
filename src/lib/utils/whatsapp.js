export const openWhatsApp = (phoneNumber = '17772150982', message = '') => {
  const defaultMessage = message || 'Hola, me gustaría agendar una cita para consulta ortopédica. ¿Podrían ayudarme?';
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/52${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export const openWhatsAppOrtochavitos = (message = '') => {
  const defaultMessage = message || 'Hola, me gustaría agendar una cita para mi hijo/a en Ortochavitos. ¿Podrían ayudarme?';
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/5217772150982?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};
