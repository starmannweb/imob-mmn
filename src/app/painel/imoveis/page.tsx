export const dynamic = "force-dynamic";

import Link from "next/link";
import { Building2, History, LayoutGrid, List, Plus, Search, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

import { deleteProperty } from "./actions";

type Property = {
    id: string;
    title: string;
    slug: string;
    status: "available" | "sold" | "rented";
    area: number | null;
    price_sale: number | null;
};

const statusMap = {
    available: { label: "Disponível", classes: "bg-emerald-500/95 text-white" },
    sold: { label: "Vendido", classes: "bg-slate-800/95 text-white" },
    rented: { label: "Alugado", classes: "bg-blue-600/95 text-white" },
} as const;

function EmptyState({ title, description }: { title: string; description: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
            <Building2 className="w-16 h-16 text-slate-300 dark:text-slate-500 mb-6 stroke-[1.5]" />
            <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">{title}</h3>
            <p className="text-sm text-slate-500 max-w-sm">{description}</p>
        </div>
    );
}

export default async function ImoveisPage({
    searchParams,
}: {
    searchParams: Promise<{ tab?: string; view?: string }>;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const sp = await searchParams;
    const currentTab = sp.tab || "meus_imoveis";
    const viewMode = sp.view === "list" ? "list" : "grid";

    const response = user?.id
        ? await supabase
              .from("properties")
              .select("id, title, slug, status, area, price_sale")
              .eq("owner_id", user.id)
              .order("created_at", { ascending: false })
        : { data: [], error: null };

    if (response.error) console.error(response.error);
    const properties = (response.data || []) as Property[];

    const tabs = [
        { id: "meus_imoveis", label: "Meus imóveis" },
        { id: "marketplace", label: "Marketplace" },
        { id: "radar", label: "Radar Imobiliário", icon: <Target className="w-4 h-4" /> },
    ];

    return (
        <div className="animate-in flex-1 w-full max-w-[1500px]">
            <div className="flex flex-col lg:flex-row gap-8 w-full">
                <aside className="w-full lg:w-72 shrink-0">
                    <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
                        <h2 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Pesquisa</h2>
                        <div className="space-y-3">
                            {["Digite a referência, ou", "Digite o logradouro, ou"].map((placeholder) => (
                                <div key={placeholder} className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="text" placeholder={placeholder} className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400" />
                                </div>
                            ))}
                            <select className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-500 font-medium appearance-none">
                                <option>Selecione o condomínio, ou</option>
                            </select>
                            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-3 rounded-lg transition-colors shadow-sm shadow-emerald-500/20 mt-2">
                                Pesquisar por características
                            </button>
                        </div>
                        <div className="mt-8 border-t border-slate-100 dark:border-slate-800/80 pt-6">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm flex items-center gap-2"><Search className="w-4 h-4 text-slate-400" /> Últimas pesquisas</h3>
                            <div className="flex flex-col items-center justify-center py-6 text-slate-400">
                                <History className="w-6 h-6 mb-2 opacity-50" />
                                <span className="text-xs font-semibold">Sem histórico</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <section className="flex-1 min-w-0 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-6 bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-x-auto hide-scrollbar">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.id}
                                href={`/painel/imoveis?tab=${tab.id}`}
                                className={`flex-1 min-w-[120px] flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all ${
                                    currentTab === tab.id
                                        ? tab.id === "radar"
                                            ? "bg-blue-600 text-white border border-blue-600"
                                            : "bg-white text-slate-900 border border-slate-200 dark:bg-[#1e293b] dark:text-slate-200 dark:border-transparent"
                                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </Link>
                        ))}
                    </div>

                    {currentTab === "radar" ? (
                        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <Target className="w-6 h-6 text-blue-500" />
                                Radar de oportunidades | Imóveis compatíveis
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-2xl">
                                Esta área cruza os interesses dos clientes com o seu portfólio para destacar possíveis matches.
                            </p>
                            <EmptyState title="Nenhum cruzamento de oportunidades no momento." description="Atualize os perfis de busca dos seus leads no CRM para gerar matches." />
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-[#1e293b] px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm w-full sm:w-auto text-center">
                                    {properties.length} resultado{properties.length === 1 ? "" : "s"}
                                </span>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <div className="flex bg-white dark:bg-slate-800/50 p-1 rounded-lg border border-slate-200 dark:border-slate-700/50 shadow-sm h-10 items-center">
                                        <Link href={`/painel/imoveis?tab=${currentTab}&view=grid`} className={`p-2 rounded-md ${viewMode === "grid" ? "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white" : "text-slate-400 hover:text-slate-700"}`}><LayoutGrid className="w-4 h-4" /></Link>
                                        <Link href={`/painel/imoveis?tab=${currentTab}&view=list`} className={`p-2 rounded-md ${viewMode === "list" ? "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white" : "text-slate-400 hover:text-slate-700"}`}><List className="w-4 h-4" /></Link>
                                    </div>
                                    <Link href="/painel/imoveis/novo" className="w-full sm:w-auto">
                                        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 h-10 font-bold shadow-sm flex items-center gap-2 text-white">
                                            <Plus className="w-4 h-4" /> Cadastrar novo imóvel
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {currentTab === "marketplace" ? (
                                <EmptyState title="Marketplace vazio" description="Ainda não há imóveis de outros corretores disponíveis para rede no momento." />
                            ) : properties.length === 0 ? (
                                <EmptyState title="Nenhum imóvel encontrado" description="Você ainda não cadastrou nenhum imóvel no seu portfólio." />
                            ) : (
                                <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                                    {properties.map((prop) => {
                                        const status = statusMap[prop.status] || statusMap.available;
                                        return (
                                            <article key={prop.id} className={`bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden ${viewMode === "list" ? "flex flex-col sm:flex-row items-center gap-6 p-4" : "flex flex-col"}`}>
                                                <div className={`${viewMode === "list" ? "w-full sm:w-40 aspect-video shrink-0" : "aspect-[4/3]"} relative bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center`}>
                                                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${status.classes}`}>{status.label}</span>
                                                    <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                                                </div>
                                                <div className="p-5 flex-1 flex flex-col justify-between w-full">
                                                    <div>
                                                        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                                                            <Link href={`/painel/imoveis/${prop.id}/editar`} className="hover:text-blue-600">{prop.title}</Link>
                                                        </h3>
                                                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-4 truncate font-medium">/{prop.slug}</p>
                                                        {prop.area ? <div className="inline-flex bg-slate-50 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 text-[11px] px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800 font-bold">Área: {prop.area}m²</div> : null}
                                                    </div>
                                                    <div className="mt-5">
                                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Venda</p>
                                                        <p className="text-xl font-black text-slate-900 dark:text-white mb-4">{prop.price_sale ? `R$ ${prop.price_sale.toLocaleString("pt-BR")}` : "Sob consulta"}</p>
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <Link href={`/imoveis/${prop.slug}`} target="_blank"><Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs font-bold">Ver site</Button></Link>
                                                            <Link href={`/painel/imoveis/${prop.id}/editar`}><Button variant="ghost" size="sm" className="text-amber-600 bg-amber-50 hover:bg-amber-100 text-xs font-bold">Editar</Button></Link>
                                                            <form action={deleteProperty.bind(null, prop.id)}>
                                                                <Button variant="ghost" size="sm" className="text-red-500 bg-red-50 hover:bg-red-100 text-xs font-bold">Excluir</Button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}
