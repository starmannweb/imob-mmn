export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { TemplatesPageClient } from "./TemplatesPageClient";

export default async function TemplatesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl pb-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 w-full">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/painel/meus-sites" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Meus Sites</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Modelos de site</span>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Modelos de site</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Escolha um modelo para personalizar seu site</p>
            </div>

            <TemplatesPageClient />
        </div>
    );
}
