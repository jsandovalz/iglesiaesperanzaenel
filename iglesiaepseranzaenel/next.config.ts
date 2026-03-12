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
        protocol: "http",
        hostname: "localhost",
        port: "3000", // tu frontend
        pathname: "/multimedia/**",
      },
    ],
  },



};

export default nextConfig;
