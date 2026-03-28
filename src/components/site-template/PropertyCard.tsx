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
            <div className="relative aspect-[4/3] overflow-hidden group-hover:brightness-90 transition-all duration-500">
                <img 
                    src={property.image_url} 
                    alt={property.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/20 hover:bg-white text-white hover:text-black w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
                        <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button className="bg-white/20 hover:bg-white text-white hover:text-black w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Tags on Image Bottom */}
                <div className="absolute bottom-3 left-4 flex gap-2 z-20">
                    <span className="bg-[#1a1a1a] text-white text-[10px] font-bold px-3 py-1 shadow-md border border-white/10">
                        Ref-{property.id.substring(0, 4)}
                    </span>
                    <span className="bg-[#c28e46] text-white text-[10px] font-bold px-3 py-1 shadow-md uppercase tracking-wider">
                        {property.status === 'venda' ? 'Venda' : property.status === 'locacao' ? 'Locação' : 'Exclusivo'}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 pb-0 flex-1 flex flex-col bg-white">
                <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                        <MapPin className="w-3.5 h-3.5 text-slate-700" />
                        {property.location}
                    </div>
                    <h3 className="text-base font-black text-slate-900 line-clamp-1 group-hover:text-[#c28e46] transition-colors">
                        {property.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium">
                        {property.type === 'apartment' ? 'Apartamento' : property.type === 'house' ? 'Casa Alto Padrão' : 'Imóvel'}
                    </p>
                </div>

                {/* Specs List */}
                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-[13px] text-slate-600">
                        <span className="w-24 text-slate-400">Dormitórios</span>
                        <span className="font-bold text-slate-800">{property.bedrooms}</span>
                        {property.bedrooms > 1 && <span className="ml-1 text-slate-500 text-[11px]">sendo 1 suíte</span>}
                    </div>
                    <div className="flex items-center text-[13px] text-slate-600">
                        <span className="w-24 text-slate-400">Garagens</span>
                        <span className="font-bold text-slate-800">{property.parking_spaces}</span>
                    </div>
                    <div className="flex items-center text-[13px] text-slate-600">
                        <span className="w-24 text-slate-400">Área Privativa</span>
                        <span className="font-bold text-slate-800">{property.area}m²</span>
                    </div>
                </div>

                {/* Price Section */}
                <div className="flex items-end justify-between border-t border-slate-100 pt-5 pb-4 mt-auto">
                    <div className="font-black text-[#c28e46] text-xl tracking-tight">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)}
                    </div>
                    <button className="text-rose-500 hover:scale-110 hover:text-rose-600 transition-transform">
                        <Heart className="w-5 h-5" strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* Black Bar Bottom */}
            <div className="bg-black text-white text-center py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] group-hover:bg-[#c28e46] transition-colors cursor-pointer">
                Lançamento
            </div>
        </div>
    );
}
