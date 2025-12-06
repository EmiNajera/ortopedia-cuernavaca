# 📋 PLAN DE REORGANIZACIÓN POR DOMINIOS
## Ortopedia Cuernavaca - Arquitectura Limpia

**Fecha:** 2025-01-27  
**Estado:** 📝 PLANIFICACIÓN - Sin cambios implementados  
**Objetivo:** Separar claramente Marketing, Store y Shared, aislar lógica de negocio de UI

---

## 🎯 OBJETIVOS

1. **Reorganizar por dominios** dentro de `src/`:
   - `marketing/` - Sitio informativo (servicios, blog, citas, contacto)
   - `store/` - E-commerce (tienda, categorías, productos, carrito)
   - `shared/` - Componentes y utilidades compartidas

2. **Aislar lógica de negocio de UI**:
   - Extraer filtros, búsqueda, wishlist, carrito a hooks/domain logic
   - Componentes solo reciben "datos ya procesados"

## ⚠️ PRINCIPIOS DE IMPLEMENTACIÓN

### No sobre-fragmentar demasiado pronto
- Empezar con hooks más grandes que encapsulen múltiples responsabilidades
- Partir solo cuando realmente se necesite separar
- Ejemplo: `useProductListing` (filtros + búsqueda + sort) en lugar de 3 hooks separados

### Usar "views" en lugar de "pages" internas
- `store/views/` y `marketing/views/` para componentes de página internos
- `src/pages/` sigue siendo el entrypoint de Next.js
- Evitar confusión sobre quién es el "entrypoint" vs "vista de dominio"

### Priorizar fases críticas (NUMERACIÓN CONSISTENTE)

**Orden operativo (qué hacer primero):**
- **Fase 0 (PRIMERO):** Deploy marketing (exportable + subir al VPS) - Tener web pública funcionando
- **Fase 1 (CRÍTICA para refactor):** Lógica de dominio store (cart, wishlist, useProductListing, useProducts, useCategories)
- **Fase 2:** Refactor TiendaCompleta para usar esos hooks
- **Fase 3:** Configurar aliases (@store, @shared, @marketing)
- **Fase 4:** Mover archivos de Store y Shared
- **Fase 5 (Opcional):** Marketing/domain (después de estabilizar Store)
- **Fase 6:** Limpieza final

**Nota:** Fase 0 es lo primero operativamente (deploy), Fase 1 es lo crítico para el refactor arquitectónico.

### Aliases claros para imports
- Configurar `@marketing/*`, `@store/*`, `@shared/*` en `jsconfig.json`
- Evitar `../../../../` infernales

---

## 📊 ESTRUCTURA ACTUAL (ANTES)

```
src/
├── components/
│   ├── layout/
│   │   ├── MarketingLayout.jsx
│   │   ├── MarketingHeader.jsx
│   │   ├── StoreLayout.jsx
│   │   ├── StoreHeader.jsx
│   │   └── Footer.jsx (compartido)
│   ├── features/
│   │   └── store/
│   │       └── CategoryLanding.jsx
│   └── ui/ (componentes genéricos)
│
├── features/
│   ├── blog/ (componentes de blog)
│   ├── services/ (componentes de servicios)
│   └── store/
│       └── TiendaCompleta.jsx (1786 líneas, lógica mezclada)
│
├── pages/ (Next.js pages - NO MOVER)
│   ├── index.jsx
│   ├── tienda.jsx
│   ├── servicios.jsx
│   ├── blog/
│   └── categoria/
│
├── data/
│   ├── categories.config.js
│   ├── categories.full-config.js
│   ├── products.config.js
│   └── servicios-detalle-content.md
│
├── hooks/
│   ├── useProducts.js
│   └── useProfessionalBlog.js
│
└── lib/
    ├── db.js
    ├── stores/
    │   └── blogStore.js (Zustand)
    └── utils/
        ├── blogUtils.js
        ├── whatsapp.js
        └── routerCompat.js
```

**Problemas identificados:**
- ❌ Lógica de negocio mezclada con UI en `TiendaCompleta.jsx`
- ❌ Estado duplicado (StoreLayout y TiendaCompleta tienen wishlist/search)
- ❌ Datos de marketing y store mezclados en `data/`
- ❌ Componentes compartidos no claramente identificados
- ❌ No hay separación clara de dominios

---

## 🏗️ ESTRUCTURA PROPUESTA (DESPUÉS)

```
src/
│
├── marketing/                          # 🟢 DOMINIO: Marketing/Sitio Informativo
│   ├── pages/                          # Páginas específicas de marketing (si se migran)
│   │   ├── servicios.jsx
│   │   ├── citas.jsx
│   │   ├── contacto.jsx
│   │   ├── nosotros.jsx
│   │   └── blog/
│   │       ├── index.jsx
│   │       └── [id].jsx
│   │
│   ├── components/                     # Componentes específicos de marketing
│   │   ├── blog/
│   │   │   ├── ArticleCard.jsx
│   │   │   ├── ArticleContent.jsx
│   │   │   ├── BlogTemplate.jsx
│   │   │   └── ProfessionalArticleTemplate.jsx
│   │   ├── services/
│   │   │   ├── InteractiveServices.jsx
│   │   │   ├── Servicios.jsx
│   │   │   └── ServiceDetail.jsx
│   │   ├── forms/
│   │   │   ├── ContactForm.jsx
│   │   │   └── AppointmentForm.jsx
│   │   └── layout/
│   │       ├── MarketingLayout.jsx
│   │       └── MarketingHeader.jsx
│   │
│   ├── domain/                         # 🎯 LÓGICA DE NEGOCIO (FUTURO)
│   │   └── (Se implementará después de estabilizar Store. No es prioritaria para el primer release.)
│   │       # marketing/domain/blog/useBlogFilters.js
│   │       # marketing/domain/blog/useBlogPosts.js
│   │       # marketing/domain/appointments/useAppointments.js
│   │       # Implementar cuando realmente haga falta, no por adelantado
│   │
│   ├── data/                           # Datos específicos de marketing
│   │   ├── servicios-detalle-content.md
│   │   ├── services-config.js
│   │   └── blog-posts/ (si se mueven)
│   │
│   └── hooks/                          # Hooks específicos de marketing
│       └── useProfessionalBlog.js
│
├── store/                              # 🛍️ DOMINIO: E-commerce
│   ├── views/                          # Vistas internas (NO rutas Next.js)
│   │   ├── TiendaView.jsx              # Vista de tienda principal
│   │   ├── CategoriasView.jsx          # Vista de categorías
│   │   ├── CategoryLandingView.jsx    # Vista de categoría individual
│   │   ├── ProductView.jsx             # Vista de producto
│   │   └── CartView.jsx                # Vista de carrito (NO "CartPage" para evitar duplicado con components/cart/)
│   │
│   ├── components/                      # Componentes específicos de tienda
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   └── ProductDetail.jsx
│   │   ├── category/
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── CategoryGrid.jsx
│   │   │   └── CategoryLanding.jsx
│   │   ├── cart/
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── CartPageContent.jsx    # Contenido del carrito (NO "CartPage" para evitar duplicado)
│   │   ├── filters/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── SortSelector.jsx
│   │   │   └── WishlistToggle.jsx
│   │   ├── store/
│   │   │   ├── TiendaCompleta.jsx (refactorizado, más pequeño)
│   │   │   ├── HeroCarousel.jsx
│   │   │   └── RehabilitationCenter.jsx
│   │   └── layout/
│   │       ├── StoreLayout.jsx
│   │       └── StoreHeader.jsx
│   │
│   ├── domain/                         # 🎯 LÓGICA DE NEGOCIO (CRÍTICO)
│   │   ├── products/
│   │   │   ├── useProducts.js          # Fetching de productos
│   │   │   └── useProductListing.js   # Filtrado + búsqueda + ordenamiento (TODO EN UNO)
│   │   │                               # ⚠️ Empezar así, partir después si hace falta
│   │   ├── cart/
│   │   │   ├── useCart.js              # Gestión de carrito
│   │   │   ├── cartStore.js            # Estado global del carrito (Zustand)
│   │   │   └── useCartCalculations.js  # Cálculos de totales, envío, etc.
│   │   ├── wishlist/
│   │   │   ├── useWishlist.js          # Gestión de wishlist
│   │   │   └── wishlistStore.js        # Estado global (Zustand)
│   │   ├── categories/
│   │   │   ├── useCategories.js        # Fetching de categorías
│   │   │   └── categoryUtils.js        # Utilidades de categorías
│   │   └── store/
│   │       └── storeState.js           # Estado global combinado (opcional)
│   │
│   ├── data/                           # Datos específicos de tienda
│   │   ├── categories.config.js
│   │   ├── categories.full-config.js
│   │   ├── products.config.js
│   │   └── products.json
│   │
│   └── hooks/                          # Hooks específicos de tienda
│       └── useProducts.js (mover aquí desde src/hooks)
│
└── shared/                             # 🔄 COMPARTIDO
    ├── components/
    │   ├── layout/
    │   │   ├── Footer.jsx              # Footer compartido
    │   │   └── BaseLayout.jsx         # Layout base común (opcional)
    │   ├── ui/                          # Componentes UI genéricos
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   ├── Input.jsx
    │   │   ├── Modal.jsx
    │   │   └── ErrorBoundary.jsx
    │   └── forms/
    │       └── FormField.jsx
    │
    ├── lib/
    │   ├── utils/
    │   │   ├── whatsapp.js              # Utilidad compartida
    │   │   ├── routerCompat.js          # Compatibilidad router
    │   │   └── format.js               # Formateo (precios, fechas, etc.)
    │   ├── db.js                        # Conexión DB compartida
    │   └── constants.js                 # Constantes globales
    │
    └── hooks/
        └── (hooks realmente compartidos, si los hay)
```

**Nota importante:** 
- `src/pages/` (Next.js pages) **NO SE MUEVE** - Next.js requiere que esté en la raíz
- `store/views/` y `marketing/views/` son **vistas internas de dominio**, no rutas Next.js
- En `src/pages/tienda.jsx` solo se importa: `import { TiendaView } from '@store/views/TiendaView'`
- Esto deja claro quién es "entrypoint Next" vs "vista de dominio"

---

## 🔄 MAPA DE MIGRACIÓN

### Fase 0: Deploy marketing (PRIORIDAD INMEDIATA)

**Objetivo:** Comprobar que marketing (home, servicios, blog, citas) exporta bien con `next export` y subir al VPS

**Acciones:**
- [ ] Verificar que todas las páginas de marketing funcionan
- [ ] Ejecutar `next export` y verificar que no hay errores
- [ ] Preparar para deploy (variables de entorno, build, etc.)
- [ ] Subir al VPS
- [ ] Verificar que funciona en producción

**Razón:** Tener web pública, SEO, tarjeta de presentación antes de refactorizar

---


**Primero:** Crear estructura de carpetas vacías y configurar aliases
```
✅ Crear carpetas vacías:
- src/store/
- src/store/components/
- src/store/domain/
- src/store/data/
- src/store/views/
- src/shared/
- src/shared/components/
- src/shared/lib/

✅ Configurar aliases:
- Actualizar jsconfig.json (baseUrl: "src", paths: @store, @shared, @marketing)
- Actualizar next.config.js (webpack aliases)
- Verificar que puedes importar con @store/... sin mover nada todavía
```

**Luego:** Implementar hooks de dominio

**En branch:** `refactor/domain-reorganization`

#### 1.1. Crear `store/domain/cart/`

**Archivo:** `src/store/domain/cart/cartStore.js`
```javascript
// Estado global del carrito con Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => { ... },
      removeItem: (productId) => { ... },
      updateQuantity: (productId, quantity) => { ... },
      clearCart: () => { ... },
      getTotal: () => { ... },
      getSubtotal: () => { ... },
      getShipping: () => { ... },
    }),
    { name: 'cart-storage' }
  )
);
```

**Archivo:** `src/store/domain/cart/useCart.js`
```javascript
// Hook que expone solo lo necesario para UI
export function useCart() {
  const store = useCartStore();
  
  return {
    items: store.items,
    addItem: store.addItem,
    removeItem: store.removeItem,
    total: store.getTotal(),
    subtotal: store.getSubtotal(),
    shipping: store.getShipping(),
    itemCount: store.items.length,
    isEmpty: store.items.length === 0,
  };
}
```

#### 1.2. Crear `store/domain/wishlist/`

**Archivo:** `src/store/domain/wishlist/wishlistStore.js`
```javascript
// Estado global de wishlist
export const useWishlistStore = create(
  persist(
    (set) => ({
      items: [],
      add: (productId) => { ... },
      remove: (productId) => { ... },
      toggle: (productId) => { ... },
      isInWishlist: (productId) => { ... },
    }),
    { name: 'wishlist-storage' }
  )
);
```

**Archivo:** `src/store/domain/wishlist/useWishlist.js`
```javascript
export function useWishlist() {
  const store = useWishlistStore();
  return {
    items: store.items,
    add: store.add,
    remove: store.remove,
    toggle: store.toggle,
    isInWishlist: store.isInWishlist,
    count: store.items.length,
  };
}
```

#### 1.3. Crear `store/domain/products/`

**Archivo:** `src/store/domain/products/useProductListing.js`
```javascript
// ⚠️ EMPEZAR CON UN SOLO HOOK que encapsule todo
// Partir después solo si realmente hace falta
// Lógica de filtrado + búsqueda + ordenamiento (extraída de TiendaCompleta)
export function useProductListing(products) {
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  
  const { items: wishlistItems } = useWishlist();
  
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    // Filtrar por categoría
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    
    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar solo wishlist
    if (showWishlistOnly) {
      filtered = filtered.filter(p => wishlistItems.includes(p.id));
    }
    
    // Ordenar
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high':
        return filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'name':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [products, category, searchTerm, sortBy, showWishlistOnly, wishlistItems]);
  
  return {
    filteredProducts,
    category,
    setCategory,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    showWishlistOnly,
    setShowWishlistOnly,
  };
}
```

**Archivo:** `src/store/domain/products/useProducts.js` (mover y mejorar)
```javascript
// Ya existe en src/hooks/useProducts.js - mover aquí y mejorar
export function useProducts(filters = {}) {
  // Lógica de fetching desde API
  // Retorna: { products, loading, error }
}
```

#### 1.4. Crear `store/domain/categories/`

#### 1.5. Crear sandbox de prueba

**Archivo:** `src/pages/dev-sandbox.jsx` (temporal, para probar hooks)
```javascript
// Página temporal para probar que los hooks funcionan
import { useCart } from '@store/domain/cart/useCart';
import { useWishlist } from '@store/domain/wishlist/useWishlist';
import { useProductListing } from '@store/domain/products/useProductListing';
import { useProducts } from '@store/domain/products/useProducts';

export default function DevSandbox() {
  const cart = useCart();
  const wishlist = useWishlist();
  const { products, loading } = useProducts();
  const listing = useProductListing(products);
  
  return (
    <div className="p-8">
      <h1>Sandbox de Hooks</h1>
      <pre>{JSON.stringify({ cart, wishlist, products: products.length, listing }, null, 2)}</pre>
    </div>
  );
}
```

**Razón:** Verificar que la lógica funciona aislada antes de integrarla en UI

**Archivo:** `src/store/domain/categories/useCategories.js`
```javascript
export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch desde API o config
    getCategories().then(setCategories).finally(() => setLoading(false));
  }, []);
  
  return { categories, loading };
}
```

### Fase 2: Refactor TiendaCompleta para usar hooks (refactor mínimo)

**Enfoque:** Cambio mínimo, solo reemplazar estado local por hooks, sin cambiar demasiado el JSX

**ANTES (1786 líneas, lógica mezclada):**
```javascript
// TiendaCompleta.jsx
const [searchTerm, setSearchTerm] = useState('');
const [wishlist, setWishlist] = useState([]);
const [sortBy, setSortBy] = useState('default');
const [showWishlistOnly, setShowWishlistOnly] = useState(false);

const getFilteredAndSortedProducts = () => {
  // 50+ líneas de lógica de filtrado
};

const handleAddToWishlist = (productId) => {
  // Lógica de wishlist
};
```

**DESPUÉS (componente limpio, solo UI):**
```javascript
// store/components/store/TiendaCompleta.jsx
import { useProducts } from '../../domain/products/useProducts';
import { useProductListing } from '../../domain/products/useProductListing'; // ⚠️ Un solo hook
import { useWishlist } from '../../domain/wishlist/useWishlist';
import { HeroCarousel } from './HeroCarousel';
import { ProductGrid } from '../product/ProductGrid';
import { CategoryGrid } from '../category/CategoryGrid';

export function TiendaCompleta({ categories = [] }) {
  // Fetch productos
  const { products, loading } = useProducts();
  
  // Filtros + búsqueda + sort (TODO EN UNO - empezar así)
  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    // ...
  } = useProductListing(products);
  
  // Wishlist (lógica extraída)
  const { toggle: toggleWishlist, isInWishlist } = useWishlist();
  
  // Solo renderizado
  return (
    <div>
      <HeroCarousel />
      <CategoryGrid categories={categories} />
      <ProductGrid 
        products={filteredProducts}
        onWishlistToggle={toggleWishlist}
        isInWishlist={isInWishlist}
      />
    </div>
  );
}
```

### Fase 4: Mover archivos de Store y Shared

#### 4.1. Store (PRIORIDAD ALTA)
```
MOVER:
- src/features/store/TiendaCompleta.jsx → src/store/components/store/
- src/components/features/store/CategoryLanding.jsx → src/store/components/category/
- src/data/categories.* → src/store/data/
- src/data/products.* → src/store/data/
- src/hooks/useProducts.js → src/store/domain/products/
```

#### 4.2. Shared (PRIORIDAD ALTA)
```
MOVER:
- src/components/layout/Footer.jsx → src/shared/components/layout/
- src/lib/utils/whatsapp.js → src/shared/lib/utils/
- src/lib/utils/routerCompat.js → src/shared/lib/utils/
- src/lib/db.js → src/shared/lib/
- src/components/ui/* → src/shared/components/ui/
```

#### 4.3. Marketing (PRIORIDAD BAJA - DESPUÉS)
```
⚠️ NO MOVER TODAVÍA - Priorizar que Marketing sea exportable primero
Mover después cuando la tienda esté estable:
- src/features/blog/ → src/marketing/components/blog/
- src/features/services/ → src/marketing/components/services/
- src/data/servicios-detalle-content.md → src/marketing/data/
- src/lib/stores/blogStore.js → src/marketing/domain/blog/
- src/lib/utils/blogUtils.js → src/marketing/domain/blog/
- src/hooks/useProfessionalBlog.js → src/marketing/hooks/
```

### Fase 5: Marketing/domain (Opcional - Futuro)

**Nota:** Esta sección se implementará después de estabilizar Store. No es prioritaria para el primer release.

---

### Fase 6: Limpieza final

**Acciones:**
- [ ] Eliminar `pages/dev-sandbox.jsx` (ya no necesario)
- [ ] Eliminar carpetas vacías antiguas
- [ ] Actualizar documentación
- [ ] Verificar que build funciona
- [ ] Verificar que dev server funciona
- [ ] **Tests:** Ejecutar todos los tests y arreglar imports

---

## 📝 CHECKLIST DE IMPLEMENTACIÓN

### Fase 0: Deploy marketing
- [ ] Comprobar que marketing exporta bien con `next export`
- [ ] Subir versión actual al VPS
- [ ] Verificar que funciona en producción

### Preparación
- [ ] Crear branch `refactor/domain-reorganization`
- [ ] Documentar dependencias actuales

### Fase 1: Lógica de dominio store (CRÍTICO)
- [ ] Crear `store/domain/cart/cartStore.js`
- [ ] Crear `store/domain/cart/useCart.js`
- [ ] Crear `store/domain/wishlist/wishlistStore.js`
- [ ] Crear `store/domain/wishlist/useWishlist.js`
- [ ] Crear `store/domain/products/useProductListing.js` (⚠️ UN SOLO HOOK, no fragmentar)
- [ ] Mover y mejorar `useProducts.js` a `store/domain/products/`
- [ ] Crear `store/domain/categories/useCategories.js`
- [ ] Crear `pages/dev-sandbox.jsx` para probar hooks
- [ ] Verificar que hooks funcionan en sandbox

### Fase 2: Refactor TiendaCompleta (refactor mínimo)
- [ ] Quitar estado local de wishlist → usar `useWishlist()`
- [ ] Quitar estado local de filtros/search → usar `useProductListing()`
- [ ] Refactor mínimo: solo cambiar estado por hooks, sin cambiar demasiado el JSX
- [ ] Verificar que compila
- [ ] Verificar que se ve igual que antes

### Fase 3: Configurar aliases (si no se hizo en Fase 1)
- [ ] Crear estructura de carpetas vacías (store/, shared/)
- [ ] Agregar aliases en `jsconfig.json` (@marketing, @store, @shared)
- [ ] Configurar webpack aliases en `next.config.js`
- [ ] Verificar que los aliases funcionan

### Fase 4: Mover archivos de Store y Shared
- [ ] Mover TiendaCompleta a `store/components/store/`
- [ ] Mover CategoryLanding a `store/components/category/`
- [ ] Mover Footer a `shared/components/layout/`
- [ ] Mover ui/* a `shared/components/ui/`
- [ ] Mover utils/* a `shared/lib/utils/`
- [ ] Mover datos de store a `store/data/`
- [ ] Corregir imports usando aliases (@store, @shared)
- [ ] ⚠️ **NO MOVER MARKETING TODAVÍA** - Priorizar exportabilidad

### Fase 5: Marketing/domain (Opcional - Futuro)
- [ ] (Se implementará después de estabilizar Store. No es prioritaria para el primer release.)

### Fase 6: Limpieza final
- [ ] Eliminar `pages/dev-sandbox.jsx` (ya no necesario)
- [ ] Eliminar carpetas vacías antiguas
- [ ] Actualizar documentación
- [ ] Verificar que build funciona
- [ ] Verificar que dev server funciona
- [ ] **Tests:** Ejecutar todos los tests y arreglar imports

---

## 🎯 BENEFICIOS ESPERADOS

### Separación de responsabilidades
- ✅ Marketing y Store claramente separados
- ✅ Lógica de negocio aislada de UI
- ✅ Componentes más pequeños y testeables

### Mantenibilidad
- ✅ Fácil encontrar código relacionado
- ✅ Cambios en lógica no afectan UI directamente
- ✅ Reutilización de hooks de domain

### Escalabilidad
- ✅ Fácil agregar nuevas features a cada dominio
- ✅ Lógica de negocio testeable independientemente
- ✅ Componentes UI más simples

### Testing
- ✅ Hooks de domain testeables sin UI
- ✅ Componentes testeables con mocks de hooks
- ✅ Lógica de negocio aislada

---

## ⚠️ CONSIDERACIONES CRÍTICAS

### Next.js Pages
- **NO mover** `src/pages/` - Next.js requiere que esté en la raíz
- Usar `store/views/` y `marketing/views/` para vistas internas (NO "pages")
- En `src/pages/tienda.jsx`: `import { TiendaView } from '@store/views/TiendaView'`
- Esto deja claro: "entrypoint Next" vs "vista de dominio"

### No sobre-fragmentar
- Empezar con `useProductListing` (filtros + búsqueda + sort en uno)
- Partir solo si realmente hace falta después
- Menos archivos = menos fricción al principio

### Priorización realista (LINEAL Y CONSISTENTE)
- **Fase 0 (AHORA):** Deploy marketing - Subir "como está" al VPS
- **Fase 1 (DESPUÉS):** Lógica de dominio store (cart, wishlist, filters)
- **Fase 2+ (LUEGO):** Refactor y reorganización
- **NO tocar** rutas de `pages/`, solo pequeños movimientos de componentes

### Aliases obligatorios
- Configurar `@marketing/*`, `@store/*`, `@shared/*` en `jsconfig.json`
- Configurar webpack aliases en `next.config.js`
- Evitar `../../../../` infernales

### Tests mínimos
- Si no hay Jest, crear sandbox simple para probar hooks manualmente
- Usar Storybook para componentes sueltos (opcional)
- Verificar que hooks de domain funcionan antes de mover todo

### Migración Gradual
- Hacer por fases, no todo de golpe
- Mantener compatibilidad temporal con imports antiguos
- Migrar página por página si es necesario
- **NO intentar mover TODO antes de tener cosas en producción**

---

## 📚 REFERENCIAS

- [Feature-Sliced Design](https://feature-sliced.design/) - Inspiración para organización por dominios
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html) - Principios de separación de dominios
- [Zustand Documentation](https://github.com/pmndrs/zustand) - Para estado global

---

## 🎯 RECOMENDACIÓN TÁCTICA (Actualizada)

### Orden de ejecución (LINEAL Y CONSISTENTE)

**⚠️ IMPORTANTE:** Fase 0 es lo primero operativamente (deploy), Fase 1 es lo crítico para el refactor arquitectónico.

**Fase 0 - AHORA (en main):**
1. ✅ **Deploy marketing** - Comprobar que exporta bien con `next export`
2. ✅ **Subir al VPS** - Tener web pública funcionando
3. ✅ **No tocar rutas de `pages/`** - Solo pequeños movimientos si es necesario

**Fase 1 - DESPUÉS (en branch `refactor/domain-reorganization`):**
1. ✅ Crear estructura de carpetas (store/, shared/)
2. ✅ Configurar aliases (jsconfig.json + next.config.js)
3. ✅ Implementar store/domain (cart, wishlist, productListing, products, categories)
4. ✅ Crear sandbox para probar hooks

**Fase 2 - SIGUIENTE:**
1. ✅ Refactor mínimo de TiendaCompleta (solo cambiar estado por hooks)
2. ✅ Verificar que compila y se ve igual

**Fase 3-6 - LUEGO:**
1. ✅ Configurar aliases (si no se hizo en Fase 1)
2. ✅ Reorganizar carpetas (mover archivos)
3. ✅ Limpieza final

### No hacer ahora
- ❌ NO mover TODO de golpe
- ❌ NO sobre-fragmentar (empezar con hooks más grandes)
- ❌ NO tocar rutas de `pages/` (solo componentes internos)
- ❌ NO intentar refactor completo antes de producción

### Hacer gradualmente
- ✅ Crear estructura de carpetas (vacía)
- ✅ Configurar aliases
- ✅ Extraer lógica crítica de Store (cart, wishlist, filters)
- ✅ Refactorizar TiendaCompleta para usar hooks
- ✅ Mover archivos de Store y Shared
- ⏳ Marketing puede venir después

---

---

## 🚀 MODO OPERATIVO (Para mañana)

**Si mañana te sientas a trabajar, el orden sería:**

### En main:
1. ✅ Comprobar que marketing (home, servicios, blog, citas) exporta bien con `next export`
2. ✅ Subir esa versión al VPS (lo que ya platicamos)

### Crear branch `refactor/domain-reorganization` y ahí:
3. ✅ Crear estructura de carpetas vacías (store/, shared/) y configurar jsconfig con @store y @shared
4. ✅ Implementar store/domain/cart, wishlist, products/useProducts, products/useProductListing, categories/useCategories
5. ✅ Hacer un `pages/dev-sandbox.jsx` que importe esos hooks y probarlos rápido
6. ✅ Refactor mínimo de TiendaCompleta para usar esos hooks, sin cambiar demasiado el JSX
7. ✅ Cuando eso funcione, mover TiendaCompleta, CategoryLanding, Footer, ui/*, utils/* a sus nuevas casas y corregir imports usando aliases

**Con eso ya estás aplicando tu plan, no solo documentándolo.**

---

**Fin del plan** - Listo para implementación gradual y realista

