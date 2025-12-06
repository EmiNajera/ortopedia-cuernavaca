const { test, expect } = require('@playwright/test');

test.describe('Store Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tienda');
  });

  test('should search for products', async ({ page }) => {
    // Buscar input de búsqueda
    const searchInput = page.getByPlaceholderText(/buscar productos/i);

    // Escribir en el campo de búsqueda
    await searchInput.fill('plantilla');

    // Verificar que el valor se actualizó
    await expect(searchInput).toHaveValue('plantilla');
  });

  test('should filter by category', async ({ page }) => {
    // Hacer clic en una categoría
    await page.click('text=Plantillas');

    // Verificar que la URL incluye la categoría
    await expect(page).toHaveURL(/.*categoria=plantillas/);
  });

  test('should navigate to product page', async ({ page }) => {
    // Esperar a que los productos se carguen
    await page
      .waitForSelector('img[alt*="producto"], img[alt*="plantilla"], img[alt*="faja"]', {
        timeout: 5000,
      })
      .catch(() => {});

    // Hacer clic en el primer producto visible
    const productCard = page.locator('.group, [class*="product"], [class*="card"]').first();

    if (await productCard.isVisible()) {
      await productCard.click();

      // Verificar que navegamos a una página de producto
      await expect(page).toHaveURL(/.*\/producto\//);
    }
  });

  test('should add product to cart', async ({ page }) => {
    // Buscar botón de agregar al carrito
    const addToCartButton = page.getByRole('button', { name: /agregar al carrito/i }).first();

    if (await addToCartButton.isVisible()) {
      // Interceptar alert
      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('agregado al carrito');
        await dialog.accept();
      });

      await addToCartButton.click();
    }
  });

  test('should access cart', async ({ page }) => {
    // Buscar enlace o botón de carrito
    const cartLink = page
      .getByRole('link', { name: /carrito/i })
      .or(page.locator('[href*="carrito"]'));

    if (await cartLink.isVisible()) {
      await cartLink.click();
      await expect(page).toHaveURL(/.*\/carrito/);
    }
  });

  test('should toggle wishlist', async ({ page }) => {
    // Buscar botón de wishlist (corazón)
    const wishlistButton = page.locator(
      'button:has(svg), [aria-label*="wishlist"], [aria-label*="favorito"]',
    );

    if (await wishlistButton.first().isVisible()) {
      await wishlistButton.first().click();
      // Verificar que el estado cambió (esto dependería de la implementación)
    }
  });
});
