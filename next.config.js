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
      remotePatterns: [
        {
          protocol: "https",
          hostname: "uploadthing.com",
        },
        {
          protocol: "https",
          hostname: "placehold.co",
        },
        // {
        //   protocol :"https",
        //   hostname : "avatars.githubusercontent.com"
        // },
        {
          protocol : "https",
          hostname :"lh3.googleusercontent.com"
        }
      ],
    },
  };
  
  module.exports = nextConfig;
  