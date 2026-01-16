import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  // Nextra options
  defaultShowCopyCode: true,
  readingTime: true,
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
    ],
    unoptimized: true,
    minimumCacheTTL: 60,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default withNextra(nextConfig);
