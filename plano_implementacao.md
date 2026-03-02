# Plano de Implementação: Imob - Multinivel

Este plano de alto nível detalha as etapas, tecnologia, custos e prazos estimados para construir uma plataforma imobiliária estilo SaaS com regras de comissionamento Multinível (MMN) semelhante à **ADigital Multinível**.

## 1. Arquitetura e Stack Tecnológico
Recomendamos o uso de tecnologias modernas, escaláveis e serverless, seguindo o padrão já utilizado em seus projetos mais recentes.

- **Frontend / Portal:** Next.js (React) com Tailwind CSS e componentes shadcn/ui. Garante excelente SEO para a parte pública dos imóveis e um painel reativo para os corretores.
- **Backend / Banco de Dados / Auth:** Supabase (PostgreSQL + Supabase Auth + Edge Functions). Essencial para lidar com as tabelas relacionais do esquema multinível de forma rápida e segura usando consultas recursivas.
- **Hospedagem Front:** Vercel ou Cloudflare Pages.
- **Pagamentos / Split de Assinatura:** Asaas (excelente para recorrência e PIX) ou Stripe Billing.
- **Mensageria (WhatsApp):** Evolution API (se for hospedar local/VPS) ou Z-API / Meta Cloud API para disparo de mensagens e funis de atendimento do corretor.

## 2. Prazos e Fases de Desenvolvimento
Dado o alto nível de complexidade (Motor MMN + CRM de Corretores + Portal de Imóveis), o tempo sugerido de construção de um MVP (Minimum Viable Product) robusto é de **8 a 12 semanas**.

### Fase 1: Fundação do Sistema e Auth (Semanas 1-2)
- Modelagem do Banco de Dados no Supabase.
- Criação das tabelas base: `users`, `properties`, `leads`, `network_edges` (para gerir quem indicou quem).
- Implementação da tela de Autenticação (Login, Cadastro com validação de CPF/CNPJ, Login via Google).
- Criação do esqueleto do Painel (Sidebar, Header, tema Dark/Light).

### Fase 2: Módulo CRM e Rede Multinível (Semanas 3-5)
- Dashboard de métricas para o corretor.
- **Motor de Comissionamento:** Lógica no banco (Triggers ou Edge Functions) para distribuir comissões nas 3 camadas (4%, 2%, 1%).
- Geração de link de indicação único ("Afiliado").
- Tela "Minha Rede", permitindo visualizar corretores captados.
- Simulador de Ganhos interativo para a Landing Page.

### Fase 3: Portal de Imóveis e Listings (Semanas 6-8)
- CRUD de Imóveis (Cadastro de propriedades pelo painel, upload de múltiplas imagens para o Supabase Storage).
- Tela pública do anúncio focada em conversão (Alta resolução, SEO otimizado).
- Integração de botão flutuante de WhatsApp puxando dinamicamente o número do corretor dono do anúncio.
- Formulários de captação de leads amarrados ao corretor que indicou.

### Fase 4: Integrações Avançadas e Assinaturas (Semanas 9-10)
- Integração com Asaas/Stripe para planos de assinatura (Mensal, Semestral, Anual).
- Trava de acesso (Soft-block) caso o corretor não pague a assinatura.
- Conexão do painel com disparos de WhatsApp para notificar novos leads.
- Funcionalidade de "Disparador em Massa" para os contatos da base do corretor.

### Fase 5: Testes e Publicação (Semanas 11-12)
- Homologação do fluxo financeiro (Split, faturamento recorrente).
- Refinamento do Layout (Micro-interações, hover states).
- Correção de bugs.
- Migração para domínio de produção e lançamento.

## 3. Estimativa de Custos Operacionais (Mensais)
Este é o custo das ferramentas necessárias manter a infraestrutura rodando, não o custo de desenvolvimento humano.

| Ferramenta / Serviço | Propósito | Custo Médio Estimado (Mensal) |
| :--- | :--- | :--- |
| **Supabase (Plano Pro)** | Banco de Dados, Auth, Storage, Functions | ~$25 USD (~R$ 135,00) |
| **Vercel (Plano Pro)** | Hospedagem do Site/App Next.js | ~$20 USD (~R$ 110,00) |
| **Asaas / Stripe** | Gateway de Pagamento | Isento de taxa fixa (Cobrança ~R$ 0,99 a 1% por PIX/Transação aprovada) |
| **Z-API / Evolution** | API WhatsApp para disparos | R$ 100,00 a R$ 150,00 (Dependendo da API) |
| **Domínio Próprio** | Endereço do site | ~R$ 40,00 / ano |
| **Total Mensal (MVP)** | Infraestrutura Base | **~ R$ 400,00 mensais** inicialmente. |

## 4. O que o Usuário deverá Validar (Revisão)
> [!IMPORTANT]
> **Decisões Necessárias pelo Cliente:**
> 1. **Stack Técnico:** Aprova a utilização de Next.js + Supabase para o desenvolvimento do sistema ao invés de WordPress, garantindo segurança na divisão das comissões?
> 2. **Processamento Financeiro:** O sistema intermediará ativamente a venda do imóvel e fará o *split* do valor real, ou atuará de forma consultiva onde o portal calcula repasses mas as imobiliárias cuidam das transferências bancárias por fora? *(A plataforma original cobra assinatura do software).*
> 3. **Prioridade:** Podemos seguir a iniciar esse projeto pelo MVP, focando primeiro no módulo de **Rede de Afiliados e Simulador**?

## Verification Plan
1. **Verificação do Plano:** Revisão manual com o `USER` sobre as integrações sugeridas, custos operacionais da infraestrutura (Supabase, Vercel, API WA), e estimativa de tempo do projeto (12 semanas).
2. **Setup Base:** Ao decidir avançar, usaremos o terminal via `run_command` para dar um `npx create-next-app` ou configurar a fundação Supabase local.
