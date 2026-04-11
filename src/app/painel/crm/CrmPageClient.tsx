"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronRight, Kanban, List, Grid, Plus, Search, Filter,
    TrendingUp, Users, Clock, Target, CheckCircle2, XCircle,
    ArrowUpRight, Inbox, UserPlus, Copy, Check, X
} from "lucide-react";
import CrmKanban from "./crm-kanban";
import AddDealModal from "./AddDealModal";

interface CrmPageClientProps {
    kanbanLeads: any[];
    currentTab: string;
    inviteLink: string;
}

const STAGE_META: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    contact:       { label: "Novo",       color: "text-blue-700",    bg: "bg-blue-100",    dot: "bg-blue-500" },
    service:       { label: "Contatado",  color: "text-amber-700",   bg: "bg-amber-100",   dot: "bg-amber-500" },
    visit:         { label: "Visita",     color: "text-purple-700",  bg: "bg-purple-100",  dot: "bg-purple-500" },
    proposal:      { label: "Proposta",   color: "text-indigo-700",  bg: "bg-indigo-100",  dot: "bg-indigo-500" },
    reservation:   { label: "Reserva",   color: "text-rose-700",    bg: "bg-rose-100",    dot: "bg-rose-500" },
    documentation: { label: "Docs",      color: "text-slate-700",   bg: "bg-slate-100",   dot: "bg-slate-500" },
    signature:     { label: "Convertido",color: "text-emerald-700", bg: "bg-emerald-100", dot: "bg-emerald-500" },
    lost:          { label: "Perdido",    color: "text-red-700",     bg: "bg-red-100",     dot: "bg-red-500" },
};

export default function CrmPageClient({ kanbanLeads, currentTab, inviteLink }: CrmPageClientProps) {
    const [showAddDealModal, setShowAddDealModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);
    const [search, setSearch] = useState("");

    const handleCopyInvite = () => {
        navigator.clipboard.writeText(inviteLink);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2500);
    };

    const novos      = kanbanLeads.filter(l => l.stage === "contact").length;
    const contatados = kanbanLeads.filter(l => l.stage === "service").length;
    const negociando = kanbanLeads.filter(l => ["visit", "proposal", "reservation", "documentation"].includes(l.stage)).length;
    const convertidos= kanbanLeads.filter(l => l.stage === "signature").length;
    const perdidos   = kanbanLeads.filter(l => l.stage === "lost").length;
    const total      = kanbanLeads.length;

    const conversionRate = total > 0 ? Math.round((convertidos / total) * 100) : 0;

    const filteredLeads = kanbanLeads.filter(l =>
        !search ||
        l.lead_name?.toLowerCase().includes(search.toLowerCase()) ||
        l.property_title?.toLowerCase().includes(search.toLowerCase()) ||
        l.phone?.includes(search) ||
        l.email?.toLowerCase().includes(search.toLowerCase())
    );

    const KPI_CARDS = [
        { label: "Total de Leads",  value: total,       icon: <Users className="w-5 h-5" />,        color: "blue",    change: null },
        { label: "Novos",           value: novos,       icon: <Inbox className="w-5 h-5" />,         color: "indigo",  change: null },
        { label: "Em Negociação",   value: negociando,  icon: <TrendingUp className="w-5 h-5" />,    color: "purple",  change: null },
        { label: "Convertidos",     value: convertidos, icon: <CheckCircle2 className="w-5 h-5" />,  color: "emerald", change: null },
        { label: "Perdidos",        value: perdidos,    icon: <XCircle className="w-5 h-5" />,       color: "red",     change: null },
        { label: "Taxa de Conversão", value: `${conversionRate}%`, icon: <Target className="w-5 h-5" />, color: "amber", change: null },
    ];

    const colorMap: Record<string, string> = {
        blue:    "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/40",
        indigo:  "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/40",
        purple:  "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/40",
        emerald: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40",
        red:     "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/40",
        amber:   "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/40",
    };

    return (
        <>
            <div className="flex-1 flex flex-col w-full max-w-[1600px] pb-12">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                    <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>CRM</span>
                </div>

                {/* ── Header ── */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Kanban className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">CRM — Gestão de Leads</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Acompanhe leads e negociações em tempo real</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowInviteModal(true)}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all hover:shadow-sm"
                        >
                            <UserPlus className="w-4 h-4 text-indigo-500" /> Convidar Afiliado
                        </button>
                        <button
                            onClick={() => setShowAddDealModal(true)}
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-emerald-500/20 flex items-center gap-2 transition-all"
                        >
                            <Plus className="w-4 h-4" /> Novo Negócio
                        </button>

                        {/* Toggle Pipeline / Lista */}
                        <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <Link
                                href="/painel/crm?tab=pipeline"
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${currentTab === "pipeline" ? "bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-slate-400"}`}
                            >
                                <Grid className="w-4 h-4" /> Pipeline
                            </Link>
                            <Link
                                href="/painel/crm?tab=lista"
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${currentTab === "lista" ? "bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-slate-400"}`}
                            >
                                <List className="w-4 h-4" /> Lista
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── KPIs ── */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
                    {KPI_CARDS.map(kpi => (
                        <div key={kpi.label} className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex flex-col gap-2 hover:shadow-md transition-shadow`}>
                            <div className="flex items-center justify-between">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${colorMap[kpi.color]}`}>
                                    {kpi.icon}
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">{kpi.value}</p>
                                <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">{kpi.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Search + Filtros ── */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Buscar por cliente ou imóvel..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <Filter className="w-4 h-4" /> Filtros
                    </button>
                    {total > 0 && (
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                            {filteredLeads.length} de {total} leads
                        </span>
                    )}
                </div>

                {/* ── Content ── */}
                {currentTab === "pipeline" ? (
                    <CrmKanban initialDeals={search ? filteredLeads : kanbanLeads} />
                ) : (
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden flex-1">
                        {filteredLeads.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-4">
                                    <Users className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                                    {search ? "Nenhum lead encontrado" : "Nenhum lead cadastrado"}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">
                                    {search
                                        ? `Nenhum resultado para "${search}". Tente outra busca.`
                                        : "Comece adicionando seu primeiro lead para acompanhar suas negociações."}
                                </p>
                                {!search && (
                                    <button
                                        onClick={() => setShowAddDealModal(true)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" /> Adicionar primeiro lead
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4 font-bold">Lead</th>
                                            <th className="px-6 py-4 font-bold">Contato</th>
                                            <th className="px-6 py-4 font-bold">Imóvel de interesse</th>
                                            <th className="px-6 py-4 font-bold">Data</th>
                                            <th className="px-6 py-4 font-bold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                        {filteredLeads.map(lead => {
                                            const meta = STAGE_META[lead.stage] || STAGE_META.contact;
                                            return (
                                                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                                                {(lead.lead_name || "?").charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{lead.lead_name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="space-y-0.5">
                                                            {lead.phone && <div className="text-sm text-slate-600 dark:text-slate-300">{lead.phone}</div>}
                                                            {lead.email && <div className="text-xs text-slate-400">{lead.email}</div>}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 max-w-[200px] truncate">
                                                        {lead.property_title || <span className="text-slate-400 dark:text-slate-500 italic text-xs">Sem imóvel vinculado</span>}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-3 h-3" />
                                                            {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${meta.bg} ${meta.color}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                                                            {meta.label}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <AddDealModal
                isOpen={showAddDealModal}
                onClose={() => setShowAddDealModal(false)}
            />

            {/* Invite Affiliate Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                                    <UserPlus className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Convidar Corretor Afiliado</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Compartilhe seu link de indicação</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                <X className="w-4 h-4 text-slate-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Envie este link para corretores que deseja convidar para sua rede de afiliados.
                                Quando se cadastrarem, eles entrarão automaticamente na sua rede.
                            </p>

                            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-3 flex items-center gap-3">
                                <span className="text-xs text-slate-600 dark:text-slate-300 flex-1 truncate font-mono">{inviteLink}</span>
                                <button
                                    onClick={handleCopyInvite}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                                        linkCopied
                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                                    }`}
                                >
                                    {linkCopied ? <><Check className="w-3.5 h-3.5" /> Copiado!</> : <><Copy className="w-3.5 h-3.5" /> Copiar</>}
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-1">
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(`Olá! Te convido para fazer parte da minha rede de corretores afiliados. Acesse: ${inviteLink}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
                                >
                                    Enviar por WhatsApp
                                </a>
                                <a
                                    href="/painel/rede"
                                    className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
                                >
                                    Ver Minha Rede
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
