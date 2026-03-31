import Link from 'next/link';
import { Home, Users, DollarSign, LineChart, AppWindow, BarChart2, Calculator, Building2, Building, Flame, UserCheck, Settings, Layers, Coins, Globe, Inbox, Kanban, FileText, Megaphone, Instagram, Shield } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { hasPermission, type UserRole } from '@/lib/permissions';
import { SidebarLink } from './sidebar-link';
import { WhatsappIcon } from '../icons/whatsapp-icon';

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
