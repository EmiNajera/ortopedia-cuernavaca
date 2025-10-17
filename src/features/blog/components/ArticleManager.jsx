import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  User,
  Tag,
  FileText,
  MoreVertical,
  Download,
  Upload,
  RefreshCw,
  Clock
} from 'lucide-react';

const ArticleManager = ({ articles, onEdit, onDelete, onCreate, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const categories = [
    { id: 'todos', name: 'Todos', icon: '📰' },
    { id: 'tecnologia', name: 'Tecnología', icon: '🔬' },
    { id: 'consejos', name: 'Consejos', icon: '💡' },
    { id: 'casos-exito', name: 'Casos de Éxito', icon: '🏆' },
    { id: 'rehabilitacion', name: 'Rehabilitación', icon: '💪' },
    { id: 'investigacion', name: 'Investigación', icon: '📊' },
    { id: 'novedades', name: 'Novedades', icon: '🆕' }
  ];

  const filteredAndSortedArticles = React.useMemo(() => {
    let filtered = articles;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(article => 
        (article.title && article.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (article.tags && article.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'author':
          aValue = a.author.toLowerCase();
          bValue = b.author.toLowerCase();
          break;
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [articles, searchTerm, selectedCategory, sortBy, sortOrder]);

  const handleSelectArticle = (articleId) => {
    setSelectedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleSelectAll = () => {
    if (selectedArticles.length === filteredAndSortedArticles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(filteredAndSortedArticles.map(article => article.slug));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar ${selectedArticles.length} artículos?`)) {
      selectedArticles.forEach(slug => onDelete(slug));
      setSelectedArticles([]);
      setShowBulkActions(false);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Artículos</h1>
                <p className="text-gray-600">{articles.length} artículos en total</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onRefresh}
                className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar
              </button>
              <button
                onClick={onCreate}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Artículo
              </button>
            </div>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar artículos por título, contenido o tags..."
                />
              </div>
            </div>

            {/* Categoría */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ordenar */}
            <div>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date-desc">Fecha (Más reciente)</option>
                <option value="date-asc">Fecha (Más antiguo)</option>
                <option value="title-asc">Título (A-Z)</option>
                <option value="title-desc">Título (Z-A)</option>
                <option value="author-asc">Autor (A-Z)</option>
                <option value="author-desc">Autor (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Acciones en Lote */}
        <AnimatePresence>
          {selectedArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-800 font-medium">
                    {selectedArticles.length} artículo{selectedArticles.length !== 1 ? 's' : ''} seleccionado{selectedArticles.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleBulkDelete}
                    className="flex items-center px-3 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </button>
                  <button
                    onClick={() => setSelectedArticles([])}
                    className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lista de Artículos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header de la tabla */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedArticles.length === filteredAndSortedArticles.length && filteredAndSortedArticles.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                {filteredAndSortedArticles.length} artículo{filteredAndSortedArticles.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Lista de artículos */}
          <div className="divide-y divide-gray-200">
            {filteredAndSortedArticles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedArticles.includes(article.slug)}
                    onChange={() => handleSelectArticle(article.slug)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                  />

                  {/* Imagen */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <FileText className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        
                        {/* Metadatos */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(article.date)}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {article.author}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {article.readTime}
                          </div>
                        </div>

                        {/* Tags y Categoría */}
                        <div className="flex items-center space-x-2 mt-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(article.category)}`}>
                            {categories.find(c => c.id === article.category)?.icon} {categories.find(c => c.id === article.category)?.name}
                          </span>
                          {article.featured && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                              ⭐ Destacado
                            </span>
                          )}
                          {article.tags && article.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Ver artículo"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(article)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Editar artículo"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(article.slug)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Eliminar artículo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Estado vacío */}
          {filteredAndSortedArticles.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || selectedCategory !== 'todos' ? 'No se encontraron artículos' : 'No hay artículos'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== 'todos' 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'Comienza creando tu primer artículo'
                }
              </p>
              {!searchTerm && selectedCategory === 'todos' && (
                <button
                  onClick={onCreate}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Primer Artículo
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleManager;

