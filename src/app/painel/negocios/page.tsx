export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { Search, Plus, Home, Key, MoreHorizontal, Calendar, User, DollarSign, Filter, Grid, List, Users, Target } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const KANBAN_COLUMNS = [
    { id: 'novo', title: 'Novas Locações/Vendas', color: 'bg-blue-500', bgColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' },
    { id: 'atendimento', title: 'Visita Agendada', color: 'bg-amber-500', bgColor: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' },
    { id: 'negociacao', title: 'Em Proposta', color: 'bg-purple-500', bgColor: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' },
    { id: 'fechado', title: 'Contrato/Fechado', color: 'bg-cyan-500', bgColor: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400' }
];

const DUMMY_DEALS = [
    { id: 1, title: 'Apartamento Reserva', client: 'João Silva', value: 'R$ 450.000', column: 'novo', date: 'Hoje', initials: 'JS' },
    { id: 2, title: 'Casa no Alphaville', client: 'Marina Costa', value: 'R$ 1.200.000', column: 'atendimento', date: '2 dias atrás', initials: 'MC' },
    { id: 3, title: 'Cobertura Duplex 302', client: 'Carlos Machado', value: 'R$ 2.850.000', column: 'negociacao', date: '4 dias atrás', initials: 'CM' },
    { id: 4, title: 'Terreno Cond. Fechado', client: 'Ana Beatriz', value: 'R$ 320.000', column: 'fechado', date: 'Semana passada', initials: 'AB' },
    { id: 5, title: 'Studio Central', client: 'Roberto Nogueira', value: 'R$ 190.000', column: 'novo', date: 'Ontem', initials: 'RN' },
];

export default async function NegociosPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const sp = await searchParams;
    const currentTab = sp.tab || 'vendas';

    return (
        <div className="flex-1 flex flex-col w-full h-[calc(100vh-80px)] overflow-hidden bg-[#f8fafc] dark:bg-[#0f1522] -m-4 sm:-m-8 p-4 sm:p-8">
            {/* Header / Titulo */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                    <Link href="/painel" className="hover:text-blue-600 transition-colors">Vendas e Locações</Link>
                </div>
                <h1 className="text-2xl font-extrabold text-blue-500 flex items-center gap-2">
                    Vendas e Locações 🤝
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
                    Acompanhe o andamento das suas negociações
                </p>
            </div>

            {/* KPI Cards (Topo) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-[#1a1f2c] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex justify-between items-center group relative overflow-hidden">
                    <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total de Leads</p>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-none">{DUMMY_DEALS.length}</h2>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl text-blue-500 border border-blue-100 dark:border-blue-800/50">
                        <Users className="w-6 h-6" />
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1a1f2c] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex justify-between items-center group relative overflow-hidden">
                    <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Em Negociação</p>
                        <h2 className="text-3xl font-black text-emerald-500 dark:text-emerald-400 leading-none">{DUMMY_DEALS.filter(d => d.column === 'negociacao' || d.column === 'fechado').length}</h2>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-xl text-emerald-500 border border-emerald-100 dark:border-emerald-800/50">
                        <Target className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Toggle Pipilene / Lista */}
            <div className="flex bg-white dark:bg-slate-800 p-1 mb-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm w-fit">
                <Link href="/painel/negocios?tab=pipeline" className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-bold transition-all ${currentTab === 'pipeline' || currentTab === 'vendas' ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}>
                    <Grid className="w-4 h-4" /> Pipeline
                </Link>
                <Link href="/painel/negocios?tab=lista" className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-bold transition-all ${currentTab === 'lista' ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}>
                    <List className="w-4 h-4" /> Lista
                </Link>
                <Link href="/painel/cartas-contempladas" className="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-bold transition-all text-slate-500 hover:text-slate-700 dark:text-slate-400">
                    <span className="w-4 h-4 text-green-500 flex items-center justify-center">📄</span> Cartas Contempladas
                </Link>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4 snap-x">
                <div className="flex gap-5 h-full min-w-max px-1">
                    {KANBAN_COLUMNS.map(col => {
                        const colDeals = DUMMY_DEALS.filter(d => d.column === col.id);
                        return (
                            <div key={col.id} className="w-[320px] sm:w-[340px] bg-slate-100/80 dark:bg-slate-800/40 rounded-2xl flex flex-col border border-slate-200/60 dark:border-slate-700/50 snap-start flex-shrink-0 max-h-full">
                                {/* Column Header */}
                                <div className="p-4 flex items-center justify-between font-medium">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-3 h-3 rounded-full ${col.color} shadow-sm`} />
                                        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">{col.title}</h3>
                                        <span className={`text-xs ml-1 font-bold px-2 py-0.5 rounded-full bg-slate-200/50 text-slate-600 dark:bg-slate-700 dark:text-slate-300`}>
                                            {colDeals.length}
                                        </span>
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="px-4 pb-4 border-b border-slate-200/80 dark:border-slate-700/80">
                                    <div className="bg-slate-50 dark:bg-slate-800/80 rounded-md py-1.5 px-3 flex items-center gap-2 border border-slate-100 dark:border-slate-700">
                                        <DollarSign className="w-4 h-4 text-emerald-500" />
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">R$ {
                                            colDeals.reduce((acc, d) => acc + parseInt(d.value.replace(/\D/g, '')), 0).toLocaleString('pt-BR')
                                        }</span>
                                    </div>

                                    <button className="w-full mt-3 py-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition-colors">
                                        <Plus className="w-4 h-4" /> Adicionar Lead
                                    </button>
                                </div>

                                {/* Column Body (Scrollable) */}
                                <div className="p-3 flex-1 overflow-y-auto space-y-3 custom-scrollbar bg-slate-50/50 dark:bg-[#0f1522]/50">
                                    {colDeals.length > 0 ? (
                                        colDeals.map(deal => (
                                            <div key={deal.id} className="bg-white dark:bg-slate-900/90 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/80 cursor-grab active:cursor-grabbing hover:border-blue-300 dark:hover:border-blue-700/50 hover:shadow-md transition-all group">
                                                <div className="flex justify-between items-start mb-3">
                                                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md">
                                                        <Calendar className="w-3 h-3" /> {deal.date}
                                                    </span>
                                                    <button className="text-slate-300 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <h4 className="font-extrabold text-slate-800 dark:text-slate-100 mb-2 leading-tight">
                                                    {deal.title}
                                                </h4>

                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 bg-slate-50/50 dark:bg-slate-800/50 p-1.5 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                                    <User className="w-3.5 h-3.5 text-blue-500" /> {deal.client}
                                                </div>

                                                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex justify-between items-center mt-2">
                                                    <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">
                                                        <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                                                        <span className="font-bold text-emerald-700 dark:text-emerald-400 text-xs text-center w-full block">
                                                            {deal.value}
                                                        </span>
                                                    </div>
                                                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300 shadow-sm">
                                                        {deal.initials}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="h-44 border-2 border-dashed border-slate-200 dark:border-slate-700/60 rounded-xl flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-medium gap-3 bg-white/50 dark:bg-slate-800/20 py-6 px-4 text-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 mb-1">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-700 dark:text-slate-300">Nenhum lead</p>
                                                <p className="text-xs text-slate-400 mt-0.5">Adicione o primeiro lead</p>
                                            </div>
                                            <button className="text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1">
                                                <Plus className="w-3 h-3" /> Adicionar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Sugestões Inteligentes */}
            <div className="mt-8 mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-extrabold pb-8 border-b border-slate-200 dark:border-slate-800">
                <Target className="w-5 h-5" /> Sugestões Inteligentes
            </div>

            {/* Custom Scrollbar CSS for Kanban */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(148, 163, 184, 0.3);
                    border-radius: 20px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(71, 85, 105, 0.4);
                }
            `}} />
        </div>
    );
}
