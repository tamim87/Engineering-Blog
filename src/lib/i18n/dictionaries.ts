import type { EnabledLocale } from "./locales";

/**
 * UI strings only. Article and project content is translated separately (see
 * docs/content/content-model.md). Keep this small; add keys when a real
 * component needs them.
 */
export interface Dictionary {
  skipToContent: string;
  home: {
    placeholderNote: string;
  };
}

// Record<EnabledLocale, ...> makes enabling a locale without a dictionary a
// compile error.
const dictionaries: Record<EnabledLocale, Dictionary> = {
  en: {
    skipToContent: "Skip to main content",
    home: {
      placeholderNote: "Placeholder page. Site content is not implemented yet.",
    },
  },
};

export function getDictionary(locale: EnabledLocale): Dictionary {
  return dictionaries[locale];
}
