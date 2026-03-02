const fs = require('fs');

let content = fs.readFileSync('src/app/painel/configuracoes/page.tsx', 'utf8');

content = content.replace(
    'import { X, User, FileText, Globe, Award, Share2, Mail, Phone, MapPin, Clock, Edit3, Link as LinkIcon, Facebook, Instagram, Youtube } from "lucide-react";',
    'import { X, User, FileText, Globe, Award, Share2, Mail, Phone, MapPin, Clock, Edit3, Link as LinkIcon, Facebook, Instagram, Youtube, Plus } from "lucide-react";'
);

content = content.replace(
    `                            <Link href="/painel/configuracoes?edit=true&tab=contato" className={\`py-4 text-sm font-bold border-b-2 transition-colors \${currentTab === 'contato' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400 hover:text-slate-300'}\`}>
                                Contato
                            </Link>
                        </div>`,
    `                            <Link href="/painel/configuracoes?edit=true&tab=contato" className={\`py-4 text-sm font-bold border-b-2 transition-colors \${currentTab === 'contato' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400 hover:text-slate-300'}\`}>
                                Contato
                            </Link>
                            <Link href="/painel/configuracoes?edit=true&tab=crm" className={\`py-4 text-sm font-bold border-b-2 transition-colors \${currentTab === 'crm' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400 hover:text-slate-300'}\`}>
                                Pipelines do CRM
                            </Link>
                        </div>`
);

content = content.replace(
    `                            ) : (
                                <div className="flex flex-col gap-5 text-slate-800 dark:text-slate-300">

                                    {/* Contato Content */}`,
    `                            ) : currentTab === 'contato' ? (
                                <div className="flex flex-col gap-5 text-slate-800 dark:text-slate-300">

                                    {/* Contato Content */}`
);

content = content.replace(
    `                                    </div>

                                </div>
                            )}
                        </div>`,
    `                                    </div>

                                </div>
                            ) : (
                                <div className="flex flex-col gap-5 text-slate-800 dark:text-slate-300">
                                    <div className="flex flex-col gap-1.5 mb-2">
                                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Etapas do Funil (Pipelines)</h3>
                                        <p className="text-xs text-slate-500">Configure as colunas que aparecerão no seu painel de CRM. Arraste para reordenar (em breve).</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <input type="text" defaultValue="Novos Leads" className="flex-1 bg-slate-50 dark:bg-[#0f172a] border border-blue-500 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none transition-colors border-l-4" />
                                            <button className="p-2.5 text-slate-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type="text" defaultValue="Contatados" className="flex-1 bg-slate-50 dark:bg-[#0f172a] border border-amber-500 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none transition-colors border-l-4" />
                                            <button className="p-2.5 text-slate-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type="text" defaultValue="Em Negociação" className="flex-1 bg-slate-50 dark:bg-[#0f172a] border border-purple-500 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none transition-colors border-l-4" />
                                            <button className="p-2.5 text-slate-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type="text" defaultValue="Convertidos" className="flex-1 bg-slate-50 dark:bg-[#0f172a] border border-emerald-500 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none transition-colors border-l-4" />
                                            <button className="p-2.5 text-slate-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                    <button className="w-full mt-2 border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-colors rounded-lg py-3 text-sm font-bold flex justify-center items-center gap-2">
                                        <Plus className="w-4 h-4" /> Adicionar Nova Etapa
                                    </button>
                                </div>
                            )}
                        </div>`
);

fs.writeFileSync('src/app/painel/configuracoes/page.tsx', content);

// And fix leads Admin text
let leadsContent = fs.readFileSync('src/app/painel/leads/page.tsx', 'utf8');
leadsContent = leadsContent.replace('Visualização Admin', 'Visão Modo Dono (Rede)').replace('Ative para ver analytics de todos os corretores do sistema.', 'Ative para ver os leads captados por todos os corretores afiliados abaixo da sua rede.');
fs.writeFileSync('src/app/painel/leads/page.tsx', leadsContent);

