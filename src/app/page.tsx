import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** PLACEHOLDER: the real homepage is designed in a later phase. */
export default function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">
        {siteConfig.name}
      </h1>
      <p className="mt-4 text-lg">{siteConfig.description}</p>
      <p className="mt-8 text-sm">
        Placeholder page. Site content is not implemented yet.
      </p>
    </>
  );
}
