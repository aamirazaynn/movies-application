import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'ia.media-imdb.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '**.omdbapi.com',
      },
    ],
  },
};

export default nextConfig;
