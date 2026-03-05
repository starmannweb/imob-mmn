"use client";

import { useState } from "react";
import { updateProfileUrl } from "./actions";
import { Loader2 } from "lucide-react";

export function UrlEditForm({ initialValue }: { initialValue: string }) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleAction(formData: FormData) {
        setStatus("loading");
        setMessage("");

        const result = await updateProfileUrl(formData);

        if (result.error) {
            setStatus("error");
            setMessage(result.error);
        } else if (result.success) {
            setStatus("success");
            setMessage("URL atualizada com sucesso!");
        }
    }

    return (
        <form action={handleAction} className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">URL do Site (ID) <span className="text-red-500">*</span></label>
            <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-[11px] font-mono sm:inline hidden">imobpainel.com/corretor/</span>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-[11px] font-mono sm:hidden">.../</span>
                    <input
                        type="text"
                        name="referral_code"
                        defaultValue={initialValue}
                        className="bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-lg pl-10 sm:pl-[145px] pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 w-full focus:outline-none focus:border-blue-500 transition-colors font-mono"
                    />
                </div>
                <button type="submit" disabled={status === "loading"} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center min-w-[100px] w-full sm:w-auto transition-colors disabled:opacity-50">
                    {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar URL"}
                </button>
            </div>
            {message && (
                <span className={`text-xs font-bold ${status === "error" ? "text-red-500" : "text-emerald-500"}`}>
                    {message}
                </span>
            )}
        </form>
    );
}
