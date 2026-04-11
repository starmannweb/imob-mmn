"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import {
    Users, Search, Filter, Calendar, Phone, Mail,
    MapPin, Plus, Eye, Edit, Trash2, ChevronRight,
    Clock, Cake, MessageSquare, X, ChevronDown, ChevronUp,
    RefreshCw
} from "lucide-react";
import Link from "next/link";

type ClientTypeFilter = "buyer" | "seller" | "renter" | "owner";
type BirthdayFilter = "" | "today" | "week" | "month";
type InteractionFilter = "" | "7d" | "15d" | "30d" | "60d" | "never";
type RegisterFilter = "" | "7d" | "30d" | "90d" | "custom";

const CLIENT_TYPES: { value: ClientTypeFilter; label: string }[] = [
    { value: "buyer", label: "Comprador" },
    { value: "seller", label: "Vendedor" },
    { value: "renter", label: "Locatário" },
    { value: "owner", label: "Proprietário" },
];

function isBirthdayToday(birthDate: string) {
    const today = new Date();
    const b = new Date(birthDate);
    return today.getMonth() === b.getMonth() && today.getDate() === b.getDate();
}
function isBirthdayThisWeek(birthDate: string) {
    const today = new Date();
    const b = new Date(birthDate);
    const start = new Date(today); start.setDate(today.getDate() - today.getDay());
    const end = new Date(start); end.setDate(start.getDate() + 6);
    const bThisYear = new Date(today.getFullYear(), b.getMonth(), b.getDate());
    return bThisYear >= start && bThisYear <= end;
}
function isBirthdayThisMonth(birthDate: string) {
    const today = new Date();
    const b = new Date(birthDate);
    return today.getMonth() === b.getMonth();
}
function daysSince(dateStr: string) {
    return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
}

export default function ClientesPage() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
    const [filterTypes, setFilterTypes] = useState<ClientTypeFilter[]>([]);
    const [birthdayFilter, setBirthdayFilter] = useState<BirthdayFilter>("");
    const [interactionFilter, setInteractionFilter] = useState<InteractionFilter>("");
    const [registerFilter, setRegisterFilter] = useState<RegisterFilter>("");
    const [registerFrom, setRegisterFrom] = useState("");
    const [registerTo, setRegisterTo] = useState("");
    const [openSections, setOpenSections] = useState({ status: true, tipo: true, aniversario: true, interacao: true, cadastro: false });

    const supabase = createClient();

    useEffect(() => { fetchClients(); }, []);

    const fetchClients = async () => {
        setLoading(true);
        const { data } = await supabase
            .from("leads")
            .select("*")
            .order("created_at", { ascending: false });
        if (data) setClients(data);
        setLoading(false);
    };

    const toggleType = (t: ClientTypeFilter) =>
        setFilterTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

    const clearFilters = () => {
        setSearchTerm("");
        setFilterStatus("all");
        setFilterTypes([]);
        setBirthdayFilter("");
        setInteractionFilter("");
        setRegisterFilter("");
        setRegisterFrom("");
        setRegisterTo("");
    };

    const hasActiveFilters = searchTerm || filterStatus !== "all" || filterTypes.length > 0 ||
        birthdayFilter || interactionFilter || registerFilter;

    const filteredClients = useMemo(() => clients.filter(c => {
        if (searchTerm) {
            const s = searchTerm.toLowerCase();
            if (!c.lead_name?.toLowerCase().includes(s) && !c.phone?.includes(searchTerm) && !c.email?.toLowerCase().includes(s))
                return false;
        }
        if (filterStatus === "active" && !c.is_active) return false;
        if (filterStatus === "inactive" && c.is_active) return false;
        if (filterTypes.length > 0 && !filterTypes.includes(c.client_type)) return false;
        if (birthdayFilter && c.birth_date) {
            if (birthdayFilter === "today" && !isBirthdayToday(c.birth_date)) return false;
            if (birthdayFilter === "week" && !isBirthdayThisWeek(c.birth_date)) return false;
            if (birthdayFilter === "month" && !isBirthdayThisMonth(c.birth_date)) return false;
        } else if (birthdayFilter) {
            return false; // has filter but no birth_date
        }
        if (interactionFilter && c.last_interaction) {
            const days = daysSince(c.last_interaction);
            if (interactionFilter === "7d" && days > 7) return false;
            if (interactionFilter === "15d" && days > 15) return false;
            if (interactionFilter === "30d" && days > 30) return false;
            if (interactionFilter === "60d" && days > 60) return false;
        } else if (interactionFilter === "never" && c.last_interaction) {
            return false;
        }
        if (registerFilter === "7d" && daysSince(c.created_at) > 7) return false;
        if (registerFilter === "30d" && daysSince(c.created_at) > 30) return false;
        if (registerFilter === "90d" && daysSince(c.created_at) > 90) return false;
        if (registerFilter === "custom") {
            if (registerFrom && new Date(c.created_at) < new Date(registerFrom)) return false;
            if (registerTo && new Date(c.created_at) > new Date(registerTo + "T23:59:59")) return false;
        }
        return true;
    }), [clients, searchTerm, filterStatus, filterTypes, birthdayFilter, interactionFilter, registerFilter, registerFrom, registerTo]);

    const birthdayToday = clients.filter(c => c.birth_date && isBirthdayToday(c.birth_date));
    const birthdayWeek = clients.filter(c => c.birth_date && isBirthdayThisWeek(c.birth_date));
    const recentInteraction = clients.filter(c => c.last_interaction && daysSince(c.last_interaction) <= 7);
    const scheduledVisits = clients.filter(c => c.has_scheduled_visit);

    const toggleSection = (s: keyof typeof openSections) =>
        setOpenSections(p => ({ ...p, [s]: !p[s] }));

    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl pb-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Meus Clientes</span>
            </div>

            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-50 dark:bg-blue-950/50 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900">
                        <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Meus Clientes</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-sm">Gerencie seus clientes e leads cadastrados</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={fetchClients} className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <Link href="/painel/leads?new=true" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                        <Plus className="w-4 h-4" /> Novo Cliente
                    </Link>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* ── Sidebar de Filtros ── */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm sticky top-24">
                        {/* Sidebar header */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                            <h2 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 text-sm">
                                <Filter className="w-4 h-4" /> Filtrar Clientes
                            </h2>
                            {hasActiveFilters && (
                                <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 transition-colors">
                                    <X className="w-3 h-3" /> Limpar
                                </button>
                            )}
                        </div>

                        <div className="p-3 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                            {/* Busca */}
                            <div className="pb-3 border-b border-slate-100 dark:border-slate-700">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Nome, telefone, e-mail..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                    {searchTerm && (
                                        <button onClick={() => setSearchTerm("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                            <X className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Status */}
                            <FilterSection label="Status" open={openSections.status} toggle={() => toggleSection("status")}>
                                {(["all", "active", "inactive"] as const).map(s => (
                                    <button key={s} onClick={() => setFilterStatus(s)}
                                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                            filterStatus === s
                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                        }`}>
                                        {s === "all" ? "Todos" : s === "active" ? "Ativos" : "Inativos"}
                                    </button>
                                ))}
                            </FilterSection>

                            {/* Tipo */}
                            <FilterSection label="Tipo de Cliente" open={openSections.tipo} toggle={() => toggleSection("tipo")}>
                                {CLIENT_TYPES.map(t => (
                                    <label key={t.value} className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={filterTypes.includes(t.value)}
                                            onChange={() => toggleType(t.value)}
                                            className="w-3.5 h-3.5 accent-blue-600"
                                        />
                                        <span className="text-xs text-slate-700 dark:text-slate-300">{t.label}</span>
                                    </label>
                                ))}
                            </FilterSection>

                            {/* Aniversário */}
                            <FilterSection label="Aniversariantes" open={openSections.aniversario} toggle={() => toggleSection("aniversario")}>
                                <div className="px-1 mb-1.5">
                                    <div className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg px-2 py-1.5">
                                        <Cake className="w-3 h-3 flex-shrink-0" />
                                        <span>{birthdayToday.length} aniversariante(s) hoje</span>
                                    </div>
                                </div>
                                {[
                                    { value: "", label: "Todos" },
                                    { value: "today", label: `Aniversário hoje (${birthdayToday.length})` },
                                    { value: "week", label: `Esta semana (${birthdayWeek.length})` },
                                    { value: "month", label: "Este mês" },
                                ].map(opt => (
                                    <button key={opt.value} onClick={() => setBirthdayFilter(opt.value as BirthdayFilter)}
                                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                            birthdayFilter === opt.value
                                                ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-semibold"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                        }`}>
                                        {opt.label}
                                    </button>
                                ))}
                            </FilterSection>

                            {/* Última interação */}
                            <FilterSection label="Última Interação" open={openSections.interacao} toggle={() => toggleSection("interacao")}>
                                {[
                                    { value: "", label: "Qualquer data" },
                                    { value: "7d", label: "Últimos 7 dias" },
                                    { value: "15d", label: "Últimos 15 dias" },
                                    { value: "30d", label: "Últimos 30 dias" },
                                    { value: "60d", label: "Últimos 60 dias" },
                                    { value: "never", label: "Sem interação" },
                                ].map(opt => (
                                    <button key={opt.value} onClick={() => setInteractionFilter(opt.value as InteractionFilter)}
                                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                            interactionFilter === opt.value
                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                        }`}>
                                        {opt.label}
                                    </button>
                                ))}
                            </FilterSection>

                            {/* Data de Cadastro */}
                            <FilterSection label="Data de Cadastro" open={openSections.cadastro} toggle={() => toggleSection("cadastro")}>
                                {[
                                    { value: "", label: "Qualquer período" },
                                    { value: "7d", label: "Últimos 7 dias" },
                                    { value: "30d", label: "Últimos 30 dias" },
                                    { value: "90d", label: "Últimos 90 dias" },
                                    { value: "custom", label: "Período personalizado" },
                                ].map(opt => (
                                    <button key={opt.value} onClick={() => setRegisterFilter(opt.value as RegisterFilter)}
                                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                            registerFilter === opt.value
                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                        }`}>
                                        {opt.label}
                                    </button>
                                ))}
                                {registerFilter === "custom" && (
                                    <div className="px-1 space-y-1.5 mt-1">
                                        <input type="date" value={registerFrom} onChange={e => setRegisterFrom(e.target.value)}
                                            className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
                                        <input type="date" value={registerTo} onChange={e => setRegisterTo(e.target.value)}
                                            className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                )}
                            </FilterSection>
                        </div>

                        {hasActiveFilters && (
                            <div className="p-3 border-t border-slate-100 dark:border-slate-700">
                                <button onClick={clearFilters} className="w-full py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-1.5">
                                    <X className="w-3.5 h-3.5" /> Limpar Filtro
                                </button>
                            </div>
                        )}
                    </div>
                </aside>

                {/* ── Main Content ── */}
                <main className="flex-1 min-w-0 space-y-5">
                    {/* Summary cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <SummaryCard
                            icon={<Calendar className="w-4 h-4 text-blue-600" />}
                            bg="bg-blue-50 dark:bg-blue-900/20"
                            count={scheduledVisits.length}
                            label="Visitas Agendadas"
                            onClick={() => {}}
                        />
                        <SummaryCard
                            icon={<Clock className="w-4 h-4 text-emerald-600" />}
                            bg="bg-emerald-50 dark:bg-emerald-900/20"
                            count={recentInteraction.length}
                            label="Interações Recentes"
                            onClick={() => setInteractionFilter("7d")}
                        />
                        <SummaryCard
                            icon={<Cake className="w-4 h-4 text-purple-600" />}
                            bg="bg-purple-50 dark:bg-purple-900/20"
                            count={birthdayWeek.length}
                            label="Aniversários Semana"
                            onClick={() => setBirthdayFilter("week")}
                            highlight={birthdayToday.length > 0}
                        />
                        <SummaryCard
                            icon={<Users className="w-4 h-4 text-slate-600" />}
                            bg="bg-slate-50 dark:bg-slate-800"
                            count={clients.length}
                            label="Total de Clientes"
                            onClick={() => {}}
                        />
                    </div>

                    {/* Birthday alert */}
                    {birthdayToday.length > 0 && (
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-3 flex items-start gap-3">
                            <Cake className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                                    {birthdayToday.length === 1 ? "1 aniversariante hoje!" : `${birthdayToday.length} aniversariantes hoje!`}
                                </p>
                                <p className="text-xs text-purple-600 dark:text-purple-400 mt-0.5">
                                    {birthdayToday.map(c => c.lead_name).join(", ")}
                                </p>
                            </div>
                            <button onClick={() => setBirthdayFilter("today")} className="ml-auto text-xs text-purple-600 hover:underline font-semibold whitespace-nowrap">
                                Ver todos
                            </button>
                        </div>
                    )}

                    {/* Client list */}
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                            <h2 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                                Lista de Clientes
                                <span className="ml-2 text-xs font-normal text-slate-500">
                                    {filteredClients.length} de {clients.length}
                                </span>
                            </h2>
                            {hasActiveFilters && (
                                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-semibold">
                                    Filtros ativos
                                </span>
                            )}
                        </div>

                        {loading ? (
                            <div className="p-12 text-center text-slate-500 text-sm">Carregando clientes...</div>
                        ) : filteredClients.length === 0 ? (
                            <div className="p-12 text-center">
                                <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                                <p className="text-slate-500 dark:text-slate-400 font-medium">Nenhum cliente encontrado</p>
                                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Ajuste os filtros ou cadastre um novo cliente</p>
                                {hasActiveFilters && (
                                    <button onClick={clearFilters} className="mt-3 text-sm text-blue-600 hover:underline">
                                        Limpar filtros
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100 dark:divide-slate-700">
                                {filteredClients.map(client => {
                                    const isToday = client.birth_date && isBirthdayToday(client.birth_date);
                                    return (
                                        <div key={client.id} className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${isToday ? "bg-purple-50/40 dark:bg-purple-900/10" : ""}`}>
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-3 flex-1">
                                                    <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs flex-shrink-0 relative">
                                                        {client.lead_name?.substring(0, 2).toUpperCase() || "??"}
                                                        {isToday && (
                                                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center text-white text-[8px]">🎂</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h3 className="font-bold text-slate-900 dark:text-white text-sm">{client.lead_name || "Sem nome"}</h3>
                                                            {client.client_type && (
                                                                <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded font-medium">
                                                                    {CLIENT_TYPES.find(t => t.value === client.client_type)?.label || client.client_type}
                                                                </span>
                                                            )}
                                                            {isToday && (
                                                                <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded font-semibold">
                                                                    Aniversário hoje!
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                            {client.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {client.phone}</span>}
                                                            {client.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {client.email}</span>}
                                                            {client.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {client.city}</span>}
                                                            {client.last_interaction && (
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    Interação há {daysSince(client.last_interaction)}d
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    <Link href={`/painel/leads/${client.id}`} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </Link>
                                                    <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

function FilterSection({ label, open, toggle, children }: { label: string; open: boolean; toggle: () => void; children: React.ReactNode }) {
    return (
        <div className="border-b border-slate-100 dark:border-slate-700 last:border-0">
            <button onClick={toggle} className="w-full flex items-center justify-between py-2.5 px-1 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide hover:text-blue-600 transition-colors">
                {label}
                {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {open && <div className="pb-2 space-y-0.5">{children}</div>}
        </div>
    );
}

function SummaryCard({ icon, bg, count, label, onClick, highlight }: {
    icon: React.ReactNode; bg: string; count: number; label: string; onClick: () => void; highlight?: boolean;
}) {
    return (
        <button onClick={onClick} className={`${bg} border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-xl p-3.5 text-left transition-all hover:shadow-sm ${highlight ? "ring-2 ring-purple-400 ring-offset-1" : ""}`}>
            <div className="flex items-center justify-between mb-1.5">
                {icon}
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{count}</span>
            </div>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</p>
        </button>
    );
}
