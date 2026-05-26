import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/litvm-dapps",
  typescript: { ignoreBuildErrors: true },
};
export default nextConfig;
