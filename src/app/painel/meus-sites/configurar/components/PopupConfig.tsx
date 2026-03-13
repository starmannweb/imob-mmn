"use client";

import { useState } from "react";
import { Save, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export function PopupConfig({ settings, updateSettings }: { settings: any, updateSettings: (key: string, value: any) => void }) {
    const popup = settings?.popup || {};
    const [loading, setLoading] = useState(false);

    const [isActive, setIsActive] = useState(popup.is_active || false);

    const handleSave = () => {
        setLoading(true);
        updateSettings("popup", { is_active: isActive });
        setTimeout(() => setLoading(false), 500);
        toast.success("Configurações de Popup salvas!");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Pop-ups</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Ative e configure pop-ups para exibir mensagens importantes, promoções ou chamadas para ação no momento certo.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                
                <div className="flex-1 space-y-4">
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        Com apenas alguns cliques, você pode criar pop-ups eficientes que capturam a atenção e geram resultados.
                    </p>
                    
                    {isActive ? (
                         <button 
                            onClick={() => setIsActive(false)}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
                        >
                            Desativar janela pop-up
                        </button>
                    ) : (
                        <button 
                            onClick={() => setIsActive(true)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors"
                        >
                            Ativar janela pop-up
                        </button>
                    )}
                </div>

                <div className="flex-1 flex justify-center">
                    {/* Placeholder illustration based on print */}
                    <div className="w-48 h-32 bg-slate-100 dark:bg-slate-900 rounded-lg relative flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        <div className="w-32 h-20 bg-white dark:bg-slate-800 rounded shadow-md absolute -right-4 -bottom-4 p-2 space-y-2 border border-slate-100 dark:border-slate-600">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <div className="h-1.5 bg-slate-200 dark:bg-slate-600 w-16 rounded"></div>
                            </div>
                            <div className="h-1.5 bg-slate-100 dark:bg-slate-700 w-full rounded"></div>
                            <div className="h-1.5 bg-slate-100 dark:bg-slate-700 w-2/3 rounded"></div>
                            <div className="flex justify-end pt-1">
                                <div className="h-2 w-8 bg-blue-500 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
