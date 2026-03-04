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
}

interface TreeGraphProps {
    currentUser: UserNode;
    network: UserNode[];
}

export default function TreeGraph({ currentUser, network }: TreeGraphProps) {

    const initialNodes = useMemo(() => {
        // Root Node (Current User)
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
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                },
            }
        ];

        // Direct Referrals (Network)
        network.forEach((person, index) => {
            // Calculate positions to spread them out horizontally
            const xPos = 100 + (index * 200);
            nodes.push({
                id: person.id,
                position: { x: xPos, y: 200 },
                data: {
                    label: (
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-sm text-slate-800">{person.full_name || 'Corretor'}</span>
                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">Nível 1</span>
                        </div>
                    )
                },
                style: {
                    background: '#ffffff',
                    color: '#0f172a',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
                },
            });
        });

        return nodes;
    }, [currentUser, network]);

    const initialEdges = useMemo(() => {
        return network.map((person) => ({
            id: `e-${currentUser.id}-${person.id}`,
            source: currentUser.id,
            target: person.id,
            animated: true,
            style: { stroke: '#94a3b8', strokeWidth: 2 },
        }));
    }, [currentUser, network]);

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div style={{ width: '100%', height: '500px' }} className="mt-2 bg-slate-50 border border-slate-200 rounded-xl shadow-inner relative overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.5}
            >
                <Controls />
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
                <Background variant={BackgroundVariant.Dots} gap={24} size={2} color="#cbd5e1" />
            </ReactFlow>
        </div>
    );
}
