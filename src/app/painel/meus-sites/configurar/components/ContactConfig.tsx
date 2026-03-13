"use client";

import { useState } from "react";
import { Save, Plus, Trash2, MapPin, Building, Phone } from "lucide-react";
import { toast } from "sonner";

export function ContactConfig({ settings, updateSettings }: { settings: any, updateSettings: (key: string, value: any) => void }) {
    const contact = settings?.contact || {};
    const [loading, setLoading] = useState(false);

    // Local state for form fields to handle inputs before saving
    const [formData, setFormData] = useState({
        fantasy_name: contact.fantasy_name || "",
        email: contact.email || "",
        person_type: contact.person_type || "fisica", // fisica | juridica
        document: contact.document || "",
        cep: contact.address?.cep || "",
        country: contact.address?.country || "Brasil",
        state: contact.address?.state || "",
        city: contact.address?.city || "",
        neighborhood: contact.address?.neighborhood || "",
        street: contact.address?.street || "",
        number: contact.address?.number || "",
        complement: contact.address?.complement || "",
        phones: contact.phones || [{ number: "", type: "Celular", is_whatsapp: true }],
        show_address: contact.show_address !== false, // default true
        show_document: contact.show_document !== false, // default true
        socials: settings?.socials || { facebook: "", instagram: "", twitter: "", youtube: "", linkedin: "", blog: "", telegram: "", tiktok: "" }
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddressChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSocialChange = (network: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            socials: { ...prev.socials, [network]: value }
        }));
    };

    const handlePhoneChange = (index: number, field: string, value: any) => {
        const newPhones = [...formData.phones];
        newPhones[index] = { ...newPhones[index], [field]: value };
        setFormData(prev => ({ ...prev, phones: newPhones }));
    };

    const addPhone = () => {
        setFormData(prev => ({
            ...prev,
            phones: [...prev.phones, { number: "", type: "Celular", is_whatsapp: false }]
        }));
    };

    const removePhone = (index: number) => {
        const newPhones = formData.phones.filter((_: any, i: number) => i !== index);
        setFormData(prev => ({ ...prev, phones: newPhones }));
    };

    const handleSave = () => {
        setLoading(true);
        
        // Construct the object to save
        const newContactSettings = {
            fantasy_name: formData.fantasy_name,
            email: formData.email,
            person_type: formData.person_type,
            document: formData.document,
            address: {
                cep: formData.cep,
                country: formData.country,
                state: formData.state,
                city: formData.city,
                neighborhood: formData.neighborhood,
                street: formData.street,
                number: formData.number,
                complement: formData.complement
            },
            phones: formData.phones,
            show_address: formData.show_address,
            show_document: formData.show_document
        };

        // Update settings via parent function
        // Note: We are updating 'contact' key AND 'socials' key
        updateSettings("contact", newContactSettings);
        updateSettings("socials", formData.socials);
        
        setTimeout(() => setLoading(false), 500);
        toast.success("Dados de contato salvos com sucesso!");
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Dados da Empresa</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Envie seu logo, adicione os dados do seu negócio e conecte suas redes sociais.
                </p>
            </div>

            {/* Main Form Card */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-6 pb-2 border-b border-slate-100 dark:border-slate-700">
                    Dados de contato principais
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nome fantasia <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            value={formData.fantasy_name}
                            onChange={(e) => handleInputChange("fantasy_name", e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                            placeholder="Ex: Imobiliária Modelo"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">E-mail principal para contato</label>
                        <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                            placeholder="contato@imobiliaria.com.br"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tipo de pessoa</label>
                        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg w-fit">
                            <button 
                                onClick={() => handleInputChange("person_type", "fisica")}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${formData.person_type === "fisica" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-slate-400"}`}
                            >
                                Física
                            </button>
                            <button 
                                onClick={() => handleInputChange("person_type", "juridica")}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${formData.person_type === "juridica" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-slate-400"}`}
                            >
                                Jurídica
                            </button>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{formData.person_type === "fisica" ? "CPF" : "CNPJ"}</label>
                        <input 
                            type="text" 
                            value={formData.document}
                            onChange={(e) => handleInputChange("document", e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                            placeholder={formData.person_type === "fisica" ? "000.000.000-00" : "00.000.000/0000-00"}
                        />
                    </div>
                </div>

                {/* Address Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">CEP</label>
                        <input 
                            type="text" 
                            value={formData.cep}
                            onChange={(e) => handleAddressChange("cep", e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                            placeholder="00000-000"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">País</label>
                        <select 
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                            value={formData.country}
                            onChange={(e) => handleAddressChange("country", e.target.value)}
                        >
                            <option value="Brasil">Brasil</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">UF</label>
                        <input 
                            type="text" 
                            value={formData.state}
                            onChange={(e) => handleAddressChange("state", e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                            placeholder="SP"
                            maxLength={2}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Cidade</label>
                        <input 
                            type="text" 
                            value={formData.city}
                            onChange={(e) => handleAddressChange("city", e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                            placeholder="São Paulo"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="col-span-2 space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Logradouro</label>
                        <input 
                            type="text" 
                            value={formData.street}
                            onChange={(e) => handleAddressChange("street", e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                            placeholder="Av. Paulista"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Número</label>
                        <input 
                            type="text" 
                            value={formData.number}
                            onChange={(e) => handleAddressChange("number", e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                            placeholder="1000"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Complemento</label>
                        <input 
                            type="text" 
                            value={formData.complement}
                            onChange={(e) => handleAddressChange("complement", e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                            placeholder="Sala 10"
                        />
                    </div>
                </div>

                {/* Phones Section */}
                <div className="mb-6">
                    {formData.phones.map((phone: any, index: number) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 items-end mb-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
                            <div className="flex-1 w-full space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Operadora/Tipo</label>
                                <select 
                                    value={phone.type}
                                    onChange={(e) => handlePhoneChange(index, "type", e.target.value)}
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                                >
                                    <option value="Celular">Celular</option>
                                    <option value="Fixo">Fixo</option>
                                    <option value="Comercial">Comercial</option>
                                </select>
                            </div>
                            <div className="flex-[2] w-full space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Telefone <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                        <img src="https://flagcdn.com/w20/br.png" alt="BR" className="w-5 h-auto rounded-sm" />
                                    </div>
                                    <input 
                                        type="text" 
                                        value={phone.number}
                                        onChange={(e) => handlePhoneChange(index, "number", e.target.value)}
                                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                                        placeholder="(11) 99999-9999"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 pb-2">
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400">WhatsApp</label>
                                    <button 
                                        type="button"
                                        onClick={() => handlePhoneChange(index, "is_whatsapp", !phone.is_whatsapp)}
                                        className={`w-10 h-5 rounded-full relative transition-colors ${phone.is_whatsapp ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`}
                                    >
                                        <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-transform ${phone.is_whatsapp ? "left-6" : "left-1"}`}></div>
                                    </button>
                                </div>
                                <button 
                                    onClick={() => removePhone(index)}
                                    className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors"
                                    title="Remover telefone"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    <button 
                        onClick={addPhone}
                        className="bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Novo Telefone
                    </button>
                </div>

                {/* Toggles */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Mostrar endereço no site?</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Mostrar este endereço na página de contato e no rodapé do seu site</p>
                        </div>
                        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                            <button 
                                onClick={() => handleInputChange("show_address", true)}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.show_address ? "bg-emerald-500 text-white" : "text-slate-500"}`}
                            >
                                Sim
                            </button>
                            <button 
                                onClick={() => handleInputChange("show_address", false)}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${!formData.show_address ? "bg-red-500 text-white" : "text-slate-500"}`}
                            >
                                Não
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Mostrar CPF/CNPJ no site?</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Mostrar este documento no rodapé do seu site</p>
                        </div>
                        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                            <button 
                                onClick={() => handleInputChange("show_document", true)}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.show_document ? "bg-emerald-500 text-white" : "text-slate-500"}`}
                            >
                                Sim
                            </button>
                            <button 
                                onClick={() => handleInputChange("show_document", false)}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${!formData.show_document ? "bg-red-500 text-white" : "text-slate-500"}`}
                            >
                                Não
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        Adicionar outro endereço
                    </button>
                </div>
            </div>

            {/* Socials Section */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-6 pb-2 border-b border-slate-100 dark:border-slate-700">
                    Redes Sociais
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.keys(formData.socials).map((network) => (
                        <div key={network} className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 capitalize">{network}</label>
                            <input 
                                type="text" 
                                value={formData.socials[network]}
                                onChange={(e) => handleSocialChange(network, e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                                placeholder={`Link do seu ${network}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Save Button */}
            <div className="fixed bottom-6 right-6 md:absolute md:bottom-auto md:right-0 md:relative flex justify-end">
                <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
            </div>
            
            {/* Spacer for fixed button on mobile */}
            <div className="h-16 md:hidden"></div>
        </div>
    );
}
