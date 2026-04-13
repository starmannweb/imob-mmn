export const dynamic = "force-dynamic";

import { createAdminClient } from "@/utils/supabase/admin";
import { Search, MapPin, Bed, Bath, Car, Maximize2, SlidersHorizontal, Building2, Home, ChevronRight, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function ImoveisPortalPage({
    searchParams,
}: {
    searchParams: Promise<{ tipo?: string; negocio?: string; cidade?: string; precoMin?: string; precoMax?: string; quartos?: string }>;
}) {
    const sp = await searchParams;
    const supabase = createAdminClient();

    let query = supabase
        .from("properties")
        .select(`
            id, title, slug, type, price_sale, price_rent,
            bedrooms, bathrooms, parking_spaces, area,
            neighborhood, city, state,
            cover_image_url, status
        `)
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .limit(24);

    if (sp.tipo) query = query.eq("type", sp.tipo);
    if (sp.negocio === "venda") query = query.not("price_sale", "is", null);
    if (sp.negocio === "locacao") query = query.not("price_rent", "is", null);
    if (sp.cidade) query = query.ilike("city", `%${sp.cidade}%`);
    if (sp.precoMin) query = query.gte("price_sale", Number(sp.precoMin));
    if (sp.precoMax) query = query.lte("price_sale", Number(sp.precoMax));
    if (sp.quartos) query = query.gte("bedrooms", Number(sp.quartos.replace("+", "")));

    const { data: properties } = await query;

    const fmt = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Top bar */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm">I</div>
                        <span className="font-extrabold text-slate-900 dark:text-white text-lg">Imob<span className="text-blue-600">Painel</span></span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-400">
                        <Link href="/imoveis-portal" className="text-blue-600">Imóveis</Link>
                        <Link href="#" className="hover:text-slate-900 dark:hover:text-white">Lançamentos</Link>
                        <Link href="#" className="hover:text-slate-900 dark:hover:text-white">Corretores</Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">Entrar</Link>
                        <Link href="/registrar" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors">Sou Corretor</Link>
                    </div>
                </div>
            </header>

            {/* Hero search */}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 py-14 px-4">
                <div className="max-w-4xl mx-auto text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Encontre seu imóvel ideal</h1>
                    <p className="text-blue-200 text-lg">Milhares de imóveis disponíveis para compra e locação</p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <form className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-3 flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <select name="negocio" defaultValue={sp.negocio || ""}
                                className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 outline-none">
                                <option value="">Comprar ou Alugar</option>
                                <option value="venda">Comprar</option>
                                <option value="locacao">Alugar</option>
                            </select>
                            <select name="tipo" defaultValue={sp.tipo || ""}
                                className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 outline-none">
                                <option value="">Tipo de Imóvel</option>
                                <option value="Apartamento">Apartamento</option>
                                <option value="Casa">Casa</option>
                                <option value="Terreno">Terreno</option>
                                <option value="Comercial">Comercial</option>
                                <option value="Studio">Studio / Kitnet</option>
                                <option value="Cobertura">Cobertura</option>
                            </select>
                            <input name="cidade" defaultValue={sp.cidade || ""}
                                placeholder="Cidade ou bairro..."
                                className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button type="submit"
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shadow-lg">
                            <Search className="w-4 h-4" /> Buscar
                        </button>
                    </form>
                </div>
            </div>

            {/* Results */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {properties?.length || 0} imóveis encontrados
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>Ordenar por: Mais recentes</span>
                    </div>
                </div>

                {!properties || properties.length === 0 ? (
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-16 text-center">
                        <Building2 className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Nenhum imóvel encontrado</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Tente ajustar os filtros de busca.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {properties.map(prop => (
                            <article key={prop.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                {/* Image */}
                                <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-700 relative flex items-center justify-center">
                                    {prop.cover_image_url ? (
                                        <img src={prop.cover_image_url} alt={prop.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <Home className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                                    )}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        {prop.price_sale && (
                                            <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">Venda</span>
                                        )}
                                        {prop.price_rent && (
                                            <span className="bg-purple-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">Locação</span>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 flex-1 flex flex-col">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{prop.type}</p>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-2 line-clamp-2">{prop.title}</h3>
                                    {(prop.neighborhood || prop.city) && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-3">
                                            <MapPin className="w-3 h-3 flex-shrink-0" />
                                            {[prop.neighborhood, prop.city, prop.state].filter(Boolean).join(", ")}
                                        </p>
                                    )}

                                    {/* Stats */}
                                    <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mb-3 flex-wrap">
                                        {prop.bedrooms > 0 && <span className="flex items-center gap-1"><Bed className="w-3 h-3" /> {prop.bedrooms}</span>}
                                        {prop.bathrooms > 0 && <span className="flex items-center gap-1"><Bath className="w-3 h-3" /> {prop.bathrooms}</span>}
                                        {prop.parking_spaces > 0 && <span className="flex items-center gap-1"><Car className="w-3 h-3" /> {prop.parking_spaces}</span>}
                                        {prop.area > 0 && <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3" /> {prop.area}m²</span>}
                                    </div>

                                    <div className="mt-auto">
                                        <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                                            {prop.price_sale ? fmt(prop.price_sale) : prop.price_rent ? `${fmt(prop.price_rent)}/mês` : "Sob consulta"}
                                        </p>
                                        <Link href={`/imoveis/${prop.slug}`}
                                            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors">
                                            Ver detalhes <ChevronRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12 px-4 mt-16">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 justify-between">
                    <div>
                        <span className="text-2xl font-extrabold">Imob<span className="text-blue-500">Painel</span></span>
                        <p className="text-slate-400 text-sm mt-2 max-w-xs">Plataforma imobiliária para corretores e clientes.</p>
                    </div>
                    <div className="flex gap-12 text-sm">
                        <div className="space-y-2">
                            <p className="font-bold text-slate-300 uppercase tracking-wider text-xs mb-3">Navegação</p>
                            <Link href="/imoveis-portal" className="block text-slate-400 hover:text-white transition-colors">Imóveis</Link>
                            <Link href="/registrar" className="block text-slate-400 hover:text-white transition-colors">Sou Corretor</Link>
                            <Link href="/login" className="block text-slate-400 hover:text-white transition-colors">Login</Link>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} ImobPainel. Todos os direitos reservados.
                </div>
            </footer>
        </div>
    );
}
