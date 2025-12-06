# 📐 ESTRUCTURA POR DOMINIOS - RESUMEN VISUAL

## 🎯 Visión General

```
src/
├── marketing/     → Sitio informativo (servicios, blog, citas, contacto)
├── store/         → E-commerce (tienda, productos, carrito, wishlist)
└── shared/       → Componentes y utilidades compartidas
```

---

## 📊 Comparación: ANTES vs DESPUÉS

### ANTES (Actual)
```
src/
├── components/layout/        (mezclado: marketing + store)
├── features/blog/            (blog)
├── features/store/           (tienda - lógica mezclada con UI)
├── data/                     (mezclado: marketing + store)
├── hooks/                    (mezclado)
└── lib/                      (mezclado)
```

### DESPUÉS (Propuesto)
```
src/
├── marketing/
│   ├── components/           (solo componentes de marketing)
│   ├── domain/               (lógica de negocio: blog, servicios, citas)
│   ├── data/                 (solo datos de marketing)
│   └── hooks/                (solo hooks de marketing)
│
├── store/
│   ├── components/           (solo componentes de tienda)
│   ├── domain/               (lógica de negocio: productos, carrito, wishlist)
│   ├── data/                 (solo datos de tienda)
│   └── hooks/                (solo hooks de tienda)
│
└── shared/
    ├── components/           (Footer, UI genéricos)
    └── lib/                  (whatsapp, db, utils comunes)
```

---

## 🔑 Cambios Clave

### 1. Separación de Lógica de Negocio

**ANTES:**
```javascript
// TiendaCompleta.jsx (1786 líneas)
const [searchTerm, setSearchTerm] = useState('');
const [wishlist, setWishlist] = useState([]);
const getFilteredAndSortedProducts = () => {
  // 50+ líneas de lógica mezclada con UI
};
```

**DESPUÉS:**
```javascript
// TiendaCompleta.jsx (componente limpio, ~200 líneas)
import { useProductFilters } from '../../domain/products/useProductFilters';
import { useWishlist } from '../../domain/wishlist/useWishlist';

const { filteredProducts, searchTerm, setSearchTerm } = useProductFilters(products);
const { toggle: toggleWishlist } = useWishlist();
// Solo renderizado, sin lógica
```

### 2. Estado Global Centralizado

**Store Domain:**
- `store/domain/cart/cartStore.js` - Estado del carrito (Zustand)
- `store/domain/wishlist/wishlistStore.js` - Estado de wishlist (Zustand)
- `store/domain/products/useProductFilters.js` - Lógica de filtrado

**Marketing Domain:**
- `marketing/domain/blog/blogStore.js` - Estado del blog (ya existe)

### 3. Hooks Limpios

**ANTES:**
```javascript
// Lógica mezclada en componente
const [wishlist, setWishlist] = useState([]);
const handleAddToWishlist = (id) => {
  setWishlist(prev => [...prev, id]);
};
```

**DESPUÉS:**
```javascript
// Hook limpio, reutilizable
import { useWishlist } from '../../domain/wishlist/useWishlist';
const { add, remove, toggle, isInWishlist } = useWishlist();
```

---

## 📁 Estructura Detallada

### `marketing/`
```
marketing/
├── components/
│   ├── blog/              (ArticleCard, BlogTemplate, etc.)
│   ├── services/          (InteractiveServices, ServiceDetail)
│   ├── forms/             (ContactForm, AppointmentForm)
│   └── layout/           (MarketingLayout, MarketingHeader)
│
├── domain/
│   ├── blog/
│   │   ├── useBlogFilters.js      ← Lógica de filtrado
│   │   ├── useBlogPosts.js         ← Fetching de posts
│   │   └── blogStore.js            ← Estado global
│   ├── services/
│   │   └── useServices.js         ← Lógica de servicios
│   └── appointments/
│       └── useAppointments.js     ← Lógica de citas
│
└── data/
    └── servicios-detalle-content.md
```

### `store/`
```
store/
├── components/
│   ├── product/           (ProductCard, ProductGrid, ProductDetail)
│   ├── category/          (CategoryCard, CategoryGrid, CategoryLanding)
│   ├── cart/              (CartItem, CartSummary, CartPage)
│   ├── filters/           (SearchBar, CategoryFilter, SortSelector)
│   ├── store/             (TiendaCompleta, HeroCarousel)
│   └── layout/            (StoreLayout, StoreHeader)
│
├── domain/                ← 🎯 LÓGICA DE NEGOCIO AQUÍ
│   ├── products/
│   │   ├── useProducts.js          ← Fetching
│   │   ├── useProductFilters.js    ← Filtrado
│   │   ├── useProductSearch.js     ← Búsqueda
│   │   └── useProductSort.js       ← Ordenamiento
│   ├── cart/
│   │   ├── cartStore.js            ← Estado global (Zustand)
│   │   ├── useCart.js              ← Hook limpio
│   │   └── useCartCalculations.js  ← Cálculos
│   ├── wishlist/
│   │   ├── wishlistStore.js        ← Estado global (Zustand)
│   │   └── useWishlist.js          ← Hook limpio
│   └── categories/
│       └── useCategories.js        ← Fetching categorías
│
└── data/
    ├── categories.config.js
    ├── categories.full-config.js
    └── products.config.js
```

### `shared/`
```
shared/
├── components/
│   ├── layout/            (Footer)
│   └── ui/                (Button, Card, Input, Modal)
│
└── lib/
    ├── utils/
    │   ├── whatsapp.js
    │   ├── routerCompat.js
    │   └── format.js
    └── db.js
```

---

## 🚀 Orden de Implementación

1. **Crear estructura de carpetas** (vacía)
2. **Extraer lógica de negocio** (store/domain/*)
3. **Refactorizar TiendaCompleta** (usar hooks de domain)
4. **Mover archivos** (componentes y datos)
5. **Actualizar imports** (en todas las páginas)

---

## ✅ Beneficios

- ✅ **Separación clara** de Marketing vs Store
- ✅ **Lógica aislada** de UI (testeable independientemente)
- ✅ **Componentes más pequeños** y mantenibles
- ✅ **Reutilización** de hooks de domain
- ✅ **Escalabilidad** - fácil agregar features

---

**Ver plan completo:** `PLAN_REORGANIZACION_DOMINIOS.md`

