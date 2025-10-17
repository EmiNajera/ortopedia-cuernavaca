import React, { useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { motion } from 'framer-motion';
import {
  Calendar,
  User,
  Clock,
  Heart,
  Share2,
  Bookmark,
  Eye,
  TrendingUp,
  Star,
} from 'lucide-react';

const ArticleCard = ({
  post,
  viewMode = 'grid',
  onFavorite,
  onShare,
  isFavorite = false,
  showActions = true,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const categories = [
    { id: 'tecnologia', name: 'Tecnología', icon: '🔬', color: 'purple' },
    { id: 'consejos', name: 'Consejos', icon: '💡', color: 'yellow' },
    { id: 'casos-exito', name: 'Casos de Éxito', icon: '🏆', color: 'orange' },
    { id: 'rehabilitacion', name: 'Rehabilitación', icon: '💪', color: 'green' },
    { id: 'investigacion', name: 'Investigación', icon: '📊', color: 'indigo' },
    { id: 'novedades', name: 'Novedades', icon: '🆕', color: 'pink' },
  ];

  const getCategoryColor = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    const colorMap = {
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
    };
    return colorMap[category?.color] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.(post.slug);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onShare?.(post);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="flex">
            {/* Imagen */}
            <div className="flex-shrink-0 w-48 h-32">
              {post.image ? (
                <NextImage
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  width={400}
                  height={256}
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-4xl text-blue-400">📄</span>
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Categoría y featured */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(post.category)}`}
                    >
                      {categories.find((c) => c.id === post.category)?.icon}{' '}
                      {categories.find((c) => c.id === post.category)?.name}
                    </span>
                    {post.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Destacado
                      </span>
                    )}
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>

                  {/* Metadatos */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Acciones */}
                {showActions && (
                  <div className="flex flex-col items-center space-y-2 ml-4">
                    <button
                      onClick={handleLike}
                      className={`p-2 rounded-full transition-colors ${
                        isLiked
                          ? 'text-red-500 bg-red-50'
                          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={handleFavorite}
                      className={`p-2 rounded-full transition-colors ${
                        isFavorite
                          ? 'text-yellow-500 bg-yellow-50'
                          : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Vista grid (por defecto)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Imagen */}
        <div className="relative h-48 overflow-hidden">
          {post.image ? (
            <NextImage
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
              width={800}
              height={480}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <span className="text-6xl text-blue-400">📄</span>
            </div>
          )}

          {/* Overlay con categoría */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${getCategoryColor(post.category)}`}
            >
              {categories.find((c) => c.id === post.category)?.icon}{' '}
              {categories.find((c) => c.id === post.category)?.name}
            </span>
          </div>

          {/* Featured badge */}
          {post.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center">
                <Star className="w-3 h-3 mr-1" />
                Destacado
              </span>
            </div>
          )}

          {/* Acciones en hover */}
          {showActions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-2"
            >
              <button
                onClick={handleLike}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`}
                />
              </button>
              <button
                onClick={handleFavorite}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-yellow-50 transition-colors"
              >
                <Bookmark
                  className={`w-4 h-4 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-600'}`}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors"
              >
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Metadatos */}
          <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </div>
          </div>

          {/* Título */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>

          {/* Descripción */}
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>

          {/* Autor */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {post.author
                  ? post.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                  : 'OT'}
              </div>
              <span className="text-sm font-medium text-gray-700">{post.author}</span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard;
