"use client";

import { useState } from "react";
import { Search, MapPin, TrendingUp, Target, Users, Home, ArrowRight, Star, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Opportunity = {
    id: string;
    lead_name: string;
    property_title: string;
    match_score: number;
    match_reasons: string[];
    value: number;
    location: string;
    last_activity: string;
};

export default function OpportunityRadar() {
    const [opportunities] = useState<Opportunity[]>([
        {
            id: "1",
            lead_name: "Ricardo Silva",
            property_title: "Apartamento Frontal Mar Barra",
            match_score: 95,
            match_reasons: ["Preço dentro do perfil", "Localização desejada", "3 Quartos"],
            value: 1250000,
            location: "Barra da Tijuca, RJ",
            last_activity: "2 dias atrás"
        },
        {
            id: "2",
            lead_name: "Ana Oliveira",
            property_title: "Casa em Condomínio Recreio",
            match_score: 88,
            match_reasons: ["Área externa ampla", "Vagas de garagem", "Suíte master"],
            value: 980000,
            location: "Recreio, RJ",
            last_activity: "5 horas atrás"
        }
    ]);

    return (
        <div className="space-y-8">
            {/* Header com Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">Matches de Hoje</p>
                        <h3 className="text-3xl font-black">12</h3>
                        <div className="mt-4 flex items-center gap-2 text-sm font-medium bg-white/10 w-fit px-3 py-1 rounded-full">
                            <TrendingUp className="w-4 h-4" /> +20% vs ontem
                        </div>
                    </div>
                    <Target className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Leads Qualificados</p>
                            <h3 className="text-xl font-black text-slate-800 dark:text-white">45</h3>
                        </div>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full">
                        <div className="bg-emerald-500 h-full w-[65%] rounded-full" />
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                            <Home className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Imóveis em Alta</p>
                            <h3 className="text-xl font-black text-slate-800 dark:text-white">28</h3>
                        </div>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full">
                        <div className="bg-blue-500 h-full w-[40%] rounded-full" />
                    </div>
                </div>
            </div>

            {/* Radar List */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">Oportunidades de Match</h2>
                        <p className="text-slate-500 text-sm font-medium">Cruzamento inteligente de perfil vs estoque</p>
                    </div>
                    <Button variant="outline" className="rounded-xl font-bold text-xs uppercase tracking-wider">Ver Todos</Button>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {opportunities.map((opt) => (
                        <div key={opt.id} className="p-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="flex items-start gap-6">
                                    {/* Score Circle */}
                                    <div className="relative w-20 h-20 flex-shrink-0">
                                        <svg className="w-full h-full" viewBox="0 0 36 36">
                                            <path
                                                className="text-slate-100 dark:text-slate-800"
                                                strokeDasharray="100, 100"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                            />
                                            <path
                                                className="text-emerald-500"
                                                strokeDasharray={`${opt.match_score}, 100`}
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-lg font-black text-slate-900 dark:text-white leading-none">{opt.match_score}%</span>
                                            <span className="text-[8px] font-black uppercase text-slate-400">Match</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                                                {opt.lead_name}
                                            </h3>
                                            <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase rounded-md flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-current" /> Lead VIP
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                            <Home className="w-4 h-4 text-slate-400" /> {opt.property_title}
                                        </p>
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {opt.match_reasons.map((reason, i) => (
                                                <span key={i} className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                                                    • {reason}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 lg:text-right">
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Valor do Imóvel</p>
                                        <p className="text-xl font-black text-slate-900 dark:text-white">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(opt.value)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs px-6">
                                            Abrir Negócio <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                        <Button variant="outline" className="rounded-xl p-2.5">
                                            <AlertCircle className="w-4 h-4 text-slate-400" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
