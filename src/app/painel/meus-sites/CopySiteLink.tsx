"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // Using sonner as it's common in Next.js stacks and they probably have a toaster

export function CopySiteLink({ siteUrl }: { siteUrl: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(siteUrl);
        setCopied(true);
        try { toast.success("Link do site copiado!"); } catch(e) {}
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-2 w-full mt-2">
            <input
                readOnly
                value={siteUrl}
                className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 px-4 py-2.5 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400"
            />
            <button 
                onClick={handleCopy}
                className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm
                    ${copied 
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                        : 'bg-slate-900 dark:bg-blue-600 text-white hover:bg-slate-800 dark:hover:bg-blue-700'
                    }`}
            >
                {copied ? <><Check className="w-4 h-4" /> Copiado</> : <><Copy className="w-4 h-4" /> Copiar</>}
            </button>
        </div>
    );
}
