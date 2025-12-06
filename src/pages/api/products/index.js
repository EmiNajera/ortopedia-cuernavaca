import { getProducts } from '@shared/lib/db';
import { products as staticProducts } from '@data/products.config';

// Helper function to filter static products
function filterStaticProducts(products, filters) {
  let filtered = [...products];

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.brand?.toLowerCase().includes(searchLower),
    );
  }

  if (filters.minPrice) {
    filtered = filtered.filter((p) => p.price >= parseFloat(filters.minPrice));
  }

  if (filters.maxPrice) {
    filtered = filtered.filter((p) => p.price <= parseFloat(filters.maxPrice));
  }

  if (filters.inStock === 'true' || filters.inStock === true) {
    filtered = filtered.filter((p) => p.inStock === true);
  }

  if (filters.limit) {
    filtered = filtered.slice(0, parseInt(filters.limit));
  }

  return filtered;
}

// GET /api/products - Obtener todos los productos con filtros opcionales
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Obtener filtros de query params
    const filters = {
      category: req.query.category,
      search: req.query.search,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      inStock: req.query.inStock,
      limit: req.query.limit,
      published: true, // Solo productos publicados
    };

    const products = await getProducts(filters);

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('Error getting products from database:', error);

    // Check if it's a database connection error - fallback to static data
    const isDbConnectionError =
      error.code === 'ECONNREFUSED' ||
      error.code === 'ER_ACCESS_DENIED_ERROR' ||
      error.code === 'ER_BAD_DB_ERROR' ||
      error.message?.includes('getPool') ||
      error.message?.includes('connection');

    if (isDbConnectionError) {
      console.warn('Database unavailable, falling back to static products');

      // Fallback to static products
      const filters = {
        category: req.query.category,
        search: req.query.search,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        inStock: req.query.inStock,
        limit: req.query.limit,
      };

      const filteredProducts = filterStaticProducts(staticProducts, filters);

      return res.status(200).json({
        success: true,
        count: filteredProducts.length,
        products: filteredProducts,
        fallback: true, // Indicate this is fallback data
        message: 'Usando datos estáticos - base de datos no disponible',
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Error al obtener productos',
      message: error.message || 'Error desconocido',
    });
  }
}
