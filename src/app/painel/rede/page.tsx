export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { Users, Copy, Share2, Search, Settings2, LayoutGrid, Network, Eye, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TreeGraph from "./tree-graph";

export default async function MinhaRedePage() {
    const supabase = await createClient();
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
                <span className="font-semibold text-slate-600 dark:text-slate-300">ADigital Afiliação</span>
                <ChevronRight className="w-3 h-3" />
                <span>Corretores Afiliados</span>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">Minha Rede de Afiliados</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Visualize sua rede de indicações e afiliados.</p>
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

            {/* Secondary Table Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
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
                            <input
                                type="text"
                                placeholder="Busque por alguma informação..."
                                className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32">
                            <option>Todos</option>
                            <option>Ativos</option>
                            <option>Inativos</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="bg-white border border-slate-200 p-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm">
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button className="bg-white border border-slate-200 p-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm">
                            <Settings2 className="w-4 h-4" />
                        </button>
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
                                {/* First example hardcoded for matching print exactly */}
                                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center font-bold text-slate-700 text-sm border-2 border-white shadow-sm shrink-0">
                                                ZK
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800 text-[13px] flex items-center gap-2">
                                                    {profile?.full_name || 'ZKF INTERMEDIACAO IMOBILIARIA LTDA'}
                                                </div>
                                                <span className="text-slate-400 text-xs">@{profile?.full_name?.split(' ')[0].toLowerCase() || 'Zanzini'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">
                                        13991396602
                                    </td>
                                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">
                                        dizanzini@gmail.com
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-[13px] font-medium text-slate-400 italic">
                                            <Network className="w-3.5 h-3.5" /> Não informado
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-white border border-blue-200 text-blue-600 text-[11px] font-bold rounded-full">
                                            Dono
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-white border border-blue-200 text-blue-600 text-[11px] font-bold rounded-full">
                                            Ativo
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="text-slate-400 hover:text-blue-600 p-1 rounded transition-colors inline-block">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>

                                {/* Map the rest from database */}
                                {network?.map((broker) => (
                                    <tr key={broker.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center font-bold text-slate-700 text-sm border-2 border-white shadow-sm shrink-0">
                                                    {(broker.full_name || "C").substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800 text-[13px] flex items-center gap-2">
                                                        {broker.full_name || "Corretor"}
                                                    </div>
                                                    <span className="text-slate-400 text-xs">@corretor</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[13px] font-medium text-slate-600">
                                            (Não informado)
                                        </td>
                                        <td className="px-6 py-4 text-[13px] font-medium text-slate-600">
                                            {broker.email || 'Não informado'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-[13px] font-medium text-blue-600">
                                                <Network className="w-3.5 h-3.5" /> {profile?.full_name || 'ZKF'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-full">
                                                Membro
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-[11px] font-bold rounded-full
                                                   ${broker.plan_status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>
                                                {broker.plan_status === 'active' ? "Ativo" : "Trial"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="text-slate-400 hover:text-blue-600 p-1 rounded transition-colors inline-block">
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <span>Mostrando <strong>1</strong> até <strong>{(network?.length || 0) + 1}</strong> de <strong>{(network?.length || 0) + 1}</strong> resultados</span>
                            <span className="bg-slate-50 px-3 py-1 ml-4 rounded border border-slate-200 flex items-center gap-2">
                                Por página:
                                <select className="bg-transparent font-bold text-slate-700 outline-none">
                                    <option>20</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-300 cursor-not-allowed">
                                <ChevronsLeft className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-300 cursor-not-allowed">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-blue-600 bg-blue-600 text-white font-bold">
                                1
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 hover:bg-slate-50">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 hover:bg-slate-50">
                                <ChevronsRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
