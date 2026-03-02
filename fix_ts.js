const fs = require('fs');

function replaceFile(path, search, replace) {
    const content = fs.readFileSync(path, 'utf8');
    fs.writeFileSync(path, content.replace(search, replace));
}

replaceFile('src/app/corretores/page.tsx', '.select("id, full_name, avatar_url, phone_whatsapp, referral_code, created_at")', '.select("id, full_name, referral_code, created_at")');
replaceFile('src/app/corretores/page.tsx', 'brokers.map((broker) =>', 'brokers.map((broker: any) =>');

replaceFile('src/app/corretor/[slug]/page.tsx', '.select("id, full_name, avatar_url, phone_whatsapp, email, referral_code")', '.select("id, full_name, referral_code")');
replaceFile('src/app/corretor/[slug]/page.tsx', 'const { data: broker, error: brokerError }', 'const { data: brokerAny, error: brokerError }');
replaceFile('src/app/corretor/[slug]/page.tsx', 'if (!broker)', 'const broker = brokerAny as any; if (!broker)');
