export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapPin, Phone, Mail, Clock, CheckCircle2, Inbox, Plus, Users, Target, AlertCircle, BarChart2, LineChart, PieChart, Info, DollarSign, Search, DownloadCloud, MoreHorizontal, Filter } from "lucide-react";
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
        'new': { label: 'Novo Lead', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        'contacted': { label: 'Em Atendimento', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
        'negotiating': { label: 'Em Negociação', color: 'text-purple-700 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
        'won': { label: 'Convertido', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
        'lost': { label: 'Perdido', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
    };

    const stats = [
        { label: 'TOTAL', value: leads?.length || 0, color: 'text-blue-500', bg: 'bg-blue-50', icon: Users },
        { label: 'NOVOS', value: leads?.filter(l => l.status === 'new').length || 0, color: 'text-cyan-500', bg: 'bg-cyan-50', icon: Target },
        { label: 'QUALIFICADOS', value: leads?.filter(l => l.status === 'contacted').length || 0, color: 'text-emerald-500', bg: 'bg-emerald-50', icon: CheckCircle2 },
        { label: 'NEGOCIANDO', value: leads?.filter(l => l.status === 'negotiating').length || 0, color: 'text-orange-500', bg: 'bg-orange-50', icon: LineChart },
        { label: 'CONVERTIDOS', value: leads?.filter(l => l.status === 'won').length || 0, color: 'text-emerald-500', bg: 'bg-emerald-50', icon: CheckCircle2 },
    ];

    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto pb-12 px-2 sm:px-0">

            {/* Cabelho Principal */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                        <Link href="/painel" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-slate-700 dark:text-slate-300">Gestão de Leads</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-blue-500 dark:text-blue-400 flex items-center gap-2 tracking-tight">
                        Gestão de Leads 👥
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">
                        Gerencie e converta seus leads
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
                        <DownloadCloud className="w-4 h-4 rotate-180" /> Importar
                    </button>
                    <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
                        <DownloadCloud className="w-4 h-4" /> Exportar
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-bold shadow-sm flex items-center gap-2 transition-all">
                        <Plus className="w-4 h-4" /> Novo Lead
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-xl w-full border border-slate-100 dark:border-slate-800 max-w-lg">
                <Link href="/painel/leads?tab=leads" className={`flex-1 flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${currentTab === 'leads' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
                    <Users className="w-4 h-4" /> Meus Leads
                </Link>
                <Link href="/painel/leads?tab=importar" className={`flex-1 flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${currentTab === 'importar' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
                    <DownloadCloud className="w-4 h-4 rotate-180" /> Importar CSV
                </Link>
                <Link href="/painel/leads?tab=novos" className={`flex-1 flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${currentTab === 'novos' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
                    <Inbox className="w-4 h-4" /> Obter Novos Leads
                </Link>
            </div>

            {currentTab === 'leads' ? (
                <>
                    {/* Stats Row (5 Cards) */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-8">
                        {stats.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <div key={i} className="bg-white dark:bg-[#1a1f2c] border-none rounded-xl p-4 sm:p-5 shadow-sm shadow-slate-200/50 dark:shadow-none flex flex-col items-center text-center justify-center hover:shadow-md transition-shadow relative overflow-hidden">
                                    <div className={`p-4 rounded-full mb-3 ${stat.bg}`}>
                                        <Icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                    <span className="text-2xl font-black text-slate-700 dark:text-slate-200 leading-none mb-2 font-mono">
                                        {stat.value}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                        {stat.label}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    {/* Toolbar / Filtros */}
                    <div className="flex flex-col mb-6 bg-white dark:bg-[#1a1f2c] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                        <div className="flex flex-col xl:flex-row items-center border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3 p-2 xl:w-96 flex-shrink-0">
                                <span className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                                    <Filter className="w-4 h-4 text-blue-500" />
                                </span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Filtros</span>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col xl:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Buscar leads..."
                                    className="w-full bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none transition-shadow"
                                />
                            </div>

                            <div className="flex flex-wrap md:flex-nowrap items-center gap-4 w-full xl:w-auto">
                                <div className="flex-1 min-w-[150px] relative">
                                    <select className="w-full bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm rounded-lg px-3 py-2.5 appearance-none outline-none cursor-pointer">
                                        <option>Todos os Status</option>
                                        <option>Novos</option>
                                        <option>Em Atendimento</option>
                                        <option>Convertidos</option>
                                    </select>
                                </div>
                                <div className="flex-1 min-w-[150px] relative">
                                    <select className="w-full bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm rounded-lg px-3 py-2.5 appearance-none outline-none cursor-pointer">
                                        <option>Todas as Origens</option>
                                        <option>Facebook Ads</option>
                                        <option>Orgânico</option>
                                        <option>Portal</option>
                                    </select>
                                </div>
                                <div className="flex-1 min-w-[150px] relative">
                                    <select className="w-full bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm rounded-lg px-3 py-2.5 appearance-none outline-none cursor-pointer">
                                        <option>Todas as Prioridades</option>
                                        <option>Alta</option>
                                        <option>Média</option>
                                        <option>Baixa</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lista de Leads */}
                    {leads && leads.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {leads.map((lead) => {
                                const s = statusMap[lead.status] || statusMap['new'];
                                const initial = (lead.name || '?').charAt(0).toUpperCase();

                                return (
                                    <div key={lead.id} className="bg-white dark:bg-[#1a1f2c] rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-black flex items-center justify-center text-lg flex-shrink-0 shadow-sm border border-blue-200 dark:border-blue-800">
                                                {initial}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base truncate pr-4">{lead.name}</h3>
                                                <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 mt-1.5">
                                                    <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700">
                                                        <Phone className="w-3.5 h-3.5 text-slate-400" /> {lead.phone_whatsapp || 'Sem telefone'}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700 hidden sm:flex truncate max-w-[200px]">
                                                        <Mail className="w-3.5 h-3.5 text-slate-400" /> {lead.email || 'Sem email'}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-slate-400 sm:hidden">
                                                        <Clock className="w-3 h-3" /> {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true, locale: ptBR })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 lg:gap-8 w-full md:w-auto mt-2 md:mt-0 pt-3 md:pt-0 border-t md:border-none border-slate-100 dark:border-slate-800">
                                            <div className="hidden lg:block min-w-[140px]">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Data</p>
                                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                    {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true, locale: ptBR })}
                                                </p>
                                            </div>
                                            <div className="hidden md:block w-48">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Interesse</p>
                                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">
                                                    {lead.property?.title || <span className="text-slate-400 italic">Genérico / Sem imóvel</span>}
                                                </p>
                                            </div>
                                            <div className="min-w-[120px]">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 hidden md:block">Status</p>
                                                <div className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded border ${s.bg} ${s.color} border-current border-opacity-20`}>
                                                    {s.label}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 ml-auto">
                                                <a
                                                    href={`https://wa.me/${lead.phone_whatsapp?.replace(/\D/g, '')}?text=Olá ${lead.name?.split(' ')[0]}! Tudo bem?`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors tooltip-trigger"
                                                    title="Conversar no WhatsApp"
                                                >
                                                    <Phone className="w-4 h-4" />
                                                </a>
                                                <button className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 border border-slate-200 dark:border-slate-700 dark:hover:text-slate-200 flex items-center justify-center transition-colors">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-[#1a1f2c] border-2 border-slate-200 dark:border-slate-700 border-dashed flex flex-col items-center justify-center py-20 px-4 rounded-xl shadow-sm text-center">
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-full mb-4.5 ring-8 ring-slate-50/50 dark:ring-slate-800/20">
                                <Inbox className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                            </div>
                            <h2 className="text-xl font-extrabold mb-2 text-slate-800 dark:text-slate-100">Nenhum lead encontrado</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mb-8 font-medium">Compartilhe links ou integre seus anúncios para receber novos leads direto no CRM.</p>
                            <button className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm py-2.5 px-8 rounded-lg transition-colors shadow-sm">
                                Importar Leads
                            </button>
                        </div>
                    )}
                </>
            ) : currentTab === 'importar' ? (
                <div className="bg-white dark:bg-[#1a1f2c] rounded-xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center flex flex-col items-center min-h-[400px] justify-center">
                    <DownloadCloud className="w-16 h-16 text-blue-500 mb-6 opacity-80" />
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Importar planilha de Leads</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">Faça upload de um arquivo CSV ou Excel com seus contatos. O sistema criará leads automaticamente e associará ao seu funil.</p>

                    <div className="border-2 border-dashed border-blue-200 dark:border-blue-800/50 rounded-xl p-10 w-full max-w-xl bg-blue-50/50 dark:bg-blue-900/10 mb-6 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400">Clique para selecionar ou arraste o arquivo aqui</p>
                        <p className="text-xs text-slate-400 mt-2">Formato aceito: .CSV, .XLSX (Max 10MB)</p>
                    </div>

                    <button className="text-sm font-semibold text-slate-500 hover:text-slate-700 underline underline-offset-4">Baixar planilha de exemplo</button>
                </div>
            ) : currentTab === 'novos' ? (
                <div className="bg-white dark:bg-[#1a1f2c] rounded-xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center flex flex-col items-center min-h-[400px] justify-center">
                    <Target className="w-16 h-16 text-emerald-500 mb-6 opacity-80" />
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Obter Novos Leads</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
                        Conecte suas campanhas de marketing ou ative a captação automática para receber leads qualificados direto no seu CRM.
                    </p>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm transition-colors">
                        <Plus className="w-5 h-5" /> Configurar Captação
                    </button>
                </div>
            ) : null}
        </div>
    );
}
