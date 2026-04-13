"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronRight, CreditCard, Plus, Trash2, User, FileText,
    AlertTriangle, CheckCircle2, X, Calendar, Loader2, MessageSquare, Gift
} from "lucide-react";
import { toast } from "sonner";

function RecomendaModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6 relative overflow-hidden">
                {/* Confetti decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/30 to-transparent rounded-bl-full" />

                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-xl">
                    <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                        <Gift className="w-8 h-8 text-amber-500" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">O que precisa fazer para ganhar?</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        É simples! Indique a plataforma para um novo cliente corretor!
                    </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Se você gosta do nosso trabalho, nos recomende através da sua rede de relacionamento.</p>
                    <p>Ao recomendar, selecione no WhatsApp e envie ao seu amigo corretor ou grupo que você participa.</p>
                    <p>Clique no botão <strong>"Recomendar"</strong> e selecione no WhatsApp o amigo ou grupo.</p>
                    <p className="text-xs text-slate-400">Se este for o primeiro pagamento do indicado, ao tomar nossa plataforma, você poderá depositar <strong className="text-emerald-600">R$500,00</strong> diretamente no seu PIX.</p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-5 text-center">
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-300">
                        Quer ganhar <span className="text-2xl text-amber-600">R$500,00</span> de presente depositado diretamente no seu PIX?
                    </p>
                </div>

                <div className="flex gap-3">
                    <button onClick={onClose}
                        className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        Depois
                    </button>
                    <a href="https://wa.me/?text=Olá! Recomendo esta plataforma imobiliária para corretores. Acesse e crie sua conta!" target="_blank" rel="noopener noreferrer"
                        className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                        <MessageSquare className="w-4 h-4" /> Recomendar agora
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function PlanoPage() {
    const [showRecomenda, setShowRecomenda] = useState(false);
    const [addingCard, setAddingCard] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");

    const creditUntil = "15/03/2026";

    const addCard = () => {
        if (!cardNumber || !cardName || !cardExpiry) { toast.error("Preencha todos os campos."); return; }
        toast.success("Cartão adicionado!");
        setAddingCard(false);
        setCardNumber(""); setCardName(""); setCardExpiry("");
    };

    return (
        <div className="flex-1 flex flex-col w-full max-w-6xl pb-16">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Contratos e Pagamentos</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Main */}
                <main className="flex-1 space-y-5">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                            <h1 className="text-lg font-bold text-slate-900 dark:text-white">Contratos e pagamentos</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Análise de contratos e pagamentos</p>
                        </div>

                        <div className="p-8 flex flex-col items-center text-center gap-5">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                <FileText className="w-8 h-8 text-slate-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700 dark:text-slate-300">No momento você não possui nenhum contrato ativo.</p>
                                <p className="text-sm text-slate-500 mt-1">Clique abaixo para Contratar.</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => toast.info("Redirecionando para os planos...")}
                                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold transition-colors">
                                    Contratar o Plano
                                </button>
                                <a href="https://wa.me/5562999999999" target="_blank" rel="noopener noreferrer"
                                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" /> Conversar com consultor
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Recomende e ganhe */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center flex-shrink-0">
                            <Gift className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-amber-800 dark:text-amber-300">Recomende e ganhe!</p>
                            <p className="text-xs text-amber-700 dark:text-amber-400">Indique a plataforma e ganhe R$500 no PIX quando seu indicado contratar.</p>
                        </div>
                        <button onClick={() => setShowRecomenda(true)}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold flex-shrink-0 transition-colors">
                            Saiba mais
                        </button>
                    </div>
                </main>

                {/* Sidebar */}
                <aside className="w-full lg:w-72 shrink-0 space-y-4">
                    {/* Crédito */}
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Crédito até</p>
                                <p className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mt-1">
                                    <Calendar className="w-4 h-4 text-blue-500" /> {creditUntil}
                                </p>
                            </div>
                        </div>
                        <button onClick={() => toast.info("Redirecionando para os planos...")}
                            className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold transition-colors">
                            Contratar plano
                        </button>
                    </div>

                    {/* Cartões */}
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3">Cartões de crédito</h3>
                        {!addingCard ? (
                            <>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                    <CreditCard className="w-4 h-4" /> Nenhum cartão cadastrado
                                </div>
                                <button onClick={() => setAddingCard(true)}
                                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                                    <Plus className="w-3.5 h-3.5" /> Adicionar cartão
                                </button>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <input type="text" placeholder="Número do cartão" value={cardNumber} onChange={e => setCardNumber(e.target.value)}
                                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                <input type="text" placeholder="Nome no cartão" value={cardName} onChange={e => setCardName(e.target.value)}
                                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                <input type="text" placeholder="Validade (MM/AA)" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)}
                                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                <div className="flex gap-2">
                                    <button onClick={() => setAddingCard(false)} className="flex-1 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-semibold">Cancelar</button>
                                    <button onClick={addCard} className="flex-1 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold">Salvar</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Responsável */}
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Responsável financeiro</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                                R
                            </div>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Meu perfil</span>
                        </div>
                    </div>

                    {/* Dados fiscais */}
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Dados Fiscais</h3>
                            <Link href="/painel/configuracoes?edit=true&tab=info" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                ✏️ Editar dados
                            </Link>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Meu perfil</p>
                    </div>

                    {/* Excluir conta */}
                    <button onClick={() => toast.error("Para excluir sua conta entre em contato com o suporte.")}
                        className="w-full py-2.5 border border-red-200 dark:border-red-800 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2">
                        <Trash2 className="w-3.5 h-3.5" /> Excluir minha conta e dados
                    </button>
                </aside>
            </div>

            {showRecomenda && <RecomendaModal onClose={() => setShowRecomenda(false)} />}
        </div>
    );
}
