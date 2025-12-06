import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSiteUrl, getFullUrl } from '@shared/lib/utils/siteUrl';
import MarketingLayout from '@layouts/MarketingLayout';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

export default function BlogCategoryPage({ posts, category, categoryName }) {
  const router = useRouter();
  const baseUrl = getSiteUrl();
  const categoryUrl = `${baseUrl}/blog/categoria/${category}`;
  const pageTitle = `${categoryName} | Blog Ortopedia Cuernavaca`;
  const pageDescription = `Artículos sobre ${categoryName.toLowerCase()} en nuestro blog de ortopedia y rehabilitación. Información especializada y actualizada.`;

  // JSON-LD Structured Data para página de categoría
  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: pageDescription,
    url: categoryUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          url: `${baseUrl}/blog/${post.slug}`,
          datePublished: post.date,
        },
      })),
    },
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
        name: categoryName,
        item: categoryUrl,
      },
    ],
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`${categoryName.toLowerCase()}, ortopedia, rehabilitación, blog, artículos, ${category}`}
        />
        <meta name="author" content="Ortopedia Cuernavaca" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="canonical" href={categoryUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={categoryUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:image"
          content={`${baseUrl}/images/banners/Ortopedia Cuernavaca Logo.png`}
        />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Ortopedia Cuernavaca" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={categoryUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <main id="contenido-principal" className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800">
          <div className="container mx-auto px-6">
            {/* Breadcrumbs */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                    Inicio
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                  >
                    Blog
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 dark:text-white font-medium">{categoryName}</li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {categoryName}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {posts.length} {posts.length === 1 ? 'artículo' : 'artículos'} en esta categoría
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al blog
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Artículos */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(post.date)}
                          </div>
                          {post.readTime && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {post.readTime}
                            </div>
                          )}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                          Leer más
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                  No hay artículos en esta categoría aún.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al blog
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

BlogCategoryPage.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export async function getStaticPaths() {
  const categories = [
    'tecnologia',
    'rehabilitacion',
    'consejos',
    'casos-exito',
    'investigacion',
    'novedades',
  ];

  const paths = categories.map((category) => ({
    params: { categoria: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { getPostsByCategory } = await import('@domains/blog/utils/blogUtils');
  const posts = getPostsByCategory(params.categoria);

  const categoryNames = {
    tecnologia: 'Tecnología',
    rehabilitacion: 'Rehabilitación',
    consejos: 'Consejos',
    'casos-exito': 'Casos de Éxito',
    investigacion: 'Investigación',
    novedades: 'Novedades',
  };

  const serializedPosts = posts.map((post) => ({
    ...post,
    date: post.date instanceof Date ? post.date.toISOString() : post.date,
  }));

  return {
    props: {
      posts: serializedPosts,
      category: params.categoria,
      categoryName: categoryNames[params.categoria] || params.categoria,
    },
    revalidate: 3600, // Revalidar cada hora
  };
}
