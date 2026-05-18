import { createPublicClient } from "@/lib/supabase/public";
import type { Offering } from "@/lib/types";
import { DEFAULT_OFFERINGS } from "@/lib/constants/defaults";

export async function fetchOfferings(): Promise<Offering[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("offerings")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error || !data?.length) return DEFAULT_OFFERINGS;
    return data as Offering[];
  } catch {
    return DEFAULT_OFFERINGS;
  }
}

export async function fetchAllOfferings(): Promise<Offering[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("offerings")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data?.length) return DEFAULT_OFFERINGS;
    return data as Offering[];
  } catch {
    return DEFAULT_OFFERINGS;
  }
}
