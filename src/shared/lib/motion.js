/**
 * Optimized framer-motion wrapper with lazy loading
 * Reduces initial bundle size by loading animations only when needed
 */

import dynamic from 'next/dynamic';

// Lazy load framer-motion components to reduce initial bundle
export const Motion = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), {
  ssr: false,
});

export const MotionSpan = dynamic(() => import('framer-motion').then((mod) => mod.motion.span), {
  ssr: false,
});

export const MotionP = dynamic(() => import('framer-motion').then((mod) => mod.motion.p), {
  ssr: false,
});

export const MotionH1 = dynamic(() => import('framer-motion').then((mod) => mod.motion.h1), {
  ssr: false,
});

export const MotionH2 = dynamic(() => import('framer-motion').then((mod) => mod.motion.h2), {
  ssr: false,
});

export const MotionH3 = dynamic(() => import('framer-motion').then((mod) => mod.motion.h3), {
  ssr: false,
});

export const MotionButton = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.button),
  { ssr: false },
);

export const MotionSection = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.section),
  { ssr: false },
);

// For components that need immediate animation (above the fold)
// Use direct import for critical animations
export { motion, AnimatePresence } from 'framer-motion';

// Hook for conditional animation loading
export const useMotion = () => {
  if (typeof window === 'undefined') return null;

  return dynamic(() => import('framer-motion'), { ssr: false });
};
