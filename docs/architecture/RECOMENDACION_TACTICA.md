# 🎯 RECOMENDACIÓN TÁCTICA - Reorganización por Dominios

**Basado en feedback de evaluación**  
**Fecha:** 2025-01-27

---

## ✅ Lo que está muy bien (mantener)

1. **Separación por dominios** - Marketing, Store, Shared
2. **Diferenciar UI vs lógica de dominio** - Domain hooks separados
3. **Plan de migración por fases** - No "big bang"
4. **Checklist operacional** - Ejecutable paso a paso
5. **Consciencia de Next** - `src/pages/` NO se toca

---

## ⚠️ Ajustes críticos aplicados

### 1. No sobre-fragmentar demasiado pronto

**ANTES (propuesta inicial):**
- `useProductFilters.js`
- `useProductSearch.js`
- `useProductSort.js`

**AHORA (ajustado):**
- `useProductListing.js` - **TODO EN UNO** (filtros + búsqueda + sort)
- Partir después solo si realmente hace falta

**Razón:** Menos archivos = menos fricción al principio

---

### 2. Usar "views" en lugar de "pages" internas

**ANTES (propuesta inicial):**
```
store/pages/tienda.jsx  ← Confuso, parece ruta Next.js
```

**AHORA (ajustado):**
```
store/views/TiendaPage.jsx  ← Vista interna de dominio
```

**En `src/pages/tienda.jsx`:**
```javascript
import { TiendaPage } from '@/store/views/TiendaPage';
export default TiendaPage;
```

**Razón:** Queda claro quién es "entrypoint Next" vs "vista de dominio"

---

### 3. Priorización realista

**Orden de implementación:**

1. ✅ **Marketing exportable primero**
   - No tocar rutas de `pages/`
   - Solo pequeños movimientos de componentes
   - Subir al VPS cuando esté listo

2. ⏳ **Store domain después**
   - Cuando Marketing esté estable
   - Extraer lógica crítica (cart, wishlist, filters)
   - Refactorizar TiendaCompleta

3. ⏳ **Marketing domain al final**
   - Cuando la tienda esté respirando
   - Mover blog, services, etc.

**Razón:** No intentar mover TODO antes de tener cosas en producción

---

### 4. Aliases obligatorios

**Configurar en `jsconfig.json`:**
```json
{
  "compilerOptions": {
    "paths": {
      "@marketing/*": ["src/marketing/*"],
      "@store/*": ["src/store/*"],
      "@shared/*": ["src/shared/*"]
    }
  }
}
```

**Configurar en `next.config.js`:**
```javascript
webpack: (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@marketing': path.resolve(__dirname, 'src/marketing'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@shared': path.resolve(__dirname, 'src/shared'),
  };
  return config;
}
```

**Razón:** Evitar `../../../../` infernales

---

### 5. Tests mínimos

**Si no hay Jest:**
- Crear sandbox simple para probar hooks manualmente
- Usar Storybook para componentes (opcional)
- Verificar que hooks de domain funcionan antes de mover todo

**Razón:** Un fallo silencioso en domain/ rompe toda la tienda

---

## 🚀 Plan de acción inmediato

### Ahora mismo (Prioridad 1)

1. ✅ **Marketing exportable**
   - Revisar que todas las páginas de marketing funcionan
   - Verificar que no hay imports rotos
   - Preparar para subir al VPS

2. ✅ **NO tocar rutas de `pages/`**
   - Solo pequeños movimientos de componentes internos
   - Mantener compatibilidad

### Después (Prioridad 2)

1. ⏳ Crear estructura de carpetas (vacía)
2. ⏳ Configurar aliases
3. ⏳ Extraer lógica crítica de Store (cart, wishlist, filters)
4. ⏳ Refactorizar TiendaCompleta

### Más tarde (Prioridad 3)

1. ⏳ Mover archivos de Marketing
2. ⏳ Completar reorganización

---

## ⚠️ Peligros a evitar

### ❌ Refactor eterno
- No ejecutar TODO el plan antes de tener cosas en producción
- Priorizar exportabilidad sobre perfección arquitectónica

### ❌ Sobre-fragmentación
- Empezar con hooks más grandes
- Partir solo cuando realmente haga falta

### ❌ Confusión de rutas
- Usar "views" no "pages" para componentes internos
- Mantener claro: `src/pages/` = entrypoint Next.js

### ❌ Imports infernales
- Configurar aliases ANTES de mover archivos
- Usar aliases siempre, nunca rutas relativas largas

---

## 📊 Resumen

**Sí:** El plan está bien pensado y alineado con buenas prácticas  
**Sí:** Es más avanzado que lo que hace el 90% de la gente con Next  
**Peligro:** Que quieras ejecutar TODO antes de tener cosas en producción

**Recomendación:** Priorizar Marketing exportable primero, Store domain después, Marketing domain al final.

---

**Ver plan completo:** `PLAN_REORGANIZACION_DOMINIOS.md`

