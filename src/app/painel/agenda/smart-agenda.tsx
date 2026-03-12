"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, User, Home, Plus, ChevronLeft, ChevronRight, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Appointment = {
    id: string;
    title: string;
    type: 'meeting' | 'call' | 'visit' | 'follow_up' | 'signature';
    priority: 'low' | 'normal' | 'urgent';
    lead_name: string;
    property_title?: string;
    starts_at: string;
    ends_at: string;
    status: 'scheduled' | 'completed' | 'cancelled';
};

const TYPE_CONFIG = {
    meeting: { label: 'Reunião', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    call: { label: 'Ligação', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
    visit: { label: 'Visita', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
    follow_up: { label: 'Retorno', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' },
    signature: { label: 'Assinatura', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
};

export default function SmartAgenda() {
    const [appointments] = useState<Appointment[]>([
        {
            id: "1",
            title: "Visita ao Apartamento Barra",
            type: "visit",
            priority: "urgent",
            lead_name: "Ricardo Silva",
            property_title: "Apt 302 Frontal Mar",
            starts_at: "2026-03-13T14:00:00",
            ends_at: "2026-03-13T15:30:00",
            status: "scheduled"
        },
        {
            id: "2",
            title: "Assinatura de Contrato",
            type: "signature",
            priority: "urgent",
            lead_name: "Ana Oliveira",
            property_title: "Casa Recreio",
            starts_at: "2026-03-13T10:00:00",
            ends_at: "2026-03-13T11:00:00",
            status: "scheduled"
        }
    ]);

    const formatTime = (date: string) => {
        return new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            {/* Calendário Mini / Sidebar */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter text-sm">Março 2026</h3>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><ChevronLeft className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><ChevronRight className="w-4 h-4" /></Button>
                        </div>
                    </div>
                    {/* Placeholder Simplificado do Calendário Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
                            <span key={d} className="text-[10px] font-black text-slate-400 py-2">{d}</span>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {Array.from({ length: 31 }).map((_, i) => (
                            <div key={i} className={`text-xs font-bold py-2 rounded-lg cursor-pointer transition-all ${i + 1 === 13 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <RefreshCw className="w-5 h-5 text-indigo-600 animate-spin-slow" />
                        <h4 className="font-black text-indigo-900 dark:text-indigo-100 text-sm">Google Calendar</h4>
                    </div>
                    <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium leading-relaxed">
                        Sua agenda está sincronizada em tempo real com sua conta Google.
                    </p>
                    <Button variant="outline" className="w-full mt-4 bg-white dark:bg-slate-900 border-indigo-200 text-indigo-600 font-bold text-xs uppercase rounded-xl">Configurar</Button>
                </div>
            </div>

            {/* Lista de Compromissos do Dia */}
            <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">Sexta, 13 de Março</h2>
                        <p className="text-slate-500 text-sm font-medium">Você tem {appointments.length} compromissos hoje</p>
                    </div>
                    <Button className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-black text-xs uppercase tracking-wider rounded-xl gap-2 px-6 py-6">
                        <Plus className="w-4 h-4" /> Novo Evento
                    </Button>
                </div>

                <div className="space-y-4">
                    {appointments.sort((a, b) => a.starts_at.localeCompare(b.starts_at)).map((apt) => (
                        <div key={apt.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group flex items-start gap-6">
                            <div className="flex flex-col items-center justify-center min-w-[80px] border-r border-slate-100 dark:border-slate-800 pr-6">
                                <span className="text-lg font-black text-slate-900 dark:text-white leading-none mb-1">{formatTime(apt.starts_at)}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{formatTime(apt.ends_at)}</span>
                            </div>

                            <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                                                {apt.title}
                                            </h3>
                                            {apt.priority === 'urgent' && (
                                                <span className="flex items-center gap-1 text-[9px] font-black text-rose-600 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded-full uppercase">
                                                    <AlertCircle className="w-2.5 h-2.5" /> Urgente
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${TYPE_CONFIG[apt.type].color}`}>
                                                {TYPE_CONFIG[apt.type].label}
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                                        <User className="w-3.5 h-3.5 text-slate-400" />
                                        Cliente: <span className="text-slate-900 dark:text-slate-200">{apt.lead_name}</span>
                                    </div>
                                    {apt.property_title && (
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                                            <Home className="w-3.5 h-3.5 text-slate-400" />
                                            Imóvel: <span className="text-indigo-600 dark:text-indigo-400">{apt.property_title}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
