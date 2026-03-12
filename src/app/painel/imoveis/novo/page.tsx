export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import PropertyWizard from "./PropertyWizard";

export default async function NovoImovelPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const params = await searchParams;

    return (
        <div className="animate-in flex-1 flex flex-col w-full pb-10">
            {params?.error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl shadow-sm animate-in fade-in">
                    <p className="font-semibold">{params.error}</p>
                </div>
            )}
            
            <PropertyWizard />
        </div>
    );
}
