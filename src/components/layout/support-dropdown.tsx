"use client";

import { useState, useRef, useEffect } from "react";
import { HelpCircle, MessageSquare, BookOpen, Video, Lightbulb, AlertTriangle, X, Send, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const SUPPORT_ITEMS = [
    {
        icon: <MessageSquare className="w-4 h-4" />,
        iconBg: "bg-emerald-500",
        label: "Falar com Suporte",
        desc: "Nossos dados de contato",
        action: "support",
    },
    {
        icon: <BookOpen className="w-4 h-4" />,
        iconBg: "bg-slate-800",
        label: "Central de ajuda",
        desc: "Manual de uso com imagens e vídeos",
        action: "help",
    },
    {
        icon: <Video className="w-4 h-4" />,
        iconBg: "bg-blue-600",
        label: "Treinamento",
        desc: "Treinamento por vídeo chamada",
        action: "training",
    },
    {
        icon: <Lightbulb className="w-4 h-4" />,
        iconBg: "bg-blue-500",
        label: "Sugerir novos recursos",
        desc: "Nos ajude a melhorar",
        action: "suggest",
    },
    {
        icon: <AlertTriangle className="w-4 h-4" />,
        iconBg: "bg-red-500",
        label: "Relatar um problema",
        desc: "Informe um problema de uso",
        action: "report",
    },
];

export function SupportDropdown() {
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState<"suggest" | "report" | null>(null);
    const [message, setMessage] = useState("");
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleAction = (action: string) => {
        setOpen(false);
        if (action === "support") {
            window.open("https://wa.me/5562999999999?text=Olá, preciso de suporte!", "_blank");
        } else if (action === "help") {
            window.open("#", "_blank");
        } else if (action === "training") {
            window.open("#", "_blank");
        } else if (action === "suggest") {
            setModal("suggest");
        } else if (action === "report") {
            setModal("report");
        }
    };

    const handleSubmit = () => {
        if (!message.trim()) return;
        toast.success(modal === "suggest" ? "Sugestão enviada! Obrigado." : "Problema relatado! Nossa equipe analisará em breve.");
        setMessage("");
        setModal(null);
    };

    return (
        <>
            <div className="relative" ref={ref}>
                <button
                    onClick={() => setOpen(p => !p)}
                    className={`p-2 rounded-full transition-colors relative ${
                        open ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                    title="Ajuda e Suporte"
                >
                    <HelpCircle className="w-5 h-5" />
                </button>

                {open && (
                    <div className="absolute right-0 top-12 w-72 bg-white dark:bg-[#1a1f2c] border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="p-3 border-b border-slate-100 dark:border-slate-700/50">
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ajuda & Suporte</p>
                        </div>
                        <div className="p-2">
                            {SUPPORT_ITEMS.map(item => (
                                <button
                                    key={item.action}
                                    onClick={() => handleAction(item.action)}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left group"
                                >
                                    <div className={`${item.iconBg} w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-none">{item.label}</p>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 flex-shrink-0" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal para Sugerir / Relatar */}
            {modal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {modal === "suggest" ? "Sugerir novos recursos" : "Relatar um problema"}
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    {modal === "suggest" ? "Nos ajude a melhorar a plataforma" : "Informe um problema de uso"}
                                </p>
                            </div>
                            <button onClick={() => setModal(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <textarea
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder={modal === "suggest" ? "Descreva o recurso que gostaria de ver na plataforma..." : "Descreva o problema que encontrou, incluindo os passos para reproduzi-lo..."}
                                className="w-full min-h-[140px] px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none placeholder:text-slate-400"
                            />
                            <p className="text-xs text-slate-400">O retorno será feito por WhatsApp, em horário comercial, por uma pessoa da nossa equipe.</p>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button onClick={() => setModal(null)} className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                Voltar
                            </button>
                            <button onClick={handleSubmit} disabled={!message.trim()} className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                                <Send className="w-3.5 h-3.5" />
                                {modal === "suggest" ? "Enviar sugestão" : "Relatar problema"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
