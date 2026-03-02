"use client";

import { MessageCircle, Send, CheckCircle2, MessageSquare, ListTodo, BotMessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DisparadorPage() {
    const [activeTab, setActiveTab] = useState<'disparador' | 'massa' | 'mensagens' | 'templates'>('disparador');

    const templates = [
        { id: 'ia_atende', status: 'Aprovado', ctg: 'MARKETING', lang: 'pt_PT' },
        { id: 'vendas', status: 'Aprovado', ctg: 'MARKETING', lang: 'pt_BR' },
        { id: 'divulgacao_imovel_01', status: 'Aprovado', ctg: 'MARKETING', lang: 'pt_BR' },
        { id: 'foto_texto', status: 'Aprovado', ctg: 'MARKETING', lang: 'pt_BR' },
    ];

    return (
        <div className="flex-1 flex flex-col w-full max-w-6xl">
            {/* Cabecalho */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 border-b border-transparent">WhatsApp Business API</h1>
                <p className="text-slate-600 mt-1">Gerencie seus leads e envie mensagens em lote pela Cloud API Oficial da Meta.</p>
            </div>

            {/* Tabs estilo sub-menu */}
            <div className="flex flex-wrap gap-2 mb-8 bg-slate-50/50 border border-slate-200 p-1.5 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('disparador')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'disparador' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Disparador
                </button>
                <button
                    onClick={() => setActiveTab('massa')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'massa' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Envio em Massa
                </button>
                <button
                    onClick={() => setActiveTab('mensagens')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'mensagens' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Mensagens
                </button>
                <button
                    onClick={() => setActiveTab('templates')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'templates' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Templates
                </button>
            </div>

            {/* Content Body */}
            {activeTab === 'disparador' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-bold text-slate-800">Disparador Individual</h2>
                            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                0 / 100 disparos
                            </div>
                        </div>
                        <p className="text-sm text-slate-500">Envie mensagens HSN para seus leads usando templates pré-aprovados pela Meta.</p>
                    </div>

                    {/* Section: Templates */}
                    <div className="bg-white border text-left border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-end mb-6">
                            <h3 className="text-base font-bold text-slate-800">Templates Aprovados</h3>
                            <span className="text-xs text-slate-400 font-semibold">{templates.length} disponíveis (Meta Graph)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {templates.map((tpl) => (
                                <div key={tpl.id} className="border border-slate-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all bg-white relative group min-h-[140px] flex flex-col">
                                    <h4 className="font-bold text-slate-700 mb-3">{tpl.id}</h4>

                                    <div className="mt-auto space-y-2">
                                        <span className="bg-green-100/50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[10px] font-bold inline-block font-mono">
                                            {tpl.lang}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2">
                                            <span className="text-slate-400">Status:</span>
                                            <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Aprovado</span>
                                        </div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold pt-1">
                                            {tpl.ctg}
                                        </div>
                                    </div>

                                    {/* Botão Hover Substituto (Call to Action invisível) */}
                                    <div className="absolute inset-0 bg-blue-600/5 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                        <span className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">Usar Template</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section: Emular Formulario Whatsapp */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                        <div className="p-6 md:w-1/3 bg-slate-50 border-r border-slate-200">
                            <h3 className="text-base font-bold text-slate-800 mb-2">Enviar Mensagem</h3>
                            <p className="text-xs text-slate-500 mb-6">Selecione o lead CRM que receberá o template dinâmico.</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Telefone / Lead</label>
                                    <input type="text" className="w-full text-sm border-slate-300 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10" placeholder="+55 11 9..." />
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled>
                                    <Send className="w-4 h-4 mr-2" /> Disparar (Via Meta API)
                                </Button>
                            </div>
                        </div>

                        <div className="p-6 md:w-2/3 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                            {/* Fundo do Whats estilizado */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png")', backgroundSize: '400px' }}></div>

                            <div className="bg-[#E7FFDB] rounded-lg p-3 max-w-sm rounded-tr-none shadow-sm relative z-10 border border-[#b2e1a3]">
                                <p className="text-sm text-slate-800 mb-2 whitespace-pre-line leading-snug">
                                    Olá! Tudo bem? {'\n'}Sou corretor da agência e vi que você simulou interesse no condomínio. {'\n\n'}Gostaria de agendar uma visita?
                                </p>
                                <div className="flex justify-end items-center gap-1 opacity-60">
                                    <span className="text-[10px] text-slate-500">14:48</span>
                                    <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab !== 'disparador' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white border border-slate-200 rounded-xl p-16 text-center shadow-sm max-w-3xl">
                    <BotMessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Integração Externa Necessária</h3>
                    <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                        Para ativar esta funcionalidade, você precisará cadastrar a Imobiliária no painel <strong className="text-slate-700">Meta for Developers</strong> e inserir o Token Permanente JWT no seu `.env.local`
                    </p>
                    <Button variant="outline" className="text-slate-600">Ver documentação oficial Meta</Button>
                </div>
            )}
        </div>
    );
}
