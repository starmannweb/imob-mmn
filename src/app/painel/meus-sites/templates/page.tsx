export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ChevronRight, Check } from "lucide-react";
import Link from "next/link";

export default async function TemplatesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Templates disponíveis
    const templates = [
        { id: 1, name: "Modelos Urbanos", category: "urbano", image: "/templates/urbano-1.jpg" },
        { id: 2, name: "Modelos Urbanos", category: "urbano", image: "/templates/urbano-2.jpg" },
        { id: 3, name: "Modelos Urbanos", category: "urbano", image: "/templates/urbano-3.jpg" },
        { id: 4, name: "Modelos Rurais", category: "rural", image: "/templates/rural-1.jpg" },
        { id: 5, name: "Modelos Rurais", category: "rural", image: "/templates/rural-2.jpg" },
        { id: 6, name: "Modelos Rurais", category: "rural", image: "/templates/rural-3.jpg" },
        { id: 7, name: "Modelos Praia", category: "praia", image: "/templates/praia-1.jpg" },
        { id: 8, name: "Modelos Praia", category: "praia", image: "/templates/praia-2.jpg" },
        { id: 9, name: "Modelos Praia", category: "praia", image: "/templates/praia-3.jpg" },
        { id: 10, name: "Outros modelos", category: "outros", image: "/templates/outros-1.jpg" },
        { id: 11, name: "Outros modelos", category: "outros", image: "/templates/outros-2.jpg" },
        { id: 12, name: "Outros modelos", category: "outros", image: "/templates/outros-3.jpg" },
    ];

    const categories = [
        { id: "urbano", name: "Modelos Urbanos" },
        { id: "rural", name: "Modelos Rurais" },
        { id: "praia", name: "Modelos Praia" },
        { id: "outros", name: "Outros modelos" },
    ];

    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl pb-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 w-full">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/painel/meus-sites" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Meus Sites</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Modelos de site</span>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Modelos de site</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Escolha um modelo para personalizar seu site</p>
            </div>

            {/* Sidebar + Content */}
            <div className="flex gap-6">
                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden sticky top-24">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Categorias</h3>
                        </div>
                        <nav className="p-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                                >
                                    {category.name}
                                </button>
                            ))}
                        </nav>
                        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                                Personalizar
                            </button>
                            <button className="w-full mt-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                                Histórico de versões
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Templates Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                                    {/* Placeholder para imagem do template */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                                        <div className="text-center p-6">
                                            <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
                                                <span className="text-2xl font-bold text-slate-400">#{template.id}</span>
                                            </div>
                                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{template.name}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
                                            Visualizar
                                        </button>
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
                                            <Check className="w-4 h-4" /> Usar este
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{template.name}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Template #{template.id}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
