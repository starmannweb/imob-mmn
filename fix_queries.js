const fs = require('fs');
const path = require('path');

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Fix owner:users query
            const regex1 = /owner:users!owner_id\(id,\s*full_name,\s*phone_whatsapp\)/g;
            if (regex1.test(content)) {
                content = content.replace(regex1, 'owner:users!owner_id(id, full_name)');
                modified = true;
            }

            const regex2 = /owner:users\(id,\s*full_name,\s*phone_whatsapp\)/g;
            if (regex2.test(content)) {
                content = content.replace(regex2, 'owner:users(id, full_name)');
                modified = true;
            }

            const regex3 = /\.select\("id, full_name, avatar_url, phone_whatsapp, email, referral_code"\)/g;
            if (regex3.test(content)) {
                content = content.replace(regex3, '.select("id, full_name, referral_code")');
                modified = true;
            }

            const regex4 = /\.select\("id, full_name, avatar_url, role, plan_status, referral_code, phone_whatsapp"\)/g;
            if (regex4.test(content)) {
                content = content.replace(regex4, '.select("id, full_name, role, plan_status, referral_code")');
                modified = true;
            }

            // leads might have phone_whatsapp? Actually leads table might have phone_whatsapp, that's fine.
            // users table doesn't. We only fix users queries.

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log("Updated", fullPath);
            }
        }
    });
}

processDir('src/app');
