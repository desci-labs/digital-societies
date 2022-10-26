/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["w3s.link"],
  },
  env: {
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET_KEY: process.env.PINATA_SECRET_KEY,
    WEB3_STORAGE_TOKEN: process.env.WEB3_STORAGE_TOKEN,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  }
};

module.exports = nextConfig;
