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
  outputFileTracingRoot: path.join(__dirname, '../../'),
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Note: swcMinify is enabled by default in Next.js 16, no need to specify
  // Note: optimizeCss requires 'critters' package, removing for now to avoid errors
  // experimental: {
  //   optimizeCss: true,
  // },
  // Optimize images
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
    ],
    qualities: [100, 95, 85, 75], // Incluir 85 que se está usando en el código
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Add more optimization options
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { isServer }) => {
    // Aliasing react-router-dom to a compatibility layer so existing components work in Next.js
    config.resolve.alias['react-router-dom'] = path.resolve(
      __dirname,
      'src/shared/lib/utils/routerCompat.js',
    );

    // Domain aliases for clean imports
    const srcPath = path.resolve(__dirname, 'src');

    // Base aliases - these work for direct imports like @shared/something
    const baseAliases = {
      '@store': path.join(srcPath, 'store'),
      '@shared': path.join(srcPath, 'shared'),
      '@marketing': path.join(srcPath, 'marketing'),
      '@domains': path.join(srcPath, 'domains'),
      '@layouts': path.join(srcPath, 'layouts'),
    };

    // Merge with existing aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      ...baseAliases,
    };

    // For nested paths like @shared/components/ui/ErrorBoundary
    // Webpack needs explicit aliases for each level
    config.resolve.alias['@shared/components'] = path.join(srcPath, 'shared/components');
    config.resolve.alias['@shared/components/ui'] = path.join(srcPath, 'shared/components/ui');
    config.resolve.alias['@shared/lib'] = path.join(srcPath, 'shared/lib');
    config.resolve.alias['@shared/lib/utils'] = path.join(srcPath, 'shared/lib/utils');

    // Also add src to modules so webpack can resolve relative to src
    if (!config.resolve.modules) {
      config.resolve.modules = [];
    }
    if (!config.resolve.modules.includes(srcPath)) {
      config.resolve.modules.push(srcPath);
    }

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
