import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ENABLED_LOCALES } from "@/lib/i18n/locales";
import { resolveLocale } from "@/lib/i18n/route";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "../globals.css";

// Only enabled locales are generated; anything else under /[locale] is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ENABLED_LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

// This is the root layout (it renders <html>), so `lang` follows the route.
export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-background focus:px-3 focus:py-2"
        >
          {dict.skipToContent}
        </a>
        <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
          {children}
        </main>
      </body>
    </html>
  );
}
