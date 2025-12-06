# 🔍 Guía para Ejecutar Lighthouse

## Problema: Chrome no encontrado

Si recibes el error `ChromeNotInstalledError`, aquí tienes varias soluciones:

---

## ✅ Solución 1: Instalar Chrome o Edge

**Opción A: Google Chrome**
1. Descarga Chrome desde: https://www.google.com/chrome/
2. Instálalo
3. Ejecuta nuevamente: `npm run perf`

**Opción B: Microsoft Edge** (Ya viene con Windows)
- Edge es compatible con Lighthouse
- El script ahora detecta Edge automáticamente

---

## ✅ Solución 2: Lighthouse Manual en Chrome DevTools (Recomendado)

Esta es la forma más fácil y visual:

### Pasos:

1. **Inicia el servidor de producción:**
   ```bash
   npm run build
   npm run start
   ```
   El servidor estará en `http://localhost:3000`

2. **Abre Chrome y navega a tu sitio:**
   - Abre Chrome
   - Ve a `http://localhost:3000`

3. **Abre Chrome DevTools:**
   - Presiona `F12` o `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - O clic derecho > "Inspeccionar"

4. **Ve a la pestaña Lighthouse:**
   - En DevTools, busca la pestaña "Lighthouse"
   - Si no la ves, haz clic en `>>` para ver más pestañas

5. **Configura Lighthouse:**
   - Selecciona las categorías que quieres auditar:
     - ✅ Performance
     - ✅ Accessibility
     - ✅ Best Practices
     - ✅ SEO
   - Selecciona "Desktop" o "Mobile"
   - Haz clic en "Generate report"

6. **Revisa los resultados:**
   - Lighthouse generará un reporte completo
   - Puedes ver los scores y recomendaciones
   - Puedes exportar el reporte (botón "Export")

### Páginas a auditar:

- `/` (Home)
- `/nosotros`
- `/servicios`
- `/blog`
- `/contacto`

---

## ✅ Solución 3: Lighthouse CLI (Si tienes Chrome instalado)

Si Chrome está instalado pero el script no lo encuentra:

1. **Inicia el servidor:**
   ```bash
   npm run build
   npm run start
   ```

2. **Ejecuta Lighthouse CLI manualmente:**
   ```bash
   npx lighthouse http://localhost:3000 --view
   ```

   Para múltiples páginas:
   ```bash
   npx lighthouse http://localhost:3000 --view
   npx lighthouse http://localhost:3000/nosotros --view
   npx lighthouse http://localhost:3000/servicios --view
   npx lighthouse http://localhost:3000/blog --view
   npx lighthouse http://localhost:3000/contacto --view
   ```

---

## ✅ Solución 4: PageSpeed Insights (Online)

Para auditar el sitio en producción:

1. **Despliega el sitio**
2. **Ve a:** https://pagespeed.web.dev/
3. **Ingresa la URL de tu sitio**
4. **Haz clic en "Analyze"**

**Ventajas:**
- No requiere instalación
- Usa servidores de Google (más realista)
- Puedes auditar el sitio en producción

---

## ✅ Solución 5: Mejorar el Script (Ya implementado)

El script ahora intenta detectar Chrome/Edge automáticamente en Windows. Si aún falla:

1. **Especifica la ruta de Chrome manualmente:**
   ```bash
   # En PowerShell
   $env:CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
   npm run perf
   ```

2. **O edita el script** `scripts/perf/run-lh.js` y agrega tu ruta de Chrome

---

## 📊 Métricas a Verificar

### Performance
- **Meta:** > 85/100
- **LCP:** < 2.5s
- **FID/INP:** < 100ms
- **CLS:** < 0.1

### Accessibility
- **Meta:** > 90/100
- Contraste de colores
- ARIA labels
- Navegación con teclado

### Best Practices
- **Meta:** > 85/100
- HTTPS
- Console errors
- Security headers

### SEO
- **Meta:** > 90/100
- Meta tags
- Structured data
- Sitemap

---

## 🎯 Recomendación

**Para desarrollo local:**
- Usa **Solución 2** (Lighthouse en Chrome DevTools)
- Es la más fácil y visual
- No requiere configuración adicional

**Para producción:**
- Usa **Solución 4** (PageSpeed Insights)
- Más realista (usa servidores de Google)
- Puedes compartir los resultados fácilmente

---

## 📝 Notas

- El script `npm run perf` requiere Chrome/Edge instalado
- Si no tienes Chrome, usa las soluciones alternativas
- Los reportes de Lighthouse se guardan en `perf-reports/` cuando usas el script
- Lighthouse en DevTools es la opción más accesible

---

**Última actualización:** 2025-01-27

