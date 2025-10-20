const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3005';

export default function handler(req, res) {
  res.status(200);
  res.setHeader('Content-Type', 'text/plain');
  res.end(`User-agent: *
Allow: /

Sitemap: ${BASE_URL}/api/sitemap.xml
`);
}
