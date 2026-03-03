"use client";

import { useState } from "react";
import { Share2, Calculator } from "lucide-react";
import { FinancingSimulator } from "./FinancingSimulator";

interface PropertyActionBoxProps {
    price: number;
    ownerName: string;
    title: string;
    condominium: string;
    iptu: string;
}

export function PropertyActionBox({ price, ownerName, title, condominium, iptu }: PropertyActionBoxProps) {
    const [showSimulator, setShowSimulator] = useState(false);

    return (
        <>
            <div className="bg-white dark:bg-[#1e293b] border text-left border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden border-t-4 border-t-blue-600">
                <div className="p-6">

                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">Venda</span>
                        <span>Código: 14782</span>
                    </div>

                    <div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Valor do Imóvel</p>
                        <h2 className="text-3xl font-black text-blue-700 dark:text-blue-400 tracking-tight leading-none mb-6">
                            R$ {price ? price.toLocaleString('pt-BR') : '1.625.000,00'}
                        </h2>
                    </div>

                    <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Condomínio</span>
                            <span className="text-slate-900 dark:text-slate-100 font-bold">R$ {condominium || '-'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">IPTU</span>
                            <span className="text-slate-900 dark:text-slate-100 font-bold">R$ {iptu || '-'}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-8 mb-6">
                        <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setShowSimulator(true)}
                            className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full py-2.5 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                        >
                            <Calculator className="w-3.5 h-3.5" />
                            Simular Financiamento
                        </button>
                    </div>

                    {/* Contact Form */}
                    <form className="flex flex-col gap-3">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">Falar com o Corretor</h3>
                        <input type="text" placeholder="Nome" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                        <input type="email" placeholder="E-mail" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                        <input type="tel" placeholder="Telefone" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                        <textarea placeholder={`Olá, ${ownerName?.split(' ')[0] || 'RD'}. Tenho interesse no imóvel...`} className="w-full h-24 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"></textarea>

                        <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg py-3 text-sm flex items-center justify-center gap-2 transition-all mt-2">
                            Enviar Mensagem
                        </button>

                        <a href={`https://wa.me/5511999999999?text=Olá ${ownerName?.split(' ')[0] || 'RD'}! Tenho interesse no imóvel ${title}`} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg py-3 text-sm flex items-center justify-center gap-2 transition-all mt-1">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Conversar no WhatsApp
                        </a>
                    </form>
                </div>
            </div>

            {/* Financing Simulator Modal */}
            {showSimulator && (
                <FinancingSimulator
                    propertyPrice={price || 1625000}
                    onClose={() => setShowSimulator(false)}
                />
            )}
        </>
    );
}
