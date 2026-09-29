import type { MetadataRoute } from "next";
import { ENABLED_LOCALES } from "@/lib/i18n/locales";
import { absoluteUrl, localizedPath } from "@/lib/site";

// Only implemented routes are listed. Blog and project entries are added
// when their loaders exist. hreflang alternates are added once a page has a
// real translation.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ENABLED_LOCALES.map((locale) => ({
    url: absoluteUrl(localizedPath(locale)),
  }));
}
