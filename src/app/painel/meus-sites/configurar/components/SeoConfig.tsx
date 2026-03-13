"use client";

import { useState } from "react";
import { Save, Search, Globe } from "lucide-react";
import { toast } from "sonner";

export function SeoConfig({ settings, updateSettings }: { settings: any, updateSettings: (key: string, value: any) => void }) {
    const seo = settings?.seo || {};
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: seo.title || "",
        description: seo.description || "",
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setLoading(true);
        updateSettings("seo", formData);
        setTimeout(() => setLoading(false), 500);
        toast.success("Configurações de SEO salvas!");
    };

    // Helper para gerar o preview
    const previewUrl = settings?.domains?.[0]?.url 
        ? `www.${settings.domains[0].url}` 
        : "www.seusite.com.br/url-personalizada";

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">SEO</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Configure o SEO do seu site.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Side */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                Título da página
                                <span className="text-blue-500 text-xs font-normal cursor-pointer hover:underline">(saiba mais)</span>
                            </label>
                            <input 
                                type="text" 
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors"
                                placeholder="Ex: Imobiliária Modelo - Compra, Venda e Aluguel de Imóveis"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-800 dark:text-slate-200">Descrição</label>
                            <textarea 
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 min-h-[140px] resize-none transition-colors"
                                placeholder="Ex: Somos especializados na compra, venda e aluguel de imóveis. Conte com a máxima transparência e atenção de um corretor especializado."
                            />
                        </div>
                    </div>

                    {/* Preview Side */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700 flex flex-col justify-center">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 max-w-md mx-auto w-full">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-slate-100 dark:bg-slate-700 p-1.5 rounded-full">
                                    <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Google Search Preview</span>
                            </div>
                            
                            <h4 className="text-[#1a0dab] dark:text-[#8ab4f8] text-lg font-medium hover:underline cursor-pointer truncate">
                                {formData.title || "Título da Página"}
                            </h4>
                            
                            <div className="flex items-center gap-1 text-sm mb-1">
                                <span className="text-[#006621] dark:text-[#34a853] truncate max-w-[200px]">{previewUrl}</span>
                            </div>

                            <p className="text-[#545454] dark:text-[#bdc1c6] text-sm leading-snug line-clamp-3">
                                {formData.description || "Descrição do seu site aparecerá aqui. Adicione um texto atrativo para aumentar seus cliques nos resultados de busca."}
                            </p>
                        </div>
                        <p className="text-center text-xs text-slate-400 mt-4">
                            * Esta é uma simulação de como seu site pode aparecer no Google.
                        </p>
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
