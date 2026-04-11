import Link from "next/link";
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    ExternalLink,
    Globe,
    Megaphone,
    MessageCircle,
    RadioTower,
    Sparkles,
    Target,
    UploadCloud,
    Users,
} from "lucide-react";

import { CopySiteLink } from "../meus-sites/CopySiteLink";

type LeadCaptureTabProps = {
    siteUrl: string;
    propertiesCount: number;
    totalLeads: number;
    newLeads: number;
    originCounts: {
        website: number;
        portal: number;
        manual: number;
        referral: number;
    };
};

export function LeadCaptureTab({
    siteUrl,
    propertiesCount,
    totalLeads,
    newLeads,
    originCounts,
}: LeadCaptureTabProps) {
    const checklist = [
        {
            title: "Montar sua vitrine de captacao",
            description:
                propertiesCount > 0
                    ? "Seu portifolio ja pode ser divulgado para captar leads automaticamente pelo site."
                    : "Cadastre pelo menos um imovel para transformar seu link em uma pagina de captacao de verdade.",
            href: propertiesCount > 0 ? "/painel/imoveis" : "/painel/imoveis/novo",
            cta: propertiesCount > 0 ? "Ver portifolio" : "Cadastrar imovel",
            status: propertiesCount > 0 ? "Concluido" : "Pendente",
            done: propertiesCount > 0,
        },
        {
            title: "Publicar e compartilhar seu site",
            description:
                "Use sua lead page como link principal da bio, em anuncios e no atendimento para concentrar a entrada de contatos.",
            href: "/painel/meus-sites",
            cta: "Abrir Meu Site",
            status: "Pronto para usar",
            done: true,
        },
        {
            title: "Conectar campanhas pagas",
            description:
                "Centralize Meta Ads e outras campanhas para fazer os leads entrarem no CRM com mais velocidade e rastreabilidade.",
            href: "/painel/anuncios",
            cta: "Conectar anuncios",
            status: "Recomendado",
            done: false,
        },
        {
            title: "Responder em minutos via WhatsApp",
            description:
                "Quanto mais rapido o primeiro contato, maior a chance de qualificacao. Configure o canal de resposta rapida.",
            href: "/painel/whatsapp",
            cta: "Ativar WhatsApp",
            status: newLeads > 0 ? "Urgente" : "Pronto",
            done: false,
        },
    ];

    const channels = [
        {
            title: "Site pessoal",
            description: "Transforme seu portifolio em uma maquina de captacao com link proprio e formulario automatico.",
            href: "/painel/meus-sites",
            cta: "Gerenciar site",
            metric: `${originCounts.website} leads captados`,
            icon: Globe,
            accent: "blue",
        },
        {
            title: "Meta Ads",
            description: "Conecte suas campanhas e use paginas de alta conversao para gerar demanda qualificada.",
            href: "/painel/anuncios",
            cta: "Abrir anuncios",
            metric: `${originCounts.portal} leads de campanhas`,
            icon: Megaphone,
            accent: "violet",
        },
        {
            title: "Importacao de base",
            description: "Suba planilhas, limpe contatos antigos e recoloque oportunidades na sua esteira de follow-up.",
            href: "/painel/leads?tab=importar",
            cta: "Importar CSV",
            metric: `${originCounts.manual} leads manuais`,
            icon: UploadCloud,
            accent: "amber",
        },
        {
            title: "Parcerias e indicacoes",
            description: "Aproveite sua rede, seu site e convites para captar contatos vindos de parceiros e recomendacoes.",
            href: "/painel/rede",
            cta: "Abrir rede",
            metric: `${originCounts.referral} leads por indicacao`,
            icon: RadioTower,
            accent: "emerald",
        },
    ] as const;

    const nextAction =
        propertiesCount === 0
            ? {
                  title: "Comece pelo portifolio",
                  description: "Sem imoveis cadastrados, sua captacao fica fraca. Um imovel ja libera a vitrine e o compartilhamento.",
                  href: "/painel/imoveis/novo",
                  cta: "Cadastrar primeiro imovel",
              }
            : totalLeads === 0
              ? {
                    title: "Distribua seu link agora",
                    description: "Seu site ja pode captar. O proximo passo e publicar o link em anuncios, bio e WhatsApp.",
                    href: "/painel/meus-sites",
                    cta: "Abrir link do site",
                }
              : {
                    title: "Acelere o primeiro contato",
                    description: "Voce ja tem leads no CRM. Agora o ganho maior esta em velocidade de resposta e nutricao.",
                    href: "/painel/whatsapp",
                    cta: "Configurar resposta rapida",
                };

    const sourceRows = [
        { label: "Website / lead page", value: originCounts.website, tone: "bg-blue-500" },
        { label: "Campanhas e portais", value: originCounts.portal, tone: "bg-violet-500" },
        { label: "Cadastro manual / importacao", value: originCounts.manual, tone: "bg-amber-500" },
        { label: "Indicacao / rede", value: originCounts.referral, tone: "bg-emerald-500" },
    ];

    return (
        <div className="space-y-6">
            <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 p-6 sm:p-8 text-white shadow-xl shadow-slate-900/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(34,197,94,0.18),_transparent_28%)]" />
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
                        <Sparkles className="w-3.5 h-3.5" />
                        Etapa de captacao
                    </div>

                    <div className="mt-5 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
                        <div>
                            <h2 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                                Monte sua central de entrada de leads e pare de depender de um unico canal.
                            </h2>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50/82 sm:text-base">
                                Reunimos nesta etapa os quatro caminhos mais fortes para gerar novos contatos:
                                seu site, anuncios, importacao de base e indicacoes. O objetivo e simples:
                                captar, responder rapido e empurrar os leads certos para o CRM.
                            </p>

                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-100/75">Imoveis prontos</p>
                                    <p className="mt-2 text-3xl font-black">{propertiesCount}</p>
                                    <p className="mt-1 text-sm text-blue-50/75">Itens para divulgar e converter.</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-100/75">Leads no CRM</p>
                                    <p className="mt-2 text-3xl font-black">{totalLeads}</p>
                                    <p className="mt-1 text-sm text-blue-50/75">Base atual pronta para nutricao.</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-100/75">Novos aguardando contato</p>
                                    <p className="mt-2 text-3xl font-black">{newLeads}</p>
                                    <p className="mt-1 text-sm text-blue-50/75">Prioridade para resposta rapida.</p>
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-100/75">Link principal de captacao</p>
                                        <p className="mt-1 text-sm text-blue-50/80">
                                            Compartilhe este link na bio, nos anuncios e nas conversas com clientes.
                                        </p>
                                    </div>
                                    <a
                                        href={siteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/15"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Ver site
                                    </a>
                                </div>
                                <CopySiteLink siteUrl={siteUrl} />
                            </div>
                        </div>

                        <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-5 backdrop-blur-sm">
                            <div className="flex items-center gap-2 text-cyan-100">
                                <Target className="w-5 h-5" />
                                <h3 className="text-lg font-extrabold">Proximo melhor passo</h3>
                            </div>
                            <p className="mt-4 text-xl font-black leading-tight text-white">
                                {nextAction.title}
                            </p>
                            <p className="mt-3 text-sm leading-6 text-blue-50/78">
                                {nextAction.description}
                            </p>

                            <Link
                                href={nextAction.href}
                                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-black text-slate-950 transition-colors hover:bg-emerald-300"
                            >
                                {nextAction.cta}
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-100/75">
                                    Como essa etapa funciona
                                </p>
                                <div className="mt-4 space-y-3">
                                    {[
                                        "Atraia trafego para sua vitrine com site e anuncios.",
                                        "Centralize a entrada no CRM com origem definida.",
                                        "Diminua o tempo de resposta para aumentar qualificacao.",
                                    ].map((item) => (
                                        <div key={item} className="flex items-start gap-3 text-sm text-blue-50/80">
                                            <CheckCircle2 className="mt-0.5 w-4 h-4 shrink-0 text-emerald-300" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.08fr_.92fr]">
                <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#1a1f2c]">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                                Checklist recomendado
                            </p>
                            <h3 className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">
                                Ative os canais na ordem certa
                            </h3>
                        </div>
                        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                            {checklist.filter((item) => item.done).length}/{checklist.length} prontos
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        {checklist.map((item, index) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-slate-200 p-4 transition-colors hover:border-blue-200 dark:border-slate-800 dark:hover:border-slate-700"
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
                                                item.done
                                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                                                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                                            }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h4 className="text-base font-black text-slate-900 dark:text-slate-100">
                                                    {item.title}
                                                </h4>
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                                                        item.done
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                                                            : item.status === "Urgente"
                                                              ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                                                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </div>
                                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    <Link
                                        href={item.href}
                                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                    >
                                        {item.cta}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#1a1f2c]">
                    <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-800">
                            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                                Leitura da captacao
                            </p>
                            <h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-slate-100">
                                De onde seus leads estao vindo
                            </h3>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        {sourceRows.map((row) => (
                            <div key={row.label}>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="font-semibold text-slate-600 dark:text-slate-300">{row.label}</span>
                                    <span className="font-black text-slate-900 dark:text-slate-100">{row.value}</span>
                                </div>
                                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                                    <div
                                        className={`h-2 rounded-full ${row.tone}`}
                                        style={{
                                            width: `${Math.max(
                                                totalLeads > 0 ? (row.value / totalLeads) * 100 : row.value > 0 ? 18 : 8,
                                                row.value > 0 ? 18 : 8
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                            Leitura recomendada
                        </p>
                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            Se a maior parte dos contatos ainda entra como cadastro manual, vale acelerar
                            site, anuncios e parcerias. Quanto mais origem automatica, mais facil medir
                            custo, qualidade e velocidade de conversao.
                        </p>
                    </div>

                    <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
                        <div className="flex items-start gap-3">
                            <Building2 className="mt-0.5 w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
                            <div>
                                <h4 className="font-black text-slate-900 dark:text-slate-100">
                                    Sua captacao ja tem um link central
                                </h4>
                                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    Em vez de espalhar varios links, use seu site como destino principal e
                                    organize o restante dos canais ao redor dele.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {channels.map((channel) => {
                    const Icon = channel.icon;
                    const accentClasses: Record<typeof channel.accent, string> = {
                        blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
                        violet: "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300",
                        amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",
                        emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300",
                    };

                    return (
                        <Link
                            key={channel.title}
                            href={channel.href}
                            className="group rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg dark:border-slate-800 dark:bg-[#1a1f2c] dark:hover:border-slate-700"
                        >
                            <div className={`inline-flex rounded-2xl p-3 ${accentClasses[channel.accent]}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="mt-4 text-lg font-black text-slate-900 dark:text-slate-100">
                                {channel.title}
                            </h3>
                            <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-500 dark:text-slate-400">
                                {channel.description}
                            </p>
                            <div className="mt-5 flex items-center justify-between gap-3">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                    {channel.metric}
                                </span>
                                <span className="inline-flex items-center gap-2 text-sm font-black text-slate-900 dark:text-slate-100">
                                    {channel.cta}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </section>

            <section className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#1a1f2c]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                            Roteiro sugerido
                        </p>
                        <h3 className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">
                            Sequencia recomendada para a proxima semana
                        </h3>
                    </div>
                    <Link
                        href="/painel/whatsapp"
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-black text-white transition-colors hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Abrir fluxo de resposta
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                        <p className="text-sm font-black text-slate-900 dark:text-slate-100">Dia 1 a 2</p>
                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Ajuste o site, revise a oferta principal e copie o link de captacao para divulgar.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                        <p className="text-sm font-black text-slate-900 dark:text-slate-100">Dia 3 a 5</p>
                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Ative campanhas ou distribua o link na sua rede para trazer volume novo ao CRM.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                        <p className="text-sm font-black text-slate-900 dark:text-slate-100">Dia 5 a 7</p>
                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Meça origem, tempo de resposta e contatos novos para dobrar o que estiver funcionando.
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href="/painel/anuncios"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <Megaphone className="w-4 h-4" />
                        Configurar anuncios
                    </Link>
                    <Link
                        href="/painel/whatsapp"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Preparar atendimento
                    </Link>
                    <Link
                        href="/painel/leads?tab=importar"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <UploadCloud className="w-4 h-4" />
                        Trazer base antiga
                    </Link>
                </div>
            </section>
        </div>
    );
}
