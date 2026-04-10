import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PainelLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0f172a]">
            <Sidebar />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header />
                <main className="flex-1 w-full bg-slate-50 dark:bg-[#0f172a]">
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
