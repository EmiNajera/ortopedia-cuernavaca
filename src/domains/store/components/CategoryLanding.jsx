'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { openWhatsApp } from '../../../utils/whatsapp';

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recomendados' },
  { value: 'priceAsc', label: 'Precio: menor a mayor' },
  { value: 'priceDesc', label: 'Precio: mayor a menor' },
  { value: 'name', label: 'Nombre A-Z' },
  { value: 'rating', label: 'Mejor valorados' },
];

const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 2,
});

const formatPrice = (value) => {
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return formatter.format(value);
  }

  return value ?? 'Consultar';
};

import { getSiteUrl } from '@shared/lib/utils/siteUrl';

const siteUrl = getSiteUrl();

const buildItemListJSON = (categorySlug, products) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: products.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${siteUrl}${product.href || `/producto/${product.id}`}`,
    name: product.name,
  })),
});

const buildBreadcrumbJSON = (breadcrumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: item.href ? `${siteUrl}${item.href}` : undefined,
  })),
});

const ProductCard = ({ product, onToggleWishlist, isFavorite }) => (
  <motion.article
    whileHover={{ translateY: -6 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    className="group relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-xl"
  >
    <div className="absolute left-4 top-4 z-10">
      <button
        type="button"
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        aria-pressed={isFavorite}
        onClick={(event) => {
          event.preventDefault();
          onToggleWishlist(product.id);
        }}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 ${
          isFavorite
            ? 'border-red-200 bg-red-50 text-red-500'
            : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-red-400'
        }`}
      >
        <span aria-hidden="true">{isFavorite ? '❤' : '♡'}</span>
      </button>
    </div>

    <Link href={product.href || `/producto/${product.id}`} className="flex flex-1 flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            priority={product.priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">Imagen</div>
        )}
        {product.badge ? (
          <span className="absolute right-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {product.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-wide text-green-600">{product.sku}</p>
          <h3 className="mt-1 text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="mt-2 text-sm text-gray-600">{product.shortDescription}</p>
        </div>

        <div className="mt-auto space-y-3">
          {/* Marca */}
          {product.brand && product.brand !== 'Sin marca' && (
            <div className="flex items-center">
              <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                {product.brand}
              </span>
            </div>
          )}

          {product.tags?.length ? (
            <ul className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              openWhatsApp(
                '17772150982',
                `Hola, estoy interesado/a en la ${product.name}. ¿Podrían brindarme más información?`,
              );
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            {product.ctaLabel ?? 'Solicitar asesoría'}
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  </motion.article>
);

const CategoryLanding = ({ category, products, seo = {}, relatedCategories = [], faqs = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFavorites, setShowFavorites] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const breadcrumbs = useMemo(
    () =>
      seo.breadcrumbs ?? [
        { label: 'Inicio', href: '/' },
        { label: 'Categorías', href: '/categorias' },
        { label: category.name },
      ],
    [category.name, seo.breadcrumbs],
  );

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const matches = products.filter((product) => {
      const matchSearch =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.shortDescription?.toLowerCase().includes(term) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(term));

      const matchFavorites = !showFavorites || wishlist.includes(product.id);

      return matchSearch && matchFavorites;
    });

    const sorted = [...matches];

    switch (sortBy) {
      case 'priceAsc':
        sorted.sort(
          (a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER),
        );
        break;
      case 'priceDesc':
        sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }

    return sorted;
  }, [products, searchTerm, showFavorites, wishlist, sortBy]);

  const structuredData = useMemo(() => {
    const json = [];

    json.push(buildBreadcrumbJSON(breadcrumbs));
    json.push(buildItemListJSON(category.slug, filteredProducts));

    if (category.structuredData) {
      json.push(category.structuredData);
    }

    return json;
  }, [breadcrumbs, category.slug, category.structuredData, filteredProducts]);

  const metaTitle = seo.title ?? `${category.name} | Ortopedia Cuernavaca`;
  const metaDescription =
    seo.description ??
    `${category.lead || category.description}. Descubre las mejores opciones de ${category.name.toLowerCase()} en Ortopedia Cuernavaca.`;
  const canonicalUrl = seo.canonical ?? `${siteUrl}/categoria/${category.slug}`;
  const ogImage = seo.image ?? category.heroImage;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        {ogImage ? <meta property="og:image" content={`${siteUrl}${ogImage}`} /> : null}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index,follow" />
        <script
          key="category-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className="bg-gray-50 pb-16">
        <nav aria-label="Breadcrumb" className="border-b border-gray-200 bg-white/80 backdrop-blur">
          <ol className="container mx-auto flex items-center gap-2 px-4 py-3 text-sm text-gray-500">
            {breadcrumbs.map((item, index) => (
              <li key={item.label} className="flex items-center gap-2">
                {item.href ? (
                  <Link href={item.href} className="hover:text-green-600">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-700">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? <span aria-hidden="true">/</span> : null}
              </li>
            ))}
          </ol>
        </nav>

        <header className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-500 to-green-600 text-white">
          <div className="absolute inset-0 opacity-20">
            {category.heroImage ? (
              <Image
                src={category.heroImage}
                alt=""
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            ) : null}
          </div>
          <div className="container relative mx-auto flex flex-col gap-8 px-4 py-16 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
                <span aria-hidden="true">{category.icon ?? '🩹'}</span>
                {category.pillText ?? 'Soporte especializado'}
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">{category.name}</h1>
              <p className="mt-4 text-lg text-white/90 md:text-xl">
                {category.lead || category.description}
              </p>
              {category.heroHighlights?.length ? (
                <ul className="mt-6 grid gap-3 text-sm text-white/80 md:grid-cols-2">
                  {category.heroHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-1 text-base">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/80">
                {category.stats?.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3"
                  >
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full max-w-md">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
                <h2 className="text-lg font-semibold text-white">Tu especialista en fajas</h2>
                <p className="mt-2 text-sm text-white/80">
                  Agenda una asesoría personalizada para seleccionar la faja que mejor se adapte a
                  tus necesidades clínicas.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(
                      '17772150982',
                      'Hola, me gustaría recibir asesoría sobre las fajas ortopédicas.',
                    )
                  }
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-green-600 transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Agendar una cita
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </button>
                <p className="mt-4 text-xs text-white/70">
                  Tiempo de respuesta promedio: &lt; 10 minutos. Atención humana de ortesistas
                  certificados.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section aria-labelledby="category-benefits" className="container mx-auto mt-12 px-4">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 id="category-benefits" className="text-2xl font-semibold text-gray-900">
                  Beneficios clínicos destacados
                </h2>
                <p className="mt-2 text-gray-600">
                  Diseñamos cada combinación de fajas para brindar soporte, estabilización y confort
                  durante procesos de rehabilitación, post-operatorios y uso diario.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="rounded-2xl bg-green-50 px-6 py-4 text-center">
                  <p className="text-2xl font-bold text-green-600">+95%</p>
                  <p className="text-xs text-gray-600">Clientes con alivio en la primera semana</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-6 py-4 text-center">
                  <p className="text-2xl font-bold text-emerald-600">24h</p>
                  <p className="text-xs text-gray-600">Tiempo promedio de entrega en Cuernavaca</p>
                </div>
              </div>
            </div>
            {category.benefits?.length ? (
              <dl className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {category.benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5 transition hover:border-green-200 hover:bg-white"
                  >
                    <dt className="flex items-center gap-2 text-base font-semibold text-gray-900">
                      <span aria-hidden="true">{benefit.icon}</span>
                      {benefit.title}
                    </dt>
                    <dd className="mt-2 text-sm text-gray-600">{benefit.description}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </section>

        <section aria-labelledby="category-controls" className="container mx-auto mt-12 px-4">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="w-full md:max-w-md">
                <label htmlFor="search" className="text-sm font-medium text-gray-700">
                  Buscar productos
                </label>
                <div className="mt-1 flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  <input
                    id="search"
                    type="search"
                    placeholder="Faja lumbar, postparto, soporte..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full border-0 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                <label className="text-sm font-medium text-gray-700" htmlFor="sort">
                  Ordenar por
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="w-full rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 md:w-56"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setShowFavorites((prev) => !prev)}
                  className={`flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${
                    showFavorites
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span aria-hidden="true">❤️</span>
                  Favoritos {wishlist.length ? `(${wishlist.length})` : ''}
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Mostrando {filteredProducts.length} de {products.length} productos disponibles
              {searchTerm ? ` para “${searchTerm}”` : ''}.
            </p>
          </div>
        </section>

        <section aria-labelledby="category-products" className="container mx-auto mt-10 px-4">
          <h2 id="category-products" className="sr-only">
            Productos disponibles en {category.name}
          </h2>
          {filteredProducts.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onToggleWishlist={(productId) =>
                    setWishlist((prev) =>
                      prev.includes(productId)
                        ? prev.filter((id) => id !== productId)
                        : [...prev, productId],
                    )
                  }
                  isFavorite={wishlist.includes(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-gray-200 bg-white px-8 py-16 text-center">
              <div className="text-5xl">🔍</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Sin coincidencias</h3>
              <p className="mt-2 text-sm text-gray-600">
                Ajusta los filtros o limpia la búsqueda para explorar todo el catálogo de fajas.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSortBy('recommended');
                  setShowFavorites(false);
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </section>

        {relatedCategories.length ? (
          <section aria-labelledby="related-categories" className="container mx-auto mt-16 px-4">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 id="related-categories" className="text-2xl font-semibold text-gray-900">
                    Explora otras categorías complementarias
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Combina tus fajas con accesorios y ortesis que potencian la rehabilitación.
                  </p>
                </div>
                <Link
                  href="/tienda"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700"
                >
                  Ver tienda completa
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {relatedCategories.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/categoria/${item.slug}`}
                    className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-green-200 hover:bg-white"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl">
                      <span aria-hidden="true">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-green-600">
                      {item.ctaLabel ?? 'Ver categoría'}
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {faqs.length ? (
          <section aria-labelledby="category-faq" className="container mx-auto mt-16 px-4">
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <h2 id="category-faq" className="text-2xl font-semibold text-gray-900">
                Preguntas frecuentes
              </h2>
              <div className="mt-6 space-y-4">
                {faqs.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-gray-100 p-4"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-gray-900">
                      {item.question}
                      <span className="ml-4 text-gray-400 transition group-open:rotate-45">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M12 5v14" />
                          <path d="M5 12h14" />
                        </svg>
                      </span>
                    </summary>
                    <div className="mt-2 text-sm text-gray-600">{item.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
};

export default CategoryLanding;
