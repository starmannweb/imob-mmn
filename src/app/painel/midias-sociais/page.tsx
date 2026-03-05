"use client";

import { Instagram, Send, Sparkles, Image as ImageIcon, Video, CalendarClock, Globe, AtSign, Share2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MidiasSociaisPage() {
    const [isConnected, setIsConnected] = useState(false);
    const [activeTab, setActiveTab] = useState<'publicar' | 'agenda' | 'estatisticas'>('publicar');

    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl p-4 md:p-8">
            {/* Cabecalho */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white border-b border-transparent flex items-center gap-3">
                    <span className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-xl border border-pink-200 dark:border-pink-800">
                        <Instagram className="w-6 h-6" />
                    </span>
                    Mídias Sociais
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">Publicador Mágico: Crie, agende e envie seus imóveis direto para o Instagram e Facebook no piloto automático.</p>
            </div>

            {!isConnected ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-16 animate-in fade-in slide-in-from-bottom-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20 transform rotate-3">
                        <Instagram className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-200 mb-3 tracking-tight">Potencialize suas Redes</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-lg mb-8 text-sm leading-relaxed">
                        Conecte seu Instagram Business para publicar fotos, descrições e reels (Property Tours) de qualquer imóvel cadastrado sem sair da plataforma, usando a Meta Graph API oficial.
                    </p>

                    <button
                        onClick={() => setIsConnected(true)}
                        className="bg-black hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-3 w-full sm:w-auto justify-center"
                    >
                        <Instagram className="w-5 h-5" />
                        Conectar Instagram Pro
                    </button>

                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 w-full text-left">
                        <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-4">Requisitos para Automação</h4>
                        <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-3 font-medium">
                            <li className="flex gap-2 items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0"></span>
                                Seu perfil precisa ser Profissional ou Criador de Conteúdo.
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0"></span>
                                Precisaremos das permissões 'instagram_content_publish' criadas no App do Painel Developers.
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0"></span>
                                Deve estar vinculada a uma página do Facebook ativa.
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">

                    {/* Header Conectado */}
                    <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 md:px-6 shadow-sm mb-6">
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                            <div className="relative">
                                <img src="https://ui-avatars.com/api/?name=Corretora+Top&background=ec4899&color=fff" className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700" alt="Avatar IG" />
                                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-0.5">
                                    <div className="bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 w-4 h-4 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-2.5 h-2.5 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-extrabold text-slate-800 dark:text-white flex items-center gap-1">@corretoratop</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Instagram Profissional Ativo</p>
                            </div>
                        </div>

                        {/* Abas */}
                        <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl w-full md:w-auto">
                            <button
                                onClick={() => setActiveTab('publicar')}
                                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'publicar' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                            >
                                Publicador IA
                            </button>
                            <button
                                onClick={() => setActiveTab('agenda')}
                                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'agenda' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                            >
                                Agenda
                            </button>
                        </div>
                    </div>

                    {activeTab === 'publicar' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Esquerda: Editor Form */}
                            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Criar Postagem</h3>

                                <div className="space-y-5">
                                    {/* Select Imovel */}
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Importar do Imóvel Cadastrado</label>
                                        <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-pink-500/20">
                                            <option>Selecionar imóvel recém captado...</option>
                                            <option>Casa de Luxo Gonzaga (Cód 923)</option>
                                            <option>Apto 3 Quartos Ponta da Praia</option>
                                        </select>
                                    </div>

                                    {/* Arquivos (Feed/Reels/Stories) */}
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Mídia do Post</label>
                                        <div className="flex gap-4">
                                            <div className="flex-1 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                                                <div className="bg-blue-50 dark:bg-slate-800 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                                                    <ImageIcon className="w-6 h-6 text-blue-500" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Carrossel / Foto</span>
                                            </div>
                                            <div className="flex-1 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                                                <div className="bg-pink-50 dark:bg-slate-800 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                                                    <Video className="w-6 h-6 text-pink-500" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Reels</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Legenda (Caption)</label>
                                            <button className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-md flex items-center gap-1 hover:bg-purple-100 transition-colors">
                                                <Sparkles className="w-3 h-3" /> Gerar com IA
                                            </button>
                                        </div>
                                        <textarea
                                            rows={5}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-pink-500/20"
                                            placeholder="Descrva a essência do imóvel, não esqueça as Hashtags!"
                                            defaultValue={`🏠 Imóvel Espetacular disponível no Gonzaga!\n\n✨ 3 Quartos, Varanda Gourmet e Acabamento Premium. Tudo isso a 2 quadras da praia.\n\n📲 Mande um Direct ou acesse o link na bio (Ref 924)\n\n#ImoveisSantos #AltoPadrao #Imobiliaria`}
                                        ></textarea>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <button className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white font-bold py-3.5 rounded-xl shadow-md transition-opacity flex justify-center items-center gap-2 text-sm">
                                            <Send className="w-4 h-4" /> Publicar Agora no Instagram
                                        </button>
                                        <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold px-6 py-3.5 rounded-xl transition-colors flex justify-center items-center gap-2 text-sm">
                                            <CalendarClock className="w-4 h-4" /> Agendar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Direita: Preview Phone */}
                            <div className="lg:col-span-5 hidden lg:flex items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                                {/* Celular Frame Simples */}
                                <div className="w-[300px] h-[600px] bg-white dark:bg-black rounded-[40px] shadow-2xl border-[8px] border-slate-800 dark:border-slate-700 p-4 relative flex flex-col">
                                    {/* Top Notch */}
                                    <div className="w-32 h-6 bg-slate-800 dark:bg-slate-700 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl"></div>

                                    {/* IG Header Navbar */}
                                    <div className="flex justify-between items-center mb-4 mt-6 px-1">
                                        <span className="font-extrabold text-sm dark:text-white">Instagram</span>
                                    </div>

                                    {/* Post Header */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                                        <p className="text-xs font-bold dark:text-white">corretoratop</p>
                                    </div>

                                    {/* Post Image Preview */}
                                    <div className="w-full aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                                        <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                                        <div className="absolute inset-0 bg-blue-500/10 pointer-events-none"></div>
                                    </div>

                                    {/* Post Actions Mock */}
                                    <div className="flex gap-3 mb-3">
                                        <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"></span>
                                        <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"></span>
                                        <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"></span>
                                    </div>

                                    {/* Caption Preview */}
                                    <div className="text-[10px] leading-relaxed font-medium text-slate-800 dark:text-slate-300 line-clamp-4">
                                        <span className="font-bold mr-1">corretoratop</span>
                                        🏠 Imóvel Espetacular disponível no Gonzaga! ✨ 3 Quartos, Varanda Gourmet e Acabamento Premium...
                                    </div>
                                    <div className="absolute inset-0 bg-white/20 dark:bg-black/10 pointer-events-none rounded-[32px]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
