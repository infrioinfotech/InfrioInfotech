const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const pageMappings = {
  'https://webbble.kitkitgo.com/': '/',
  'https://webbble.kitkitgo.com/home-02/': '/home-02/',
  'https://webbble.kitkitgo.com/about-us/': '/about-us/',
  'https://webbble.kitkitgo.com/services/': '/services/',
  'https://webbble.kitkitgo.com/services-details/': '/services-details/',
  'https://webbble.kitkitgo.com/project/': '/project/',
  'https://webbble.kitkitgo.com/project-details/': '/project-details/',
  'https://webbble.kitkitgo.com/blog/': '/blog/',
  'https://webbble.kitkitgo.com/team/': '/team/',
  'https://webbble.kitkitgo.com/pricing-plan/': '/pricing-plan/',
  'https://webbble.kitkitgo.com/contact-us/': '/contact-us/'
};

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  let modified = false;
  
  for (const [oldUrl, newUrl] of Object.entries(pageMappings)) {
    const regex = new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (regex.test(content)) {
      content = content.replace(regex, newUrl);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
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

console.log('Starting to update navigation links...');
walkDirectory(rootDir);
console.log('Done!');
