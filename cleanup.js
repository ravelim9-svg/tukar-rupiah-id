const fs = require('fs');
let html = fs.readFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', 'utf8');

// Replace corrupted emojis that sneaked past
html = html.replace(/<div class="reg-threshold gold">.*? Seri<\/div>/g, '<div class="reg-threshold gold">✔ Seri</div>');
html = html.replace(/<div class="spinner-core">.*?<\/div>/g, '<div class="spinner-core">🔄</div>');
html = html.replace(/<div class="card-icon icon-red">.*?<\/div>/g, '<div class="card-icon icon-red">💾</div>');
html = html.replace(/var SYMS=\['Rp 100K','Rp 50K','Rp 20K','Rp 10K','Rp 5K','Rp 2K','Rp 1K','\?\?','dY\\'','dY\?','Rp',',1'\];/g, "var SYMS=['Rp 100K','Rp 50K','Rp 20K','Rp 10K','Rp 5K','Rp 2K','Rp 1K','🪙','💵','💰','Rp','📈'];");
html = html.replace(/dY"< Salin Hasil/g, '💾 Salin Hasil');
html = html.replace(/dYZ INTRO SPLASH SCREEN - Bank Indonesia A- Rupiah/g, 'INTRO SPLASH SCREEN - Bank Indonesia Rupiah');

// Also make sure Riwayat icon is correct if they match slightly differently
html = html.replace(/ðŸ”< Riwayat Analisis/g, '💾 Riwayat Analisis');
html = html.replace(/ðŸ”<Riwayat Analisis/g, '💾 Riwayat Analisis');
html = html.replace(/ðŸ” Riwayat Analisis/g, '💾 Riwayat Analisis');
html = html.replace(/ðŸ’¾ Riwayat Analisis/g, '💾 Riwayat Analisis');

// One final regex replace for any remaining "dY"<" or "âœ‚ï¸" forms
html = html.replace(/dY"</g, '💾');
html = html.replace(/âœ‚ï¸/g, '✂️');
html = html.replace(/âœ”/g, '✔');

// Ensure we didn't leave any "dY" stuff except inside valid JS syntax
html = html.replace(/>dY -</g, '>🔄<');
html = html.replace(/>dY'</g, '>💵<');

// And fix the "ðŸŸ"<" or similar in Riwayat
html = html.replace(/ðŸŸ"< Riwayat Analisis/g, '💾 Riwayat Analisis');
html = html.replace(/ðŸŸ"<Riwayat Analisis/g, '💾 Riwayat Analisis');
html = html.replace(/ðŸŸ"< Riwayat Analisis/g, '💾 Riwayat Analisis');

// Fix "ðŸŸ“<"
html = html.replace(/ðŸŸ“< Riwayat Analisis/g, '💾 Riwayat Analisis');

fs.writeFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', html, 'utf8');
console.log('Final emoji cleanup complete.');
