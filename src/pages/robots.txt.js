import { getSiteUrl } from '@shared/lib/utils/siteUrl';

const BASE_URL = getSiteUrl();

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain');
  res.write(`User-agent: *
Allow: /
Disallow: /auth/
Disallow: /login
Disallow: /cuenta
Disallow: /tienda
Disallow: /carrito
Disallow: /admin/
Disallow: /dev-sandbox

Sitemap: ${BASE_URL}/sitemap.xml
`);
  res.end();
  return { props: {} };
}

export default function Robots() {
  return null;
}
