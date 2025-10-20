/** @type {import('next').NextConfig} */
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    domains: ['placehold.co', 'images.unsplash.com'],
    unoptimized: true, // For local images
  },
  webpack: (config, { isServer }) => {
    // Aliasing react-router-dom to a compatibility layer so existing components work in Next.js
    config.resolve.alias['react-router-dom'] = path.resolve(__dirname, 'src/utils/routerCompat.js');

    // Don't bundle Node.js modules for the client
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        process: false,
      };
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(withMDX(nextConfig));
