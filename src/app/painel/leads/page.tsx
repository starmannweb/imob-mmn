export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapPin, Phone, Mail, Clock, CheckCircle2, Inbox, Plus, Users, Target, AlertCircle, BarChart2, LineChart, PieChart, Info } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const sp = await searchParams;
    const currentTab = sp.tab || 'leads';

    // Fetch leads for this user, including property info
    const { data: leads } = await supabase
        .from("leads")
        .select(`
            *,
            property:properties(title, slug)
        `)
        .eq("assigned_to", user.id)
        .order("created_at", { ascending: false });

    const statusMap: Record<string, { label: string, color: string, bg: string }> = {
        'new': { label: 'Novo Lead', color: 'text-blue-700', bg: 'bg-blue-100' },
        'contacted': { label: 'Contatado', color: 'text-amber-700', bg: 'bg-amber-100' },
        'negotiating': { label: 'Em Negociação', color: 'text-purple-700', bg: 'bg-purple-100' },
        'won': { label: 'Convertido', color: 'text-green-700', bg: 'bg-green-100' },
        'lost': { label: 'Perdido', color: 'text-red-700', bg: 'bg-red-100' },
    };

    return (
        <div className="flex-1 flex flex-col w-full max-w-6xl pb-12">

            {/* Cabecalho Principal */}
            <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Leads</h1>
                    <p className="text-slate-500 mt-1 text-sm">Gerencie seus leads e acompanhe métricas de conversão.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm flex items-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" /> Adicionar Lead
                </button>
            </div>

            {/* Tabs minimalistas tipo "pill" */}
            <div className="flex gap-2 mb-6 bg-slate-50 p-1.5 rounded-xl w-full border border-slate-200/60 max-w-sm">
                <Link href="/painel/leads?tab=leads" className={`flex-1 flex justify-center items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${currentTab === 'leads' ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}>
                    <Users className="w-4 h-4" />
                    Meus Leads
                </Link>
                <Link href="/painel/leads?tab=analises" className={`flex-1 flex justify-center items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${currentTab === 'analises' ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}>
                    <BarChart2 className="w-4 h-4" />
                    Análises
                </Link>
            </div>

            {/* Toggle de Admin */}
            <div className="bg-slate-900 rounded-xl p-5 md:px-6 mb-6 flex items-center justify-between text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl opacity-40 -mr-10 -mt-10 pointer-events-none"></div>
                <div className="relative z-10">
                    <h3 className="font-bold text-slate-100 text-sm">Visualização Admin</h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-light">Ative para ver analytics de todos os corretores do sistema.</p>
                </div>
                {/* Fake Toggle */}
                <div className="w-11 h-6 bg-slate-700 rounded-full relative cursor-pointer border border-slate-600 z-10">
                    <div className="w-5 h-5 bg-slate-400 rounded-full absolute top-px left-px transition-all shadow border border-slate-500"></div>
                </div>
            </div>

            {currentTab === 'leads' ? (
                <>
                    {/* Metricas Rapidas Leads View */}
                    <div className="mb-8">
                        <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 mb-4">
                            <Target className="w-5 h-5 text-blue-500" /> Resumo Rápido
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-start justify-between">
                                <div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total de Leads</p>
                                    <span className="text-3xl font-extrabold text-slate-800 leading-none">{leads?.length || 0}</span>
                                </div>
                                <div className="bg-blue-50/50 p-2.5 rounded-full ring-2 ring-white border border-blue-100">
                                    <Users className="w-4 h-4 text-blue-600" />
                                </div>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-start justify-between">
                                <div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Taxa de Conversão</p>
                                    <span className="text-3xl font-extrabold text-slate-800 leading-none">0%</span>
                                </div>
                                <div className="bg-emerald-50/50 p-2.5 rounded-full ring-2 ring-white border border-emerald-100">
                                    <Target className="w-4 h-4 text-emerald-600" />
                                </div>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-start justify-between">
                                <div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Não Atendidos</p>
                                    <span className="text-3xl font-extrabold text-slate-800 leading-none">0</span>
                                </div>
                                <div className="bg-amber-50/50 p-2.5 rounded-full ring-2 ring-white border border-amber-100">
                                    <AlertCircle className="w-4 h-4 text-amber-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {leads && leads.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {leads.map((lead) => {
                                const s = statusMap[lead.status] || statusMap['new'];
                                return (
                                    <div key={lead.id} className="bg-white border text-left border-slate-200 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${s.bg.replace('bg-', 'border-')} ${s.color}`}>
                                                {s.label}
                                            </div>
                                            <span className="text-xs text-slate-400 font-medium flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true, locale: ptBR })}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-extrabold text-slate-900 mb-1">{lead.name}</h3>
                                        {lead.property?.title ? (
                                            <Link href={`/imoveis/${lead.property.slug}`} className="text-sm font-medium text-blue-600 hover:underline mb-4 line-clamp-1 italic">
                                                Interesse: {lead.property.title}
                                            </Link>
                                        ) : (
                                            <p className="text-sm font-medium text-slate-400 mb-4 italic">Sem imóvel vinculado</p>
                                        )}

                                        <div className="space-y-2 mb-6 flex-1">
                                            {lead.phone_whatsapp && (
                                                <div className="flex items-center text-sm font-medium text-slate-600">
                                                    <Phone className="w-4 h-4 mr-2 text-slate-400" />
                                                    {lead.phone_whatsapp}
                                                </div>
                                            )}
                                            {lead.email && (
                                                <div className="flex items-center text-sm font-medium text-slate-600">
                                                    <Mail className="w-4 h-4 mr-2 text-slate-400" />
                                                    <span className="truncate">{lead.email}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-slate-100 flex gap-3">
                                            <a
                                                href={`https://wa.me/${lead.phone_whatsapp?.replace(/\D/g, '')}?text=Olá ${lead.name?.split(' ')[0]}! Tudo bem?`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center transition-colors shadow-sm"
                                            >
                                                <Phone className="w-4 h-4 mr-2" /> WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 border-dashed flex flex-col items-center justify-center py-20 px-4 rounded-xl shadow-sm text-center">
                            <div className="bg-slate-50 p-4 rounded-full mb-4 ring-8 ring-slate-50/50">
                                <Inbox className="w-8 h-8 text-slate-300" />
                            </div>
                            <h2 className="text-lg font-extrabold mb-1 text-slate-800">Nenhum lead encontrado</h2>
                            <p className="text-slate-500 text-sm max-w-xs mb-6 font-light">Compartilhe links ou aguarde novos contatos no CRM.</p>
                            <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm py-2 px-6 rounded-full transition-colors shadow-sm">
                                Recarregar
                            </button>
                        </div>
                    )}
                </>
            ) : (
                /* Analytics View */
                <div className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-blue-500" /> Métricas e Análise
                        </h2>
                        <p className="text-xs text-slate-400 font-medium mt-1">
                            Visualize e acompanhe sua taxa de conversão de leads.
                        </p>
                    </div>

                    {/* Row 1: KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-slate-700 text-sm">Funil de Vendas</h3>
                                    <div className="p-2 bg-blue-50/50 rounded flex items-center justify-center border border-blue-100">
                                        <LineChart className="w-4 h-4 text-blue-500" />
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-slate-900 leading-none">0</span>
                                    <span className="text-xs text-slate-500 font-medium">Vendas feitas</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-emerald-500 text-xs font-bold px-2 py-0.5 bg-emerald-50 rounded flex items-center gap-1">↑ 10%</span>
                                <span className="text-xs text-slate-400 font-medium italic">em relação ao último mês</span>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-slate-700 text-sm">Taxa de Conversão</h3>
                                    <div className="p-2 bg-emerald-50/50 rounded flex items-center justify-center border border-emerald-100">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-slate-900 leading-none">0%</span>
                                    <span className="text-xs text-slate-500 font-medium">Leads fechados</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-emerald-500 w-0 h-full rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-slate-700 text-sm">Lembretes do sistema</h3>
                                    <div className="p-2 bg-amber-50/50 rounded flex items-center justify-center border border-amber-100">
                                        <AlertCircle className="w-4 h-4 text-amber-500" />
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-slate-900 leading-none">0</span>
                                    <span className="text-xs text-slate-500 font-medium">Têm avisos expirados</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">Requer atenção</span>
                            </div>
                        </div>

                    </div>

                    {/* Row 2: Charts Area (Empty State based on Print) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col h-[300px]">
                            <div>
                                <h3 className="font-bold text-slate-800 text-sm">Desempenho de Vendas</h3>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">Acompanhe a escala da sua representatividade de vendas</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center gap-3">
                                <div className="bg-slate-50 p-3 rounded-full border border-slate-100">
                                    <BarChart2 className="w-6 h-6 text-slate-300" />
                                </div>
                                <p className="text-xs text-slate-400 font-medium italic">Ainda não há dados suficientes...</p>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col h-[300px]">
                            <div>
                                <h3 className="font-bold text-slate-800 text-sm">Taxa de Conversão</h3>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">Acompanhe os estágios dos seus leads em cada momento</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center gap-3">
                                <div className="bg-slate-50 p-3 rounded-full border border-slate-100">
                                    <PieChart className="w-6 h-6 text-slate-300" />
                                </div>
                                <p className="text-xs text-slate-400 font-medium italic">Ainda não há dados suficientes...</p>
                            </div>
                        </div>

                    </div>

                    {/* Row 3: Lembretes */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                    Lembretes em atraso
                                    <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center cursor-help" title="Detalhes"><Info className="w-2.5 h-2.5 text-slate-400" /></div>
                                </h3>
                                <p className="text-xs text-slate-400 font-medium mt-1">Lembretes aos associados com data de aviso já expiradas ou não os contataram...</p>
                            </div>
                            <div className="w-8 h-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center mt-1">
                                <span className="font-black text-slate-800 border-b-2 border-slate-800 leading-none">0</span>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
