"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Mail, Plus, Globe, AlertCircle, CheckCircle2, X, Loader2, Trash2, Settings } from "lucide-react";
import { toast } from "sonner";

type Domain = { id: string; domain: string; verified: boolean };
type Mailbox = { id: string; address: string; domain: string };

function AddDomainModal({ onClose, onAdd }: { onClose: () => void; onAdd: (d: string) => void }) {
    const [domain, setDomain] = useState("");
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Adicionar Domínio</h2>
                        <p className="text-xs text-slate-500 mt-0.5">Adicione seu domínio para criar contas de e-mail profissionais.</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"><X className="w-4 h-4" /></button>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Domínio</label>
                    <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="exemplo.com.br"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-semibold">Cancelar</button>
                    <button onClick={() => { if (domain.trim()) { onAdd(domain.trim()); onClose(); } }}
                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors">
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
}

function NoDomainModal({ onClose, onAddDomain }: { onClose: () => void; onAddDomain: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-7 h-7 text-amber-600" />
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">Criar conta de e-mail</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                    Para criar uma caixa, é necessário que você tenha adicionado no mínimo um domínio. Vamos fazer isso agora?
                </p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-semibold">Cancelar</button>
                    <button onClick={() => { onClose(); onAddDomain(); }}
                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors">
                        Adicionar Domínio
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function EmailsPage() {
    const [domains, setDomains] = useState<Domain[]>([]);
    const [mailboxes, setMailboxes] = useState<Mailbox[]>([]);
    const [showAddDomain, setShowAddDomain] = useState(false);
    const [showNoDomain, setShowNoDomain] = useState(false);
    const [newMailbox, setNewMailbox] = useState("");

    const addDomain = (domain: string) => {
        setDomains(p => [...p, { id: crypto.randomUUID(), domain, verified: false }]);
        toast.success(`Domínio ${domain} adicionado! Configure os registros DNS para verificar.`);
    };

    const verifyDomain = (id: string) => {
        setDomains(p => p.map(d => d.id === id ? { ...d, verified: true } : d));
        toast.success("Domínio verificado!");
    };

    const createMailbox = () => {
        if (domains.length === 0) { setShowNoDomain(true); return; }
        if (!newMailbox.trim()) return;
        const domain = domains[0].domain;
        const address = `${newMailbox.trim()}@${domain}`;
        setMailboxes(p => [...p, { id: crypto.randomUUID(), address, domain }]);
        setNewMailbox("");
        toast.success(`Caixa ${address} criada!`);
    };

    return (
        <div className="flex-1 flex flex-col w-full max-w-4xl pb-16">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/painel/configuracoes" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600">Configurações</Link>
                <ChevronRight className="w-3 h-3" />
                <span>E-mails</span>
            </div>

            <div className="space-y-6">
                {/* Domains */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-blue-600" />
                            <div>
                                <h2 className="font-bold text-slate-900 dark:text-white text-sm">Domínios</h2>
                                <p className="text-xs text-slate-500">Seus domínios configurados para e-mail</p>
                            </div>
                        </div>
                        <button onClick={() => setShowAddDomain(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors">
                            <Plus className="w-3.5 h-3.5" /> Adicionar Domínio
                        </button>
                    </div>
                    {domains.length === 0 ? (
                        <div className="p-10 text-center">
                            <Globe className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                            <p className="text-sm font-medium text-slate-500">Nenhum domínio configurado</p>
                            <p className="text-xs text-slate-400 mt-1">Adicione um domínio para criar e-mails profissionais.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-700">
                            {domains.map(d => (
                                <div key={d.id} className="flex items-center gap-4 p-4">
                                    <Globe className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{d.domain}</p>
                                        <p className={`text-xs ${d.verified ? "text-emerald-600" : "text-amber-600"}`}>
                                            {d.verified ? "Verificado" : "Aguardando verificação DNS"}
                                        </p>
                                    </div>
                                    {!d.verified && (
                                        <button onClick={() => verifyDomain(d.id)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-semibold">
                                            <CheckCircle2 className="w-3 h-3" /> Verificar
                                        </button>
                                    )}
                                    <button onClick={() => setDomains(p => p.filter(x => x.id !== d.id))}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Mailboxes */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-emerald-600" />
                            <div>
                                <h2 className="font-bold text-slate-900 dark:text-white text-sm">Caixas de E-mail</h2>
                                <p className="text-xs text-slate-500">Contas de e-mail criadas</p>
                            </div>
                        </div>
                        <button onClick={() => domains.length === 0 ? setShowNoDomain(true) : undefined}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors">
                            <Plus className="w-3.5 h-3.5" /> Criar conta de e-mail
                        </button>
                    </div>

                    {domains.length > 0 && (
                        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <input type="text" value={newMailbox} onChange={e => setNewMailbox(e.target.value)}
                                        onKeyDown={e => e.key === "Enter" && createMailbox()}
                                        placeholder="nome"
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none pr-24" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">@{domains[0]?.domain}</span>
                                </div>
                                <button onClick={createMailbox}
                                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors">
                                    Criar
                                </button>
                            </div>
                        </div>
                    )}

                    {mailboxes.length === 0 ? (
                        <div className="p-10 text-center">
                            <Mail className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                            <p className="text-sm font-medium text-slate-500">Nenhuma conta de e-mail criada</p>
                            <p className="text-xs text-slate-400 mt-1">
                                {domains.length === 0 ? "Adicione um domínio primeiro." : "Crie sua primeira caixa de e-mail."}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-700">
                            {mailboxes.map(m => (
                                <div key={m.id} className="flex items-center gap-4 p-4">
                                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xs flex-shrink-0">
                                        {m.address.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{m.address}</p>
                                        <p className="text-xs text-emerald-600">Ativa</p>
                                    </div>
                                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                                        <Settings className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => setMailboxes(p => p.filter(x => x.id !== m.id))}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {showAddDomain && <AddDomainModal onClose={() => setShowAddDomain(false)} onAdd={addDomain} />}
            {showNoDomain && <NoDomainModal onClose={() => setShowNoDomain(false)} onAddDomain={() => setShowAddDomain(true)} />}
        </div>
    );
}
