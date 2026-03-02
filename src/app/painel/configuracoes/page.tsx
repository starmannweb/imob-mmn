export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { X, User, FileText, Globe, Award, Share2, Mail, Phone, MapPin, Clock, Edit3, Link as LinkIcon, Facebook, Instagram, Youtube, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ConfiguracoesPage({ searchParams }: { searchParams: Promise<{ edit?: string, tab?: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    const sp = await searchParams;
    const isEditMode = sp.edit === 'true';
    const currentTab = sp.tab || 'info';

    return (
        <div className="flex-1 flex flex-col w-full pb-16 min-h-screen">

            {/* Cabecalho Simples da Página Baseado no Print */}
            <div className="mb-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">ADigital Afiliação</span>
                <span>›</span>
                <span className="text-slate-400 dark:text-slate-500">Perfil</span>
            </div>

            {/* Banner Header */}
            <div className="w-full bg-slate-200 dark:bg-[#1b253b] rounded-t-xl h-48 md:h-64 relative overflow-hidden border border-slate-200 dark:border-slate-700">
            </div>

            {/* Profile Content */}
            <div className="relative px-4 sm:px-8 mt-4 md:-mt-16 z-10">

                <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-12">
                    <div className="w-32 h-32 rounded-full bg-white dark:bg-[#2a303c] border-[6px] border-slate-50 dark:border-[#0f1522] flex items-center justify-center text-4xl font-normal text-slate-600 dark:text-slate-300 shrink-0 shadow-lg">
                        {(profile?.full_name || 'ZK').substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 text-center md:text-left mb-2">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{profile?.full_name || 'ZKF INTERMEDIACAO IMOBILIARIA LTDA'}</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">@{profile?.full_name?.split(' ')[0].toLowerCase() || 'Zanzini'}</p>
                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 italic font-light">Não há descrição disponível.</p>
                    </div>
                    <div className="flex gap-3 mb-2 flex-col sm:flex-row">
                        <Link href="/painel/configuracoes?edit=true" className="bg-blue-600 hover:bg-blue-700 shadow-sm rounded-full px-5 py-2 text-sm font-semibold flex items-center gap-2 text-white justify-center transition-colors">
                            <Edit3 className="w-4 h-4" /> Editar perfil
                        </Link>
                        <Link href={`/corretor/${profile?.referral_code || profile?.id || user.id}`} target="_blank" className="bg-blue-600 hover:bg-blue-700 shadow-sm rounded-full px-5 py-2 text-sm font-semibold flex items-center gap-2 text-white justify-center transition-colors">
                            <Globe className="w-4 h-4" /> Ver perfil público
                        </Link>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700/50 pt-8 mt-4">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Indicações</h2>

                    <div className="mb-6 flex flex-col gap-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-left">Indicado por:</span>
                        <span className="text-blue-500 text-sm font-medium">Você não possui um indicador.</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-[#1b253b] border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-bold text-blue-600 dark:text-blue-500 text-sm">Suas Indicações 4%</h3>
                                <div className="bg-blue-50 dark:bg-blue-500/10 p-2 rounded-lg"><Share2 className="w-4 h-4 text-blue-600 dark:text-blue-500" /></div>
                            </div>
                            <div>
                                <span className="text-slate-500 dark:text-slate-400 text-xs">0 indicações</span>
                                <p className="text-slate-400 dark:text-slate-600 text-xs italic mt-2">Nenhuma indicação ainda</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1b253b] border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-bold text-emerald-600 dark:text-emerald-500 text-sm">Suas Indicações 2%</h3>
                                <div className="bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-lg"><Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /></div>
                            </div>
                            <div>
                                <span className="text-slate-500 dark:text-slate-400 text-xs">0 indicações</span>
                                <p className="text-slate-400 dark:text-slate-600 text-xs italic mt-2">Nenhuma indicação ainda</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1b253b] border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-bold text-amber-600 dark:text-amber-500 text-sm">Suas Indicações 1%</h3>
                                <div className="bg-amber-50 dark:bg-amber-500/10 p-2 rounded-lg"><Share2 className="w-4 h-4 text-amber-600 dark:text-amber-500" /></div>
                            </div>
                            <div>
                                <span className="text-slate-500 dark:text-slate-400 text-xs">0 indicações</span>
                                <p className="text-slate-400 dark:text-slate-600 text-xs italic mt-2">Nenhuma indicação ainda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Editar Perfil */}
            {isEditMode && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#1b253b] border border-slate-200 dark:border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl flex flex-col h-full max-h-[85vh]">

                        {/* Modal Header */}
                        <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-700/50 shrink-0">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Atualizar Perfil</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Faça alterações nas informações do seu perfil.</p>
                            </div>
                            <Link href="/painel/configuracoes" className="text-slate-400 hover:text-white transition-colors bg-slate-800/50 p-1.5 rounded-lg">
                                <X className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Modal Tabs */}
                        <div className="flex gap-8 px-6 border-b border-slate-700/50 shrink-0">
                            <Link href="/painel/configuracoes?edit=true&tab=info" className={`py-4 text-sm font-bold border-b-2 transition-colors ${currentTab === 'info' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400 hover:text-slate-300'}`}>
                                Informações
                            </Link>
                            <Link href="/painel/configuracoes?edit=true&tab=contato" className={`py-4 text-sm font-bold border-b-2 transition-colors ${currentTab === 'contato' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400 hover:text-slate-300'}`}>
                                Contato
                            </Link>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                            {currentTab === 'info' ? (
                                <div className="flex flex-col gap-5">

                                    {/* Cover Placeholder in Modal */}
                                    <div className="w-full h-32 bg-slate-100 dark:bg-[#2a354d] border border-slate-200 dark:border-slate-700 rounded-xl mb-2"></div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Nome completo <span className="text-red-500">*</span></label>
                                            <input type="text" defaultValue={profile?.full_name || 'ZKF INTERMEDIACAO IMOBILIARIA...'} className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500 transition-colors" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Nome de usuário <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">@</span>
                                                <input type="text" defaultValue={profile?.full_name?.split(' ')[0] || 'Zanzini'} className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 w-full focus:outline-none focus:border-blue-500 transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="flex items-center justify-center gap-2 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 text-slate-500 dark:text-slate-400 rounded-lg py-2.5 text-sm font-semibold transition-colors">
                                            <User className="w-4 h-4" /> CPF
                                        </button>
                                        <button className="flex items-center justify-center gap-2 bg-blue-50 dark:bg-[#0f172a] border border-blue-500/50 dark:border-slate-500 text-blue-600 dark:text-slate-300 rounded-lg py-2.5 text-sm font-semibold transition-colors">
                                            <FileText className="w-4 h-4" /> CNPJ
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">CNPJ</label>
                                        <input type="text" defaultValue="30.413.357/0001-62" className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500 transition-colors" />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-center text-xs font-semibold">
                                            <label className="text-slate-700 dark:text-slate-300">Descrição</label>
                                            <span className="text-slate-400 dark:text-slate-600">(opcional)</span>
                                        </div>
                                        <textarea placeholder="Insira sua descrição" className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500 min-h-[100px] resize-none transition-colors"></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex justify-between items-center text-xs font-semibold">
                                                <label className="text-slate-700 dark:text-slate-300">Link Instagram</label>
                                                <span className="text-slate-400 dark:text-slate-600">(opcional)</span>
                                            </div>
                                            <div className="relative">
                                                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                                                <input type="text" placeholder="Insira o link do seu Instagram" className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-xs text-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500 w-full transition-colors" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex justify-between items-center text-xs font-semibold">
                                                <label className="text-slate-700 dark:text-slate-300">Link Facebook</label>
                                                <span className="text-slate-400 dark:text-slate-600">(opcional)</span>
                                            </div>
                                            <div className="relative">
                                                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                                                <input type="text" placeholder="Insira o link do seu Facebook" className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-xs text-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500 w-full transition-colors" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex justify-between items-center text-xs font-semibold">
                                                <label className="text-slate-700 dark:text-slate-300">Link YouTube</label>
                                                <span className="text-slate-400 dark:text-slate-600">(opcional)</span>
                                            </div>
                                            <div className="relative">
                                                <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                                                <input type="text" placeholder="Insira o link do seu YouTube" className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-xs text-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500 w-full transition-colors" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex justify-between items-center text-xs font-semibold">
                                                <label className="text-slate-700 dark:text-slate-300">Link TikTok</label>
                                                <span className="text-slate-400 dark:text-slate-600">(opcional)</span>
                                            </div>
                                            <div className="relative">
                                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                                                <input type="text" placeholder="Insira o link do seu TikTok" className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-xs text-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500 w-full transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <div className="flex flex-col gap-5 text-slate-800 dark:text-slate-300">

                                    {/* Contato Content */}
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-end mb-1">
                                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">E-mail <span className="text-red-500">*</span></label>
                                            <label className="text-[11px] font-bold text-slate-400 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                                                E-mail público?
                                                <div className="w-8 h-4 bg-slate-500 dark:bg-slate-700 rounded-full relative"><div className="w-3 h-3 bg-slate-200 dark:bg-slate-400 rounded-full absolute top-[2px] left-[2px]"></div></div>
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                                            <input type="email" defaultValue={user.email || 'dizanzini@gmail.com'} className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500 w-full transition-colors" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-center text-xs font-semibold mb-1">
                                            <label className="text-slate-400 dark:text-slate-300 text-[13px]">Descrição do e-mail</label>
                                            <span className="text-slate-500 dark:text-slate-600">(opcional)</span>
                                        </div>
                                        <textarea placeholder="Insira uma descrição para seu e-mail" className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500 min-h-[70px] resize-none transition-colors"></textarea>
                                    </div>

                                    <div className="flex flex-col gap-1.5 mt-2">
                                        <div className="flex justify-between items-end mb-1">
                                            <label className="text-xs font-semibold text-slate-400 dark:text-slate-300 text-[13px]">Telefone <span className="text-slate-500 dark:text-slate-600 ml-2 font-normal">(opcional)</span></label>
                                            <label className="text-[11px] font-bold text-slate-400 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                                                Telefone público?
                                                <div className="w-8 h-4 bg-slate-500 dark:bg-slate-700 rounded-full relative"><div className="w-3 h-3 bg-slate-200 dark:bg-slate-400 rounded-full absolute top-[2px] left-[2px]"></div></div>
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                                            <input type="text" defaultValue="(13) 99139-6602" className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500 w-full transition-colors" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-center text-xs font-semibold mb-1">
                                            <label className="text-slate-400 dark:text-slate-300 text-[13px]">Descrição do telefone</label>
                                            <span className="text-slate-500 dark:text-slate-600">(opcional)</span>
                                        </div>
                                        <textarea placeholder="Insira a descrição do telefone" className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500 min-h-[70px] resize-none transition-colors"></textarea>
                                    </div>

                                    <div className="flex flex-col gap-1.5 mt-2">
                                        <div className="flex justify-between items-end mb-1">
                                            <label className="text-xs font-semibold text-slate-400 dark:text-slate-300 text-[13px]">Localização <span className="text-slate-500 dark:text-slate-600 ml-2 font-normal">(opcional)</span></label>
                                            <label className="text-[11px] font-bold text-slate-400 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                                                Localização pública?
                                                <div className="w-8 h-4 bg-slate-500 dark:bg-slate-700 rounded-full relative"><div className="w-3 h-3 bg-slate-200 dark:bg-slate-400 rounded-full absolute top-[2px] left-[2px]"></div></div>
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                                            <input type="text" placeholder="Insira sua localização" className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500 w-full transition-colors" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5 mt-2">
                                        <div className="flex justify-between items-end mb-1">
                                            <label className="text-xs font-semibold text-slate-400 dark:text-slate-300 text-[13px]">Horário de atendimento <span className="text-slate-500 dark:text-slate-600 ml-2 font-normal">(opcional)</span></label>
                                            <label className="text-[11px] font-bold text-slate-400 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                                                Horário público?
                                                <div className="w-8 h-4 bg-slate-500 dark:bg-slate-700 rounded-full relative"><div className="w-3 h-3 bg-slate-200 dark:bg-slate-400 rounded-full absolute top-[2px] left-[2px]"></div></div>
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                                            <input type="text" placeholder="Insira seu horário de atendimento" className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-blue-500 w-full transition-colors" />
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-slate-200 dark:border-slate-700/50 shrink-0 bg-white dark:bg-[#1b253b] rounded-b-2xl">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-sm transition-colors shadow-sm">
                                Salvar Alterações
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
