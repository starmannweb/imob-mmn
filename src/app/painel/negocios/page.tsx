export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { Link2, Search, Plus, Home, Key } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NegociosPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const sp = await searchParams;
    const currentTab = sp.tab || 'vendas';

    return (
        <div className="flex-1 flex flex-col w-full pb-12">
            {/* Breadcrumb text */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 w-full">
                <span className="font-semibold text-slate-600 dark:text-slate-300">ADigital Afiliação</span>
                <span>›</span>
                <span>Negócios</span>
            </div>

            {/* Titulo */}
            <div className="mb-6 flex flex-col items-start gap-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">Vendas e Locações</h1>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 w-full mb-8 max-w-sm">
                <Link href="/painel/negocios?tab=vendas" className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${currentTab === 'vendas' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>
                    <Home className="w-4 h-4" /> Minhas Vendas
                </Link>
                <Link href="/painel/negocios?tab=locacoes" className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${currentTab === 'locacoes' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>
                    <Key className="w-4 h-4" /> Minhas Locações
                </Link>
            </div>

            {currentTab === 'vendas' ? (
                <>
                    {/* Admin Toggle FAKE */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-5 bg-slate-300 dark:bg-slate-700 rounded-full cursor-pointer relative">
                            <div className="w-4 h-4 bg-white dark:bg-slate-400 rounded-full absolute top-[2px] left-[2px]"></div>
                        </div>
                        <span className="text-sm font-bold text-slate-500 dark:text-slate-300">Visualizar todas as vendas (Admin)</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                        <div className="relative w-full md:w-80">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Busque por alguma informação..."
                                className="w-full bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap hidden sm:flex">
                            <Plus className="w-4 h-4" /> Cadastrar nova venda
                        </button>
                    </div>

                    <div className="w-full bg-slate-100/50 dark:bg-[#1a1f2c] border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center p-16 shadow-sm min-h-[40vh]">
                        <Home className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">Nenhuma venda registrada</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mb-6">
                            Você ainda não cadastrou nenhuma venda. Adicione sua primeira venda para acompanhar seus ganhos.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <Plus className="w-4 h-4" /> Nova Venda
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Admin Toggle FAKE */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-5 bg-slate-300 dark:bg-slate-700 rounded-full cursor-pointer relative">
                            <div className="w-4 h-4 bg-white dark:bg-slate-400 rounded-full absolute top-[2px] left-[2px]"></div>
                        </div>
                        <span className="text-sm font-bold text-slate-500 dark:text-slate-300">Visualizar todas as locações (Admin)</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                        <div className="relative w-full md:w-80">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Busque por alguma informação..."
                                className="w-full bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap hidden sm:flex">
                            <Plus className="w-4 h-4" /> Cadastrar nova locação
                        </button>
                    </div>

                    <div className="w-full bg-slate-100/50 dark:bg-[#1a1f2c] border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center p-16 shadow-sm min-h-[40vh]">
                        <Key className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">Nenhuma locação registrada</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mb-6">
                            Você ainda não cadastrou nenhum contrato de locação ativo.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <Plus className="w-4 h-4" /> Nova Locação
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
