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
                <section className="relative w-full min-h-[88vh] flex items-center overflow-hidden" style={{ background: "linear-gradient(160deg, #050a1a 0%, #0a1628 40%, #0d1f3c 70%, #0c1830 100%)" }}>
                    {/* ── Realistic city-at-night background ── */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">

                        {/* Sky gradient horizon glow */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: "linear-gradient(to top, rgba(30,58,138,0.35) 0%, transparent 100%)" }} />
                        <div className="absolute bottom-0 left-1/4 w-1/2 h-40 bg-blue-900/20 blur-3xl rounded-full" />

                        {/* Stars */}
                        {[
                            [8,6],[15,12],[23,4],[31,9],[42,7],[54,3],[63,14],[71,8],[80,5],[88,11],
                            [12,20],[28,18],[47,22],[60,16],[75,19],[90,13],[5,28],[35,25],[50,30],[82,24],
                        ].map(([x,y],i) => (
                            <div key={i} className="absolute rounded-full bg-white" style={{ left:`${x}%`, top:`${y}%`, width: i % 3 === 0 ? 2 : 1, height: i % 3 === 0 ? 2 : 1, opacity: 0.3 + (i % 4) * 0.15 }} />
                        ))}

                        {/* Detailed city skyline SVG */}
                        <svg className="absolute bottom-0 right-0 w-full h-auto" viewBox="0 0 1440 520" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMax meet">
                            <defs>
                                <linearGradient id="bldA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e3a5f"/><stop offset="100%" stopColor="#0f1e35"/></linearGradient>
                                <linearGradient id="bldB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#162d4a"/><stop offset="100%" stopColor="#0a1624"/></linearGradient>
                                <linearGradient id="bldC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a3354"/><stop offset="100%" stopColor="#0c1a2e"/></linearGradient>
                                <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4"/><stop offset="100%" stopColor="#1e40af" stopOpacity="0"/></linearGradient>
                            </defs>

                            {/* Ground */}
                            <rect x="0" y="510" width="1440" height="10" fill="#0f1e35"/>

                            {/* Road reflection */}
                            <rect x="0" y="505" width="1440" height="3" fill="#1e3a5f" opacity="0.5"/>
                            <rect x="200" y="506" width="400" height="1" fill="#3b82f6" opacity="0.15"/>
                            <rect x="800" y="506" width="500" height="1" fill="#3b82f6" opacity="0.15"/>

                            {/* Far background buildings (silhouette) */}
                            <rect x="0" y="320" width="80" height="190" fill="#0a1420"/>
                            <rect x="85" y="350" width="60" height="160" fill="#0a1420"/>
                            <rect x="150" y="300" width="45" height="210" fill="#0c1628"/>
                            <rect x="200" y="360" width="70" height="150" fill="#0a1420"/>
                            <rect x="1280" y="340" width="80" height="170" fill="#0a1420"/>
                            <rect x="1365" y="310" width="75" height="200" fill="#0a1420"/>

                            {/* Building cluster 1 - far left */}
                            <rect x="30" y="260" width="55" height="250" rx="2" fill="url(#bldB)"/>
                            <rect x="32" y="268" width="7" height="6" fill="#f59e0b" opacity="0.7"/>
                            <rect x="44" y="268" width="7" height="6" fill="#fbbf24" opacity="0.9"/>
                            <rect x="56" y="268" width="7" height="6" fill="#f59e0b" opacity="0.4"/>
                            <rect x="68" y="268" width="7" height="6" fill="#fbbf24" opacity="0.8"/>
                            <rect x="32" y="282" width="7" height="6" fill="#fbbf24" opacity="0.5"/>
                            <rect x="44" y="282" width="7" height="6" fill="#f59e0b" opacity="0.3"/>
                            <rect x="56" y="282" width="7" height="6" fill="#fbbf24" opacity="0.9"/>
                            <rect x="32" y="296" width="7" height="6" fill="#f59e0b" opacity="0.8"/>
                            <rect x="44" y="296" width="7" height="6" fill="#fbbf24" opacity="0.6"/>
                            <rect x="68" y="296" width="7" height="6" fill="#f59e0b" opacity="0.4"/>

                            {/* Building cluster 2 */}
                            <rect x="90" y="200" width="70" height="310" rx="2" fill="url(#bldA)"/>
                            <rect x="94" y="210" width="8" height="7" fill="#fbbf24" opacity="0.85"/>
                            <rect x="108" y="210" width="8" height="7" fill="#f59e0b" opacity="0.6"/>
                            <rect x="122" y="210" width="8" height="7" fill="#fbbf24" opacity="0.9"/>
                            <rect x="136" y="210" width="8" height="7" fill="#f59e0b" opacity="0.4"/>
                            <rect x="148" y="210" width="8" height="7" fill="#fbbf24" opacity="0.7"/>
                            <rect x="94" y="225" width="8" height="7" fill="#f59e0b" opacity="0.5"/>
                            <rect x="108" y="225" width="8" height="7" fill="#fbbf24" opacity="0.9"/>
                            <rect x="122" y="225" width="8" height="7" fill="#f59e0b" opacity="0.3"/>
                            <rect x="136" y="225" width="8" height="7" fill="#fbbf24" opacity="0.8"/>
                            <rect x="94" y="240" width="8" height="7" fill="#fbbf24" opacity="0.7"/>
                            <rect x="108" y="240" width="8" height="7" fill="#f59e0b" opacity="0.4"/>
                            <rect x="122" y="240" width="8" height="7" fill="#fbbf24" opacity="0.95"/>
                            <rect x="136" y="240" width="8" height="7" fill="#f59e0b" opacity="0.6"/>
                            <rect x="94" y="255" width="8" height="7" fill="#f59e0b" opacity="0.3"/>
                            <rect x="122" y="255" width="8" height="7" fill="#fbbf24" opacity="0.8"/>
                            <rect x="148" y="255" width="8" height="7" fill="#f59e0b" opacity="0.5"/>
                            {/* Antenna */}
                            <rect x="123" y="185" width="3" height="15" fill="#1e40af" opacity="0.8"/>
                            <circle cx="124" cy="184" r="2" fill="#ef4444" opacity="0.9"/>

                            {/* Tall center-left tower */}
                            <rect x="170" y="130" width="85" height="380" rx="3" fill="url(#bldA)"/>
                            <rect x="174" y="140" width="10" height="8" fill="#fbbf24" opacity="0.9"/>
                            <rect x="190" y="140" width="10" height="8" fill="#f59e0b" opacity="0.6"/>
                            <rect x="206" y="140" width="10" height="8" fill="#fbbf24" opacity="0.8"/>
                            <rect x="222" y="140" width="10" height="8" fill="#f59e0b" opacity="0.4"/>
                            <rect x="238" y="140" width="10" height="8" fill="#fbbf24" opacity="0.95"/>
                            <rect x="174" y="156" width="10" height="8" fill="#f59e0b" opacity="0.5"/>
                            <rect x="190" y="156" width="10" height="8" fill="#fbbf24" opacity="0.9"/>
                            <rect x="206" y="156" width="10" height="8" fill="#f59e0b" opacity="0.7"/>
                            <rect x="222" y="156" width="10" height="8" fill="#fbbf24" opacity="0.3"/>
                            <rect x="238" y="156" width="10" height="8" fill="#f59e0b" opacity="0.8"/>
                            <rect x="174" y="172" width="10" height="8" fill="#fbbf24" opacity="0.6"/>
                            <rect x="206" y="172" width="10" height="8" fill="#f59e0b" opacity="0.95"/>
                            <rect x="238" y="172" width="10" height="8" fill="#fbbf24" opacity="0.4"/>
                            <rect x="190" y="188" width="10" height="8" fill="#fbbf24" opacity="0.7"/>
                            <rect x="222" y="188" width="10" height="8" fill="#f59e0b" opacity="0.9"/>
                            <rect x="174" y="204" width="10" height="8" fill="#f59e0b" opacity="0.5"/>
                            <rect x="206" y="204" width="10" height="8" fill="#fbbf24" opacity="0.8"/>
                            <rect x="238" y="204" width="10" height="8" fill="#f59e0b" opacity="0.3"/>
                            {/* Top glow */}
                            <rect x="170" y="130" width="85" height="20" fill="url(#glow)"/>
                            <rect x="207" y="110" width="4" height="20" fill="#2563eb" opacity="0.6"/>

                            {/* Building cluster 3 - center */}
                            <rect x="270" y="240" width="65" height="270" rx="2" fill="url(#bldC)"/>
                            <rect x="274" y="250" width="8" height="7" fill="#fbbf24" opacity="0.8"/>
                            <rect x="288" y="250" width="8" height="7" fill="#f59e0b" opacity="0.5"/>
                            <rect x="302" y="250" width="8" height="7" fill="#fbbf24" opacity="0.9"/>
                            <rect x="316" y="250" width="8" height="7" fill="#f59e0b" opacity="0.3"/>
                            <rect x="328" y="250" width="8" height="7" fill="#fbbf24" opacity="0.7"/>
                            <rect x="274" y="264" width="8" height="7" fill="#f59e0b" opacity="0.6"/>
                            <rect x="302" y="264" width="8" height="7" fill="#fbbf24" opacity="0.95"/>
                            <rect x="316" y="264" width="8" height="7" fill="#f59e0b" opacity="0.4"/>
                            <rect x="288" y="278" width="8" height="7" fill="#fbbf24" opacity="0.8"/>
                            <rect x="328" y="278" width="8" height="7" fill="#f59e0b" opacity="0.7"/>
                            <rect x="274" y="292" width="8" height="7" fill="#fbbf24" opacity="0.5"/>
                            <rect x="302" y="292" width="8" height="7" fill="#f59e0b" opacity="0.9"/>

                            {/* Tall skyscraper right-center */}
                            <rect x="350" y="80" width="95" height="430" rx="3" fill="url(#bldA)"/>
                            <rect x="350" y="80" width="95" height="30" fill="url(#glow)"/>
                            <rect x="355" y="92" width="11" height="9" fill="#fbbf24" opacity="0.9"/>
                            <rect x="372" y="92" width="11" height="9" fill="#f59e0b" opacity="0.6"/>
                            <rect x="389" y="92" width="11" height="9" fill="#fbbf24" opacity="0.8"/>
                            <rect x="406" y="92" width="11" height="9" fill="#f59e0b" opacity="0.4"/>
                            <rect x="423" y="92" width="11" height="9" fill="#fbbf24" opacity="0.95"/>
                            <rect x="355" y="109" width="11" height="9" fill="#f59e0b" opacity="0.5"/>
                            <rect x="372" y="109" width="11" height="9" fill="#fbbf24" opacity="0.9"/>
                            <rect x="389" y="109" width="11" height="9" fill="#f59e0b" opacity="0.7"/>
                            <rect x="406" y="109" width="11" height="9" fill="#fbbf24" opacity="0.3"/>
                            <rect x="423" y="109" width="11" height="9" fill="#f59e0b" opacity="0.8"/>
                            <rect x="355" y="126" width="11" height="9" fill="#fbbf24" opacity="0.6"/>
                            <rect x="389" y="126" width="11" height="9" fill="#f59e0b" opacity="0.95"/>
                            <rect x="423" y="126" width="11" height="9" fill="#fbbf24" opacity="0.4"/>
                            <rect x="372" y="143" width="11" height="9" fill="#fbbf24" opacity="0.7"/>
                            <rect x="406" y="143" width="11" height="9" fill="#f59e0b" opacity="0.9"/>
                            <rect x="355" y="160" width="11" height="9" fill="#f59e0b" opacity="0.5"/>
                            <rect x="389" y="160" width="11" height="9" fill="#fbbf24" opacity="0.8"/>
                            <rect x="423" y="160" width="11" height="9" fill="#f59e0b" opacity="0.3"/>
                            <rect x="355" y="177" width="11" height="9" fill="#fbbf24" opacity="0.9"/>
                            <rect x="372" y="177" width="11" height="9" fill="#f59e0b" opacity="0.4"/>
                            <rect x="406" y="177" width="11" height="9" fill="#fbbf24" opacity="0.7"/>
                            {/* Antenna with blink */}
                            <rect x="394" y="58" width="5" height="22" fill="#1d4ed8" opacity="0.7"/>
                            <circle cx="396" cy="57" r="3" fill="#ef4444" opacity="0.9"/>

                            {/* Building cluster right */}
                            <rect x="460" y="200" width="75" height="310" rx="2" fill="url(#bldB)"/>
                            <rect x="464" y="210" width="9" height="8" fill="#fbbf24" opacity="0.8"/>
                            <rect x="479" y="210" width="9" height="8" fill="#f59e0b" opacity="0.5"/>
                            <rect x="494" y="210" width="9" height="8" fill="#fbbf24" opacity="0.9"/>
                            <rect x="509" y="210" width="9" height="8" fill="#f59e0b" opacity="0.3"/>
                            <rect x="524" y="210" width="9" height="8" fill="#fbbf24" opacity="0.7"/>
                            <rect x="464" y="226" width="9" height="8" fill="#f59e0b" opacity="0.6"/>
                            <rect x="494" y="226" width="9" height="8" fill="#fbbf24" opacity="0.95"/>
                            <rect x="524" y="226" width="9" height="8" fill="#f59e0b" opacity="0.4"/>
                            <rect x="479" y="242" width="9" height="8" fill="#fbbf24" opacity="0.8"/>
                            <rect x="509" y="242" width="9" height="8" fill="#f59e0b" opacity="0.7"/>
                            <rect x="464" y="258" width="9" height="8" fill="#fbbf24" opacity="0.5"/>
                            <rect x="494" y="258" width="9" height="8" fill="#f59e0b" opacity="0.9"/>

                            {/* Far right cluster */}
                            <rect x="550" y="280" width="50" height="230" rx="2" fill="url(#bldC)"/>
                            <rect x="553" y="290" width="7" height="6" fill="#fbbf24" opacity="0.7"/>
                            <rect x="565" y="290" width="7" height="6" fill="#f59e0b" opacity="0.4"/>
                            <rect x="577" y="290" width="7" height="6" fill="#fbbf24" opacity="0.9"/>
                            <rect x="589" y="290" width="7" height="6" fill="#f59e0b" opacity="0.6"/>
                            <rect x="553" y="304" width="7" height="6" fill="#f59e0b" opacity="0.3"/>
                            <rect x="565" y="304" width="7" height="6" fill="#fbbf24" opacity="0.8"/>
                            <rect x="577" y="304" width="7" height="6" fill="#f59e0b" opacity="0.5"/>

                            <rect x="610" y="310" width="55" height="200" rx="2" fill="url(#bldB)"/>
                            <rect x="614" y="320" width="7" height="6" fill="#fbbf24" opacity="0.8"/>
                            <rect x="626" y="320" width="7" height="6" fill="#f59e0b" opacity="0.5"/>
                            <rect x="638" y="320" width="7" height="6" fill="#fbbf24" opacity="0.3"/>
                            <rect x="650" y="320" width="7" height="6" fill="#f59e0b" opacity="0.9"/>
                            <rect x="614" y="334" width="7" height="6" fill="#f59e0b" opacity="0.6"/>
                            <rect x="650" y="334" width="7" height="6" fill="#fbbf24" opacity="0.4"/>

                            {/* Ground floor lights / street level */}
                            <rect x="0" y="500" width="700" height="10" fill="#0d2040"/>
                            <rect x="30" y="496" width="4" height="8" fill="#fbbf24" opacity="0.3"/>
                            <rect x="80" y="496" width="4" height="8" fill="#fbbf24" opacity="0.4"/>
                            <rect x="140" y="496" width="4" height="8" fill="#fbbf24" opacity="0.2"/>
                            <rect x="220" y="496" width="4" height="8" fill="#fbbf24" opacity="0.5"/>
                            <rect x="290" y="496" width="4" height="8" fill="#fbbf24" opacity="0.3"/>
                            <rect x="380" y="496" width="4" height="8" fill="#fbbf24" opacity="0.4"/>
                            <rect x="460" y="496" width="4" height="8" fill="#fbbf24" opacity="0.2"/>
                            <rect x="540" y="496" width="4" height="8" fill="#fbbf24" opacity="0.5"/>

                            {/* Moon/light source */}
                            <circle cx="1300" cy="80" r="35" fill="#f1f5f9" opacity="0.06"/>
                            <circle cx="1300" cy="80" r="28" fill="#f8fafc" opacity="0.05"/>
                        </svg>

                        {/* City reflection on ground */}
                        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top, rgba(59,130,246,0.08), transparent)" }} />

                        {/* Ambient light haze */}
                        <div className="absolute bottom-1/4 right-1/4 w-80 h-48 bg-amber-500/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/3 w-96 h-32 bg-blue-600/8 rounded-full blur-3xl" />

                        {/* Subtle noise texture overlay */}
                        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
                    </div>

                    <style>{`
                        @keyframes blink { 0%,100%{opacity:0.9} 50%{opacity:0.2} }
                        circle[fill="#ef4444"] { animation: blink 2s ease-in-out infinite; }
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
