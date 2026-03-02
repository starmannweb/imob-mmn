import fs from 'fs';
import path from 'path';

const searchFolder = 'src/app/painel';

function processDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            const regex = /<span className="font-semibold text-slate-600 dark:text-slate-300">ADigital Afilia..o<\/span>/g;
            if (regex.test(content)) {
                content = content.replace(regex, '<Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>');
                modified = true;
            }

            if (modified) {
                if (!content.includes('import Link from')) {
                    content = 'import Link from "next/link";\n' + content;
                }
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

processDirectory(searchFolder);
