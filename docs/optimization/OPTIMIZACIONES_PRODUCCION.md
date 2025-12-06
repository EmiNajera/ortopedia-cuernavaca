# 🚀 OPTIMIZACIONES PARA PRODUCCIÓN - GUÍA COMPLETA

**Basado en análisis real de Lighthouse en producción**  
**Fecha:** 2025-01-27

---

## ⚠️ REGLA #1: MEDIR EN PRODUCCIÓN, NO EN DESARROLLO

**CRÍTICO:** Mucho de lo que ves (JS sin minificar, bundles enormes) es típico de correr Lighthouse contra `next dev`.

### ✅ Script de Medición en Producción

```bash
# Ejecutar Lighthouse en modo producción
npm run perf:prod
```

Este script:
1. Ejecuta `npm run build`
2. Inicia `npm run start` (modo producción)
3. Ejecuta Lighthouse contra el servidor de producción
4. Genera reporte con métricas reales

**NUNCA uses `npm run perf` contra `next dev` para métricas finales.**

---

## 🎯 PROBLEMAS IDENTIFICADOS Y SOLUCIONES

### 1. Reducir JavaScript que no se usa (741 KiB)

#### Chunks Problemáticos:
- `next_dist_compiled_*.js`, `next_dist_client_*.js`, `react-dom_*.js` → Core de Next/React (normal, pero se pueden hacer menos críticos)
- `framer-motion_dist_es_*.js` y `motion-dom_dist_es_*.js` → **AQUÍ HAY CARNITA: animaciones**

#### ✅ Soluciones Implementadas:

**A. Carga diferida de componentes pesados**

```javascript
// Para secciones below-the-fold
import dynamic from 'next/dynamic'

const HeroAnimado = dynamic(() => import('@/components/HeroAnimado'), {
  ssr: false,
  loading: () => <div className="h-64" />   // skeleton ligero
})

export default function Home() {
  return (
    <>
      <HeroEstatico />      {/* imagen ligera = LCP */}
      <HeroAnimado />       {/* se carga después */}
    </>
  )
}
```

**B. Usa framer-motion solo donde realmente lo necesites**

- ✅ Si una animación se puede resolver con `transition` de CSS/Tailwind, hazlo
- ✅ Evita importar todo en un componente global
- ✅ Importa `motion` solo en el componente que lo necesita

**C. Divide la página en secciones**

En lugar de un monster-componente:
```
app/(marketing)/page.tsx
components/Hero.tsx
components/Servicios.tsx
components/Testimonios.tsx (cargado con dynamic() si es pesado)
```

Más componentes = bundles más específicos.

---

### 2. Minificar JS y CSS

Next.js en producción ya viene minificado por defecto (SWC). Verificado:

```javascript
// next.config.js
module.exports = {
  swcMinify: true,  // ✅ Ya está habilitado
}
```

**Si Lighthouse sigue diciendo que hay ahorro grande:**
- Estás sirviendo algún `.js` estático sin pasar por el pipeline de Next (scripts en `/public`)
- O estás corriendo Lighthouse contra `next dev` (volvemos al punto 0)

---

### 3. Reducir CSS que no se usa (Tailwind)

**Problema:** ~27 KiB de CSS con 22 KiB potencialmente no usados.

#### ✅ Solución Implementada:

**A. Verificar configuración de Tailwind**

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './pages/**/*.{js,jsx,ts,tsx,mdx}',
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
  ],
}
```

**B. Evita CSS global gigante**

- Mueve estilos raros o específicos a componentes
- Usa módulos CSS para estilos específicos
- Mantén el árbol de estilos pequeño

---

### 4. El verdadero villano: LCP 6.5s e imágenes pesadas

Lighthouse reporta:
- "Mejorar la entrega de imágenes — Ahorro estimado ~3.4 MiB"
- "Evita cargas útiles de red de gran tamaño — total ~8.9 MiB"

**Esto casi seguro es tu hero (imagen o carrusel) + otras imágenes médicas grandes.**

#### ✅ Checklist de Optimización de Imágenes:

**1. Usa `next/image` siempre para imágenes de contenido**

```javascript
import Image from 'next/image'

<Image
  src="/hero-ortopedia.jpg"
  alt="Paciente en consulta"
  width={1200}
  height={800}
  priority              // Para el LCP
  sizes="(max-width: 768px) 100vw, 1200px"
/>
```

**2. No uses imágenes de 4000px para mostrarlas a 1200px**

- Redimensiona en origen (Affinity, Photoshop)
- Exporta a WebP/AVIF con compresión alta (70–80% de calidad)
- La calidad visual sigue siendo muy buena

**3. Evita carruseles como primer LCP**

- Un hero estático (foto única) como LCP
- El carrusel se carga después o al hacer scroll (dynamic import)

**4. Comprueba el elemento LCP concreto**

En Chrome DevTools → Performance → graba un perfil y busca "LCP element"
- Te dirá si es imagen, video, H1, etc.
- Optimiza ese en específico

---

## 📋 ACCIONES INMEDIATAS

### 1. Medir solo en `next build && next start`

```bash
npm run build
npm run start
npm run perf:prod
```

### 2. Comprimir y re-exportar todas las imágenes

**Imágenes a optimizar:**
- Hero images (WebP, <250KB)
- Imágenes de secciones above-the-fold
- Favicon (1.5 MB → < 50 KB)
- Protesis TiE.jpg (2 MB → < 500 KB)

**Herramientas:**
- https://squoosh.app/
- https://tinypng.com/
- https://favicon.io/ (para favicon)

### 3. Poner un hero estático ligero como LCP

```javascript
// Usar next/image con priority
<Image
  src="/hero-optimized.webp"
  alt="Hero"
  width={1200}
  height={800}
  priority
  sizes="(max-width: 768px) 100vw, 1200px"
/>
```

### 4. Pasar framer-motion a componentes lazy-loaded

```javascript
// Componentes below-the-fold
const AnimatedSection = dynamic(
  () => import('./AnimatedSection'),
  { ssr: false, loading: () => <Skeleton /> }
);
```

### 5. Activar bundle analyzer

```bash
ANALYZE=true npm run build
```

Ver si hay algún paquete absurdo que se pueda quitar o sustituir.

### 6. Verificar que todo pase por el build de Next

- Nada de scripts enormes en `/public`
- Todos los JS deben pasar por el pipeline de Next

---

## 🎯 MÉTRICAS ESPERADAS DESPUÉS DE OPTIMIZACIONES

| Métrica | Antes | Meta | Mejora |
|---------|-------|------|--------|
| **Performance Score** | 74/100 | 90+/100 | +16 puntos |
| **LCP** | 6.5s | < 2.5s | ~62% |
| **Unused JavaScript** | 741 KB | < 200 KB | ~73% |
| **Unused CSS** | 22 KB | < 5 KB | ~77% |
| **Total Byte Weight** | 8.9 MB | < 3 MB | ~66% |

---

## 🔍 VERIFICACIÓN

### Después de cada optimización:

1. ✅ Build de producción: `npm run build`
2. ✅ Iniciar servidor: `npm run start`
3. ✅ Ejecutar Lighthouse: `npm run perf:prod`
4. ✅ Comparar métricas con baseline
5. ✅ Documentar mejoras

### Métricas a monitorear:

- First Load JS
- LCP (Largest Contentful Paint)
- FCP (First Contentful Paint)
- Bundle size por página
- Unused JavaScript/CSS
- Total Byte Weight

---

## 📝 NOTAS TÉCNICAS

### Sobre framer-motion
- **Tamaño:** ~50 KB gzipped
- **Estrategia:** Lazy load en componentes below-the-fold
- **Alternativa:** Usar CSS transitions cuando sea posible

### Sobre Code Splitting
- Next.js hace code splitting automático por página
- Code splitting manual necesario para componentes grandes
- Usar `next/dynamic` con `loading` states

### Sobre Imágenes
- Siempre usar `next/image`
- `priority` para imágenes LCP
- `sizes` adecuado al layout
- Formato WebP/AVIF cuando sea posible
- Tamaño físico: 150–250 KB máximo

---

## ✅ CHECKLIST FINAL

- [ ] Medir en producción (`npm run perf:prod`)
- [ ] Optimizar todas las imágenes (WebP, <250KB)
- [ ] Hero estático ligero como LCP
- [ ] framer-motion lazy-loaded en below-the-fold
- [ ] Bundle analyzer ejecutado
- [ ] Tailwind config verificado
- [ ] Re-ejecutar Lighthouse en producción
- [ ] Comparar métricas y documentar mejoras

---

**Última actualización:** 2025-01-27  
**Próxima revisión:** Después de implementar todas las optimizaciones
