import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/banners/Ortopedia Cuernavaca Logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/banners/Ortopedia Cuernavaca Logo.png"
        />
        <link rel="apple-touch-icon" href="/images/banners/Ortopedia Cuernavaca Logo.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Meta tags for better SEO and social sharing */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </Head>
      <body className="font-sans bg-gray-50">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Cleanup any lingering Lenis instances immediately
              (function() {
                if (typeof window !== 'undefined') {
                  if (window.__lenisInstance) {
                    try {
                      window.__lenisInstance.destroy();
                    } catch(e) {}
                    window.__lenisInstance = null;
                  }
                  // Cancel any pending animation frames
                  if (window.__lenisRafIds) {
                    window.__lenisRafIds.forEach(function(id) {
                      if (id) cancelAnimationFrame(id);
                    });
                    window.__lenisRafIds = [];
                  }
                }
              })();
            `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
