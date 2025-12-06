import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Bookmark,
  Share2,
  MessageCircle,
  ThumbsUp,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Whatsapp,
} from 'lucide-react';

const ArticleActions = ({
  post,
  className = '',
  showLabels = false,
  position = 'bottom', // 'bottom', 'sidebar', 'floating'
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Cargar estado desde localStorage
    const savedLikes = JSON.parse(localStorage.getItem('blog-likes') || '{}');
    const savedBookmarks = JSON.parse(localStorage.getItem('blog-bookmarks') || '[]');

    setIsLiked(!!savedLikes[post.slug]);
    setIsBookmarked(savedBookmarks.includes(post.slug));
    setLikeCount(savedLikes[post.slug] || 0);
  }, [post.slug]);

  const handleLike = () => {
    const savedLikes = JSON.parse(localStorage.getItem('blog-likes') || '{}');
    const newLiked = !isLiked;
    const newCount = newLiked ? likeCount + 1 : Math.max(0, likeCount - 1);

    setIsLiked(newLiked);
    setLikeCount(newCount);

    savedLikes[post.slug] = newCount;
    localStorage.setItem('blog-likes', JSON.stringify(savedLikes));
  };

  const handleBookmark = () => {
    const savedBookmarks = JSON.parse(localStorage.getItem('blog-bookmarks') || '[]');
    const newBookmarked = !isBookmarked;

    setIsBookmarked(newBookmarked);

    if (newBookmarked) {
      savedBookmarks.push(post.slug);
    } else {
      const index = savedBookmarks.indexOf(post.slug);
      if (index > -1) {
        savedBookmarks.splice(index, 1);
      }
    }

    localStorage.setItem('blog-bookmarks', JSON.stringify(savedBookmarks));
  };

  const handleShare = async (platform) => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    const text = `${post.title} - ${post.excerpt}`;

    switch (platform) {
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (error) {
          console.error('Error copying to clipboard:', error);
        }
        break;

      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
        );
        break;

      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          '_blank',
        );
        break;

      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank',
        );
        break;

      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank');
        break;

      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({
              title: post.title,
              text: post.excerpt,
              url: url,
            });
          } catch (error) {
            // Error sharing: error
          }
        }
        break;
    }

    setShowShareMenu(false);
  };

  const shareButtons = [
    {
      platform: 'copy',
      icon: copied ? Check : Copy,
      label: 'Copiar enlace',
      color: 'text-gray-600',
    },
    { platform: 'facebook', icon: Facebook, label: 'Facebook', color: 'text-blue-600' },
    { platform: 'twitter', icon: Twitter, label: 'Twitter', color: 'text-blue-400' },
    { platform: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'text-blue-700' },
    { platform: 'whatsapp', icon: Whatsapp, label: 'WhatsApp', color: 'text-green-600' },
  ];

  const actionButtons = [
    {
      icon: Heart,
      label: 'Me gusta',
      active: isLiked,
      count: likeCount,
      onClick: handleLike,
      activeColor: 'text-red-500',
      inactiveColor: 'text-gray-600',
    },
    {
      icon: Bookmark,
      label: 'Guardar',
      active: isBookmarked,
      onClick: handleBookmark,
      activeColor: 'text-yellow-500',
      inactiveColor: 'text-gray-600',
    },
    {
      icon: Share2,
      label: 'Compartir',
      onClick: () => setShowShareMenu(!showShareMenu),
      color: 'text-gray-600',
    },
  ];

  const getPositionClasses = () => {
    switch (position) {
      case 'sidebar':
        return 'flex flex-col space-y-4';
      case 'floating':
        return 'fixed right-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg border border-gray-200 p-2 flex flex-col space-y-2 z-40';
      case 'bottom':
      default:
        return 'flex items-center justify-center space-x-6 py-6 border-t border-gray-200';
    }
  };

  return (
    <div className={`${getPositionClasses()} ${className}`}>
      {actionButtons.map((button, index) => (
        <div key={index} className="relative">
          <motion.button
            onClick={button.onClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              button.active
                ? `${button.activeColor} bg-opacity-10`
                : `${button.inactiveColor || button.color} hover:bg-gray-100`
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button.icon className={`w-5 h-5 ${button.active ? 'fill-current' : ''}`} />
            {showLabels && <span className="text-sm font-medium">{button.label}</span>}
            {button.count !== undefined && button.count > 0 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {button.count}
              </span>
            )}
          </motion.button>

          {/* Menú de compartir */}
          {button.label === 'Compartir' && showShareMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className={`absolute ${
                position === 'sidebar'
                  ? 'left-full ml-2 top-0'
                  : 'bottom-full mb-2 left-1/2 transform -translate-x-1/2'
              } bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50`}
            >
              <div className="flex flex-col space-y-1">
                {shareButtons.map((shareButton, shareIndex) => (
                  <button
                    key={shareIndex}
                    onClick={() => handleShare(shareButton.platform)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors ${shareButton.color}`}
                  >
                    <shareButton.icon className="w-4 h-4" />
                    <span className="text-sm">{shareButton.label}</span>
                  </button>
                ))}

                {navigator.share && (
                  <button
                    onClick={() => handleShare('native')}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Más opciones</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      ))}

      {/* Overlay para cerrar menú */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30"
            onClick={() => setShowShareMenu(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArticleActions;
