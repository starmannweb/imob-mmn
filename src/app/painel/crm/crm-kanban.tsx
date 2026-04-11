"use client";

import { useState, useEffect } from "react";
import { Plus, Phone, Mail, Clock, GripVertical, MoreHorizontal, MessageSquare, Calendar, MapPin, BadgeCheck, FileText, UserPlus, X } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";

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
};

const CRM_STAGES: Column[] = [
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
    const [isClient, setIsClient] = useState(false);
    const [isNewDealOpen, setIsClientOpen] = useState(false);

    // Estados para o Combobox de Leads
    const [leadSearch, setLeadSearch] = useState("");
    const [leads, setLeads] = useState<any[]>([]);
    const [isSearchingLeads, setIsSearchingLeads] = useState(false);
    const [showLeadDropdown, setShowLeadDropdown] = useState(false);
    const [selectedLead, setSelectedLead] = useState<any>(null);

    const searchLeads = async (query: string) => {
        setLeadSearch(query);
        setSelectedLead(null);
        if (query.length < 2) {
            setLeads([]);
            setShowLeadDropdown(false);
            return;
        }

        setIsSearchingLeads(true);
        setShowLeadDropdown(true);
        
        const supabase = createClient();
        const { data, error } = await supabase
            .from("leads")
            .select("id, name, email, phone")
            .ilike("name", `%${query}%`)
            .limit(5);

        if (!error && data) {
            setLeads(data);
        }
        setIsSearchingLeads(false);
    };

    const handleSelectLead = (lead: any) => {
        setSelectedLead(lead);
        setLeadSearch(lead.name);
        setShowLeadDropdown(false);
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newStage = destination.droppableId;
        
        // Optimistic Update
        setDeals(prev => prev.map(d => 
            d.id === draggableId ? { ...d, stage: newStage } : d
        ));

        // TODO: Server Action update
        console.log(`Moved deal ${draggableId} to ${newStage}`);
    };

    const getDealsByStage = (stage: string) => {
        return deals.filter(d => d.stage === stage);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    if (!isClient) return <div className="p-8 text-center text-slate-500">Carregando Kanban...</div>;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Toolbar Superior */}
            <div className="flex items-center justify-end mb-6">
                <div className="text-right">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Total em Negociação</p>
                    <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                        {formatCurrency(deals.reduce((acc, curr) => acc + (curr.value || 0), 0))}
                    </p>
                </div>
            </div>

            {/* Kanban Board */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-4 overflow-x-auto pb-6 flex-1 items-start min-h-[600px] scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                    {CRM_STAGES.map((column) => {
                        const columnDeals = getDealsByStage(column.id);
                        
                        return (
                            <div
                                key={column.id}
                                className={`flex flex-col min-w-[300px] w-[300px] h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/10 transition-all duration-300`}
                            >
                                {/* Header da Coluna */}
                                <div className={`px-4 py-4 rounded-t-2xl border-b flex items-center justify-between ${column.bgColor} ${column.borderColor}`}>
                                    <div className="flex flex-col">
                                        <h3 className={`text-sm font-black uppercase tracking-tight ${column.color}`}>
                                            {column.title}
                                        </h3>
                                        <p className="text-[10px] font-bold text-slate-500">
                                            {columnDeals.length} {columnDeals.length === 1 ? 'negócio' : 'negócios'}
                                        </p>
                                    </div>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border ${column.borderColor}`}>
                                        <Plus className={`w-4 h-4 ${column.color}`} />
                                    </div>
                                </div>

                                {/* Lista de Cards Droppable */}
                                <Droppable droppableId={column.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-350px)] min-h-[150px] transition-colors ${
                                                snapshot.isDraggingOver ? 'bg-slate-100/50 dark:bg-slate-800/20' : ''
                                            }`}
                                        >
                                            {columnDeals.map((deal, index) => (
                                                <Draggable key={deal.id} draggableId={deal.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{ ...provided.draggableProps.style }}
                                                            className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 
                                                                hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group relative
                                                                ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-indigo-500 rotate-2 scale-105 z-50' : ''}`}
                                                        >
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
                                                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Valor</span>
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
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                            
                                            {columnDeals.length === 0 && !snapshot.isDraggingOver && (
                                                <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                                                    <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center mb-3">
                                                        <Plus className="w-6 h-6 text-slate-300" />
                                                    </div>
                                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Sem Negócios</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}
