import {
  formatDate,
  formatDateShort,
  generateSlug,
  validateSlug,
  truncateText,
  extractExcerpt,
  getReadingTime,
  getCategoryColor,
  getCategoryName,
  sortArticles,
  filterArticles,
  getArticleStats,
  validateArticle,
  exportArticles,
  importArticles,
} from '../src/utils/blogUtils';

describe('blogUtils', () => {
  describe('formatDate', () => {
    test('formats date correctly in Spanish', () => {
      const date = new Date('2025-01-27');
      const formatted = formatDate(date);

      expect(formatted).toContain('enero');
      expect(formatted).toContain('2025');
      expect(formatted).toContain('27');
    });

    test('handles date string input', () => {
      const formatted = formatDate('2025-01-27');

      expect(formatted).toContain('enero');
      expect(formatted).toContain('2025');
    });
  });

  describe('formatDateShort', () => {
    test('formats date in short format', () => {
      const date = new Date('2025-01-27');
      const formatted = formatDateShort(date);

      expect(formatted).toContain('2025');
      expect(formatted).toContain('27');
    });
  });

  describe('generateSlug', () => {
    test('generates slug from title', () => {
      const slug = generateSlug('Cómo Elegir Plantillas Correctas');
      expect(slug).toBe('como-elegir-plantillas-correctas');
    });

    test('removes special characters', () => {
      const slug = generateSlug('Artículo con @#$% caracteres especiales!');
      expect(slug).toBe('articulo-con-caracteres-especiales');
    });

    test('handles multiple spaces', () => {
      const slug = generateSlug('Título   con    espacios');
      expect(slug).toBe('titulo-con-espacios');
    });

    test('handles multiple hyphens', () => {
      const slug = generateSlug('Título---con---guiones');
      expect(slug).toBe('titulo-con-guiones');
    });

    test('trims whitespace', () => {
      const slug = generateSlug('  Título con espacios  ');
      expect(slug).toBe('titulo-con-espacios');
    });
  });

  describe('validateSlug', () => {
    test('validates correct slug', () => {
      expect(validateSlug('articulo-123')).toBe(true);
      expect(validateSlug('titulo-valido')).toBe(true);
      expect(validateSlug('123')).toBe(true);
    });

    test('rejects invalid slugs', () => {
      expect(validateSlug('Artículo con mayúsculas')).toBe(false);
      expect(validateSlug('articulo con espacios')).toBe(false);
      expect(validateSlug('articulo@especial')).toBe(false);
      expect(validateSlug('articulo_guion_bajo')).toBe(false);
    });
  });

  describe('truncateText', () => {
    test('truncates text longer than maxLength', () => {
      const text = 'Este es un texto muy largo que necesita ser truncado';
      const truncated = truncateText(text, 20);

      expect(truncated.length).toBeLessThanOrEqual(23); // 20 + '...'
      expect(truncated).toContain('...');
    });

    test('does not truncate text shorter than maxLength', () => {
      const text = 'Texto corto';
      const truncated = truncateText(text, 20);

      expect(truncated).toBe(text);
      expect(truncated).not.toContain('...');
    });

    test('uses default maxLength of 150', () => {
      const longText = 'a'.repeat(200);
      const truncated = truncateText(longText);

      expect(truncated.length).toBe(153); // 150 + '...'
    });
  });

  describe('extractExcerpt', () => {
    test('removes markdown headers', () => {
      const content = '# Título\n## Subtítulo\nContenido del artículo';
      const excerpt = extractExcerpt(content, 100);

      expect(excerpt).not.toContain('#');
      expect(excerpt).not.toContain('##');
    });

    test('removes markdown bold', () => {
      const content = 'Este es un **texto en negrita** normal';
      const excerpt = extractExcerpt(content, 100);

      expect(excerpt).not.toContain('**');
    });

    test('removes markdown links', () => {
      const content = 'Visita [nuestro sitio](https://example.com) para más info';
      const excerpt = extractExcerpt(content, 100);

      expect(excerpt).toContain('nuestro sitio');
      expect(excerpt).not.toContain('https://example.com');
    });

    test('removes newlines', () => {
      const content = 'Línea 1\n\nLínea 2\nLínea 3';
      const excerpt = extractExcerpt(content, 100);

      expect(excerpt).not.toContain('\n');
    });
  });

  describe('getReadingTime', () => {
    test('calculates reading time correctly', () => {
      const content = 'palabra '.repeat(200); // 200 words
      const readingTime = getReadingTime(content);

      expect(readingTime).toBe('1 min de lectura');
    });

    test('rounds up reading time', () => {
      const content = 'palabra '.repeat(201); // 201 words
      const readingTime = getReadingTime(content);

      expect(readingTime).toBe('2 min de lectura');
    });

    test('handles empty content', () => {
      const readingTime = getReadingTime('');
      expect(readingTime).toBe('1 min de lectura');
    });
  });

  describe('getCategoryColor', () => {
    test('returns correct color for known categories', () => {
      expect(getCategoryColor('plantillas')).toContain('blue');
      expect(getCategoryColor('fajas')).toContain('green');
      expect(getCategoryColor('soportes')).toContain('purple');
    });

    test('returns default color for unknown category', () => {
      const color = getCategoryColor('unknown');
      expect(color).toContain('gray');
    });
  });

  describe('getCategoryName', () => {
    test('returns correct name for known categories', () => {
      expect(getCategoryName('plantillas')).toBe('Plantillas');
      expect(getCategoryName('fajas')).toBe('Fajas');
      expect(getCategoryName('rehabilitacion')).toBe('Rehabilitación');
    });

    test('returns category as-is for unknown category', () => {
      expect(getCategoryName('unknown')).toBe('unknown');
    });
  });

  describe('sortArticles', () => {
    const articles = [
      { title: 'B', date: '2025-01-01', views: 100, rating: 4 },
      { title: 'A', date: '2025-01-03', views: 200, rating: 5 },
      { title: 'C', date: '2025-01-02', views: 50, rating: 3 },
    ];

    test('sorts by date descending', () => {
      const sorted = sortArticles(articles, 'date', 'desc');
      expect(sorted[0].date).toBe('2025-01-03');
      expect(sorted[2].date).toBe('2025-01-01');
    });

    test('sorts by date ascending', () => {
      const sorted = sortArticles(articles, 'date', 'asc');
      expect(sorted[0].date).toBe('2025-01-01');
      expect(sorted[2].date).toBe('2025-01-03');
    });

    test('sorts by title', () => {
      const sorted = sortArticles(articles, 'title', 'asc');
      expect(sorted[0].title).toBe('A');
      expect(sorted[2].title).toBe('C');
    });

    test('sorts by views', () => {
      const sorted = sortArticles(articles, 'views', 'desc');
      expect(sorted[0].views).toBe(200);
      expect(sorted[2].views).toBe(50);
    });

    test('sorts by rating', () => {
      const sorted = sortArticles(articles, 'rating', 'desc');
      expect(sorted[0].rating).toBe(5);
      expect(sorted[2].rating).toBe(3);
    });
  });

  describe('filterArticles', () => {
    const articles = [
      {
        title: 'Artículo 1',
        category: 'plantillas',
        status: 'published',
        date: '2025-01-01',
        content: 'contenido 1',
      },
      {
        title: 'Artículo 2',
        category: 'fajas',
        status: 'draft',
        date: '2025-01-02',
        content: 'contenido 2',
      },
      {
        title: 'Artículo 3',
        category: 'plantillas',
        status: 'published',
        date: '2025-01-03',
        content: 'contenido 3',
      },
    ];

    test('filters by status', () => {
      const filtered = filterArticles(articles, { status: 'published' });
      expect(filtered.length).toBe(2);
      expect(filtered.every((a) => a.status === 'published')).toBe(true);
    });

    test('filters by category', () => {
      const filtered = filterArticles(articles, { category: 'plantillas' });
      expect(filtered.length).toBe(2);
      expect(filtered.every((a) => a.category === 'plantillas')).toBe(true);
    });

    test('filters by search term', () => {
      const filtered = filterArticles(articles, { search: 'Artículo 1' });
      expect(filtered.length).toBe(1);
      expect(filtered[0].title).toBe('Artículo 1');
    });

    test('filters by date range', () => {
      const filtered = filterArticles(articles, { dateFrom: '2025-01-02' });
      expect(filtered.length).toBe(2);
    });

    test('combines multiple filters', () => {
      const filtered = filterArticles(articles, {
        status: 'published',
        category: 'plantillas',
      });
      expect(filtered.length).toBe(2);
    });
  });

  describe('getArticleStats', () => {
    const articles = [
      { status: 'published', views: 100, category: 'plantillas' },
      { status: 'published', views: 200, category: 'fajas' },
      { status: 'draft', views: 50, category: 'plantillas' },
      { status: 'archived', views: 0, category: 'soportes' },
    ];

    test('calculates correct stats', () => {
      const stats = getArticleStats(articles);

      expect(stats.total).toBe(4);
      expect(stats.published).toBe(2);
      expect(stats.drafts).toBe(1);
      expect(stats.archived).toBe(1);
      expect(stats.totalViews).toBe(350);
      expect(stats.avgViews).toBe(88);
      expect(stats.categories).toBe(3);
    });

    test('handles empty array', () => {
      const stats = getArticleStats([]);

      expect(stats.total).toBe(0);
      expect(stats.published).toBe(0);
      expect(stats.avgViews).toBe(0);
    });
  });

  describe('validateArticle', () => {
    test('validates correct article', () => {
      const article = {
        title: 'Título válido',
        slug: 'titulo-valido',
        content: 'Contenido del artículo',
        excerpt: 'Extracto del artículo',
        category: 'plantillas',
      };

      const result = validateArticle(article);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });

    test('detects missing title', () => {
      const article = {
        slug: 'titulo-valido',
        content: 'Contenido',
        excerpt: 'Extracto',
        category: 'plantillas',
      };

      const result = validateArticle(article);
      expect(result.isValid).toBe(false);
      expect(result.errors.title).toBeDefined();
    });

    test('detects invalid slug', () => {
      const article = {
        title: 'Título',
        slug: 'Slug Inválido',
        content: 'Contenido',
        excerpt: 'Extracto',
        category: 'plantillas',
      };

      const result = validateArticle(article);
      expect(result.isValid).toBe(false);
      expect(result.errors.slug).toBeDefined();
    });

    test('detects missing content', () => {
      const article = {
        title: 'Título',
        slug: 'titulo',
        excerpt: 'Extracto',
        category: 'plantillas',
      };

      const result = validateArticle(article);
      expect(result.isValid).toBe(false);
      expect(result.errors.content).toBeDefined();
    });

    test('detects missing category', () => {
      const article = {
        title: 'Título',
        slug: 'titulo',
        content: 'Contenido',
        excerpt: 'Extracto',
      };

      const result = validateArticle(article);
      expect(result.isValid).toBe(false);
      expect(result.errors.category).toBeDefined();
    });
  });

  describe('exportArticles', () => {
    const articles = [
      {
        title: 'Artículo 1',
        slug: 'articulo-1',
        status: 'published',
        category: 'plantillas',
        date: '2025-01-01',
        views: 100,
      },
    ];

    test('exports as JSON', () => {
      const exported = exportArticles(articles, 'json');
      const parsed = JSON.parse(exported);

      expect(parsed).toEqual(articles);
    });

    test('exports as CSV', () => {
      const exported = exportArticles(articles, 'csv');

      expect(exported).toContain('title,slug,status');
      expect(exported).toContain('Artículo 1');
    });
  });

  describe('importArticles', () => {
    test('imports JSON format', () => {
      const jsonData = JSON.stringify([{ title: 'Artículo', slug: 'articulo' }]);
      const imported = importArticles(jsonData, 'json');

      expect(imported).toEqual([{ title: 'Artículo', slug: 'articulo' }]);
    });

    test('handles invalid JSON gracefully', () => {
      const imported = importArticles('invalid json', 'json');

      expect(imported).toEqual([]);
    });
  });
});
