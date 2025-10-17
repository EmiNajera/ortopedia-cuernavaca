require('@testing-library/jest-dom');
const React = require('react');

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

// Global mock for next/router to avoid "NextRouter was not mounted" in tests
jest.mock('next/router', () => ({
  // Simple static router for unit tests
  useRouter: () => ({
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    isReady: true,
    isFallback: false,
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

// Mock next/image to render a simple img in tests and reduce noisy warnings
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ src, alt = '', priority, ...props }) => {
      // Use a standard img so Testing Library can query by alt text
      // eslint-disable-next-line jsx-a11y/alt-text
      return React.createElement('img', { src, alt, ...props });
    },
  };
});

// Mock next/link to a simple anchor for predictable hrefs in tests
jest.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ href, children, ...props }) => {
      const resolvedHref = typeof href === 'string' ? href : href?.pathname || '';
      return React.createElement('a', { href: resolvedHref, ...props }, children);
    },
  };
});

// Optional: silence only the specific Next Image qualities warning to keep test output clean
const consoleWarn = console.warn;
console.warn = (...args) => {
  const msg = args[0];
  if (typeof msg === 'string' && msg.includes('next-image-unconfigured-qualities')) {
    return;
  }
  return consoleWarn(...args);
};
