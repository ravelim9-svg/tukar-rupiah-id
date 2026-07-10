const fs = require('fs');
let html = fs.readFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', 'utf8');

const replacements = {
  'ðŸ“·': '📷',
  'ðŸ’µ': '💵',
  'ðŸª™': '🪙',
  'ðŸ“ ': '📐',
  'ðŸ”Ž': '🔍',
  'ðŸ’¾': '💾',
  'ðŸ“¤': '📤',
  'ðŸ“œ': '📜',
  'âœ‚ï¸': '✂️',
  'âœ”': '✔',
  'âœ…': '✅',
  'âš': '⚠️',
  'âš ï¸': '⚠️',
  'â Œ': '❌',
  'ðŸ”': '🔄',
  'ðŸ”„': '🔄',
  'ðŸ§ ': '🧠',
  'â\u00ad\u0090': '⭐',
  'ðŸ”§': '🔧',
  'ðŸ”’': '🔒',
  'â\u009a\u0099ï¸': '⚙️',
  'â\u009a\u0099': '⚙',
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
  'â€¦': '…',
  'ðŸŽ¥': '🎥',
  '🔄„': '🔄'
};

let matchCount = 0;
for (const [bad, good] of Object.entries(replacements)) {
  if (html.includes(bad)) {
    matchCount++;
    html = html.split(bad).join(good);
  }
}
console.log('Fixed ' + matchCount + ' types of broken characters.');

// Fix any leftover literal "âœ‚ï¸" etc that might have been missed by strict encoding
html = html.replace(/âœ‚ï¸/g, '✂️');
html = html.replace(/âœ”/g, '✔');

// And if there are literal text fallbacks
html = html.replace(/<div class="card-icon icon-gold">\?\?<\/div>/g, '<div class="card-icon icon-gold">📜</div>');
html = html.replace(/<div class="reg-row-icon" style="background:rgba\(204,0,1,0\.08\);">\?\?<\/div>/g, '<div class="reg-row-icon" style="background:rgba(204,0,1,0.08);">💵</div>');

// Super modern Glassmorphism / 3D glowing oval logo
const introLogoSvg = `<svg class="intro-logo-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#004A8B" />
      <stop offset="100%" stop-color="#001835" />
    </linearGradient>
    <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00D4FF" />
      <stop offset="100%" stop-color="#00508B" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="50%" stop-color="#FFF2A8" />
      <stop offset="100%" stop-color="#AA7C11" />
    </linearGradient>
    <filter id="superGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <ellipse cx="60" cy="60" rx="60" ry="48" fill="url(#cyanGlow)" opacity="0.3" filter="url(#superGlow)" />
  <ellipse cx="60" cy="60" rx="56" ry="44" fill="url(#bgGrad)" stroke="url(#cyanGlow)" stroke-width="1.5" />
  <ellipse cx="60" cy="60" rx="50" ry="38" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />

  <path d="M 38 40 H 52 C 60 40 64 43 64 48 C 64 52 61 55 57 56.5 C 63 58 66 61 66 67 C 66 73 60 76 52 76 H 38 Z M 46 48 V 53 H 50 C 53 53 55 52 55 50.5 C 55 49 53 48 50 48 Z M 46 60 V 68 H 51 C 55 68 57 66 57 64 C 57 62 55 60 51 60 Z" fill="#FFFFFF" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.5))" />
  <path d="M 58 40 H 76 V 47 H 70.5 V 69 H 76 V 76 H 58 V 69 H 63.5 V 47 H 58 Z" fill="url(#goldGrad)" filter="drop-shadow(0px 4px 8px rgba(212,175,55,0.6))" />
  <circle cx="85" cy="30" r="2" fill="#FFFFFF" filter="url(#superGlow)" />
</svg>`;

const headerLogoSvg = introLogoSvg.replace('intro-logo-svg', 'bi-logo-svg');

const footerLogoSvg = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:40px;height:40px;">
  <defs>
    <linearGradient id="fBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#004A8B" />
      <stop offset="100%" stop-color="#001835" />
    </linearGradient>
    <linearGradient id="fCyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00D4FF" />
      <stop offset="100%" stop-color="#00508B" />
    </linearGradient>
    <linearGradient id="fGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="50%" stop-color="#FFF2A8" />
      <stop offset="100%" stop-color="#AA7C11" />
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="60" rx="56" ry="44" fill="url(#fBgGrad)" stroke="url(#fCyanGlow)" stroke-width="1.5" />
  <path d="M 38 40 H 52 C 60 40 64 43 64 48 C 64 52 61 55 57 56.5 C 63 58 66 61 66 67 C 66 73 60 76 52 76 H 38 Z M 46 48 V 53 H 50 C 53 53 55 52 55 50.5 C 55 49 53 48 50 48 Z M 46 60 V 68 H 51 C 55 68 57 66 57 64 C 57 62 55 60 51 60 Z" fill="#FFFFFF" />
  <path d="M 58 40 H 76 V 47 H 70.5 V 69 H 76 V 76 H 58 V 69 H 63.5 V 47 H 58 Z" fill="url(#fGoldGrad)" />
</svg>`;

html = html.replace(/<svg class="intro-logo-svg"[\s\S]*?<\/svg>/, introLogoSvg);
html = html.replace(/<svg class="bi-logo-svg"[\s\S]*?<\/svg>/, headerLogoSvg);
html = html.replace(/<svg viewBox="0 0 120 120" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg" style="width:40px;height:40px;">[\s\S]*?<\/svg>/, footerLogoSvg);

// In case the old 48 48 svg is there
html = html.replace(/<svg viewBox="0 0 48 48" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg" style="width:40px;height:40px;">[\s\S]*?<\/svg>/, footerLogoSvg);

fs.writeFileSync('D:/Aplikasiku/TukarRupiah.id/index.html', html, 'utf8');
console.log('Update complete.');
