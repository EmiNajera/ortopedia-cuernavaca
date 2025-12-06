# 📘 MANUAL DE ESTADO FINAL DEL REPOSITORIO

**Propósito:** Guía definitiva para completar la refactorización y dejar el repositorio limpio y funcional.

**Última actualización:** Enero 2025

---

## 🎯 OBJETIVO

Este documento define **exactamente** cómo debe quedar la estructura del proyecto después de completar la refactorización. Sigue este manual para:

- ✅ Eliminar toda la basura visual y archivos obsoletos
- ✅ Mover archivos a sus ubicaciones correctas
- ✅ Actualizar todos los imports a aliases
- ✅ Asegurar que el proyecto funcione sin errores

---

## 1. 📁 ESTRUCTURA FINAL DESEADA

### 1.1. Raíz del Repositorio

```txt
/
├── .next/                 # (auto-generado por Next.js)
├── dist/                  # (si usas build estático)
├── node_modules/          # (dependencias)
├── docs/                  # Documentación del proyecto
├── tools/                 # Scripts, SQL, inventario, etc.
├── posts/                 # Archivos MDX del blog
├── public/                # Assets estáticos
├── _archive/              # Código viejo que quieras guardar
├── _trash/                # Basura histórica (FUERA de src/)
├── src/                   # Código fuente principal
├── jest.config.js
├── jest.setup.js
├── jsconfig.json
├── .eslintrc.cjs
├── next.config.js
├── package.json
└── README.md
```

**⚠️ Punto crítico:** `_trash` y cualquier basura histórica **DEBE estar FUERA de `src/`**. Next.js solo mira `src/` y `pages/`, así que mientras no esté ahí, no contamina el build.

---

### 1.2. Estructura dentro de `src/` (LO QUE SÍ DEBE EXISTIR)

```txt
src/
├── data/                          # Configuraciones y datos estáticos
│   ├── categories.config.js
│   ├── categories.full-config.js
│   ├── products.config.js
│   └── products.json
│
├── domains/                       # Dominios de negocio
│   ├── blog/
│   │   ├── api/                   # Lógica de blog (no Next API)
│   │   │   └── articles.js
│   │   ├── components/            # Componentes del blog
│   │   │   ├── BlogTemplate.jsx
│   │   │   ├── ArticleCard.jsx
│   │   │   ├── ArticleContent.jsx
│   │   │   ├── ArticleManager.jsx
│   │   │   ├── ArticleCreator.jsx
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   └── useProfessionalBlog.js
│   │   ├── store.js               # Zustand store del blog
│   │   ├── utils/
│   │   │   └── blogUtils.js
│   │   └── data/                  # (opcional) Datos específicos del blog
│   │
│   ├── services/
│   │   ├── components/
│   │   │   ├── Servicios.jsx
│   │   │   └── InteractiveServices.jsx
│   │   └── data/
│   │       └── servicios-detalle-content.md
│   │
│   └── store/                     # UI de la tienda
│       ├── api/                   # API routes de Next.js
│       │   ├── [id].js
│       │   ├── index.js
│       │   ├── index.mysql.js
│       │   └── categories
│       └── components/
│           ├── TiendaCompleta.jsx
│           ├── CategoryLanding.jsx
│           ├── ProductCard.jsx      # (si la creas)
│           ├── ProductGrid.jsx     # (si la creas)
│           └── ProductDetail.jsx   # (si la creas)
│
├── layouts/                        # Layouts compartidos
│   ├── MarketingLayout.jsx
│   ├── MarketingHeader.jsx
│   ├── StoreLayout.jsx
│   ├── StoreHeader.jsx
│   ├── Footer.jsx
│   ├── Header.jsx                 # (si lo sigues usando)
│   ├── ResponsiveHeader.jsx       # (si lo sigues usando)
│   └── ResponsiveFooter.jsx       # (si lo sigues usando)
│
├── pages/                          # Rutas de Next.js (Pages Router)
│   ├── _app.jsx
│   ├── _document.jsx
│   ├── index.jsx
│   ├── api/                       # API routes de Next.js
│   │   ├── hello.js
│   │   ├── robots.txt.js
│   │   └── sitemap.xml.js
│   ├── blog/
│   │   ├── index.jsx
│   │   └── [id].jsx
│   ├── categoria/
│   │   ├── [slug].jsx
│   │   └── *.jsx                 # Páginas estáticas
│   ├── producto/
│   │   └── [productId].jsx
│   ├── servicios/
│   │   └── detalle/
│   │       └── [service].jsx
│   ├── tienda.jsx
│   ├── carrito.jsx
│   ├── ofertas.jsx
│   ├── servicios.jsx
│   ├── admin-blog.jsx
│   └── ...
│
├── registry/                       # Componentes MagicUI
│   └── magicui/
│       ├── bento-grid.jsx
│       ├── light-rays.jsx
│       └── marquee.jsx
│
├── shared/                         # Código compartido entre dominios
│   ├── components/
│   │   ├── layout/                # (opcional) Layouts base
│   │   │   └── BaseLayout.jsx
│   │   └── ui/                    # Componentes UI genéricos
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Input.jsx
│   │       ├── Modal.jsx
│   │       └── ErrorBoundary.jsx
│   ├── lib/
│   │   ├── db.js                  # Conexión y queries de BD
│   │   ├── constants.js           # Constantes compartidas
│   │   ├── utils.js               # Helpers genéricos (cn(), etc.)
│   │   └── utils/
│   │       ├── whatsapp.js
│   │       └── routerCompat.js
│   └── hooks/                     # (opcional) Hooks realmente compartidos
│
├── store/                          # Lógica de negocio de la tienda
│   └── domain/
│       ├── cart/
│       │   ├── cartStore.js
│       │   └── useCart.js
│       ├── wishlist/
│       │   ├── wishlistStore.js
│       │   └── useWishlist.js
│       ├── products/
│       │   ├── useProducts.js
│       │   └── useProductListing.js
│       └── categories/
│           └── useCategories.js
│
├── styles/                         # Estilos globales
│   ├── mobile-optimizations.css
│   └── responsive-variables.css
│
├── test-utils/                     # Utilidades para testing
│
├── utils/                          # (opcional) Shims temporales
│   └── whatsapp.js                # Re-exporta de @shared/lib/utils/whatsapp
│
└── index.css                       # Estilos globales principales
```

**Regla mental:** En `src/` solo deben vivir **dominios, shared, layouts, pages, data, store/domain, registry, styles y utilidades mínimas**. Nada de `features/` ni `components/` genéricos colgando por ahí.

---

## 2. 🗑️ CARPETAS/ARCHIVOS QUE DEBEN DESAPARECER DE `src/`

Cuando termines la refactorización, dentro de `src/` **NO** deberían existir:

### 2.1. Carpetas completas a eliminar

- ❌ `src/_trash/` → **Mover a `/_trash` en la raíz** (así la conservas sin afectar nada)
- ❌ `src/features/` → Todo lo vivo debe irse a `src/shared` o `src/domains`
- ❌ `src/components/` → Todo lo vivo debe irse a `src/shared/components` o `src/domains/*/components`
- ❌ `src/hooks/` → Ya tienes hooks en `domains/` y `store/domain/`
- ❌ `src/store/components/` → Si está vacío o ya migrado a `domains/store/components`
- ❌ `src/store/views/` → Vacía o no usada
- ❌ `src/store/data/` → Ya usas `src/data/` para esto
- ❌ `src/pages/store/` → Si es solo una carpeta vacía/legacy
- ❌ `src/domains/*/pages/` → Si están vacías (blog/pages, services/pages, store/pages)
- ❌ `src/components/lib/` → Vacía
- ❌ `src/components/components/` → Estructura anidada confusa

### 2.2. Archivos duplicados a eliminar

- ❌ `src/components/ui/ErrorBoundary.jsx`
  - ✅ **Mantener solo:** `src/shared/components/ui/ErrorBoundary.jsx`

- ❌ `src/components/admin/ArticleCreator.jsx`
  - ✅ **Mantener solo:** `src/domains/blog/components/ArticleCreator.jsx`

- ❌ `src/components/admin/ArticleManager.jsx`
  - ✅ **Mantener solo:** `src/domains/blog/components/ArticleManager.jsx`

### 2.3. Archivos que deben moverse o eliminarse

- ⚠️ `src/components/features/BlogArticleTemplate.jsx` → Mover a `src/domains/blog/components/` o `src/shared/components/`
- ⚠️ `src/components/features/ProcessSectionAlt.jsx` → Mover a `src/domains/services/components/` o `src/shared/components/`
- ⚠️ `src/components/components/ui/light-rays.jsx` → Mover a `src/registry/magicui/` (ya existe ahí)

---

## 3. 📦 QUÉ MOVER Y A DÓNDE

### 3.1. Blog Domain

**Estado final ideal:**

```
src/domains/blog/
├── api/
│   └── articles.js               # Lógica de blog, no Next API
├── components/
│   ├── BlogTemplate.jsx
│   ├── ArticleCard.jsx
│   ├── ArticleContent.jsx
│   ├── ArticleManager.jsx
│   ├── ArticleCreator.jsx
│   └── ...
├── hooks/
│   └── useProfessionalBlog.js
├── store.js
└── utils/
    └── blogUtils.js
```

**Páginas Next.js:**

```
src/pages/blog/index.jsx
src/pages/blog/[id].jsx
src/pages/admin-blog.jsx
```

**Imports correctos:**

```javascript
// pages/blog/index.jsx
import BlogTemplate from '@domains/blog/components/BlogTemplate';
import MarketingLayout from '@layouts/MarketingLayout';

// pages/blog/[id].jsx
import BlogTemplate from '@domains/blog/components/BlogTemplate';
import { getPostBySlug } from '@domains/blog/utils/blogUtils';

// pages/admin-blog.jsx
import ArticleManager from '@domains/blog/components/ArticleManager';
import ArticleCreator from '@domains/blog/components/ArticleCreator';
```

**Acciones:**
- ✅ Ya existe en `src/domains/blog/`
- ⚠️ Verificar que `pages/blog/[id].jsx` y `pages/admin-blog.jsx` usen imports correctos
- ⚠️ Eliminar `src/components/admin/ArticleCreator.jsx` y `ArticleManager.jsx` (duplicados)

---

### 3.2. Services / Marketing Domain

**Estado final ideal:**

```
src/domains/services/
├── components/
│   ├── Servicios.jsx
│   └── InteractiveServices.jsx
└── data/
    └── servicios-detalle-content.md
```

**Páginas Next.js:**

```
src/pages/servicios.jsx
src/pages/servicios/detalle/[service].jsx
```

**Imports correctos:**

```javascript
// pages/servicios.jsx
import Servicios from '@domains/services/components/Servicios';
import MarketingLayout from '@layouts/MarketingLayout';
```

**Acciones:**
- ✅ Ya existe en `src/domains/services/`
- ⚠️ Verificar que `pages/servicios.jsx` use import correcto
- ⚠️ Mover `src/components/features/ProcessSectionAlt.jsx` si se usa en services

---

### 3.3. Store Domain (Lógica de Negocio)

**Estado final ideal:**

```
src/store/domain/
├── cart/
│   ├── cartStore.js
│   └── useCart.js
├── wishlist/
│   ├── wishlistStore.js
│   └── useWishlist.js
├── products/
│   ├── useProducts.js
│   └── useProductListing.js
└── categories/
    └── useCategories.js
```

**✅ Ya está correcto** - No mover, mantener aquí.

**Imports correctos:**

```javascript
import { useCart } from '@store/domain/cart/useCart';
import { useWishlist } from '@store/domain/wishlist/useWishlist';
import { useProducts } from '@store/domain/products/useProducts';
import { useProductListing } from '@store/domain/products/useProductListing';
import { useCategories } from '@store/domain/categories/useCategories';
```

---

### 3.4. Store UI (Componentes)

**Estado final ideal:**

```
src/domains/store/
├── api/                           # API routes de Next.js
│   ├── [id].js
│   ├── index.js
│   ├── index.mysql.js
│   └── categories
└── components/
    ├── TiendaCompleta.jsx
    ├── CategoryLanding.jsx
    ├── ProductCard.jsx            # (si la creas)
    ├── ProductGrid.jsx            # (si la creas)
    └── ProductDetail.jsx          # (si la creas, para producto/[productId].jsx)
```

**Páginas Next.js:**

```
src/pages/tienda.jsx
src/pages/carrito.jsx
src/pages/ofertas.jsx
src/pages/producto/[productId].jsx
src/pages/categoria/[slug].jsx
src/pages/categoria/*.jsx          # Páginas estáticas
```

**Imports correctos:**

```javascript
// pages/tienda.jsx
import TiendaCompleta from '@domains/store/components/TiendaCompleta';
import StoreLayout from '@layouts/StoreLayout';
import { getCategories } from '@shared/lib/db';

// pages/ofertas.jsx
import { useProducts } from '@store/domain/products/useProducts';
import StoreLayout from '@layouts/StoreLayout';

// pages/producto/[productId].jsx
import ProductDetail from '@domains/store/components/ProductDetail'; // o como lo llames
import StoreLayout from '@layouts/StoreLayout';
```

**⚠️ Punto crítico:** `TiendaCompleta.jsx` debe usar los hooks de dominio:

```javascript
// domains/store/components/TiendaCompleta.jsx
import { useProducts } from '@store/domain/products/useProducts';
import { useProductListing } from '@store/domain/products/useProductListing';
import { useWishlist } from '@store/domain/wishlist/useWishlist';
import { useCart } from '@store/domain/cart/useCart';
```

**Acciones:**
- ✅ Ya existe `src/domains/store/components/TiendaCompleta.jsx`
- ⚠️ Verificar que `pages/tienda.jsx` use import correcto
- ⚠️ Crear `ProductDetail.jsx` o corregir `pages/producto/[productId].jsx` para usar componente existente
- ⚠️ Verificar que `TiendaCompleta.jsx` use hooks de dominio

---

### 3.5. Shared

**Estado final ideal:**

```
src/shared/
├── components/
│   ├── layout/                    # (opcional)
│   │   └── BaseLayout.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Input.jsx
│       ├── Modal.jsx
│       └── ErrorBoundary.jsx
├── lib/
│   ├── db.js
│   ├── constants.js
│   ├── utils.js                   # cn(), helpers genéricos
│   └── utils/
│       ├── whatsapp.js
│       └── routerCompat.js
└── hooks/                         # (opcional) Solo hooks realmente compartidos
```

**Imports correctos:**

```javascript
import { openWhatsApp } from '@shared/lib/utils/whatsapp';
import { getProducts } from '@shared/lib/db';
import ErrorBoundary from '@shared/components/ui/ErrorBoundary';
import { cn } from '@shared/lib/utils';
```

**Acciones:**
- ✅ Ya existe estructura básica
- ⚠️ Eliminar `src/components/ui/ErrorBoundary.jsx` (duplicado)
- ⚠️ Mover componentes genéricos de `src/components/ui/` a `src/shared/components/ui/` si son realmente compartidos

---

### 3.6. Layouts

**Estado final ideal:**

```
src/layouts/
├── MarketingLayout.jsx
├── MarketingHeader.jsx
├── StoreLayout.jsx
├── StoreHeader.jsx
├── Footer.jsx                     # Puede envolver al de shared
├── Header.jsx                     # (si lo sigues usando)
├── ResponsiveHeader.jsx           # (si lo sigues usando)
└── ResponsiveFooter.jsx          # (si lo sigues usando)
```

**Imports correctos:**

```javascript
import MarketingLayout from '@layouts/MarketingLayout';
import StoreLayout from '@layouts/StoreLayout';
```

**✅ Ya está correcto** - No mover.

---

### 3.7. Utils / Shim (Temporal)

**Mientras terminas la migración, puedes mantener:**

```
src/utils/
└── whatsapp.js                    # Re-exporta de @shared/lib/utils/whatsapp
```

**Contenido del shim:**

```javascript
// src/utils/whatsapp.js
export * from '@shared/lib/utils/whatsapp';
```

**⚠️ Cuando ya ningún archivo use `../../utils/whatsapp`, puedes borrar `src/utils/`.**

---

### 3.8. Mover `_trash` fuera de `src/`

**Acción:**
```bash
# Mover _trash de src/ a la raíz
mv src/_trash/ _trash/
```

Esto asegura que Next.js no lo procese.

---

## 4. 📝 IMPORTS QUE DEBEN QUEDAR AL FINAL

**Regla:** Todo lo importante va por **alias**, no por `../../`.

### 4.1. Imports correctos (usar estos)

```javascript
// ===== SHARED =====
import { openWhatsApp } from '@shared/lib/utils/whatsapp';
import { getProducts } from '@shared/lib/db';
import { getProductById } from '@shared/lib/db';
import { getCategories } from '@shared/lib/db';
import { getCategoryBySlug } from '@shared/lib/db';
import ErrorBoundary from '@shared/components/ui/ErrorBoundary';
import { cn } from '@shared/lib/utils';

// ===== STORE DOMAIN (Lógica de negocio) =====
import { useCart } from '@store/domain/cart/useCart';
import { useWishlist } from '@store/domain/wishlist/useWishlist';
import { useProducts } from '@store/domain/products/useProducts';
import { useProductListing } from '@store/domain/products/useProductListing';
import { useCategories } from '@store/domain/categories/useCategories';

// ===== LAYOUTS =====
import MarketingLayout from '@layouts/MarketingLayout';
import StoreLayout from '@layouts/StoreLayout';

// ===== DOMINIOS =====
// Blog
import BlogTemplate from '@domains/blog/components/BlogTemplate';
import ArticleManager from '@domains/blog/components/ArticleManager';
import ArticleCreator from '@domains/blog/components/ArticleCreator';
import { useProfessionalBlog } from '@domains/blog/hooks/useProfessionalBlog';
import { getPostBySlug } from '@domains/blog/utils/blogUtils';
import { getAllPostSlugs } from '@domains/blog/utils/blogUtils';

// Services
import Servicios from '@domains/services/components/Servicios';
import InteractiveServices from '@domains/services/components/InteractiveServices';

// Store (UI)
import TiendaCompleta from '@domains/store/components/TiendaCompleta';
import CategoryLanding from '@domains/store/components/CategoryLanding';
import ProductDetail from '@domains/store/components/ProductDetail'; // (si existe)

// ===== DATA =====
import { categoriesConfig } from '@data/categories.config';
import { categoriesFullConfig } from '@data/categories.full-config';
```

### 4.2. Imports que NO deberían sobrevivir

```javascript
// ❌ NO USAR ESTOS:
import TiendaCompleta from '../features/store/TiendaCompleta';
import BlogTemplate from '../../features/blog/components/BlogTemplate';
import Servicios from '../features/services/Servicios';
import { getCategories } from '../lib/db';
import { openWhatsApp } from '../../utils/whatsapp';  // idealmente no
import { getPostBySlug } from '../../lib/utils/blogUtils';
import ArticleManager from '../features/blog/components/ArticleManager';
import ArticleCreator from '../features/blog/components/ArticleCreator';
import ErrorBoundary from '@components/ui/ErrorBoundary';
```

---

## 5. ✅ CHECKLIST FINAL DE VERIFICACIÓN

Cuando termines la refactorización, verifica lo siguiente:

### 5.1. Carpetas eliminadas

- [ ] `src/_trash/` → Movida a `/_trash` en la raíz
- [ ] `src/features/` → Eliminada (todo migrado)
- [ ] `src/components/` → Eliminada (todo migrado)
- [ ] `src/hooks/` → Eliminada (hooks en domains/ y store/domain/)
- [ ] `src/store/components/` → Eliminada (vacía o migrada)
- [ ] `src/store/views/` → Eliminada (vacía)
- [ ] `src/store/data/` → Eliminada (vacía)
- [ ] `src/pages/store/` → Eliminada (si está vacía)
- [ ] `src/domains/blog/pages/` → Eliminada (vacía)
- [ ] `src/domains/services/pages/` → Eliminada (vacía)
- [ ] `src/domains/store/pages/` → Eliminada (vacía)
- [ ] `src/components/lib/` → Eliminada (vacía)
- [ ] `src/components/components/` → Eliminada (estructura confusa)

### 5.2. Archivos duplicados eliminados

- [ ] `src/components/ui/ErrorBoundary.jsx` → Eliminado (mantener solo `src/shared/components/ui/ErrorBoundary.jsx`)
- [ ] `src/components/admin/ArticleCreator.jsx` → Eliminado (mantener solo `src/domains/blog/components/ArticleCreator.jsx`)
- [ ] `src/components/admin/ArticleManager.jsx` → Eliminado (mantener solo `src/domains/blog/components/ArticleManager.jsx`)

### 5.3. Imports actualizados en páginas

- [ ] `pages/tienda.jsx` → Usa `@domains/store/components/TiendaCompleta` y `@shared/lib/db`
- [ ] `pages/blog/[id].jsx` → Usa `@domains/blog/components/BlogTemplate` y `@domains/blog/utils/blogUtils`
- [ ] `pages/servicios.jsx` → Usa `@domains/services/components/Servicios`
- [ ] `pages/admin-blog.jsx` → Usa `@domains/blog/components/ArticleManager` y `ArticleCreator`
- [ ] `pages/producto/[productId].jsx` → Usa componente que **sí existe** en `@domains/store/components`
- [ ] `pages/ofertas.jsx` → Usa `@store/domain/products/useProducts`

### 5.4. Componentes usando hooks de dominio

- [ ] `domains/store/components/TiendaCompleta.jsx` → Usa `@store/domain/products/useProducts`, `useProductListing`, `useWishlist`, `useCart`

### 5.5. Búsquedas rápidas (no debe encontrar nada)

Ejecuta estos comandos y verifica que no encuentren resultados:

```bash
# No debe encontrar nada
rg "features/" src
rg "_trash" src
rg "src/components/admin" src
rg "components/ui/ErrorBoundary" src --exclude-dir=shared
```

### 5.6. Verificación de shims (opcional)

Si aún usas el shim de `utils/whatsapp`, verifica que solo sea temporal:

```bash
# Ver cuántos archivos aún usan el shim
rg "utils/whatsapp" src --exclude="shared/lib/utils/whatsapp"
```

### 5.7. Build y tests

- [ ] `npm run build` → Pasa sin errores
- [ ] `npm run lint` → Pasa sin errores de imports rotos
- [ ] `npm test` → Pasa (si tienes pruebas)

### 5.8. Estructura final verificada

- [ ] `src/domains/` contiene solo `blog/`, `services/`, `store/`
- [ ] `src/shared/` contiene solo `components/`, `lib/`
- [ ] `src/store/` contiene solo `domain/`
- [ ] `src/layouts/` contiene layouts
- [ ] `src/pages/` contiene solo rutas de Next.js
- [ ] `src/data/` contiene configuraciones
- [ ] `src/registry/` contiene MagicUI
- [ ] `src/styles/` contiene estilos globales

---

## 6. 🚀 ORDEN DE EJECUCIÓN RECOMENDADO

Para completar la refactorización sin romper nada, sigue este orden:

### Fase 1: Preparación
1. Mover `src/_trash/` a `/_trash` en la raíz
2. Verificar que no hay referencias a `_trash` en el código

### Fase 2: Actualizar imports en páginas
3. Corregir imports en `pages/tienda.jsx`
4. Corregir imports en `pages/blog/[id].jsx`
5. Corregir imports en `pages/servicios.jsx`
6. Corregir imports en `pages/admin-blog.jsx`
7. Corregir imports en `pages/producto/[productId].jsx`
8. Corregir imports en `pages/ofertas.jsx`

### Fase 3: Eliminar duplicados
9. Eliminar `src/components/ui/ErrorBoundary.jsx`
10. Eliminar `src/components/admin/ArticleCreator.jsx`
11. Eliminar `src/components/admin/ArticleManager.jsx`

### Fase 4: Mover componentes restantes
12. Mover componentes de `src/components/features/` a sus dominios correspondientes
13. Mover componentes de `src/components/ui/` a `src/shared/components/ui/` (si son compartidos)

### Fase 5: Eliminar carpetas vacías
14. Eliminar todas las carpetas vacías listadas en sección 2.1

### Fase 6: Verificación final
15. Ejecutar búsquedas rápidas (sección 5.5)
16. Ejecutar `npm run build`
17. Ejecutar `npm run lint`
18. Ejecutar `npm test` (si aplica)

---

## 7. 📚 NOTAS ADICIONALES

### 7.1. Sobre `src/store/domain/` vs `src/domains/store/`

- **`src/store/domain/`** → Lógica de negocio (Zustand stores, hooks de datos)
- **`src/domains/store/`** → Componentes UI y API routes

**No mover `src/store/domain/` a `src/domains/store/domain/`** - La separación actual es correcta:
- `store/domain/` = lógica pura de negocio
- `domains/store/` = presentación y API

### 7.2. Sobre `src/data/` vs `src/domains/store/data/`

- Si `src/data/` contiene datos compartidos entre dominios → Mantener en raíz
- Si `src/data/` contiene solo datos de la tienda → Mover a `src/domains/store/data/`

**Decisión actual:** Mantener en `src/data/` si es compartido.

### 7.3. Sobre `src/utils/` (shim)

El shim `src/utils/whatsapp.js` es temporal. Una vez que todos los imports usen `@shared/lib/utils/whatsapp`, puede eliminarse.

---

## 8. 🎯 RESULTADO FINAL ESPERADO

Después de completar este manual, tendrás:

✅ Un `src/` limpio y organizado  
✅ Imports consistentes usando aliases  
✅ Sin archivos duplicados  
✅ Sin carpetas vacías  
✅ Estructura alineada con arquitectura de dominios  
✅ Proyecto funcionando sin errores  

---

**Última actualización:** Enero 2025  
**Mantener este documento actualizado** cuando se hagan cambios estructurales al proyecto.

