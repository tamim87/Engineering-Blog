import { notFound } from "next/navigation";
import { isEnabledLocale, type EnabledLocale } from "./locales";

/**
 * Resolves the `[locale]` route param, returning a 404 for anything that is
 * not an enabled locale. Use in layouts, pages and generateMetadata.
 */
export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<EnabledLocale> {
  const { locale } = await params;
  if (!isEnabledLocale(locale)) notFound();
  return locale;
}
