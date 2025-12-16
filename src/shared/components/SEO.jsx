import Head from 'next/head';

const SEO = ({ title, description, image, url }) => {
  const siteName = 'Ortopedia Cuernavaca';
  const defaultDescription =
    'Especialistas en ortopedia técnica, plantillas personalizadas y órtesis en Cuernavaca. Mejoramos tu calidad de vida.';
  const defaultImage = '/images/banners/Ortopedia Cuernavaca Logo.png';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ortopediacuernavaca.com';

  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullDescription = description || defaultDescription;
  const fullImage = image
    ? image.startsWith('http')
      ? image
      : `${siteUrl}${image}`
    : `${siteUrl}${defaultImage}`;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
    </Head>
  );
};

export default SEO;
