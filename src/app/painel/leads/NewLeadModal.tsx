"use client";

import { useState } from "react";
import { Plus, X, User, Phone, MapPin, Search } from "lucide-react";
import { addLead } from "./actions";
import { Button } from "@/components/ui/button";

export function NewLeadModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'pessoais' | 'busca'>('pessoais');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        await addLead(formData);
        setLoading(false);
        setIsOpen(false);
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md flex items-center gap-2 transition-all"
            >
                <Plus className="w-4 h-4" /> Cadastrar Novo Cliente
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-[#1a1f2c] rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
                        
                        {/* Header */}
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                    <User className="text-blue-500 w-6 h-6" /> Ficha do Cliente / Lead
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Cadastre as informações e o perfil de busca para o Radar.</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-800 p-2 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex px-6 border-b border-slate-200 dark:border-slate-800">
                            <button 
                                onClick={() => setActiveTab('pessoais')}
                                className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'pessoais' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                            >
                                <User className="w-4 h-4" /> Dados Pessoais e Contato
                            </button>
                            <button 
                                onClick={() => setActiveTab('busca')}
                                className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'busca' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                            >
                                <Search className="w-4 h-4" /> Perfil de Busca (Radar)
                            </button>
                        </div>

                        {/* Form Area */}
                        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                            <div className="p-6 overflow-y-auto flex-1 bg-white dark:bg-[#1a1f2c]">
                                
                                {activeTab === 'pessoais' && (
                                    <div className="space-y-6 animate-in slide-in-from-left-4 fade-in">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Nome Completo *</label>
                                                <input required name="name" type="text" className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium" placeholder="Ex: João da Silva" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">CPF / CNPJ</label>
                                                <input name="document" type="text" className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-all" placeholder="000.000.000-00" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> WhatsApp Principal *</label>
                                                <input required name="phone" type="text" className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-all font-medium" placeholder="(11) 99999-9999" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">E-mail</label>
                                                <input name="email" type="email" className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-all" placeholder="joao@email.com" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Estado Civil</label>
                                                <select className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-all text-sm">
                                                    <option>Não Informado</option>
                                                    <option>Solteiro(a)</option>
                                                    <option>Casado(a)</option>
                                                    <option>Divorciado(a)</option>
                                                    <option>União Estável</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Profissão</label>
                                                <input type="text" className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-all" placeholder="Ex: Engenheiro" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Renda Mensal Est.</label>
                                                <input type="text" className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-all" placeholder="R$ 15.000" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'busca' && (
                                    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in">
                                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/50 mb-6">
                                            <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
                                                Ao preencher o Perfil de Busca, o <strong>Radar Imobiliário</strong> irá te notificar automaticamente toda vez que um novo imóvel correspondente for captado e entrar no sistema (ideal para cruzamento inteligente).
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Intenção</label>
                                                <div className="flex gap-2">
                                                    <label className="flex-1 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 py-2.5 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20 transition-all text-sm font-semibold">
                                                        <input type="radio" name="intent" value="buy" className="hidden" defaultChecked />
                                                        Comprar
                                                    </label>
                                                    <label className="flex-1 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 py-2.5 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50 dark:has-[:checked]:bg-amber-900/20 transition-all text-sm font-semibold">
                                                        <input type="radio" name="intent" value="rent" className="hidden" />
                                                        Alugar
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Tipo Desejado</label>
                                                <select className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-all text-sm">
                                                    <option>Qualquer</option>
                                                    <option>Apartamento</option>
                                                    <option>Casa em Condomínio</option>
                                                    <option>Terreno</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Valor Máximo (R$)</label>
                                                <input type="number" className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 text-lg font-bold text-slate-700" placeholder="Ex: 800000" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Bairros de Interesse</label>
                                                <input type="text" className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-all" placeholder="Ex: Leblon, Ipanema, Gávea" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* Footer / Actions */}
                            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1a1f2c] flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="font-semibold text-slate-600 dark:text-slate-300">
                                    Cancelar
                                </Button>
                                <Button disabled={loading} type="submit" className="bg-blue-600 hover:bg-blue-700 font-bold px-8 text-white shadow-lg shadow-blue-500/20">
                                    {loading ? 'Salvando Cliente...' : 'Salvar Cadastro e Radar'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

