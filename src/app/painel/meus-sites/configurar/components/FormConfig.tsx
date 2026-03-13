"use client";

import { useState } from "react";
import { Save, Lock, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export function FormConfig({ settings, updateSettings }: { settings: any, updateSettings: (key: string, value: any) => void }) {
    const form = settings?.form || {};
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        show_broker_data: form.show_broker_data !== false,
        broker_data: form.broker_data || {
            photo: true,
            name: true,
            phone: true,
            email: true
        },
        required_fields: form.required_fields || "both", // phone | email | both
        cta_button: form.cta_button || "both", // whatsapp | email | both
        default_message: form.default_message || "Olá, estou interessado nesse imóvel que encontrei no site. Aguardo seu retorno."
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleBrokerDataChange = (field: string, value: boolean) => {
        setFormData(prev => ({
            ...prev,
            broker_data: { ...prev.broker_data, [field]: value }
        }));
    };

    const handleSave = () => {
        setLoading(true);
        updateSettings("form", formData);
        setTimeout(() => setLoading(false), 500);
        toast.success("Configurações do formulário salvas!");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Formulário de contato</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Defina como será o formulário de contato presente na página de detalhes do imóvel.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm space-y-6">
                
                {/* Mostrar dados do corretor */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                    <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Mostrar dados do corretor no formulário de contato?</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Escolha se deverá ser mostrado dados do corretor responsável em cima do formulário.</p>
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                        <button onClick={() => handleInputChange("show_broker_data", true)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.show_broker_data ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                        <button onClick={() => handleInputChange("show_broker_data", false)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${!formData.show_broker_data ? "bg-red-500 text-white" : "text-slate-500"}`}>Não</button>
                    </div>
                </div>

                {/* Dados do corretor no site */}
                <div className={`space-y-4 transition-opacity ${!formData.show_broker_data && 'opacity-50 pointer-events-none'}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                        <div>
                            <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Dados do corretor no site</h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Selecione quais dados do corretor devem aparecer no site.</p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Foto?</span>
                                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                                    <button onClick={() => handleBrokerDataChange("photo", true)} className={`px-2 py-0.5 rounded text-[10px] font-bold ${formData.broker_data.photo ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                                    <button onClick={() => handleBrokerDataChange("photo", false)} className={`px-2 py-0.5 rounded text-[10px] font-bold ${!formData.broker_data.photo ? "bg-slate-300 text-slate-600" : "text-slate-500"}`}>Não</button>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Nome?</span>
                                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                                    <button onClick={() => handleBrokerDataChange("name", true)} className={`px-2 py-0.5 rounded text-[10px] font-bold ${formData.broker_data.name ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                                    <button onClick={() => handleBrokerDataChange("name", false)} className={`px-2 py-0.5 rounded text-[10px] font-bold ${!formData.broker_data.name ? "bg-slate-300 text-slate-600" : "text-slate-500"}`}>Não</button>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Telefone?</span>
                                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                                    <button onClick={() => handleBrokerDataChange("phone", true)} className={`px-2 py-0.5 rounded text-[10px] font-bold ${formData.broker_data.phone ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                                    <button onClick={() => handleBrokerDataChange("phone", false)} className={`px-2 py-0.5 rounded text-[10px] font-bold ${!formData.broker_data.phone ? "bg-slate-300 text-slate-600" : "text-slate-500"}`}>Não</button>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">E-mail?</span>
                                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                                    <button onClick={() => handleBrokerDataChange("email", true)} className={`px-2 py-0.5 rounded text-[10px] font-bold ${formData.broker_data.email ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                                    <button onClick={() => handleBrokerDataChange("email", false)} className={`px-2 py-0.5 rounded text-[10px] font-bold ${!formData.broker_data.email ? "bg-slate-300 text-slate-600" : "text-slate-500"}`}>Não</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preenchimento obrigatório */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                    <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Preenchimento obrigatório</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Quais dados seu cliente precisa preencher obrigatoriamente.</p>
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                        <button onClick={() => handleInputChange("required_fields", "phone")} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.required_fields === "phone" ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Telefone</button>
                        <button onClick={() => handleInputChange("required_fields", "email")} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.required_fields === "email" ? "bg-emerald-500 text-white" : "text-slate-500"}`}>E-mail</button>
                        <button onClick={() => handleInputChange("required_fields", "both")} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.required_fields === "both" ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Telefone e E-mail</button>
                    </div>
                </div>

                {/* Botão de contato do formulário */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                    <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Botão de contato do formulário</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Escolha qual botão deve estar em destaque no final do formulário.</p>
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                        <button onClick={() => handleInputChange("cta_button", "whatsapp")} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.cta_button === "whatsapp" ? "bg-emerald-500 text-white" : "text-slate-500"}`}>WhatsApp</button>
                        <button onClick={() => handleInputChange("cta_button", "email")} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.cta_button === "email" ? "bg-emerald-500 text-white" : "text-slate-500"}`}>E-mail</button>
                        <button onClick={() => handleInputChange("cta_button", "both")} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.cta_button === "both" ? "bg-emerald-500 text-white" : "text-slate-500"}`}>WhatsApp e E-mail</button>
                    </div>
                </div>

                {/* Texto Padrão */}
                <div className="space-y-2">
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Texto Padrão</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Informe o texto que será apresentado como padrão no formulário de contato.</p>
                    <textarea 
                        value={formData.default_message}
                        onChange={(e) => handleInputChange("default_message", e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-sm leading-relaxed outline-none focus:border-emerald-500 min-h-[100px] resize-none"
                    />
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
