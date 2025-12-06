# 🏗️ Domains Directory

Estructura organizada por dominio de negocio. Cada dominio es independiente y contiene todo lo necesario para funcionar.

## Estructura por dominio

```
domains/
├── blog/              # Dominio: Blog/Artículos
│   ├── components/    # Componentes específicos del blog
│   ├── pages/         # Páginas internas (si las hay)
│   ├── utils/         # Utilidades específicas del blog
│   ├── api/           # API routes del blog
│   ├── hooks/         # Hooks específicos del blog
│   └── store.js   # Estado global del blog (Zustand)
│
├── services/          # Dominio: Servicios médicos
│   ├── components/    # Componentes de servicios
│   ├── pages/         # Páginas internas
│   ├── api/           # API routes de servicios
│   └── data/          # Datos estáticos de servicios
│
└── store/             # Dominio: Tienda/E-commerce
    ├── components/    # Componentes de tienda
    ├── pages/         # Páginas internas
    ├── api/           # API routes de productos/categorías
    ├── data/          # Datos estáticos (categorías, productos)
    └── domain/        # Lógica de negocio (hooks, stores)
```

## Principios

1. **Aislamiento**: Cada dominio es independiente
2. **Completitud**: Cada dominio tiene todo lo necesario
3. **Claridad**: Fácil encontrar código relacionado
4. **Escalabilidad**: Fácil agregar nuevos dominios

## Uso

Importar desde dominios usando aliases:

```javascript
// Blog
import { BlogTemplate } from '@domains/blog/components/BlogTemplate';
import { useProfessionalBlog } from '@domains/blog/hooks/useProfessionalBlog';

// Store
import { TiendaCompleta } from '@domains/store/components/TiendaCompleta';
import { useCart } from '@store/domain/cart/useCart';
```

