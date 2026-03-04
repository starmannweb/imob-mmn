export const dynamic = 'force-dynamic';

import { createAdminClient } from "@/utils/supabase/admin";
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
                 owner:users!owner_id(id, full_name)
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

                {/* Cover Banner — azul igual da principal */}
                <div className="w-full h-40 md:h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-30"></div>
                </div>

                {/* Avatar + Name — overlapping style */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
                    <div className="flex items-end gap-5 -mt-14">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white dark:bg-[#1e293b] border-4 border-white dark:border-[#0b1120] shadow-xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-3xl md:text-4xl shrink-0">
                            {p.owner?.full_name ? p.owner.full_name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() : 'RD'}
                        </div>
                        <div className="pb-2">
                            <h2 className="font-black text-slate-900 dark:text-white text-xl md:text-2xl leading-tight">{p.owner?.full_name || 'Ricieri de Moraes'}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">Corretor ImobAfiliado</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                    {/* Breadcrumb */}
                    <div className="text-xs text-slate-500 font-semibold mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                        <Link href="/" className="hover:text-blue-600">Imóveis Santos</Link> <ChevronRight className="w-3 h-3" />
                        <Link href="/" className="hover:text-blue-600">Embaré</Link> <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-800 dark:text-slate-200 truncate">{p.title}</span>
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
