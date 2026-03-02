export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ChevronRight, UserCheck, ArrowRight, Search, Users, Inbox } from "lucide-react";

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
        .order("full_name", { ascending: true });

    return (
        <div className="flex-1 flex flex-col w-full max-w-6xl pb-12">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 w-full">
                <span className="font-semibold text-slate-600 dark:text-slate-300">ADigital Afiliação</span>
                <ChevronRight className="w-3 h-3" />
                <span>Encaminhar Leads</span>
            </div>

            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 dark:bg-blue-950/50 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900">
                            <UserCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Encaminhar Leads</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-sm">
                                Escolha manualmente para qual afiliado cada lead será encaminhado.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Leads para encaminhar */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Inbox className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Leads Novos</h2>
                        <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-0.5 rounded-full">
                            {leads?.length || 0}
                        </span>
                    </div>

                    <div className="space-y-2">
                        {(!leads || leads.length === 0) ? (
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center">
                                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-3">
                                    <Inbox className="w-6 h-6 text-slate-300 dark:text-slate-500" />
                                </div>
                                <p className="text-base font-bold text-slate-500 dark:text-slate-400">Nenhum lead novo para encaminhar</p>
                                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Quando novos leads chegarem, eles aparecerão aqui.</p>
                            </div>
                        ) : (
                            leads.map((lead) => (
                                <div key={lead.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:shadow-md transition-shadow group">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{lead.name}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                {lead.phone_whatsapp} {lead.email && `• ${lead.email}`}
                                            </p>
                                            {lead.property?.title && (
                                                <p className="text-xs text-blue-600 dark:text-blue-400 italic mt-1">⌂ {lead.property.title}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <select
                                                className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs text-slate-700 dark:text-slate-200 rounded-lg px-3 py-2 font-medium focus:ring-2 focus:ring-blue-500/30"
                                                defaultValue=""
                                            >
                                                <option value="" disabled>Selecionar afiliado...</option>
                                                {affiliates?.map(aff => (
                                                    <option key={aff.id} value={aff.id}>
                                                        {aff.full_name || aff.id.substring(0, 8)}
                                                    </option>
                                                ))}
                                            </select>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Afiliados */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Seus Afiliados</h2>
                        <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full">
                            {affiliates?.length || 0}
                        </span>
                    </div>

                    <div className="space-y-2">
                        {(!affiliates || affiliates.length === 0) ? (
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center">
                                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-3">
                                    <Users className="w-6 h-6 text-slate-300 dark:text-slate-500" />
                                </div>
                                <p className="text-base font-bold text-slate-500 dark:text-slate-400">Nenhum afiliado na sua rede</p>
                                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Compartilhe seu link de indicação para convidar novos afiliados.</p>
                            </div>
                        ) : (
                            affiliates.map((aff) => (
                                <div key={aff.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-sm font-bold text-emerald-700 dark:text-emerald-300">
                                            {(aff.full_name || "?").substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{aff.full_name || "Sem nome"}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {aff.plan_status === 'active' ? '● Ativo' : aff.plan_status === 'trial' ? '◐ Trial' : '○ Inativo'}
                                                {aff.creci && ` • CRECI ${aff.creci}`}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${aff.plan_status === 'active' ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                                        {aff.plan_status === 'active' ? 'Ativo' : aff.plan_status === 'trial' ? 'Trial' : 'Inativo'}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
