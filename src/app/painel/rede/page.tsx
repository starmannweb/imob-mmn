import Link from "next/link";
export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { Users, Copy, Share2, Search, Settings2, LayoutGrid, Network, Eye, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight, Target, Clock, MessageSquare, Download, ShieldCheck, FileText, CheckCircle2, TrendingUp, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import TreeGraph from "./tree-graph";
import CreateOpportunityModal from "./create-opportunity-modal";

export default async function MinhaRedePage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
    const supabase = await createClient();
    const sp = await searchParams;
    const currentTab = sp.tab || 'oportunidades';
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch broker data
    const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user?.id)
        .single();

    // Fetch network (direct referrals)
    const { data: network } = await supabase
        .from("users")
        .select("*")
        .eq("referred_by", user?.id);

    const referralCode = profile?.referral_code || "GERANDO...";
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const inviteLink = `${baseUrl}/registrar?ref=${referralCode}`;

    return (
        <div className="flex-1 flex flex-col w-full max-w-[1400px] pb-16">

            {/* Breadcrumb pseudo */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 w-full">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Corretores Afiliados</span>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-500 flex items-center gap-2 tracking-tight">
                        Oportunidades e Parcerias <Users className="w-7 h-7 fill-current text-blue-500/20" />
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">Conecte-se com outros corretores, feche parcerias e expanda seus negócios.</p>
                </div>
                <div className="flex items-center gap-2">
                    <CreateOpportunityModal />
                    <Button variant="outline" className="font-bold text-slate-600 gap-2 bg-white"><Search className="w-4 h-4" /> Buscar</Button>
                    <Button variant="outline" className="font-bold text-slate-600 gap-2 bg-white"><Settings2 className="w-4 h-4" /> Config</Button>
                </div>
            </div>

            {/* 4 Blocos de Oportunidades */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="text-blue-500 mb-2 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg"><Users className="w-5 h-5" /></div>
                    <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">0</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Usuários Ativos</p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="text-emerald-500 mb-2 bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-lg"><LayoutGrid className="w-5 h-5" /></div>
                    <h2 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">0</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Oportunidades Ativas</p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="text-purple-500 mb-2 bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg"><Share2 className="w-5 h-5" /></div>
                    <h2 className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">0</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Aplicações Totais</p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="text-amber-500 mb-2 bg-amber-50 dark:bg-amber-900/30 p-2 rounded-lg"><span className="font-extrabold text-lg leading-none">$</span></div>
                    <h2 className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">R$ 0</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total de Oportunidades</p>
                </div>
            </div>

            {/* Abas - Oportunidades / Analytics / Parcerias / Perfil / Rede */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 mb-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto w-full">
                <Link href="/painel/rede?tab=oportunidades" className={`flex-1 min-w-max text-center flex items-center justify-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all ${currentTab === 'oportunidades' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-slate-600' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>
                    Oportunidades
                </Link>
                <Link href="/painel/rede?tab=analytics" className={`flex-1 min-w-max text-center flex items-center justify-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all border-l border-slate-200 dark:border-slate-700 ${currentTab === 'analytics' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-slate-600' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>
                    Analytics
                </Link>
                <Link href="/painel/rede?tab=parcerias" className={`flex-1 min-w-max text-center flex items-center justify-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all border-l border-slate-200 dark:border-slate-700 ${currentTab === 'parcerias' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-slate-600' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>
                    Parcerias
                </Link>
                <Link href="/painel/rede?tab=perfil" className={`flex-1 min-w-max text-center flex items-center justify-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all border-x border-slate-200 dark:border-slate-700 ${currentTab === 'perfil' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-slate-600' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>
                    Perfil
                </Link>
                <Link href="/painel/rede?tab=rede" className={`flex-1 min-w-max text-center flex items-center justify-center gap-2 px-6 py-2 rounded-md text-sm font-bold transition-all ${currentTab === 'rede' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-slate-600' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>
                    Minha Rede
                </Link>
            </div>

            {/* Renderização Condicional do TABS */}
            <div className="w-full">
                {currentTab === 'oportunidades' && (
                    <div className="w-full">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-4 w-full md:w-auto flex-1 max-w-2xl">
                                <div className="relative w-full max-w-lg">
                                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Buscar oportunidades..."
                                        className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                                    />
                                    <Button size="sm" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-bold px-2 gap-1.5 focus:ring-0">
                                        <Search className="w-3 h-3" /> Buscar
                                    </Button>
                                </div>
                                <Button variant="outline" className="font-bold text-slate-600 gap-2"><Search className="w-3.5 h-3.5" /> Filtros</Button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <span className="text-xs font-bold text-slate-500">0 oportunidades encontradas</span>
                        </div>

                        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center py-20 px-4 text-center">
                            <div className="mb-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-full border border-slate-100 dark:border-slate-800">
                                <Search className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                            </div>
                            <h3 className="text-lg font-extrabold text-slate-800 dark:text-white mb-1">Nenhuma oportunidade encontrada</h3>
                            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Tente ajustar os filtros ou verificar novamente mais tarde.</p>
                        </div>
                    </div>
                )}
                {currentTab === 'analytics' && (
                    <div className="w-full space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl flex flex-col">
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Total de Usuários</h4>
                                <div className="flex items-end justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-extrabold text-slate-800 dark:text-white">0</span>
                                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" /> 12.5%
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-500/20"><Users className="w-5 h-5" /></div>
                                </div>
                                <p className="text-xs text-slate-400 mt-2 font-medium">Corretores ativos na plataforma</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl flex flex-col">
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Oportunidades Ativas</h4>
                                <div className="flex items-end justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-extrabold text-slate-800 dark:text-white">0</span>
                                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" /> 8.3%
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-emerald-500/20"><LayoutGrid className="w-5 h-5" /></div>
                                </div>
                                <p className="text-xs text-slate-400 mt-2 font-medium">Oportunidades disponíveis</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl flex flex-col">
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Total de Aplicações</h4>
                                <div className="flex items-end justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-extrabold text-slate-800 dark:text-white">0</span>
                                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" /> 15.7%
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-purple-500/20"><MessageSquare className="w-5 h-5" /></div>
                                </div>
                                <p className="text-xs text-slate-400 mt-2 font-medium">Demonstrações de interesse</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl flex flex-col">
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Total de Oportunidades</h4>
                                <div className="flex items-end justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-extrabold text-slate-800 dark:text-white">0</span>
                                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" /> 6.2%
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-orange-500/20"><Target className="w-5 h-5" /></div>
                                </div>
                                <p className="text-xs text-slate-400 mt-2 font-medium">Todas as oportunidades criadas</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl flex flex-col">
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Taxa de Conversão</h4>
                                <div className="flex items-end justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-extrabold text-slate-800 dark:text-white">0%</span>
                                        <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" /> 0.0%
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-emerald-500/20"><TrendingUp className="w-5 h-5" /></div>
                                </div>
                                <p className="text-xs text-slate-400 mt-2 font-medium">Aplicações que viraram parcerias</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl flex flex-col">
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Tempo Médio de Resposta</h4>
                                <div className="flex items-end justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-extrabold text-slate-800 dark:text-white">0h</span>
                                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" /> 0.0%
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-cyan-500/20"><Clock className="w-5 h-5" /></div>
                                </div>
                                <p className="text-xs text-slate-400 mt-2 font-medium">Tempo para primeira resposta</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl flex flex-col">
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Avaliação Média</h4>
                                <div className="flex items-end justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-extrabold text-slate-800 dark:text-white">0.0</span>
                                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" /> 0.0%
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-amber-500/20"><ShieldCheck className="w-5 h-5" /></div>
                                </div>
                                <p className="text-xs text-slate-400 mt-2 font-medium">Avaliação dos corretores</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl min-h-[300px] flex flex-col items-center justify-center text-center">
                                <div className="absolute top-6 left-6 text-slate-800 dark:text-white font-extrabold flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" /> Atividade Recente
                                </div>
                                <TrendingUp className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-4" />
                                <p className="font-bold text-slate-500">Nenhuma atividade recente</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl min-h-[300px] flex flex-col items-center justify-center text-center">
                                <div className="absolute top-6 left-6 text-slate-800 dark:text-white font-extrabold flex items-center gap-2">
                                    <Target className="w-5 h-5" /> Categorias Mais Populares
                                </div>
                                <Target className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-4" />
                                <p className="font-bold text-slate-500">Nenhuma categoria disponível</p>
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === 'parcerias' && (
                    <div className="w-full space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 mb-2">
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
                                <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">0</h2>
                                <p className="text-[11px] font-bold text-slate-500 uppercase mt-1">Total</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
                                <h2 className="text-xl font-extrabold text-amber-500 dark:text-amber-400">0</h2>
                                <p className="text-[11px] font-bold text-slate-500 uppercase mt-1">Pendentes</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
                                <h2 className="text-xl font-extrabold text-emerald-500 dark:text-emerald-400">0</h2>
                                <p className="text-[11px] font-bold text-slate-500 uppercase mt-1">Ativas</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
                                <h2 className="text-xl font-extrabold text-blue-500 dark:text-blue-400">0</h2>
                                <p className="text-[11px] font-bold text-slate-500 uppercase mt-1">Concluídas</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
                                <h2 className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">R$ 0</h2>
                                <p className="text-[11px] font-bold text-slate-500 uppercase mt-1">Comissões</p>
                            </div>
                        </div>

                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 mb-4 rounded-lg border border-slate-200 dark:border-slate-700 w-full overflow-x-auto shadow-sm">
                            <button className="flex-1 py-1.5 px-4 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400">Pendentes (0)</button>
                            <button className="flex-1 py-1.5 px-4 text-xs font-bold bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded shadow-sm border border-slate-200 dark:border-slate-600">Ativas (0)</button>
                            <button className="flex-1 py-1.5 px-4 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400">Concluídas (0)</button>
                            <button className="flex-1 py-1.5 px-4 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400">Todas (0)</button>
                        </div>

                        {/* Corretores Afiliados */}
                        <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4 mt-6">
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">Corretores Afiliados</h2>
                                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Visualize todos os corretores afiliados que fazem parte da sua rede.</p>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-4 w-full md:w-auto flex-1 max-w-2xl">
                                    <div className="relative w-full max-w-sm">
                                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input type="text" placeholder="Busque por alguma informação..." className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32">
                                        <option>Todos</option>
                                        <option>Ativos</option>
                                        <option>Inativos</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="bg-white border border-slate-200 p-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"><LayoutGrid className="w-4 h-4" /></button>
                                    <button className="bg-white border border-slate-200 p-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"><Settings2 className="w-4 h-4" /></button>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left whitespace-nowrap">
                                        <thead className="text-[11px] text-slate-500 rounded-t-xl bg-white border-b-2 border-slate-100">
                                            <tr>
                                                <th className="px-6 py-4 font-bold border-r border-slate-100 last:border-0 hover:bg-slate-50 transition-colors uppercase tracking-wider">Nome</th>
                                                <th className="px-6 py-4 font-bold border-r border-slate-100 last:border-0 hover:bg-slate-50 transition-colors uppercase tracking-wider">Telefone</th>
                                                <th className="px-6 py-4 font-bold border-r border-slate-100 last:border-0 hover:bg-slate-50 transition-colors uppercase tracking-wider">E-mail</th>
                                                <th className="px-6 py-4 font-bold border-r border-slate-100 last:border-0 hover:bg-slate-50 transition-colors uppercase tracking-wider">Indicado por</th>
                                                <th className="px-6 py-4 font-bold border-r border-slate-100 last:border-0 hover:bg-slate-50 transition-colors uppercase tracking-wider">Cargo</th>
                                                <th className="px-6 py-4 font-bold border-r border-slate-100 last:border-0 hover:bg-slate-50 transition-colors uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-4 font-bold text-center uppercase tracking-wider">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center font-bold text-slate-700 text-sm border-2 border-white shadow-sm shrink-0">ZK</div>
                                                        <div>
                                                            <div className="font-bold text-slate-800 text-[13px] flex items-center gap-2">{profile?.full_name || 'ZKF INTERMEDIACAO IMOBILIARIA LTDA'}</div>
                                                            <span className="text-slate-400 text-xs">@{profile?.full_name?.split(' ')[0].toLowerCase() || 'Zanzini'}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-[13px] font-medium text-slate-600">13991396602</td>
                                                <td className="px-6 py-4 text-[13px] font-medium text-slate-600">dizanzini@gmail.com</td>
                                                <td className="px-6 py-4"><div className="flex items-center gap-1.5 text-[13px] font-medium text-slate-400 italic"><Network className="w-3.5 h-3.5" /> Não informado</div></td>
                                                <td className="px-6 py-4"><span className="px-3 py-1 bg-white border border-blue-200 text-blue-600 text-[11px] font-bold rounded-full">Dono</span></td>
                                                <td className="px-6 py-4"><span className="px-3 py-1 bg-white border border-blue-200 text-blue-600 text-[11px] font-bold rounded-full">Ativo</span></td>
                                                <td className="px-6 py-4 text-center"><button className="text-slate-400 hover:text-blue-600 p-1 rounded transition-colors inline-block"><Eye className="w-5 h-5" /></button></td>
                                            </tr>
                                            {network?.map((broker) => (
                                                <tr key={broker.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center font-bold text-slate-700 text-sm border-2 border-white shadow-sm shrink-0">{(broker.full_name || "C").substring(0, 2).toUpperCase()}</div>
                                                            <div>
                                                                <div className="font-bold text-slate-800 text-[13px] flex items-center gap-2">{broker.full_name || "Corretor"}</div>
                                                                <span className="text-slate-400 text-xs">@corretor</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">(Não informado)</td>
                                                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">{broker.email || 'Não informado'}</td>
                                                    <td className="px-6 py-4"><div className="flex items-center gap-1.5 text-[13px] font-medium text-blue-600"><Network className="w-3.5 h-3.5" /> {profile?.full_name || 'ZKF'}</div></td>
                                                    <td className="px-6 py-4"><span className="px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-full">Membro</span></td>
                                                    <td className="px-6 py-4"><span className={`px-3 py-1 text-[11px] font-bold rounded-full ${broker.plan_status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>{broker.plan_status === 'active' ? "Ativo" : "Trial"}</span></td>
                                                    <td className="px-6 py-4 text-center"><button className="text-slate-400 hover:text-blue-600 p-1 rounded transition-colors inline-block"><Eye className="w-5 h-5" /></button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Footer */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100 text-sm text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <span>Mostrando <strong>1</strong> até <strong>{(network?.length || 0) + 1}</strong> de <strong>{(network?.length || 0) + 1}</strong> resultados</span>
                                        <span className="bg-slate-50 px-3 py-1 ml-4 rounded border border-slate-200 flex items-center gap-2">Por página: <select className="bg-transparent font-bold text-slate-700 outline-none"><option>20</option><option>50</option><option>100</option></select></span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-300 cursor-not-allowed"><ChevronsLeft className="w-4 h-4" /></button>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-300 cursor-not-allowed"><ChevronLeft className="w-4 h-4" /></button>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-blue-600 bg-blue-600 text-white font-bold">1</button>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 hover:bg-slate-50">
                                            <ChevronsRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === 'perfil' && (
                    <div className="w-full">
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-xl flex flex-col items-center justify-center text-center shadow-sm min-h-[300px]">
                            <p className="text-slate-500 dark:text-slate-400 font-bold">Carregando perfil...</p>
                        </div>
                    </div>
                )}

                {currentTab === 'rede' && (
                    <div className="w-full">
                        <div className="mb-4 mt-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">Árvore de Afiliados</h2>
                                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Visualize graficamente a sua rede direta e indireta de corretores.</p>
                            </div>
                        </div>

                        {/* Gráfico React Flow (Árvore de Indicações) wrapper */}
                        <div className="bg-white dark:bg-slate-800 border text-center border-slate-200 dark:border-slate-700 rounded-xl shadow-sm mb-4 relative overflow-hidden h-[400px]">
                            <div className="absolute inset-0 z-0" style={{ backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

                            {/* O Elemento ReactFlow da arvore ficará aqui */}
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                <TreeGraph currentUser={{ id: profile?.id, full_name: profile?.full_name || 'ZKF INTERMEDIACAO IMOBILIARIA LTDA' }} network={network || []} />
                            </div>

                            {/* ReactFlow minimap placeholder (canto inferior direito) */}
                            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur border border-slate-200 p-2 rounded shadow-sm z-20 w-32 h-20 flex items-center justify-center">
                                <span className="text-[10px] text-slate-400 font-medium">React Flow</span>
                            </div>
                        </div>

                        {/* Legenda da Afiliação */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-12">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-blue-500"></div>
                                <span className="text-xs font-semibold text-slate-600">Você</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-emerald-500"></div>
                                <span className="text-xs font-semibold text-slate-600">1ª Geração (Diretos)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-amber-500"></div>
                                <span className="text-xs font-semibold text-slate-600">2ª Geração</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-purple-500"></div>
                                <span className="text-xs font-semibold text-slate-600">3ª Geração</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
