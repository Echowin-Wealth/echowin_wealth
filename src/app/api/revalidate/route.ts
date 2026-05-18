import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const PAGE_PATHS: Record<string, string[]> = {
  home: ["/"],
  about: ["/about-us"],
  offerings: ["/offerings"],
  contact: ["/contact-us"],
  global: ["/", "/about-us", "/offerings", "/contact-us"],
};

export async function POST(request: NextRequest) {
  // Verify the caller is an authenticated admin
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Allow both authenticated admins and the internal REVALIDATION_SECRET
  const body = await request.json().catch(() => ({})) as { page?: string; secret?: string };
  const isSecretValid = body.secret === process.env.REVALIDATION_SECRET;

  if (!user && !isSecretValid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { page } = body;
  const paths = page ? (PAGE_PATHS[page] ?? ["/"]) : ["/"];

  paths.forEach((p) => revalidatePath(p));

  return NextResponse.json({ revalidated: paths });
}
