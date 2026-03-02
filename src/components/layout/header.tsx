import { signOut } from "@/app/auth/actions";
import { createClient } from "@/utils/supabase/server";
import { Bell, User, LogOut } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

export default async function Header() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <header className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px w-full">

                    {/* Placeholder left side */}
                    <div className="flex flex-1">
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Notificações e Tema */}
                        <div className="flex items-center gap-2 border-r border-slate-200 dark:border-slate-700 pr-5 relative">
                            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative group">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-green-500 rounded-full border border-white dark:border-slate-900"></span>
                            </button>
                            <ThemeToggle />
                        </div>

                        {/* Perfil Dropdown */}
                        <div className="relative group cursor-pointer flex items-center gap-3 pl-1">
                            <div className="hidden sm:flex flex-col text-right">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">
                                    {user?.user_metadata?.full_name || "Corretor Afiliado"}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{(user?.user_metadata?.full_name?.split(' ')[0] || "corretor").toLowerCase()}@imob</span>
                            </div>

                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-200 font-bold overflow-hidden uppercase shrink-0 relative">
                                {(user?.user_metadata?.full_name || "Z").charAt(0)}
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                            </div>

                            {/* Dropdown Menu (Print 3 style) */}
                            <div className="absolute right-0 top-12 mt-2 w-48 bg-[#1a1f2c] border border-slate-700/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden text-slate-300">
                                <div className="p-1">
                                    <Link href="/painel/configuracoes" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800/50 hover:text-white rounded-lg transition-colors text-sm font-semibold">
                                        <User className="w-4 h-4" /> Perfil
                                    </Link>
                                    <form>
                                        <button formAction={signOut} className="flex items-center gap-3 px-3 py-2.5 w-full text-left hover:bg-slate-800/50 hover:text-white rounded-lg transition-colors text-sm font-semibold mt-1">
                                            <LogOut className="w-4 h-4" /> Sair
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
