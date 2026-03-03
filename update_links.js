const fs = require('fs');
const path = require('path');

// 1. Fix the link in meus-sites
let sitesPath = 'src/app/painel/meus-sites/page.tsx';
let sitesContent = fs.readFileSync(sitesPath, 'utf8');
sitesContent = sitesContent.replace('href={`${baseUrl}/corretor/${siteSlug}`}', 'href={`/corretor/${siteSlug}`}');
sitesContent = sitesContent.replace('value={`${baseUrl}/corretor/${siteSlug}`}', 'value={`/corretor/${siteSlug}`}');
fs.writeFileSync(sitesPath, sitesContent);

// 2. Fix the Ver Landing Page link in imoveis page to go to public page
let imoveisPagePath = 'src/app/painel/imoveis/page.tsx';
let imoveisPageContent = fs.readFileSync(imoveisPagePath, 'utf8');
imoveisPageContent = imoveisPageContent.replace(/href=\{`\/painel\/imoveis\/\$\{prop\.id\}`\}/g, 'href={`/imoveis/${prop.slug}`}');
fs.writeFileSync(imoveisPagePath, imoveisPageContent);

// 3. Fix all ADigital Afiliação breadcrumbs to Home
function walkDir(dir) {
    let files = fs.readdirSync(dir);
    for (let file of files) {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Replaces "ADigital Afiliação" or "ADigital Multinivel" inside breadcrumbs
            const regex1 = /<span className="font-semibold text-slate-700 dark:text-slate-300">ADigital Afiliação<\/span>/g;
            const replace1 = '<Link href="/painel" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>';

            const regex2 = /<span className="text-slate-400">ADigital Multinivel<\/span>/g;
            const replace2 = '<Link href="/painel" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>';

            const regex3 = /<span className="text-slate-400">ADigital Afiliação<\/span>/g;
            const replace3 = '<Link href="/painel" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">Home</Link>';

            content = content.replace(regex1, replace1).replace(regex2, replace2).replace(regex3, replace3);

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated breadcrumbs in ' + fullPath);
            }
        }
    }
}
walkDir('src/app/painel');

console.log('All replacements done');
