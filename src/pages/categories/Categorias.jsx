import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import CategoryTemplate from '../../components/ui/CategoryTemplate';
import { categoriesConfig } from '../../data/categories.config';

export default function Categorias() {
  const [query, setQuery] = useState('');
  const [segmento, setSegmento] = useState('Todos');

  const segmentos = useMemo(() => {
    const s = new Set(['Todos']);
    categoriesConfig.forEach(c => (c.segmentos || []).forEach(x => s.add(x)));
    return Array.from(s);
  }, []);

  const filtered = useMemo(() => {
    return categoriesConfig.filter(c => {
      const matchQuery = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.description.toLowerCase().includes(query.toLowerCase());
      const matchSeg = segmento === 'Todos' || (c.segmentos || []).includes(segmento);
      return matchQuery && matchSeg;
    });
  }, [query, segmento]);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-14">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">Explora por Categorías</h1>
          <p className="text-lg text-gray-600 max-w-3xl">Un catálogo organizado, claro y pensado para que encuentres rápido lo que necesitas.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar categoría..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              {segmentos.map(s => (
                <button
                  key={s}
                  onClick={() => setSegmento(s)}
                  className={`px-3 py-2 rounded-lg text-sm border transition-colors whitespace-nowrap ${segmento === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((category, index) => (
            <CategoryTemplate
              key={index}
              variant="card"
              categoryName={category.name}
              categorySlug={category.slug}
              description={category.description}
              imageUrl={category.image}
            />
          ))}
        </div>

        {/* CTA Final */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">¿No encontraste lo que buscabas?</h3>
          <p className="text-gray-600 mb-6">Explora la tienda completa o solicita una recomendación.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tienda" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">Ver tienda completa</Link>
            <Link href="/contacto" className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">Hablar con un asesor</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 