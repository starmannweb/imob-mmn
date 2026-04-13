import Link from 'next/link';
import { Home, Users, DollarSign, LineChart, AppWindow, BarChart2, Calculator, Building2, Building, Flame, UserCheck, Settings, Layers, Coins, Globe, Inbox, Kanban, FileText, Megaphone, Instagram, Shield, TrendingUp, Puzzle, CreditCard, Mail } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { hasPermission, type UserRole } from '@/lib/permissions';
import { SidebarLink } from './sidebar-link';
import { WhatsappIcon } from '../icons/whatsapp-icon';

export default async function Sidebar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    let userRole: UserRole = 'user';
    
    if (user) {
        // Buscar perfil do usuário para obter role
        const { data: profile } = await supabase
            .from("users")
            .select("role")
            .eq("id", user.id)
            .single();
        userRole = (profile?.role || 'user') as UserRole;
    }
    
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
                    <SidebarLink href="/painel" icon={<Home className="w-5 h-5" />}>Dashboard</SidebarLink>
                    <SidebarLink href="/painel/rede" icon={<Users className="w-5 h-5" />}>Minha Rede</SidebarLink>
                    <SidebarLink href="/painel/imoveis" icon={<Building className="w-5 h-5" />}>Meus Imóveis</SidebarLink>
                    <SidebarLink href="/painel/simuladores" icon={<Calculator className="w-5 h-5" />}>Simulador de Custo</SidebarLink>
                    <SidebarLink href="/painel/leads" icon={<Inbox className="w-5 h-5" />}>Leads</SidebarLink>
                    
                    {canAccessCRM && (
                        <SidebarLink href="/painel/crm" icon={<Kanban className="w-5 h-5" />}>CRM</SidebarLink>
                    )}
                    
                    <SidebarLink href="/painel/clientes" icon={<Users className="w-5 h-5" />}>Meus Clientes</SidebarLink>
                    <SidebarLink href="/painel/negocios" icon={<DollarSign className="w-5 h-5" />}>Vendas e Locações</SidebarLink>
                    <SidebarLink href="/painel/financeiro/indices" icon={<TrendingUp className="w-5 h-5" />}>Índices Financeiros</SidebarLink>
                    <SidebarLink href="/painel/plano" icon={<CreditCard className="w-5 h-5" />}>Plano e Pagamentos</SidebarLink>
                    <SidebarLink href="/painel/whatsapp" icon={<WhatsappIcon className="w-5 h-5" />}>Atendimento de Whatsapp</SidebarLink>
                    <SidebarLink href="/painel/seletor" icon={<UserCheck className="w-5 h-5" />}>Encaminhar Leads</SidebarLink>
                    <SidebarLink href="/painel/anuncios" icon={<Megaphone className="w-5 h-5" />}>Anúncios</SidebarLink>
                    <SidebarLink href="/painel/midias-sociais" icon={<Instagram className="w-5 h-5" />}>Mídias Sociais</SidebarLink>
                    <SidebarLink href="/painel/meus-sites" icon={<Globe className="w-5 h-5" />}>Meu Site</SidebarLink>
                    <SidebarLink href="/painel/configuracoes/integracoes" icon={<Puzzle className="w-5 h-5" />}>Integrações</SidebarLink>
                    <SidebarLink href="/painel/configuracoes/emails" icon={<Mail className="w-5 h-5" />}>E-mails</SidebarLink>
                    <SidebarLink href="/painel/configuracoes/sistema" icon={<Settings className="w-5 h-5" />}>Configurações</SidebarLink>

                    {/* Gerenciamento de Usuários - Apenas Admin/Dev */}
                    {canViewAllUsers && (
                        <SidebarLink href="/painel/usuarios" icon={<Shield className="w-5 h-5" />}>Gerenciar Usuários</SidebarLink>
                    )}

                    {/* Mostrar Dev/Testes SOMENTE se for dev */}
                    {canAccessDevTools && (
                        <SidebarLink href="/painel/dev" icon={<Flame className="w-5 h-5" />}>Dev / Testes</SidebarLink>
                    )}
                </ul>
            </div>

        </aside>
    );
}
