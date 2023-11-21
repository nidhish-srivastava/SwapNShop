/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode : false,
    experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    images: {
      domains: [
        'res.cloudinary.com',
        "lh3.googleusercontent.com"
      ],
  },
  }
  
  module.exports = nextConfig;
  