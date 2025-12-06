# 🗺️ MAPA VISUAL RÁPIDO - Arquitectura Ortopedia Cuernavaca

**Uso:** Referencia rápida de la estructura del proyecto  
**Para:** Entender de un vistazo cómo funciona todo  

---

## 📍 ¿DÓNDE ESTÁ CADA COSA?

### 🏠 HOME PAGE

```
https://app.com/
        ↓
src/pages/index.jsx
        ↓
getLayout = MarketingLayout
        ↓
┌──────────────────┐
│ MarketingHeader  │ ← Navegación completa
├──────────────────┤
│  Hero Section    │
│  Features        │
│  Services        │
│  CTA             │
├──────────────────┤
│  Footer          │
└──────────────────┘
```

---

### 🛍️ TIENDA (Store Section)

```
┌─────────────────────────────────────────────────┐
│              STORE PAGES                        │
└─────────────────────────────────────────────────┘

/tienda                      ← Main store
    ↓
pages/tienda.jsx (110 líneas)
    ├─ getLayout = StoreLayout
    ├─ Head/SEO metadata
    └─ <TiendaCompleta />

/tienda/completa             ← Full store view (2033 líneas) 🔴 MONOLÍTICO
    ↓
src/features/store/TiendaCompleta.jsx
    ├─ Hero carousel
    ├─ Category grid
    ├─ Services section
    ├─ Products grid (filterable)
    ├─ Search bar
    ├─ Wishlist
    └─ State: categoria, search, cart, wishlist, sort

/categorias                  ← All categories
    ↓
pages/categorias.jsx
    ├─ getLayout = StoreLayout ✅
    └─ Category listing

/categoria/[slug]           ← Individual category (dynamic)
    ↓
pages/categoria/[slug].jsx
    ├─ getStaticProps (uses categories.full-config.js)
    ├─ getLayout = StoreLayout ✅
    └─ <Categorias /> component

/categoria/plantillas       ← Specific category
/categoria/fajas
/categoria/ortesis
/categoria/calzado
/categoria/pediatria
/categoria/rehabilitacion
    ↓
pages/categoria/[name].jsx (static routes)

/producto/[id]              ← Product detail
    ↓
pages/producto/[productId].jsx
    ├─ getLayout = StoreLayout ✅
    ├─ getProductById() from products.config.js
    └─ Image gallery, specs, related products

/carrito                    ← Shopping cart
    ↓
pages/carrito.jsx
    ├─ getLayout = StoreLayout ✅
    ├─ Cart items list
    └─ Checkout (WhatsApp integration)
```

---

### 💼 SERVICIOS (Services Section)

```
/servicios                  ← Main services
    ↓
pages/servicios.jsx
    ├─ getLayout = MarketingLayout
    └─ <Servicios /> component (1000+ lines)
        ├─ Hero section
        ├─ Symptoms search
        ├─ Interactive services tabs
        ├─ Process section
        └─ Featured services

/servicios/detalle/[service] ← Service detail
    ↓
pages/servicios/detalle/[service].jsx
    └─ Service-specific details
```

---

### 📚 BLOG (Blog Section)

```
/blog                       ← All posts
    ↓
pages/blog/index.jsx
    ├─ getLayout = MarketingLayout
    └─ Posts listing

/blog/[id]                  ← Individual post
    ↓
pages/blog/[id].jsx
    ├─ getLayout = MarketingLayout
    ├─ Reads from /posts/*.mdx
    └─ MDX content rendering
```

---

### 📅 OTHER PAGES

```
/citas          → Appointment booking
/contacto       → Contact form
/nosotros       → About us
/login          → User login
/cuenta         → User account
/admin-blog     → Blog management
/404            → Not found
/500            → Server error
```

---

## 🏗️ LAYOUTS (Wrappers)

### StoreLayout 🟢

**Used by:** Store pages  
**Location:** `src/components/layout/StoreLayout.jsx`

```
┌─────────────────────────────────┐
│       StoreHeader               │
│  (logo, search, cart, wishlist) │
├─────────────────────────────────┤
│                                 │
│          {children}             │ ← Page content inserted here
│                                 │
├─────────────────────────────────┤
│          Footer                 │
└─────────────────────────────────┘
```

**Props:**
- `children` - Page content
- Internal state: `searchTerm`, `showWishlistOnly`, `wishlist`

---

### MarketingLayout 🟢

**Used by:** Marketing pages (services, blog, home)  
**Location:** `src/components/layout/MarketingLayout.jsx`

```
┌─────────────────────────────────┐
│      MarketingHeader            │
│   (full nav, categories menu)   │
├─────────────────────────────────┤
│                                 │
│          {children}             │ ← Page content inserted here
│                                 │
├─────────────────────────────────┤
│          Footer                 │
└─────────────────────────────────┘
```

---

## 📊 DATA SOURCES

### Categories

```
/src/data/categories.config.js
├─ Array format
└─ Used for UI filtering and display
   [
     { id: 1, name: 'Plantillas', slug: 'plantillas', ... },
     { id: 2, name: 'Fajas', slug: 'fajas', ... },
     ...
   ]

/src/data/categories.full-config.js
├─ Object format (by slug)
└─ Used for dynamic routing
   {
     'plantillas': { id: 1, name: '...', ... },
     'fajas': { id: 2, ... },
     ...
   }
```

### Products

```
/src/data/products.config.js
├─ productosPorCategoria object
├─ getProductById() function
└─ Used for:
   - Product grid
   - Product search
   - Product detail pages
```

### Blog

```
/posts/*.mdx
├─ MDX format (Markdown + JSX)
└─ Posts:
   - como-elegir-plantilla-correcta.mdx
   - cuidado-postural-trabajo.mdx
   - historia-exito-juan-carlos.mdx
   - nuevas-tecnologias-protesis-mioelectricas.mdx
   - prevencion-lesiones-deportivas.mdx
   - rehabilitacion-en-casa.mdx
```

---

## 🎯 REQUEST FLOW (Quick Example)

### User clicks "Comprar" on product

```
1. User clicks "Comprar por WhatsApp" button
   ↓
2. TiendaCompleta component catches click
   ↓
3. handleWhatsAppClick() executed
   ↓
4. Opens WhatsApp with:
   - Product name
   - Price
   - Quantity
   - Link to product
   ↓
5. User sends message to WhatsApp
   ↓
6. Business handles order via WhatsApp
```

### User searches for product

```
1. User types in search bar (StoreHeader)
   ↓
2. searchTerm state updated in StoreLayout
   ↓
3. TiendaCompleta receives searchTerm (via props?)
   ↓
4. Filter applied: products.filter(p => p.name.includes(searchTerm))
   ↓
5. Results displayed
```

---

## 🔴 KNOWN ISSUES

### 1. DUPLICATED STRUCTURE
```
/pages/tienda.jsx            ← Which one is used?
/src/pages/tienda.jsx        ← Or this one?
```

### 2. HARDCODED HEADERS
```
TiendaCompleta.jsx           ← Has header incrustated
Carrito.jsx                  ← Has header hardcoded
Producto.jsx                 ← Has header hardcoded
→ Should use getLayout pattern instead
```

### 3. MONOLITHIC FILE
```
TiendaCompleta.jsx           ← 2033 lines
→ Should be split into smaller components
```

### 4. SCATTERED STATE
```
StoreLayout                  ← has searchTerm, wishlist
TiendaCompleta               ← has searchTerm, cart
Carrito                      ← has cart
→ Should be centralized in Context API
```

---

## ✅ SOLUTION SUMMARY

| Problem | Solution | Status |
|---------|----------|--------|
| Headers duplicated | Use `getLayout` pattern | 🟡 In progress |
| Pages confusing | Use `/src/pages/` as single source | ⏳ Todo |
| State fragmented | Centralize in Context API | ⏳ Todo |
| TiendaCompleta huge | Split into components | ⏳ Todo |
| Naming inconsistent | Choose standard (ES or EN) | ⏳ Todo |

---

## 📞 QUICK REFERENCE

### Route → File Mapping

| Route | File |
|-------|------|
| `/` | `src/pages/index.jsx` |
| `/tienda` | `src/pages/tienda.jsx` |
| `/tienda/completa` | `src/features/store/TiendaCompleta.jsx` |
| `/categorias` | `src/pages/categorias.jsx` |
| `/categoria/[slug]` | `src/pages/categoria/[slug].jsx` |
| `/producto/[id]` | `src/pages/producto/[productId].jsx` |
| `/carrito` | `src/pages/carrito.jsx` |
| `/servicios` | `src/pages/servicios.jsx` |
| `/blog` | `src/pages/blog/index.jsx` |
| `/blog/[id]` | `src/pages/blog/[id].jsx` |
| `/citas` | `src/pages/citas.jsx` |
| `/contacto` | `src/pages/contacto.jsx` |

---

**For detailed info, see:**
- `ARQUITECTURA_COMPLETA_PROYECTO.md` - Full architecture
- `ARQUITECTURA_TIENDA_COMPLETA.md` - Store details
- `PLAN_ACCION_CONSOLIDACION.md` - Action plan
