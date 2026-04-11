"use client";

import { useState } from "react";
import { Check, Sparkles, Eye } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const CATEGORIES = [
    { id: "all",    name: "Todos os modelos" },
    { id: "urbano", name: "Modelos Urbanos" },
    { id: "rural",  name: "Modelos Rurais" },
    { id: "praia",  name: "Modelos Praia" },
    { id: "outros", name: "Outros modelos" },
];

const TEMPLATES = [
    { id: 1,  name: "Modelos Urbanos",  category: "urbano", color: "from-slate-700 to-slate-900" },
    { id: 2,  name: "Modelos Urbanos",  category: "urbano", color: "from-blue-700 to-blue-900" },
    { id: 3,  name: "Modelos Urbanos",  category: "urbano", color: "from-indigo-700 to-indigo-900" },
    { id: 4,  name: "Modelos Rurais",   category: "rural",  color: "from-emerald-700 to-emerald-900" },
    { id: 5,  name: "Modelos Rurais",   category: "rural",  color: "from-green-600 to-green-900" },
    { id: 6,  name: "Modelos Rurais",   category: "rural",  color: "from-teal-700 to-teal-900" },
    { id: 7,  name: "Modelos Praia",    category: "praia",  color: "from-cyan-600 to-blue-700" },
    { id: 8,  name: "Modelos Praia",    category: "praia",  color: "from-sky-600 to-sky-900" },
    { id: 9,  name: "Modelos Praia",    category: "praia",  color: "from-blue-400 to-cyan-700" },
    { id: 10, name: "Outros modelos",   category: "outros", color: "from-purple-700 to-purple-900" },
    { id: 11, name: "Outros modelos",   category: "outros", color: "from-rose-600 to-rose-900" },
    { id: 12, name: "Outros modelos",   category: "outros", color: "from-amber-600 to-orange-800" },
];

export function TemplatesPageClient() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [selected, setSelected] = useState<number | null>(null);

    const filtered = activeCategory === "all"
        ? TEMPLATES
        : TEMPLATES.filter(t => t.category === activeCategory);

    const handleSelect = (id: number) => {
        setSelected(id);
        toast.success(`Template #${id} selecionado com sucesso!`);
    };

    return (
        <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden sticky top-24">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Categorias</h3>
                    </div>
                    <nav className="p-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={[
                                    "w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                    activeCategory === cat.id
                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200",
                                ].join(" ")}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </nav>
                    <div className="p-4 border-t border-slate-100 dark:border-slate-700 space-y-2">
                        <Link
                            href="/painel/meus-sites/personalizar"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors block text-center"
                        >
                            Personalizar
                        </Link>
                        <button className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                            Histórico de versões
                        </button>
                    </div>
                </div>
            </aside>

            {/* Grid */}
            <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(tpl => {
                        const isSelected = selected === tpl.id;
                        return (
                            <div
                                key={tpl.id}
                                className={[
                                    "bg-white dark:bg-slate-800 rounded-xl overflow-hidden transition-all cursor-pointer group",
                                    isSelected
                                        ? "border-2 border-blue-500 shadow-lg ring-4 ring-blue-50 dark:ring-blue-900/20"
                                        : "border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600",
                                ].join(" ")}
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    {/* Mockup visual */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${tpl.color} flex flex-col`}>
                                        {/* Fake header */}
                                        <div className="h-8 bg-black/20 flex items-center px-3 gap-2">
                                            <div className="w-12 h-2 bg-white/30 rounded" />
                                            <div className="flex-1" />
                                            <div className="w-4 h-2 bg-white/20 rounded" />
                                            <div className="w-4 h-2 bg-white/20 rounded" />
                                        </div>
                                        {/* Fake hero */}
                                        <div className="flex-1 flex items-center justify-center flex-col gap-2 p-4">
                                            <div className="w-3/4 h-2 bg-white/30 rounded" />
                                            <div className="w-1/2 h-2 bg-white/20 rounded" />
                                            <div className="mt-2 flex gap-2">
                                                <div className="w-10 h-10 bg-white/10 rounded border border-white/10" />
                                                <div className="w-10 h-10 bg-white/10 rounded border border-white/10" />
                                                <div className="w-10 h-10 bg-white/10 rounded border border-white/10" />
                                            </div>
                                        </div>
                                    </div>

                                    {isSelected && (
                                        <span className="absolute top-3 right-3 bg-blue-600 text-white text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded shadow z-20 flex items-center gap-1">
                                            <Check className="w-2.5 h-2.5" /> Ativo
                                        </span>
                                    )}

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
                                        <button
                                            onClick={() => handleSelect(tpl.id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                                        >
                                            <Sparkles className="w-3.5 h-3.5" /> Usar este
                                        </button>
                                        <button className="bg-white hover:bg-slate-100 text-slate-900 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors">
                                            <Eye className="w-3.5 h-3.5" /> Visualizar
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className={`font-bold text-sm ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-slate-800 dark:text-slate-200"}`}>
                                                {tpl.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Template #{tpl.id}</p>
                                        </div>
                                        {isSelected && (
                                            <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                                                <Check className="w-3.5 h-3.5 text-white" />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
