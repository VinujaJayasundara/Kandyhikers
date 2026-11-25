import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF is ~30–50% smaller than WebP; browsers without it get WebP.
    formats: ["image/avif", "image/webp"],
    // 60 for full-width hero photos, 75 (default) everywhere else.
    qualities: [60, 75],
    // Placeholder photography. Remove once real photos live in /public/images.
    // Object form: leaving out `search` allows any query string (?auto=format&w=…).
    // The `new URL(...)` form sets search to "" and rejects every Unsplash URL.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
