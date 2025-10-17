import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const headingElements = document.querySelectorAll('h2, h3, h4');
      const headingList = Array.from(headingElements).map((heading) => ({
        id: heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-'),
        text: heading.textContent,
        level: parseInt(heading.tagName.charAt(1))
      }));

      // Add IDs to headings if they don't have them
      headingElements.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = headingList[index].id;
        }
      });

      setHeadings(headingList);

      // Intersection Observer for active heading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: '-20% 0% -35% 0%' }
      );

      headingElements.forEach((heading) => observer.observe(heading));

      return () => observer.disconnect();
    }
  }, [content]);

  const scrollToHeading = (id) => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (headings.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="sticky top-8 bg-white rounded-2xl shadow-lg p-6 border border-slate-200"
    >
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        Índice
      </h3>
      <nav className="space-y-2">
        {headings.map((heading, index) => (
          <button
            key={index}
            onClick={() => scrollToHeading(heading.id)}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeId === heading.id
                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            } ${
              heading.level === 3 ? 'ml-4' : heading.level === 4 ? 'ml-8' : ''
            }`}
          >
            {heading.text}
          </button>
        ))}
      </nav>
    </motion.div>
  );
};

export default TableOfContents;
