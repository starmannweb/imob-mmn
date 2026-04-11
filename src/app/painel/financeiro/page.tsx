export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FinanceiroClient } from "./FinanceiroClient";

export default async function FinanceiroPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: transactions } = await supabase
        .from("transactions")
        .select(`*, property:properties(title)`)
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false });

    const list = transactions || [];
    const pendingTotal = list.filter(t => t.status === "pending").reduce((s, t) => s + Number(t.commission_base), 0);
    const completedTotal = list.filter(t => t.status === "completed").reduce((s, t) => s + Number(t.commission_base), 0);

    return (
        <FinanceiroClient
            transactions={list}
            pendingTotal={pendingTotal}
            completedTotal={completedTotal}
        />
    );
}
