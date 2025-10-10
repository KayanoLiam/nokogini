import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure Turbopack resolves modules relative to this project root.
    // Fixes warning about incorrect workspace root when multiple lockfiles exist.
    root: "/Users/kayano/Desktop/nokogini_frontend",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iscqpafopcqzahsaqrnq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
