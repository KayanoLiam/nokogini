import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use default Turbopack project root. The previous hardcoded `root`
  // pointed outside the repository and caused path resolution to panic.
  // If you need a custom root, ensure it matches the actual project folder.
  turbopack: {},
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
