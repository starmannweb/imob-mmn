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
create type property_status as enum ('available', 'sold', 'rented');

create table public.properties (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.users(id) not null,
  title text not null,
  description text,
  price_sale numeric,
  price_rent numeric,
  iptu numeric,
  condominium numeric,
  bedrooms smallint,
  bathrooms smallint,
  suites smallint,
  parking_spaces smallint,
  area numeric,
  slug text unique not null,
  status property_status default 'available',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de imagens dos imóveis
create table public.property_images (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) on delete cascade not null,
  url text not null,
  display_order smallint default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de leads (Contatos gerados)
create type lead_status as enum ('new', 'contacted', 'negotiating', 'won', 'lost');

create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id),
  assigned_to uuid references public.users(id) not null,
  name text not null,
  phone_whatsapp text not null,
  email text,
  status lead_status default 'new',
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
