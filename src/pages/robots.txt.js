const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3005';

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain');
  res.write(`User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`);
  res.end();
  return { props: {} };
}

export default function Robots() {
  return null;
}
