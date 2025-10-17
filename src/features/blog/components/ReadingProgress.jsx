import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ReadingProgress = ({ 
  target = 'article', 
  height = 4,
  color = 'bg-blue-600',
  showPercentage = false,
  className = ''
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const targetElement = document.querySelector(target);
      if (!targetElement) return;

      const rect = targetElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calcular si el elemento está visible
      const isElementVisible = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(isElementVisible);

      if (isElementVisible) {
        // Calcular progreso basado en la posición del scroll dentro del artículo
        const articleTop = rect.top;
        const articleHeight = rect.height;
        const scrolled = Math.max(0, -articleTop);
        const progressPercent = Math.min(100, (scrolled / articleHeight) * 100);
        setProgress(progressPercent);
      } else if (rect.top >= windowHeight) {
        // El artículo está debajo del viewport
        setProgress(0);
      } else {
        // El artículo está arriba del viewport (completamente leído)
        setProgress(100);
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(updateProgress);
    };

    const handleResize = () => {
      requestAnimationFrame(updateProgress);
    };

    // Inicializar
    updateProgress();

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [target]);

  if (!isVisible && progress === 0) {
    return null;
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <motion.div
        className={`${color} transition-all duration-300 ease-out`}
        style={{
          height: `${height}px`,
          width: `${progress}%`,
          boxShadow: progress > 0 ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
        }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      />
      
      {showPercentage && progress > 0 && (
        <motion.div
          className="absolute top-0 right-0 bg-white border border-gray-200 rounded-full px-2 py-1 text-xs font-medium text-gray-700 shadow-sm"
          style={{ marginTop: `${height + 8}px` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </div>
  );
};

export default ReadingProgress;
