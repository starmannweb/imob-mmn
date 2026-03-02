"use client";

import { useState } from "react";
import { Plus, Phone, Mail, Clock, GripVertical, MoreHorizontal, MessageSquare, Search, Filter } from "lucide-react";

type Lead = {
    id: string;
    name: string;
    phone_whatsapp?: string;
    email?: string;
    property_title?: string;
    created_at: string;
    status: string;
};

type Column = {
    id: string;
    title: string;
    color: string;
    borderColor: string;
    bgColor: string;
    leads: Lead[];
};

const STATUS_COLUMNS: Omit<Column, 'leads'>[] = [
    { id: 'new', title: 'Novos Leads', color: 'text-blue-700 dark:text-blue-400', borderColor: 'border-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-950/30' },
    { id: 'contacted', title: 'Contatados', color: 'text-amber-700 dark:text-amber-400', borderColor: 'border-amber-500', bgColor: 'bg-amber-50 dark:bg-amber-950/30' },
    { id: 'negotiating', title: 'Em Negociação', color: 'text-purple-700 dark:text-purple-400', borderColor: 'border-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-950/30' },
    { id: 'won', title: 'Convertidos', color: 'text-emerald-700 dark:text-emerald-400', borderColor: 'border-emerald-500', bgColor: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { id: 'lost', title: 'Perdidos', color: 'text-red-700 dark:text-red-400', borderColor: 'border-red-500', bgColor: 'bg-red-50 dark:bg-red-950/30' },
];

export default function CrmKanban({ initialLeads }: { initialLeads: Lead[] }) {
    const [leads, setLeads] = useState<Lead[]>(initialLeads);
    const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredLeads = leads.filter(l =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.phone_whatsapp?.includes(searchQuery)
    );

    const columns: Column[] = STATUS_COLUMNS.map(col => ({
        ...col,
        leads: filteredLeads.filter(l => l.status === col.id),
    }));

    const handleDragStart = (lead: Lead) => {
        setDraggedLead(lead);
    };

    const handleDragOver = (e: React.DragEvent, columnId: string) => {
        e.preventDefault();
        setDragOverColumn(columnId);
    };

    const handleDragLeave = () => {
        setDragOverColumn(null);
    };

    const handleDrop = async (columnId: string) => {
        if (!draggedLead || draggedLead.status === columnId) {
            setDraggedLead(null);
            setDragOverColumn(null);
            return;
        }

        // Optimistic update
        setLeads(prev => prev.map(l =>
            l.id === draggedLead.id ? { ...l, status: columnId } : l
        ));

        // TODO: Call server action to update lead status in Supabase
        // await updateLeadStatus(draggedLead.id, columnId);

        setDraggedLead(null);
        setDragOverColumn(null);
    };

    const timeAgo = (date: string) => {
        const diff = Date.now() - new Date(date).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 1) return "agora";
        if (hours < 24) return `${hours}h`;
        const days = Math.floor(hours / 24);
        return `${days}d`;
    };

    return (
        <div className="flex flex-col h-full">
            {/* Search Bar */}
            <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Buscar lead por nome, email ou telefone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                    />
                </div>
                <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-colors">
                    <Filter className="w-4 h-4" />
                </button>
            </div>

            {/* Kanban Board */}
            <div className="flex gap-4 overflow-x-auto pb-4 flex-1 min-h-[500px]">
                {columns.map((column) => (
                    <div
                        key={column.id}
                        className={`flex flex-col min-w-[280px] w-[280px] rounded-xl border transition-all duration-200
                            ${dragOverColumn === column.id
                                ? `${column.borderColor} border-2 shadow-lg scale-[1.01]`
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                        onDragOver={(e) => handleDragOver(e, column.id)}
                        onDragLeave={handleDragLeave}
                        onDrop={() => handleDrop(column.id)}
                    >
                        {/* Column Header */}
                        <div className={`px-4 py-3 rounded-t-xl border-b-2 ${column.borderColor} ${column.bgColor}`}>
                            <div className="flex items-center justify-between">
                                <h3 className={`text-sm font-bold ${column.color}`}>
                                    {column.title}
                                </h3>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${column.bgColor} ${column.color} border ${column.borderColor}`}>
                                    {column.leads.length}
                                </span>
                            </div>
                        </div>

                        {/* Cards Container */}
                        <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[600px] bg-slate-50/50 dark:bg-slate-900/30 rounded-b-xl">
                            {column.leads.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2">
                                        <Plus className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                                    </div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                                        Arraste leads aqui
                                    </p>
                                </div>
                            ) : (
                                column.leads.map((lead) => (
                                    <div
                                        key={lead.id}
                                        draggable
                                        onDragStart={() => handleDragStart(lead)}
                                        className={`bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 cursor-grab active:cursor-grabbing
                                            hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all group
                                            ${draggedLead?.id === lead.id ? 'opacity-50 scale-95' : ''}`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <GripVertical className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                                                    {lead.name}
                                                </h4>
                                            </div>
                                            <button className="text-slate-300 dark:text-slate-600 hover:text-slate-500 p-0.5">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {lead.property_title && (
                                            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2 line-clamp-1 italic">
                                                ⌂ {lead.property_title}
                                            </p>
                                        )}

                                        <div className="space-y-1 mb-3">
                                            {lead.phone_whatsapp && (
                                                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                                                    <Phone className="w-3 h-3 mr-1.5 text-slate-400 dark:text-slate-500" />
                                                    {lead.phone_whatsapp}
                                                </div>
                                            )}
                                            {lead.email && (
                                                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                                                    <Mail className="w-3 h-3 mr-1.5 text-slate-400 dark:text-slate-500" />
                                                    <span className="truncate">{lead.email}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {timeAgo(lead.created_at)}
                                            </span>
                                            <a
                                                href={`https://wa.me/${lead.phone_whatsapp?.replace(/\D/g, '')}?text=Olá ${lead.name?.split(' ')[0]}!`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-1.5 rounded-md transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <MessageSquare className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
