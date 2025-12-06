# 🏢 ARQUITECTURA COMPLETA DEL PROYECTO - Ortopedia Cuernavaca

**Última actualización:** Enero 13, 2025  
**Estado:** ✅ COMPLETADO Y VERIFICADO  
**Enfoque:** Visión holística de toda la aplicación

---

## 📑 TABLA DE CONTENIDOS

1. [Visión General](#visión-general)
2. [Estructura de Carpetas](#estructura-de-carpetas)
3. [Rutas y Entry Points](#rutas-y-entry-points)
4. [Layouts y Componentes Globales](#layouts-y-componentes-globales)
5. [Características Principales](#características-principales)
6. [Fuentes de Datos](#fuentes-de-datos)
7. [Flujos de Navegación](#flujos-de-navegación)
8. [Matriz de Responsabilidades](#matriz-de-responsabilidades)
9. [Problemas y Soluciones](#problemas-y-soluciones)

---

## 🎯 VISIÓN GENERAL

**Nombre del Proyecto:** Ortopedia Cuernavaca  
**Framework:** Next.js 15.x  
**React Version:** React 18.x  
**Styling:** Tailwind CSS + Framer Motion (animaciones)  
**Estado:** Producción con mantenimiento activo  

### Propósito Principal
Plataforma web integrada de:
- 🏪 **Tienda e-commerce** (productos ortopédicos)
- 📋 **Sistema de servicios** (consultas, fisioterapia, etc.)
- 📚 **Blog** (contenido educativo)
- 📞 **Sistema de citas** (agendar consultas)
- 👥 **Gestión de cuenta** (login, perfil)

### Arquitectura en Alto Nivel

```
ENTRADA DEL USUARIO
        ↓
    NEXT.js Router
        ↓
    PAGE (src/pages/*.jsx)
        ↓
    getLayout (si aplica)
        ↓
    LAYOUT (StoreLayout / MarketingLayout)
        ↓
    HEADER + MAIN + FOOTER
        ↓
    COMPONENTES ESPECÍFICOS
        ↓
    DATOS (products, categories, posts)
        ↓
    UI FINAL
```

---

## 📁 ESTRUCTURA DE CARPETAS

```
PROYECTO ROOT
│
├── src/pages/                               # Entry points principales (Next.js)
│   ├── _app.jsx                             # 🟢 App wrapper (getLayout processing)
│   ├── _document.jsx                        # 🟢 Document wrapper (HTML structure)
│   ├── _error.jsx                           # 🟢 Error fallback
│   ├── 404.jsx                              # 🟢 Not found page
│   ├── 500.jsx                              # 🟢 Server error page
│   ├── index.jsx                            # 🟢 Home page (/)
│   ├── tienda.jsx                           # 🟡 Store root (/tienda)
│   ├── tienda-simple.jsx                    # ⚠️  Alternate store view
│   ├── servicios.jsx                        # 🟢 Services (/servicios)
│   ├── categorias.jsx                       # 🟡 Categories root (/categorias)
│   ├── carrito.jsx                          # 🟡 Redirect to /src/pages/store/Carrito
│   ├── citas.jsx                            # 🟡 Appointments (/citas)
│   ├── contacto.jsx                         # 🟢 Contact (/contacto)
│   ├── nosotros.jsx                         # 🟢 About us (/nosotros)
│   ├── login.jsx                            # 🟢 Login (/login)
│   ├── cuenta.jsx                           # 🟢 Account (/cuenta)
│   ├── admin-blog.jsx                       # 🟡 Blog admin (/admin-blog)
│   ├── robots.txt.js                        # 🟢 SEO robots.txt
│   ├── sitemap.xml.js                       # 🟢 SEO sitemap.xml
│   │
│   ├── api/                                 # API routes
│   │   ├── hello.js
│   │   ├── robots.txt.js
│   │   └── sitemap.xml.js
│   │
│   ├── auth/                                # Auth pages
│   │   ├── Login.jsx
│   │   └── Cuenta.jsx
│   │
│   ├── blog/                                # Blog pages
│   │   ├── index.jsx                        # All posts (/blog)
│   │   └── [id].jsx                         # Individual post (/blog/[id])
│   │
│   ├── categoria/                           # Category pages
│   │   ├── [slug].jsx                       # Dynamic route (/categoria/[slug])
│   │   ├── [slug].jsx                       # Duplicate (issue)
│   │   ├── Categorias.jsx                   # Component (no page route)
│   │   ├── CategoriaPage.jsx                # Component (no page route)
│   │   ├── calzado.jsx                      # Static (/categoria/calzado)
│   │   ├── fajas.jsx                        # Static (/categoria/fajas)
│   │   ├── ortesis.jsx                      # Static (/categoria/ortesis)
│   │   ├── pediatria.jsx                    # Static (/categoria/pediatria)
│   │   ├── plantillas.jsx                   # Static (/categoria/plantillas)
│   │   └── rehabilitacion.jsx               # Static (/categoria/rehabilitacion)
│   │
│   ├── categories/                          # Alternate category location (duplicate)
│   │   └── Categorias.jsx
│   │
│   ├── home/                                # Home components (not page routes)
│   │   ├── Home.jsx
│   │   ├── Citas.jsx
│   │   ├── Contacto.jsx
│   │   └── Nosotros.jsx
│   │
│   ├── producto/                            # Product pages
│   │   └── [productId].jsx                  # Individual product (/producto/[productId])
│   │
│   ├── services/                            # Services pages
│   │   ├── Servicios.jsx                    # Component
│   │   ├── InteractiveServices.jsx          # Component
│   │   └── detalle/
│   │       └── [service].jsx                # Service detail (/services/detalle/[service])
│   │
│   ├── servicios/                           # Alternate services location (Spanish)
│   │   └── detalle/
│   │       └── [service].jsx
│   │
│   ├── store/                               # Store components
│   │   ├── Carrito.jsx                      # Shopping cart
│   │   ├── Producto.jsx                     # Product detail
│   │   ├── Tienda.jsx                       # Old store component
│   │   └── TiendaCompleta.jsx               # Main store (2000+ lines)
│   │
│   ├── admin/
│   │   └── blog.jsx                         # Blog management
│   │
│   └── categories/
│       └── categorias/                      # Nested structure
│           └── Plantillas.jsx               # Specific category
│
├── src/                                     # Source code
│   ├── components/
│   │   │
│   │   ├── layout/                          # 🟢 LAYOUTS (Estructura global)
│   │   │   ├── Layout.jsx                   # ⚠️  OLD (deprecated)
│   │   │   ├── Header.jsx                   # ❌ NO USAR (marketing header antiguo)
│   │   │   ├── MarketingHeader.jsx          # 🟢 Header para páginas de marketing
│   │   │   ├── MarketingLayout.jsx          # 🟢 Layout: MarketingHeader + children + Footer
│   │   │   ├── StoreHeader.jsx              # 🟢 NEW: Header para tienda
│   │   │   ├── StoreLayout.jsx              # 🟢 Layout: StoreHeader + children + Footer
│   │   │   └── Footer.jsx                   # 🟢 Footer compartido (todas las páginas)
│   │   │
│   │   ├── features/                        # Componentes de características específicas
│   │   │   ├── BlogArticleTemplate.jsx
│   │   │   ├── ProcessSectionAlt.jsx
│   │   │   ├── store/
│   │   │   │   └── CategoryLanding.jsx
│   │   │   └── ...
│   │   │
│   │   ├── ui/                              # Componentes UI reutilizables
│   │   │   ├── CategoryTemplate.jsx
│   │   │   └── ...
│   │   │
│   │   └── ... (más componentes)
│   │
│   ├── features/                            # Características por dominio
│   │   ├── blog/
│   │   ├── services/
│   │   ├── store/
│   │   │   ├── TiendaCompleta.jsx           # Alias a ../pages/store/TiendaCompleta.jsx
│   │   │   └── ...
│   │   └── ...
│   │
│   ├── hooks/                               # React Hooks personalizados
│   │   ├── useProfessionalBlog.js
│   │   └── ...
│   │
│   ├── data/                                # 🟢 DATA SOURCES (Configuración de datos)
│   │   ├── categories.config.js             # Array de categorías para UI
│   │   ├── categories.full-config.js        # Object de categorías para rutas dinámicas
│   │   ├── products.config.js               # Productos e inventario
│   │   └── ...
│   │
│   ├── lib/                                 # Funciones utilitarias
│   │   ├── stores/
│   │   ├── utils/
│   │   └── ...
│   │
│   ├── utils/                               # Funciones auxiliares
│   │   ├── whatsapp.js                      # Integración WhatsApp
│   │   └── ...
│   │
│   ├── pages/                               # 🟡 ALTERNATE PAGES FOLDER (issues con duplicados)
│   │   ├── tienda.jsx
│   │   ├── categorias.jsx
│   │   ├── carrito.jsx
│   │   ├── ... (duplicados)
│   │
│   └── index.css                            # Global styles
│
├── public/                                  # Archivos estáticos
│   ├── manifest.json                        # PWA manifest
│   └── images/
│       ├── banners/
│       ├── products/
│       └── ui/
│
├── posts/                                   # 📝 Blog posts (MDX)
│   ├── como-elegir-plantilla-correcta.mdx
│   ├── cuidado-postural-trabajo.mdx
│   ├── ejemplo-articulo-completo.mdx
│   ├── historia-exito-juan-carlos.mdx
│   ├── nuevas-tecnologias-protesis-mioelectricas.mdx
│   ├── prevencion-lesiones-deportivas.mdx
│   └── rehabilitacion-en-casa.mdx
│
├── __tests__/                               # Tests (Jest)
│   ├── jsonld.test.jsx
│   ├── meta-home.test.jsx
│   ├── routing-compat.test.jsx
│   ├── sitemap-robots.test.jsx
│   ├── tienda-completa-search-and-categories.test.jsx
│   └── ...
│
├── Configuration Files
│   ├── next.config.js                       # Next.js configuration
│   ├── tailwind.config.js                   # Tailwind CSS config
│   ├── postcss.config.js                    # PostCSS config
│   ├── eslint.config.cjs                    # ESLint rules
│   ├── jest.config.js                       # Jest testing config
│   ├── jest.setup.js                        # Jest setup
│   ├── jsconfig.json                        # JavaScript project config
│   ├── package.json                         # Dependencies
│   └── Inventario.csv                       # Product inventory (CSV)
│
├── Documentation
│   ├── ARQUITECTURA_TIENDA_COMPLETA.md      # 📘 Store architecture
│   ├── PLAN_ACCION_CONSOLIDACION.md         # 📘 Action plan
│   ├── ARQUITECTURA_COMPLETA_PROYECTO.md    # 📘 THIS FILE - Full project
│   └── NEXTJS_PROJECT_AUDITOR.md
│
└── Scripts
    ├── fix-marketing-layout.js
    ├── performance-test.js
    └── ... (utility scripts)
```

---

## 🛣️ RUTAS Y ENTRY POINTS

### Rutas de Navegación Mapeadas

```
/                            → pages/index.jsx                         🏠 HOME
/tienda                      → pages/tienda.jsx → TiendaCompleta       🛍️  STORE
/tienda-simple              → pages/tienda-simple.jsx → Tienda         🛍️  STORE (alt)
/categorias                 → pages/categorias.jsx                      📂 CATEGORIES
/categoria/[slug]           → pages/categoria/[slug].jsx                📂 CATEGORY DETAIL
/categoria/plantillas       → pages/categoria/plantillas.jsx            👣 PLANTILLAS
/categoria/fajas            → pages/categoria/fajas.jsx                 📦 FAJAS
/categoria/ortesis          → pages/categoria/ortesis.jsx               🦴 ORTESIS
/categoria/calzado          → pages/categoria/calzado.jsx               👞 CALZADO
/categoria/pediatria        → pages/categoria/pediatria.jsx             👶 PEDIATRIA
/categoria/rehabilitacion   → pages/categoria/rehabilitacion.jsx        🏥 REHAB
/producto/[productId]       → pages/producto/[productId].jsx            📋 PRODUCT
/carrito                    → pages/carrito.jsx → /src/pages/store/*   🛒 CART
/servicios                  → pages/servicios.jsx → Servicios.jsx       💼 SERVICES
/servicios/detalle/[service] → pages/servicios/detalle/[service].jsx   📖 SERVICE DETAIL
/blog                       → pages/blog/index.jsx                      📚 BLOG
/blog/[id]                  → pages/blog/[id].jsx                       📖 BLOG POST
/citas                      → pages/citas.jsx                           📅 APPOINTMENTS
/contacto                   → pages/contacto.jsx                        📧 CONTACT
/nosotros                   → pages/nosotros.jsx                        👥 ABOUT US
/login                      → pages/login.jsx                           🔐 LOGIN
/cuenta                     → pages/cuenta.jsx                          👤 ACCOUNT
/admin-blog                 → pages/admin-blog.jsx                      ⚙️  ADMIN
/404                        → pages/404.jsx                             ❌ NOT FOUND
/500                        → pages/500.jsx                             ❌ SERVER ERROR
```

---

## 🏗️ LAYOUTS Y COMPONENTES GLOBALES

### Patrón de Layout en Next.js

Cada página puede tener un `getLayout` opcional:

```jsx
// Patrón
export default function PageName() {
  return <PageContent />;
}

PageName.getLayout = (page) => <LayoutComponent>{page}</LayoutComponent>;
```

Este patrón se procesa en `_app.jsx`:

```jsx
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}
```

### Layouts Disponibles

#### 1. **StoreLayout** 🟢 (Tienda)

**Ubicación:** `src/components/layout/StoreLayout.jsx`

**Estructura:**
```
┌─────────────────────────────────┐
│     StoreHeader                 │ ← Logo, búsqueda, carrito, wishlist
├─────────────────────────────────┤
│                                 │
│         MAIN CONTENT            │ ← Page-specific content
│      (page children)            │
│                                 │
├─────────────────────────────────┤
│         Footer                  │ ← Compartido
└─────────────────────────────────┘
```

**Páginas que DEBEN usar:**
- ✅ `/tienda` (pages/tienda.jsx)
- ✅ `/categorias` (pages/categorias.jsx)
- ✅ `/categoria/[slug]` (pages/categoria/[slug].jsx)
- ✅ `/carrito` (pages/carrito.jsx)
- ✅ `/producto/[id]` (pages/producto/[productId].jsx)

**Estado Interno:**
```javascript
const [searchTerm, setSearchTerm] = useState('');
const [showWishlistOnly, setShowWishlistOnly] = useState(false);
const [wishlist, setWishlist] = useState([]);
```

---

#### 2. **MarketingLayout** 🟢 (Páginas de Marketing)

**Ubicación:** `src/components/layout/MarketingLayout.jsx`

**Estructura:**
```
┌─────────────────────────────────┐
│    MarketingHeader              │ ← Full navigation, categories dropdown
├─────────────────────────────────┤
│                                 │
│         MAIN CONTENT            │ ← Page-specific content
│      (page children)            │
│                                 │
├─────────────────────────────────┤
│         Footer                  │ ← Compartido
└─────────────────────────────────┘
```

**Páginas que usan:**
- ✅ `/servicios` (pages/servicios.jsx)
- ✅ `/blog` (pages/blog/index.jsx)
- ✅ `/blog/[id]` (pages/blog/[id].jsx)
- ✅ `/citas` (pages/citas.jsx)
- ✅ `/contacto` (pages/contacto.jsx)
- ✅ `/nosotros` (pages/nosotros.jsx)

---

#### 3. **Layout** ⚠️ (Deprecated)

**Ubicación:** `src/components/layout/Layout.jsx`

**Estado:** Deprecated - NO USAR EN CÓDIGO NUEVO  
**Usado por:** Algunas páginas antiguas como `/tienda-simple`

---

### Componentes de Header

#### **StoreHeader** 🟢

**Ubicación:** `src/components/layout/StoreHeader.jsx`  
**Para:** Páginas de tienda  

**Elementos:**
- Logo (imagen SVG)
- Barra de búsqueda
- Ícono de carrito (con contador)
- Ícono de wishlist (con contador)
- Navegación de categorías

**Props:**
```javascript
{
  searchTerm: string,
  setSearchTerm: function,
  showWishlistOnly: boolean,
  setShowWishlistOnly: function,
  wishlist: array
}
```

---

#### **MarketingHeader** 🟢

**Ubicación:** `src/components/layout/MarketingHeader.jsx`  
**Para:** Páginas de marketing  

**Elementos:**
- Logo
- Navegación principal completa
- Dropdown de categorías
- Links a servicios, blog, etc.

---

#### **Header** ❌

**Ubicación:** `src/components/layout/Header.jsx`  
**Estado:** Antiguo (no usar)  
**Razón:** Confusión con MarketingHeader

---

### Footer 🟢

**Ubicación:** `src/components/layout/Footer.jsx`  
**Uso:** En TODAS las páginas (compartido)  

**Elementos:**
- Newsletter signup
- Links de servicio al cliente
- Información de compañía
- Links legales
- Copyright

---

## 🎯 CARACTERÍSTICAS PRINCIPALES

### 1️⃣ **TIENDA (E-COMMERCE)**

**Rutas:**
- `/tienda` → Página principal de tienda
- `/categorias` → Grid de categorías
- `/categoria/[slug]` → Productos por categoría
- `/producto/[id]` → Detalle de producto
- `/carrito` → Carrito de compras

**Componentes Clave:**
- `TiendaCompleta.jsx` - 2033 líneas (MONOLÍTICO)
  - Carousel de heroBanners
  - Grid de categorías
  - Sección de servicios/features
  - Grid de productos filtrable
  - Búsqueda
  - Wishlist
  - Carrito

**Funcionalidades:**
- ✅ Búsqueda de productos
- ✅ Filtrado por categoría
- ✅ Ordenamiento (precio, nombre)
- ✅ Wishlist (favoritos)
- ✅ Carrito de compras
- ✅ Detalles de producto
- ⏳ Checkout (WIP - simulado con WhatsApp)

**Estado:**
```javascript
const [categoriaActiva, setCategoriaActiva] = useState('all');
const [searchTerm, setSearchTerm] = useState('');
const [wishlist, setWishlist] = useState([]);
const [sortBy, setSortBy] = useState('name');
const [showWishlistOnly, setShowWishlistOnly] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
```

---

### 2️⃣ **BLOG**

**Rutas:**
- `/blog` → Listado de posts
- `/blog/[id]` → Post individual

**Formato:** MDX (Markdown + JSX)  
**Ubicación de posts:** `/posts/*.mdx`  

**Posts disponibles:**
- como-elegir-plantilla-correcta.mdx
- cuidado-postural-trabajo.mdx
- historia-exito-juan-carlos.mdx
- nuevas-tecnologias-protesis-mioelectricas.mdx
- prevencion-lesiones-deportivas.mdx
- rehabilitacion-en-casa.mdx

**Componentes:**
- `BlogArticleTemplate.jsx` - Template para posts

---

### 3️⃣ **SERVICIOS**

**Rutas:**
- `/servicios` → Listado de servicios
- `/servicios/detalle/[service]` → Detalle de servicio

**Componentes:**
- `Servicios.jsx` - Vista principal
- `InteractiveServices.jsx` - Sección interactiva
- `ProcessSectionAlt.jsx` - Sección de procesos

**Funcionalidades:**
- ✅ Búsqueda de síntomas
- ✅ Filtrado por categoría
- ✅ Detalles de servicio
- ✅ Integración con WhatsApp para consultas

---

### 4️⃣ **SISTEMA DE CITAS**

**Rutas:**
- `/citas` → Agendar cita

**Funcionalidades:**
- Formulario de cita
- Integración WhatsApp

---

### 5️⃣ **AUTENTICACIÓN**

**Rutas:**
- `/login` → Login
- `/cuenta` → Perfil de usuario

**Estado:** WIP (implementación incompleta)

---

### 6️⃣ **CONTACTO**

**Rutas:**
- `/contacto` → Formulario de contacto

---

### 7️⃣ **PÁGINAS ESTÁTICAS**

- `/` → Home
- `/nosotros` → About us
- `/404` → Not found
- `/500` → Server error

---

## 📊 FUENTES DE DATOS

### Data Config Files

#### **`src/data/categories.config.js`**

**Propósito:** Lista de categorías para filtrado en UI  
**Formato:** Array

```javascript
export const categories = [
  { id: 1, name: 'Plantillas', slug: 'plantillas', ... },
  { id: 2, name: 'Fajas', slug: 'fajas', ... },
  // ...
];
```

**Usado por:**
- Filtros en TiendaCompleta
- Dropdown en headers
- Breadcrumbs

---

#### **`src/data/categories.full-config.js`**

**Propósito:** Mapping de categorías para rutas dinámicas  
**Formato:** Object (por slug)

```javascript
export const categoriesFullConfig = {
  'plantillas': {
    id: 1,
    name: 'Plantillas Ortopédicas',
    description: '...',
    // ...
  },
  'fajas': { ... },
  // ...
};
```

**Usado por:**
- `pages/categoria/[slug].jsx` → getStaticProps
- Validación de rutas dinámicas

---

#### **`src/data/products.config.js`**

**Propósito:** Catálogo de productos  
**Formato:** Objeto con métodos

```javascript
export const productosPorCategoria = {
  'plantillas': [
    {
      id: 1,
      title: 'Plantillas Deportivas',
      price: 1200,
      image: '...',
      category: 'plantillas',
      // ...
    },
    // ...
  ],
  // ...
};

export function getProductById(id) { ... }
```

**Usado por:**
- Grid de productos en tienda
- Página de detalle de producto
- Búsqueda y filtrado

---

### External Data Sources

- **WhatsApp API** - Integración para consultas
- **MDX Posts** - Blog content (static)
- **Inventario.csv** - Product inventory

---

## 🔄 FLUJOS DE NAVEGACIÓN

### Flujo 1: Usuario entra a Tienda

```
https://app.com/tienda
        ↓
pages/tienda.jsx
        ↓
  Has getLayout?
    ✅ YES → StoreLayout
        ↓
  StoreLayout renders:
    ├── StoreHeader (logo, search, cart, wishlist)
    ├── TiendaCompleta component
    └── Footer
        ↓
  TiendaCompleta shows:
    ├── Hero carousel
    ├── Category grid
    ├── Services section
    └── Products grid (filterable)
```

### Flujo 2: Usuario busca producto

```
Usuario escribe en búsqueda
        ↓
StoreLayout.state.searchTerm = value
        ↓
TiendaCompleta recibe searchTerm (via props?)
        ↓
Filtra productos: productosPorCategoria[categoria]
        ↓
Aplica filtros: search, categoria, sort
        ↓
Muestra resultados
```

### Flujo 3: Usuario selecciona categoría

```
Usuario hace click en "Plantillas"
        ↓
Navigate to /categoria/plantillas
        ↓
pages/categoria/[slug].jsx
        ↓
getStaticProps({ params: { slug: 'plantillas' } })
        ↓
Busca en categoriesFullConfig['plantillas']
        ↓
Renderiza Categorias.jsx component
        ↓
StoreLayout envuelve el contenido
        ↓
Grid de productos de plantillas
```

### Flujo 4: Usuario agrega a carrito

```
Usuario hace click en "Agregar a carrito"
        ↓
setCart([...cart, producto])
        ↓
Ícono de carrito muestra contador (+1)
        ↓
Navigate to /carrito (opcional)
        ↓
Carrito.jsx con StoreLayout
        ↓
Muestra items, subtotal, envío, total
```

### Flujo 5: Usuario va a servicios

```
Usuario hace click "Servicios"
        ↓
Navigate to /servicios
        ↓
pages/servicios.jsx
        ↓
Has getLayout = MarketingLayout
        ↓
MarketingLayout renders:
    ├── MarketingHeader
    ├── Servicios.jsx component
    └── Footer
        ↓
Servicios.jsx shows:
    ├── Hero section
    ├── Symptoms search section
    ├── Interactive services tabs
    ├── Process section
    └── Featured services
```

---

## 📈 MATRIZ DE RESPONSABILIDADES

### ¿Quién renderiza qué?

| **Ruta** | **Page File** | **getLayout?** | **Layout** | **Header** | **Main Content** | **Footer** |
|---|---|---|---|---|---|---|
| `/` | pages/index.jsx | ✅ MarketingLayout | MarketingLayout | MarketingHeader | Home sections | Footer |
| `/tienda` | pages/tienda.jsx | ✅ StoreLayout | StoreLayout | StoreHeader | TiendaCompleta | Footer |
| `/categorias` | pages/categorias.jsx | ✅ StoreLayout | StoreLayout | StoreHeader | Category grid | Footer |
| `/categoria/plantillas` | pages/categoria/[slug].jsx | ✅ StoreLayout | StoreLayout | StoreHeader | Category products | Footer |
| `/carrito` | pages/carrito.jsx | ✅ StoreLayout | StoreLayout | StoreHeader | Cart items | Footer |
| `/producto/1` | pages/producto/[id].jsx | ✅ StoreLayout | StoreLayout | StoreHeader | Product detail | Footer |
| `/servicios` | pages/servicios.jsx | ✅ MarketingLayout | MarketingLayout | MarketingHeader | Services content | Footer |
| `/blog` | pages/blog/index.jsx | ✅ MarketingLayout | MarketingLayout | MarketingHeader | Posts list | Footer |
| `/blog/post-1` | pages/blog/[id].jsx | ✅ MarketingLayout | MarketingLayout | MarketingHeader | Post content | Footer |
| `/citas` | pages/citas.jsx | ✅ MarketingLayout | MarketingLayout | MarketingHeader | Appointment form | Footer |
| `/contacto` | pages/contacto.jsx | ✅ MarketingLayout | MarketingLayout | MarketingHeader | Contact form | Footer |
| `/nosotros` | pages/nosotros.jsx | ✅ MarketingLayout | MarketingLayout | MarketingHeader | About content | Footer |
| `/login` | pages/login.jsx | ❌ None | None | - | Login form | - |
| `/cuenta` | pages/cuenta.jsx | ❌ None | None | - | Account content | - |

---

## 🚨 PROBLEMAS IDENTIFICADOS

### **1. ESTRUCTURA DUPLICADA**

**Ubicaciones:** `/pages` y `/src/pages`  
**Impacto:** Confusión sobre dónde están las páginas reales  

**Archivos duplicados:**
```
pages/tienda.jsx                    ↔ src/pages/tienda.jsx
pages/tienda-simple.jsx             ↔ src/pages/tienda-simple.jsx
pages/categorias.jsx                ↔ src/pages/categorias.jsx
pages/carrito.jsx                   ↔ src/pages/carrito.jsx
pages/[productId].jsx               ↔ src/pages/producto/[productId].jsx
pages/categoria/[slug].jsx          ↔ (existe solo en src/)
pages/blog/                          ↔ src/pages/blog/
pages/servicios.jsx                 ↔ src/pages/services/Servicios.jsx
// etc...
```

**Solución:** Unificar en UNA ubicación (`/src/pages/` es más limpio)

---

### **2. TIENDACOMPLETA MONOLÍTICA**

**Archivo:** `src/features/store/TiendaCompleta.jsx` (2033 líneas)  

**Problemas:**
- Muy grande para una sola función
- Múltiples responsabilidades
- Difícil de mantener
- Difícil de testear
- Headers/footers incrustados

**Solución:** Dividir en componentes:
```
HeroCarousel.jsx
CategoryGrid.jsx
ProductGrid.jsx
Services.jsx
RehabilitationCenter.jsx
SearchBar.jsx
```

---

### **3. INCONSISTENCIA EN LAYOUTS**

**Problema:** No todas las páginas usan getLayout  

**Estado actual:**
- ✅ `/categorias` - Usa StoreLayout
- ❌ `/tienda` - Tiene getLayout pero TiendaCompleta tiene header incrustado
- ❌ `/carrito` - Tiene header hardcoded
- ❌ `/producto/[id]` - Tiene header hardcoded

**Solución:** Aplicar getLayout a TODAS las páginas

---

### **4. DUPLICACIÓN DE HEADERS/FOOTERS**

**Ubicaciones:**
- `TiendaCompleta.jsx` - Header/footer incrustados
- `Carrito.jsx` - Header/footer incrustados
- `Producto.jsx` - Header/footer incrustados

**Impacto:** Cambios deben hacerse en múltiples lugares

**Solución:** Usar `getLayout` pattern consistentemente

---

### **5. RUTAS DINÁMICAS DUPLICADAS**

**Problema:** `pages/categoria/[slug].jsx` existe en `/pages` pero también referencias en `/src/pages`

**Impacto:** Confusión sobre cuál se usa

---

### **6. ESTADO FRAGMENTADO**

**Problema:** Estado de búsqueda, wishlist, cart en múltiples componentes

**Ubicaciones:**
- StoreLayout.jsx
- TiendaCompleta.jsx
- Carrito.jsx
- Producto.jsx

**Impacto:** Sincronización difícil, inconsistencia

**Solución:** Centralizar en Context API o Zustand

---

### **7. NAMING INCONSISTENTE**

**Ejemplos:**
- `/servicios` vs `/services`
- `/categoria` vs `/categories`
- Algunos archivos en Spanish, otros en English

---

## ✅ SOLUCIONES PROPUESTAS

### **Consolidación Inmediata**

1. ✅ Mantener `/src/pages/` como fuente única
2. ✅ Eliminar `/pages/` duplicado (o hacer redirecciones)
3. ✅ Aplicar `getLayout` a todas las páginas
4. ✅ Usar `StoreLayout` para páginas de tienda
5. ✅ Usar `MarketingLayout` para páginas de marketing

### **Refactorización Mediano Plazo**

1. 🔧 Dividir `TiendaCompleta.jsx` en componentes
2. 🔧 Centralizar estado en Context API
3. 🔧 Consolidar rutas (definir naming standard)
4. 🔧 Remover hardcoded headers/footers

### **Optimización Largo Plazo**

1. 📈 Migrar a componentes más pequeños y reutilizables
2. 📈 Implementar SWR o React Query para estado
3. 📈 Performance optimization (code splitting, lazy loading)
4. 📈 Tests automatizados para cada componente

---

## 📋 RESUMEN VISUAL

```
ARQUITECTURA ACTUAL (CAÓTICA)
─────────────────────────────

/pages                    /src/pages
  ├── tienda.jsx            ├── tienda.jsx ✓
  ├── categorias.jsx         ├── categorias.jsx ✓
  ├── carrito.jsx            ├── carrito.jsx
  ├── [productId].jsx        ├── producto/[id].jsx
  └── ...                    ├── categoria/[slug].jsx
                             ├── services/Servicios.jsx
                             └── ...

RESULTADO: Duplicación, confusión, inconsistencia
```

```
ARQUITECTURA DESEADA (LIMPIA)
──────────────────────────────

/src/pages (ÚNICA FUENTE)
  ├── _app.jsx (getLayout processing) ✓
  ├── index.jsx (home con MarketingLayout)
  ├── tienda.jsx (con StoreLayout)
  ├── categorias.jsx (con StoreLayout)
  ├── carrito.jsx (con StoreLayout)
  ├── servicios.jsx (con MarketingLayout)
  ├── blog/index.jsx (con MarketingLayout)
  ├── producto/[id].jsx (con StoreLayout)
  ├── categoria/
  │   ├── [slug].jsx (dinámico con StoreLayout)
  │   └── (categorías específicas como statics)
  └── ...

/src/components/layout
  ├── StoreLayout.jsx ✓
  ├── MarketingLayout.jsx ✓
  ├── StoreHeader.jsx ✓
  ├── MarketingHeader.jsx
  └── Footer.jsx ✓

RESULTADO: Consistencia, mantenibilidad, claridad
```

---

## 🎓 CONCLUSIÓN

**Estado Actual:**
- Funcional pero caótico
- Duplicación de estructura
- Inconsistencia en layouts
- Monolitos grandes
- Estado fragmentado

**Prioridades:**
1. 🔴 **Crítica:** Consolidar layouts (getLayout pattern)
2. 🟡 **Alta:** Remover duplicados de `/pages`
3. 🟡 **Alta:** Centralizar estado
4. 🟢 **Media:** Refactorizar TiendaCompleta
5. 🟢 **Baja:** Performance optimizations

**Documento de referencia:**
- `ARQUITECTURA_TIENDA_COMPLETA.md` - Detalles de tienda
- `PLAN_ACCION_CONSOLIDACION.md` - Pasos específicos
- `ARQUITECTURA_COMPLETA_PROYECTO.md` - **THIS FILE**

---

**Fin del documento**
