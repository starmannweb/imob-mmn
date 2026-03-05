"use client";

import { Megaphone, Target, BarChart, TrendingUp, Filter, Plus, HandCoins, Users, MousePointerClick, RefreshCcw, ServerCog, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AnunciosPage() {
    const [isConnected, setIsConnected] = useState(false);

    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl p-4 md:p-8">
            {/* Cabecalho */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white border-b border-transparent flex items-center gap-3">
                    <span className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-200 dark:border-blue-800">
                        <Megaphone className="w-6 h-6" />
                    </span>
                    Anúncios Meta Ads
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">Gestão de tráfego pago, campanhas de captação de leads e visualização de ROI unificada.</p>
            </div>

            {!isConnected ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-16 animate-in fade-in slide-in-from-bottom-4">
                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 relative border border-blue-100 dark:border-blue-800">
                        <Target className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700">
                            <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-200 mb-3 tracking-tight">Conecte sua conta do Facebook</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-lg mb-8 text-sm leading-relaxed">
                        Para visualizar o custo de campanhas, receber Leads de forma automática (Webhook Leads Ads) no seu CRM e monitorar o ROI dos anúncios de imóveis, vincule seu Gerenciador de Anúncios.
                    </p>

                    <button
                        onClick={() => setIsConnected(true)}
                        className="bg-[#1877F2] hover:bg-[#166fe5] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-3 w-full sm:w-auto justify-center"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        Continuar com Facebook
                    </button>

                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 w-full text-left">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">O que ganhamos com essa integração?</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Leads caem imediatamente no seu Funil Kanban como 'Nova Oportunidade'.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Cálculo de CAC (Custo de Aquisição por Cliente) para saber seu Lucro.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    {/* Header de Status de Conexão */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-12 h-12 bg-blue-100/50 dark:bg-slate-800 rounded-full flex items-center justify-center p-2 relative shrink-0">
                                <img src="https://ui-avatars.com/api/?name=Imob+Conta&background=1877F2&color=fff" className="rounded-full w-full h-full object-cover" />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                            </div>
                            <div>
                                <h3 className="font-extrabold text-slate-800 dark:text-white text-lg">BM Principal - Imob Marketing</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">ID da Conta: act_1092837465</p>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="flex-1 md:flex-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold px-4 py-2.5 rounded-lg text-sm transition-colors shadow-sm flex items-center justify-center">
                                <RefreshCcw className="w-4 h-4 mr-2" /> Sincronizar
                            </button>
                            <button className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-lg text-sm transition-colors shadow-sm flex items-center justify-center">
                                <Plus className="w-4 h-4 mr-2" /> Nova Campanha
                            </button>
                        </div>
                    </div>

                    {/* Resumo de Custos  */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Gasto (Mês)</p>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">R$ 1.450,00</h3>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-red-600 dark:text-red-400">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-xs font-bold text-red-500 flex items-center gap-1">+12% vs mês anterior</p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Leads Captados</p>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">104</h3>
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                    <Users className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-xs font-bold text-emerald-500 flex items-center gap-1">+24% vs mês anterior</p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Custo por Lead (CPL)</p>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">R$ 13,94</h3>
                                </div>
                                <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg text-amber-600 dark:text-amber-400">
                                    <HandCoins className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-xs font-bold text-emerald-500 flex items-center gap-1">-5% Otimizado</p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Cliques no Link</p>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">3.402</h3>
                                </div>
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                                    <MousePointerClick className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-xs font-bold text-slate-400 flex items-center gap-1">R$ 0,42 CPC Médio</p>
                        </div>
                    </div>

                    {/* Campanhas Ativas Mock */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="font-extrabold text-lg text-slate-800 dark:text-white">Campanhas em Veiculação</h3>
                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-[10px] text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">Nome da Campanha</th>
                                        <th className="px-6 py-4 font-bold text-center">Status</th>
                                        <th className="px-6 py-4 font-bold text-right">Orçamento</th>
                                        <th className="px-6 py-4 font-bold text-right">Resultados (Leads)</th>
                                        <th className="px-6 py-4 font-bold text-right">Custo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">
                                            [Captação] Alto Padrão - Gonzaga
                                            <div className="text-xs text-slate-400 font-medium mt-0.5">ID: cmp_932029</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase uppercase">Ativo</span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-300 text-right">R$ 50,00/dia</td>
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200 text-right">42 <span className="text-xs font-normal text-slate-400">novos</span></td>
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200 text-right">R$ 840,50</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">
                                            [Tráfego] Minha Casa Minha Vida
                                            <div className="text-xs text-slate-400 font-medium mt-0.5">ID: cmp_104829</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase uppercase">Ativo</span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-300 text-right">R$ 30,00/dia</td>
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200 text-right">62 <span className="text-xs font-normal text-slate-400">novos</span></td>
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200 text-right">R$ 609,50</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
