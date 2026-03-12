"use client";

import { useState } from "react";
import { Plus, Phone, Mail, Clock, GripVertical, MoreHorizontal, MessageSquare, Search, Filter, Calendar, MapPin, BadgeCheck, FileText, UserPlus } from "lucide-react";

type Deal = {
    id: string;
    lead_name: string;
    property_title: string;
    value: number;
    expected_closing?: string;
    phone?: string;
    email?: string;
    stage: string;
    last_activity?: string;
    created_at: string;
};

type Column = {
    id: string;
    title: string;
    color: string;
    borderColor: string;
    bgColor: string;
    deals: Deal[];
};

const CRM_STAGES: Omit<Column, 'deals'>[] = [
    { id: 'contact', title: 'Contato', color: 'text-blue-700 dark:text-blue-400', borderColor: 'border-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-950/30' },
    { id: 'service', title: 'Atendimento', color: 'text-amber-700 dark:text-amber-400', borderColor: 'border-amber-500', bgColor: 'bg-amber-50 dark:bg-amber-950/30' },
    { id: 'visit', title: 'Visita', color: 'text-purple-700 dark:text-purple-400', borderColor: 'border-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-950/30' },
    { id: 'proposal', title: 'Proposta', color: 'text-indigo-700 dark:text-indigo-400', borderColor: 'border-indigo-500', bgColor: 'bg-indigo-50 dark:bg-indigo-950/30' },
    { id: 'reservation', title: 'Reserva', color: 'text-rose-700 dark:text-rose-400', borderColor: 'border-rose-500', bgColor: 'bg-rose-50 dark:bg-rose-950/30' },
    { id: 'documentation', title: 'Documentação', color: 'text-slate-700 dark:text-slate-400', borderColor: 'border-slate-500', bgColor: 'bg-slate-50 dark:bg-slate-950/30' },
    { id: 'signature', title: 'Assinatura', color: 'text-emerald-700 dark:text-emerald-400', borderColor: 'border-emerald-500', bgColor: 'bg-emerald-50 dark:bg-emerald-950/30' },
];

export default function CrmKanban({ initialDeals = [] }: { initialDeals?: Deal[] }) {
    const [deals, setDeals] = useState<Deal[]>(initialDeals);
    const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);
    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDeals = deals.filter(d =>
        d.lead_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.property_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns: Column[] = CRM_STAGES.map(col => ({
        ...col,
        deals: filteredDeals.filter(d => d.stage === col.id),
    }));

    const handleDragStart = (deal: Deal) => {
        setDraggedDeal(deal);
    };

    const handleDragOver = (e: React.DragEvent, columnId: string) => {
        e.preventDefault();
        setDragOverColumn(columnId);
    };

    const handleDrop = (columnId: string) => {
        if (!draggedDeal || draggedDeal.stage === columnId) {
            setDraggedDeal(null);
            setDragOverColumn(null);
            return;
        }

        setDeals(prev => prev.map(d =>
            d.id === draggedDeal.id ? { ...d, stage: columnId } : d
        ));

        // TODO: Update in Supabase via Server Action
        console.log(`Movendo negócio ${draggedDeal.id} para etapa ${columnId}`);

        setDraggedDeal(null);
        setDragOverColumn(null);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Toolbar Superior */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Buscar por cliente ou imóvel..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" /> Filtros
                    </Button>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="text-right mr-4 hidden lg:block">
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total em Negociação</p>
                        <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                            {formatCurrency(filteredDeals.reduce((acc, curr) => acc + (curr.value || 0), 0))}
                        </p>
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 rounded-xl px-6">
                        <UserPlus className="w-4 h-4" /> Novo Negócio
                    </Button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex gap-4 overflow-x-auto pb-6 flex-1 items-start min-h-[600px] scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                {columns.map((column) => (
                    <div
                        key={column.id}
                        className={`flex flex-col min-w-[300px] w-[300px] h-full rounded-2xl border transition-all duration-300
                            ${dragOverColumn === column.id
                                ? `${column.borderColor} border-2 shadow-xl bg-white/50 dark:bg-slate-900/50`
                                : 'border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/10'
                            }`}
                        onDragOver={(e) => handleDragOver(e, column.id)}
                        onDrop={() => handleDrop(column.id)}
                    >
                        {/* Header da Coluna */}
                        <div className={`px-4 py-4 rounded-t-2xl border-b flex items-center justify-between ${column.bgColor} ${column.borderColor}`}>
                            <div className="flex flex-col">
                                <h3 className={`text-sm font-black uppercase tracking-tight ${column.color}`}>
                                    {column.title}
                                </h3>
                                <p className="text-[10px] font-bold text-slate-500">
                                    {column.deals.length} {column.deals.length === 1 ? 'negócio' : 'negócios'}
                                </p>
                            </div>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border ${column.borderColor}`}>
                                <Plus className={`w-4 h-4 ${column.color}`} />
                            </div>
                        </div>

                        {/* Lista de Cards */}
                        <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-350px)]">
                            {column.deals.map((deal) => (
                                <div
                                    key={deal.id}
                                    draggable
                                    onDragStart={() => handleDragStart(deal)}
                                    className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 cursor-grab active:cursor-grabbing
                                        hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group relative
                                        ${draggedDeal?.id === deal.id ? 'opacity-30 scale-95 ring-2 ring-indigo-500' : ''}`}
                                >
                                    {/* Drag Handle Icon Visual */}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <GripVertical className="w-4 h-4 text-slate-300" />
                                    </div>

                                    <div className="mb-3">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
                                            {deal.lead_name}
                                        </h4>
                                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md w-fit">
                                            <MapPin className="w-3 h-3" />
                                            {deal.property_title}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Valor do Negócio</span>
                                            <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                                                {formatCurrency(deal.value)}
                                            </span>
                                        </div>
                                        <div className="flex -space-x-2">
                                            <div className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                                                {deal.lead_name.charAt(0)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer">
                                                <MessageSquare className="w-3.5 h-3.5" /> 3
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-rose-500 transition-colors cursor-pointer">
                                                <Calendar className="w-3.5 h-3.5" /> {deal.expected_closing ? '12/04' : 'N/A'}
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-1">
                                            <button className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-green-500 hover:bg-green-50 transition-all">
                                                <Phone className="w-3.5 h-3.5" />
                                            </button>
                                            <button className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
                                                <MoreHorizontal className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {column.deals.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                                    <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center mb-3">
                                        <Plus className="w-6 h-6 text-slate-300" />
                                    </div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Sem Negócios</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
