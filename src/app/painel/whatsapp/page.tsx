"use client";

import { MessageCircle, Send, CheckCircle2, MessageSquare, ListTodo, BotMessageSquare, Smartphone, QrCode, ServerCog, Wifi, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export default function WhatsappPage() {
    const [activeTab, setActiveTab] = useState<'conexao' | 'disparador' | 'massa' | 'mensagens' | 'templates'>('conexao');

    const templates = [
        { id: 'ia_atende', status: 'Aprovado', ctg: 'MARKETING', lang: 'pt_PT' },
        { id: 'vendas', status: 'Aprovado', ctg: 'MARKETING', lang: 'pt_BR' },
        { id: 'divulgacao_imovel_01', status: 'Aprovado', ctg: 'MARKETING', lang: 'pt_BR' },
        { id: 'foto_texto', status: 'Aprovado', ctg: 'MARKETING', lang: 'pt_BR' },
    ];

    return (
        <div className="flex-1 flex flex-col w-full max-w-6xl p-4 md:p-8">
            {/* Cabecalho */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white border-b border-transparent flex items-center gap-3">
                    <span className="p-2 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-xl">
                        <MessageCircle className="w-6 h-6" />
                    </span>
                    Atendimento de WhatsApp
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">Conecte sua conta via QR Code, gerencie seus leads e envie mensagens pela sua conta usando automação.</p>
            </div>

            {/* Tabs estilo sub-menu */}
            <div className="flex flex-wrap gap-2 mb-8 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-1.5 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('conexao')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'conexao' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/60 dark:border-slate-700' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    Aparelho e QR Code
                </button>
                <button
                    onClick={() => setActiveTab('disparador')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'disparador' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/60 dark:border-slate-700' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    Disparador
                </button>
                <button
                    onClick={() => setActiveTab('massa')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'massa' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/60 dark:border-slate-700' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    Envio em Massa
                </button>
                <button
                    onClick={() => setActiveTab('mensagens')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'mensagens' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/60 dark:border-slate-700' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    Mensagens
                </button>
                <button
                    onClick={() => setActiveTab('templates')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'templates' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/60 dark:border-slate-700' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    Templates
                </button>
            </div>

            {/* Content Body */}

            {activeTab === 'conexao' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid flex-1 grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* QR CODE SECTION */}
                    <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col items-center text-center">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                            Vincular Aparelho via QR Code
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                            Abra o WhatsApp no seu celular para conectar sua conta de atendimento.
                        </p>

                        <div className="w-64 h-64 bg-slate-100 dark:bg-white rounded-xl flex flex-col items-center justify-center relative shadow-inner mb-8 border border-slate-200">
                            {/* Simulação de carregamento do componente de QRCode real do Whatsapp */}
                            <QrCode className="w-32 h-32 text-slate-800 opacity-20" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-white/90 backdrop-blur-sm rounded-xl">
                                <ServerCog className="w-8 h-8 text-blue-600 mb-2 animate-bounce" />
                                <span className="text-sm font-extrabold text-slate-800 tracking-tight">API Ociosa / Fila Wait</span>
                                <span className="text-[11px] font-semibold text-slate-600 px-4 text-center mt-1">(A conexão necessita do backend dedicado em funcionamento)</span>
                            </div>
                        </div>

                        <div className="w-full space-y-4 text-left bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700/50">
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">1</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Abra o WhatsApp no seu celular</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">2</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Toque em Configurações e selecione <strong>Aparelhos conectados</strong></p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">3</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Toque em <strong>Conectar um aparelho</strong> e aponte para a tela</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-emerald-200 dark:border-emerald-900/40 p-6 shadow-sm">
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-800">
                                    <Wifi className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-extrabold text-slate-800 dark:text-slate-200">Status da API e Disparo</h4>
                                    <p className="text-sm text-slate-500 font-medium">Aguardando Leitura do Dispositivo</p>
                                </div>
                                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 border border-transparent dark:text-slate-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                    Offline
                                </span>
                            </div>

                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                Uma vez que o QR code for scaneado e processado, nossa plataforma estabelecerá uma ligação via Websocket segura para que os demais menus desta tela (Disparo, Envio e CRM) possam conversar imediatamente com os Leads sem que você esteja com o telefone em mãos.
                            </p>
                        </div>
                    </div>
                </div>
            )}


            {activeTab === 'disparador' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Disparador Individual</h2>
                            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                0 / 100 disparos
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Envie mensagens pré-programadas para seus leads automaticamente via sua conta conectada.</p>
                    </div>

                    {/* Section: Templates */}
                    <div className="bg-white dark:bg-slate-900 border text-left border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-end mb-6">
                            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Templates Disponíveis</h3>
                            <span className="text-xs text-slate-400 font-semibold">{templates.length} ativos (Local)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {templates.map((tpl) => (
                                <div key={tpl.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-5 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md cursor-pointer transition-all bg-white dark:bg-slate-800 relative group min-h-[140px] flex flex-col">
                                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-3">{tpl.id}</h4>

                                    <div className="mt-auto space-y-2">
                                        <span className="bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 px-2 py-0.5 rounded text-[10px] font-bold inline-block font-mono">
                                            {tpl.lang}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mt-2">
                                            <span className="text-slate-400 dark:text-slate-500">Status:</span>
                                            <span className="text-green-600 dark:text-green-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Aprovado</span>
                                        </div>
                                        <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold pt-1">
                                            {tpl.ctg}
                                        </div>
                                    </div>

                                    {/* Botão Hover Substituto (Call to Action invisível) */}
                                    <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                        <span className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">Carregar Mensagem</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section: Emular Formulario Whatsapp */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                        <div className="p-6 md:w-1/3 bg-slate-50 dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800">
                            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2">Enviar Mensagem</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Selecione o lead CRM que receberá o template através do seu número Logado.</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Telefone / Lead</label>
                                    <input type="text" className="w-full text-sm bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10 text-slate-900 dark:text-slate-100 px-3" placeholder="+55 11 9..." />
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm" disabled>
                                    <Send className="w-4 h-4 mr-2" /> Disparar (Requer QRCode)
                                </Button>
                            </div>
                        </div>

                        <div className="p-6 md:w-2/3 bg-slate-100 dark:bg-slate-900 flex items-center justify-center relative overflow-hidden h-64 md:h-auto">
                            {/* Fundo do Whats estilizado */}
                            <div className="absolute inset-0 opacity-[0.05] dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png")', backgroundSize: '400px' }}></div>

                            <div className="bg-[#E7FFDB] dark:bg-[#005c4b] rounded-lg p-3 max-w-sm rounded-tr-none shadow-sm relative z-10 border border-[#b2e1a3] dark:border-[#005c4b]">
                                <p className="text-sm text-slate-800 dark:text-emerald-50 mb-2 whitespace-pre-line leading-snug font-medium">
                                    Olá! Tudo bem? {'\n'}Sou corretor da agência e vi que você simulou interesse no condomínio. {'\n\n'}Gostaria de agendar uma visita?
                                </p>
                                <div className="flex justify-end items-center gap-1 opacity-80">
                                    <span className="text-[10px] text-emerald-800 dark:text-emerald-200/60 font-medium">14:48</span>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab !== 'conexao' && activeTab !== 'disparador' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-16 text-center shadow-sm max-w-3xl mt-4">
                    <BotMessageSquare className="w-12 h-12 text-blue-300 dark:text-slate-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Conecte o seu aparelho primeiro!</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-md mx-auto">
                        A gestão de conversas multicanal, envios em massa e gerenciamento de templates necessitam da instância Base ativa escaneada pelo seu aparelho na aba <strong className="text-slate-700 dark:text-slate-300">Aparelho e QR Code</strong>.
                    </p>
                    <Button variant="outline" className="text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700" onClick={() => setActiveTab('conexao')}>Ir para Instalação</Button>
                </div>
            )}
        </div>
    );
}
