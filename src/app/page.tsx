import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/site";

// `/` has no content of its own. Locale detection from Accept-Language is
// deliberately not implemented: it would need a proxy and hurts caching.
export default function RootPage(): never {
  redirect(localizedPath(DEFAULT_LOCALE));
}
