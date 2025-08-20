import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/layout/Layout';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'todos', name: 'Todos', icon: '📰' },
    { id: 'tecnologia', name: 'Tecnología', icon: '🔬' },
    { id: 'rehabilitacion', name: 'Rehabilitación', icon: '💪' },
    { id: 'consejos', name: 'Consejos', icon: '💡' },
    { id: 'casos-exito', name: 'Casos de Éxito', icon: '🏆' },
    { id: 'investigacion', name: 'Investigación', icon: '📊' },
    { id: 'novedades', name: 'Novedades', icon: '🆕' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Nuevas Tecnologías en Prótesis Mioeléctricas: Revolucionando la Rehabilitación',
      excerpt: 'Descubre cómo la tecnología mioeléctrica está transformando la vida de pacientes amputados, permitiendo movimientos más naturales y precisos.',
      category: 'tecnologia',
      author: 'Dr. Carmen Nájera',
      date: '2024-01-15',
      readTime: '8 min',
      image: 'https://placehold.co/800x400/1E40AF/FFFFFF?text=Prótesis+Mioeléctricas',
      featured: true,
      tags: ['Tecnología', 'Prótesis', 'Innovación']
    },
    {
      id: 2,
      title: 'Guía Completa: Cómo Elegir las Plantillas Ortopédicas Correctas',
      excerpt: 'Una guía paso a paso para entender qué tipo de plantillas necesitas según tu condición y estilo de vida.',
      category: 'consejos',
      author: 'Lic. María González',
      date: '2024-01-12',
      readTime: '6 min',
      image: 'https://placehold.co/800x400/059669/FFFFFF?text=Plantillas+Ortopédicas',
      featured: false,
      tags: ['Plantillas', 'Consejos', 'Salud']
    },
    {
      id: 3,
      title: 'Historia de Éxito: Juan Carlos Recupera su Movilidad',
      excerpt: 'Conoce la increíble historia de Juan Carlos, quien después de un accidente logró recuperar su independencia gracias a una prótesis personalizada.',
      category: 'casos-exito',
      author: 'Equipo Ortopedia Cuernavaca',
      date: '2024-01-10',
      readTime: '5 min',
      image: 'https://placehold.co/800x400/DC2626/FFFFFF?text=Historia+de+Éxito',
      featured: false,
      tags: ['Casos de Éxito', 'Prótesis', 'Rehabilitación']
    },
    {
      id: 4,
      title: 'Avances en Escaneo 3D para Plantillas Personalizadas',
      excerpt: 'Cómo la tecnología de escaneo 3D está mejorando la precisión y comodidad de las plantillas ortopédicas.',
      category: 'tecnologia',
      author: 'Ing. Roberto Martínez',
      date: '2024-01-08',
      readTime: '7 min',
      image: 'https://placehold.co/800x400/7C3AED/FFFFFF?text=Escaneo+3D',
      featured: false,
      tags: ['Tecnología', '3D', 'Plantillas']
    },
    {
      id: 5,
      title: 'Ejercicios de Rehabilitación para Pacientes con Pie Plano',
      excerpt: 'Una serie de ejercicios específicos diseñados para fortalecer los músculos y mejorar la biomecánica del pie.',
      category: 'rehabilitacion',
      author: 'Fis. Ana López',
      date: '2024-01-05',
      readTime: '10 min',
      image: 'https://placehold.co/800x400/F59E0B/FFFFFF?text=Rehabilitación+Pie+Plano',
      featured: false,
      tags: ['Rehabilitación', 'Pie Plano', 'Ejercicios']
    },
    {
      id: 6,
      title: 'Estudio: Impacto de las Órtesis en la Calidad de Vida',
      excerpt: 'Resultados de un estudio reciente sobre cómo las órtesis personalizadas mejoran significativamente la calidad de vida de los pacientes.',
      category: 'investigacion',
      author: 'Dr. Patricia Sánchez',
      date: '2024-01-03',
      readTime: '12 min',
      image: 'https://placehold.co/800x400/0891B2/FFFFFF?text=Estudio+Órtesis',
      featured: false,
      tags: ['Investigación', 'Órtesis', 'Calidad de Vida']
    },
    {
      id: 7,
      title: 'Nuevos Materiales en Ortopedia: Más Ligeros y Duraderos',
      excerpt: 'Descubre los materiales de última generación que están revolucionando la fabricación de dispositivos ortopédicos.',
      category: 'novedades',
      author: 'Ing. Carlos Ruiz',
      date: '2024-01-01',
      readTime: '9 min',
      image: 'https://placehold.co/800x400/16A34A/FFFFFF?text=Nuevos+Materiales',
      featured: false,
      tags: ['Materiales', 'Innovación', 'Tecnología']
    },
    {
      id: 8,
      title: 'Prevención de Lesiones Deportivas: Guía para Atletas',
      excerpt: 'Consejos expertos para prevenir lesiones deportivas y mantener un rendimiento óptimo en cualquier disciplina.',
      category: 'consejos',
      author: 'Dr. Luis Mendoza',
      date: '2023-12-28',
      readTime: '11 min',
      image: 'https://placehold.co/800x400/EA580C/FFFFFF?text=Prevención+Deportiva',
      featured: false,
      tags: ['Deportes', 'Prevención', 'Lesiones']
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'todos' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                Blog <span className="text-blue-200">Ortopedia Cuernavaca</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl mb-8 text-blue-100"
              >
                Conocimiento, innovación y experiencias que transforman vidas
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative max-w-md mx-auto"
              >
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Artículo Destacado</h2>
                  <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative h-64 lg:h-full">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Destacado
                        </span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                          {categories.find(c => c.id === featuredPost.category)?.name}
                        </span>
                        <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {featuredPost.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{featuredPost.author}</p>
                            <p className="text-sm text-gray-500">{new Date(featuredPost.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          </div>
                        </div>
                        <Link
                          to={`/blog/${featuredPost.id}`}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Leer Más
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {selectedCategory === 'todos' ? 'Todos los Artículos' : `Artículos de ${categories.find(c => c.id === selectedCategory)?.name}`}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Descubre artículos especializados en ortopedia, rehabilitación y tecnología médica
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchTerm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.filter(post => !post.featured).map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {categories.find(c => c.id === post.category)?.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-gray-500 text-sm">{post.readTime}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 text-sm">
                          {new Date(post.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm text-gray-600">{post.author}</span>
                        </div>
                        <Link
                          to={`/blog/${post.id}`}
                          className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                          Leer →
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No se encontraron artículos</h3>
                <p className="text-gray-600 mb-6">
                  Intenta con otros términos de búsqueda o cambia la categoría
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('todos');
                    setSearchTerm('');
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Ver Todos los Artículos
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Mantente Informado
                </h2>
                <p className="text-xl mb-8 text-blue-100">
                  Suscríbete para recibir los últimos artículos sobre ortopedia, rehabilitación y tecnología médica
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="flex-1 px-6 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  />
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Suscribirse
                  </button>
                </div>
                <p className="text-sm text-blue-200 mt-4">
                  Sin spam. Solo contenido valioso y actualizaciones importantes.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Temas Populares</h2>
              <p className="text-gray-600">Explora las categorías más leídas de nuestro blog</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(1).map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6 text-center hover:bg-blue-50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {blogPosts.filter(post => post.category === category.id).length} artículos
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 