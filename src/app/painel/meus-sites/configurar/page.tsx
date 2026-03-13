"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
    Globe, Users, Phone, Calendar, Image, Lock, Shield, Search, 
    MessageSquare, RefreshCw, Code, AlertTriangle, ChevronRight, 
    Plus, Trash2, CheckCircle, XCircle, AlertCircle, Save
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ContactConfig } from "./components/ContactConfig";
import { WhatsappConfig } from "./components/WhatsappConfig";
import { ScheduleConfig } from "./components/ScheduleConfig";
import { PhotoRestrictionConfig } from "./components/PhotoRestrictionConfig";
import { LgpdConfig } from "./components/LgpdConfig";
import { SeoConfig } from "./components/SeoConfig";
import { FormConfig } from "./components/FormConfig";
import { ScriptConfig } from "./components/ScriptConfig";
import { MaintenanceConfig } from "./components/MaintenanceConfig";
import { PopupConfig } from "./components/PopupConfig";
import { LeadRotationConfig } from "./components/LeadRotationConfig";

// Componentes de Configuração
const DomainConfig = ({ settings, updateSettings }: { settings: any, updateSettings: (key: string, value: any) => void }) => {
    const [domainInput, setDomainInput] = useState("");
    const [domains, setDomains] = useState<any[]>(settings?.domains || []);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddDomain = () => {
        if (!domainInput) return;
        
        // Simulação de verificação
        const newDomain = {
            id: crypto.randomUUID(),
            url: domainInput,
            status: "pending", // pending, verified, failed
            created_at: new Date().toISOString()
        };

        const newDomains = [...domains, newDomain];
        setDomains(newDomains);
        updateSettings("domains", newDomains);
        setDomainInput("");
        setShowAddModal(false);
        toast.success("Domínio adicionado com sucesso!");
    };

    const removeDomain = (id: string) => {
        const newDomains = domains.filter(d => d.id !== id);
        setDomains(newDomains);
        updateSettings("domains", newDomains);
        toast.success("Domínio removido.");
    };

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-lg">
                        <Globe className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Configuração de Domínio</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                            Conecte seu domínio personalizado (ex: www.suaimobiliaria.com.br) para fortalecer sua marca.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-slate-700 dark:text-slate-200">Seus Domínios</h4>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Adicionar Domínio
                    </button>
                </div>

                {domains.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                        <Globe className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Nenhum domínio configurado</p>
                        <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Clique em adicionar para começar</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {domains.map((domain) => (
                            <div key={domain.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-slate-400" />
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-slate-200">{domain.url}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {domain.status === 'verified' && (
                                                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" /> Verificado
                                                </span>
                                            )}
                                            {domain.status === 'pending' && (
                                                <span className="text-xs font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" /> Pendente DNS
                                                </span>
                                            )}
                                            {domain.status === 'failed' && (
                                                <span className="text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                    <XCircle className="w-3 h-3" /> Falha
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => window.open(`http://${domain.url}`, '_blank')}
                                        className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="Testar"
                                    >
                                        <ExternalLinkIcon className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => removeDomain(domain.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 transition-colors" title="Remover"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Adicionar Domínio */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-md p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Adicionar Novo Domínio</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Domínio (sem http://)</label>
                                <input 
                                    type="text" 
                                    placeholder="ex: minhaiomobiliaria.com.br"
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={domainInput}
                                    onChange={(e) => setDomainInput(e.target.value)}
                                />
                                <p className="text-xs text-slate-500 mt-1">Não inclua www ou https://</p>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button 
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleAddDomain}
                                    className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                >
                                    Adicionar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};



// Ícone auxiliar
const ExternalLinkIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

export default function AdvancedConfigPage() {
    const [activeTab, setActiveTab] = useState("contact");
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);
    const [settings, setSettings] = useState<any>({});
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchSettings = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }
            setUserId(user.id);

            const { data: profileData, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", user.id)
                .single();

            if (profileData) {
                setProfile(profileData);
                setSettings(profileData.site_settings || {});
            }
            setLoading(false);
        };

        fetchSettings();
    }, []);

    const updateSettings = async (key: string, value: any) => {
        if (!userId) return;

        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);

        const { error } = await supabase
            .from("users")
            .update({ site_settings: newSettings })
            .eq("id", userId);

        if (error) {
            toast.error("Erro ao salvar configurações");
            console.error(error);
        }
    };

    const sidebarItems = [
        { id: "contact", label: "Dados de contato", icon: Users },
        { id: "domain", label: "Domínio", icon: Globe },
        { id: "whatsapp", label: "Whatsapp", icon: Phone },
        { id: "schedule", label: "Agendar Visitas", icon: Calendar },
        { id: "popup", label: "Popup", icon: MessageSquare },
        { id: "photos", label: "Restrição de fotos", icon: Image },
        { id: "lgpd", label: "LGPD", icon: Shield },
        { id: "seo", label: "SEO", icon: Search },
        { id: "form", label: "Formulário de contato", icon: MessageSquare },
        { id: "lead_rotation", label: "Rodízio de leads", icon: RefreshCw },
        { id: "script", label: "Injetar script", icon: Code },
        { id: "maintenance", label: "Manutenção", icon: AlertTriangle },
    ];

    if (loading) {
        return <div className="p-8 text-center text-slate-500">Carregando configurações...</div>;
    }

    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl pb-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 w-full px-4 md:px-0">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/painel/meus-sites" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Meus Sites</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Configurações Avançadas</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm sticky top-24">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                            <h2 className="font-bold text-slate-800 dark:text-slate-200">Menu de Opções</h2>
                        </div>
                        <nav className="flex flex-col p-2 space-y-1">
                            {sidebarItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                            isActive 
                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600" 
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200 border-l-4 border-transparent"
                                        }`}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`} />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    {activeTab === "contact" && (
                        <ContactConfig settings={settings} updateSettings={updateSettings} />
                    )}
                    {activeTab === "domain" && (
                        <DomainConfig settings={settings} updateSettings={updateSettings} />
                    )}
                    {activeTab === "whatsapp" && (
                        <WhatsappConfig settings={settings} updateSettings={updateSettings} />
                    )}
                    {activeTab === "schedule" && (
                        <ScheduleConfig settings={settings} updateSettings={updateSettings} />
                    )}
                    {activeTab === "photos" && (
                        <PhotoRestrictionConfig settings={settings} updateSettings={updateSettings} />
                    )}
                    {activeTab === "lgpd" && (
                        <LgpdConfig settings={settings} updateSettings={updateSettings} />
                    )}
                    {activeTab === "seo" && (
                        <SeoConfig settings={settings} updateSettings={updateSettings} />
                    )}
                    {activeTab === "form" && (
                        <FormConfig settings={settings} updateSettings={updateSettings} />
                    )}
                    {activeTab === "lead_rotation" && (
                        <LeadRotationConfig settings={settings} updateSettings={updateSettings} />
                    )}
                    {activeTab === "script" && (
                        <ScriptConfig settings={settings} updateSettings={updateSettings} />
                    )}
                    {activeTab === "maintenance" && (
                        <MaintenanceConfig settings={settings} updateSettings={updateSettings} />
                    )}
                    {activeTab === "popup" && (
                        <PopupConfig settings={settings} updateSettings={updateSettings} />
                    )}
                    {/* Placeholder para outras abas */}
                    {!["contact", "domain", "whatsapp", "schedule", "photos", "lgpd", "lead_rotation", "seo", "form", "script", "maintenance", "popup"].includes(activeTab) && (
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Em Desenvolvimento</h3>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
                                Esta funcionalidade ({sidebarItems.find(i => i.id === activeTab)?.label}) estará disponível em breve.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
