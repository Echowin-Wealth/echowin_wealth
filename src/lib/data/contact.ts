import { createPublicClient } from "@/lib/supabase/public";
import type { ContactInfo } from "@/lib/types";
import { DEFAULT_CONTACT } from "@/lib/constants/defaults";

export async function fetchContactInfo(): Promise<ContactInfo[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("contact_info")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });

    if (error || !data?.length) return DEFAULT_CONTACT;
    return data as ContactInfo[];
  } catch {
    return DEFAULT_CONTACT;
  }
}
