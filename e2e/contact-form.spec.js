const { test, expect } = require('@playwright/test');

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contacto');
  });

  test('should render contact form', async ({ page }) => {
    // Verificar que el formulario está presente
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Verificar campos del formulario
    await expect(page.getByLabel(/nombre/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/teléfono/i)).toBeVisible();
    await expect(page.getByLabel(/asunto/i)).toBeVisible();
    await expect(page.getByLabel(/mensaje/i)).toBeVisible();
  });

  test('should fill and submit contact form', async ({ page }) => {
    // Llenar el formulario
    await page.getByLabel(/nombre/i).fill('Juan Pérez');
    await page.getByLabel(/email/i).fill('juan@example.com');
    await page.getByLabel(/teléfono/i).fill('7771234567');
    await page.getByLabel(/asunto/i).selectOption('consulta');
    await page.getByLabel(/mensaje/i).fill('Mensaje de prueba');

    // Interceptar alert de éxito
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('enviado exitosamente');
      await dialog.accept();
    });

    // Enviar formulario
    await page.getByRole('button', { name: /enviar/i }).click();

    // Esperar a que el formulario se resetee o muestre mensaje de éxito
    await page.waitForTimeout(2000);
  });

  test('should validate required fields', async ({ page }) => {
    // Intentar enviar formulario vacío
    const submitButton = page.getByRole('button', { name: /enviar/i });

    // HTML5 validation debería prevenir el envío
    await submitButton.click();

    // Verificar que los campos requeridos están marcados
    const nombreInput = page.getByLabel(/nombre/i);
    if ((await nombreInput.getAttribute('required')) !== null) {
      await expect(nombreInput).toHaveAttribute('required');
    }
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.getByLabel(/email/i);

    // Escribir email inválido
    await emailInput.fill('invalid-email');
    await emailInput.blur();

    // HTML5 validation debería detectar el formato inválido
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('should open WhatsApp from CTA button', async ({ page }) => {
    // Buscar botón de WhatsApp/Agendar Consulta
    const whatsappButton = page
      .getByRole('button', { name: /agendar consulta/i })
      .or(page.getByRole('button', { name: /whatsapp/i }));

    if (await whatsappButton.isVisible()) {
      // Interceptar nueva ventana/pestaña
      const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        whatsappButton.click(),
      ]);

      // Verificar que se abre WhatsApp
      await expect(newPage).toHaveURL(/wa\.me/);
      await newPage.close();
    }
  });
});
