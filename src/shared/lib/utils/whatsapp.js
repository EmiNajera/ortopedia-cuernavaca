export const openWhatsApp = (phoneNumber = '7772150982', message = '') => {
  const defaultMessage =
    message || 'Hola, me gustaría agendar una cita para consulta ortopédica. ¿Podrían ayudarme?';
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/52${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export const openWhatsAppOrtochavitos = (message = '') => {
  const defaultMessage =
    message ||
    'Hola, me gustaría agendar una cita para mi hijo/a en Ortochavitos. ¿Podrían ayudarme?';
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/5217772150982?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export const generateCartMessage = (items, total) => {
  let message = 'Hola, me gustaría realizar el siguiente pedido:\n\n';
  items.forEach((item) => {
    message += `• ${item.name} (x${item.quantity}) - $${item.price * item.quantity}\n`;
  });
  message += `\nTotal: $${total}\n\n¿Cuál es el proceso de pago y envío?`;
  return message;
};

export const openWhatsAppCart = (items, total) => {
  const message = generateCartMessage(items, total);
  openWhatsApp('7772150982', message);
};
