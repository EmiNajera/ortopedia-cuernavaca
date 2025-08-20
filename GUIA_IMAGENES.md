# Guía de Organización de Imágenes - OrtoTech

## 📁 Estructura de Carpetas Recomendada

```
public/
├── images/
│   ├── products/           # Imágenes de productos
│   │   ├── plantillas/     # Plantillas ortopédicas
│   │   ├── fajas/          # Fajas y soportes
│   │   ├── ortesis/        # Ortesis y férulas
│   │   ├── calzado/        # Calzado ortopédico
│   │   ├── rehabilitacion/ # Equipos de rehabilitación
│   │   └── pediatria/      # Productos pediátricos
│   ├── banners/            # Banners promocionales
│   │   ├── hero/           # Banners principales
│   │   ├── promociones/    # Banners de ofertas
│   │   └── servicios/      # Banners de servicios
│   ├── ui/                 # Elementos de interfaz
│   │   ├── icons/          # Iconos personalizados
│   │   ├── logos/          # Logos de marcas
│   │   └── placeholders/   # Imágenes placeholder
│   ├── blog/               # Imágenes para artículos del blog
│   ├── team/               # Fotos del equipo
│   └── clinic/             # Imágenes de la clínica
```

## 🖼️ Especificaciones Técnicas

### Formatos Recomendados
- **WebP** (preferido) - Mejor compresión, soporte moderno
- **JPEG** - Para fotografías
- **PNG** - Para imágenes con transparencia
- **SVG** - Para iconos y gráficos vectoriales

### Tamaños Estándar
```
Productos:
- Thumbnail: 150x150px
- Vista detalle: 300x300px
- Galería: 600x600px

Banners:
- Hero: 1200x400px
- Promocional: 400x200px
- Servicios: 300x150px

UI Elements:
- Iconos: 24x24px, 32x32px
- Logos: 100x50px
- Placeholders: 150x150px
```

## 📍 Ubicaciones Específicas por Sección

### 1. Productos (src/pages/store/TiendaCompleta.jsx)

#### Plantillas (líneas 47-51)
```javascript
// Reemplazar estas URLs:
"https://images.unsplash.com/photo-1582571352032-448f7928eca0?w=300&h=300&fit=crop&auto=format&q=70"

// Con rutas locales:
"/images/products/plantillas/plantilla-pie-plano.jpg"
"/images/products/plantillas/plantilla-pie-cavo.jpg"
"/images/products/plantillas/plantilla-deportiva.jpg"
```

#### Fajas (líneas 52-56)
```javascript
// Reemplazar:
"https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=300&h=300&fit=crop&auto=format&q=70"

// Con:
"/images/products/fajas/faja-lumbar.jpg"
"/images/products/fajas/faja-abdominal.jpg"
"/images/products/fajas/faja-deportiva.jpg"
```

#### Ortesis (líneas 57-61)
```javascript
// Reemplazar:
"https://images.unsplash.com/photo-1606811971614-cf6e27e7c5f5?w=300&h=300&fit=crop&auto=format&q=70"

// Con:
"/images/products/ortesis/rodillera-ortopedica.jpg"
"/images/products/ortesis/rodillera-deportiva.jpg"
"/images/products/ortesis/tobillera-elastica.jpg"
```

#### Calzado (líneas 62-66)
```javascript
// Reemplazar:
"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&auto=format&q=70"

// Con:
"/images/products/calzado/calzado-infantil.jpg"
"/images/products/calzado/calzado-adulto.jpg"
"/images/products/calzado/calzado-deportivo.jpg"
```

#### Rehabilitación (líneas 67-71)
```javascript
// Reemplazar:
"/images/products/muletas.svg"

// Con:
"/images/products/rehabilitacion/masajeador-percutor.jpg"
"/images/products/rehabilitacion/electroestimulador-tens.jpg"
"/images/products/rehabilitacion/bandas-resistencia.jpg"
```

### 2. Banners (líneas 218-230)

#### Hero Banner (línea 218)
```javascript
// Reemplazar:
style={{ backgroundImage: "url('/images/banners/hero-clinica.svg')"}}

// Con:
style={{ backgroundImage: "url('/images/banners/hero/clinica-principal.jpg')"}}
```

#### Banners de Servicios (líneas 223-228)
```javascript
// Reemplazar:
<img src="/images/banners/toma-molde.svg" alt="Toma de Molde" />
<img src="/images/banners/consulta-ortesista.svg" alt="Consulta con Ortesista" />

// Con:
<img src="/images/banners/servicios/toma-molde.jpg" alt="Toma de Molde" />
<img src="/images/banners/servicios/consulta-ortesista.jpg" alt="Consulta con Ortesista" />
```

### 3. Ofertas Especiales (líneas 470-485)

```javascript
// Reemplazar todos los placehold.co con:
{ img: "/images/banners/promociones/plantilla-premium.jpg", name: "Plantilla Premium" }
{ img: "/images/banners/promociones/faja-lumbar-pro.jpg", name: "Faja Lumbar Pro" }
{ img: "/images/banners/promociones/rodillera-deportiva.jpg", name: "Rodillera Deportiva" }
// ... etc
```

### 4. Packs (líneas 540-560)

```javascript
// Reemplazar:
{ img: "https://placehold.co/200x150/FF6B6B/ffffff?text=Pack+1", name: "Pack Plantillas Premium" }

// Con:
{ img: "/images/banners/promociones/pack-plantillas-premium.jpg", name: "Pack Plantillas Premium" }
```

### 5. Productos Más Buscados (líneas 580-595)

```javascript
// Reemplazar todos los placehold.co con rutas locales:
{ img: "/images/products/plantillas/plantilla-pie-plano.jpg", name: "Plantilla para Pie Plano" }
{ img: "/images/products/fajas/faja-lumbar.jpg", name: "Faja Lumbar" }
// ... etc
```

### 6. Fisioterapia (líneas 610-625)

```javascript
// Reemplazar:
<img src="https://placehold.co/200x50/ffffff/143d59?text=Clínica" alt="Clínica Logo" />

// Con:
<img src="/images/ui/logos/clinica-logo.png" alt="Clínica Logo" />

// Y los productos:
<ProductCard imgSrc="/images/products/rehabilitacion/masajeador-percutor.jpg" />
<ProductCard imgSrc="/images/products/rehabilitacion/electroestimulador-tens.jpg" />
// ... etc
```

### 7. Pediatría (líneas 630-640)

```javascript
// Reemplazar:
<ProductCard imgSrc="https://placehold.co/150x150/eeeeee/333333?text=Zapato+Niño" />

// Con:
<ProductCard imgSrc="/images/products/pediatria/zapato-infantil.jpg" />
<ProductCard imgSrc="/images/products/pediatria/plantilla-pediatrica.jpg" />
<ProductCard imgSrc="/images/products/pediatria/ferula-displasia.jpg" />
```

### 8. Artículos de Salud (líneas 645-680)

```javascript
// Reemplazar:
{ img: "https://placehold.co/300x200/FF6B6B/ffffff?text=Artículo+1", title: "Cómo elegir la plantilla correcta" }

// Con:
{ img: "/images/blog/plantilla-correcta.jpg", title: "Cómo elegir la plantilla correcta" }
```

### 9. Marcas (líneas 685-695)

```javascript
// Reemplazar:
<img src="https://placehold.co/100x50/cccccc/333333?text=DonJoy" alt="DonJoy" />

// Con:
<img src="/images/ui/logos/donjoy-logo.png" alt="DonJoy" />
<img src="/images/ui/logos/orliman-logo.png" alt="Orliman" />
<img src="/images/ui/logos/medi-logo.png" alt="Medi" />
<img src="/images/ui/logos/ottobock-logo.png" alt="Ottobock" />
<img src="/images/ui/logos/ortochavitos-logo.png" alt="Ortochavitos" />
```

### 10. Footer (líneas 720-730)

```javascript
// Reemplazar:
<img src="https://placehold.co/40x25/1a365d/ffffff?text=Visa" alt="Visa" />

// Con:
<img src="/images/ui/payment/visa-logo.png" alt="Visa" />
<img src="/images/ui/payment/mastercard-logo.png" alt="Mastercard" />
<img src="/images/ui/payment/paypal-logo.png" alt="PayPal" />
```

## 🔧 Optimización Recomendada

### 1. Usar Next.js Image Component
```javascript
import Image from 'next/image';

// En lugar de:
<img src="/images/products/plantilla.jpg" alt="Plantilla" />

// Usar:
<Image 
  src="/images/products/plantilla.jpg" 
  alt="Plantilla" 
  width={150} 
  height={150}
  className="object-cover"
/>
```

### 2. Configurar next.config.js
```javascript
// Agregar dominios externos si es necesario
images: {
  domains: ['images.unsplash.com', 'picsum.photos'],
  formats: ['image/webp', 'image/avif'],
}
```

### 3. Nomenclatura de Archivos
```
Formato: [categoria]-[descripcion]-[tamaño].[extension]
Ejemplos:
- plantilla-pie-plano-150x150.webp
- faja-lumbar-300x300.jpg
- hero-clinica-1200x400.webp
- logo-donjoy-100x50.png
```

## 📋 Checklist de Implementación

- [ ] Crear estructura de carpetas en `public/images/`
- [ ] Optimizar imágenes (WebP preferido)
- [ ] Redimensionar a tamaños estándar
- [ ] Reemplazar URLs en `TiendaCompleta.jsx`
- [ ] Actualizar `next.config.js` si es necesario
- [ ] Probar carga de imágenes
- [ ] Verificar responsive design
- [ ] Optimizar para SEO (alt tags)

## 🎯 Tipos de Imágenes Necesarias

### Productos (150x150px)
- Plantillas: 6 imágenes
- Fajas: 5 imágenes  
- Ortesis: 5 imágenes
- Calzado: 5 imágenes
- Rehabilitación: 5 imágenes
- Pediatría: 5 imágenes

### Banners
- Hero: 1 imagen (1200x400px)
- Servicios: 2 imágenes (400x200px)
- Promociones: 6 imágenes (300x200px)

### UI Elements
- Logos de marcas: 5 imágenes (100x50px)
- Métodos de pago: 3 imágenes (40x25px)
- Iconos: 10+ imágenes (24x24px)

### Blog
- Artículos: 4 imágenes (300x200px)

**Total estimado: ~50 imágenes**
