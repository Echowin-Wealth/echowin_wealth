import { createPublicClient } from "@/lib/supabase/public";
import type { SeoMetadata } from "@/lib/types";
import { DEFAULT_SEO } from "@/lib/constants/defaults";
import type { Metadata } from "next";

export async function fetchSeoMetadata(page: string): Promise<SeoMetadata | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("seo_metadata")
      .select("*")
      .eq("page", page)
      .single();

    if (error || !data) return DEFAULT_SEO[page] ?? null;
    return data as SeoMetadata;
  } catch {
    return DEFAULT_SEO[page] ?? null;
  }
}

export async function generatePageMetadata(page: string): Promise<Metadata> {
  const seo = await fetchSeoMetadata(page);
  if (!seo) return {};

  return {
    title: seo.title ?? undefined,
    description: seo.description ?? undefined,
    keywords: seo.keywords ?? undefined,
    openGraph: {
      title: seo.og_title ?? seo.title ?? undefined,
      description: seo.og_description ?? seo.description ?? undefined,
      images: seo.og_image_url ? [{ url: seo.og_image_url }] : undefined,
    },
    alternates: seo.canonical_url
      ? { canonical: seo.canonical_url }
      : undefined,
  };
}
