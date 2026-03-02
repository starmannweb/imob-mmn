"use server";

import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";

export async function seedProperties() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Não autorizado" };

    const dummyProperties = [
        {
            owner_id: user.id,
            title: "Casa de Luxo em Condomínio Fechado",
            description: "Ampla casa com fino acabamento, segurança 24h e área de lazer completa. Ideal para grandes famílias.",
            price_sale: 1500000,
            price_rent: null,
            iptu: 3000,
            condominium: 1500,
            bedrooms: 4,
            bathrooms: 5,
            suites: 4,
            parking_spaces: 3,
            area: 350,
            slug: "casa-luxo-condominio-" + Date.now() + Math.floor(Math.random() * 1000),
            status: "available",
        },
        {
            owner_id: user.id,
            title: "Apartamento Vista Mar no Gonzaga",
            description: "Apartamento moderno e reformado, varanda gourmet, 2 quadras da praia. Oportunidade única.",
            price_sale: 850000,
            price_rent: 4500,
            iptu: 1800,
            condominium: 850,
            bedrooms: 3,
            bathrooms: 2,
            suites: 1,
            parking_spaces: 2,
            area: 120,
            slug: "apto-vista-mar-gonzaga-" + Date.now() + Math.floor(Math.random() * 1000),
            status: "available",
        },
        {
            owner_id: user.id,
            title: "Cobertura Duplex no Boqueirão",
            description: "Espetacular cobertura com piscina privativa, churrasqueira e vista panorâmica.",
            price_sale: 2200000,
            price_rent: null,
            iptu: 4500,
            condominium: 2100,
            bedrooms: 3,
            bathrooms: 4,
            suites: 3,
            parking_spaces: 3,
            area: 280,
            slug: "cobertura-duplex-boqueirao-" + Date.now() + Math.floor(Math.random() * 1000),
            status: "available",
        },
        {
            owner_id: user.id,
            title: "Sala Comercial Connect City",
            description: "Sala nova em prédio empresarial de alto padrão, ideal para consultórios ou escritórios.",
            price_sale: 350000,
            price_rent: 2800,
            iptu: 1200,
            condominium: 500,
            bedrooms: null,
            bathrooms: 1,
            suites: null,
            parking_spaces: 1,
            area: 45,
            slug: "sala-comercial-connect-" + Date.now() + Math.floor(Math.random() * 1000),
            status: "available",
        },
        {
            owner_id: user.id,
            title: "Sobrado Recém Construído",
            description: "Sobrado geminado, 2 suítes, quintal aos fundos com espaço para churrasqueira.",
            price_sale: 590000,
            price_rent: null,
            iptu: 1500,
            condominium: null,
            bedrooms: 2,
            bathrooms: 3,
            suites: 2,
            parking_spaces: 2,
            area: 110,
            slug: "sobrado-recem-construido-" + Date.now() + Math.floor(Math.random() * 1000),
            status: "available",
        }
    ];

    const adminClient = createAdminClient();
    const { data: insertedProps, error } = await adminClient.from("properties").insert(dummyProperties).select('id');

    if (error) {
        console.error("Erro ao inserir seeds (Imóveis):", error);
        return { error: error.message };
    }

    // Insert dummy leads mapped to properties
    if (insertedProps && insertedProps.length > 0) {
        const dummyLeads = [
            {
                property_id: insertedProps[0].id,
                assigned_to: user.id,
                name: "Carlos Andrade",
                phone_whatsapp: "11988887777",
                email: "carlos@exemplo.com",
                status: "new"
            },
            {
                property_id: insertedProps[1].id,
                assigned_to: user.id,
                name: "Marcia Fernandes",
                phone_whatsapp: "11977776666",
                email: "marciaf@exemplo.com",
                status: "negotiating"
            },
            {
                property_id: null,
                assigned_to: user.id,
                name: "João Silva (Genérico)",
                phone_whatsapp: "11955554444",
                status: "contacted"
            }
        ];

        await adminClient.from("leads").insert(dummyLeads);

        // Dummy transactions
        const dummyTransaction = {
            property_id: insertedProps[2].id,
            seller_id: user.id,
            total_value: 2200000,
            commission_base: 132000,
            status: "pending"
        };

        await adminClient.from("transactions").insert(dummyTransaction);
    }

    revalidatePath("/painel/imoveis");
    revalidatePath("/painel/leads");
    revalidatePath("/painel/financeiro");
    revalidatePath("/imoveis");
    return { success: true };
}

export async function clearProperties() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Não autorizado" };

    // Delete transactions, properties and leads for this user ONLY
    const adminClient = createAdminClient();
    const { data: propsToDelete } = await adminClient.from("properties").select("id").eq("owner_id", user.id);
    if (propsToDelete && propsToDelete.length > 0) {
        const propIds = propsToDelete.map(p => p.id);
        await adminClient.from("leads").delete().in("property_id", propIds);
        await adminClient.from("transactions").delete().in("property_id", propIds);
    }
    await adminClient.from("leads").delete().eq("assigned_to", user.id);
    await adminClient.from("transactions").delete().eq("seller_id", user.id);
    const { error } = await adminClient.from("properties").delete().eq("owner_id", user.id);

    if (error) {
        console.error("Erro ao limpar dados:", error);
        return { error: error.message };
    }

    revalidatePath("/painel/imoveis");
    revalidatePath("/painel/leads");
    revalidatePath("/painel/financeiro");
    revalidatePath("/imoveis");
    return { success: true };
}
