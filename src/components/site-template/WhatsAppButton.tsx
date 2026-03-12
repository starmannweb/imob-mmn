"use client";

import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

interface WhatsAppButtonProps {
    phone: string;
    brokerName: string;
    message?: string;
    primaryColor?: string;
}

export function SiteWhatsAppButton({ phone, brokerName, message = "Olá! Gostaria de mais informações sobre os imóveis.", primaryColor = "#25D366" }: WhatsAppButtonProps) {
    const [showBubble, setShowBubble] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBubble(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4" style={{ "--site-primary": primaryColor } as React.CSSProperties}>
            {/* Passive Chat Bubble */}
            {showBubble && (
                <div className="bg-white rounded-3xl shadow-2xl p-4 border border-slate-100 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
                    <button 
                        onClick={() => setShowBubble(false)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full flex items-center justify-center transition-all"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg font-black text-indigo-600">
                            {brokerName.charAt(0)}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Olá! 👋</p>
                            <p className="text-sm font-black text-slate-900 leading-tight">Estou disponível para tirar suas dúvidas agora mesmo!</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main WhatsApp Button */}
            <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 transition-all hover:scale-110 active:scale-95 group relative overflow-hidden"
            >
                <MessageCircle className="w-8 h-8 group-hover:animate-bounce" />
                <div className="absolute inset-0 bg-white/20 translate-y-16 group-hover:translate-y-0 transition-transform duration-500"></div>
            </a>
        </div>
    );
}
