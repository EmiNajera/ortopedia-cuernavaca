-- ============================================
-- Esquema SQLite para Desarrollo Local
-- Ortopedia Cuernavaca
-- ============================================

-- Tabla de Categorías
CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE,
    descripcion TEXT,
    slug TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_categorias_slug ON categorias(slug);

-- Tabla de Marcas
CREATE TABLE IF NOT EXISTS marcas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE,
    descripcion TEXT,
    logo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_marcas_nombre ON marcas(nombre);

-- Tabla de Tipos de Producto
CREATE TABLE IF NOT EXISTS tipos_producto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Principal de Productos
CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo TEXT UNIQUE,
    nombre_producto TEXT NOT NULL,
    nombre_generico TEXT,
    nombre_ingles TEXT,
    descripcion TEXT,
    caracteristicas TEXT,
    
    -- Relaciones
    categoria_id INTEGER,
    marca_id INTEGER,
    tipo_id INTEGER,
    
    -- Atributos
    talla TEXT,
    sexo TEXT DEFAULT 'Unisex',
    modelo TEXT,
    precio REAL,
    
    -- Imágenes
    ruta_imagen TEXT,
    estado_imagen TEXT DEFAULT 'pendiente',
    
    -- SEO y Publicación
    slug TEXT UNIQUE,
    meta_titulo TEXT,
    meta_descripcion TEXT,
    publicado INTEGER DEFAULT 0,
    
    -- Inventario
    stock INTEGER DEFAULT 0,
    stock_minimo INTEGER DEFAULT 0,
    
    -- Fechas
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
    FOREIGN KEY (marca_id) REFERENCES marcas(id) ON DELETE SET NULL,
    FOREIGN KEY (tipo_id) REFERENCES tipos_producto(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_productos_codigo ON productos(codigo);
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_productos_marca ON productos(marca_id);
CREATE INDEX IF NOT EXISTS idx_productos_tipo ON productos(tipo_id);
CREATE INDEX IF NOT EXISTS idx_productos_publicado ON productos(publicado);
CREATE INDEX IF NOT EXISTS idx_productos_slug ON productos(slug);

-- Tabla de Imágenes Adicionales
CREATE TABLE IF NOT EXISTS imagenes_producto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    producto_id INTEGER NOT NULL,
    ruta_imagen TEXT NOT NULL,
    orden INTEGER DEFAULT 0,
    tipo TEXT DEFAULT 'secundaria',
    alt_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_imagenes_producto ON imagenes_producto(producto_id);

-- Tabla de Variantes de Producto
CREATE TABLE IF NOT EXISTS variantes_producto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    producto_id INTEGER NOT NULL,
    codigo_variante TEXT,
    talla TEXT,
    precio REAL,
    stock INTEGER DEFAULT 0,
    sku TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_variantes_producto ON variantes_producto(producto_id);
CREATE INDEX IF NOT EXISTS idx_variantes_sku ON variantes_producto(sku);


