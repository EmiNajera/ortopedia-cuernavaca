import { getSiteUrl } from '@shared/lib/utils/siteUrl';

const BASE_URL = getSiteUrl();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }

  try {
    const { getAllPosts } = await import('@domains/blog/utils/blogUtils');
    const posts = getAllPosts().slice(0, 20); // Últimos 20 artículos

    const rssItems = posts
      .map((post) => {
        const postUrl = `${BASE_URL}/blog/${post.slug}`;
        const postImage = post.image
          ? post.image.startsWith('http')
            ? post.image
            : `${BASE_URL}${post.image}`
          : `${BASE_URL}/images/banners/Ortopedia Cuernavaca Logo.png`;
        const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>ortopedia-cuernavaca@example.com (Ortopedia Cuernavaca)</author>
      <category><![CDATA[${post.category || 'Ortopedia'}]]></category>
      <enclosure url="${postImage}" type="image/jpeg" />
      ${post.tags?.map((tag) => `<category><![CDATA[${tag}]]></category>`).join('') || ''}
    </item>`;
      })
      .join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Blog de Ortopedia Cuernavaca</title>
    <link>${BASE_URL}/blog</link>
    <description>Artículos especializados sobre ortopedia, rehabilitación física, plantillas personalizadas, ortesis, prótesis y consejos de salud.</description>
    <language>es-MX</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/api/blog/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/images/banners/Ortopedia Cuernavaca Logo.png</url>
      <title>Blog de Ortopedia Cuernavaca</title>
      <link>${BASE_URL}/blog</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(rss);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).json({ error: 'Error al generar el feed RSS' });
  }
}
