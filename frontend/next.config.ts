import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/litvm-dapps",
  trailingSlash: true,
};

export default nextConfig;
