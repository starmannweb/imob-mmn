"use client";

import { Share2, Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InviteBrokerButtonProps {
    inviteLink: string;
}

export default function InviteBrokerButton({ inviteLink }: InviteBrokerButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm">
                    <Share2 className="w-4 h-4" />
                    Convidar Afiliado
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl">Convidar Corretor Afiliado</DialogTitle>
                    <DialogDescription>
                        Compartilhe seu link exclusivo para cadastrar novos corretores na sua rede e multiplicar seus ganhos.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 mt-4">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={inviteLink}
                            readOnly
                            className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                        />
                    </div>
                    <Button type="button" size="sm" className="px-3" onClick={handleCopy} variant={copied ? "default" : "secondary"}>
                        <span className="sr-only">Copiar</span>
                        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
