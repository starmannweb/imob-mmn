export const dynamic = "force-dynamic";

import Link from "next/link";
import { Building2, LayoutGrid, List, Plus, Target, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { ImoveisSearchSidebar } from "./ImoveisSearchSidebar";

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

const PORTAIS = [
    { name: "ZAP Imóveis", logo: "ZAP", color: "bg-red-500", desc: "Maior portal de imóveis do Brasil", active: false, url: "https://www.zapimoveis.com.br" },
    { name: "Viva Real", logo: "VR", color: "bg-emerald-500", desc: "Portal focado em compra e locação", active: false, url: "https://www.vivareal.com.br" },
    { name: "OLX Imóveis", logo: "OLX", color: "bg-amber-500", desc: "Classificados com grande alcance", active: false, url: "https://www.olx.com.br" },
    { name: "Imovel Web", logo: "IW", color: "bg-blue-600", desc: "Portal com grande volume de buscas", active: false, url: "https://www.imovelweb.com.br" },
    { name: "GURU", logo: "GURU", color: "bg-purple-600", desc: "Plataforma inteligente de imóveis", active: false, url: "#" },
    { name: "62 Imóveis", logo: "62", color: "bg-orange-500", desc: "Portal regional de Goiás", active: false, url: "#" },
    { name: "Imóvel Guide", logo: "IG", color: "bg-cyan-600", desc: "Guia completo de imóveis", active: false, url: "#" },
    { name: "Lopes", logo: "LP", color: "bg-slate-800", desc: "Rede de imobiliárias premium", active: false, url: "https://www.lopes.com.br" },
    { name: "Casa Mineira", logo: "CM", color: "bg-green-700", desc: "Portal regional de Minas Gerais", active: false, url: "#" },
];

function PortaisTab() {
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                        <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Integração com Portais</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                            Publique seus imóveis automaticamente nos principais portais imobiliários do Brasil. Configure cada integração e gerencie tudo em um só lugar.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PORTAIS.map(portal => (
                        <div key={portal.name} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <div className={`${portal.color} w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs flex-shrink-0`}>
                                    {portal.logo}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{portal.name}</h3>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{portal.desc}</p>
                                </div>
                                <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                                    Inativo
                                </span>
                            </div>
                            <button className="w-full py-2 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-600 text-slate-500 dark:text-slate-400 hover:text-blue-600 text-xs font-semibold rounded-lg transition-colors">
                                Configurar integração
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3">
                    <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-0.5">!</div>
                    <p className="text-xs text-amber-800 dark:text-amber-300">
                        As integrações com portais externos requerem conta ativa em cada portal e a configuração de credenciais de API. Entre em contato com cada portal para obter suas chaves de acesso.
                    </p>
                </div>
            </div>
        </div>
    );
}

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
    searchParams: Promise<{ tab?: string; view?: string; status?: string; tipo?: string; negocio?: string; precoMin?: string; precoMax?: string; areaMin?: string; areaMax?: string; quartos?: string; bairro?: string; logradouro?: string; ref?: string }>;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const sp = await searchParams;
    const currentTab = sp.tab || "meus_imoveis";
    const viewMode = sp.view === "list" ? "list" : "grid";

    let query = user?.id
        ? supabase.from("properties").select("id, title, slug, status, area, price_sale").eq("owner_id", user.id)
        : null;

    if (query) {
        if (sp.status) query = query.eq("status", sp.status);
        if (sp.bairro) query = query.ilike("neighborhood", `%${sp.bairro}%`);
        if (sp.logradouro) query = query.ilike("address", `%${sp.logradouro}%`);
        if (sp.precoMin) query = query.gte("price_sale", Number(sp.precoMin));
        if (sp.precoMax) query = query.lte("price_sale", Number(sp.precoMax));
        if (sp.areaMin) query = query.gte("area", Number(sp.areaMin));
        if (sp.areaMax) query = query.lte("area", Number(sp.areaMax));
        query = query.order("created_at", { ascending: false });
    }

    const response = query ? await query : { data: [], error: null };

    if (response.error) console.error(response.error);
    const properties = (response.data || []) as Property[];

    const tabs = [
        { id: "meus_imoveis", label: "Meus imóveis" },
        { id: "marketplace", label: "Marketplace" },
        { id: "radar", label: "Radar Imobiliário", icon: <Target className="w-4 h-4" /> },
        { id: "portais", label: "Portais", icon: <Globe className="w-4 h-4" /> },
    ];

    return (
        <div className="animate-in flex-1 w-full max-w-[1500px]">
            <div className="flex flex-col lg:flex-row gap-8 w-full">
                <ImoveisSearchSidebar />

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

                    {currentTab === "portais" ? (
                        <PortaisTab />
                    ) : currentTab === "radar" ? (
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
