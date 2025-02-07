import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/products/images/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**", 
      },
    ],
  },
};

export default nextConfig;
