import { createClient } from "@/utils/supabase/server";
import { Calculator, MapPin, Search, Plus, Home, Shield, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SimuladoresPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const sp = await searchParams;
    const currentTab = sp.tab || 'financiamento';

    return (
        <div className="flex-1 flex flex-col w-full pb-12">
            {/* Breadcrumb text */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 w-full">
                <span className="font-semibold text-slate-600 dark:text-slate-300">ADigital Afiliação</span>
                <ChevronRight className="w-3 h-3" />
                <span>Simuladores</span>
            </div>

            {/* Titulo */}
            <div className="mb-8 flex flex-col items-start gap-4">
                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-600/20 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-500/30">
                        <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                            {currentTab === 'financiamento' ? 'Simulador de Financiamento' : 'Simulador de Caução / Seguro Fiança'}
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {currentTab === 'financiamento' ? 'Calcule as parcelas e condições de pagamento em tempo real' : 'Calcule os custos iniciais e mensais do aluguel'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs (Aba 1: Financiamento | Aba 2: Seguro Fiança) */}
            <div className="flex bg-slate-100 dark:bg-[#1f2937] p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl mb-8">
                <Link href="/painel/simuladores?tab=financiamento" className={`flex-1 flex justify-center items-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'financiamento' ? 'bg-white dark:bg-[#374151] border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                    <Home className={`w-4 h-4 ${currentTab === 'financiamento' ? 'text-blue-500' : ''}`} />
                    Imóvel na Planta / Terreno
                </Link>
                <Link href="/painel/simuladores?tab=caucao" className={`flex-1 flex justify-center items-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${currentTab === 'caucao' ? 'bg-white dark:bg-[#374151] border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                    <Shield className={`w-4 h-4 ${currentTab === 'caucao' ? 'text-orange-500' : ''}`} />
                    Caução / Seguro Fiança
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative items-start">
                {/* Esquerda: Formulario */}
                <div className="bg-white dark:bg-[#10151f] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <Calculator className="w-5 h-5 text-blue-500" />
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                            {currentTab === 'financiamento' ? 'Dados da Simulação' : 'Dados do Aluguel'}
                        </h3>
                    </div>

                    {currentTab === 'financiamento' ? (
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Valor de Avaliação <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Insira o valor de avaliação" className="bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[10px] text-slate-500 flex items-center gap-1"><span className="text-xs font-sans">💡</span> Valor de avaliação do imóvel pelo banco</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Valor de Venda <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Insira o valor de venda" className="bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[10px] text-slate-500 flex items-center gap-1"><span className="text-xs font-sans">💵</span> Preço de venda do imóvel</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Renda Familiar Mensal Bruta (sem descontos) <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Insira a renda familiar mensal bruta" className="bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[10px] text-slate-500 flex items-center gap-1"><span className="text-xs font-sans">💡</span> Preencha o valor de venda primeiro</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <label className="text-slate-700 dark:text-slate-300">Ato (Entrada Inicial)</label>
                                    <span className="text-slate-400 font-medium italic">(opcional)</span>
                                </div>
                                <input type="text" placeholder="Insira o valor do ato" className="bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[10px] text-slate-500 flex items-center gap-1">✨ Valor mínimo de entrada no ato da compra</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-xs font-bold">
                                        <label className="text-slate-700 dark:text-slate-300">Parcelas do Ato</label>
                                        <span className="text-slate-400 font-medium italic">(opcional)</span>
                                    </div>
                                    <input type="text" placeholder="Ex: 0" className="bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 w-full" />
                                    <p className="text-[10px] text-slate-500">Parcelar ato (opcional)</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Valor de Cada Parcela</label>
                                    <input type="text" value="R$ 0,00" readOnly className="bg-slate-100 dark:bg-[#20283b] border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed w-full outline-none" />
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5"><Calculator className="w-4 h-4 text-blue-500" /></div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-0.5">O empreendimento possui parcelas anuais?</h4>
                                        <p className="text-[10px] text-slate-500">Ative se houver pagamentos anuais durante a obra</p>
                                    </div>
                                </div>
                                <div className="w-10 h-6 bg-slate-300 dark:bg-slate-600 rounded-full cursor-pointer relative">
                                    <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Parcelas Mensais da Entrada <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Ex: 24" className="bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[10px] text-slate-500 flex items-center gap-1">Quantidade de meses para pagar a entrada restante</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <label className="text-slate-700 dark:text-slate-300">Restante da Entrada</label>
                                    <span className="text-slate-400 font-medium italic">(opcional)</span>
                                </div>
                                <input type="text" placeholder="Ex: R$ 0,00" className="bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[10px] text-slate-500 flex items-center gap-1"><span className="text-xs font-sans">💡</span> Esse valor antecipa parte da entrada total e reduz o valor das parcelas mensais.</p>
                            </div>

                            <div className="bg-slate-50 dark:bg-[#151a24] border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex gap-3 text-slate-500 dark:text-slate-400 text-xs">
                                <Shield className="w-4 h-4 shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Importante:</span>
                                    Esta é apenas uma estimativa. Os valores reais dependem da análise de crédito do banco.
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Valor do Aluguel Mensal <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Insira o valor do aluguel" className="bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[10px] text-slate-500 flex items-center gap-1"><span className="text-xs font-sans">🏠</span> Valor mensal do aluguel do imóvel</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Caução (em meses de aluguel) <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Ex: 3" className="bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[10px] text-slate-500 flex items-center gap-1"><span className="text-xs font-sans">🔄</span> Quantidade de meses de aluguel como caução (geralmente 3 meses)</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <label className="text-slate-700 dark:text-slate-300">Valor do Condomínio</label>
                                    <span className="text-slate-400 font-medium italic">(opcional)</span>
                                </div>
                                <input type="text" placeholder="Ex: R$ 500,00" className="bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[10px] text-slate-500 flex items-center gap-1"><span className="text-xs font-sans">$</span> Taxa mensal de condomínio (se houver)</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <label className="text-slate-700 dark:text-slate-300">IPTU Mensal</label>
                                    <span className="text-slate-400 font-medium italic">(opcional)</span>
                                </div>
                                <input type="text" placeholder="Ex: R$ 200,00" className="bg-slate-50 dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 w-full" />
                                <p className="text-[10px] text-slate-500 flex items-center gap-1"><span className="text-xs font-sans">$</span> Valor mensal do IPTU (se aplicável)</p>
                            </div>

                            <div className="flex items-center gap-4 my-2">
                                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Seguro Fiança</span>
                                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-0.5">Incluir Seguro Fiança?</h4>
                                        <p className="text-[11px] text-slate-500">Ativa o cálculo diluído do seguro fiança.</p>
                                    </div>
                                    <div className="w-10 h-6 bg-blue-500 rounded-full cursor-pointer relative">
                                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Prazo (Meses) <span className="text-red-500">*</span></label>
                                        <input type="text" defaultValue="30" className="bg-white dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 w-full" />
                                        <p className="text-[10px] text-slate-500">Duração do contrato</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Garantia (x Rendas) <span className="text-red-500">*</span></label>
                                        <input type="text" defaultValue="3" className="bg-white dark:bg-[#1a2233] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 w-full" />
                                        <p className="text-[10px] text-slate-500">% Multiplicador</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#10151f] rounded-lg p-3 flex gap-3 opacity-50 cursor-not-allowed">
                                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-xs text-slate-800 dark:text-slate-300 block">Garantia de</span>
                                            <span className="font-black text-sm text-slate-900 dark:text-white block">R$ 0,00</span>
                                            <span className="text-[10px] text-slate-400">diluída em 30 parcelas.</span>
                                        </div>
                                    </div>
                                    <div className="border border-orange-500 bg-orange-50 dark:bg-orange-900/10 rounded-lg p-3 flex gap-3">
                                        <div className="w-4 h-4 rounded-full border-4 border-orange-500 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-xs text-orange-800 dark:text-orange-500 block">Seguro Fiança:</span>
                                            <span className="text-[11px] text-orange-700 dark:text-orange-400">Valor não é devolvido (custo financeiro diluído).</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Direita: Resumo Financeiro */}
                <div className="sticky top-28 bg-transparent">
                    <h3 className="font-bold text-slate-800 dark:text-slate-300 text-base mb-4">Resumo Financeiro</h3>
                    <div className="border border-slate-200 dark:border-slate-800 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center h-[400px] bg-slate-50/50 dark:bg-slate-900/10">
                        <Calculator className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4 stroke-1" />
                        <p className="text-sm font-medium text-slate-400 dark:text-slate-500 max-w-[200px]">Preencha os campos ao lado para ver a simulação</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
