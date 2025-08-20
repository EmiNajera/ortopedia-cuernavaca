# 📝 Guía de Plantilla para Artículos del Blog

## 🎯 Descripción General

Esta plantilla proporciona una estructura consistente y profesional para todos los artículos del blog de OrtoTech. Incluye componentes reutilizables, animaciones suaves y una experiencia de usuario optimizada.

## 🏗️ Estructura de la Plantilla

### Componentes Principales

1. **`BlogArticleTemplate.jsx`** - Plantilla base principal
2. **`BlogArticle.jsx`** - Ejemplo de implementación
3. **Componentes modulares** para cada sección

### Estructura de Archivos

```
src/
├── components/
│   └── BlogArticleTemplate.jsx    # Plantilla principal
├── pages/
│   └── BlogArticle.jsx            # Ejemplo de artículo
└── docs/
    └── BlogTemplateGuide.md       # Esta guía
```

## 📋 Cómo Crear un Nuevo Artículo

### Paso 1: Crear el Archivo del Artículo

Crea un nuevo archivo en `src/pages/` con el nombre `BlogArticle[Nombre].jsx`:

```jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import BlogArticleTemplate from '../components/BlogArticleTemplate';

export default function BlogArticleEjemplo() {
  const { id } = useParams();

  // Datos del artículo
  const article = {
    id: 1,
    title: 'Título del Artículo',
    excerpt: 'Descripción breve del artículo...',
    category: 'categoria',
    author: 'Nombre del Autor',
    date: '2024-01-15',
    readTime: '5 min',
    image: 'URL_de_la_imagen',
    featured: false,
    tags: ['Tag1', 'Tag2', 'Tag3']
  };

  // Información del autor
  const author = {
    name: 'Nombre del Autor',
    bio: 'Biografía del autor...',
    social: {
      twitter: 'https://twitter.com/usuario',
      linkedin: 'https://linkedin.com/in/usuario'
    }
  };

  // Contenido del artículo
  const content = (
    <div className="space-y-8">
      {/* Tu contenido aquí */}
    </div>
  );

  // Artículos relacionados
  const relatedArticles = [
    // Array de artículos relacionados
  ];

  // Navegación
  const previousArticle = { id: 0, title: 'Artículo Anterior' };
  const nextArticle = { id: 2, title: 'Siguiente Artículo' };

  return (
    <BlogArticleTemplate
      article={article}
      content={content}
      author={author}
      relatedArticles={relatedArticles}
      previousArticle={previousArticle}
      nextArticle={nextArticle}
    />
  );
}
```

### Paso 2: Definir los Datos del Artículo

#### Estructura del Objeto `article`:

```javascript
const article = {
  id: 1,                           // ID único del artículo
  title: 'Título del Artículo',    // Título principal
  excerpt: 'Descripción breve...', // Resumen del artículo
  category: 'categoria',           // Categoría (tecnologia, consejos, etc.)
  author: 'Nombre del Autor',      // Nombre del autor
  date: '2024-01-15',             // Fecha en formato YYYY-MM-DD
  readTime: '5 min',              // Tiempo estimado de lectura
  image: 'URL_de_la_imagen',      // URL de la imagen destacada
  featured: false,                // Si es artículo destacado
  tags: ['Tag1', 'Tag2']          // Array de etiquetas
};
```

#### Estructura del Objeto `author`:

```javascript
const author = {
  name: 'Nombre del Autor',
  bio: 'Biografía profesional del autor...',
  social: {
    twitter: 'https://twitter.com/usuario',    // Opcional
    linkedin: 'https://linkedin.com/in/usuario' // Opcional
  }
};
```

### Paso 3: Crear el Contenido

El contenido se define usando JSX para mejor estructura y estilos:

```jsx
const content = (
  <div className="space-y-8">
    {/* Párrafo introductorio */}
    <p className="text-lg text-gray-700 leading-relaxed">
      Contenido del párrafo...
    </p>

    {/* Títulos de sección */}
    <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
      Título de Sección
    </h2>

    {/* Cajas destacadas */}
    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
      <h3 className="text-xl font-bold text-blue-900 mb-3">💡 Punto Clave</h3>
      <p className="text-blue-800">Contenido destacado...</p>
    </div>

    {/* Grid de características */}
    <div className="grid md:grid-cols-2 gap-6 my-8">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          {/* Icono */}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Título</h3>
        <p className="text-gray-600">Descripción...</p>
      </div>
    </div>

    {/* Lista numerada */}
    <div className="bg-gray-50 rounded-xl p-8 my-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Pasos</h3>
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Paso 1</h4>
            <p className="text-gray-600">Descripción...</p>
          </div>
        </div>
      </div>
    </div>

    {/* Estadísticas */}
    <div className="grid md:grid-cols-3 gap-6 my-8">
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
        <div className="text-gray-600">Descripción</div>
      </div>
    </div>

    {/* CTA destacado */}
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
      <h3 className="text-xl font-bold text-yellow-900 mb-3">📞 ¿Interesado?</h3>
      <p className="text-yellow-800 mb-4">Descripción...</p>
      <a href="/contacto" className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
        Agendar Consulta
      </a>
    </div>
  </div>
);
```

## 🎨 Elementos de Diseño Disponibles

### Tipografías

- **Títulos principales**: `text-4xl md:text-5xl font-bold text-gray-900`
- **Títulos de sección**: `text-3xl font-bold text-gray-900`
- **Subtítulos**: `text-xl font-bold text-gray-900`
- **Párrafos**: `text-gray-700 leading-relaxed`
- **Texto destacado**: `text-lg text-gray-700`

### Cajas y Contenedores

#### Caja de Información Azul
```jsx
<div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
  <h3 className="text-xl font-bold text-blue-900 mb-3">💡 Punto Clave</h3>
  <p className="text-blue-800">Contenido...</p>
</div>
```

#### Caja de Advertencia Amarilla
```jsx
<div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
  <h3 className="text-xl font-bold text-yellow-900 mb-3">⚠️ Importante</h3>
  <p className="text-yellow-800">Contenido...</p>
</div>
```

#### Caja de Proceso Gris
```jsx
<div className="bg-gray-50 rounded-xl p-8 my-8">
  <h3 className="text-2xl font-bold text-gray-900 mb-6">Proceso</h3>
  {/* Contenido del proceso */}
</div>
```

#### Caja Gradiente
```jsx
<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 my-8">
  <h3 className="text-2xl font-bold mb-4">🚀 Innovación</h3>
  {/* Contenido */}
</div>
```

### Grids y Layouts

#### Grid de 2 Columnas
```jsx
<div className="grid md:grid-cols-2 gap-6 my-8">
  {/* Elementos */}
</div>
```

#### Grid de 3 Columnas
```jsx
<div className="grid md:grid-cols-3 gap-6 my-8">
  {/* Elementos */}
</div>
```

### Iconos y Elementos Visuales

#### Iconos con Fondo de Color
```jsx
<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {/* Path del icono */}
  </svg>
</div>
```

#### Números Circulares
```jsx
<div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
  1
</div>
```

## 📱 Responsive Design

La plantilla incluye diseño responsive automático:

- **Mobile**: Una columna, espaciado reducido
- **Tablet**: Dos columnas en grids
- **Desktop**: Tres columnas en grids, espaciado completo

## 🎭 Animaciones

Todas las animaciones están integradas usando Framer Motion:

- **Entrada suave** de elementos
- **Hover effects** en botones y enlaces
- **Transiciones** entre secciones
- **Animaciones escalonadas** para listas

## 🔗 Integración con Rutas

Para integrar el artículo en las rutas, agrega en `MainRoutes.jsx`:

```jsx
import BlogArticleEjemplo from './pages/BlogArticleEjemplo';

// En las rutas
<Route path="/blog/:id" element={<BlogArticleEjemplo />} />
```

## 📊 SEO y Metadatos

La plantilla incluye automáticamente:

- **Breadcrumbs** para navegación
- **Metadatos** del autor y fecha
- **Tags** para categorización
- **Tiempo de lectura** estimado
- **Imagen destacada** optimizada

## 🎯 Mejores Prácticas

### Contenido
1. **Usa títulos descriptivos** y atractivos
2. **Incluye imágenes relevantes** de alta calidad
3. **Estructura el contenido** con subtítulos claros
4. **Usa listas y elementos visuales** para mejor legibilidad
5. **Incluye llamadas a la acción** relevantes

### Técnico
1. **Mantén consistencia** en el formato
2. **Optimiza las imágenes** antes de subirlas
3. **Usa tags relevantes** para mejor categorización
4. **Incluye artículos relacionados** del mismo tema
5. **Actualiza la navegación** entre artículos

### SEO
1. **Usa palabras clave** en títulos y contenido
2. **Optimiza las URLs** con slugs descriptivos
3. **Incluye meta descripciones** atractivas
4. **Usa encabezados** jerárquicos (H1, H2, H3)
5. **Incluye enlaces internos** relevantes

## 🚀 Ejemplo Completo

Revisa `BlogArticle.jsx` para ver un ejemplo completo de implementación con todos los elementos disponibles.

## 📞 Soporte

Para dudas sobre la implementación de la plantilla, consulta:
- El archivo `BlogArticle.jsx` como referencia
- Esta guía de documentación
- Los comentarios en el código de la plantilla 