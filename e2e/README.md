# Tests End-to-End (E2E) con Playwright

Este directorio contiene los tests E2E para la aplicación, utilizando Playwright para probar los flujos completos de usuario en navegadores reales.

## Configuración

Los tests están configurados en `playwright.config.js` en la raíz del proyecto.

### Navegadores Soportados

- **Chromium** (Chrome/Edge)
- **Firefox**
- **WebKit** (Safari)
- **Mobile Chrome** (Pixel 5)
- **Mobile Safari** (iPhone 12)

## Ejecutar Tests

### Todos los tests
```bash
npm run test:e2e
```

### Con interfaz gráfica (recomendado para desarrollo)
```bash
npm run test:e2e:ui
```

### En modo headed (ver el navegador)
```bash
npm run test:e2e:headed
```

### Modo debug
```bash
npm run test:e2e:debug
```

### Ejecutar un archivo específico
```bash
npx playwright test e2e/navigation.spec.js
```

### Ejecutar en un navegador específico
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Estructura de Tests

### `navigation.spec.js`
Tests de navegación entre páginas:
- Navegación Home → Servicios → Citas
- Navegación a Contacto, Blog, Tienda
- Verificación de enlaces del logo

### `store-flow.spec.js`
Tests del flujo de tienda:
- Búsqueda de productos
- Filtrado por categorías
- Navegación a páginas de producto
- Agregar al carrito
- Wishlist

### `contact-form.spec.js`
Tests del formulario de contacto:
- Renderizado del formulario
- Validación de campos
- Envío del formulario
- Integración con WhatsApp

### `appointment-flow.spec.js`
Tests del flujo de citas:
- Selección de servicio
- Selección de fecha y hora
- Llenado de información personal
- Confirmación de cita

### `blog-flow.spec.js`
Tests del flujo de blog:
- Listado de artículos
- Navegación a artículos individuales
- Visualización de contenido
- Metadatos de artículos

## Configuración del Servidor

Los tests inician automáticamente el servidor de desarrollo (`npm run dev`) antes de ejecutarse. El servidor debe estar disponible en `http://localhost:3000`.

Para cambiar la URL base, configura la variable de entorno:
```bash
PLAYWRIGHT_TEST_BASE_URL=http://localhost:3005 npm run test:e2e
```

## Reportes

Después de ejecutar los tests, se genera un reporte HTML en `playwright-report/`. Para verlo:

```bash
npx playwright show-report
```

## Screenshots y Videos

Los screenshots se capturan automáticamente cuando un test falla. Los videos se pueden habilitar en `playwright.config.js`.

## Troubleshooting

### El servidor no inicia
Asegúrate de que el puerto 3000 esté disponible o cambia la configuración en `playwright.config.js`.

### Tests fallan por timeouts
Aumenta el timeout en `playwright.config.js` o en los tests individuales usando `test.setTimeout()`.

### Navegadores no se instalan
Ejecuta:
```bash
npx playwright install --with-deps
```

## Mejores Prácticas

1. **Usar selectores estables**: Preferir `data-testid` o roles ARIA sobre selectores CSS frágiles
2. **Esperar elementos**: Usar `waitForSelector` o `expect().toBeVisible()` antes de interactuar
3. **Aislar tests**: Cada test debe ser independiente y poder ejecutarse solo
4. **Limpiar después**: Usar `test.afterEach()` para limpiar estado si es necesario

## CI/CD

Para ejecutar en CI, usa:
```bash
npm run test:e2e
```

Los tests se ejecutan en modo headless por defecto en CI.

