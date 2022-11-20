/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io", "w3s.link"],
  },
  env: {
    WEB3_STORAGE_TOKEN: process.env.WEB3_STORAGE_TOKEN,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
