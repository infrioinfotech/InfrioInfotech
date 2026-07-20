const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const baseUrl = 'https://webbble.kitkitgo.com';

function fixContent(content) {
    let modified = false;
    
    // Fix src attributes that start with /wp-content or /wp-includes
    content = content.replace(/(src=["'])\/(wp-content|wp-includes)\//g, (match, p1) => {
        modified = true;
        return `${p1}${baseUrl}/${match.slice(p1.length + 1)}`;
    });
    
    // Fix srcset attributes
    content = content.replace(/(srcset=["'])([^"']*)/g, (match, p1, srcsetContent) => {
        let newSrcset = srcsetContent.replace(/(^|,?\s*)\/(wp-content|wp-includes)\//g, (m, prefix) => {
            modified = true;
            return `${prefix}${baseUrl}/wp-content/`.replace('/wp-content/wp-content/', '/wp-content/');
        });
        // Also handle wp-includes in srcset
        newSrcset = newSrcset.replace(/(^|,?\s*)\/wp-includes\//g, (m, prefix) => {
            modified = true;
            return `${prefix}${baseUrl}/wp-includes/`;
        });
        return `${p1}${newSrcset}`;
    });
    
    // Fix href attributes (for CSS, JS, etc.)
    content = content.replace(/(href=["'])\/(wp-content|wp-includes)\//g, (match, p1) => {
        modified = true;
        return `${p1}${baseUrl}/${match.slice(p1.length + 1)}`;
    });
    
    // Fix file:///C:/ links
    content = content.replace(/(src|href)=["']file:\/\/\/C:\/(wp-content|wp-includes)\//g, (match, attr) => {
        modified = true;
        return match.replace('file:///C:/', `${baseUrl}/`);
    });
    
    return { content, modified };
}

function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const result = fixContent(content);
    if (result.modified) {
        fs.writeFileSync(filePath, result.content, 'utf8');
        console.log(`Fixed assets in: ${filePath}`);
    }
}

function walkDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            walkDirectory(filePath);
        } else if (file.endsWith('.html')) {
            processHtmlFile(filePath);
        }
    }
}

console.log('Starting to fix all asset links...');
walkDirectory(rootDir);
console.log('Done!');
