#!/usr/bin/env node
/**
 * Script para ejecutar Jest desde el directorio correcto
 * Soluciona problemas con caracteres especiales en el nombre del directorio
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Obtener el directorio del proyecto (donde está este script)
const projectRoot = path.resolve(__dirname, '..');
const configPath = path.join(projectRoot, 'jest.config.js');

// Verificar que el archivo de configuración existe
if (!fs.existsSync(configPath)) {
  console.error(`Error: jest.config.js no encontrado en ${configPath}`);
  process.exit(1);
}

// Cambiar al directorio del proyecto
process.chdir(projectRoot);

// Obtener argumentos adicionales (todo después de 'test.js')
const additionalArgs = process.argv.slice(2);

try {
  // Ejecutar Jest usando spawn para mejor manejo de argumentos y caracteres especiales
  // En Windows, necesitamos usar shell: true para que npx esté en el PATH
  const isWindows = process.platform === 'win32';
  const jestProcess = spawn('npx', ['jest', ...additionalArgs], {
    stdio: 'inherit',
    cwd: projectRoot,
    env: process.env,
    shell: isWindows, // Usar shell en Windows para encontrar npx
    windowsHide: true,
  });

  jestProcess.on('exit', (code) => {
    process.exit(code || 0);
  });

  jestProcess.on('error', (error) => {
    console.error('Error ejecutando Jest:', error);
    process.exit(1);
  });
} catch (error) {
  // Error al ejecutar Jest
  console.error('Error:', error);
  process.exit(1);
}
