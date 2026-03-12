-- Habilita extensão de UUID
create extension if not exists "uuid-ossp";

-- Cria enum para status do plano e papel do usuário
create type user_plan_status as enum ('active', 'inactive', 'trial');
create type user_role as enum ('admin', 'broker');

-- Tabela principal de usuários (Vinculada à tabela nativa auth.users)
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  document text, -- CPF ou CNPJ
  creci text,
  referral_code text unique, -- Código de indicação do próprio usuário
  referred_by uuid references public.users(id), -- Quem indicou esse usuário na rede MMN
  plan_status user_plan_status default 'trial',
  role user_role default 'broker',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de imóveis
create type property_status as enum ('draft', 'available', 'sold', 'rented', 'inactive');
create type property_type as enum ('apartment', 'house', 'condo_house', 'land', 'commercial', 'other');

create table public.properties (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.users(id) not null,
  title text not null,
  description text,
  type property_type default 'apartment',
  
  -- Valores
  price_sale numeric,
  price_rent numeric,
  iptu numeric,
  condominium numeric,
  accepts_financing boolean default true,
  
  -- Comodos
  bedrooms smallint,
  bathrooms smallint,
  suites smallint,
  parking_spaces smallint,
  area_useful numeric,
  area_total numeric,
  
  -- Localização
  zip_code text,
  address text,
  address_number text,
  neighborhood text,
  city text,
  state text,
  hide_address boolean default false,
  latitude float,
  longitude float,
  
  -- Mídia
  video_url text, -- YouTube/Vimeo
  tour_360_url text,
  cover_image_url text,
  
  -- Dados Privativos (Ocultos ao público)
  internal_notes text,
  key_location text,
  owner_phone text,
  
  -- Metadados
  slug text unique not null,
  status property_status default 'draft',
  features jsonb default '[]', -- Ex: ["pool", "gym", "bbq"]
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de imagens dos imóveis
create table public.property_images (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) on delete cascade not null,
  url text not null,
  display_order smallint default 0,
  is_watermarked boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de leads (Contatos gerados)
create type lead_origin as enum ('website', 'portal', 'manual', 'referral');
create type lead_status as enum ('new', 'contacted', 'qualified', 'negotiating', 'won', 'lost', 'trash');

create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id),
  assigned_to uuid references public.users(id),
  name text not null,
  phone_whatsapp text not null,
  email text,
  origin lead_origin default 'website',
  status lead_status default 'new',
  search_profile jsonb default '{}', -- Preferências para Radar de Oportunidades
  last_contact_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CRM Kanban (Negócios/Deals)
create type deal_stage as enum ('contact', 'service', 'visit', 'proposal', 'reservation', 'documentation', 'signature');

create table public.deals (
  id uuid default uuid_generate_v4() primary key,
  lead_id uuid references public.leads(id) on delete cascade not null,
  property_id uuid references public.properties(id) on delete cascade not null,
  broker_id uuid references public.users(id) not null,
  stage deal_stage default 'contact',
  value numeric,
  expected_closing_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Histórico do CRM (Atividades/Timeline)
create type activity_type as enum ('comment', 'stage_change', 'call', 'meeting', 'email', 'whatsapp', 'task', 'attachment');

create table public.deal_activities (
  id uuid default uuid_generate_v4() primary key,
  deal_id uuid references public.deals(id) on delete cascade not null,
  user_id uuid references public.users(id) not null,
  type activity_type default 'comment',
  content text,
  metadata jsonb default '{}', -- Detalhes extras dependendo do tipo
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Agenda de Compromissos
create type appointment_type as enum ('meeting', 'call', 'visit', 'follow_up', 'signature');
create type appointment_priority as enum ('low', 'normal', 'urgent');

create table public.appointments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  lead_id uuid references public.leads(id) on delete cascade,
  deal_id uuid references public.deals(id) on delete cascade,
  title text not null,
  description text,
  type appointment_type default 'meeting',
  priority appointment_priority default 'normal',
  starts_at timestamp with time zone not null,
  ends_at timestamp with time zone,
  google_event_id text, -- Sincronização
  status text default 'scheduled', -- scheduled, completed, cancelled
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Regras de Distribuição de Leads
create type distribution_rule as enum ('random', 'round_robin', 'region', 'specialty');

create table public.lead_distribution_configs (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid, -- Para futuras expansões de times
  rule distribution_rule default 'round_robin',
  is_active boolean default true,
  settings jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de transações (Comissionamento MMN)
create type transaction_status as enum ('pending', 'paid');

create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id),
  seller_id uuid references public.users(id) not null,
  total_value numeric not null,
  commission_base numeric not null, -- Valor base que será usado para calcular os 4%, 2%, 1%
  status transaction_status default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilita RLS (Row Level Security)
alter table public.users enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.leads enable row level security;
alter table public.transactions enable row level security;

-- Políticas de Segurança (Exemplos Básicos)

-- Todo mundo logado pode ler perfis para poder exibir a rede
create policy "Usuários podem ver perfis públicos" on public.users
  for select using (auth.role() = 'authenticated');

-- Usuário pode alterar seu próprio perfil
create policy "Usuário pode atualizar proprio perfil" on public.users
  for update using (auth.uid() = id);

-- Imóveis públicos são visíveis para todos
create policy "Imóveis vizualizáveis por todos" on public.properties
  for select using (true);

-- Apenas o dono pode gerenciar seus imóveis
create policy "Corretor gerencia próprios imóveis" on public.properties
  for all using (auth.uid() = owner_id);

-- Qualquer um pode criar leads via formulário do site
create policy "Qualquer um insere leads" on public.leads
  for insert with check (true);

-- Corretor só vê leads vinculados a ele
create policy "Corretor acessa próprios leads" on public.leads
  for select using (auth.uid() = assigned_to);

-- Cria trigger para instanciar automaticamente a linha do usuário em 'public.users' quando ele se registrar no 'auth.users'
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, full_name, plan_status)
  values (new.id, new.raw_user_meta_data->>'full_name', 'trial');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
