import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log("Buscando usuário Ricieri...");
    const { data: user, error: userError } = await supabase.from('users').select('*').ilike('referral_code', '4tru7xx4').single();

    if (userError || !user) {
        console.error("Usuário não encontrado!");
        return;
    }
    console.log("Usuário encontrado:", user.full_name);

    console.log("Limpando propriedades antigas...");
    await supabase.from('properties').delete().eq('owner_id', user.id);

    console.log("Inserindo propriedades fictícias...");
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
            status: "available"
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
            status: "available"
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
            status: "available"
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
            status: "available"
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
            status: "available"
        }
    ];

    const { data: inserted, error } = await supabase.from('properties').insert(dummyProperties).select('*');
    if (error) {
        console.error("Erro ao inserir:", error);
    } else {
        console.log(`Sucesso: Inseridos ${inserted.length} imóveis falsos!`);
    }
}

main();
