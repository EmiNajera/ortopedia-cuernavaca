import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BlogTemplate from '../../src/components/blog/BlogTemplate';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export default function BlogArticlePage({ post, mdxSource }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  if (!post) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title} | OrtoTech Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Head>
      <BlogTemplate {...post} content={<MDXRemote {...mdxSource} />} />
    </>
  );
}

export async function getStaticPaths() {
  // Importar solo en el servidor
  const { getAllPostSlugs } = await import('../../src/utils/blogUtils');
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
  const { getPostBySlug } = await import('../../src/utils/blogUtils');
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
