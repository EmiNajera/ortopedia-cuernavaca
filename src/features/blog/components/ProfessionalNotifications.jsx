import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Info, AlertTriangle, Heart, Bookmark, Share2 } from 'lucide-react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'success',
      duration: 3000,
      ...notification,
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const showSuccess = (message, options = {}) => {
    addNotification({
      type: 'success',
      message,
      ...options,
    });
  };

  const showError = (message, options = {}) => {
    addNotification({
      type: 'error',
      message,
      duration: 5000,
      ...options,
    });
  };

  const showInfo = (message, options = {}) => {
    addNotification({
      type: 'info',
      message,
      ...options,
    });
  };

  const showWarning = (message, options = {}) => {
    addNotification({
      type: 'warning',
      message,
      duration: 4000,
      ...options,
    });
  };

  const showLikeNotification = (isLiked) => {
    addNotification({
      type: 'success',
      message: isLiked ? 'Artículo agregado a favoritos' : 'Artículo removido de favoritos',
      icon: Heart,
      duration: 2000,
    });
  };

  const showBookmarkNotification = (isBookmarked) => {
    addNotification({
      type: 'success',
      message: isBookmarked ? 'Artículo guardado' : 'Artículo removido de guardados',
      icon: Bookmark,
      duration: 2000,
    });
  };

  const showShareNotification = () => {
    addNotification({
      type: 'info',
      message: 'Enlace copiado al portapapeles',
      icon: Share2,
      duration: 2000,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        addNotification,
        removeNotification,
        showSuccess,
        showError,
        showInfo,
        showWarning,
        showLikeNotification,
        showBookmarkNotification,
        showShareNotification,
      }}
    >
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = ({ notifications, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const NotificationItem = ({ notification, onRemove }) => {
  const { type, message, icon: Icon, duration } = notification;

  const getNotificationStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-500',
          text: 'text-white',
          icon: Check,
          iconColor: 'text-emerald-100',
        };
      case 'error':
        return {
          bg: 'bg-red-500',
          text: 'text-white',
          icon: X,
          iconColor: 'text-red-100',
        };
      case 'warning':
        return {
          bg: 'bg-amber-500',
          text: 'text-white',
          icon: AlertTriangle,
          iconColor: 'text-amber-100',
        };
      case 'info':
        return {
          bg: 'bg-blue-500',
          text: 'text-white',
          icon: Info,
          iconColor: 'text-blue-100',
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-white',
          icon: Info,
          iconColor: 'text-gray-100',
        };
    }
  };

  const styles = getNotificationStyles();
  const IconComponent = Icon || styles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${styles.bg} ${styles.text} rounded-2xl shadow-xl border border-white/20 backdrop-blur-sm max-w-sm`}
    >
      <div className="flex items-center p-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3`}>
          <IconComponent className={`w-4 h-4 ${styles.iconColor}`} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium leading-tight">{message}</p>
        </div>
        <button
          onClick={() => onRemove(notification.id)}
          className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {duration > 0 && (
        <motion.div
          className="h-1 bg-white/30 rounded-b-2xl"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  );
};

export default NotificationProvider;
