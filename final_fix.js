const fs = require('fs');
let html = fs.readFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', 'utf8');

html = html.replace('<div class="card-icon icon-red">??</div>', '<div class="card-icon icon-red">💾</div>');
html = html.replace(/var SYMS=\['Rp 100K','Rp 50K','Rp 20K','Rp 10K','Rp 5K','Rp 2K','Rp 1K','\?\?','dY\\'','dY\?','Rp',',1'\];/g, "var SYMS=['Rp 100K','Rp 50K','Rp 20K','Rp 10K','Rp 5K','Rp 2K','Rp 1K','🪙','💵','💰','Rp','📈'];");
html = html.replace('<div class="reg-threshold gold">o" Seri</div>', '<div class="reg-threshold gold">✔ Seri</div>');
html = html.replace('<div class="reg-threshold gold">o" Seri</div>', '<div class="reg-threshold gold">✔ Seri</div>');
html = html.replace('<div class="spinner-core">dY -</div>', '<div class="spinner-core">🔄</div>');

fs.writeFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', html, 'utf8');
console.log('Fixed final literal strings');
