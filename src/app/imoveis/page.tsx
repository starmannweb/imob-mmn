export const dynamic = 'force-dynamic';

import { createAdminClient } from "@/utils/supabase/admin";
import { PropertyCard } from "@/components/property-cards/property-card";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function PublicListingsPage() {
    const supabase = createAdminClient();

    const { data: properties } = await supabase
        .from("properties")
        .select("*, owner:users!owner_id(full_name)")
        .order('created_at', { ascending: false });

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header Search */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <Link href="/" className="text-2xl font-bold tracking-tight text-slate-900 shrink-0">
                        Imob<span className="text-blue-600 text-sm align-top ml-1">Afiliação</span>
                    </Link>

                    <div className="w-full max-w-2xl relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                            className="w-full pl-10 bg-slate-100 border-transparent focus:bg-white h-12 rounded-full text-base"
                            placeholder="Buscar por cidade, bairro, condomínio ou palavra-chave..."
                        />
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Imóveis em Destaque</h1>
                        <p className="text-slate-500">Explore nossa carteira de propriedades exclusivas.</p>
                    </div>
                    <div className="text-slate-500 text-sm font-medium">
                        {properties?.length || 0} resultados encontrados
                    </div>
                </div>

                {properties && properties.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {properties.map((prop) => (
                            <PropertyCard
                                key={prop.id}
                                slug={prop.slug}
                                title={prop.title}
                                price_sale={prop.price_sale}
                                price_rent={prop.price_rent}
                                area={prop.area}
                                bedrooms={prop.bedrooms}
                                bathrooms={prop.bathrooms}
                                parking_spaces={prop.parking_spaces}
                                status={prop.status}
                                agentName={prop.owner?.full_name}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-xl border border-dashed border-slate-300">
                        <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-700">Nenhum imóvel encontrado</h3>
                        <p className="text-slate-500 mt-2">Nossas carteiras estão sendo atualizadas. Volte em breve.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
