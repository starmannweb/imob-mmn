export const dynamic = 'force-dynamic';

import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Home, Bath, BedDouble, Car, MapPin, Tag, CheckCircle2, Calculator, Share2, Menu, Moon, Heart, ChevronLeft, ChevronRight, Maximize, Ruler, Users, Building, AlertCircle, Phone, Globe, Mail } from "lucide-react";
import { ImageGallery } from "./ImageGallery";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyActionBox } from "./PropertyActionBox";

interface Property {
    id: string;
    title: string;
    description: string;
    price_sale: number | null;
    price_rent: number | null;
    area: number | null;
    bedrooms: number | null;
    suites: number | null;
    bathrooms: number | null;
    parking_spaces: number | null;
    condominium: number | null;
    iptu: number | null;
    owner_id: string;
}

export default async function PropertyPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const supabase = createAdminClient();
    const supabaseUser = await createClient();
    const { data: { user } } = await supabaseUser.auth.getUser();

    let p: any = null;

    if (slug === 'exemplo') {
        p = {
            title: "Casa Sobreposta Alta com Piscina e Churrasqueira para Venda com 3 Quartos",
            price_sale: 1625000,
            area: 155,
            bedrooms: 3,
            bathrooms: 5,
            parking_spaces: 2,
            description: "Casa sobreposta alta nova com excelente padrão de acabamento, possuindo 3 dormitórios sendo as 3 suítes, sala ampla para 2 ambientes com lavabo e sacada envidraçada. Escada em granito, cozinha ampla e arejada, área de serviço enorme com acesso livre...\n\nLocalização ótima!\n\nEntre em contato para agendar uma visita!",
            owner: { full_name: "Ricieri de Moraes" }
        };
    } else {
        const { data: propertyData, error } = await supabase
            .from("properties")
            .select(`
                 *,
                 owner:users!owner_id(id, full_name, referral_code)
             `)
            .eq("slug", slug)
            .maybeSingle();

        if (error || !propertyData) {
            notFound();
        }
        p = propertyData;
    }

    let similares: any[] = [];
    if (slug === 'exemplo') {
        similares = Array(4).fill({
            slug: 'exemplo',
            title: "Casa de Alto Padrão em Bairro Nobre",
            price_sale: 1800000,
            area: 180,
            bedrooms: 4,
            bathrooms: 4,
            parking_spaces: 3,
            city: "Santos",
            state: "SP",
            image_url: "https://images.unsplash.com/photo-1600607687930-ceaf5a8c51de?auto=format&fit=crop&w=800&q=80"
        });
    } else {
        const { data: simData } = await supabase
            .from("properties")
            .select(`*, owner:users!owner_id(id, full_name)`)
            .neq("id", p.id)
            .limit(4);
        similares = simData || [];
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b1120] flex flex-col font-sans">

            {/* ═══════════════════════════════════════════════════ */}
            {/* HEADER PÚBLICO */}
            {/* ═══════════════════════════════════════════════════ */}
            <header className="sticky top-0 z-50 bg-[#0f172a] dark:bg-[#0b1120] border-b border-slate-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="text-2xl font-bold tracking-tight text-white shrink-0">
                                Imob<span className="text-blue-500 text-sm align-top ml-1">Afiliação</span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/registrar" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 text-xs font-bold shadow-md transition-all flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5" /> Virar gestor Imob
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full">

                <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-30"></div>

                    <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white shadow-xl flex items-center justify-center text-4xl md:text-5xl font-black text-blue-600 shrink-0">
                                {p.owner?.full_name ? p.owner.full_name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() : 'RD'}
                            </div>

                            <div className="text-center md:text-left">
                                <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-1 tracking-tight uppercase">
                                    {p.owner?.full_name || 'Ricieri de Moraes'}
                                </h1>
                                <p className="text-blue-100 text-sm font-medium mb-2">@imobafiliado</p>
                                <p className="text-blue-50/70 text-sm max-w-lg mb-6">
                                    {p.owner?.full_name || 'Ricieri de Moraes'} - Corretor Imobiliário. Encontre os melhores imóveis com atendimento personalizado.
                                </p>

                                {/* Botões de Contato */}
                                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                                    <a
                                        href={`https://wa.me/5511999999999?text=Olá ${p.owner?.full_name || 'Corretor'}, estava vendo o imóvel no site.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg transition-all min-w-[180px] justify-center"
                                    >
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Entrar em Contato
                                    </a>
                                    <a
                                        href={`tel:5511999999999`}
                                        className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg transition-all min-w-[150px] justify-center"
                                    >
                                        <Phone className="w-4 h-4" />
                                        Ligar
                                    </a>
                                    <a
                                        href={`mailto:${p.owner?.email || 'contato@exemplo.com'}`}
                                        className="bg-white hover:bg-slate-50 text-blue-600 px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg transition-all min-w-[150px] justify-center"
                                    >
                                        <Mail className="w-4 h-4" />
                                        Enviar E-mail
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                    {/* Breadcrumb */}
                    <div className="text-xs text-slate-500 font-semibold mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                        {user ? (
                            <Link href="/painel" className="hover:text-blue-600">Painel</Link>
                        ) : (
                            <Link href="/" className="hover:text-blue-600">Início</Link>
                        )}
                        <ChevronRight className="w-3 h-3" />
                        <Link href={`/corretor/${p.owner?.referral_code || p.owner_id || p.owner?.id}`} className="hover:text-blue-600 truncate max-w-[150px] sm:max-w-none">
                            Imóveis de {p.owner?.full_name?.split(' ')[0] || 'Corretor'}
                        </Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-800 dark:text-slate-200 truncate max-w-[180px] sm:max-w-none">{p.title}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* Left Column (Images, Desc, Features) */}
                        <div className="lg:col-span-8 flex flex-col gap-8">

                            {/* Image Gallery Section */}
                            <ImageGallery images={p.image_url ? [p.image_url] : []} />

                            {/* Title Header for mobile (desktop has it on right too, but let's follow print 4 layout) */}
                            <div className="border-b border-slate-200 dark:border-slate-800 pb-6 hidden md:block">
                                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">
                                    {p.title}
                                </h1>
                                <p className="text-slate-500 text-sm flex items-center">
                                    <MapPin className="w-4 h-4 mr-1 text-red-500" /> Embaré, Santos - SP
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Sobre o imóvel</h2>
                                <div className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                    {p.description}
                                </div>
                                <button className="text-blue-600 dark:text-blue-400 text-sm font-bold mt-2 hover:underline">Ler mais</button>
                            </div>

                            {/* Technical details */}
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Detalhes do Imóvel</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                            <Maximize className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Área Útil</p>
                                            <p className="font-bold text-slate-800 dark:text-slate-200">{p.area || '-'} m²</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                            <BedDouble className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quartos</p>
                                            <p className="font-bold text-slate-800 dark:text-slate-200">{p.bedrooms || '-'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                            <Bath className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Banheiros</p>
                                            <p className="font-bold text-slate-800 dark:text-slate-200">{p.bathrooms || '-'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                            <Car className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Vagas</p>
                                            <p className="font-bold text-slate-800 dark:text-slate-200">{p.parking_spaces || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Characteristics Grid */}
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Características</h2>
                                <div className="grid grid-cols-2 gap-y-3">
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cozinha
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Garagem
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Piscina
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Varanda
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Churrasqueira
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Lavanderia
                                    </div>
                                </div>
                            </div>

                            {/* Map Section */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Endereço</h2>
                                    <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-1.5 rounded-lg transition-colors border border-blue-200 dark:border-blue-800">
                                        Ver no mapa
                                    </button>
                                </div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Rua Endereço Não Divulgado, Embaré, Santos - SP
                                </p>
                                <div className="w-full h-[300px] bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden relative border border-slate-200 dark:border-slate-700">
                                    <iframe width="100%" height="100%" frameBorder="0" scrolling="no" src="https://www.openstreetmap.org/export/embed.html?bbox=-46.3359%2C-23.9782%2C-46.3159%2C-23.9582&amp;layer=mapnik&amp;marker=-23.9682%2C-46.3259"></iframe>
                                </div>
                            </div>

                        </div>

                        {/* Right Column (Widget / Form / Broker Info) */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-28 flex flex-col gap-6">

                                {/* Hero Action Box — client component com simulador */}
                                <PropertyActionBox
                                    price={p.price_sale || 1625000}
                                    ownerName={p.owner?.full_name || 'Ricieri de Moraes'}
                                    title={p.title}
                                    condominium={p.condominium || ''}
                                    iptu={p.iptu || ''}
                                />

                                {/* Broker Card Info */}
                                <div className="bg-white dark:bg-[#1e293b] border text-left border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 flex items-start gap-4">
                                    <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xl shrink-0">
                                        {p.owner?.full_name ? p.owner.full_name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() : 'RD'}
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Anunciante Oficial</span>
                                        <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">{p.owner?.full_name || 'Ricieri de Moraes'}</h4>
                                        <Link href="#" className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
                                            Ver todos os imóveis <ChevronRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Imóveis Similares */}
                {similares.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pb-8 border-t border-slate-200 dark:border-slate-800 pt-16">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Imóveis Similares</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {similares.map((sim, i) => (
                                <PropertyCard
                                    key={sim.id || i}
                                    property={sim}
                                    brokerName={sim.owner?.full_name || p.owner?.full_name || 'Ricieri de Moraes'}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer — Info do Corretor */}
            <footer className="bg-white dark:bg-[#0f172a] border-t border-slate-200 dark:border-slate-800 mt-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                        {/* Col 1 — Corretor */}
                        <div>
                            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xl mb-4">
                                {p.owner?.full_name ? p.owner.full_name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() : 'RD'}
                            </div>
                            <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-wide mb-2">{p.owner?.full_name || 'Ricieri de Moraes'}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                {p.owner?.full_name || 'Ricieri de Moraes'} — Corretor ImobAfiliado. Encontre os melhores imóveis com atendimento personalizado.
                            </p>
                        </div>

                        {/* Col 2 — Links Rápidos */}
                        <div>
                            <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Links Rápidos</h5>
                            <ul className="space-y-2.5">
                                <li><Link href="/" className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sobre Nós</Link></li>
                                <li><Link href="/" className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Como Funciona</Link></li>
                                <li><Link href="/registrar" className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Anunciar Imóvel</Link></li>
                            </ul>
                        </div>

                        {/* Col 3 — Suporte */}
                        <div>
                            <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Suporte</h5>
                            <ul className="space-y-2.5">
                                <li><Link href="/" className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Perguntas Frequentes</Link></li>
                                <li><Link href="/" className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Fale Conosco</Link></li>
                                <li><Link href="/" className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Termos de uso e política de privacidade</Link></li>
                            </ul>
                        </div>

                        {/* Col 4 — Contato */}
                        <div>
                            <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Contato</h5>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                                        <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Telefone</span>
                                        <span className="text-xs text-slate-700 dark:text-slate-200 font-semibold">13 99139-6802</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                                        <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">E-mail</span>
                                        <span className="text-xs text-slate-700 dark:text-slate-200 font-semibold">contato@imobafiliacao.com.br</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Copyright bar */}
                <div className="border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <span className="font-extrabold text-xl leading-tight text-slate-900 dark:text-white">
                            Imob<span className="text-blue-600 text-[12px] uppercase align-top ml-1">Afiliação</span>
                        </span>
                        <p className="text-[11px] font-semibold text-slate-400">
                            &copy; 2026 Imob Afiliação. Todos direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
