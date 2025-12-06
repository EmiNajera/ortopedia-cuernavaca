import { getProducts } from '@shared/lib/db';

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
    return res.status(500).json({
      success: false,
      error: 'Error al obtener productos',
      message: error.message,
    });
  }
}
