"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
    Users, Search, Filter, Calendar, Phone, Mail, 
    MapPin, Plus, Eye, Edit, Trash2, ChevronRight,
    UserCheck, Clock, Cake, MessageSquare, Star
} from "lucide-react";
import Link from "next/link";

export default function ClientesPage() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterActive, setFilterActive] = useState<boolean | null>(null);
    const [filterType, setFilterType] = useState<string>("");
    
    const supabase = createClient();

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("leads")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) {
            setClients(data);
        }
        setLoading(false);
    };

    // Filtros
    const filteredClients = clients.filter(client => {
        const matchesSearch = 
            client.lead_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.phone?.includes(searchTerm) ||
            client.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesActive = filterActive === null || client.is_active === filterActive;
        const matchesType = !filterType || client.client_type === filterType;

        return matchesSearch && matchesActive && matchesType;
    });

    // Categorias de clientes
    const clientsWithScheduled = filteredClients.filter(c => c.has_scheduled_visit);
    const clientsRecentInteraction = filteredClients.filter(c => {
        if (!c.last_interaction) return false;
        const daysSince = Math.floor((Date.now() - new Date(c.last_interaction).getTime()) / (1000 * 60 * 60 * 24));
        return daysSince <= 7;
    });
    const clientsBirthday = filteredClients.filter(c => {
        if (!c.birth_date) return false;
        const today = new Date();
        const birth = new Date(c.birth_date);
        return today.getMonth() === birth.getMonth() && 
               Math.abs(today.getDate() - birth.getDate()) <= 7;
    });
    const clientsPendingMessages = filteredClients.filter(c => c.pending_messages > 0);

    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl pb-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                <Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span>Meus Clientes</span>
            </div>

            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 dark:bg-blue-950/50 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900">
                            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Meus Clientes</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-sm">Gerencie seus clientes e leads cadastrados</p>
                        </div>
                    </div>
                </div>
                <Link href="/painel/leads?new=true" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" /> Novo Cliente
                </Link>
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
                                        placeholder="Nome, telefone, email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Clientes Ativos */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Status</label>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => setFilterActive(null)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                            filterActive === null 
                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold" 
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                        }`}
                                    >
                                        Todos
                                    </button>
                                    <button
                                        onClick={() => setFilterActive(true)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                            filterActive === true 
                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold" 
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                        }`}
                                    >
                                        Ativos
                                    </button>
                                    <button
                                        onClick={() => setFilterActive(false)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                            filterActive === false 
                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold" 
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                        }`}
                                    >
                                        Inativos
                                    </button>
                                </div>
                            </div>

                            {/* Tipo de Cliente */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Tipo</label>
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Todos os tipos</option>
                                    <option value="buyer">Comprador</option>
                                    <option value="seller">Vendedor</option>
                                    <option value="renter">Locatário</option>
                                    <option value="owner">Proprietário</option>
                                </select>
                            </div>

                            {/* Data de Cadastro */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Cadastro</label>
                                <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                    <option>Qualquer período</option>
                                    <option>Últimos 7 dias</option>
                                    <option>Últimos 30 dias</option>
                                    <option>Últimos 90 dias</option>
                                </select>
                            </div>

                            {/* Corretor Responsável */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">Responsável</label>
                                <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                    <option>Todos os corretores</option>
                                    <option>Meus clientes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 space-y-6">
                    {/* Cards de Categorias */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{clientsWithScheduled.length}</span>
                            </div>
                            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400">Com Visitas Agendadas</h3>
                        </div>

                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <Clock className="w-5 h-5 text-emerald-600" />
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{clientsRecentInteraction.length}</span>
                            </div>
                            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400">Interações Recentes</h3>
                        </div>

                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <Cake className="w-5 h-5 text-purple-600" />
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{clientsBirthday.length}</span>
                            </div>
                            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400">Aniversários da Semana</h3>
                        </div>

                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <MessageSquare className="w-5 h-5 text-amber-600" />
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">{clientsPendingMessages.length}</span>
                            </div>
                            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400">Mensagens Pendentes</h3>
                        </div>
                    </div>

                    {/* Lista de Clientes */}
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                            <h2 className="font-bold text-slate-800 dark:text-slate-200">
                                Lista de Clientes ({filteredClients.length})
                            </h2>
                        </div>

                        {loading ? (
                            <div className="p-12 text-center text-slate-500">Carregando clientes...</div>
                        ) : filteredClients.length === 0 ? (
                            <div className="p-12 text-center">
                                <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                                <p className="text-slate-500 dark:text-slate-400 font-medium">Nenhum cliente encontrado</p>
                                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Ajuste os filtros ou cadastre um novo cliente</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100 dark:divide-slate-700">
                                {filteredClients.map((client) => (
                                    <div key={client.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm flex-shrink-0">
                                                    {client.lead_name?.substring(0, 2).toUpperCase() || "??"}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-slate-900 dark:text-white">{client.lead_name || "Sem nome"}</h3>
                                                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                        {client.phone && (
                                                            <span className="flex items-center gap-1">
                                                                <Phone className="w-3 h-3" /> {client.phone}
                                                            </span>
                                                        )}
                                                        {client.email && (
                                                            <span className="flex items-center gap-1">
                                                                <Mail className="w-3 h-3" /> {client.email}
                                                            </span>
                                                        )}
                                                        {client.city && (
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="w-3 h-3" /> {client.city}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {client.notes && (
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-1">{client.notes}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link href={`/painel/leads/${client.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
