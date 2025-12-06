# 🎨 Guía de Diseño Responsive

## Introducción

Este documento explica cómo usar el sistema de diseño responsive implementado en el proyecto. El sistema está basado en Tailwind CSS con breakpoints extendidos y componentes reutilizables.

## 🧩 Breakpoints Disponibles

| Breakpoint | Tamaño | Uso Principal |
|------------|--------|---------------|
| `xs` | 480px+ | Móvil pequeño |
| `sm` | 640px+ | Móvil estándar |
| `md` | 768px+ | Tablet |
| `lg` | 1024px+ | Laptop |
| `xl` | 1280px+ | Desktop |
| `2xl` | 1536px+ | Pantalla amplia |
| `3xl` | 1920px+ | Ultra-wide |

## 📝 Sistema de Tipografía

### Uso Básico

```jsx
import { ResponsiveTypography, ResponsiveHeading } from '@/components/ui/ResponsiveTypography';

// Heading responsive
<ResponsiveHeading level="h1">
  Título Principal
</ResponsiveHeading>

// Texto responsive
<ResponsiveTypography level="body">
  Texto del cuerpo
</ResponsiveTypography>
```

### Niveles Disponibles

- `h1` - Título principal (2xl → 7xl)
- `h2` - Subtítulo (xl → 6xl)
- `h3` - Encabezado de sección (lg → 5xl)
- `h4` - Subsección (base → 4xl)
- `h5` - Título pequeño (sm → 3xl)
- `h6` - Etiqueta (xs → 2xl)
- `body` - Texto del cuerpo
- `bodySmall` - Texto pequeño
- `caption` - Texto de captura
- `button` - Texto de botón
- `link` - Enlaces

## 🏗️ Sistema de Grid

### Uso Básico

```jsx
import { ProductGrid, CategoryGrid, ServiceGrid } from '@/components/ui/ResponsiveGrid';

// Grid de productos (1-6 columnas)
<ProductGrid>
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</ProductGrid>

// Grid de categorías (2-8 columnas)
<CategoryGrid>
  {categories.map(category => (
    <CategoryCard key={category.id} category={category} />
  ))}
</CategoryGrid>
```

### Variantes Disponibles

- `products` - 1-6 columnas (productos)
- `categories` - 2-8 columnas (categorías)
- `services` - 1-4 columnas (servicios)
- `blog` - 1-3 columnas (artículos)
- `testimonials` - 1-3 columnas (testimonios)
- `team` - 1-4 columnas (equipo)
- `features` - 1-2 columnas (características)
- `form` - 1-2 columnas (formularios)
- `navigation` - Horizontal responsive
- `footer` - 1-4 columnas (footer)

## 🎴 Componentes de Cards

### Uso Básico

```jsx
import { ResponsiveCard, ProductCard, ServiceCard } from '@/components/ui/ResponsiveCard';

// Card genérica
<ResponsiveCard
  title="Título del Card"
  description="Descripción del contenido"
  image="/path/to/image.jpg"
  price="$100.00"
  action="Ver más"
  onClick={() => console.log('Card clicked')}
/>

// Card de producto
<ProductCard
  product={product}
  onAddToCart={(product) => console.log('Added to cart', product)}
/>

// Card de servicio
<ServiceCard
  service={service}
  onSelect={(service) => console.log('Service selected', service)}
/>
```

## 🎨 Clases CSS Responsive

### Container Responsive

```css
.container-responsive {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);
}
```

### Grid Responsive

```css
.grid-responsive {
  display: grid;
  gap: var(--gap-md);
  grid-template-columns: 1fr;
}
```

### Typography Responsive

```css
.text-responsive {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}
```

## 📱 Ejemplos Prácticos

### Página de Productos

```jsx
import { ProductGrid } from '@/components/ui/ResponsiveGrid';
import { ResponsiveHeading } from '@/components/ui/ResponsiveTypography';
import { ProductCard } from '@/components/ui/ResponsiveCard';

const ProductsPage = ({ products }) => (
  <div className="container-responsive">
    <ResponsiveHeading level="h1" className="mb-8">
      Nuestros Productos
    </ResponsiveHeading>
    
    <ProductGrid>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </ProductGrid>
  </div>
);
```

### Sección de Servicios

```jsx
import { ServiceGrid } from '@/components/ui/ResponsiveGrid';
import { ResponsiveHeading, ResponsiveText } from '@/components/ui/ResponsiveTypography';
import { ServiceCard } from '@/components/ui/ResponsiveCard';

const ServicesSection = ({ services }) => (
  <section className="py-8 sm:py-12 lg:py-16">
    <div className="container-responsive">
      <ResponsiveHeading level="h2" className="mb-4">
        Nuestros Servicios
      </ResponsiveHeading>
      
      <ResponsiveText level="body" className="mb-8 max-w-2xl">
        Ofrecemos una amplia gama de servicios especializados para tu bienestar.
      </ResponsiveText>
      
      <ServiceGrid>
        {services.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={handleServiceSelect}
          />
        ))}
      </ServiceGrid>
    </div>
  </section>
);
```

## 🧪 Testing Responsive

### Comandos de Testing

```bash
# Test completo en todos los dispositivos
npm run test:responsive

# Test solo en móviles
npm run test:mobile

# Test solo en tablets
npm run test:tablet

# Test solo en desktop
npm run test:desktop
```

### Validaciones Automáticas

El sistema de testing valida automáticamente:

- ✅ Navegación responsive
- ✅ Grid layouts
- ✅ Tipografía escalable
- ✅ Imágenes optimizadas
- ✅ Botones con área táctil adecuada (44px+ en móvil)
- ✅ Contenido visible en todos los breakpoints

## 🎯 Mejores Prácticas

### 1. Mobile-First Approach

```jsx
// ✅ Correcto - Mobile first
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

// ❌ Incorrecto - Desktop first
<div className="grid grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
```

### 2. Uso de Variables CSS

```jsx
// ✅ Correcto - Usar variables
<div className="spacing-responsive">

// ❌ Incorrecto - Valores fijos
<div className="p-4 sm:p-6 lg:p-8">
```

### 3. Imágenes Responsive

```jsx
// ✅ Correcto - Con sizes attribute
<Image
  src="/image.jpg"
  alt="Descripción"
  width={300}
  height={200}
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
/>

// ❌ Incorrecto - Sin optimización
<img src="/image.jpg" alt="Descripción" />
```

### 4. Botones Accesibles

```jsx
// ✅ Correcto - Área táctil adecuada
<button className="min-h-[44px] min-w-[44px] p-3">

// ❌ Incorrecto - Muy pequeño para móvil
<button className="p-1 text-xs">
```

## 🔧 Configuración Avanzada

### Variables CSS Personalizadas

```css
:root {
  --spacing-custom: 2rem;
  --font-size-custom: 1.25rem;
  --gap-custom: 1.5rem;
}
```

### Breakpoints Personalizados

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        '3xl': '1536px',
        '4xl': '1920px',
      }
    }
  }
}
```

## 📊 Métricas de Performance

### Lighthouse Scores Objetivo

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

### Métricas Responsive

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## 🚀 Próximos Pasos

1. **Implementar componentes** en páginas existentes
2. **Migrar layouts** actuales al sistema responsive
3. **Optimizar imágenes** con Next.js Image
4. **Configurar testing** automatizado
5. **Documentar patrones** específicos del proyecto

---

Para más información, consulta la documentación de [Tailwind CSS](https://tailwindcss.com/docs/responsive-design) y [Next.js](https://nextjs.org/docs/basic-features/image-optimization).
