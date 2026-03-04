"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { forwardLead } from "./actions";

export function ForwardLeadCard({ lead, affiliates, properties }: any) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        await forwardLead(formData);
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:shadow-md transition-shadow group flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <input type="hidden" name="leadId" value={lead.id} />

            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate">{lead.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {lead.phone_whatsapp} {lead.email && `• ${lead.email}`}
                </p>
                {lead.property?.title && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 italic mt-1 truncate">⌂ Já interessado em: {lead.property.title}</p>
                )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
                <select
                    name="propertyId"
                    className="w-full sm:w-auto bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs text-slate-700 dark:text-slate-200 rounded-lg px-3 py-2 font-medium focus:ring-2 focus:ring-blue-500/30 outline-none"
                    defaultValue={lead.property_id || "none"}
                >
                    <option value="none">Nenhum Imóvel Específico</option>
                    {properties?.map((prop: any) => (
                        <option key={prop.id} value={prop.id}>
                            {prop.title.substring(0, 30)}...
                        </option>
                    ))}
                </select>

                <div className="flex w-full sm:w-auto items-center gap-2">
                    <select
                        name="affiliateId"
                        required
                        className="flex-1 sm:w-auto bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs text-slate-700 dark:text-slate-200 rounded-lg px-3 py-2 font-medium focus:ring-2 focus:ring-blue-500/30 outline-none"
                        defaultValue=""
                    >
                        <option value="" disabled>Selecionar Afiliado...</option>
                        {affiliates?.map((aff: any) => (
                            <option key={aff.id} value={aff.id}>
                                {aff.full_name || aff.id.substring(0, 8)}
                            </option>
                        ))}
                    </select>
                    <button
                        disabled={loading}
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 shrink-0"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </form>
    );
}
