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
        hostname: 'steadfast-triumph-c0193f1fb8.media.strapiapp.com',
      },
    ],
  },



};

export default nextConfig;
