/**
 * Conexión a Base de Datos MySQL
 * Para usar en API routes de Next.js
 */

import mysql from 'mysql2/promise';

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ortopedia_cuernavaca',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  // Asegurar que la conexión use UTF-8 correctamente
  supportBigNumbers: true,
  bigNumberStrings: true,
};

// Pool de conexiones
let pool = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

/**
 * Obtener todos los productos con filtros
 */
export async function getProducts(filters = {}) {
  const connection = await getPool().getConnection();

  try {
    let query = `
      SELECT 
        p.id,
        p.codigo,
        p.nombre_producto as title,
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
        p.stock,
        p.publicado,
        c.nombre as category,
        c.slug as category_slug,
        m.nombre as brand,
        t.nombre as tipo
      FROM productos p
      LEFT JOIN categorias_normalizadas c ON p.categoria_id = c.id
      LEFT JOIN marcas m ON p.marca_id = m.id
      LEFT JOIN tipos_producto t ON p.tipo_id = t.id
      WHERE 1=1
    `;

    const params = [];

    // Filtro por categoría
    if (filters.category && filters.category !== 'all') {
      query += ` AND c.slug = ?`;
      params.push(filters.category);
    }

    // Filtro por búsqueda
    if (filters.search) {
      query += ` AND (
        MATCH(p.nombre_producto, p.descripcion) AGAINST(? IN NATURAL LANGUAGE MODE)
        OR p.nombre_producto LIKE ?
        OR p.descripcion LIKE ?
      )`;
      const searchTerm = `%${filters.search}%`;
      params.push(filters.search, searchTerm, searchTerm);
    }

    // Filtro por precio mínimo
    if (filters.minPrice) {
      query += ` AND p.precio >= ?`;
      params.push(parseFloat(filters.minPrice));
    }

    // Filtro por precio máximo
    if (filters.maxPrice) {
      query += ` AND p.precio <= ?`;
      params.push(parseFloat(filters.maxPrice));
    }

    // Filtro por stock
    if (filters.inStock === 'true') {
      query += ` AND p.stock > 0`;
    }

    // Solo productos publicados
    if (filters.published !== false) {
      query += ` AND p.publicado = TRUE`;
    }

    // Ordenamiento
    query += ` ORDER BY p.created_at DESC`;

    // Límite
    if (filters.limit) {
      query += ` LIMIT ?`;
      params.push(parseInt(filters.limit));
    }

    const [rows] = await connection.execute(query, params);

    // Formatear resultados para compatibilidad con estructura actual
    return rows.map((product) => {
      const imageUrl = product.ruta_imagen || '/images/products/placeholder.svg';
      return {
        id: product.id.toString(),
        title: product.title,
        name: product.title, // Compatibilidad con componentes que usan 'name'
        brand: product.brand || 'Sin marca',
        price: product.precio || 0,
        category: product.category_slug || product.category,
        slug: product.slug || `producto-${product.id}`,
        images: product.ruta_imagen ? [product.ruta_imagen] : [imageUrl],
        image: imageUrl, // Compatibilidad con componentes que usan 'image'
        description: product.descripcion || '',
        shortDescription: product.descripcion ? product.descripcion.substring(0, 150) + '...' : '',
        features: product.caracteristicas ? product.caracteristicas.split(';') : [],
        inStock: (product.stock || 0) > 0,
        stock: product.stock || 0,
        talla: product.talla,
        sexo: product.sexo,
        modelo: product.modelo,
        codigo: product.codigo,
      };
    });
  } finally {
    connection.release();
  }
}

/**
 * Obtener producto por ID o slug
 */
export async function getProductById(idOrSlug) {
  const connection = await getPool().getConnection();

  try {
    const isNumeric = !isNaN(idOrSlug);

    let query = `
      SELECT 
        p.id,
        p.codigo,
        p.nombre_producto as title,
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
        p.stock,
        p.publicado,
        c.nombre as category,
        c.slug as category_slug,
        m.nombre as brand,
        t.nombre as tipo
      FROM productos p
      LEFT JOIN categorias_normalizadas c ON p.categoria_id = c.id
      LEFT JOIN marcas m ON p.marca_id = m.id
      LEFT JOIN tipos_producto t ON p.tipo_id = t.id
      WHERE ${isNumeric ? 'p.id = ?' : 'p.slug = ?'}
    `;

    const [rows] = await connection.execute(query, [idOrSlug]);

    if (rows.length === 0) {
      return null;
    }

    const product = rows[0];

    // Formatear para compatibilidad
    const imageUrl = product.ruta_imagen || '/images/products/placeholder.svg';
    return {
      id: product.id.toString(),
      title: product.title,
      name: product.title, // Compatibilidad con componentes que usan 'name'
      brand: product.brand || 'Sin marca',
      price: product.precio || 0,
      category: product.category_slug || product.category,
      slug: product.slug || `producto-${product.id}`,
      images: product.ruta_imagen ? [product.ruta_imagen] : [imageUrl],
      image: imageUrl, // Compatibilidad con componentes que usan 'image'
      description: product.descripcion || '',
      shortDescription: product.descripcion ? product.descripcion.substring(0, 150) + '...' : '',
      features: product.caracteristicas ? product.caracteristicas.split(';') : [],
      inStock: (product.stock || 0) > 0,
      stock: product.stock || 0,
      talla: product.talla,
      sexo: product.sexo,
      modelo: product.modelo,
      codigo: product.codigo,
    };
  } finally {
    connection.release();
  }
}

/**
 * Obtener categorías normalizadas (solo datos dinámicos: id, slug, conteo)
 * El nombre y descripción vienen del config estático
 */
export async function getCategories() {
  const connection = await getPool().getConnection();

  try {
    const [rows] = await connection.execute(`
      SELECT 
        c.id,
        c.slug,
        c.orden,
        COUNT(p.id) as total_productos
      FROM categorias_normalizadas c
      LEFT JOIN productos p ON c.id = p.categoria_id AND p.publicado = TRUE
      WHERE c.activa = TRUE
      GROUP BY c.id, c.slug, c.orden
      HAVING total_productos > 0
      ORDER BY c.orden ASC
    `);

    return rows;
  } finally {
    connection.release();
  }
}

/**
 * Obtener categoría normalizada por slug (solo datos dinámicos: id, slug)
 * El nombre y descripción vienen del config estático
 */
export async function getCategoryBySlug(slug) {
  const connection = await getPool().getConnection();

  try {
    const [rows] = await connection.execute(
      `
      SELECT 
        c.id,
        c.slug,
        c.orden
      FROM categorias_normalizadas c
      WHERE c.slug = ? AND c.activa = TRUE
      LIMIT 1
    `,
      [slug],
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } finally {
    connection.release();
  }
}
