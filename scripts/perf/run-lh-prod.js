/**
 * Script para ejecutar Lighthouse en modo PRODUCCIÓN
 *
 * IMPORTANTE: Este script asegura que se mida en producción (next build + next start)
 * NO en desarrollo (next dev)
 *
 * Uso:
 *   npm run perf:prod
 */

const { spawn } = require('child_process');
const waitOn = require('wait-on');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`;
const OUTPUT_DIR = path.join(__dirname, '../../perf-reports');

// Crear directorio de reportes si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runLighthouse() {
  console.log('🔍 Iniciando auditoría Lighthouse en PRODUCCIÓN...\n');

  // Verificar que estamos en modo producción
  if (process.env.NODE_ENV !== 'production') {
    console.warn('⚠️  ADVERTENCIA: NODE_ENV no está en "production"');
    console.warn('   Asegúrate de ejecutar: NODE_ENV=production npm run start\n');
  }

  let serverProcess;
  let chrome;

  try {
    // 1. Build del proyecto
    console.log('📦 Ejecutando build de producción...');
    await new Promise((resolve, reject) => {
      const build = spawn('npm', ['run', 'build'], {
        stdio: 'inherit',
        shell: true,
      });
      build.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Build falló con código ${code}`));
        } else {
          resolve();
        }
      });
    });

    // 2. Iniciar servidor de producción
    console.log('🚀 Iniciando servidor de producción...');
    serverProcess = spawn('npm', ['run', 'start'], {
      stdio: 'pipe',
      shell: true,
      env: { ...process.env, NODE_ENV: 'production' },
    });

    // Capturar output del servidor
    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Ready') || output.includes('started server')) {
        console.log('✅ Servidor iniciado');
      }
    });

    serverProcess.stderr.on('data', (data) => {
      console.error(`Server error: ${data}`);
    });

    // 3. Esperar a que el servidor esté listo
    console.log(`⏳ Esperando a que el servidor esté disponible en ${URL}...`);
    await waitOn({
      resources: [URL],
      timeout: 60000,
      interval: 1000,
    });

    // 4. Lanzar Chrome
    console.log('🌐 Lanzando Chrome...');
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox'],
    });

    // 5. Ejecutar Lighthouse
    console.log('🔍 Ejecutando Lighthouse...\n');
    const options = {
      logLevel: 'info',
      output: 'html',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    };

    const runnerResult = await lighthouse(URL, options);

    // 6. Guardar reporte
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(OUTPUT_DIR, `lighthouse-prod-${timestamp}.html`);
    fs.writeFileSync(reportPath, runnerResult.report);

    // 7. Mostrar métricas
    const lhr = runnerResult.lhr;
    console.log('\n📊 RESULTADOS DE LIGHTHOUSE (PRODUCCIÓN)\n');
    console.log('═'.repeat(50));
    console.log(`Performance:     ${Math.round(lhr.categories.performance.score * 100)}/100`);
    console.log(`Accessibility:   ${Math.round(lhr.categories.accessibility.score * 100)}/100`);
    console.log(`Best Practices:  ${Math.round(lhr.categories['best-practices'].score * 100)}/100`);
    console.log(`SEO:             ${Math.round(lhr.categories.seo.score * 100)}/100`);
    console.log('═'.repeat(50));

    const metrics = lhr.audits;
    console.log('\n🎯 Core Web Vitals:');
    console.log(`LCP:  ${(metrics['largest-contentful-paint'].numericValue / 1000).toFixed(2)}s`);
    console.log(`FID:  ${metrics['max-potential-fid'].numericValue.toFixed(0)}ms`);
    console.log(`CLS:  ${metrics['cumulative-layout-shift'].numericValue.toFixed(3)}`);
    console.log(`FCP:  ${(metrics['first-contentful-paint'].numericValue / 1000).toFixed(2)}s`);
    console.log(`TBT:  ${metrics['total-blocking-time'].numericValue.toFixed(0)}ms`);

    console.log(`\n📄 Reporte guardado en: ${reportPath}`);
    console.log('\n✅ Auditoría completada\n');
  } catch (error) {
    console.error('❌ Error ejecutando Lighthouse:', error);
    process.exit(1);
  } finally {
    // Limpiar
    if (chrome) {
      await chrome.kill();
    }
    if (serverProcess) {
      serverProcess.kill();
      console.log('🛑 Servidor detenido');
    }
  }
}

runLighthouse();
