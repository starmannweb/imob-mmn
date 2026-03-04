import Link from "next/link";
import { FileText, Building, RefreshCw, Filter, Eye, MessageCircle, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default function CartasContempladasPage() {
    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl pb-16">

            {/* Breadcrumb pseudo */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 w-full">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Cartas Contempladas</span>
            </div>

            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-green-600 dark:text-green-500 flex items-center gap-2">
                    Cartas Contempladas - Imóveis <FileText className="w-6 h-6 fill-current text-green-500/20" />
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
                    Cartas de consórcio contempladas para imóveis disponíveis para transferência
                </p>
                <div className="flex items-center gap-1.5 mt-3 bg-slate-100 dark:bg-slate-800 w-fit px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Dados em tempo real - Vitrine Corretor
                </div>
            </div>

            {/* 3 Blocos de Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="bg-green-50 dark:bg-green-900/30 p-2.5 rounded-lg text-green-500 mb-3">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-green-600 dark:text-green-400">278</h2>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Cartas Disponíveis</p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-2.5 rounded-lg text-blue-500 mb-3">
                        <Building className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">R$ 199.122</h2>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Valor Médio Crédito</p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="bg-purple-50 dark:bg-purple-900/30 p-2.5 rounded-lg text-purple-500 mb-3">
                        <RefreshCw className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">Tempo Real</h2>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Atualização Automática</p>
                </div>
            </div>

            {/* Filtros de Valor */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm mb-8">
                <div className="flex items-center gap-2 mb-6 text-slate-700 dark:text-slate-200 font-bold text-sm">
                    <Filter className="w-4 h-4" /> Filtros de Valor
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Valor Mínimo do Crédito</label>
                        <input type="text" placeholder="Ex: 100000" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Valor Máximo do Crédito</label>
                        <input type="text" placeholder="Ex: 500000" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Valor Máximo da Parcela</label>
                        <input type="text" placeholder="Ex: 3000" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
            </div>

            {/* Lista de Cartas Disponíveis */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex-1">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Cartas Disponíveis</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 font-bold border-r border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider">Carta</th>
                                <th className="px-6 py-4 font-bold border-r border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider">Administradora</th>
                                <th className="px-6 py-4 font-bold border-r border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider">Valor do Crédito</th>
                                <th className="px-6 py-4 font-bold border-r border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider">Entrada</th>
                                <th className="px-6 py-4 font-bold border-r border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider">Parcela</th>
                                <th className="px-6 py-4 font-bold border-r border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider">Parcelas Restantes</th>
                                <th className="px-6 py-4 font-bold border-r border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-bold text-center uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded text-blue-500">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <span className="font-extrabold text-slate-700 dark:text-slate-200">FB-10519</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-300">Embracon</td>
                                <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">R$ 149.155</td>
                                <td className="px-6 py-4 font-bold text-green-600 dark:text-green-400">R$ 60.500</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-800 dark:text-slate-200">R$ 2.370</div>
                                    <div className="text-[10px] text-slate-400 font-medium">por mês</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-800 dark:text-slate-200">65</div>
                                    <div className="text-[10px] text-slate-400 font-medium">de 125</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1 rounded-full text-[11px] font-bold border border-amber-200 dark:border-amber-800">
                                        Reservada
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-slate-600 dark:text-slate-300 font-bold text-xs"><Eye className="w-3.5 h-3.5" /> Ver Mais</Button>
                                        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-slate-600 dark:text-slate-300 font-bold text-xs"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</Button>
                                        <Button size="sm" className="h-8 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs border-none shadow-md shadow-blue-500/20">Tenho Interesse</Button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded text-blue-500">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <span className="font-extrabold text-slate-700 dark:text-slate-200">FB-11403</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-300">Rodobens</td>
                                <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">R$ 98.310</td>
                                <td className="px-6 py-4 font-bold text-green-600 dark:text-green-400">R$ 43.400</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-800 dark:text-slate-200">R$ 824</div>
                                    <div className="text-[10px] text-slate-400 font-medium">por mês</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-800 dark:text-slate-200">176</div>
                                    <div className="text-[10px] text-slate-400 font-medium">de 236</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1 rounded-full text-[11px] font-bold border border-amber-200 dark:border-amber-800">
                                        Reservada
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-slate-600 dark:text-slate-300 font-bold text-xs"><Eye className="w-3.5 h-3.5" /> Ver Mais</Button>
                                        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-slate-600 dark:text-slate-300 font-bold text-xs"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</Button>
                                        <Button size="sm" className="h-8 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs border-none shadow-md shadow-blue-500/20">Tenho Interesse</Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
