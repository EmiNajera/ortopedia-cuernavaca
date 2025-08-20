import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BlogArticle from '../../src/pages/blog/BlogArticle';

export default function BlogArticlePage() {
  const router = useRouter();
  const { id } = router.query || {};
  const title = id ? `Artículo ${id} | OrtoTech` : 'Blog | OrtoTech';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Lee artículos del blog de OrtoTech sobre ortopedia y rehabilitación." />
      </Head>
      <BlogArticle />
    </>
  );
}


