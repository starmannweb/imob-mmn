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
                {/* Fake Toggle Switch Dark */}
                <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer border border-slate-600">
                    <div className="w-4 h-4 bg-slate-400 rounded-full absolute top-[1px] left-[1px]"></div>
                </div>
                <span className="text-sm font-bold text-slate-300">Visualizar todos os imóveis (Admin/Dono)</span>
            </div>

            {/* Action Bar (Search, Count, Filters, Add Button) */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Busque por alguma informação..."
                            className="w-full bg-slate-900/50 border border-slate-700 text-slate-300 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                    </div>
                    <span className="text-xs font-bold text-slate-300 whitespace-nowrap bg-slate-800 px-3 py-1.5 rounded-md hidden md:inline-block">
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
                        <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Título do Imóvel</th>
                                        <th className="px-6 py-4 font-medium">Situação</th>
                                        <th className="px-6 py-4 font-medium">Venda</th>
                                        <th className="px-6 py-4 font-medium">Área</th>
                                        <th className="px-6 py-4 font-medium text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.map((prop) => (
                                        <tr key={prop.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900 max-w-xs truncate">
                                                {prop.title}
                                                <p className="text-xs text-slate-400 mt-1 font-normal truncate">/{prop.slug}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                                    ${prop.status === 'available' ? 'bg-green-100 text-green-700' :
                                                        prop.status === 'sold' ? 'bg-slate-200 text-slate-600' : 'bg-blue-100 text-blue-700'}`}>
                                                    {prop.status === 'available' ? 'Disponível' : prop.status === 'sold' ? 'Vendido' : 'Alugado'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-700 font-medium">
                                                {prop.price_sale ? `R$ ${prop.price_sale.toLocaleString('pt-BR')}` : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">
                                                {prop.area ? `${prop.area} m²` : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/imoveis/${prop.slug}`} target="_blank">
                                                        <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                                                            Ver Landing Page
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/painel/imoveis/${prop.id}/editar`}>
                                                        <Button variant="ghost" size="sm" className="text-amber-500 hover:bg-amber-50 hover:text-amber-600">
                                                            Editar
                                                        </Button>
                                                    </Link>
                                                    <form action={async () => {
                                                        "use server";
                                                        await deleteProperty(prop.id);
                                                    }}>
                                                        <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                                                            Excluir
                                                        </Button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
