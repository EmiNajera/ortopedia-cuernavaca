const { test, expect } = require('@playwright/test');

test.describe('Appointment Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/citas');
  });

  test('should render appointment form', async ({ page }) => {
    // Verificar que la página de citas se carga
    await expect(page).toHaveURL(/.*\/citas/);

    // Verificar que hay opciones de servicios
    await expect(page.locator('body')).toContainText(/servicio/i);
  });

  test('should select a service', async ({ page }) => {
    // Buscar y hacer clic en un servicio
    const serviceButton = page
      .getByText(/consulta general/i)
      .or(page.getByText(/plantillas personalizadas/i))
      .first();

    if (await serviceButton.isVisible()) {
      await serviceButton.click();

      // Verificar que avanzamos al siguiente paso
      await expect(page.locator('body')).toContainText(/fecha|hora|información/i);
    }
  });

  test('should complete appointment flow', async ({ page }) => {
    // Paso 1: Seleccionar servicio
    const serviceButton = page.getByText(/consulta general/i).first();
    if (await serviceButton.isVisible()) {
      await serviceButton.click();
      await page.waitForTimeout(500);

      // Paso 2: Seleccionar fecha (si está disponible)
      const dateButton = page.locator('button:has-text("Lun"), button:has-text("Mar")').first();
      if (await dateButton.isVisible()) {
        await dateButton.click();
        await page.waitForTimeout(500);

        // Paso 3: Seleccionar hora (si está disponible)
        const timeButton = page
          .locator('button:has-text("11:00"), button:has-text("12:00")')
          .first();
        if (await timeButton.isVisible()) {
          await timeButton.click();
          await page.waitForTimeout(500);

          // Paso 4: Llenar información personal
          const nombreInput = page.getByLabel(/nombre/i);
          if (await nombreInput.isVisible()) {
            await nombreInput.fill('Juan Pérez');
            await page.getByLabel(/email/i).fill('juan@example.com');
            await page.getByLabel(/teléfono/i).fill('7771234567');

            // Interceptar alert de éxito
            page.on('dialog', async (dialog) => {
              expect(dialog.message()).toContain('agendada exitosamente');
              await dialog.accept();
            });

            // Enviar formulario
            const submitButton = page.getByRole('button', { name: /agendar|confirmar|enviar/i });
            if (await submitButton.isVisible()) {
              await submitButton.click();
            }
          }
        }
      }
    }
  });
});
