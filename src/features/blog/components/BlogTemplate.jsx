import React from 'react';
import Head from 'next/head';
import MarketingLayout from '../../../components/layout/MarketingLayout';
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
  return (
    <>
      <Head>
        <title>{title} | OrtoTech Blog</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://ortotech.com'}/blog/${slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={image} />
        <meta name="article:author" content={author} />
        <meta name="article:published_time" content={date} />
        <meta name="article:section" content={category} />
        {tags && tags.map((tag, index) => <meta key={index} name="article:tag" content={tag} />)}
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://ortotech.com'}/blog/${slug}`}
        />
      </Head>

      <MarketingLayout>
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
      </MarketingLayout>
    </>
  );
};

export default BlogTemplate;
