# Guia Técnico de Desenvolvimento: Imob - Multinivel

Este documento detalha o passo a passo técnico e arquitetural para o desenvolvimento da plataforma imobiliária com Marketing Multinível, servindo como um "Roadmap" para a equipe de desenvolvimento.

---

## 1. Stack Tecnológica Preferencial
- **Frontend / Portal:** Next.js (App Router), React, Tailwind CSS, shadcn/ui.
- **Backend / BaaS:** Supabase (PostgreSQL, Auth, Storage e Edge Functions para regras de negócio seguras).
- **Pagamentos / Split:** Asaas (API REST e Webhooks para processar assinaturas e dividir pagamentos instantaneamente).
- **Mensageria (WhatsApp):** Evolution API (Hospedada em VPS própria ou provedor) para automatizar envio de links e captação.

---

## 2. Modelagem do Banco de Dados (Supabase / PostgreSQL)
O coração do sistema é o esquema relacional que suporta a árvore do MMN.

### Principais Tabelas:

1. **`users` (Perfis dos Corretores / Gestores)**
   - `id` (UUID, PK - vinculado ao Supabase Auth)
   - `full_name` (Text)
   - `document` (CPF/CNPJ)
   - `creci` (Text)
   - `referral_code` (Text, Unique) - Código do corretor (ex: `joao123`)
   - `referred_by` (UUID, FK -> `users.id`) - Quem indicou este usuário (Crucial para o MMN)
   - `plan_status` (Enum: `active`, `inactive`, `trial`)
   - `role` (Enum: `admin`, `broker`)

2. **`properties` (Imóveis)**
   - `id` (UUID, PK)
   - `owner_id` (UUID, FK -> `users.id`)
   - `title`, `description`, `price_sale`, `price_rent`, `iptu`, `condominium`
   - `bedrooms`, `bathrooms`, `suites`, `parking_spaces`, `area`
   - `slug` (Text, Unique) - Para URLs amigáveis (ex: `casa-com-piscina-santos-49tap3r`)
   - `status` (Enum: `available`, `sold`, `rented`)

3. **`property_images` (Imagens)**
   - `id` (UUID), `property_id` (FK), `url` (Storage link), `order` (Int)

4. **`leads` (Contatos Captados)**
   - `id` (UUID, PK)
   - `property_id` (FK -> `properties.id`)
   - `assigned_to` (FK -> `users.id`) - O corretor que vai atender o lead.
   - `name`, `phone_whatsapp`, `email`
   - `status` (Enum: `new`, `contacted`, `negotiating`, `won`, `lost`)

5. **`transactions` (Vendas e Comissionamento)**
   - `id` (UUID, PK)
   - `property_id` (FK)
   - `seller_id` (FK) - Corretor que fechou a venda
   - `total_value` (Decimal)
   - `commission_base` (Decimal) - Valor base para calcular o MMN
   - `status` (Enum: `pending`, `paid`)

---

## 3. Lógica do Algoritmo MMN (Edge Functions / Triggers)
Quando uma venda é registrada na tabela `transactions`, o sistema precisa calcular as fatias. Isso deve ser feito preferencialmente de forma transacional no Backend (Edge Function do Supabase).

**Regra de Negócio (Exemplo Venda):**
1. Identifica o `seller_id`.
2. Busca o `referred_by` deste *seller* (1ª Geração) -> Recebe 4%.
3. Busca o `referred_by` da 1ª Geração (2ª Geração) -> Recebe 2%.
4. Busca o `referred_by` da 2ª Geração (3ª Geração) -> Recebe 1%.

*Nota técnica:* Em PostgreSQL isso pode ser resolvido com uma query recursiva (`WITH RECURSIVE`) para subir a árvore hierárquica `referred_by` até o 3º nível.

---

## 4. Passo a Passo de Implementação (Roadmap)

### Fase 1: Setup da Infraestrutura e Autenticação
1. **Projeto Next.js:** Inicializar `npx create-next-app@latest imob-multinivel` (usar App Router, TypeScript, Tailwind).
2. **Setup Supabase:** Criar projeto no Supabase, espelhar o schema SQL descrito acima, e configurar Row Level Security (RLS) - Ex: Um corretor só pode editar seus próprios imóveis.
3. **Autenticação:** Criar rotas `/login`, `/register`. Implementar `supabase-ssr` para login seguro. No cadastro, o campo `referral_code_used` (Opcional) vincula ao `referred_by`.

### Fase 2: Painel do Corretor (Dashboard & MMN)
1. **Layout (Painel):** Criar o `layout.tsx` para o painel de parceiros `/painel` (Dashboard, Meus Imóveis, Minha Rede, Leads).
2. **Visualizador de Rede:** Criar a tela `/painel/rede`. Fazer uma query no Supabase para listar todos os usuários onde `referred_by == user.id`. Contar em níveis para mostrar na HUD.
3. **Simulador de Ganhos:** Desenvolver o componente React no lado do cliente que interage com inputs (Valor do Imóvel) e mostra os ganhos progressivos.

### Fase 3: Portal e Gestão de Imóveis (Listings)
1. **CRUD Imobiliário:** Criar formulário em `/painel/imoveis/novo` usando react-hook-form + Zod para validação. Implementar upload múltiplo de fotos usando `@supabase/supabase-js` storage API.
2. **Páginas Dinâmicas Automáticas:** Criar rota `app/imoveis/[slug]/page.tsx`. Esta página busca os dados do imóvel no modo SSR (Server-Side Rendering) ou ISR (Incremental Static Regeneration) para SEO perfeito.
3. **Botão WhatsApp Dinâmico:** Na página do imóvel, o botão "Chamar no WhatsApp" deve pegar o número do `owner_id` ou (se a URL tiver parâmetro de afiliado) o número do afiliado.
   *Ex de URL:* `/imoveis/casa-veraneio?ref=joao123`.

### Fase 4: Captação de Leads e CRM
1. **Webhook / API Route:** Criar endpoint interno `/api/leads` para receber o POST do formulário da página do imóvel.
2. **Cadastro no Banco:** Salvar em `leads` e atribuir ao `assigned_to` correto.
3. **Tela de CRM:** No `/painel/leads`, exibir em estilo Kanban (Nova lead, Em atendimento, Fechado) usando uma biblioteca como `@hello-pangea/dnd`.

### Fase 5: Assinaturas e Split Financeiro (Asaas/Stripe)
1. **Checkout de Assinatura:** Bloquear o uso do `/painel` se `plan_status` não for `active`.
2. **Integração Gateway:** Quando assinar, criar Webhook que atualiza o status de `inactive` para `active` no banco de dados assim que o pagamento for confirmado.
3. **Split Pós-Venda:** Assim que registrar um comissionamento, usar o recurso de Split de Pagamentos da API do Gateway para dividir a grana na raiz (4%, 2%, 1% diretamente para as contas bancárias/subcontas cadastradas dos gestores).

---

## 5. Resumo da Topologia de Diretórios (Next.js)
```text
/app
  /api                  # Endpoints para Webhooks Asaas/Stripe, envio de emails/Wpp
  /imoveis
    /[slug]             # Página pública do anúncio focada em SEO e conversão
  /painel               # Área logada
    /dashboard          # Métricas gerais
    /imoveis            # Gestão de estoque
    /leads              # CRM
    /rede               # Visualização da árvore multinível e ganhos
  /auth
    /login
    /registrar          # Permite passar ?ref=codigo_patrocinador
```

## Próximos Passos
Para começar efetivamente, o ideal é abrir o terminal no diretório do projeto Imob - Multinivel e rodarmos o comando de inicialização do Next.js e instalação das dependências base (shadcn/ui e supabase).
