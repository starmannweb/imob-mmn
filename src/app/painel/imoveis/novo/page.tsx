export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { createProperty } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function NovoImovelPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const params = await searchParams;

    return (
        <div className="animate-in flex-1 flex flex-col gap-6 w-full pb-10">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Cadastrar Novo Imóvel</h1>
                <p className="text-slate-600 mt-1">Insira as informações gerais para gerar o seu anúncio público.</p>
            </div>

            <div className="bg-white border text-left border-slate-200 p-8 rounded-xl shadow-sm">
                <form action={createProperty} className="space-y-6 max-w-2xl">
                    {params?.error && (
                        <p className="p-4 bg-red-100 text-red-600 rounded-md">
                            {params.error}
                        </p>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-slate-700 font-semibold">Título do Anúncio *</Label>
                        <Input name="title" placeholder="Ex: Casa com 3 quartos em Santos" required />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price_sale" className="text-slate-700 font-semibold">Valor de Venda (R$)</Label>
                            <Input name="price_sale" type="number" step="0.01" placeholder="Ex: 500000" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price_rent" className="text-slate-700 font-semibold">Valor de Aluguel (R$)</Label>
                            <Input name="price_rent" type="number" step="0.01" placeholder="Ex: 2500" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-slate-700 font-semibold">Descrição do Imóvel</Label>
                        <Textarea name="description" placeholder="Descreva os diferenciais, localização e acabamento do imóvel..." rows={4} />
                    </div>

                    <h3 className="text-lg font-bold border-b pb-2 pt-6 text-slate-800">Características</h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="area">Área (m²)</Label>
                            <Input name="area" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bedrooms">Quartos</Label>
                            <Input name="bedrooms" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="suites">Suítes</Label>
                            <Input name="suites" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="parking_spaces">Vagas</Label>
                            <Input name="parking_spaces" type="number" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="iptu">Valor do IPTU (R$)</Label>
                            <Input name="iptu" type="number" step="0.01" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="condominium">Condomínio (R$)</Label>
                            <Input name="condominium" type="number" step="0.01" />
                        </div>
                    </div>

                    <div className="pt-6 border-t mt-4 flex gap-4">
                        <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 font-semibold">
                            Salvar Imóvel
                        </Button>
                        <a href="/painel/imoveis">
                            <Button type="button" size="lg" variant="outline" className="text-slate-600">
                                Cancelar
                            </Button>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
