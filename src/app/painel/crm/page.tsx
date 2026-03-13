import Link from "next/link";
export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CrmPageClient from "./CrmPageClient";

export default async function CrmPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const sp = await searchParams;
    const currentTab = sp.tab || 'pipeline';

    // Fetch leads for this user, including property info
    const { data: leads } = await supabase
        .from("leads")
        .select(`
            *,
            property:properties(title, slug)
        `)
        .eq("assigned_to", user.id)
        .order("created_at", { ascending: false });

    // Transform leads for the kanban component
    const kanbanLeads = (leads || []).map(lead => ({
        id: lead.id,
        lead_name: lead.name,
        phone: lead.phone_whatsapp,
        email: lead.email,
        property_title: lead.property?.title || 'Sem imóvel',
        value: 0, // Valor padrão, pode ser ajustado depois
        created_at: lead.created_at,
        stage: lead.status === 'new' ? 'contact' : lead.status || 'contact',
    }));

    return (
        <CrmPageClient 
            kanbanLeads={kanbanLeads} 
            currentTab={currentTab}
        />

    );
}
