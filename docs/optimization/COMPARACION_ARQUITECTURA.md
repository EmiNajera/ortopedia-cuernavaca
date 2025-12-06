# 🔍 COMPARACIÓN: Arquitectura Propuesta vs Estructura Actual

**Fecha:** Enero 2025

---

## 📋 ARQUITECTURA PROPUESTA

```
src/
  app/                     # (opcional) migración futura
  domains/
    blog/
      components/
      pages/
      utils/
      api/
    services/
      components/
      pages/
      api/
    store/
      components/
      pages/
      data/
      domain/
      api/
  shared/
    components/
    lib/
    utils/
    styles/
  layouts/
  pages/                   # SOLO rutas finales (sin lógica interna)
  api/                     # versionado limpio
```

---

## 📁 ESTRUCTURA ACTUAL REAL

```
src/
  domains/
    blog/
      api/ ✅
      components/ ✅
      hooks/ ⚠️ (no está en propuesta)
      pages/ ❌ (vacía)
      store.js ⚠️ (no está en propuesta)
      utils/ ✅
    services/
      api/ ❌ (vacía)
      components/ ✅
      data/ ⚠️ (no está en propuesta)
      pages/ ❌ (vacía)
    store/
      api/ ✅
      components/ ✅
      pages/ ❌ (vacía)
      ❌ NO tiene data/
      ❌ NO tiene domain/
  shared/
    components/ ✅
    lib/ ✅
    ❌ NO tiene utils/ (está en lib/utils/)
    ❌ NO tiene styles/ (está en src/styles/)
  layouts/ ✅
  pages/ ✅
  ❌ NO tiene api/ (está en pages/api/)
  store/ ⚠️ (separado, NO está dentro de domains/store/)
    domain/ ✅
    components/ ❌ (vacía)
    data/ ❌ (vacía)
    views/ ❌ (vacía)
  components/ ⚠️ (no está en propuesta, mezclado)
  data/ ⚠️ (no está en propuesta, está en raíz)
  styles/ ⚠️ (no está en propuesta, está en raíz)
  utils/ ⚠️ (shim, no está en propuesta)
  registry/ ⚠️ (no está en propuesta)
  _trash/ ❌ (obsoleto)
```

---

## ✅ COINCIDENCIAS

1. ✅ `src/domains/blog/` con `api/`, `components/`, `utils/`
2. ✅ `src/domains/services/` con `components/`
3. ✅ `src/domains/store/` con `api/`, `components/`
4. ✅ `src/shared/` con `components/`, `lib/`
5. ✅ `src/layouts/`
6. ✅ `src/pages/` (rutas de Next.js)

---

## ⚠️ DIFERENCIAS Y PROBLEMAS

### 🔴 **CRÍTICO: Estructura duplicada/inconsistente**

1. **`src/store/` vs `src/domains/store/`**
   - ❌ **PROBLEMA:** `src/store/domain/` existe separado de `src/domains/store/`
   - ✅ **DEBERÍA:** `src/domains/store/domain/` (según propuesta)
   - 📍 **Estado actual:** 
     - `src/store/domain/` → contiene cart, wishlist, products, categories (lógica de negocio)
     - `src/domains/store/` → contiene components y api (componentes UI y API routes)

2. **`src/shared/utils/` vs `src/shared/lib/utils/`**
   - ⚠️ **DIFERENCIA:** Propuesta dice `shared/utils/`, actual tiene `shared/lib/utils/`
   - 📍 **Estado actual:** `src/shared/lib/utils/` (whatsapp.js, routerCompat.js)
   - 💡 **Decisión:** La estructura actual `lib/utils/` es más específica y está bien

3. **`src/shared/styles/` vs `src/styles/`**
   - ⚠️ **DIFERENCIA:** Propuesta dice `shared/styles/`, actual tiene `src/styles/`
   - 📍 **Estado actual:** `src/styles/` (mobile-optimizations.css, responsive-variables.css)
   - 💡 **Decisión:** Podría moverse a `shared/styles/` para consistencia

### 🟡 **IMPORTANTE: Carpetas faltantes o vacías**

4. **`src/domains/store/data/`**
   - ❌ **FALTA:** No existe en `domains/store/`
   - 📍 **Estado actual:** `src/data/` está en raíz (products.json, categories.config.js)
   - 💡 **Acción:** Mover `src/data/` a `src/domains/store/data/` o mantener en raíz si es compartido

5. **`src/domains/store/domain/`**
   - ❌ **FALTA:** No existe en `domains/store/`
   - 📍 **Estado actual:** `src/store/domain/` está separado
   - 💡 **Acción:** Mover `src/store/domain/` a `src/domains/store/domain/`

6. **`src/domains/*/pages/` (vacías)**
   - ⚠️ **VACÍAS:** `blog/pages/`, `services/pages/`, `store/pages/` están vacías
   - 💡 **Decisión:** Eliminar si no se van a usar, o mantener para futura migración

7. **`src/api/` (no existe)**
   - ❌ **FALTA:** Propuesta dice `src/api/`, actual tiene `src/pages/api/`
   - 📍 **Estado actual:** `src/pages/api/` (hello.js, robots.txt.js, sitemap.xml.js)
   - 💡 **Decisión:** En Next.js Pages Router, `pages/api/` es correcto. `src/api/` sería para App Router.

### 🟢 **MENOR: Carpetas adicionales no en propuesta**

8. **`src/components/`**
   - ⚠️ **NO EN PROPUESTA:** Existe con componentes mezclados
   - 📍 **Contenido:** admin/, features/, ui/, components/components/ (estructura confusa)
   - 💡 **Acción:** Limpiar y mover a `shared/components/` o `domains/*/components/`

9. **`src/data/`**
   - ⚠️ **NO EN PROPUESTA:** Está en raíz
   - 📍 **Contenido:** categories.config.js, products.config.js, products.json
   - 💡 **Acción:** Mover a `domains/store/data/` si es específico de store

10. **`src/utils/`**
    - ⚠️ **NO EN PROPUESTA:** Shim de compatibilidad
    - 📍 **Contenido:** whatsapp.js (re-exporta desde shared/lib/utils/whatsapp)
    - 💡 **Acción:** Mantener como shim temporal o eliminar cuando todos los imports estén actualizados

11. **`src/registry/`**
    - ⚠️ **NO EN PROPUESTA:** Componentes MagicUI
    - 📍 **Contenido:** magicui/ (bento-grid, light-rays, marquee)
    - 💡 **Acción:** Mover a `shared/components/ui/` o mantener si es específico de MagicUI

---

## 🎯 PLAN DE ALINEACIÓN

### Fase 1: Consolidar estructura duplicada (CRÍTICO)

1. **Mover `src/store/domain/` → `src/domains/store/domain/`**
   ```bash
   # Mover lógica de negocio a su lugar correcto
   src/store/domain/ → src/domains/store/domain/
   ```

2. **Actualizar imports:**
   - Cambiar `@store/domain/*` → `@domains/store/domain/*`
   - O mantener alias `@store/domain/*` apuntando a `domains/store/domain/`

### Fase 2: Reorganizar datos y estilos (IMPORTANTE)

3. **Mover `src/data/` → `src/domains/store/data/`** (si es específico de store)
   - O mantener en raíz si es compartido entre dominios

4. **Mover `src/styles/` → `src/shared/styles/`** (opcional, para consistencia)

### Fase 3: Limpiar estructura (LIMPIEZA)

5. **Eliminar carpetas vacías:**
   - `src/domains/blog/pages/`
   - `src/domains/services/pages/`
   - `src/domains/store/pages/`
   - `src/store/components/`
   - `src/store/data/`
   - `src/store/views/`

6. **Eliminar `src/_trash/` completo**

7. **Limpiar `src/components/`:**
   - Mover componentes a `shared/components/` o `domains/*/components/`
   - Eliminar duplicados

---

## 📊 RESUMEN DE ALINEACIÓN

| Elemento | Propuesta | Actual | Estado |
|----------|-----------|--------|--------|
| `domains/blog/` | ✅ | ✅ | ✅ Coincide |
| `domains/services/` | ✅ | ✅ | ✅ Coincide |
| `domains/store/` | ✅ | ⚠️ | ⚠️ Falta `data/` y `domain/` |
| `shared/` | ✅ | ⚠️ | ⚠️ Falta `utils/` directo y `styles/` |
| `layouts/` | ✅ | ✅ | ✅ Coincide |
| `pages/` | ✅ | ✅ | ✅ Coincide |
| `api/` | ✅ | ⚠️ | ⚠️ Está en `pages/api/` (correcto para Pages Router) |
| `app/` | ⚠️ Opcional | ❌ | ❌ No existe (correcto, no se usa App Router) |

**Coincidencia general:** ~70% ✅

**Problemas principales:**
1. ❌ `src/store/domain/` está separado de `src/domains/store/`
2. ⚠️ Estructura de `shared/` ligeramente diferente
3. ⚠️ Carpetas adicionales no contempladas en propuesta

---

## ✅ CONCLUSIÓN

**NO, la estructura actual NO coincide completamente con la arquitectura propuesta.**

**Principales diferencias:**
1. **`src/store/domain/` está separado** - debería estar en `src/domains/store/domain/`
2. **`src/shared/` tiene estructura diferente** - `lib/utils/` vs `utils/` directo
3. **Faltan carpetas en `domains/store/`** - `data/` y `domain/` no existen ahí
4. **Carpetas adicionales** - `components/`, `data/`, `styles/`, `utils/`, `registry/` en raíz

**Acción recomendada:** Completar la refactorización moviendo `src/store/domain/` a `src/domains/store/domain/` y limpiando la estructura.

