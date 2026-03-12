"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronRight, Home, MapPin, List, Image as ImageIcon, FileText, ChevronLeft, Map, Key, Video, FileCheck } from "lucide-react";

// Definição das abas/etapas inspiradas na navegação analisada (Simplificado 13 passos em 6 grandes blocos lógicos para UX fluida)
const STEPS = [
    { id: 'basico', title: 'Dados Básicos', icon: Home },
    { id: 'comodos', title: 'Cômodos e Medidas', icon: Map },
    { id: 'valores', title: 'Valores Exatos', icon: List },
    { id: 'caracteristicas', title: 'Características', icon: FileCheck },
    { id: 'midia', title: 'Mídia e Fotos', icon: ImageIcon },
    { id: 'privado', title: 'Dados Privativos', icon: Key },
];

export default function PropertyWizard() {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    return (
        <div className="w-full max-w-5xl mx-auto pb-12">

            {/* Header / Titulo */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Cadastrar Imóvel</h1>
                <p className="text-slate-500 mt-2">Siga as etapas para criar um anúncio completo e atrativo.</p>
            </div>

            {/* Stepper Navigation */}
            <div className="flex bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-2 mb-8 overflow-x-auto hide-scrollbar">
                {STEPS.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;
                    const Icon = step.icon;

                    return (
                        <button
                            key={step.id}
                            onClick={() => setCurrentStep(index)}
                            className={`flex items-center whitespace-nowrap px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                isActive
                                    ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-md"
                                    : isCompleted
                                    ? "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                        >
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs ${
                                isActive ? "bg-white/20" : isCompleted ? "bg-emerald-100 dark:bg-emerald-900/50" : "bg-slate-100 dark:bg-slate-800"
                            }`}>
                                {isCompleted ? <Check className="w-3.5 h-3.5" /> : index + 1}
                            </span>
                            <Icon className="w-4 h-4 mr-2 hidden sm:block" />
                            {step.title}
                        </button>
                    );
                })}
            </div>

            {/* Formulário Principal */}
            <form action="/painel/imoveis/actions" method="POST" className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm min-h-[400px] flex flex-col justify-between">
                
                {/* ETAPA 1: DADOS BÁSICOS */}
                {currentStep === 0 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b pb-4">
                            <Home className="text-indigo-500" /> 1. Informações Básicas
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300 font-semibold">Tipo do Imóvel</Label>
                                <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                                    <option>Apartamento</option>
                                    <option>Casa em Condomínio</option>
                                    <option>Casa de Rua</option>
                                    <option>Terreno</option>
                                    <option>Sala Comercial</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300 font-semibold">Situação do Perfil</Label>
                                <select name="status" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                                    <option value="available">Imóvel Pronto / Usado</option>
                                    <option value="available">Lançamento / Na Planta</option>
                                    <option value="available">Em Construção</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700 dark:text-slate-300 font-semibold">Título Principal do Anúncio *</Label>
                            <Input name="title" placeholder="Ex: Maravilhoso Apartamento de Alto Padrão no Leblon" required className="py-6 text-lg" />
                        </div>
                        
                        <div className="space-y-2">
                            <Label className="text-slate-700 dark:text-slate-300 font-semibold">Descrição Comercial</Label>
                            <Textarea name="description" placeholder="Descreva os encantos e benefícios deste imóvel para o comprador..." rows={6} className="bg-slate-50 dark:bg-slate-900" />
                        </div>
                    </div>
                )}

                {/* ETAPA 2: COMODOS E MEDIDAS */}
                {currentStep === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b pb-4">
                            <Map className="text-indigo-500" /> 2. Metragens e Peças
                        </h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <Label>Área Útil (m²)</Label>
                                <Input name="area" type="number" placeholder="Ex: 120" />
                            </div>
                            <div className="space-y-2">
                                <Label>Área Total (m²)</Label>
                                <Input type="number" placeholder="Ex: 150" />
                            </div>
                            <div className="space-y-2">
                                <Label>Quartos</Label>
                                <Input name="bedrooms" type="number" placeholder="Ex: 3" />
                            </div>
                            <div className="space-y-2">
                                <Label>Sendo Suítes</Label>
                                <Input name="suites" type="number" placeholder="Ex: 1" />
                            </div>
                            <div className="space-y-2">
                                <Label>Banheiros Sociais</Label>
                                <Input name="bathrooms" type="number" placeholder="Ex: 2" />
                            </div>
                            <div className="space-y-2">
                                <Label>Vagas de Garagem</Label>
                                <Input name="parking_spaces" type="number" placeholder="Ex: 2" />
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
                                        <Input name="price_sale" type="number" placeholder="Ex: 850000" className="text-lg font-bold text-slate-700" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="aceita-fin" className="w-4 h-4 rounded border-slate-300" />
                                        <label htmlFor="aceita-fin" className="text-sm">Aceita Financiamento Bancário</label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                <h3 className="font-bold mb-4 text-amber-600">Locação</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Valor do Aluguel Mensal (R$)</Label>
                                        <Input name="price_rent" type="number" placeholder="Ex: 4500" className="text-lg font-bold text-slate-700" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-2">
                                <Label>Valor do Condomínio (R$ / mês)</Label>
                                <Input name="condominium" type="number" placeholder="Ex: 950" />
                            </div>
                            <div className="space-y-2">
                                <Label>Valor do IPTU (R$ / ano)</Label>
                                <Input name="iptu" type="number" placeholder="Ex: 2100" />
                            </div>
                        </div>
                    </div>
                )}

                 {/* ETAPAS RESTANTES (Visual placeholder para fluxo) */}
                 {currentStep > 2 && currentStep < 5 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                            {currentStep === 3 && <FileCheck className="w-8 h-8" />}
                            {currentStep === 4 && <ImageIcon className="w-8 h-8" />}
                        </div>
                        <h3 className="text-xl font-bold mb-2">Construindo Interface de {STEPS[currentStep].title}</h3>
                        <p className="text-slate-500 max-w-sm">Este módulo de Uploader/Checklists avançados será implementado na Fase 2 para garantir alta performance.</p>
                    </div>
                )}

                {/* ETAPA PRIVADO (ÚLTIMA) */}
                {currentStep === 5 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b pb-4">
                            <Key className="text-rose-500" /> 6. Informações de Bastidor (Ocultas no Site)
                        </h2>
                        
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded-lg text-sm border border-amber-200 dark:border-amber-800/50 mb-6">
                            As informações abaixo são visíveis <strong>apenas para a equipe de corretores</strong> logados no sistema e nunca aparecerão nos anúncios ou portais.
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Onde estão as chaves?</Label>
                                <select className="w-full max-w-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 outline-none text-sm">
                                    <option>Na Imobiliária</option>
                                    <option>Com o Proprietário</option>
                                    <option>Com o Zelador/Portaria</option>
                                    <option>Com outro Parceiro</option>
                                </select>
                            </div>
                            
                            <div className="space-y-2">
                                <Label>Anotações Internas de Captação</Label>
                                <Textarea placeholder="Ex: Proprietário só aceita visita depois das 14h. Cachorro bravo no quintal..." rows={4} />
                            </div>
                        </div>
                    </div>
                )}


                {/* Controles de Navegação (Next/Prev/Submit) */}
                <div className="flex items-center justify-between pt-8 mt-12 border-t border-slate-100 dark:border-slate-800">
                    <div>
                        {currentStep > 0 && (
                            <Button type="button" variant="outline" onClick={handlePrev} className="font-semibold px-6 text-slate-600 dark:text-slate-300">
                                <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
                            </Button>
                        )}
                    </div>
                    
                    <div>
                        {currentStep < STEPS.length - 1 ? (
                            <Button type="button" onClick={handleNext} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
                                Próxima Etapa <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        ) : (
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 shadow-lg shadow-emerald-500/20">
                                Finalizar e Publicar <Check className="w-4 h-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
