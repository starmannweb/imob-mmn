export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ChevronRight, Globe, Plus, ExternalLink, Eye, Settings, Palette, Sparkles } from "lucide-react";
import Link from "next/link";
import { GenerateSiteModal } from "./GenerateSiteModal";
import { CopySiteLink } from "./CopySiteLink";

export default async function MeusSitesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch user profile
    const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    // Fetch user properties count
    const { count: propertiesCount } = await supabase
        .from("properties")
        .select("*", { count: "exact", head: true })
        .eq("owner_id", user.id);

    const siteSlug = profile?.referral_code?.toLowerCase() || user.id.substring(0, 8);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.adigitalmultinivel.com.br";

    return (
        <div className="flex-1 flex flex-col w-full max-w-6xl pb-12">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 w-full">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Meu Site</span>
            </div>

            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 dark:bg-blue-950/50 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900">
                            <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Meu Site</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-sm">Crie e gerencie sua lead page personalizada para captar clientes.</p>
                        </div>
                    </div>
                </div>
                <Link href="/painel/meus-sites/configurar" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                    <Settings className="w-4 h-4" /> Configurações Avançadas
                </Link>
            </div>

            {/* Lead Page Card Principal */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm mb-8">
                {/* Preview Banner */}
                <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute bottom-4 left-6 flex items-end gap-4">
                        <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-lg flex items-center justify-center text-2xl font-bold text-blue-600">
                            {(profile?.full_name || "C").substring(0, 2).toUpperCase()}
                        </div>
                        <div className="text-white mb-1">
                            <h2 className="font-extrabold text-lg leading-tight drop-shadow">{profile?.full_name || "Seu Nome"}</h2>
                            <p className="text-white/80 text-sm">Corretor Afiliado</p>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                        <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                            ● Online
                        </span>
                    </div>
                </div>

                {/* Site Info */}
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Lead Page Principal</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Seu site pessoal com todos os seus imóveis cadastrados. Compartilhe com seus clientes para captação automática de leads.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <a
                                href={`/corretor/${siteSlug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" /> Visualizar Site
                            </a>
                            <Link href="/painel/meus-sites/personalizar" className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                                <Palette className="w-4 h-4" /> Personalizar
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-center border border-slate-100 dark:border-slate-700">
                            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{propertiesCount || 0}</span>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Imóveis</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-center border border-slate-100 dark:border-slate-700">
                            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">0</span>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Visitas</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-center border border-slate-100 dark:border-slate-700">
                            <span className="text-2xl font-black text-purple-600 dark:text-purple-400">0</span>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Leads Captados</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-center border border-slate-100 dark:border-slate-700">
                            <span className="text-2xl font-black text-amber-600 dark:text-amber-400">0%</span>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Conversão</p>
                        </div>
                    </div>

                    {/* URL Share */}
                    <div className="mt-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Link do seu site</label>
                        <CopySiteLink siteUrl={`${baseUrl}/corretor/${siteSlug}`} />
                    </div>
                </div>
            </div>

            {/* Templates Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-200">Templates Disponíveis</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Escolha um template para personalizar sua lead page.</p>
                    </div>
                    <Link href="/painel/meus-sites/templates" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                        Ver todos os modelos →
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Modelo 1: Dark / Premium (Ref Prtsc 3) */}
                    <div className="relative bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden transition-all hover:shadow-xl cursor-pointer group">
                        {/* CSS Mockup do Site Premium */}
                        <div className="h-44 bg-slate-900 w-full relative flex flex-col">
                            {/* Header Dark */}
                            <div className="h-10 w-full flex items-center justify-center border-b border-white/10 relative">
                                <div className="w-20 h-3 bg-white/20 rounded"></div> {/* Logo */}
                            </div>
                            <div className="h-6 w-full flex justify-center items-center gap-2 border-b border-slate-700">
                                <div className="w-8 h-1.5 bg-amber-500 rounded"></div>
                                <div className="w-8 h-1.5 bg-slate-500 rounded"></div>
                                <div className="w-8 h-1.5 bg-slate-500 rounded"></div>
                            </div>
                            {/* Hero com Banner */}
                            <div className="flex-1 overflow-hidden relative flex flex-col">
                                <div className="w-full h-16 bg-blue-900/30"></div> {/* Hero image placeholder */}
                                <div className="p-2 bg-white flex flex-col gap-1.5 h-full"> {/* Body */}
                                    <div className="w-full py-1 border-b border-slate-100 flex justify-center gap-2">
                                        <div className="w-10 h-3 bg-slate-200 rounded"></div>
                                    </div>
                                    <div className="flex justify-center gap-2 mt-1">
                                        <div className="w-12 h-16 bg-slate-900 rounded"></div>
                                        <div className="w-12 h-16 bg-slate-100 border border-slate-200 rounded"></div>
                                        <div className="w-12 h-16 bg-slate-100 border border-slate-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm z-10">
                                <button className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors">
                                    <Eye className="w-3.5 h-3.5" /> Escolher Premium
                                </button>
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                            <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Tema Premium (Dark)</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Cabeçalho executivo escuro com destaques dourados/ambar.</p>
                        </div>
                    </div>

                    {/* Modelo 2: Clean / Corporativo (Ref Prtsc 4) */}
                    <div className="relative bg-white dark:bg-slate-800 border-2 border-blue-500 rounded-2xl overflow-hidden transition-all hover:shadow-xl cursor-pointer group shadow-md shadow-blue-500/10 ring-4 ring-blue-50 dark:ring-blue-900/20">
                        {/* CSS Mockup do Site Clean */}
                        <div className="h-44 bg-slate-50 w-full relative flex flex-col">
                            {/* Header Light */}
                            <div className="h-10 w-full bg-white flex items-center justify-between px-3 border-b border-slate-200">
                                <div className="w-4 h-1.5 bg-slate-300 rounded"></div> {/* left icon */}
                                <div className="w-16 h-3 bg-slate-800 rounded"></div> {/* Logo Center */}
                                <div className="w-4 h-1.5 bg-slate-300 rounded"></div> {/* right menu */}
                            </div>
                            {/* Hero Header */}
                            <div className="flex-1 overflow-hidden relative flex flex-col">
                                <div className="w-full h-16 bg-slate-300 object-cover"></div> {/* Hero image layout */}
                                <div className="w-full h-8 bg-slate-800 flex justify-center items-center gap-2"> {/* Dark Search Bar */}
                                  <div className="w-8 h-2 bg-slate-600 rounded"></div>
                                  <div className="w-6 h-2 bg-amber-600 rounded"></div>
                                </div>
                                <div className="p-2 bg-white flex justify-center gap-2 mt-1 h-full"> {/* Body */}
                                    <div className="w-14 h-12 bg-slate-100 border border-slate-200 rounded"></div>
                                    <div className="w-14 h-12 bg-slate-100 border border-slate-200 rounded"></div>
                                </div>
                            </div>
                            
                            <span className="absolute top-2 right-2 bg-blue-600 text-white text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded shadow-sm z-20">
                                Ativo
                            </span>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-900/40 backdrop-blur-sm z-10">
                                <button className="bg-white text-blue-600 shadow-lg text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors">
                                    Configurar
                                </button>
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                            <h3 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Tema Clean (Light)</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Navegação integrada clara com menu de pesquisa corporativo.</p>
                        </div>
                    </div>

                    {/* Modelo 3: Exclusive / Minimalista (Ref Prtsc 5) */}
                    <div className="relative bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden transition-all hover:shadow-xl cursor-pointer group">
                        {/* CSS Mockup do Site Exclusive */}
                        <div className="h-44 bg-white w-full relative flex flex-col">
                            {/* Header Minimalist */}
                            <div className="h-10 w-full flex flex-col items-center justify-center pt-2 gap-1 border-b border-slate-100">
                                <div className="w-14 h-3 bg-slate-900 rounded"></div> {/* Top Logo */}
                                <div className="flex gap-1.5 mt-1">
                                    <div className="w-4 h-1 bg-slate-900 rounded"></div>
                                    <div className="w-4 h-1 bg-slate-300 rounded"></div>
                                    <div className="w-4 h-1 bg-slate-300 rounded"></div>
                                </div>
                            </div>
                            {/* Hero Centralizado */}
                            <div className="flex-1 overflow-hidden relative flex flex-col items-center">
                                <div className="w-full h-14 bg-slate-200 mt-1"></div> {/* Banner */}
                                <div className="w-4/5 h-6 bg-white shadow-sm border border-slate-100 -mt-3 z-10 rounded flex items-center justify-center">
                                     <div className="w-16 h-1 bg-slate-300 rounded"></div>
                                </div>
                                <div className="w-full p-2 flex justify-center gap-2 mt-1 h-full"> 
                                    <div className="w-full h-8 bg-slate-100 border border-slate-200 rounded"></div>
                                </div>
                            </div>
                            
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm z-10">
                                <button className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors">
                                    <Eye className="w-3.5 h-3.5" /> Escolher Minimalista
                                </button>
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                            <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Tema Exclusive (Mínimo)</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Logo centralizada e destaque maior para as mídias visuais.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* IA Section */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-white/10 p-2 rounded-lg">
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                        </div>
                        <h3 className="text-lg font-bold">Gerador de Sites com IA</h3>
                    </div>
                    <p className="text-white/70 text-sm max-w-xl mb-4">
                        Descreva como quer seu site e nossa IA cria automaticamente uma lead page personalizada para você.
                        Escolha cores, layout e estilo com apenas uma descrição.
                    </p>
                    <GenerateSiteModal>
                        <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-600" /> Testar Gerador IA Premium
                        </button>
                    </GenerateSiteModal>
                </div>
            </div>
        </div>
    );
}
