-- Migração para adicionar novos roles ao sistema
-- Executar no Supabase SQL Editor

-- 1. Adicionar novos valores ao enum user_role
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'dev';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'user';

-- 2. Atualizar role padrão para 'user' (clientes/corretores comuns)
ALTER TABLE public.users ALTER COLUMN role SET DEFAULT 'user';

-- 3. Comentários sobre os roles:
-- 'dev' = Super Admin (acesso total, pode personalizar tudo)
-- 'admin' = Gerente (pode ver rede completa, gerenciar usuários, mas com limitações)
-- 'broker' = Corretor (acesso intermediário, pode gerenciar seus próprios leads e imóveis)
-- 'user' = Cliente/Usuário comum (vê apenas sua rede a partir dele)

-- 4. Criar índice para melhorar performance de queries por role
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- 5. Função helper para verificar se usuário é admin ou dev
CREATE OR REPLACE FUNCTION is_admin_or_dev(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = user_id 
    AND role IN ('admin', 'dev')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Função para verificar se usuário é dev
CREATE OR REPLACE FUNCTION is_dev(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = user_id 
    AND role = 'dev'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
