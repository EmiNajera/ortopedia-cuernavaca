// Script de análisis de rendimiento para OrtoTech
const fs = require('fs');
const path = require('path');

// Análisis de bundle size
function analyzeBundleSize() {
  const buildDir = path.join(__dirname, '.next', 'static', 'chunks');

  if (!fs.existsSync(buildDir)) {
    console.log('❌ No se encontró el directorio de build');
    return;
  }

  const files = fs.readdirSync(buildDir);
  let totalSize = 0;
  const fileSizes = [];

  files.forEach((file) => {
    const filePath = path.join(buildDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    totalSize += stats.size;
    fileSizes.push({
      file,
      size: sizeKB + ' KB',
      sizeBytes: stats.size,
    });
  });

  fileSizes.sort((a, b) => b.sizeBytes - a.sizeBytes);

  console.log('\n📊 ANÁLISIS DE BUNDLE SIZE');
  console.log('========================');
  console.log(`Total de archivos: ${files.length}`);
  console.log(`Tamaño total: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log('\nArchivos más grandes:');

  fileSizes.slice(0, 10).forEach((file, index) => {
    console.log(`${index + 1}. ${file.file}: ${file.size}`);
  });

  return {
    totalFiles: files.length,
    totalSizeKB: (totalSize / 1024).toFixed(2),
    largestFiles: fileSizes.slice(0, 5),
  };
}

// Análisis de páginas
function analyzePages() {
  const pagesDir = path.join(__dirname, 'pages');
  const srcPagesDir = path.join(__dirname, 'src', 'pages');

  const pages = [];

  function scanDirectory(dir, prefix = '') {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);
    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath, prefix + item + '/');
      } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n').length;
        const size = (stat.size / 1024).toFixed(2);

        pages.push({
          path: prefix + item,
          lines,
          size: size + ' KB',
          isDynamic: item.startsWith('[') || item.includes('['),
        });
      }
    });
  }

  scanDirectory(pagesDir);
  scanDirectory(srcPagesDir, 'src/');

  pages.sort((a, b) => b.lines - a.lines);

  console.log('\n📄 ANÁLISIS DE PÁGINAS');
  console.log('=====================');
  console.log(`Total de páginas: ${pages.length}`);

  const staticPages = pages.filter((p) => !p.isDynamic);
  const dynamicPages = pages.filter((p) => p.isDynamic);

  console.log(`Páginas estáticas: ${staticPages.length}`);
  console.log(`Páginas dinámicas: ${dynamicPages.length}`);

  console.log('\nPáginas más grandes:');
  pages.slice(0, 10).forEach((page, index) => {
    const type = page.isDynamic ? '🔄' : '📄';
    console.log(`${index + 1}. ${type} ${page.path}: ${page.lines} líneas, ${page.size}`);
  });

  return {
    totalPages: pages.length,
    staticPages: staticPages.length,
    dynamicPages: dynamicPages.length,
    largestPages: pages.slice(0, 5),
  };
}

// Análisis de dependencias
function analyzeDependencies() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});

  console.log('\n📦 ANÁLISIS DE DEPENDENCIAS');
  console.log('=========================');
  console.log(`Dependencias de producción: ${dependencies.length}`);
  console.log(`Dependencias de desarrollo: ${devDependencies.length}`);

  // Identificar dependencias pesadas
  const heavyDeps = [
    'react',
    'next',
    'framer-motion',
    '@next/mdx',
    'react-dom',
    'react-icons',
    'lucide-react',
  ];

  const foundHeavy = dependencies.filter((dep) => heavyDeps.includes(dep));
  console.log('\nDependencias pesadas encontradas:');
  foundHeavy.forEach((dep) => console.log(`- ${dep}`));

  return {
    totalDeps: dependencies.length + devDependencies.length,
    prodDeps: dependencies.length,
    devDeps: devDependencies.length,
    heavyDeps: foundHeavy,
  };
}

// Generar reporte completo
function generateReport() {
  console.log('🚀 ANÁLISIS DE RENDIMIENTO - ORTOTECH');
  console.log('=====================================');

  const bundleAnalysis = analyzeBundleSize();
  const pagesAnalysis = analyzePages();
  const depsAnalysis = analyzeDependencies();

  console.log('\n📈 RESUMEN EJECUTIVO');
  console.log('====================');
  console.log(`Bundle total: ${bundleAnalysis.totalSizeKB} KB`);
  console.log(
    `Páginas estáticas: ${pagesAnalysis.staticPages} (${((pagesAnalysis.staticPages / pagesAnalysis.totalPages) * 100).toFixed(1)}%)`,
  );
  console.log(
    `Páginas dinámicas: ${pagesAnalysis.dynamicPages} (${((pagesAnalysis.dynamicPages / pagesAnalysis.totalPages) * 100).toFixed(1)}%)`,
  );
  console.log(`Dependencias: ${depsAnalysis.totalDeps}`);

  // Recomendaciones
  console.log('\n💡 RECOMENDACIONES');
  console.log('==================');

  if (bundleAnalysis.totalSizeKB > 500) {
    console.log('⚠️  Bundle size alto - considerar code splitting');
  }

  if (pagesAnalysis.staticPages > pagesAnalysis.dynamicPages * 2) {
    console.log('✅ Muchas páginas estáticas - candidato perfecto para Astro');
  }

  if (depsAnalysis.heavyDeps.length > 5) {
    console.log('⚠️  Muchas dependencias pesadas - considerar optimización');
  }

  console.log('\n🎯 CONCLUSIÓN');
  console.log('=============');
  const staticRatio = (pagesAnalysis.staticPages / pagesAnalysis.totalPages) * 100;

  if (staticRatio > 70) {
    console.log('✅ EXCELENTE candidato para migración a Astro');
    console.log(`   ${staticRatio.toFixed(1)}% de páginas son estáticas`);
  } else if (staticRatio > 50) {
    console.log('🤔 BUEN candidato para migración híbrida');
    console.log(`   ${staticRatio.toFixed(1)}% de páginas son estáticas`);
  } else {
    console.log('❌ NO recomendado para migración a Astro');
    console.log(`   Solo ${staticRatio.toFixed(1)}% de páginas son estáticas`);
  }
}

// Ejecutar análisis
generateReport();
