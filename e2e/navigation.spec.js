const { test, expect } = require('@playwright/test');

test.describe('Navigation Flow', () => {
  test('should navigate from home to services to appointments', async ({ page }) => {
    // Ir a la página de inicio
    await page.goto('/');

    // Verificar que estamos en la página de inicio
    await expect(page).toHaveURL(/.*\/$/);

    // Hacer clic en "Servicios"
    await page.click('text=Servicios');

    // Verificar que navegamos a servicios
    await expect(page).toHaveURL(/.*\/servicios/);

    // Verificar que la página de servicios se carga
    await expect(page.locator('body')).toContainText(/servicio/i);
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/');

    // Hacer clic en "Contacto"
    await page.click('text=Contacto');

    // Verificar que navegamos a contacto
    await expect(page).toHaveURL(/.*\/contacto/);

    // Verificar que el formulario de contacto está presente
    await expect(page.locator('form')).toBeVisible();
  });

  test('should navigate to blog', async ({ page }) => {
    await page.goto('/');

    // Hacer clic en "Blog"
    await page.click('text=Blog');

    // Verificar que navegamos a blog
    await expect(page).toHaveURL(/.*\/blog/);
  });

  test('should navigate to store', async ({ page }) => {
    await page.goto('/');

    // Hacer clic en "Tienda"
    await page.click('text=Tienda');

    // Verificar que navegamos a tienda
    await expect(page).toHaveURL(/.*\/tienda/);
  });

  test('should navigate to about us page', async ({ page }) => {
    await page.goto('/');

    // Hacer clic en "Nosotros"
    await page.click('text=Nosotros');

    // Verificar que navegamos a nosotros
    await expect(page).toHaveURL(/.*\/nosotros/);
  });

  test('logo should link to home', async ({ page }) => {
    await page.goto('/tienda');

    // Hacer clic en el logo
    await page.click('img[alt*="Logo"], img[alt*="Ortopedia"]');

    // Verificar que volvemos a home
    await expect(page).toHaveURL(/.*\/$/);
  });
});
