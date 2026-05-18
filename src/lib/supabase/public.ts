import { createClient } from "@supabase/supabase-js";

// Simple anon client for public data reads — no cookies/auth needed.
// Use this in Server Components for fetching publicly accessible data.
let _client: ReturnType<typeof createClient> | null = null;

export function createPublicClient() {
  if (_client) return _client;
  _client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return _client;
}
