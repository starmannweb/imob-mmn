"use client";

import { useState } from "react";
import { Save, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function MaintenanceConfig({ settings, updateSettings }: { settings: any, updateSettings: (key: string, value: any) => void }) {
    const maintenance = settings?.maintenance || {};
    const [loading, setLoading] = useState(false);

    const [isMaintenanceMode, setIsMaintenanceMode] = useState(maintenance.is_active || false);

    const handleSave = () => {
        setLoading(true);
        updateSettings("maintenance", { is_active: isMaintenanceMode });
        setTimeout(() => setLoading(false), 500);
        toast.success("Configuração de manutenção salva!");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Configurações Gerais</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Configure seu site da maneira que desejar para atender as necessidades do seu cliente.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm space-y-6">
                
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-4">Geral</h4>

                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                    <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Site em manutenção</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Substitui provisoriamente o seu site por uma página indicando que o mesmo está em manutenção.</p>
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                        <button onClick={() => setIsMaintenanceMode(true)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${isMaintenanceMode ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                        <button onClick={() => setIsMaintenanceMode(false)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${!isMaintenanceMode ? "bg-red-500 text-white" : "text-slate-500"}`}>Não</button>
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
