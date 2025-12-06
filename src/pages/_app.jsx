import React, { useEffect } from 'react';
import Head from 'next/head';
// Optimized fonts
import { inter, poppins } from '@shared/lib/fonts';
// Analytics
import Analytics from '@shared/components/Analytics';
// Global styles (Tailwind)
import '../index.css';
import '../styles/mobile-optimizations.css';
import MarketingLayout from '@layouts/MarketingLayout';
import ErrorBoundary from '../shared/components/ui/ErrorBoundary';

// Use the getLayout pattern: pages can export a `getLayout` function to wrap their content
// Example in a page: Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <MarketingLayout>{page}</MarketingLayout>);

  // Cleanup any lingering Lenis instances that might be causing scroll issues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Clean up any global Lenis instance
      if (window.__lenisInstance) {
        try {
          window.__lenisInstance.destroy();
        } catch (e) {
          // Ignore errors if already destroyed
        }
        window.__lenisInstance = null;
      }

      // Clean up any requestAnimationFrame loops
      const rafIds = window.__lenisRafIds || [];
      rafIds.forEach((id) => {
        if (id) cancelAnimationFrame(id);
      });
      window.__lenisRafIds = [];
    }

    return () => {
      // Cleanup on unmount
      if (typeof window !== 'undefined' && window.__lenisInstance) {
        try {
          window.__lenisInstance.destroy();
        } catch (e) {
          // Ignore errors
        }
        window.__lenisInstance = null;
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1"
        />
      </Head>
      <Analytics />
      <div className={`${inter.variable} ${poppins.variable} font-sans`}>
        {getLayout(<Component {...pageProps} />)}
      </div>
    </ErrorBoundary>
  );
}
