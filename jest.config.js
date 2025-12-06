const path = require('path');

// Obtener el directorio raíz del proyecto
const rootDir = path.resolve(__dirname);

module.exports = {
  rootDir: rootDir,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [path.join(rootDir, 'jest.setup.js')],

  // Solo ejecutar tests del directorio __tests__ del proyecto actual
  testMatch: ['<rootDir>/__tests__/**/*.test.{js,jsx}'],

  // Mejorar patrones de exclusión para evitar tests de otros proyectos
  testPathIgnorePatterns: [
    '/node_modules/',
    '/\\.next/',
    '/dist/',
    '/Documentacion_Interna/',
    // Excluir otros proyectos por nombre de carpeta (usar regex)
    '.*CDS.*',
    '.*UI Sistema.*',
    '.*Dreams.*',
    '.*Local Sites.*',
    // Excluir extensiones y configuraciones
    '/\\.vscode/',
    '/\\.cursor/',
  ],

  // Limitar roots solo al proyecto actual
  roots: [rootDir],

  // Configurar SWC para transformar ES modules y JSX - FORZAR USO DE SWC
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      require.resolve('@swc/jest'),
      {
        jsc: {
          parser: {
            syntax: 'ecmascript',
            jsx: true,
            decorators: false,
            dynamicImport: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
          target: 'es2017',
        },
        module: {
          type: 'commonjs',
        },
      },
    ],
  },

  // Mapeo de módulos (mantener compatibilidad con Next.js)
  moduleNameMapper: {
    // CSS modules
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',

    // Next.js specific
    '^next/head$': path.join(rootDir, 'test-utils', 'HeadMock.js'),
    '^next/router$': path.join(rootDir, 'jest.setup.js'), // Mocked in jest.setup.js

    // React Router compatibility
    '^react-router-dom$': path.join(rootDir, 'src', 'utils', 'routerCompat.js'),

    // Path aliases (compatibles con Next.js)
    '^@components/(.*)$': path.join(rootDir, 'src', 'components', '$1'),
    '^@utils/(.*)$': path.join(rootDir, 'src', 'utils', '$1'),
    '^@hooks/(.*)$': path.join(rootDir, 'src', 'hooks', '$1'),
    '^@data/(.*)$': path.join(rootDir, 'src', 'data', '$1'),
    '^@lib/(.*)$': path.join(rootDir, 'src', 'lib', '$1'),
    '^@features/(.*)$': path.join(rootDir, 'src', 'features', '$1'),
    '^@domains/(.*)$': path.join(rootDir, 'src', 'domains', '$1'),
    '^@shared/(.*)$': path.join(rootDir, 'src', 'shared', '$1'),
    '^@layouts/(.*)$': path.join(rootDir, 'src', 'layouts', '$1'),
    '^@registry/(.*)$': path.join(rootDir, 'src', 'registry', '$1'),
    '^@/(.*)$': path.join(rootDir, 'src', '$1'),
  },

  // Patrones a ignorar en transformación
  transformIgnorePatterns: ['/node_modules/(?!(@swc))', '^.+\\.module\\.(css|sass|scss)$'],

  // Extensiones de archivo a procesar
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  // Configuración adicional para Next.js
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
