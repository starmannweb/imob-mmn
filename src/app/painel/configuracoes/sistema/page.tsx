"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronRight, MessageSquare, FileText, Download, Search, Monitor,
    User, Code2, Webhook, Building2, Tag, GitBranch, AlertCircle, MapPin,
    Map, Layers, Users, Plus, Trash2, Edit, Save, X, Upload,
    CheckCircle2, ArrowRight, Database, RefreshCw
} from "lucide-react";
import { toast } from "sonner";

type Section =
    | "mensagens_imoveis" | "mensagens_proprietario" | "mensagens_compartilhamento"
    | "modelos_contrato" | "exportar" | "importar" | "pesquisa" | "topo" | "perfil_interesse"
    | "api" | "webhooks"
    | "estabelecimentos" | "caracteristicas" | "origem" | "motivos_perda"
    | "cidades" | "bairros" | "zonas" | "categorias_clientes";

const SIDEBAR_GROUPS = [
    {
        label: "Mensagens Padrão",
        icon: <MessageSquare className="w-4 h-4" />,
        items: [
            { id: "mensagens_imoveis", label: "Imóveis" },
            { id: "mensagens_proprietario", label: "Proprietário" },
            { id: "mensagens_compartilhamento", label: "Compartilhamento" },
        ],
    },
    {
        label: "Configurações",
        icon: <Monitor className="w-4 h-4" />,
        items: [
            { id: "modelos_contrato", label: "Modelos de contrato" },
            { id: "exportar", label: "Exportar dados" },
            { id: "importar", label: "Importação de dados" },
            { id: "pesquisa", label: "Pesquisa" },
            { id: "topo", label: "Topo do sistema" },
            { id: "perfil_interesse", label: "Perfil de interesse" },
            { id: "api", label: "API" },
            { id: "webhooks", label: "Webhooks" },
        ],
    },
    {
        label: "Meus Cadastros",
        icon: <Database className="w-4 h-4" />,
        items: [
            { id: "estabelecimentos", label: "Estabelecimentos" },
            { id: "caracteristicas", label: "Características" },
            { id: "origem", label: "Origem da captação" },
            { id: "motivos_perda", label: "Motivos da perda" },
            { id: "cidades", label: "Cidades" },
            { id: "bairros", label: "Bairros" },
            { id: "zonas", label: "Zonas" },
            { id: "categorias_clientes", label: "Categorias de clientes" },
        ],
    },
];

const LABELS: Record<Section, string> = {
    mensagens_imoveis: "Mensagens Padrão — Imóveis",
    mensagens_proprietario: "Mensagens Padrão — Proprietário",
    mensagens_compartilhamento: "Mensagens Padrão — Compartilhamento",
    modelos_contrato: "Modelos de Contrato",
    exportar: "Exportar Dados",
    importar: "Importação de Dados",
    pesquisa: "Configurações de Pesquisa",
    topo: "Topo do Sistema",
    perfil_interesse: "Perfil de Interesse",
    api: "Configurações de API",
    webhooks: "Webhooks",
    estabelecimentos: "Estabelecimentos",
    caracteristicas: "Características de Imóvel",
    origem: "Origem da Captação",
    motivos_perda: "Motivos da Perda",
    cidades: "Cidades",
    bairros: "Bairros",
    zonas: "Zonas",
    categorias_clientes: "Categorias de Clientes",
};

// Generic CRUD list for catalog-style sections
function CatalogSection({ label, placeholder }: { label: string; placeholder: string }) {
    const [items, setItems] = useState<string[]>([]);
    const [newItem, setNewItem] = useState("");
    const add = () => {
        if (!newItem.trim()) return;
        setItems(p => [...p, newItem.trim()]);
        setNewItem("");
        toast.success(`"${newItem.trim()}" adicionado.`);
    };
    const remove = (i: number) => setItems(p => p.filter((_, idx) => idx !== i));

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && add()}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button onClick={add} className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" /> Adicionar
                </button>
            </div>
            {items.length === 0 ? (
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-12 text-center">
                    <p className="text-sm font-medium text-slate-400">Nenhuma {label.toLowerCase()} encontrada</p>
                    <p className="text-xs text-slate-400 mt-1">Quando cadastrar uma {label.toLowerCase()}, ela aparecerá aqui.</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-100 dark:divide-slate-800">
                    {items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between px-4 py-3">
                            <span className="text-sm text-slate-800 dark:text-slate-200">{item}</span>
                            <div className="flex gap-1">
                                <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                                <button onClick={() => remove(i)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function MessageTemplate({ label }: { label: string }) {
    const [msg, setMsg] = useState("");
    return (
        <div className="space-y-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">
                Defina a mensagem padrão que será enviada automaticamente para {label.toLowerCase()}.
            </p>
            <textarea
                value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder="Digite a mensagem padrão..."
                className="w-full min-h-[180px] px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
            <div className="flex gap-2 text-xs text-slate-400">
                <span>Variáveis disponíveis:</span>
                {["{nome}", "{imovel}", "{link}", "{telefone}"].map(v => (
                    <button key={v} onClick={() => setMsg(p => p + v)}
                        className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono hover:bg-blue-50 hover:text-blue-600 transition-colors">{v}</button>
                ))}
            </div>
            <button onClick={() => toast.success("Mensagem salva!")}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors">
                <Save className="w-4 h-4" /> Salvar mensagem
            </button>
        </div>
    );
}

function ImportSection() {
    const [step, setStep] = useState<"form" | "sent">("form");
    const [source, setSource] = useState("");
    return step === "sent" ? (
        <div className="flex flex-col items-center text-center py-16 gap-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Solicitação enviada!</h3>
            <p className="text-sm text-slate-500 max-w-sm">Nossa equipe entrará em contato via WhatsApp em horário comercial para dar continuidade à importação.</p>
            <button onClick={() => { setStep("form"); setSource(""); }} className="text-sm text-blue-600 hover:underline">Nova solicitação</button>
        </div>
    ) : (
        <div className="space-y-5 max-w-lg">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-300">
                Por favor, forneça o nome do sistema ou a fonte dos seus dados e, em seguida, clique em <strong>"Conversar com a equipe"</strong>. Entraremos em contato para esclarecer eventuais dúvidas e avaliar a viabilidade da importação.
            </div>
            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nome da fonte de dados</label>
                <input type="text" value={source} onChange={e => setSource(e.target.value)}
                    placeholder="Ex: Tecimob, CV CRM, Excel, planilha própria..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <p className="text-xs text-slate-500">O retorno será feito por WhatsApp, em horário comercial, por uma pessoa da nossa equipe.</p>
            <div className="flex gap-3">
                <button className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Voltar
                </button>
                <button
                    onClick={() => { if (source.trim()) { setStep("sent"); toast.success("Solicitação enviada!"); } }}
                    disabled={!source.trim()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-colors"
                >
                    <ArrowRight className="w-4 h-4" /> Conversar com equipe
                </button>
            </div>
        </div>
    );
}

function ExportSection() {
    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">Exporte todos os dados da sua conta em formato CSV ou JSON para backup ou migração.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                    { label: "Imóveis", desc: "Todos os imóveis cadastrados", icon: <Building2 className="w-5 h-5 text-blue-600" /> },
                    { label: "Clientes / Leads", desc: "Base de clientes e leads", icon: <Users className="w-5 h-5 text-emerald-600" /> },
                    { label: "CRM / Negócios", desc: "Histórico de negociações", icon: <GitBranch className="w-5 h-5 text-purple-600" /> },
                    { label: "Financeiro", desc: "Transações e comissões", icon: <Tag className="w-5 h-5 text-amber-600" /> },
                ].map(item => (
                    <div key={item.label} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                        <div className="flex items-center gap-3">
                            {item.icon}
                            <div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</p>
                                <p className="text-xs text-slate-500">{item.desc}</p>
                            </div>
                        </div>
                        <button onClick={() => toast.success(`Exportando ${item.label}...`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-colors">
                            <Download className="w-3.5 h-3.5" /> CSV
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ApiSection() {
    const [key] = useState("sk_live_••••••••••••••••••••••••••••••••");
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText("sk_live_example_key");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Chave copiada!");
    };
    return (
        <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-300">Nunca compartilhe sua chave de API. Ela concede acesso total à sua conta.</p>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sua Chave de API</label>
                <div className="flex gap-2">
                    <code className="flex-1 px-4 py-3 bg-slate-900 text-emerald-400 rounded-xl text-sm font-mono border border-slate-700 truncate">
                        {key}
                    </code>
                    <button onClick={copy} className={`px-4 py-3 rounded-xl text-sm font-bold transition-colors ${copied ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600"}`}>
                        {copied ? "Copiado!" : "Copiar"}
                    </button>
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Documentação</label>
                <a href="#" className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm font-semibold">
                    <Code2 className="w-4 h-4" /> Acessar documentação da API <ArrowRight className="w-3.5 h-3.5" />
                </a>
            </div>
            <button onClick={() => toast.success("Nova chave gerada!")}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold transition-colors hover:bg-red-100">
                <RefreshCw className="w-4 h-4" /> Regenerar chave
            </button>
        </div>
    );
}

function WebhookSection() {
    const [url, setUrl] = useState("");
    const [events, setEvents] = useState<string[]>([]);
    const allEvents = ["lead.created", "lead.updated", "property.created", "deal.won", "deal.lost"];

    const toggle = (e: string) => setEvents(p => p.includes(e) ? p.filter(x => x !== e) : [...p, e]);

    return (
        <div className="space-y-5">
            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">URL do Webhook</label>
                <input type="url" value={url} onChange={e => setUrl(e.target.value)}
                    placeholder="https://seu-sistema.com/webhook"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Eventos a monitorar</label>
                <div className="space-y-2">
                    {allEvents.map(e => (
                        <label key={e} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-blue-400 transition-colors">
                            <input type="checkbox" checked={events.includes(e)} onChange={() => toggle(e)} className="accent-blue-600" />
                            <code className="text-sm font-mono text-slate-700 dark:text-slate-300">{e}</code>
                        </label>
                    ))}
                </div>
            </div>
            <button onClick={() => toast.success("Webhook salvo!")} disabled={!url.trim() || events.length === 0}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-colors">
                <Save className="w-4 h-4" /> Salvar webhook
            </button>
        </div>
    );
}

function SearchSettings() {
    const [order, setOrder] = useState("recent");
    const [perPage, setPerPage] = useState("12");
    const [showArea, setShowArea] = useState(true);
    const [showPrice, setShowPrice] = useState(true);
    return (
        <div className="space-y-5 max-w-lg">
            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Ordenação padrão</label>
                <select value={order} onChange={e => setOrder(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="recent">Mais recentes</option>
                    <option value="price_asc">Menor preço</option>
                    <option value="price_desc">Maior preço</option>
                    <option value="area">Maior área</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Imóveis por página</label>
                <select value={perPage} onChange={e => setPerPage(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    {["6", "9", "12", "18", "24"].map(n => <option key={n} value={n}>{n} por página</option>)}
                </select>
            </div>
            <div className="space-y-3">
                {[
                    { label: "Exibir área", value: showArea, set: setShowArea },
                    { label: "Exibir preço", value: showPrice, set: setShowPrice },
                ].map(item => (
                    <label key={item.label} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                        <button onClick={() => item.set(p => !p)}
                            className={`w-10 h-5 rounded-full transition-colors relative ${item.value ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"}`}>
                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.value ? "translate-x-5" : "translate-x-0.5"}`} />
                        </button>
                    </label>
                ))}
            </div>
            <button onClick={() => toast.success("Configurações de pesquisa salvas!")}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors">
                <Save className="w-4 h-4" /> Salvar
            </button>
        </div>
    );
}

export default function SistemaPage() {
    const [section, setSection] = useState<Section>("mensagens_imoveis");

    const renderContent = () => {
        switch (section) {
            case "mensagens_imoveis": return <MessageTemplate label="imóveis e clientes" />;
            case "mensagens_proprietario": return <MessageTemplate label="proprietários" />;
            case "mensagens_compartilhamento": return <MessageTemplate label="compartilhamento de imóveis" />;
            case "modelos_contrato":
                return (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Crie e gerencie seus modelos de contrato de venda, locação e prestação de serviços.</p>
                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-12 text-center">
                            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <p className="text-sm font-medium text-slate-400">Nenhum modelo de contrato cadastrado</p>
                            <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold mx-auto transition-colors hover:bg-blue-700">
                                <Plus className="w-4 h-4" /> Criar modelo
                            </button>
                        </div>
                    </div>
                );
            case "exportar": return <ExportSection />;
            case "importar": return <ImportSection />;
            case "pesquisa": return <SearchSettings />;
            case "topo":
                return (
                    <div className="space-y-4 max-w-lg">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Configure as informações exibidas no topo do sistema (header).</p>
                        {[
                            { label: "Exibir botão de convidar afiliado", def: true },
                            { label: "Exibir notificações", def: true },
                            { label: "Exibir seletor de tema", def: true },
                            { label: "Exibir suporte no topbar", def: true },
                        ].map(item => (
                            <label key={item.label} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                                <div className="w-10 h-5 rounded-full bg-blue-600 relative">
                                    <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow" />
                                </div>
                            </label>
                        ))}
                        <button onClick={() => toast.success("Configurações salvas!")}
                            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors">
                            <Save className="w-4 h-4" /> Salvar
                        </button>
                    </div>
                );
            case "perfil_interesse":
                return (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Configure os campos de perfil de interesse dos clientes exibidos no CRM.</p>
                        <CatalogSection label="perfil de interesse" placeholder="Ex: Investidor, Primeira compra, Upgrade..." />
                    </div>
                );
            case "api": return <ApiSection />;
            case "webhooks": return <WebhookSection />;
            case "estabelecimentos": return <CatalogSection label="estabelecimento" placeholder="Ex: Supermercado, Escola, Hospital..." />;
            case "caracteristicas": return <CatalogSection label="característica" placeholder="Ex: Piscina, Academia, Pet-friendly..." />;
            case "origem": return <CatalogSection label="origem da captação" placeholder="Ex: Instagram, Indicação, Portais..." />;
            case "motivos_perda": return <CatalogSection label="motivo da perda" placeholder="Ex: Preço, Concorrência, Não decidiu..." />;
            case "cidades": return <CatalogSection label="cidade" placeholder="Ex: Goiânia, Aparecida de Goiânia..." />;
            case "bairros": return <CatalogSection label="bairro" placeholder="Ex: Setor Bueno, Jardim Goiás..." />;
            case "zonas": return <CatalogSection label="zona" placeholder="Ex: Zona Sul, Zona Norte, Central..." />;
            case "categorias_clientes": return <CatalogSection label="categoria de cliente" placeholder="Ex: VIP, Investidor, Primeira compra..." />;
            default: return null;
        }
    };

    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl pb-16">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/painel/configuracoes" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Perfil</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Configurações do Sistema</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <aside className="w-full lg:w-64 shrink-0">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm sticky top-24">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                            <h2 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Configurações</h2>
                        </div>
                        <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                            {SIDEBAR_GROUPS.map(group => (
                                <div key={group.label} className="mb-4">
                                    <div className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        {group.icon} {group.label}
                                    </div>
                                    {group.items.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setSection(item.id as Section)}
                                            className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors ${
                                                section === item.id
                                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 min-w-0">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                            <h1 className="text-lg font-bold text-slate-900 dark:text-white">{LABELS[section]}</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                Gerencie aqui todos os {LABELS[section].toLowerCase()} que você cadastrou no sistema.
                            </p>
                        </div>
                        <div className="p-6">
                            {renderContent()}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
