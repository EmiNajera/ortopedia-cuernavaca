/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    domains: ['placehold.co', 'images.unsplash.com'],
    unoptimized: true, // For local images
  },
  webpack: (config) => {
    // Aliasing react-router-dom to a compatibility layer so existing components work in Next.js
    config.resolve.alias['react-router-dom'] = path.resolve(__dirname, 'src/utils/routerCompat.js');
    return config;
  },
};

module.exports = nextConfig;


