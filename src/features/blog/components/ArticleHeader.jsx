import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NextImage from 'next/image';

const ArticleHeader = ({ 
  title, 
  excerpt, 
  author, 
  date, 
  readTime, 
  category, 
  image,
  tags 
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryConfig = (category) => {
    const configs = {
      'tecnologia': { 
        name: 'Tecnología', 
        color: 'from-purple-500 to-indigo-600',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-700',
        icon: '🔬'
      },
      'consejos': { 
        name: 'Consejos', 
        color: 'from-amber-500 to-orange-600',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700',
        icon: '💡'
      },
      'casos-exito': { 
        name: 'Casos de Éxito', 
        color: 'from-emerald-500 to-teal-600',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        icon: '🏆'
      },
      'rehabilitacion': { 
        name: 'Rehabilitación', 
        color: 'from-blue-500 to-cyan-600',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        icon: '💪'
      },
      'investigacion': { 
        name: 'Investigación', 
        color: 'from-indigo-500 to-purple-600',
        bgColor: 'bg-indigo-50',
        textColor: 'text-indigo-700',
        icon: '📊'
      },
      'novedades': { 
        name: 'Novedades', 
        color: 'from-pink-500 to-rose-600',
        bgColor: 'bg-pink-50',
        textColor: 'text-pink-700',
        icon: '🆕'
      }
    };
    return configs[category] || configs['consejos'];
  };

  const categoryConfig = getCategoryConfig(category);

  return (
    <header className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="pt-8 pb-4">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href="/blog" 
                className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors duration-300 group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver al Blog
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${categoryConfig.bgColor} ${categoryConfig.textColor} border border-current/20`}>
                <span className="mr-2">{categoryConfig.icon}</span>
                {categoryConfig.name}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight"
            >
              {title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed font-light"
            >
              {excerpt}
            </motion.p>

            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 text-slate-500 mb-8"
            >
              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                  {author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-slate-700">{author}</div>
                  <div className="text-sm text-slate-500">Autor</div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{formatDate(date)}</span>
              </div>

              {/* Read Time */}
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{readTime} de lectura</span>
              </div>
            </motion.div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap gap-2"
              >
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors duration-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="container mx-auto px-6 pb-16"
          >
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200">
                  {image && (
                    <NextImage
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover"
                      width={1600}
                      height={900}
                      unoptimized
                    />
                  )}
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default ArticleHeader;
