import '@testing-library/jest-dom';

// Polyfill IntersectionObserver for framer-motion in JSDOM
class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  // @ts-ignore
  window.IntersectionObserver = MockIntersectionObserver;
}


