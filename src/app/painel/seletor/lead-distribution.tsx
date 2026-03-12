"use client";

import { useState } from "react";
import { Share2, Users, MapPin, Zap, Clock, ShieldCheck, Settings, BarChart3, RotateCw, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Rule = {
    id: string;
    name: string;
    description: string;
    type: 'random' | 'round_robin' | 'region' | 'specialty';
    isActive: boolean;
};

export default function LeadDistribution() {
    const [rules, setRules] = useState<Rule[]>([
        { id: '1', name: 'Round Robin Geral', description: 'Distribui leads sequencialmente entre todos os corretores ativos.', type: 'round_robin', isActive: true },
        { id: '2', name: 'Foco Regional RJ', description: 'Encaminha leads de interesse no RJ para corretores da base carioca.', type: 'region', isActive: false },
        { id: '3', name: 'Especialista Alto Padrão', description: 'Leads de imóveis > 2M vão para corretores sêniores.', type: 'specialty', isActive: true },
    ]);

    return (
        <div className="space-y-8 h-full">
            {/* Header & Quick Stats */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
                        <Zap className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Status do Motor</p>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">Distribuição Ativa</h3>
                        <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-1">
                            <ShieldCheck className="w-3 h-3" /> 100% dos leads encaminhados
                        </p>
                    </div>
                </div>

                <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
                        <Clock className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Tempo Médio de Resposta</p>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">14 minutos</h3>
                        <p className="text-xs font-bold text-slate-400 mt-1">Meta: abaixo de 10 min</p>
                    </div>
                </div>
            </div>

            {/* Configuração de Regras */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-slate-400" />
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">Regras de Encaminhamento</h2>
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest rounded-xl px-6">Nova Regra</Button>
                </div>

                <div className="p-4 space-y-4">
                    {rules.map((rule) => (
                        <div key={rule.id} className={`p-6 rounded-2xl border transition-all ${rule.isActive ? 'border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/20' : 'border-slate-100 dark:border-slate-800 bg-slate-50/30'}`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-5">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${rule.isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                                        {rule.type === 'round_robin' && <RotateCw className="w-6 h-6" />}
                                        {rule.type === 'region' && <MapPin className="w-6 h-6" />}
                                        {rule.type === 'specialty' && <BarChart3 className="w-6 h-6" />}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-black text-slate-900 dark:text-white">{rule.name}</h4>
                                        <p className="text-xs font-medium text-slate-500 max-w-md">{rule.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Último disparo</p>
                                        <p className="text-xs font-black text-slate-700 dark:text-slate-300">Há 23 minutos</p>
                                    </div>
                                    <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block" />
                                    <div className="flex items-center gap-3">
                                        <button className={`w-12 h-6 rounded-full relative transition-colors ${rule.isActive ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${rule.isActive ? 'left-7' : 'left-1'}`} />
                                        </button>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{rule.isActive ? 'Ativa' : 'Pausa'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Histórico Recente de Distribuição */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Share2 className="w-5 h-5 text-slate-400" />
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">Log de Distribuição</h2>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50">
                                <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead</th>
                                <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Corretor Destino</th>
                                <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Regra Aplicada</th>
                                <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Data/Hora</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-800 dark:text-white">Marcos Guedes</span>
                                            <span className="text-[10px] font-bold text-slate-400 italic">Interesse: Apt Barra</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black">RL</div>
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Ricardo Lopes</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[10px] font-black bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-md uppercase">Round Robin</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-xs font-bold text-slate-500">Hoje às 14:32</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
