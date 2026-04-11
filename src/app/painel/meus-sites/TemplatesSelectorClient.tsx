"use client";

import { useState } from "react";
import { Check, Eye, Sparkles } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const TEMPLATES = [
    {
        id: "premium",
        name: "Tema Premium (Dark)",
        desc: "Cabeçalho executivo escuro com destaques dourados/ambar.",
        badge: null,
        preview: (
            <div className="h-44 bg-slate-900 w-full relative flex flex-col">
                <div className="h-10 w-full flex items-center justify-center border-b border-white/10">
                    <div className="w-20 h-3 bg-white/20 rounded" />
                </div>
                <div className="h-6 w-full flex justify-center items-center gap-2 border-b border-slate-700">
                    <div className="w-8 h-1.5 bg-amber-500 rounded" />
                    <div className="w-8 h-1.5 bg-slate-500 rounded" />
                    <div className="w-8 h-1.5 bg-slate-500 rounded" />
                </div>
                <div className="flex-1 overflow-hidden relative flex flex-col">
                    <div className="w-full h-16 bg-blue-900/30" />
                    <div className="p-2 bg-white flex flex-col gap-1.5 h-full">
                        <div className="w-full py-1 border-b border-slate-100 flex justify-center gap-2">
                            <div className="w-10 h-3 bg-slate-200 rounded" />
                        </div>
                        <div className="flex justify-center gap-2 mt-1">
                            <div className="w-12 h-16 bg-slate-900 rounded" />
                            <div className="w-12 h-16 bg-slate-100 border border-slate-200 rounded" />
                            <div className="w-12 h-16 bg-slate-100 border border-slate-200 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "clean",
        name: "Tema Clean (Light)",
        desc: "Navegação integrada clara com menu de pesquisa corporativo.",
        badge: "ATIVO",
        preview: (
            <div className="h-44 bg-slate-50 w-full relative flex flex-col">
                <div className="h-10 w-full bg-white flex items-center justify-between px-3 border-b border-slate-200">
                    <div className="w-4 h-1.5 bg-slate-300 rounded" />
                    <div className="w-16 h-3 bg-slate-800 rounded" />
                    <div className="w-4 h-1.5 bg-slate-300 rounded" />
                </div>
                <div className="flex-1 overflow-hidden relative flex flex-col">
                    <div className="w-full h-16 bg-slate-300" />
                    <div className="w-full h-8 bg-slate-800 flex justify-center items-center gap-2">
                        <div className="w-8 h-2 bg-slate-600 rounded" />
                        <div className="w-6 h-2 bg-amber-600 rounded" />
                    </div>
                    <div className="p-2 bg-white flex justify-center gap-2 mt-1 h-full">
                        <div className="w-14 h-12 bg-slate-100 border border-slate-200 rounded" />
                        <div className="w-14 h-12 bg-slate-100 border border-slate-200 rounded" />
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "exclusive",
        name: "Tema Exclusive (Mínimo)",
        desc: "Logo centralizada e destaque maior para as mídias visuais.",
        badge: null,
        preview: (
            <div className="h-44 bg-white w-full relative flex flex-col">
                <div className="h-10 w-full flex flex-col items-center justify-center pt-2 gap-1 border-b border-slate-100">
                    <div className="w-14 h-3 bg-slate-900 rounded" />
                    <div className="flex gap-1.5 mt-1">
                        <div className="w-4 h-1 bg-slate-900 rounded" />
                        <div className="w-4 h-1 bg-slate-300 rounded" />
                        <div className="w-4 h-1 bg-slate-300 rounded" />
                    </div>
                </div>
                <div className="flex-1 overflow-hidden relative flex flex-col items-center">
                    <div className="w-full h-14 bg-slate-200 mt-1" />
                    <div className="w-4/5 h-6 bg-white shadow-sm border border-slate-100 -mt-3 z-10 rounded flex items-center justify-center">
                        <div className="w-16 h-1 bg-slate-300 rounded" />
                    </div>
                    <div className="flex gap-2 mt-3">
                        <div className="w-12 h-10 bg-slate-100 border border-slate-200 rounded" />
                        <div className="w-12 h-10 bg-slate-100 border border-slate-200 rounded" />
                    </div>
                </div>
            </div>
        ),
    },
];

export function TemplatesSelectorClient({ initialSelected = "clean" }: { initialSelected?: string }) {
    const [selected, setSelected] = useState(initialSelected);

    const handleSelect = (id: string) => {
        setSelected(id);
        toast.success(`Template "${TEMPLATES.find(t => t.id === id)?.name}" selecionado!`);
    };

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-200">Templates Disponíveis</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Escolha um template para personalizar sua lead page.</p>
                </div>
                <Link href="/painel/meus-sites/templates" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
                    Ver todos os modelos →
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {TEMPLATES.map(tpl => {
                    const isSelected = selected === tpl.id;
                    return (
                        <div
                            key={tpl.id}
                            onClick={() => handleSelect(tpl.id)}
                            className={[
                                "relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden transition-all cursor-pointer group",
                                isSelected
                                    ? "border-2 border-blue-500 shadow-lg shadow-blue-500/10 ring-4 ring-blue-50 dark:ring-blue-900/20"
                                    : "border-2 border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600",
                            ].join(" ")}
                        >
                            <div className="relative overflow-hidden">
                                {tpl.preview}

                                {/* Selecionado badge */}
                                {isSelected && (
                                    <span className="absolute top-2 right-2 bg-blue-600 text-white text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded shadow-sm z-20 flex items-center gap-1">
                                        <Check className="w-2.5 h-2.5" /> ATIVO
                                    </span>
                                )}

                                {/* Hover overlay */}
                                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm z-10">
                                    <button
                                        onClick={e => { e.stopPropagation(); handleSelect(tpl.id); }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors"
                                    >
                                        <Sparkles className="w-3.5 h-3.5" /> Usar este
                                    </button>
                                    <Link
                                        href="/painel/meus-sites/personalizar"
                                        onClick={e => e.stopPropagation()}
                                        className="bg-white text-slate-800 shadow-lg text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
                                    >
                                        <Eye className="w-3.5 h-3.5" /> Personalizar
                                    </Link>
                                </div>
                            </div>

                            <div className={`p-4 border-t ${isSelected ? "border-blue-100 dark:border-blue-900/30" : "border-slate-100 dark:border-slate-700"} bg-white dark:bg-slate-800`}>
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className={`font-extrabold text-sm ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-slate-800 dark:text-slate-200"}`}>{tpl.name}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tpl.desc}</p>
                                    </div>
                                    {isSelected && (
                                        <span className="shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
