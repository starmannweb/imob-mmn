"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Kanban, List, Grid, Plus } from "lucide-react";
import CrmKanban from "./crm-kanban";
import AddDealModal from "./AddDealModal";

interface CrmPageClientProps {
    kanbanLeads: any[];
    currentTab: string;
}

export default function CrmPageClient({ kanbanLeads, currentTab }: CrmPageClientProps) {
    const [showAddDealModal, setShowAddDealModal] = useState(false);

    return (
        <>
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

                    <div className="flex items-center gap-3">
                        {/* Botão Adicionar Negócio */}
                        <button
                            onClick={() => setShowAddDealModal(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Negócio
                        </button>

                        {/* Toggle Pipeline / Lista */}
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
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                    {[
                        { label: 'Novos', count: kanbanLeads.filter(l => l.stage === 'contact').length, color: 'blue' },
                        { label: 'Contatados', count: kanbanLeads.filter(l => l.stage === 'service').length, color: 'amber' },
                        { label: 'Negociando', count: kanbanLeads.filter(l => ['visit', 'proposal'].includes(l.stage)).length, color: 'purple' },
                        { label: 'Convertidos', count: kanbanLeads.filter(l => l.stage === 'signature').length, color: 'emerald' },
                        { label: 'Perdidos', count: kanbanLeads.filter(l => l.stage === 'lost').length, color: 'red' },
                    ].map(kpi => (
                        <div key={kpi.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-center">
                            <span className={`text-2xl font-black text-${kpi.color}-600 dark:text-${kpi.color}-400`}>{kpi.count}</span>
                            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">{kpi.label}</p>
                        </div>
                    ))}
                </div>

                {/* Visualizações CrmKanban / Lista */}
                {currentTab === 'pipeline' ? (
                    <CrmKanban initialDeals={kanbanLeads} />
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
                                            <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">{lead.lead_name}</td>
                                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                                {lead.phone && <div className="text-sm">{lead.phone}</div>}
                                                {lead.email && <div className="text-xs">{lead.email}</div>}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                                {lead.property_title || <span className="text-slate-400 italic">Nenhum vínculo</span>}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                                                {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                                            </td>
                                            <td className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                                                <span className={`px-2.5 py-1 rounded-full ${lead.stage === 'contact' ? 'bg-blue-100 text-blue-700' :
                                                    lead.stage === 'service' ? 'bg-amber-100 text-amber-700' :
                                                        ['visit', 'proposal'].includes(lead.stage) ? 'bg-purple-100 text-purple-700' :
                                                            lead.stage === 'signature' ? 'bg-emerald-100 text-emerald-700' :
                                                                lead.stage === 'lost' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    {lead.stage === 'contact' ? 'Novo' :
                                                        lead.stage === 'service' ? 'Contatado' :
                                                            ['visit', 'proposal'].includes(lead.stage) ? 'Negociando' :
                                                                lead.stage === 'signature' ? 'Convertido' :
                                                                    lead.stage === 'lost' ? 'Perdido' : 'Desconhecido'}
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

            {/* Modal Adicionar Negócio */}
            <AddDealModal 
                isOpen={showAddDealModal} 
                onClose={() => setShowAddDealModal(false)} 
            />
        </>
    );
}
