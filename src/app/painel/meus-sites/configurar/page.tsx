import { ChevronRight, Settings } from "lucide-react";
import Link from "next/link";
import SiteSettingsClient from "./SiteSettingsClient";

export const dynamic = 'force-dynamic';

export default async function ConfigurarSitePage() {
    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl pb-12">
            {/* Breadcrumb text */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 w-full">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/painel/meus-sites" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Meu Site</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Configurações Avançadas</span>
            </div>

            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900">
                            <Settings className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Configurações do Site</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-sm">Ajuste aparências, menus, rodízio de leads, pop-ups e modos de operação.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area - Split Layout managed by Client */}
            <SiteSettingsClient />
            
        </div>
    );
}
