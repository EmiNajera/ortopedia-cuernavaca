import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Moon,
  Sun,
  Calendar,
  Clock,
  User,
  Tag,
  Star,
  TrendingUp,
  BookOpen,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap,
  Heart,
  Bookmark,
  Share2,
  Eye,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';

const ProfessionalBlogLayout = ({ posts = [], categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [darkMode, setDarkMode] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Filter posts
  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.tags &&
            post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchTerm]);

  const featuredPost = posts.find((post) => post.featured);
  const recentPosts = posts.slice(0, 3);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      tecnologia: {
        bg: 'bg-gradient-to-r from-purple-500 to-indigo-600',
        text: 'text-white',
        badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      },
      rehabilitacion: {
        bg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
        text: 'text-white',
        badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      },
      consejos: {
        bg: 'bg-gradient-to-r from-amber-500 to-orange-600',
        text: 'text-white',
        badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      },
      'casos-exito': {
        bg: 'bg-gradient-to-r from-rose-500 to-pink-600',
        text: 'text-white',
        badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
      },
      investigacion: {
        bg: 'bg-gradient-to-r from-blue-500 to-cyan-600',
        text: 'text-white',
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      },
      novedades: {
        bg: 'bg-gradient-to-r from-violet-500 to-purple-600',
        text: 'text-white',
        badge: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
      },
    };
    return colors[category] || colors.tecnologia;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Blog Controls Section (below main header from MarketingLayout) */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Enhanced Search */}
            <motion.div
              className={`relative transition-all duration-300 flex-1 min-w-[200px] ${
                isSearchFocused ? 'scale-105' : 'scale-100'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-12 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm"
              />
              {searchTerm && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{filteredPosts.length}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-700 shadow-lg'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-700 shadow-lg'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative overflow-hidden py-20">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 mb-8"
              >
                <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Blog Profesional de Ortopedia
                </span>
              </motion.div>

              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="block text-gray-900 dark:text-white mb-2">Conocimiento que</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Transforma Vidas
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
                Descubre las últimas innovaciones, casos de éxito y guías expertas en ortopedia y
                rehabilitación. Contenido especializado por profesionales para profesionales.
              </p>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {[
                {
                  number: posts.length,
                  label: 'Artículos',
                  icon: BookOpen,
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  number: categories.length,
                  label: 'Categorías',
                  icon: Tag,
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  number: posts.filter((post) => post.featured).length,
                  label: 'Destacados',
                  icon: Star,
                  color: 'from-amber-500 to-orange-500',
                },
                {
                  number: '2.5k+',
                  label: 'Lectores',
                  icon: Eye,
                  color: 'from-emerald-500 to-teal-500',
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300`}
                  >
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Categories Filter */}
      <section className="py-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              Todos
            </motion.button>
            {categories.map((category) => {
              const colors = getCategoryColor(category.id);
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? `${colors.bg} ${colors.text} shadow-lg`
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-7xl mx-auto"
            >
              <div className="text-center mb-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full mb-6"
                >
                  <Star className="w-5 h-5 text-amber-600 mr-2" />
                  <span className="text-amber-800 dark:text-amber-300 font-semibold">
                    Artículo Destacado del Mes
                  </span>
                </motion.div>
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Historia del Mes
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
              </div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-full overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(featuredPost.category).badge}`}
                      >
                        {categories.find((c) => c.id === featuredPost.category)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-10 lg:p-16">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        1.2k vistas
                      </div>
                    </div>
                    <h4 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                      {featuredPost.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {featuredPost.author
                            ? featuredPost.author
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                            : 'OT'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {featuredPost.author}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(featuredPost.date)}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        Leer Artículo
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-between mb-16"
          >
            <div>
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedCategory === 'all'
                  ? 'Todos los Artículos'
                  : categories.find((c) => c.id === selectedCategory)?.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {filteredPosts.length} artículos encontrados
              </p>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={
                viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'
              }
            >
              {filteredPosts
                .filter((post) => !post.featured)
                .map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 transition-all duration-500"
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(post.category).badge}`}
                          >
                            {categories.find((c) => c.id === post.category)?.name}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg"
                            >
                              <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg"
                            >
                              <Bookmark className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(post.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            1.2k
                          </div>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                              {post.author
                                ? post.author
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                : 'OT'}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                {post.author}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Autor</p>
                            </div>
                          </div>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex space-x-1">
                              {post.tags.slice(0, 2).map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-8xl mb-8"
              >
                🔍
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                No se encontraron artículos
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Intenta con otros términos de búsqueda o explora nuestras categorías para descubrir
                contenido interesante
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                Ver Todos los Artículos
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-8"
            >
              <Zap className="w-5 h-5 text-white mr-2" />
              <span className="text-white font-semibold">Mantente Actualizado</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Únete a Nuestra Comunidad
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Recibe los últimos artículos sobre ortopedia, rehabilitación y tecnología médica
              directamente en tu correo
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
              >
                Suscribirse
              </motion.button>
            </div>
            <p className="text-sm text-blue-100 mt-6">
              Sin spam. Solo contenido valioso y actualizaciones importantes.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalBlogLayout;
