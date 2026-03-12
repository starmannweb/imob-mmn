"use client";

import { Bed, Bath, Car, Maximize2, MapPin, Heart, Plus, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
    property: {
        id: string;
        title: string;
        price: number;
        location: string;
        neighborhood: string;
        bedrooms: number;
        bathrooms: number;
        parking_spaces: number;
        area: number;
        image_url: string;
        status: 'venda' | 'locacao' | 'exclusivo';
        type: string;
    };
    primaryColor?: string;
}

export function SitePropertyCard({ property, primaryColor = "#000000" }: PropertyCardProps) {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative" style={{ "--site-primary": primaryColor } as React.CSSProperties}>
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                    src={property.image_url} 
                    alt={property.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                    {property.status === 'venda' && (
                        <span className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Venda</span>
                    )}
                    {property.status === 'locacao' && (
                        <span className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Locação</span>
                    )}
                    {property.status === 'exclusivo' && (
                        <span className="bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <Plus className="w-2.5 h-2.5" /> Exclusivo
                        </span>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <button className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-rose-500 transition-all shadow-xl">
                        <Heart className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-all shadow-xl">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                {/* Hover Details Button */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 w-[calc(100%-32px)]">
                    <button className="w-full bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest py-3 rounded-xl shadow-2xl flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all">
                        Ver Detalhes Completos <ChevronRight className="w-3.5 h-3.5 text-indigo-500" />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <MapPin className="w-3 h-3 text-indigo-400" />
                        {property.neighborhood}
                    </div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tighter line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {property.title}
                    </h3>
                </div>

                {/* Amenities Icons */}
                <div className="flex items-center gap-4 py-3 border-y border-slate-50">
                    <div className="flex flex-col items-center gap-1 group/icon">
                        <Bed className="w-4 h-4 text-slate-400 group-hover/icon:text-indigo-500 transition-colors" />
                        <span className="text-[10px] font-black text-slate-900">{property.bedrooms}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 group/icon">
                        <Bath className="w-4 h-4 text-slate-400 group-hover/icon:text-indigo-500 transition-colors" />
                        <span className="text-[10px] font-black text-slate-900">{property.bathrooms}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 group/icon">
                        <Car className="w-4 h-4 text-slate-400 group-hover/icon:text-indigo-500 transition-colors" />
                        <span className="text-[10px] font-black text-slate-900">{property.parking_spaces}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 group/icon ml-auto">
                        <Maximize2 className="w-4 h-4 text-slate-400 group-hover/icon:text-indigo-500 transition-colors" />
                        <span className="text-[10px] font-black text-slate-900">{property.area}m²</span>
                    </div>
                </div>

                {/* Price Section */}
                <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Valor do Investimento</span>
                        <span className="text-xl font-black text-slate-900 tracking-tighter">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)}
                        </span>
                    </div>
                    <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                        REF-{property.id.substring(0, 4)}
                    </div>
                </div>
            </div>
        </div>
    );
}
