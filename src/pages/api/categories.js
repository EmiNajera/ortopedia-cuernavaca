import { getCategories } from '@shared/lib/db';

// GET /api/categories - Obtener todas las categorías con conteo de productos
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const categories = await getCategories();

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error('Error getting categories from database:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al obtener categorías',
      message: error.message,
    });
  }
}
