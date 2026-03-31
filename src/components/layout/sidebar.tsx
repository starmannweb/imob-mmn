import Link from 'next/link';
import { Home, Users, DollarSign, LineChart, AppWindow, BarChart2, Calculator, Building2, Building, Flame, UserCheck, Settings, Layers, Coins, Globe, Inbox, Kanban, FileText, Megaphone, Instagram, Shield } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { hasPermission, type UserRole } from '@/lib/permissions';
import { SidebarLink } from './sidebar-link';

const WhatsappIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default async function Sidebar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    // Buscar perfil do usuário para obter role
    const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user?.id)
        .single();
    
    const userRole = (profile?.role || 'user') as UserRole;
    const canAccessDevTools = hasPermission(userRole, 'canAccessDevTools');
    const canAccessCRM = hasPermission(userRole, 'canAccessCRM');
    const canViewFinancials = hasPermission(userRole, 'canViewFinancials');
    const canViewAllUsers = hasPermission(userRole, 'canViewAllUsers');

    return (
        <aside className="w-64 bg-[#111827] text-slate-300 hidden md:flex flex-col h-full overflow-hidden border-r border-slate-800 transition-colors duration-200">

            <div className="flex h-16 items-center px-6 shrink-0 border-b border-slate-800/80">
                <div className="flex items-center">
                    <span className="text-xl font-extrabold text-white tracking-tight">Imob<span className="text-blue-500">Painel</span></span>
                </div>
            </div>

            <div className="overflow-y-auto overflow-x-hidden flex-1 py-4 custom-scrollbar">
                <ul className="flex flex-col space-y-1">
                    <SidebarLink href="/painel" icon={Home}>Dashboard</SidebarLink>
                    <SidebarLink href="/painel/rede" icon={Users}>Meus Afiliados</SidebarLink>
                    <SidebarLink href="/painel/imoveis" icon={Building}>Meus Imóveis</SidebarLink>
                    <SidebarLink href="/painel/simuladores" icon={Calculator}>Simulador de Custo</SidebarLink>
                    <SidebarLink href="/painel/leads" icon={Inbox}>Leads</SidebarLink>
                    
                    {canAccessCRM && (
                        <SidebarLink href="/painel/crm" icon={Kanban}>CRM</SidebarLink>
                    )}
                    
                    <SidebarLink href="/painel/clientes" icon={Users}>Meus Clientes</SidebarLink>
                    <SidebarLink href="/painel/negocios" icon={DollarSign}>Vendas e Locações</SidebarLink>
                    <SidebarLink href="/painel/whatsapp" icon={WhatsappIcon}>Atendimento de Whatsapp</SidebarLink>
                    <SidebarLink href="/painel/seletor" icon={UserCheck}>Encaminhar Leads</SidebarLink>
                    <SidebarLink href="/painel/anuncios" icon={Megaphone}>Anúncios</SidebarLink>
                    <SidebarLink href="/painel/midias-sociais" icon={Instagram}>Mídias Sociais</SidebarLink>
                    <SidebarLink href="/painel/meus-sites" icon={Globe}>Meu Site</SidebarLink>

                    {/* Gerenciamento de Usuários - Apenas Admin/Dev */}
                    {canViewAllUsers && (
                        <SidebarLink href="/painel/usuarios" icon={Shield}>Gerenciar Usuários</SidebarLink>
                    )}

                    {/* Mostrar Dev/Testes SOMENTE se for dev */}
                    {canAccessDevTools && (
                        <SidebarLink href="/painel/dev" icon={Flame}>Dev / Testes</SidebarLink>
                    )}
                </ul>
            </div>

        </aside>
    );
}
