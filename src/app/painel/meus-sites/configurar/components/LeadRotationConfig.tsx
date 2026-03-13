"use client";

import { useState } from "react";
import { Save, RefreshCw, UserCheck, Users, Search } from "lucide-react";
import { toast } from "sonner";

export function LeadRotationConfig({ settings, updateSettings }: { settings: any, updateSettings: (key: string, value: any) => void }) {
    const lead_rotation = settings?.lead_rotation || {};
    const [loading, setLoading] = useState(false);

    // Initial state matching the complex forwarding structure
    const [formData, setFormData] = useState({
        sales: lead_rotation.sales || {
            type: "responsible", // responsible | specific | all | selected
            specific_broker_id: "",
            selected_brokers: []
        },
        rentals: lead_rotation.rentals || {
            type: "responsible",
            specific_broker_id: "",
            selected_brokers: []
        },
        timeout_days: lead_rotation.timeout_days || 30,
        timeout_action: lead_rotation.timeout_action || "none", // none | specific
        timeout_broker_id: lead_rotation.timeout_broker_id || ""
    });

    // Mock brokers list (In real app, fetch from team/users)
    const brokers = [
        { id: "1", name: "Ricieri Moraes" },
        { id: "2", name: "João Silva" },
        { id: "3", name: "Maria Oliveira" },
    ];

    const handleInputChange = (category: "sales" | "rentals", field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [category]: { ...prev[category], [field]: value }
        }));
    };

    const handleGlobalChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setLoading(true);
        updateSettings("lead_rotation", formData);
        setTimeout(() => setLoading(false), 500);
        toast.success("Regras de rodízio atualizadas!");
    };

    const renderOptions = (category: "sales" | "rentals", label: string) => (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm mb-6">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">
                {label}
            </h4>
            
            <div className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">
                    Novos clientes que fizerem contato através do site devem ser encaminhados para:
                </p>

                {/* Option 1: Responsible */}
                <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer transition-colors">
                    <input 
                        type="radio" 
                        name={`${category}_type`}
                        value="responsible" 
                        checked={formData[category].type === "responsible"}
                        onChange={() => handleInputChange(category, "type", "responsible")}
                        className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300 text-sm block">Para o corretor responsável pelo imóvel contactado</span>
                    </div>
                </label>

                {/* Option 2: Specific Broker */}
                <div className={`p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors ${formData[category].type === "specific" ? "bg-slate-50 dark:bg-slate-900/30 border-blue-200 dark:border-blue-800" : ""}`}>
                    <label className="flex items-center gap-3 cursor-pointer mb-2">
                        <input 
                            type="radio" 
                            name={`${category}_type`}
                            value="specific" 
                            checked={formData[category].type === "specific"}
                            onChange={() => handleInputChange(category, "type", "specific")}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">Um corretor específico</span>
                    </label>
                    
                    {formData[category].type === "specific" && (
                        <div className="ml-7 mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                            <select 
                                value={formData[category].specific_broker_id}
                                onChange={(e) => handleInputChange(category, "specific_broker_id", e.target.value)}
                                className="w-full md:w-1/2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                            >
                                <option value="">Selecione um corretor...</option>
                                {brokers.map(broker => (
                                    <option key={broker.id} value={broker.id}>{broker.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Option 3: Round Robin All */}
                <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer transition-colors">
                    <input 
                        type="radio" 
                        name={`${category}_type`}
                        value="all" 
                        checked={formData[category].type === "all"}
                        onChange={() => handleInputChange(category, "type", "all")}
                        className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300 text-sm block">Executar rodízio entre TODOS os corretores</span>
                    </div>
                </label>

                {/* Option 4: Round Robin Selected */}
                <div className={`p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors ${formData[category].type === "selected" ? "bg-slate-50 dark:bg-slate-900/30 border-blue-200 dark:border-blue-800" : ""}`}>
                    <label className="flex items-center gap-3 cursor-pointer mb-2">
                        <input 
                            type="radio" 
                            name={`${category}_type`}
                            value="selected" 
                            checked={formData[category].type === "selected"}
                            onChange={() => handleInputChange(category, "type", "selected")}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">Executar rodízio entre corretores SELECIONADOS</span>
                    </label>

                    {formData[category].type === "selected" && (
                        <div className="ml-7 mt-2 p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
                            <p className="text-xs text-slate-500 mb-2">Selecione os corretores participantes:</p>
                            <div className="max-h-40 overflow-y-auto space-y-2">
                                {brokers.map(broker => (
                                    <label key={broker.id} className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="checkbox"
                                            checked={formData[category].selected_brokers?.includes(broker.id)}
                                            onChange={(e) => {
                                                const current = formData[category].selected_brokers || [];
                                                const updated = e.target.checked 
                                                    ? [...current, broker.id]
                                                    : current.filter((id: string) => id !== broker.id);
                                                handleInputChange(category, "selected_brokers", updated);
                                            }}
                                            className="rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="text-sm text-slate-700 dark:text-slate-300">{broker.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Rodízio de leads (Meus Imóveis)</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Defina como distribuir os contatos recebidos.
                </p>
            </div>

            {renderOptions("sales", "Imóveis com transação de VENDA")}
            {renderOptions("rentals", "Imóveis com transação de LOCAÇÃO")}

            {/* Configurações Gerais de Exclusividade */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">
                    Configurações
                </h4>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                            O corretor responsável pelo cliente deve ser desassociado após um período sem interação?
                        </label>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Se atingir o prazo, o corretor será automaticamente desassociado do cliente.
                        </p>
                        
                        <div className="flex items-center gap-4 mt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="timeout_config"
                                    checked={!formData.timeout_days}
                                    onChange={() => handleGlobalChange("timeout_days", 0)}
                                    className="text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Não</span>
                            </label>
                            
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="timeout_config"
                                    checked={!!formData.timeout_days}
                                    onChange={() => handleGlobalChange("timeout_days", 30)}
                                    className="text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Sim, após:</span>
                            </label>

                            {!!formData.timeout_days && (
                                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
                                    <input 
                                        type="number" 
                                        value={formData.timeout_days}
                                        onChange={(e) => handleGlobalChange("timeout_days", parseInt(e.target.value))}
                                        className="w-20 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 text-sm outline-none focus:border-blue-500"
                                        min="1"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">dias</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {!!formData.timeout_days && (
                        <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                Ao desassociar o corretor responsável, o cliente deve ser encaminhado para:
                            </label>
                            
                            <div className="space-y-2 mt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="timeout_action"
                                        value="none"
                                        checked={formData.timeout_action === "none"}
                                        onChange={() => handleGlobalChange("timeout_action", "none")}
                                        className="text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Não encaminhar para ninguém</span>
                                </label>
                                
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="timeout_action"
                                        value="specific"
                                        checked={formData.timeout_action === "specific"}
                                        onChange={() => handleGlobalChange("timeout_action", "specific")}
                                        className="text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Para um corretor específico</span>
                                </label>

                                {formData.timeout_action === "specific" && (
                                    <div className="ml-6 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                        <select 
                                            value={formData.timeout_broker_id}
                                            onChange={(e) => handleGlobalChange("timeout_broker_id", e.target.value)}
                                            className="w-full md:w-1/2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                        >
                                            <option value="">Selecione um corretor...</option>
                                            {brokers.map(broker => (
                                                <option key={broker.id} value={broker.id}>{broker.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Redirecionamento de contatos */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm flex items-center justify-between">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Redirecionamento de contatos</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Todos os contatos de origem serão encaminhados ao destinatário selecionado.</p>
                </div>
                <button 
                    onClick={() => toast.info("Funcionalidade em desenvolvimento")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm"
                >
                    Adicionar
                </button>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-8 text-center border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Nenhum redirecionamento ativo no momento.</p>
                <button 
                    onClick={() => toast.info("Funcionalidade em desenvolvimento")}
                    className="mt-3 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm inline-block"
                >
                    Adicionar um redirecionamento
                </button>
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
