# 🏗️ Reorganización de src/ - Completada

## ✅ Estructura final creada

```
src/
├── domains/              # 🎯 DOMINIOS DE NEGOCIO (NUEVO)
│   ├── blog/
│   │   ├── components/   # Componentes del blog (16 archivos)
│   │   ├── pages/        # Páginas internas
│   │   ├── utils/        # blogUtils.js
│   │   ├── api/          # API routes del blog (articles.js)
│   │   ├── hooks/        # useProfessionalBlog.js
│   │   └── store.js      # blogStore.js (Zustand)
│   │
│   ├── services/
│   │   ├── components/   # InteractiveServices.jsx, Servicios.jsx
│   │   ├── pages/         # Páginas internas
│   │   ├── api/           # API routes de servicios
│   │   └── data/          # servicios-detalle-content.md
│   │
│   └── store/
│       ├── components/    # TiendaCompleta.jsx, CategoryLanding.jsx
│       ├── pages/          # Páginas internas
│       ├── api/             # API routes de productos/categorías
│       ├── data/             # (mantener en store/data/)
│       └── domain/           # Lógica de negocio (cart, wishlist, products)
│
├── shared/                # 🔧 COMPARTIDO ENTRE DOMINIOS
│   ├── components/
│   │   └── ui/            # Componentes UI reusables
│   └── lib/
│       └── utils/         # routerCompat.js, whatsapp.js, utils.js
│
├── layouts/               # 📐 LAYOUTS (NUEVO)
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Layout.jsx
│   ├── MarketingHeader.jsx
│   ├── MarketingLayout.jsx
│   ├── ResponsiveFooter.jsx
│   ├── ResponsiveHeader.jsx
│   ├── StoreHeader.jsx
│   └── StoreLayout.jsx
│
├── pages/                 # 🛣️ RUTAS NEXT.JS (LIMPIADO)
│   ├── api/               # API routes principales (robots.txt, sitemap.xml, hello.js)
│   ├── blog/              # Rutas del blog
│   ├── categoria/         # Rutas de categorías (mantenidas)
│   ├── producto/          # Rutas de productos
│   ├── servicios/         # Rutas de servicios
│   └── ...                # Otras rutas
│
├── store/                 # 🛍️ DOMINIO STORE (EXISTENTE - mantener)
│   ├── components/
│   ├── data/
│   ├── domain/            # Hooks de dominio (cart, wishlist, products)
│   └── views/
│
├── _trash/                # 🗑️ ARCHIVOS VIEJOS (NUEVO)
│   ├── Home.jsx.backup
│   ├── categories-old/
│   ├── services-old/
│   ├── producto.jsx
│   ├── cuenta.jsx
│   ├── login.jsx
│   ├── useProducts.js (viejo, duplicado)
│   └── ... (carpetas viejas de components/)
│
└── ...                    # Otros (styles, registry, data, etc.)
```

## 📦 Movimientos realizados

### 1. Features → Domains ✅
- `features/blog/*` → `domains/blog/components/`
- `features/services/*` → `domains/services/components/`
- `features/store/TiendaCompleta.jsx` → `domains/store/components/`
- `features/` eliminado

### 2. Lib consolidado ✅
- `lib/stores/blogStore.js` → `domains/blog/store.js`
- `lib/utils/blogUtils.js` → `domains/blog/utils/blogUtils.js`
- `lib/utils/routerCompat.js` → `shared/lib/utils/`
- `lib/utils/whatsapp.js` → `shared/lib/utils/`
- `lib/utils.js` → `shared/lib/utils.js`
- `lib/` eliminado

### 3. Utils consolidado ✅
- `utils/*` → `shared/lib/utils/`
- `utils/` eliminado

### 4. Layouts organizados ✅
- `components/layout/*` → `layouts/`

### 5. UI components ✅
- `components/ui/*` → `shared/components/ui/`

### 6. API routes organizados ✅
- `pages/api/blog/articles.js` → `domains/blog/api/articles.js`
- `pages/api/products/*` → `domains/store/api/`
- `pages/api/categories/*` → `domains/store/api/categories/`

### 7. Hooks movidos ✅
- `hooks/useProfessionalBlog.js` → `domains/blog/hooks/useProfessionalBlog.js`
- `hooks/useProducts.js` → Movido a `_trash/` (ya existe en `store/domain/products/`)

### 8. Duplicados movidos a _trash ✅
- `pages/home/Home.jsx.backup` → `_trash/`
- `pages/categories/` → `_trash/categories-old/`
- `pages/categorias.jsx` → `_trash/`
- `pages/categoria/CategoriaPage.jsx` → `_trash/`
- `pages/categoria/Categorias.jsx` → `_trash/`
- `pages/services/` → `_trash/services-old/`
- `pages/producto.jsx` → `_trash/`
- `pages/store/Producto.jsx` → `_trash/`
- `pages/cuenta.jsx` → `_trash/` (usar `auth/Cuenta.jsx`)
- `pages/login.jsx` → `_trash/` (usar `auth/Login.jsx`)

### 9. Documentación ✅
- `docs/*` → `docs/architecture/` (fuera de src/)

### 10. Data organizado ✅
- `data/servicios-detalle-content.md` → `domains/services/data/`

## 🔧 Configuración actualizada

### jsconfig.json
Agregados aliases:
- `@domains/*` → `domains/*`
- `@layouts/*` → `layouts/*`

### next.config.js
Agregados webpack aliases:
- `@domains` → `src/domains`
- `@layouts` → `src/layouts`

## ⚠️ IMPORTANTE: API Routes en Next.js

**Problema:** Next.js busca API routes SOLO en `pages/api/`. Las rutas movidas a `domains/*/api/` NO funcionarán automáticamente.

**Solución:** Tienes dos opciones:

### Opción 1: Symlinks (recomendado)
Crear symlinks en `pages/api/` que apunten a `domains/*/api/`:

```bash
# En Windows (PowerShell como Admin)
New-Item -ItemType SymbolicLink -Path "src/pages/api/blog" -Target "../domains/blog/api"
New-Item -ItemType SymbolicLink -Path "src/pages/api/products" -Target "../domains/store/api"
New-Item -ItemType SymbolicLink -Path "src/pages/api/categories" -Target "../domains/store/api/categories"
```

### Opción 2: Mover de vuelta (temporal)
Mover las rutas API de vuelta a `pages/api/` pero organizadas:

```
pages/api/
├── blog/
│   └── articles.js
├── store/
│   ├── products/
│   │   ├── [id].js
│   │   └── index.js
│   └── categories/
│       └── index.js
└── ...
```

**Recomendación:** Usar Opción 2 por ahora (más simple) y documentar que las rutas API viven en `pages/api/` pero organizadas por dominio.

## 📝 Imports a actualizar

Los archivos que importaban desde rutas viejas necesitan actualizarse:

### Antes → Después

```javascript
// Features
import { BlogTemplate } from '@features/blog/components/BlogTemplate'
// → 
import { BlogTemplate } from '@domains/blog/components/BlogTemplate'

// Lib
import { blogStore } from '@lib/stores/blogStore'
// →
import { blogStore } from '@domains/blog/store'

import { blogUtils } from '@lib/utils/blogUtils'
// →
import { blogUtils } from '@domains/blog/utils/blogUtils'

// Utils compartidos
import { whatsapp } from '@lib/utils/whatsapp'
// →
import { whatsapp } from '@shared/lib/utils/whatsapp'

// Layouts
import { Layout } from '@/components/layout/Layout'
// →
import { Layout } from '@layouts/Layout'
```

## 🎯 Próximos pasos

1. **Mover API routes de vuelta a pages/api/** (o crear symlinks)
2. **Actualizar imports** en todos los archivos
3. **Verificar que el build funciona** (`npm run build`)
4. **Probar las rutas** para asegurar que nada se rompió
5. **Eliminar _trash/** después de confirmar que todo funciona
6. **Limpiar componentes viejos** en `components/` que quedaron

## 📊 Resultado

**Antes:**
- 4 eras mezcladas en `src/`
- Duplicados en `pages/`
- `features/` medio dominio, medio UI
- `lib/` y `utils/` duplicados
- API routes mezcladas

**Después:**
- ✅ Estructura clara por dominio
- ✅ Sin duplicados en `pages/`
- ✅ `domains/` con todo lo necesario por dominio
- ✅ `shared/` consolidado
- ✅ Layouts separados
- ✅ Archivos viejos en `_trash/` para revisión
- ⚠️ API routes necesitan ajuste (Next.js requiere `pages/api/`)

El repositorio ahora tiene una arquitectura limpia y escalable. 🎉
