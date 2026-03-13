"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    Users, Search, Filter, ChevronRight, Edit, Trash2, 
    Shield, Crown, Briefcase, User as UserIcon, Plus,
    Mail, Phone, Calendar, CheckCircle, XCircle
} from "lucide-react";
import { ROLE_LABELS, ROLE_COLORS, ROLE_DESCRIPTIONS, hasPermission, type UserRole } from "@/lib/permissions";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

interface UsersPageClientProps {
    users: any[];
    currentUserRole: UserRole;
}

export default function UsersPageClient({ users: initialUsers, currentUserRole }: UsersPageClientProps) {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState<string>("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    
    const supabase = createClient();
    const canEdit = hasPermission(currentUserRole, 'canEditUsers');
    const canDelete = hasPermission(currentUserRole, 'canDeleteUsers');
    const canChangeRoles = hasPermission(currentUserRole, 'canChangeUserRoles');

    // Filtros
    const filteredUsers = users.filter(user => {
        const matchesSearch = 
            user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.referral_code?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = !filterRole || user.role === filterRole;

        return matchesSearch && matchesRole;
    });

    const handleEditUser = (user: any) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleUpdateRole = async (userId: string, newRole: UserRole) => {
        if (!canChangeRoles) {
            toast.error("Você não tem permissão para alterar roles");
            return;
        }

        const { error } = await supabase
            .from("users")
            .update({ role: newRole })
            .eq("id", userId);

        if (error) {
            toast.error("Erro ao atualizar role");
            console.error(error);
        } else {
            toast.success("Role atualizado com sucesso");
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
            setShowEditModal(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!canDelete) {
            toast.error("Você não tem permissão para deletar usuários");
            return;
        }

        if (!confirm("Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita.")) {
            return;
        }

        const { error } = await supabase
            .from("users")
            .delete()
            .eq("id", userId);

        if (error) {
            toast.error("Erro ao deletar usuário");
            console.error(error);
        } else {
            toast.success("Usuário deletado com sucesso");
            setUsers(users.filter(u => u.id !== userId));
        }
    };

    const getRoleIcon = (role: UserRole) => {
        switch (role) {
            case 'dev': return Crown;
            case 'admin': return Shield;
            case 'broker': return Briefcase;
            case 'user': return UserIcon;
            default: return UserIcon;
        }
    };

    const getRoleColor = (role: UserRole) => {
        const color = ROLE_COLORS[role] || 'slate';
        return {
            bg: `bg-${color}-100 dark:bg-${color}-900/30`,
            text: `text-${color}-600 dark:text-${color}-400`,
            border: `border-${color}-200 dark:border-${color}-800`,
        };
    };

    return (
        <>
            <div className="flex-1 flex flex-col w-full max-w-7xl pb-12">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                    <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span>Gerenciar Usuários</span>
                </div>

                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 dark:bg-blue-950/50 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900">
                                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Gerenciar Usuários</h1>
                                <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-sm">Visualize e gerencie todos os usuários do sistema</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {(['dev', 'admin', 'broker', 'user'] as UserRole[]).map(role => {
                        const count = users.filter(u => u.role === role).length;
                        const Icon = getRoleIcon(role);
                        const colors = getRoleColor(role);
                        
                        return (
                            <div key={role} className={`${colors.bg} border ${colors.border} rounded-xl p-4`}>
                                <div className="flex items-center justify-between mb-2">
                                    <Icon className={`w-5 h-5 ${colors.text}`} />
                                    <span className={`text-2xl font-bold ${colors.text}`}>{count}</span>
                                </div>
                                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400">{ROLE_LABELS[role]}</h3>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar de Filtros */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm sticky top-24">
                            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                                <h2 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                    <Filter className="w-4 h-4" /> Filtros
                                </h2>
                            </div>
                            
                            <div className="p-4 space-y-6">
                                {/* Busca */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Buscar</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Nome, email, código..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Filtro por Role */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Tipo de Acesso</label>
                                    <div className="space-y-1">
                                        <button
                                            onClick={() => setFilterRole("")}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                                filterRole === "" 
                                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold" 
                                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                            }`}
                                        >
                                            Todos
                                        </button>
                                        {(['dev', 'admin', 'broker', 'user'] as UserRole[]).map(role => (
                                            <button
                                                key={role}
                                                onClick={() => setFilterRole(role)}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                                    filterRole === role 
                                                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold" 
                                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                                }`}
                                            >
                                                {ROLE_LABELS[role]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Lista de Usuários */}
                    <main className="flex-1 min-w-0">
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                                <h2 className="font-bold text-slate-800 dark:text-slate-200">
                                    Usuários ({filteredUsers.length})
                                </h2>
                            </div>

                            {filteredUsers.length === 0 ? (
                                <div className="p-12 text-center">
                                    <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">Nenhum usuário encontrado</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                                    {filteredUsers.map((user) => {
                                        const RoleIcon = getRoleIcon(user.role);
                                        const colors = getRoleColor(user.role);
                                        
                                        return (
                                            <div key={user.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-start gap-3 flex-1">
                                                        <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                                                            <RoleIcon className={`w-5 h-5 ${colors.text}`} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className="font-bold text-slate-900 dark:text-white">{user.full_name || "Sem nome"}</h3>
                                                                <span className={`${colors.bg} ${colors.text} text-xs font-bold px-2 py-0.5 rounded-full`}>
                                                                    {ROLE_LABELS[user.role as UserRole]}
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                                                {user.email && (
                                                                    <span className="flex items-center gap-1">
                                                                        <Mail className="w-3 h-3" /> {user.email}
                                                                    </span>
                                                                )}
                                                                {user.referral_code && (
                                                                    <span className="flex items-center gap-1 font-mono">
                                                                        🔗 {user.referral_code}
                                                                    </span>
                                                                )}
                                                                {user.created_at && (
                                                                    <span className="flex items-center gap-1">
                                                                        <Calendar className="w-3 h-3" /> {new Date(user.created_at).toLocaleDateString('pt-BR')}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {user.creci && (
                                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">CRECI: {user.creci}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {canEdit && (
                                                            <button 
                                                                onClick={() => handleEditUser(user)}
                                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                        {canDelete && (
                                                            <button 
                                                                onClick={() => handleDeleteUser(user.id)}
                                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            {/* Modal de Edição */}
            {showEditModal && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full max-w-md rounded-2xl shadow-2xl">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Editar Usuário</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{selectedUser.full_name}</p>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tipo de Acesso</label>
                                <div className="space-y-2">
                                    {(['dev', 'admin', 'broker', 'user'] as UserRole[]).map(role => {
                                        const RoleIcon = getRoleIcon(role);
                                        const colors = getRoleColor(role);
                                        const isSelected = selectedUser.role === role;
                                        
                                        return (
                                            <button
                                                key={role}
                                                onClick={() => canChangeRoles && setSelectedUser({ ...selectedUser, role })}
                                                disabled={!canChangeRoles}
                                                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                                                    isSelected
                                                        ? `${colors.bg} ${colors.border} ${colors.text}`
                                                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                                } ${!canChangeRoles ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <RoleIcon className={`w-5 h-5 ${isSelected ? colors.text : 'text-slate-400'}`} />
                                                    <div className="flex-1">
                                                        <h3 className="font-bold">{ROLE_LABELS[role]}</h3>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{ROLE_DESCRIPTIONS[role]}</p>
                                                    </div>
                                                    {isSelected && <CheckCircle className={`w-5 h-5 ${colors.text}`} />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {!canChangeRoles && (
                                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-200">
                                    Você não tem permissão para alterar roles de usuários.
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            {canChangeRoles && (
                                <button
                                    onClick={() => handleUpdateRole(selectedUser.id, selectedUser.role)}
                                    className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                >
                                    Salvar Alterações
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
