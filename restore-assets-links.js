const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  let modified = false;
  
  const assetRegex = /href="\/wp-content\//g;
  if (assetRegex.test(content)) {
    content = content.replace(assetRegex, 'href="https://webbble.kitkitgo.com/wp-content/');
    modified = true;
  }
  
  const assetRegex2 = /href="\/wp-includes\//g;
  if (assetRegex2.test(content)) {
    content = content.replace(assetRegex2, 'href="https://webbble.kitkitgo.com/wp-includes/');
    modified = true;
  }
  
  const srcRegex = /src="\/wp-content\//g;
  if (srcRegex.test(content)) {
    content = content.replace(srcRegex, 'src="https://webbble.kitkitgo.com/wp-content/');
    modified = true;
  }
  
  const srcRegex2 = /src="\/wp-includes\//g;
  if (srcRegex2.test(content)) {
    content = content.replace(srcRegex2, 'src="https://webbble.kitkitgo.com/wp-includes/');
    modified = true;
  }
  
  const xmlrpcRegex = /href="\/xmlrpc.php/g;
  if (xmlrpcRegex.test(content)) {
    content = content.replace(xmlrpcRegex, 'href="https://webbble.kitkitgo.com/xmlrpc.php');
    modified = true;
  }
  
  const feedRegex = /href="\/feed\//g;
  if (feedRegex.test(content)) {
    content = content.replace(feedRegex, 'href="https://webbble.kitkitgo.com/feed/');
    modified = true;
  }
  
  const commentsFeedRegex = /href="\/comments\/feed\//g;
  if (commentsFeedRegex.test(content)) {
    content = content.replace(commentsFeedRegex, 'href="https://webbble.kitkitgo.com/comments/feed/');
    modified = true;
  }
  
  const oembedRegex = /href="\/wp-json\//g;
  if (oembedRegex.test(content)) {
    content = content.replace(oembedRegex, 'href="https://webbble.kitkitgo.com/wp-json/');
    modified = true;
  }
  
  const canonicalRegex = /href="\/"/g;
  if (canonicalRegex.test(content)) {
    // Leave canonical link as-is? Wait, no, let's check
    // Wait, maybe we should leave canonical links pointing to original?
    // Let's not touch them for now
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

console.log('Starting to restore asset links...');
walkDirectory(rootDir);
console.log('Done!');
