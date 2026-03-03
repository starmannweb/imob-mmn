export const dynamic = 'force-dynamic';

import { createAdminClient } from "@/utils/supabase/admin";
import { notFound } from "next/navigation";
import { PropertyCard } from "@/components/property-cards/property-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default async function BrokerPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const supabase = createAdminClient();

    // Verificar se o slug é um UUID válido
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

    // Buscar dados do corretor. Primeiro pelo referral_code, depois pelo ID (se UUID).
    let broker: any = null;

    // Tentar pelo referral_code primeiro (case-insensitive)
    const { data: byCode, error: codeError } = await supabase
        .from("users")
        .select("id, full_name, referral_code")
        .ilike("referral_code", slug)
        .maybeSingle();

    if (byCode) {
        broker = byCode;
    } else if (isUUID) {
        // Só tenta pelo ID se o slug for um UUID válido
        const { data: byId } = await supabase
            .from("users")
            .select("id, full_name, referral_code")
            .eq("id", slug)
            .maybeSingle();
        broker = byId;
    }

    if (!broker) {
        notFound();
    }

    // Buscar os imóveis da carteira desse corretor
    const { data: properties } = await supabase
        .from("properties")
        .select("*")
        .eq("owner_id", broker.id)
        .order('created_at', { ascending: false });

    return (
        <div className="bg-slate-50 min-h-screen pb-16">
            {/* Header Público / Navbar minimalista */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold tracking-tight text-slate-800">
                        Imob<span className="text-blue-600 text-sm align-top ml-1">Afiliação</span>
                    </Link>
                    <div className="hidden md:block w-full max-w-sm ml-8 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                            className="w-full pl-9 bg-slate-100 border-transparent focus:bg-white h-10 rounded-full text-sm"
                            placeholder="Pesquisar imóveis na carteira..."
                        />
                    </div>
                </div>
            </header>

            {/* Hero do Corretor */}
            <div className="bg-slate-900 border-b border-slate-800 relative z-10 pt-16 pb-24 md:pb-32 px-4 shadow-lg overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 to-slate-900/10 pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-slate-800 shadow-xl bg-white">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${broker.full_name}`} alt={broker.full_name} />
                        <AvatarFallback className="text-3xl font-bold">{broker.full_name?.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                        {broker.full_name}
                    </h1>
                    <p className="text-lg text-slate-300 font-medium mb-8 max-w-xl mx-auto">
                        Consultor Imobiliário Oficial • Especialista em realizar o seu sonho.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href={`https://wa.me/5511999999999?text=Olá ${broker.full_name}, estava vendo seu portfólio de imóveis.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-[#25D366]/20 transition-transform hover:scale-105"
                        >
                            <Phone className="w-5 h-5" /> Contato Direto
                        </a>
                        <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-full font-semibold transition-colors border border-slate-700">
                            <Mail className="w-5 h-5" /> Enviar E-mail
                        </button>
                    </div>
                </div>
            </div>

            {/* Lista de Imóveis do Corretor */}
            <main className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-slate-100 pb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <MapPin className="text-blue-600" />
                                Imóveis de {broker.full_name?.split(' ')[0]}
                            </h2>
                        </div>
                        <div className="text-slate-500 font-medium bg-slate-50 px-4 py-2 rounded-lg text-sm border border-slate-100">
                            {properties?.length || 0} Propriedades na Carteira
                        </div>
                    </div>

                    {properties && properties.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                    agentName={broker.full_name}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">Carteira Vazia</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                Este corretor ainda não adicionou nenhum imóvel exclusivo.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
