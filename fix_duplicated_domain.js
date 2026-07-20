
const fs = require('fs');
const path = require('path');

function fixHTMLFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixHTMLFiles(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Fix duplicated domain
      content = content.replace(/https:\/\/webbble\.kitkitgo\.comhttps:\/\/webbble\.kitkitgo\.com\//g, 'https://webbble.kitkitgo.com/');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed: ${filePath}`);
      }
    }
  });
}

fixHTMLFiles(__dirname);
console.log('Done!');
