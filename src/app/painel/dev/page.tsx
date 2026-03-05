"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, Trash2, DatabaseZap } from "lucide-react";
import { seedProperties, clearProperties } from "./actions";

export default function DevPage() {
    const [isPendingSeed, startSeed] = useTransition();
    const [isPendingClear, startClear] = useTransition();
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSeed = () => {
        startSeed(async () => {
            const res = await seedProperties();
            if (res?.error) {
                setMessage({ type: 'error', text: res.error });
            } else {
                setMessage({ type: 'success', text: "Imóveis de teste injetados com sucesso!" });
            }
        });
    };

    const handleClear = () => {
        startClear(async () => {
            const res = await clearProperties();
            if (res?.error) {
                setMessage({ type: 'error', text: res.error });
            } else {
                setMessage({ type: 'success', text: "Seus imóveis foram removidos!" });
            }
        });
    };

    return (
        <div className="animate-in flex-1 flex flex-col gap-8 w-full">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                    <DatabaseZap className="text-orange-500 w-8 h-8" />
                    Área de Testes (Dev)
                </h1>
                <p className="text-slate-600 mt-1">Ambiente de infraestrutura e testes para popular o banco de dados temporariamente.</p>
            </div>

            {/* SEED E MOCK DATA */}
            <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm max-w-4xl">
                <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4">Controles de Mock Data</h2>

                {message && (
                    <div className={`p-4 mb-6 rounded-md font-semibold text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message.text}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-lg gap-4">
                        <div>
                            <h3 className="font-bold text-slate-800">Criar Imóveis Fictícios</h3>
                            <p className="text-sm text-slate-500">Gera 5 propriedades completas com títulos, descrições e preços para você na sua conta atual.</p>
                        </div>
                        <Button
                            onClick={handleSeed}
                            disabled={isPendingSeed || isPendingClear}
                            className="bg-blue-600 hover:bg-blue-700 shrink-0"
                        >
                            <Database className="w-4 h-4 mr-2" />
                            {isPendingSeed ? 'Criando...' : 'Injetar (Seed)'}
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-red-50 border border-red-100 rounded-lg gap-4">
                        <div>
                            <h3 className="font-bold text-slate-800 text-red-900">Limpar Imóveis</h3>
                            <p className="text-sm text-red-600/80">Apaga permanentemente todos os imóveis cadastrados nesta conta no banco de dados.</p>
                        </div>
                        <Button
                            variant="destructive"
                            onClick={handleClear}
                            disabled={isPendingSeed || isPendingClear}
                            className="shrink-0"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {isPendingClear ? 'Aniquilando...' : 'Limpar DB'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* WHATSAPP INFRAESTRUTURE TESTE */}
            <div className="bg-white border text-left border-slate-200 p-8 rounded-xl shadow-sm max-w-4xl">
                <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4">Testes de Infraestrutura Socket</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* QR CODE SECTION (MOCKUP) */}
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
                        <h2 className="text-lg font-bold text-slate-800 mb-1">
                            Mockup de Vinculação
                        </h2>
                        <p className="text-sm text-slate-500 mb-4">
                            Apenas um teste de UI para o QR Code Socket
                        </p>

                        <div className="w-56 h-56 bg-white rounded-xl flex flex-col items-center justify-center relative shadow-sm border border-slate-200 mb-6">
                            {/* Simulação de carregamento do componente de QRCode */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-sm font-bold text-slate-800">Aguardando API Worker...</span>
                                <span className="text-xs text-slate-500 max-w-[150px] mt-2">Nulo devido a falta de worker Node.js</span>
                            </div>
                        </div>
                    </div>

                    {/* RULES E INSTRUCTIONS SECTION */}
                    <div className="space-y-4">
                        <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
                            <h3 className="flex items-center gap-2 font-bold text-amber-800 mb-2">
                                Requisitos para Funcionamento Oculto
                            </h3>
                            <p className="text-sm text-amber-700 mb-4 font-medium">
                                Para que a conexão via QR Code funcione sem a API Oficial da Meta (que é cara), precisamos rodar a infraestrutura de forma separada:
                            </p>
                            <ul className="space-y-3 mb-4">
                                <li className="flex items-start gap-2 text-sm text-amber-700 font-medium">
                                    <p>Servidores Serverless como este cortam WebSockets imediatamente. Precisamos de um NodeJS/Express longo em segundo plano.</p>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-amber-700 font-medium">
                                    <p>Devemos subir a Evolution API v2 (Gratuita) em uma VPS barata ($5/m) apenas para lidar com whatsapp.</p>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
