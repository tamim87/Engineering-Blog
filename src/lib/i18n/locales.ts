export const LOCALES = ["en", "bn"] as const;

export type Locale = (typeof LOCALES)[number];

/** Launch language. Bengali is planned but has no content yet. */
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
