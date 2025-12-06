# 📋 Guía de Migración a Sistema Responsive

## Introducción

Esta guía te ayudará a migrar componentes existentes al nuevo sistema responsive implementado en la **Fase 1 y Fase 2**.

## 🎯 Pasos Generales de Migración

### 1. Identificar el tipo de componente
```
- Header/Navigation → Usar ResponsiveHeader
- Footer → Usar ResponsiveFooter
- Cards → Usar ResponsiveCard
- Grids → Usar ProductGrid, CategoryGrid, etc.
- Texto → Usar ResponsiveTypography, ResponsiveHeading
- Contenedor → Usar ResponsiveContainer, ResponsiveSection
```

### 2. Reemplazar imports
```jsx
// ❌ Antiguo
import Header from '@/components/layout/Header';

// ✅ Nuevo
import ResponsiveHeader from '@/components/layout/ResponsiveHeader';
```

### 3. Actualizar clases de Tailwind
```jsx
// ❌ Antiguo - Sin adaptación responsive
<div className="p-4 grid grid-cols-4">

// ✅ Nuevo - Con adaptación responsive
<div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
```

## 📝 Ejemplos de Migración por Componente

### Header Existente → ResponsiveHeader

**Antes:**
```jsx
import Header from '@/components/layout/Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
```

**Después:**
```jsx
import ResponsiveHeader from '@/components/layout/ResponsiveHeader';

export default function Layout({ children }) {
  return (
    <>
      <ResponsiveHeader />
      {children}
    </>
  );
}
```

### Footer Existente → ResponsiveFooter

**Antes:**
```jsx
import Footer from '@/components/layout/Footer';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
```

**Después:**
```jsx
import ResponsiveFooter from '@/components/layout/ResponsiveFooter';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <ResponsiveFooter />
    </>
  );
}
```

### Grid de Productos

**Antes:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

**Después:**
```jsx
import { ProductGrid } from '@/components/ui/ResponsiveGrid';
import { ProductCard } from '@/components/ui/ResponsiveCard';

<ProductGrid>
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</ProductGrid>
```

### Typography

**Antes:**
```jsx
<h1 className="text-2xl md:text-4xl font-bold">Título</h1>
<p className="text-base md:text-lg text-gray-600">Párrafo</p>
```

**Después:**
```jsx
import { ResponsiveHeading, ResponsiveText } from '@/components/ui/ResponsiveTypography';

<ResponsiveHeading level="h1">Título</ResponsiveHeading>
<ResponsiveText level="body" className="text-gray-600">Párrafo</ResponsiveText>
```

### Container

**Antes:**
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {children}
</div>
```

**Después:**
```jsx
import ResponsiveContainer from '@/components/ui/ResponsiveContainer';

<ResponsiveContainer>
  {children}
</ResponsiveContainer>
```

## 🔄 Checklist de Migración

### Para cada componente:
- [ ] Identificar el tipo de componente
- [ ] Buscar el componente responsive equivalente
- [ ] Actualizar los imports
- [ ] Reemplazar clases de Tailwind innecesarias
- [ ] Probar en móvil (375px)
- [ ] Probar en tablet (768px)
- [ ] Probar en desktop (1280px)
- [ ] Validar que no haya regresiones visuales

### Páginas prioritarias para migrar:
1. **Header** - Afecta toda la navegación
2. **Footer** - Aparece en todas las páginas
3. **TiendaCompleta.jsx** - Componente complejo y visible
4. **Páginas de categoria** - Grids de productos
5. **Blog** - Artículos y listados
6. **Página de inicio** - Hero y secciones destacadas
7. **Formularios** - Contacto, suscripción
8. **Páginas de servicio** - Grids de servicios

## 🧪 Testing Post-Migración

### En cada componente migrado:

```javascript
// Validaciones automáticas
✅ Renderiza correctamente en 375px
✅ Renderiza correctamente en 768px
✅ Renderiza correctamente en 1280px
✅ Texto es legible sin zoom
✅ Botones tienen área táctil ≥ 44px en móvil
✅ Imágenes se escalan correctamente
✅ No hay overflow horizontal
✅ Espaciado es consistente
```

### Comandos de testing:
```bash
# Test completo
npm run test:responsive

# Test en móviles
npm run test:mobile

# Test en tablets
npm run test:tablet

# Test en desktop
npm run test:desktop
```

## 💡 Mejores Prácticas Durante Migración

### 1. Preservar Funcionalidad
No cambies la lógica, solo la presentación:
```jsx
// ❌ Malo - Cambiar lógica
// ✅ Bueno - Solo actualizar UI
```

### 2. Reusar Componentes
```jsx
// ❌ Malo - Duplicar código
<div className="p-4 sm:p-6 lg:p-8">...</div>
<div className="p-4 sm:p-6 lg:p-8">...</div>

// ✅ Bueno - Reusar contenedor
<ResponsiveContainer>...</ResponsiveContainer>
<ResponsiveContainer>...</ResponsiveContainer>
```

### 3. Mantener Consistencia
```jsx
// ❌ Malo - Espaciados inconsistentes
<div className="p-4">...</div>
<div className="p-6">...</div>
<div className="p-8">...</div>

// ✅ Bueno - Usar escala consistente
<ResponsiveContainer>...</ResponsiveContainer>
```

### 4. Documentar Cambios
```jsx
/**
 * Migrado a sistema responsive en Fase 2
 * - Header optimizado para móvil y desktop
 * - Usa ResponsiveHeader
 * - Breakpoints: mobile (375px), tablet (768px), desktop (1280px)
 */
```

## 🔗 Referencias

- **Documentación Responsive**: `src/docs/ResponsiveDesignGuide.md`
- **Tailwind CSS Responsive**: https://tailwindcss.com/docs/responsive-design
- **Componentes Disponibles**:
  - `ResponsiveHeader` - Header optimizado
  - `ResponsiveFooter` - Footer optimizado
  - `ResponsiveCard` - Cards escalables
  - `ResponsiveGrid` - Grids responsivos
  - `ResponsiveTypography` - Tipografía escalable
  - `ResponsiveContainer` - Contenedores responsive

## 📞 Soporte

Si encuentras problemas durante la migración:
1. Revisa la documentación del componente
2. Compara con ejemplos en `ResponsiveDesignGuide.md`
3. Valida con `npm run test:responsive`
4. Consulta la Guía Responsiva de Componentes

---

**Última actualización**: Fase 2 - Componentes Core
**Estado**: En progreso
