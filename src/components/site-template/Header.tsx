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
        <header className="w-full bg-[#111111] overflow-hidden sticky top-0 z-50 shadow-2xl" style={{ "--site-primary": primaryColor } as React.CSSProperties}>
            {/* Top Bar: Contact & Socials */}
            <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-end text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-white/5">
                <div className="flex items-center gap-5">
                    {phone && (
                        <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                            <Phone className="w-3 h-3 text-[#c28e46]" />
                            {phone}
                        </a>
                    )}
                    <div className="flex items-center gap-3">
                        {socials?.facebook && (
                            <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <Facebook className="w-3.5 h-3.5" />
                            </a>
                        )}
                        {socials?.instagram && (
                            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <Instagram className="w-3.5 h-3.5" />
                            </a>
                        )}
                        {socials?.linkedin && (
                            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <Linkedin className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Header: Logo & Nav */}
            <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
                <Link href="/" className="flex flex-col group">
                    {logoUrl ? (
                        <img src={logoUrl} alt={brokerName} className="h-12 object-contain" />
                    ) : (
                        <span className="text-2xl font-black text-white uppercase tracking-tighter mb-0.5">{brokerName}</span>
                    )}
                    {creci && (
                        <span className="text-[9px] font-black text-[#c28e46] uppercase tracking-[0.2em] opacity-80">CRECI: {creci}</span>
                    )}
                </Link>

                <nav className="hidden md:block">
                    <ul className="flex items-center gap-2">
                        {[
                            { label: "Início", href: "#" },
                            { label: "Venda", href: "#" },
                            { label: "Locação", href: "#" },
                            { label: "Sobre", href: "#" },
                            { label: "Contato", href: "#" },
                            { label: "Financie", href: "#" },
                        ].map((item, i) => (
                            <li key={item.label}>
                                <Link 
                                    href={item.href}
                                    className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all rounded-md flex items-center gap-1.5
                                        ${i === 0 
                                            ? "text-[#c28e46] bg-white/5" 
                                            : "text-slate-300 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="hidden lg:flex px-6 py-2.5 bg-[#c28e46] hover:bg-[#a67738] text-white text-[10px] font-black uppercase tracking-widest rounded transition-colors items-center gap-2 shadow-lg shadow-[#c28e46]/20">
                        Meus Favoritos
                    </button>
                    <button className="md:hidden text-white p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
