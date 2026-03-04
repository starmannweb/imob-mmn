import Link from "next/link";
export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { Building2, Users, MessageSquare, TrendingUp, Home, DollarSign, ListTodo, Activity, ChevronRight, Zap, Folder, FileText, Target, LineChart, Calendar, BarChart2, Settings } from "lucide-react";
export default async function PainelPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let firstName = 'Corretor';
    if (user) {
        const { data: profile } = await supabase.from('users').select('full_name').eq('id', user.id).single();
        if (profile && profile.full_name) {
            firstName = profile.full_name.split(' ')[0];
        }
    }

    // Podemos buscar dados reais aqui futuramente
    // const { data: properties } = await supabase.from('properties').select('*');

    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl pb-16">

            {/* Header / Titulo */}
            <div className="mb-8 mt-2">
                <h1 className="text-3xl font-extrabold text-blue-500 dark:text-blue-400 flex items-center gap-2">
                    Bem-vindo de volta, {firstName}! 👋
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm font-medium">
                    Aqui está um resumo da sua atividade hoje.
                </p>
            </div>

            {/* 3 Blocos Pranchas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Ações Rápidas */}
                <div className="bg-white dark:bg-[#1a1f2c] border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-50 dark:bg-blue-900/40 p-2.5 rounded-lg text-blue-500 font-bold border border-blue-100 dark:border-blue-800/50">
                            <Zap className="w-5 h-5 fill-current" />
                        </div>
                        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-[17px]">Ações Rápidas</h3>
                    </div>
                    <p className="text-xs text-slate-400 mb-6 font-medium">Acesso rápido às principais funções</p>

                    <div className="space-y-3 mt-auto">
                        <Link href="/painel/imoveis/novo" className="flex items-center gap-3 px-4 py-3.5 bg-blue-500 hover:bg-blue-600 shadow-md shadow-blue-500/20 text-white font-bold rounded-xl transition-colors text-sm w-full">
                            <Building2 className="w-4 h-4" /> Cadastrar Imóvel
                        </Link>
                        <Link href="/painel/leads" className="flex items-center gap-3 px-4 py-3.5 bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-500 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors text-sm shadow-sm">
                            <Users className="w-4 h-4 text-slate-400" /> Gerenciar Leads
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-4 py-3.5 bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-500 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors text-sm shadow-sm">
                            <Target className="w-4 h-4 text-slate-400" /> Criar Campanha
                        </Link>
                    </div>
                </div>

                {/* Performance */}
                <div className="bg-[#f8fdfa] dark:bg-emerald-900/5 border border-emerald-100/60 dark:border-emerald-800/30 rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-emerald-100/60 dark:bg-emerald-900/40 p-2.5 rounded-lg text-emerald-500 border border-emerald-200/50 dark:border-emerald-800/50">
                            <BarChart2 className="w-5 h-5" />
                        </div>
                        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-[17px]">Performance</h3>
                    </div>
                    <p className="text-xs text-slate-400 mb-6 font-medium">Acompanhe suas metas</p>

                    <div className="space-y-7 mt-2">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200">Meta Mensal</span>
                                <span className="text-[13px] font-bold text-blue-500">0%</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
                                <div className="w-0 h-full bg-blue-500 rounded-full"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200">Conversão de Leads</span>
                                <span className="text-[13px] font-bold text-emerald-500">0%</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
                                <div className="w-0 h-full bg-emerald-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <button className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-500 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors text-sm shadow-sm">
                        <LineChart className="w-4 h-4" /> Ver Relatórios Completos
                    </button>
                </div>

                {/* Agenda Hoje */}
                <div className="bg-[#fcfaff] dark:bg-purple-900/5 border border-purple-100/60 dark:border-purple-800/30 rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-purple-100/60 dark:bg-purple-900/40 p-2.5 rounded-lg text-purple-600 border border-purple-200/50 dark:border-purple-800/50">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-[17px]">Agenda Hoje</h3>
                    </div>
                    <p className="text-xs text-slate-400 mb-auto font-medium">Seus compromissos de hoje</p>

                    <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                        <Calendar className="w-12 h-12 mb-4 opacity-40 text-slate-400" />
                        <p className="text-[13px] font-medium text-slate-400">Sem agendamentos para hoje</p>
                    </div>

                    <button className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 hover:border-purple-600 hover:text-purple-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors text-sm shadow-sm">
                        <Calendar className="w-4 h-4" /> Ver Agenda Completa
                    </button>
                </div>
            </div>

            {/* Row 2: Status Progress Bars */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Imoveis por Status */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-blue-500" />
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Imóveis por Status</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="w-full">
                            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                                <span>Disponível</span><span>1</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="w-full h-full bg-emerald-500 rounded-full"></div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                                <span>Vendido</span><span>0</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="w-0 h-full bg-slate-300 rounded-full"></div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                                <span>Alugado</span><span>0</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"></div>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                                <span>Reservado</span><span>0</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"></div>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                                <span>Pausado</span><span>0</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"></div>
                        </div>
                    </div>
                </div>

                {/* Leads por Status */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-blue-500" />
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Leads por Status</h3>
                    </div>

                    <div className="space-y-4">
                        {['Novo', 'Contatado', 'Qualificado', 'Negociando', 'Convertido', 'Perdido'].map((status) => (
                            <div key={status} className="w-full">
                                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                                    <span>{status}</span><span>0</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Row 3: Tipos e Portfolio */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Tipos */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <Home className="w-5 h-5 text-blue-500" />
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Tipos de Imóveis</h3>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="bg-slate-50 dark:bg-slate-900/50 w-full max-w-[200px] p-4 rounded-xl text-center border border-slate-100 dark:border-slate-700">
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 block">1</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block uppercase">Twostory</span>
                        </div>
                    </div>
                </div>

                {/* Portfolio Total */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <DollarSign className="w-5 h-5 text-blue-500" />
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Valor Total do Portfólio</h3>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <span className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">R$ 1.625.000,00</span>
                        <span className="text-sm text-slate-400 dark:text-slate-500 font-medium mt-2">Soma de todos os imóveis cadastrados</span>
                    </div>
                </div>
            </div>

            {/* Row 4: Recentes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Imoveis Recentes */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <Building2 className="w-5 h-5 text-blue-500" />
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Imóveis Recentes</h3>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 last:border-0 last:pb-0">
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 max-w-xs truncate">Casa Sobreposta Alta com Piscina e Churrasqueira...</h4>
                            <span className="text-xs text-slate-400 dark:text-slate-500">20 de fev. de 2026</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Disponível</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">R$ 1.625.000,00</span>
                        </div>
                    </div>
                </div>

                {/* Leads Recentes */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <Users className="w-5 h-5 text-blue-500" />
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Leads Recentes</h3>
                    </div>
                    <div className="flex-1 flex items-center justify-center text-sm text-slate-400 dark:text-slate-500 font-medium italic">
                        Nenhum lead cadastrado ainda
                    </div>
                </div>
            </div>

            {/* Row 5: Trends pseudo-chart */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-8">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Tendências Mensais (Últimos 6 Meses)</h3>
                </div>

                <div className="space-y-6">
                    {['ago. de 2025', 'set. de 2025', 'out. de 2025', 'nov. de 2025', 'dez. de 2025'].map((month, i) => (
                        <div key={i} className="flex gap-4 items-center">
                            <span className="w-24 text-xs font-bold text-slate-600 dark:text-slate-300">{month}</span>
                            <div className="flex-1 space-y-1">
                                <div className="w-full flex items-center h-2">
                                    <div className="w-[1%] h-full bg-blue-500 rounded-l-full"></div>
                                    <div className="w-[99%] h-full bg-slate-100 dark:bg-slate-700 rounded-r-full"></div>
                                </div>
                                <div className="w-full flex items-center h-2">
                                    <div className="w-0 h-full bg-emerald-500 rounded-l-full"></div>
                                    <div className="w-full h-full bg-slate-100 dark:bg-slate-700 rounded-r-full"></div>
                                </div>
                            </div>
                            <div className="w-16 flex flex-col text-[10px] text-slate-400 text-right">
                                <span className="text-blue-500 font-bold">0 imóveis</span>
                                <span className="text-emerald-500 font-bold">0 leads</span>
                            </div>
                        </div>
                    ))}
                    <div className="flex gap-4 items-center">
                        <span className="w-24 text-xs font-bold text-slate-600 dark:text-slate-300">jan. de 2026</span>
                        <div className="flex-1 space-y-1">
                            <div className="w-full flex items-center h-4">
                                <div className="w-[100%] h-full bg-blue-500 rounded-full"></div>
                            </div>
                            <div className="w-full flex items-center h-4">
                                <div className="w-[1%] h-full bg-emerald-500 rounded-l-full"></div>
                                <div className="w-[99%] h-full bg-slate-100 dark:bg-slate-700 rounded-r-full"></div>
                            </div>
                        </div>
                        <div className="w-16 flex flex-col text-[10px] text-slate-400 text-right">
                            <span className="text-blue-500 font-bold">1 imóveis</span>
                            <span className="text-emerald-500 font-bold">0 leads</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nova Seção: Analytics e Relatórios (Print 4) */}
            <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 mb-8" id="analytics">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-500 flex items-center gap-2">
                            Analytics & Relatórios <BarChart2 className="w-6 h-6 fill-current text-blue-500/20" />
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
                            Análise completa de desempenho e métricas
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-lg px-3 py-2 outline-none hover:bg-slate-50">
                            <option>Últimos 30 dias</option>
                            <option>Hoje</option>
                            <option>Este Ano</option>
                        </select>
                        <button className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-lg font-bold text-slate-600 dark:text-slate-300 gap-2 h-9 px-3 text-sm">
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 dark:border-slate-500 border-t-transparent animate-spin"></span> Atualizar
                        </button>
                        <button className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-lg font-bold text-slate-600 dark:text-slate-300 gap-2 h-9 px-3 text-sm">
                            <span className="w-4 h-4 border-b-2 border-slate-400 dark:border-slate-500 flex items-center justify-center"><span className="border-x-2 border-t-2 border-slate-400 dark:border-slate-500 w-2 h-2 -translate-y-1 block"></span></span> Exportar
                        </button>
                        <button className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-lg font-bold text-slate-600 dark:text-slate-300 gap-2 h-9 px-3 text-sm">
                            <Settings className="w-4 h-4" /> Config
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <span className="text-xs font-bold text-blue-500 animate-pulse flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span> Carregando...
                    </span>
                </div>

                <div className="space-y-4 opacity-50 pointer-events-none">
                    {/* Skeletons Top Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl flex flex-col items-center justify-center min-h-[120px]">
                                <div className="w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded-full mb-3"></div>
                                <div className="w-24 h-6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                            </div>
                        ))}
                    </div>

                    {/* Skeletons Medium Cards Grid 2x2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl min-h-[220px]">
                                <div className="w-32 h-5 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4"></div>
                                <div className="w-full h-full bg-slate-100 dark:bg-slate-900 rounded-lg"></div>
                            </div>
                        ))}
                    </div>

                    {/* ListView Skeleton */}
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl space-y-4">
                        <div className="w-24 h-6 bg-slate-200 dark:bg-slate-700 rounded-lg mb-6"></div>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col gap-2 pb-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
                                <div className="w-48 h-5 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                                <div className="w-full h-4 bg-slate-100 dark:bg-slate-900 rounded-md"></div>
                                <div className="w-24 h-6 bg-slate-200 dark:bg-slate-700 rounded-md mt-1"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
