import { getProductById } from '@shared/lib/db';

// GET /api/products/[id] - Obtener un producto por ID o slug
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID o slug requerido',
      });
    }

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado',
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('Error getting product from database:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al obtener el producto',
      message: error.message,
    });
  }
}
