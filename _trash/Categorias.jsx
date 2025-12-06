import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import CategoryTemplate from '@components/ui/CategoryTemplate';
import { categoriesConfig } from '@data/categories.config';
import { getCategories } from '../../lib/db';

// Componente que recibe categorías como props desde getServerSideProps
export default function Categorias({ categories = [] }) {
  const [query, setQuery] = useState('');

  // Combinar config estático con datos dinámicos de BD
  const allCategories = useMemo(() => {
    // Usar config estático como base
    const baseCategories = categoriesConfig || [];

    // Si hay datos de BD, combinar con el config
    if (categories && categories.length > 0) {
      return baseCategories
        .map((configCat) => {
          // Buscar datos dinámicos de BD para esta categoría
          const dbCat = categories.find((c) => c.slug === configCat.slug);

          return {
            id: dbCat?.id || null,
            name: configCat.name, // Del config estático
            slug: configCat.slug,
            description: configCat.description, // Del config estático
            image: configCat.image || '/images/products/placeholder.svg',
            total_productos: dbCat?.total_productos || 0, // De BD
          };
        })
        .filter((cat) => {
          // Solo mostrar categorías que tienen productos o están en BD
          return cat.total_productos > 0 || categories.some((c) => c.slug === cat.slug);
        });
    }

    // Si no hay datos de BD, usar solo config estático
    return baseCategories.map((cat) => ({
      id: null,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '/images/products/placeholder.svg',
      total_productos: 0,
    }));
  }, [categories]);

  const filtered = useMemo(() => {
    return allCategories.filter((c) => {
      const matchQuery =
        !query ||
        (c.name || '').toLowerCase().includes(query.toLowerCase()) ||
        (c.description || '').toLowerCase().includes(query.toLowerCase());
      return matchQuery;
    });
  }, [allCategories, query]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Categorías de Productos Ortopédicos | Ortopedia Cuernavaca</title>
        <meta
          name="description"
          content="Explora nuestras categorías de productos ortopédicos: rodilleras, tobilleras, fajas, plantillas, calzado ortopédico y más. Encuentra el producto que necesitas."
        />
        <meta
          property="og:title"
          content="Categorías de Productos Ortopédicos | Ortopedia Cuernavaca"
        />
        <meta
          property="og:description"
          content="Explora nuestras categorías de productos ortopédicos especializados."
        />
      </Head>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-14">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
            Explora por Categorías
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Un catálogo organizado, claro y pensado para que encuentres rápido lo que necesitas.
          </p>

          <div className="mt-8">
            <div className="relative max-w-2xl">
              <input
                type="text"
                placeholder="Buscar categoría..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {query && (
              <p className="mt-2 text-sm text-gray-600">
                {filtered.length} categoría{filtered.length !== 1 ? 's' : ''} encontrada
                {filtered.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((category) => (
              <CategoryTemplate
                key={category.id || category.slug}
                variant="card"
                categoryName={category.name}
                categorySlug={category.slug}
                description={category.description}
                imageUrl={category.image}
                productCount={category.total_productos}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600 mb-4">No se encontraron categorías con "{query}"</p>
            <button
              onClick={() => setQuery('')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        {/* CTA Final */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            ¿No encontraste lo que buscabas?
          </h3>
          <p className="text-gray-600 mb-6">
            Explora la tienda completa o solicita una recomendación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tienda"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver tienda completa
            </Link>
            <Link
              href="/contacto"
              className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Hablar con un asesor
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Obtener categorías desde la base de datos
export async function getServerSideProps() {
  try {
    const categories = await getCategories();
    return {
      props: {
        categories: categories || [],
      },
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback a config estático si hay error
    return {
      props: {
        categories: [],
      },
    };
  }
}
