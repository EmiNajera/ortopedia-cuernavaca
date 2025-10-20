#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Páginas que usan MarketingLayout
const filesToFix = [
  'src/pages/index.jsx',
  'src/pages/home/Home.jsx',
  'src/pages/services/Servicios.jsx',
  'src/pages/home/Nosotros.jsx',
  'src/pages/home/Contacto.jsx',
  'src/pages/home/Citas.jsx',
  'src/pages/blog/index.jsx',
];

filesToFix.forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ No existe: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;

  // 1. Cambiar el import de MarketingLayout a solo para la re-export
  // No vamos a eliminar el import, lo dejaremos para la re-export al final

  // 2. Reemplazar <MarketingLayout> con solo <> (Fragment)
  //    y agregar getLayout al final
  content = content.replace(/^(\s*)<MarketingLayout>$/m, '<>');
  content = content.replace(/^(\s*)<\/MarketingLayout>$/m, '</>');

  // 3. Agregar el getLayout y exportación al final
  // Primero encontrar dónde termina la función
  const exportMatch = content.match(
    /^export default function\s+(\w+)\([^)]*\)\s*{([\s\S]*?)^}\s*$/m,
  );

  if (exportMatch) {
    const functionName = exportMatch[1];
    const functionBody = exportMatch[2];

    // Reemplazar la exportación con getLayout
    content = content.replace(
      /^export default function\s+\w+\([^)]*\)\s*{([\s\S]*?)^}(\s*)$/m,
      `function ${functionName}Page(props) {$1}

${functionName}Page.getLayout = (page) => {
  // Importar aquí para evitar ciclos
  const MarketingLayout = require('../../components/layout/MarketingLayout').default;
  return <MarketingLayout>{page}</MarketingLayout>;
};

export default ${functionName}Page;$2`,
    );
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Arreglado: ${file}`);
  } else {
    console.log(`⚠️  Sin cambios: ${file}`);
  }
});

console.log('\n✅ Proceso completado');
