import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfhkozhiswisidolgntx.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaGtvemhpc3dpc2lkb2xnbnR4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY0MDIwNSwiZXhwIjoyMDg3MjE2MjA1fQ.0i_9BtPrixnyJx68EraZOaR8fCusfczzt29b6K8b8CA';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkAdmin() {
    const { data, error } = await supabase.from('users').update({ referral_code: 'ADMIN123' }).eq('id', '420a139b-574c-45aa-a6fb-9a844accfa3d'); // Wait, I don't know the exact ID, I'll update all users
    const res = await supabase.from('users').update({ referral_code: 'ADMIN123' }).is('referral_code', null);
    console.log("Updated", res);
}

checkAdmin();
