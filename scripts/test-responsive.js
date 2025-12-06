#!/usr/bin/env node

/**
 * Script de Testing Responsive
 * Valida que el diseño responsive funcione correctamente en diferentes breakpoints
 */

const puppeteer = require('puppeteer');
const path = require('path');

// Configuración de dispositivos para testing
const devices = {
  mobile: {
    name: 'iPhone 12',
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15',
  },
  mobileLarge: {
    name: 'iPhone 12 Pro Max',
    viewport: { width: 428, height: 926 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15',
  },
  tablet: {
    name: 'iPad',
    viewport: { width: 768, height: 1024 },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15',
  },
  laptop: {
    name: 'Laptop',
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  },
  desktop: {
    name: 'Desktop',
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  },
};

// URLs a testear
const testUrls = [
  'http://localhost:3000',
  'http://localhost:3000/tienda',
  'http://localhost:3000/servicios',
  'http://localhost:3000/nosotros',
  'http://localhost:3000/contacto',
];

/**
 * Función para capturar screenshot de una página
 */
async function captureScreenshot(browser, url, device, outputDir) {
  const page = await browser.newPage();

  try {
    // Configurar viewport y user agent
    await page.setViewport(device.viewport);
    await page.setUserAgent(device.userAgent);

    // Navegar a la URL
    console.log(`📱 Testing ${device.name} - ${url}`);
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Esperar a que las animaciones terminen
    await page.waitForTimeout(2000);

    // Capturar screenshot
    const filename = `${device.name.replace(/\s+/g, '-').toLowerCase()}-${url.split('/').pop() || 'home'}.png`;
    const filepath = path.join(outputDir, filename);

    await page.screenshot({
      path: filepath,
      fullPage: true,
      quality: 80,
    });

    console.log(`✅ Screenshot saved: ${filename}`);

    // Validar elementos responsive
    const responsiveChecks = await validateResponsiveElements(page, device);
    console.log(`📊 Responsive validation:`, responsiveChecks);

    return responsiveChecks;
  } catch (error) {
    console.error(`❌ Error testing ${device.name} - ${url}:`, error.message);
    return { error: error.message };
  } finally {
    await page.close();
  }
}

/**
 * Validar elementos responsive en la página
 */
async function validateResponsiveElements(page, device) {
  const checks = {
    viewport: device.viewport,
    navigation: false,
    grid: false,
    typography: false,
    images: false,
    buttons: false,
  };

  try {
    // Verificar navegación
    const nav = await page.$('nav, header');
    checks.navigation = nav !== null;

    // Verificar grid responsive
    const gridElements = await page.$$('[class*="grid"]');
    checks.grid = gridElements.length > 0;

    // Verificar tipografía responsive
    const textElements = await page.$$('h1, h2, h3, h4, h5, h6, p');
    checks.typography = textElements.length > 0;

    // Verificar imágenes responsive
    const images = await page.$$('img');
    checks.images = images.length > 0;

    // Verificar botones con área táctil adecuada
    const buttons = await page.$$('button, [role="button"]');
    if (buttons.length > 0) {
      const buttonSizes = await page.evaluate(() => {
        const buttons = document.querySelectorAll('button, [role="button"]');
        return Array.from(buttons).map((btn) => {
          const rect = btn.getBoundingClientRect();
          return {
            width: rect.width,
            height: rect.height,
            minSize: Math.min(rect.width, rect.height),
          };
        });
      });

      // Verificar que los botones tengan al menos 44px de área táctil en móvil
      const minTouchSize = device.viewport.width < 768 ? 44 : 32;
      checks.buttons = buttonSizes.every((size) => size.minSize >= minTouchSize);
    }
  } catch (error) {
    console.error('Error validating responsive elements:', error);
  }

  return checks;
}

/**
 * Función principal de testing
 */
async function runResponsiveTests() {
  console.log('🚀 Iniciando tests responsive...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const outputDir = path.join(__dirname, '../test-results/responsive');

  // Crear directorio de resultados
  const fs = require('fs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    devices: {},
  };

  try {
    for (const [deviceKey, device] of Object.entries(devices)) {
      console.log(`\n📱 Testing device: ${device.name}`);
      results.devices[deviceKey] = { name: device.name, tests: [] };

      for (const url of testUrls) {
        results.total++;

        const testResult = await captureScreenshot(browser, url, device, outputDir);

        if (testResult.error) {
          results.failed++;
          results.devices[deviceKey].tests.push({
            url,
            status: 'failed',
            error: testResult.error,
          });
        } else {
          results.passed++;
          results.devices[deviceKey].tests.push({
            url,
            status: 'passed',
            checks: testResult,
          });
        }
      }
    }

    // Generar reporte
    generateReport(results, outputDir);
  } catch (error) {
    console.error('❌ Error during testing:', error);
  } finally {
    await browser.close();
  }

  console.log('\n✅ Testing completed!');
  console.log(`📊 Results: ${results.passed}/${results.total} tests passed`);

  return results;
}

/**
 * Generar reporte de testing
 */
function generateReport(results, outputDir) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.total,
      passed: results.passed,
      failed: results.failed,
      successRate: ((results.passed / results.total) * 100).toFixed(2) + '%',
    },
    devices: results.devices,
  };

  const fs = require('fs');
  const reportPath = path.join(outputDir, 'responsive-test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`📄 Report saved: ${reportPath}`);
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runResponsiveTests().catch(console.error);
}

module.exports = { runResponsiveTests, devices };
