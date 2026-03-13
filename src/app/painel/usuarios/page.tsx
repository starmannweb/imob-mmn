export const dynamic = 'force-dynamic';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import UsersPageClient from "./UsersPageClient";

export default async function UsuariosPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Buscar perfil do usuário atual
    const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    if (!profile) {
        redirect("/painel");
    }

    // Verificar permissão
    const canView = hasPermission(profile.role, 'canViewAllUsers');
    if (!canView) {
        redirect("/painel");
    }

    // Buscar todos os usuários
    const { data: users } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <UsersPageClient 
            users={users || []} 
            currentUserRole={profile.role}
        />
    );
}
