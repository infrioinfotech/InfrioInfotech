const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5500;
const PUBLIC_DIR = 'e:\\InfrioInfotech-main';

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  let safeUrl = decodeURIComponent(req.url);
  const qIdx = safeUrl.indexOf('?');
  if (qIdx !== -1) safeUrl = safeUrl.slice(0, qIdx);
  
  let filePath = path.join(PUBLIC_DIR, safeUrl);
  
  // Serve directory index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // Try clean URLs
    const cleanPath = path.join(PUBLIC_DIR, safeUrl, 'index.html');
    if (fs.existsSync(cleanPath) && fs.statSync(cleanPath).isFile()) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream(cleanPath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
