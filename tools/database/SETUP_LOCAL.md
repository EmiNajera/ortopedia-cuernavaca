# Setup Local - Base de Datos MySQL

Guía paso a paso para configurar MySQL localmente en desarrollo.

## 📋 Requisitos Previos

1. **MySQL instalado** en tu máquina
   - Windows: [MySQL Installer](https://dev.mysql.com/downloads/installer/)
   - macOS: `brew install mysql`
   - Linux: `sudo apt install mysql-server`

2. **Python 3** (para el script de importación)
   - Verificar: `python --version` o `python3 --version`

3. **Node.js y npm** (ya los tienes)

---

## 🚀 Pasos de Configuración

### Paso 1: Instalar MySQL (si no lo tienes)

#### Windows
1. Descarga MySQL Installer desde: https://dev.mysql.com/downloads/installer/
2. Ejecuta el instalador
3. Selecciona "Developer Default"
4. Configura una contraseña para root (o déjala vacía)

#### macOS
```bash
brew install mysql
brew services start mysql
```

#### Linux
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

---

### Paso 2: Crear Base de Datos y Esquema

#### Opción A: Usando Script Automático (Recomendado)

**Windows (PowerShell):**
```powershell
cd database
.\setup_local.ps1
```

**macOS/Linux:**
```bash
cd database
chmod +x setup_local.sh
./setup_local.sh
```

#### Opción B: Manual

```bash
# 1. Conectar a MySQL
mysql -u root -p

# 2. Crear base de datos
CREATE DATABASE ortopedia_cuernavaca 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

# 3. Salir de MySQL
exit;

# 4. Ejecutar esquema
mysql -u root -p ortopedia_cuernavaca < database/schema.sql
```

---

### Paso 3: Configurar Script de Importación

Edita `database/import_from_markdown.py` y actualiza las credenciales:

```python
DB_CONFIG = {
    'host': 'localhost',
    'database': 'ortopedia_cuernavaca',
    'user': 'root',        # Tu usuario MySQL
    'password': '',        # Tu contraseña MySQL (deja vacío si no hay)
    'charset': 'utf8mb4',
    'collation': 'utf8mb4_unicode_ci'
}
```

---

### Paso 4: Instalar Dependencias Python

```bash
pip install mysql-connector-python
```

O si usas Python 3 específicamente:
```bash
pip3 install mysql-connector-python
```

---

### Paso 5: Importar Productos

```bash
# Desde el directorio raíz del proyecto
python database/import_from_markdown.py
```

O:
```bash
python3 database/import_from_markdown.py
```

El script:
- ✅ Lee `Lista de productos.md`
- ✅ Crea categorías, marcas y tipos automáticamente
- ✅ Importa todos los productos
- ✅ Genera slugs automáticamente
- ✅ Publica productos que tienen descripción y características

---

### Paso 6: Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Base de Datos MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ortopedia_cuernavaca

# URL del sitio (opcional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**⚠️ Importante:** `.env.local` está en `.gitignore`, no se subirá a git.

---

### Paso 7: Instalar Dependencias Node.js

```bash
npm install
```

Esto instalará `mysql2` que agregamos al `package.json`.

---

### Paso 8: Verificar que Todo Funciona

```bash
# Iniciar servidor de desarrollo
npm run dev
```

Visita: http://localhost:3000/api/products

Deberías ver un JSON con los productos importados.

---

## 🔍 Verificar Importación

### Desde MySQL

```bash
mysql -u root -p ortopedia_cuernavaca
```

```sql
-- Ver total de productos
SELECT COUNT(*) FROM productos;

-- Ver productos publicados
SELECT COUNT(*) FROM productos WHERE publicado = TRUE;

-- Ver algunas categorías
SELECT * FROM categorias LIMIT 10;

-- Ver algunas marcas
SELECT * FROM marcas LIMIT 10;

-- Ver productos de ejemplo
SELECT id, nombre_producto, precio, publicado FROM productos LIMIT 5;
```

### Desde la API

```bash
# Obtener todos los productos
curl http://localhost:3000/api/products

# Buscar productos
curl http://localhost:3000/api/products?search=rodillera

# Filtrar por categoría
curl http://localhost:3000/api/products?category=fajas
```

---

## 🐛 Solución de Problemas

### Error: "Access denied for user"
- Verifica que el usuario y contraseña en `DB_CONFIG` sean correctos
- Intenta con `root` sin contraseña si es desarrollo local

### Error: "Can't connect to MySQL server"
- Verifica que MySQL esté corriendo:
  - Windows: Servicios → MySQL
  - macOS: `brew services list`
  - Linux: `sudo systemctl status mysql`

### Error: "No module named 'mysql.connector'"
```bash
pip install mysql-connector-python
```

### Error: "Table doesn't exist"
- Ejecuta el esquema: `mysql -u root -p ortopedia_cuernavaca < database/schema.sql`

### Productos no aparecen en la API
- Verifica que los productos estén publicados: `SELECT * FROM productos WHERE publicado = FALSE;`
- Los productos se publican automáticamente si tienen descripción y características

---

## 📝 Notas Importantes

1. **Desarrollo vs Producción:**
   - Este setup es solo para desarrollo local
   - En producción (VPS), usa las mismas credenciales pero con contraseñas seguras

2. **Backup:**
   - Antes de hacer cambios, haz backup: `mysqldump -u root -p ortopedia_cuernavaca > backup.sql`

3. **Re-importar:**
   - Si necesitas re-importar, puedes truncar las tablas o eliminar la BD y volver a crear

---

## ✅ Checklist de Verificación

- [ ] MySQL instalado y corriendo
- [ ] Base de datos `ortopedia_cuernavaca` creada
- [ ] Esquema SQL ejecutado
- [ ] `import_from_markdown.py` configurado con credenciales
- [ ] `mysql-connector-python` instalado
- [ ] Productos importados exitosamente
- [ ] `.env.local` creado con credenciales
- [ ] `npm install` ejecutado
- [ ] `npm run dev` funciona
- [ ] API `/api/products` devuelve productos

---

¡Listo! Tu base de datos local está configurada y lista para desarrollo. 🎉

