import { createPublicClient } from "@/lib/supabase/public";
import type { SiteContent, PageContentMap } from "@/lib/types";

export async function fetchPageContent(
  page: string,
  section: string
): Promise<PageContentMap> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value, value_json")
      .eq("page", page)
      .eq("section", section)
      .eq("is_visible", true);

    if (error) { console.error("[fetchPageContent] Supabase error:", error.message); return {}; }
    if (!data?.length) { console.warn("[fetchPageContent] No rows for", page, section); return {}; }

    return Object.fromEntries(
      data.map((row: Pick<SiteContent, "key" | "value" | "value_json">) => [
        row.key,
        (row.value_json ?? row.value ?? "") as string | Record<string, unknown>,
      ])
    ) as PageContentMap;
  } catch {
    return {};
  }
}

export async function fetchAllPageContent(page: string) {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("section, key, value, value_json")
      .eq("page", page)
      .eq("is_visible", true);

    if (error || !data?.length) return {};

    const result: Record<string, PageContentMap> = {};
    for (const row of data) {
      if (!result[row.section]) result[row.section] = {};
      result[row.section][row.key] = row.value_json ?? row.value ?? "";
    }
    return result;
  } catch {
    return {};
  }
}
