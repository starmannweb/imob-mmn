'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X, Calendar as CalendarIcon } from 'lucide-react';

export default function CreateOpportunityModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 font-bold text-white shadow-md shadow-blue-500/20"
            >
                + Nova Oportunidade
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">

                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Criar Nova Oportunidade</h2>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2 bg-slate-50 dark:bg-slate-800 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            <div className="space-y-8">

                                {/* Informações Básicas */}
                                <section>
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Informações Básicas</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Título *</label>
                                            <input type="text" placeholder="Ex: Apartamento 3 quartos em Copacabana" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Descrição *</label>
                                            <textarea rows={4} placeholder="Descreva detalhadamente a oportunidade..." className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Tipo de Oportunidade *</label>
                                                <select className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors">
                                                    <option>Selecione o tipo</option>
                                                    <option>Parceria de Venda</option>
                                                    <option>Parceria de Locação</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Categoria *</label>
                                                <select className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors">
                                                    <option>Selecione a categoria</option>
                                                    <option>Residencial</option>
                                                    <option>Comercial</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Localização */}
                                <section>
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 border-t border-slate-100 dark:border-slate-800 pt-6">Localização</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Cidade</label>
                                            <input type="text" placeholder="Ex: Rio de Janeiro" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Estado</label>
                                            <select className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors">
                                                <option>Selecione o estado</option>
                                                <option>RJ</option>
                                                <option>SP</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                {/* Valores e Comissão */}
                                <section>
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 border-t border-slate-100 dark:border-slate-800 pt-6">Valores e Comissão</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Valor Total da Operação (R$)</label>
                                            <input type="text" placeholder="0,00" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Comissão Total (R$)</label>
                                            <input type="text" placeholder="0,00" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Comissão para o Indicador (%)</label>
                                            <input type="text" placeholder="0.0" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors" />
                                        </div>
                                    </div>
                                </section>

                                {/* Configurações */}
                                <section>
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 border-t border-slate-100 dark:border-slate-800 pt-6">Configurações</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Prioridade</label>
                                            <select className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors">
                                                <option>Média</option>
                                                <option>Alta</option>
                                                <option>Baixa</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Máx. Participantes</label>
                                            <input type="text" placeholder="Ilimitado" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Data de Expiração</label>
                                            <div className="relative">
                                                <input type="text" placeholder="dd/mm/aaaa --:--" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg pl-4 pr-10 py-2.5 outline-none focus:border-blue-500 transition-colors" />
                                                <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Informações Adicionais */}
                                <section>
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 border-t border-slate-100 dark:border-slate-800 pt-6">Informações Adicionais (Opcional)</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Tags</label>
                                            <div className="flex bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden focus-within:border-blue-500 transition-colors">
                                                <input type="text" placeholder="Adicionar tag..." className="flex-1 bg-transparent text-slate-700 dark:text-slate-200 text-sm px-4 py-2.5 outline-none" />
                                                <button className="px-4 text-slate-400 font-bold hover:text-blue-500 bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">+</button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Requisitos</label>
                                            <textarea rows={3} placeholder="Descreva os requisitos para participar desta oportunidade..." className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Benefícios</label>
                                            <textarea rows={3} placeholder="Descreva os benefícios desta oportunidade..." className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end gap-3 rounded-b-2xl shrink-0">
                            <Button variant="ghost" onClick={() => setIsOpen(false)} className="font-bold text-slate-500 hover:text-slate-700">Limpar</Button>
                            <Button onClick={() => setIsOpen(false)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20">Criar Oportunidade</Button>
                        </div>

                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(148, 163, 184, 0.3); border-radius: 20px; }
                    `}} />
                </div>
            )}
        </>
    );
}
