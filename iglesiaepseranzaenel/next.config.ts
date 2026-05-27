import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/multimedia/:path*",
        destination: "http://localhost:1337/uploads/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "iee-production.up.railway.app",
        pathname: "/uploads/**",
      },
    ],
  },



};

export default nextConfig;
