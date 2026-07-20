const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  const patterns = [
    { from: /(href=["'])\/wp-content\//g, to: '$1https://webbble.kitkitgo.com/wp-content/' },
    { from: /(href=["'])\/wp-includes\//g, to: '$1https://webbble.kitkitgo.com/wp-includes/' },
    { from: /(src=["'])\/wp-content\//g, to: '$1https://webbble.kitkitgo.com/wp-content/' },
    { from: /(src=["'])\/wp-includes\//g, to: '$1https://webbble.kitkitgo.com/wp-includes/' },
    { from: /(href=["'])\/xmlrpc.php/g, to: '$1https://webbble.kitkitgo.com/xmlrpc.php' },
    { from: /(href=["'])\/feed\//g, to: '$1https://webbble.kitkitgo.com/feed/' },
    { from: /(href=["'])\/comments\/feed\//g, to: '$1https://webbble.kitkitgo.com/comments/feed/' },
    { from: /(href=["'])\/wp-json\//g, to: '$1https://webbble.kitkitgo.com/wp-json/' }
  ];
  
  for (const pattern of patterns) {
    if (pattern.from.test(content)) {
      content = content.replace(pattern.from, pattern.to);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
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

console.log('Starting to restore asset links (v2)...');
walkDirectory(rootDir);
console.log('Done!');
