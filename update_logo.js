const fs = require('fs');
let html = fs.readFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', 'utf8');

// The file might contain some broken chars due to previous replacements, we will use regex for safety

const introLogoRegex = /<svg class="intro-logo-svg" viewBox="0 0 120 120" fill="none" xmlns="http:\/\/www.w3.org\/2000\/svg">[\s\S]*?<\/svg>/;
const introLogoNew = `<svg class="intro-logo-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stop-color="#0080FF" />
            <stop offset="100%" stop-color="#002040" />
          </linearGradient>
          <linearGradient id="g2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FFB300" />
            <stop offset="100%" stop-color="#FFE066" />
          </linearGradient>
          <filter id="fGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <ellipse cx="60" cy="60" rx="55" ry="45" fill="url(#g1)" filter="url(#fGlow)"/>
        <!-- Outer glowing tech ring -->
        <ellipse cx="60" cy="60" rx="50" ry="40" stroke="url(#g2)" stroke-width="1.5" stroke-dasharray="15 5" opacity="0.6" />
        <path class="logo-letter-b" d="M 38 40 H 52 C 60 40 64 43 64 48 C 64 52 61 55 57 56.5 C 63 58 66 61 66 67 C 66 73 60 76 52 76 H 38 Z M 46 48 V 53 H 50 C 53 53 55 52 55 50.5 C 55 49 53 48 50 48 Z M 46 60 V 68 H 51 C 55 68 57 66 57 64 C 57 62 55 60 51 60 Z" fill="white"/>
        <path class="logo-letter-i" d="M 58 40 H 76 V 47 H 70.5 V 69 H 76 V 76 H 58 V 69 H 63.5 V 47 H 58 Z" fill="url(#g2)" style="mix-blend-mode: plus-lighter;" />
      </svg>`;

const headerLogoRegex = /<svg class="bi-logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http:\/\/www.w3.org\/2000\/svg">[\s\S]*?<\/svg>/;
const headerLogoNew = `<svg class="bi-logo-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gh1" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stop-color="#0080FF" />
              <stop offset="100%" stop-color="#002040" />
            </linearGradient>
            <linearGradient id="gh2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FFB300" />
              <stop offset="100%" stop-color="#FFE066" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="60" rx="55" ry="45" fill="url(#gh1)" />
          <ellipse cx="60" cy="60" rx="50" ry="40" stroke="url(#gh2)" stroke-width="1.5" stroke-dasharray="15 5" opacity="0.6" />
          <path d="M 38 40 H 52 C 60 40 64 43 64 48 C 64 52 61 55 57 56.5 C 63 58 66 61 66 67 C 66 73 60 76 52 76 H 38 Z M 46 48 V 53 H 50 C 53 53 55 52 55 50.5 C 55 49 53 48 50 48 Z M 46 60 V 68 H 51 C 55 68 57 66 57 64 C 57 62 55 60 51 60 Z" fill="white"/>
          <path d="M 58 40 H 76 V 47 H 70.5 V 69 H 76 V 76 H 58 V 69 H 63.5 V 47 H 58 Z" fill="url(#gh2)" style="mix-blend-mode: plus-lighter;" />
        </svg>`;

const footerRegex = /<div class="footer-text">[\s\S]*?<\/div>/;
const footerNew = `<div class="footer-text">
    Aplikasi simulasi ini dibuat secara independen untuk tujuan edukasi masyarakat.<br/>
    Hasil analisis fisik uang dan nominal didukung oleh teknologi computer vision.<br/>
    <span style="font-size:12px; font-weight: 700; color: #F4B942;">&copy; 2026 TukarRupiah.id - Desain & Pengembangan oleh Debora Seftarina</span>
  </div>`;

const cbprRegex = /<div class="footer-cbpr">.*?<\/div>/;
const cbprNew = `<div class="footer-cbpr">❤️ Cinta &middot; 🏆 Bangga &middot; 📚 Paham Rupiah</div>`;

html = html.replace(introLogoRegex, introLogoNew);
html = html.replace(headerLogoRegex, headerLogoNew);
html = html.replace(footerRegex, footerNew);
html = html.replace(cbprRegex, cbprNew);

// Make Debora Seftarina bolder in footer badge
html = html.replace('<div class="footer-bi-desc">Dibuat oleh Debora Seftarina</div>', '<div class="footer-bi-desc" style="color:#F4B942;font-weight:700;">Karya Debora Seftarina</div>');

// Ensure intro-bottom text is updated as well
html = html.replace('Dibuat oleh <strong>Debora Seftarina</strong>', 'Desain oleh <strong style="color:#F4B942;">Debora Seftarina</strong>');

// We also need to fix the corrupt emojis from the string replacement issue we saw earlier.
// I will create a mapping of the garbled text back to the emojis.
const replacements = {
  'ðŸ“·': '📷',
  'ðŸ’µ': '💵',
  'ðŸª™': '🪙',
  'ðŸ“ ': '📐',
  'ðŸ”Ž': '🔍',
  'âœ…': '✅',
  'âš': '⚠️',
  'âš ï¸': '⚠️',
  'â Œ': '❌',
  'ðŸ’¾': '💾',
  'ðŸ”': '🔄',
  'ðŸ”„': '🔄',
  'ðŸ“¤': '📤',
  'ðŸ§ ': '🧠',
  'â\u00ad\u0090': '⭐',
  'ðŸ”§': '🔧',
  'ðŸ”’': '🔒',
  'â\u009a\u0099ï¸': '⚙️',
  'â\u009a\u0099': '⚙',
  'ðŸ\u0093·': '📷',
  'ðŸ\u0092µ': '💵',
  'ðŸ\u00aa™': '🪙',
  'ðŸ\u0093 ': '📐',
  'ðŸ\u0094Ž': '🔍',
  'â\u009c…': '✅',
  'â\u008f³': '⏳',
  'ðŸ\u0094„': '🔄',
  'ðŸ\u0093¤': '📤',
  'ðŸ\u0092¾': '💾',
  'ðŸ§\u0090': '🧠',
  'âŒ¨ï¸': '⌨️',
  'ðŸ’¼': '💼',
  'ðŸ”´': '🔴',
  'ðŸŸ¡': '🟡',
  'ðŸŸ¢': '🟢',
  'ðŸ›¡ï¸': '🛡️',
  'ðŸ’¡': '💡',
  'ðŸ\u0093š': '📚',
  'ðŸ\u008f†': '🏆',
  'â\u009d¤ï¸': '❤️',
  'ðŸ’œ': '💜',
  'ðŸ’›': '💛',
  'â\u009c–ï¸': '✖️',
  'â€”': '—',
  'â€“': '–',
  'â€œ': '“',
  'â€': '”',
  'â€˜': '‘',
  'â€™': '’',
  'â€¢': '•',
  'â€¦': '…'
};

for (const [bad, good] of Object.entries(replacements)) {
  html = html.split(bad).join(good);
}

// In case the encoding fix removed some text, ensure it's fully restored
html = html.replace(/<div class="card-icon icon-red">.*?<\/div>/, '<div class="card-icon icon-red">📷</div>');
html = html.replace(/<div class="card-icon icon-blue">.*?<\/div>/, '<div class="card-icon icon-blue">✨</div>');
html = html.replace(/<div class="card-icon icon-gold">.*?<\/div>/, '<div class="card-icon icon-gold">📜</div>');

fs.writeFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', html, 'utf8');
console.log('Update logo and footer complete.');
