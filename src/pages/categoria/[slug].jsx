import { useMemo, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { categoriesConfig } from '@data/categories.config';
import StoreLayout from '@layouts/StoreLayout';
import { openWhatsApp } from '@shared/lib/utils/whatsapp';
import { getCategoryBySlug, getProducts } from '@shared/lib/db';

/**
 * Ruta dinámica que renderiza cualquier categoría usando el config centralizado
 * Accesible en: /categoria/fajas, /categoria/plantillas, etc.
 */
// ProductCard component - Estilo consistente con inicio/servicios/nosotros
const ProductCard = ({
  product,
  imgSrc,
  description,
  action = 'Consultar Disponibilidad',
  productId = '1',
}) => {
  const productBrand = product?.brand || 'Sin marca';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Imagen */}
      <Link href={`/producto/${productId}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={imgSrc || '/images/products/placeholder.svg'}
            alt={description}
            width={400}
            height={400}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Contenido */}
      <div className="p-5 space-y-3">
        <Link href={`/producto/${productId}`}>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors cursor-pointer">
            {description}
          </h3>
        </Link>

        {/* Marca */}
        {productBrand && productBrand !== 'Sin marca' && (
          <div className="flex items-center">
            <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
              {productBrand}
            </span>
          </div>
        )}

        <button
          onClick={() => {
            openWhatsApp(
              undefined,
              `Hola, me interesa obtener más información sobre: ${description}${productBrand && productBrand !== 'Sin marca' ? ` (Marca: ${productBrand})` : ''}`,
            );
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          {action}
        </button>
      </div>
    </motion.div>
  );
};

export default function CategoriaPage({ category, products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = products || [];

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'brand':
          const brandA = (a.brand || 'Sin marca').toLowerCase();
          const brandB = (b.brand || 'Sin marca').toLowerCase();
          return brandA.localeCompare(brandB);
        default:
          return 0;
      }
    });
  }, [products, searchTerm, sortBy]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoría no encontrada</h1>
          <Link href="/categorias" className="text-blue-600 hover:text-blue-800">
            Volver a categorías
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{category.meta_titulo || `${category.name} - Ortopedia Cuernavaca`}</title>
        <meta name="description" content={category.meta_descripcion || category.description} />
        <meta
          property="og:title"
          content={category.meta_titulo || `${category.name} - Ortopedia Cuernavaca`}
        />
        <meta
          property="og:description"
          content={category.meta_descripcion || category.description}
        />
        <meta property="og:image" content={category.image || '/images/products/placeholder.svg'} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://ortopediacuernavaca.com/categoria/${category.slug}`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <div className="relative z-10">
          {/* Elementos decorativos sutiles - Solo en el fondo del contenido */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-200 to-purple-300 rounded-full opacity-8 blur-3xl"></div>
          </div>
          {/* Hero Section - Sin fondo separado */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-16 sm:py-20 lg:py-24"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 text-center md:text-left"
                >
                  {/* Badge estilo inicio/servicios */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="inline-flex items-center px-6 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-6 shadow-sm"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Categoría
                  </motion.div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                    {category.name}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                    {category.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="hidden md:block"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                      <Image
                        src={category.image || '/images/products/placeholder.svg'}
                        alt={category.name}
                        fill
                        className="object-cover rounded-2xl"
                        sizes="(max-width: 1024px) 256px, 320px"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Filtros y búsqueda - Estilo consistente con servicios */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
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
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar productos en esta categoría..."
                    className="w-full pl-12 pr-4 py-3 sm:py-4 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base focus:placeholder-gray-300 transition-colors duration-200"
                  />
                </div>
              </div>
            </motion.div>

            {/* Selector de orden */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="flex justify-center">
                <div className="relative">
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <option value="name">Ordenar por: Nombre</option>
                    <option value="brand">Ordenar por: Marca</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Grid de productos - Estilo consistente */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id || index}
                    product={product}
                    imgSrc={product.image || product.images?.[0]}
                    description={product.name || product.title}
                    productId={product.id || product.slug}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-20"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {searchTerm ? 'No se encontraron productos' : 'No hay productos disponibles'}
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                  {searchTerm
                    ? 'Intenta con otros términos de búsqueda'
                    : 'Pronto agregaremos productos a esta categoría'}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Limpiar filtros
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Aplicar StoreLayout usando el patrón getLayout
CategoriaPage.getLayout = function getLayout(page) {
  return <StoreLayout>{page}</StoreLayout>;
};

/**
 * Obtener props del servidor por categoría
 * Usamos getServerSideProps para evitar conflictos con Next.js 15
 */
export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    // Buscar categoría en config estático (fuente de verdad para nombre y descripción)
    const configCategory = categoriesConfig.find((cat) => cat.slug === slug);

    if (!configCategory) {
      return {
        notFound: true,
      };
    }

    // Validar que existe en BD (opcional, solo para verificar)
    const dbCategory = await getCategoryBySlug(slug);

    // Usar config estático para todo el contenido, BD solo para validación
    const category = {
      id: dbCategory?.id || null,
      name: configCategory.name, // Del config estático
      slug: configCategory.slug,
      description: configCategory.description, // Del config estático
      image: configCategory.image || '/images/products/placeholder.svg',
      // Meta tags del config si están disponibles
      meta_titulo: configCategory.metaTitle || `${configCategory.name} - Ortopedia Cuernavaca`,
      meta_descripcion: configCategory.metaDescription || configCategory.description,
    };

    // Obtener productos reales de la base de datos
    const products = await getProducts({
      category: slug,
      published: true,
    });

    return {
      props: {
        category,
        products: products || [],
      },
    };
  } catch (error) {
    console.error('Error fetching category data:', error);

    // Fallback a config si hay error
    const configCategory = categoriesConfig.find((cat) => cat.slug === slug);
    if (!configCategory) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        category: configCategory,
        products: [],
      },
    };
  }
}
