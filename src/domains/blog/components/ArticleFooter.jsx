import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ArticleFooter = ({ author, date, tags, slug }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = (platform) => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const title = document.title || '';
      const url = window.location.href || '';

      const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      };

      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Article Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  isLiked
                    ? 'bg-red-50 text-red-600 border-2 border-red-200'
                    : 'bg-slate-50 text-slate-600 border-2 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <motion.svg
                  animate={{ scale: isLiked ? 1.2 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5"
                  fill={isLiked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </motion.svg>
                {likeCount > 0 && <span>{likeCount}</span>}
                <span>{isLiked ? 'Te gusta' : 'Me gusta'}</span>
              </button>

              {/* Share Buttons */}
              <div className="flex items-center gap-3">
                <span className="text-slate-600 font-medium">Compartir:</span>
                <div className="flex gap-2">
                  {[
                    { name: 'Twitter', icon: '🐦', action: () => handleShare('twitter') },
                    { name: 'Facebook', icon: '📘', action: () => handleShare('facebook') },
                    { name: 'LinkedIn', icon: '💼', action: () => handleShare('linkedin') },
                    { name: 'WhatsApp', icon: '💬', action: () => handleShare('whatsapp') },
                  ].map((social) => (
                    <button
                      key={social.name}
                      onClick={social.action}
                      className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors duration-200"
                      title={`Compartir en ${social.name}`}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Sobre el autor</h3>
                <h4 className="text-lg font-semibold text-blue-600 mb-3">{author}</h4>
                <p className="text-slate-600 leading-relaxed">
                  Especialista en ortopedia y rehabilitación con más de 10 años de experiencia.
                  Comprometido con brindar soluciones personalizadas para mejorar la calidad de vida
                  de nuestros pacientes.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Tags */}
          {tags && tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-12"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Etiquetas relacionadas</h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-4">¿Necesitas Ayuda Especializada?</h3>
            <p className="text-blue-100 mb-8 text-lg">
              Nuestros especialistas están listos para ayudarte con tu caso específico. Agenda una
              consulta personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Contactar Especialista
              </Link>
              <Link
                href="/blog"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                Ver Más Artículos
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default ArticleFooter;
