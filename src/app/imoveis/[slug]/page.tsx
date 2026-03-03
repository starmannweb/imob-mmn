export const dynamic = 'force-dynamic';

import { createAdminClient } from "@/utils/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Home, Bath, BedDouble, Car, MapPin, Tag, CheckCircle2, Calculator, Share2, Menu, Moon, Heart, ChevronLeft, ChevronRight, Maximize, Ruler, Users, Building, AlertCircle, Phone, Globe } from "lucide-react";
import { ImageGallery } from "./ImageGallery";
import { PropertyCard } from "@/components/PropertyCard";

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

            {/* Header Público */}
            <header className="fixed top-0 w-full bg-[#0f172a] dark:bg-[#0b1120] border-b border-slate-800 shadow-sm z-50">
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

            <main className="flex-1 w-full pt-20">

                {/* Broker Mini Banner */}
                <div className="w-full bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 border-b border-blue-600">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-lg shadow-sm">
                            {p.owner?.full_name ? p.owner.full_name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() : 'RD'}
                        </div>
                        <h2 className="font-extrabold text-white text-base md:text-lg">{p.owner?.full_name || 'Ricieri de Moraes'}</h2>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                    {/* Breadcrumb da Imobiliária (Print 3) */}
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

                                {/* Hero Action Box */}
                                <div className="bg-white dark:bg-[#1e293b] border text-left border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden border-t-4 border-t-blue-600">
                                    <div className="p-6">

                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                                            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">Venda</span>
                                            <span>Código: 14782</span>
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Valor do Imóvel</p>
                                            <h2 className="text-3xl font-black text-blue-700 dark:text-blue-400 tracking-tight leading-none mb-6">
                                                R$ {p.price_sale ? p.price_sale.toLocaleString('pt-BR') : '1.625.000,00'}
                                            </h2>
                                        </div>

                                        <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500 dark:text-slate-400 font-medium">Condomínio</span>
                                                <span className="text-slate-900 dark:text-slate-100 font-bold">R$ {p.condominium || '-'}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500 dark:text-slate-400 font-medium">IPTU</span>
                                                <span className="text-slate-900 dark:text-slate-100 font-bold">R$ {p.iptu || '-'}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mt-8 mb-6">
                                            <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 transition-colors">
                                                <Share2 className="w-4 h-4" />
                                            </button>
                                            <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full py-2.5 text-xs font-bold transition-colors">
                                                Simular Financiamento
                                            </button>
                                        </div>

                                        {/* Contact Form */}
                                        <form className="flex flex-col gap-3">
                                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">Falar com o Corretor</h3>
                                            <input type="text" placeholder="Nome" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                            <input type="email" placeholder="E-mail" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                            <input type="tel" placeholder="Telefone" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                            <textarea placeholder={`Olá, ${p.owner?.full_name?.split(' ')[0] || 'RD'}. Tenho interesse no imóvel...`} className="w-full h-24 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"></textarea>

                                            <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg py-3 text-sm flex items-center justify-center gap-2 transition-all mt-2">
                                                Enviar Mensagem
                                            </button>

                                            <a href={`https://wa.me/5511999999999?text=Olá ${p.owner?.full_name?.split(' ')[0] || 'RD'}! Tenho interesse no imóvel ${p.title}`} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg py-3 text-sm flex items-center justify-center gap-2 transition-all mt-1">
                                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                                Conversar no WhatsApp
                                            </a>
                                        </form>

                                    </div>
                                </div>

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

            {/* Footer */}
            <footer className="bg-slate-50 dark:bg-[#0b1120] border-t border-slate-200 dark:border-slate-800 mt-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="font-extrabold text-xl leading-tight text-slate-900 dark:text-white">
                        Imob<span className="text-blue-600 text-[12px] uppercase align-top ml-1">Afiliação</span>
                    </span>
                    <p className="text-[11px] font-semibold text-slate-400">
                        &copy; 2026 Imob Afiliação. Todos direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
