/** Every locale the architecture knows about. */
export const LOCALES = ["en", "bn"] as const;

export type Locale = (typeof LOCALES)[number];

/**
 * Locales that are actually published (routes, sitemap). Add "bn" here only
 * when Bengali UI strings and content exist; the dictionary type then forces
 * a Bengali dictionary to be provided.
 */
export const ENABLED_LOCALES = ["en"] as const satisfies readonly Locale[];

export type EnabledLocale = (typeof ENABLED_LOCALES)[number];

/** Launch language; `/` redirects here. */
export const DEFAULT_LOCALE: EnabledLocale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function isEnabledLocale(value: string): value is EnabledLocale {
  return (ENABLED_LOCALES as readonly string[]).includes(value);
}
