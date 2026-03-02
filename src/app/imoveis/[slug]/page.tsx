export const dynamic = 'force-dynamic';

import { createAdminClient } from "@/utils/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Home, Bath, BedDouble, Car, MapPin, Tag, CheckCircle2, Calculator, Share2, Menu, Moon, Heart, ChevronLeft, ChevronRight, Maximize, Ruler, Users, Building, AlertCircle, Phone } from "lucide-react";

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
            owner: { full_name: "ZKF INTERMEDIACAO IMOBILIARIA LTDA", phone_whatsapp: "5513991396602" }
        };
    } else {
        const { data: propertyData, error } = await supabase
            .from("properties")
            .select(`
                 *,
                 owner:users!owner_id(id, full_name, phone_whatsapp)
             `)
            .eq("slug", slug)
            .maybeSingle();

        if (error || !propertyData) {
            notFound();
        }
        p = propertyData;
    }

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">

            {/* Header Público */}
            <header className="fixed top-0 w-full bg-white border-b border-slate-200 shadow-sm z-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-black text-xl italic tracking-tighter">
                            A
                        </div>
                        <div className="flex flex-col">
                            <span className="font-extrabold text-[15px] leading-tight text-slate-900">ADigital <span className="text-blue-600 font-bold">Afiliação</span></span>
                            <span className="text-[10px] text-slate-500 font-medium tracking-wide">Sistema <span className="text-blue-500">4%</span> • <span className="text-emerald-500">2%</span> • <span className="text-amber-500">1%</span></span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600">Entrar</Link>
                        <Link href="/registrar" className="text-sm font-semibold text-slate-600 hover:text-blue-600">Cadastrar-se</Link>
                        <div className="flex gap-2 items-center">
                            <Link href="/registrar">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2.5 text-sm font-bold shadow-md transition-all">
                                    Virar gestor afiliado
                                </button>
                            </Link>
                            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50">
                                <Moon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <button className="md:hidden p-2 text-slate-600"><Menu className="w-6 h-6" /></button>
                </div>
            </header>

            <main className="flex-1 w-full pt-20">

                {/* Broker Mini Banner */}
                <div className="w-full bg-[#d0dcfb]/30 border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 font-normal text-lg shadow-sm">
                            ZK
                        </div>
                        <h2 className="font-extrabold text-slate-900 text-base md:text-lg">{p.owner?.full_name || 'Agente Independente'}</h2>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                    {/* Breadcrumb da Imobiliária (Print 3) */}
                    <div className="text-xs text-slate-500 font-semibold mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                        <Link href="/" className="hover:text-blue-600">Imóveis Santos</Link> <ChevronRight className="w-3 h-3" />
                        <Link href="/" className="hover:text-blue-600">Embaré</Link> <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-800 truncate">{p.title}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* Left Column (Images, Desc, Features) */}
                        <div className="lg:col-span-8 flex flex-col gap-8">

                            {/* Image Gallery Section */}
                            <div>
                                <div className="relative w-full h-[400px] md:h-[500px] bg-slate-200 rounded-xl overflow-hidden mb-3 group cursor-pointer">
                                    {/* Mocking the main image from print */}
                                    <div className="absolute inset-0 bg-slate-300"></div>

                                    {/* Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>

                                    {/* Overlay Heart */}
                                    <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all">
                                        <Heart className="w-5 h-5" />
                                    </button>

                                    {/* Overlay Info Image Counter */}
                                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-3 text-white text-xs font-bold">
                                        <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-blue-300" />
                                        0 / 6
                                        <ChevronRight className="w-4 h-4 cursor-pointer hover:text-blue-300" />
                                    </div>

                                    {/* Fake Instagram icon from print */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center opacity-80 cursor-pointer hover:opacity-100 transition-opacity">
                                        {/* Ig icon approx */}
                                        <div className="w-10 h-10 border-2 border-white rounded-lg flex items-center justify-center relative">
                                            <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                                            <div className="w-1 h-1 bg-white rounded-full absolute top-1 right-1"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Thumbnails */}
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="w-24 h-16 bg-slate-200 rounded-lg shrink-0 cursor-pointer border-2 border-transparent hover:border-blue-500 transition-colors"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Title Header for mobile (desktop has it on right too, but let's follow print 4 layout) */}
                            <div className="border-b border-slate-200 pb-6 hidden md:block">
                                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-2">
                                    {p.title}
                                </h1>
                                <p className="text-slate-500 text-sm flex items-center">
                                    <MapPin className="w-4 h-4 mr-1 text-red-500" /> Embaré, Santos - SP
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 mb-4">Sobre o imóvel</h2>
                                <div className="text-sm font-medium text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {p.description}
                                </div>
                                <button className="text-blue-600 text-sm font-bold mt-2 hover:underline">Ler mais</button>
                            </div>

                            {/* Technical details */}
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 mb-4">Detalhes do Imóvel</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                            <Maximize className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Área Útil</p>
                                            <p className="font-bold text-slate-800">{p.area || '-'} m²</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                            <BedDouble className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quartos</p>
                                            <p className="font-bold text-slate-800">{p.bedrooms || '-'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                            <Bath className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Banheiros</p>
                                            <p className="font-bold text-slate-800">{p.bathrooms || '-'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                            <Car className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Vagas</p>
                                            <p className="font-bold text-slate-800">{p.parking_spaces || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Characteristics Grid */}
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 mb-4">Características</h2>
                                <div className="grid grid-cols-2 gap-y-3">
                                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cozinha
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Garagem
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Piscina
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Varanda
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Churrasqueira
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Lavanderia
                                    </div>
                                </div>
                            </div>

                            {/* Map Section */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-slate-800">Endereço</h2>
                                    <button className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-blue-200">
                                        Ver no mapa
                                    </button>
                                </div>
                                <p className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Rua Endereço Não Divulgado, Embaré, Santos - SP
                                </p>
                                <div className="w-full h-[300px] bg-slate-200 rounded-xl overflow-hidden relative">
                                    {/* Mock Map Image */}
                                    <div className="absolute inset-0 bg-slate-300"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <MapPin className="w-10 h-10 text-slate-400 drop-shadow-lg" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Column (Widget / Form / Broker Info) */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-28 flex flex-col gap-6">

                                {/* Hero Action Box */}
                                <div className="bg-white border text-left border-slate-200 rounded-2xl shadow-sm overflow-hidden border-t-4 border-t-blue-600">
                                    <div className="p-6">

                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                                            <span className="bg-slate-100 px-2 py-0.5 rounded">Venda</span>
                                            <span>Código: 14782</span>
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-slate-500 mb-1">Valor do Imóvel</p>
                                            <h2 className="text-3xl font-black text-blue-700 tracking-tight leading-none mb-6">
                                                R$ {p.price_sale ? p.price_sale.toLocaleString('pt-BR') : '1.625.000,00'}
                                            </h2>
                                        </div>

                                        <div className="space-y-3 pt-6 border-t border-slate-100">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500 font-medium">Condomínio</span>
                                                <span className="text-slate-900 font-bold">R$ {p.condominium || '-'}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500 font-medium">IPTU</span>
                                                <span className="text-slate-900 font-bold">R$ {p.iptu || '-'}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mt-8 mb-6">
                                            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-colors">
                                                <Share2 className="w-4 h-4" />
                                            </button>
                                            <button className="flex-1 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-full py-2.5 text-xs font-bold transition-colors">
                                                Simular Financiamento
                                            </button>
                                        </div>

                                        {/* Contact Form */}
                                        <form className="flex flex-col gap-3">
                                            <h3 className="text-sm font-bold text-slate-800 mb-1">Falar com o Corretor</h3>
                                            <input type="text" placeholder="Nome" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                            <input type="email" placeholder="E-mail" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                            <input type="tel" placeholder="Telefone" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                            <textarea placeholder="Olá, ZK. Tenho interesse no imóvel..." className="w-full h-24 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"></textarea>

                                            <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg py-3 text-sm flex items-center justify-center gap-2 transition-all mt-2">
                                                Enviar Mensagem
                                            </button>

                                            <a href={`https://wa.me/${p.owner?.phone_whatsapp || '55'}`} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg py-3 text-sm flex items-center justify-center gap-2 transition-all mt-1">
                                                <Phone className="w-4 h-4" /> Conversar no WhatsApp
                                            </a>
                                        </form>

                                    </div>
                                </div>

                                {/* Broker Card Info */}
                                <div className="bg-white border text-left border-slate-200 rounded-2xl shadow-sm p-6 flex items-start gap-4">
                                    <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xl shrink-0">
                                        ZK
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Anunciante Oficial</span>
                                        <h4 className="font-extrabold text-slate-900 text-sm mb-1">{p.owner?.full_name || 'Agente Independente'}</h4>
                                        <Link href="#" className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
                                            Ver todos os imóveis <ChevronRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-50 border-t border-slate-200 mt-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="font-extrabold text-[15px] leading-tight text-slate-900">ADigital <span className="text-blue-600 font-bold">Afiliação</span></div>
                    <p className="text-[11px] font-semibold text-slate-400">
                        &copy; 2026 Imobiliária ADigital. Todos direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
