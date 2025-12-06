#!/usr/bin/env node
/*
Run Lighthouse on a set of URLs against a local Next.js production server.
- Builds the app (unless --no-build)
- Starts next start on a free port (default 3002 or via --port)
- Waits for server
- Runs Lighthouse for each URL
- Saves HTML + JSON reports to perf-reports/<timestamp>/
- Fails with code 1 if any score is below thresholds (override via flags)

Usage examples:
  node scripts/perf/run-lh.js
  node scripts/perf/run-lh.js --urls / /tienda /categorias /carrito /servicios
  node scripts/perf/run-lh.js --port 4000 --no-build
  node scripts/perf/run-lh.js --perf 0.8 --access 0.9 --bp 0.9 --seo 0.9
*/

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const chromeLauncher = require('chrome-launcher');
const waitOn = require('wait-on');

// Dynamic import for lighthouse (ESM module)
// Lighthouse v12+ uses ESM, so we need dynamic import
let lighthouseModule;
async function loadLighthouse() {
  if (!lighthouseModule) {
    try {
      // Lighthouse v12+ exports as default
      const mod = await import('lighthouse');
      lighthouseModule = mod.default || mod;
      if (typeof lighthouseModule !== 'function') {
        throw new Error('Lighthouse module is not a function');
      }
    } catch (error) {
      console.error('Error loading lighthouse:', error);
      throw new Error(
        'Failed to load lighthouse module. Make sure lighthouse is installed: npm install lighthouse',
      );
    }
  }
  return lighthouseModule;
}

function parseArgs(argv) {
  const args = {};
  const list = [];
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const [k, v] = a.split('=');
      const key = k.replace(/^--/, '');
      if (['no-build', 'ci'].includes(key)) {
        args[key] = true;
      } else if (['port', 'perf', 'access', 'bp', 'seo'].includes(key)) {
        args[key] = v !== undefined ? v : argv[++i];
      } else if (key === 'urls') {
        // Remaining args treated as URLs until next flag
        const urls = [];
        let j = i + 1;
        while (j < argv.length && !String(argv[j]).startsWith('--')) {
          urls.push(argv[j]);
          j++;
        }
        args.urls = urls;
        i = j - 1;
      }
    } else {
      list.push(a);
    }
  }
  return args;
}

function slugify(s) {
  return (
    s
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || 'root'
  );
}

async function run() {
  const args = parseArgs(process.argv);
  const port = Number(args.port || process.env.PERF_PORT || 3002);
  const shouldBuild = !args['no-build'];
  const urls =
    args.urls && args.urls.length
      ? args.urls
      : ['/', '/tienda', '/categorias', '/carrito', '/servicios', '/contacto'];

  const thresholds = {
    performance: Number(args.perf || 0.8),
    accessibility: Number(args.access || 0.9),
    'best-practices': Number(args.bp || 0.9),
    seo: Number(args.seo || 0.9),
  };

  const projectRoot = process.cwd();
  const reportsRoot = path.join(projectRoot, 'perf-reports');
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outDir = path.join(reportsRoot, stamp);
  fs.mkdirSync(outDir, { recursive: true });

  // Build if needed
  if (shouldBuild) {
    // Use npm script to ensure Windows compatibility
    await runCmd(process.platform === 'win32' ? 'npm' : 'npm', ['run', 'build'], {
      cwd: projectRoot,
      label: 'build',
    });
  }

  // Check if port is in use and find alternative
  let actualPort = port;
  const net = require('net');
  const checkPort = (p) =>
    new Promise((resolve) => {
      const server = net.createServer();
      server.listen(p, () => {
        server.once('close', () => resolve(true));
        server.close();
      });
      server.on('error', () => resolve(false));
    });

  // Try to find available port
  let portAvailable = await checkPort(actualPort);
  if (!portAvailable) {
    console.log(`⚠️  Port ${actualPort} is in use, trying alternative ports...`);
    for (let p = actualPort + 1; p < actualPort + 10; p++) {
      if (await checkPort(p)) {
        actualPort = p;
        console.log(`✅ Using port ${actualPort} instead`);
        break;
      }
    }
    if (actualPort === port) {
      throw new Error(
        `Could not find available port. Please free up port ${port} or kill the process using it.`,
      );
    }
  }

  // Start server
  const serverCmd = `npx next start -p ${actualPort}`;
  const server = spawn(serverCmd, { cwd: projectRoot, stdio: 'inherit', shell: true });

  // Wait for server readiness
  await waitOn({ resources: [`http://localhost:${actualPort}`], timeout: 120000 });

  // Launch Chrome once - Try multiple Chrome/Chromium paths on Windows
  let chrome;
  let chromePath;

  if (process.platform === 'win32') {
    // Common Chrome/Edge paths on Windows
    const possiblePaths = [
      process.env.CHROME_PATH,
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      process.env.LOCALAPPDATA + '\\Microsoft\\Edge\\Application\\msedge.exe',
    ].filter(Boolean);

    // Try to find Chrome/Edge
    for (const path of possiblePaths) {
      try {
        if (fs.existsSync(path)) {
          chromePath = path;
          break;
        }
      } catch (e) {
        // Continue searching
      }
    }
  }

  const chromeOptions = {
    chromeFlags: ['--headless=new', '--no-sandbox'],
  };

  if (chromePath) {
    chromeOptions.chromePath = chromePath;
  }

  try {
    chrome = await chromeLauncher.launch(chromeOptions);
  } catch (error) {
    console.error('\n❌ Error: No se pudo encontrar Chrome o Edge instalado.');
    console.error('\n💡 Soluciones:');
    console.error('   1. Instala Google Chrome o Microsoft Edge');
    console.error('   2. O usa Lighthouse manualmente en Chrome DevTools:');
    console.error('      - Abre Chrome DevTools (F12)');
    console.error('      - Ve a la pestaña "Lighthouse"');
    console.error('      - Selecciona las categorías y haz clic en "Generate report"');
    console.error('   3. O ejecuta el servidor y usa Lighthouse CLI:');
    console.error(`      npm run start`);
    console.error(`      lighthouse http://localhost:3000 --view`);
    console.error('\n📊 Alternativa: Usa Lighthouse en línea en:');
    console.error('   https://pagespeed.web.dev/');
    console.error(`   Ingresa: http://localhost:${actualPort}`);
    throw error;
  }

  const opts = { logLevel: 'info', output: ['html', 'json'], port: chrome.port }; // lighthouse connects to launched Chrome

  const results = [];
  let failed = false;

  // Load lighthouse (must be done after Chrome is launched)
  const lighthouseFn = await loadLighthouse();

  if (typeof lighthouseFn !== 'function') {
    throw new Error('Lighthouse is not a function. Check lighthouse installation.');
  }

  for (const u of urls) {
    const fullUrl = `http://localhost:${actualPort}${u.startsWith('/') ? u : '/' + u}`;
    console.log(`\nRunning Lighthouse for: ${fullUrl}`);

    const runnerResult = await lighthouseFn(fullUrl, opts);
    const reportHtml = runnerResult.report[0];
    const reportJson = runnerResult.report[1];

    const base = slugify(u);
    fs.writeFileSync(path.join(outDir, `${base}.html`), reportHtml);
    fs.writeFileSync(path.join(outDir, `${base}.json`), reportJson);

    const cats = runnerResult.lhr.categories;
    const scores = {
      performance: cats.performance.score,
      accessibility: cats.accessibility?.score,
      'best-practices': cats['best-practices']?.score,
      seo: cats.seo?.score,
    };

    results.push({ url: u, scores });

    // Check thresholds
    for (const [k, v] of Object.entries(thresholds)) {
      const s = scores[k];
      if (typeof s === 'number' && s < v) {
        failed = true;
        console.error(`Threshold failed for ${u} :: ${k} ${s} < ${v}`);
      }
    }
  }

  await chrome.kill();
  server.kill();

  // Write summary
  const summaryPath = path.join(outDir, 'summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify({ thresholds, results }, null, 2));

  console.log(`\nLighthouse reports saved to: ${outDir}`);

  if (failed) {
    console.error('\nOne or more thresholds failed.');
    process.exit(1);
  }
}

function runCmd(cmd, args, { cwd, label } = {}) {
  return new Promise((resolve, reject) => {
    const win = process.platform === 'win32';
    const exe = win ? `${cmd}.cmd` : cmd;
    const fullCmd = [exe, ...(Array.isArray(args) ? args : [])].join(' ');
    const child = spawn(fullCmd, { cwd, stdio: 'inherit', shell: true });
    child.on('exit', (code) => {
      if (code === 0) return resolve();
      reject(new Error(`${label || cmd} exited with code ${code}`));
    });
    child.on('error', reject);
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
