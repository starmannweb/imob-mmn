import { createClient } from "@/utils/supabase/server";
import { AlertCircle, QrCode, Smartphone, Wifi, CheckCircle2, ServerCog } from "lucide-react";

export default async function WhatsappPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="flex-1 w-full bg-slate-50 dark:bg-[#0b1120] p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white flex items-center gap-3">
                        <span className="p-2 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-xl">
                            <Smartphone className="w-6 h-6" />
                        </span>
                        Atendimento com WhatsApp
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                        Conecte seu WhatsApp para habilitar automação, disparos e recebimento de mensagens unificadas.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* QR CODE SECTION (MOCKUP) */}
                    <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col items-center text-center">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                            Vincular Aparelho
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                            Abra o WhatsApp no seu celular para conectar
                        </p>

                        <div className="w-64 h-64 bg-slate-100 dark:bg-white rounded-xl flex flex-col items-center justify-center relative shadow-inner mb-8">
                            {/* Simulação grosseira de onde iria o Componente QRCode gerado pelo backend */}
                            <QrCode className="w-32 h-32 text-slate-800 opacity-20" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-white/90 backdrop-blur-sm rounded-xl">
                                <ServerCog className="w-8 h-8 text-blue-600 mb-2 animate-bounce" />
                                <span className="text-sm font-bold text-slate-800">Aguardando API...</span>
                            </div>
                        </div>

                        <div className="w-full space-y-4 text-left">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-700 dark:text-slate-300 shrink-0">1</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5">Abra o WhatsApp no seu celular</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-700 dark:text-slate-300 shrink-0">2</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5">Toque em <strong>Mais opções</strong> ou <strong>Configurações</strong> e selecione <strong>Aparelhos conectados</strong></p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-700 dark:text-slate-300 shrink-0">3</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5">Toque em <strong>Conectar um aparelho</strong></p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-700 dark:text-slate-300 shrink-0">4</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5">Aponte a câmera para a tela para capturar o código</p>
                            </div>
                        </div>
                    </div>

                    {/* RULES E INSTRUCTIONS SECTION */}
                    <div className="space-y-6">
                        <div className="bg-amber-50 dark:bg-amber-500/10 rounded-2xl border border-amber-200 dark:border-amber-500/20 p-6">
                            <h3 className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-500 mb-3">
                                <AlertCircle className="w-5 h-5" />
                                Requisitos para Funcionamento
                            </h3>
                            <p className="text-sm text-amber-700 dark:text-amber-400 mb-4 font-medium">
                                Para que a conexão via QR Code funcione nesta tela, é necessário integrar um serviço de API do WhatsApp (Baileys, Evolution API ou Z-API). Abaixo estão os passos para completarmos essa integração:
                            </p>
                            <ul className="space-y-3 mb-4">
                                <li className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400 font-medium">
                                    <div className="mt-0.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>
                                    <p>Nós precisamos rodar um serviço (Worker / API) separado em Node.js (usando a lib Baileys ou instalando o Evolution API no servidor) porque a Vercel Functions / Serverless é morta a cada segundo (timeout). Só servidores Long-running WebSocket suportam WhatsApp logado.</p>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400 font-medium">
                                    <div className="mt-0.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>
                                    <p>O back-end do WhatsApp (Evolution API, por exemplo) gera a Instância Base64 (que virará o QR Code acima).</p>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400 font-medium">
                                    <div className="mt-0.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>
                                    <p>Ao capturar o QR Code com a câmera, a API deve disparar um Webhook para o Supabase armazenando o status de `connected` nesta instalação.</p>
                                </li>
                            </ul>
                            <div className="bg-white/50 dark:bg-black/20 p-4 rounded-xl text-xs sm:text-sm text-amber-800 dark:text-amber-400 font-semibold border border-amber-200 dark:border-amber-500/20">
                                Dica: A melhor e mais confiável forma sem usar serviços terceirizados caros é instalar o {" "}
                                <a href="https://evolution-api.com" target="_blank" className="underline font-bold text-blue-600 dark:text-blue-400">Evolution API v2</a> em uma VPS simples e conectá-la ao nosso banco Next / Supabase via chamadas de API (GET /instance/qr e POST /instance/create).
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0">
                                    <Wifi className="w-6 h-6 text-slate-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Status da Conexão</h4>
                                    <p className="text-sm text-slate-500 font-medium">Desconectado</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-xs font-bold uppercase tracking-wider">
                                Offline
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
