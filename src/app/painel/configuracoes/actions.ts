"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfileUrl(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Não autorizado" };
    }

    const newSlug = formData.get("referral_code") as string;

    if (!newSlug || newSlug.trim() === "") {
        return { error: "A URL não pode estar vazia" };
    }

    // regex para letras minúsculas, números, hífen ou underline
    if (!/^[a-zA-Z0-9_-]+$/.test(newSlug)) {
        return { error: "A URL pode conter apenas letras, números, hifens e underlines." };
    }

    const cleanedSlug = newSlug.trim().toLowerCase();

    // Verify uniqueness
    const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("referral_code", cleanedSlug)
        .neq("id", user.id)
        .maybeSingle();

    if (existingUser) {
        return { error: "Esta URL já está reservada por outro corretor. Escolha outra." };
    }

    // Update
    const { error: updateError } = await supabase
        .from("users")
        .update({ referral_code: cleanedSlug })
        .eq("id", user.id);

    if (updateError) {
        return { error: "Ocorreu um erro ao atualizar o perfil." };
    }

    revalidatePath("/painel/configuracoes");

    return { success: true };
}

export async function updateSiteSettings(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Não autorizado" };
    }

    const primaryColor = formData.get("primary_color") as string;
    const logoUrl = formData.get("logo_url") as string;
    const facebook = formData.get("facebook") as string;
    const instagram = formData.get("instagram") as string;
    const linkedin = formData.get("linkedin") as string;
    const phone = formData.get("phone") as string;
    const creci = formData.get("creci") as string;

    const siteSettings = {
        primary_color: primaryColor || "#000000",
        logo_url: logoUrl || null,
        socials: {
            facebook: facebook || null,
            instagram: instagram || null,
            linkedin: linkedin || null
        },
        phone: phone || null
    };

    const { error: updateError } = await supabase
        .from("users")
        .update({ 
            site_settings: siteSettings,
            creci: creci || null
        })
        .eq("id", user.id);

    if (updateError) {
        return { error: "Ocorreu um erro ao atualizar as configurações do site." };
    }

    revalidatePath("/painel/configuracoes");

    return { success: true };
}
