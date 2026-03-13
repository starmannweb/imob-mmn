"use client";

import { useState } from "react";
import { X, User, Building2, DollarSign, FileText } from "lucide-react";

interface AddDealModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddDealModal({ isOpen, onClose }: AddDealModalProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        position: "",
        interest_level: 1,
        client_name: "",
        client_phone: "",
        client_email: "",
        property_address: "",
        property_id: "",
    });

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        console.log("Adicionando negócio:", formData);
        // Implementar lógica de salvar no Supabase
        onClose();
        setStep(1);
        setFormData({
            position: "",
            interest_level: 1,
            client_name: "",
            client_phone: "",
            client_email: "",
            property_address: "",
            property_id: "",
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Adicionar negócio</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Para adicionar um negócio manualmente ao CRM, preencha os campos:
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 p-6 border-b border-slate-200 dark:border-slate-700">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                step === num 
                                    ? "bg-blue-600 text-white scale-110" 
                                    : step > num
                                    ? "bg-emerald-500 text-white"
                                    : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                            }`}>
                                {step > num ? "✓" : num}
                            </div>
                            {num < 5 && (
                                <div className={`w-12 h-1 mx-1 rounded-full transition-all ${
                                    step > num ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"
                                }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1">
                    {/* Step 1: Posição */}
                    {step === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white">Posição</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Selecione a posição do negócio no funil</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Selecione a posição *</label>
                                <select
                                    name="position"
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                >
                                    <option value="">Escolha uma opção</option>
                                    <option value="contact">Contato</option>
                                    <option value="service">Atendimento</option>
                                    <option value="visit">Visita</option>
                                    <option value="proposal">Proposta</option>
                                    <option value="documentation">Documentação</option>
                                    <option value="signature">Assinatura</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Nível de Interesse */}
                    {step === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                                    <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white">Nível de interesse</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Avalie o interesse do cliente</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Selecione o nível</label>
                                <div className="flex gap-3">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <button
                                            key={level}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, interest_level: level }))}
                                            className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all ${
                                                formData.interest_level === level
                                                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 scale-105"
                                                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                            }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500 text-center">1 = Baixo interesse | 5 = Alto interesse</p>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Cliente */}
                    {step === 3 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                                    <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white">Cliente</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Dados do cliente interessado</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nome do cliente *</label>
                                    <input
                                        type="text"
                                        name="client_name"
                                        value={formData.client_name}
                                        onChange={handleInputChange}
                                        placeholder="Digite o nome completo"
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Telefone</label>
                                    <input
                                        type="tel"
                                        name="client_phone"
                                        value={formData.client_phone}
                                        onChange={handleInputChange}
                                        placeholder="(00) 00000-0000"
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">E-mail</label>
                                    <input
                                        type="email"
                                        name="client_email"
                                        value={formData.client_email}
                                        onChange={handleInputChange}
                                        placeholder="email@exemplo.com"
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Encontro e Imóvel */}
                    {step === 4 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                                    <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white">Encontro e imóvel</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Vincule o imóvel de interesse</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Procure por endereço ou nome do condomínio</label>
                                    <input
                                        type="text"
                                        name="property_address"
                                        value={formData.property_address}
                                        onChange={handleInputChange}
                                        placeholder="Digite para buscar..."
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                
                                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                                        Nenhum imóvel selecionado ainda
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Confirmação */}
                    {step === 5 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                                    <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white">Resumo</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Revise as informações antes de salvar</p>
                                </div>
                            </div>
                            
                            <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                                <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Posição:</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{formData.position || "Não definido"}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Nível de interesse:</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{formData.interest_level}/5</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Cliente:</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{formData.client_name || "Não informado"}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Telefone:</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{formData.client_phone || "Não informado"}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">E-mail:</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{formData.client_email || "Não informado"}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-slate-200 dark:border-slate-700">
                    <button
                        onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                        className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        {step === 1 ? "Cancelar" : "Voltar"}
                    </button>
                    
                    {step < 5 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            disabled={step === 1 && !formData.position}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg transition-colors"
                        >
                            Próximo
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                        >
                            Adicionar Negócio
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
