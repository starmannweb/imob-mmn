"use client";

import { useState } from "react";
import { Save, Lock, Image } from "lucide-react";
import { toast } from "sonner";

export function PhotoRestrictionConfig({ settings, updateSettings }: { settings: any, updateSettings: (key: string, value: any) => void }) {
    const photo_restriction = settings?.photo_restriction || {};
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        is_active: photo_restriction.is_active !== false,
        count_before_gate: photo_restriction.count_before_gate || 5,
        title: photo_restriction.title || "Gostaria de ver mais fotos?",
        subtitle: photo_restriction.subtitle || "Também gostaríamos de saber quem é você! Pedimos os seus dados para te conhecer melhor e te enviar as melhores oportunidades de compra.",
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setLoading(true);
        updateSettings("photo_restriction", formData);
        setTimeout(() => setLoading(false), 500);
        toast.success("Configurações de restrição de fotos salvas!");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Restrição de fotos da galeria do imóvel</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Restrinja a quantidade de imagens exibidas antes de solicitar a identificação do cliente.
                </p>
            </div>

            {/* Preview Card */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-8 flex justify-center">
                <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg max-w-2xl w-full overflow-hidden flex flex-col md:flex-row">
                    {/* Fake Form Side */}
                    <div className="flex-1 p-6 space-y-4">
                        <div className="space-y-1">
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{formData.title}</h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                                {formData.subtitle}
                            </p>
                        </div>
                        <div className="space-y-2 pointer-events-none opacity-60">
                            <input type="text" placeholder="Digite seu nome" className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs" />
                            <input type="text" placeholder="Digite seu telefone" className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs" />
                            <input type="text" placeholder="Digite seu e-mail" className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs" />
                            <button className="w-full bg-emerald-500 text-white py-2 rounded text-xs font-bold">Enviar</button>
                        </div>
                    </div>
                    {/* Fake Navigation Side */}
                    <div className="bg-slate-100 dark:bg-slate-900/50 w-12 flex items-center justify-center border-l border-slate-200 dark:border-slate-700">
                        <span className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded">Próximo &gt;</span>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900/50 w-12 flex items-center justify-center border-r border-slate-200 dark:border-slate-700 order-first">
                        <span className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded">&lt; Anterior</span>
                    </div>
                </div>
            </div>

            {/* Configuration */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                    <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Ativar pop-up pedindo dados do usuário?</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Após seu cliente visualizar um número pré-definido de fotos, mostrar uma pop-up pedindo seus dados.</p>
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                        <button onClick={() => handleInputChange("is_active", true)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.is_active ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                        <button onClick={() => handleInputChange("is_active", false)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${!formData.is_active ? "bg-red-500 text-white" : "text-slate-500"}`}>Não</button>
                    </div>
                </div>

                <div className={`space-y-6 transition-opacity ${!formData.is_active && 'opacity-50 pointer-events-none'}`}>
                    <div className="space-y-2">
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Mostrar pop-up após visualizar quantas fotos?</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Defina o número de fotos que o seu cliente poderá visualizar antes de mostrar a pop-up.</p>
                        <input 
                            type="number" 
                            value={formData.count_before_gate}
                            onChange={(e) => handleInputChange("count_before_gate", parseInt(e.target.value))}
                            className="w-24 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                            min="1"
                        />
                    </div>

                    <div className="space-y-2">
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Título</h5>
                        <input 
                            type="text" 
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Frase de apoio</h5>
                        <textarea 
                            value={formData.subtitle}
                            onChange={(e) => handleInputChange("subtitle", e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500 min-h-[80px] resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
                <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    Salvar
                </button>
            </div>
        </div>
    );
}
