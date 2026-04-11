"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { Plus, Upload, Search } from "lucide-react";

const STEPS = [
    { id: "info",       label: "Informações" },
    { id: "comodos",    label: "Cômodos" },
    { id: "medidas",    label: "Medidas" },
    { id: "preco",      label: "Preço" },
    { id: "carac",      label: "Características do Imóvel" },
    { id: "condo",      label: "Características do Condomínio" },
    { id: "local",      label: "Localização" },
    { id: "prox",       label: "Proximidades" },
    { id: "desc",       label: "Descrição" },
    { id: "comp",       label: "Complementos" },
    { id: "priv",       label: "Dados privativos" },
    { id: "imgs",       label: "Imagens do imóvel" },
    { id: "pub",        label: "Publicação" },
];

const IMOVEL_FEATURES = [
    "Acessibilidade","Academia","Adega","Aquecimento a gás","Aquecimento central","Aquecimento solar",
    "Ar condicionado","Ar condicionado central","Área esportiva","Área verde na entrada","Biblioteca",
    "Cabeamento estruturado","Calefação","Circuito de entrada","Cozinha americana","Cozinha gourmet",
    "Cozinha independente","Depósito","Energia solar","Espaço verde","Fachada digital","Forno de lenha",
    "Forno em aço","Forno inoxidável","Gas central","Gas individual","Gerador elétrico","Home office",
    "Infraestrutura ar condic.","Interfone","Internet","Isolamento acústico","Jardim","Lareira",
    "Lavanderia","Madeira no piso","Piscina","Piso inferior","Portaria 24h","Portaria eletrônica",
    "Sacada/Varanda","Sala de jantar","Sauna","SFA","Varanda gourmet","Vista mar","Vista interior",
    "Vista para o parque","Vista para a montanha","Zelador",
];

const CONDO_FEATURES = [
    "Academia de ginástica","Área verde preservada","Auditório","Bicicletário","Brinquedoteca",
    "Câmeras de segurança","Campo de futebol gramado","Campo de Golfe","Cerca elétrica","Churrasqueira",
    "Cinema","Condomínio fechado","Coworking","Elevador de serv.","Elevador social","Gerador elétrico",
    "Gramado","Interfone","Jacuzzi","Lago","Lan house","Lanchonete","Massagem","Permite animais",
    "Piscina adulto","Piscina infantil","Pista de caminhada","Pista de cooper","Playground",
    "Portão Elétrico","Portaria 24 horas","Porteiro eletrônico","Quadra de areia","Quadra de tênis",
    "Quadra poliesportiva","Ronda motorizada","Sala de jogos","Salão de festas","Salão de festas infantil",
    "Sauna","Solarium",
];

const PROXIMIDADES = [
    "Banco","Escola","Escola de idioma","Faculdade","Farmácia","Hospital","Igreja",
    "Padaria","Praça","Rodovia","Shopping","Supermercado","Transporte público",
];

type FormData = Record<string, any>;

function YesNo({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
    return (
        <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{label}</p>
            <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 w-fit">
                <button
                    type="button"
                    onClick={() => onChange(true)}
                    className={`px-5 py-2 text-sm font-bold transition-colors ${value ? "bg-emerald-500 text-white" : "bg-white dark:bg-slate-800 text-slate-500"}`}
                >Sim</button>
                <button
                    type="button"
                    onClick={() => onChange(false)}
                    className={`px-5 py-2 text-sm font-bold transition-colors ${!value ? "bg-red-500 text-white" : "bg-white dark:bg-slate-800 text-slate-500"}`}
                >Não</button>
            </div>
        </div>
    );
}

function FieldInput({ label, name, placeholder, type = "text", value, onChange }: {
    label: string; name: string; placeholder?: string; type?: string;
    value: string; onChange: (name: string, v: string) => void;
}) {
    return (
        <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(name, e.target.value)}
                placeholder={placeholder || "Digite..."}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
        </div>
    );
}

function FieldSelect({ label, name, options, value, onChange }: {
    label: string; name: string; options: string[]; value: string; onChange: (name: string, v: string) => void;
}) {
    return (
        <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
            <select
                value={value}
                onChange={e => onChange(name, e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            >
                <option value="">Selecione</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
        </div>
    );
}

function CheckGrid({ items, checked, onToggle }: { items: string[]; checked: string[]; onToggle: (item: string) => void }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {items.map(item => (
                <label key={item} className="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={checked.includes(item)}
                        onChange={() => onToggle(item)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">{item}</span>
                </label>
            ))}
        </div>
    );
}

export default function PropertyWizard() {
    const router = useRouter();
    const supabase = createClient();
    const [step, setStep] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    const [form, setForm] = useState<FormData>({
        // Informações
        ref_code: "", is_condo: false, condo_name: "", owner_id: "", responsible_broker: "",
        agent: "", type: "", subtype: "", profile: "", situation: "", construction_year: "",
        incorporation: "", solar_position: "", terrain: "", near_sea: false, recorded: false,
        deeded: false, corner: false, furnished: "",
        // Cômodos
        bedrooms: "", suites: "", bathrooms: "", garage: "", covered_garage: false,
        garage_box: false, tv_room: "", dining_room: "", living_room: "", restroom: "",
        service_area: "", kitchen: "", closet: "", office: "", service_dep: "", pantry: "",
        // Medidas
        built_area: "", built_unit: "m²", private_area: "", private_unit: "m²",
        total_area: "", total_unit: "m²",
        // Preço
        transaction: "Venda", sale_price: "", show_price: true, min_price: "",
        ptu_price: "", condo_fee: "", financing: false, partial_financing: false,
        total_monthly: "", taxes_desc: "", accepts_exchange: false,
        exchange_type: "", max_exchange: "", exchange_notes: "",
        // Características
        imovel_features: [] as string[], condo_features: [] as string[],
        // Localização
        cep: "", country: "Brasil", state: "", city: "", neighborhood: "", zone: "",
        address: "", number: "", complement: "", unit_id: "", floor: "",
        units_per_floor: "", total_floors: "", total_towers: "",
        show_floor: false, show_unit: false, show_address: true,
        // Proximidades
        proximidades: [] as string[],
        // Descrição
        page_title: "", description: "",
        // Complementos
        video_url: "", tour_360_url: "",
        // Dados privativos
        combined_commission: false, negotiation_notes: "",
        registration: "", rural_tax: "", property_inscription: "",
        occupation_notes: "", private_notes: "",
        // Publicação
        show_on_site: true, show_on_home: true, badge_text: "Em construção", badge_color: "#000000",
        crm_funnel: true, notify_owner: false,
    });

    const set = (name: string, value: any) => setForm(prev => ({ ...prev, [name]: value }));
    const toggleFeature = (key: "imovel_features" | "condo_features" | "proximidades", item: string) =>
        setForm(prev => {
            const arr: string[] = prev[key];
            return { ...prev, [key]: arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item] };
        });

    const handleSaveAndNext = async () => {
        if (step < STEPS.length - 1) {
            setStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        // Final step — save to DB
        setIsSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { toast.error("Sessão expirada. Faça login novamente."); return; }

            const payload = {
                owner_id: user.id,
                title: form.page_title || `Imóvel ${form.type} - ${form.neighborhood || form.city}`,
                type: form.type?.toLowerCase() || "outros",
                status: form.show_on_site ? "available" : "draft",
                description: form.description,
                bedrooms: parseInt(form.bedrooms) || 0,
                bathrooms: parseInt(form.bathrooms) || 0,
                suites: parseInt(form.suites) || 0,
                parking_spaces: parseInt(form.garage) || 0,
                area_useful: parseFloat(form.private_area) || 0,
                area_total: parseFloat(form.total_area) || 0,
                price_sale: parseFloat(form.sale_price?.replace(/\D/g, "")) || 0,
                price_rent: 0,
                condominium: parseFloat(form.condo_fee?.replace(/\D/g, "")) || 0,
                iptu: parseFloat(form.ptu_price?.replace(/\D/g, "")) || 0,
                accepts_financing: form.financing,
                zip_code: form.cep,
                address: form.address,
                address_number: form.number,
                neighborhood: form.neighborhood,
                city: form.city,
                state: form.state,
                hide_address: !form.show_address,
                video_url: form.video_url,
                tour_360_url: form.tour_360_url,
                features: JSON.stringify(form.imovel_features),
                condo_features: JSON.stringify(form.condo_features),
                internal_notes: form.private_notes,
            };

            const { error } = await supabase.from("properties").insert(payload);
            if (error) throw error;

            toast.success("Imóvel cadastrado com sucesso!");
            router.push("/painel/imoveis");
        } catch (e: any) {
            toast.error(e.message || "Erro ao salvar imóvel.");
        } finally {
            setIsSaving(false);
        }
    };

    const sectionTitle = (title: string, subtitle?: string) => (
        <div className="mb-6">
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">{title}</h2>
            {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
    );

    const renderStep = () => {
        switch (step) {
            /* ─── 0: INFORMAÇÕES ─── */
            case 0: return (
                <div className="space-y-6">
                    {sectionTitle("Informações iniciais", "Defina as informações com precisão para os seus clientes.")}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FieldInput label="Código de referência *" name="ref_code" placeholder="101" value={form.ref_code} onChange={set} />
                            <YesNo label="Condomínio/empreendimento?" value={form.is_condo} onChange={v => set("is_condo", v)} />
                            {form.is_condo && (
                                <FieldSelect label="Condomínio/empreendimento *" name="condo_name"
                                    options={["Selecione o empreendimento"]} value={form.condo_name} onChange={set} />
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FieldSelect label="Proprietário * (privado)" name="owner_id" options={["Selecione o proprietário"]} value={form.owner_id} onChange={set} />
                            <FieldSelect label="Corretor Responsável *" name="responsible_broker" options={["Ricieri Moraes"]} value={form.responsible_broker} onChange={set} />
                            <FieldSelect label="Agenciador" name="agent" options={["Selecione"]} value={form.agent} onChange={set} />
                            <FieldSelect label="Tipo/Subtipo *" name="type"
                                options={["Apartamento","Casa","Cobertura","Terreno","Sala Comercial","Galpão","Fazenda","Sítio","Chácara"]}
                                value={form.type} onChange={set} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FieldSelect label="Perfil do imóvel *" name="profile"
                                options={["Residencial","Comercial","Rural","Industrial"]} value={form.profile} onChange={set} />
                            <FieldSelect label="Situação *" name="situation"
                                options={["Disponível","Vendido","Alugado","Em construção","Na planta","Suspenso"]}
                                value={form.situation} onChange={set} />
                            <FieldInput label="Ano da construção" name="construction_year" placeholder="Ex: 2015" value={form.construction_year} onChange={set} />
                            <FieldInput label="Incorporação" name="incorporation" placeholder="Digite o número" value={form.incorporation} onChange={set} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <FieldSelect label="Posição solar" name="solar_position"
                                options={["Selecione","Norte","Sul","Leste","Oeste","Nordeste","Noroeste","Sudeste","Sudoeste"]}
                                value={form.solar_position} onChange={set} />
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Terreno</label>
                                <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                                    {["Plano","Aclive","Declive"].map(t => (
                                        <button key={t} type="button"
                                            onClick={() => set("terrain", t)}
                                            className={`flex-1 py-2 text-xs font-bold transition-colors ${form.terrain === t ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-800 text-slate-600"}`}
                                        >{t}</button>
                                    ))}
                                </div>
                            </div>
                            <FieldSelect label="Próximo ao mar?" name="near_sea_select"
                                options={["Selecione","Frente mar","2 quadras","3 quadras","4+ quadras"]}
                                value={form.near_sea_select || ""} onChange={set} />
                            <YesNo label="Averbado" value={form.recorded} onChange={v => set("recorded", v)} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <YesNo label="Escriturado" value={form.deeded} onChange={v => set("deeded", v)} />
                            <YesNo label="Esquina" value={form.corner} onChange={v => set("corner", v)} />
                            <FieldSelect label="Mobília" name="furnished"
                                options={["Selecione","Sem mobília","Semi mobiliado","Mobiliado","Alto padrão"]}
                                value={form.furnished} onChange={set} />
                        </div>
                    </div>
                </div>
            );

            /* ─── 1: CÔMODOS ─── */
            case 1: return (
                <div className="space-y-6">
                    {sectionTitle("Cômodos", "Defina as quantidades de cada cômodo deste imóvel.")}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <FieldInput label="Dormitório" name="bedrooms" placeholder="Digite..." value={form.bedrooms} onChange={set} type="number" />
                            <FieldInput label="Sendo suite" name="suites" placeholder="Digite..." value={form.suites} onChange={set} type="number" />
                            <FieldInput label="Banheiro" name="bathrooms" placeholder="Digite..." value={form.bathrooms} onChange={set} type="number" />
                            <FieldInput label="Garagem" name="garage" placeholder="Digite..." value={form.garage} onChange={set} type="number" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <YesNo label="Garagem coberta?" value={form.covered_garage} onChange={v => set("covered_garage", v)} />
                            <YesNo label="Possui box na garagem?" value={form.garage_box} onChange={v => set("garage_box", v)} />
                            <FieldInput label="Sala de TV" name="tv_room" placeholder="Digite..." value={form.tv_room} onChange={set} type="number" />
                            <FieldInput label="Sala de jantar" name="dining_room" placeholder="Digite..." value={form.dining_room} onChange={set} type="number" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <FieldInput label="Sala de estar" name="living_room" placeholder="Digite..." value={form.living_room} onChange={set} type="number" />
                            <FieldInput label="Lavabo" name="restroom" placeholder="Digite..." value={form.restroom} onChange={set} type="number" />
                            <FieldInput label="Área de serviço" name="service_area" placeholder="Digite..." value={form.service_area} onChange={set} type="number" />
                            <FieldInput label="Cozinha" name="kitchen" placeholder="Digite..." value={form.kitchen} onChange={set} type="number" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <FieldInput label="Closet" name="closet" placeholder="Digite..." value={form.closet} onChange={set} type="number" />
                            <FieldInput label="Escritório" name="office" placeholder="Digite..." value={form.office} onChange={set} type="number" />
                            <FieldInput label="Dependência de serviço" name="service_dep" placeholder="Digite..." value={form.service_dep} onChange={set} type="number" />
                            <FieldInput label="Copa" name="pantry" placeholder="Digite..." value={form.pantry} onChange={set} type="number" />
                        </div>
                    </div>
                </div>
            );

            /* ─── 2: MEDIDAS ─── */
            case 2: return (
                <div className="space-y-6">
                    {sectionTitle("Medidas", "Defina as medidas deste imóvel.")}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: "Área Construída", name: "built_area", unit: "built_unit" },
                                { label: "Área Privativa", name: "private_area", unit: "private_unit" },
                                { label: "Área Total", name: "total_area", unit: "total_unit" },
                            ].map(f => (
                                <div key={f.name}>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{f.label}</label>
                                    <div className="flex">
                                        <input
                                            type="number"
                                            value={form[f.name]}
                                            onChange={e => set(f.name, e.target.value)}
                                            placeholder="Digite..."
                                            className="flex-1 bg-white dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <select
                                            value={form[f.unit]}
                                            onChange={e => set(f.unit, e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-r-lg px-3 text-sm outline-none"
                                        >
                                            <option>m²</option><option>ha</option><option>alq</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

            /* ─── 3: PREÇO ─── */
            case 3: return (
                <div className="space-y-6">
                    {sectionTitle("Preço", "Defina o preço deste imóvel e todas as informações importantes para os seus clientes.")}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Tipo de negócio</label>
                                <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                                    {["Venda","Aluguel","Temporada"].map(t => (
                                        <button key={t} type="button"
                                            onClick={() => set("transaction", t)}
                                            className={`flex-1 py-2 text-xs font-bold transition-colors ${form.transaction === t ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-800 text-slate-600"}`}
                                        >{t}</button>
                                    ))}
                                </div>
                            </div>
                            <FieldInput label="Preço do Imóvel *" name="sale_price" placeholder="R$0,00" value={form.sale_price} onChange={set} />
                            <YesNo label="Mostrar preço no site?" value={form.show_price} onChange={v => set("show_price", v)} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <FieldInput label="Valor mínimo" name="min_price" placeholder="Digite..." value={form.min_price} onChange={set} />
                            <FieldInput label="Preço de PTU" name="ptu_price" placeholder="Digite o ano" value={form.ptu_price} onChange={set} />
                            <FieldInput label="Preço Condomínio" name="condo_fee" placeholder="Digite..." value={form.condo_fee} onChange={set} />
                            <YesNo label="Este financiamento" value={form.financing} onChange={v => set("financing", v)} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <YesNo label="Aceita Financiamento?" value={form.financing} onChange={v => set("financing", v)} />
                            <YesNo label="Aceita Financiamento Parcial?" value={form.partial_financing} onChange={v => set("partial_financing", v)} />
                            <FieldInput label="Total mensal em taxas/hora" name="total_monthly" placeholder="Descrição here..." value={form.total_monthly} onChange={set} />
                            <FieldInput label="Descrição das Taxas" name="taxes_desc" placeholder="Descrição here..." value={form.taxes_desc} onChange={set} />
                        </div>
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                            <YesNo label="Aceita permuta?" value={form.accepts_exchange} onChange={v => set("accepts_exchange", v)} />
                            {form.accepts_exchange && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <FieldInput label="Tipo de imóvel aceito" name="exchange_type" placeholder="Digite..." value={form.exchange_type} onChange={set} />
                                    <FieldInput label="Valor máximo da permuta" name="max_exchange" placeholder="Digite o valor..." value={form.max_exchange} onChange={set} />
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Dados da Permuta</label>
                                        <textarea
                                            value={form.exchange_notes}
                                            onChange={e => set("exchange_notes", e.target.value)}
                                            placeholder="Descrição da Permuta"
                                            rows={2}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );

            /* ─── 4: CARACTERÍSTICAS DO IMÓVEL ─── */
            case 4: return (
                <div className="space-y-6">
                    {sectionTitle("Características do Imóvel", "Defina todas as características deste imóvel.")}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-slate-500">{form.imovel_features.length} selecionadas</span>
                            <button type="button" className="flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors">
                                <Plus className="w-3.5 h-3.5" /> Nova característica
                            </button>
                        </div>
                        <CheckGrid items={IMOVEL_FEATURES} checked={form.imovel_features} onToggle={item => toggleFeature("imovel_features", item)} />
                    </div>
                </div>
            );

            /* ─── 5: CARACTERÍSTICAS DO CONDOMÍNIO ─── */
            case 5: return (
                <div className="space-y-6">
                    {sectionTitle("Características do condomínio/empreendimento", "Defina as características deste condomínio/empreendimento.")}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-slate-500">{form.condo_features.length} selecionadas</span>
                            <button type="button" className="flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors">
                                <Plus className="w-3.5 h-3.5" /> Nova característica
                            </button>
                        </div>
                        <CheckGrid items={CONDO_FEATURES} checked={form.condo_features} onToggle={item => toggleFeature("condo_features", item)} />
                    </div>
                </div>
            );

            /* ─── 6: LOCALIZAÇÃO ─── */
            case 6: return (
                <div className="space-y-6">
                    {sectionTitle("Localização", "Adicione a localização deste imóvel e defina o que será mostrado ou não em seu site.")}
                    <div className="flex gap-2 mb-2">
                        {["+ Nova cidade","+ Novo bairro","+ Nova zona"].map(b => (
                            <button key={b} type="button" className="text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 px-4 py-1.5 rounded-lg transition-colors">{b}</button>
                        ))}
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4">
                        <div className="flex gap-3 max-w-sm">
                            <FieldInput label="CEP" name="cep" placeholder="Digite..." value={form.cep} onChange={set} />
                            <button type="button" className="self-end bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors flex items-center gap-2">
                                <Search className="w-4 h-4" /> Buscar
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            <FieldSelect label="País" name="country" options={["Brasil","Argentina","Portugal"]} value={form.country} onChange={set} />
                            <FieldSelect label="Estado" name="state" options={["SP","RJ","MG","SC","RS","PR","BA","GO"]} value={form.state} onChange={set} />
                            <FieldSelect label="Cidade" name="city" options={[form.city].filter(Boolean)} value={form.city} onChange={set} />
                            <FieldSelect label="Bairro" name="neighborhood" options={[form.neighborhood].filter(Boolean)} value={form.neighborhood} onChange={set} />
                            <FieldSelect label="Zona" name="zone" options={[form.zone].filter(Boolean)} value={form.zone} onChange={set} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FieldInput label="Logradouro" name="address" placeholder="Digite..." value={form.address} onChange={set} />
                            <FieldInput label="Número" name="number" placeholder="Digite..." value={form.number} onChange={set} />
                            <FieldInput label="Complemento" name="complement" placeholder="Digite..." value={form.complement} onChange={set} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            <FieldInput label="Nº ou identificação da Unidade" name="unit_id" placeholder="Digite..." value={form.unit_id} onChange={set} />
                            <FieldInput label="Andar" name="floor" placeholder="Digite..." value={form.floor} onChange={set} type="number" />
                            <FieldInput label="Unidades por andar" name="units_per_floor" placeholder="Digite..." value={form.units_per_floor} onChange={set} type="number" />
                            <FieldInput label="Total de andares" name="total_floors" placeholder="Digite..." value={form.total_floors} onChange={set} type="number" />
                            <FieldInput label="Total de torres" name="total_towers" placeholder="Digite..." value={form.total_towers} onChange={set} type="number" />
                        </div>
                        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                            {[
                                { label: "Mostrar andar do apartamento", key: "show_floor" },
                                { label: "Mostrar o número da unidade", key: "show_unit" },
                                { label: "Mostrar Logradouro no site?", key: "show_address" },
                            ].map(({ label, key }) => (
                                <div key={key} className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800">
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>
                                    <YesNo label="" value={form[key]} onChange={v => set(key, v)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

            /* ─── 7: PROXIMIDADES ─── */
            case 7: return (
                <div className="space-y-6">
                    {sectionTitle("Proximidades", "Defina os estabelecimentos próximos a este imóvel.")}
                    <div className="flex gap-2 mb-2">
                        <button type="button" className="text-xs font-bold text-white bg-slate-900 hover:bg-slate-700 px-4 py-1.5 rounded-lg transition-colors">Gerenciar</button>
                        <button type="button" className="text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 px-4 py-1.5 rounded-lg transition-colors">+ Adicionar estabelecimento</button>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                        <CheckGrid items={PROXIMIDADES} checked={form.proximidades} onToggle={item => toggleFeature("proximidades", item)} />
                    </div>
                </div>
            );

            /* ─── 8: DESCRIÇÃO ─── */
            case 8: return (
                <div className="space-y-6">
                    {sectionTitle("Descrição", "Descreva o imóvel com as melhores informações possíveis para atrair o seu cliente.")}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <FieldInput label="Título da página de detalhamento do imóvel" name="page_title" placeholder="Apartamento Padrão" value={form.page_title} onChange={set} />
                            </div>
                            <div className="text-right pt-6">
                                <button type="button" className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors opacity-50 cursor-not-allowed" disabled>
                                    ✦ Gerar descrição
                                </button>
                                <p className="text-[10px] text-slate-400 mt-1">Em breve</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Texto de apresentação do imóvel</label>
                            <textarea
                                value={form.description}
                                onChange={e => set("description", e.target.value)}
                                rows={7}
                                placeholder="As informações estão sujeitas a alterações. Consulte o corretor responsável."
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>
                    </div>
                </div>
            );

            /* ─── 9: COMPLEMENTOS ─── */
            case 9: return (
                <div className="space-y-6">
                    {sectionTitle("Complementos", "Configure dados complementares do seu imóvel.")}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-6">
                        <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Vídeo do imóvel</h4>
                                    <p className="text-xs text-slate-500">Adicione um vídeo deste imóvel para dar ainda mais informações para este cliente.</p>
                                </div>
                                <button type="button" className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors">🗑 Remover vídeo</button>
                            </div>
                            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400">Insira a URL de um vídeo do Youtube</label>
                            <input
                                type="url"
                                value={form.video_url}
                                onChange={e => set("video_url", e.target.value)}
                                placeholder="Exemplo: https://www.youtube.com/watch?v=t3217H8Jppl"
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200">360°</h4>
                                    <p className="text-xs text-slate-500">Uma apresentação em 360° leva o cliente para conhecer melhor o imóvel sem sair de onde está.</p>
                                </div>
                                <button type="button" className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors">🗑 Remover 360°</button>
                            </div>
                            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400">Insira a URL 360° do seu imóvel</label>
                            <input
                                type="url"
                                value={form.tour_360_url}
                                onChange={e => set("tour_360_url", e.target.value)}
                                placeholder="Exemplo: https://roundme.com/tour/000000/view/000000/"
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            );

            /* ─── 10: DADOS PRIVATIVOS ─── */
            case 10: return (
                <div className="space-y-6">
                    {sectionTitle("Dados privativos", "Todas as informações abaixo não são mostradas em seu site.")}
                    <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-6 space-y-6">
                        <div>
                            <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-3">FINANCEIRO</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <YesNo label="Comissão Combinada" value={form.combined_commission} onChange={v => set("combined_commission", v)} />
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Observação sobre a negociação</label>
                                    <textarea
                                        value={form.negotiation_notes}
                                        onChange={e => set("negotiation_notes", e.target.value)}
                                        placeholder="Digite a observação"
                                        rows={3}
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-amber-200 dark:border-amber-900/30">
                            <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-3">IMÓVEL</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FieldInput label="Matrícula" name="registration" placeholder="Digite o número" value={form.registration} onChange={set} />
                                <FieldInput label="Imposto Territorial Rural" name="rural_tax" placeholder="Digite..." value={form.rural_tax} onChange={set} />
                                <FieldInput label="Inscrição Imobiliária" name="property_inscription" placeholder="Digite..." value={form.property_inscription} onChange={set} />
                            </div>
                        </div>
                        <div className="pt-4 border-t border-amber-200 dark:border-amber-900/30">
                            <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-3">OBSERVAÇÕES</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Dados sobre ocupação/desocupação</label>
                                    <textarea value={form.occupation_notes} onChange={e => set("occupation_notes", e.target.value)} placeholder="Digite a observação" rows={3} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Observação privada sobre o imóvel</label>
                                    <textarea value={form.private_notes} onChange={e => set("private_notes", e.target.value)} placeholder="Digite a observação" rows={3} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

            /* ─── 11: IMAGENS ─── */
            case 11: return (
                <div className="space-y-6">
                    {sectionTitle("Imagens", "Envie todas as imagens que mostrem as qualidades do imóvel.")}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex gap-4">
                                {["FOTOS DO IMÓVEL","FOTOS PLANTAS","FOTOS PRIVADAS"].map(t => (
                                    <button key={t} type="button" className="text-xs font-black text-blue-600 border-b-2 border-blue-600 pb-1 uppercase tracking-wider">{t}</button>
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-slate-500">Aplicar marca d&apos;água?</span>
                                <YesNo label="" value={form.watermark} onChange={v => set("watermark", v)} />
                            </div>
                        </div>
                        <div className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                            <div className="w-16 h-16 text-blue-400 mb-3">
                                <svg viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="4" fill="#eff6ff"/><path d="M22 42l8-16 7 11 5-7 8 12H22z" fill="#60a5fa" opacity=".4"/><circle cx="44" cy="26" r="4" fill="#60a5fa"/></svg>
                            </div>
                            <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">Você ainda não enviou nenhuma foto.</p>
                            <p className="text-sm text-slate-400 mb-4">Que tal enviar agora?</p>
                            <button type="button" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors">
                                <Upload className="w-4 h-4" /> + Enviar fotos
                            </button>
                        </div>
                    </div>
                </div>
            );

            /* ─── 12: PUBLICAÇÃO ─── */
            case 12: return (
                <div className="space-y-6">
                    {sectionTitle("Publicação", "Selecione abaixo para quais portais você deseja enviar este imóvel.")}
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4">
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-semibold text-slate-700 dark:text-slate-300">Mostrar imóvel no site?</p>
                                    <p className="text-xs text-slate-500">Determine se o imóvel será publicado em seu site.</p>
                                </div>
                                <YesNo label="" value={form.show_on_site} onChange={v => set("show_on_site", v)} />
                            </div>
                            <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="font-semibold text-slate-700 dark:text-slate-300">Mostrar na Página Inicial do site?</p>
                                    <p className="text-xs text-slate-500">Defina se esse imóvel aparecerá na sessão de &quot;Imóveis em destaque&quot; na página inicial do seu site.</p>
                                </div>
                                <YesNo label="" value={form.show_on_home} onChange={v => set("show_on_home", v)} />
                            </div>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <div>
                                    <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Tarja do imóvel para o site</p>
                                    <p className="text-xs text-slate-500 mb-3">Escolha a cor e a frase que aparecerão na miniatura do imóvel.</p>
                                    <div className="space-y-2">
                                        <FieldInput label="Texto da tarja" name="badge_text" value={form.badge_text} onChange={set} />
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cor da tarja</label>
                                            <input type="color" value={form.badge_color} onChange={e => set("badge_color", e.target.value)} className="h-9 w-20 cursor-pointer rounded border border-slate-200" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden aspect-video relative flex items-end">
                                    <div className="absolute top-2 left-2 text-white text-xs font-black px-3 py-1 rounded" style={{ backgroundColor: form.badge_color }}>
                                        {form.badge_text || "Em construção"}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-3">
                            <p className="font-bold text-slate-700 dark:text-slate-300">Funil do CRM</p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-500">Contatos recebidos neste imóvel serão direcionados para o funil e etapa padrão da transação?</p>
                                <YesNo label="" value={form.crm_funnel} onChange={v => set("crm_funnel", v)} />
                            </div>
                            <p className="font-bold text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">Relacionado ao proprietário</p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-500">Enviar link da publicação do imóvel para o proprietário? Avisa o cliente que o imóvel acabou de ser publicado.</p>
                                <YesNo label="" value={form.notify_owner} onChange={v => set("notify_owner", v)} />
                            </div>
                        </div>
                    </div>
                </div>
            );

            default: return null;
        }
    };

    return (
        <div className="flex gap-0 bg-white dark:bg-slate-900 min-h-screen">
            {/* Left sidebar */}
            <aside className="w-56 shrink-0 border-r border-slate-200 dark:border-slate-700 sticky top-0 self-start max-h-screen overflow-y-auto bg-white dark:bg-slate-900">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-wider">Passo a passo:</p>
                </div>
                <nav className="py-2">
                    {STEPS.map((s, i) => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => i <= step && setStep(i)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${
                                i === step
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold border-r-2 border-blue-600"
                                    : i < step
                                    ? "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
                                    : "text-slate-400 dark:text-slate-600 font-medium cursor-default"
                            }`}
                        >
                            <span className={`w-2 h-2 rounded-full shrink-0 ${
                                i === step ? "bg-blue-600" : i < step ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
                            }`} />
                            {s.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950">
                <div className="flex-1 p-8 max-w-5xl">
                    {renderStep()}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-8 py-4 flex items-center justify-between">
                    <Link href="/painel/imoveis" className="text-sm font-bold text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                        Cancelar
                    </Link>
                    <button
                        type="button"
                        onClick={handleSaveAndNext}
                        disabled={isSaving}
                        className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-70 text-white font-bold px-8 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors shadow-sm shadow-emerald-500/20"
                    >
                        {isSaving ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : null}
                        {step < STEPS.length - 1 ? "Salvar e Próximo" : "Publicar Imóvel"}
                    </button>
                </div>
            </div>
        </div>
    );
}
