"use client";

import { useState } from "react";
import { Save, Plus, Trash2, Clock, Calendar } from "lucide-react";
import { toast } from "sonner";

export function ScheduleConfig({ settings, updateSettings }: { settings: any, updateSettings: (key: string, value: any) => void }) {
    const schedule = settings?.schedule || {};
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        is_active: schedule.is_active !== false,
        allow_same_day: schedule.allow_same_day !== false,
        limit_days: schedule.limit_days || false,
        register_as_lead: schedule.register_as_lead !== false,
        distribution: schedule.distribution || "default", // default | responsible
        hours: schedule.hours || []
    });

    const [newHour, setNewHour] = useState({ day: "Segunda a Sexta", start: "09:00", end: "18:00" });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addHour = () => {
        setFormData(prev => ({
            ...prev,
            hours: [...prev.hours, { ...newHour, id: crypto.randomUUID() }]
        }));
    };

    const removeHour = (id: string) => {
        setFormData(prev => ({
            ...prev,
            hours: prev.hours.filter((h: any) => h.id !== id)
        }));
    };

    const handleSave = () => {
        setLoading(true);
        updateSettings("schedule", formData);
        setTimeout(() => setLoading(false), 500);
        toast.success("Configurações de agendamento salvas!");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Agendar Visitas</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Defina como irá funcionar o botão de agendamento de visitas no seu site.
                    </p>
                </div>
                {/* Global Toggle */}
                <div className="flex items-center gap-3">
                   {formData.is_active ? (
                        <button 
                            onClick={() => handleInputChange("is_active", false)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm"
                        >
                            Desativar agendamento
                        </button>
                   ) : (
                        <button 
                            onClick={() => handleInputChange("is_active", true)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm"
                        >
                            Ativar agendamento
                        </button>
                   )}
                </div>
            </div>

            <div className={`space-y-4 ${!formData.is_active && 'opacity-50 pointer-events-none'}`}>
                
                {/* Permissões */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm space-y-6">
                    
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                        <div>
                            <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Permitir agendamento para o mesmo dia?</h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Desativado, só permite agendamento para o dia seguinte em diante</p>
                        </div>
                        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                            <button onClick={() => handleInputChange("allow_same_day", true)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.allow_same_day ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                            <button onClick={() => handleInputChange("allow_same_day", false)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${!formData.allow_same_day ? "bg-red-500 text-white" : "text-slate-500"}`}>Não</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                        <div>
                            <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Definir limite de dias à frente para agendamento?</h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Desativado, aceita qualquer data no futuro.</p>
                        </div>
                        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                            <button onClick={() => handleInputChange("limit_days", true)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.limit_days ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                            <button onClick={() => handleInputChange("limit_days", false)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${!formData.limit_days ? "bg-red-500 text-white" : "text-slate-500"}`}>Não</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                        <div>
                            <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Cadastrar pessoa do agendamento como um lead?</h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Desativando gera apenas o contato</p>
                        </div>
                        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                            <button onClick={() => handleInputChange("register_as_lead", true)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.register_as_lead ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                            <button onClick={() => handleInputChange("register_as_lead", false)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${!formData.register_as_lead ? "bg-red-500 text-white" : "text-slate-500"}`}>Não</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Enviar agendamento para o responsável do imóvel ou seguir fluxo padrão?</h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Defina quem irá ser responsável pelo atendimento</p>
                        </div>
                        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                            <button onClick={() => handleInputChange("distribution", "default")} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.distribution === "default" ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Fluxo padrão</button>
                            <button onClick={() => handleInputChange("distribution", "responsible")} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.distribution === "responsible" ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Responsável</button>
                        </div>
                    </div>
                </div>

                {/* Horários */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 text-sm">Horários permitidos</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Defina os horários disponíveis para visitas</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Dias</label>
                            <select 
                                value={newHour.day}
                                onChange={(e) => setNewHour({...newHour, day: e.target.value})}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                            >
                                <option value="Segunda a Sexta">Segunda a Sexta</option>
                                <option value="Sábado">Sábado</option>
                                <option value="Domingo">Domingo</option>
                                <option value="Todos os dias">Todos os dias</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">De</label>
                            <input 
                                type="time" 
                                value={newHour.start}
                                onChange={(e) => setNewHour({...newHour, start: e.target.value})}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Até</label>
                            <input 
                                type="time" 
                                value={newHour.end}
                                onChange={(e) => setNewHour({...newHour, end: e.target.value})}
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    <button 
                        onClick={addHour}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors mb-6"
                    >
                        Adicionar horas
                    </button>

                    <div className="space-y-2">
                        {formData.hours.map((hour: any) => (
                            <div key={hour.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-4">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{hour.day}</span>
                                    <div className="h-4 w-px bg-slate-300 dark:bg-slate-600"></div>
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm text-slate-600 dark:text-slate-400">{hour.start} - {hour.end}</span>
                                </div>
                                <button onClick={() => removeHour(hour.id)} className="text-red-500 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
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
