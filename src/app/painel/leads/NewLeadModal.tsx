"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { addLead } from "./actions";

export function NewLeadModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

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
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-bold shadow-sm flex items-center gap-2 transition-all"
            >
                <Plus className="w-4 h-4" /> Novo Lead
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1a1f2c] rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800">
                        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">Adicionar Lead</h2>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nome Completo</label>
                                <input required name="name" type="text" className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="Ex: João da Silva" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">WhatsApp</label>
                                <input required name="phone" type="text" className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="Ex: 11999999999" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">E-mail</label>
                                <input name="email" type="email" className="w-full bg-slate-50 dark:bg-[#0f1522] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" placeholder="Ex: joao@email.com" />
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                                    Cancelar
                                </button>
                                <button disabled={loading} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-all disabled:opacity-50">
                                    {loading ? 'Salvando...' : 'Salvar Lead'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
