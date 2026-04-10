"use client";

import { useState } from "react";
import { 
    Contact, Globe, Phone, Calendar, MessageSquare, Image as ImageIcon, ShieldCheck, 
    Search, FileText, Repeat, Code, Wrench, Palette, Save, Upload, Plus 
} from "lucide-react";
import { toast } from "sonner"; // Assuming sonner

const SETTINGS_TABS = [
    { id: 'aparencia', label: 'Aparência', icon: Palette },
    { id: 'contato', label: 'Dados de contato', icon: Contact },
    { id: 'dominio', label: 'Domínio', icon: Globe },
    { id: 'whatsapp', label: 'Whatsapp', icon: Phone },
    { id: 'visitas', label: 'Agendar Visitas', icon: Calendar },
    { id: 'popup', label: 'Popup', icon: MessageSquare },
    { id: 'restricao', label: 'Restrição de fotos', icon: ImageIcon },
    { id: 'lgpd', label: 'LGPD', icon: ShieldCheck },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'formulario', label: 'Formulário de contato', icon: FileText },
    { id: 'rodizio', label: 'Rodízio de leads', icon: Repeat },
    { id: 'script', label: 'Injetar script', icon: Code },
    { id: 'manutencao', label: 'Manutenção', icon: Wrench },
];

export default function SiteSettingsClient() {
    const [activeTab, setActiveTab] = useState('aparencia');
    const [isSaving, setIsSaving] = useState(false);

    // State placeholders for specifically requested features
    const [manutencao, setManutencao] = useState({ ativo: false, titulo: 'Site em manutenção', subtitulo: '', observacao: '' });
    const [popup, setPopup] = useState({ gatilhoSegundos: 5, mostrarFrequencia: false });
    const [rodizioVenda, setRodizioVenda] = useState({ novosClientes: 'responsavel', conhecidos: 'responsavel_cliente' });
    const [rodizioLocacao, setRodizioLocacao] = useState({ novosClientes: 'responsavel', conhecidos: 'responsavel_cliente' });
    const [aparencia, setAparencia] = useState({
        menuPosicao: 'cabecalho', 
        pesquisaDesktop: true,
        pesquisaMobile: true,
        marcaDagua: false,
        marcaDaguaCreci: '',
        cardFiltros: ['recentes']
    });

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Configurações salvas com sucesso!");
        }, 1200);
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 w-full relative">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm h-fit sticky top-24">
                <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200">Menu</h3>
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto max-h-[70vh]">
                    {SETTINGS_TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all text-left ${
                                    isActive 
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600" 
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 border-l-4 border-transparent"
                                }`}
                            >
                                <Icon className="w-4 h-4" /> {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm min-h-[500px]">
                
                {activeTab === 'aparencia' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Aparência do Site</h2>
                            <p className="text-sm text-slate-500 mb-6">Configure logotipos, marcas d'água e menus do seu site.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                                    <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-4">Logo Desktop</h4>
                                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg h-32 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                                        <Upload className="w-6 h-6 mb-2" />
                                        <span className="text-xs font-bold">Fazer upload</span>
                                    </div>
                                </div>
                                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                                    <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-4">Logo Mobile</h4>
                                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg h-32 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                                        <Upload className="w-6 h-6 mb-2" />
                                        <span className="text-xs font-bold">Fazer upload</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                    <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-3">Opções de Menu e Pesquisa</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase">Posição do Menu de Páginas</label>
                                            <select 
                                                className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                                                value={aparencia.menuPosicao}
                                                onChange={e => setAparencia({...aparencia, menuPosicao: e.target.value})}
                                            >
                                                <option value="cabecalho">No Cabeçalho Principal</option>
                                                <option value="rodape">Apenas no Rodapé</option>
                                                <option value="separado">Aba Separada (Barra Inferior)</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-4 mt-6">
                                            <label className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                                <input type="checkbox" checked={aparencia.pesquisaDesktop} onChange={e => setAparencia({...aparencia, pesquisaDesktop: e.target.checked})} className="rounded border-slate-300 text-blue-600" />
                                                Barra de Pesquisa (Desktop)
                                            </label>
                                            <label className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                                <input type="checkbox" checked={aparencia.pesquisaMobile} onChange={e => setAparencia({...aparencia, pesquisaMobile: e.target.checked})} className="rounded border-slate-300 text-blue-600" />
                                                Barra de Pesquisa (Mobile)
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                    <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-3">Cards de Imóveis e Filtros</h4>
                                    <p className="text-xs text-slate-500 mb-3">Defina as opções de filtro exibidas nos cards.</p>
                                    <div className="flex flex-wrap gap-3">
                                        {['recentes:Últimos cadastrados', 'atualizados:Últimos imóveis atualizados', 'asc:Menor para o maior preço', 'desc:Maior para o menor preço'].map(f => {
                                            const [val, label] = f.split(':');
                                            return (
                                                <label key={val} className="flex items-center gap-2 text-sm text-slate-700 font-medium bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg cursor-pointer">
                                                    <input type="checkbox" className="rounded border-slate-300 text-blue-600" defaultChecked />
                                                    {label}
                                                </label>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Marca d'água automática</h4>
                                            <p className="text-xs text-slate-500">Aplica sua logo e CRECI nas fotos dos imóveis automaticamente.</p>
                                        </div>
                                        <label className="flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={aparencia.marcaDagua} onChange={e => setAparencia({...aparencia, marcaDagua: e.target.checked})} />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                    {aparencia.marcaDagua && (
                                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex gap-4">
                                            <div className="flex-1">
                                                <label className="text-xs font-bold text-slate-500 uppercase">CRECI da Imobiliária (para a marca d'água)</label>
                                                <input type="text" placeholder="Ex: CRECI 12345-J" className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" value={aparencia.marcaDaguaCreci} onChange={e => setAparencia({...aparencia, marcaDaguaCreci: e.target.value})} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'popup' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800 dark:text-white">Pop-up</h2>
                                <p className="text-sm text-slate-600 mt-1">Adicione um pop-up em seu site para divulgar promoções, avisos ou qualquer informação que desejar.</p>
                            </div>
                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 text-sm rounded shadow-sm">
                                Desativar pop-up
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 flex flex-col items-center justify-center min-h-[300px]">
                                <h4 className="font-bold text-slate-700 text-sm mb-2 w-full text-left">Popup Desktop</h4>
                                <div className="border border-dashed border-slate-300 bg-white rounded-lg w-full flex-1 flex flex-col items-center justify-center text-center p-4">
                                    <p className="text-sm text-slate-600 font-medium">Recomendado:<br/>No máximo: 1200px de largura<br/>No máximo: 600px de altura</p>
                                    <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded">Enviar</button>
                                </div>
                            </div>
                            <div className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 flex flex-col items-center justify-center min-h-[300px]">
                                <h4 className="font-bold text-slate-700 text-sm mb-2 w-full text-left">Popup Mobile</h4>
                                <div className="border border-dashed border-slate-300 bg-white rounded-lg w-full flex-1 flex flex-col items-center justify-center text-center p-4">
                                    <p className="text-sm text-slate-600 font-medium">Recomendado:<br/>No máximo: 600px de largura</p>
                                    <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded">Enviar</button>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 pt-6 space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h4 className="font-bold text-slate-700 text-sm">Gatilho para ativar pop-up</h4>
                                    <p className="text-xs text-slate-500 mt-1">Escolha em que momento o pop-up deve ser ativado.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-700">
                                        <option>Depois de "X" segundos</option>
                                        <option>Ao tentar sair da página</option>
                                    </select>
                                    <div className="flex items-center">
                                        <input type="number" value={popup.gatilhoSegundos} onChange={e => setPopup({...popup, gatilhoSegundos: Number(e.target.value)})} className="w-16 border bg-white border-slate-200 rounded-l-lg px-3 py-2 text-center text-sm" />
                                        <span className="bg-slate-100 border border-slate-200 border-l-0 text-slate-600 text-sm px-3 py-2 rounded-r-lg">segundos</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                                <div>
                                    <h4 className="font-bold text-slate-700 text-sm">Mostrar pop-up com frequência?</h4>
                                    <p className="text-xs text-slate-500 mt-1">Permite exibir o pop-up novamente mesmo para usuários que já o visualizaram recentemente.</p>
                                </div>
                                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                                    <button onClick={() => setPopup({...popup, mostrarFrequencia: true})} className={`px-4 py-1.5 rounded-md text-sm font-bold ${popup.mostrarFrequencia ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>Sim</button>
                                    <button onClick={() => setPopup({...popup, mostrarFrequencia: false})} className={`px-4 py-1.5 rounded-md text-sm font-bold ${!popup.mostrarFrequencia ? 'bg-red-500 shadow text-white' : 'text-slate-500 hover:text-slate-700'}`}>Não</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'rodizio' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Site - Rodízio de leads (Meus imóveis)</h2>
                            <p className="text-sm text-slate-500 mt-1">Defina como distribuir os contatos recebidos.</p>
                        </div>
                        
                        <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden mt-6">
                            <div className="bg-slate-200/50 px-4 py-2 font-bold text-slate-700 text-sm border-b border-slate-200">Imóveis com transação de VENDA</div>
                            
                            <div className="p-4 border-b border-slate-200 space-y-2">
                                <p className="text-sm font-bold text-slate-800 mb-3">Novos clientes que fizerem contato através do site devem ser encaminhados para:</p>
                                {[
                                    {id: 'v_n_1', val: 'responsavel', label: 'Para o corretor responsável pelo imóvel contactado'},
                                    {id: 'v_n_2', val: 'especifico', label: 'Um corretor especifico'},
                                    {id: 'v_n_3', val: 'todos', label: 'Executar rodízio entre TODOS os corretores'},
                                    {id: 'v_n_4', val: 'selecionados', label: 'Executar rodízio entre corretores SELECIONADOS'},
                                ].map(opt => (
                                    <label key={opt.id} className="flex items-center gap-3 text-sm text-slate-700 font-medium cursor-pointer">
                                        <input type="radio" name="v_novos" checked={rodizioVenda.novosClientes === opt.val} onChange={() => setRodizioVenda({...rodizioVenda, novosClientes: opt.val})} className="text-blue-600 form-radio focus:ring-blue-500" />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                            <div className="p-4 space-y-2">
                                <p className="text-sm font-bold text-slate-800 mb-3">Contatos recebidos através do site, onde o cliente JÁ POSSUI corretor responsável, devem ser encaminhados para:</p>
                                {[
                                    {id: 'v_c_1', val: 'responsavel_cliente', label: 'Para o corretor responsável pelo cliente'},
                                    {id: 'v_c_2', val: 'responsavel_imovel', label: 'Para o corretor responsável pelo imóvel contactado'},
                                    {id: 'v_c_3', val: 'especifico', label: 'Um corretor especifico'},
                                ].map(opt => (
                                    <label key={opt.id} className="flex items-center gap-3 text-sm text-slate-700 font-medium cursor-pointer">
                                        <input type="radio" name="v_conhecidos" checked={rodizioVenda.conhecidos === opt.val} onChange={() => setRodizioVenda({...rodizioVenda, conhecidos: opt.val})} className="text-blue-600 form-radio focus:ring-blue-500" />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden mt-6">
                            <div className="bg-slate-200/50 px-4 py-2 font-bold text-slate-700 text-sm border-b border-slate-200">Imóveis com transação de LOCAÇÃO</div>
                            
                            <div className="p-4 border-b border-slate-200 space-y-2">
                                <p className="text-sm font-bold text-slate-800 mb-3">Novos clientes que fizerem contato através do site devem ser encaminhados para:</p>
                                {[
                                    {id: 'l_n_1', val: 'responsavel', label: 'Para o corretor responsável pelo imóvel contactado'},
                                    {id: 'l_n_2', val: 'especifico', label: 'Um corretor especifico'},
                                    {id: 'l_n_3', val: 'todos', label: 'Executar rodízio entre TODOS os corretores'},
                                    {id: 'l_n_4', val: 'selecionados', label: 'Executar rodízio entre corretores SELECIONADOS'},
                                ].map(opt => (
                                    <label key={opt.id} className="flex items-center gap-3 text-sm text-slate-700 font-medium cursor-pointer">
                                        <input type="radio" name="l_novos" checked={rodizioLocacao.novosClientes === opt.val} onChange={() => setRodizioLocacao({...rodizioLocacao, novosClientes: opt.val})} className="text-blue-600 form-radio focus:ring-blue-500" />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                            <div className="p-4 space-y-2">
                                <p className="text-sm font-bold text-slate-800 mb-3">Contatos recebidos através do site, onde o cliente JÁ POSSUI corretor responsável, devem ser encaminhados para:</p>
                                {[
                                    {id: 'l_c_1', val: 'responsavel_cliente', label: 'Para o corretor responsável pelo cliente'},
                                    {id: 'l_c_2', val: 'responsavel_imovel', label: 'Para o corretor responsável pelo imóvel contactado'},
                                    {id: 'l_c_3', val: 'especifico', label: 'Um corretor especifico'},
                                ].map(opt => (
                                    <label key={opt.id} className="flex items-center gap-3 text-sm text-slate-700 font-medium cursor-pointer">
                                        <input type="radio" name="l_conhecidos" checked={rodizioLocacao.conhecidos === opt.val} onChange={() => setRodizioLocacao({...rodizioLocacao, conhecidos: opt.val})} className="text-blue-600 form-radio focus:ring-blue-500" />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'manutencao' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Modo Manutenção</h2>
                            <p className="text-sm text-slate-500 mt-1">Coloque seu site em manutenção para preparações sistêmicas ou configurações de tema.</p>
                        </div>
                        
                        <div className="border border-slate-200 bg-white p-6 rounded-xl mt-6">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-100 pb-6 mb-6">
                                <div>
                                    <h4 className="font-bold text-slate-700 text-sm">Site em Manutenção</h4>
                                    <p className="text-xs text-slate-500 mt-1">Ao ativar, visitantes verão uma tela temporária.</p>
                                </div>
                                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                                    <button onClick={() => setManutencao({...manutencao, ativo: true})} className={`px-6 py-2 rounded-md text-sm font-bold ${manutencao.ativo ? 'bg-blue-600 shadow text-white' : 'text-slate-500 hover:text-slate-700'}`}>Sim</button>
                                    <button onClick={() => setManutencao({...manutencao, ativo: false})} className={`px-6 py-2 rounded-md text-sm font-bold ${!manutencao.ativo ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>Não</button>
                                </div>
                            </div>

                            {manutencao.ativo && (
                                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase">Texto site em manutenção</label>
                                        <input type="text" value={manutencao.titulo} onChange={e => setManutencao({...manutencao, titulo: e.target.value})} className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500" placeholder="Ex: Site em construção" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase">Digite o texto que será exibido no site, enquanto ele estiver em manutenção</label>
                                        <input type="text" value={manutencao.subtitulo} onChange={e => setManutencao({...manutencao, subtitulo: e.target.value})} className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-600 focus:ring-2 focus:ring-blue-500" placeholder="Ex: Estamos preparando novidades..." />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase">Observação / Informações adicionais</label>
                                        <textarea value={manutencao.observacao} onChange={e => setManutencao({...manutencao, observacao: e.target.value})} rows={4} className="w-full mt-1 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-600 focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Digite detalhes extras de contato..."></textarea>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Fallback for unselected tabs */}
                {!['aparencia', 'popup', 'rodizio', 'manutencao'].includes(activeTab) && (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                        <Wrench className="w-12 h-12 text-slate-300 mb-4" />
                        <h3 className="text-lg font-bold text-slate-700">Aba em Desenvolvimento</h3>
                        <p className="text-sm text-slate-500 mt-2 max-w-sm">Esta configuração será ativada na próxima atualização da plataforma.</p>
                    </div>
                )}

                {/* Save Footer Bar */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-wait shadow-sm"
                    >
                        {isSaving ? <LoaderSpinner /> : <Save className="w-4 h-4" />}
                        Salvar Configurações
                    </button>
                </div>

            </div>
        </div>
    );
}

const LoaderSpinner = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
)
