#!/usr/bin/env node

/**
 * Script de Testing Cross-Browser
 * Valida que el diseño responsive funcione en diferentes navegadores y dispositivos
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Configuración de navegadores
const browsers = [
  { name: 'Chrome', type: 'chromium' },
  // Firefox y Safari se pueden agregar si están disponibles
];

// Configuración de dispositivos de prueba
const devices = {
  mobileSmall: { name: 'iPhone SE', viewport: { width: 375, height: 667 } },
  mobileLarge: { name: 'iPhone 12 Pro Max', viewport: { width: 428, height: 926 } },
  tablet: { name: 'iPad', viewport: { width: 768, height: 1024 } },
  laptop: { name: 'Laptop', viewport: { width: 1280, height: 800 } },
  desktop: { name: 'Desktop 4K', viewport: { width: 1920, height: 1080 } },
};

// URLs a testear
const testUrls = [
  'http://localhost:3000',
  'http://localhost:3000/tienda',
  'http://localhost:3000/servicios',
  'http://localhost:3000/nosotros',
];

/**
 * Validaciones de responsive design
 */
const validateResponsiveDesign = async (page, device) => {
  const validations = {
    viewport: device.viewport,
    timestamp: new Date().toISOString(),
    checks: {},
    warnings: [],
    errors: [],
  };

  try {
    // 1. Validar que no hay overflow horizontal
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    validations.checks.noHorizontalScroll = !hasHorizontalScroll;
    if (hasHorizontalScroll) {
      validations.warnings.push('⚠️ Hay scroll horizontal detectado');
    }

    // 2. Validar legibilidad del texto
    const textReadability = await page.evaluate(() => {
      const texts = document.querySelectorAll('body *');
      let tooSmallCount = 0;
      let totalCount = 0;

      texts.forEach((el) => {
        const style = window.getComputedStyle(el);
        const fontSize = parseFloat(style.fontSize);

        if (el.textContent && el.textContent.trim()) {
          totalCount++;
          if (fontSize < 12) {
            tooSmallCount++;
          }
        }
      });

      return {
        tooSmallCount,
        totalCount,
        percentage: totalCount > 0 ? (tooSmallCount / totalCount) * 100 : 0,
      };
    });

    validations.checks.textReadability = textReadability.percentage < 5;
    if (textReadability.percentage > 5) {
      validations.warnings.push(
        `⚠️ ${textReadability.tooSmallCount} elementos con texto muy pequeño`,
      );
    }

    // 3. Validar área táctil de botones en móvil
    if (device.viewport.width <= 768) {
      const buttonAccessibility = await page.evaluate(() => {
        const buttons = document.querySelectorAll('button, [role="button"], a');
        let tooSmallCount = 0;

        buttons.forEach((btn) => {
          const rect = btn.getBoundingClientRect();
          const size = Math.min(rect.width, rect.height);
          if (size < 44 && size > 0) {
            tooSmallCount++;
          }
        });

        return { tooSmallCount, totalCount: buttons.length };
      });

      validations.checks.buttonAccessibility = buttonAccessibility.tooSmallCount === 0;
      if (buttonAccessibility.tooSmallCount > 0) {
        validations.warnings.push(
          `⚠️ ${buttonAccessibility.tooSmallCount} botones con área táctil < 44px`,
        );
      }
    }

    // 4. Validar imágenes responsivas
    const imageOptimization = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      let optimizedCount = 0;
      let totalCount = images.length;

      images.forEach((img) => {
        // Verificar que la imagen tiene sizes attribute o está optimizada
        if (img.hasAttribute('sizes') || img.hasAttribute('srcset')) {
          optimizedCount++;
        }
      });

      return { optimizedCount, totalCount };
    });

    validations.checks.imageOptimization =
      imageOptimization.totalCount === 0 ||
      imageOptimization.optimizedCount / imageOptimization.totalCount > 0.7;

    // 5. Validar que hay contenido importante visible
    const contentVisibility = await page.evaluate(() => {
      const main = document.querySelector('main, [role="main"], .content');
      const hasVisibleContent = main && main.offsetHeight > 100;
      return hasVisibleContent;
    });

    validations.checks.contentVisibility = contentVisibility;

    // 6. Validar navegación
    const navigationAccessible = await page.evaluate(() => {
      const nav = document.querySelector('nav, [role="navigation"], header');
      const hasLinks = nav && nav.querySelectorAll('a, button').length > 0;
      return hasLinks;
    });

    validations.checks.navigationAccessible = navigationAccessible;

    // 7. Validar forms
    const formAccessibility = await page.evaluate(() => {
      const forms = document.querySelectorAll('form, input, textarea, select');
      let accessibleCount = 0;

      forms.forEach((form) => {
        // Verificar que tiene labels o aria-label
        if (form.querySelector('label') || form.hasAttribute('aria-label')) {
          accessibleCount++;
        }
      });

      return { accessibleCount, totalCount: forms.length };
    });

    if (formAccessibility.totalCount > 0) {
      validations.checks.formAccessibility =
        formAccessibility.accessibleCount / formAccessibility.totalCount > 0.8;
    }
  } catch (error) {
    validations.errors.push(`Error durante validación: ${error.message}`);
  }

  return validations;
};

/**
 * Ejecutar tests cross-browser
 */
async function runCrossBrowserTests() {
  console.log('🌍 Iniciando tests cross-browser...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const outputDir = path.join(__dirname, '../test-results/cross-browser');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const results = {
    timestamp: new Date().toISOString(),
    summary: {
      total: 0,
      passed: 0,
      failed: 0,
      warnings: 0,
    },
    tests: [],
  };

  try {
    for (const url of testUrls) {
      console.log(`\n📍 Testing URL: ${url}`);

      for (const [deviceKey, device] of Object.entries(devices)) {
        const page = await browser.newPage();

        try {
          await page.setViewport(device.viewport);
          console.log(`  📱 ${device.name} (${device.viewport.width}x${device.viewport.height})`);

          await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

          // Esperar a que se carguen animaciones
          await page.waitForTimeout(1000);

          // Ejecutar validaciones
          const validations = await validateResponsiveDesign(page, device);

          // Capturar screenshot
          const screenshotName = `${url.split('/').pop() || 'home'}-${deviceKey}.png`;
          const screenshotPath = path.join(outputDir, screenshotName);

          await page.screenshot({
            path: screenshotPath,
            fullPage: true,
            quality: 75,
          });

          // Contar resultados
          results.summary.total++;
          const checksPassed = Object.values(validations.checks).filter((v) => v === true).length;
          const allChecksPassed = Object.values(validations.checks).every((v) => v !== false);

          if (allChecksPassed && validations.errors.length === 0) {
            results.summary.passed++;
          } else {
            results.summary.failed++;
          }

          if (validations.warnings.length > 0) {
            results.summary.warnings++;
          }

          // Guardar resultado de test
          results.tests.push({
            url,
            device: device.name,
            viewport: device.viewport,
            passed: allChecksPassed,
            validations,
            screenshot: screenshotName,
          });

          // Mostrar resultado
          const status = allChecksPassed ? '✅' : '⚠️';
          console.log(
            `    ${status} ${checksPassed}/${Object.keys(validations.checks).length} checks passed`,
          );
        } catch (error) {
          console.error(`    ❌ Error: ${error.message}`);
          results.summary.failed++;
        } finally {
          await page.close();
        }
      }
    }

    // Generar reporte
    generateReport(results, outputDir);
  } finally {
    await browser.close();
  }

  console.log('\n✅ Testing completado!');
  console.log(`\n📊 Resumen:`);
  console.log(`  Total: ${results.summary.total}`);
  console.log(`  ✅ Pasados: ${results.summary.passed}`);
  console.log(`  ❌ Fallidos: ${results.summary.failed}`);
  console.log(`  ⚠️  Con advertencias: ${results.summary.warnings}`);

  return results;
}

/**
 * Generar reporte HTML
 */
function generateReport(results, outputDir) {
  const reportPath = path.join(outputDir, 'cross-browser-report.html');

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cross-Browser Test Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
    .summary-item { background: #f5f5f5; padding: 15px; border-radius: 8px; text-align: center; }
    .summary-item.passed { border-left: 4px solid #22c55e; }
    .summary-item.failed { border-left: 4px solid #ef4444; }
    .summary-item.warning { border-left: 4px solid #eab308; }
    .test-result { background: white; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px; overflow: hidden; }
    .test-header { background: #f9f9f9; padding: 15px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; }
    .test-status { font-weight: bold; }
    .status-passed { color: #22c55e; }
    .status-failed { color: #ef4444; }
    .test-content { padding: 15px; }
    .checks { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; }
    .check { padding: 10px; background: #f9f9f9; border-radius: 4px; font-size: 14px; }
    .check.pass { border-left: 3px solid #22c55e; }
    .check.fail { border-left: 3px solid #ef4444; }
    .screenshot { margin-top: 15px; max-width: 100%; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌍 Cross-Browser Test Report</h1>
      <p>${results.timestamp}</p>
    </div>

    <div class="summary">
      <div class="summary-item">
        <h3>Total</h3>
        <p style="font-size: 24px; margin: 0;">${results.summary.total}</p>
      </div>
      <div class="summary-item passed">
        <h3>✅ Pasados</h3>
        <p style="font-size: 24px; margin: 0;">${results.summary.passed}</p>
      </div>
      <div class="summary-item failed">
        <h3>❌ Fallidos</h3>
        <p style="font-size: 24px; margin: 0;">${results.summary.failed}</p>
      </div>
      <div class="summary-item warning">
        <h3>⚠️ Advertencias</h3>
        <p style="font-size: 24px; margin: 0;">${results.summary.warnings}</p>
      </div>
    </div>

    <h2>📋 Resultados de Tests</h2>
    ${results.tests
      .map(
        (test) => `
      <div class="test-result">
        <div class="test-header">
          <div>
            <strong>${test.url}</strong><br>
            <small>${test.device} (${test.viewport.width}x${test.viewport.height})</small>
          </div>
          <div class="test-status ${test.passed ? 'status-passed' : 'status-failed'}">
            ${test.passed ? '✅ PASSED' : '❌ FAILED'}
          </div>
        </div>
        <div class="test-content">
          <div class="checks">
            ${Object.entries(test.validations.checks)
              .map(
                ([key, value]) => `
              <div class="check ${value ? 'pass' : 'fail'}">
                ${value ? '✅' : '❌'} ${key}
              </div>
            `,
              )
              .join('')}
          </div>
          ${
            test.validations.warnings.length > 0
              ? `
            <div style="margin-top: 10px; padding: 10px; background: #fef3c7; border-radius: 4px;">
              <strong>Advertencias:</strong><br>
              ${test.validations.warnings.map((w) => `<small>${w}</small><br>`).join('')}
            </div>
          `
              : ''
          }
        </div>
      </div>
    `,
      )
      .join('')}
  </div>
</body>
</html>
  `;

  fs.writeFileSync(reportPath, html);
  console.log(`\n📄 Reporte guardado: ${reportPath}`);
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runCrossBrowserTests().catch(console.error);
}

module.exports = { runCrossBrowserTests };
