/**
 * Sistema de Permissões
 * 
 * Roles:
 * - dev: Super Admin (acesso total, pode personalizar tudo)
 * - admin: Gerente (pode ver rede completa, gerenciar usuários, mas com limitações)
 * - broker: Corretor (acesso intermediário, pode gerenciar seus próprios leads e imóveis)
 * - user: Cliente/Usuário comum (vê apenas sua rede a partir dele)
 */

export type UserRole = 'dev' | 'admin' | 'broker' | 'user';

export interface Permission {
    canViewAllUsers: boolean;
    canEditUsers: boolean;
    canDeleteUsers: boolean;
    canViewFullNetwork: boolean;
    canEditSystemSettings: boolean;
    canAccessDevTools: boolean;
    canManageProperties: boolean;
    canManageLeads: boolean;
    canViewFinancials: boolean;
    canExportData: boolean;
    canChangeUserRoles: boolean;
    canAccessCRM: boolean;
    canViewReports: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission> = {
    dev: {
        canViewAllUsers: true,
        canEditUsers: true,
        canDeleteUsers: true,
        canViewFullNetwork: true,
        canEditSystemSettings: true,
        canAccessDevTools: true,
        canManageProperties: true,
        canManageLeads: true,
        canViewFinancials: true,
        canExportData: true,
        canChangeUserRoles: true,
        canAccessCRM: true,
        canViewReports: true,
    },
    admin: {
        canViewAllUsers: true,
        canEditUsers: true,
        canDeleteUsers: false, // Admin não pode deletar usuários
        canViewFullNetwork: true,
        canEditSystemSettings: false, // Admin não pode editar configurações do sistema
        canAccessDevTools: false,
        canManageProperties: true,
        canManageLeads: true,
        canViewFinancials: true,
        canExportData: true,
        canChangeUserRoles: false, // Admin não pode mudar roles
        canAccessCRM: true,
        canViewReports: true,
    },
    broker: {
        canViewAllUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
        canViewFullNetwork: false, // Vê apenas sua rede
        canEditSystemSettings: false,
        canAccessDevTools: false,
        canManageProperties: true, // Apenas suas propriedades
        canManageLeads: true, // Apenas seus leads
        canViewFinancials: false,
        canExportData: false,
        canChangeUserRoles: false,
        canAccessCRM: true,
        canViewReports: false,
    },
    user: {
        canViewAllUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
        canViewFullNetwork: false, // Vê apenas sua rede a partir dele
        canEditSystemSettings: false,
        canAccessDevTools: false,
        canManageProperties: true, // Apenas suas propriedades
        canManageLeads: true, // Apenas seus leads
        canViewFinancials: false,
        canExportData: false,
        canChangeUserRoles: false,
        canAccessCRM: false,
        canViewReports: false,
    },
};

export function getPermissions(role: UserRole): Permission {
    return ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.user;
}

export function hasPermission(role: UserRole, permission: keyof Permission): boolean {
    const permissions = getPermissions(role);
    return permissions[permission];
}

export function canAccessRoute(role: UserRole, route: string): boolean {
    const permissions = getPermissions(role);
    
    // Rotas restritas por role
    const restrictedRoutes: Record<string, (p: Permission) => boolean> = {
        '/painel/dev': (p) => p.canAccessDevTools,
        '/painel/rede': (p) => p.canViewFullNetwork || role === 'user', // User pode ver sua própria rede
        '/painel/financeiro': (p) => p.canViewFinancials,
        '/painel/crm': (p) => p.canAccessCRM,
        '/painel/usuarios': (p) => p.canViewAllUsers,
    };

    const checkPermission = restrictedRoutes[route];
    if (checkPermission) {
        return checkPermission(permissions);
    }

    // Rotas públicas do painel (todos podem acessar)
    return true;
}

export const ROLE_LABELS: Record<UserRole, string> = {
    dev: 'Desenvolvedor',
    admin: 'Administrador',
    broker: 'Corretor',
    user: 'Usuário',
};

export const ROLE_COLORS: Record<UserRole, string> = {
    dev: 'purple',
    admin: 'blue',
    broker: 'emerald',
    user: 'slate',
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
    dev: 'Acesso total ao sistema, pode personalizar tudo',
    admin: 'Pode ver rede completa e gerenciar usuários com limitações',
    broker: 'Corretor com acesso intermediário aos seus dados',
    user: 'Cliente/Usuário comum, vê apenas sua rede',
};
