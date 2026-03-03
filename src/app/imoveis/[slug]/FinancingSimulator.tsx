"use client";

import { useState } from "react";
import { Calculator, X, TrendingUp } from "lucide-react";

interface FinancingSimulatorProps {
    propertyPrice: number;
    onClose: () => void;
}

export function FinancingSimulator({ propertyPrice, onClose }: FinancingSimulatorProps) {
    const [valorImovel, setValorImovel] = useState(propertyPrice || 500000);
    const [entrada, setEntrada] = useState(Math.round((propertyPrice || 500000) * 0.2));
    const [prazo, setPrazo] = useState(360); // meses
    const [taxaAnual, setTaxaAnual] = useState(10.49); // % ao ano

    const valorFinanciado = valorImovel - entrada;
    const taxaMensal = taxaAnual / 100 / 12;
    const n = prazo;

    // Sistema SAC
    const amortizacaoSAC = valorFinanciado / n;
    const primeiraPrestacaoSAC = amortizacaoSAC + valorFinanciado * taxaMensal;
    const ultimaPrestacaoSAC = amortizacaoSAC + amortizacaoSAC * taxaMensal;

    // Sistema PRICE (parcela fixa)
    const parcelaPrice =
        taxaMensal > 0
            ? (valorFinanciado * taxaMensal * Math.pow(1 + taxaMensal, n)) /
            (Math.pow(1 + taxaMensal, n) - 1)
            : valorFinanciado / n;

    const totalPagoPrice = parcelaPrice * n + entrada;
    const totalJurosPrice = totalPagoPrice - valorImovel;

    const formatCurrency = (v: number) =>
        v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <Calculator className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Simulador de Financiamento</h3>
                            <p className="text-blue-100 text-xs">Calcule sua parcela estimada</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 space-y-5">
                    {/* Valor do Imóvel */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                            Valor do Imóvel
                        </label>
                        <input
                            type="text"
                            value={formatCurrency(valorImovel)}
                            onChange={(e) => {
                                const v = Number(e.target.value.replace(/\D/g, "")) / 100;
                                setValorImovel(v);
                                setEntrada(Math.round(v * 0.2));
                            }}
                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-blue-700 dark:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                        />
                    </div>

                    {/* Entrada */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                            Entrada ({((entrada / valorImovel) * 100).toFixed(0)}%)
                        </label>
                        <input
                            type="range"
                            min={0}
                            max={valorImovel * 0.8}
                            step={10000}
                            value={entrada}
                            onChange={(e) => setEntrada(Number(e.target.value))}
                            className="w-full accent-blue-600"
                        />
                        <p className="text-right text-sm font-bold text-slate-700 dark:text-slate-300 mt-1">
                            {formatCurrency(entrada)}
                        </p>
                    </div>

                    {/* Prazo e Taxa */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                                Prazo (anos)
                            </label>
                            <select
                                value={prazo}
                                onChange={(e) => setPrazo(Number(e.target.value))}
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                            >
                                <option value={120}>10 anos</option>
                                <option value={180}>15 anos</option>
                                <option value={240}>20 anos</option>
                                <option value={300}>25 anos</option>
                                <option value={360}>30 anos</option>
                                <option value={420}>35 anos</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                                Taxa anual (%)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={taxaAnual}
                                onChange={(e) => setTaxaAnual(Number(e.target.value))}
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Resultado */}
                <div className="bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Resultado da Simulação</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* PRICE */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Parcela (PRICE)</span>
                            <p className="text-xl font-black text-blue-600">{formatCurrency(parcelaPrice)}</p>
                            <span className="text-[10px] text-slate-400">Parcela fixa</span>
                        </div>
                        {/* SAC */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">1ª Parcela (SAC)</span>
                            <p className="text-xl font-black text-emerald-600">{formatCurrency(primeiraPrestacaoSAC)}</p>
                            <span className="text-[10px] text-slate-400">Última: {formatCurrency(ultimaPrestacaoSAC)}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Financiado</span>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{formatCurrency(valorFinanciado)}</p>
                        </div>
                        <div className="text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Pago</span>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{formatCurrency(totalPagoPrice)}</p>
                        </div>
                        <div className="text-center">
                            <span className="text-[10px] font-bold text-red-400 uppercase block">Total Juros</span>
                            <p className="text-sm font-bold text-red-500">{formatCurrency(totalJurosPrice)}</p>
                        </div>
                    </div>

                    <p className="text-[10px] text-slate-400 mt-4 text-center">
                        * Simulação meramente ilustrativa. Valores sujeitos a análise de crédito.
                    </p>
                </div>
            </div>
        </div>
    );
}
