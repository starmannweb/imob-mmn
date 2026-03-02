import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfhkozhiswisidolgntx.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaGtvemhpc3dpc2lkb2xnbnR4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY0MDIwNSwiZXhwIjoyMDg3MjE2MjA1fQ.0i_9BtPrixnyJx68EraZOaR8fCusfczzt29b6K8b8CA';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdmin() {
    const { data, error } = await supabase.auth.admin.createUser({
        email: 'admin@imob.com',
        password: 'password123',
        email_confirm: true,
        user_metadata: { full_name: 'Ricieri Admin' }
    });

    if (error) {
        if (error.message.includes('already exists')) {
            console.log("Usuário já existe, prossiga para login");
            // vamos buscar pra preencher profile se faltar
            return;
        }
        console.error("Erro ao criar admin:", error.message);
        process.exit(1);
    }

    console.log("Usuário criado com sucesso:", data.user.id);

    // O Trigger de profile já deve rodar automaticamente, mas podemos garantir aqui
    process.exit(0);
}

createAdmin();
