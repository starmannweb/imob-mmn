"use client";

import { useState } from "react";
import { Save, Palette, Type, Layout } from "lucide-react";
import { toast } from "sonner";

export function AppearanceConfig({ settings, updateSettings }: { settings: any, updateSettings: (key: string, value: any) => void }) {
    const appearance = settings?.appearance || {};
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        primaryColor: appearance.primaryColor || '#000000',
        backgroundColor: appearance.backgroundColor || '#F8F9FA',
        menuFontColor: appearance.menuFontColor || 'auto',
        priceColor: appearance.priceColor || '#000000',
        priceColorSale: appearance.priceColorSale || '#000000',
        titleFont: appearance.titleFont || 'Montserrat',
        textFont: appearance.textFont || 'Montserrat',
        fullScreenTop: appearance.fullScreenTop || false,
        titleAlignment: appearance.titleAlignment || 'center',
    });

    const handleSave = () => {
        setLoading(true);
        updateSettings("appearance", formData);
        setTimeout(() => setLoading(false), 500);
        toast.success("Aparência atualizada!");
    };

    const fonts = [
        'Montserrat',
        'Roboto',
        'Open Sans',
        'Lato',
        'Poppins',
        'Inter',
        'Raleway',
        'Nunito'
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Aparência</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Configure a aparência do seu site.
                </p>
            </div>

            {/* Cor padrão do site */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                            Cor padrão do Site
                        </label>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                            Escolha a cor que será utilizada em botões, links e outros detalhes do seu site.
                        </p>
                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                value={formData.primaryColor}
                                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                                className="w-20 h-12 rounded-lg border-2 border-slate-200 dark:border-slate-600 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={formData.primaryColor}
                                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                                className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-sm"
                                placeholder="#000000"
                            />
                        </div>
                    </div>

                    {/* Cor do fundo */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                            Cor do fundo
                        </label>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                            Escolha a cor que será utilizada no fundo do seu site.
                        </p>
                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                value={formData.backgroundColor}
                                onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                                className="w-20 h-12 rounded-lg border-2 border-slate-200 dark:border-slate-600 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={formData.backgroundColor}
                                onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                                className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-sm"
                                placeholder="#F8F9FA"
                            />
                        </div>
                    </div>

                    {/* Cor da fonte no menu */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                            Cor da fonte no menu
                        </label>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                            Escolha a cor que será utilizada na fonte do menu do seu site.
                        </p>
                        <select
                            value={formData.menuFontColor}
                            onChange={(e) => setFormData({ ...formData, menuFontColor: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                        >
                            <option value="auto">Automático</option>
                            <option value="light">Claro</option>
                            <option value="dark">Escuro</option>
                        </select>
                    </div>

                    {/* Cor dos preços */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Cor dos preços
                            </label>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                                Escolha a cor que será utilizada nos preços do seu site.
                            </p>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={formData.priceColor}
                                    onChange={(e) => setFormData({ ...formData, priceColor: e.target.value })}
                                    className="w-16 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={formData.priceColor}
                                    onChange={(e) => setFormData({ ...formData, priceColor: e.target.value })}
                                    className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                Cor para venda
                            </label>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                                Cor específica para imóveis à venda
                            </p>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={formData.priceColorSale}
                                    onChange={(e) => setFormData({ ...formData, priceColorSale: e.target.value })}
                                    className="w-16 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={formData.priceColorSale}
                                    onChange={(e) => setFormData({ ...formData, priceColorSale: e.target.value })}
                                    className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fontes */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                            Fonte do título
                        </label>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                            Defina a fonte que será utilizada nos títulos do seu site.
                        </p>
                        <select
                            value={formData.titleFont}
                            onChange={(e) => setFormData({ ...formData, titleFont: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                        >
                            {fonts.map(font => (
                                <option key={font} value={font}>{font}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                            Fonte do texto
                        </label>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                            Defina a fonte que será utilizada nos textos do seu site.
                        </p>
                        <select
                            value={formData.textFont}
                            onChange={(e) => setFormData({ ...formData, textFont: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                        >
                            {fonts.map(font => (
                                <option key={font} value={font}>{font}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Layout */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                            Site com abas laterais
                        </label>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                            O site ficará centralizado no meio da tela do computador e com bordas laterais.
                        </p>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="fullScreen"
                                    checked={formData.fullScreenTop}
                                    onChange={() => setFormData({ ...formData, fullScreenTop: true })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sim</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="fullScreen"
                                    checked={!formData.fullScreenTop}
                                    onChange={() => setFormData({ ...formData, fullScreenTop: false })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Não</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                            Alinhamento dos títulos
                        </label>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                            Escolha se os títulos do seu site ficarão alinhados à esquerda, centralizados ou à direita.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setFormData({ ...formData, titleAlignment: 'left' })}
                                className={`flex-1 px-4 py-3 border rounded-lg font-medium text-sm transition-colors ${
                                    formData.titleAlignment === 'left'
                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                        : 'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                            >
                                Esquerda
                            </button>
                            <button
                                onClick={() => setFormData({ ...formData, titleAlignment: 'center' })}
                                className={`flex-1 px-4 py-3 border rounded-lg font-medium text-sm transition-colors ${
                                    formData.titleAlignment === 'center'
                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                        : 'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                            >
                                Centro
                            </button>
                            <button
                                onClick={() => setFormData({ ...formData, titleAlignment: 'right' })}
                                className={`flex-1 px-4 py-3 border rounded-lg font-medium text-sm transition-colors ${
                                    formData.titleAlignment === 'right'
                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                        : 'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                            >
                                Direita
                            </button>
                        </div>
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
