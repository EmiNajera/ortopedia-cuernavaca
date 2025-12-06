# 📊 ANÁLISIS COMPLETO: Estructura Funcional vs Obsoleta

**Generado:** 19 Noviembre 2025  
**Total de archivos JS/JSX en src/:** 127 archivos

---

## 🎯 RESUMEN EJECUTIVO

### ✅ **ESTRUCTURA FUNCIONAL (ACTUALMENTE EN USO)**

La estructura funcional del proyecto está en transición hacia una arquitectura basada en dominios. Los archivos que **realmente se usan** están distribuidos en:

1. **`src/shared/`** - ✅ **FUNCIONAL** - Utilidades compartidas
2. **`src/store/domain/`** - ✅ **FUNCIONAL** - Lógica de negocio de la tienda (nuevo)
3. **`src/domains/`** - ✅ **FUNCIONAL** - Componentes y lógica por dominio
4. **`src/layouts/`** - ✅ **FUNCIONAL** - Layouts compartidos
5. **`src/pages/`** - ✅ **FUNCIONAL** - Rutas de Next.js (no mover)
6. **`src/data/`** - ✅ **FUNCIONAL** - Configuraciones y datos estáticos

### ⚠️ **ESTRUCTURA EN TRANSICIÓN (IMPORTS MEZCLADOS)**

Algunos archivos aún usan rutas antiguas que apuntan a ubicaciones que ya no existen o están obsoletas:

- `src/pages/tienda.jsx` → importa desde `../features/store/TiendaCompleta` (debería ser `@domains/store/components/TiendaCompleta`)
- `src/pages/blog/[id].jsx` → importa desde `../../features/blog/components/BlogTemplate` (debería ser `@domains/blog/components/BlogTemplate`)
- `src/pages/servicios.jsx` → importa desde `../features/services/Servicios` (debería ser `@domains/services/components/Servicios`)
- `src/pages/producto/[productId].jsx` → importa desde `../store/Producto` (archivo no existe, debería usar componente de dominio)

### 🗑️ **ESTRUCTURA OBSOLETA (NO FUNCIONAL)**

- **`src/_trash/`** - ❌ **OBSOLETO** - Archivos movidos aquí intencionalmente
- **`src/components/lib/`** - ❌ **VACÍO** - Carpeta vacía
- **`src/hooks/`** - ❌ **VACÍO** - Los hooks están en `store/domain/` y `domains/`
- **`src/store/data/`** - ❌ **VACÍO** - Carpeta vacía
- **`src/store/components/`** - ❌ **VACÍO** - Carpeta vacía
- **`src/store/views/`** - ❌ **VACÍO** - Carpeta vacía
- **`src/pages/store/`** - ❌ **VACÍO** - Carpeta vacía
- **`src/domains/*/pages/`** - ❌ **VACÍOS** - Carpetas vacías (blog/pages, services/pages, store/pages)

---

## 📁 MAPA DETALLADO POR CARPETA

### ✅ **1. `src/shared/` - FUNCIONAL Y CORRECTO**

**Ubicación:** `src/shared/`  
**Estado:** ✅ **ACTIVO** - Estructura nueva y funcional

#### Archivos funcionales:

```
src/shared/
├── components/
│   └── ui/
│       └── ErrorBoundary.jsx          ✅ USADO en _app.jsx
├── lib/
│   ├── db.js                          ✅ USADO en API routes y páginas
│   ├── utils.js                       ✅ USADO (cn function)
│   └── utils/
│       ├── whatsapp.js               ✅ USADO en múltiples layouts y páginas
│       └── routerCompat.js            ✅ USADO (compatibilidad react-router)
```

**Imports activos detectados:**
- `@shared/lib/utils/whatsapp` → usado en 12+ archivos
- `@shared/lib/db` → usado en API routes
- `@shared/components/ui/ErrorBoundary` → usado en `_app.jsx`
- `@shared/lib/utils` → usado para `cn()` function

**✅ Estado:** Estructura correcta, todos los archivos están en uso.

---

### ✅ **2. `src/store/domain/` - FUNCIONAL Y CORRECTO**

**Ubicación:** `src/store/domain/`  
**Estado:** ✅ **ACTIVO** - Nueva estructura de dominio (Fase 1 completada)

#### Archivos funcionales:

```
src/store/domain/
├── cart/
│   ├── cartStore.js                   ✅ FUNCIONAL (Zustand store)
│   └── useCart.js                     ✅ USADO en dev-sandbox.jsx
├── wishlist/
│   ├── wishlistStore.js               ✅ FUNCIONAL (Zustand store)
│   └── useWishlist.js                 ✅ USADO en dev-sandbox.jsx y useProductListing
├── products/
│   ├── useProducts.js                 ✅ USADO en ofertas.jsx, dev-sandbox.jsx
│   └── useProductListing.js           ✅ USADO en dev-sandbox.jsx
└── categories/
    └── useCategories.js               ✅ USADO en dev-sandbox.jsx
```

**Imports activos detectados:**
- `@store/domain/cart/useCart` → usado en dev-sandbox
- `@store/domain/wishlist/useWishlist` → usado en dev-sandbox y useProductListing
- `@store/domain/products/useProducts` → usado en ofertas.jsx, dev-sandbox.jsx
- `@store/domain/products/useProductListing` → usado en dev-sandbox.jsx
- `@store/domain/categories/useCategories` → usado en dev-sandbox.jsx

**✅ Estado:** Estructura correcta, implementación nueva y funcional. Pendiente: integrar en TiendaCompleta.jsx (Fase 2).

---

### ✅ **3. `src/domains/` - FUNCIONAL (PARCIALMENTE)**

**Ubicación:** `src/domains/`  
**Estado:** ✅ **ACTIVO** - Componentes por dominio, pero imports mezclados

#### Archivos funcionales:

```
src/domains/
├── blog/
│   ├── api/
│   │   └── articles.js                ✅ FUNCIONAL
│   ├── components/
│   │   ├── BlogTemplate.jsx           ⚠️ EXISTE pero importado desde features/ (obsoleto)
│   │   ├── ArticleCard.jsx            ✅ FUNCIONAL
│   │   ├── ArticleContent.jsx         ✅ FUNCIONAL
│   │   ├── ArticleManager.jsx         ⚠️ EXISTE pero importado desde features/ (obsoleto)
│   │   ├── ArticleCreator.jsx         ⚠️ EXISTE pero importado desde features/ (obsoleto)
│   │   └── [otros 10+ componentes]   ✅ FUNCIONALES
│   ├── hooks/
│   │   └── useProfessionalBlog.js     ✅ FUNCIONAL
│   ├── store.js                      ✅ FUNCIONAL
│   └── utils/
│       └── blogUtils.js               ✅ FUNCIONAL
│
├── services/
│   ├── components/
│   │   ├── Servicios.jsx              ⚠️ EXISTE pero importado desde features/ (obsoleto)
│   │   └── InteractiveServices.jsx    ✅ FUNCIONAL
│   └── data/
│       └── servicios-detalle-content.md  ✅ FUNCIONAL
│
└── store/
    ├── api/
    │   ├── [id].js                    ✅ USADO (API route)
    │   ├── index.js                   ✅ USADO (API route)
    │   ├── index.mysql.js             ✅ USADO (API route)
    │   └── categories                 ✅ USADO (API route)
    └── components/
        ├── TiendaCompleta.jsx         ⚠️ EXISTE pero importado desde features/ (obsoleto)
        └── CategoryLanding.jsx        ✅ FUNCIONAL
```

**⚠️ Problemas detectados:**

1. **Imports obsoletos en páginas:**
   - `src/pages/tienda.jsx` → `import TiendaCompleta from '../features/store/TiendaCompleta'` (debería ser `@domains/store/components/TiendaCompleta`)
   - `src/pages/blog/[id].jsx` → `import BlogTemplate from '../../features/blog/components/BlogTemplate'` (debería ser `@domains/blog/components/BlogTemplate`)
   - `src/pages/servicios.jsx` → `import Servicios from '../features/services/Servicios'` (debería ser `@domains/services/components/Servicios`)
   - `src/pages/admin-blog.jsx` → `import ArticleManager from '../features/blog/components/ArticleManager'` (debería ser `@domains/blog/components/ArticleManager`)

2. **Carpetas vacías:**
   - `src/domains/blog/pages/` → vacía
   - `src/domains/services/pages/` → vacía
   - `src/domains/store/pages/` → vacía

**✅ Estado:** Componentes funcionales, pero imports en páginas necesitan actualización.

---

### ✅ **4. `src/layouts/` - FUNCIONAL Y CORRECTO**

**Ubicación:** `src/layouts/`  
**Estado:** ✅ **ACTIVO** - Todos los layouts están en uso

#### Archivos funcionales:

```
src/layouts/
├── MarketingLayout.jsx                ✅ USADO en 15+ páginas
├── MarketingHeader.jsx                ✅ USADO en MarketingLayout
├── StoreLayout.jsx                    ✅ USADO en tienda.jsx, carrito.jsx, producto/[id].jsx
├── StoreHeader.jsx                    ✅ USADO en StoreLayout
├── Footer.jsx                         ✅ USADO en MarketingLayout
├── Header.jsx                         ✅ USADO (legacy)
├── ResponsiveHeader.jsx               ✅ USADO (legacy)
├── ResponsiveFooter.jsx               ✅ USADO (legacy)
└── Layout.jsx                         ✅ USADO (legacy)
```

**Imports activos detectados:**
- `@layouts/MarketingLayout` → usado en 15+ páginas
- `@layouts/StoreLayout` → usado en tienda, carrito, producto
- Todos los layouts importan `@shared/lib/utils/whatsapp` ✅

**✅ Estado:** Estructura correcta, todos los archivos están en uso.

---

### ✅ **5. `src/pages/` - FUNCIONAL (NEXT.JS ROUTES)**

**Ubicación:** `src/pages/`  
**Estado:** ✅ **ACTIVO** - Rutas de Next.js (no mover)

#### Páginas funcionales principales:

```
src/pages/
├── _app.jsx                           ✅ FUNCIONAL (entry point)
├── _document.jsx                      ✅ FUNCIONAL
├── index.jsx                          ✅ FUNCIONAL (home)
├── tienda.jsx                         ⚠️ FUNCIONAL pero import obsoleto
├── carrito.jsx                        ✅ FUNCIONAL
├── ofertas.jsx                        ✅ FUNCIONAL (usa @store/domain/products/useProducts)
├── producto/[productId].jsx           ⚠️ FUNCIONAL pero import roto (Producto no existe)
├── categoria/[slug].jsx                ✅ FUNCIONAL
├── categoria/*.jsx (18 archivos)      ✅ FUNCIONALES (páginas estáticas)
├── blog/index.jsx                     ✅ FUNCIONAL
├── blog/[id].jsx                      ⚠️ FUNCIONAL pero import obsoleto
├── servicios.jsx                      ⚠️ FUNCIONAL pero import obsoleto
├── servicios/detalle/[service].jsx    ✅ FUNCIONAL
├── admin-blog.jsx                     ⚠️ FUNCIONAL pero import obsoleto
├── auth/Login.jsx                     ✅ FUNCIONAL
├── auth/Cuenta.jsx                    ✅ FUNCIONAL
├── home/Home.jsx                      ✅ FUNCIONAL
├── home/Nosotros.jsx                  ✅ FUNCIONAL
├── home/Citas.jsx                     ✅ FUNCIONAL
├── home/Contacto.jsx                  ✅ FUNCIONAL
├── contacto.jsx                       ✅ FUNCIONAL
├── nosotros.jsx                       ✅ FUNCIONAL
├── citas.jsx                          ✅ FUNCIONAL
├── 404.jsx                            ✅ FUNCIONAL
├── 500.jsx                            ✅ FUNCIONAL
├── dev-sandbox.jsx                    ✅ FUNCIONAL (testing hooks)
└── api/
    ├── hello.js                       ✅ FUNCIONAL
    ├── robots.txt.js                  ✅ FUNCIONAL
    └── sitemap.xml.js                 ✅ FUNCIONAL
```

**⚠️ Imports que necesitan corrección:**

1. `src/pages/tienda.jsx`:
   ```javascript
   // ❌ ACTUAL (obsoleto):
   import TiendaCompleta from '../features/store/TiendaCompleta';
   import { getCategories } from '../lib/db';
   
   // ✅ DEBERÍA SER:
   import TiendaCompleta from '@domains/store/components/TiendaCompleta';
   import { getCategories } from '@shared/lib/db';
   ```

2. `src/pages/blog/[id].jsx`:
   ```javascript
   // ❌ ACTUAL (obsoleto):
   import BlogTemplate from '../../features/blog/components/BlogTemplate';
   
   // ✅ DEBERÍA SER:
   import BlogTemplate from '@domains/blog/components/BlogTemplate';
   ```

3. `src/pages/servicios.jsx`:
   ```javascript
   // ❌ ACTUAL (obsoleto):
   import Servicios from '../features/services/Servicios';
   
   // ✅ DEBERÍA SER:
   import Servicios from '@domains/services/components/Servicios';
   ```

4. `src/pages/admin-blog.jsx`:
   ```javascript
   // ❌ ACTUAL (obsoleto):
   import ArticleManager from '../features/blog/components/ArticleManager';
   import ArticleCreator from '../features/blog/components/ArticleCreator';
   
   // ✅ DEBERÍA SER:
   import ArticleManager from '@domains/blog/components/ArticleManager';
   import ArticleCreator from '@domains/blog/components/ArticleCreator';
   ```

5. `src/pages/producto/[productId].jsx`:
   ```javascript
   // ❌ ACTUAL (roto):
   import Producto from '../store/Producto';  // Este archivo NO EXISTE
   
   // ✅ DEBERÍA SER:
   // Necesita crear componente Producto en @domains/store/components/Producto.jsx
   // O usar CategoryLanding/TiendaCompleta con parámetros
   ```

**✅ Estado:** Páginas funcionales, pero algunos imports necesitan actualización.

---

### ✅ **6. `src/data/` - FUNCIONAL**

**Ubicación:** `src/data/`  
**Estado:** ✅ **ACTIVO** - Configuraciones y datos estáticos

```
src/data/
├── categories.config.js               ✅ FUNCIONAL
├── categories.full-config.js         ✅ FUNCIONAL (usado en categoria/[slug].jsx)
├── products.config.js                 ✅ FUNCIONAL
└── products.json                      ✅ FUNCIONAL
```

**✅ Estado:** Todos los archivos están en uso.

---

### ⚠️ **7. `src/components/` - MEZCLADO (FUNCIONAL + OBSOLETO)**

**Ubicación:** `src/components/`  
**Estado:** ⚠️ **MEZCLADO** - Algunos componentes funcionales, otros obsoletos o duplicados

#### Componentes funcionales:

```
src/components/
├── ui/
│   ├── ErrorBoundary.jsx              ⚠️ DUPLICADO (existe en shared/components/ui/)
│   ├── ResponsiveCard.jsx            ✅ FUNCIONAL
│   ├── ResponsiveContainer.jsx       ✅ FUNCIONAL
│   ├── ResponsiveForm.jsx            ✅ FUNCIONAL
│   ├── ResponsiveGrid.jsx         ✅ FUNCIONAL
│   └── ResponsiveTypography.jsx     ✅ FUNCIONAL
├── admin/
│   ├── ArticleCreator.jsx            ⚠️ DUPLICADO (existe en domains/blog/components/)
│   └── ArticleManager.jsx            ⚠️ DUPLICADO (existe en domains/blog/components/)
├── features/
│   ├── BlogArticleTemplate.jsx       ✅ FUNCIONAL (puede ser único)
│   └── ProcessSectionAlt.jsx          ✅ FUNCIONAL (puede ser único)
└── components/
    └── ui/
        └── light-rays.jsx             ✅ FUNCIONAL (MagicUI)
```

**⚠️ Problemas detectados:**

1. **Duplicados:**
   - `src/components/ui/ErrorBoundary.jsx` vs `src/shared/components/ui/ErrorBoundary.jsx` → **EL DE SHARED ES EL CORRECTO**
   - `src/components/admin/ArticleCreator.jsx` vs `src/domains/blog/components/ArticleCreator.jsx` → **EL DE DOMAINS ES EL CORRECTO**
   - `src/components/admin/ArticleManager.jsx` vs `src/domains/blog/components/ArticleManager.jsx` → **EL DE DOMAINS ES EL CORRECTO**

2. **Estructura anidada confusa:**
   - `src/components/components/ui/light-rays.jsx` → estructura `components/components/` es redundante

**✅ Estado:** Algunos componentes funcionales, pero hay duplicados que deben eliminarse.

---

### ✅ **8. `src/registry/` - FUNCIONAL**

**Ubicación:** `src/registry/`  
**Estado:** ✅ **ACTIVO** - Componentes MagicUI

```
src/registry/
└── magicui/
    ├── bento-grid.jsx                 ✅ FUNCIONAL
    ├── light-rays.jsx                  ✅ FUNCIONAL
    └── marquee.jsx                     ✅ FUNCIONAL
```

**✅ Estado:** Todos los archivos están en uso.

---

### ✅ **9. `src/styles/` - FUNCIONAL**

**Ubicación:** `src/styles/`  
**Estado:** ✅ **ACTIVO** - Estilos globales

```
src/styles/
├── mobile-optimizations.css          ✅ USADO en _app.jsx
├── responsive-variables.css            ✅ FUNCIONAL
└── (index.css en src/)                ✅ USADO en _app.jsx
```

**✅ Estado:** Todos los archivos están en uso.

---

### ✅ **10. `src/utils/` - SHIM (COMPATIBILIDAD)**

**Ubicación:** `src/utils/`  
**Estado:** ✅ **FUNCIONAL** - Shim de compatibilidad

```
src/utils/
└── whatsapp.js                         ✅ SHIM (re-exporta desde @shared/lib/utils/whatsapp)
```

**Propósito:** Mantener compatibilidad con imports antiguos que usan `../../utils/whatsapp`.

**✅ Estado:** Funcional como shim, pero los nuevos imports deberían usar `@shared/lib/utils/whatsapp`.

---

## 🗑️ ARCHIVOS Y CARPETAS OBSOLETOS

### ❌ **1. `src/_trash/` - OBSOLETO (ARCHIVOS MOVIDOS)**

**Ubicación:** `src/_trash/`  
**Estado:** ❌ **OBSOLETO** - Archivos movidos aquí intencionalmente

```
src/_trash/
├── blog/                               ❌ OBSOLETO
├── CategoriaPage.jsx                   ❌ OBSOLETO
├── Categorias.jsx                      ❌ OBSOLETO
├── categories/                         ❌ OBSOLETO
├── categories-old/                     ❌ OBSOLETO
├── cuenta.jsx                          ❌ OBSOLETO
├── Home.jsx.backup                     ❌ OBSOLETO
├── layout/                             ❌ OBSOLETO
├── login.jsx                           ❌ OBSOLETO
├── Producto.jsx                        ❌ OBSOLETO
├── products/                           ❌ OBSOLETO
├── services-old/                       ❌ OBSOLETO
├── store/                              ❌ OBSOLETO
└── useProducts.js                      ❌ OBSOLETO
```

**✅ Acción recomendada:** Eliminar `src/_trash/` después de verificar que no hay referencias.

---

### ❌ **2. Carpetas vacías - OBSOLETAS**

```
src/components/lib/                          ❌ VACÍO
src/hooks/                                   ❌ VACÍO
src/store/data/                              ❌ VACÍO
src/store/components/                        ❌ VACÍO
src/store/views/                             ❌ VACÍO
src/pages/store/                             ❌ VACÍO
src/domains/blog/pages/                      ❌ VACÍO
src/domains/services/pages/                   ❌ VACÍO
src/domains/store/pages/                      ❌ VACÍO
```

**✅ Acción recomendada:** Eliminar carpetas vacías para limpiar la estructura.

---

### ❌ **3. Archivos duplicados - OBSOLETOS**

#### Duplicados identificados:

1. **ErrorBoundary:**
   - ✅ `src/shared/components/ui/ErrorBoundary.jsx` → **MANTENER** (usado en _app.jsx)
   - ❌ `src/components/ui/ErrorBoundary.jsx` → **ELIMINAR** (duplicado)

2. **ArticleCreator:**
   - ✅ `src/domains/blog/components/ArticleCreator.jsx` → **MANTENER** (versión correcta)
   - ❌ `src/components/admin/ArticleCreator.jsx` → **ELIMINAR** (duplicado)

3. **ArticleManager:**
   - ✅ `src/domains/blog/components/ArticleManager.jsx` → **MANTENER** (versión correcta)
   - ❌ `src/components/admin/ArticleManager.jsx` → **ELIMINAR** (duplicado)

---

## 📋 CHECKLIST DE CORRECCIONES NECESARIAS

### 🔴 **CRÍTICO (Rompe el build o funcionalidad)**

1. ✅ **RESUELTO:** `src/pages/_app.jsx` → ErrorBoundary import corregido
2. ✅ **RESUELTO:** `src/pages/index.jsx` → whatsapp import corregido
3. ⚠️ **PENDIENTE:** `src/pages/producto/[productId].jsx` → `import Producto from '../store/Producto'` (archivo no existe)

### 🟡 **IMPORTANTE (Imports obsoletos que funcionan pero deberían actualizarse)**

4. ⚠️ **PENDIENTE:** `src/pages/tienda.jsx` → actualizar imports a `@domains/store/components/TiendaCompleta` y `@shared/lib/db`
5. ⚠️ **PENDIENTE:** `src/pages/blog/[id].jsx` → actualizar import a `@domains/blog/components/BlogTemplate`
6. ⚠️ **PENDIENTE:** `src/pages/servicios.jsx` → actualizar import a `@domains/services/components/Servicios`
7. ⚠️ **PENDIENTE:** `src/pages/admin-blog.jsx` → actualizar imports a `@domains/blog/components/ArticleManager` y `ArticleCreator`

### 🟢 **LIMPIEZA (No afecta funcionalidad pero mejora estructura)**

8. ⚠️ **PENDIENTE:** Eliminar `src/_trash/` completo
9. ⚠️ **PENDIENTE:** Eliminar carpetas vacías (`src/components/lib/`, `src/hooks/`, `src/store/data/`, etc.)
10. ⚠️ **PENDIENTE:** Eliminar duplicados (`src/components/ui/ErrorBoundary.jsx`, `src/components/admin/*.jsx`)
11. ⚠️ **PENDIENTE:** Reorganizar `src/components/components/ui/light-rays.jsx` → mover a `src/registry/magicui/` o `src/shared/components/ui/`

---

## 🎯 MAPA DE IMPORTS ACTIVOS

### Imports usando aliases nuevos (✅ CORRECTO):

```javascript
// ✅ CORRECTO - Shared
import { openWhatsApp } from '@shared/lib/utils/whatsapp';
import { getProducts } from '@shared/lib/db';
import ErrorBoundary from '@shared/components/ui/ErrorBoundary';

// ✅ CORRECTO - Store Domain
import { useCart } from '@store/domain/cart/useCart';
import { useWishlist } from '@store/domain/wishlist/useWishlist';
import { useProducts } from '@store/domain/products/useProducts';
import { useProductListing } from '@store/domain/products/useProductListing';
import { useCategories } from '@store/domain/categories/useCategories';

// ✅ CORRECTO - Layouts
import MarketingLayout from '@layouts/MarketingLayout';
import StoreLayout from '@layouts/StoreLayout';
```

### Imports usando rutas relativas antiguas (⚠️ OBSOLETO):

```javascript
// ⚠️ OBSOLETO - Deberían usar aliases
import TiendaCompleta from '../features/store/TiendaCompleta';  // → @domains/store/components/TiendaCompleta
import BlogTemplate from '../../features/blog/components/BlogTemplate';  // → @domains/blog/components/BlogTemplate
import Servicios from '../features/services/Servicios';  // → @domains/services/components/Servicios
import { getCategories } from '../lib/db';  // → @shared/lib/db
```

---

## 📊 ESTADÍSTICAS

- **Total archivos JS/JSX:** 127
- **Archivos funcionales:** ~95
- **Archivos obsoletos (en _trash):** ~15
- **Carpetas vacías:** 9
- **Archivos duplicados:** 3
- **Imports que necesitan corrección:** 7

---

## ✅ RECOMENDACIONES FINALES

### Prioridad ALTA (Hacer ahora):

1. **Corregir imports obsoletos en páginas** (items 4-7 del checklist)
2. **Crear componente Producto** o corregir import en `producto/[productId].jsx`
3. **Eliminar duplicados** (`src/components/ui/ErrorBoundary.jsx`, `src/components/admin/*.jsx`)

### Prioridad MEDIA (Hacer después):

4. **Eliminar `src/_trash/`** completo
5. **Eliminar carpetas vacías**
6. **Reorganizar `src/components/components/`** (estructura anidada confusa)

### Prioridad BAJA (Opcional):

7. **Migrar imports de rutas relativas a aliases** en componentes que aún usan `../../`
8. **Consolidar componentes de `src/components/features/`** si no se usan en múltiples lugares

---

**Última actualización:** Enero 2025  
**Próxima revisión:** Después de corregir imports obsoletos

