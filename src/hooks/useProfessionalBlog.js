import { useState, useEffect, useCallback } from 'react';
import { useNotifications } from '../components/blog/ProfessionalNotifications';

export const useProfessionalBlog = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [readingHistory, setReadingHistory] = useState([]);
  const { showLikeNotification, showBookmarkNotification, showShareNotification } = useNotifications();

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load user preferences from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const savedHistory = JSON.parse(localStorage.getItem('readingHistory') || '[]');

    setDarkMode(savedDarkMode);
    setFavorites(savedFavorites);
    setBookmarks(savedBookmarks);
    setReadingHistory(savedHistory);
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('readingHistory', JSON.stringify(readingHistory));
  }, [readingHistory]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const toggleFavorite = useCallback((postSlug) => {
    setFavorites(prev => {
      const isFavorite = prev.includes(postSlug);
      const newFavorites = isFavorite 
        ? prev.filter(slug => slug !== postSlug)
        : [...prev, postSlug];
      
      showLikeNotification(!isFavorite);
      return newFavorites;
    });
  }, [showLikeNotification]);

  const toggleBookmark = useCallback((postSlug) => {
    setBookmarks(prev => {
      const isBookmarked = prev.includes(postSlug);
      const newBookmarks = isBookmarked 
        ? prev.filter(slug => slug !== postSlug)
        : [...prev, postSlug];
      
      showBookmarkNotification(!isBookmarked);
      return newBookmarks;
    });
  }, [showBookmarkNotification]);

  const addToReadingHistory = useCallback((post) => {
    setReadingHistory(prev => {
      const filtered = prev.filter(item => item.slug !== post.slug);
      const newHistory = [post, ...filtered].slice(0, 10); // Keep only last 10
      return newHistory;
    });
  }, []);

  const sharePost = useCallback(async (post) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showShareNotification();
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, [showShareNotification]);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  const getReadingTime = useCallback((content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min de lectura`;
  }, []);

  const getCategoryColor = useCallback((category) => {
    const colors = {
      tecnologia: {
        bg: 'bg-gradient-to-r from-purple-500 to-indigo-600',
        text: 'text-white',
        badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      },
      rehabilitacion: {
        bg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
        text: 'text-white',
        badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
      },
      consejos: {
        bg: 'bg-gradient-to-r from-amber-500 to-orange-600',
        text: 'text-white',
        badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
      },
      'casos-exito': {
        bg: 'bg-gradient-to-r from-rose-500 to-pink-600',
        text: 'text-white',
        badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'
      },
      investigacion: {
        bg: 'bg-gradient-to-r from-blue-500 to-cyan-600',
        text: 'text-white',
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      },
      novedades: {
        bg: 'bg-gradient-to-r from-violet-500 to-purple-600',
        text: 'text-white',
        badge: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300'
      }
    };
    return colors[category] || colors.tecnologia;
  }, []);

  const isFavorite = useCallback((postSlug) => {
    return favorites.includes(postSlug);
  }, [favorites]);

  const isBookmarked = useCallback((postSlug) => {
    return bookmarks.includes(postSlug);
  }, [bookmarks]);

  return {
    // State
    darkMode,
    isLoading,
    favorites,
    bookmarks,
    readingHistory,
    
    // Actions
    toggleDarkMode,
    toggleFavorite,
    toggleBookmark,
    addToReadingHistory,
    sharePost,
    
    // Utilities
    formatDate,
    getReadingTime,
    getCategoryColor,
    isFavorite,
    isBookmarked,
    
    // Loading state
    setIsLoading,
  };
};

