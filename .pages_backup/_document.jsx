import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />

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
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
