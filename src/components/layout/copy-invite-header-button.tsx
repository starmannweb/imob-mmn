"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

export function CopyInviteHeaderButton({ inviteLink }: { inviteLink: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <button 
            onClick={handleCopy}
            className={`px-5 py-2 rounded-full font-bold flex items-center gap-2 transition-colors text-sm shadow-sm ${
                copied 
                    ? "bg-green-500 hover:bg-green-600 text-white" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4" />
                    Link Copiado!
                </>
            ) : (
                <>
                    <Share2 className="w-4 h-4" />
                    Convidar novo corretor
                </>
            )}
        </button>
    );
}
