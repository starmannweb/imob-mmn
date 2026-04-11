import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    // Use SERVICE_ROLE_KEY for full access (bypasses RLS);
    // fall back to ANON_KEY so public pages still render on environments
    // where the service key isn't set (e.g. preview deploys).
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
        || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    return createClient(url, key);
}
