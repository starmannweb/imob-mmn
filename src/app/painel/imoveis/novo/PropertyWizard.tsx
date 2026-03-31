"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
    Check, ChevronRight, Home, MapPin, List, 
    Image as ImageIcon, FileText, ChevronLeft, 
    Map, Key, Video, FileCheck, Save, EyeOff 
} from "lucide-react";

const STEPS = [
    { id: 'basico', title: 'Dados Básicos', icon: Home },
    { id: 'comodos', title: 'Cômodos', icon: Map },
    { id: 'valores', title: 'Valores', icon: List },
    { id: 'caracteristicas', title: 'Características', icon: FileCheck },
    { id: 'localizacao', title: 'Localização', icon: MapPin },
    { id: 'midia', title: 'Mídia', icon: ImageIcon },
    { id: 'privado', title: 'Privativo', icon: Key },
];

export default function PropertyWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        title: "",
        type: "apartment",
        status: "draft",
        description: "",
        bedrooms: "",
        bathrooms: "",
        suites: "",
        parking_spaces: "",
        area_useful: "",
        area_total: "",
        price_sale: "",
        price_rent: "",
        condominium: "",
        iptu: "",
        accepts_financing: true,
        zip_code: "",
        address: "",
        address_number: "",
        neighborhood: "",
        city: "",
        state: "",
        hide_address: false,
        video_url: "",
        tour_360_url: "",
        internal_notes: "",
        key_location: "",
        owner_phone: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const handleSaveDraft = () => {
        console.log("Salvando rascunho...", formData);
        // Implementar lógica de rascunho via Supabase
    };

    const progress = ((currentStep + 1) / STEPS.length) * 100;

    return (
        <div className="w-full max-w-5xl mx-auto pb-12">
            {/* Header / Titulo */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Cadastrar Imóvel</h1>
                    <p className="text-slate-500 mt-2">Módulo ImobPainel - Gestão Comercial</p>
                </div>
                <Button variant="outline" onClick={handleSaveDraft} className="flex items-center gap-2">
                    <Save className="w-4 h-4" /> Salvar Rascunho
                </Button>
            </div>

            {/* Barra de Progresso */}
            <div className="w-full bg-slate-100 dark:bg-slate-800/50 h-1.5 rounded-full mb-8 overflow-hidden">
                <div 
                    className="bg-blue-600 h-full transition-all duration-700 ease-in-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Stepper Navigation Premium */}
            <div className="flex items-center justify-center w-full max-w-4xl mx-auto mb-10 overflow-x-auto hide-scrollbar px-4">
                {STEPS.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div key={step.id} className="flex items-center">
                            {/* Círculo do Step */}
                            <button
                                type="button"
                                onClick={() => setCurrentStep(index)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shrink-0 ${
                                    isActive || isCompleted
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-4 ring-blue-50 dark:ring-slate-900"
                                        : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
                                }`}
                                title={step.title}
                            >
                                {isCompleted ? <Check className="w-5 h-5 max-w-full" /> : index + 1}
                            </button>
                            
                            {/* Linha Conectora */}
                            {index < STEPS.length - 1 && (
                                <div className={`h-1.5 w-8 sm:w-16 md:w-24 lg:w-32 rounded-full mx-1 sm:mx-2 transition-all duration-500 shrink-0 ${
                                    isCompleted ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-800"
                                }`} />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Formulário Principal */}
            <form action="/painel/imoveis/actions" method="POST" className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm min-h-[500px] flex flex-col justify-between">
                
                <div className="flex-1">
                    {/* ETAPA 1: DADOS BÁSICOS */}
                    {currentStep === 0 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b pb-4">
                                <Home className="text-indigo-500" /> 1. Informações Básicas
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-700 dark:text-slate-300 font-semibold">Tipo do Imóvel</Label>
                                    <select 
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    >
                                        <option value="apartment">Apartamento</option>
                                        <option value="house">Casa de Rua</option>
                                        <option value="condo_house">Casa em Condomínio</option>
                                        <option value="land">Terreno</option>
                                        <option value="commercial">Sala Comercial</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 dark:text-slate-300 font-semibold">Status do Anúncio</Label>
                                    <select 
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    >
                                        <option value="draft">Rascunho</option>
                                        <option value="available">Disponível</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300 font-semibold">Título Principal do Anúncio *</Label>
                                <Input 
                                    name="title" 
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Maravilhoso Apartamento de Alto Padrão no Leblon" 
                                    required 
                                    className="py-6 text-lg" 
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300 font-semibold">Descrição Comercial</Label>
                                <Textarea 
                                    name="description" 
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Descreva os encantos e benefícios deste imóvel..." 
                                    rows={6} 
                                    className="bg-slate-50 dark:bg-slate-900" 
                                />
                            </div>
                        </div>
                    )}

                    {/* ETAPA 2: COMODOS */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b pb-4">
                                <Map className="text-indigo-500" /> 2. Metragens e Peças
                            </h2>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label>Área Útil (m²)</Label>
                                    <Input name="area_useful" value={formData.area_useful} onChange={handleInputChange} type="number" placeholder="Ex: 120" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Área Total (m²)</Label>
                                    <Input name="area_total" value={formData.area_total} onChange={handleInputChange} type="number" placeholder="Ex: 150" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Quartos</Label>
                                    <Input name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} type="number" placeholder="Ex: 3" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sendo Suítes</Label>
                                    <Input name="suites" value={formData.suites} onChange={handleInputChange} type="number" placeholder="Ex: 1" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Banheiros Sociais</Label>
                                    <Input name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} type="number" placeholder="Ex: 2" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Vagas de Garagem</Label>
                                    <Input name="parking_spaces" value={formData.parking_spaces} onChange={handleInputChange} type="number" placeholder="Ex: 2" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ETAPA 3: VALORES */}
                    {currentStep === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b pb-4">
                                <List className="text-emerald-500" /> 3. Precificação
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <h3 className="font-bold mb-4 text-emerald-600">Venda</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Valor do Imóvel (R$)</Label>
                                            <Input name="price_sale" value={formData.price_sale} onChange={handleInputChange} type="number" placeholder="Ex: 850000" className="text-lg font-bold" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                name="accepts_financing" 
                                                checked={formData.accepts_financing} 
                                                onChange={(e) => setFormData(prev => ({ ...prev, accepts_financing: e.target.checked }))}
                                                id="aceita-fin" 
                                                className="w-4 h-4 rounded border-slate-300" 
                                            />
                                            <label htmlFor="aceita-fin" className="text-sm">Aceita Financiamento Bancário</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <h3 className="font-bold mb-4 text-amber-600">Locação</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Valor do Aluguel Mensal (R$)</Label>
                                            <Input name="price_rent" value={formData.price_rent} onChange={handleInputChange} type="number" placeholder="Ex: 4500" className="text-lg font-bold" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="space-y-2">
                                    <Label>Valor do Condomínio (R$ / mês)</Label>
                                    <Input name="condominium" value={formData.condominium} onChange={handleInputChange} type="number" placeholder="Ex: 950" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Valor do IPTU (R$ / ano)</Label>
                                    <Input name="iptu" value={formData.iptu} onChange={handleInputChange} type="number" placeholder="Ex: 2100" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ETAPA 4: CARACTERÍSTICAS */}
                    {currentStep === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b pb-4">
                                <FileCheck className="text-indigo-500" /> 4. Características e Comodidades
                            </h2>
                            <p className="text-sm text-slate-500">Selecione os diferenciais deste imóvel.</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {["Piscina", "Academia", "Churrasqueira", "Varanda Gourmet", "Mobiliado", "Ar Condicionado", "Portaria 24h", "Salão de Festas", "Pet Friendly"].map(feature => (
                                    <div key={feature} className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                        <input type="checkbox" id={feature} className="w-4 h-4" />
                                        <label htmlFor={feature} className="text-sm">{feature}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ETAPA 5: LOCALIZAÇÃO */}
                    {currentStep === 4 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b pb-4">
                                <MapPin className="text-rose-500" /> 5. Localização
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label>CEP</Label>
                                    <Input name="zip_code" value={formData.zip_code} onChange={handleInputChange} placeholder="00000-000" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label>Endereço / Rua</Label>
                                    <Input name="address" value={formData.address} onChange={handleInputChange} placeholder="Ex: Av. Atlântica" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Número</Label>
                                    <Input name="address_number" value={formData.address_number} onChange={handleInputChange} placeholder="Ex: 123" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Bairro</Label>
                                    <Input name="neighborhood" value={formData.neighborhood} onChange={handleInputChange} placeholder="Ex: Copacabana" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Cidade</Label>
                                    <Input name="city" value={formData.city} onChange={handleInputChange} placeholder="Ex: Rio de Janeiro" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                                <input 
                                    type="checkbox" 
                                    name="hide_address" 
                                    checked={formData.hide_address} 
                                    onChange={(e) => setFormData(prev => ({ ...prev, hide_address: e.target.checked }))}
                                    id="hide_address" 
                                    className="w-5 h-5" 
                                />
                                <div>
                                    <label htmlFor="hide_address" className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                        <EyeOff className="w-4 h-4" /> Ocultar endereço exato no site
                                    </label>
                                    <p className="text-xs text-slate-500">Apenas o bairro e cidade serão exibidos publicamente.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ETAPA 6: MÍDIA */}
                    {currentStep === 5 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b pb-4">
                                <ImageIcon className="text-indigo-500" /> 6. Fotos e Vídeos
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Link do Vídeo (YouTube)</Label>
                                    <Input name="video_url" value={formData.video_url} onChange={handleInputChange} placeholder="https://youtube.com/watch?v=..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Link Tour 360º</Label>
                                    <Input name="tour_360_url" value={formData.tour_360_url} onChange={handleInputChange} placeholder="https://meutour360.com/..." />
                                </div>
                            </div>

                            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center">
                                <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ImageIcon className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="font-bold text-lg">Upload de Fotos</h3>
                                <p className="text-slate-500 mb-6">Arraste as fotos ou clique para selecionar. Marca d'água será aplicada automaticamente.</p>
                                <Button type="button" variant="outline">Selecionar Arquivos</Button>
                            </div>
                        </div>
                    )}

                    {/* ETAPA 7: PRIVATIVO */}
                    {currentStep === 6 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b pb-4">
                                <Key className="text-rose-500" /> 7. Dados Privativos (Sigiloso)
                            </h2>
                            
                            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded-lg text-sm border border-amber-200 dark:border-amber-800/50 mb-6">
                                <strong>Importante:</strong> Estas informações NUNCA serão exibidas no site público.
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Telefone do Proprietário</Label>
                                    <Input name="owner_phone" value={formData.owner_phone} onChange={handleInputChange} placeholder="(00) 00000-0000" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Localização das Chaves</Label>
                                    <Input name="key_location" value={formData.key_location} onChange={handleInputChange} placeholder="Ex: Portaria ou Imobiliária" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label>Anotações Internas de Captação</Label>
                                <Textarea 
                                    name="internal_notes" 
                                    value={formData.internal_notes}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Proprietário aceita permuta, chaves com zelador Sr. João..." 
                                    rows={4} 
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Controles de Navegação */}
                <div className="flex items-center justify-between pt-8 mt-12 border-t border-slate-100 dark:border-slate-800">
                    <div>
                        {currentStep > 0 && (
                            <Button type="button" variant="outline" onClick={handlePrev} className="font-semibold px-6">
                                <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
                            </Button>
                        )}
                    </div>
                    
                    <div>
                        {currentStep < STEPS.length - 1 ? (
                            <Button type="button" onClick={handleNext} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 dark:bg-slate-100 dark:text-slate-900">
                                Próxima Etapa <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        ) : (
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 shadow-lg">
                                Finalizar e Publicar <Check className="w-4 h-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
