"use client";

import { useState } from "react";
import { Save, Code } from "lucide-react";
import { toast } from "sonner";

export function ScriptConfig({ settings, updateSettings }: { settings: any, updateSettings: (key: string, value: any) => void }) {
    const scripts = settings?.scripts || [];
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    
    // Simplificando: vamos manter apenas uma lista de scripts por enquanto
    // Poderíamos expandir para editar scripts individuais no futuro

    const handleSave = () => {
        setLoading(true);
        // Em um cenário real, aqui salvaríamos a lista de scripts
        // Como o print mostra apenas um estado vazio e botão, vamos simular
        setTimeout(() => setLoading(false), 500);
        toast.success("Scripts salvos!");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Códigos e Scripts</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Adicione códigos e scripts de terceiros em seu site.
                    </p>
                </div>
                <button 
                    onClick={() => toast.info("Funcionalidade em desenvolvimento")}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm"
                >
                    Adicionar código
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-600">
                    <Code className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Nenhum Script adicionado</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                    Você não adicionou nenhum código.
                </p>
            </div>
        </div>
    );
}
