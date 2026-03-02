"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        redirect("/login?message=Could not authenticate user");
    }

    revalidatePath("/", "layout");
    redirect("/painel");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const refCode = formData.get("ref_code") as string;
    const fullName = formData.get("full_name") as string;

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            data: {
                full_name: fullName,
            }
        }
    };

    const { data: authData, error } = await supabase.auth.signUp(data);

    if (error) {
        redirect("/registrar?message=Erro ao criar o usuário: " + error.message);
    }

    // Gera um referral code único para este novo usuário
    const newReferralCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Se passou um ref_code originário de um convite, buscamos o dono
    let referredBy = null;
    if (refCode) {
        const { data: parentUser } = await supabase
            .from("users")
            .select("id")
            .eq("referral_code", refCode)
            .single();
        if (parentUser) {
            referredBy = parentUser.id;
        }
    }

    // Atualiza o perfil na tabela users (criada pelo trigger) usando chave bypass para evitar falhas se a confirmação de email estiver ligada
    if (authData.user) {
        const { createClient: createSupbaseClient } = await import("@supabase/supabase-js");
        const adminSupabase = createSupbaseClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        await adminSupabase.from("users").update({
            referral_code: newReferralCode,
            referred_by: referredBy,
        }).eq("id", authData.user.id);
    }

    revalidatePath("/", "layout");
    redirect("/painel");
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/login");
}
