"use client";

import { Calendar, Clock, User, Check, Settings2, CalendarDays } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AgendaPage() {
    return (
        <div className="flex-1 flex flex-col w-full max-w-[1400px]">
            {/* Cabeçalho */}
            <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Agenda</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Gerencie agendamentos e solicitações de visitas</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 font-bold gap-2">
                        <Settings2 className="w-4 h-4" /> Configurar Disponibilidade
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2">
                        <CalendarDays className="w-4 h-4" /> Calendário
                    </Button>
                </div>
            </div>

            {/* Métricas Topo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Solicitações Pendentes</p>
                    <div className="flex items-end justify-between">
                        <h2 className="text-2xl font-extrabold text-amber-600">0</h2>
                        <div className="text-amber-500"><Clock className="w-6 h-6" /></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Agendamentos Hoje</p>
                    <div className="flex items-end justify-between">
                        <h2 className="text-2xl font-extrabold text-emerald-600">0</h2>
                        <div className="text-emerald-500"><Calendar className="w-6 h-6" /></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Esta Semana</p>
                    <div className="flex items-end justify-between">
                        <h2 className="text-2xl font-extrabold text-blue-600">0</h2>
                        <div className="text-blue-500"><User className="w-6 h-6" /></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Taxa de Aprovação</p>
                    <div className="flex items-end justify-between">
                        <h2 className="text-2xl font-extrabold text-purple-600">0%</h2>
                        <div className="text-purple-500"><Check className="w-6 h-6" /></div>
                    </div>
                </div>
            </div>

            {/* Blocos Principais */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Solicitações Pendentes */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <h3 className="font-bold text-slate-800 dark:text-slate-100">Solicitações Pendentes (0)</h3>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">Solicitações de agendamento aguardando aprovação</p>
                    </div>
                    <div className="flex-1 flex flex-col w-full min-h-[250px] items-center justify-center p-8 text-center text-slate-400">
                        <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center mb-4">
                            <Clock className="w-8 h-8 text-slate-400" />
                        </div>
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-1">Nenhuma solicitação pendente</h4>
                        <p className="text-xs text-slate-500 max-w-[280px]">Quando clientes solicitarem visitas, elas aparecerão aqui para aprovação.</p>
                    </div>
                </div>

                {/* Próximos Agendamentos */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-1">
                            <CalendarDays className="w-4 h-4 text-slate-500" />
                            <h3 className="font-bold text-slate-800 dark:text-slate-100">Próximos Agendamentos (0)</h3>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">Agendamentos confirmados para os próximos dias</p>
                    </div>
                    <div className="flex-1 flex flex-col w-full min-h-[250px] items-center justify-center p-8 text-center text-slate-400">
                        <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center mb-4">
                            <CalendarDays className="w-8 h-8 text-slate-400" />
                        </div>
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-1">Nenhum agendamento confirmado</h4>
                        <p className="text-xs text-slate-500 max-w-[280px]">Quando você aprovar solicitações de visita, elas aparecerão aqui.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
