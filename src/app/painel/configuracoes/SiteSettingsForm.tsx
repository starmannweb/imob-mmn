"use client";

import { useState } from "react";
import { updateSiteSettings } from "./actions";
import { Palette, Globe, Phone, Facebook, Instagram, Linkedin, Save, AlertCircle, CheckCircle2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteSettingsForm({ initialData }: { initialData: any }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const settings = initialData?.site_settings || {};
    const socials = settings?.socials || {};

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        const formData = new FormData(e.currentTarget);
        const result = await updateSiteSettings(formData);
        setLoading(false);

        if (result.error) {
            setMessage({ type: 'error', text: result.error });
        } else {
            setMessage({ type: 'success', text: "Configurações do site atualizadas com sucesso!" });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in duration-300 ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                }`}>
                    {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <p className="text-sm font-bold">{message.text}</p>
                </div>
            )}

            {/* Identidade Visual */}
            <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Identidade Visual
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Cor Primária do Site</label>
                        <div className="flex items-center gap-3">
                            <input 
                                type="color" 
                                name="primary_color" 
                                defaultValue={settings.primary_color || "#000000"}
                                className="w-12 h-12 rounded-lg border-2 border-slate-200 dark:border-slate-700 cursor-pointer" 
                            />
                            <span className="text-xs font-mono text-slate-500">{settings.primary_color || "#000000"}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">URL da Logo (PNG/SVG)</label>
                        <input 
                            type="text" 
                            name="logo_url" 
                            defaultValue={settings.logo_url}
                            placeholder="https://suaimobiliaria.com/logo.png" 
                            className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" 
                        />
                    </div>
                </div>
            </div>

            {/* Informações Profissionais */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Award className="w-4 h-4" /> Profissional
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">CRECI (Número)</label>
                        <input 
                            type="text" 
                            name="creci" 
                            defaultValue={initialData?.creci}
                            placeholder="Ex: 12345-J" 
                            className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" 
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Telefone / WhatsApp</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="text" 
                                name="phone" 
                                defaultValue={settings.phone || initialData?.phone}
                                placeholder="Ex: 5511999999999" 
                                className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:border-blue-500 w-full transition-colors" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Redes Sociais */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Presença Digital
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Instagram</label>
                        <div className="relative">
                            <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="text" 
                                name="instagram" 
                                defaultValue={socials.instagram}
                                placeholder="@seuinstagram" 
                                className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-xs outline-none focus:border-blue-500 w-full transition-colors" 
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Facebook</label>
                        <div className="relative">
                            <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="text" 
                                name="facebook" 
                                defaultValue={socials.facebook}
                                placeholder="facebook.com/voce" 
                                className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-xs outline-none focus:border-blue-500 w-full transition-colors" 
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">LinkedIn</label>
                        <div className="relative">
                            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="text" 
                                name="linkedin" 
                                defaultValue={socials.linkedin}
                                placeholder="linkedin.com/in/voce" 
                                className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-xs outline-none focus:border-blue-500 w-full transition-colors" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-6 rounded-xl shadow-xl transition-all active:scale-95 gap-2 mt-4"
            >
                {loading ? <Save className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Salvar Configurações do Site
            </Button>
        </form>
    );
}
