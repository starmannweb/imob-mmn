export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { Building2, Users, MessageSquare, TrendingUp, Home, DollarSign, ListTodo, Activity, ChevronRight } from "lucide-react";

export default async function PainelPage() {
    const supabase = await createClient();

    // Podemos buscar dados reais aqui futuramente
    // const { data: properties } = await supabase.from('properties').select('*');

    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl pb-16">

            {/* Breadcrumb pseudo */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 w-full">
                <span className="font-semibold text-slate-600 dark:text-slate-300">ADigital Afiliação</span>
                <ChevronRight className="w-3 h-3" />
                <span>Painel de Controle</span>
            </div>

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Painel de Controle</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Visão geral das suas métricas e atividades</p>
            </div>

            {/* Top 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Total de Imóveis</span>
                        <Building2 className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-white">1</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">1 disponíveis</p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Total de Leads</span>
                        <Users className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-white">0</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">0 novos leads</p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Mensagens</span>
                        <MessageSquare className="w-4 h-4 text-purple-500" />
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-white">0</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">0 recebidas</p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Taxa de Conversão</span>
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-white">0%</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">0 leads convertidos</p>
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

        </div>
    );
}
