const fs = require('fs');

let html = fs.readFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', 'latin1');
html = Buffer.from(html, 'latin1').toString('utf8');

fs.writeFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', html, 'utf8');
console.log('Cleaned up broken encoding.');
