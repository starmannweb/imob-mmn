"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addLead(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;

    await supabase.from("leads").insert({
        name,
        phone_whatsapp: phone,
        email,
        assigned_to: user.id,
        status: "new",
    });

    revalidatePath("/painel/leads");
}
