export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import PersonalizarWizard from "./PersonalizarWizard";

export default async function PersonalizarPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    const siteSlug = profile?.referral_code?.toLowerCase() || user.id.substring(0, 8);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.adigitalmultinivel.com.br";

    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl pb-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 w-full">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/painel/meus-sites" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Meu Site</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Personalizar</span>
            </div>

            <PersonalizarWizard
                siteSlug={siteSlug}
                siteUrl={`${baseUrl}/corretor/${siteSlug}`}
                profile={profile}
            />
        </div>
    );
}
