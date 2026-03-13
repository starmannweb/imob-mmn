export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SeletorPageClient } from "./SeletorPageClient";

export default async function SeletorPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch unassigned / new leads for the user
    const { data: leads } = await supabase
        .from("leads")
        .select("*, property:properties(title)")
        .eq("assigned_to", user.id)
        .eq("status", "new")
        .order("created_at", { ascending: false });

    // Fetch network members (afiliados)
    const { data: affiliates } = await supabase
        .from("users")
        .select("*")
        .eq("referred_by", user.id)
        .order("full_name", { ascending: true});

    // Fetch user's properties to assign
    const { data: properties } = await supabase
        .from("properties")
        .select("id, title")
        .eq("owner_id", user.id)
        .order("title", { ascending: true });

    // Fetch user settings
    const { data: userProfile } = await supabase
        .from("users")
        .select("site_settings")
        .eq("id", user.id)
        .single();

    return (
        <SeletorPageClient 
            leads={leads || []} 
            affiliates={affiliates || []} 
            properties={properties || []}
            userSettings={userProfile?.site_settings || {}}
        />
    );
}
