import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../layout/Layout';

// Componente para el encabezado del artículo
const ArticleHeader = ({ article }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-8"
  >
    {/* Breadcrumb */}
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
      <span>→</span>
      <Link to={`/blog?categoria=${article.category}`} className="hover:text-blue-600 transition-colors capitalize">
        {article.category}
      </Link>
      <span>→</span>
      <span className="text-gray-400">{article.title}</span>
    </nav>

    {/* Título y metadatos */}
    <div className="mb-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
      >
        {article.title}
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap items-center gap-4 text-gray-600"
      >
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {article.author.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="font-medium">{article.author}</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{new Date(article.date).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{article.readTime}</span>
        </div>
      </motion.div>
    </div>

    {/* Imagen destacada */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative rounded-2xl overflow-hidden mb-8"
    >
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-64 md:h-96 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </motion.div>

    {/* Tags */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex flex-wrap gap-2 mb-8"
    >
      {article.tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
        >
          {tag}
        </span>
      ))}
    </motion.div>
  </motion.div>
);

// Componente para el contenido del artículo
const ArticleContent = ({ content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.5 }}
    className="prose prose-lg max-w-none"
  >
    {content}
  </motion.div>
);

// Componente para el autor
const AuthorBio = ({ author }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.6 }}
    className="bg-gray-50 rounded-2xl p-6 mt-12"
  >
    <div className="flex items-start space-x-4">
      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
        {author.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{author.name}</h3>
        <p className="text-gray-600 mb-3">{author.bio}</p>
        <div className="flex space-x-3">
          {author.social?.twitter && (
            <a href={author.social.twitter} className="text-blue-600 hover:text-blue-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          )}
          {author.social?.linkedin && (
            <a href={author.social.linkedin} className="text-blue-600 hover:text-blue-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

// Componente para artículos relacionados
const RelatedArticles = ({ articles, currentId }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.7 }}
    className="mt-16"
  >
    <h2 className="text-3xl font-bold text-gray-900 mb-8">Artículos Relacionados</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.filter(article => article.id !== currentId).slice(0, 3).map((article) => (
        <motion.article
          key={article.id}
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {article.category}
              </span>
              <span className="text-sm text-gray-500">{article.readTime}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
            <Link
              to={`/blog/${article.id}`}
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Leer más →
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  </motion.div>
);

// Componente para navegación entre artículos
const ArticleNavigation = ({ previousArticle, nextArticle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.8 }}
    className="mt-16 pt-8 border-t border-gray-200"
  >
    <div className="flex justify-between items-center">
      {previousArticle ? (
        <Link
          to={`/blog/${previousArticle.id}`}
          className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <div>
            <div className="text-sm text-gray-500">Artículo anterior</div>
            <div className="font-semibold text-gray-900">{previousArticle.title}</div>
          </div>
        </Link>
      ) : <div></div>}
      
      {nextArticle ? (
        <Link
          to={`/blog/${nextArticle.id}`}
          className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-right"
        >
          <div>
            <div className="text-sm text-gray-500">Siguiente artículo</div>
            <div className="font-semibold text-gray-900">{nextArticle.title}</div>
          </div>
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : <div></div>}
    </div>
  </motion.div>
);

// Componente para compartir en redes sociales
const ShareButtons = ({ article }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.9 }}
    className="mt-8 pt-8 border-t border-gray-200"
  >
    <div className="flex items-center space-x-4">
      <span className="text-gray-700 font-medium">Compartir:</span>
      <div className="flex space-x-3">
        <button
          onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </button>
        <button
          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>
        <button
          onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
          className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </button>
      </div>
    </div>
  </motion.div>
);

// Plantilla principal del artículo
export default function BlogArticleTemplate({ 
  article, 
  content, 
  author, 
  relatedArticles = [], 
  previousArticle = null, 
  nextArticle = null 
}) {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Encabezado del artículo */}
            <ArticleHeader article={article} />
            
            {/* Contenido del artículo */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <ArticleContent content={content} />
              
              {/* Información del autor */}
              <AuthorBio author={author} />
              
              {/* Botones de compartir */}
              <ShareButtons article={article} />
            </div>
            
            {/* Navegación entre artículos */}
            <ArticleNavigation 
              previousArticle={previousArticle} 
              nextArticle={nextArticle} 
            />
            
            {/* Artículos relacionados */}
            {relatedArticles.length > 0 && (
              <RelatedArticles articles={relatedArticles} currentId={article.id} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 