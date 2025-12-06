import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSiteUrl, getFullUrl } from '@shared/lib/utils/siteUrl';
import BlogTemplate from '@domains/blog/components/BlogTemplate';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export default function BlogArticlePage({ post, mdxSource }) {
  const router = useRouter();
  const baseUrl = getSiteUrl();
  const articleUrl = `${baseUrl}/blog/${post?.slug || router.query.id}`;
  const articleImage = post?.image
    ? `${baseUrl}${post.image}`
    : `${baseUrl}/images/banners/Ortopedia Cuernavaca Logo.png`;

  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  if (!post) {
    return <div>Artículo no encontrado</div>;
  }

  // JSON-LD Structured Data para artículo individual
  const dateModified = post.dateModified || post.updatedAt || post.date;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: articleImage,
    datePublished: post.date,
    dateModified: dateModified,
    author: {
      '@type': 'Organization',
      name: 'Ortopedia Cuernavaca',
      url: baseUrl,
    },
    publisher: {
      '@type': 'MedicalBusiness',
      name: 'Ortopedia Cuernavaca',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/banners/Ortopedia Cuernavaca Logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: post.category || 'Ortopedia',
    keywords: post.tags?.join(', ') || 'ortopedia, rehabilitación',
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
        item: `${baseUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{post.title} | Blog Ortopedia Cuernavaca</title>
        <meta name="description" content={post.excerpt} />
        <meta
          name="keywords"
          content={`${post.tags?.join(', ') || ''}, ortopedia, rehabilitación, ${post.category || ''}`}
        />
        <meta name="author" content="Ortopedia Cuernavaca" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="canonical" href={articleUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={articleImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Ortopedia Cuernavaca" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={dateModified} />
        <meta property="article:author" content="Ortopedia Cuernavaca" />
        <meta property="article:section" content={post.category || 'Ortopedia'} />
        {post.tags?.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={articleUrl} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={articleImage} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>
      <BlogTemplate {...post} content={<MDXRemote {...mdxSource} />} />
    </>
  );
}

export async function getStaticPaths() {
  // Importar solo en el servidor
  const { getAllPostSlugs } = await import('@domains/blog/utils/blogUtils');
  const slugs = getAllPostSlugs();
  const paths = slugs.map((slug) => ({
    params: { id: slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Importar solo en el servidor
  const { getPostBySlug } = await import('@domains/blog/utils/blogUtils');
  const post = getPostBySlug(params.id);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(post.content);

  // Convertir fecha a string para serialización JSON
  const serializedPost = {
    ...post,
    date: post.date instanceof Date ? post.date.toISOString() : post.date,
  };

  return {
    props: {
      post: serializedPost,
      mdxSource,
    },
  };
}
