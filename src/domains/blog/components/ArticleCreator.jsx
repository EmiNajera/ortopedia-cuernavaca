import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Image,
  Tag,
  Calendar,
  User,
  Eye,
  Save,
  X,
  Upload,
  Link as LinkIcon,
  Bold,
  Italic,
  List,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Check,
  AlertCircle,
} from 'lucide-react';
import ImageUploader from './ImageUploader';
import MarkdownEditor from './MarkdownEditor';

export default function ArticleCreator({ onSave, onPreview, initialData = null }) {
  const [articleData, setArticleData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    category: '',
    featured: false,
    published: false,
    metaTitle: '',
    metaDescription: '',
    coverImage: '',
    readingTime: 0,
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState('');

  // Cargar datos iniciales si se está editando
  useEffect(() => {
    if (initialData) {
      setArticleData((prev) => ({
        ...prev,
        ...initialData,
        date: initialData.date
          ? initialData.date.split('T')[0]
          : new Date().toISOString().split('T')[0],
      }));
    }
  }, [initialData]);

  // Generar slug automáticamente desde el título
  useEffect(() => {
    if (articleData.title && !initialData) {
      const slug = articleData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setArticleData((prev) => ({ ...prev, slug }));
    }
  }, [articleData.title, initialData]);

  // Calcular tiempo de lectura
  useEffect(() => {
    if (articleData.content) {
      const wordsPerMinute = 200;
      const wordCount = articleData.content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);
      setArticleData((prev) => ({ ...prev, readingTime }));
    }
  }, [articleData.content]);

  const validateForm = () => {
    const newErrors = {};

    if (!articleData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!articleData.slug.trim()) {
      newErrors.slug = 'El slug es requerido';
    } else if (!/^[a-z0-9-]+$/.test(articleData.slug)) {
      newErrors.slug = 'El slug solo puede contener letras minúsculas, números y guiones';
    }

    if (!articleData.excerpt.trim()) {
      newErrors.excerpt = 'El extracto es requerido';
    }

    if (!articleData.content.trim()) {
      newErrors.content = 'El contenido es requerido';
    }

    if (!articleData.author.trim()) {
      newErrors.author = 'El autor es requerido';
    }

    if (!articleData.metaTitle.trim()) {
      newErrors.metaTitle = 'El título SEO es requerido';
    }

    if (!articleData.metaDescription.trim()) {
      newErrors.metaDescription = 'La descripción SEO es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      await onSave(articleData.content, articleData);
    } catch (error) {
      console.error('Error saving article:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !articleData.tags.includes(newTag.trim())) {
      setArticleData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setArticleData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const categories = [
    'Ortopedia',
    'Rehabilitación',
    'Fisioterapia',
    'Prótesis',
    'Órtesis',
    'Plantillas',
    'Salud',
    'Bienestar',
    'Tecnología',
    'Innovación',
  ];

  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Vista Previa</h2>
              <button
                onClick={() => setIsPreviewMode(false)}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                Cerrar Vista Previa
              </button>
            </div>

            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{articleData.title}</h1>
              <div className="flex items-center text-sm text-gray-600 mb-6">
                <User className="w-4 h-4 mr-1" />
                <span className="mr-4">{articleData.author}</span>
                <Calendar className="w-4 h-4 mr-1" />
                <span className="mr-4">
                  {new Date(articleData.date).toLocaleDateString('es-ES')}
                </span>
                <span>{articleData.readingTime} min de lectura</span>
              </div>

              {articleData.coverImage && (
                <NextImage
                  src={articleData.coverImage}
                  alt={articleData.title}
                  width={1200}
                  height={420}
                  unoptimized
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}

              <div className="text-lg text-gray-700 mb-6">{articleData.excerpt}</div>

              <div className="whitespace-pre-wrap">{articleData.content}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {initialData ? 'Editar Artículo' : 'Crear Nuevo Artículo'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {initialData
                    ? 'Modifica el contenido del artículo'
                    : 'Crea un nuevo artículo para el blog'}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPreviewMode(true)}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Vista Previa
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título del Artículo *
                  </label>
                  <input
                    type="text"
                    value={articleData.title}
                    onChange={(e) => setArticleData((prev) => ({ ...prev, title: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Escribe el título del artículo..."
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL del Artículo (Slug) *
                  </label>
                  <input
                    type="text"
                    value={articleData.slug}
                    onChange={(e) => setArticleData((prev) => ({ ...prev, slug: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.slug ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="url-del-articulo"
                  />
                  {errors.slug && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.slug}
                    </p>
                  )}
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Extracto *</label>
                  <textarea
                    value={articleData.excerpt}
                    onChange={(e) =>
                      setArticleData((prev) => ({ ...prev, excerpt: e.target.value }))
                    }
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.excerpt ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Breve descripción del artículo..."
                  />
                  {errors.excerpt && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.excerpt}
                    </p>
                  )}
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenido *
                  </label>
                  <MarkdownEditor
                    value={articleData.content}
                    onChange={(content) => setArticleData((prev) => ({ ...prev, content }))}
                    error={errors.content}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publish Settings */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración</h3>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={articleData.featured}
                        onChange={(e) =>
                          setArticleData((prev) => ({ ...prev, featured: e.target.checked }))
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                        Artículo destacado
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="published"
                        checked={articleData.published}
                        onChange={(e) =>
                          setArticleData((prev) => ({ ...prev, published: e.target.checked }))
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                        Publicar inmediatamente
                      </label>
                    </div>
                  </div>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Autor *</label>
                  <input
                    type="text"
                    value={articleData.author}
                    onChange={(e) =>
                      setArticleData((prev) => ({ ...prev, author: e.target.value }))
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.author ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nombre del autor"
                  />
                  {errors.author && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.author}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Publicación
                  </label>
                  <input
                    type="date"
                    value={articleData.date}
                    onChange={(e) => setArticleData((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select
                    value={articleData.category}
                    onChange={(e) =>
                      setArticleData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Etiquetas</label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Agregar etiqueta"
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Tag className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {articleData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagen de Portada
                  </label>
                  <ImageUploader
                    onImageUpload={(url) =>
                      setArticleData((prev) => ({ ...prev, coverImage: url }))
                    }
                    currentImage={articleData.coverImage}
                  />
                </div>

                {/* SEO */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título SEO *
                      </label>
                      <input
                        type="text"
                        value={articleData.metaTitle}
                        onChange={(e) =>
                          setArticleData((prev) => ({ ...prev, metaTitle: e.target.value }))
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.metaTitle ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Título para motores de búsqueda"
                      />
                      {errors.metaTitle && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.metaTitle}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción SEO *
                      </label>
                      <textarea
                        value={articleData.metaDescription}
                        onChange={(e) =>
                          setArticleData((prev) => ({ ...prev, metaDescription: e.target.value }))
                        }
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.metaDescription ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Descripción para motores de búsqueda"
                      />
                      {errors.metaDescription && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.metaDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
