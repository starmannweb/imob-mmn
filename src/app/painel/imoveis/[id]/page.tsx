import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Instagram, ChevronLeft, Calendar, Edit2, Play, Heart, MapPin, CheckCircle2, BedDouble, Bath, Car, Maximize, Share2, Calculator, Building2 } from "lucide-react";

export default async function PainelPropertyDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch the property
    const { data: property, error } = await supabase
        .from("properties")
        .select(`
            *,
            owner:users!owner_id(id, full_name)
        `)
        .eq("id", id)
        .maybeSingle();

    if (error || !property) {
        notFound();
    }

    // Fetch related properties
    const { data: relatedProperties } = await supabase
        .from("properties")
        .select(`id, title, price_sale, area, bedrooms, bathrooms, parking_spaces, slug`)
        .eq("status", "available")
        .neq("id", id)
        .limit(4);

    const createdAt = new Date(property.created_at).toLocaleDateString('pt-BR');
    const updatedAt = new Date(property.updated_at || property.created_at).toLocaleDateString('pt-BR');

    return (
        <div className="flex flex-col gap-6 animate-in fade-in pb-12 w-full">

            {/* Breadcrumb */}
            <div className="text-xs text-slate-500 font-medium flex flex-wrap items-center gap-2">
                <span className="text-slate-400">ADigital Multinivel</span> <ChevronRight className="w-3 h-3 text-slate-400" />
                <Link href="/painel/imoveis" className="text-slate-500 hover:text-blue-600">Meus Imóveis</Link> <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-800 font-semibold truncate max-w-xs">{property.slug}</span>
            </div>

            {/* Property Title */}
            <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Cód: {property.id.substring(0, 8)}</p>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                    {property.title}
                </h1>
                <p className="text-xs font-semibold text-slate-400 uppercase mt-2 bg-slate-100 dark:bg-slate-800 w-fit px-2 py-0.5 rounded">
                    {property.price_sale ? 'Venda' : 'Locação'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-2">

                {/* Left Column (Images & Location) */}
                <div className="lg:col-span-8 flex flex-col gap-8">

                    {/* Image Gallery */}
                    <div className="flex flex-col gap-4">
                        <div className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm group">
                            {/* Placeholder for Main Image */}
                            <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700"></div>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>

                            {/* Instagram Style Icon */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center opacity-90 cursor-pointer shadow-xl hover:scale-105 transition-transform">
                                <Instagram className="w-8 h-8 text-white" />
                            </div>

                            {/* Navigation controls */}
                            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 backdrop-blur hover:bg-white rounded-full flex items-center justify-center text-slate-800 transition-colors shadow-sm">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 backdrop-blur hover:bg-white rounded-full flex items-center justify-center text-slate-800 transition-colors shadow-sm">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            <div className="w-20 lg:w-24 aspect-video bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer flex-shrink-0 shadow-sm">
                                <Instagram className="w-6 h-6 text-white" />
                            </div>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className="w-20 lg:w-24 aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg border-2 border-transparent hover:border-blue-500 cursor-pointer transition-colors flex-shrink-0"></div>
                            ))}
                        </div>
                        <p className="text-center text-xs font-bold text-slate-400 mt-1">1 / 11</p>
                    </div>

                    {/* Location Box */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-200 pb-8">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 mb-2">Localização:</h3>
                            <p className="text-sm text-slate-600 font-medium">Rua Endereço Completo, 51 - L51</p>
                            <p className="text-sm text-slate-500">Embaré - Casa 1</p>
                        </div>
                        <div className="md:text-right">
                            <p className="text-sm text-slate-600 font-medium">Santos - SP</p>
                            <p className="text-sm text-slate-500">CEP: 11040-101</p>
                        </div>
                    </div>

                </div>

                {/* Right Column (Info List) */}
                <div className="lg:col-span-4 flex flex-col gap-8">

                    {/* Broker Info */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-900 mb-3">Corretor anunciante:</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-100 border border-slate-200 text-slate-500 rounded-full flex items-center justify-center font-bold">
                                {property.owner?.full_name ? property.owner.full_name.charAt(0).toUpperCase() : 'Z'}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-900 leading-tight">
                                    {property.owner?.full_name || 'AGENTE INDEPENDENTE LTDA'}
                                </h4>
                                <p className="text-xs text-slate-500">@corretor</p>
                            </div>
                        </div>
                    </div>

                    {/* Analytics / Dates */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-900 mb-3">Estatísticas sobre o anúncio:</h3>
                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2 mb-2">
                            <span className="text-slate-500">Publicado em:</span>
                            <span className="text-slate-800 font-medium">{createdAt}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                            <span className="text-slate-500">Última atualização:</span>
                            <span className="text-slate-800 font-medium">{updatedAt}</span>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-900 mb-3">Ações rápidas:</h3>
                        <div className="flex flex-col gap-2">
                            <button className="w-full bg-[#dbeafe] hover:bg-blue-200 text-blue-700 font-bold rounded-full py-2.5 text-sm transition-colors text-left px-4 flex items-center gap-2">
                                <Calculator className="w-4 h-4" /> Simular Financiamento
                            </button>
                            <Link href={`/painel/imoveis/${property.id}/editar`} className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold rounded-full py-2.5 text-sm transition-colors text-center px-4 flex justify-center items-center gap-2">
                                <Edit2 className="w-4 h-4 text-slate-400" /> Editar Imóvel
                            </Link>
                            <p className="text-[10px] text-slate-400 mt-2 text-center">Simulação de financiamento disponível para o cliente no site.</p>
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-900 mb-2">Preço:</h3>
                        <div className="mb-1">
                            <span className="text-2xl font-black text-slate-900 tracking-tight">
                                R$ {property.price_sale ? property.price_sale.toLocaleString('pt-BR') : '-'}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 font-semibold">
                            R$ {property.iptu ? property.iptu.toLocaleString('pt-BR') : '-'} • IPTU
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-900 mb-2">Descrição:</h3>
                        <div className="text-xs text-slate-600 leading-relaxed font-medium whitespace-pre-wrap line-clamp-6 hover:line-clamp-none transition-all">
                            {property.description}
                        </div>
                    </div>

                    {/* Amenities */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-900 mb-3">Comodidades:</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-slate-50 border border-slate-200 text-slate-600 rounded-full px-3 py-1 flex items-center gap-1.5 text-[10px] font-bold">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Piscina
                            </span>
                            <span className="bg-slate-50 border border-slate-200 text-slate-600 rounded-full px-3 py-1 flex items-center gap-1.5 text-[10px] font-bold">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Churrasqueira
                            </span>
                            <span className="bg-slate-50 border border-slate-200 text-green-600 rounded-full px-3 py-1 flex items-center gap-1.5 text-[10px] font-bold">
                                <CheckCircle2 className="w-3 h-3" /> Aceita financiamento
                            </span>
                        </div>
                    </div>

                    {/* Tech Details List */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-900 mb-3">Informações do imóvel:</h3>
                        <div className="flex flex-col gap-2 text-xs">
                            <div className="flex justify-between border-b border-slate-100 pb-1">
                                <span className="text-slate-500 font-medium">Área Útil:</span>
                                <span className="text-slate-800 font-bold">{property.area || '-'} m²</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-1">
                                <span className="text-slate-500 font-medium">Área do Terreno:</span>
                                <span className="text-slate-800 font-bold">{property.area || '-'} m²</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-1">
                                <span className="text-slate-500 font-medium">Quartos:</span>
                                <span className="text-slate-800 font-bold">{property.bedrooms || '-'}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-1">
                                <span className="text-slate-500 font-medium">Banheiros:</span>
                                <span className="text-slate-800 font-bold">{property.bathrooms || '-'}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-1">
                                <span className="text-slate-500 font-medium">Vagas:</span>
                                <span className="text-slate-800 font-bold">{property.parking_spaces || '-'}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-1">
                                <span className="text-slate-500 font-medium">Condomínio:</span>
                                <span className="text-slate-800 font-bold">R$ {property.condominium ? property.condominium.toLocaleString('pt-BR') : '-'}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-1">
                                <span className="text-slate-500 font-medium">Tipo:</span>
                                <span className="text-slate-800 font-bold">Sobrado</span>
                            </div>
                            <div className="flex justify-between pb-1">
                                <span className="text-slate-500 font-medium">Status:</span>
                                <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded font-bold">Disponível</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Imóveis Relacionados */}
            {relatedProperties && relatedProperties.length > 0 && (
                <div className="mt-16 pt-8 border-t border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-blue-600" /> Imóveis Relacionados na Região
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProperties.map(rel => (
                            <Link href={`/painel/imoveis/${rel.id}`} key={rel.id} className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all hover:border-blue-200 flex flex-col">
                                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-slate-300"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                                        <p className="text-white font-bold text-lg leading-none">R$ {rel.price_sale?.toLocaleString('pt-BR')}</p>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-slate-800 text-sm line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
                                        {rel.title}
                                    </h3>
                                    <div className="mt-auto flex justify-between text-slate-500 text-xs font-medium">
                                        <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" />{rel.area}m</span>
                                        <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" />{rel.bedrooms}</span>
                                        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{rel.bathrooms}</span>
                                        <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" />{rel.parking_spaces}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}
