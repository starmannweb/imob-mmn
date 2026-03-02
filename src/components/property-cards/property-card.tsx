import Link from 'next/link';
import { BedDouble, Bath, Car, Maximize } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
    slug: string;
    title: string;
    price_sale?: number | null;
    price_rent?: number | null;
    bedrooms?: number | null;
    bathrooms?: number | null;
    parking_spaces?: number | null;
    area?: number | null;
    status: string;
    image?: string;
    agentName?: string;
}

export function PropertyCard({
    slug, title, price_sale, price_rent, bedrooms, bathrooms, parking_spaces, area, status, image, agentName
}: PropertyCardProps) {
    return (
        <Card className="overflow-hidden bg-white hover:shadow-lg transition-all duration-300 border-slate-200 group flex flex-col h-full">
            <Link href={`/imoveis/${slug}`} className="relative block aspect-[4/3] overflow-hidden bg-slate-100">
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                    {status === 'available' && (
                        <Badge className="bg-blue-600 hover:bg-blue-700">Para Venda</Badge>
                    )}
                </div>

                {/* Usando div como placeholder de imagem de fundo */}
                <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'})` }}
                />

                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{title}</h3>
                    <p className="text-white/80 text-sm font-medium line-clamp-1">
                        {agentName ? `Por ${agentName}` : 'Direto com Corretor'}
                    </p>
                </div>
            </Link>

            <CardContent className="p-5 flex-grow">
                <div className="mb-4">
                    {price_sale ? (
                        <div className="text-2xl font-extrabold text-slate-900">
                            R$ {price_sale.toLocaleString('pt-BR')}
                        </div>
                    ) : (
                        <div className="text-xl font-bold text-slate-700">Sob Consulta</div>
                    )}
                </div>

                <div className="grid grid-cols-4 gap-2 border-t border-slate-100 pt-4 mt-auto">
                    {area && (
                        <div className="flex flex-col items-center justify-center text-slate-600">
                            <Maximize className="w-4 h-4 mb-1" />
                            <span className="text-xs font-semibold">{area} m²</span>
                        </div>
                    )}
                    {bedrooms && (
                        <div className="flex flex-col items-center justify-center text-slate-600">
                            <BedDouble className="w-4 h-4 mb-1" />
                            <span className="text-xs font-semibold">{bedrooms}</span>
                        </div>
                    )}
                    {bathrooms && (
                        <div className="flex flex-col items-center justify-center text-slate-600">
                            <Bath className="w-4 h-4 mb-1" />
                            <span className="text-xs font-semibold">{bathrooms}</span>
                        </div>
                    )}
                    {parking_spaces !== undefined && parking_spaces !== null && (
                        <div className="flex flex-col items-center justify-center text-slate-600">
                            <Car className="w-4 h-4 mb-1" />
                            <span className="text-xs font-semibold">{parking_spaces}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
