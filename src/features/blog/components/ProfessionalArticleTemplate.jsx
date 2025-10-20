import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Bookmark,
  Heart,
  ArrowLeft,
  ArrowRight,
  Moon,
  Sun,
  Eye,
  MessageCircle,
  TrendingUp,
  Sparkles,
  Zap,
  ChevronUp,
  Copy,
  Check,
  Twitter,
  Facebook,
  Linkedin,
} from 'lucide-react';
import Link from 'next/link';

const ProfessionalArticleTemplate = ({
  title,
  excerpt,
  content,
  author,
  date,
  readTime,
  image,
  tags,
  category,
  slug,
  relatedPosts = [],
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const articleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Reading progress and scroll effects
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

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

  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = `${title} - ${excerpt}`;

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          '_blank',
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank',
        );
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
    setShowShareMenu(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Enhanced Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
          style={{ width: smoothProgress }}
          initial={{ width: 0 }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Floating Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
              <Link
                href="/blog"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="font-medium">Volver al Blog</span>
              </Link>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with Parallax */}
      <section ref={articleRef} className="relative overflow-hidden pt-24 pb-16">
        <motion.div
          style={{ y, opacity, scale }}
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
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Category and Meta */}
            <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-8">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(category).badge}`}
              >
                {category}
              </span>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(date)}
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {readTime}
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <Eye className="w-4 h-4 mr-1" />
                1.2k vistas
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
            >
              {title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed"
            >
              {excerpt}
            </motion.p>

            {/* Author and Actions */}
            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {author
                    ? author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                    : 'OT'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg">{author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Escrito el {formatDate(date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    isLiked
                      ? 'text-red-500 bg-red-50 dark:bg-red-900/20 shadow-lg'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    isBookmarked
                      ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 shadow-lg'
                      : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                  }`}
                >
                  <Bookmark className={`w-6 h-6 ${isBookmarked ? 'fill-current' : ''}`} />
                </motion.button>
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-4 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all duration-300"
                  >
                    <Share2 className="w-6 h-6" />
                  </motion.button>

                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 z-50"
                    >
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleShare('twitter')}
                          className="p-3 text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
                        >
                          <Twitter className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleShare('facebook')}
                          className="p-3 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
                        >
                          <Facebook className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleShare('linkedin')}
                          className="p-3 text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleShare('copy')}
                          className="p-3 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors"
                        >
                          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image with Parallax */}
      {image && (
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <img src={image} alt={title} className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white"
            >
              {content}
            </motion.div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Tag className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Etiquetas:
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700"
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-center mb-16">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6"
                  >
                    <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-blue-800 dark:text-blue-300 font-semibold">
                      Artículos Relacionados
                    </span>
                  </motion.div>
                  <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Continúa Explorando
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Descubre más contenido que te puede interesar
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((post, index) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-500"
                    >
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div className="relative h-48">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(post.category).badge}`}
                            >
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(post.date)}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {post.readTime}
                            </div>
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-8"
              >
                <Zap className="w-5 h-5 text-white mr-2" />
                <span className="text-white font-semibold">¿Te gustó este artículo?</span>
              </motion.div>

              <h3 className="text-4xl font-bold text-white mb-6">Únete a Nuestra Comunidad</h3>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                Suscríbete para recibir más contenido como este directamente en tu correo
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
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfessionalArticleTemplate;
