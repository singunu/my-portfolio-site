import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // iOS 최적화를 위한 추가 설정
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }
};

export default nextConfig;