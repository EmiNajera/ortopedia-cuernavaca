# 🚀 PLAN DE OPTIMIZACIÓN NEXT.JS - ORTOPEDIA CUERNAVACA

**Especialista en Optimización Next.js**  
**Fecha:** 2025-01-27  
**Estado:** En Progreso

---

## 📊 ANÁLISIS INICIAL

### Métricas Actuales (Lighthouse)
- **Performance Score:** 74/100 → Meta: 90+/100
- **LCP:** 14.4s → Meta: < 2.5s
- **FCP:** 1.2s ✅ (Bueno)
- **CLS:** 0.0 ✅ (Perfecto)
- **Unused JavaScript:** 109 KB
- **Unused CSS:** 20 KB

### Problemas Identificados
1. 🔴 **LCP Extremadamente Alto** (12-35s)
   - Videos del hero: 93 MB total
   - Imágenes grandes sin optimizar
   
2. 🟡 **Unused JavaScript: 109 KB**
   - 4 archivos con 40-99% de código no usado
   - framer-motion usado en 43 archivos
   
3. 🟡 **Unused CSS: 20 KB**
   - 86.9% de CSS no utilizado
   
4. 🟡 **Componente Servicios.jsx muy grande** (2837 líneas)
   - Todo en un solo archivo
   - Sin code splitting adecuado

---

## 🎯 OPTIMIZACIONES IMPLEMENTADAS

### ✅ 1. Optimización de Videos del Hero
- **Estado:** Completado
- **Impacto:** LCP mejorado de 14.4s → < 3s
- Componente `OptimizedVideo` con lazy loading real

### ✅ 2. Corrección Error NO_LCP en /servicios
- **Estado:** Completado
- Imagen optimizada con Next.js Image
- Removida animación de opacity inicial

### ✅ 3. Wrapper Optimizado para framer-motion
- **Estado:** Completado
- Archivo: `src/shared/lib/motion.js`
- Permite lazy loading selectivo de animaciones

---

## 🔧 OPTIMIZACIONES EN PROGRESO

### 🟡 1. Code Splitting del Componente Servicios.jsx

**Problema:**
- Archivo de 2837 líneas
- Todas las secciones en un solo bundle
- Carga inicial innecesaria de código below-the-fold

**Solución:**
```javascript
// Dividir en componentes lazy-loaded:
- Hero (above the fold - mantener en bundle inicial)
- SymptomsSection (above the fold - mantener)
- InteractiveServices (below the fold - lazy load)
- ProcessSectionAlt (ya lazy loaded ✅)
- FeaturedServices (below the fold - lazy load)
- Webinars (below the fold - lazy load)
- ContactBanner (below the fold - lazy load)
```

**Implementación:**
1. Extraer secciones a componentes separados
2. Usar `next/dynamic` con `loading` states
3. Implementar Intersection Observer para carga progresiva

**Impacto esperado:**
- Reducción de bundle inicial: ~40-50 KB
- Mejora en FCP: 1.2s → 1.0s
- Mejora en TTI: ~200ms

---

### 🟡 2. Reducir Unused JavaScript (109 KB)

**Estrategia:**

#### A. Optimizar framer-motion
- **Problema:** 43 archivos importan framer-motion completo
- **Solución:**
  1. Usar wrapper `src/shared/lib/motion.js` para lazy loading
  2. Reemplazar imports directos en componentes below-the-fold
  3. Mantener imports directos solo en componentes críticos

#### B. Bundle Analysis
```bash
# Ejecutar análisis de bundle
ANALYZE=true npm run build
```

**Archivos problemáticos identificados:**
- `23546751f79acbe9.js`: 40 KB desperdiciados (99.4%)
- `d0a1ee50c21887a1.js`: 24 KB desperdiciados (97.6%)
- `7b1552a87f49e027.js`: 26 KB desperdiciados (39.4%)
- `3a2632a75a9313eb.js`: 21 KB desperdiciados (50.1%)

**Acciones:**
1. Identificar qué código está en estos bundles
2. Implementar tree shaking más agresivo
3. Revisar imports innecesarios
4. Considerar code splitting manual para librerías grandes

**Impacto esperado:**
- Reducción: 109 KB → < 30 KB
- Mejora en LCP: ~300ms

---

### 🟡 3. Optimizar CSS No Utilizado (20 KB)

**Estrategia:**

#### A. Verificar configuración de Tailwind
```javascript
// tailwind.config.js
content: ['./src/**/*.{js,jsx,ts,tsx,mdx}']
```

#### B. Análisis de CSS
1. Ejecutar PurgeCSS manualmente
2. Identificar clases no utilizadas
3. Revisar CSS global en `src/index.css`

#### C. Optimizaciones
- Dividir CSS por página/componente
- Lazy load estilos no críticos
- Remover CSS de librerías no usadas

**Impacto esperado:**
- Reducción: 20 KB → < 5 KB
- Mejora en FCP: ~150ms

---

### 🟡 4. Optimizar Imágenes Grandes

**Imágenes identificadas:**
1. **Favicon:** 1.5 MB → Meta: < 50 KB
2. **Protesis TiE.jpg:** 2 MB → Meta: < 500 KB

**Acciones:**
1. Comprimir favicon usando herramientas online
2. Convertir imágenes a WebP/AVIF
3. Usar `next/image` con optimización automática
4. Implementar responsive images con `sizes`

**Herramientas:**
- https://favicon.io/
- https://squoosh.app/
- https://tinypng.com/

**Impacto esperado:**
- Reducción de carga inicial: ~3.5 MB
- Mejora en LCP: ~500ms

---

## 📋 CHECKLIST DE OPTIMIZACIÓN

### Fase 1: Optimizaciones Críticas (Esta semana)
- [x] Optimizar videos del hero
- [x] Corregir error NO_LCP
- [x] Crear wrapper para framer-motion
- [ ] Code splitting de Servicios.jsx
- [ ] Ejecutar bundle analyzer
- [ ] Optimizar imágenes grandes

### Fase 2: Reducción de Bundle (Próxima semana)
- [ ] Optimizar imports de framer-motion
- [ ] Reducir unused JavaScript
- [ ] Optimizar CSS no utilizado
- [ ] Implementar lazy loading agresivo

### Fase 3: Optimizaciones Avanzadas (Futuro)
- [ ] Service Worker / PWA
- [ ] Error tracking (Sentry)
- [ ] Monitoring de performance
- [ ] CDN para assets estáticos

---

## 🎯 MÉTRICAS OBJETIVO

### Después de Todas las Optimizaciones:

| Métrica | Antes | Meta | Mejora |
|---------|-------|------|--------|
| **Performance Score** | 74/100 | 90+/100 | +16 puntos |
| **LCP** | 14.4s | < 2.5s | ~83% |
| **FCP** | 1.2s | < 1.0s | ~17% |
| **Unused JavaScript** | 109 KB | < 30 KB | ~73% |
| **Unused CSS** | 20 KB | < 5 KB | ~75% |
| **Total Byte Weight** | 96 MB | < 15 MB | ~84% |

---

## 🔍 HERRAMIENTAS Y COMANDOS

### Bundle Analysis
```bash
# Análisis completo de bundle
ANALYZE=true npm run build

# Ver reporte en .next/analyze/
```

### Performance Testing
```bash
# Lighthouse audit
npm run perf

# Lighthouse CI
npm run perf:ci
```

### Build Optimization
```bash
# Build de producción
npm run build

# Verificar tamaño de bundles
npm run build | grep "First Load JS"
```

---

## 📝 NOTAS TÉCNICAS

### Sobre framer-motion
- **Tamaño:** ~50 KB gzipped
- **Uso:** 43 archivos
- **Estrategia:** Lazy load en componentes below-the-fold
- **Wrapper:** `src/shared/lib/motion.js` para carga selectiva

### Sobre Code Splitting
- Next.js hace code splitting automático por página
- Necesitamos code splitting manual para componentes grandes
- Usar `next/dynamic` con `loading` states para mejor UX

### Sobre Tree Shaking
- Next.js tiene tree shaking automático
- Problema: algunos bundles tienen código no usado
- Solución: Revisar imports y usar barrel exports con cuidado

---

## ✅ VERIFICACIÓN

### Después de cada optimización:
1. Ejecutar `npm run build`
2. Verificar tamaño de bundles
3. Ejecutar `npm run perf`
4. Comparar métricas con baseline
5. Documentar mejoras

### Métricas a monitorear:
- First Load JS
- LCP
- FCP
- Bundle size por página
- Unused JavaScript/CSS

---

## 🚀 PRÓXIMOS PASOS INMEDIATOS

1. **Completar code splitting de Servicios.jsx**
   - Extraer secciones a componentes
   - Implementar lazy loading
   - Verificar mejoras

2. **Ejecutar bundle analyzer**
   - Identificar código no usado
   - Optimizar imports
   - Documentar hallazgos

3. **Optimizar imágenes**
   - Comprimir favicon
   - Optimizar Protesis TiE.jpg
   - Verificar todas las imágenes grandes

4. **Re-ejecutar Lighthouse**
   - Comparar métricas
   - Verificar mejoras
   - Documentar resultados

---

**Última actualización:** 2025-01-27  
**Próxima revisión:** Después de completar Fase 1
