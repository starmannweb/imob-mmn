"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronRight, ExternalLink, CheckCircle2, Loader2, X,
    HelpCircle, BookOpen, AlertCircle, Globe, BarChart3,
    Building2, Zap, Mail, MessageSquare
} from "lucide-react";
import { toast } from "sonner";

function GoogleCalendarIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" className={className}>
            <rect x="4" y="8" width="40" height="36" rx="4" fill="#fff" stroke="#dadce0" strokeWidth="2" />
            <rect x="4" y="14" width="40" height="6" fill="#4285f4" />
            <path d="M14 8V4M34 8V4" stroke="#5f6368" strokeWidth="3" strokeLinecap="round" />
            <text x="24" y="38" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a73e8">31</text>
        </svg>
    );
}

function GoogleAnalyticsIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" className={className}>
            <rect width="48" height="48" rx="8" fill="#f9ab00" />
            <rect x="10" y="28" width="8" height="12" rx="2" fill="white" />
            <rect x="20" y="20" width="8" height="20" rx="2" fill="white" />
            <rect x="30" y="8" width="8" height="32" rx="2" fill="white" />
        </svg>
    );
}

type Integration = {
    id: string;
    name: string;
    desc: string;
    icon: React.ReactNode;
    cta: "Conectar" | "Contratar";
    color: string;
    category: string;
};

const INTEGRATIONS: Integration[] = [
    {
        id: "google_agenda",
        name: "Google Agenda",
        desc: "Conecte seu sistema à agenda do Google e não perca mais compromissos.",
        icon: <GoogleCalendarIcon className="w-9 h-9" />,
        cta: "Conectar",
        color: "text-blue-600",
        category: "Google",
    },
    {
        id: "google_analytics",
        name: "Google Analytics",
        desc: "Tenha informações precisas sobre os acessos ao seu site com o Google Analytics.",
        icon: <GoogleAnalyticsIcon className="w-9 h-9" />,
        cta: "Conectar",
        color: "text-amber-600",
        category: "Google",
    },
    {
        id: "orulo",
        name: "Rede Órulo",
        desc: "Conecte-se ao Órulo para encontrar imóveis de incorporadoras.",
        icon: <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-white font-black text-xs">ÓR</div>,
        cta: "Contratar",
        color: "text-slate-700",
        category: "Portais",
    },
    {
        id: "dwv",
        name: "Rede DWV",
        desc: "Conecte-se ao DWV para encontrar imóveis de incorporadoras.",
        icon: <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center text-white font-black text-xs">DWV</div>,
        cta: "Contratar",
        color: "text-red-600",
        category: "Portais",
    },
    {
        id: "facebook_forms",
        name: "Facebook — Formulários",
        desc: "Capture leads diretamente dos formulários de anúncios do Facebook Ads.",
        icon: <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">f</div>,
        cta: "Conectar",
        color: "text-blue-600",
        category: "Redes Sociais",
    },
    {
        id: "facebook_catalog",
        name: "Facebook — Catálogos",
        desc: "Sincronize seu portfólio de imóveis com o catálogo do Facebook.",
        icon: <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center text-white font-black text-sm">f</div>,
        cta: "Conectar",
        color: "text-blue-700",
        category: "Redes Sociais",
    },
    {
        id: "blow",
        name: "Blow",
        desc: "Integre com a Blow para automações de marketing e comunicação.",
        icon: <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center text-white"><Zap className="w-5 h-5" /></div>,
        cta: "Conectar",
        color: "text-purple-600",
        category: "Marketing",
    },
    {
        id: "studio360",
        name: "Studio 360",
        desc: "Integre tours virtuais 360° nos seus imóveis para uma experiência imersiva.",
        icon: <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center text-white"><Globe className="w-5 h-5" /></div>,
        cta: "Contratar",
        color: "text-cyan-600",
        category: "Ferramentas",
    },
];

const CATEGORIES = ["Todos", "Google", "Portais", "Redes Sociais", "Marketing", "Ferramentas"];

const HELP_LINKS = [
    { label: "Integrar com Facebook formulários", id: "facebook_forms" },
    { label: "Integrar com Facebook catálogos", id: "facebook_catalog" },
    { label: "Integrar com a Órulo", id: "orulo" },
    { label: "Integrar com DWV", id: "dwv" },
    { label: "Integrar com Blow", id: "blow" },
    { label: "Integrar com Studio 360", id: "studio360" },
];

export default function IntegracoesPage() {
    const [connected, setConnected] = useState<string[]>([]);
    const [connecting, setConnecting] = useState<string | null>(null);
    const [showHelp, setShowHelp] = useState(false);
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [modalId, setModalId] = useState<string | null>(null);

    const handleConnect = async (id: string, cta: string) => {
        if (cta === "Contratar") {
            setModalId(id);
            return;
        }
        setConnecting(id);
        await new Promise(r => setTimeout(r, 1800));
        setConnecting(null);
        setConnected(p => [...p, id]);
        toast.success("Integração conectada com sucesso!");
    };

    const handleDisconnect = (id: string) => {
        setConnected(p => p.filter(x => x !== id));
        toast.info("Integração desconectada.");
    };

    const filtered = activeCategory === "Todos"
        ? INTEGRATIONS
        : INTEGRATIONS.filter(i => i.category === activeCategory);

    const modal = INTEGRATIONS.find(i => i.id === modalId);

    return (
        <div className="flex-1 flex flex-col w-full max-w-5xl pb-16">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/painel/configuracoes" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600">Configurações</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Integrações</span>
            </div>

            {/* Help panel */}
            {showHelp && (
                <div className="mb-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm flex gap-6">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-5 flex flex-col items-center gap-2 w-32 flex-shrink-0">
                        <HelpCircle className="w-8 h-8 text-blue-600" />
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-400 text-center">Ajuda</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                            <p className="font-bold text-slate-800 dark:text-slate-200">Precisa de ajuda?</p>
                            <button onClick={() => setShowHelp(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mb-3">Separamos alguns tópicos desta área</p>
                        <div className="space-y-1">
                            {HELP_LINKS.map(l => (
                                <button key={l.id} onClick={() => { setActiveCategory(INTEGRATIONS.find(i=>i.id===l.id)?.category||"Todos"); setShowHelp(false); }}
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                    <BookOpen className="w-3.5 h-3.5" /> {l.label}
                                </button>
                            ))}
                        </div>
                        <Link href="#" className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-slate-600 hover:text-blue-600">
                            Acessar Central de ajuda <ExternalLink className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Integrações</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Gerencie os aplicativos que estão integrados com o seu sistema.</p>
                </div>
                <button onClick={() => setShowHelp(p => !p)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-semibold transition-colors">
                    <HelpCircle className="w-4 h-4 text-blue-500" /> Ajuda
                </button>
            </div>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap mb-6">
                {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setActiveCategory(c)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                            activeCategory === c
                                ? "bg-blue-600 text-white"
                                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400"
                        }`}>
                        {c}
                    </button>
                ))}
            </div>

            {/* Integrations list */}
            <div className="space-y-3">
                {filtered.map(integration => {
                    const isConnected = connected.includes(integration.id);
                    const isConnecting = connecting === integration.id;
                    return (
                        <div key={integration.id}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div className="flex-shrink-0">{integration.icon}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{integration.name}</h3>
                                    {isConnected && (
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">
                                            Conectado
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{integration.desc}</p>
                            </div>
                            {isConnected ? (
                                <button onClick={() => handleDisconnect(integration.id)}
                                    className="flex-shrink-0 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-semibold transition-colors">
                                    Desconectar
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleConnect(integration.id, integration.cta)}
                                    disabled={isConnecting}
                                    className={`flex-shrink-0 flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-white transition-colors disabled:opacity-70 ${
                                        integration.cta === "Contratar" ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-500 hover:bg-emerald-600"
                                    }`}>
                                    {isConnecting ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Conectando...</> : integration.cta}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Contratar modal */}
            {modal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center gap-4 mb-5">
                            {modal.icon}
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{modal.name}</h2>
                                <p className="text-xs text-slate-500">{modal.desc}</p>
                            </div>
                            <button onClick={() => setModalId(null)} className="ml-auto p-2 text-slate-400 hover:text-slate-600 rounded-xl">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-5 flex items-start gap-3">
                            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-amber-700 dark:text-amber-300">
                                Esta integração requer contratação adicional. Entre em contato com nossa equipe para mais informações e condições.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setModalId(null)} className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                Cancelar
                            </button>
                            <a href="https://wa.me/5562999999999?text=Quero+contratar+a+integração+com+" target="_blank" rel="noopener noreferrer"
                                onClick={() => setModalId(null)}
                                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                                <MessageSquare className="w-4 h-4" /> Conversar com consultor
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
