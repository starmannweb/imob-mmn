import Link from "next/link";
export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ChevronRight, Kanban, List, Grid } from "lucide-react";
import CrmKanban from "./crm-kanban";

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

            {/* Header e Toggle */}
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 dark:bg-blue-950/50 p-2 rounded-lg border border-blue-100 dark:border-blue-900">
                            <Kanban className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">CRM — Gestão de Leads</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-sm">Acompanhe seus leads cadastrados e negociações.</p>
                        </div>
                    </div>
                </div>

                {/* Toggle Pipilene / Lista */}
                {kanbanLeads.length > 0 && (
                    <div className="flex bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm w-fit">
                        <Link href="/painel/crm?tab=pipeline" className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-bold transition-all ${currentTab === 'pipeline' ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}>
                            <Grid className="w-4 h-4" /> Pipeline
                        </Link>
                        <Link href="/painel/crm?tab=lista" className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-bold transition-all ${currentTab === 'lista' ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}>
                            <List className="w-4 h-4" /> Lista
                        </Link>
                    </div>
                )}
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

            {/* Visualizações CrmKanban / Lista */}
            {currentTab === 'pipeline' ? (
                <CrmKanban initialLeads={kanbanLeads} />
            ) : (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex-1">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-bold border-r border-slate-100 dark:border-slate-800">Nome do Lead</th>
                                    <th className="px-6 py-4 font-bold border-r border-slate-100 dark:border-slate-800">Contato</th>
                                    <th className="px-6 py-4 font-bold border-r border-slate-100 dark:border-slate-800">Imóvel de Interesse</th>
                                    <th className="px-6 py-4 font-bold border-r border-slate-100 dark:border-slate-800">Data</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kanbanLeads.length > 0 ? kanbanLeads.map((lead) => (
                                    <tr key={lead.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">{lead.name}</td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                            {lead.phone_whatsapp && <div className="text-sm">{lead.phone_whatsapp}</div>}
                                            {lead.email && <div className="text-xs">{lead.email}</div>}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                            {lead.property_title || <span className="text-slate-400 italic">Nenhum vínculo</span>}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                                            {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                            <span className={`px-2.5 py-1 rounded-full ${lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                                                lead.status === 'contacted' ? 'bg-amber-100 text-amber-700' :
                                                    lead.status === 'negotiating' ? 'bg-purple-100 text-purple-700' :
                                                        lead.status === 'won' ? 'bg-emerald-100 text-emerald-700' :
                                                            lead.status === 'lost' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                                                }`}>
                                                {lead.status === 'new' ? 'Novo' :
                                                    lead.status === 'contacted' ? 'Contatado' :
                                                        lead.status === 'negotiating' ? 'Negociando' :
                                                            lead.status === 'won' ? 'Convertido' :
                                                                lead.status === 'lost' ? 'Perdido' : 'Desconhecido'}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Nenhum lead encontrado.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
