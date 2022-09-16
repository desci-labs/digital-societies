/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io", "gateway.pinata.cloud", "w3s.link"],
  },
};

module.exports = nextConfig;
