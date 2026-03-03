import Link from "next/link";
import { BedDouble, Bath, Car, Maximize, MapPin, Star, ChevronRight } from "lucide-react";

export function PropertyCard({ property, brokerName, featured = false }: { property: any; brokerName: string; featured?: boolean }) {
    const p = property;

    return (
        <Link href={`/imoveis/${p.slug}`} className="group h-full">
            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">

                {/* Imagem */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105 bg-slate-200 dark:bg-slate-700"
                        style={{ backgroundImage: `url(${p.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'})` }}
                    />

                    {/* Badge Destaque */}
                    {featured && (
                        <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <Star className="w-3 h-3 fill-current" /> Destaque
                        </div>
                    )}

                    {/* Badge de verificação */}
                    <div className="absolute bottom-14 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* Preço overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
                        <p className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                            R$ {p.price_sale ? Number(p.price_sale).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : p.price_rent ? Number(p.price_rent).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : 'Sob Consulta'}
                        </p>
                    </div>
                </div>

                {/* Conteúdo */}
                <div className="p-4 flex flex-col flex-grow">
                    {/* Título */}
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-1 line-clamp-2 min-h-[2.5rem]">
                        {p.title}
                    </h3>
                    {/* Localização */}
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium mb-4">
                        <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                        <span className="truncate">{p.city || 'Santos'} - {p.state || 'SP'}</span>
                    </div>

                    {/* Features */}
                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-3 mt-auto">
                        {p.bedrooms && (
                            <div className="flex flex-col items-center gap-0.5">
                                <BedDouble className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.bedrooms}</span>
                                <span className="text-[10px] text-slate-400 font-medium">Quartos</span>
                            </div>
                        )}
                        {p.bathrooms && (
                            <div className="flex flex-col items-center gap-0.5">
                                <Bath className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.bathrooms}</span>
                                <span className="text-[10px] text-slate-400 font-medium">Banheiros</span>
                            </div>
                        )}
                        {p.parking_spaces !== null && p.parking_spaces !== undefined && (
                            <div className="flex flex-col items-center gap-0.5">
                                <Car className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.parking_spaces}</span>
                                <span className="text-[10px] text-slate-400 font-medium">Vagas</span>
                            </div>
                        )}
                        {p.area && (
                            <div className="flex flex-col items-center gap-0.5">
                                <Maximize className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.area}</span>
                                <span className="text-[10px] text-slate-400 font-medium">m²</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer do card — Corretor */}
                <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">
                            {brokerName?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate max-w-[140px]">{brokerName}</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
            </div>
        </Link>
    );
}
