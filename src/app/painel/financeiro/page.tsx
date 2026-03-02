import { createClient } from "@/utils/supabase/server";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Coins, ArrowUpRight, ArrowDownRight, ArrowRightLeft, Wallet, CheckCircle, TrendingUp } from "lucide-react";
import { redirect } from "next/navigation";

export default async function FinanceiroPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch transactions
    const { data: transactions } = await supabase
        .from("transactions")
        .select(`
            *,
            property:properties(title)
        `)
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false });

    // Calculate totals based on 'pending' or 'completed' status
    const pendingTotal = transactions?.filter(t => t.status === 'pending').reduce((sum, t) => sum + Number(t.commission_base), 0) || 0;
    const completedTotal = transactions?.filter(t => t.status === 'completed').reduce((sum, t) => sum + Number(t.commission_base), 0) || 0;

    const statusMap: Record<string, { label: string, color: string, bg: string, icon: any }> = {
        'pending': { label: 'Comissão Pendente', color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-100 dark:bg-amber-900/30', icon: ArrowRightLeft },
        'completed': { label: 'Comissão Liberada', color: 'text-green-700 dark:text-green-300', bg: 'bg-green-100 dark:bg-green-900/30', icon: CheckCircle },
        'canceled': { label: 'Negócio Cancelado', color: 'text-red-700 dark:text-red-300', bg: 'bg-red-100 dark:bg-red-900/30', icon: ArrowDownRight },
    };

    return (
        <div className="flex-1 flex flex-col w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Financeiro e Saques</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">Histórico de comissões e solicitações de repasse via Asaas.</p>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm flex flex-col items-start text-left relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full opacity-50 blur-2xl"></div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-2.5 rounded-lg font-bold"><Wallet className="w-5 h-5" /></div>
                        <h2 className="text-slate-600 dark:text-slate-300 font-semibold text-sm">Pronto para Saque</h2>
                    </div>
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">R$ {completedTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <button className="mt-4 w-full bg-slate-900 dark:bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors">
                        Solicitar Transferência
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm flex flex-col items-start text-left">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 p-2.5 rounded-lg font-bold"><TrendingUp className="w-5 h-5" /></div>
                        <h2 className="text-slate-600 dark:text-slate-300 font-semibold text-sm">A Receber (Fila B3)</h2>
                    </div>
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">R$ {pendingTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Aguardando registro em cartório / checkout.</p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm flex flex-col items-start text-left border-dashed border-2">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 p-2.5 rounded-lg"><Coins className="w-5 h-5" /></div>
                        <h2 className="text-slate-500 dark:text-slate-400 font-semibold text-sm">Integrações Gateway</h2>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        A chave PIX do corretor precisa estar habilitada antes da conclusão do negócio com a imobiliária master.
                    </p>
                </div>
            </div>

            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Últimas Transações</h2>

            {/* Lista Financeira Realista */}
            {transactions && transactions.length > 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                                <th className="p-4 py-3">Imóvel Negociado</th>
                                <th className="p-4 py-3">VGV Total</th>
                                <th className="p-4 py-3">Valor Comissão</th>
                                <th className="p-4 py-3 text-center">Status</th>
                                <th className="p-4 py-3 text-right">Data</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {transactions.map((t) => {
                                const s = statusMap[t.status] || statusMap['pending'];
                                const Icon = s.icon;
                                return (
                                    <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors text-sm">
                                        <td className="p-4 font-medium text-slate-900 dark:text-slate-200 line-clamp-1 max-w-[200px]">
                                            {t.property?.title || "Imóvel Offline/Deletado"}
                                        </td>
                                        <td className="p-4 text-slate-500 dark:text-slate-400">
                                            R$ {Number(t.total_value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                                            R$ {Number(t.commission_base).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.color}`}>
                                                <Icon className="w-3.5 h-3.5" /> {s.label}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right text-slate-400 dark:text-slate-500 font-medium">
                                            {formatDistanceToNow(new Date(t.created_at), { addSuffix: true, locale: ptBR })}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-16 text-center shadow-sm">
                    <Coins className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Nenhuma transação registrada</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Você ainda não converteu nenhum negócio ou os leads estão em fase inicial no funil CRM.</p>
                </div>
            )}
        </div>
    );
}
