import React from 'react';
import Head from 'next/head';
import { getSiteUrl, getFullUrl } from '@shared/lib/utils/siteUrl';
import MarketingLayout from '@layouts/MarketingLayout';
import ProfessionalBlogLayout from '@domains/blog/components/ProfessionalBlogLayout';

export default function BlogIndexPage({ posts = [] }) {
  const categories = [
    { id: 'tecnologia', name: 'Tecnología', icon: '🔬', color: 'purple' },
    { id: 'rehabilitacion', name: 'Rehabilitación', icon: '💪', color: 'green' },
    { id: 'consejos', name: 'Consejos', icon: '💡', color: 'yellow' },
    { id: 'casos-exito', name: 'Casos de Éxito', icon: '🏆', color: 'orange' },
    { id: 'investigacion', name: 'Investigación', icon: '📊', color: 'indigo' },
    { id: 'novedades', name: 'Novedades', icon: '🆕', color: 'pink' },
  ];

  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/blog`;
  const pageTitle = 'Blog de Ortopedia y Rehabilitación | Ortopedia Cuernavaca';
  const pageDescription =
    'Artículos especializados sobre ortopedia, rehabilitación física, plantillas personalizadas, ortesis, prótesis y consejos de salud. Información actualizada por profesionales de Ortopedia Cuernavaca con más de 30 años de experiencia.';
  const ogImage = `${baseUrl}/images/banners/Ortopedia Cuernavaca Logo.png`;

  // JSON-LD Structured Data para Blog
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog de Ortopedia Cuernavaca',
    description: pageDescription,
    url: pageUrl,
    publisher: {
      '@type': 'MedicalBusiness',
      name: 'Ortopedia Cuernavaca',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: ogImage,
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.image ? `${baseUrl}${post.image}` : ogImage,
      datePublished: post.date,
      author: {
        '@type': 'Organization',
        name: 'Ortopedia Cuernavaca',
      },
      url: `${baseUrl}/blog/${post.slug}`,
    })),
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="blog ortopedia, artículos rehabilitación, consejos salud, plantillas ortopédicas, ortesis, fisioterapia, prótesis, rehabilitación física, ortopedia cuernavaca, consejos médicos, salud ortopédica"
        />
        <meta name="author" content="Ortopedia Cuernavaca" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="canonical" href={pageUrl} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Blog de Ortopedia Cuernavaca"
          href={`${baseUrl}/api/blog/feed.xml`}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Ortopedia Cuernavaca" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <ProfessionalBlogLayout posts={posts} categories={categories} />
    </>
  );
}

// El layout se aplica automáticamente desde _app.jsx
// No definimos getLayout para evitar doble layout

export async function getStaticProps() {
  try {
    // Importar solo en el servidor
    const { getAllPosts } = await import('@domains/blog/utils/blogUtils');
    const posts = getAllPosts();

    // Convertir fechas a string para serialización JSON
    const serializedPosts = posts.map((post) => ({
      ...post,
      date: post.date instanceof Date ? post.date.toISOString() : post.date,
    }));

    return {
      props: {
        posts: serializedPosts,
      },
      revalidate: 3600, // Revalidar cada hora
    };
  } catch (error) {
    console.error('Error loading posts:', error);
    return {
      props: {
        posts: [],
      },
      revalidate: 60, // Revalidar en 1 minuto si hay error
    };
  }
}
