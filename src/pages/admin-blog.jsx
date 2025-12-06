import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleManager from '@domains/blog/components/ArticleManager';
import ArticleCreator from '@domains/blog/components/ArticleCreator';
import { FileText, Settings, BarChart3, Users, Eye, Edit, Save, X } from 'lucide-react';

export default function BlogAdmin() {
  const [currentView, setCurrentView] = useState('manager'); // 'manager', 'creator', 'editor'
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar artículos al montar el componente
  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      // Cargar artículos desde la API
      const response = await fetch('/api/blog/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error('Error loading articles:', error);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateArticle = () => {
    setEditingArticle(null);
    setCurrentView('creator');
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setCurrentView('creator');
  };

  const handleSaveArticle = async (mdxContent, articleData) => {
    try {
      // En un entorno real, esto sería una llamada a la API
      // Saving article: { mdxContent, articleData }

      // Simular guardado exitoso
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actualizar la lista de artículos
      if (editingArticle) {
        // Actualizar artículo existente
        setArticles((prev) =>
          prev.map((article) =>
            article.slug === editingArticle.slug ? { ...article, ...articleData } : article,
          ),
        );
      } else {
        // Agregar nuevo artículo
        setArticles((prev) => [...prev, articleData]);
      }

      // Volver al manager
      setCurrentView('manager');
      setEditingArticle(null);

      // Mostrar notificación de éxito
      alert('Artículo guardado exitosamente');
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Error al guardar el artículo');
    }
  };

  const handleDeleteArticle = async (slug) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      try {
        // En un entorno real, esto sería una llamada a la API
        // Deleting article: slug

        // Simular eliminación
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Actualizar la lista de artículos
        setArticles((prev) => prev.filter((article) => article.slug !== slug));

        // Mostrar notificación de éxito
        alert('Artículo eliminado exitosamente');
      } catch (error) {
        console.error('Error deleting article:', error);
        alert('Error al eliminar el artículo');
      }
    }
  };

  const handleRefresh = () => {
    loadArticles();
  };

  const handleCancelEdit = () => {
    setCurrentView('manager');
    setEditingArticle(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'creator':
        return (
          <ArticleCreator
            onSave={handleSaveArticle}
            onPreview={() => {}}
            initialData={editingArticle}
          />
        );
      case 'manager':
      default:
        return (
          <ArticleManager
            articles={articles}
            onEdit={handleEditArticle}
            onDelete={handleDeleteArticle}
            onCreate={handleCreateArticle}
            onRefresh={handleRefresh}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando artículos...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Administración del Blog | OrtoTech</title>
        <meta
          name="description"
          content="Panel de administración para gestionar artículos del blog de OrtoTech"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header de Navegación */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">Blog Admin</h1>
                </div>

                {/* Navegación */}
                <nav className="hidden md:flex items-center space-x-1">
                  <button
                    onClick={() => setCurrentView('manager')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentView === 'manager'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Gestión
                  </button>
                  <button
                    onClick={() => setCurrentView('creator')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentView === 'creator'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Crear
                  </button>
                </nav>
              </div>

              <div className="flex items-center space-x-3">
                {/* Estadísticas rápidas */}
                <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    {articles.length} artículos
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {articles.filter((a) => a.featured).length} destacados
                  </div>
                </div>

                {/* Acciones */}
                {currentView === 'creator' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
