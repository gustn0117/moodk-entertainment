import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export function createPublicClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    db: { schema: "moodk_entertainment" },
  });
}

export function createAdminClient() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    db: { schema: "moodk_entertainment" },
  });
}

export function getStorageUrl(path: string): string {
  return `${supabaseUrl}/storage/v1/object/public/artists/${path}`;
}
