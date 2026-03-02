import { createClient } from "@/utils/supabase/server";
import { Settings, RefreshCcw, Facebook, Save, Info, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RoletaDeLeadsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const sp = await searchParams;
    const currentTab = sp.tab || 'configuracao';

    return (
        <div className="flex-1 flex flex-col w-full pb-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                <span>ADigital Multinível</span>
                <span>›</span>
                <span>Roleta de Leads</span>
            </div>

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">Monitoramento de Distribuição</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Acompanhamento em tempo real da fila e sorteio de leads.</p>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">
                    Imobiliária: <span className="font-bold">ZKF INTERMEDIACAO IMOBILIARIA LTDA</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 w-full mb-8">
                <Link href="/painel/roleta?tab=roleta" className={`flex-1 flex justify-center items-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'roleta' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>
                    <RefreshCcw className="w-4 h-4" /> Roleta
                </Link>
                <Link href="/painel/roleta?tab=configuracao" className={`flex-1 flex justify-center items-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'configuracao' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>
                    <Settings className="w-4 h-4" /> Configuração
                </Link>
            </div>

            {currentTab === 'configuracao' ? (
                <div className="flex flex-col gap-6">
                    {/* Configuração do Grupo */}
                    <div className="bg-white dark:bg-[#1a1f2c] border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Settings className="w-5 h-5 text-slate-500" />
                            <h3 className="font-bold text-slate-800 dark:text-white text-base">Configuração do Grupo</h3>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Defina o limite e filtros para este grupo.</p>

                        <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                            <div className="flex flex-col gap-2 flex-1 max-w-sm">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Limite Diário por Corretor</label>
                                <input type="number" defaultValue={5} className="bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-500" />
                                <p className="text-[11px] text-slate-500">Quantidade máxima de leads que cada corretor pode receber por dia na roleta.</p>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-600 font-bold text-white rounded-lg px-5 py-2.5 text-sm transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0 mb-6 sm:mb-7">
                                Salvar <Save className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Integração Facebook */}
                    <div className="bg-white dark:bg-[#1a1f2c] border border-slate-200 dark:border-slate-700/50 border-orange-200 dark:border-orange-900/30 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 pb-1 bg-gradient-to-r from-orange-400 to-amber-500"></div>
                        <div className="flex items-center gap-3 mb-2 pt-2">
                            <Facebook className="w-5 h-5 text-slate-500" />
                            <h3 className="font-bold text-slate-800 dark:text-white text-base flex items-center gap-2">
                                Integração com Meta (Facebook/Instagram)
                                <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">Obrigatório</span>
                            </h3>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Configure a integração com o Facebook para receber leads automaticamente dos formulários de Lead Ads.</p>

                        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <Info className="w-4 h-4" /> Configure esta seção antes de adicionar corretores à roleta.
                        </div>

                        <div className="flex flex-col gap-5 max-w-2xl">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Page ID do Facebook</label>
                                <input type="text" placeholder="Ex: 123456789012345" className="bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[11px] text-slate-500">ID da página do Facebook que receberá os leads.</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Nome da Página</label>
                                <input type="text" placeholder="Ex: Minha Imobiliária" className="bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[11px] text-slate-500">Nome da página para identificação.</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Access Token da Página</label>
                                <input type="text" placeholder="Digite o token de acesso" className="bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[11px] text-slate-500">Token com permissão `leads_retrieval` para buscar leads.</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">DDDs Permitidos (opcional)</label>
                                <input type="text" placeholder="Ex: 011,019,021" className="bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[11px] text-slate-500">Separe os DDDs por vírgula. Deixe vazio para aceitar todos.</p>
                            </div>

                            <div>
                                <button className="bg-blue-600 hover:bg-blue-700 font-bold text-white rounded-lg px-6 py-3 text-sm transition-colors flex items-center justify-center gap-2 shadow-sm mt-3 w-full sm:w-auto">
                                    Salvar Configurações <Save className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabela de Corretores */}
                    <div className="mt-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="relative w-full max-w-sm">
                                <input type="text" placeholder="Busque por alguma informação..." className="bg-white dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 w-full" />
                            </div>
                            <button className="bg-indigo-400 hover:bg-indigo-500 text-white shadow-sm font-semibold rounded-lg px-4 py-2 text-sm transition-colors flex items-center gap-2">
                                Adicionar corretor
                            </button>
                        </div>

                        <div className="bg-transparent border-t border-slate-200 dark:border-slate-700 pt-4 overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 font-semibold tracking-wide">
                                        <th className="py-3 pr-4 font-semibold pb-4">Nome</th>
                                        <th className="py-3 px-4 font-semibold pb-4">Telefone</th>
                                        <th className="py-3 px-4 font-semibold pb-4">E-mail</th>
                                        <th className="py-3 px-4 font-semibold pb-4">Documento</th>
                                        <th className="py-3 pl-4 font-semibold pb-4 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-sm font-medium text-slate-500">
                                            Nenhum corretor na roleta.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-[#1a1f2c] rounded-2xl p-12 text-center shadow-sm border border-slate-200 dark:border-slate-700/50 flex flex-col items-center">
                    <RefreshCcw className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                    <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">Monitoramento da Roleta</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md">Configure os corretores e a integração com o Meta primeiro na aba &quot;Configuração&quot; para iniciar a distribuição automática de leads.</p>
                </div>
            )}
        </div>
    );
}
