import React from 'react';
import { motion } from 'framer-motion';

const ArticleContent = ({ content }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="prose prose-lg prose-slate max-w-none
        prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:text-center prose-h1:border-b prose-h1:border-slate-200 prose-h1:pb-4
        prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-blue-900 prose-h2:border-l-4 prose-h2:border-blue-500 prose-h2:pl-4
        prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-slate-800 prose-h3:bg-slate-50 prose-h3:px-4 prose-h3:py-2 prose-h3:rounded-lg
        prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:text-slate-700 prose-h4:font-semibold
        prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-p:indent-4
        prose-a:text-blue-600 prose-a:no-underline prose-a:font-semibold hover:prose-a:text-blue-700 hover:prose-a:underline hover:prose-a:bg-blue-50 hover:prose-a:px-1 hover:prose-a:rounded
        prose-strong:text-slate-900 prose-strong:font-bold prose-strong:bg-yellow-100 prose-strong:px-1 prose-strong:rounded
        prose-em:text-slate-700 prose-em:italic prose-em:bg-slate-100 prose-em:px-1 prose-em:rounded
        prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-blue-200
        prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:shadow-lg prose-pre:border prose-pre:border-slate-700
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-6 prose-blockquote:pr-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-slate-700 prose-blockquote:shadow-sm
        prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3 prose-ul:bg-slate-50 prose-ul:p-4 prose-ul:rounded-lg prose-ul:border prose-ul:border-slate-200
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-3 prose-ol:bg-slate-50 prose-ol:p-4 prose-ol:rounded-lg prose-ol:border prose-ol:border-slate-200
        prose-li:text-slate-700 prose-li:leading-relaxed prose-li:mb-1
        prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto prose-img:border prose-img:border-slate-200 prose-img:p-2 prose-img:bg-white
        prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-table:shadow-lg prose-table:rounded-lg prose-table:overflow-hidden
        prose-th:bg-blue-50 prose-th:border prose-th:border-slate-200 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-slate-700
        prose-td:border prose-td:border-slate-200 prose-td:px-4 prose-td:py-3 prose-td:text-slate-600 prose-td:bg-white
        prose-hr:border-slate-300 prose-hr:my-12 prose-hr:border-2"
    >
      {content}
    </motion.article>
  );
};

export default ArticleContent;
