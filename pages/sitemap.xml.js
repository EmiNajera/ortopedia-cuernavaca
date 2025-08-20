const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3005';

const staticPaths = [
  '/',
  '/nosotros',
  '/tienda',
  '/servicios',
  '/citas',
  '/blog',
  '/contacto',
  '/login',
  '/cuenta',
  '/carrito',
  '/categorias',
  '/categoria/plantillas',
  '/categoria/fajas',
  '/categoria/ortesis',
  '/categoria/calzado',
  '/categoria/rehabilitacion',
  '/categoria/pediatria',
];

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml');
  const urls = staticPaths
    .map((path) => `<url><loc>${BASE_URL}${path}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`) 
    .join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  res.write(body);
  res.end();
  return { props: {} };
}

export default function Sitemap() { return null; }


