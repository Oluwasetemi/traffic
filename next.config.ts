import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["sharp", "onnxruntime-node"],
  reactCompiler: true,
  turbopack: {
    root: __dirname,
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
