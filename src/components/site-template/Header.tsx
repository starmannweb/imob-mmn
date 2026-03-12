"use client";

import Link from "next/link";
import { Phone, Facebook, Instagram, Linkedin, Search } from "lucide-react";

interface HeaderProps {
    logoUrl?: string;
    brokerName: string;
    creci?: string;
    phone?: string;
    socials?: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
    };
    primaryColor?: string;
}

export function SiteHeader({ logoUrl, brokerName, creci, phone, socials, primaryColor = "#000000" }: HeaderProps) {
    return (
        <header className="w-full bg-white border-b border-slate-100" style={{ "--site-primary": primaryColor } as React.CSSProperties}>
            {/* Top Bar: Contact & Socials */}
            <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <div className="flex items-center gap-4">
                    {phone && (
                        <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {phone}
                        </a>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    {socials?.facebook && (
                        <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">
                            <Facebook className="w-4 h-4" />
                        </a>
                    )}
                    {socials?.instagram && (
                        <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">
                            <Instagram className="w-4 h-4" />
                        </a>
                    )}
                    {socials?.linkedin && (
                        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>

            {/* Main Header: Logo & CRECI */}
            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center border-t border-slate-50">
                <Link href="/" className="flex flex-col items-center group">
                    {logoUrl ? (
                        <img src={logoUrl} alt={brokerName} className="h-16 object-contain mb-2" />
                    ) : (
                        <span className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1">{brokerName}</span>
                    )}
                    {creci && (
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">CRECI: {creci}</span>
                    )}
                </Link>
            </div>

            {/* Navigation Bar */}
            <nav className="bg-white border-t border-slate-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
                    <ul className="flex items-center gap-1 py-1">
                        {[
                            { label: "Início", href: "#" },
                            { label: "Imóveis", href: "#" },
                            { label: "Sobre", href: "#" },
                            { label: "Financie", href: "#" },
                            { label: "Contato", href: "#" },
                        ].map((item, i) => (
                            <li key={item.label}>
                                <Link 
                                    href={item.href}
                                    className={`px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all rounded-md
                                        ${i === 0 
                                            ? "bg-slate-900 text-white shadow-lg" 
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
