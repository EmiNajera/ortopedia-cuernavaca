const { test, expect } = require('@playwright/test');

test.describe('Blog Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('should display blog articles list', async ({ page }) => {
    // Verificar que estamos en la página de blog
    await expect(page).toHaveURL(/.*\/blog/);

    // Verificar que hay artículos o contenido de blog
    await expect(page.locator('body')).toContainText(/artículo|blog|publicación/i);
  });

  test('should navigate to article page', async ({ page }) => {
    // Buscar enlace a un artículo
    const articleLink = page.locator('a[href*="/blog/"]').first();

    if (await articleLink.isVisible()) {
      const articleTitle = await articleLink.textContent();
      await articleLink.click();

      // Verificar que navegamos a la página del artículo
      await expect(page).toHaveURL(/.*\/blog\/.+/);

      // Verificar que el contenido del artículo se muestra
      if (articleTitle) {
        await expect(page.locator('body')).toContainText(articleTitle.trim());
      }
    }
  });

  test('should display article content', async ({ page }) => {
    // Navegar a un artículo específico si existe
    const articleLink = page.locator('a[href*="/blog/"]').first();

    if (await articleLink.isVisible()) {
      await articleLink.click();

      // Verificar que hay contenido del artículo
      await expect(page.locator('article, [class*="article"], main')).toBeVisible();
    }
  });

  test('should have article metadata', async ({ page }) => {
    const articleLink = page.locator('a[href*="/blog/"]').first();

    if (await articleLink.isVisible()) {
      await articleLink.click();

      // Verificar que hay metadatos (fecha, autor, etc.)
      await expect(page.locator('body')).toContainText(/fecha|autor|tiempo de lectura/i);
    }
  });
});
