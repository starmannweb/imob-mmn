"use client";

import { Search, MapPin, Building, Bed, Bath, Car, Maximize2, Sparkles, ChevronRight, LayoutDashboard, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdvancedSearch } from "./AdvancedSearch";

interface HeroProps {
    featuredProperty?: {
        id: string;
        title: string;
        price: number;
        location: string;
        bedrooms: number;
        bathrooms: number;
        parking_spaces: number;
        area: number;
        image_url: string;
        type: string;
    };
    primaryColor?: string;
}

export function SiteHero({ featuredProperty, primaryColor = "#000000" }: HeroProps) {
    return (
        <section className="relative w-full overflow-hidden bg-slate-100" style={{ "--site-primary": primaryColor } as React.CSSProperties}>
            {/* Background Banner */}
            <div className="relative h-[600px] w-full">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                {featuredProperty?.image_url ? (
                    <img src={featuredProperty.image_url} alt={featuredProperty.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                        <Building className="w-24 h-24 text-slate-800" />
                    </div>
                )}

                {/* Floating Featured Card (Glassmorphism inspired) */}
                {featuredProperty && (
                    <div className="absolute top-1/2 left-8 md:left-16 -translate-y-1/2 z-20 max-w-sm w-full animate-in fade-in slide-in-from-left-8 duration-700">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 backdrop-blur-sm">
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-emerald-500/20">
                                        Destaque Exclusivo
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{featuredProperty.title}</h2>
                                    <p className="text-sm font-bold text-slate-500 flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" /> {featuredProperty.location}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 py-2 border-y border-slate-50">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Preço</span>
                                        <span className="text-xl font-black text-slate-900">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(featuredProperty.price)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col ml-auto">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Referência</span>
                                        <span className="text-xs font-bold text-slate-600">REF-{featuredProperty.id.substring(0, 4)}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                                        <Bed className="w-4 h-4 text-slate-400" /> {featuredProperty.bedrooms}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                                        <Bath className="w-4 h-4 text-slate-400" /> {featuredProperty.bathrooms}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                                        <Maximize2 className="w-4 h-4 text-slate-400" /> {featuredProperty.area}m²
                                    </div>
                                </div>
                                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest py-6 rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 gap-2">
                                    Ver Detalhes do Imóvel <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Advanced Search Bar (Minimalist) */}
            <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-30 pb-12 w-full">
                <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 p-3 flex flex-col md:flex-row items-center gap-2">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full">
                        <div className="px-6 py-3 border-r border-slate-50 flex flex-col justify-center">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Finalidade</label>
                            <select className="bg-transparent font-black text-sm text-[#111111] outline-none appearance-none cursor-pointer">
                                <option>Comprar</option>
                                <option>Alugar</option>
                            </select>
                        </div>
                        <div className="px-6 py-3 border-r border-slate-50 flex flex-col justify-center">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tipo de Imóvel</label>
                            <select className="bg-transparent font-black text-sm text-[#111111] outline-none appearance-none cursor-pointer">
                                <option>Todos os tipos</option>
                                <option>Casa</option>
                                <option>Apartamento</option>
                                <option>Terreno</option>
                            </select>
                        </div>
                        <div className="px-6 py-3 border-r border-slate-50 flex flex-col justify-center">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cidade / Bairro</label>
                            <input type="text" placeholder="Qualquer local" className="bg-transparent font-black text-sm text-[#111111] outline-none placeholder:text-slate-300" />
                        </div>
                        <div className="px-6 py-3 flex flex-col justify-center relative group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Referência</label>
                            <div className="flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4 text-[#c28e46] group-hover:text-[#111111] transition-colors" />
                                <input type="text" placeholder="Código" className="bg-transparent font-black text-sm text-[#111111] outline-none placeholder:text-slate-300 w-20" />
                            </div>
                        </div>
                    </div>
                    <Button className="w-full md:w-auto bg-[#c28e46] hover:bg-[#a67738] text-white font-black text-xs uppercase tracking-widest px-10 py-8 rounded-[24px] shadow-lg shadow-[#c28e46]/30 transition-all hover:scale-105 active:scale-95 gap-3">
                        <Search className="w-5 h-5" /> Buscar Imóvel
                    </Button>
                </div>
                
                {/* IA Prompt Hint */}
                <div className="mt-6 flex items-center justify-center gap-4">
                    <AdvancedSearch primaryColor={primaryColor} />
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <Sparkles className="w-3.5 h-3.5 text-[#c28e46]" />
                        Buscar através da nossa IA inteligente? <span className="text-[#c28e46] cursor-pointer hover:underline font-black">Testar agora</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
