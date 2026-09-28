/**
 * Domain types for site content. See docs/content/content-model.md.
 *
 * These describe content as the application consumes it. UI components must
 * depend on these types (via loaders in src/lib), never on raw content files.
 */
import type { Locale } from "@/lib/i18n/locales";

/** ISO 8601 calendar date, e.g. "2026-09-28". */
export type IsoDate = string;

/**
 * Provisional set, taken from the initial requirements. Keep it small and
 * broad; use tags for specifics.
 */
export const BLOG_CATEGORIES = [
  "backend",
  "frontend",
  "database",
  "devops",
  "architecture",
  "career",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogPostMeta {
  /** Derived from the content file name, not stored in front matter. */
  slug: string;
  title: string;
  description: string;
  publishDate: IsoDate;
  updatedDate?: IsoDate;
  /** Specific lowercase kebab-case labels, e.g. "spring-boot". */
  tags: string[];
  category: BlogCategory;
  /** Series name; when set, seriesOrder is required. */
  series?: string;
  /** 1-based position within the series. */
  seriesOrder?: number;
  draft: boolean;
  featured: boolean;
  locale: Locale;
  /** Shared by all translations of the same article. */
  translationKey: string;
}

/** Provisional status values; confirm when the first project is written. */
export type ProjectStatus = "active" | "completed" | "archived";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectMeta {
  /** Derived from the content file name, not stored in front matter. */
  slug: string;
  title: string;
  description: string;
  status: ProjectStatus;
  technologies: string[];
  links: ProjectLink[];
  /** Path under /public, when an image exists. */
  image?: string;
  featured: boolean;
  locale: Locale;
  /** Shared by all translations of the same project. */
  translationKey: string;
}
