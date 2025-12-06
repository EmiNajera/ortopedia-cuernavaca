-- ============================================
-- Esquema de Base de Datos para E-commerce
-- Ortopedia Cuernavaca
-- ============================================

-- Tabla de Categorías
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    descripcion TEXT,
    slug VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Marcas
CREATE TABLE IF NOT EXISTS marcas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    descripcion TEXT,
    logo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Tipos de Producto
CREATE TABLE IF NOT EXISTS tipos_producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla Principal de Productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(100) UNIQUE,
    nombre_producto VARCHAR(500) NOT NULL,
    nombre_generico VARCHAR(255),
    nombre_ingles VARCHAR(255),
    descripcion TEXT,
    caracteristicas TEXT,
    
    -- Relaciones
    categoria_id INT,
    marca_id INT,
    tipo_id INT,
    
    -- Atributos
    talla VARCHAR(50),
    sexo ENUM('Unisex', 'Caballero', 'Dama', 'Infantil', 'Pediátrico', 'Juvenil', 'NA') DEFAULT 'Unisex',
    modelo VARCHAR(100),
    precio DECIMAL(10, 2),
    
    -- Imágenes
    ruta_imagen VARCHAR(500),
    estado_imagen ENUM('pendiente', 'procesada', 'publicada') DEFAULT 'pendiente',
    
    -- SEO y Publicación
    slug VARCHAR(500) UNIQUE,
    meta_titulo VARCHAR(255),
    meta_descripcion TEXT,
    publicado BOOLEAN DEFAULT FALSE,
    
    -- Inventario
    stock INT DEFAULT 0,
    stock_minimo INT DEFAULT 0,
    
    -- Fechas
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
    FOREIGN KEY (marca_id) REFERENCES marcas(id) ON DELETE SET NULL,
    FOREIGN KEY (tipo_id) REFERENCES tipos_producto(id) ON DELETE SET NULL,
    INDEX idx_codigo (codigo),
    INDEX idx_categoria (categoria_id),
    INDEX idx_marca (marca_id),
    INDEX idx_tipo (tipo_id),
    INDEX idx_publicado (publicado),
    INDEX idx_slug (slug),
    FULLTEXT idx_busqueda (nombre_producto, nombre_generico, descripcion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Imágenes Adicionales (para múltiples imágenes por producto)
CREATE TABLE IF NOT EXISTS imagenes_producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    ruta_imagen VARCHAR(500) NOT NULL,
    orden INT DEFAULT 0,
    tipo ENUM('principal', 'secundaria', 'detalle') DEFAULT 'secundaria',
    alt_text VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    INDEX idx_producto (producto_id),
    INDEX idx_orden (orden)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Variantes de Producto (para diferentes tallas/precios del mismo producto)
CREATE TABLE IF NOT EXISTS variantes_producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    codigo_variante VARCHAR(100),
    talla VARCHAR(50),
    precio DECIMAL(10, 2),
    stock INT DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    INDEX idx_producto (producto_id),
    INDEX idx_sku (sku)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vista para productos publicados (optimizada para e-commerce)
CREATE OR REPLACE VIEW productos_publicados AS
SELECT 
    p.id,
    p.codigo,
    p.nombre_producto,
    p.nombre_generico,
    p.nombre_ingles,
    p.descripcion,
    p.caracteristicas,
    p.precio,
    p.talla,
    p.sexo,
    p.modelo,
    p.ruta_imagen,
    p.slug,
    c.nombre AS categoria_nombre,
    c.slug AS categoria_slug,
    m.nombre AS marca_nombre,
    t.nombre AS tipo_nombre,
    p.stock,
    p.created_at,
    p.updated_at
FROM productos p
LEFT JOIN categorias c ON p.categoria_id = c.id
LEFT JOIN marcas m ON p.marca_id = m.id
LEFT JOIN tipos_producto t ON p.tipo_id = t.id
WHERE p.publicado = TRUE;


