import { getSiteUrl } from '@shared/lib/utils/siteUrl';

const BASE_URL = getSiteUrl();

const staticPaths = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/nosotros', priority: '0.9', changefreq: 'monthly' },
  // { path: '/tienda', priority: '0.9', changefreq: 'weekly' }, // Oculto - en desarrollo
  { path: '/servicios', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/contacto', priority: '0.8', changefreq: 'monthly' },
  { path: '/citas', priority: '0.8', changefreq: 'weekly' },
  { path: '/categorias', priority: '0.7', changefreq: 'weekly' },
  { path: '/categoria/plantillas', priority: '0.8', changefreq: 'weekly' },
  { path: '/categoria/fajas', priority: '0.8', changefreq: 'weekly' },
  { path: '/categoria/ortesis', priority: '0.8', changefreq: 'weekly' },
  { path: '/categoria/calzado', priority: '0.8', changefreq: 'weekly' },
  { path: '/categoria/rehabilitacion', priority: '0.8', changefreq: 'weekly' },
  { path: '/categoria/pediatria', priority: '0.8', changefreq: 'weekly' },
  { path: '/aviso-privacidad', priority: '0.5', changefreq: 'yearly' },
  { path: '/terminos-uso', priority: '0.5', changefreq: 'yearly' },
  { path: '/politica-cookies', priority: '0.5', changefreq: 'yearly' },
];

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml');

  // Obtener todos los artículos del blog
  let blogPosts = [];
  try {
    const { getAllPosts } = await import('@domains/blog/utils/blogUtils');
    blogPosts = getAllPosts();
  } catch (error) {
    console.error('Error loading blog posts for sitemap:', error);
  }

  // Generar URLs estáticas
  const staticUrls = staticPaths
    .map(
      ({ path, priority, changefreq }) =>
        `<url><loc>${BASE_URL}${path}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`,
    )
    .join('\n');

  // Generar URLs de artículos del blog
  const blogUrls = blogPosts
    .map((post) => {
      const lastmod = post.date
        ? new Date(post.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      return `<url><loc>${BASE_URL}/blog/${post.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`;
    })
    .join('\n');

  // Generar URLs de categorías del blog
  const categories = [
    'tecnologia',
    'rehabilitacion',
    'consejos',
    'casos-exito',
    'investigacion',
    'novedades',
  ];
  const categoryUrls = categories
    .map(
      (category) =>
        `<url><loc>${BASE_URL}/blog/categoria/${category}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
    )
    .join('\n');

  // Generar URLs de tags del blog (obtener tags únicos de los posts)
  let allTags = new Set();
  blogPosts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        const normalizedTag = tag.toLowerCase().replace(/\s+/g, '-');
        allTags.add(normalizedTag);
      });
    }
  });
  const tagUrls = Array.from(allTags)
    .slice(0, 50) // Limitar a 50 tags más populares para el sitemap
    .map(
      (tag) =>
        `<url><loc>${BASE_URL}/blog/tag/${tag}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`,
    )
    .join('\n');

  const allUrls = [staticUrls, blogUrls, categoryUrls, tagUrls].filter(Boolean).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls}
</urlset>`;

  res.write(body);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
