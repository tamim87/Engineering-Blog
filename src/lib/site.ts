import type { Locale } from "@/lib/i18n/locales";

/**
 * Site-wide constants and URL helpers. Single source of truth for the
 * canonical origin and default metadata.
 */

const FALLBACK_SITE_URL = "http://localhost:3000";

export const siteConfig = {
  // Placeholder values: confirm before launch (see docs/product/roadmap.md).
  name: "Noor Muhammad Tamim",
  description:
    "Personal engineering website: projects, case studies, and writing on software engineering.",
} as const;

/** Canonical origin without a trailing slash. */
export function getSiteUrl(
  raw: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
): string {
  const value = raw?.trim() || FALLBACK_SITE_URL;
  return value.replace(/\/+$/, "");
}

/** Builds an absolute URL for a site path such as "/blog". */
export function absoluteUrl(path: string, siteUrl: string = getSiteUrl()): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized === "/" ? "" : normalized}`;
}

/**
 * Path for a locale, e.g. localizedPath("en") -> "/en",
 * localizedPath("en", "/blog") -> "/en/blog".
 */
export function localizedPath(locale: Locale, path: string = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}
