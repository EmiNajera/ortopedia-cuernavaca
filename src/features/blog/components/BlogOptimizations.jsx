import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List,
  Bookmark,
  Share2,
  Heart,
  Clock,
  TrendingUp,
  Star
} from 'lucide-react';

const BlogOptimizations = ({ 
  posts, 
  onFilterChange, 
  onSortChange, 
  onViewChange,
  currentView = 'grid',
  showFilters = true 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);

  const categories = [
    { id: 'todos', name: 'Todos', icon: '📰', count: posts.length },
    { id: 'tecnologia', name: 'Tecnología', icon: '🔬', count: posts.filter(p => p.category === 'tecnologia').length },
    { id: 'consejos', name: 'Consejos', icon: '💡', count: posts.filter(p => p.category === 'consejos').length },
    { id: 'casos-exito', name: 'Casos de Éxito', icon: '🏆', count: posts.filter(p => p.category === 'casos-exito').length },
    { id: 'rehabilitacion', name: 'Rehabilitación', icon: '💪', count: posts.filter(p => p.category === 'rehabilitacion').length },
    { id: 'investigacion', name: 'Investigación', icon: '📊', count: posts.filter(p => p.category === 'investigacion').length },
    { id: 'novedades', name: 'Novedades', icon: '🆕', count: posts.filter(p => p.category === 'novedades').length }
  ];

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('blog-favorites');
    if (savedFavorites) {
      setFavoritePosts(JSON.parse(savedFavorites));
    }

    const savedRecent = localStorage.getItem('blog-recent');
    if (savedRecent) {
      setRecentlyViewed(JSON.parse(savedRecent));
    }
  }, []);

  // Calcular posts trending (basado en featured y fecha reciente)
  useEffect(() => {
    const trending = posts
      .filter(post => post.featured || new Date(post.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    setTrendingPosts(trending);
  }, [posts]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    onFilterChange({ search: term, category: selectedCategory });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange({ search: searchTerm, category });
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    onSortChange(newSortBy, newSortOrder);
  };

  const toggleFavorite = (postSlug) => {
    const newFavorites = favoritePosts.includes(postSlug)
      ? favoritePosts.filter(slug => slug !== postSlug)
      : [...favoritePosts, postSlug];
    
    setFavoritePosts(newFavorites);
    localStorage.setItem('blog-favorites', JSON.stringify(newFavorites));
  };

  const addToRecent = (post) => {
    const newRecent = [post, ...recentlyViewed.filter(p => p.slug !== post.slug)].slice(0, 5);
    setRecentlyViewed(newRecent);
    localStorage.setItem('blog-recent', JSON.stringify(newRecent));
  };

  const sharePost = async (post) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: `${window.location.origin}/blog/${post.slug}`
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`);
      alert('Enlace copiado al portapapeles');
    }
  };

  const getCategoryColor = (categoryId) => {
    const colorMap = {
      tecnologia: 'bg-purple-100 text-purple-800 border-purple-200',
      consejos: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'casos-exito': 'bg-orange-100 text-orange-800 border-orange-200',
      rehabilitacion: 'bg-green-100 text-green-800 border-green-200',
      investigacion: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      novedades: 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colorMap[categoryId] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Búsqueda */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Buscar artículos..."
              />
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center space-x-4">
            {/* Vista */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewChange('grid')}
                className={`p-2 rounded-md transition-colors ${
                  currentView === 'grid' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewChange('list')}
                className={`p-2 rounded-md transition-colors ${
                  currentView === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Ordenar */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                handleSortChange(newSortBy, newSortOrder);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date-desc">Más recientes</option>
              <option value="date-asc">Más antiguos</option>
              <option value="title-asc">A-Z</option>
              <option value="title-desc">Z-A</option>
              <option value="readTime-asc">Menos tiempo</option>
              <option value="readTime-desc">Más tiempo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filtros de categoría */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar con contenido adicional */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Contenido principal */}
        <div className="lg:col-span-3">
          {/* Aquí iría el contenido de los posts */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Posts trending */}
          {trendingPosts.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                Trending
              </h3>
              <div className="space-y-3">
                {trendingPosts.map((post, index) => (
                  <div key={post.slug} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(post.date).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Posts recientes */}
          {recentlyViewed.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Vistos Recientemente
              </h3>
              <div className="space-y-3">
                {recentlyViewed.map(post => (
                  <div key={post.slug} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-xs">📄</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {post.readTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Posts favoritos */}
          {favoritePosts.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-600" />
                Favoritos
              </h3>
              <div className="space-y-3">
                {posts
                  .filter(post => favoritePosts.includes(post.slug))
                  .slice(0, 5)
                  .map(post => (
                    <div key={post.slug} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span className="text-xs">📄</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {post.readTime}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogOptimizations;
