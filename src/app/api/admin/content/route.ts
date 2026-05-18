import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const section = searchParams.get("section");

  const supabase = createAdminClient();
  let query = supabase.from("site_content").select("*");
  if (page) query = query.eq("page", page);
  if (section) query = query.eq("section", section);

  const { data, error } = await query.order("sort_order");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const supabaseAuth = await createClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { page, section, values } = await request.json() as {
    page: string;
    section: string;
    values: Record<string, string>;
  };

  const supabase = createAdminClient();
  const rows = Object.entries(values).map(([key, value]) => ({
    page,
    section,
    key,
    value,
    is_visible: true,
    updated_by: user.id,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("site_content")
    .upsert(rows, { onConflict: "page,section,key" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
