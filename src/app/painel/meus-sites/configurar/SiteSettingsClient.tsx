"use client";

import { useState } from "react";
import { Save, Upload, Plus, Trash2, Edit2, AlertTriangle, ExternalLink, X, Globe, Phone, User, Link2, MessageCircle, Calendar, Megaphone, Image, ShieldCheck, Search, FileText, Shuffle, Code, Wrench } from "lucide-react";
import { toast } from "sonner";

/* ─────────────────────────────────────
   TABS (todas visíveis, sem scroll)
───────────────────────────────────── */
const TABS = [
    { id: "contato",    label: "Dados de contato",     icon: User },
    { id: "dominio",    label: "Domínio",              icon: Link2 },
    { id: "whatsapp",   label: "Whatsapp",             icon: MessageCircle },
    { id: "visitas",    label: "Agendar Visitas",      icon: Calendar },
    { id: "popup",      label: "Popup",                icon: Megaphone },
    { id: "restricao",  label: "Restrição de fotos",   icon: Image },
    { id: "lgpd",       label: "LGPD",                 icon: ShieldCheck },
    { id: "seo",        label: "SEO",                  icon: Search },
    { id: "formulario", label: "Formulário de contato", icon: FileText },
    { id: "rodizio",    label: "Rodízio de leads",     icon: Shuffle },
    { id: "script",     label: "Injetar script",       icon: Code },
    { id: "manutencao", label: "Manutenção",           icon: Wrench },
];

/* ─────────────────────────────────────
   HELPERS
───────────────────────────────────── */
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
    return (
        <div className="flex rounded overflow-hidden border border-slate-200 text-xs font-bold">
            <button onClick={() => onChange(true)}  className={`px-4 py-1.5 transition-colors ${value  ? "bg-emerald-500 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>Sim</button>
            <button onClick={() => onChange(false)} className={`px-4 py-1.5 transition-colors ${!value ? "bg-red-500 text-white"     : "bg-white text-slate-500 hover:bg-slate-50"}`}>Não</button>
        </div>
    );
}

function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
    return (
        <div className="flex items-start justify-between mb-6">
            <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h2>
                {subtitle && <p className="text-sm text-blue-600 mt-0.5">{subtitle}</p>}
            </div>
            {action}
        </div>
    );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-4 ${className}`}>
            {children}
        </div>
    );
}

function UploadBox({ label, hint }: { label: string; hint?: string }) {
    return (
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl h-36 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
            <Upload className="w-6 h-6 text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" />
            <p className="text-sm font-bold text-slate-500">Fazer upload</p>
            {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
        </div>
    );
}

function SaveBar({ onSave, saving }: { onSave: () => void; saving: boolean }) {
    return (
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-700 flex justify-end">
            <button
                onClick={onSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-7 py-2.5 rounded-xl flex items-center gap-2 transition-colors text-sm"
            >
                {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                Salvar
            </button>
        </div>
    );
}

/* ═══════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════ */
export default function SiteSettingsClient() {
    const [tab, setTab]     = useState("contato");
    const [saving, setSaving] = useState(false);

    /* ── Estado global das abas ── */
    /* Aparência */
    const [aparencia, setAp] = useState({
        menuPosicao: "cabecalho",
        marcaDagua: false, creci: "", filtros: ["recentes"],
    });
    /* Dados de contato */
    const [contato, setCt] = useState({
        nome: "", email: "", tipoPessoa: "fisico", cpf: "", cep: "", pais: "",
        uf: "", cidade: "", bairro: "", logradouro: "", numero: "", complemento: "",
        telefone: "", operadora: "", principal: true, whatsapp: false,
        mostrarEndereco: true, mostrarCpf: false,
    });
    /* Domínio */
    const [showDominioHelp, setShowDominioHelp] = useState(true);
    /* WhatsApp */
    const [wa, setWa] = useState({
        icone: 0, notificacao: false,
        frase: "Olá! Estamos disponíveis para te ajudar.",
        usuarios: [{ nome: "Ricieri Moraes", celular: "11917819790", descricao: "Corretor" }],
    });
    /* Agendar Visitas */
    const [visitas, setVi] = useState({
        ativo: true, mesmoDia: false, limiteDias: false, lead: true,
        fluxo: "padrao", horarios: [{ dias: "Todos os dias", de: "08:00", ate: "18:00" }],
    });
    /* Popup */
    const [popup, setPp] = useState({ ativo: true, gatilho: "segundos", segundos: 5, frequencia: false });
    /* Restrição de fotos */
    const [restricao, setRe] = useState({
        ativo: false, quantas: "", titulo: "", frase: "",
    });
    /* LGPD */
    const [lgpd, setLg] = useState({
        cookies: true, privacidade: false,
        texto: "Em atenção à LGPD ficam todos os meios em conformidade com as informações e proteção de dados coletados neste site.\n\nOs dados coletados (do Nome, Telefone, E-mail, dados sobre o imóvel a serem processados e páginas visitadas neste site) são coletados diretamente dos usuários e utilizados exclusivamente para preenchimento dos formulários de contato.\n\nConforme os regulamentos atuais, os dados de: Nome, Telefone, E-mail, dados sobre o imóvel a ser processado e páginas visitadas neste site são coletados de forma anônima pelo sistema de análise Google Analytics. Dados para de marketing em ferramentas externas, por exemplo a empresa de mídia social Facebook (pixels de conversão e outras informações) estão sujeitas às políticas de privacidade e Análise de Privacidade.",
    });
    /* SEO */
    const [seo, setSeo] = useState({ titulo: "Ricieri Moraes - Compra, Venda e Aluguel de Imóveis", descricao: "Somos especializados na compra, venda e aluguel de imóveis. Conte com a máxima transparência e atenção de um corretor especializado." });
    /* Formulário */
    const [form, setFo] = useState({
        mostrarCorretor: true, foto: true, nome: true, telefone: true, emailCorretor: true,
        obrigatorio: "telefone", botao: "whatsapp_email",
        texto: "Olá, estou interessado nesse imóvel que encontrei no site. Aguardo seu retorno.",
    });
    /* Rodízio */
    const [rodVenda, setRv] = useState({ novos: "responsavel", conhecidos: "responsavel_cliente" });
    const [rodLocacao, setRl] = useState({ novos: "responsavel", conhecidos: "responsavel_cliente" });
    /* Script */
    const [script, setSc] = useState({ nome: "", local: "todas", posicao: "", codigo: "" });
    /* Manutenção */
    const [mnt, setMn] = useState({ ativo: false, texto: "" });

    const save = () => {
        setSaving(true);
        setTimeout(() => { setSaving(false); toast.success("Configurações salvas!"); }, 900);
    };

    return (
        <div className="flex gap-0 w-full">

            {/* ────────────── SIDEBAR ────────────── */}
            <aside className="w-52 shrink-0 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 self-start sticky top-24">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configurações</p>
                </div>
                <nav className="py-1">
                    {TABS.map(t => {
                        const Icon = t.icon;
                        return (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors border-l-2 flex items-center gap-2.5 ${
                                    tab === t.id
                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-600"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/40 border-transparent"
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{t.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* ────────────── CONTEÚDO ────────────── */}
            <div className="flex-1 ml-6 min-w-0">

                {/* ══════════════ APARÊNCIA ══════════════ */}
                {tab === "aparencia" && (
                    <div className="animate-in fade-in duration-200">
                        <SectionTitle
                            title="Aparência do Site"
                            subtitle="Configure menus, pesquisa e marcas d'água do seu site."
                        />
                        <p className="text-xs text-slate-500 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg px-4 py-2.5 mb-4">
                            💡 Para configurar <strong>logo, banner, marca d&apos;água e barra de pesquisa</strong>, acesse <strong>Meu Site → Personalizar</strong>.
                        </p>

                        <Card>
                            <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-4">Posição do Menu</h4>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Posição do Menu de Páginas</label>
                                <select value={aparencia.menuPosicao} onChange={e => setAp({...aparencia, menuPosicao: e.target.value})}
                                    className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300">
                                    <option value="cabecalho">No Cabeçalho Principal</option>
                                    <option value="rodape">Apenas no Rodapé</option>
                                    <option value="separado">Aba Separada (Barra Inferior)</option>
                                </select>
                            </div>
                        </Card>

                        <Card>
                            <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-3">Cards de Imóveis — Filtros</h4>
                            <p className="text-xs text-slate-500 mb-3">Defina as opções de filtro exibidas no site.</p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    ["recentes","Últimos cadastrados"],["atualizados","Últimos atualizados"],
                                    ["preco_asc","Menor para o maior preço"],["preco_desc","Maior para o menor preço"],
                                ].map(([val, lbl]) => (
                                    <label key={val} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg cursor-pointer">
                                        <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                                        {lbl}
                                    </label>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center justify-between mb-1">
                                <div>
                                    <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm">Marca d'água automática</h4>
                                    <p className="text-xs text-slate-500">Aplica sua logo e CRECI nas fotos dos imóveis automaticamente.</p>
                                </div>
                                <Toggle value={aparencia.marcaDagua} onChange={v => setAp({...aparencia, marcaDagua: v})} />
                            </div>
                            {aparencia.marcaDagua && (
                                <div className="mt-4">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">CRECI para a marca d'água</label>
                                    <input value={aparencia.creci} onChange={e => setAp({...aparencia, creci: e.target.value})}
                                        className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm"
                                        placeholder="Ex: CRECI 12345-J" />
                                </div>
                            )}
                        </Card>
                        <SaveBar onSave={save} saving={saving} />
                    </div>
                )}

                {/* ══════════════ DADOS DE CONTATO ══════════════ */}
                {tab === "contato" && (
                    <div className="animate-in fade-in duration-200">
                        <SectionTitle title="Dados da Empresa" subtitle="Envie seu logo, adicione os dados do seu negócio e conecte suas redes sociais." />

                        <Card>
                            <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-4">Dados de contato principais</h4>
                            <div className="grid grid-cols-4 gap-3 mb-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 block mb-1">Nome fantasia *</label>
                                    <input value={contato.nome} onChange={e => setCt({...contato, nome: e.target.value})}
                                        className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm" placeholder="Ricieri Moraes" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 block mb-1">E-mail principal para contato</label>
                                    <input type="email" value={contato.email} onChange={e => setCt({...contato, email: e.target.value})}
                                        className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm" placeholder="moraes.ricieri@gmail.com" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 block mb-1">Tipo de pessoa</label>
                                    <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600">
                                        <button onClick={() => setCt({...contato, tipoPessoa: "fisico"})}
                                            className={`flex-1 py-2 text-sm font-bold transition-colors ${contato.tipoPessoa === "fisico" ? "bg-emerald-500 text-white" : "bg-white dark:bg-slate-900 text-slate-600"}`}>
                                            Físico
                                        </button>
                                        <button onClick={() => setCt({...contato, tipoPessoa: "juridico"})}
                                            className={`flex-1 py-2 text-sm font-bold transition-colors ${contato.tipoPessoa === "juridico" ? "bg-emerald-500 text-white" : "bg-white dark:bg-slate-900 text-slate-600"}`}>
                                            Jurídica
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 block mb-1">CPF</label>
                                    <input value={contato.cpf} onChange={e => setCt({...contato, cpf: e.target.value})}
                                        className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm" placeholder="Digite o CPF" />
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 mb-3">
                                <div><label className="text-xs font-bold text-slate-500 block mb-1">CEP</label>
                                    <input value={contato.cep} onChange={e => setCt({...contato, cep: e.target.value})} className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm" placeholder="CEP" /></div>
                                <div><label className="text-xs font-bold text-slate-500 block mb-1">País</label>
                                    <select className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm text-slate-500"><option>Selecione</option></select></div>
                                <div><label className="text-xs font-bold text-slate-500 block mb-1">UF</label>
                                    <select className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm text-slate-500"><option>Selecione</option></select></div>
                                <div><label className="text-xs font-bold text-slate-500 block mb-1">Cidade</label>
                                    <select className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm text-slate-500"><option>Selecione</option></select></div>
                                <div className="col-span-2"><label className="text-xs font-bold text-slate-500 block mb-1">Bairro</label>
                                    <select className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm text-slate-500"><option>Selecione</option></select></div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div><label className="text-xs font-bold text-slate-500 block mb-1">Logradouro</label>
                                    <input value={contato.logradouro} onChange={e => setCt({...contato, logradouro: e.target.value})} className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm" placeholder="Logradouro" /></div>
                                <div><label className="text-xs font-bold text-slate-500 block mb-1">Número</label>
                                    <input value={contato.numero} onChange={e => setCt({...contato, numero: e.target.value})} className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm" placeholder="Número" /></div>
                                <div><label className="text-xs font-bold text-slate-500 block mb-1">Complemento</label>
                                    <input value={contato.complemento} onChange={e => setCt({...contato, complemento: e.target.value})} className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm" placeholder="Complemento" /></div>
                            </div>

                            {/* Telefone */}
                            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-3">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 block mb-1">Operadora</label>
                                        <select className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm w-32"><option>Operadora</option></select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 block mb-1">Telefone *</label>
                                        <div className="flex items-center gap-1">
                                            <span className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-2 py-2 text-sm">🇧🇷</span>
                                            <input value={contato.telefone} onChange={e => setCt({...contato, telefone: e.target.value})}
                                                className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm w-40" placeholder="(11) 91761-9790" />
                                        </div>
                                    </div>
                                    <div className="flex items-end gap-3 pb-0.5">
                                        <label className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                                            <span className="text-xs text-slate-500">Principal</span>
                                            <label className="relative flex cursor-pointer">
                                                <input type="checkbox" checked={contato.principal} onChange={e => setCt({...contato, principal: e.target.checked})} className="sr-only peer" />
                                                <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:bg-emerald-500 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                                            </label>
                                        </label>
                                        <label className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                                            <span className="text-xs text-slate-500">WhatsApp</span>
                                            <label className="relative flex cursor-pointer">
                                                <input type="checkbox" checked={contato.whatsapp} onChange={e => setCt({...contato, whatsapp: e.target.checked})} className="sr-only peer" />
                                                <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:bg-emerald-500 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                                            </label>
                                        </label>
                                        <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">Remover</button>
                                    </div>
                                </div>
                                <button className="mt-3 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">Novo Telefone</button>
                            </div>

                            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                                <div className="flex items-center justify-between py-2">
                                    <div>
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Mostrar endereço no site?</p>
                                        <p className="text-xs text-blue-600">Mostrar este endereço na página de contato e no rodapé do seu site</p>
                                    </div>
                                    <Toggle value={contato.mostrarEndereco} onChange={v => setCt({...contato, mostrarEndereco: v})} />
                                </div>
                                <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-700">
                                    <div>
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Mostrar CPF no site?</p>
                                        <p className="text-xs text-blue-600">Mostrar este CPF no rodapé do seu site</p>
                                    </div>
                                    <Toggle value={contato.mostrarCpf} onChange={v => setCt({...contato, mostrarCpf: v})} />
                                </div>
                            </div>
                        </Card>
                        <SaveBar onSave={save} saving={saving} />
                    </div>
                )}

                {/* ══════════════ DOMÍNIO ══════════════ */}
                {tab === "dominio" && (
                    <div className="animate-in fade-in duration-200">
                        <SectionTitle title="Domínio" subtitle="Configure o domínio personalizado do seu site." />

                        {showDominioHelp && (
                            <div className="flex items-start gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-5 shadow-sm">
                                <div className="w-20 h-20 bg-blue-600 rounded-xl flex flex-col items-center justify-center shrink-0">
                                    <span className="text-white text-3xl font-black">?</span>
                                    <span className="text-white text-[10px] font-bold mt-0.5">Ajuda</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">Precisa de ajuda?</h4>
                                    <p className="text-sm text-slate-500 mb-3">Separamos alguns tópicos desta área</p>
                                    <div className="space-y-1">
                                        {[
                                            "Registrar um domínio",
                                            "Trazer um domínio existente para a plataforma",
                                            "Configurar domínio no Registro.br",
                                        ].map(txt => (
                                            <a key={txt} href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                                <span className="w-4 h-3 bg-red-500 rounded-sm flex items-center justify-center text-white text-[8px]">▶</span>
                                                {txt}
                                            </a>
                                        ))}
                                        <p className="text-sm text-slate-500 mt-2">Acessar <a href="#" className="text-blue-600 hover:underline">Central de ajuda</a></p>
                                    </div>
                                </div>
                                <button onClick={() => setShowDominioHelp(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-5">
                            <Card className="flex flex-col items-center text-center py-10">
                                <Globe className="w-14 h-14 text-slate-300 mb-4" />
                                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center -mt-8 ml-8 mb-4">
                                    <Plus className="w-3 h-3 text-white" />
                                </div>
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">Ainda não tem um domínio?</p>
                                <p className="text-sm text-slate-500 mb-5">Nós ajudamos você a registrar o seu!</p>
                                <a
                                    href="https://registro.br"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold text-sm px-5 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <Plus className="w-4 h-4" /> Registrar domínio
                                </a>
                            </Card>
                            <Card className="flex flex-col items-center text-center py-10">
                                <Globe className="w-14 h-14 text-slate-300 mb-4" />
                                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center -mt-8 ml-8 mb-4">
                                    <Plus className="w-3 h-3 text-white" />
                                </div>
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">Já tem um domínio e quer usá-lo com a gente?</p>
                                <p className="text-sm text-slate-500 mb-5">Clique em adicionar domínio e siga o passo-a-passo</p>
                                <button className="flex items-center gap-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold text-sm px-5 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    <Plus className="w-4 h-4" /> Adicionar domínio
                                </button>
                            </Card>
                        </div>
                    </div>
                )}

                {/* ══════════════ WHATSAPP ══════════════ */}
                {tab === "whatsapp" && (
                    <div className="animate-in fade-in duration-200">
                        <SectionTitle
                            title="WhatsApp"
                            subtitle="Defina como vai funcionar o chat do seu site."
                            action={<button className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">Desativar plugin</button>}
                        />

                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <Card>
                                <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-3">Ícone flutuante</h4>
                                <p className="text-xs text-slate-500 mb-3">Selecione o modelo padrão de botão</p>
                                <div className="flex gap-2 mb-3">
                                    {[0,1,2,3,4].map(i => (
                                        <button
                                            key={i}
                                            onClick={() => setWa({...wa, icone: i})}
                                            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${wa.icone === i ? "border-emerald-500 bg-emerald-50" : "border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"}`}
                                        >
                                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-emerald-500" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                                    <input type="checkbox" checked={wa.notificacao} onChange={e => setWa({...wa, notificacao: e.target.checked})} className="rounded border-slate-300 text-blue-600" />
                                    Ativar ícone de notificação
                                </label>

                                <div className="mt-4">
                                    <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-2">Frase principal</h4>
                                    <p className="text-xs text-slate-500 mb-2">Adicione uma frase que será utilizada como frase principal no chat.</p>
                                    <textarea
                                        value={wa.frase}
                                        onChange={e => setWa({...wa, frase: e.target.value})}
                                        rows={4}
                                        className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-xl px-3 py-2 text-sm text-slate-700 dark:text-slate-300 resize-none focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                            </Card>

                            <Card>
                                <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-3">Prévia</h4>
                                <p className="text-xs text-slate-500 mb-4">Veja como a frase ficará no seu site</p>
                                <div className="relative flex flex-col items-end gap-2 bg-slate-100 dark:bg-slate-900 rounded-xl p-4 min-h-[160px]">
                                    <div className="relative bg-white dark:bg-slate-700 rounded-2xl rounded-br-none px-4 py-2 shadow-md max-w-[200px] text-sm text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">
                                        {wa.frase}
                                        <button className="absolute top-1 right-1 text-slate-400 hover:text-slate-600">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg cursor-pointer">
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                        </svg>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <Card>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm">Usuários do Chat</h4>
                                    <p className="text-xs text-slate-500">Adicione os usuários que estarão disponíveis no seu Chat</p>
                                </div>
                                <button className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
                                    Adicionar usuário
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead><tr className="border-b border-slate-200 dark:border-slate-700">
                                        <th className="text-left text-xs font-bold text-slate-500 uppercase pb-2 pr-4">Nome</th>
                                        <th className="text-left text-xs font-bold text-slate-500 uppercase pb-2 pr-4">Celular</th>
                                        <th className="text-left text-xs font-bold text-slate-500 uppercase pb-2">Descrição</th>
                                        <th className="pb-2"></th>
                                    </tr></thead>
                                    <tbody>
                                        {wa.usuarios.map((u, i) => (
                                            <tr key={i} className="border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                                                <td className="py-3 pr-4 text-slate-700 dark:text-slate-300 font-medium">{u.nome}</td>
                                                <td className="py-3 pr-4 text-slate-600 dark:text-slate-400">{u.celular}</td>
                                                <td className="py-3 text-slate-600 dark:text-slate-400">{u.descricao}</td>
                                                <td className="py-3 flex items-center gap-2 justify-end">
                                                    <button className="text-xs border border-slate-200 dark:border-slate-600 px-3 py-1.5 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Configurar Horários</button>
                                                    <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                    <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                        <SaveBar onSave={save} saving={saving} />
                    </div>
                )}

                {/* ══════════════ AGENDAR VISITAS ══════════════ */}
                {tab === "visitas" && (
                    <div className="animate-in fade-in duration-200">
                        <SectionTitle
                            title="Agendar Visitas"
                            subtitle="Defina como vai funcionar o botão de agendamento de visitas no seu site."
                            action={<button className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">Desativar agendamento</button>}
                        />

                        <Card className="space-y-0 divide-y divide-slate-100 dark:divide-slate-700 p-0 overflow-hidden">
                            {[
                                { k: "mesmoDia", label: "Permitir agendamento para o mesmo dia?", desc: "Desativado, só permite agendamento para o dia seguinte em diante" },
                                { k: "limiteDias", label: "Definir limite de dias à frente para agendamento?", desc: "Desativado, aceita qualquer data no futuro" },
                                { k: "lead", label: "Cadastrar pessoa do agendamento como um lead?", desc: "Desativando gera apenas o contato" },
                            ].map(({ k, label, desc }) => (
                                <div key={k} className="flex items-center justify-between px-5 py-4">
                                    <div><p className="text-sm font-bold text-slate-700 dark:text-slate-200">{label}</p><p className="text-xs text-slate-500">{desc}</p></div>
                                    <Toggle value={visitas[k as keyof typeof visitas] as boolean} onChange={v => setVi({...visitas, [k]: v})} />
                                </div>
                            ))}
                            <div className="flex items-center justify-between px-5 py-4">
                                <div><p className="text-sm font-bold text-slate-700 dark:text-slate-200">Enviar agendamento para o responsável do imóvel ou seguir fluxo padrão?</p>
                                    <p className="text-xs text-slate-500">Defina quem irá ser responsável pelo atendimento</p></div>
                                <div className="flex rounded overflow-hidden border border-slate-200 text-xs font-bold">
                                    {[["padrao","Fluxo padrão"],["responsavel","Responsável"]].map(([v,l]) => (
                                        <button key={v} onClick={() => setVi({...visitas, fluxo: v})}
                                            className={`px-4 py-1.5 transition-colors ${visitas.fluxo === v ? "bg-emerald-500 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>{l}</button>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-3">Horários permitidos</h4>
                            <p className="text-xs text-slate-500 mb-4">Defina os horários disponíveis para visitas</p>
                            {visitas.horarios.map((h, i) => (
                                <div key={i} className="flex items-center gap-3 mb-3">
                                    <div className="flex-1">
                                        <label className="text-xs text-slate-500 block mb-1">Dias</label>
                                        <select className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm">
                                            <option>Todos os dias</option>
                                            <option>Dias úteis</option>
                                            <option>Fins de semana</option>
                                        </select>
                                    </div>
                                    <div className="w-28">
                                        <label className="text-xs text-slate-500 block mb-1">De</label>
                                        <input type="time" defaultValue="08:00" className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm" />
                                    </div>
                                    <div className="w-28">
                                        <label className="text-xs text-slate-500 block mb-1">Até</label>
                                        <input type="time" defaultValue="18:00" className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm" />
                                    </div>
                                    <button className="mt-5 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            ))}
                            <button className="mt-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Adicionar horas
                            </button>
                        </Card>
                        <SaveBar onSave={save} saving={saving} />
                    </div>
                )}

                {/* ══════════════ POPUP ══════════════ */}
                {tab === "popup" && (
                    <div className="animate-in fade-in duration-200">
                        <SectionTitle
                            title="Pop-up"
                            subtitle="Adicione um pop-up em seu site para divulgar promoções, avisos ou qualquer informação que desejar."
                            action={<button className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">Desativar pop-up</button>}
                        />

                        <div className="grid grid-cols-2 gap-5 mb-5">
                            {["Popup Desktop","Popup Mobile"].map((lbl,i) => (
                                <Card key={lbl}>
                                    <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-3">{lbl}</h4>
                                    <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-600 rounded-xl min-h-[180px] flex flex-col items-center justify-center text-center p-4">
                                        <p className="text-sm text-slate-500 mb-1">Recomendado:</p>
                                        <p className="text-sm text-slate-500">{i === 0 ? "No máximo: 1200px de largura\nNo máximo: 600px de altura" : "No máximo: 600px de largura"}</p>
                                        <button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2 rounded-lg text-sm transition-colors">Enviar</button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <Card>
                            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-700 pb-4 mb-4">
                                <div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Gatilho para ativar pop-up</p>
                                    <p className="text-xs text-slate-500">Escolha em que momento o pop-up deve ser ativado.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm rounded-lg px-3 py-2">
                                        <option>Depois de "X" segundos</option>
                                        <option>Ao tentar sair da página</option>
                                    </select>
                                    <input type="number" value={popup.segundos} onChange={e => setPp({...popup, segundos: Number(e.target.value)})}
                                        className="w-16 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm text-center" />
                                    <span className="text-sm text-slate-500">segundos</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Mostrar pop-up com frequência?</p>
                                    <p className="text-xs text-slate-500">Permite exibir o pop-up novamente mesmo para usuários que já o visualizaram recentemente.</p>
                                </div>
                                <Toggle value={popup.frequencia} onChange={v => setPp({...popup, frequencia: v})} />
                            </div>
                        </Card>
                        <SaveBar onSave={save} saving={saving} />
                    </div>
                )}

                {/* ══════════════ RESTRIÇÃO DE FOTOS ══════════════ */}
                {tab === "restricao" && (
                    <div className="animate-in fade-in duration-200">
                        <SectionTitle title="Restrição de fotos da galeria do imóvel" subtitle="Restrinja a quantidade de imagens exibidas antes de solicitar a identificação do cliente." />

                        <Card>
                            {/* Preview do popup */}
                            <div className="flex items-center gap-3 mb-6">
                                <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 hover:bg-slate-50">← Anterior</button>
                                <div className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                                    <div className="max-w-sm mx-auto">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 block mb-1">Gostaria de ver mais fotos?</label>
                                                    <p className="text-xs font-bold text-slate-500 mb-2">Nome *</p>
                                                    <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs" placeholder="Digite seu nome" disabled />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-500 mb-2">Telefone *</p>
                                                    <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs" placeholder="Digite seu telefone" disabled />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-500 mb-2">E-mail</p>
                                                    <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs" placeholder="Digite seu e-mail" disabled />
                                                </div>
                                                <button className="w-full bg-emerald-500 text-white text-xs font-bold py-2 rounded-lg">Enviar</button>
                                            </div>
                                            <div className="flex items-center">
                                                <p className="text-xs text-slate-500">Também gostaríamos de saber quem é você! Pedimos os seus dados para te conhecer melhor e te enviar as melhores oportunidades de compra.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 hover:bg-slate-50">Próximo →</button>
                            </div>

                            <div className="space-y-4 border-t border-slate-100 dark:border-slate-700 pt-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Ativar pop-up pedindo dados do usuário?</p>
                                        <p className="text-xs text-blue-600">Após seu cliente visualizar um número pré-definido de fotos, mostrar uma pop-up pedindo seus dados.</p>
                                    </div>
                                    <Toggle value={restricao.ativo} onChange={v => setRe({...restricao, ativo: v})} />
                                </div>
                                {restricao.ativo && (
                                    <div className="space-y-3 mt-3 animate-in fade-in">
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Mostrar pop-up após visualizar quantas fotos?</label>
                                            <input value={restricao.quantas} onChange={e => setRe({...restricao, quantas: e.target.value})}
                                                className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm"
                                                placeholder="Defina o número de fotos que o seu cliente poderá visualizar antes de mostrar o pop-up." />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Título</label>
                                            <input value={restricao.titulo} onChange={e => setRe({...restricao, titulo: e.target.value})}
                                                className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm" placeholder="Digite..." />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Frase de apoio</label>
                                            <input value={restricao.frase} onChange={e => setRe({...restricao, frase: e.target.value})}
                                                className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm" placeholder="Digite..." />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                        <SaveBar onSave={save} saving={saving} />
                    </div>
                )}

                {/* ══════════════ LGPD ══════════════ */}
                {tab === "lgpd" && (
                    <div className="animate-in fade-in duration-200">
                        <SectionTitle title="LGPD" />

                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-xl p-4 mb-5 text-sm text-amber-800 dark:text-amber-200 font-medium">
                            <strong>LEI Nº 13.709, DE 14 DE AGOSTO DE 2018</strong><br/>
                            As opções abaixo tratam sobre as determinações da Lei Geral de Proteção de Dados (LGPD). Recomendamos que permanecerão ativas caso sejam usadas sanções pelas legislações competentes (União, Estados, Distrito Federal e Municípios).<br/>
                            <span className="font-normal mt-1 block">A desativação de qualquer uma das opções é de total responsabilidade do usuário.</span>
                        </div>

                        <Card className="space-y-0 divide-y divide-slate-100 dark:divide-slate-700 p-0 overflow-hidden">
                            <div className="flex items-center justify-between px-5 py-4">
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-lg">
                                    Ao acessar o site, mostrar ao usuário um aviso que o site utiliza COOKIES para registro de navegação?
                                </p>
                                <Toggle value={lgpd.cookies} onChange={v => setLg({...lgpd, cookies: v})} />
                            </div>
                            <div className="flex items-center justify-between px-5 py-4">
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-lg">
                                    No formulário, o usuário deve inserir o número de concordância com a sua POLÍTICA DE PRIVACIDADE?
                                </p>
                                <Toggle value={lgpd.privacidade} onChange={v => setLg({...lgpd, privacidade: v})} />
                            </div>
                        </Card>

                        <Card>
                            <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-2">Texto sobre política de privacidade</h4>
                            <textarea
                                value={lgpd.texto}
                                onChange={e => setLg({...lgpd, texto: e.target.value})}
                                rows={10}
                                className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-xl px-4 py-3 text-sm text-slate-700 dark:text-slate-300 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </Card>
                        <SaveBar onSave={save} saving={saving} />
                    </div>
                )}

                {/* ══════════════ SEO ══════════════ */}
                {tab === "seo" && (
                    <div className="animate-in fade-in duration-200">
                        <SectionTitle title="Seo" subtitle="Configure o SEO do seu site." />

                        <Card>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="mb-4">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 mb-2">
                                            Título da página
                                            <a href="#" className="text-blue-600 text-xs font-normal hover:underline">(saiba mais)</a>
                                        </label>
                                        <input value={seo.titulo} onChange={e => setSeo({...seo, titulo: e.target.value})}
                                            className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-200 block mb-2">Descrição</label>
                                        <textarea value={seo.descricao} onChange={e => setSeo({...seo, descricao: e.target.value})}
                                            rows={5}
                                            className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-xl px-3 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                                    </div>
                                </div>

                                {/* Google preview */}
                                <div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Prévia no Google</p>
                                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="font-bold text-blue-700 text-sm">G</span>
                                            <span className="text-blue-600 text-sm font-bold">oogle</span>
                                            <span className="ml-4 text-xs text-slate-400">→ Título da página</span>
                                        </div>
                                        <p className="text-blue-700 dark:text-blue-400 text-base font-medium truncate mb-0.5">{seo.titulo || "Título da página"}</p>
                                        <p className="text-emerald-700 dark:text-emerald-500 text-xs mb-1">www.seusite/url-personalizada ▾</p>
                                        <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2">{seo.descricao || "Descrição do site aparecerá aqui..."}</p>
                                        <p className="text-xs text-slate-400 mt-2">↳ Descrição</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <SaveBar onSave={save} saving={saving} />
                    </div>
                )}

                {/* ══════════════ FORMULÁRIO DE CONTATO ══════════════ */}
                {tab === "formulario" && (
                    <div className="animate-in fade-in duration-200">
                        <SectionTitle title="Formulário de contato" subtitle="Defina como será o formulário de contato presente na página de detalhes do imóvel." />

                        <Card className="space-y-0 divide-y divide-slate-100 dark:divide-slate-700 p-0 overflow-hidden">
                            <div className="flex items-center justify-between px-5 py-4">
                                <div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Mostrar dados do corretor no formulário de contato?</p>
                                    <p className="text-xs text-slate-500">Escolha se deverá ser mostrado dados do corretor responsável em cima do formulário.</p>
                                </div>
                                <Toggle value={form.mostrarCorretor} onChange={v => setFo({...form, mostrarCorretor: v})} />
                            </div>

                            <div className="px-5 py-4">
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Dados do corretor no site</p>
                                <p className="text-xs text-slate-500 mb-3">Selecione quais dados do corretor devem aparecer no site.</p>
                                <div className="flex gap-6">
                                    {[["foto","Foto?"],["nome","Nome?"],["telefone","Telefone?"],["emailCorretor","E-mail?"]].map(([k, lbl]) => (
                                        <div key={k} className="text-center">
                                            <p className="text-xs text-slate-500 mb-2">{lbl}</p>
                                            <div className="flex rounded overflow-hidden border border-slate-200 text-xs font-bold">
                                                <button onClick={() => setFo({...form, [k]: true})} className={`px-3 py-1.5 ${form[k as keyof typeof form] ? "bg-emerald-500 text-white" : "bg-white text-slate-500"}`}>Sim</button>
                                                <button onClick={() => setFo({...form, [k]: false})} className={`px-3 py-1.5 ${!form[k as keyof typeof form] ? "bg-red-500 text-white" : "bg-white text-slate-500"}`}>Não</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-5 py-4">
                                <div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Preenchimento obrigatório</p>
                                    <p className="text-xs text-slate-500">Quais dados seu cliente precisa preencher obrigatoriamente.</p>
                                </div>
                                <div className="flex rounded overflow-hidden border border-slate-200 text-xs font-bold">
                                    {[["telefone","Telefone"],["email","E-mail"],["telefone_email","Telefone e E-mail"]].map(([v,l]) => (
                                        <button key={v} onClick={() => setFo({...form, obrigatorio: v})}
                                            className={`px-3 py-1.5 ${form.obrigatorio === v ? "bg-emerald-500 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>{l}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-5 py-4">
                                <div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Botão de contato do formulário</p>
                                    <p className="text-xs text-slate-500">Escolha qual botão deve estar em destaque no final do formulário.</p>
                                </div>
                                <div className="flex rounded overflow-hidden border border-slate-200 text-xs font-bold">
                                    {[["whatsapp","WhatsApp"],["email","E-mail"],["whatsapp_email","WhatsApp e E-mail"]].map(([v,l]) => (
                                        <button key={v} onClick={() => setFo({...form, botao: v})}
                                            className={`px-3 py-1.5 ${form.botao === v ? "bg-emerald-500 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>{l}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="px-5 py-4">
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Texto Padrão</p>
                                <p className="text-xs text-slate-500 mb-2">Informe o texto que será apresentado como padrão no formulário de contato.</p>
                                <textarea value={form.texto} onChange={e => setFo({...form, texto: e.target.value})}
                                    rows={4}
                                    className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 resize-none focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </Card>
                        <SaveBar onSave={save} saving={saving} />
                    </div>
                )}

                {/* ══════════════ RODÍZIO DE LEADS ══════════════ */}
                {tab === "rodizio" && (
                    <div className="animate-in fade-in duration-200">
                        <SectionTitle title="Site — Rodízio de leads (Meus imóveis)" subtitle="Defina como distribuir os contatos recebidos." />

                        {[
                            { tipo: "VENDA", state: rodVenda, setState: setRv },
                            { tipo: "LOCAÇÃO", state: rodLocacao, setState: setRl },
                        ].map(({ tipo, state, setState }) => (
                            <Card key={tipo} className="p-0 overflow-hidden divide-y divide-slate-100 dark:divide-slate-700">
                                <div className="bg-slate-100 dark:bg-slate-700/50 px-5 py-2.5">
                                    <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">Imóveis com transação de {tipo}</p>
                                </div>
                                <div className="px-5 py-4">
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Novos clientes que fizerem contato através do site devem ser encaminhados para:</p>
                                    <div className="space-y-2">
                                        {[
                                            ["responsavel","Para o corretor responsável pelo imóvel contactado"],
                                            ["especifico","Um corretor específico"],
                                            ["todos","Executar rodízio entre TODOS os corretores"],
                                            ["selecionados","Executar rodízio entre corretores SELECIONADOS"],
                                        ].map(([v, l]) => (
                                            <label key={v} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                                                <input type="radio" name={`${tipo}_novos`} checked={state.novos === v} onChange={() => setState({...state, novos: v})} className="text-blue-600 accent-blue-600" />
                                                {l}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="px-5 py-4">
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Contatos recebidos onde o cliente JÁ POSSUI corretor responsável, devem ser encaminhados para:</p>
                                    <div className="space-y-2">
                                        {[
                                            ["responsavel_cliente","Para o corretor responsável pelo cliente"],
                                            ["responsavel_imovel","Para o corretor responsável pelo imóvel contactado"],
                                            ["especifico","Um corretor específico"],
                                        ].map(([v, l]) => (
                                            <label key={v} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                                                <input type="radio" name={`${tipo}_conhecidos`} checked={state.conhecidos === v} onChange={() => setState({...state, conhecidos: v})} className="text-blue-600 accent-blue-600" />
                                                {l}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}
                        <SaveBar onSave={save} saving={saving} />
                    </div>
                )}

                {/* ══════════════ INJETAR SCRIPT ══════════════ */}
                {tab === "script" && (
                    <div className="animate-in fade-in duration-200">
                        <SectionTitle title="Códigos e Scripts" subtitle="Insira códigos externos, como Pixel do Facebook, Tag Manager." />

                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-xl px-4 py-3 mb-5 flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                            <p className="text-sm text-amber-700 dark:text-amber-300">Atenção: Não garantimos que scripts de terceiros adicionados em seu site funcionarão corretamente.</p>
                        </div>

                        <Card>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Nome</label>
                                    <input value={script.nome} onChange={e => setSc({...script, nome: e.target.value})}
                                        className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm" placeholder="Digite..." />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Local da publicação</label>
                                    <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2">
                                        <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">Todas as páginas</span>
                                        <button className="text-slate-400 hover:text-slate-600"><X className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Posição</label>
                                    <select className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm text-slate-500">
                                        <option>Selecione</option>
                                        <option>Head</option>
                                        <option>Body (início)</option>
                                        <option>Body (fim)</option>
                                    </select>
                                </div>
                            </div>
                            {/* Editor de código */}
                            <div className="border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden">
                                <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2 flex items-center gap-2 border-b border-slate-200 dark:border-slate-600">
                                    <span className="text-xs font-bold text-slate-500">Código</span>
                                </div>
                                <div className="flex">
                                    <div className="bg-slate-50 dark:bg-slate-900 px-3 py-3 text-xs text-slate-400 border-r border-slate-200 dark:border-slate-600 select-none" style={{ minWidth: "40px" }}>
                                        {Array.from({ length: 20 }, (_, i) => (
                                            <div key={i} className="leading-6">{i + 1}</div>
                                        ))}
                                    </div>
                                    <textarea
                                        value={script.codigo}
                                        onChange={e => setSc({...script, codigo: e.target.value})}
                                        rows={20}
                                        className="flex-1 bg-white dark:bg-slate-800 px-3 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 resize-none outline-none leading-6"
                                        placeholder="<!-- Cole seu código aqui -->"
                                        spellCheck={false}
                                    />
                                </div>
                            </div>
                        </Card>
                        <SaveBar onSave={save} saving={saving} />
                    </div>
                )}

                {/* ══════════════ MANUTENÇÃO ══════════════ */}
                {tab === "manutencao" && (
                    <div className="animate-in fade-in duration-200">
                        <SectionTitle title="Configurações Gerais" subtitle="Configure seu site da maneira que desejar para atender as necessidades do seu cliente." />

                        <Card>
                            <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100 dark:border-slate-700">
                                <div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Site em manutenção</p>
                                    <p className="text-xs text-slate-500">Substitui provisoriamente o seu site por uma página indicando que o mesmo está em manutenção.</p>
                                </div>
                                <Toggle value={mnt.ativo} onChange={v => setMn({...mnt, ativo: v})} />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Texto site em manutenção</p>
                                <p className="text-xs text-slate-500 mb-3">Digite o texto que será exibido no site enquanto ele estiver em manutenção.</p>
                                {/* Rich text toolbar */}
                                <div className="border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden">
                                    <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/40">
                                        {["B","I","U"].map(fmt => (
                                            <button key={fmt} className={`w-7 h-7 rounded flex items-center justify-center text-sm font-bold text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${fmt === "B" ? "font-black" : fmt === "I" ? "italic" : "underline"}`}>{fmt}</button>
                                        ))}
                                        <div className="w-px h-5 bg-slate-200 dark:bg-slate-600 mx-1" />
                                        {["≡","≡","≡"].map((s, i) => (
                                            <button key={i} className="w-7 h-7 rounded flex items-center justify-center text-sm text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">{s}</button>
                                        ))}
                                        <div className="w-px h-5 bg-slate-200 dark:bg-slate-600 mx-1" />
                                        <button className="w-7 h-7 rounded flex items-center justify-center text-sm text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">🔗</button>
                                        <div className="flex-1" />
                                        <button className="w-7 h-7 rounded flex items-center justify-center text-sm text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-bold">Tx</button>
                                    </div>
                                    <textarea
                                        value={mnt.texto}
                                        onChange={e => setMn({...mnt, texto: e.target.value})}
                                        rows={8}
                                        className="w-full bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 resize-none outline-none"
                                        placeholder="Digite a observação"
                                    />
                                </div>
                            </div>
                        </Card>
                        <SaveBar onSave={save} saving={saving} />
                    </div>
                )}

            </div>
        </div>
    );
}
