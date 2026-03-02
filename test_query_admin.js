require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function test() {
    const { data, error } = await supabase
        .from("users")
        .select('*')
        .limit(1);

    if (data && data.length > 0) {
        console.log("Keys:", Object.keys(data[0]));
    }
}

test();
