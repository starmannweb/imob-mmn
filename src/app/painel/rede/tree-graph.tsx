"use client";

import { useMemo } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface UserNode {
    id: string;
    full_name: string;
    mmn_level?: number;
    referred_by?: string;
}

interface TreeGraphProps {
    currentUser: UserNode;
    network: UserNode[];
}

export default function TreeGraph({ currentUser, network }: TreeGraphProps) {

    const initialNodes = useMemo(() => {
        const nodes: any = [
            {
                id: currentUser.id,
                position: { x: 300, y: 50 },
                data: {
                    label: (
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-sm text-slate-900">{currentUser.full_name || 'Corretor'}</span>
                            <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full mt-1">Você</span>
                        </div>
                    )
                },
                style: {
                    background: '#e0f2fe',
                    color: '#0f172a',
                    border: '1px solid #7dd3fc',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                },
            }
        ];

        const level1 = network.filter(n => n.mmn_level === 1);
        const level2 = network.filter(n => n.mmn_level === 2);
        const level3 = network.filter(n => n.mmn_level === 3);

        const addNodesForLevel = (users: UserNode[], level: number, y: number, color: string, bg: string, label: string) => {
            const spacing = 220;
            const startX = 300 - ((users.length - 1) * spacing) / 2;
            
            users.forEach((person, index) => {
                nodes.push({
                    id: person.id,
                    position: { x: startX + (index * spacing), y },
                    data: {
                        label: (
                            <div className="flex flex-col items-center w-full min-w-[120px]">
                                <span className="font-bold text-[13px] text-slate-800 break-words text-center">{person.full_name || 'Corretor'}</span>
                                <span className={`text-[9px] font-bold ${bg} ${color} px-2 py-0.5 rounded-full mt-1 uppercase`}>{label}</span>
                            </div>
                        )
                    },
                    style: {
                        background: '#ffffff',
                        color: '#0f172a',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '12px 18px',
                        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                    },
                });
            });
        };

        addNodesForLevel(level1, 1, 200, "text-emerald-700 border border-emerald-200", "bg-emerald-50", "1ª Geração");
        addNodesForLevel(level2, 2, 350, "text-amber-700 border border-amber-200", "bg-amber-50", "2ª Geração");
        addNodesForLevel(level3, 3, 500, "text-purple-700 border border-purple-200", "bg-purple-50", "3ª Geração");

        return nodes;
    }, [currentUser, network]);

    const initialEdges = useMemo(() => {
        return network.map((person) => ({
            id: `e-${person.referred_by || currentUser.id}-${person.id}`,
            source: person.referred_by || currentUser.id,
            target: person.id,
            animated: true,
            style: { stroke: '#94a3b8', strokeWidth: 2 },
        }));
    }, [currentUser, network]);

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div style={{ width: '100%', height: '500px' }} className="w-full h-full relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                fitViewOptions={{ padding: 0.3 }}
                minZoom={0.5}
            >
                <Controls />
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
                <Background variant={BackgroundVariant.Dots} gap={24} size={2} color="#cbd5e1" />
            </ReactFlow>
        </div>
    );
}
