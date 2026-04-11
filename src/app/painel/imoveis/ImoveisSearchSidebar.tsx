"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

const TIPOS = ["Apartamento", "Casa", "Terreno", "Comercial", "Galpão", "Studio", "Cobertura", "Rural"];
const BAIRROS = ["Centro", "Setor Bueno", "Jardim Goiás", "Jardim América", "Campinas", "Aldeia do Vale"];

type Section = "tipo" | "negocio" | "preco" | "area" | "quartos" | "bairro" | "status";

export function ImoveisSearchSidebar() {
    const router = useRouter();
    const sp = useSearchParams();

    const [open, setOpen] = useState<Record<Section, boolean>>({
        tipo: true, negocio: true, preco: true, area: false, quartos: false, bairro: false, status: false,
    });
    const [ref, setRef] = useState(sp.get("ref") || "");
    const [logradouro, setLogradouro] = useState(sp.get("logradouro") || "");
    const [tipo, setTipo] = useState<string[]>(sp.get("tipo")?.split(",").filter(Boolean) || []);
    const [negocio, setNegocio] = useState(sp.get("negocio") || "");
    const [precoMin, setPrecoMin] = useState(sp.get("precoMin") || "");
    const [precoMax, setPrecoMax] = useState(sp.get("precoMax") || "");
    const [areaMin, setAreaMin] = useState(sp.get("areaMin") || "");
    const [areaMax, setAreaMax] = useState(sp.get("areaMax") || "");
    const [quartos, setQuartos] = useState(sp.get("quartos") || "");
    const [bairro, setBairro] = useState(sp.get("bairro") || "");
    const [status, setStatus] = useState(sp.get("status") || "");

    const toggleTipo = (t: string) =>
        setTipo(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

    const toggleSection = (s: Section) =>
        setOpen(p => ({ ...p, [s]: !p[s] }));

    const hasFilters = ref || logradouro || tipo.length || negocio || precoMin || precoMax || areaMin || areaMax || quartos || bairro || status;

    const applySearch = () => {
        const params = new URLSearchParams();
        params.set("tab", sp.get("tab") || "meus_imoveis");
        if (ref) params.set("ref", ref);
        if (logradouro) params.set("logradouro", logradouro);
        if (tipo.length) params.set("tipo", tipo.join(","));
        if (negocio) params.set("negocio", negocio);
        if (precoMin) params.set("precoMin", precoMin);
        if (precoMax) params.set("precoMax", precoMax);
        if (areaMin) params.set("areaMin", areaMin);
        if (areaMax) params.set("areaMax", areaMax);
        if (quartos) params.set("quartos", quartos);
        if (bairro) params.set("bairro", bairro);
        if (status) params.set("status", status);
        router.push(`/painel/imoveis?${params.toString()}`);
    };

    const clearSearch = () => {
        setRef(""); setLogradouro(""); setTipo([]); setNegocio(""); setPrecoMin(""); setPrecoMax("");
        setAreaMin(""); setAreaMax(""); setQuartos(""); setBairro(""); setStatus("");
        router.push(`/painel/imoveis?tab=${sp.get("tab") || "meus_imoveis"}`);
    };

    return (
        <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24 overflow-hidden">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h2 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-blue-500" /> Pesquisa Avançada
                    </h2>
                    {hasFilters && (
                        <button onClick={clearSearch} className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1">
                            <X className="w-3 h-3" /> Limpar
                        </button>
                    )}
                </div>

                <div className="p-4 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {/* Referência */}
                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div className="relative mb-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input type="text" placeholder="Referência do imóvel" value={ref} onChange={e => setRef(e.target.value)}
                                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input type="text" placeholder="Logradouro, bairro, cidade..." value={logradouro} onChange={e => setLogradouro(e.target.value)}
                                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    {/* Tipo de negócio */}
                    <FilterSection label="Tipo de Negócio" open={open.negocio} toggle={() => toggleSection("negocio")}>
                        <div className="flex gap-2 flex-wrap">
                            {["", "venda", "locacao"].map(v => (
                                <button key={v} onClick={() => setNegocio(v)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                                        negocio === v
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-400"
                                    }`}>
                                    {v === "" ? "Todos" : v === "venda" ? "Venda" : "Locação"}
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Tipo de imóvel */}
                    <FilterSection label="Tipo de Imóvel" open={open.tipo} toggle={() => toggleSection("tipo")}>
                        <div className="grid grid-cols-2 gap-1">
                            {TIPOS.map(t => (
                                <label key={t} className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <input type="checkbox" checked={tipo.includes(t)} onChange={() => toggleTipo(t)}
                                        className="w-3 h-3 accent-blue-600" />
                                    <span className="text-xs text-slate-700 dark:text-slate-300">{t}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Preço */}
                    <FilterSection label="Faixa de Preço" open={open.preco} toggle={() => toggleSection("preco")}>
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <input type="number" placeholder="Mín R$" value={precoMin} onChange={e => setPrecoMin(e.target.value)}
                                    className="w-1/2 px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                <input type="number" placeholder="Máx R$" value={precoMax} onChange={e => setPrecoMax(e.target.value)}
                                    className="w-1/2 px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <select value={precoMin && precoMax ? "" : ""}
                                onChange={e => { const [min, max] = e.target.value.split("-"); setPrecoMin(min); setPrecoMax(max); }}
                                className="w-full px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="">Selecione uma faixa</option>
                                <option value="0-300000">Até R$ 300 mil</option>
                                <option value="300000-600000">R$ 300 mil – 600 mil</option>
                                <option value="600000-1000000">R$ 600 mil – 1 milhão</option>
                                <option value="1000000-2000000">R$ 1 mi – 2 mi</option>
                                <option value="2000000-99999999">Acima de R$ 2 mi</option>
                            </select>
                        </div>
                    </FilterSection>

                    {/* Área */}
                    <FilterSection label="Área (m²)" open={open.area} toggle={() => toggleSection("area")}>
                        <div className="flex gap-2">
                            <input type="number" placeholder="Mín" value={areaMin} onChange={e => setAreaMin(e.target.value)}
                                className="w-1/2 px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            <input type="number" placeholder="Máx" value={areaMax} onChange={e => setAreaMax(e.target.value)}
                                className="w-1/2 px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </FilterSection>

                    {/* Quartos */}
                    <FilterSection label="Dormitórios" open={open.quartos} toggle={() => toggleSection("quartos")}>
                        <div className="flex gap-1.5">
                            {["", "1", "2", "3", "4+"].map(q => (
                                <button key={q} onClick={() => setQuartos(q)}
                                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                                        quartos === q
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-400"
                                    }`}>
                                    {q === "" ? "Todos" : q}
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Bairro */}
                    <FilterSection label="Bairro" open={open.bairro} toggle={() => toggleSection("bairro")}>
                        <input type="text" placeholder="Digite o bairro" value={bairro} onChange={e => setBairro(e.target.value)}
                            className="w-full px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        <div className="mt-1.5 space-y-0.5">
                            {BAIRROS.map(b => (
                                <button key={b} onClick={() => setBairro(b)}
                                    className={`w-full text-left px-2 py-1 rounded-lg text-xs transition-colors ${
                                        bairro === b ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-semibold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                    }`}>
                                    {b}
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Status */}
                    <FilterSection label="Status" open={open.status} toggle={() => toggleSection("status")}>
                        {[
                            { v: "", l: "Todos" },
                            { v: "available", l: "Disponível" },
                            { v: "sold", l: "Vendido" },
                            { v: "rented", l: "Alugado" },
                        ].map(opt => (
                            <button key={opt.v} onClick={() => setStatus(opt.v)}
                                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                    status === opt.v ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-semibold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                }`}>
                                {opt.l}
                            </button>
                        ))}
                    </FilterSection>
                </div>

                <div className="p-3 border-t border-slate-100 dark:border-slate-800">
                    <button onClick={applySearch}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
                        <Search className="w-3.5 h-3.5" /> Pesquisar
                    </button>
                </div>
            </div>
        </aside>
    );
}

function FilterSection({ label, open, toggle, children }: { label: string; open: boolean; toggle: () => void; children: React.ReactNode }) {
    return (
        <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
            <button onClick={toggle} className="w-full flex items-center justify-between py-2.5 px-1 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide hover:text-blue-600 transition-colors">
                {label}
                {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {open && <div className="pb-3 space-y-1">{children}</div>}
        </div>
    );
}
