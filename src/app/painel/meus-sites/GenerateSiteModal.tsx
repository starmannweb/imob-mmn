"use client";

import { useState } from "react";
import { Sparkles, X, Loader2, CheckCircle2, Wand2, Paintbrush } from "lucide-react";

export function GenerateSiteModal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [status, setStatus] = useState<"idle" | "generating" | "success">("idle");

    const handleGenerate = () => {
        if (!prompt || prompt.length < 10) return;
        setStatus("generating");
        setTimeout(() => {
            setStatus("success");
            setTimeout(() => {
                setOpen(false);
                setStatus("idle");
                setPrompt("");
            }, 4000);
        }, 4500);
    };

    return (
        <>
            <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">{children}</div>

            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => status !== 'generating' && setOpen(false)} />

                    <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800">
                        {status !== 'generating' && (
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full p-1.5 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}

                        <div className="p-8">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-800">
                                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>

                            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                                Design de Lead Page com IA
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                                Descreva com os mínimos detalhes o perfil do seu público, cores preferidas, ou o estilo que deseja. A IA montará a estrutura completa da sua página focada em alta conversão.
                            </p>

                            {status === "idle" && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <textarea
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            placeholder="Ex: Quero um site luxuoso para imóveis de alto padrão na praia, usando tons de azul marinho, dourado chic e fontes modernas. O foco precisa ser captar o WhatsApp dos clientes interessados..."
                                            className="w-full h-36 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 resize-none"
                                        />
                                        <div className="absolute bottom-3 right-4 text-[11px] font-bold text-slate-400">
                                            IA Generator v2.0
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleGenerate}
                                        disabled={prompt.length < 10}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed dark:disabled:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        <Wand2 className="w-5 h-5" />
                                        Gerar meu site Magic Designer
                                    </button>
                                </div>
                            )}

                            {status === "generating" && (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <div className="relative w-20 h-20 mb-6">
                                        <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                                        <Paintbrush className="absolute inset-0 m-auto text-blue-500 w-8 h-8 animate-pulse" />
                                    </div>
                                    <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-lg mb-2">Construindo Layout...</h3>
                                    <p className="text-sm text-slate-500 font-medium max-w-xs animate-pulse">A Inteligência Artificial está montando componentes, distribuindo cores e integrando seus imóveis...</p>
                                </div>
                            )}

                            {status === "success" && (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    <h3 className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xl mb-2">Sucesso Extraordinário!</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium max-w-sm">
                                        Sua Landing Page foi recriada e adaptada sob medida. Acesse seus Links Rápidos para visualizar as novas atualizações!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
