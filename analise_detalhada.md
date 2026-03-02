# Análise do Sistema: Imob - Multinivel

*Baseado na análise da página inicial, página de anúncio e painel de login.*

## 1. Visão Geral do Sistema
A **ADigital Multinível** é uma plataforma que une o mercado imobiliário com o modelo de Marketing Multinível (MMN). O sistema é focado não apenas na venda e locação de imóveis, mas fortemente na captação de corretores de imóveis e imobiliárias para formarem "redes" de vendas, recebendo comissões por vendas realizadas por corretores indicados.

O sistema opera com um modelo SaaS (Software as a Service) híbrido, onde o corretor paga uma assinatura para usar a plataforma e ter acesso às ferramentas, e ao mesmo tempo ganha comissões sobre as vendas da rede.

## 2. Funcionalidades Principais Identificadas

### 2.1 Motor de Comissão Multinível (MMN)
- **Estrutura de Ganhos em Camadas:** O sistema calcula e distribui comissões na rede com base na venda de imóveis.
  - 1ª Geração: 4% do valor líquido comissionável.
  - 2ª Geração: 2% do valor líquido comissionável.
  - 3ª Geração: 1% do valor líquido comissionável.
- **Simulador de Ganhos:** Ferramenta interativa para os usuários projetarem quanto podem ganhar construindo redes.
- **Exclusão de Locação do MMN:** O painel informa que aluguéis retornam 90% da comissão do 1º aluguel direto para o corretor, não entrando na divisão de rede multinível.

### 2.2 Portal de Anúncios e Captação de Leads (Listings e Lead Pages)
- **Páginas de Imóveis (Listings):**
  - Layout moderno focado em imagens de alta qualidade (carrosséis).
  - Exibição clara de dados técnicos (IPTU, Preço, Quartos, Suítes, Vagas, Metragem).
  - Status do imóvel (Ex: "Disponível").
  - Botão fixo/flutuante integrado diretamente ao WhatsApp (`wa.me`) do corretor que publicou o imóvel ou do gestor da rede.
  - CTAs secundários focados em recrutar quem acessa a página para "Virar gestor multinível".
- **Landing Pages para Corretores:** Páginas espelhadas ou exclusivas com a marcação de qual corretor indicou (através de links de indicação / cookies de afiliados).

### 2.3 Painel Administrativo do Corretor (Dashboard)
- **Autenticação:** Login por e-mail/senha, recuperação de senha, e Social Login (Google). Registro disponível para CPF e CNPJ.
- **Métricas Visuais:**
  - Total de imóveis cadastrados.
  - Leads recebidos captados pelos anúncios.
  - Volume de mensagens no WhatsApp.
  - Taxa de conversão de leads para fechamentos.
- **Gestão de Rede:** Link de convite customizado, listagem da rede downline (corretores abaixo da pessoa).

### 2.4 Ferramentas e "I.A." (Módulos Agregados)
- **WhatsApp API:** Disparador de WhatsApp em massa embutido e automatizações (provavelmente integrados usando a Cloud API oficial da Meta).
- **Módulos Citados:** Site.ia (gerador de páginas/textos), WhatsApp.ia (bot de atendimento), CRM.ia (gestão de rotina do corretor).

## 3. Integrações Necessárias para um Clone/Similar
Para construir uma plataforma que realize estas mesmas funções, as integrações vitais são:

1. **Gateway de Pagamento (Assinaturas e Split):**
   - Assinaturas (Recorrência Mensal, Semestral, Anual).
   - "Split de Pagamento" para distribuir as fatias do MMN instantaneamente quando a comissão da venda/assinatura entra.
   - *Sugestões:* Asaas, Stripe, Mercado Pago ou Pagar.me.
2. **API Oficial do WhatsApp (Meta):**
   - Para envio de notificações aos corretores, atendimento via bot, e o disparador de mensagens para os leads.
   - *Sugestões:* Z-API, Evolution API (Self-hosted), ou Meta Cloud API.
3. **Autenticação e Banco de Dados em Tempo Real:**
   - Social Login, gestão de papéis (Admin, Gestor, Corretor).
   - *Sugestões:* Supabase Auth & Supabase PostgreSQL (com Row Level Security).

## 4. Oportunidades de Melhoria (Riscos da Plataforma Atual)
- O atual MMN pode ter complexidades jurídicas no Brasil; um clone deve estar perfeitamente adequado com termos e condições rigorosos e split financeiro transparente para não ser classificado de forma incorreta frente aos órgãos normativos do setor imobiliário (CRECI).
- O onboarding da ADigital necessita que o usuário entenda o cálculo. Um novo sistema pode focar em **gamificação** do processo de onboarding no painel.
