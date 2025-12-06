import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * FAQStack - Componente moderno de FAQ con cards apiladas
 * Mejor UX que ScrollStack: más simple, performante y accesible
 */
export const FAQStackItem = ({ children, index = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`faq-stack-item relative w-full ${className}`}
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
        {children}
      </div>
    </motion.div>
  );
};

const FAQStack = ({ children, className = '', spacing = 'space-y-6 sm:space-y-8' }) => {
  return (
    <div
      className={`faq-stack-container w-full max-w-4xl mx-auto px-4 sm:px-6 ${spacing} ${className}`}
    >
      {children}
    </div>
  );
};

export default FAQStack;
