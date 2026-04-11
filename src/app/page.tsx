export const dynamic = 'force-dynamic';

import Link from "next/link";
import {
    Globe, BarChart3, Users, Building2, Zap, ShieldCheck,
    ArrowRight, Star, CheckCircle2, MessageCircle, TrendingUp,
    Layers, Cpu, Lock
} from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">

            {/* ═══════════════════════
                HEADER
            ═══════════════════════ */}
            <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/30">
                            A
                        </div>
                        <div>
                            <span className="font-extrabold text-[15px] leading-tight text-slate-900">Imob<span className="text-blue-600">Painel</span></span>
                            <span className="block text-[10px] text-slate-400 font-medium tracking-wide">Sistema Multinível</span>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#funcionalidades" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Funcionalidades</a>
                        <a href="#planos" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Planos</a>
                        <a href="#depoimentos" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Depoimentos</a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                            Entrar
                        </Link>
                        <Link href="/registrar" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2.5 text-sm font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
                            Criar conta grátis
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 pt-20">

                {/* ═══════════════════════
                    HERO
                ═══════════════════════ */}
                <section className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
                    {/* Animated Buildings Skyline */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {/* Grid pattern */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
                        {/* Glow blobs */}
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

                        {/* Buildings SVG Skyline */}
                        <svg
                            className="absolute bottom-0 right-0 w-full max-w-3xl h-auto opacity-[0.18]"
                            viewBox="0 0 900 500"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMaxYMax meet"
                        >
                            {/* Building 1 - tall tower far right */}
                            <rect x="820" y="80" width="60" height="420" rx="4" fill="#60a5fa" style={{ animation: "buildingRise 1.4s ease-out forwards", transformOrigin: "bottom" }} />
                            <rect x="832" y="90" width="8" height="8" fill="#93c5fd" opacity="0.8" />
                            <rect x="848" y="90" width="8" height="8" fill="#93c5fd" opacity="0.8" />
                            <rect x="864" y="90" width="8" height="8" fill="#93c5fd" opacity="0.8" />
                            <rect x="832" y="106" width="8" height="8" fill="#93c5fd" opacity="0.5" />
                            <rect x="848" y="106" width="8" height="8" fill="#93c5fd" opacity="0.9" />
                            <rect x="864" y="106" width="8" height="8" fill="#93c5fd" opacity="0.4" />

                            {/* Building 2 - medium */}
                            <rect x="740" y="160" width="70" height="340" rx="4" fill="#818cf8" style={{ animation: "buildingRise 1.1s ease-out 0.1s forwards", transformOrigin: "bottom", opacity: 0 }} />
                            <rect x="752" y="170" width="9" height="9" fill="#a5b4fc" opacity="0.7" />
                            <rect x="768" y="170" width="9" height="9" fill="#a5b4fc" opacity="0.9" />
                            <rect x="784" y="170" width="9" height="9" fill="#a5b4fc" opacity="0.5" />
                            <rect x="752" y="187" width="9" height="9" fill="#a5b4fc" opacity="0.4" />
                            <rect x="768" y="187" width="9" height="9" fill="#a5b4fc" opacity="0.8" />

                            {/* Building 3 - short wide */}
                            <rect x="670" y="230" width="60" height="270" rx="4" fill="#3b82f6" style={{ animation: "buildingRise 1.0s ease-out 0.2s forwards", transformOrigin: "bottom", opacity: 0 }} />
                            <rect x="680" y="240" width="8" height="8" fill="#93c5fd" opacity="0.6" />
                            <rect x="695" y="240" width="8" height="8" fill="#93c5fd" opacity="0.9" />
                            <rect x="710" y="240" width="8" height="8" fill="#93c5fd" opacity="0.4" />

                            {/* Building 4 - very tall center */}
                            <rect x="590" y="50" width="70" height="450" rx="4" fill="#6366f1" style={{ animation: "buildingRise 1.6s ease-out 0.05s forwards", transformOrigin: "bottom", opacity: 0 }} />
                            {/* Antenna */}
                            <rect x="623" y="20" width="4" height="30" fill="#818cf8" />
                            <rect x="596" y="60" width="10" height="10" fill="#a5b4fc" opacity="0.8" />
                            <rect x="612" y="60" width="10" height="10" fill="#a5b4fc" opacity="0.6" />
                            <rect x="628" y="60" width="10" height="10" fill="#a5b4fc" opacity="0.9" />
                            <rect x="644" y="60" width="10" height="10" fill="#a5b4fc" opacity="0.5" />
                            <rect x="596" y="78" width="10" height="10" fill="#a5b4fc" opacity="0.4" />
                            <rect x="612" y="78" width="10" height="10" fill="#a5b4fc" opacity="0.7" />
                            <rect x="628" y="78" width="10" height="10" fill="#a5b4fc" opacity="0.3" />

                            {/* Building 5 */}
                            <rect x="510" y="190" width="70" height="310" rx="4" fill="#4f46e5" style={{ animation: "buildingRise 1.2s ease-out 0.15s forwards", transformOrigin: "bottom", opacity: 0 }} />
                            <rect x="520" y="200" width="9" height="9" fill="#818cf8" opacity="0.7" />
                            <rect x="536" y="200" width="9" height="9" fill="#818cf8" opacity="0.5" />
                            <rect x="552" y="200" width="9" height="9" fill="#818cf8" opacity="0.9" />

                            {/* Building 6 - shorter */}
                            <rect x="450" y="270" width="50" height="230" rx="4" fill="#2563eb" style={{ animation: "buildingRise 0.9s ease-out 0.25s forwards", transformOrigin: "bottom", opacity: 0 }} />

                            {/* Ground line */}
                            <rect x="0" y="498" width="900" height="2" fill="#60a5fa" opacity="0.3" />
                        </svg>

                        {/* Floating particles */}
                        <div className="absolute top-20 right-1/4 w-1 h-1 bg-blue-400 rounded-full" style={{ animation: "floatUp 4s ease-in-out infinite" }} />
                        <div className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full" style={{ animation: "floatUp 6s ease-in-out infinite 1s" }} />
                        <div className="absolute top-60 right-1/5 w-1 h-1 bg-blue-300 rounded-full" style={{ animation: "floatUp 5s ease-in-out infinite 2s" }} />
                    </div>

                    <style>{`
                        @keyframes buildingRise {
                            from { opacity: 0; transform: scaleY(0); }
                            to   { opacity: 1; transform: scaleY(1); }
                        }
                        @keyframes floatUp {
                            0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
                            50%       { transform: translateY(-24px) scale(1.3); opacity: 1; }
                        }
                    `}</style>

                    <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 mb-8">
                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                <span className="text-xs font-bold text-white/80 tracking-wide uppercase">Plataforma Multinível para Corretores</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
                                Seu site imobiliário,<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                                    sua rede de afiliados.
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-2xl">
                                Crie seu site personalizado, gerencie imóveis, capture leads e construa uma rede multinível de corretores — tudo em uma única plataforma.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/registrar" className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl px-8 py-4 text-base font-extrabold shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                                    Começar grátis <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link href="/demo" className="bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl px-8 py-4 text-base font-bold transition-all flex items-center gap-2">
                                    Ver demonstração
                                </Link>
                            </div>

                            {/* Social proof */}
                            <div className="mt-12 flex items-center gap-6 flex-wrap">
                                <div className="flex -space-x-2">
                                    {["A","B","C","D"].map((l, i) => (
                                        <div key={i} className={`w-9 h-9 rounded-full border-2 border-slate-900 flex items-center justify-center text-xs font-black text-white ${["bg-blue-500","bg-purple-500","bg-emerald-500","bg-amber-500"][i]}`}>
                                            {l}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1 mb-0.5">
                                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                                    </div>
                                    <p className="text-xs text-white/50 font-medium">+500 corretores usando hoje</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════
                    FUNCIONALIDADES
                ═══════════════════════ */}
                <section id="funcionalidades" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-16">
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Funcionalidades</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-4">Tudo que você precisa em um só lugar</h2>
                            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                                Ferramentas profissionais para corretores que querem crescer com tecnologia e inteligência.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: <Globe className="w-6 h-6" />,
                                    color: "blue",
                                    title: "Site Personalizado",
                                    desc: "Crie seu site profissional com templates modernos, domínio próprio e editor visual intuitivo."
                                },
                                {
                                    icon: <Users className="w-6 h-6" />,
                                    color: "purple",
                                    title: "CRM de Leads",
                                    desc: "Pipeline kanban completo para acompanhar cada lead do primeiro contato até a assinatura."
                                },
                                {
                                    icon: <TrendingUp className="w-6 h-6" />,
                                    color: "emerald",
                                    title: "Rede Multinível",
                                    desc: "Sistema de comissões 4% · 2% · 1% em rede. Construa sua equipe e aumente sua renda passiva."
                                },
                                {
                                    icon: <Building2 className="w-6 h-6" />,
                                    color: "amber",
                                    title: "Gestão de Imóveis",
                                    desc: "Cadastre, organize e publique sua carteira de imóveis com fotos, valores e detalhes completos."
                                },
                                {
                                    icon: <Cpu className="w-6 h-6" />,
                                    color: "indigo",
                                    title: "IA para Corretores",
                                    desc: "Geração automática de textos, descrições e anúncios otimizados com inteligência artificial."
                                },
                                {
                                    icon: <MessageCircle className="w-6 h-6" />,
                                    color: "rose",
                                    title: "WhatsApp Integrado",
                                    desc: "Botão de WhatsApp personalizado, atendimento rodízio e automação de mensagens para leads."
                                },
                                {
                                    icon: <BarChart3 className="w-6 h-6" />,
                                    color: "cyan",
                                    title: "Relatórios e Analytics",
                                    desc: "Acompanhe visitas ao site, origem dos leads, conversões e desempenho da sua rede."
                                },
                                {
                                    icon: <Zap className="w-6 h-6" />,
                                    color: "orange",
                                    title: "Automações",
                                    desc: "Disparo automático de e-mails, WhatsApp e notificações conforme o funil de vendas avança."
                                },
                                {
                                    icon: <ShieldCheck className="w-6 h-6" />,
                                    color: "teal",
                                    title: "Segurança e LGPD",
                                    desc: "Dados protegidos, cookies configuráveis e conformidade total com a legislação brasileira."
                                },
                            ].map(feat => {
                                const iconBg: Record<string, string> = {
                                    blue:    "bg-blue-50 text-blue-600",
                                    purple:  "bg-purple-50 text-purple-600",
                                    emerald: "bg-emerald-50 text-emerald-600",
                                    amber:   "bg-amber-50 text-amber-600",
                                    indigo:  "bg-indigo-50 text-indigo-600",
                                    rose:    "bg-rose-50 text-rose-600",
                                    cyan:    "bg-cyan-50 text-cyan-600",
                                    orange:  "bg-orange-50 text-orange-600",
                                    teal:    "bg-teal-50 text-teal-600",
                                };
                                return (
                                    <div key={feat.title} className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:border-blue-100 transition-all">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg[feat.color]}`}>
                                            {feat.icon}
                                        </div>
                                        <h3 className="font-extrabold text-slate-900 text-base mb-2">{feat.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════
                    PLANOS
                ═══════════════════════ */}
                <section id="planos" className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-16">
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Planos</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-4">Simples e transparente</h2>
                            <p className="text-slate-500 text-lg">Comece grátis e escale quando precisar.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {[
                                {
                                    name: "Starter",
                                    price: "Grátis",
                                    period: "para sempre",
                                    highlight: false,
                                    features: ["1 site personalizado", "Até 10 imóveis", "CRM básico", "WhatsApp integrado", "Suporte por e-mail"],
                                },
                                {
                                    name: "Pro",
                                    price: "R$ 97",
                                    period: "/ mês",
                                    highlight: true,
                                    features: ["Sites ilimitados", "Imóveis ilimitados", "CRM avançado + Pipeline", "IA para textos", "Rede multinível ativa", "Relatórios completos", "Suporte prioritário"],
                                },
                                {
                                    name: "Enterprise",
                                    price: "Sob consulta",
                                    period: "",
                                    highlight: false,
                                    features: ["Tudo do Pro", "White-label completo", "API customizada", "Onboarding dedicado", "SLA garantido", "Gerente de conta"],
                                },
                            ].map(plan => (
                                <div key={plan.name} className={`rounded-2xl p-8 flex flex-col ${plan.highlight ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/30 scale-[1.02]" : "bg-white border border-slate-200"}`}>
                                    <div className="mb-6">
                                        <p className={`text-sm font-bold uppercase tracking-widest mb-2 ${plan.highlight ? "text-blue-200" : "text-slate-400"}`}>{plan.name}</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.price}</span>
                                            {plan.period && <span className={`text-sm font-medium ${plan.highlight ? "text-blue-200" : "text-slate-400"}`}>{plan.period}</span>}
                                        </div>
                                    </div>
                                    <ul className="space-y-3 flex-1 mb-8">
                                        {plan.features.map(f => (
                                            <li key={f} className="flex items-center gap-2.5 text-sm">
                                                <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-blue-200" : "text-emerald-500"}`} />
                                                <span className={plan.highlight ? "text-white/90" : "text-slate-600"}>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="/registrar"
                                        className={`w-full py-3 rounded-xl text-sm font-extrabold text-center transition-all ${plan.highlight ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-slate-900 text-white hover:bg-slate-800"}`}
                                    >
                                        {plan.name === "Enterprise" ? "Falar com vendas" : "Começar agora"}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════
                    CTA FINAL
                ═══════════════════════ */}
                <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-950 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
                    </div>
                    <div className="max-w-3xl mx-auto px-4 md:px-8 text-center relative z-10">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Layers className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                            Pronto para escalar seu negócio imobiliário?
                        </h2>
                        <p className="text-white/60 text-lg mb-8">
                            Crie sua conta grátis em menos de 2 minutos. Sem cartão de crédito.
                        </p>
                        <Link href="/registrar" className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl px-8 py-4 text-base font-extrabold shadow-xl transition-all hover:scale-105">
                            Criar conta gratuita <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>

            {/* ═══════════════════════
                FOOTER
            ═══════════════════════ */}
            <footer className="bg-slate-950 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-black">
                                A
                            </div>
                            <span className="font-extrabold text-white">Imob<span className="text-blue-400">Painel</span></span>
                        </div>
                        <div className="flex items-center gap-6 text-xs text-slate-500">
                            <a href="#" className="hover:text-slate-300 transition-colors">Termos de uso</a>
                            <a href="#" className="hover:text-slate-300 transition-colors">Privacidade</a>
                            <a href="#" className="hover:text-slate-300 transition-colors">Suporte</a>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Lock className="w-3.5 h-3.5" />
                            <span>&copy; 2026 ImobPainel. Todos os direitos reservados.</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
