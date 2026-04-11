"use client";

import { useState } from "react";
import { Calendar, Clock, User, Check, Settings2, CalendarDays, RefreshCw, ExternalLink, X, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type GoogleSyncStatus = "disconnected" | "connecting" | "connected" | "error";

function GoogleCalendarIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
            <rect x="3" y="4" width="18" height="17" rx="2" fill="#fff" stroke="#dadce0" strokeWidth="1.5" />
            <rect x="3" y="7" width="18" height="2" fill="#4285f4" />
            <path d="M7 4V2m10 2V2" stroke="#5f6368" strokeWidth="1.5" strokeLinecap="round" />
            <text x="12" y="18" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1a73e8">G</text>
        </svg>
    );
}

export default function AgendaPage() {
    const [syncStatus, setSyncStatus] = useState<GoogleSyncStatus>("disconnected");
    const [showSyncModal, setShowSyncModal] = useState(false);
    const [lastSynced, setLastSynced] = useState<Date | null>(null);

    const handleConnectGoogle = async () => {
        setSyncStatus("connecting");
        // Simulated OAuth flow — in production redirect to /api/auth/google-calendar
        await new Promise(r => setTimeout(r, 2000));
        setSyncStatus("connected");
        setLastSynced(new Date());
        setShowSyncModal(false);
        toast.success("Google Agenda sincronizado com sucesso!");
    };

    const handleDisconnect = () => {
        setSyncStatus("disconnected");
        setLastSynced(null);
        toast.info("Google Agenda desconectado.");
    };

    const handleSync = async () => {
        const prev = syncStatus;
        setSyncStatus("connecting");
        await new Promise(r => setTimeout(r, 1500));
        setSyncStatus(prev);
        setLastSynced(new Date());
        toast.success("Sincronização concluída!");
    };

    return (
        <div className="flex-1 flex flex-col w-full max-w-[1400px]">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Agenda</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Gerencie agendamentos e solicitações de visitas</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Google Calendar sync button */}
                    {syncStatus === "connected" ? (
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
                            <GoogleCalendarIcon className="w-5 h-5" />
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-none">Google Agenda</span>
                                <span className="text-[10px] text-emerald-600 leading-none mt-0.5 flex items-center gap-1">
                                    <CheckCircle2 className="w-2.5 h-2.5" /> Conectado
                                    {lastSynced && ` · ${lastSynced.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`}
                                </span>
                            </div>
                            <button onClick={handleSync} disabled={syncStatus === "connecting"} className="ml-1 p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                                <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={handleDisconnect} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowSyncModal(true)}
                            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all shadow-sm hover:shadow-md"
                        >
                            <GoogleCalendarIcon className="w-5 h-5" />
                            Sincronizar com Google Agenda
                        </button>
                    )}

                    <Button variant="outline" className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 font-bold gap-2">
                        <Settings2 className="w-4 h-4" /> Disponibilidade
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2">
                        <CalendarDays className="w-4 h-4" /> Calendário
                    </Button>
                </div>
            </div>

            {/* Connected banner */}
            {syncStatus === "connected" && (
                <div className="mb-5 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3.5">
                    <GoogleCalendarIcon className="w-6 h-6 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Google Agenda sincronizado</p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">Os agendamentos confirmados aparecem automaticamente no seu Google Agenda e vice-versa.</p>
                    </div>
                    <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-300 hover:underline font-semibold">
                        Abrir <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            )}

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard label="Solicitações Pendentes" value="0" color="text-amber-600" icon={<Clock className="w-6 h-6 text-amber-500" />} />
                <MetricCard label="Agendamentos Hoje" value="0" color="text-emerald-600" icon={<Calendar className="w-6 h-6 text-emerald-500" />} />
                <MetricCard label="Esta Semana" value="0" color="text-blue-600" icon={<User className="w-6 h-6 text-blue-500" />} />
                <MetricCard label="Taxa de Aprovação" value="0%" color="text-purple-600" icon={<Check className="w-6 h-6 text-purple-500" />} />
            </div>

            {/* Main blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <h3 className="font-bold text-slate-800 dark:text-slate-100">Solicitações Pendentes (0)</h3>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">Solicitações de agendamento aguardando aprovação</p>
                    </div>
                    <div className="flex-1 flex flex-col w-full min-h-[250px] items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center mb-4">
                            <Clock className="w-8 h-8 text-slate-400" />
                        </div>
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-1">Nenhuma solicitação pendente</h4>
                        <p className="text-xs text-slate-500 max-w-[280px]">Quando clientes solicitarem visitas, elas aparecerão aqui para aprovação.</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-1">
                            <CalendarDays className="w-4 h-4 text-slate-500" />
                            <h3 className="font-bold text-slate-800 dark:text-slate-100">Próximos Agendamentos (0)</h3>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">Agendamentos confirmados para os próximos dias</p>
                    </div>
                    <div className="flex-1 flex flex-col w-full min-h-[250px] items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center mb-4">
                            <CalendarDays className="w-8 h-8 text-slate-400" />
                        </div>
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-1">Nenhum agendamento confirmado</h4>
                        <p className="text-xs text-slate-500 max-w-[280px]">Quando você aprovar solicitações de visita, elas aparecerão aqui.</p>
                    </div>
                </div>
            </div>

            {/* Google Sync Modal */}
            {showSyncModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Sincronizar com Google Agenda</h2>
                            <button onClick={() => setShowSyncModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex flex-col items-center text-center mb-6">
                            <GoogleCalendarIcon className="w-16 h-16 mb-4" />
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Conectar Google Agenda</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Sincronize seus agendamentos automaticamente com o Google Agenda. Os compromissos confirmados serão adicionados ao seu calendário.
                            </p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-5 space-y-2.5">
                            {[
                                "Agendamentos confirmados sincronizados automaticamente",
                                "Receba notificações pelo Google Agenda",
                                "Visualize sua agenda em qualquer dispositivo",
                                "Sincronização bidirecional com seus eventos",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 mb-5">
                            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-amber-700 dark:text-amber-400">
                                Você será redirecionado para o Google para autorizar o acesso. Nenhuma senha é armazenada.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setShowSyncModal(false)} className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                Cancelar
                            </button>
                            <button
                                onClick={handleConnectGoogle}
                                disabled={syncStatus === "connecting"}
                                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                            >
                                {syncStatus === "connecting" ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Conectando...</>
                                ) : (
                                    <><GoogleCalendarIcon className="w-4 h-4" /> Conectar com Google</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function MetricCard({ label, value, color, icon }: { label: string; value: string; color: string; icon: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
            <div className="flex items-end justify-between">
                <h2 className={`text-2xl font-extrabold ${color}`}>{value}</h2>
                {icon}
            </div>
        </div>
    );
}
