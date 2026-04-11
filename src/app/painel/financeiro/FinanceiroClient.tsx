"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
    Coins, ArrowDownRight, ArrowRightLeft, Wallet, CheckCircle,
    TrendingUp, Download, Home, Key, FileText, Filter,
    ChevronDown, Search, X
} from "lucide-react";

type Transaction = {
    id: string;
    status: string;
    total_value: number;
    commission_base: number;
    created_at: string;
    property?: { title: string } | null;
    transaction_type?: "sale" | "rent";
};

type Tab = "comissoes" | "vendas" | "locacoes";

const statusMap: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    pending: { label: "Comissão Pendente", color: "text-amber-700 dark:text-amber-300", bg: "bg-amber-100 dark:bg-amber-900/30", icon: ArrowRightLeft },
    completed: { label: "Comissão Liberada", color: "text-green-700 dark:text-green-300", bg: "bg-green-100 dark:bg-green-900/30", icon: CheckCircle },
    canceled: { label: "Negócio Cancelado", color: "text-red-700 dark:text-red-300", bg: "bg-red-100 dark:bg-red-900/30", icon: ArrowDownRight },
};

export function FinanceiroClient({
    transactions,
    completedTotal,
    pendingTotal,
}: {
    transactions: Transaction[];
    completedTotal: number;
    pendingTotal: number;
}) {
    const [activeTab, setActiveTab] = useState<Tab>("comissoes");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const sales = transactions.filter(t => t.transaction_type === "sale" || !t.transaction_type);
    const rentals = transactions.filter(t => t.transaction_type === "rent");

    const displayList = activeTab === "vendas" ? sales : activeTab === "locacoes" ? rentals : transactions;

    const filtered = displayList.filter(t => {
        const matchSearch = !search || t.property?.title?.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || t.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const exportCSV = () => {
        const rows = [
            ["Imóvel", "VGV Total", "Comissão", "Status", "Data"],
            ...filtered.map(t => [
                t.property?.title || "Imóvel Offline",
                t.total_value,
                t.commission_base,
                statusMap[t.status]?.label || t.status,
                new Date(t.created_at).toLocaleDateString("pt-BR"),
            ]),
        ];
        const csv = rows.map(r => r.join(";")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `financeiro_${activeTab}_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const totalTab = filtered.reduce((s, t) => s + Number(t.commission_base), 0);

    return (
        <div className="flex-1 flex flex-col w-full">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Financeiro</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Histórico de comissões, vendas e locações.</p>
                </div>
                <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                >
                    <Download className="w-4 h-4 text-emerald-600" />
                    Exportar Relatório
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
            </div>

            {/* Top stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm flex flex-col items-start text-left relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full opacity-50 blur-2xl" />
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-2.5 rounded-lg"><Wallet className="w-5 h-5" /></div>
                        <h2 className="text-slate-600 dark:text-slate-300 font-semibold text-sm">Pronto para Saque</h2>
                    </div>
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        R$ {completedTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                    <button className="mt-4 w-full bg-slate-900 dark:bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors text-sm">
                        Solicitar Transferência
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm flex flex-col items-start text-left">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 p-2.5 rounded-lg"><TrendingUp className="w-5 h-5" /></div>
                        <h2 className="text-slate-600 dark:text-slate-300 font-semibold text-sm">A Receber (Fila B3)</h2>
                    </div>
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        R$ {pendingTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
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

            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-700 mb-5">
                {([
                    { key: "comissoes", label: "Comissões", icon: <Coins className="w-3.5 h-3.5" />, count: transactions.length },
                    { key: "vendas", label: "Vendas", icon: <Home className="w-3.5 h-3.5" />, count: sales.length },
                    { key: "locacoes", label: "Locações", icon: <Key className="w-3.5 h-3.5" />, count: rentals.length },
                ] as const).map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                            activeTab === tab.key
                                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                    >
                        {tab.icon} {tab.label}
                        <span className="ml-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar imóvel..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {search && (
                        <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            <X className="w-3 h-3" />
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="all">Todos os status</option>
                        <option value="pending">Pendente</option>
                        <option value="completed">Liberado</option>
                        <option value="canceled">Cancelado</option>
                    </select>
                </div>
                {filtered.length > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                            Total: R$ {totalTab.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                )}
            </div>

            {/* Table */}
            {filtered.length > 0 ? (
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
                            {filtered.map(t => {
                                const s = statusMap[t.status] || statusMap["pending"];
                                const Icon = s.icon;
                                return (
                                    <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors text-sm">
                                        <td className="p-4 font-medium text-slate-900 dark:text-slate-200 max-w-[200px]">
                                            <div className="flex items-center gap-2">
                                                {t.transaction_type === "rent"
                                                    ? <Key className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                                                    : <Home className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                                                }
                                                <span className="line-clamp-1">{t.property?.title || "Imóvel Offline/Deletado"}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-500 dark:text-slate-400">
                                            R$ {Number(t.total_value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                                            R$ {Number(t.commission_base).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
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
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-16 text-center shadow-sm">
                    <Coins className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                        {activeTab === "vendas" ? "Nenhuma venda registrada" : activeTab === "locacoes" ? "Nenhuma locação registrada" : "Nenhuma transação registrada"}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                        {activeTab === "vendas"
                            ? "Quando você fechar uma venda, ela aparecerá aqui para controle de comissão."
                            : activeTab === "locacoes"
                            ? "Locações fechadas e suas comissões aparecerão aqui."
                            : "Você ainda não converteu nenhum negócio ou os leads estão em fase inicial no funil CRM."}
                    </p>
                </div>
            )}
        </div>
    );
}
