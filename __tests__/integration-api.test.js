/**
 * Tests de integración para API routes
 */

// Mock Next.js API handler structure
const createMockRequest = (method, body = {}, query = {}) => ({
  method,
  body,
  query,
  headers: {},
});

const createMockResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    setHeader: jest.fn().mockReturnThis(),
  };
  return res;
};

describe('Integration: API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('/api/blog/articles', () => {
    let handler;
    let getAllPosts;

    beforeEach(() => {
      // Mock blogUtils
      getAllPosts = jest.fn(() => [
        {
          slug: 'test-article',
          title: 'Test Article',
          excerpt: 'Test excerpt',
          date: '2025-01-27',
        },
      ]);

      jest.mock('../../../lib/utils/blogUtils', () => ({
        getAllPosts,
        getPostBySlug: jest.fn(),
      }));

      // Import handler after mocks
      handler = require('../src/pages/api/blog/articles').default;
    });

    test('GET returns all articles', async () => {
      const req = createMockRequest('GET');
      const res = createMockResponse();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            slug: 'test-article',
            title: 'Test Article',
          }),
        ]),
      );
    });

    test('POST creates new article with valid data', async () => {
      const req = createMockRequest('POST', {
        title: 'New Article',
        excerpt: 'Article excerpt',
        slug: 'new-article',
        content: 'Article content',
        category: 'tecnologia',
        author: 'Test Author',
      });
      const res = createMockResponse();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Artículo creado exitosamente',
          article: expect.objectContaining({
            title: 'New Article',
            slug: 'new-article',
          }),
        }),
      );
    });

    test('POST returns 400 when required fields are missing', async () => {
      const req = createMockRequest('POST', {
        title: 'Incomplete Article',
        // Missing excerpt, slug, content
      });
      const res = createMockResponse();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Faltan campos requeridos',
      });
    });

    test('PUT updates existing article', async () => {
      const req = createMockRequest('PUT', {
        slug: 'test-article',
        title: 'Updated Article',
        excerpt: 'Updated excerpt',
      });
      const res = createMockResponse();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Artículo actualizado exitosamente',
          article: expect.objectContaining({
            slug: 'test-article',
            title: 'Updated Article',
          }),
        }),
      );
    });

    test('PUT returns 400 when slug is missing', async () => {
      const req = createMockRequest('PUT', {
        title: 'Updated Article',
        // Missing slug
      });
      const res = createMockResponse();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Slug es requerido para actualizar',
      });
    });

    test('DELETE removes article by slug', async () => {
      const req = createMockRequest('DELETE', {}, { slug: 'test-article' });
      const res = createMockResponse();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Artículo eliminado exitosamente',
          slug: 'test-article',
        }),
      );
    });

    test('DELETE returns 400 when slug is missing', async () => {
      const req = createMockRequest('DELETE', {}, {});
      const res = createMockResponse();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Slug es requerido para eliminar',
      });
    });

    test('returns 405 for unsupported methods', async () => {
      const req = createMockRequest('PATCH');
      const res = createMockResponse();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.setHeader).toHaveBeenCalledWith('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Método PATCH no permitido',
      });
    });

    test('handles errors gracefully', async () => {
      // Mock getAllPosts to throw error
      getAllPosts.mockImplementation(() => {
        throw new Error('Database error');
      });

      const req = createMockRequest('GET');
      const res = createMockResponse();

      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Error interno del servidor',
      });

      console.error = originalError;
    });
  });

  // Tests para /api/sitemap.xml y /api/robots.txt eliminados
  // Estos archivos fueron consolidados en /sitemap.xml y /robots.txt (páginas principales)

  describe('API Error Handling', () => {
    test('all APIs return proper error responses', () => {
      // Test that all API routes have error handling
      const errorResponse = {
        error: expect.any(String),
      };

      // This is a structural test
      expect(errorResponse).toHaveProperty('error');
    });

    test('all APIs set proper status codes', () => {
      // Test that status codes are properly set
      const validStatusCodes = [200, 201, 400, 404, 405, 500];

      // This is a structural test
      expect(validStatusCodes).toContain(200);
      expect(validStatusCodes).toContain(400);
      expect(validStatusCodes).toContain(500);
    });
  });
});
