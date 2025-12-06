// API endpoint para gestionar artículos del blog
import { getAllPosts, getPostBySlug } from '@domains/blog/utils/blogUtils';

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        // Obtener todos los artículos
        const articles = getAllPosts();
        // Serializar fechas para JSON
        const serializedArticles = articles.map((article) => ({
          ...article,
          date: article.date instanceof Date ? article.date.toISOString() : article.date,
        }));
        res.status(200).json(serializedArticles);
        break;

      case 'POST':
        // Crear nuevo artículo
        const {
          title,
          excerpt,
          category,
          author,
          date,
          readTime,
          image,
          featured,
          tags,
          slug,
          content,
        } = req.body;

        // Validaciones básicas
        if (!title || !excerpt || !slug || !content) {
          return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        // En un entorno real, aquí guardarías el archivo MDX
        // Por ahora, solo retornamos éxito
        res.status(201).json({
          message: 'Artículo creado exitosamente',
          article: { title, slug, date: new Date().toISOString() },
        });
        break;

      case 'PUT':
        // Actualizar artículo existente
        const { slug: updateSlug, ...updateData } = req.body;

        if (!updateSlug) {
          return res.status(400).json({ error: 'Slug es requerido para actualizar' });
        }

        // En un entorno real, aquí actualizarías el archivo MDX
        res.status(200).json({
          message: 'Artículo actualizado exitosamente',
          article: { slug: updateSlug, ...updateData },
        });
        break;

      case 'DELETE':
        // Eliminar artículo
        const { slug: deleteSlug } = req.query;

        if (!deleteSlug) {
          return res.status(400).json({ error: 'Slug es requerido para eliminar' });
        }

        // En un entorno real, aquí eliminarías el archivo MDX
        res.status(200).json({
          message: 'Artículo eliminado exitosamente',
          slug: deleteSlug,
        });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ error: `Método ${method} no permitido` });
    }
  } catch (error) {
    console.error('Error en API de artículos:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
}
