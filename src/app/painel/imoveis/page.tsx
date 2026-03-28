export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus, MoreHorizontal, Search, SlidersHorizontal, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProperty } from "./actions";

export default async function ImoveisPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
    const supabase = await createClient();

    // Buscar imóveis do corretor
    const { data: properties, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
    }

    const sp = await searchParams;
    const currentTab = sp.tab || 'meus_imoveis';

    return (
        <div className="animate-in flex-1 flex flex-col w-full max-w-[1400px]">

            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-xl w-full border border-slate-200 dark:border-slate-700/50">
                <Link href="/painel/imoveis?tab=meus_imoveis" className={`flex-1 flex justify-center items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all focus:outline-none ${currentTab === 'meus_imoveis' ? 'bg-white text-slate-900 border border-slate-200 dark:bg-[#1e293b] dark:text-slate-200 dark:border-transparent' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}>
                    Meus imóveis
                </Link>
                <Link href="/painel/imoveis?tab=marketplace" className={`flex-1 flex justify-center items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all focus:outline-none ${currentTab === 'marketplace' ? 'bg-white text-slate-900 border border-slate-200 dark:bg-[#1e293b] dark:text-slate-200 dark:border-transparent' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}>
                    Marketplace
                </Link>
            </div>

            {/* Admin Toggle */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 rounded-full relative cursor-pointer border border-slate-300 dark:border-slate-600">
                    <div className="w-4 h-4 bg-white dark:bg-slate-400 rounded-full absolute top-[1px] left-[1px] shadow-sm"></div>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Visão Modo Dono (Rede)</span>
            </div>

            {/* Action Bar (Search, Count, Filters, Add Button) */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                        <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Busque por alguma informação..."
                            className="w-full bg-slate-100 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm font-medium rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm border border-slate-200 dark:border-slate-700"
                        />
                    </div>
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap bg-slate-100 dark:bg-[#161e2e] px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hidden md:inline-block">
                        {properties?.length || 0} resultado{properties?.length === 1 ? '' : 's'}
                    </span>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex items-center justify-center gap-2 bg-transparent text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        <SlidersHorizontal className="w-4 h-4" /> Filtros
                    </button>
                    <Link href="/painel/imoveis/novo" className="w-full md:w-auto">
                        <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 font-bold shadow-sm flex items-center gap-2 text-white">
                            <Plus className="w-4 h-4" /> Cadastrar novo imóvel
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="w-full">
                {currentTab === 'meus_imoveis' ? (
                    properties && properties.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {properties.map((prop) => (
                                <div key={prop.id} className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 group flex flex-col">
                                    <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800/50 overflow-hidden flex items-center justify-center">
                                        <div className="absolute top-3 left-3 z-10 flex gap-2">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-sm border border-white/10 ${
                                                prop.status === 'available' ? 'bg-emerald-500/95 text-white' : 
                                                prop.status === 'sold' ? 'bg-slate-800/95 text-white' : 'bg-blue-600/95 text-white'
                                            }`}>
                                                {prop.status === 'available' ? 'Disponível' : prop.status === 'sold' ? 'Vendido' : 'Alugado'}
                                            </span>
                                        </div>
                                        {/* Placeholder de Imagem de Capa */}
                                        <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-600 stroke-[1.5] group-hover:scale-110 group-hover:text-blue-200 transition-all duration-500" />
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug mb-1">
                                                <Link href={`/painel/imoveis/${prop.id}/editar`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                    {prop.title}
                                                </Link>
                                            </h3>
                                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-4 truncate font-medium">/{prop.slug}</p>
                                            
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                 {prop.area && (
                                                     <div className="bg-slate-50 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 text-[11px] px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800 font-bold whitespace-nowrap flex items-center gap-1.5">
                                                         Área: {prop.area}m²
                                                     </div>
                                                 )}
                                            </div>
                                        </div>
                                        <div className="mt-auto">
                                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Venda</p>
                                            <p className="text-xl font-black text-slate-900 dark:text-white mb-5">
                                                {prop.price_sale ? `R$ ${prop.price_sale.toLocaleString('pt-BR')}` : 'Sob Consulta'}
                                            </p>
                                            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                                                <Link href={`/imoveis/${prop.slug}`} target="_blank" className="flex-1">
                                                    <Button variant="outline" size="sm" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 dark:border-blue-900/50 dark:hover:bg-blue-900/20 text-xs font-bold rounded-xl h-9">
                                                        Ver Site
                                                    </Button>
                                                </Link>
                                                <Link href={`/painel/imoveis/${prop.id}/editar`} className="flex-1">
                                                    <Button variant="ghost" size="sm" className="w-full text-amber-600 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/10 dark:hover:bg-amber-900/30 text-xs font-bold rounded-xl h-9">
                                                        Editar
                                                    </Button>
                                                </Link>
                                                <form action={async () => {
                                                    "use server";
                                                    await deleteProperty(prop.id);
                                                }}>
                                                    <Button variant="ghost" size="sm" className="px-3 text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/30 rounded-xl h-9">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </Button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <Building2 className="w-16 h-16 text-slate-300 dark:text-slate-500 mb-6 stroke-[1.5]" />
                            <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">Nenhum imóvel encontrado</h3>
                            <p className="text-sm text-slate-500 max-w-sm">Você ainda não cadastrou nenhum imóvel no seu portfólio.</p>
                        </div>
                    )
                ) : ( /* Marketplace View */
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <Building2 className="w-16 h-16 text-slate-300 dark:text-slate-500 mb-6 stroke-[1.5]" />
                        <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">Marketplace vazio</h3>
                        <p className="text-sm text-slate-500 max-w-sm">Ainda não há imóveis de outros corretores disponíveis para rede no momento.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
