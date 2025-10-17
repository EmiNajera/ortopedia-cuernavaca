import React from 'react';
import Head from 'next/head';
import MarketingLayout from '../../components/layout/MarketingLayout';
import ProfessionalBlogLayout from '../../features/blog/components/ProfessionalBlogLayout';

export default function BlogIndexPage({ posts = [] }) {
  const categories = [
    { id: 'tecnologia', name: 'Tecnología', icon: '🔬', color: 'purple' },
    { id: 'rehabilitacion', name: 'Rehabilitación', icon: '💪', color: 'green' },
    { id: 'consejos', name: 'Consejos', icon: '💡', color: 'yellow' },
    { id: 'casos-exito', name: 'Casos de Éxito', icon: '🏆', color: 'orange' },
    { id: 'investigacion', name: 'Investigación', icon: '📊', color: 'indigo' },
    { id: 'novedades', name: 'Novedades', icon: '🆕', color: 'pink' }
  ];

  return (
    <>
      <Head>
        <title>Blog de Ortopedia y Rehabilitación | Ortopedia Cuernavaca</title>
        <meta name="description" content="Artículos especializados sobre ortopedia, rehabilitación, plantillas personalizadas, ortesis y consejos de salud. Información actualizada por profesionales." />
        <meta name="keywords" content="blog ortopedia, artículos rehabilitación, consejos salud, plantillas ortopédicas, ortesis, fisioterapia" />
        <meta property="og:title" content="Blog de Ortopedia y Rehabilitación | Ortopedia Cuernavaca" />
        <meta property="og:description" content="Artículos especializados sobre ortopedia y rehabilitación por profesionales" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ortopedia-cuernavaca.com/blog" />
        <meta property="og:image" content="/images/banners/Ortopedia Cuernavaca Logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog de Ortopedia y Rehabilitación" />
        <meta name="twitter:description" content="Artículos especializados sobre ortopedia y rehabilitación por profesionales" />
        <meta name="twitter:image" content="/images/banners/Ortopedia Cuernavaca Logo.png" />
      </Head>
      
      <MarketingLayout>
        <ProfessionalBlogLayout posts={posts} categories={categories} />
      </MarketingLayout>
    </>
  );
}

export async function getStaticProps() {
  try {
    // Importar solo en el servidor
  const { getAllPosts } = await import('../../lib/utils/blogUtils');
    const posts = getAllPosts();
    
    // Convertir fechas a string para serialización JSON
    const serializedPosts = posts.map(post => ({
      ...post,
      date: post.date instanceof Date ? post.date.toISOString() : post.date
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
