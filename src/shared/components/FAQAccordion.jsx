import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FAQAccordionItem - Individual accordion item with smooth animations
 */
export const FAQAccordionItem = ({ question, answer, index = 0, isOpen = false, onToggle }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.3, delay: index * 0.05 },
        y: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] },
        layout: { duration: 0.35, ease: [0.22, 0.61, 0.36, 1] },
      }}
      className="faq-accordion-item mb-4 shine-border"
    >
      <motion.div
        layout
        className={`bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 overflow-hidden ${
          isOpen
            ? 'shadow-xl border-blue-200 ring-2 ring-blue-100 bg-gradient-to-b from-white to-blue-50/40'
            : 'hover:shadow-xl hover:border-gray-200'
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-6 sm:p-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl sm:rounded-2xl transition-colors"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          <span className="text-left flex-1 pr-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{question}</h3>
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.05 : 1 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isOpen
                ? 'bg-blue-100 text-blue-600 shadow-inner'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              layout
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.35, ease: [0.22, 0.61, 0.36, 1] },
                opacity: { duration: 0.25 },
              }}
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className="overflow-hidden"
            >
              <motion.div
                layout
                className="px-6 sm:px-7 pb-6 sm:pb-7 pt-0"
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -6, opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
              >
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{answer}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/**
 * FAQAccordion - Modern accordion component for FAQs
 */
const FAQAccordion = ({ items = [], className = '', allowMultiple = false }) => {
  const [openIndexes, setOpenIndexes] = useState(new Set());

  const handleToggle = (index) => {
    setOpenIndexes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`faq-accordion max-w-4xl mx-auto ${className}`}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <FAQAccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            index={index}
            isOpen={openIndexes.has(index)}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
