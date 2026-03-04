"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function forwardLead(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Sem permissão" };

    const leadId = formData.get("leadId") as string;
    const affiliateId = formData.get("affiliateId") as string;
    const propertyId = formData.get("propertyId") as string;

    if (!leadId || !affiliateId) {
        return { error: "Faltam dados do lead ou do afiliado" };
    }

    const payload: any = {
        assigned_to: affiliateId,
        status: "new", // Fica como novo para o afiliado
    };

    if (propertyId && propertyId !== "none") {
        payload.property_id = propertyId;
    }

    const { error } = await supabase
        .from("leads")
        .update(payload)
        .eq("id", leadId);

    if (error) {
        console.error("Erro ao encaminhar lead:", error);
        return { error: "Erro ao encaminhar o lead" };
    }

    revalidatePath("/painel/seletor");
    revalidatePath("/painel/leads");
    return { success: true };
}
