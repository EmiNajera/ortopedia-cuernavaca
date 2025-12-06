# Base de Datos - Ortopedia Cuernavaca

## ✅ Estado Actual

La base de datos está **configurada y funcionando** con **362 productos importados**.

### Estructura de la Base de Datos

Esta base de datos está diseñada para gestionar el catálogo de productos del e-commerce de Ortopedia Cuernavaca.

#### Tablas Principales

1. **`categorias`** - Almacena las categorías de productos (45 categorías)
2. **`marcas`** - Almacena las marcas de los productos (139 marcas)
3. **`tipos_producto`** - Almacena los tipos de producto
4. **`productos`** - Tabla principal con 362 productos
5. **`imagenes_producto`** - Múltiples imágenes por producto
6. **`variantes_producto`** - Variantes del mismo producto (diferentes tallas/precios)
7. **`productos_publicados`** - Vista optimizada para e-commerce

---

## 📊 Estadísticas Actuales

- **Total productos:** 362
- **Productos publicados:** 362
- **Categorías:** 45
- **Marcas:** 139

---

## 🔄 Re-importar o Actualizar Productos

Si necesitas actualizar los productos desde `Lista de productos.md`:

```bash
python database/import_from_markdown.py
```

El script:
- ✅ Actualiza productos existentes (por código o nombre)
- ✅ Crea nuevos productos
- ✅ Crea categorías, marcas y tipos automáticamente
- ✅ Publica productos que tienen descripción y características

---

## 📝 Configuración

### Variables de Entorno

El archivo `.env.local` debe contener:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=ortopedia_cuernavaca
```

### Configuración del Script de Importación

Edita `database/import_from_markdown.py` líneas 16-22:

```python
DB_CONFIG = {
    'host': 'localhost',
    'database': 'ortopedia_cuernavaca',
    'user': 'root',
    'password': 'tu_contraseña',
    'charset': 'utf8mb4',
    'collation': 'utf8mb4_unicode_ci'
}
```

---

## 🔍 Consultas Útiles

### Ver productos publicados
```sql
SELECT COUNT(*) FROM productos WHERE publicado = TRUE;
```

### Ver productos por categoría
```sql
SELECT c.nombre, COUNT(p.id) as total
FROM categorias c
LEFT JOIN productos p ON c.id = p.categoria_id
GROUP BY c.id, c.nombre
ORDER BY total DESC;
```

### Ver productos por marca
```sql
SELECT m.nombre, COUNT(p.id) as total
FROM marcas m
LEFT JOIN productos p ON m.id = p.marca_id
GROUP BY m.id, m.nombre
ORDER BY total DESC;
```

### Buscar productos
```sql
SELECT nombre_producto, precio, publicado
FROM productos
WHERE MATCH(nombre_producto, descripcion) AGAINST('rodillera' IN NATURAL LANGUAGE MODE);
```

---

## 📁 Archivos Importantes

- **`schema.sql`** - Esquema de la base de datos (MySQL)
- **`schema_sqlite.sql`** - Versión SQLite para desarrollo alternativo
- **`import_from_markdown.py`** - Script para importar desde `Lista de productos.md`
- **`import_data.py`** - Script alternativo de importación (CSV)
- **`generate_image_paths.py`** - Genera rutas de imágenes automáticamente
- **`config.example.py`** - Ejemplo de configuración
- **`SETUP_LOCAL.md`** - Guía completa de setup (si necesitas reinstalar)

---

## 🚀 Uso en Next.js

La aplicación Next.js usa `src/lib/db.js` para conectarse a la base de datos.

### API Routes

- **`/api/products`** - Obtener todos los productos (con filtros)
- **`/api/products/[id]`** - Obtener producto por ID o slug

### Ejemplo de uso:

```javascript
import { getProducts } from '../../../lib/db';

const products = await getProducts({
  category: 'fajas',
  search: 'lumbosacra',
  limit: 10
});
```

---

## 📦 Estructura de Carpetas para Imágenes

Recomendada estructura en el VPS:

```
public/
└── images/
    └── products/
        ├── categoria-1/
        │   ├── producto-1.jpg
        │   └── producto-2.jpg
        └── categoria-2/
            └── producto-3.jpg
```

---

## 🔧 Mantenimiento

### Backup

```bash
mysqldump -u root -p ortopedia_cuernavaca > backup_$(date +%Y%m%d).sql
```

### Restaurar Backup

```bash
mysql -u root -p ortopedia_cuernavaca < backup_20250127.sql
```

---

## 📚 Documentación Adicional

- **`SETUP_LOCAL.md`** - Guía completa de setup local
- **`RECOMENDACION_PROYECTO.md`** - Análisis y recomendaciones del proyecto
