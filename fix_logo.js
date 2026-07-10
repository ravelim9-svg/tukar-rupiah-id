const fs = require('fs');
let html = fs.readFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', 'utf8');

// Remove accidental image tag from Regulasi Penukaran header
html = html.replace(/<img src="bi-logo\.png" alt="Logo Bank Indonesia"[^>]*>\s*<div class="card-icon icon-gold">.*?<\/div>/g, '<div class="card-icon icon-gold">📜</div>');

// Replace footer SVG with image
const footerImg = `<img src="bi-logo.png" alt="Logo Bank Indonesia" style="width:48px;height:48px;object-fit:contain;" />`;
html = html.replace(/<svg viewBox="0 0 48 48" fill="none" xmlns="http:\/\/www.w3.org\/2000\/svg"[\s\S]*?<\/svg>/, footerImg);

fs.writeFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', html, 'utf8');
console.log('Fixed');
