import Link from "next/link";
export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ChevronRight, Kanban } from "lucide-react";
import CrmKanban from "./crm-kanban";

export default async function CrmPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

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
        name: lead.name,
        phone_whatsapp: lead.phone_whatsapp,
        email: lead.email,
        property_title: lead.property?.title || null,
        created_at: lead.created_at,
        status: lead.status || 'new',
    }));

    return (
        <div className="flex-1 flex flex-col w-full max-w-[1600px] pb-12">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 w-full">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span>CRM</span>
            </div>

            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 dark:bg-blue-950/50 p-2 rounded-lg border border-blue-100 dark:border-blue-900">
                            <Kanban className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">CRM — Pipeline de Leads</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-sm">Arraste os cards entre as etapas para atualizar o status dos leads.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {[
                    { label: 'Novos', count: kanbanLeads.filter(l => l.status === 'new').length, color: 'blue' },
                    { label: 'Contatados', count: kanbanLeads.filter(l => l.status === 'contacted').length, color: 'amber' },
                    { label: 'Negociando', count: kanbanLeads.filter(l => l.status === 'negotiating').length, color: 'purple' },
                    { label: 'Convertidos', count: kanbanLeads.filter(l => l.status === 'won').length, color: 'emerald' },
                    { label: 'Perdidos', count: kanbanLeads.filter(l => l.status === 'lost').length, color: 'red' },
                ].map(kpi => (
                    <div key={kpi.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-center">
                        <span className={`text-2xl font-black text-${kpi.color}-600 dark:text-${kpi.color}-400`}>{kpi.count}</span>
                        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">{kpi.label}</p>
                    </div>
                ))}
            </div>

            {/* Kanban Board */}
            <CrmKanban initialLeads={kanbanLeads} />
        </div>
    );
}
