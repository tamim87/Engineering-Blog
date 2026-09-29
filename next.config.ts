import type { NextConfig } from "next";

// Static export for Cloudflare Workers static assets (see
// docs/architecture/decisions/0005-deployment-platform.md). This means:
// - no Route Handlers that read the request, no Server Actions, no ISR
// - next/image optimization is disabled (images.unoptimized)
// - next.config.ts cannot set headers()/redirects(); those live in
//   public/_headers and public/_redirects (Cloudflare conventions), copied
//   into the build output like any other public/ file.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
