"use client";

import { useState } from "react";
import {
    ChevronRight, ChevronLeft, Upload, Check, Eye, Link2,
    MapPin, Heart, Globe, Home, HelpCircle, ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface WizardProfile {
    full_name?: string;
    referral_code?: string;
    [key: string]: unknown;
}

interface PersonalizarWizardProps {
    siteSlug: string;
    siteUrl: string;
    profile: WizardProfile | null;
}

const STEPS = [
    { id: 1, label: "Identidade Visual",  desc: "Logo e banner" },
    { id: 2, label: "Escolher Modelo",    desc: "Template e cores" },
    { id: 3, label: "Seções do Site",     desc: "Layout e conteúdo" },
    { id: 4, label: "Ferramentas IA",     desc: "Textos com IA" },
    { id: 5, label: "Publicar",           desc: "Site no ar" },
];

const COLOR_THEMES = [
    { id: "blue",    hex: "#2563EB" },
    { id: "emerald", hex: "#059669" },
    { id: "amber",   hex: "#D97706" },
    { id: "purple",  hex: "#7C3AED" },
    { id: "red",     hex: "#DC2626" },
    { id: "slate",   hex: "#334155" },
    { id: "teal",    hex: "#0D9488" },
    { id: "orange",  hex: "#EA580C" },
    { id: "pink",    hex: "#DB2777" },
    { id: "gold",    hex: "#B45309" },
];

const SORT_OPTIONS = [
    { id: "recentes",      label: "Últimos cadastrados" },
    { id: "atualizados",   label: "Últimos atualizados" },
    { id: "preco_asc",     label: "Menor para o maior preço" },
    { id: "preco_desc",    label: "Maior para o menor preço" },
];

const CARD_TEMPLATES = [
    { id: "padrao",    name: "Padrão",    desc: "Card com foto acima" },
    { id: "destaque",  name: "Destaque",  desc: "Foto grande em fundo" },
    { id: "compacto",  name: "Compacto",  desc: "Lista horizontal" },
];

const SECTIONS = [
    { id: "hero",         label: "Banner Principal",      desc: "Hero com imagem de fundo",   default: true },
    { id: "properties",   label: "Grade de Imóveis",      desc: "Listagem dos seus imóveis",  default: true },
    { id: "about",        label: "Sobre Mim",             desc: "Sua bio e apresentação",     default: true },
    { id: "testimonials", label: "Depoimentos",           desc: "Avaliações de clientes",     default: false },
    { id: "contact",      label: "Formulário de Contato", desc: "Captação de leads",          default: true },
];

const GALLERY_GRADIENTS = [
    "from-slate-600 via-slate-700 to-slate-800",
    "from-blue-700 via-indigo-700 to-blue-900",
    "from-emerald-700 via-teal-700 to-emerald-900",
];

export default function PersonalizarWizard({ siteSlug, siteUrl, profile }: PersonalizarWizardProps) {
    const [currentStep, setCurrentStep]     = useState(1);
    const [selectedTheme, setSelectedTheme] = useState("blue");
    const [selectedTemplate, setSelectedTemplate] = useState("padrao");
    const [selectedSort, setSelectedSort]   = useState("recentes");
    const [activeSections, setActiveSections] = useState<Record<string, boolean>>(
        Object.fromEntries(SECTIONS.map(s => [s.id, s.default]))
    );
    const [aiDescription, setAiDescription] = useState("");
    const [aiQty, setAiQty]                 = useState(1);
    const [isGenerating, setIsGenerating]   = useState(false);
    const [isSaving, setIsSaving]           = useState(false);
    const [formData, setFormData] = useState({
        siteName: profile?.full_name || "",
        tagline:  "Especialista em imóveis de alto padrão",
        creci: "",
    });
    const [watermark, setWatermark] = useState({
        ativo: false, usarLogo: true, usarNome: true, usarCreci: true,
        posicao: "inferior_direito",
    });
    const [searchBar, setSearchBar] = useState({ desktop: true, mobile: true });
    const [menuPages, setMenuPages] = useState([
        { id: "imoveis", label: "Imóveis", ativo: true, editavel: false },
        { id: "sobre", label: "Sobre", ativo: true, editavel: true },
        { id: "contato", label: "Contato", ativo: true, editavel: true },
        { id: "blog", label: "Blog", ativo: false, editavel: true },
        { id: "financiamento", label: "Financiamento", ativo: false, editavel: true },
    ]);

    const themeHex = COLOR_THEMES.find(t => t.id === selectedTheme)?.hex ?? "#2563EB";

    const goNext = () => { if (currentStep < STEPS.length) setCurrentStep(p => p + 1); };
    const goBack = () => { if (currentStep > 1) setCurrentStep(p => p - 1); };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Configurações salvas com sucesso!");
            setCurrentStep(5);
        }, 1000);
    };

    const handleGenerateAI = () => {
        if (!aiDescription.trim()) { toast.error("Descreva seu perfil para a IA"); return; }
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            toast.success("Conteúdo gerado com IA!");
            setCurrentStep(5);
        }, 2000);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(siteUrl);
        toast.success("Link copiado para a área de transferência!");
    };

    const toggleSection = (id: string) => setActiveSections(prev => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="flex bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm min-h-[640px]">

            {/* ── Sidebar ── */}
            <aside className="w-56 shrink-0 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex flex-col">
                <div className="p-5 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="font-extrabold text-slate-800 dark:text-white text-sm">Personalizar Site</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Siga os passos abaixo</p>
                </div>

                <nav className="flex-1 p-3 space-y-1">
                    {STEPS.map(step => {
                        const done   = step.id < currentStep;
                        const active = step.id === currentStep;
                        return (
                            <button
                                key={step.id}
                                onClick={() => done && setCurrentStep(step.id)}
                                disabled={step.id > currentStep}
                                className={[
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all",
                                    active  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold" : "",
                                    done    ? "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 font-medium cursor-pointer" : "",
                                    !active && !done ? "text-slate-400 dark:text-slate-600 cursor-not-allowed font-medium" : "",
                                ].join(" ")}
                            >
                                <span className={[
                                    "w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-black",
                                    active ? "bg-blue-600 text-white" : "",
                                    done   ? "bg-emerald-500 text-white" : "",
                                    !active && !done ? "bg-slate-200 dark:bg-slate-700 text-slate-500" : "",
                                ].join(" ")}>
                                    {done ? <Check className="w-3 h-3" /> : step.id}
                                </span>
                                <span className="leading-tight">
                                    {step.label}
                                    <span className="block text-[10px] font-normal opacity-60">{step.desc}</span>
                                </span>
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <a
                        href={`/corretor/${siteSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        <Eye className="w-3.5 h-3.5" />
                        Ver site atual
                    </a>
                </div>
            </aside>

            {/* ── Conteúdo principal ── */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Breadcrumb de passos */}
                <div className="px-8 py-4 border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {STEPS.map((step, i) => (
                            <span key={step.id} className="flex items-center gap-1 text-xs">
                                <span className={step.id === currentStep ? "text-blue-600 font-bold" : "text-slate-400"}>
                                    {step.label}
                                </span>
                                {i < STEPS.length - 1 && <ChevronRight className="w-3 h-3 text-slate-300" />}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Área de conteúdo */}
                <div className="flex-1 overflow-y-auto">

                    {/* ════════════════════════════
                        PASSO 1 — Identidade Visual
                    ════════════════════════════ */}
                    {currentStep === 1 && (
                        <div className="p-8 space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Identidade Visual</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                    Configure logotipos, banner, marca d&apos;água e barra de pesquisa do seu site.
                                </p>
                            </div>

                            {/* Logos Desktop + Mobile + Banner */}
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                                <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-4">Logo do Site</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Versão Desktop</p>
                                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl h-28 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group">
                                            <Upload className="w-6 h-6 mb-1.5 group-hover:text-blue-500 transition-colors" />
                                            <p className="text-sm font-bold text-slate-500">Fazer upload</p>
                                            <p className="text-xs text-slate-400 mt-0.5">PNG, SVG · Recomendado: 300×80px</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Versão Mobile</p>
                                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl h-28 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group">
                                            <Upload className="w-6 h-6 mb-1.5 group-hover:text-blue-500 transition-colors" />
                                            <p className="text-sm font-bold text-slate-500">Fazer upload</p>
                                            <p className="text-xs text-slate-400 mt-0.5">PNG, SVG · Recomendado: 120×120px</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Banner Principal</p>
                                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl h-28 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group">
                                        <Upload className="w-6 h-6 mb-1.5 group-hover:text-blue-500 transition-colors" />
                                        <p className="text-sm font-bold text-slate-500">Fazer upload do banner</p>
                                        <p className="text-xs text-slate-400 mt-0.5">PNG ou JPG · Mín. 1920 × 600 px</p>
                                    </div>
                                </div>
                            </div>

                            {/* Informações do Site */}
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4">
                                <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Informações do Site</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Nome do Site</label>
                                        <input
                                            type="text"
                                            value={formData.siteName}
                                            onChange={e => setFormData({ ...formData, siteName: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            placeholder="Ex: João Silva Imóveis"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">CRECI</label>
                                        <input
                                            type="text"
                                            value={formData.creci}
                                            onChange={e => setFormData({ ...formData, creci: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            placeholder="Ex: CRECI 12345-J"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Slogan / Tagline</label>
                                    <input
                                        type="text"
                                        value={formData.tagline}
                                        onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        placeholder="Ex: Especialista em imóveis de alto padrão"
                                    />
                                </div>
                            </div>

                            {/* Marca d'água */}
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Marca d&apos;água automática nas fotos</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Aplica marca d&apos;água automática nas fotos dos imóveis.</p>
                                    </div>
                                    <label className="relative flex cursor-pointer">
                                        <input type="checkbox" checked={watermark.ativo} onChange={e => setWatermark({ ...watermark, ativo: e.target.checked })} className="sr-only peer" />
                                        <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-slate-300 after:rounded-full after:h-4 after:w-4 after:transition-all" />
                                    </label>
                                </div>
                                {watermark.ativo && (
                                    <div className="border-t border-slate-100 dark:border-slate-700 pt-4 space-y-4">
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Elementos da marca d&apos;água</p>
                                            <div className="flex flex-wrap gap-3">
                                                {[
                                                    { key: "usarLogo",  label: "Logo" },
                                                    { key: "usarNome",  label: "Nome do corretor" },
                                                    { key: "usarCreci", label: "CRECI" },
                                                ].map(el => (
                                                    <label key={el.key} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={watermark[el.key as keyof typeof watermark] as boolean}
                                                            onChange={e => setWatermark({ ...watermark, [el.key]: e.target.checked })}
                                                            className="rounded border-slate-300 text-blue-600 accent-blue-600"
                                                        />
                                                        {el.label}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Posição</label>
                                            <select
                                                value={watermark.posicao}
                                                onChange={e => setWatermark({ ...watermark, posicao: e.target.value })}
                                                className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300"
                                            >
                                                <option value="inferior_direito">Inferior direito</option>
                                                <option value="inferior_esquerdo">Inferior esquerdo</option>
                                                <option value="superior_direito">Superior direito</option>
                                                <option value="superior_esquerdo">Superior esquerdo</option>
                                                <option value="centro">Centro</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Barra de Pesquisa */}
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                                <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-3">Barra de Pesquisa</h4>
                                <p className="text-xs text-slate-500 mb-4">Defina em quais versões do site a barra de busca ficará visível.</p>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <label className="relative flex cursor-pointer">
                                            <input type="checkbox" checked={searchBar.desktop} onChange={e => setSearchBar({ ...searchBar, desktop: e.target.checked })} className="sr-only peer" />
                                            <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-slate-300 after:rounded-full after:h-4 after:w-4 after:transition-all" />
                                        </label>
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Exibir no Desktop</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <label className="relative flex cursor-pointer">
                                            <input type="checkbox" checked={searchBar.mobile} onChange={e => setSearchBar({ ...searchBar, mobile: e.target.checked })} className="sr-only peer" />
                                            <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-slate-300 after:rounded-full after:h-4 after:w-4 after:transition-all" />
                                        </label>
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Exibir no Mobile</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ════════════════════════════
                        PASSO 2 — Escolher Modelo
                        Layout: Card esquerda | Painel direita
                    ════════════════════════════ */}
                    {currentStep === 2 && (
                        <div className="p-8 space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Escolher Modelo</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                    Escolha o template, cores e ordenação dos imóveis do seu site.
                                </p>
                            </div>

                            {/* Split: Card + Painel */}
                            <div className="flex gap-6">

                                {/* Esquerda — Preview do card de imóvel */}
                                <div className="flex-shrink-0 w-64">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Preview do Card</p>
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                                        {/* Imagem do imóvel */}
                                        <div className="relative h-44 bg-gradient-to-br from-slate-500 to-slate-700 overflow-hidden flex items-center justify-center">
                                            <Home className="w-14 h-14 text-white/20" />
                                            <span
                                                className="absolute top-3 left-3 text-[10px] font-extrabold px-2 py-1 rounded-full text-white uppercase"
                                                style={{ backgroundColor: themeHex }}
                                            >
                                                À Venda
                                            </span>
                                            <button className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white p-1.5 rounded-full">
                                                <Heart className="w-3.5 h-3.5" />
                                            </button>
                                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-3">
                                                <p className="text-white font-black text-base leading-tight">R$ 1.700.000</p>
                                            </div>
                                        </div>
                                        {/* Corpo */}
                                        <div className="p-3">
                                            <h3 className="font-extrabold text-slate-900 text-xs mb-1">Apartamento Alto Padrão</h3>
                                            <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
                                                <MapPin className="w-2.5 h-2.5" />
                                                <span>Jardins, São Paulo - SP</span>
                                            </div>
                                            <div className="flex gap-2 text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                                                <span>4 quartos</span>
                                                <span className="text-slate-300">|</span>
                                                <span>3 suítes</span>
                                                <span className="text-slate-300">|</span>
                                                <span>280 m²</span>
                                            </div>
                                        </div>
                                        {/* Rodapé */}
                                        <div className="px-3 pb-3 flex items-center gap-2 border-t border-slate-100 pt-2">
                                            <div
                                                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0"
                                                style={{ backgroundColor: themeHex }}
                                            >
                                                {(formData.siteName || "C").substring(0, 1).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-bold text-slate-800 truncate">{formData.siteName || "Corretor"}</p>
                                                <p className="text-[9px] text-slate-400">CRECI 12345</p>
                                            </div>
                                            <button
                                                className="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-lg text-white"
                                                style={{ backgroundColor: themeHex }}
                                            >
                                                Contato
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Direita — Configurações */}
                                <div className="flex-1 space-y-5">
                                    {/* Ordenação */}
                                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-3">Ordenar imóveis por</h4>
                                        <div className="space-y-2">
                                            {SORT_OPTIONS.map(opt => (
                                                <label key={opt.id} className="flex items-center gap-2.5 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="sort"
                                                        value={opt.id}
                                                        checked={selectedSort === opt.id}
                                                        onChange={() => setSelectedSort(opt.id)}
                                                        className="w-3.5 h-3.5 accent-blue-600"
                                                    />
                                                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 transition-colors">
                                                        {opt.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Paleta de cores */}
                                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-3">Paleta de Cores</h4>
                                        <div className="flex flex-wrap gap-2.5">
                                            {COLOR_THEMES.map(theme => (
                                                <button
                                                    key={theme.id}
                                                    onClick={() => setSelectedTheme(theme.id)}
                                                    title={theme.id}
                                                    className={`relative w-9 h-9 rounded-full transition-all hover:scale-110 ${
                                                        selectedTheme === theme.id
                                                            ? "ring-4 ring-offset-2 ring-slate-800 dark:ring-slate-200 scale-110"
                                                            : "ring-2 ring-transparent"
                                                    }`}
                                                    style={{ backgroundColor: theme.hex }}
                                                >
                                                    {selectedTheme === theme.id && (
                                                        <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Templates de card (linha abaixo) */}
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Estilo do Card</p>
                                <div className="grid grid-cols-3 gap-4">
                                    {CARD_TEMPLATES.map(tpl => (
                                        <button
                                            key={tpl.id}
                                            onClick={() => setSelectedTemplate(tpl.id)}
                                            className={`relative bg-white dark:bg-slate-800 border-2 rounded-xl p-4 text-left transition-all hover:shadow-md ${
                                                selectedTemplate === tpl.id
                                                    ? "border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900/30"
                                                    : "border-slate-200 dark:border-slate-700"
                                            }`}
                                        >
                                            {selectedTemplate === tpl.id && (
                                                <span className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-0.5">
                                                    <Check className="w-3 h-3" />
                                                </span>
                                            )}
                                            <div className="h-10 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg mb-2.5" />
                                            <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">{tpl.name}</p>
                                            <p className="text-[11px] text-slate-500 mt-0.5">{tpl.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ════════════════════════════
                        PASSO 3 — Seções do Site
                        Galeria topo + seções + botão
                    ════════════════════════════ */}
                    {currentStep === 3 && (
                        <div className="animate-in fade-in duration-300">

                            {/* Galeria de 3 imagens — simula o header do site */}
                            <div className="grid grid-cols-3 gap-0 overflow-hidden">
                                {GALLERY_GRADIENTS.map((grad, i) => (
                                    <div
                                        key={i}
                                        className={`relative h-40 bg-gradient-to-br ${grad} flex items-end`}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                            <Home className="w-16 h-16 text-white" />
                                        </div>
                                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                                            <div className="h-2 w-2/3 bg-white/40 rounded mb-1" />
                                            <div className="h-1.5 w-1/2 bg-white/30 rounded" />
                                        </div>
                                        {i === 0 && (
                                            <span className="absolute top-3 left-3 bg-white/90 text-slate-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                                À VENDA
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Barra de destaque — seção de captação */}
                            <div
                                className="px-8 py-4 flex items-center gap-3"
                                style={{ backgroundColor: themeHex }}
                            >
                                <p className="text-white font-bold text-sm flex-1 truncate">
                                    Encontre seu imóvel ideal com {formData.siteName || "nosso corretor"}
                                </p>
                                <button className="shrink-0 bg-white text-sm font-bold px-4 py-1.5 rounded-lg" style={{ color: themeHex }}>
                                    Ver imóveis
                                </button>
                            </div>

                            <div className="p-8 space-y-5">
                                <div>
                                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Seções do Site</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                        Ative ou desative as seções que aparecerão no seu site.
                                    </p>
                                </div>

                                {/* Menu e Páginas */}
                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                                    <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-between">
                                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Menu e Páginas</h4>
                                        <span className="text-xs text-slate-500">Ative as páginas que aparecerão no menu</span>
                                    </div>
                                    {menuPages.map(page => (
                                        <div key={page.id} className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 dark:border-slate-700">
                                            <div className="flex items-center gap-3 flex-1">
                                                {page.editavel ? (
                                                    <input
                                                        type="text"
                                                        defaultValue={page.label}
                                                        className="text-sm font-bold text-slate-700 dark:text-slate-300 bg-transparent border-b border-dashed border-slate-300 dark:border-slate-600 focus:outline-none focus:border-blue-500 w-36"
                                                    />
                                                ) : (
                                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{page.label}</p>
                                                )}
                                                {!page.editavel && (
                                                    <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500 px-1.5 py-0.5 rounded font-medium">obrigatória</span>
                                                )}
                                            </div>
                                            <label className="relative flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={page.ativo}
                                                    disabled={!page.editavel}
                                                    onChange={() => setMenuPages(prev => prev.map(p => p.id === page.id ? { ...p, ativo: !p.ativo } : p))}
                                                    className="sr-only peer"
                                                />
                                                <div className={`w-10 h-5 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-slate-300 after:rounded-full after:h-4 after:w-4 after:transition-all ${!page.editavel ? "bg-slate-300 dark:bg-slate-600 opacity-50" : "bg-slate-200 dark:bg-slate-700 peer-checked:bg-blue-600"}`} />
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {/* Toggles de seção */}
                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-100 dark:divide-slate-700 overflow-hidden">
                                    <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/40">
                                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Seções Visíveis</h4>
                                    </div>
                                    {SECTIONS.map(section => (
                                        <div key={section.id} className="flex items-center justify-between px-5 py-3.5">
                                            <div>
                                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{section.label}</p>
                                                <p className="text-xs text-slate-500">{section.desc}</p>
                                            </div>
                                            <label className="relative flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={activeSections[section.id]}
                                                    onChange={() => toggleSection(section.id)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-slate-300 after:rounded-full after:h-4 after:w-4 after:transition-all" />
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {/* Botão proeminente de finalizar etapa */}
                                <button
                                    onClick={goNext}
                                    className="w-full py-4 text-white font-extrabold text-base rounded-xl shadow-md transition-all hover:opacity-90 active:scale-[0.99]"
                                    style={{ backgroundColor: themeHex }}
                                >
                                    PERSONALIZAR COM IA →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ════════════════════════════
                        PASSO 4 — Ferramentas IA
                        Card centrado com input inline
                    ════════════════════════════ */}
                    {currentStep === 4 && (
                        <div className="p-8 flex items-start justify-center min-h-[480px] animate-in fade-in duration-300">
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 w-full max-w-xl shadow-sm">

                                {/* Ícone "?" */}
                                <div className="w-20 h-20 rounded-2xl bg-teal-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <HelpCircle className="w-11 h-11 text-white" />
                                </div>

                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white text-center mb-2">
                                    Gerar Conteúdo com IA
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-6 leading-relaxed">
                                    Descreva seu perfil e especialidade imobiliária. Nossa IA criará textos profissionais
                                    para o slogan, apresentação e seções do seu site automaticamente.
                                </p>

                                {/* Descrição */}
                                <div className="mb-4">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                                        Descrição do seu perfil
                                    </label>
                                    <textarea
                                        value={aiDescription}
                                        onChange={e => setAiDescription(e.target.value)}
                                        rows={3}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
                                        placeholder="Ex: Sou corretor há 10 anos, especializado em apartamentos de alto padrão em São Paulo..."
                                    />
                                </div>

                                {/* Input inline com botão Gerar + quantidade */}
                                <div className="flex items-stretch gap-2">
                                    <div className="flex-1 flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 text-sm text-slate-500">
                                        <span className="truncate">{aiDescription ? `"${aiDescription.substring(0, 40)}..."` : "Texto gerado aparecerá aqui"}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3">
                                        <span className="text-xs text-slate-500 whitespace-nowrap">Nº variações</span>
                                        <input
                                            type="number"
                                            min={1}
                                            max={5}
                                            value={aiQty}
                                            onChange={e => setAiQty(Number(e.target.value))}
                                            className="w-10 bg-transparent text-center text-sm font-bold text-slate-800 dark:text-slate-200 outline-none"
                                        />
                                    </div>
                                    <button
                                        onClick={handleGenerateAI}
                                        disabled={isGenerating}
                                        className="bg-amber-500 hover:bg-amber-600 disabled:opacity-70 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors shrink-0"
                                    >
                                        {isGenerating ? (
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : "Gerar"}
                                    </button>
                                </div>

                                <button
                                    onClick={() => setCurrentStep(5)}
                                    className="w-full mt-4 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-sm"
                                >
                                    Pular esta etapa
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ════════════════════════════
                        PASSO 5 — Publicar
                        Dois cards com botões verdes
                    ════════════════════════════ */}
                    {currentStep === 5 && (
                        <div
                            className="relative flex flex-col items-center justify-center min-h-[480px] p-8 animate-in fade-in zoom-in-95 duration-300"
                        >
                            {/* Fundo decorativo — grade de cards simulada */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 dark:from-violet-900/30 dark:to-indigo-900/30" />
                                <div className="grid grid-cols-4 gap-3 p-4 opacity-10 dark:opacity-20 scale-110 blur-sm">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <div key={i} className="bg-white dark:bg-slate-700 rounded-xl h-28 border border-slate-200 dark:border-slate-600" />
                                    ))}
                                </div>
                            </div>

                            {/* Modal flutuante */}
                            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8 w-full max-w-md">
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white text-center mb-1">
                                    Seu site está pronto!
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-6">
                                    Parabéns! Escolha o que deseja fazer agora.
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Card: Copiar Link */}
                                    <div className="flex flex-col bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
                                        <div className="flex-1 flex flex-col items-center justify-center p-5 gap-3">
                                            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                <Link2 className="w-7 h-7 text-blue-600" />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Copiar Link</p>
                                                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                                                    Compartilhe o link do seu site com clientes
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleCopyLink}
                                            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors"
                                        >
                                            Copiar
                                        </button>
                                    </div>

                                    {/* Card: Visualizar */}
                                    <div className="flex flex-col bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
                                        <div className="flex-1 flex flex-col items-center justify-center p-5 gap-3">
                                            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                                <ExternalLink className="w-7 h-7 text-emerald-600" />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Visualizar Site</p>
                                                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                                                    Veja como o seu site ficou antes de divulgar
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href={`/corretor/${siteSlug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors text-center"
                                        >
                                            Abrir
                                        </a>
                                    </div>
                                </div>

                                <Link
                                    href="/painel/meus-sites"
                                    className="block text-center mt-5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                                >
                                    Voltar para Meu Site →
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Rodapé de Navegação (oculto nos passos 3 e 5 pois têm seus próprios CTAs) ── */}
                {currentStep !== 5 && currentStep !== 3 && (
                    <div className="px-8 py-5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
                        <button
                            onClick={goBack}
                            disabled={currentStep === 1}
                            className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Voltar
                        </button>

                        <span className="text-xs text-slate-400">{currentStep} de {STEPS.length}</span>

                        {currentStep === 4 ? (
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-2.5 text-white font-bold text-sm rounded-xl transition-colors shadow-sm disabled:opacity-70"
                                style={{ backgroundColor: themeHex }}
                            >
                                {isSaving ? (
                                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Salvando...</>
                                ) : (
                                    <><Globe className="w-4 h-4" /> Salvar e Publicar</>
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={goNext}
                                className="flex items-center gap-2 px-6 py-2.5 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
                                style={{ backgroundColor: themeHex }}
                            >
                                Continuar
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}

                {/* Rodapé do passo 3 tem apenas o botão "Voltar" para consistência */}
                {currentStep === 3 && (
                    <div className="px-8 py-5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
                        <button
                            onClick={goBack}
                            className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Voltar
                        </button>
                        <span className="text-xs text-slate-400">3 de {STEPS.length}</span>
                        <div className="w-24" />
                    </div>
                )}
            </div>
        </div>
    );
}
