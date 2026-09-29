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
  turbopack: {
    resolveAlias: {
      // our <Mermaid> queues renders; the stock one races itself when several
      // diagrams on a page become visible at the same time
      "@theguild/remark-mermaid/mermaid": "./src/components/lab/mermaid.tsx",
    },
  },
  async redirects() {
    return [
      // the reading list moved into the lab, where it can keep changing
      { source: "/blog/books-and-docs", destination: "/lab/books", permanent: true },
    ];
  },
};

export default withNextra(nextConfig);
