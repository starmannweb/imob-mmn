"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProperty(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Não autorizado");
    }

    // Gera slug a partir do título
    const title = formData.get("title") as string;
    const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-") + "-" + Date.now();

    const propertyData = {
        owner_id: user.id,
        title,
        description: formData.get("description") as string,
        price_sale: formData.get("price_sale") ? parseFloat(formData.get("price_sale") as string) : null,
        price_rent: formData.get("price_rent") ? parseFloat(formData.get("price_rent") as string) : null,
        iptu: formData.get("iptu") ? parseFloat(formData.get("iptu") as string) : null,
        condominium: formData.get("condominium") ? parseFloat(formData.get("condominium") as string) : null,
        bedrooms: formData.get("bedrooms") ? parseInt(formData.get("bedrooms") as string) : null,
        bathrooms: formData.get("bathrooms") ? parseInt(formData.get("bathrooms") as string) : null,
        suites: formData.get("suites") ? parseInt(formData.get("suites") as string) : null,
        parking_spaces: formData.get("parking_spaces") ? parseInt(formData.get("parking_spaces") as string) : null,
        area: formData.get("area") ? parseFloat(formData.get("area") as string) : null,
        slug,
        status: formData.get("status") as "available" | "sold" | "rented" || "available",
    };

    const { data, error } = await supabase
        .from("properties")
        .insert([propertyData])
        .select()
        .single();

    if (error) {
        console.error("Erro ao criar imóvel:", error);
        redirect("/painel/imoveis/novo?error=Erro ao criar imóvel: " + error.message);
    }

    revalidatePath("/painel/imoveis");
    redirect("/painel/imoveis");
}

export async function deleteProperty(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) {
        console.error("Erro deletar:", error);
    }
    revalidatePath("/painel/imoveis");
}
