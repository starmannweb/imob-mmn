"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus, Trash2, Edit, X, TrendingUp, Bell, BellOff } from "lucide-react";
import { toast } from "sonner";

type Indice = {
    id: string;
    nome: string;
    sigla: string;
    moeda: string;
    preco: string;
    alertar: boolean;
    quando: string;
};

const MOEDAS = [
    { value: "BRL", label: "R$ - Real (BRL)" },
    { value: "USD", label: "$ - Dólar (USD)" },
    { value: "EUR", label: "€ - Euro (EUR)" },
    { value: "IGP-M", label: "IGP-M" },
    { value: "IPCA", label: "IPCA" },
    { value: "CDI", label: "CDI" },
    { value: "SELIC", label: "SELIC" },
];

const QUANDO_OPTIONS = [
    "Mensalmente",
    "Trimestralmente",
    "Semestralmente",
    "Anualmente",
    "A cada 2 anos",
    "Quando solicitado",
];

function IndiceModal({
    onClose,
    onSave,
    initial,
}: {
    onClose: () => void;
    onSave: (data: Omit<Indice, "id">) => void;
    initial?: Indice;
}) {
    const [nome, setNome] = useState(initial?.nome || "");
    const [moeda, setMoeda] = useState(initial?.moeda || "USD");
    const [preco, setPreco] = useState(initial?.preco || "");
    const [alertar, setAlertar] = useState(initial?.alertar ?? true);
    const [quando, setQuando] = useState(initial?.quando || "Mensalmente");

    const sigla = MOEDAS.find(m => m.value === moeda)?.value || moeda;

    const submit = () => {
        if (!nome.trim() || !preco.trim()) {
            toast.error("Preencha Nome e Preço.");
            return;
        }
        onSave({ nome, sigla, moeda, preco, alertar, quando });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {initial ? "Editar Índice" : "Adicionar Índice"}
                    </h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                Nome <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                placeholder="Digite..."
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                Sigla / Moeda
                            </label>
                            <select
                                value={moeda}
                                onChange={e => setMoeda(e.target.value)}
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                {MOEDAS.map(m => (
                                    <option key={m.value} value={m.value}>{m.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                            Preço <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={preco}
                            onChange={e => setPreco(e.target.value)}
                            placeholder="Digite..."
                            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                Alertar para atualizar? <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={alertar ? "sim" : "nao"}
                                onChange={e => setAlertar(e.target.value === "sim")}
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                Quando? <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={quando}
                                onChange={e => setQuando(e.target.value)}
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                {QUANDO_OPTIONS.map(o => (
                                    <option key={o} value={o}>{o}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-5 border-t border-slate-100 dark:border-slate-800">
                    <button onClick={onClose}
                        className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        Cancelar
                    </button>
                    <button onClick={submit}
                        className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors">
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function IndicesPage() {
    const [indices, setIndices] = useState<Indice[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Indice | null>(null);

    const handleSave = (data: Omit<Indice, "id">) => {
        if (editing) {
            setIndices(p => p.map(i => i.id === editing.id ? { ...data, id: editing.id } : i));
            toast.success("Índice atualizado!");
            setEditing(null);
        } else {
            setIndices(p => [...p, { ...data, id: crypto.randomUUID() }]);
            toast.success("Índice cadastrado!");
            setShowModal(false);
        }
    };

    const remove = (id: string) => {
        setIndices(p => p.filter(i => i.id !== id));
        toast.info("Índice removido.");
    };

    return (
        <div className="flex-1 flex flex-col w-full max-w-4xl pb-16">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/painel/financeiro" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600">Financeiro</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Índices Financeiros</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-amber-50 dark:bg-amber-900/30 p-2.5 rounded-xl border border-amber-100 dark:border-amber-900">
                        <TrendingUp className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Índices Financeiros</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Cadastre os índices financeiros utilizados nos contratos</p>
                    </div>
                </div>
                <button onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Adicionar Indicador
                </button>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
                {indices.length === 0 ? (
                    <div className="p-16 text-center">
                        <TrendingUp className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                        <p className="font-semibold text-slate-500 dark:text-slate-400">Nenhum índice cadastrado</p>
                        <p className="text-xs text-slate-400 mt-1">Quando cadastrar um índice, ele aparecerá aqui.</p>
                        <button onClick={() => setShowModal(true)}
                            className="mt-4 flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold mx-auto transition-colors">
                            <Plus className="w-4 h-4" /> Adicionar índice
                        </button>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-xs uppercase tracking-wider text-slate-500 font-bold">
                                <th className="p-4">Nome</th>
                                <th className="p-4">Sigla</th>
                                <th className="p-4">Preço</th>
                                <th className="p-4 text-center">Alertar</th>
                                <th className="p-4">Frequência</th>
                                <th className="p-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {indices.map(ind => (
                                <tr key={ind.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors text-sm">
                                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">{ind.nome}</td>
                                    <td className="p-4 text-slate-500 dark:text-slate-400">
                                        <code className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs font-bold">{ind.sigla}</code>
                                    </td>
                                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">{ind.preco}</td>
                                    <td className="p-4 text-center">
                                        {ind.alertar
                                            ? <Bell className="w-4 h-4 text-amber-500 mx-auto" />
                                            : <BellOff className="w-4 h-4 text-slate-300 mx-auto" />
                                        }
                                    </td>
                                    <td className="p-4 text-slate-500 dark:text-slate-400">{ind.quando}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex gap-1 justify-end">
                                            <button onClick={() => setEditing(ind)}
                                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                                                <Edit className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => remove(ind.id)}
                                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {(showModal || editing) && (
                <IndiceModal
                    onClose={() => { setShowModal(false); setEditing(null); }}
                    onSave={handleSave}
                    initial={editing || undefined}
                />
            )}
        </div>
    );
}
