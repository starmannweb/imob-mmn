import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Search, Mic, Home as HomeIcon, Building, Warehouse, Grid, Moon, Menu, MapPin, Bed, Bath, Car, Maximize, Filter, X } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();

  // Buscar imóveis do sistema em destaque (para demonstração)
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "available")
    .limit(4);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

      {/* Header Público */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200/60 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-black text-xl italic tracking-tighter">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[15px] leading-tight text-slate-900">ADigital <span className="text-blue-600 font-bold">Multinível</span></span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">Sistema <span className="text-blue-500">4%</span> • <span className="text-emerald-500">2%</span> • <span className="text-amber-500">1%</span></span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Entrar</Link>
            <Link href="/registrar" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Cadastrar-se</Link>

            <div className="flex gap-2 items-center">
              <Link href="/registrar">
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2.5 text-sm font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
                  Virar gestor multinível
                </button>
              </Link>
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors bg-white">
                <Moon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center pt-24 pb-20">

        {/* Banner & Perfil do Corretor */}
        <div className="w-full max-w-7xl px-4 md:px-8 mb-16">
          <div className="w-full h-[200px] md:h-[280px] bg-[#d0dcfb] rounded-t-3xl relative overflow-hidden">
          </div>
          <div className="bg-white rounded-b-3xl px-6 md:px-12 pb-8 shadow-sm border border-slate-100 border-t-0 flex flex-col md:flex-row gap-6 relative">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-slate-50 border-4 border-white shadow-xl flex items-center justify-center text-5xl font-normal text-slate-800 shrink-0 -mt-16 md:-mt-20 relative z-10">
              ZK
            </div>
            <div className="flex-1 pt-4 md:pt-6">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">ZKF INTERMEDIACAO IMOBILIARIA LTDA</h1>
              <span className="text-sm text-slate-500 block mt-1">@Zanzini</span>
              <p className="text-sm text-slate-400 mt-2 italic font-light">Não há descrição disponível.</p>
            </div>
          </div>
        </div>

        {/* Destaque (Feature Hero) */}
        <div className="w-full max-w-7xl px-4 md:px-8 mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Imóveis em <span className="text-blue-600">Destaque</span></h2>
          <p className="text-sm text-slate-500 mb-10">Confira os imóveis selecionados desta semana</p>

          {/* Mock do destaque principal gigante */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 group cursor-pointer text-left max-w-4xl mx-auto transition-transform hover:-translate-y-1">
            <div className="relative h-64 md:h-[400px] bg-slate-200 overflow-hidden">
              {/* Placeholder da Imagem com Gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 w-full h-full"></div>

              {/* Imagem Fake */}
              <div className="absolute inset-0 bg-slate-300 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"></div>

              <div className="absolute top-4 right-4 z-20">
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  ★ Destaque
                </span>
              </div>

              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-white text-3xl font-black tracking-tight mb-2">R$ 1.625.000,00</h3>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h4 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-3">Casa Sobreposta Alta com Piscina e Churrasqueira para Venda com 3 Quartos</h4>
              <p className="text-slate-500 text-sm flex items-center gap-1.5 mb-6">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" /> Embaré, Santos - SP
              </p>

              <div className="grid grid-cols-4 gap-2 md:gap-4 border-t border-slate-100 pt-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <Bed className="w-6 h-6 text-slate-400 mb-2" />
                  <span className="text-lg font-bold text-slate-800">3</span>
                  <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">Quartos</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Bath className="w-6 h-6 text-slate-400 mb-2" />
                  <span className="text-lg font-bold text-slate-800">5</span>
                  <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">Banheiros</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Car className="w-6 h-6 text-slate-400 mb-2" />
                  <span className="text-lg font-bold text-slate-800">2</span>
                  <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">Vagas</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Maximize className="w-6 h-6 text-slate-400 mb-2" />
                  <span className="text-lg font-bold text-slate-800">155</span>
                  <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">m²</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros Rápidos Premium Box */}
        <div className="w-full max-w-7xl px-4 md:px-8 mb-16">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 relative overflow-hidden">

            {/* SVG Deco Fundo Fake */}
            <div className="absolute right-0 top-0 opacity-[0.03] scale-150 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
              <Grid className="w-64 h-64" />
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <Filter className="w-5 h-5 text-blue-500" /> Filtros Rápidos
              </h3>
              <button className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-700 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-colors">
                <Mic className="w-4 h-4" /> Busca por Voz com IA
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 relative z-10">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pretenção</label>
                <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                  <option>Todas</option>
                  <option>Venda</option>
                  <option>Locação</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Tipo de Imóvel</label>
                <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                  <option>Todos os tipos</option>
                  <option>Casa</option>
                  <option>Apartamento</option>
                  <option>Sobrado</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Buscar</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Cidade, bairro, código..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 block relative z-10">Acesso Rápido</label>
              <div className="flex flex-wrap gap-2 relative z-10">
                <button className="flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 transition-colors shadow-sm">
                  <HomeIcon className="w-3.5 h-3.5" /> Casa
                </button>
                <button className="flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 transition-colors shadow-sm">
                  <Building className="w-3.5 h-3.5" /> Casa de Condomínio
                </button>
                <button className="flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 transition-colors shadow-sm">
                  <HomeIcon className="w-3.5 h-3.5" /> Sobrado
                </button>
                <button className="flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 transition-colors shadow-sm">
                  <Building className="w-3.5 h-3.5" /> Sobrado de Condomínio
                </button>
                <button className="flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 transition-colors shadow-sm">
                  <Warehouse className="w-3.5 h-3.5" /> Terreno
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Grid de Imóveis Principais */}
        <div className="w-full max-w-7xl px-4 md:px-8">

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">Imóveis disponíveis</h2>
              <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded">1 resultado</span>
            </div>
            <button className="text-slate-500 hover:text-slate-800 text-sm font-bold flex items-center gap-2">
              <X className="w-4 h-4" /> Ocultar Filtros
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {/* Exemplo Mockado 1 - Para preencher */}
            <Link href="/imoveis/exemplo" className="group">
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 block h-full flex flex-col">
                <div className="relative h-48 bg-slate-200 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <div className="absolute inset-0 bg-slate-300 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute top-3 right-3 z-20">
                    <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                      Destaque
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-900 text-[15px] leading-snug mb-2 line-clamp-2">Casa Sobreposta Alta com Piscina e Churrasqueira...</h3>
                  <p className="text-slate-500 text-[11px] flex items-center gap-1 mb-4 italic">
                    <MapPin className="w-3 h-3 text-red-500" /> Embaré, Santos
                  </p>

                  <div className="flex items-center gap-4 text-slate-500 mb-6 mt-auto border-t border-slate-100 pt-4 mt-4">
                    <div className="flex items-center gap-1.5"><Bed className="w-3.5 h-3.5 text-slate-400" /><span className="text-xs font-bold text-slate-700">3</span></div>
                    <div className="flex items-center gap-1.5"><Bath className="w-3.5 h-3.5 text-slate-400" /><span className="text-xs font-bold text-slate-700">5</span></div>
                    <div className="flex items-center gap-1.5"><Car className="w-3.5 h-3.5 text-slate-400" /><span className="text-xs font-bold text-slate-700">2</span></div>
                    <div className="flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5 text-slate-400" /><span className="text-xs font-bold text-slate-700">155m²</span></div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-0.5">Venda</span>
                      <span className="text-lg font-black text-blue-700 tracking-tight leading-none">R$ 1.625.000,00</span>
                    </div>
                    <span className="text-xs font-bold text-indigo-500 group-hover:underline">Detalhes &rarr;</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Resto dos Dinamicos (Se Ouver) */}
            {properties?.map(p => (
              <Link key={p.id} href={`/imoveis/${p.slug}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 block h-full flex flex-col">
                  <div className="relative h-48 bg-slate-200 overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-slate-900 text-[15px] leading-snug mb-4 line-clamp-2">{p.title}</h3>

                    <div className="flex items-center gap-4 text-slate-500 mb-6 mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5 text-slate-400" /><span className="text-xs font-bold">{p.area || '-'} m²</span></div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-lg font-black text-blue-700 tracking-tight leading-none">R$ {p.price_sale ? p.price_sale.toLocaleString('pt-BR') : '-'}</span>
                      </div>
                      <span className="text-xs font-bold text-indigo-500 group-hover:underline">Detalhes &rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          </div>
        </div>

      </main>

      {/* Footer Público Corretor */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Corretor Info */}
            <div className="col-span-1 border-b md:border-b-0 border-slate-100 pb-8 md:pb-0">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl mb-4 shadow-md">
                ZL
              </div>
              <h4 className="font-extrabold text-slate-900 mb-2">ZKF INTERMEDIACAO IMOBILIARIA LTDA</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                ZKF INTERMEDIACAO IMOBILIARIA LTDA - Corretor Imobiliário. Encontre os melhores imóveis com atendimento personalizado.
              </p>
            </div>

            {/* Links Rápidos */}
            <div>
              <h5 className="font-bold text-slate-800 mb-4">Links Rápidos</h5>
              <ul className="space-y-3 text-xs font-medium text-slate-500">
                <li><Link href="/" className="hover:text-blue-600 focus:outline-none">Sobre Nós</Link></li>
                <li><Link href="/" className="hover:text-blue-600 focus:outline-none">Como Funciona</Link></li>
                <li><Link href="/" className="hover:text-blue-600 focus:outline-none">Anunciar Imóvel</Link></li>
              </ul>
            </div>

            {/* Suporte */}
            <div>
              <h5 className="font-bold text-slate-800 mb-4">Suporte</h5>
              <ul className="space-y-3 text-xs font-medium text-slate-500">
                <li><Link href="/" className="hover:text-blue-600 focus:outline-none">Perguntas Frequentes</Link></li>
                <li><Link href="/" className="hover:text-blue-600 focus:outline-none">Fale Conosco</Link></li>
                <li><Link href="/" className="hover:text-blue-600 focus:outline-none">Termos de uso e política de privacidade</Link></li>
              </ul>
            </div>

            {/* Contato Box */}
            <div>
              <h5 className="font-bold text-slate-800 mb-4">Contato</h5>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-50 w-10 h-10 rounded-lg flex items-center justify-center border border-slate-100 shrink-0">
                    <Mic className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="flex flex-col justify-center h-10">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Telefone</span>
                    <span className="text-xs font-bold text-slate-700">13991396602</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-slate-50 w-10 h-10 rounded-lg flex items-center justify-center border border-slate-100 shrink-0">
                    {/* A icon was used in the print for email, lets use generic mail */}
                    <span className="text-slate-600 font-bold">@</span>
                  </div>
                  <div className="flex flex-col justify-center h-10">
                    <span className="text-[10px] uppercase font-bold text-slate-400">E-mail</span>
                    <span className="text-xs font-bold text-slate-700 truncate w-32">dizanzini@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="font-extrabold text-[15px] leading-tight text-slate-900 border-r border-slate-300 pr-5">ADigital <span className="text-blue-600 font-bold">Multinível</span></div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs italic">f</div>
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">ig</div>
              </div>
            </div>
            <p className="text-[11px] font-semibold text-slate-400">
              &copy; 2026 Imobiliária ADigital. Todos direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
