import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["prod-files-secure.s3.us-west-2.amazonaws.com"],
  },
};

export default nextConfig;
