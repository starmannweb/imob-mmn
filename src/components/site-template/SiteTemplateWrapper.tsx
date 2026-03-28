"use client";

import { SiteHeader } from "./Header";
import { SiteHero } from "./Hero";
import { SitePropertyCard } from "./PropertyCard";
import { SiteWhatsAppButton } from "./WhatsAppButton";

interface SiteTemplateProps {
    broker: {
        id: string;
        full_name: string;
        creci?: string;
        referral_code?: string;
        phone?: string;
        email?: string;
        socials?: any;
    };
    properties: any[];
    featuredProperties: any[];
    primaryColor?: string;
    logoUrl?: string;
}

export function SiteTemplateWrapper({ broker, properties, featuredProperties, primaryColor = "#000000", logoUrl }: SiteTemplateProps) {
    const featured = featuredProperties[0] ? {
        id: featuredProperties[0].id,
        title: featuredProperties[0].title,
        price: featuredProperties[0].price_sale || featuredProperties[0].price_rent,
        location: `${featuredProperties[0].neighborhood}, ${featuredProperties[0].city}`,
        bedrooms: featuredProperties[0].bedrooms,
        bathrooms: featuredProperties[0].bathrooms,
        parking_spaces: featuredProperties[0].parking_spaces,
        area: featuredProperties[0].area_useful || featuredProperties[0].area,
        image_url: featuredProperties[0].cover_image_url || "/next.svg", // Fallback image
        type: featuredProperties[0].type
    } : undefined;

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans" style={{ "--site-primary": primaryColor } as React.CSSProperties}>
            {/* 1. HEADER */}
            <SiteHeader 
                brokerName={broker.full_name}
                creci={broker.creci}
                logoUrl={logoUrl}
                phone={broker.phone || "(11) 99999-9999"}
                socials={broker.socials}
                primaryColor={primaryColor}
            />

            {/* 2. HERO + SEARCH */}
            <SiteHero 
                featuredProperty={featured}
                primaryColor={primaryColor}
            />

            {/* 3. PROPERTY GRID */}
            <main className="max-w-7xl mx-auto px-4 py-20 w-full space-y-12">
                <div className="flex flex-col items-center text-center space-y-4">
                    <span className="text-[11px] font-black text-[#c28e46] uppercase tracking-[0.3em]">Nossa Vitrine</span>
                    <h2 className="text-4xl font-black text-[#111111] tracking-tighter uppercase relative">Imóveis Selecionados</h2>
                    <div className="w-12 h-1 bg-[#c28e46] rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((prop) => (
                        <SitePropertyCard 
                            key={prop.id}
                            property={{
                                id: prop.id,
                                title: prop.title,
                                price: prop.price_sale || prop.price_rent,
                                location: `${prop.neighborhood}, ${prop.city}`,
                                neighborhood: prop.neighborhood,
                                bedrooms: prop.bedrooms,
                                bathrooms: prop.bathrooms,
                                parking_spaces: prop.parking_spaces,
                                area: prop.area_useful || prop.area,
                                image_url: prop.cover_image_url || "/next.svg",
                                status: prop.price_sale ? 'venda' : 'locacao',
                                type: prop.type
                            }}
                            primaryColor={primaryColor}
                        />
                    ))}
                </div>

                {properties.length === 0 && (
                    <div className="text-center py-20 opacity-40">
                        <p className="text-lg font-black text-slate-400 uppercase tracking-widest">Nenhum imóvel disponível no momento.</p>
                    </div>
                )}
            </main>

            {/* 4. WHATSAPP BUTTON */}
            <SiteWhatsAppButton 
                phone={broker.phone || "5511999999999"}
                brokerName={broker.full_name}
                primaryColor={primaryColor}
            />

            {/* FOOTER */}
            <footer className="bg-[#111111] text-white py-16 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-2xl font-black uppercase tracking-tighter mb-1">{broker.full_name}</span>
                        <span className="text-[10px] font-bold text-[#c28e46] uppercase tracking-widest">CRECI: {broker.creci}</span>
                    </div>
                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest text-center md:text-right leading-relaxed">
                        Este site utiliza cookies para oferecer a melhor experiência. <a href="#" className="text-white hover:text-[#c28e46] transition-colors underline underline-offset-4">Saiba mais</a><br/>
                        © {new Date().getFullYear()} {broker.full_name}. Todos os direitos reservados.
                        <br />
                        <span className="text-slate-600 mt-2 block">Desenvolvido por Imob-Multinivel</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
