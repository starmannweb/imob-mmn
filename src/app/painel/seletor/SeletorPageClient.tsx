"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, UserCheck, Settings, Inbox, Users } from "lucide-react";
import { LeadRotationConfig } from "@/app/painel/meus-sites/configurar/components/LeadRotationConfig";

export function SeletorPageClient({ leads, affiliates, properties, userSettings }: any) {
    const [activeTab, setActiveTab] = useState<'manual' | 'config'>('manual');

    const updateSettings = (key: string, value: any) => {
        // Implementar atualização de settings
        console.log('Update settings:', key, value);
    };

    return (
        <div className="flex-1 flex flex-col w-full max-w-6xl pb-12">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 w-full">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Encaminhar Leads</span>
            </div>

            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 dark:bg-blue-950/50 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900">
                            <UserCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Encaminhar Leads</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-sm">
                                Gerencie o encaminhamento manual e automático de leads.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm w-fit">
                <button
                    onClick={() => setActiveTab('manual')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-bold transition-all ${
                        activeTab === 'manual' 
                            ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                    }`}
                >
                    <UserCheck className="w-4 h-4" /> Encaminhamento Manual
                </button>
                <button
                    onClick={() => setActiveTab('config')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-bold transition-all ${
                        activeTab === 'config' 
                            ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                    }`}
                >
                    <Settings className="w-4 h-4" /> Configurações de Rodízio
                </button>
            </div>

            {/* Content */}
            {activeTab === 'manual' ? (
                <ManualForwardingContent leads={leads} affiliates={affiliates} properties={properties} />
            ) : (
                <LeadRotationConfig settings={userSettings} updateSettings={updateSettings} />
            )}
        </div>
    );
}

function ManualForwardingContent({ leads, affiliates, properties }: any) {
    return (
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
                        <p className="text-sm text-slate-500">Leads serão exibidos aqui</p>
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
                        affiliates.map((aff: any) => (
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
    );
}
