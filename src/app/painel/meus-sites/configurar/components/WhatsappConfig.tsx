"use client";

import { useState } from "react";
import { MessageSquare, Save, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export function WhatsappConfig({ settings, updateSettings }: { settings: any, updateSettings: (key: string, value: any) => void }) {
    const whatsapp = settings?.whatsapp || {};
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        is_active: whatsapp.is_active !== false,
        floating_icon: whatsapp.floating_icon || "style1",
        notify_icon: whatsapp.notify_icon || false,
        message: whatsapp.message || "Olá! Estamos disponíveis para te ajudar.",
        users: whatsapp.users || [],
        show_on_property_detail: whatsapp.show_on_property_detail !== false,
        force_form_on_click: whatsapp.force_form_on_click || false,
    });

    const [showUserModal, setShowUserModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", phone: "", role: "Corretor" });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addUser = () => {
        if (!newUser.name || !newUser.phone) return;
        setFormData(prev => ({
            ...prev,
            users: [...prev.users, { ...newUser, id: crypto.randomUUID() }]
        }));
        setNewUser({ name: "", phone: "", role: "Corretor" });
        setShowUserModal(false);
    };

    const removeUser = (id: string) => {
        setFormData(prev => ({
            ...prev,
            users: prev.users.filter((u: any) => u.id !== id)
        }));
    };

    const handleSave = () => {
        setLoading(true);
        updateSettings("whatsapp", formData);
        setTimeout(() => setLoading(false), 500);
        toast.success("Configurações do WhatsApp salvas!");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">WhatsApp</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Defina como vai funcionar o chat do seu site.
                    </p>
                </div>
                {/* Global Toggle */}
                <div className="flex items-center gap-3">
                   {formData.is_active ? (
                        <button 
                            onClick={() => handleInputChange("is_active", false)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm"
                        >
                            Desativar plugin
                        </button>
                   ) : (
                        <button 
                            onClick={() => handleInputChange("is_active", true)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm"
                        >
                            Ativar plugin
                        </button>
                   )}
                </div>
            </div>

            {/* Main Config */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${!formData.is_active && 'opacity-50 pointer-events-none'}`}>
                
                {/* Left Column */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 text-sm">Ícone flutuante</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Selecione o modelo padrão de botão</p>
                        
                        <div className="flex gap-4 mb-6">
                            {["style1", "style2", "style3", "style4"].map((style, idx) => (
                                <button 
                                    key={style}
                                    onClick={() => handleInputChange("floating_icon", style)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${formData.floating_icon === style ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-slate-200 dark:border-slate-700 text-slate-400 hover:border-slate-300"}`}
                                >
                                    <MessageSquare className="w-5 h-5" />
                                </button>
                            ))}
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={formData.notify_icon}
                                onChange={(e) => handleInputChange("notify_icon", e.target.checked)}
                                className="rounded text-emerald-500 focus:ring-emerald-500 border-gray-300"
                            />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Ativar ícone de notificação</span>
                        </label>
                    </div>

                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">Frase principal</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Adicione uma frase que será utilizada como frase principal no chat.</p>
                        
                        <textarea 
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm outline-none focus:border-emerald-500 min-h-[100px] resize-none transition-colors"
                        />
                    </div>
                </div>

                {/* Right Column (Preview) */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex items-center justify-center relative min-h-[300px]">
                    <div className="absolute top-4 left-6">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Prévia</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Veja como a frase ficará no seu site</p>
                    </div>

                    <div className="absolute bottom-8 right-8 flex flex-col items-end gap-2">
                        {/* Message Bubble */}
                        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl rounded-br-none p-3 max-w-[200px] border border-slate-100 dark:border-slate-700 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <button className="absolute -top-2 -right-2 bg-slate-200 dark:bg-slate-700 rounded-full p-0.5 text-slate-500 hover:text-slate-800">
                                <X className="w-3 h-3" />
                            </button>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                {formData.message}
                            </p>
                        </div>

                        {/* Button */}
                        <div className={`w-14 h-14 bg-emerald-500 rounded-full shadow-xl flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform relative`}>
                            <MessageSquare className="w-7 h-7" />
                            {formData.notify_icon && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Users List */}
            <div className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm ${!formData.is_active && 'opacity-50 pointer-events-none'}`}>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Usuários do Chat</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Adicione os usuários que estarão disponíveis no seu Chat</p>
                    </div>
                    <button 
                        onClick={() => setShowUserModal(true)}
                        className="bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                    >
                        Adicionar usuário
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-900/50">
                            <tr>
                                <th className="px-4 py-3 rounded-l-lg">Nome</th>
                                <th className="px-4 py-3">Celular</th>
                                <th className="px-4 py-3">Descrição</th>
                                <th className="px-4 py-3 rounded-r-lg text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-slate-400 text-xs">
                                        Nenhum usuário adicionado.
                                    </td>
                                </tr>
                            ) : (
                                formData.users.map((user: any) => (
                                    <tr key={user.id} className="border-b border-slate-100 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold text-xs">
                                                {user.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            {user.name}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{user.phone}</td>
                                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{user.role}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-md text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Configurar Horários</button>
                                                <button onClick={() => removeUser(user.id)} className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Behavior Settings */}
            <div className={`space-y-4 ${!formData.is_active && 'opacity-50 pointer-events-none'}`}>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">Mostrar o ícone flutuante do WhatsApp na página de detalhes do imóvel?</h5>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Manter essa opção desativada induz o cliente utilizar o botão de WhatsApp no formulário de contato (recomendado).</p>
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                        <button onClick={() => handleInputChange("show_on_property_detail", true)} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${formData.show_on_property_detail ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                        <button onClick={() => handleInputChange("show_on_property_detail", false)} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${!formData.show_on_property_detail ? "bg-slate-500 text-white" : "text-slate-500"}`}>Não</button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">Ao clicar no ícone flutuante do WhatsApp na página de detalhes do imóvel, forçar uso do formulário? (Recomendado)</h5>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Recomendamos que sim, para que ocorra o registro do cliente, imóvel enviado e perfil de busca.</p>
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                        <button onClick={() => handleInputChange("force_form_on_click", true)} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${formData.force_form_on_click ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                        <button onClick={() => handleInputChange("force_form_on_click", false)} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${!formData.force_form_on_click ? "bg-slate-500 text-white" : "text-slate-500"}`}>Não</button>
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

            {/* Modal Add User */}
            {showUserModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-sm p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Adicionar Usuário</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nome</label>
                                <input 
                                    type="text" 
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Celular (WhatsApp)</label>
                                <input 
                                    type="text" 
                                    value={newUser.phone}
                                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Função</label>
                                <input 
                                    type="text" 
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button onClick={() => setShowUserModal(false)} className="px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg">Cancelar</button>
                                <button onClick={addUser} className="px-3 py-2 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg">Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
