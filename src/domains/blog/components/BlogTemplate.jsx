import React from 'react';
import Head from 'next/head';
import { getSiteUrl, getFullUrl } from '@shared/lib/utils/siteUrl';
import MarketingLayout from '@layouts/MarketingLayout';
import ProfessionalArticleTemplate from './ProfessionalArticleTemplate';

const BlogTemplate = ({
  title,
  excerpt,
  content,
  author,
  date,
  readTime,
  image,
  tags,
  category,
  slug,
  relatedPosts = [],
}) => {
  const baseUrl = getSiteUrl();
  const articleUrl = `${baseUrl}/blog/${slug}`;
  const articleImage = image
    ? image.startsWith('http')
      ? image
      : `${baseUrl}${image}`
    : `${baseUrl}/images/banners/Ortopedia Cuernavaca Logo.png`;

  return (
    <>
      <Head>
        <title>{title} | Blog Ortopedia Cuernavaca</title>
        <meta name="description" content={excerpt} />
        <meta
          name="keywords"
          content={`${tags?.join(', ') || ''}, ortopedia, rehabilitación, ${category || ''}`}
        />
        <meta name="author" content={author || 'Ortopedia Cuernavaca'} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="canonical" href={articleUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={articleImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Ortopedia Cuernavaca" />
        <meta property="article:published_time" content={date} />
        <meta property="article:author" content={author || 'Ortopedia Cuernavaca'} />
        <meta property="article:section" content={category || 'Ortopedia'} />
        {tags &&
          tags.map((tag, index) => <meta key={index} property="article:tag" content={tag} />)}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={articleUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={articleImage} />
      </Head>

      <ProfessionalArticleTemplate
        title={title}
        excerpt={excerpt}
        content={content}
        author={author}
        date={date}
        readTime={readTime}
        image={image}
        tags={tags}
        category={category}
        slug={slug}
        relatedPosts={relatedPosts}
      />
    </>
  );
};

export default BlogTemplate;
