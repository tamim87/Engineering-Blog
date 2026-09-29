import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { resolveLocale } from "@/lib/i18n/route";
import { localizedPath, siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return { alternates: { canonical: localizedPath(locale) } };
}

/** PLACEHOLDER: the real homepage is designed in a later phase. */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">
        {siteConfig.name}
      </h1>
      <p className="mt-4 text-lg">{siteConfig.description}</p>
      <p className="mt-8 text-sm">{dict.home.placeholderNote}</p>
    </>
  );
}
