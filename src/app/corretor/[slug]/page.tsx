export const dynamic = 'force-dynamic';

import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Building, Bed, BedDouble, Bath, Car, Maximize2, Maximize, X, AlertCircle, Share2, Filter, Home, LandPlot, CheckCircle2, ChevronRight, Mic, Globe, Mail, Phone, Facebook, Instagram, Star, Sun, Moon, Edit3 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default async function BrokerPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const supabase = createAdminClient();

    // Verificar se o slug é um UUID válido
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

    // Buscar dados do corretor
    let broker: any = null;

    const { data: byCode } = await supabase
        .from("users")
        .select("id, full_name, referral_code, document, creci")
        .ilike("referral_code", slug)
        .maybeSingle();

    if (byCode) {
        broker = byCode;
    } else if (isUUID) {
        const { data: byId } = await supabase
            .from("users")
            .select("id, full_name, referral_code, document, creci")
            .eq("id", slug)
            .maybeSingle();
        broker = byId;
    }

    if (!broker) {
        notFound();
    }

    // Buscar os imóveis da carteira desse corretor
    const { data: properties } = await supabase
        .from("properties")
        .select("*")
        .eq("owner_id", broker.id)
        .order('created_at', { ascending: false });

    // Separar imóveis em destaque (os 3 primeiros)
    const featured = properties?.slice(0, 3) || [];
    const allProperties = properties || [];

    // Gerar iniciais do nome
    const initials = broker.full_name
        ?.split(' ')
        .filter(Boolean)
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || '?';

    // Handle do corretor (primeira parte do nome ou referral_code)
    const handle = broker.referral_code ? `@${broker.referral_code}` : '';

    // Verificar current user para edição
    const authClient = await createClient();
    const { data: { user } } = await authClient.auth.getUser();
    const isOwner = user?.id === broker.id;

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b1120] flex flex-col">

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

            {/* ═══════════════════════════════════════════════════ */}
            {/* HERO DO CORRETOR */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className="relative overflow-hidden group">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-30"></div>

                {isOwner && (
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href="/painel/configuracoes?edit=true&tab=info" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/30 shadow-sm">
                            <Edit3 className="w-3.5 h-3.5" /> Alterar Capa
                        </Link>
                    </div>
                )}

                <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white shadow-xl flex items-center justify-center text-4xl md:text-5xl font-black text-blue-600 shrink-0 relative group/avatar overflow-hidden">
                            {initials}
                            {isOwner && (
                                <Link title="Alterar Logo" href="/painel/configuracoes?edit=true&tab=info" className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity backdrop-blur-[1px]">
                                    <Edit3 className="w-5 h-5 text-white mb-0.5" />
                                </Link>
                            )}
                        </div>

                        <div className="text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-1 tracking-tight uppercase">
                                {broker.full_name}
                            </h1>
                            {handle && (
                                <p className="text-blue-100 text-sm font-medium mb-2">{handle}</p>
                            )}
                            <p className="text-blue-50/70 text-sm max-w-lg mb-6">
                                {broker.full_name} - Corretor Imobiliário. Encontre os melhores imóveis com atendimento personalizado.
                            </p>

                            {/* Botões de Contato */}
                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                                <a
                                    href={`https://wa.me/5511999999999?text=Olá ${broker.full_name}, estava vendo seus imóveis no site.`}
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
                                    href={`mailto:contato@exemplo.com`}
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

            <main className="flex-1 w-full">

                {/* ═══════════════════════════════════════════════════ */}
                {/* FILTROS RÁPIDOS (movido para antes dos destaques) */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="bg-slate-50 dark:bg-[#111827] border-y border-slate-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <Filter className="w-5 h-5 text-blue-600" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Filtros Rápidos</h3>
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button className="flex items-center gap-2 bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 px-4 py-2 rounded-full text-xs font-bold transition-colors w-full sm:w-auto justify-center">
                                    <Mic className="w-4 h-4" /> Busca por Voz com IA
                                </button>
                            </div>
                        </div>

                        {/* Dropdowns de filtro */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Preferência</label>
                                <select className="w-full bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer">
                                    <option>Todos</option>
                                    <option>Venda</option>
                                    <option>Locação</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Tipo de Imóvel</label>
                                <select className="w-full bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer">
                                    <option>Todos os tipos</option>
                                    <option>Casa</option>
                                    <option>Apartamento</option>
                                    <option>Sobrado</option>
                                    <option>Terreno</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Buscar</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Cidade, bairro, código..."
                                        className="w-full bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Acesso Rápido — Botões de tipo */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">Acesso Rápido</label>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { icon: Home, label: 'Casa' },
                                    { icon: Building, label: 'Casa de Condomínio' },
                                    { icon: Building, label: 'Sobrado' },
                                    { icon: Building, label: 'Sobrado de Condomínio' },
                                    { icon: LandPlot, label: 'Terreno' },
                                ].map((item) => (
                                    <button
                                        key={item.label}
                                        className="flex items-center gap-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.label}
                                    </button>
                                ))}
                                {/* Botão de Ocultar Filtros */}
                                <button className="ml-auto inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm mt-2 sm:mt-0">
                                    <X className="w-4 h-4" /> Ocultar Filtros
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════ */}
                {/* IMÓVEIS EM DESTAQUE */}
                {/* ═══════════════════════════════════════════════════ */}
                {featured.length > 0 && (
                    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                                Imóveis em <span className="text-blue-600">Destaque</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                                Confira os imóveis selecionados desta semana
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featured.map((prop: any) => (
                                <FeaturedPropertyCard key={prop.id} property={prop} brokerName={broker.full_name} featured />
                            ))}
                        </div>
                    </section>
                )}

                {/* ═══════════════════════════════════════════════════ */}
                {/* LISTAGEM — IMÓVEIS DISPONÍVEIS */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="bg-slate-50 border-t border-slate-200 dark:bg-[#0f172a] dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
                                    Imóveis <span className="text-blue-600">Disponíveis</span>
                                </h3>
                            </div>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent mx-4 hidden md:block"></div>
                        </div>


                        {allProperties.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {allProperties.map((prop: any) => (
                                    <FeaturedPropertyCard key={prop.id} property={prop} brokerName={broker.full_name} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#111827] rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                                <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                                <p className="font-medium">Nenhum imóvel disponível.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* ═══════════════════════════════════════════════════ */}
            {/* FOOTER */}
            {/* ═══════════════════════════════════════════════════ */}
            <footer className="bg-slate-50 dark:bg-[#0b1120] border-t border-slate-200 dark:border-slate-800 mt-auto">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                        {/* Coluna 1 — Sobre */}
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg mb-4">
                                {initials}
                            </div>
                            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm uppercase mb-2">
                                {broker.full_name}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                {broker.full_name} - Corretor Imobiliário. Encontre os melhores imóveis com atendimento personalizado.
                            </p>
                        </div>

                        {/* Coluna 2 — Links */}
                        <div>
                            <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-4">Links Rápidos</h4>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors font-medium">• Sobre Nós</Link></li>
                                <li><Link href="#" className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors font-medium">• Como Funciona</Link></li>
                                <li><Link href="#" className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors font-medium">• Anunciar Imóvel</Link></li>
                            </ul>
                        </div>

                        {/* Coluna 3 — Suporte */}
                        <div>
                            <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-4">Suporte</h4>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors font-medium">• Perguntas Frequentes</Link></li>
                                <li><Link href="#" className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors font-medium">• Fale Conosco</Link></li>
                                <li><Link href="#" className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors font-medium">• Termos de uso e política de privacidade</Link></li>
                            </ul>
                        </div>

                        {/* Coluna 4 — Contato */}
                        <div>
                            <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-4">Contato</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Telefone: (11) 99999-9999</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">contato@imob.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sub-footer */}
                <div className="border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold tracking-tight text-slate-400">
                                Imob<span className="text-blue-500 text-[10px] align-top ml-1 uppercase group-hover:text-blue-400">Afiliação</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="text-slate-400 hover:text-blue-500 transition-colors"><Facebook className="w-4 h-4" /></Link>
                            <Link href="#" className="text-slate-400 hover:text-pink-500 transition-colors"><Instagram className="w-4 h-4" /></Link>
                        </div>
                        <p className="text-[11px] font-medium text-slate-400">
                            © 2026 Imob Afiliação. Todos direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>

            {/* ═══════════════════════════════════════════════════ */}
            {/* BOTÃO WHATSAPP FLUTUANTE */}
            {/* ═══════════════════════════════════════════════════ */}
            <a
                href={`https://wa.me/5511999999999?text=Olá ${broker.full_name}, estava vendo seus imóveis no site.`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl shadow-[#25D366]/30 transition-transform hover:scale-110"
            >
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
        </div>
    );
}

/* ═══════════════════════════════════════════════════ */
/* COMPONENTE: Card de Imóvel (Estilo ADigital)       */
/* ═══════════════════════════════════════════════════ */

function FeaturedPropertyCard({ property, brokerName, featured = false }: { property: any; brokerName: string; featured?: boolean }) {
    const p = property;

    return (
        <Link href={`/imoveis/${p.slug}`} className="group">
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">

                {/* Imagem */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105 bg-slate-200 dark:bg-slate-700"
                        style={{ backgroundImage: `url(${p.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'})` }}
                    />

                    {/* Badge Destaque */}
                    {featured && (
                        <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <Star className="w-3 h-3 fill-current" /> Destaque
                        </div>
                    )}

                    {/* ✅ Badge de verificação */}
                    <div className="absolute bottom-14 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* Preço overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
                        <p className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                            R$ {p.price_sale ? Number(p.price_sale).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : p.price_rent ? Number(p.price_rent).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : 'Sob Consulta'}
                        </p>
                    </div>
                </div>

                {/* Conteúdo */}
                <div className="p-4 flex flex-col flex-grow">
                    {/* Título */}
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-1 line-clamp-2 min-h-[2.5rem]">
                        {p.title}
                    </h3>
                    {/* Localização */}
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium mb-4">
                        <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                        <span className="truncate">Santos - SP</span>
                    </div>

                    {/* Features */}
                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-3 mt-auto">
                        {p.bedrooms && (
                            <div className="flex flex-col items-center gap-0.5">
                                <BedDouble className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.bedrooms}</span>
                                <span className="text-[10px] text-slate-400 font-medium">Quartos</span>
                            </div>
                        )}
                        {p.bathrooms && (
                            <div className="flex flex-col items-center gap-0.5">
                                <Bath className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.bathrooms}</span>
                                <span className="text-[10px] text-slate-400 font-medium">Banheiros</span>
                            </div>
                        )}
                        {p.parking_spaces !== null && p.parking_spaces !== undefined && (
                            <div className="flex flex-col items-center gap-0.5">
                                <Car className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.parking_spaces}</span>
                                <span className="text-[10px] text-slate-400 font-medium">Vagas</span>
                            </div>
                        )}
                        {p.area && (
                            <div className="flex flex-col items-center gap-0.5">
                                <Maximize className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.area}</span>
                                <span className="text-[10px] text-slate-400 font-medium">m²</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer do card — Corretor */}
                <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">
                            {brokerName?.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate max-w-[140px]">{brokerName}</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
            </div>
        </Link>
    );
}
