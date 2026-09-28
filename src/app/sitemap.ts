import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Only implemented routes are listed. Blog and project entries are added
// when their loaders exist.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: absoluteUrl("/") }];
}
