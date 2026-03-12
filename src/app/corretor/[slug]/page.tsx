export const dynamic = 'force-dynamic';

import { createAdminClient } from "@/utils/supabase/admin";
import { notFound } from "next/navigation";
import { SiteTemplateWrapper } from "@/components/site-template/SiteTemplateWrapper";

export default async function BrokerPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const supabase = createAdminClient();

    // Verificar se o slug é um UUID válido
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

    // Buscar dados do corretor
    let broker: any = null;

    const { data: byCode } = await supabase
        .from("users")
        .select("id, full_name, referral_code, document, creci, site_settings")
        .ilike("referral_code", slug)
        .maybeSingle();

    if (byCode) {
        broker = byCode;
    } else if (isUUID) {
        const { data: byId } = await supabase
            .from("users")
            .select("id, full_name, referral_code, document, creci, site_settings")
            .eq("id", slug)
            .maybeSingle();
        broker = byId;
    }

    if (!broker) {
        notFound();
    }

    // Buscar os imóveis da carteira desse corretor
    const { data: properties } = await supabase
        .from("properties")
        .select("*")
        .eq("owner_id", broker.id)
        .order('created_at', { ascending: false });

    // Separar imóveis em destaque (os 3 primeiros)
    const featured = properties?.slice(0, 3) || [];
    const allProperties = properties || [];

    const settings = broker.site_settings || {};

    return (
        <SiteTemplateWrapper 
            broker={{
                id: broker.id,
                full_name: broker.full_name,
                creci: broker.creci,
                referral_code: broker.referral_code,
                phone: settings.phone,
                socials: settings.socials
            }}
            properties={allProperties}
            featuredProperties={featured}
            primaryColor={settings.primary_color}
            logoUrl={settings.logo_url}
        />
    );
}
