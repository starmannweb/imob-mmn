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

// Redução para 4 etapas para facilitar e acelerar o cadastro pelo corretor
const STEPS = [
    { id: 'basico', title: 'Básico e Valores', icon: Home },
    { id: 'detalhes', title: 'Detalhes do Imóvel', icon: FileCheck },
    { id: 'localizacao', title: 'Localização', icon: MapPin },
    { id: 'midia', title: 'Mídias e Sigilo', icon: ImageIcon },
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
                    <p className="text-slate-500 mt-2 text-sm">Preencha os dados de forma rápida e simplificada.</p>
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

            {/* Stepper Navigation Premium Seguro e Responsivo */}
            <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0">
                {/* Linha de fundo absoluta */}
                <div className="absolute left-4 sm:left-0 right-4 sm:right-0 top-1/2 -translate-y-1/2 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full z-0"></div>
                
                {/* Linha preenchida absoluta */}
                <div 
                    className="absolute left-4 sm:left-0 top-1/2 -translate-y-1/2 h-1.5 bg-blue-600 rounded-full z-0 transition-all duration-500" 
                    style={{ width: `calc(${(currentStep / (STEPS.length - 1)) * 100}% - ${currentStep === 0 ? '0px' : '16px'})` }}
                ></div>

                {STEPS.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center group cursor-pointer" onClick={() => setCurrentStep(index)}>
                            <div
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ring-4 ring-slate-50 dark:ring-[#0f172a] ${
                                    isActive || isCompleted
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                                        : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
                                }`}
                                title={step.title}
                            >
                                {isCompleted ? <Check className="w-5 h-5" /> : <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </div>
                            <span className={`absolute -bottom-8 text-[11px] sm:text-xs font-bold whitespace-nowrap ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Formulário Principal */}
            <form action="/painel/imoveis/actions" method="POST" className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm min-h-[500px] flex flex-col justify-between">
                
                <div className="flex-1">
                    {/* ETAPA 1: BÁSICO E VALORES */}
                    {currentStep === 0 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <Home className="text-blue-500" /> 1. Básico e Valores
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-slate-700 dark:text-slate-300 font-semibold">Tipo do Imóvel</Label>
                                        <select 
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        >
                                            <option value="draft">Rascunho</option>
                                            <option value="available">Disponível</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="space-y-2 mt-6">
                                    <Label className="text-slate-700 dark:text-slate-300 font-semibold">Título do Anúncio *</Label>
                                    <Input 
                                        name="title" 
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Ex: Maravilhoso Apartamento de Alto Padrão no Leblon" 
                                        required 
                                        className="py-6 text-lg" 
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                    <List className="w-5 h-5 text-emerald-500" /> Precificação Rápida
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4 bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                                        <div className="space-y-2">
                                            <Label className="font-semibold text-emerald-800 dark:text-emerald-400">Valor de Venda (R$)</Label>
                                            <Input name="price_sale" value={formData.price_sale} onChange={handleInputChange} type="number" placeholder="Ex: 850000" className="text-lg font-bold bg-white dark:bg-slate-900" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                name="accepts_financing" 
                                                checked={formData.accepts_financing} 
                                                onChange={(e) => setFormData(prev => ({ ...prev, accepts_financing: e.target.checked }))}
                                                id="aceita-fin" 
                                                className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" 
                                            />
                                            <label htmlFor="aceita-fin" className="text-sm font-medium text-emerald-800 dark:text-emerald-400">Aceita Financiamento</label>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4 bg-amber-50 dark:bg-amber-900/10 p-5 rounded-xl border border-amber-100 dark:border-amber-900/30">
                                        <div className="space-y-2">
                                            <Label className="font-semibold text-amber-800 dark:text-amber-400">Valor de Locação (R$)</Label>
                                            <Input name="price_rent" value={formData.price_rent} onChange={handleInputChange} type="number" placeholder="Ex: 4500" className="text-lg font-bold bg-white dark:bg-slate-900" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="space-y-2">
                                        <Label>Valor do Condomínio Mensal (R$)</Label>
                                        <Input name="condominium" value={formData.condominium} onChange={handleInputChange} type="number" placeholder="Ex: 950" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Valor do IPTU Anual (R$)</Label>
                                        <Input name="iptu" value={formData.iptu} onChange={handleInputChange} type="number" placeholder="Ex: 2100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ETAPA 2: DETALHES DO IMÓVEL */}
                    {currentStep === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <Map className="text-indigo-500" /> 2. Detalhes e Cômodos
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

                            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                    <FileCheck className="w-5 h-5 text-indigo-500" /> Descrição Comercial
                                </h3>
                                <Textarea 
                                    name="description" 
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Venda o imóvel com as melhores palavras... Destaque a localização, acabamentos e diferenciais." 
                                    rows={5} 
                                    className="bg-slate-50 dark:bg-slate-900" 
                                />
                            </div>

                            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                    <Check className="w-5 h-5 text-indigo-500" /> Principais Comodidades
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {["Piscina", "Academia", "Churrasqueira", "Varanda Gourmet", "Mobiliado", "Ar Condicionado", "Portaria 24h", "Salão de Festas", "Elevador", "Área de Serviço", "Aceita Pet", "Sauna"].map(feature => (
                                        <label key={feature} className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer transition-colors">
                                            <input type="checkbox" id={feature} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                                            <span className="text-sm font-medium">{feature}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ETAPA 3: LOCALIZAÇÃO */}
                    {currentStep === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <MapPin className="text-rose-500" /> 3. Localização
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
                                    <Label>Número / Complemento</Label>
                                    <Input name="address_number" value={formData.address_number} onChange={handleInputChange} placeholder="Ex: 123, Apto 401" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Bairro</Label>
                                    <Input name="neighborhood" value={formData.neighborhood} onChange={handleInputChange} placeholder="Ex: Copacabana" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Cidade / Estado</Label>
                                    <Input name="city" value={formData.city} onChange={handleInputChange} placeholder="Ex: Rio de Janeiro - RJ" />
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-5 bg-rose-50 dark:bg-rose-900/10 rounded-xl border border-rose-200 dark:border-rose-900/30 mt-6">
                                <input 
                                    type="checkbox" 
                                    name="hide_address" 
                                    checked={formData.hide_address} 
                                    onChange={(e) => setFormData(prev => ({ ...prev, hide_address: e.target.checked }))}
                                    id="hide_address" 
                                    className="w-5 h-5 mt-0.5 text-rose-600 rounded focus:ring-rose-500 border-rose-300" 
                                />
                                <div>
                                    <label htmlFor="hide_address" className="font-bold text-rose-900 dark:text-rose-400 flex items-center gap-2 cursor-pointer">
                                        <EyeOff className="w-5 h-5" /> Ocultar endereço exato no site
                                    </label>
                                    <p className="text-sm mt-1 text-rose-800 dark:text-rose-300/80">
                                        Mantenha a segurança do seu anúncio. Apenas o bairro e a cidade serão exibidos para o público geral.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ETAPA 4: MÍDIAS E SIGILO */}
                    {currentStep === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <ImageIcon className="text-purple-500" /> 4. Fotos e Tour Virtual
                                </h2>
                                
                                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors rounded-2xl p-8 sm:p-12 text-center group cursor-pointer bg-slate-50 dark:bg-slate-900/50">
                                    <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                        <ImageIcon className="w-8 h-8 text-purple-500" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">Upload de Fotos Rápidas</h3>
                                    <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                                        Arraste as fotos ou clique aqui. A marca d'água da sua corretora será aplicada automaticamente.
                                    </p>
                                    <Button type="button" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                                        Selecionar do Computador
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="space-y-2">
                                        <Label>Link do Vídeo (YouTube/Vimeo)</Label>
                                        <Input name="video_url" value={formData.video_url} onChange={handleInputChange} placeholder="https://youtube.com/watch?v=..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Link do Tour 360º</Label>
                                        <Input name="tour_360_url" value={formData.tour_360_url} onChange={handleInputChange} placeholder="https://meutour360.com/..." />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                                    <Key className="text-amber-500" /> Dados Reservados (Apenas para Você)
                                </h2>
                                <p className="text-sm text-slate-500 mb-6">Informações vitais de captação, seguras e ocultas do público.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Contato do Proprietário</Label>
                                        <Input name="owner_phone" value={formData.owner_phone} onChange={handleInputChange} placeholder="Nome e (00) 00000-0000" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Localização Exata das Chaves</Label>
                                        <Input name="key_location" value={formData.key_location} onChange={handleInputChange} placeholder="Ex: Portaria torre B, ou com Dona Maria" />
                                    </div>
                                </div>
                                
                                <div className="space-y-2 mt-6">
                                    <Label>Anotações Confidenciais</Label>
                                    <Textarea 
                                        name="internal_notes" 
                                        value={formData.internal_notes}
                                        onChange={handleInputChange}
                                        placeholder="Regras de permuta, disponibilidade para visita final de semana..." 
                                        rows={3} 
                                        className="bg-slate-50 dark:bg-slate-900"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Controles de Navegação Fixos no Rodapé do Form */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 mt-8 border-t border-slate-100 dark:border-slate-800">
                    <div className="w-full sm:w-auto">
                        {currentStep > 0 && (
                            <Button type="button" variant="outline" onClick={handlePrev} className="font-semibold px-6 w-full sm:w-auto">
                                <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
                            </Button>
                        )}
                    </div>
                    
                    <div className="w-full sm:w-auto">
                        {currentStep < STEPS.length - 1 ? (
                            <Button type="button" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 w-full sm:w-auto shadow-md">
                                Próxima Etapa <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        ) : (
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 w-full sm:w-auto shadow-lg shadow-emerald-500/20">
                                Finalizar Cadastro <Check className="w-4 h-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
