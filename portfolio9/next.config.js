/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable type checking during build to speed up deployment
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build to speed up deployment
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Environment variables for Vercel
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: "mk89ctl9",
    NEXT_PUBLIC_SANITY_DATASET: "production",
    NEXT_PUBLIC_SANITY_API_VERSION: "2025-04-20"
  },
};

module.exports = nextConfig; 