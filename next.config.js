/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "undici": false,
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/docs', // the page that has to be redirected
        destination: 'https://docs.proofly.xyz', // the destination URL
        permanent: true, // permanent 301 redirect
      },
    ];
  },
};

module.exports = nextConfig;
