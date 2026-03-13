"use client";

import { useState } from "react";
import { Save, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export function LgpdConfig({ settings, updateSettings }: { settings: any, updateSettings: (key: string, value: any) => void }) {
    const lgpd = settings?.lgpd || {};
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        cookie_banner: lgpd.cookie_banner !== false,
        form_agreement: lgpd.form_agreement !== false,
        policy_text: lgpd.policy_text || `Em atenção a LGPD, foram tomadas todas as medidas cabíveis em respeito à sua privacidade com relação às informações e proteção de dados coletadas neste site.

As informações armazenadas são: Nome, Telefone, E-mail, dados sobre o tipo/perfil de imóvel procurado e páginas visitadas nesse site.

Com relação a Cookies de terceiros serão coletadas: informações sobre o tempo de acesso no site, páginas visitadas e demais informações relevantes do Google Analytics. Dados para re-marketing em ferramentas externas, como por exemplo o serviço oferecido pelo Facebook (Meta). (Para maiores informações sobre os cookies dos serviços de terceiros, acesse o site do Google Analytics e Facebook).

Este site possui o fim de coletar informações para:
- Criar seu cadastro como lead;
- Localizar imóveis compatíveis, baseados no tipo de imóvel ideal para você;
- Determinar os imóveis mais atraentes para o público;
- Criação, divulgação e envio de conteúdos relevantes;

Não são compartilhadas informações pessoais de forma pública ou com terceiros (exceto em serviços com finalidade comercial no ramo imobiliário), ou quando a lei exigir.

As informações recebidas serão solicitadas no menu "Contato", nos Formulários de Contato dos Imóveis, no menu "Negocie seu Imóvel", no formulário de contato da galeria de imagens, no formulário do pop-up e em eventuais menus criados.

Todas as informações serão previamente solicitadas a você, não tendo captura de nenhuma informação pessoal de maneira automática.

Você pode não aceitar o envio das informações, porém alguns serviços desejados não serão concluídos sem que estas informações sejam recebidas.`
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setLoading(true);
        updateSettings("lgpd", formData);
        setTimeout(() => setLoading(false), 500);
        toast.success("Configurações LGPD salvas!");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">LGPD</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Configurações padrão e textos sobre LGPD
                </p>
            </div>

            <div className="bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-900/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-red-800 dark:text-red-300 text-sm mb-1">LEI Nº 13.709, DE 14 DE AGOSTO DE 2018</h4>
                        <p className="text-xs text-red-700 dark:text-red-400 leading-relaxed">
                            As opções abaixo tratam sobre as determinações da Lei Geral de Proteção de Dados Pessoais (LGPD). Recomendamos que permaneçam ativadas para evitar eventuais sansões pelos órgãos públicos competentes (União, Estados, Distrito Federal e Municípios).
                        </p>
                        <a href="http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noreferrer" className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline mt-2 inline-block">
                            Saiba mais em: http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
                        </a>
                        <p className="text-xs font-bold text-red-800 dark:text-red-300 mt-2">
                            A desativação de qualquer uma das opções é de total responsabilidade do usuário.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                    <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Informação ao cliente</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ao acessar o site, mostrar no rodapé o aviso que o site utiliza COOKIES para registro de navegação?</p>
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                        <button onClick={() => handleInputChange("cookie_banner", true)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.cookie_banner ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                        <button onClick={() => handleInputChange("cookie_banner", false)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${!formData.cookie_banner ? "bg-red-500 text-white" : "text-slate-500"}`}>Não</button>
                    </div>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                    <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Obrigatório nos formulários</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Nos formulários de contato, mostrar e obrigar a marcação de concordância com sua POLÍTICA DE PRIVACIDADE?</p>
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg shrink-0">
                        <button onClick={() => handleInputChange("form_agreement", true)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${formData.form_agreement ? "bg-emerald-500 text-white" : "text-slate-500"}`}>Sim</button>
                        <button onClick={() => handleInputChange("form_agreement", false)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${!formData.form_agreement ? "bg-red-500 text-white" : "text-slate-500"}`}>Não</button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Texto sobre política de privacidade</h5>
                    <textarea 
                        value={formData.policy_text}
                        onChange={(e) => handleInputChange("policy_text", e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-xs leading-relaxed outline-none focus:border-emerald-500 min-h-[400px] resize-y"
                    />
                </div>

            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
                <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    Salvar
                </button>
            </div>
        </div>
    );
}
