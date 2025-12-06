image.png# Backend de Productos - Sistema de Catálogo Dinámico

## 📋 Resumen

Se ha implementado un sistema de backend para productos que funciona como **catálogo** (no e-commerce):
- ✅ Almacenar productos en una base de datos JSON
- ✅ Obtener productos dinámicamente desde API routes
- ✅ Generar cards de productos automáticamente desde la base de datos
- ✅ Filtrar y buscar productos
- ✅ Soporte para imágenes múltiples por producto
- ✅ Botones de "Consultar Disponibilidad" que redirigen a WhatsApp
- ✅ Sistema de catálogo sin carrito de compras

## 🗂️ Estructura de Archivos

### Base de Datos
- **`src/data/products.json`** - Base de datos JSON con todos los productos

### API Routes
- **`src/pages/api/products/index.js`** - GET todos los productos (con filtros opcionales)
- **`src/pages/api/products/[id].js`** - GET producto por ID o slug

### Hooks
- **`src/hooks/useProducts.js`** - Hook personalizado para obtener productos desde la API

### Componentes Actualizados
- **`src/features/store/TiendaCompleta.jsx`** - Ahora usa `useProducts` hook
- **`ProductCard`** - Actualizado para aceptar objetos de producto de la API

## 📊 Estructura de Datos de Producto

```json
{
  "id": "1",
  "title": "Nombre del Producto",
  "brand": "Marca",
  "price": 1200,
  "originalPrice": 1500,
  "discount": 20,
  "rating": 4.8,
  "reviews": 156,
  "inStock": true,
  "stock": 15,
  "category": "plantillas",
  "slug": "plantillas-ortopedicas-personalizadas",
  "images": [
    "/images/products/plantilla.svg",
    "/images/products/plantilla-2.jpg"
  ],
  "description": "Descripción completa del producto",
  "shortDescription": "Descripción corta",
  "features": ["Característica 1", "Característica 2"],
  "specifications": {
    "material": "EVA",
    "tallas": "S, M, L"
  },
  "tags": ["tag1", "tag2"],
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-11-20T00:00:00.000Z"
}
```

## 🔌 Endpoints de API

### GET `/api/products`
Obtiene todos los productos con filtros opcionales.

**Query Parameters:**
- `category` - Filtrar por categoría
- `search` - Buscar por término
- `minPrice` - Precio mínimo
- `maxPrice` - Precio máximo
- `inStock` - Solo productos en stock (true/false)
- `limit` - Limitar número de resultados

**Ejemplo:**
```
GET /api/products?category=plantillas&search=personalizada&inStock=true
```

**Respuesta:**
```json
{
  "success": true,
  "count": 3,
  "products": [...]
}
```

### GET `/api/products/[id]`
Obtiene un producto específico por ID o slug.

**Ejemplo:**
```
GET /api/products/1
GET /api/products/plantillas-ortopedicas-personalizadas
```

**Respuesta:**
```json
{
  "success": true,
  "product": {...}
}
```

## 📝 Cómo Agregar Nuevos Productos

1. **Editar `src/data/products.json`**
2. Agregar un nuevo objeto producto con la estructura completa
3. Asegurarse de incluir:
   - `id` único
   - `title`
   - `price`
   - `category`
   - `images` (al menos una imagen)
   - `slug` único

**Ejemplo:**
```json
{
  "id": "4",
  "title": "Nuevo Producto",
  "brand": "Ortopedia Cuernavaca",
  "price": 900,
  "originalPrice": 1100,
  "discount": 18,
  "rating": 4.5,
  "reviews": 0,
  "inStock": true,
  "stock": 20,
  "category": "fajas",
  "slug": "nuevo-producto",
  "images": [
    "/images/products/nuevo-producto.jpg"
  ],
  "description": "Descripción del nuevo producto",
  "shortDescription": "Descripción corta",
  "features": ["Característica 1"],
  "specifications": {
    "material": "Material",
    "tallas": "S, M, L"
  },
  "tags": ["tag1"],
  "createdAt": "2024-11-20T00:00:00.000Z",
  "updatedAt": "2024-11-20T00:00:00.000Z"
}
```

## 🎨 Características del ProductCard

El `ProductCard` ahora:
- ✅ Muestra imagen principal del producto
- ✅ Muestra título, precio y precio original (si hay descuento)
- ✅ Muestra rating y número de reseñas
- ✅ Muestra badge de descuento
- ✅ Muestra badge de "Agotado" si no hay stock
- ✅ Formatea precios en MXN
- ✅ Botón "Consultar Disponibilidad" que abre WhatsApp con información del producto
- ✅ Sistema de catálogo: los productos son informativos, no se pueden comprar directamente

## 🔄 Migración Futura

Este sistema está diseñado para ser fácilmente migrable a:
- Base de datos SQL (PostgreSQL, MySQL)
- Base de datos NoSQL (MongoDB)
- CMS (Strapi, Contentful)
- E-commerce (Shopify, WooCommerce)

Solo necesitarías actualizar las API routes para leer desde la nueva fuente de datos.

## 📸 Imágenes

- Las imágenes deben estar en `/public/images/products/`
- Cada producto debe tener al menos una imagen en el array `images`
- La primera imagen del array se usa como imagen principal
- Formatos soportados: `.jpg`, `.png`, `.svg`, `.webp`

## ✅ Estado Actual

- ✅ Base de datos JSON creada
- ✅ API routes implementadas
- ✅ Hook `useProducts` creado
- ✅ `ProductCard` actualizado para datos dinámicos
- ✅ `TiendaCompleta` actualizado para usar API
- ⚠️ Algunos `ProductCard` antiguos aún usan formato estático (se pueden actualizar después)

## 🚀 Próximos Pasos

1. Agregar más productos a `products.json`
2. Subir imágenes reales de productos a `/public/images/products/`
3. Actualizar las secciones que aún usan ProductCard con formato antiguo
4. (Futuro) Implementar sistema de carrito de compras para e-commerce completo
5. (Futuro) Agregar funcionalidad de wishlist persistente

## 📱 Funcionalidad Actual (Catálogo)

- Los productos se muestran como catálogo informativo
- Los botones "Consultar Disponibilidad" abren WhatsApp con información del producto
- No hay carrito de compras ni checkout
- El sistema está preparado para migrar a e-commerce completo en el futuro

